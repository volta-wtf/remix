# Sistema de Tests - theme-editor

Documentación completa del sistema de pruebas del theme-editor, incluyendo tests de detección de variables, sistema de estilos dinámicos, CORS y más.

## 🧪 Estructura del Sistema de Tests

```
src/test/
├── dynamic-styles-test.js       # Tests del sistema de estilos dinámicos
├── variables-test.js            # Tests del detector de variables
├── cors-test.js                # Tests de CORS
├── variable-detection-tests.js  # Tests detallados de detección
└── README.md                   # Esta documentación
```

## 🚀 Scripts de Test Disponibles

```bash
# Tests principales (recomendado)
npm run test

# Tests específicos
npm run test:styles      # Solo sistema de estilos dinámicos
npm run test:variables   # Solo detector de variables
npm run test:cors        # Solo tests de CORS

# Todos los tests
npm run test:all
```

## 🎨 Tests del Sistema de Estilos Dinámicos

### Qué Se Testea

El archivo `dynamic-styles-test.js` verifica:

1. **Importación de funciones**: Todas las funciones se cargan correctamente
2. **Generación de clases básicas**: `cls()` genera clases con prefijo `te-`
3. **Clases con modificadores**: `cn()` maneja modificadores condicionales
4. **Helpers específicos**: `tabClass()`, `variableClass()`, `saveButtonClass()`
5. **Generación de CSS**: Sistema completo de conversión JS → CSS
6. **Limpieza de errores**: Manejo de errores en entornos sin DOM

### Ejemplo de Ejecución

```javascript
// Verificar generación de clases básicas
console.log(cls('panel'));           // ✓ 'te-panel'
console.log(cls('tab'));             // ✓ 'te-tab'
console.log(cls('closeButton'));     // ✓ 'te-closeButton'

// Verificar clases con modificadores
console.log(cn('tab', { active: true }));     // ✓ 'te-tab te-tab--active'
console.log(cn('variable', { modified: true })); // ✓ 'te-variable te-variable--modified'

// Verificar helpers específicos
console.log(tabClass(true));         // ✓ 'te-tab te-tab--active'
console.log(variableClass(false));   // ✓ 'te-variable'
```

### Salida Esperada

```
🧪 Testing dynamic-styles system...

✅ Test 1: Funciones importadas correctamente
✅ Test 2: Generación de clases básicas
✅ Test 3: Clases con modificadores condicionales
✅ Test 4: Helpers específicos
✅ Test 5: Generación de CSS completo
✅ Test 6: Sistema de limpieza (manejo de errores DOM)

✅ Todos los tests del sistema de estilos dinámicos pasaron
```

## 🌐 Tests de CORS

### Qué Se Testea

El archivo `cors-test.js` verifica:

1. **Configuración CORS**: Headers correctos para desarrollo local
2. **WebSocket CORS**: Conexiones WebSocket desde diferentes orígenes
3. **Requests cross-origin**: Peticiones HTTP desde apps cliente

### Casos Probados

- Requests desde `localhost:3000` (Next.js)
- Requests desde `localhost:5173` (Vite)
- Requests desde `localhost:8080` (CRA)
- WebSocket connections con diferentes orígenes

## 🔍 Tests del Detector de Variables

### Cobertura Completa

- **🎨 Colores**: `#ff0000`, `rgb()`, `hsl()`, `oklch()`, etc.
- **📏 Espaciado**: `16px`, `1rem`, `calc()`, etc.
- **✏️ Tipografía**: `14px`, `bold`, `Inter`, etc.
- **🔲 Bordes**: `1px solid`, `8px` (radius), etc.
- **🌑 Sombras**: `box-shadow` valores, `none`, etc.
- **📄 Otros**: Variables no categorizadas

### Ejecutar Tests de Variables

```bash
# Desde la raíz del theme-editor
npm run test:variables

# O directamente
node src/test/variable-detection-tests.js
```

### Interpretación de Resultados

```
🧪 EJECUTANDO PRUEBAS DEL DETECTOR DE VARIABLES

📂 Probando tipo: COLOR
✅ PASS --color-primary (#3b82f6)
     Expected: color, Got: color
✅ PASS --color-red-500 (#ef4444)
     Expected: color, Got: color
   9/9 pruebas pasaron (100.0%)

📊 RESUMEN FINAL
45/45 pruebas pasaron (100.0%)

🎨 color: 9/9 (100.0%)
📏 spacing: 7/7 (100.0%)
✏️ typography: 7/7 (100.0%)
🔲 border: 6/6 (100.0%)
🌑 shadow: 5/5 (100.0%)
📄 default: 7/7 (100.0%)
```

## 📝 Escribir Tests Nuevos

### Estructura de Test Básico

```javascript
// src/test/mi-nuevo-test.js
import { funcionATestear } from '../utils/mi-modulo.js';

console.log('🧪 Testing mi-modulo...');

// Test 1: Verificar función básica
try {
  const resultado = funcionATestear('input');
  console.assert(resultado === 'expected', '❌ Test 1 falló');
  console.log('✅ Test 1: Función básica');
} catch (error) {
  console.log('❌ Test 1: Error inesperado:', error.message);
}

console.log('✅ Todos los tests de mi-modulo pasaron');
```

### Agregar Test al package.json

```json
{
  "scripts": {
    "test:mi-modulo": "node src/test/mi-nuevo-test.js"
  }
}
```

### Agregar a Suite Principal

Para incluir tu test en `npm run test`, edita el script en `package.json`:

