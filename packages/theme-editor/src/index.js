import './register.js';

// Exportar utilidades del detector de variables para uso programático
export {
  detectVariableType,
  analyzeVariable
} from './utils/variable-type-detector.js';

export {
  generateVariablePreview
} from './utils/variable-preview-generator.js';

// Exportar utilidades de búsqueda CSS
export {
  findGlobalsCss,
  hasGlobalsCss,
  findGlobalsCssSafe
} from './utils/css-finder.js';

// Exportar utilidades de valores computados
export {
  getComputedCSSVariable,
  getComputedCSSVariables,
  getComputedValueForPreview
} from './utils/computed-style-utils.js';