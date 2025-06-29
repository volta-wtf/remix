import { useState, useEffect, useCallback } from 'react';
import {
  getComputedValueForPreview,
  updateComputedValuesForPreview,
  createThemeObserver
} from '../utils/computed-style-utils.js';
import { detectVariablesFromEditableStylesheets } from '../utils/stylesheet-matcher.js';

// Función para determinar si una variable es editable (solo app local y registry)
function isEditableVariable(varName, sourceInfo) {
  // Si no tenemos información del origen, no es editable
  if (!sourceInfo || !sourceInfo.file) {
    console.log(`⏭️ Variable ${varName}: Sin información de origen`);
    return false;
  }

  const fileName = sourceInfo.file.toLowerCase();

  // Log para debug
  console.log(`🔍 Verificando variable ${varName} de archivo: "${sourceInfo.file}"`);

  // Variables editables son solo de:
  // 1. globals.css (archivo local de la app) - buscar por nombre o ruta
  // 2. Archivos que contengan "registry" en la ruta
  // 3. Estilos inline del theme-editor (overrides temporales)
  const isEditableSource =
    fileName === 'globals.css' ||                    // Nombre exacto
    fileName.endsWith('/globals.css') ||             // Ruta que termina en globals.css
    fileName.includes('/app/globals.css') ||         // Ruta específica de Next.js
    fileName.includes('registry') ||                 // Registry
    sourceInfo.type === 'inline' ||                 // Estilos inline
    sourceInfo.file === 'Estilo inline';           // Estilos inline del theme-editor

  // Excluir variables que claramente vienen de paquetes externos
  const isExternalPackage =
    fileName.includes('stylewind') ||
    fileName.includes('tailwind') ||
    fileName.includes('node_modules') ||
    fileName.includes('package');

  const isEditable = isEditableSource && !isExternalPackage;

  console.log(`${isEditable ? '✅' : '❌'} Variable ${varName}: ${isEditable ? 'EDITABLE' : 'NO EDITABLE'} (${sourceInfo.file})`);

  return isEditable;
}

export function useVariableDetection() {
  const [cssVars, setCssVars] = useState({});
  const [originalVars, setOriginalVars] = useState({});
  const [varSources, setVarSources] = useState({});
  const [debugInfo, setDebugInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeChangeCounter, setThemeChangeCounter] = useState(0);

  // Función simplificada que usa stylesheet-matcher
  const detectVariables = useCallback(() => {
    console.log('🎯 Detectando variables usando stylesheet-matcher...');
    const debugLog = [];

    try {
      // ✅ Usar la nueva utilidad que conecta css-finder con DOM
      const { variables, sources } = detectVariablesFromEditableStylesheets();

      debugLog.push(`Variables encontradas en stylesheets editables: ${Object.keys(variables).length}`);

      // Aplicar valores computados SOLO para preview
      const finalVars = {};
      Object.entries(variables).forEach(([varName, originalValue]) => {
        const computedValue = getComputedValueForPreview(varName, originalValue);
        finalVars[varName] = computedValue;

        console.log(`✅ ${varName} = "${computedValue}" (original: "${originalValue}", archivo: ${sources[varName]?.file})`);
      });

      console.log(`📊 Variables finales para editor: ${Object.keys(finalVars).length}`);
      debugLog.push(`Variables listas para edición: ${Object.keys(finalVars).length}`);

      setCssVars(finalVars);
      setVarSources(sources);
      setDebugInfo(debugLog);
      setLoading(false);

      return finalVars;
    } catch (error) {
      console.error('❌ Error detectando variables:', error);
      debugLog.push(`Error: ${error.message}`);
      setDebugInfo(debugLog);
      setLoading(false);
      return {};
    }
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

  // Observer para detectar cambios en las clases del html usando la utilidad
  useEffect(() => {
    const observer = createThemeObserver(
      originalVars,
      (updatedValues) => {
        setCssVars(updatedValues);
        setThemeChangeCounter(prev => prev + 1);
      }
    );

    return () => observer.disconnect();
  }, [originalVars]);

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

    // ✅ Usar la utilidad para obtener el valor computado después del reset
    const currentValue = getComputedValueForPreview(varName, originalVars[varName]);
    setCssVars(prev => ({ ...prev, [varName]: currentValue }));
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