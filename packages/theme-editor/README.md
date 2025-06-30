# theme-editor

Zero-config, local-first CSS variable editor for React projects with **dynamic styles system**.

## 🚀 Características

- ✅ **Zero configuración**: Auto-detección de framework (Next.js, CRA, Vite)
- ✅ **Edición en vivo**: Variables CSS con actualización instantánea
- ✅ **Sistema de estilos dinámicos**: Clases CSS generadas automáticamente desde objetos JS
- ✅ **Estados CSS nativos**: `:hover`, `:focus`, `:active` sin eventos JavaScript
- ✅ **Detección inteligente**: Tipos de variables CSS con previews visuales
- ✅ **Monorepo friendly**: Búsqueda automática en estructuras complejas
- ✅ **Local-first**: Se ejecuta desde `node_modules` sin copiar archivos
- 🎨 **NUEVO**: Sistema de clases CSS dinámicas con estados nativos
- 🧪 **NUEVO**: Suite de tests completa y organizada

## 🎨 Sistema de Estilos Dinámicos

El theme-editor incluye un innovador sistema que convierte automáticamente objetos de estilos JavaScript en clases CSS con estados nativos.

### Características del Sistema

- **🔄 Conversión automática**: Objeto JS → CSS automáticamente
- **⚡ Estados nativos**: `:hover`, `:focus`, `:active` sin JavaScript
- **🎯 Nomenclatura consistente**: Prefijo `te-` evita conflictos
- **🔧 Helpers específicos**: Funciones para casos comunes
- **📱 Una fuente de verdad**: Todo en `panel-styles.js`

### Uso Básico

```javascript
// 1. Importar el sistema
import { injectDynamicStyles, cls, cn } from './dynamic-styles.js';

// 2. Inyectar estilos al montar la app
React.useEffect(() => {
  injectDynamicStyles();
}, []);

// 3. Usar clases en componentes
<div className={cls('panel')}>
  <button className={cn('tab', { active: isActive })}>
    Contenido
  </button>
</div>
```

### Definición de Estilos con Estados

```javascript
// panel-styles.js
export const styles = {
  button: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    // Estados CSS nativos
    ':hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
    },

    ':active': {
      transform: 'translateY(0)',
    },

    ':disabled': {
      backgroundColor: '#d1d5db',
      cursor: 'not-allowed',
    }
  }
};
```

### Funciones Helper Disponibles

```javascript
// Clases básicas
cls('panel')                    // → 'te-panel'
cls('button')                   // → 'te-button'

// Clases con modificadores
cn('tab', { active: true })     // → 'te-tab te-tab--active'
cn('button', {
  disabled: true,
  saving: false
})                              // → 'te-button te-button--disabled'

// Helpers específicos
tabClass(true)                  // → 'te-tab te-tab--active'
variableClass(false)            // → 'te-variable'
saveButtonClass(false, true)    // → 'te-saveButton te-saveButton--saving'
```

### Ventajas del Sistema

✅ **Mejor rendimiento**: Estados CSS nativos vs eventos JavaScript
✅ **Código más limpio**: No más props `style={}` en JSX
✅ **Una fuente de verdad**: Estilos centralizados en un objeto
✅ **Estados automáticos**: `:hover`, `:focus` funcionan sin código extra
✅ **Fácil mantenimiento**: Cambias JS y se refleja automáticamente
✅ **Sin conflictos**: Prefijo `te-` evita colisiones con otros CSS

## 🧪 Sistema de Tests

Estructura organizada de tests para garantizar la calidad del código:

```
src/test/
├── dynamic-styles-test.js       # Tests del sistema de estilos dinámicos
├── variables-test.js            # Tests del detector de variables
├── cors-test.js                # Tests de CORS
├── variable-detection-tests.js  # Tests detallados de detección
└── README.md                   # Documentación de tests
```

### Scripts de Test Disponibles

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

### Ejemplo de Test del Sistema de Estilos

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

## 🎨 Sistema de Detección de Variables y Previews

El theme-editor incluye un sistema inteligente que analiza automáticamente las variables CSS y genera previews visuales apropiados:

### Tipos Soportados

