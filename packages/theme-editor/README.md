# theme-editor

Zero-config, local-first CSS variable editor for React projects.

## Características

- ✅ No requiere configuración
- ✅ Auto-detección de framework (Next.js, CRA, Vite)
- ✅ Inyección de botón flotante en desarrollo
- ✅ Edición en vivo de variables en `global.css`
- ✅ Se ejecuta desde `node_modules` sin copiar archivos

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

2. **Auto-detección del framework**
   Al requerir el paquete en modo desarrollo (`NODE_ENV=development`), se inspecciona el comando:
   - **Next.js** (`next dev`)
   - **Create React App** (`react-scripts start`)
   - **Vite** (`vite dev`)
   Según lo detectado, se registra automáticamente el plugin o middleware correspondiente.

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
- ✅ **Zero-config**: auto-detección de framework y sin pasos manuales.
- ✅ **Live-edit**: cambios aplicados en vivo y guardados en `global.css`.
- ✅ **Solo desarrollo**: no afecta el build de producción.
- ✅ **Extensible**: puedes añadir soporte para más frameworks o personalizar utilidades PostCSS.
