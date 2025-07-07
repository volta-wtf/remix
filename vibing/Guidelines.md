# Guidelines de Desarrollo - Prácticas Generales de Código

## Descripción General

Este documento establece las prácticas, patrones y convenciones de desarrollo identificadas en el codebase. Estas guías son agnósticas a la aplicación específica y pueden aplicarse a cualquier proyecto del monorepo.

## Arquitectura de Proyecto

### Estructura de Archivos Estándar

```
app/[feature]/
├── page.tsx                    # Página principal con lógica central
├── contexts/                   # Contextos de React específicos
│   └── FeatureContext.tsx
├── partials/                   # Componentes modulares
│   ├── MainComponent.tsx
│   ├── SubComponent.tsx
│   └── ui/                     # Componentes UI específicos
├── types/                      # Definiciones de tipos TypeScript
│   └── feature.ts
└── utils/                      # Utilidades específicas
    └── helpers.tsx
```

### Principios de Organización

1. **Co-location**: Archivos relacionados agrupados por funcionalidad
2. **Separación por tipo**: Contextos, tipos, utilidades en carpetas específicas
3. **Modularidad**: Componentes reutilizables en `partials/`
4. **Jerarquía clara**: Estructura predecible y navegable

## Convenciones de Naming

### Archivos y Carpetas
- **Componentes**: PascalCase (`MainNavigation.tsx`)
- **Páginas**: snake_case o kebab-case (`page.tsx`)
- **Carpetas**: kebab-case (`text-styles/`, `frame-styles/`)
- **Tipos**: PascalCase (`gradient.ts`, `textStyle.ts`)

### Variables y Funciones
- **Componentes React**: PascalCase (`MainNavigation`)
- **Variables**: camelCase (`activeSection`, `selectedCategory`)
- **Constantes**: UPPER_SNAKE_CASE (`ERROR_IMG_SRC`)
- **Event handlers**: `handle` prefix (`handleSectionChange`)
- **Estado booleano**: `is` prefix (`isDrawerOpen`, `isEditorOpen`)
- **Custom hooks**: `use` prefix (`useAuth`, `useFilteredData`)

### Props e Interfaces
```typescript
// Patrón estándar de props
interface ComponentNameProps {
  // Props requeridas primero
  data: DataType;
  onAction: (item: DataType) => void;

  // Props opcionales después
  isVisible?: boolean;
  className?: string;

  // Event handlers al final
  onClose?: () => void;
  onError?: (error: Error) => void;
}
```

## Patrones de TypeScript

### Definición de Tipos
```typescript
// Interface base para entidades
export interface BaseEntity {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isCustom?: boolean;
  isModified?: boolean;
}

// Extensión de tipos base
export interface ExtendedEntity extends BaseEntity {
  specificProperty: string;
  complexProperty: ComplexType;
}
```

### Tipado de Contextos
```typescript
interface ContextType {
  // Estado
  state: StateType | null;

  // Acciones síncronas
  action: (param: ParamType) => void;

  // Acciones asíncronas
  asyncAction: (param: ParamType) => Promise<boolean>;

  // Utilidades
  isCondition: (param: ParamType) => boolean;
}
```

### Union Types para Estados
```typescript
type Section = 'gradients' | 'text-styles' | 'frame-styles';
type ViewMode = 'grid' | 'list';
type FilterMode = 'all' | 'favorites' | 'custom';
```

## Patrones de Componentes React

### Estructura de Componente Estándar
```typescript
"use client" // Si necesita client-side

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { ComponentUI } from '@/components/ui/component';

interface ComponentProps {
  // Props definition
}

export function Component({ prop1, prop2, ...props }: ComponentProps) {
  // 1. Hooks de estado
  const [localState, setLocalState] = useState<Type>(defaultValue);

  // 2. Hooks de contexto
  const { contextValue } = useContext();

  // 3. Hooks de efecto
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 4. Computed values
  const computedValue = useMemo(() => {
    // Computation
  }, [dependencies]);

  // 5. Event handlers
  const handleEvent = (param: Type) => {
    // Handler logic
  };

  // 6. Early returns
  if (condition) return <LoadingComponent />;

  // 7. Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="component-styles"
    >
      {/* Component JSX */}
    </motion.div>
  );
}
```

### Patrones de Hooks Personalizados
```typescript
// Hook de filtrado genérico
function useFilteredData<T>(
  data: T[],
  searchQuery: string,
  category: string,
  filterFn?: (item: T) => boolean
) {
  return useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchLogic(item, searchQuery);
      const matchesCategory = categoryLogic(item, category);
      const matchesCustom = filterFn ? filterFn(item) : true;
      return matchesSearch && matchesCategory && matchesCustom;
    });
  }, [data, searchQuery, category, filterFn]);
}

// Hook de estado local persistente
function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## Gestión de Estado

### Estado Local vs Global
- **Local**: Estado UI específico del componente (modales, inputs, animaciones)
- **Global**: Estado compartido entre componentes (autenticación, data global)

### Patrón de Context
```typescript
// Context Provider estándar
export function FeatureProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StateType>(initialState);

  // Métodos del contexto
  const method = (param: ParamType) => {
    // Logic
    setState(newState);
  };

  // Valores computados
  const computed = useMemo(() => {
    return computeValue(state);
  }, [state]);

  return (
    <FeatureContext.Provider value={{
      state,
      method,
      computed
    }}>
      {children}
    </FeatureContext.Provider>
  );
}

