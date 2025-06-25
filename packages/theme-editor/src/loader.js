import http from 'http';
import express from 'express';
import cors from 'cors';
import { resolve, join } from 'path';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';

// ---- Theme Editor UI Server ----
const app = express();
const PORT = 4444;

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
  const possiblePaths = [
    // Rutas comunes para Next.js
    join(startDir, 'app/globals.css'),
    join(startDir, 'src/app/globals.css'),
    join(startDir, 'src/globals.css'),

    // Rutas comunes para otros frameworks
    join(startDir, 'styles/globals.css'),
    join(startDir, 'src/styles/globals.css'),
    join(startDir, 'public/globals.css'),
    join(startDir, 'assets/globals.css'),
    join(startDir, 'src/assets/globals.css'),

    // Buscar en subdirectorios app
    join(startDir, 'apps/*/app/globals.css'),
    join(startDir, 'apps/*/src/app/globals.css'),
  ];

  // Verificar rutas directas primero
  for (const path of possiblePaths) {
    if (!path.includes('*') && existsSync(path)) {
      console.log(`📁 Archivo globals.css encontrado en: ${path}`);
      return path;
    }
  }

  // Buscar en apps/* con wildcard
  const appsDir = join(startDir, 'apps');
  if (existsSync(appsDir)) {
    try {
      const appDirs = readdirSync(appsDir).filter(dir => {
        const dirPath = join(appsDir, dir);
        return statSync(dirPath).isDirectory();
      });

      for (const appDir of appDirs) {
        const appPaths = [
          join(appsDir, appDir, 'app/globals.css'),
          join(appsDir, appDir, 'src/app/globals.css'),
          join(appsDir, appDir, 'styles/globals.css'),
          join(appsDir, appDir, 'src/styles/globals.css'),
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

  // Búsqueda recursiva limitada en directorios comunes
  const searchDirs = ['src', 'app', 'styles'];
  for (const searchDir of searchDirs) {
    const dirPath = join(startDir, searchDir);
    if (existsSync(dirPath)) {
      const found = searchRecursively(dirPath, 'globals.css', 3); // máximo 3 niveles
      if (found) {
        console.log(`📁 Archivo globals.css encontrado recursivamente: ${found}`);
        return found;
      }
    }
  }

  throw new Error(`❌ No se pudo encontrar el archivo globals.css en el proyecto. Directorio base: ${startDir}`);
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

// Endpoint para guardar variables CSS
app.post('/save-css', (req, res) => {
  try {
    const { variables } = req.body;
    console.log('💾 Guardando variables CSS:', variables);

    // Buscar el archivo globals.css dinámicamente
    const cssFilePath = findGlobalsCss();
    console.log('🔍 Archivo CSS encontrado:', cssFilePath);

    // Leer el archivo CSS actual
    let cssContent = readFileSync(cssFilePath, 'utf8');
    console.log('📄 Archivo CSS leído:', cssFilePath);

    // Actualizar cada variable modificada en el contenido CSS
    Object.entries(variables).forEach(([varName, newValue]) => {
      // Crear regex para encontrar la variable específica
      const varRegex = new RegExp(`(${varName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*:\\s*)[^;]+`, 'g');

      // Reemplazar el valor
      const replacement = `$1${newValue}`;
      const oldContent = cssContent;
      cssContent = cssContent.replace(varRegex, replacement);

      if (cssContent !== oldContent) {
        console.log(`✅ Variable actualizada: ${varName} = ${newValue}`);
      } else {
        console.log(`⚠️  Variable no encontrada en archivo: ${varName}`);
      }
    });

    // Escribir el archivo actualizado
    writeFileSync(cssFilePath, cssContent, 'utf8');
    console.log('✅ Archivo CSS guardado exitosamente');

    res.json({
      success: true,
      message: 'Variables CSS guardadas exitosamente',
      updatedCount: Object.keys(variables).length
    });

  } catch (error) {
    console.error('❌ Error al guardar variables CSS:', error);
    res.status(500).json({
      success: false,
      message: 'Error al guardar variables CSS',
      error: error.message
    });
  }
});

// Endpoint de estado para verificar que el servidor está activo
app.get('/status', (_req, res) => {
  res.json({ status: 'active', message: 'Theme Editor server running' });
});

app.listen(PORT, () => {
  console.log(`🎨 Theme Editor server lista en http://localhost:${PORT}`);
});

// ---- Monkey Patch HTTP Server ----
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
