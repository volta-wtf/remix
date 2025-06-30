import { styles } from './panel-styles.js';

// Función para convertir camelCase a kebab-case
const camelToKebab = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

// Función para procesar objeto de estilos y separar estados
const processStyleObject = (styleObj) => {
  const baseStyles = {};
  const stateStyles = {};

  Object.entries(styleObj).forEach(([key, value]) => {
    if (key.startsWith(':')) {
      // Es un estado CSS (ej: ':hover', ':focus')
      stateStyles[key] = value;
    } else {
      // Es un estilo base
      baseStyles[key] = value;
    }
  });

  return { baseStyles, stateStyles };
};

// Función para convertir objeto de estilos a CSS string
const styleObjectToCSS = (styleObj) => {
  return Object.entries(styleObj)
    .map(([prop, value]) => `${camelToKebab(prop)}: ${value};`)
    .join(' ');
};

// Función principal para generar e inyectar clases CSS dinámicamente
export const injectDynamicStyles = () => {
  const styleId = 'theme-editor-dynamic-styles';

  // Si ya existe, no duplicar
  if (document.getElementById(styleId)) return;

  let cssRules = '';

  // Generar CSS dinámicamente desde el objeto styles
  Object.entries(styles).forEach(([className, styleObj]) => {
    const { baseStyles, stateStyles } = processStyleObject(styleObj);

    // Generar clase base
    if (Object.keys(baseStyles).length > 0) {
      cssRules += `.te-${className} { ${styleObjectToCSS(baseStyles)} }\n`;
    }

    // Generar estados CSS
    Object.entries(stateStyles).forEach(([state, stateStyleObj]) => {
      cssRules += `.te-${className}${state} { ${styleObjectToCSS(stateStyleObj)} }\n`;
    });
  });

  // CSS adicional para modificadores personalizados
  const additionalCSS = `
    /* Modificadores especiales */
    .te-tab--active {
      background: rgba(0, 0, 0, 0.05) !important;
      font-weight: 600 !important;
      color: #3b82f6 !important;
    }

    .te-tab--active:hover:not(:disabled) {
      background: rgba(59, 130, 246, 0.1) !important;
    }

    .te-variable--modified {
      background-color: rgba(60, 130, 240, 0.05) !important;
      border-right: 1px solid rgba(60, 130, 240, 0.6) !important;
    }

    .te-variable--modified:hover {
      background-color: rgba(60, 130, 240, 0.1) !important;
    }

    .te-save-button--saving {
      opacity: 0.7 !important;
      cursor: wait !important;
      pointer-events: none !important;
    }

    .te-save-button--saving::after {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 8px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: te-spin 1s linear infinite;
    }

    @keyframes te-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Estados específicos que no están en styles */
    .te-section-header:hover {
      background-color: rgba(0, 0, 0, 0.03) !important;
    }

    .te-collapse-icon--collapsed {
      transform: rotate(-90deg) !important;
    }
  `;

  const fullCSS = cssRules + '\n' + additionalCSS;

  // Crear e inyectar el elemento style
  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = fullCSS;
  document.head.appendChild(styleElement);

  console.log('🎨 Estilos dinámicos con estados CSS inyectados');
};

// Función helper para generar nombres de clases
export const cn = (baseClass, modifiers = {}) => {
  let className = `te-${baseClass}`;

  // Agregar modificadores activos
  Object.entries(modifiers).forEach(([modifier, isActive]) => {
    if (isActive) {
      className += ` te-${baseClass}--${modifier}`;
    }
  });

  return className;
};

// Función helper simplificada para clases básicas
export const cls = (className) => `te-${className}`;

// Función para limpiar estilos (útil para desarrollo)
export const cleanupDynamicStyles = () => {
  const existingStyle = document.getElementById('theme-editor-dynamic-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
};

// Función para debugging - mostrar CSS generado
export const logGeneratedCSS = () => {
  let cssRules = '';

  Object.entries(styles).forEach(([className, styleObj]) => {
    const { baseStyles, stateStyles } = processStyleObject(styleObj);

    if (Object.keys(baseStyles).length > 0) {
      cssRules += `.te-${className} { ${styleObjectToCSS(baseStyles)} }\n`;
    }

    Object.entries(stateStyles).forEach(([state, stateStyleObj]) => {
      cssRules += `.te-${className}${state} { ${styleObjectToCSS(stateStyleObj)} }\n`;
    });
  });

  console.log('📋 CSS Generado con estados:', cssRules);
  return cssRules;
};

// Helpers específicos
export const variableClass = (isModified = false) => {
  return cn('variable', { modified: isModified });
};

export const saveButtonClass = (disabled = false, saving = false) => {
  if (disabled || saving) {
    return cn('saveButton', { saving });
  }
  return cls('saveButton');
};

export const tabClass = (isActive = false) => {
  return cn('tab', { active: isActive });
};

export const sectionHeaderClass = (isCollapsed = false) => {
  return cls('sectionHeader');
};

export const collapseIconClass = (isCollapsed = false) => {
  return cn('collapseIcon', { collapsed: isCollapsed });
};