import { useState, useEffect, useCallback } from 'react';
import { resolveAllVariables, resolveCSSValue } from './cssResolver.js';

export function useVariableDetection(settings = {}) {
  const [cssVars, setCssVars] = useState({});
  const [computedVars, setComputedVars] = useState({}); // Siempre valores computados para preview
  const [originalVars, setOriginalVars] = useState({});
  const [varSources, setVarSources] = useState({});
  const [debugInfo, setDebugInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeChangeCounter, setThemeChangeCounter] = useState(0);

  // Configuraciones por defecto
  const {
    useSourceValues = true,
    showAllVariables = false
  } = settings;

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

    // Decidir qué valores usar según configuración
    const displayVars = {}; // Variables para mostrar en inputs
    const computedValues = {}; // Variables computadas para preview
    const sourceVars = {}; // Variables encontradas en CSS fuente

    // SIEMPRE obtener valores computados básicos del navegador
    const browserComputedVars = {};
    Object.keys(vars).forEach(varName => {
      const computedValue = computedStyle.getPropertyValue(varName).trim();
      if (computedValue && (showAllVariables || !varName.startsWith('--tw-'))) {
        browserComputedVars[varName] = computedValue;
      }
    });

    // 🔍 LOG: Mostrar todas las variables que contienen --alpha
    const alphaVars = Object.entries(vars).filter(([name, value]) =>
      value && value.includes && value.includes('--alpha')
    );
    console.log('🔍 Variables que contienen --alpha encontradas:', alphaVars);

    // 🔍 LOG: Mostrar variables específicas que esperamos
    const expectedAlphaVars = ['--muted', '--variant', '--scrim-soft', '--shadow-soft', '--surface', '--card'];
    expectedAlphaVars.forEach(varName => {
      const foundValue = vars[varName];
      const computedValue = browserComputedVars[varName];
      console.log(`🔍 Variable esperada ${varName}:`, {
        foundInCSS: foundValue,
        computedByBrowser: computedValue,
        hasAlphaFunction: foundValue && foundValue.includes('--alpha')
      });
    });

    if (useSourceValues) {
      // MODO: Valores del archivo CSS (prioritario)
      debugLog.push('🎯 Modo: Valores del archivo CSS');

      // Primero agregar todas las variables encontradas en CSS fuente
      Object.keys(vars).forEach(varName => {
        if (varSources[varName]) {
          // Tenemos el valor original del CSS fuente
          displayVars[varName] = vars[varName];
          sourceVars[varName] = vars[varName];
        }
      });

      // Solo usar computed style para variables que no encontramos en fuente
      Object.keys(vars).forEach(varName => {
        if (!sourceVars[varName]) {
          const computedValue = computedStyle.getPropertyValue(varName).trim();
          if (computedValue && (showAllVariables || !varName.startsWith('--tw-'))) {
            displayVars[varName] = computedValue;
            console.log(`⚠️ Variable solo encontrada via computed: ${varName} = ${computedValue}`);
          }
        }
      });

    } else {
      // MODO: Valores computados del navegador
      debugLog.push('🖥️ Modo: Valores computados del navegador');

      Object.keys(vars).forEach(varName => {
        const computedValue = computedStyle.getPropertyValue(varName).trim();
        if (computedValue && (showAllVariables || !varName.startsWith('--tw-'))) {
          displayVars[varName] = computedValue;
        }
      });

      // Guardar también los valores originales para referencia
      Object.keys(vars).forEach(varName => {
        if (varSources[varName]) {
          sourceVars[varName] = vars[varName];
        }
      });
    }

    // Resolver recursivamente todas las variables para preview
    console.log('🔧 Resolviendo variables recursivamente...');
    try {
      const allVarsForResolution = { ...vars, ...displayVars };
      const resolvedVars = resolveAllVariables(allVarsForResolution, browserComputedVars);

      // Usar variables resueltas para preview
      Object.keys(displayVars).forEach(varName => {
        if (resolvedVars[varName] && resolvedVars[varName] !== displayVars[varName]) {
          computedValues[varName] = resolvedVars[varName];
          console.log(`✅ Resuelto ${varName}: "${displayVars[varName]}" → "${resolvedVars[varName]}"`);
        } else {
          // Fallback a valor computado del navegador
          computedValues[varName] = browserComputedVars[varName] || displayVars[varName];
        }
      });
    } catch (error) {
      console.warn('Error resolviendo variables:', error);
      // Fallback: usar valores computados del navegador
      Object.keys(displayVars).forEach(varName => {
        computedValues[varName] = browserComputedVars[varName] || displayVars[varName];
      });
    }

    // Filtrar variables del sistema si no se solicitan todas
    const filteredDisplayVars = {};
    const filteredComputedVars = {};
    Object.keys(displayVars).forEach(varName => {
      if (showAllVariables || (!varName.startsWith('--tw-') && !varName.startsWith('--un-'))) {
        filteredDisplayVars[varName] = displayVars[varName];
        filteredComputedVars[varName] = computedValues[varName];
      }
    });

    console.log('📊 Total variables encontradas:', Object.keys(filteredDisplayVars).length);
    console.log('📊 Variables del CSS fuente:', Object.keys(sourceVars).length);
    console.log('📊 Modo actual:', useSourceValues ? 'Valores del archivo' : 'Valores computados');
    debugLog.push(`Total final: ${Object.keys(filteredDisplayVars).length} variables`);
    debugLog.push(`CSS fuente: ${Object.keys(sourceVars).length} variables`);
    debugLog.push(`Modo: ${useSourceValues ? 'Archivo CSS' : 'Computado'}`);

    setCssVars(filteredDisplayVars);
    setComputedVars(filteredComputedVars);
    setDebugInfo(debugLog);
    setVarSources(varSources);
    setLoading(false);

    return filteredDisplayVars;
  }, [themeChangeCounter, useSourceValues, showAllVariables]);

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

  // Función de utilidad para testing del resolvedor
  const testResolver = () => {
    console.log('🧪 Testing CSS Resolver con variables actuales:');
    const testVars = Object.fromEntries(
      Object.entries(cssVars).slice(0, 10) // Solo primeras 10 para no saturar
    );

    Object.entries(testVars).forEach(([varName, value]) => {
      const resolved = resolveCSSValue(value, cssVars, computedVars);
      console.log(`${varName}: "${value}" → "${resolved}"`);
    });

    // Exponer en window para debugging
    window.cssResolverTest = {
      cssVars,
      computedVars,
      resolveCSSValue,
      resolveAllVariables
    };

    console.log('🔧 Funciones de debugging disponibles en window.cssResolverTest');
  };

  return {
    cssVars,
    setCssVars,
    computedVars, // Valores computados para preview
    originalVars,
    setOriginalVars,
    varSources,
    debugInfo,
    loading,
    updateCSSVar,
    resetVar,
    testResolver // Función para testing
  };
}