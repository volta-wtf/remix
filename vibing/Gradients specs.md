# Gradients App - Especificaciones y Guía de Desarrollo

## Descripción General

La **Gradients App** es una aplicación especializada en la creación, gestión y compartición de gradientes CSS. Incluye un sistema completo de autenticación, favoritos, y CRUD de gradientes personalizados.

## Arquitectura del Proyecto

### Estructura de Archivos
```
apps/shadcn/app/gradients/
├── page.tsx                    # Página principal con proveedores
├── contexts/
│   └── AuthContext.tsx         # Context de autenticación
├── partials/
│   ├── GradientGallery.tsx     # Componente principal de la galería
│   ├── GradientCard.tsx        # Tarjeta individual de gradiente
│   ├── GradientDrawer.tsx      # Drawer de detalles del gradiente
│   ├── GradientEditor.tsx      # Editor de gradientes
│   └── AuthDialog.tsx          # Modal de login/registro
├── types/
│   └── gradient.ts             # Tipos y datos de gradientes
└── utils/
    └── ImageWithFallback.tsx   # Componente utilitario de imagen
```

## Prácticas de Código y Patrones

### 1. Gestión de Estado Global
- **React Context**: Autenticación manejada por `AuthContext`
- **localStorage**: Persistencia local de datos de usuario y gradientes personalizados
- **Estado local**: Cada componente maneja su propio estado UI

```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  addToFavorites: (gradientId: string) => void;
  removeFromFavorites: (gradientId: string) => void;
  isFavorite: (gradientId: string) => boolean;
}
```

### 2. Tipado TypeScript Fuerte
- **Interfaces estrictas**: Definición clara de tipos de datos
- **Generic types**: Reutilización de tipos para diferentes contextos
- **Type guards**: Validación de tipos en runtime cuando es necesario

```typescript
export interface Gradient {
    id: string;
    name: string;
    description: string;
    colors: string[];
    direction: string;
    cssValue: string;
    category: string;
    author: string;
}
```

### 3. Sistema de Autenticación Mock
- **Autenticación simulada**: Para desarrollo y demostración
- **Persistencia local**: Datos de usuario guardados en localStorage
- **Estado reactivo**: Cambios de autenticación reflejados en toda la app

### 4. CRUD de Gradientes
- **Crear**: Nuevos gradientes personalizados
- **Leer**: Visualización de galería con filtros
- **Actualizar**: Edición de gradientes existentes
- **Eliminar**: Función implícita (no implementada por UX)

### 5. Sistema de Favoritos
- **Por usuario**: Cada usuario tiene su lista de favoritos
- **Persistencia**: Favoritos guardados en localStorage
- **Vista filtrada**: Opción de ver solo favoritos

## Especificaciones Técnicas

### Arquitectura de Componentes

#### GradientGallery (Componente Principal)
- **Responsabilidades**: Layout principal, state management, filtros
- **Estado local**:
  - `selectedGradient`: Gradiente actualmente seleccionado
  - `isDrawerOpen`: Estado del drawer de detalles
  - `isEditorOpen`: Estado del editor
  - `searchTerm`: Término de búsqueda
  - `selectedCategory`: Categoría filtrada
  - `customGradients`: Gradientes creados por el usuario

#### GradientCard
- **Props mínimas**: `gradient`, `onClick`, `onFavorite`
- **Responsabilidades**: Visualización y acciones básicas de gradiente
- **Interacciones**: Click para ver detalles, toggle de favoritos

#### GradientDrawer
- **Funcionalidad**: Vista detallada del gradiente
- **Acciones**: Ver detalles, editar, copiar CSS, agregar a favoritos
- **UX**: Drawer deslizable desde el lateral

#### GradientEditor
- **Modalidad**: Fullscreen editor
- **Funcionalidades**:
  - Editor de colores
  - Selector de dirección
  - Vista previa en tiempo real
  - Generación automática de CSS

#### AuthDialog
- **Dual purpose**: Login y registro en el mismo modal
- **Validación**: Básica de campos requeridos
- **UX**: Transición fluida entre modos

### Gestión de Datos

#### Datos Predefinidos
- **gradientData**: Array de gradientes precargados
- **Categorías**: Extraídas dinámicamente de los datos
- **Autores**: Sistema de atribución para cada gradiente

#### Datos de Usuario
- **localStorage key**: `gradient-gallery-user`
- **Estructura**: Objeto User con favoritos y gradientes creados
- **Sincronización**: Estado reactivo con localStorage

#### Gradientes Personalizados
- **localStorage key**: `custom-gradients`
- **Merge**: Combinación con datos predefinidos para vista unificada
- **Identificación**: IDs únicos basados en timestamp

### Sistema de Filtros

#### Búsqueda de Texto
- **Campos**: name, description
- **Comportamiento**: Filtrado en tiempo real, case-insensitive
- **UX**: Input con icono de búsqueda y botón de limpiar

