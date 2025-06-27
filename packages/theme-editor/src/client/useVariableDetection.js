import { useState, useEffect, useCallback } from 'react';

export function useVariableDetection() {
  const [cssVars, setCssVars] = useState({});
  const [originalVars, setOriginalVars] = useState({});
  const [varSources, setVarSources] = useState({});
  const [debugInfo, setDebugInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeChangeCounter, setThemeChangeCounter] = useState(0);

  // Función para detectar variables CSS
  const detectVariables = useCallback(() => {
    console.log('🔍 Detectando variables CSS...');
    const debugLog = [];

    // Método 1: getComputedStyle y iterar por todas las propiedades
    const computedStyle = getComputedStyle(document.documentElement);
    debugLog.push(`Método 1: ComputedStyle tiene ${computedStyle.length} propiedades`);

    const vars = {};

    // Buscar variables CSS que empiecen con --
    for (let i = 0; i < computedStyle.length; i++) {
      const prop = computedStyle[i];
      if (prop.startsWith('--')) {
        const value = computedStyle.getPropertyValue(prop).trim();
        vars[prop] = value;
        console.log(`📌 Variable encontrada: ${prop} = ${value}`);
        debugLog.push(`Encontrada: ${prop} = ${value}`);
      }
    }

    // Método 2: Buscar en el CSS directamente con información de origen
    debugLog.push(`Método 2: Buscando en stylesheets...`);
    const varSources = {}; // Para rastrear el origen de cada variable
    try {
      const allVars = {};
      for (let i = 0; i < document.styleSheets.length; i++) {
        const styleSheet = document.styleSheets[i];
        const sourceInfo = styleSheet.href ?
          new URL(styleSheet.href).pathname.split('/').pop() :
          `<style> tag #${i + 1}`;

        try {
          for (let j = 0; j < (styleSheet.cssRules || []).length; j++) {
            const rule = styleSheet.cssRules[j];
            if (rule.type === CSSRule.STYLE_RULE && rule.selectorText === ':root') {
              const cssText = rule.style.cssText;
              const varMatches = cssText.match(/--[\w-]+:\s*[^;]+/g);
              if (varMatches) {
                debugLog.push(`Encontradas ${varMatches.length} variables en :root de ${sourceInfo}`);
                varMatches.forEach(match => {
                  const [prop, value] = match.split(':').map(s => s.trim());
                  const cleanValue = value.replace(/;$/, '');
                  allVars[prop] = cleanValue;
                  varSources[prop] = {
                    file: sourceInfo,
                    rule: rule.selectorText,
                    ruleIndex: j,
                    stylesheetIndex: i
                  };
                  console.log(`📌 Variable CSS: ${prop} = ${cleanValue} (${sourceInfo})`);
                });
              }
            }
          }
        } catch (e) {
          debugLog.push(`Error accediendo stylesheet ${sourceInfo}: ${e.message}`);
        }
      }
      Object.assign(vars, allVars);
    } catch (e) {
      debugLog.push(`Error en método 2: ${e.message}`);
    }

    // Método 3: Buscar en otras reglas CSS (no solo :root)
    debugLog.push(`Método 3: Buscando variables en otras reglas CSS...`);
    try {
      for (let i = 0; i < document.styleSheets.length; i++) {
        const styleSheet = document.styleSheets[i];
        const sourceInfo = styleSheet.href ?
          new URL(styleSheet.href).pathname.split('/').pop() :
          `<style> tag #${i + 1}`;

        try {
          for (let j = 0; j < (styleSheet.cssRules || []).length; j++) {
            const rule = styleSheet.cssRules[j];
            if (rule.type === CSSRule.STYLE_RULE && rule.selectorText !== ':root') {
              const cssText = rule.style.cssText;
              const varMatches = cssText.match(/--[\w-]+:\s*[^;]+/g);
              if (varMatches) {
                debugLog.push(`Encontradas ${varMatches.length} variables en ${rule.selectorText} de ${sourceInfo}`);
                varMatches.forEach(match => {
                  const [prop, value] = match.split(':').map(s => s.trim());
                  const cleanValue = value.replace(/;$/, '');
                  if (!vars[prop]) { // Solo agregar si no existe ya
                    vars[prop] = cleanValue;
                    varSources[prop] = {
                      file: sourceInfo,
                      rule: rule.selectorText,
                      ruleIndex: j,
                      stylesheetIndex: i,
                      type: 'selector-specific'
                    };
                    console.log(`📌 Variable CSS en selector: ${prop} = ${cleanValue} (${rule.selectorText} en ${sourceInfo})`);
                  }
                });
              }
            }
          }
        } catch (e) {
          debugLog.push(`Error accediendo reglas en ${sourceInfo}: ${e.message}`);
        }
      }
    } catch (e) {
      debugLog.push(`Error en método 3: ${e.message}`);
    }

    // Método 4: Buscar variables en elementos inline
    debugLog.push(`Método 4: Buscando variables en estilos inline...`);
    try {
      const elementsWithStyle = document.querySelectorAll('[style*="--"]');
      elementsWithStyle.forEach((element, index) => {
        const inlineStyle = element.getAttribute('style');
        const varMatches = inlineStyle.match(/--[\w-]+:\s*[^;]+/g);
        if (varMatches) {
          debugLog.push(`Encontradas ${varMatches.length} variables inline en elemento ${element.tagName.toLowerCase()}`);
          varMatches.forEach(match => {
            const [prop, value] = match.split(':').map(s => s.trim());
            const cleanValue = value.replace(/;$/, '');
            if (!vars[prop]) {
              vars[prop] = cleanValue;
              varSources[prop] = {
                file: 'Estilo inline',
                rule: `${element.tagName.toLowerCase()}${element.id ? '#' + element.id : ''}${element.className ? '.' + element.className.split(' ').join('.') : ''}`,
                ruleIndex: index,
                stylesheetIndex: -1,
                type: 'inline'
              };
              console.log(`📌 Variable inline: ${prop} = ${cleanValue} (${element.tagName})`);
            }
          });
        }
      });
    } catch (e) {
      debugLog.push(`Error en método 4: ${e.message}`);
    }

    // Método 5: Variables específicas conocidas (fallback)
    debugLog.push(`Método 5: Verificando variables específicas...`);
    const knownVars = [
      '--color-background', '--color-foreground', '--color-primary',
      '--font-size-base', '--spacing-md', '--radius-md'
    ];

    knownVars.forEach(varName => {
      const value = computedStyle.getPropertyValue(varName).trim();
      if (value && !vars[varName]) {
        vars[varName] = value;
        console.log(`📌 Variable específica: ${varName} = ${value}`);
        debugLog.push(`Específica: ${varName} = ${value}`);
      } else if (!value) {
        debugLog.push(`No encontrada: ${varName}`);
      }
    });

    // Actualizar los valores computed style para reflejar el tema actual
    const finalVars = {};
    Object.keys(vars).forEach(varName => {
      const computedValue = computedStyle.getPropertyValue(varName).trim();
      finalVars[varName] = computedValue || vars[varName];
    });

    console.log('📊 Total variables encontradas:', Object.keys(finalVars).length);
    debugLog.push(`Total final: ${Object.keys(finalVars).length} variables`);

    setCssVars(finalVars);
    setDebugInfo(debugLog);
    setVarSources(varSources);
    setLoading(false);

    return finalVars;
  }, [themeChangeCounter]);

  // Effect inicial para detectar variables
  useEffect(() => {
    const detectedVars = detectVariables();
    setOriginalVars({...detectedVars}); // Guardar valores originales solo la primera vez
  }, []);

  // Effect para re-detectar cuando cambie el tema
  useEffect(() => {
    if (themeChangeCounter > 0) { // Solo ejecutar en cambios, no en la carga inicial
      detectVariables();
    }
  }, [themeChangeCounter, detectVariables]);

  // Observer para detectar cambios en las clases del html
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' &&
            mutation.attributeName === 'class' &&
            mutation.target === document.documentElement) {
          console.log('🎨 Cambio de tema detectado, recalculando variables...');
          // Pequeño delay para asegurar que los estilos se han aplicado
          setTimeout(() => {
            setThemeChangeCounter(prev => prev + 1);
          }, 100);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const updateCSSVar = (varName, value) => {
    // Detectar el tema actual
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    const isLight = htmlElement.classList.contains('light');

    // Crear o encontrar el style element para el tema específico
    let styleId = 'theme-editor-override';
    if (isDark) styleId += '-dark';
    else if (isLight) styleId += '-light';
    else styleId += '-system';

    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Determinar el selector correcto según el tema
    let selector = ':root';
    if (isDark) selector = '.dark';
    else if (isLight) selector = '.light';

    // Obtener el CSS existente y actualizar/agregar la variable
    let existingCSS = styleElement.textContent || '';
    const varPattern = new RegExp(`${varName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*:[^;}]+`, 'g');

    if (existingCSS.includes(selector)) {
      // El selector ya existe, actualizar la variable
      const selectorPattern = new RegExp(`(${selector.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*{[^}]*)(${varName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*:[^;}]+)([^}]*})`, 'g');
      if (selectorPattern.test(existingCSS)) {
        // La variable ya existe, reemplazarla
        existingCSS = existingCSS.replace(varPattern, `${varName}: ${value}`);
      } else {
        // La variable no existe, agregarla al selector existente
        existingCSS = existingCSS.replace(
          new RegExp(`(${selector.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*{[^}]*)(})`, 'g'),
          `$1  ${varName}: ${value};\n$2`
        );
      }
    } else {
      // El selector no existe, crearlo
      existingCSS += `\n${selector} {\n  ${varName}: ${value};\n}\n`;
    }

    styleElement.textContent = existingCSS;
    setCssVars(prev => ({ ...prev, [varName]: value }));
  };

  const resetVar = (varName) => {
    // Detectar el tema actual
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    const isLight = htmlElement.classList.contains('light');

    // Encontrar el style element correcto
    let styleId = 'theme-editor-override';
    if (isDark) styleId += '-dark';
    else if (isLight) styleId += '-light';
    else styleId += '-system';

    const styleElement = document.getElementById(styleId);
    if (styleElement) {
      // Remover la variable del CSS override
      let existingCSS = styleElement.textContent || '';
      const varPattern = new RegExp(`\\s*${varName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*:[^;}]+;?`, 'g');
      existingCSS = existingCSS.replace(varPattern, '');

      // Si el selector queda vacío, removerlo también
      const emptySelectors = [':root', '.dark', '.light'];
      emptySelectors.forEach(selector => {
        const emptySelectorPattern = new RegExp(`${selector.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\s*{\\s*}`, 'g');
        existingCSS = existingCSS.replace(emptySelectorPattern, '');
      });

      styleElement.textContent = existingCSS.trim();

      // Si el style element está vacío, removerlo
      if (!existingCSS.trim()) {
        styleElement.remove();
      }
    }

    // Recalcular el valor actual después de remover el override
    const computedStyle = getComputedStyle(document.documentElement);
    const currentValue = computedStyle.getPropertyValue(varName).trim();
    const originalValue = originalVars[varName];
    setCssVars(prev => ({ ...prev, [varName]: currentValue || originalValue }));
  };

  return {
    cssVars,
    setCssVars,
    originalVars,
    setOriginalVars,
    varSources,
    debugInfo,
    loading,
    updateCSSVar,
    resetVar
  };
}