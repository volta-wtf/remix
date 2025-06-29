import React, { useState } from 'react';
import { styles } from './panel-styles.js';
import { VariablesPanel } from './VariablesPanel.jsx';
import { ColorPanel } from './ColorPanel.jsx';
import { DebugPanel } from './DebugPanel.jsx';
import { SettingsPanel } from './SettingsPanel.jsx';
import { useVariableDetection } from './useVariableDetection.js';

// ========================
// COMPONENTES INTERNOS
// ========================

// Icono de Variables (cuadrícula 2x2)
const VariablesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="5.125" height="5.125" rx="2.5625" stroke="currentColor" />
    <rect x="1.5" y="9.375" width="5.125" height="5.125" rx="2.5625" stroke="currentColor" />
    <rect x="9.375" y="1.5" width="5.125" height="5.125" rx="2.5625" stroke="currentColor" />
    <rect x="9.375" y="9.375" width="5.125" height="5.125" rx="2.5625" stroke="currentColor" />
  </svg>
);

// Icono de Colores (paleta de colores)
const ColorsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g style={{ mixBlendMode: 'darken' }}>
      <path d="M14.5 13.4287C14.4999 14.0203 14.0203 14.4999 13.4287 14.5H5C3.067 14.5 1.5 12.933 1.5 11C1.5 9.067 3.067 7.5 5 7.5L13.4287 7.5C14.0203 7.50008 14.4999 7.97967 14.5 8.57129V13.4287Z" fill="white" />
      <path d="M14.5 13.4287C14.4999 14.0203 14.0203 14.4999 13.4287 14.5H5C3.067 14.5 1.5 12.933 1.5 11C1.5 9.067 3.067 7.5 5 7.5L13.4287 7.5C14.0203 7.50008 14.4999 7.97967 14.5 8.57129V13.4287Z" fill="white" fillOpacity="0.3" />
      <path d="M14.5 13.4287C14.4999 14.0203 14.0203 14.4999 13.4287 14.5H5C3.067 14.5 1.5 12.933 1.5 11C1.5 9.067 3.067 7.5 5 7.5L13.4287 7.5C14.0203 7.50008 14.4999 7.97967 14.5 8.57129V13.4287Z" stroke="black" />
      <path d="M8.21094 2.81665C8.84549 2.18239 9.87426 2.18236 10.5088 2.81665L13.1602 5.46899C13.7948 6.1036 13.7948 7.13224 13.1602 7.76685L7.5918 13.3352C6.22499 14.7019 4.00938 14.7019 2.64258 13.3352C1.27574 11.9684 1.27574 9.75184 2.64258 8.38501L8.21094 2.81665Z" fill="white" />
      <path d="M8.21094 2.81665C8.84549 2.18239 9.87426 2.18236 10.5088 2.81665L13.1602 5.46899C13.7948 6.1036 13.7948 7.13224 13.1602 7.76685L7.5918 13.3352C6.22499 14.7019 4.00938 14.7019 2.64258 13.3352C1.27574 11.9684 1.27574 9.75184 2.64258 8.38501L8.21094 2.81665Z" fill="white" fillOpacity="0.6" />
      <path d="M8.21094 2.81665C8.84549 2.18239 9.87426 2.18236 10.5088 2.81665L13.1602 5.46899C13.7948 6.1036 13.7948 7.13224 13.1602 7.76685L7.5918 13.3352C6.22499 14.7019 4.00938 14.7019 2.64258 13.3352C1.27574 11.9684 1.27574 9.75184 2.64258 8.38501L8.21094 2.81665Z" stroke="black" />
      <path d="M7.42871 1.5C8.02033 1.50008 8.49992 1.97967 8.5 2.57129V11C8.5 12.933 6.933 14.5 5 14.5C3.067 14.5 1.5 12.933 1.5 11V2.57129C1.50008 1.97967 1.97967 1.50008 2.57129 1.5H7.42871Z" fill="white" />
      <path d="M7.42871 1.5C8.02033 1.50008 8.49992 1.97967 8.5 2.57129V11C8.5 12.933 6.933 14.5 5 14.5C3.067 14.5 1.5 12.933 1.5 11V2.57129C1.50008 1.97967 1.97967 1.50008 2.57129 1.5H7.42871Z" fill="white" />
      <path d="M7.42871 1.5C8.02033 1.50008 8.49992 1.97967 8.5 2.57129V11C8.5 12.933 6.933 14.5 5 14.5C3.067 14.5 1.5 12.933 1.5 11V2.57129C1.50008 1.97967 1.97967 1.50008 2.57129 1.5H7.42871Z" stroke="black" />
      <circle cx="5" cy="11" r="1.125" fill="black" />
    </g>
  </svg>
);

