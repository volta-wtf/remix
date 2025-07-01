import React, { useState } from 'react';
import { styles } from './panel-styles.js';
import { VariablesPanel } from './VariablesPanel.jsx';
import { ColorPanel } from './ColorPanel.jsx';
import { DebugPanel } from './DebugPanel.jsx';
import { useVariableDetection } from './useVariableDetection.js';
import { NETWORK, API_ENDPOINTS, UI, CSS, DEV } from '../config/constants.js';
import { injectDynamicStyles, setClassNames } from './dynamic-styles.js';
import { cn, cls, tabClass, saveButtonClass } from '../utils/class-names.js';

// Componente Tab individual
const Tab = ({ isActive, onClick, icon, children, disabled = false }) => (
  <button
    className={tabClass(isActive)}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
  >
    {icon || children}
  </button>
);

// Componente TabBar que contiene todos los tabs
const AppTabs = ({ activeTab, onTabChange, disabled = false }) => (
  <div className={styles.tabBar}>
    <Tab
      isActive={activeTab === 'variables'}
      onClick={() => onTabChange('variables')}
      // icon={<VariablesIcon />}
      disabled={disabled}
    >
      Theme
    </Tab>
    <Tab
      isActive={activeTab === 'colors'}
      onClick={() => onTabChange('colors')}
      // icon={<ColorsIcon />}
      disabled={disabled}
    >
      Palette
    </Tab>
    <Tab
      isActive={activeTab === 'debug'}
      onClick={() => onTabChange('debug')}
      // icon={<DebugIcon />}
      disabled={disabled}
    >
      Debug
    </Tab>
  </div>
);

// Componente de contenido del panel
const AppFrame = ({ children }) => (
  <div id="theme-editor-panel" className={cls('panel')}>
    {children}
  </div>
);

// Componente Header del panel
const AppHeader = ({ children, onClose }) => (
  <div className={cls('header')}>
    <div className={cls('headerTop')}>
      {children}
      <button className={cls('closeButton')} onClick={onClose}>✕</button>
    </div>
  </div>
);

// Componente de contenido del panel
const AppContent = ({ children }) => (
  <div className={cls('content')}>
    <div className={cls('tabContent')}>
      {children}
    </div>
  </div>
);

// Componente de pantalla de carga
const LoadingScreen = ({ onClose }) => (
  <AppFrame>
    <AppHeader onClose={onClose}>
      <AppTabs
        activeTab="variables"
        onTabChange={() => {}}
        disabled={true}
      />
    </AppHeader>
    <div className={cls('loading')}>
      Cargando variables CSS...
    </div>
  </AppFrame>
);

// Inyectar estilos CSS globales para la selección de texto
const injectTextSelectionStyles = () => {
  if (document.getElementById('theme-editor-text-selection-styles')) return;

  const style = document.createElement('style');
  style.id = 'theme-editor-text-selection-styles';
  style.textContent = `
    #theme-editor-panel input::selection {
      background-color: #3b82f6 !important;
      color: white !important;
    }
    #theme-editor-panel input::-moz-selection {
      background-color: #3b82f6 !important;
      color: white !important;
    }
    #theme-editor-panel input::-webkit-selection {
      background-color: #3b82f6 !important;
      color: white !important;
    }
  `;
  document.head.appendChild(style);
};

// ========================
// COMPONENTE PRINCIPAL
// ========================

