# Sistema de Pruebas - Detector de Variables CSS

Este directorio contiene las pruebas para el sistema de detección automática de tipos de variables CSS.

## 📁 Archivos

- **`variable-detection-tests.js`** - Suite completa de pruebas para el detector de variables
- **`README.md`** - Este archivo con documentación

## 🚀 Ejecutar las Pruebas

### Desde la raíz del theme-editor:

```bash
# Usando npm/pnpm
pnpm test:variables

# O directamente con Node.js
node test-variables.js

# O ejecutar el archivo de pruebas directamente
node src/test/variable-detection-tests.js
```

## 🧪 Tipos de Pruebas

### 1. **Pruebas de Detección de Tipos**
Verifica que el detector identifique correctamente el tipo de cada variable:

- **🎨 Colores**: `#ff0000`, `rgb()`, `hsl()`, `oklch()`, etc.
- **📏 Espaciado**: `16px`, `1rem`, `calc()`, etc.
- **✏️ Tipografía**: `14px`, `bold`, `Inter`, etc.
- **🔲 Bordes**: `1px solid`, `8px` (radius), etc.
- **🌑 Sombras**: `box-shadow` valores, `none`, etc.
- **📄 Otros**: Variables no categorizadas

### 2. **Pruebas de Análisis Completo**
Verifica que el análisis genere previews y metadata correctamente.

### 3. **Casos Límite**
Prueba situaciones edge como:
- Variables vacías
- Valores malformados
- Referencias a otras variables
- Funciones CSS complejas

## 📊 Interpretación de Resultados

### Salida de Ejemplo:
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

### Códigos de Estado:
- **✅ PASS** - Detección correcta
- **❌ FAIL** - Detección incorrecta
- **💥 ERROR** - Error en la ejecución

## 🔧 Agregar Nuevas Pruebas

Para agregar casos de prueba, edita el objeto `TEST_CASES` en `variable-detection-tests.js`:

```javascript
const TEST_CASES = {
  color: [
    // Agregar aquí nuevos casos de color
    ['--mi-color', '#123456'],
  ],
  spacing: [
    // Agregar aquí nuevos casos de espaciado
    ['--mi-spacing', '24px'],
  ],
  // ... otros tipos
};
```

## 🎯 Mejorar la Precisión

Si las pruebas fallan, revisa los patrones en `src/utils/variable-type-detector.js`:

1. **Patrones de Nombre**: Regex que coincidan con nombres de variables
2. **Patrones de Valor**: Regex que coincidan con valores de variables
3. **Sistema de Puntuación**: Lógica para resolver conflictos entre tipos

## 📈 Métricas de Calidad

- **Precisión Global**: >90% para considerarse exitoso
- **Precisión por Tipo**: >85% para cada categoría
- **Tiempo de Ejecución**: <500ms para toda la suite

## 🐛 Debugging

Para debuggear problemas específicos:

```javascript
// En variable-detection-tests.js
const analysis = analyzeVariable('--mi-variable', 'mi-valor');
console.log('Análisis completo:', analysis);

const type = detectVariableType('--mi-variable', 'mi-valor');
console.log('Tipo detectado:', type);
```

## 🔄 Integración Continua

Estas pruebas se pueden integrar en CI/CD para asegurar que los cambios no rompan la detección:

```yaml
# .github/workflows/test.yml
- name: Test Variable Detection
  run: |
    cd packages/theme-editor
    pnpm test:variables
```