// Icono de Debug (bug/engranaje)
const DebugIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4023_95027)">
      <path d="M7.22662 9.1871L5.2815 7.23236L5.93158 6.58228L7.9889 8.64985L10.0167 6.62202L10.6668 7.27211L8.72168 9.21723L10.6668 11.1726L10.0167 11.8227L7.95941 9.75512L5.93158 11.7836L5.2815 11.1335L7.22662 9.18838V9.1871Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.2055 3.70746V4.34665H12.0678L13.8904 2.52462L14.5405 3.1747L12.8147 4.89992L12.8358 4.95442C13.2148 5.96091 13.4071 7.02807 13.4032 8.10354C13.4032 8.31852 13.3959 8.53116 13.3814 8.74144L13.3782 8.78952H15.6477V9.70887H13.2628L13.2564 9.74606C13.0621 10.8058 12.6852 11.772 12.1716 12.5855L12.1332 12.6458L14.3277 14.8512L13.6757 15.5L11.5767 13.3908L11.5132 13.4613C10.565 14.5217 9.33666 15.1576 7.99803 15.1576C6.63888 15.1576 5.3932 14.5018 4.4386 13.4119L4.37577 13.3395L2.31845 15.3961L1.66837 14.7461L3.82634 12.5887L3.78851 12.5278C3.29358 11.7264 2.92943 10.7808 2.73966 9.74542L2.73325 9.70887H0.349609V8.78952H2.61785L2.61464 8.74144C2.59982 8.52913 2.59255 8.31636 2.59285 8.10354C2.59285 6.98609 2.79159 5.93018 3.14612 4.9916L3.16664 4.93775L1.3959 3.15803L2.04855 2.50987L3.8757 4.34665H4.79056V3.70746C4.79056 2.85679 5.12849 2.04096 5.73001 1.43944C6.33152 0.837928 7.14735 0.5 7.99803 0.5C8.8487 0.5 9.66453 0.837928 10.266 1.43944C10.8676 2.04096 11.2055 2.85679 11.2055 3.70746ZM5.70991 3.70746V4.34665H10.2868V3.70746C10.2868 3.10062 10.0457 2.51863 9.61661 2.08952C9.1875 1.66042 8.60551 1.41935 7.99867 1.41935C7.39182 1.41935 6.80983 1.66042 6.38073 2.08952C5.95162 2.51863 5.71055 3.10062 5.71055 3.70746H5.70991ZM11.9928 5.32434L11.971 5.26664H4.02508L4.00328 5.32434C3.67379 6.21367 3.50743 7.15514 3.51219 8.10354C3.51219 9.873 4.06483 11.4379 4.91237 12.54C5.75864 13.6401 6.85878 14.2383 7.99803 14.2383C9.13727 14.2383 10.2368 13.6401 11.0837 12.5394C11.9312 11.4379 12.4839 9.87236 12.4839 8.10354C12.4839 7.09444 12.3043 6.15201 11.9928 5.32434Z" fill="currentColor" stroke="currentColor" strokeWidth="0.192332" />
    </g>
    <defs>
      <clipPath id="clip0_4023_95027">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// Icono de Configuración (engrane)
const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6.7 1.4a1.1 1.1 0 0 1 2.6 0l.2 1.3c.1.4.4.7.8.8l1.2.4c.5.2.8.8.6 1.3l-.4 1.2c-.1.4 0 .8.2 1.1l1 1c.4.4.4 1 0 1.4l-1 1c-.3.3-.3.7-.2 1.1l.4 1.2c.2.5-.1 1.1-.6 1.3l-1.2.4c-.4.1-.7.4-.8.8l-.2 1.3a1.1 1.1 0 0 1-2.6 0l-.2-1.3c-.1-.4-.4-.7-.8-.8l-1.2-.4c-.5-.2-.8-.8-.6-1.3l.4-1.2c.1-.4 0-.8-.2-1.1l-1-1c-.4-.4-.4-1 0-1.4l1-1c.3-.3.3-.7.2-1.1l-.4-1.2c-.2-.5.1-1.1.6-1.3l1.2-.4c.4-.1.7-.4.8-.8l.2-1.3Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Componente Tab individual
const Tab = ({ isActive, onClick, icon, disabled = false }) => (
  <button
    style={disabled ?
      { ...styles.tab, opacity: 0.5, cursor: 'not-allowed' } :
      isActive ? styles.tabActive : styles.tab
    }
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
  >
    {icon}
  </button>
);

// Componente TabBar que contiene todos los tabs
const AppTabs = ({ activeTab, onTabChange, disabled = false }) => (
  <div style={styles.tabBar}>
    <Tab
      isActive={activeTab === 'variables'}
      onClick={() => onTabChange('variables')}
      icon={<VariablesIcon />}
      disabled={disabled}
    />
    <Tab
      isActive={activeTab === 'colors'}
      onClick={() => onTabChange('colors')}
      icon={<ColorsIcon />}
      disabled={disabled}
    />
    <Tab
      isActive={activeTab === 'debug'}
      onClick={() => onTabChange('debug')}
      icon={<DebugIcon />}
      disabled={disabled}
    />
  </div>
);

