# Gallery App - Especificaciones y Guía de Desarrollo

## Descripción General

La **Gallery App** es una aplicación de galería visual que permite explorar, editar y gestionar tres tipos de estilos visuales:
- **Gradientes**: Gradientes de colores personalizables
- **Estilos de Texto**: Efectos tipográficos y WordArt
- **Estilos de Marco**: Efectos de materiales y marcos decorativos

## Arquitectura del Proyecto

### Estructura de Archivos
```
apps/shadcn/app/gallery/
├── page.tsx                    # Página principal y lógica de estado
└── partials/
    ├── MainNavigation.tsx      # Navegación entre secciones
    ├── SearchAndFilter.tsx     # Sistema de búsqueda y filtros
    ├── GradientGrid.tsx        # Grid de gradientes
    ├── GradientPanel.tsx       # Modal de edición de gradientes
    ├── TextStylesGrid.tsx      # Grid de estilos de texto
    ├── TextStylePanel.tsx      # Modal de edición de texto
    ├── FrameStylesGrid.tsx     # Grid de estilos de marco
    ├── FrameStylePanel.tsx     # Modal de edición de marcos
    ├── CSSPropertyEditor.tsx   # Editor genérico de propiedades CSS
    ├── ShadowEditor.tsx        # Editor específico de sombras
    ├── ImageWithFallback.tsx   # Componente de imagen con fallback
    └── ui/                     # Componentes UI específicos de la app
```

## Prácticas de Código y Patrones

### 1. Gestión de Estado
- **Estado local centralizado**: Un solo estado en `page.tsx` que maneja todas las secciones
- **Tipos TypeScript estrictos**: Interfaces definidas para `Gradient`, `TextStyle`, y `FrameStyle`
- **Estado derivado**: Filtros y búsquedas calculados a partir del estado base

```typescript
// Ejemplo de tipo base
export interface Gradient {
  id: string;
  name: string;
  description: string;
  gradient: string;
  colors: string[];
  inspiration: string;
  usage: string;
  category: string;
  tags: string[];
  isCustom?: boolean;
  isModified?: boolean;
}
```

### 2. Componentes Modulares
- **Separación por responsabilidad**: Cada componente tiene una función específica
- **Props tipadas**: Todas las props están tipadas con interfaces TypeScript
- **Composición sobre herencia**: Componentes reutilizables y composables

### 3. Sistema de Navegación
- **Navegación por secciones**: Uso de `layoutId` para animaciones fluidas entre tabs
- **Estado persistente**: La sección activa se mantiene durante la sesión
- **Responsive design**: Adaptable a diferentes tamaños de pantalla

### 4. Sistema de Filtros y Búsqueda
- **Filtrado en tiempo real**: Búsqueda instantánea sin debounce
- **Múltiples criterios**: Filtros por categoría, tags y texto libre
- **Estado visual**: Indicadores claros de filtros activos

### 5. Animaciones y Transiciones
- **Framer Motion**: Animaciones fluidas en todos los componentes
- **Lazy loading**: AnimatePresence para transiciones de entrada/salida
- **Micro-interacciones**: Hover states y feedback visual

## Especificaciones Técnicas

### Gestión de Datos
- **Datos estáticos**: Arrays de datos predefinidos para cada tipo de estilo
- **CRUD local**: Operaciones de crear, leer, actualizar y duplicar elementos
- **Persistencia temporal**: Cambios mantenidos durante la sesión activa

### Sistema de Edición
- **Lightboxes modales**: Editores fullscreen para cada tipo de estilo
- **Editor de propiedades CSS**: Componente genérico para editar cualquier propiedad CSS
- **Vista previa en tiempo real**: Cambios reflejados instantáneamente
- **Copia de CSS**: Funcionalidad de exportar CSS generado

### Componentes Reutilizables
- **ImageWithFallback**: Componente con imagen de respaldo automático
- **CSSPropertyEditor**: Editor genérico de propiedades CSS con diferentes tipos de input
- **ShadowEditor**: Editor especializado para efectos de sombra

## Guías de Desarrollo

### Añadir Nueva Sección
1. **Definir tipo de dato**: Crear interface en `page.tsx`
2. **Crear datos mock**: Añadir array de datos de ejemplo
3. **Crear Grid component**: Componente para mostrar elementos
4. **Crear Lightbox component**: Editor modal para el tipo de elemento
5. **Actualizar navegación**: Añadir nueva opción en `MainNavigation.tsx`
6. **Integrar en página principal**: Añadir lógica de renderizado condicional

### Añadir Nueva Funcionalidad de Edición
1. **Identificar tipo de propiedad**: Color, numérica, texto, compleja
2. **Crear input apropiado**: Slider, color picker, input text, etc.
3. **Integrar en CSSPropertyEditor**: Añadir lógica de renderizado
4. **Probar con vista previa**: Verificar que los cambios se reflejen correctamente

### Convenciones de Naming
- **Componentes**: PascalCase (`MainNavigation.tsx`)
- **Props interfaces**: `ComponentNameProps`
- **Tipos de datos**: PascalCase (`Gradient`, `TextStyle`)
- **Funciones de evento**: `handle` prefix (`handleSectionChange`)
- **Estados locales**: camelCase (`activeSection`, `selectedCategory`)

### Estilo y CSS
- **Tailwind CSS**: Clases utilitarias como sistema principal
- **CSS-in-JS**: Estilos dinámicos usando el atributo `style`
- **Variables CSS**: Uso del sistema de design tokens
- **Responsive**: Mobile-first approach con breakpoints `sm:`, `md:`, `lg:`

### Performance
- **Memo para listas**: Componentes de grid memoizados para evitar re-renders
- **Lazy loading**: Lightboxes cargados solo cuando son necesarios
- **Debounce en búsquedas**: Para búsquedas complejas (actualmente deshabilitado)
- **Virtual scrolling**: Para listas muy largas (a implementar)

## Dependencias Clave
- **Framer Motion**: Animaciones (`@/lib/motion`)
- **Lucide React**: Iconografía
- **Sonner**: Sistema de notificaciones
- **Shadcn/ui**: Componentes base de UI

## Patrones de Diseño Utilizados

### Compound Components
Los lightboxes utilizan el patrón de compound components para composición flexible:

```typescript
<GradientPanel
  gradient={selectedGradient}
  onUpdate={handleUpdate}
  onClose={handleClose}
>
  <GradientPanel.Header />
  <GradientPanel.Editor />
  <GradientPanel.Preview />
</GradientPanel>
```

### Render Props
El sistema de filtros utiliza render props para flexibilidad:

```typescript
<SearchAndFilter
  onSearchChange={setSearch}
  render={({ filteredData }) => (
    <Grid data={filteredData} />
  )}
/>
```

### Custom Hooks
Lógica reutilizable extraída a custom hooks:

```typescript
const useFilteredData = (data, searchQuery, category) => {
  return useMemo(() => {
    // lógica de filtrado
  }, [data, searchQuery, category]);
};
```

## Testing y Calidad
- **TypeScript estricto**: Configuración estricta para type safety
- **Props validation**: Todas las props tipadas y validadas
- **Error boundaries**: Manejo de errores en componentes críticos
- **Loading states**: Estados de carga para mejor UX

## Futuras Mejoras
1. **Persistencia real**: Integración con base de datos
2. **Autenticación**: Sistema de usuarios y favoritos
3. **Colaboración**: Compartir y comentar estilos
4. **Exportación avanzada**: Múltiples formatos de exportación
5. **AI Integration**: Generación automática de estilos
6. **Plugin system**: Extensibilidad para nuevos tipos de estilos