#### Filtros por Categoría
- **Dinámico**: Categorías extraídas de todos los gradientes
- **Visual**: Badges clickeables con estado activo/inactivo
- **Comportamiento**: Filtro exclusivo (una categoría a la vez)

#### Filtros por Usuario
- **Solo Favoritos**: Vista filtrada de gradientes favoritos
- **Requisito**: Usuario autenticado
- **Toggle**: Botón en menú de usuario

## Guías de Desarrollo

### Añadir Nuevo Gradiente Predefinido
1. **Editar `types/gradient.ts`**
2. **Añadir objeto al array `gradientData`**
3. **Asegurar propiedades requeridas**: id único, cssValue válido
4. **Testear en la galería**

```typescript
{
    id: "13",
    name: "New Gradient",
    description: "Description here",
    colors: ["#color1", "#color2"],
    direction: "135deg",
    cssValue: "linear-gradient(135deg, #color1 0%, #color2 100%)",
    category: "New Category",
    author: "Author Name"
}
```

### Extender Funcionalidad de Autenticación
1. **Modificar interface `User`** en `AuthContext.tsx`
2. **Actualizar métodos del contexto**
3. **Ajustar persistencia** en localStorage
4. **Actualizar UI components** que usen los datos

### Añadir Nueva Vista/Modo
1. **Añadir estado** en `GradientGallery`
2. **Crear componente** de vista específica
3. **Añadir control** en UI (button/toggle)
4. **Implementar lógica** de renderizado condicional

### Integrar con API Real
1. **Reemplazar mock auth** con llamadas reales
2. **Implementar error handling**
3. **Añadir loading states**
4. **Actualizar persistencia** para usar backend

## Convenciones de Código

### Naming
- **Componentes**: PascalCase (`GradientGallery`)
- **Hooks de contexto**: `use` prefix (`useAuth`)
- **Event handlers**: `handle` prefix (`handleGradientClick`)
- **Estado booleano**: `is` prefix (`isDrawerOpen`)

### Props Pattern
```typescript
interface ComponentProps {
  // Props requeridas primero
  gradient: Gradient;
  onSave: (gradient: Gradient) => void;

  // Props opcionales después
  isOpen?: boolean;
  className?: string;

  // Event handlers al final
  onClose?: () => void;
}
```

### Error Handling
- **Try-catch**: En operaciones async (login, save)
- **Fallbacks**: Valores por defecto para datos corruptos
- **User feedback**: Toast notifications para errores

## Dependencias y Herramientas

### Core Dependencies
- **React 18**: Hooks y context
- **TypeScript**: Tipado estático
- **Framer Motion**: Animaciones
- **Lucide React**: Iconografía

### UI Components
- **Shadcn/ui**: Componentes base
- **Radix UI**: Primitivos (Dialog, Dropdown, etc.)
- **Tailwind CSS**: Styling system

### Utils
- **sonner**: Toast notifications
- **class-variance-authority**: Utility para variantes de componentes

## Performance y Optimización

### Optimizaciones Implementadas
- **useState lazy initialization**: Para datos pesados
- **useEffect con dependencies**: Evitar re-renders innecesarios
- **Conditional rendering**: Componentes no renderizados cuando no son necesarios

### Oportunidades de Mejora
- **useMemo**: Para cálculos pesados de filtros
- **useCallback**: Para funciones pasadas como props
- **React.memo**: Para componentes que re-renderizan frecuentemente
- **Virtual scrolling**: Para listas largas de gradientes

## Testing Strategy

### Unit Tests
- **Custom hooks**: Testear `useAuth` aisladamente
- **Utility functions**: Funciones puras de filtrado
- **Component logic**: Props y estado interno

### Integration Tests
- **Authentication flow**: Login/logout completo
- **CRUD operations**: Crear/editar/eliminar gradientes
- **Filter combinations**: Múltiples filtros aplicados

### E2E Tests
- **User journeys**: Flujos completos de usuario
- **Responsive behavior**: Diferentes tamaños de pantalla
- **LocalStorage persistence**: Datos mantenidos entre sesiones

## Futuras Mejoras

### Funcionalidades
1. **Gradientes radiales**: Soporte para `radial-gradient`
2. **Gradientes cónicos**: Soporte para `conic-gradient`
3. **Animación de gradientes**: CSS animations integradas
4. **Exportación avanzada**: SVG, imágenes, código
5. **Gradientes multi-stop**: Más de 2 colores
6. **Importación**: Desde archivos o URLs

### Arquitectura
1. **State management**: Zustand o Redux para estado complejo
2. **API integration**: Backend real con autenticación JWT
3. **Real-time sync**: WebSockets para colaboración
4. **PWA**: Progressive Web App capabilities
5. **CDN integration**: Hosting de gradientes compartidos

### UX/UI
1. **Drag & drop**: Reordenar gradientes
2. **Bulk operations**: Acciones múltiples
3. **Advanced search**: Búsqueda por colores, autor, etc.
4. **Themes**: Dark/light mode toggle
5. **Accessibility**: ARIA labels, keyboard navigation
6. **Mobile optimization**: Gestos táctiles específicos
