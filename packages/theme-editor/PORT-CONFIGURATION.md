# Configuración de Puertos - Theme Editor

## Problema Resuelto

Anteriormente, el Theme Editor usaba puertos hardcodeados (4444 y 4445) que causaban conflictos cuando se ejecutaban múltiples proyectos simultáneamente.

## Solución Implementada

### Detección Automática de Puerto

El Theme Editor ahora detecta automáticamente un puerto disponible:

- **Puerto por defecto**: 4444 (servidor principal) y 4445 (test CORS)
- **Detección automática**: Si el puerto está ocupado, busca automáticamente el siguiente puerto disponible
- **Configuración mediante variables de entorno**: Permite configurar puertos personalizados

### Variables de Entorno

Puedes configurar puertos específicos usando variables de entorno:

```bash
# Para el servidor principal del Theme Editor
export THEME_EDITOR_PORT=5000

# Para el servidor de test CORS
export CORS_TEST_PORT=5001
```

### Comportamiento

1. **Puerto disponible**: Si el puerto por defecto está libre, lo usa
2. **Puerto ocupado**: Busca automáticamente el siguiente puerto disponible
3. **Notificación**: Muestra un mensaje informativo cuando usa un puerto diferente al esperado

### Ejemplos de Salida

```bash
# Puerto por defecto disponible
🎨 Theme Editor server lista en http://localhost:4444

# Puerto ocupado, usando alternativo
🎨 Theme Editor server lista en http://localhost:4445
⚠️  Puerto 4444 ocupado, usando puerto 4445
```

## Beneficios

- ✅ **Sin conflictos**: Multiple proyectos pueden ejecutarse simultáneamente
- ✅ **Automático**: No requiere configuración manual
- ✅ **Flexible**: Permite configuración personalizada via variables de entorno
- ✅ **Informativo**: Notifica qué puerto está siendo usado

## Compatibilidad

Esta actualización es completamente compatible con proyectos existentes. No requiere cambios en el código de tu aplicación.