```json
{
  "scripts": {
    "test": "npm run test:styles && npm run test:variables && npm run test:mi-modulo"
  }
}
```

## 📋 Convenciones de Tests

### 1. **Nomenclatura de Archivos**
- Formato: `modulo-test.js` en `src/test/`
- Ejemplo: `dynamic-styles-test.js`, `variables-test.js`

### 2. **Imports y Exports**
- Usar rutas relativas ES6: `import { func } from '../utils/modulo.js'`
- Imports al inicio del archivo

### 3. **Assertions y Verificaciones**
- Usar `console.assert()` para verificaciones
- Capturar errores con `try/catch`
- Mostrar mensajes claros en fallos

### 4. **Output y Logging**
- Emojis para claridad: ✅ (pass), ❌ (fail), 🧪 (testing)
- Mensajes descriptivos para cada test
- Resumen final con conteo de tests

### 5. **Manejo de Errores**
- Capturar errores esperados e inesperados
- No permitir que un test rompa los siguientes
- Logs detallados para debugging

### 6. **Scripts NPM**
- Cada test debe tener su script individual
- Incluir en suite principal si es crítico
- Scripts descriptivos (`test:styles` vs `test1`)

## 🔧 Agregar Casos de Test

### Para Tests de Variables

Edita `TEST_CASES` en `variable-detection-tests.js`:

```javascript
const TEST_CASES = {
  color: [
    ['--mi-color-nuevo', '#123456'],
    ['--color-custom', 'hsl(200, 50%, 50%)'],
  ],
  spacing: [
    ['--spacing-custom', '1.5rem'],
    ['--gap-large', 'clamp(1rem, 5vw, 3rem)'],
  ],
  // ... otros tipos
};
```

### Para Tests de Estilos Dinámicos

Edita `dynamic-styles-test.js` y agrega nuevos casos:

```javascript
// Test 7: Tu nuevo caso
try {
  const resultado = tuNuevaFuncion('input');
  console.assert(resultado === 'expected', '❌ Test 7 falló');
  console.log('✅ Test 7: Tu nueva funcionalidad');
} catch (error) {
  console.log('❌ Test 7: Error inesperado:', error.message);
}
```

## 🎯 Métricas de Calidad

### Umbrales de Éxito

- **Precisión Global**: >90% para considerarse exitoso
- **Precisión por Tipo**: >85% para cada categoría de variable
- **Tiempo de Ejecución**: <500ms para toda la suite de variables
- **Coverage**: Cada función pública debe tener al menos un test

### Monitoreo de Performance

```javascript
// Ejemplo de test con medición de tiempo
const startTime = performance.now();
const resultado = funcionLenta('input');
const endTime = performance.now();

console.assert(endTime - startTime < 100, '❌ Función muy lenta');
console.log(`✅ Performance: ${endTime - startTime}ms`);
```

## 🐛 Debugging de Tests

### Activar Logs Detallados

```javascript
// En cualquier test, agregar:
const DEBUG = true;

if (DEBUG) {
  console.log('🔍 Debug info:', variable, valor, resultado);
}
```

### Casos de Debug Comunes

```javascript
// Para debugging de detección de variables
const analysis = analyzeVariable('--mi-variable', 'mi-valor');
console.log('Análisis completo:', analysis);

const type = detectVariableType('--mi-variable', 'mi-valor');
console.log('Tipo detectado:', type);

// Para debugging de estilos dinámicos
console.log('Estilos generados:', generateCSS());
console.log('DOM actual:', document.head.innerHTML);
```

### Herramientas de Debug

1. **Console logs**: Para información detallada
2. **Assertions específicas**: Para puntos exactos de fallo
3. **Try/catch granular**: Para aislar errores
4. **Performance timing**: Para identificar bottlenecks

## 🔄 Integración Continua

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run all tests
        run: |
          cd packages/theme-editor
          npm run test:all
```

### Scripts de Pre-commit

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test"
    }
  }
}
```

## 📊 Reportes de Coverage

### Generar Reporte Simple

```javascript
// coverage-reporter.js
const totalTests = 45;
const passedTests = 43;
const coverage = (passedTests / totalTests * 100).toFixed(1);

console.log(`📊 Coverage: ${coverage}% (${passedTests}/${totalTests})`);
```

### Tracking de Regresiones

Mantener un log de resultados históricos:

```
2024-01-15: 45/45 tests (100%) - Baseline
2024-01-16: 44/45 tests (97.8%) - Regresión en color detection
2024-01-17: 45/45 tests (100%) - Fixed color detection
```

## 🤝 Contribuir con Tests

### Checklist para Nuevos Tests

- [ ] Archivo nombrado correctamente (`modulo-test.js`)
- [ ] Imports usando rutas relativas
- [ ] Console.assert para verificaciones
- [ ] Try/catch para manejo de errores
- [ ] Output con emojis y mensajes claros
- [ ] Script agregado a package.json
- [ ] Documentación actualizada en este README
- [ ] Test ejecuta sin errores
- [ ] Test verifica funcionalidad específica

### Review de Tests

Antes de hacer PR, verificar:

1. **Tests pasan**: `npm run test:all`
2. **Performance**: Tests no tardan más de 5 segundos
3. **Clarity**: Mensajes de error son descriptivos
4. **Coverage**: Funcionalidad nueva tiene tests
5. **Documentation**: README actualizado si es necesario

---

**¿Tienes preguntas sobre el sistema de tests?** Revisa los archivos de ejemplo o abre un issue en el repositorio.