import { readFileSync } from 'fs';
import { findGlobalsCss } from './css-finder.js';

/**
 * Parsea variables CSS de un archivo de texto
 * @param {string} cssContent - Contenido del archivo CSS
 * @returns {Object} - { variables: {}, sources: {} }
 */
export function parseVariablesFromCSS(cssContent) {
  const variables = {};
  const sources = {};

    // Buscar específicamente bloques :root
  const rootBlockRegex = /:root\s*\{([^{}]*)\}/g;
  const darkBlockRegex = /\.dark\s*\{([^{}]*)\}/g;

  // Procesar bloque :root
  let rootMatch;
  while ((rootMatch = rootBlockRegex.exec(cssContent)) !== null) {
    const declarations = rootMatch[1];
    const varRegex = /--([\w-]+)\s*:\s*([^;]+);?/g;

    let varMatch;
    while ((varMatch = varRegex.exec(declarations)) !== null) {
      const varName = `--${varMatch[1]}`;
      const varValue = varMatch[2].trim();

      variables[varName] = varValue;
      sources[varName] = {
        selector: ':root',
        type: 'root',
        file: 'globals.css'
      };
    }
  }

  // Procesar bloque .dark (si existe)
  let darkMatch;
  while ((darkMatch = darkBlockRegex.exec(cssContent)) !== null) {
    const declarations = darkMatch[1];
    const varRegex = /--([\w-]+)\s*:\s*([^;]+);?/g;

    let varMatch;
    while ((varMatch = varRegex.exec(declarations)) !== null) {
      const varName = `--${varMatch[1]}`;
      const varValue = varMatch[2].trim();

      // Solo agregar si no existe ya (prioridad a :root)
      if (!variables[varName]) {
        variables[varName] = varValue;
        sources[varName] = {
          selector: '.dark',
          type: 'dark-theme',
          file: 'globals.css'
        };
      }
    }
  }

  return { variables, sources };
}

/**
 * Lee y parsea variables CSS del archivo globals.css
 * @param {string} startDir - Directorio de inicio (opcional)
 * @returns {Object} - { variables: {}, sources: {}, filePath: string }
 */
export function extractVariablesFromGlobalsCss(startDir = process.cwd()) {
  try {
    // Usar css-finder para encontrar el archivo
    const globalsCssPath = findGlobalsCss(startDir);

    // Leer el contenido del archivo
    const cssContent = readFileSync(globalsCssPath, 'utf-8');

    // Parsear variables
    const { variables, sources } = parseVariablesFromCSS(cssContent);

    // Agregar información del archivo a los sources
    Object.keys(sources).forEach(varName => {
      sources[varName].filePath = globalsCssPath;
    });

    console.log(`✅ Extraídas ${Object.keys(variables).length} variables de: ${globalsCssPath}`);

    return {
      variables,
      sources,
      filePath: globalsCssPath
    };
  } catch (error) {
    console.error('❌ Error extrayendo variables del sistema de archivos:', error.message);
    return {
      variables: {},
      sources: {},
      filePath: null,
      error: error.message
    };
  }
}

/**
 * Obtiene todas las variables CSS de forma segura
 * @param {string} startDir - Directorio de inicio
 * @returns {Object} - Resultado con variables o información de error
 */
export function getVariablesFromFileSystem(startDir = process.cwd()) {
  const result = extractVariablesFromGlobalsCss(startDir);

  if (result.error) {
    console.warn(`⚠️ No se pudieron extraer variables: ${result.error}`);
    return {
      variables: {},
      sources: {},
      error: result.error
    };
  }

  return result;
}