- **🎨 Colores**: Hex (#ff0000), RGB, HSL, variables CSS, nombres de colores estándar
- **📏 Espaciado**: px, rem, em, %, calc(), gap, padding, margin
- **✏️ Tipografía**: font-size, font-weight, line-height, font-family
- **🔲 Bordes**: border-width, border-radius, border-style
- **🌑 Sombras**: box-shadow, text-shadow, elevation
- **📄 Otros**: Preview genérico para valores no categorizados

### Ejemplos de Detección

```javascript
'--color-red-500': '#ef4444'        → 🎨 Color (cuadrado rojo)
'--spacing-lg': '2rem'              → 📏 Espaciado (barra azul)
'--font-weight-bold': '700'         → ✏️ Tipografía (texto "Aa")
'--border-radius': '8px'            → 🔲 Borde (cuadrado redondeado)
'--shadow-md': '0 4px 6px rgba()'   → 🌑 Sombra (elemento con sombra)
'--z-index-modal': '1000'           → 📄 Otro (valor genérico)
```

## 🧠 Detección Inteligente de Proyectos

El theme-editor automáticamente identifica la estructura de tu proyecto y busca el archivo `globals.css` en la ubicación correcta:

### Tipos de Proyectos Soportados

#### **📁 Proyectos Estándar** (Next.js, CRA, Vite)
```
mi-proyecto/
├── src/
│   ├── app/globals.css      ← Encontrado automáticamente
│   └── styles/globals.css   ← También soportado
├── styles/globals.css       ← También soportado
└── package.json
```

#### **🏢 Monorepos con @workspace/ui**
```
monorepo/
├── packages/
│   └── ui/
│       └── src/styles/globals.css  ← CSS centralizado
├── apps/
│   ├── web/
│   │   └── package.json            ← usa @workspace/ui
│   └── admin/
│       └── package.json            ← usa @workspace/ui
└── package.json                    ← workspaces config
```

### Escenarios de Uso

```bash
# Desde app del monorepo
cd /mi-monorepo/apps/web
npm run dev  # ← Encuentra automáticamente registry/styles/globals.css

# Desde raíz del monorepo
cd /mi-monorepo
npm run dev  # ← Detecta estructura y busca en registry/

# Proyecto estándar
cd /mi-proyecto-nextjs
npm run dev  # ← Busca en ubicaciones estándar de Next.js
```

## 📁 Estructura del Proyecto

```plaintext
theme-editor/
├── bin/
│   └── theme-editor.cjs         # CLI ejecutable
├── src/
│   ├── index.js                 # Punto de entrada principal
│   ├── register.js              # Registra el loader
│   ├── loader.js                # Detección de framework y auto-registro
│   ├── client/
│   │   ├── ThemeEditorApp.jsx   # Componente principal React
│   │   ├── dynamic-styles.js    # 🆕 Sistema de estilos dinámicos
│   │   ├── panel-styles.js      # 🆕 Definición de estilos con estados
│   │   ├── VariablesPanel.jsx   # Panel de variables CSS
│   │   ├── ColorPanel.jsx       # Panel de colores
│   │   ├── DebugPanel.jsx       # Panel de debugging
│   │   └── useVariableDetection.js # Hook de detección de variables
│   ├── server/
│   │   ├── server.js            # Servidor HTTP y WebSocket
│   │   └── ws.js                # Lógica de WebSocket
│   ├── utils/
│   │   ├── variable-type-detector.js # Detección inteligente de tipos
│   │   ├── variable-preview-generator.js # Generación de previews
│   │   ├── monorepo-detector.js # Detección de monorepos
│   │   └── css-parser.js        # Parser de CSS
│   ├── test/                    # 🆕 Suite de tests organizada
│   │   ├── dynamic-styles-test.js
│   │   ├── variables-test.js
│   │   ├── cors-test.js
│   │   ├── variable-detection-tests.js
│   │   └── README.md
│   └── config/
│       └── constants.js         # Constantes y configuración
├── dist/                        # Builds compilados
├── rollup.config.js             # Configuración de build
├── package.json                 # Scripts y dependencias
├── README.md                    # Esta documentación
└── .gitignore
```

## 🚀 Instalación y Uso

### 1. Instalación

```bash
npm install --save-dev theme-editor
```

### 2. Configuración en `package.json`

```json
{
  "scripts": {
    "dev": "theme-editor next dev",
    "dev:cra": "theme-editor react-scripts start",
    "dev:vite": "theme-editor vite"
  }
}
```

### 3. Ejecutar

```bash
npm run dev
```

El theme-editor:
1. 🔍 **Detecta automáticamente** tu framework (Next.js, CRA, Vite)
2. 🎯 **Encuentra tu `globals.css`** (proyectos estándar o monorepos)
3. 🚀 **Inyecta el botón flotante** en tu aplicación
4. 🎨 **Carga el panel de edición** cuando haces clic

### 4. Uso del Sistema de Estilos Dinámicos

Para proyectos que quieran usar el sistema de estilos dinámicos:

```javascript
// En tu componente principal
import { injectDynamicStyles, cls, cn } from 'theme-editor/dynamic-styles';

function App() {
  React.useEffect(() => {
    injectDynamicStyles(); // Inyectar CSS automáticamente
  }, []);

  return (
    <div className={cls('panel')}>
      <button className={cn('button', { active: true })}>
        ¡Botón con estados CSS nativos!
      </button>
    </div>
  );
}
```

## 🔧 API Reference

### Sistema de Estilos Dinámicos

#### `injectDynamicStyles()`
Inyecta todas las clases CSS generadas dinámicamente al DOM.

#### `cls(className: string): string`
Genera una clase CSS básica con prefijo.

#### `cn(baseClass: string, modifiers: object): string`
Genera una clase CSS con modificadores condicionales.

#### Helpers Específicos
- `tabClass(isActive: boolean): string`
- `variableClass(isModified: boolean): string`
- `saveButtonClass(disabled: boolean, saving: boolean): string`

### Detección de Variables

#### `analyzeVariable(name: string, value: string): object`
Analiza una variable CSS y retorna información de tipo y preview.

#### `detectVariableType(name: string, value: string): string`
Detecta el tipo de una variable CSS (color, spacing, typography, etc.).

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests recomendados
npm test

# Tests específicos
npm run test:styles      # Sistema de estilos dinámicos
npm run test:variables   # Detector de variables
npm run test:cors        # Tests de CORS
npm run test:all         # Todos los tests
```

### Escribir Tests Nuevos

Los tests están organizados en `src/test/`. Cada archivo de test es un módulo ES6 que se puede ejecutar directamente con Node.js.

## 🤝 Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. **Ejecuta** los tests (`npm test`)
4. **Commit** tus cambios (`git commit -m 'Add amazing feature'`)
5. **Push** a la rama (`git push origin feature/amazing-feature`)
6. **Abre** un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🔗 Links

- [Documentación completa](./src/test/README.md)
- [Ejemplos de uso](./src/examples/)
- [Sistema de estilos dinámicos](./src/client/dynamic-styles.js)
- [Tests](./src/test/)

---

**theme-editor** - Sistema moderno de edición de CSS con estilos dinámicos para React ⚡
