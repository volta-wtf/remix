/**
 * CSS Resolver - Resuelve recursivamente variables CSS y funciones personalizadas
 */

/**
 * Resuelve recursivamente una variable CSS
 * @param {string} value - Valor a resolver (ej: "var(--primary)" o "--alpha(var(--ambient)/20%)")
 * @param {Object} cssVars - Mapa de variables CSS disponibles
 * @param {Object} computedVars - Mapa de variables computadas por el navegador
 * @param {Set} resolving - Set para detectar referencias circulares
 * @returns {string} - Valor resuelto
 */
export function resolveCSSValue(value, cssVars = {}, computedVars = {}, resolving = new Set()) {
  if (!value || typeof value !== 'string') {
    return value;
  }

  const trimmedValue = value.trim();

  // Si ya está resolviendo esta variable, evitar ciclo infinito
  if (resolving.has(trimmedValue)) {
    return trimmedValue;
  }

  // Marcar como resolviendo
  const newResolving = new Set(resolving);
  newResolving.add(trimmedValue);

  try {
    // 1. Resolver funciones --alpha() personalizadas
    const alphaResolved = resolveAlphaFunction(trimmedValue, cssVars, computedVars, newResolving);
    if (alphaResolved !== trimmedValue) {
      return alphaResolved;
    }

    // 2. Resolver referencias var()
    const varResolved = resolveVarReferences(trimmedValue, cssVars, computedVars, newResolving);
    if (varResolved !== trimmedValue) {
      return varResolved;
    }

    // 3. Si no hay nada que resolver, devolver valor original
    return trimmedValue;

  } catch (error) {
    console.warn(`Error resolviendo valor CSS "${trimmedValue}":`, error);
    return trimmedValue;
  }
}

/**
 * Resuelve funciones --alpha() personalizadas
 * Convierte "--alpha(var(--color)/50%)" a "rgba(...)"
 */
function resolveAlphaFunction(value, cssVars, computedVars, resolving) {
  const alphaPattern = /^--alpha\s*\(\s*([^/]+)\s*\/\s*(\d+(?:\.\d+)?)\s*%\s*\)$/i;
  const match = value.match(alphaPattern);

  if (!match) {
    return value;
  }

  const [, colorValue, alphaPercentage] = match;
  const alphaDecimal = parseFloat(alphaPercentage) / 100;

  // Resolver el color base recursivamente
  const resolvedColor = resolveCSSValue(colorValue.trim(), cssVars, computedVars, resolving);

  // Intentar convertir el color resuelto a rgba
  const rgbaColor = convertToRGBA(resolvedColor, alphaDecimal);

  return rgbaColor || value;
}

/**
 * Resuelve referencias var() en el valor
 */
function resolveVarReferences(value, cssVars, computedVars, resolving) {
  // Patrón para detectar var(--nombre, fallback)
  const varPattern = /var\s*\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\s*\)/g;

  let resolved = value;
  let hasVarReferences = false;

  resolved = resolved.replace(varPattern, (match, varName, fallback) => {
    hasVarReferences = true;

    // Intentar usar el valor del CSS fuente primero, luego el computado
    let varValue = cssVars[varName] || computedVars[varName];

    // Si no se encuentra la variable, usar fallback
    if (varValue === undefined || varValue === '') {
      if (fallback) {
        varValue = fallback.trim();
      } else {
        console.warn(`Variable CSS no encontrada: ${varName}`);
        return match; // Devolver la referencia original
      }
    }

    // Resolver recursivamente el valor de la variable
    return resolveCSSValue(varValue, cssVars, computedVars, resolving);
  });

  // Si se hicieron reemplazos y aún quedan referencias var(), intentar otra pasada
  if (hasVarReferences && resolved !== value && /var\s*\(/.test(resolved)) {
    return resolveVarReferences(resolved, cssVars, computedVars, resolving);
  }

  return resolved;
}

/**
 * Convierte un color a formato RGBA con la opacidad especificada
 */
