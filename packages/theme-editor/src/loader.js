import http from 'http';
import express from 'express';
import cors from 'cors';
import { resolve, join } from 'path';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { promisify } from 'util';
import net from 'net';

// ---- Función para encontrar puerto disponible ----
async function findAvailablePort(startPort = 4444) {
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
let PORT = 4444; // Puerto por defecto, será actualizado dinámicamente

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

// Función para buscar el archivo globals.css dinámicamente
function findGlobalsCss(startDir = process.cwd()) {
  console.log(`🔍 Directorio inicial: ${startDir}`);

  // Detectar si el proyecto actual usa @workspace/ui
  const isUsingWorkspaceUI = detectWorkspaceUIUsage(startDir);
  console.log(`📦 ¿Usa @workspace/ui?: ${isUsingWorkspaceUI}`);

  let searchDir = startDir;
  let useMonorepoSearch = false;

  if (isUsingWorkspaceUI) {
    // Solo si usa @workspace/ui, buscar el directorio raíz del monorepo
    if (startDir.includes('/apps/') || startDir.includes('/packages/')) {
      const parts = startDir.split('/');
      const rootIndex = Math.max(
        parts.lastIndexOf('apps') - 1,
        parts.lastIndexOf('packages') - 1
      );
      if (rootIndex > 0) {
        searchDir = parts.slice(0, rootIndex + 1).join('/');
        useMonorepoSearch = true;
        console.log(`📁 Detectado monorepo con @workspace/ui, usando directorio raíz: ${searchDir}`);
      }
    }

    // También buscar hacia arriba hasta encontrar package.json con workspaces
    if (!useMonorepoSearch) {
      let currentDir = startDir;
      for (let i = 0; i < 3; i++) { // máximo 3 niveles hacia arriba
        const packageJsonPath = join(currentDir, 'package.json');
        if (existsSync(packageJsonPath)) {
          try {
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
            if (packageJson.workspaces || packageJson.packages) {
              searchDir = currentDir;
              useMonorepoSearch = true;
              console.log(`📦 Encontrado monorepo con workspaces: ${searchDir}`);
              break;
            }
          } catch (e) {
            // Ignorar errores de parsing
          }
        }
        const parentDir = join(currentDir, '..');
        if (parentDir === currentDir) break;
        currentDir = parentDir;
      }
    }
  }

  const possiblePaths = [];

  if (useMonorepoSearch && isUsingWorkspaceUI) {
    // Rutas específicas para monorepos que usan @workspace/ui
    console.log(`🔍 Búsqueda en monorepo desde: ${searchDir}`);
    possiblePaths.push(
      // Prioridad: packages/ui (donde está nuestro CSS)
      join(searchDir, 'packages/ui/src/styles/globals.css'),
      join(searchDir, 'packages/ui/styles/globals.css'),

      // Prioridad: registry (donde está nuestro CSS)
      join(searchDir, 'registry/styles/globals.css'),
      join(searchDir, 'packages/ui/styles/globals.css'),

      // Otras ubicaciones de packages
      join(searchDir, 'packages/theme/src/styles/globals.css'),
      join(searchDir, 'packages/styles/src/globals.css'),
      join(searchDir, 'packages/design-system/src/styles/globals.css')
    );
  } else {
    // Rutas estándar para proyectos normales
    console.log(`🔍 Búsqueda estándar desde: ${searchDir}`);
    possiblePaths.push(
      // Next.js estándar
      join(searchDir, 'src/app/globals.css'),
      join(searchDir, 'app/globals.css'),
      join(searchDir, 'src/styles/globals.css'),
      join(searchDir, 'styles/globals.css'),

      // Otras ubicaciones comunes
      join(searchDir, 'src/globals.css'),
      join(searchDir, 'public/globals.css'),
      join(searchDir, 'assets/globals.css'),
      join(searchDir, 'src/assets/globals.css')
    );
  }

  // Verificar rutas directas primero
  for (const path of possiblePaths) {
    if (existsSync(path)) {
      console.log(`📁 Archivo globals.css encontrado en: ${path}`);
      return path;
    }
  }

  // Solo si usa @workspace/ui, buscar en packages/* y apps/*
  if (useMonorepoSearch && isUsingWorkspaceUI) {
    // Buscar en packages/*
    const packagesDir = join(searchDir, 'packages');
    if (existsSync(packagesDir)) {
      console.log('🔍 Buscando en directorio packages/...');
      try {
        const packageDirs = readdirSync(packagesDir).filter(dir => {
          const dirPath = join(packagesDir, dir);
          return statSync(dirPath).isDirectory();
        });

        for (const packageDir of packageDirs) {
          const packagePaths = [
            join(packagesDir, packageDir, 'src/styles/globals.css'),
            join(packagesDir, packageDir, 'styles/globals.css'),
            join(packagesDir, packageDir, 'src/app/globals.css'),
            join(packagesDir, packageDir, 'app/globals.css')
          ];

          for (const path of packagePaths) {
            if (existsSync(path)) {
              console.log(`📁 Archivo globals.css encontrado en package "${packageDir}": ${path}`);
              return path;
            }
          }
        }
      } catch (error) {
        console.warn('⚠️  Error al buscar en directorio packages:', error.message);
      }
    }

    // Buscar en apps/*
    const appsDir = join(searchDir, 'apps');
    if (existsSync(appsDir)) {
      console.log('🔍 Buscando en directorio apps/...');
      try {
        const appDirs = readdirSync(appsDir).filter(dir => {
          const dirPath = join(appsDir, dir);
          return statSync(dirPath).isDirectory();
        });

        for (const appDir of appDirs) {
          const appPaths = [
            join(appsDir, appDir, 'src/styles/globals.css'),
            join(appsDir, appDir, 'styles/globals.css'),
            join(appsDir, appDir, 'src/app/globals.css'),
            join(appsDir, appDir, 'app/globals.css')
          ];

          for (const path of appPaths) {
            if (existsSync(path)) {
              console.log(`📁 Archivo globals.css encontrado en app "${appDir}": ${path}`);
              return path;
            }
          }
        }
      } catch (error) {
        console.warn('⚠️  Error al buscar en directorio apps:', error.message);
      }
    }
  }

  // Búsqueda recursiva limitada solo en el directorio actual
  const searchDirs = ['src', 'app', 'styles'];
  console.log('🔍 Búsqueda recursiva limitada...');
  for (const searchDirName of searchDirs) {
    const dirPath = join(searchDir, searchDirName);
    if (existsSync(dirPath)) {
      const found = searchRecursively(dirPath, 'globals.css', 2); // máximo 2 niveles
      if (found) {
        console.log(`📁 Archivo globals.css encontrado recursivamente: ${found}`);
        return found;
      }
    }
  }

  throw new Error(`❌ No se pudo encontrar el archivo globals.css en el proyecto.
Directorio: ${searchDir}
Tipo de búsqueda: ${useMonorepoSearch ? 'Monorepo' : 'Estándar'}
Usa @workspace/ui: ${isUsingWorkspaceUI}

  Ubicaciones sugeridas:
  ${useMonorepoSearch ?
'- registry/styles/globals.css (recomendado)\n- packages/ui/src/styles/globals.css\n- packages/theme/src/styles/globals.css' :
  '- src/app/globals.css (Next.js)\n- src/styles/globals.css\n- styles/globals.css'}`);
  }

// Función para detectar si el proyecto usa @workspace/ui
function detectWorkspaceUIUsage(startDir) {
  try {
    // Buscar package.json en el directorio actual y algunos niveles arriba
    let currentDir = startDir;
    for (let i = 0; i < 3; i++) {
      const packageJsonPath = join(currentDir, 'package.json');
      if (existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
          const deps = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
            ...packageJson.peerDependencies
          };

          // Verificar si usa @workspace/ui o similar
          if (deps['@workspace/ui'] || deps['@workspace/theme'] || deps['@workspace/design-system']) {
            return true;
          }

          // Verificar imports en archivos comunes
          const commonFiles = ['layout.tsx', 'layout.jsx', '_app.tsx', '_app.jsx', 'app.tsx', 'app.jsx'];
          for (const file of commonFiles) {
            const filePath = join(currentDir, 'src', file);
            const altFilePath = join(currentDir, file);

            for (const path of [filePath, altFilePath]) {
              if (existsSync(path)) {
                const content = readFileSync(path, 'utf8');
                                 if (content.includes('@workspace/ui') || content.includes('packages/ui') || content.includes('registry')) {
                  return true;
                }
              }
            }
          }

        } catch (e) {
          // Ignorar errores de parsing
        }
      }

      const parentDir = join(currentDir, '..');
      if (parentDir === currentDir) break;
      currentDir = parentDir;
    }

    // Detección adicional: verificar si estamos en un monorepo con packages/ui o registry
    // Esto cubre el caso de ejecutar desde el directorio raíz del monorepo
    let checkDir = startDir;
    for (let i = 0; i < 3; i++) {
      // Si existe registry/styles/globals.css, probablemente es nuestro monorepo (nueva estructura)
      const registryGlobalsPath = join(checkDir, 'registry/styles/globals.css');
      if (existsSync(registryGlobalsPath)) {
        console.log('🔍 Detectado monorepo por estructura: encontrado registry/styles/globals.css');
        return true;
      }

      // Si existe packages/ui/src/styles/globals.css, probablemente es nuestro monorepo (estructura anterior)
      const uiGlobalsPath = join(checkDir, 'packages/ui/src/styles/globals.css');
      if (existsSync(uiGlobalsPath)) {
        console.log('🔍 Detectado monorepo por estructura: encontrado packages/ui/src/styles/globals.css');
        return true;
      }

      // También verificar si existe registry/package.json con nombre @workspace/ui
      const registryPackageJsonPath = join(checkDir, 'registry/package.json');
      if (existsSync(registryPackageJsonPath)) {
        try {
          const registryPackageJson = JSON.parse(readFileSync(registryPackageJsonPath, 'utf8'));
          if (registryPackageJson.name && (
            registryPackageJson.name.includes('@workspace/ui') ||
            registryPackageJson.name.includes('ui') ||
            registryPackageJson.name.includes('design-system')
          )) {
            console.log(`🔍 Detectado monorepo por package UI en registry: ${registryPackageJson.name}`);
            return true;
          }
        } catch (e) {
          // Ignorar errores de parsing
        }
      }

      // También verificar si existe packages/ui/package.json con nombre @workspace/ui
      const uiPackageJsonPath = join(checkDir, 'packages/ui/package.json');
      if (existsSync(uiPackageJsonPath)) {
        try {
          const uiPackageJson = JSON.parse(readFileSync(uiPackageJsonPath, 'utf8'));
          if (uiPackageJson.name && (
            uiPackageJson.name.includes('@workspace/ui') ||
            uiPackageJson.name.includes('ui') ||
            uiPackageJson.name.includes('design-system')
          )) {
            console.log(`🔍 Detectado monorepo por package UI: ${uiPackageJson.name}`);
            return true;
          }
        } catch (e) {
          // Ignorar errores de parsing
        }
      }

      const parentDir = join(checkDir, '..');
      if (parentDir === checkDir) break;
      checkDir = parentDir;
    }

    return false;
  } catch (error) {
    console.warn('⚠️  Error detectando uso de @workspace/ui:', error.message);
    return false;
  }
}

