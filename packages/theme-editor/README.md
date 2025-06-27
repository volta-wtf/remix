# theme-editor

Zero-config, local-first CSS variable editor for React projects.

## Características

- ✅ No requiere configuración
- ✅ Auto-detección de framework (Next.js, CRA, Vite)
- ✅ Inyección de botón flotante en desarrollo
- ✅ Edición en vivo de variables en `global.css`
- ✅ Se ejecuta desde `node_modules` sin copiar archivos
- ✨ **NUEVO**: Detección automática de tipos de variables CSS
- ✨ **NUEVO**: Previews visuales inteligentes para cada tipo de variable
- 🧠 **NUEVO**: Detección inteligente de estructura de proyectos (monorepo vs estándar)

## 🎨 Sistema de Detección de Variables y Previews

El theme-editor ahora incluye un sistema inteligente que analiza automáticamente las variables CSS y genera previews visuales apropiados:

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

### Uso Programático

```javascript
import { analyzeVariable } from './utils/variable-type-detector.js';

const analysis = analyzeVariable('--color-primary', '#3b82f6');
console.log(analysis);
// {
//   name: '--color-primary',
//   value: '#3b82f6',
//   type: 'color',
//   preview: { element: 'div', style: {...}, content: null, tooltip: 'Color: #3b82f6' },
//   metadata: { isColor: true, isSpacing: false, ... }
// }
```

## 🧠 Detección Inteligente de Proyectos

El theme-editor ahora incluye un sistema de detección inteligente que automáticamente identifica la estructura de tu proyecto y busca el archivo `globals.css` en la ubicación correcta:

### Tipos de Proyectos Soportados

#### **📁 Proyectos Estándar** (Next.js, CRA, Vite)
Para proyectos tradicionales con una sola aplicación:

```
mi-proyecto/
├── src/
│   ├── app/globals.css      ← Encontrado automáticamente
│   └── styles/globals.css   ← También soportado
├── styles/globals.css       ← También soportado
└── package.json
```

**Ubicaciones de búsqueda:**
- `src/app/globals.css` (Next.js)
- `src/styles/globals.css`
- `styles/globals.css`
- `app/globals.css`
- `src/globals.css`

#### **🏢 Monorepos con @workspace/ui**
Para monorepos que usan un sistema de diseño centralizado:

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

**Detección automática por:**
- Dependencia `@workspace/ui` en package.json
- Imports de `@workspace/ui` en archivos de layout
- Estructura `registry/styles/globals.css` o `packages/ui/src/styles/globals.css`
- Package.json con `workspaces` configurado

### Escenarios de Uso

#### **1. Ejecutar desde App del Monorepo**
```bash
cd /mi-monorepo/apps/web
npm run dev  # ← Encuentra automáticamente registry/styles/globals.css (o packages/ui/src/styles/globals.css)
```

#### **2. Ejecutar desde Raíz del Monorepo**
```bash
cd /mi-monorepo
npm run dev  # ← Detecta estructura y busca en registry/
```

#### **3. Ejecutar Proyecto Estándar**
```bash
cd /mi-proyecto-nextjs
npm run dev  # ← Busca en ubicaciones estándar de Next.js
```

### Configuración de Monorepo

Para que la detección funcione óptimamente en monorepos, asegúrate de:

1. **Dependencia en apps que usan el UI package:**
   ```json
   // apps/web/package.json
   {
     "dependencies": {
       "@workspace/ui-registry": "workspace:*"
     }
   }
   ```

2. **Import en layout principal:**
   ```tsx
   // apps/web/app/layout.tsx
   import "@workspace/ui-registry/globals.css"
   ```

3. **CSS centralizado en ubicación estándar:**
     ```
     registry/styles/globals.css (o packages/ui/src/styles/globals.css)
     ```

### Ventajas del Sistema Inteligente

- **🔍 Cero configuración**: Detecta automáticamente la estructura
- **🚀 Funciona en cualquier contexto**: Apps, monorepos, proyectos estándar
- **🛡️ No invasivo**: Ignora proyectos que no usan el sistema
- **📍 Búsqueda precisa**: Encuentra el CSS correcto sin ambigüedad
- **🎯 Optimizado**: Búsqueda dirigida según el tipo de proyecto

## Estructura del proyecto