function convertToRGBA(color, alpha = 1) {
  if (!color || typeof color !== 'string') {
    return null;
  }

  const trimmedColor = color.trim();

  // Si ya es rgba, actualizar el alpha
  const rgbaMatch = trimmedColor.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+)?\s*\)$/i);
  if (rgbaMatch) {
    const [, r, g, b] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Si es hex, convertir a rgba
  const hexMatch = trimmedColor.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    let r, g, b;

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Si es un color con nombre, intentar con un elemento temporal
  if (isValidCSSColor(trimmedColor)) {
    const rgba = colorNameToRGBA(trimmedColor, alpha);
    if (rgba) return rgba;
  }

  // Si no se puede convertir, devolver null
  return null;
}

/**
 * Verifica si un string es un color CSS válido
 */
function isValidCSSColor(color) {
  const colorNames = [
    'transparent', 'currentColor', 'inherit',
    'black', 'white', 'red', 'green', 'blue', 'yellow', 'cyan', 'magenta',
    'gray', 'grey', 'orange', 'purple', 'pink', 'brown', 'maroon', 'navy',
    'olive', 'lime', 'aqua', 'teal', 'silver', 'fuchsia'
  ];

  return colorNames.includes(color.toLowerCase());
}

/**
 * Convierte un nombre de color CSS a RGBA usando un elemento temporal
 */
function colorNameToRGBA(colorName, alpha = 1) {
  try {
    // Crear un elemento temporal para obtener el color computado
    const tempElement = document.createElement('div');
    tempElement.style.color = colorName;
    document.body.appendChild(tempElement);

    const computedColor = getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    // Extraer RGB del color computado
    const rgbMatch = computedColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return null;
  } catch (error) {
    console.warn(`Error convirtiendo color "${colorName}":`, error);
    return null;
  }
}

/**
 * Resuelve recursivamente todas las variables en un objeto
 * @param {Object} cssVars - Variables CSS originales
 * @param {Object} computedVars - Variables computadas por el navegador
 * @returns {Object} - Variables con valores resueltos
 */
export function resolveAllVariables(cssVars, computedVars) {
  const resolved = {};

  // Ordenar variables para resolver dependencias primero
  const sortedVars = topologicalSort(cssVars);

  for (const varName of sortedVars) {
    const originalValue = cssVars[varName];
    const computedValue = computedVars[varName];

    // Intentar resolver el valor original primero
    let resolvedValue = resolveCSSValue(originalValue, resolved, computedVars);

    // Si la resolución no cambió mucho el valor, usar el computado del navegador
    if (resolvedValue === originalValue && computedValue && computedValue !== originalValue) {
      resolvedValue = computedValue;
    }

    resolved[varName] = resolvedValue;
  }

  return resolved;
}

/**
 * Ordenamiento topológico simple para resolver dependencias
 */
function topologicalSort(cssVars) {
  const varNames = Object.keys(cssVars);
  const dependencies = {};

  // Construir grafo de dependencias
  varNames.forEach(varName => {
    dependencies[varName] = [];
    const value = cssVars[varName];

    if (typeof value === 'string') {
      const varPattern = /var\s*\(\s*(--[\w-]+)/g;
      let match;
      while ((match = varPattern.exec(value)) !== null) {
        const depVar = match[1];
        if (cssVars[depVar] !== undefined) {
          dependencies[varName].push(depVar);
        }
      }
    }
  });

  // Ordenamiento simple: variables sin dependencias primero
  const sorted = [];
  const visited = new Set();

  function visit(varName) {
    if (visited.has(varName)) return;
    visited.add(varName);

    dependencies[varName]?.forEach(dep => visit(dep));
    sorted.push(varName);
  }

  varNames.forEach(visit);

  return sorted;
}

/**
 * Función de utilidad para testing
 */
export function testResolver() {
  const cssVars = {
    '--primary': '#3b82f6',
    '--ambient': 'var(--primary)',
    '--shadow-tint': 'var(--ambient)',
    '--shadow-soft': '--alpha(var(--shadow-tint)/5%)',
    '--complex': '--alpha(var(--primary)/20%)'
  };

  const computedVars = {
    '--primary': '#3b82f6',
    '--ambient': '#3b82f6',
    '--shadow-tint': '#3b82f6'
  };

  console.log('🧪 Testing CSS Resolver:');

  Object.entries(cssVars).forEach(([varName, value]) => {
    const resolved = resolveCSSValue(value, cssVars, computedVars);
    console.log(`${varName}: "${value}" → "${resolved}"`);
  });

  const allResolved = resolveAllVariables(cssVars, computedVars);
  console.log('📊 All resolved:', allResolved);

  return allResolved;
}