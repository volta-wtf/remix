import http from 'http';
import express from 'express';
import cors from 'cors';
import { resolve, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { promisify } from 'util';
import net from 'net';
import { findGlobalsCss } from './utils/css-finder.js';
import { getVariablesFromFileSystem } from './utils/css-parser.js';
import { NETWORK, API_ENDPOINTS, CSS, DEV } from './config/constants.js';

// ---- Función para encontrar puerto disponible ----
async function findAvailablePort(startPort = NETWORK.DEFAULT_PORT) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Puerto ocupado, probar el siguiente
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

// ---- Theme Editor UI Server ----
const app = express();
let PORT = NETWORK.DEFAULT_PORT; // Puerto por defecto, será actualizado dinámicamente

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// Servir bundle completo del theme editor
app.use('/theme-editor.js', (_req, res) => {
  res.sendFile(resolve(__dirname, '../dist/theme-editor.js'));
});

// Endpoint de debug para diagnosticar problemas
app.get(API_ENDPOINTS.DEBUG_CSS, (req, res) => {
  try {
    const cssFilePath = findGlobalsCss();
    const cssContent = readFileSync(cssFilePath, 'utf8');

    // Buscar variables CSS
    const variableMatches = cssContent.match(/--[\w-]+\s*:\s*[^;]+/g) || [];

    res.json({
      success: true,
      cssFilePath,
      cssFileSize: cssContent.length,
      totalVariables: variableMatches.length,
      variables: variableMatches.slice(0, 10), // Primeras 10 para no sobrecargar
      preview: cssContent.substring(0, 500) + '...'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint de debug para diagnosticar stylesheets del DOM
app.get(API_ENDPOINTS.DEBUG_STYLESHEETS, (req, res) => {
  try {
    // Como este endpoint se ejecuta en el servidor, devolverá información del archivo
    const cssFilePath = findGlobalsCss();
    const cssContent = readFileSync(cssFilePath, 'utf8');

    // Buscar variables CSS con regex más detallado
    const rootVarsMatch = cssContent.match(/:root\s*{([^}]+)}/g);
    const darkVarsMatch = cssContent.match(/\.dark\s*{([^}]+)}/g);

    let rootVariables = [];
    let darkVariables = [];

    if (rootVarsMatch) {
      rootVarsMatch.forEach(block => {
        const vars = block.match(/--[\w-]+\s*:\s*[^;]+/g) || [];
        rootVariables = rootVariables.concat(vars);
      });
    }

    if (darkVarsMatch) {
      darkVarsMatch.forEach(block => {
        const vars = block.match(/--[\w-]+\s*:\s*[^;]+/g) || [];
        darkVariables = darkVariables.concat(vars);
      });
    }

    res.json({
      success: true,
      cssFilePath,
      cssFileSize: cssContent.length,
      hasRootBlock: !!rootVarsMatch,
      hasDarkBlock: !!darkVarsMatch,
      rootVariables: rootVariables.length,
      darkVariables: darkVariables.length,
      sampleRootVars: rootVariables.slice(0, 5),
      sampleDarkVars: darkVariables.slice(0, 5),
      preview: cssContent.substring(0, 800) + '...'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint para guardar variables CSS
app.post(API_ENDPOINTS.SAVE_CSS, (req, res) => {
  try {
    const { variables, activeTheme } = req.body;
    console.log(`${DEV.LOG_PREFIXES.SAVE} Guardando variables CSS:`, variables);
    console.log(`${DEV.LOG_PREFIXES.THEME} Tema activo:`, activeTheme);

    if (!variables || Object.keys(variables).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionaron variables para guardar'
      });
    }

    // Buscar el archivo globals.css dinámicamente
    const cssFilePath = findGlobalsCss();
    console.log('🔍 Archivo CSS encontrado:', cssFilePath);

    // Leer el archivo CSS actual
    let cssContent = readFileSync(cssFilePath, 'utf8');
    console.log('📄 Archivo CSS leído, tamaño:', cssContent.length, 'caracteres');

    let updatedCount = 0;

    // Determinar el selector base según el tema activo
    const targetSelector = activeTheme === 'dark' ? CSS.SELECTORS.DARK : CSS.SELECTORS.ROOT;
    console.log(`${DEV.LOG_PREFIXES.SEARCH} Selector objetivo:`, targetSelector);

    // Procesar cada variable con lógica inteligente de creación/actualización
    Object.entries(variables).forEach(([varName, newValue]) => {
      console.log(`\n🔄 Procesando variable: ${varName} = ${newValue}`);
      console.log(`🎯 Tema activo: ${activeTheme}, Selector objetivo: ${targetSelector}`);

      // Escapar caracteres especiales para regex
      const escapedVarName = varName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

      // Buscar todas las ocurrencias de esta variable en el CSS
      const varRegex = new RegExp(`(\\s*${escapedVarName}\\s*:\\s*)[^;\\n]+`, 'g');
      let match;
      const matches = [];

      while ((match = varRegex.exec(cssContent)) !== null) {
      // Nota: RegExp.exec devuelve la posición de la coincidencia en `match.index`,
      // mientras que `match.start` solo está disponible cuando se usan índices (`/d`).
      // Usar `match.index` garantiza que calculemos correctamente el texto previo
      // y, por ende, identifiquemos el selector más cercano. Esto evita que se
      // añadan variables duplicadas porque el sistema creía que la variable no
      // existía en el selector objetivo.
      const beforeVariable = cssContent.substring(0, match.index);
      const rootMatch = beforeVariable.lastIndexOf(':root');
      const darkMatch = beforeVariable.lastIndexOf('.dark');
      const lightMatch = beforeVariable.lastIndexOf('.light');

      let closestSelector = null;
      let closestPosition = -1;

      // Encontrar el selector más cercano hacia atrás
      if (rootMatch !== -1 && rootMatch > closestPosition) {
        closestSelector = ':root';
        closestPosition = rootMatch;
      }
      if (darkMatch !== -1 && darkMatch > closestPosition) {
        closestSelector = '.dark';
        closestPosition = darkMatch;
      }
      if (lightMatch !== -1 && lightMatch > closestPosition) {
        closestSelector = '.light';
        closestPosition = lightMatch;
      }

      // Si no se encontró ningún selector, asumir :root por defecto
      if (closestSelector === null) {
        closestSelector = ':root';
      }

      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        fullMatch: match[0],
        prefix: match[1],
        selector: closestSelector,
        position: closestPosition
      });
    }

      console.log(`📍 Encontradas ${matches.length} ocurrencias de ${varName}`);
      matches.forEach((match, i) => {
        console.log(`  📌 Ocurrencia ${i + 1}: selector=${match.selector}, posición=${match.start}`);
      });

      // Buscar si la variable ya existe en el selector objetivo
      const existsInTargetSelector = matches.some(match => match.selector === targetSelector);
      console.log(`🔍 ¿Variable ${varName} existe en ${targetSelector}? ${existsInTargetSelector}`);

      if (existsInTargetSelector) {
        console.log(`✅ Variable ${varName} existe en ${targetSelector}, actualizando...`);

        // Filtrar solo las coincidencias del selector objetivo y ordenar por posición (desde el final)
        const targetMatches = matches.filter(match => match.selector === targetSelector)
                                    .sort((a, b) => b.start - a.start); // Orden descendente para evitar problemas de índices

        // Actualizar cada coincidencia desde el final hacia el principio
        targetMatches.forEach(match => {
          const beforeMatch = cssContent.substring(0, match.start);
          const afterMatch = cssContent.substring(match.end);
          const newVariableDeclaration = match.prefix + newValue;

          cssContent = beforeMatch + newVariableDeclaration + afterMatch;
          updatedCount++;
          console.log(`✅ Variable actualizada: ${varName} = ${newValue} en ${targetSelector} (posición ${match.start})`);
        });
              } else {
          console.log(`🆕 Variable ${varName} NO existe en ${targetSelector}, creando...`);

          // Buscar o crear el bloque del selector objetivo
          const escapedSelector = targetSelector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const selectorRegex = new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`, 'g');
          console.log(`🔎 Buscando selector con regex: ${selectorRegex.source}`);
          const selectorMatch = selectorRegex.exec(cssContent);
          console.log(`📦 ¿Selector ${targetSelector} encontrado?`, !!selectorMatch);

                  if (selectorMatch) {
            // El selector existe, agregar la variable al final del bloque
            console.log(`📦 Selector ${targetSelector} existe, agregando variable...`);

            const fullMatch = selectorMatch[0]; // Todo el bloque completo
            const blockContent = selectorMatch[1]; // Solo el contenido entre {}
            const beforeBlock = cssContent.substring(0, selectorMatch.index);
            const afterBlock = cssContent.substring(selectorMatch.index + fullMatch.length);

            // Agregar la variable con indentación apropiada al final del contenido
            const newVariable = `\n  ${varName}: ${newValue};`;
            const newBlockContent = blockContent + newVariable;
            const newBlock = `${targetSelector} {${newBlockContent}\n}`;

            cssContent = beforeBlock + newBlock + afterBlock;
            updatedCount++;

            console.log(`✅ Variable creada: ${varName} = ${newValue} en ${targetSelector}`);
        } else {
          // El selector no existe, crearlo al final del archivo
          console.log(`🏗️ Selector ${targetSelector} no existe, creando bloque completo...`);

          const newBlock = `\n\n${targetSelector} {\n  ${varName}: ${newValue};\n}`;
          cssContent += newBlock;
          updatedCount++;

          console.log(`✅ Bloque y variable creados: ${varName} = ${newValue} en ${targetSelector}`);
        }
      }
    });

    // Escribir el archivo actualizado solo si hubo cambios
    if (updatedCount > 0) {
      writeFileSync(cssFilePath, cssContent, 'utf8');
      console.log(`✅ Archivo CSS guardado exitosamente. ${updatedCount} variables actualizadas en ${targetSelector}.`);
    } else {
      console.log('⚠️ No se realizaron cambios en el archivo CSS');
    }

    res.json({
      success: true,
      message: `Variables CSS guardadas exitosamente en ${targetSelector}. ${updatedCount} de ${Object.keys(variables).length} variables actualizadas.`,
      updatedCount: updatedCount,
      totalRequested: Object.keys(variables).length,
      targetSelector: targetSelector
    });

  } catch (error) {
    console.error('❌ Error al guardar variables CSS:', error);
    console.error('Stack trace:', error.stack);

    res.status(500).json({
      success: false,
      message: 'Error al guardar variables CSS',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Endpoint para obtener variables CSS del sistema de archivos
app.get(API_ENDPOINTS.GET_VARIABLES || '/api/variables', (req, res) => {
  try {
    console.log('🔍 Obteniendo variables CSS del sistema de archivos...');

    const result = getVariablesFromFileSystem();

    if (result.error) {
      return res.status(500).json({
        success: false,
        error: result.error,
        variables: {},
        sources: {}
      });
    }

    console.log(`✅ Enviando ${Object.keys(result.variables).length} variables al cliente`);

    res.json({
      success: true,
      variables: result.variables,
      sources: result.sources,
      filePath: result.filePath,
      totalVariables: Object.keys(result.variables).length
    });
  } catch (error) {
    console.error('❌ Error obteniendo variables:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      variables: {},
      sources: {}
    });
  }
});

// Endpoint de estado para verificar que el servidor está activo
app.get(API_ENDPOINTS.STATUS, (_req, res) => {
  res.json({ status: 'active', message: 'Theme Editor server running', port: PORT });
});

// ---- Auto-inyección del Theme Editor ----
function setupAutoInjection() {
  const { writeFileSync, existsSync, readFileSync, mkdirSync } = require('fs');
  const { join } = require('path');

  // Detectar el directorio de la app actual
  const appDir = process.cwd();

  // Verificar que es una app Next.js
  if (!existsSync(join(appDir, 'next.config.js')) && !existsSync(join(appDir, 'next.config.mjs'))) {
    console.log('⚠️ No se detectó una app Next.js en el directorio actual');
    return;
  }

  console.log('🎯 App Next.js detectada, configurando auto-inyección...');

  // Crear script de auto-inyección en public/
  const autoInjectScript = `// Auto-inyector del Theme Editor
(function() {
  if (typeof window === 'undefined') return;

  const port = ${PORT};
  const scriptUrl = \`http://localhost:\${port}/theme-editor.js\`;

  // Verificar si ya está cargado
  if (document.querySelector(\`script[src="\${scriptUrl}"]\`)) return;

  console.log(\`🔌 Auto-inyectando Theme Editor desde puerto \${port}...\`);

  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  script.onload = () => console.log('✅ Theme Editor cargado automáticamente');
  script.onerror = () => console.warn(\`⚠️ Error cargando Theme Editor desde puerto \${port}\`);

  (document.head || document.documentElement).appendChild(script);
})();
`;

  try {
    // Crear directorio public si no existe
    const publicDir = join(appDir, 'public');
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    // Crear script de auto-inyección
    writeFileSync(join(publicDir, 'theme-editor-auto.js'), autoInjectScript);
    console.log('✅ Script de auto-inyección creado en /public');

    // Crear un _document.js temporal si no existe (para App Router)
    const appLayoutPath = join(appDir, 'app', 'layout.tsx');
    if (existsSync(appLayoutPath)) {
      // App Router - modificar layout temporalmente
      let layoutContent = readFileSync(appLayoutPath, 'utf8');

      // Solo agregar si no existe ya
      if (!layoutContent.includes('theme-editor-auto.js')) {
        // Hacer backup
        writeFileSync(join(appDir, 'layout.theme-editor-backup.tsx'), layoutContent);

        // Agregar script antes de </body>
        const scriptTag = `
        {/* Auto-inyección del Theme Editor */}
        {process.env.NODE_ENV === 'development' && (
          <script src="/theme-editor-auto.js" async />
        )}`;

        if (layoutContent.includes('</body>')) {
          layoutContent = layoutContent.replace('</body>', `${scriptTag}\n        </body>`);
        } else {
          layoutContent = layoutContent.replace('</html>', `      </body>\n    </html>`);
          layoutContent = layoutContent.replace('</body>', `${scriptTag}\n      </body>`);
        }

        writeFileSync(appLayoutPath, layoutContent);
        console.log('✅ Layout modificado temporalmente para auto-inyección');
      }
    }

    console.log('🚀 Auto-inyección configurada exitosamente');
    console.log('💡 El Theme Editor se cargará automáticamente');
    console.log('🧹 Los archivos temporales se limpiarán al cerrar el servidor');

  } catch (error) {
    console.error('❌ Error configurando auto-inyección:', error.message);
  }
}

// Función para inicializar el servidor con puerto dinámico
async function startServer() {
  try {
    PORT = await findAvailablePort(NETWORK.DEFAULT_PORT);

    // ✅ Configurar auto-inyección
    setupAutoInjection();

    app.listen(PORT, () => {
      console.log(`${DEV.LOG_PREFIXES.THEME} Theme Editor server lista en ${NETWORK.DEFAULT_PROTOCOL}://${NETWORK.DEFAULT_HOST}:${PORT}`);
    });

    return PORT;
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    throw error;
  }
}

// Inicializar el servidor
startServer().catch(console.error);

// Función de limpieza automática
function cleanupAutoInjection() {
  const { unlinkSync, existsSync, readFileSync, writeFileSync } = require('fs');
  const { join } = require('path');

  const appDir = process.cwd();

  try {
    // Limpiar script de public/
    const scriptFile = join(appDir, 'public', 'theme-editor-auto.js');
    if (existsSync(scriptFile)) {
      unlinkSync(scriptFile);
      console.log('🧹 Script de auto-inyección eliminado');
    }

    // Restaurar layout original
    const backupFile = join(appDir, 'layout.theme-editor-backup.tsx');
    const layoutFile = join(appDir, 'app', 'layout.tsx');

    if (existsSync(backupFile) && existsSync(layoutFile)) {
      const backupContent = readFileSync(backupFile, 'utf8');
      writeFileSync(layoutFile, backupContent);
      unlinkSync(backupFile);
      console.log('✅ Layout original restaurado');
    }

  } catch (error) {
    console.error('❌ Error en limpieza:', error.message);
  }
}

// Limpiar al cerrar el proceso
process.on('SIGINT', () => {
  console.log('\n🧹 Limpiando archivos temporales...');
  cleanupAutoInjection();
  process.exit(0);
});

process.on('SIGTERM', () => {
  cleanupAutoInjection();
  process.exit(0);
});