export function ThemeEditorApp({ onClose }) {
  // Estados de UI
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropdownFilter, setDropdownFilter] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeTab, setActiveTab] = useState('variables');
  const [isSpecificRulesCollapsed, setIsSpecificRulesCollapsed] = useState(true);

  // Estados de cambios modificados (centralizados)
  const [modifiedVariables, setModifiedVariables] = useState({});
  const [modifiedColors, setModifiedColors] = useState({});
  const [savingVariables, setSavingVariables] = useState(false);
  const [savingColors, setSavingColors] = useState(false);

  // Hook de detección de variables
  const {
    cssVars,
    originalVars,
    setOriginalVars,
    varSources,
    debugInfo,
    loading,
    updateCSSVar,
    resetVar
  } = useVariableDetection();

  // Función para determinar si una variable es de colores
  const isColorVariable = (varName) => {
    return varName.startsWith('--color-') || varName.startsWith('--tone-');
  };

  // Funciones para manejar variables del tema
  const updateThemeVar = (varName, value) => {
    updateCSSVar(varName, value);

    const originalValue = originalVars[varName];
    if (value !== originalValue) {
      setModifiedVariables(prev => ({ ...prev, [varName]: value }));
    } else {
      setModifiedVariables(prev => {
        const newModified = { ...prev };
        delete newModified[varName];
        return newModified;
      });
    }
  };

  const resetThemeVar = (varName) => {
    resetVar(varName);
    setModifiedVariables(prev => {
      const newModified = { ...prev };
      delete newModified[varName];
      return newModified;
    });
  };

  const resetAllThemeVars = () => {
    Object.keys(modifiedVariables).forEach(varName => {
      resetVar(varName);
    });
    setModifiedVariables({});
  };

  // Funciones para manejar variables de colores
  const updateColorVar = (varName, value) => {
    updateCSSVar(varName, value);

    const originalValue = originalVars[varName];
    if (value !== originalValue) {
      setModifiedColors(prev => ({ ...prev, [varName]: value }));
    } else {
      setModifiedColors(prev => {
        const newModified = { ...prev };
        delete newModified[varName];
        return newModified;
      });
    }
  };

  const resetColorVar = (varName) => {
    resetVar(varName);
    setModifiedColors(prev => {
      const newModified = { ...prev };
      delete newModified[varName];
      return newModified;
    });
  };

  const resetAllColorVars = () => {
    Object.keys(modifiedColors).forEach(varName => {
      resetVar(varName);
    });
    setModifiedColors({});
  };

  // Funciones de guardado
  const getCurrentTheme = () => {
    const htmlElement = document.documentElement;
    const hasLightClass = htmlElement.classList.contains('light');
    const hasDarkClass = htmlElement.classList.contains('dark');

    if (hasLightClass) {
      return 'light';
    } else if (hasDarkClass) {
      return 'dark';
    } else {
      // Si no hay clase específica, usar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
  };

    const saveVariables = async () => {
    setSavingVariables(true);
    try {
      const activeTheme = getCurrentTheme();
      console.log(`${DEV.LOG_PREFIXES.THEME} Guardando variables en tema:`, activeTheme);

      // Detectar puerto dinámicamente desde el script que nos cargó
      const scripts = document.querySelectorAll(`script[src*="${CSS.FILE_NAMES.THEME_EDITOR_SCRIPT}"]`);
      const themeEditorScript = scripts[scripts.length - 1]; // Último script cargado
      const scriptSrc = themeEditorScript?.src || NETWORK.DEFAULT_SCRIPT_URL;
      const scriptUrl = new URL(scriptSrc);
      const port = scriptUrl.port || NETWORK.DEFAULT_PORT.toString();
      const apiUrl = `${NETWORK.DEFAULT_PROTOCOL}://${NETWORK.DEFAULT_HOST}:${port}${API_ENDPOINTS.SAVE_CSS}`;

      console.log(`${DEV.LOG_PREFIXES.PORT} Usando puerto dinámico:`, port);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variables: modifiedVariables,
          activeTheme: activeTheme
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOriginalVars(prev => ({ ...prev, ...modifiedVariables }));
        setModifiedVariables({});
        showNotification(`${DEV.LOG_PREFIXES.SUCCESS} Variables guardadas en ${result.targetSelector}`, UI.COLORS.SUCCESS);
      } else {
        throw new Error(`Error ${response.status}`);
      }
    } catch (error) {
      showNotification(`${DEV.LOG_PREFIXES.ERROR} Error: ${error.message}`, UI.COLORS.ERROR);
    } finally {
      setSavingVariables(false);
    }
  };

    const saveColors = async () => {
    setSavingColors(true);
    try {
      const activeTheme = getCurrentTheme();
      console.log(`${DEV.LOG_PREFIXES.THEME} Guardando colores en tema:`, activeTheme);

      // Detectar puerto dinámicamente desde el script que nos cargó
      const scripts = document.querySelectorAll(`script[src*="${CSS.FILE_NAMES.THEME_EDITOR_SCRIPT}"]`);
      const themeEditorScript = scripts[scripts.length - 1]; // Último script cargado
      const scriptSrc = themeEditorScript?.src || NETWORK.DEFAULT_SCRIPT_URL;
      const scriptUrl = new URL(scriptSrc);
      const port = scriptUrl.port || NETWORK.DEFAULT_PORT.toString();
      const apiUrl = `${NETWORK.DEFAULT_PROTOCOL}://${NETWORK.DEFAULT_HOST}:${port}${API_ENDPOINTS.SAVE_CSS}`;

      console.log(`${DEV.LOG_PREFIXES.PORT} Usando puerto dinámico:`, port);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variables: modifiedColors,
          activeTheme: activeTheme
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOriginalVars(prev => ({ ...prev, ...modifiedColors }));
        setModifiedColors({});
        showNotification(`${DEV.LOG_PREFIXES.SUCCESS} Colores guardados en ${result.targetSelector}`, UI.COLORS.SUCCESS);
      } else {
        throw new Error(`Error ${response.status}`);
      }
    } catch (error) {
      showNotification(`${DEV.LOG_PREFIXES.ERROR} Error: ${error.message}`, UI.COLORS.ERROR);
    } finally {
      setSavingColors(false);
    }
  };

  const showNotification = (message, bgColor) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${bgColor};
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      max-width: 400px;
      word-wrap: break-word;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, UI.NOTIFICATION_DURATION);
  };

  // Configurar sistema de clases ANTES del primer render
  React.useLayoutEffect(() => {
    setClassNames(); // Debe ejecutarse PRIMERO
    injectDynamicStyles();
    injectTextSelectionStyles();
  }, []);

  // Pantalla de carga
  if (loading) {
    return <LoadingScreen onClose={onClose} />;
  }

  // Panel principal
  return (
    <AppFrame>
      <AppHeader onClose={onClose}>
        <AppTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          disabled={false}
        />
      </AppHeader>
      <AppContent>
        {activeTab === 'variables' && (
          <VariablesPanel
            cssVars={cssVars}
            varSources={varSources}
            originalVars={originalVars}
            modifiedVars={modifiedVariables}
            saving={savingVariables}
            onSave={saveVariables}
            onResetAll={resetAllThemeVars}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            dropdownFilter={dropdownFilter}
            setDropdownFilter={setDropdownFilter}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isSpecificRulesCollapsed={isSpecificRulesCollapsed}
            setIsSpecificRulesCollapsed={setIsSpecificRulesCollapsed}
            updateCSSVar={updateThemeVar}
            resetVar={resetThemeVar}
          />
        )}

        {activeTab === 'colors' && (
          <ColorPanel
            cssVars={cssVars}
            originalVars={originalVars}
            modifiedVars={modifiedColors}
            saving={savingColors}
            onSave={saveColors}
            onResetAll={resetAllColorVars}
            updateCSSVar={updateColorVar}
            resetVar={resetColorVar}
          />
        )}

        {activeTab === 'debug' && (
          <DebugPanel
            cssVars={cssVars}
            varSources={varSources}
            originalVars={originalVars}
            debugInfo={debugInfo}
          />
        )}
      </AppContent>
    </AppFrame>
  );
}