// Hook de acceso al contexto
export function useFeature() {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeature must be used within a FeatureProvider');
  }
  return context;
}
```

### Persistencia Local
```typescript
// Patrón de guardado en localStorage
const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error);
    return fallback;
  }
};
```

## Patrones de UI y UX

### Animaciones con Framer Motion
```typescript
// Animaciones de entrada estándar
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// Layout animations para transiciones fluidas
<motion.div layoutId="uniqueId" />

// Hover animations
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
/>
```

### Responsive Design
```typescript
// Breakpoints estándar
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

// Clases Tailwind responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
```

### Loading States y Error Handling
```typescript
// Patrón de estados de carga
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleAsyncAction = async () => {
  setIsLoading(true);
  setError(null);

  try {
    await asyncOperation();
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setIsLoading(false);
  }
};

// Render condicional para estados
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
```

## Componentes Reutilizables

### Patrón de Fallback
```typescript
// Componente con fallback automático
export function ComponentWithFallback(props: ComponentProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  if (hasError) {
    return <FallbackComponent {...props} />;
  }

  return (
    <MainComponent
      {...props}
      onError={handleError}
    />
  );
}
```

### Editor Genérico de Propiedades
```typescript
// Patrón para editores dinámicos
interface PropertyEditorProps<T> {
  value: T;
  onChange: (value: T) => void;
  schema: PropertySchema<T>;
}

function PropertyEditor<T>({ value, onChange, schema }: PropertyEditorProps<T>) {
  return (
    <div>
      {Object.entries(schema).map(([key, config]) => (
        <PropertyInput
          key={key}
          type={config.type}
          value={value[key]}
          onChange={(newValue) => onChange({ ...value, [key]: newValue })}
        />
      ))}
    </div>
  );
}
```

## Búsqueda y Filtrado

### Patrón de Filtrado Genérico
```typescript
// Sistema de filtros reutilizable
interface FilterConfig<T> {
  searchFields: (keyof T)[];
  categoryField: keyof T;
  customFilters?: Array<{
    key: string;
    predicate: (item: T) => boolean;
  }>;
}

function useGenericFilter<T>(
  data: T[],
  query: string,
  category: string,
  config: FilterConfig<T>
) {
  return useMemo(() => {
    return data.filter(item => {
      // Search logic
      const matchesSearch = config.searchFields.some(field =>
        String(item[field]).toLowerCase().includes(query.toLowerCase())
      );

      // Category logic
      const matchesCategory = category === 'All' ||
        item[config.categoryField] === category;

      // Custom filters
      const matchesCustom = config.customFilters?.every(filter =>
        filter.predicate(item)
      ) ?? true;

      return matchesSearch && matchesCategory && matchesCustom;
    });
  }, [data, query, category, config]);
}
```

## Performance y Optimización

### Memoization Patterns
```typescript
// Memoización de componentes pesados
const ExpensiveComponent = React.memo(({ data }: { data: ComplexType }) => {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  return <div>{/* Render */}</div>;
});

// Callbacks estables
const stableCallback = useCallback((param: ParamType) => {
  // Callback logic
}, [dependencies]);
```

### Lazy Loading
```typescript
// Lazy loading de componentes
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## Testing Patterns

### Unit Testing
```typescript
// Test de hooks personalizados
import { renderHook, act } from '@testing-library/react';

test('custom hook behavior', () => {
  const { result } = renderHook(() => useCustomHook());

  expect(result.current.value).toBe(expectedValue);

  act(() => {
    result.current.action(param);
  });

  expect(result.current.value).toBe(newExpectedValue);
});
```

### Integration Testing
```typescript
// Test de flujos completos
test('complete user flow', async () => {
  render(<App />);

  const button = screen.getByRole('button', { name: /action/i });
  await user.click(button);

  await waitFor(() => {
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });
});
```

## Accessibility Guidelines

### ARIA y Semántica
```typescript
// Patrones de accesibilidad
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
  onClick={handleClose}
>
  <Icon aria-hidden="true" />
</button>

<div
  role="dialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  {/* Content */}
</div>
```

### Navegación por Teclado
```typescript
// Manejo de eventos de teclado
const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      handleClose();
      break;
    case 'Enter':
    case ' ':
      handleAction();
      break;
    default:
      return;
  }
  event.preventDefault();
};
```

## Validación y Error Handling

### Validación de Props
```typescript
// Validación runtime cuando sea necesario
const validateProps = (props: ComponentProps): void => {
  if (!props.requiredProp) {
    throw new Error('requiredProp is required');
  }

  if (props.numericProp && props.numericProp < 0) {
    console.warn('numericProp should be positive');
  }
};
```

### Error Boundaries
```typescript
class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## Internacionalización (i18n)

### Estructura de Textos
```typescript
// Patrón para textos localizables
const texts = {
  navigation: {
    gradients: 'Gradients',
    textStyles: 'Text Styles',
    frameStyles: 'Frame Styles'
  },
  actions: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete'
  }
} as const;

// Uso con type safety
function Component() {
  return <button>{texts.actions.save}</button>;
}
```

## Conclusión

Estas guidelines establecen un framework consistente para el desarrollo en el proyecto. Deben ser seguidas para mantener la coherencia del código y facilitar la colaboración entre desarrolladores.

### Principios Clave
1. **Consistencia**: Mismo patrón para problemas similares
2. **Predictibilidad**: Estructura y naming predecibles
3. **Reutilización**: Componentes y hooks reutilizables
4. **Type Safety**: TypeScript estricto en todo el código
5. **Performance**: Optimización consciente sin over-engineering
6. **Accessibility**: Inclusivo por diseño
7. **Maintainability**: Código legible y bien documentado