// Componente de contenido del panel
const AppFrame = ({ children }) => (
  <div id="theme-editor-panel" style={styles.panel}>
    {children}
  </div>
);

// Componente Header del panel
const AppHeader = ({ children, onClose, onSettingsClick }) => (
  <div style={styles.header}>
    <div style={styles.headerTop}>
      {children}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {onSettingsClick && (
          <button
            style={{
              ...styles.closeButton,
              fontSize: '14px'
            }}
            onClick={onSettingsClick}
            title="Configuración"
          >
            <SettingsIcon />
          </button>
        )}
        <button style={styles.closeButton} onClick={onClose}>✕</button>
      </div>
    </div>
  </div>
);

// Componente de contenido del panel
const AppContent = ({ children }) => (
  <div style={styles.content}>
    <div style={styles.tabContent}>
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
    <div style={styles.loading}>
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

  // Estados de configuración
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [settings, setSettings] = useState({
    useSourceValues: true,          // Usar valores del archivo CSS vs computados
    showPreview: true,              // Mostrar previews visuales
    showTypeIndicator: true,        // Mostrar indicadores de tipo
    groupByType: false,             // Agrupar variables por tipo
    showDebugInfo: false,           // Mostrar información de debug
    showAllVariables: false,        // Mostrar todas las variables (incluyendo sistema)
    enableAlphaInputs: true         // Habilitar inputs separados para opacidad - ACTIVADO por defecto
  });

  // Estados de cambios modificados (centralizados)
  const [modifiedVariables, setModifiedVariables] = useState({});
  const [modifiedColors, setModifiedColors] = useState({});
  const [savingVariables, setSavingVariables] = useState(false);
  const [savingColors, setSavingColors] = useState(false);

  // Hook de detección de variables (con configuraciones)
  const {
    cssVars,
    computedVars,
    originalVars,
    setOriginalVars,
    varSources,
    debugInfo,
    loading,
    updateCSSVar,
    resetVar,
    testResolver
  } = useVariableDetection(settings);

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
      console.log('🎨 Guardando variables en tema:', activeTheme);

      const response = await fetch('http://localhost:4444/save-css', {
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
        showNotification(`✅ Variables guardadas en ${result.targetSelector}`, '#10b981');
      } else {
        throw new Error(`Error ${response.status}`);
      }
    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, '#ef4444');
    } finally {
      setSavingVariables(false);
    }
  };

  const saveColors = async () => {
    setSavingColors(true);
    try {
      const activeTheme = getCurrentTheme();
      console.log('🎨 Guardando colores en tema:', activeTheme);

      const response = await fetch('http://localhost:4444/save-css', {
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
        showNotification(`✅ Colores guardados en ${result.targetSelector}`, '#10b981');
      } else {
        throw new Error(`Error ${response.status}`);
      }
    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, '#ef4444');
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
    }, 3000);
  };

  // Funciones para manejar configuración
  const handleSettingChange = (settingKey, value) => {
    setSettings(prev => ({
      ...prev,
      [settingKey]: value
    }));
  };

  const handleCloseSettings = () => {
    setShowSettingsPanel(false);
  };

  const handleOpenSettings = () => {
    setShowSettingsPanel(true);
  };

  // Inyectar estilos para la selección de texto al montar
  React.useEffect(() => {
    injectTextSelectionStyles();
  }, []);

  // Pantalla de carga
  if (loading) {
    return <LoadingScreen onClose={onClose} />;
  }

  // Panel principal
  return (
    <>
      <AppFrame>
        <AppHeader onClose={onClose} onSettingsClick={handleOpenSettings}>
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
            computedVars={computedVars}
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
            settings={settings}
          />
        )}

        {activeTab === 'colors' && (
          <ColorPanel
            cssVars={cssVars}
            computedVars={computedVars}
            originalVars={originalVars}
            modifiedVars={modifiedColors}
            saving={savingColors}
            onSave={saveColors}
            onResetAll={resetAllColorVars}
            updateCSSVar={updateColorVar}
            resetVar={resetColorVar}
            settings={settings}
          />
        )}

        {activeTab === 'debug' && (
          <DebugPanel
            cssVars={cssVars}
            computedVars={computedVars}
            varSources={varSources}
            originalVars={originalVars}
            debugInfo={debugInfo}
            settings={settings}
            testResolver={testResolver}
          />
        )}
      </AppContent>
    </AppFrame>

    {/* Panel de Configuración */}
    {showSettingsPanel && (
      <SettingsPanel
        settings={settings}
        onSettingChange={handleSettingChange}
        onClose={handleCloseSettings}
      />
    )}
  </>
  );
}