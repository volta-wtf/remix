import { useState, useEffect, useCallback } from 'react';
import {
  getComputedValueForPreview,
  updateComputedValuesForPreview,
  createThemeObserver
} from './computed-style-utils.js';



// Función para obtener variables del servidor (sistema de archivos)
async function fetchVariablesFromServer() {
  try {
    // Detectar el puerto del theme editor
    const currentPort = window.location.port || '3000';
    const portNum = parseInt(currentPort);

    const portMapping = {
      3001: 4442, // apps/wip
      3002: 4443, // apps/web
      3003: 4444, // apps/tmp
    };

    const themeEditorPort = portMapping[portNum] || 4444;
    const apiUrl = `http://localhost:${themeEditorPort}/api/variables`;

    console.log(`🔍 Obteniendo variables desde: ${apiUrl}`);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Error desconocido del servidor');
    }

    console.log(`✅ Recibidas ${data.totalVariables} variables del servidor`);
    console.log(`📁 Archivo fuente: ${data.filePath}`);

    return {
      variables: data.variables,
      sources: data.sources,
      filePath: data.filePath
    };
  } catch (error) {
    console.error('❌ Error obteniendo variables del servidor:', error.message);
    throw error;
  }
}

// Función para detectar el tema actual
function getCurrentTheme() {
  const htmlElement = document.documentElement;

  if (htmlElement.classList.contains('dark')) {
    return 'dark';
  } else if (htmlElement.classList.contains('light')) {
    return 'light';
  } else {
    // Por defecto, detectar según preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}

// Función para determinar si una variable es editable
function isEditableVariable(varName, sourceInfo) {
  // Todas las variables que vienen del servidor son editables
  // porque el css-parser ya filtró solo las del globals.css
  console.log(`☑️ Variable ${varName}: EDITABLE (desde sistema de archivos)`);
  return true;
}

export function useVariableDetection() {
  const [cssVars, setCssVars] = useState({});
  const [originalVars, setOriginalVars] = useState({});
  const [varSources, setVarSources] = useState({});
  const [debugInfo, setDebugInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeChangeCounter, setThemeChangeCounter] = useState(0);

  // Función para detectar variables desde el servidor
  const detectVariables = useCallback(async () => {
    console.log('🎯 Detectando variables desde el sistema de archivos...');
    const debugLog = [];

    try {
      setLoading(true);

      // Obtener variables del servidor
      const { variables, sources, filePath } = await fetchVariablesFromServer();

      debugLog.push(`Variables cargadas desde: ${filePath}`);
      debugLog.push(`Variables encontradas: ${Object.keys(variables).length}`);

      // Combinar variables según el tema activo
      const finalVars = {};
      const currentTheme = getCurrentTheme();

      // Procesar variables combinando temas
      Object.entries(variables).forEach(([varKey, originalValue]) => {
        const source = sources[varKey];

        if (!source) return;

        // Variables de :root siempre se incluyen
        if (source.type === 'root') {
          finalVars[varKey] = originalValue;
          console.log(`✅ ${varKey} = "${originalValue}" (:root)`);
        }
        // Variables específicas de tema solo si coincide con el tema actual
        else if (source.isThemeSpecific) {
          const shouldInclude = (
            (currentTheme === 'dark' && source.type === 'dark-theme') ||
            (currentTheme === 'light' && source.type === 'light-theme')
          );

          if (shouldInclude) {
            // Usar el nombre base sin sufijo para mostrar al usuario
            const displayName = source.baseName;
            finalVars[displayName] = originalValue;
            console.log(`✅ ${displayName} = "${originalValue}" (${source.type})`);
          }
        }
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
    detectVariables().then(detectedVars => {
      setOriginalVars({...detectedVars}); // Guardar valores originales solo la primera vez
    });
  }, []);

  // Effect para re-detectar cuando cambie el tema
  useEffect(() => {
    if (themeChangeCounter > 0) { // Solo ejecutar en cambios, no en la carga inicial
      detectVariables();
    }
  }, [themeChangeCounter, detectVariables]);

  // Observer para detectar cambios en las clases del html - recargar variables por tema
  useEffect(() => {
    const observer = createThemeObserver(
      originalVars,
      (updatedValues) => {
        // Detectar cambio de tema y recargar variables
        console.log('🎨 Cambio de tema detectado, recargando variables específicas del tema...');
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

    // Restaurar valor original
    setCssVars(prev => ({ ...prev, [varName]: originalVars[varName] }));
  };

  const resetAllVars = () => {
    // Remover todos los style elements de override
    ['theme-editor-override', 'theme-editor-override-dark', 'theme-editor-override-light', 'theme-editor-override-system'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
    });

    // Restaurar valores originales
    setCssVars({...originalVars});
  };

  return {
    cssVars,
    originalVars,
    setOriginalVars,
    varSources,
    debugInfo,
    loading,
    updateCSSVar,
    resetVar,
    resetAllVars,
    detectVariables: () => detectVariables(),
    isEditableVariable
  };
}