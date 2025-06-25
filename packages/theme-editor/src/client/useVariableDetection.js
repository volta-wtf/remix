import { useState, useEffect } from 'react';

export function useVariableDetection() {
  const [cssVars, setCssVars] = useState({});
  const [originalVars, setOriginalVars] = useState({});
  const [varSources, setVarSources] = useState({});
  const [debugInfo, setDebugInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    console.log('📊 Total variables encontradas:', Object.keys(vars).length);
    debugLog.push(`Total final: ${Object.keys(vars).length} variables`);

    setCssVars(vars);
    setOriginalVars({...vars}); // Guardar valores originales
    setDebugInfo(debugLog);
    setVarSources(varSources);
    setLoading(false);
  }, []);

  const updateCSSVar = (varName, value) => {
    // Actualización directa sin iframe
    document.documentElement.style.setProperty(varName, value);
    setCssVars(prev => ({ ...prev, [varName]: value }));
  };

  const resetVar = (varName) => {
    const originalValue = originalVars[varName];
    document.documentElement.style.removeProperty(varName);
    setCssVars(prev => ({ ...prev, [varName]: originalValue }));
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