```plaintext
theme-editor/
├── bin/
│   └── theme-editor             # CLI shim que arranca el loader y delega al comando real
├── src/
│   ├── index.js                 # Punto de entrada
│   ├── register.js              # Registra el loader
│   ├── loader.js                # Detección de framework y registro de plugin/middleware
│   ├── client/
│   │   └── theme-editor.js      # Script cliente para inyectar botón
│   ├── server/
│   │   ├── server.js            # Servidor del panel y WebSocket
│   │   └── ws.js                # Lógica de WebSocket
│   ├── ui/
│   │   ├── App.jsx              # Componente raíz React del panel
│   │   ├── Panel.jsx            # Layout y controles
│   │   ├── Button.jsx           # Botón flotante
│   │   └── index.js             # Exports de la UI
│   └── utils/
│       └── postcss-utils.js     # Utilidades PostCSS para variables CSS
├── dist/                        # Builds compilados
│   ├── index.js
│   ├── theme-editor.js
│   └── panel.js
├── rollup.config.js             # Configuración de Rollup
├── package.json                 # Metadatos y scripts
├── README.md                    # Documentación
└── .gitignore                   # Archivos ignorados
```

## Instalación y uso

1. Instala como dependencia de desarrollo:

   ```bash
   npm install --save-dev theme-editor
   ```

2. Ajusta tu script de desarrollo en `package.json`:

   ```json
   "scripts": {
     "dev": "theme-editor react-scripts start"
   }
   ```

3. Ejecuta tu app en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Al abrir la app en el navegador, verás un botón flotante para editar las variables de `global.css` en tiempo real.

## Esquema de solución

1. **Estructura del paquete**
   - `bin/theme-editor`: CLI shim que arranca el loader y delega al comando real.
   - `src/register.js` y `src/loader.js`: detección de Next.js, CRA o Vite y registro del plugin/middleware.
   - `src/client/theme-editor.js`: script inyectado en el navegador que monta el botón flotante y abre el panel en un iframe.
   - `src/server/`: micro-servidor (Express/Fastify) que sirve la UI y expone un WebSocket para sincronizar cambios.
   - `src/ui/`: componentes React del panel de edición (App, Panel, Button).
   - `src/utils/postcss-utils.js`: utilidades PostCSS para leer y escribir propiedades custom en `global.css`.
   - `dist/`: bundles compilados listos para publicación.

2. **Auto-detección del framework y estructura del proyecto**
   Al requerir el paquete en modo desarrollo (`NODE_ENV=development`):

   **Detección de Framework:**
   - **Next.js** (`next dev`)
   - **Create React App** (`react-scripts start`)
   - **Vite** (`vite dev`)

   **Detección Inteligente de Proyecto:**
   - Analiza dependencias para detectar `@workspace/ui`
   - Inspecciona estructura de directorios (`packages/`, `apps/`)
   - Busca `globals.css` en ubicaciones apropiadas según el tipo de proyecto
   - Adapta la búsqueda para monorepos vs proyectos estándar

   Según lo detectado, se registra automáticamente el plugin o middleware correspondiente y se configura la ruta correcta del CSS.

3. **Inyección del botón y el script**
   - El middleware/plugin intercepta las respuestas HTML de tu dev server.
   - Inserta un `<script src="http://localhost:4444/theme-editor.js"></script>` antes de `</body>`.
   - El script monta un botón flotante “Theme” que abre un iframe con el panel de edición.

4. **Servidor del panel y comunicación**
   - Arranca en el puerto 4444 y sirve:
     - `/theme-editor.js`: loader cliente.
     - `/panel/`: bundle React del editor.
     - WebSocket en `/ws`: para intercambiar mensajes `{ varName, newValue }`.
   - Al actualizar un valor en el panel, se aplica en vivo al DOM y se sobrescribe `global.css`.

5. **Zero Config**
   - **Sin importaciones manuales**: el CLI shim registra todo antes de ejecutar tu comando dev original.
   - **Sin configuración adicional**: no modificas `package.json`, config de Next.js, Vite o CRA.
   - **Solo en desarrollo**: en producción no ocurre ninguna inyección ni servidor extra.

## Notas clave

- ✅ **Local-first**: todo se ejecuta desde `node_modules`, sin copiar archivos al proyecto.
- ✅ **Zero-config**: auto-detección de framework y estructura de proyecto sin pasos manuales.
- ✅ **Live-edit**: cambios aplicados en vivo y guardados en `global.css`.
- ✅ **Solo desarrollo**: no afecta el build de producción.
- ✅ **Inteligente**: funciona tanto en proyectos estándar como en monorepos complejos.
- ✅ **No invasivo**: ignora proyectos que no usan el sistema de diseño.
- ✅ **Extensible**: puedes añadir soporte para más frameworks o personalizar utilidades PostCSS.