// Función auxiliar para búsqueda recursiva limitada
function searchRecursively(dir, filename, maxDepth) {
  if (maxDepth <= 0) return null;

  try {
    const items = readdirSync(dir);

    // Buscar el archivo en el directorio actual
    if (items.includes(filename)) {
      const filePath = join(dir, filename);
      if (statSync(filePath).isFile()) {
        return filePath;
      }
    }

    // Buscar en subdirectorios
    for (const item of items) {
      const itemPath = join(dir, item);
      try {
        if (statSync(itemPath).isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          const found = searchRecursively(itemPath, filename, maxDepth - 1);
          if (found) return found;
        }
      } catch (error) {
        // Ignorar errores de permisos en subdirectorios
        continue;
      }
    }
  } catch (error) {
    // Ignorar errores de permisos
    return null;
  }

  return null;
}



// Endpoint de debug para diagnosticar problemas
app.get('/debug-css', (req, res) => {
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

// Endpoint para guardar variables CSS
app.post('/save-css', (req, res) => {
  try {
    const { variables, activeTheme } = req.body;
    console.log('💾 Guardando variables CSS:', variables);
    console.log('🎨 Tema activo:', activeTheme);

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
    const targetSelector = activeTheme === 'dark' ? '.dark' : ':root';
    console.log('🎯 Selector objetivo:', targetSelector);

    // Procesar cada variable
    Object.entries(variables).forEach(([varName, newValue]) => {
      console.log(`\n🔄 Procesando variable: ${varName} = ${newValue}`);

      // Escapar caracteres especiales
      const escapedVarName = varName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

      // Encontrar todas las ocurrencias de esta variable
      const varRegex = new RegExp(`(\\s*${escapedVarName}\\s*:\\s*)[^;\\n]+`, 'g');
      let match;
      const matches = [];

      while ((match = varRegex.exec(cssContent)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          fullMatch: match[0],
          prefix: match[1]
        });
      }

      console.log(`📍 Encontradas ${matches.length} ocurrencias de ${varName}`);

      // Procesar las ocurrencias de atrás hacia adelante para mantener posiciones
      matches.reverse().forEach((match, index) => {
        console.log(`\n🔍 Analizando ocurrencia ${matches.length - index} en posición ${match.start}`);

        // Buscar hacia atrás para encontrar el selector más cercano
        const beforeVariable = cssContent.substring(0, match.start);

        // Buscar los selectores hacia atrás
        const rootMatch = beforeVariable.lastIndexOf(':root');
        const darkMatch = beforeVariable.lastIndexOf('.dark');

        // Determinar cuál selector está más cerca
        let closestSelector = null;
        let closestPosition = -1;

        if (rootMatch !== -1 && rootMatch > closestPosition) {
          closestSelector = ':root';
          closestPosition = rootMatch;
        }

        if (darkMatch !== -1 && darkMatch > closestPosition) {
          closestSelector = '.dark';
          closestPosition = darkMatch;
        }

        console.log(`📦 Variable en posición ${match.start} pertenece a: ${closestSelector}`);

        // Solo actualizar si coincide con el selector objetivo
        if (closestSelector === targetSelector) {
          console.log(`✅ Actualizando variable en ${closestSelector}`);

          // Reemplazar esta ocurrencia específica
          const beforeMatch = cssContent.substring(0, match.start);
          const afterMatch = cssContent.substring(match.end);
          const newVariableDeclaration = match.prefix + newValue;

          cssContent = beforeMatch + newVariableDeclaration + afterMatch;
          updatedCount++;

          console.log(`✅ Variable actualizada: ${varName} = ${newValue} en ${closestSelector}`);
        } else {
          console.log(`⏭️ Saltando variable en ${closestSelector} (objetivo: ${targetSelector})`);
        }
      });
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

// Endpoint de estado para verificar que el servidor está activo
app.get('/status', (_req, res) => {
  res.json({ status: 'active', message: 'Theme Editor server running', port: PORT });
});

// ---- Monkey Patch HTTP Server ----
function setupMonkeyPatch() {
  const originalCreateServer = http.createServer;
  http.createServer = listener => originalCreateServer((req, res) => {
    let html = '';
    const write = res.write;
    const end = res.end;
    res.write = chunk => {
      html += chunk.toString();
      return true;
    };
    res.end = chunk => {
      if (chunk) html += chunk.toString();
      if ((res.getHeader('content-type') || '').includes('text/html')) {
        html = html.replace(/<\/body>/i,
          `<script src="http://localhost:${PORT}/theme-editor.js"></script></body>`
        );
      }
      write.call(res, html);
      end.call(res);
    };
    listener(req, res);
  });

  console.log('✅ theme-editor loader inicializado');
}

// Función para inicializar el servidor con puerto dinámico
async function startServer() {
  try {
    PORT = await findAvailablePort(4444);

    app.listen(PORT, () => {
      console.log(`🎨 Theme Editor server lista en http://localhost:${PORT}`);
      // Configurar el monkey patch después de que el servidor esté iniciado
      setupMonkeyPatch();
    });

    return PORT;
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    throw error;
  }
}

// Inicializar el servidor
startServer().catch(console.error);
