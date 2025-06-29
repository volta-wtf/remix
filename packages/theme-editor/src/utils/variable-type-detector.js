/**
 * Variable Type Detector - Identifica el tipo de valor de una variable CSS
 * y genera el preview correspondiente
 */

/**
 * Patrones para identificar diferentes tipos de variables CSS
 */
const VARIABLE_PATTERNS = {
  // Colores - patrones más amplios para detectar variables de color
  color: {
    namePatterns: [
      /^--color-/i,
      /^--tone-/i,
      /^--bg-/i,
      /^--text-/i,
      /^--border-color/i,  // Más específico para border-color
      /^--shadow-color/i,  // Más específico para shadow-color
      /-color$/i,
      /-bg$/i,
      /-text$/i,
      // Patrones específicos para variables de color comunes
      /^--foreground$/i,
      /^--background$/i,
      /^--surface$/i,
      /^--primary$/i,
      /^--secondary$/i,
      /^--accent$/i,
      /^--muted$/i,
      /^--destructive$/i,
      /^--warning$/i,
      /^--success$/i,
      /^--info$/i,
      /^--border$/i,     // Border suele ser un color
      /^--ring$/i,       // Ring suele ser un color
      /^--input$/i,      // Input suele ser un color de fondo
      /-foreground$/i,
      /-background$/i,
      /-surface$/i,
      /-primary$/i,
      /-secondary$/i,
      /-accent$/i,
      /-muted$/i,
      /-destructive$/i,
      /-warning$/i,
      /-success$/i,
      /-info$/i
    ],
    valuePatterns: [
      /^#[0-9a-f]{3,8}$/i,              // Hex colors: #fff, #ffffff, #ffffff80
      /^oklch\(/i,                      // OKLCH: oklch(0.5 0.2 120)
      /^rgb\(/i,                        // RGB: rgb(255, 255, 255)
      /^rgba\(/i,                       // RGBA: rgba(255, 255, 255, 0.5)
      /^hsl\(/i,                        // HSL: hsl(120, 100%, 50%)
      /^hsla\(/i,                       // HSLA: hsla(120, 100%, 50%, 0.5)
      /^var\(--.*color.*\)$/i,          // Referencias a otras variables de color
      /^var\(--.*tone.*\)$/i,           // Referencias a variables tone
      /^var\(--.*foreground.*\)$/i,     // Referencias a variables foreground
      /^var\(--.*background.*\)$/i,     // Referencias a variables background
      /^var\(--.*surface.*\)$/i,        // Referencias a variables surface
      /^var\(--.*primary.*\)$/i,        // Referencias a variables primary
      /^var\(--.*secondary.*\)$/i,      // Referencias a variables secondary
      /^var\(--.*accent.*\)$/i,         // Referencias a variables accent
      /^var\(--.*muted.*\)$/i,          // Referencias a variables muted
      /^var\(--.*destructive.*\)$/i,    // Referencias a variables destructive
      /^var\(--.*warning.*\)$/i,        // Referencias a variables warning
      /^var\(--.*success.*\)$/i,        // Referencias a variables success
      /^var\(--.*info.*\)$/i,           // Referencias a variables info
      /^(transparent|currentColor)$/i,   // Palabras clave de color CSS
      // Colores CSS estándar comunes (más completo)
      /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/i
    ]
  },

  // Espaciado - padding, margin, gap, etc.
  spacing: {
    namePatterns: [
      /^--spacing-/i,
      /^--gap-/i,
      /^--padding-/i,
      /^--margin-/i,
      /^--space-/i,
      /-spacing$/i,
      /-gap$/i,
      /-padding$/i,
      /-margin$/i,
      /-space$/i
    ],
    valuePatterns: [
      /^\d+(\.\d+)?(px|em|rem|%|vh|vw|ch|ex|cm|mm|in|pt|pc)$/i,
      /^calc\(/i,
      /^var\(--.*space.*\)$/i,
      /^var\(--.*gap.*\)$/i
    ]
  },

  // Tipografía - font-size, line-height, font-weight, etc.
  typography: {
    namePatterns: [
      /^--font-/i,
      /^--text-size/i,    // Más específico
      /^--text-weight/i,  // Más específico
      /^--line-height/i,
      /^--letter-spacing/i,
      /-font$/i,
      /-typography$/i
    ],
    valuePatterns: [
      /^\d+(\.\d+)?(px|em|rem|%|ex|ch|pt)$/i,  // Tamaños de fuente
      /^(normal|bold|bolder|lighter|[1-9]00)$/i, // Font weights específicos
      /^(serif|sans-serif|monospace|cursive|fantasy)$/i, // Font families genéricas
      /^"[^"]+"|'[^']+'$/,                     // Font families con comillas
      /^[a-z]+(\s*,\s*(serif|sans-serif|monospace|cursive|fantasy))$/i, // Font families con fallback
      /^(inherit|initial|unset|revert)$/i      // Valores CSS de herencia
    ]
  },

  // Bordes - border-width, border-radius, etc.
  border: {
    namePatterns: [
      /^--border-/i,
      /^--radius-/i,
      /^--rounded-/i,
      /-border$/i,
      /-radius$/i,
      /-rounded$/i
    ],
    valuePatterns: [
      /^\d+(\.\d+)?(px|em|rem|%|vh|vw)$/i,
      /^(thin|medium|thick)$/i,
      /^(solid|dashed|dotted|double|groove|ridge|inset|outset|none)$/i
    ]
  },

  // Sombras - box-shadow, text-shadow, etc.
  shadow: {
    namePatterns: [
      /^--shadow-/i,
      /^--elevation-/i,
      /-shadow$/i,
      /-elevation$/i
    ],
    valuePatterns: [
      /^\d+(\.\d+)?(px|em|rem)\s+\d+(\.\d+)?(px|em|rem)/i, // Valores de sombra básicos
      /rgba?\(/i, // Valores con rgba/rgb (común en shadows)
      /^\d+(\.\d+)?(px|em|rem)\s+\d+(\.\d+)?(px|em|rem)\s+\d+(\.\d+)?(px|em|rem)/i, // x y blur
      /^none$/i
    ]
  }
};

/**
 * Detecta el tipo de una variable CSS basándose en su nombre y valor
 * @param {string} varName - Nombre de la variable (ej: '--color-primary')
 * @param {string} value - Valor de la variable (ej: '#ff0000')
 * @returns {string} - Tipo detectado ('color', 'spacing', 'typography', 'border', 'shadow', 'default')
 */
export function detectVariableType(varName, value) {
  if (!varName || !value) {
    return 'default';
  }

  const cleanValue = value.trim();

    // Revisar cada tipo de variable con prioridad
  const typeScores = {};

  for (const [type, patterns] of Object.entries(VARIABLE_PATTERNS)) {
    let score = 0;

    // Revisar patrones del nombre (peso alto)
    const nameMatches = patterns.namePatterns.some(pattern => pattern.test(varName));
    if (nameMatches) {
      score += 10;
    }

        // Revisar patrones del valor (peso medio)
    const valueMatches = patterns.valuePatterns.some(pattern => pattern.test(cleanValue));
    if (valueMatches) {
      score += 5;

      // Bonus extra para nombres de colores CSS (muy alta confianza)
      if (type === 'color' && /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgrey|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|grey|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgrey|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/i.test(cleanValue)) {
        score += 10; // Bonus muy alto para nombres de colores CSS
      }

      // Bonus extra muy alto para valores que son claramente colores
      if (type === 'color' && (/^#[0-9a-f]{3,8}$/i.test(cleanValue) || /^(oklch|rgb|rgba|hsl|hsla)\(/i.test(cleanValue))) {
        score += 15; // Bonus muy alto para valores de color evidentes
      }
    }

    // Bonus para coincidencias muy específicas
    if (nameMatches && valueMatches) {
      score += 5;
    }

    if (score > 0) {
      typeScores[type] = score;
    }
  }

  // Retornar el tipo con mayor puntuación
  if (Object.keys(typeScores).length > 0) {
    const bestType = Object.entries(typeScores).reduce((a, b) =>
      typeScores[a[0]] > typeScores[b[0]] ? a : b
    )[0];
    return bestType;
  }

  return 'default';
}

/**
 * Genera un preview visual para una variable según su tipo
 * @param {string} type - Tipo de variable ('color', 'spacing', etc.)
 * @param {string} value - Valor de la variable
 * @param {string} varName - Nombre de la variable (opcional, para contexto adicional)
 * @returns {Object} - Objeto con propiedades para el preview { element, style, content }
 */
export function generateVariablePreview(type, value, varName = '') {
  const cleanValue = value.trim();

  switch (type) {
    case 'color':
      return generateColorPreview(cleanValue, varName);

    case 'spacing':
      return generateSpacingPreview(cleanValue, varName);

    case 'typography':
      return generateTypographyPreview(cleanValue, varName);

    case 'border':
      return generateBorderPreview(cleanValue, varName);

    case 'shadow':
      return generateShadowPreview(cleanValue, varName);

    default:
      return generateDefaultPreview(cleanValue, varName);
  }
}

/**
 * Genera preview para variables de color
 */
function generateColorPreview(value, varName) {
  // Detectar si es una referencia a variable CSS
  const isVariableReference = /^var\(/.test(value.trim());

  // Forma: cuadrado para valores directos, redondo para referencias
  const borderRadius = isVariableReference ? '50%' : '4px';

  return {
    element: 'div',
    style: {
      width: '20px',
      height: '20px',
      borderRadius: borderRadius,
      backgroundColor: value,
      border: '1px solid rgba(0, 0, 0, 0.1)',
      flexShrink: 0
    },
    content: null,
    tooltip: isVariableReference
      ? `Referencia de color: ${value}`
      : `Color: ${value}`
  };
}

/**
 * Genera preview para variables de espaciado
 */
function generateSpacingPreview(value, varName) {
  // Extraer valor numérico para el preview
  const numericValue = parseFloat(value);
  const unit = value.replace(/[\d.-]/g, '').trim() || 'px';

  // Escalar el preview para que sea visible (máximo 40px)
  let previewSize = Math.min(numericValue, 40);
  if (unit === 'rem') previewSize *= 16; // Convertir rem a px aproximado
  if (unit === 'em') previewSize *= 16;  // Convertir em a px aproximado

  return {
    element: 'div',
    style: {
      width: '24px',
      height: '24px',
      position: 'relative',
      flexShrink: 0
    },
    content: {
      type: 'spacing-bar',
      width: `${Math.max(previewSize, 4)}px`,
      height: '4px',
      backgroundColor: '#3b82f6',
      borderRadius: '2px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    tooltip: `Espaciado: ${value}`
  };
}

/**
 * Genera preview para variables de tipografía
 */
function generateTypographyPreview(value, varName) {
  const isFontSize = /^\d+(\.\d+)?(px|em|rem|pt)$/i.test(value);
  const isFontWeight = /^(normal|bold|bolder|lighter|\d{3})$/i.test(value);
  const isFontFamily = /font-family|font$/i.test(varName);

  let previewText = 'Aa';
  let previewStyle = {
    fontSize: '14px',
    lineHeight: '1',
    color: '#374151',
    fontWeight: 'normal',
    fontFamily: 'inherit'
  };

  if (isFontSize) {
    const numericValue = parseFloat(value);
    const unit = value.replace(/[\d.-]/g, '').trim();

    // Escalar el tamaño para el preview
    let previewSize = numericValue;
    if (unit === 'rem') previewSize *= 16;
    if (unit === 'em') previewSize *= 16;
    previewSize = Math.min(Math.max(previewSize, 10), 20); // Entre 10px y 20px

    previewStyle.fontSize = `${previewSize}px`;
  } else if (isFontWeight) {
    previewStyle.fontWeight = value;
  } else if (isFontFamily) {
    previewStyle.fontFamily = value.replace(/['"]/g, ''); // Remover comillas
  }

  return {
    element: 'div',
    style: {
      width: '24px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    content: {
      type: 'typography-text',
      text: previewText,
      style: previewStyle
    },
    tooltip: `Tipografía: ${value}`
  };
}

/**
 * Genera preview para variables de borde
 */
function generateBorderPreview(value, varName) {
  const isRadius = /radius|rounded/i.test(varName);

  if (isRadius) {
    // Preview para border-radius
    const numericValue = parseFloat(value) || 4;
    const radiusSize = Math.min(numericValue, 12);

    return {
      element: 'div',
      style: {
        width: '20px',
        height: '20px',
        backgroundColor: '#e5e7eb',
        border: '2px solid #9ca3af',
        borderRadius: `${radiusSize}px`,
        flexShrink: 0
      },
      content: null,
      tooltip: `Border radius: ${value}`
    };
  } else {
    // Preview para border-width o border-style
    return {
      element: 'div',
      style: {
        width: '20px',
        height: '20px',
        backgroundColor: '#f3f4f6',
        border: `${value} #9ca3af`,
        flexShrink: 0
      },
      content: null,
      tooltip: `Border: ${value}`
    };
  }
}

/**
 * Genera preview para variables de sombra
 */
function generateShadowPreview(value, varName) {
  return {
    element: 'div',
    style: {
      width: '20px',
      height: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      boxShadow: value === 'none' ? 'none' : value,
      flexShrink: 0
    },
    content: null,
    tooltip: `Shadow: ${value}`
  };
}

/**
 * Genera preview por defecto para variables no categorizadas
 */
function generateDefaultPreview(value, varName) {
  return {
    element: 'div',
    style: {
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      flexShrink: 0
    },
    content: {
      type: 'unknown-icon',
      svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="3.25" stroke="black" stroke-opacity="0.1" stroke-width="1.5"/>
        <path d="M11.1221 11.958H9.37891C9.38346 11.5479 9.41536 11.1947 9.47461 10.8984C9.53841 10.5977 9.64551 10.3265 9.7959 10.085C9.95085 9.84342 10.1559 9.60417 10.4111 9.36719C10.6253 9.17578 10.8122 8.99349 10.9717 8.82031C11.1312 8.64714 11.2565 8.4694 11.3477 8.28711C11.4388 8.10026 11.4844 7.8929 11.4844 7.66504C11.4844 7.40072 11.4434 7.18197 11.3613 7.00879C11.2839 6.83105 11.1654 6.69661 11.0059 6.60547C10.8509 6.51432 10.6549 6.46875 10.418 6.46875C10.222 6.46875 10.0397 6.51204 9.87109 6.59863C9.70247 6.68066 9.56348 6.80827 9.4541 6.98145C9.34928 7.15462 9.2946 7.38249 9.29004 7.66504H7.30762C7.32129 7.04069 7.46484 6.52572 7.73828 6.12012C8.01628 5.70996 8.3877 5.4069 8.85254 5.21094C9.31738 5.01042 9.83919 4.91016 10.418 4.91016C11.056 4.91016 11.6029 5.01497 12.0586 5.22461C12.5143 5.42969 12.863 5.73275 13.1045 6.13379C13.346 6.53027 13.4668 7.01335 13.4668 7.58301C13.4668 7.97949 13.3893 8.33268 13.2344 8.64258C13.0794 8.94792 12.8766 9.23275 12.626 9.49707C12.3753 9.76139 12.0996 10.0348 11.7988 10.3174C11.5391 10.5498 11.3613 10.7936 11.2656 11.0488C11.1745 11.304 11.1266 11.6071 11.1221 11.958ZM9.17383 14.0703C9.17383 13.7786 9.27409 13.5371 9.47461 13.3457C9.67513 13.1497 9.94401 13.0518 10.2812 13.0518C10.6139 13.0518 10.8805 13.1497 11.0811 13.3457C11.2861 13.5371 11.3887 13.7786 11.3887 14.0703C11.3887 14.3529 11.2861 14.5921 11.0811 14.7881C10.8805 14.984 10.6139 15.082 10.2812 15.082C9.94401 15.082 9.67513 14.984 9.47461 14.7881C9.27409 14.5921 9.17383 14.3529 9.17383 14.0703Z" fill="black" fill-opacity="0.1"/>
      </svg>`
    },
    tooltip: `Valor no reconocido: ${value}`
  };
}

/**
 * Función de utilidad para obtener información completa de una variable
 * @param {string} varName - Nombre de la variable
 * @param {string} value - Valor de la variable
 * @returns {Object} - Objeto con type, preview y metadata
 */
export function analyzeVariable(varName, value) {
  const type = detectVariableType(varName, value);
  const preview = generateVariablePreview(type, value, varName);

  return {
    name: varName,
    value: value,
    type: type,
    preview: preview,
    metadata: {
      isColor: type === 'color',
      isSpacing: type === 'spacing',
      isTypography: type === 'typography',
      isBorder: type === 'border',
      isShadow: type === 'shadow',
      isDefault: type === 'default'
    }
  };
}