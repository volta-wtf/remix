import type { TextStyle } from '@/types';

// Cache para evitar re-procesamiento innecesario de TextStyles
const injectedStyles = new Set<string>();
const styleHashes = new Map<string, string>();

// Función para generar hash del estilo
function generateStyleHash(textStyle: TextStyle): string {
  const styleString = JSON.stringify({
    id: textStyle.id,
    style: textStyle.style,
    before: textStyle.before,
    after: textStyle.after
  });
  return btoa(styleString).replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
}

/**
 * Inyecta CSS dinámicamente para TextStyles
 *
 * NOTA: Esta función es SOLO para TextStyles (datos), NO para TextClasses (archivos CSS).
 * Los TextClasses ya están cargados estáticamente via @import en styles.css
 *
 * @param textStyle - TextStyle con propiedades style/before/after para inyectar
 * @returns className generado para usar en componentes
 */
export function injectTextStyleCSS(textStyle: TextStyle): string {
  const { id, style, before, after } = textStyle;
  const className = `text-style-${id.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const styleElementId = `text-style-${id}`;

  // Generar hash del contenido del estilo
  const newHash = generateStyleHash(textStyle);
  const existingHash = styleHashes.get(id);

  // Si ya existe y no ha cambiado, no hacer nada
  if (existingHash === newHash && injectedStyles.has(id)) {
    return className;
  }

  // Remover estilo existente si existe
  const existingStyle = document.getElementById(styleElementId);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Generar CSS base (TODOS los textStyles tienen propiedades style)
  const cssProperties = Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  ${cssKey}: ${value};`;
    })
    .join('\n');

  let cssText = `.${className} {
${cssProperties}
}`;

  // Agregar pseudo-elementos si existen
  if (before) {
    const { content, ...beforeStyles } = before;
    const beforeProperties = Object.entries(beforeStyles)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    const beforeContentValue = content?.startsWith('attr(') ? content : `"${content || ''}"`;
    cssText += `\n\n.${className}::before {
  content: ${beforeContentValue};
${beforeProperties}
}`;
  }

  if (after) {
    const { content, ...afterStyles } = after;
    const afterProperties = Object.entries(afterStyles)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    const afterContentValue = content?.startsWith('attr(') ? content : `"${content || ''}"`;
    cssText += `\n\n.${className}::after {
  content: ${afterContentValue};
${afterProperties}
}`;
  }

  // Inyectar CSS
  const styleElement = document.createElement('style');
  styleElement.id = styleElementId;
  styleElement.textContent = cssText;
  document.head.appendChild(styleElement);

  // Actualizar cache
  injectedStyles.add(id);
  styleHashes.set(id, newHash);

  return className;
}

/**
 * Inyecta múltiples TextStyles de forma batch
 * Útil para inyección inicial al cargar la app
 */
export function injectMultipleTextStyles(textStyles: TextStyle[]): void {
  textStyles.forEach(textStyle => {
    injectTextStyleCSS(textStyle);
  });
}

/**
 * Verifica si un TextStyle necesita inyección de CSS (todos la necesitan)
 */
export function needsInjection(textStyle: TextStyle): boolean {
  return true; // Todos los TextStyles necesitan inyección
}

/**
 * Función para limpiar cache (útil para testing o reset)
 */
export function clearTextStyleCache(): void {
  injectedStyles.clear();
  styleHashes.clear();
}

/**
 * Función para verificar si un estilo ya está inyectado
 */
export function isStyleInjected(id: string): boolean {
  return injectedStyles.has(id);
}