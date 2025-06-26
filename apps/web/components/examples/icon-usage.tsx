"use client"

// Ejemplo de cómo usar el nuevo sistema de iconos
import { Icon } from "@/lib/icon"
import { picto } from "@/lib/picto"

export function ExampleIconUsage() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Sistema de Iconos - Ejemplos de Uso</h2>

      {/* Opción 1: Usando el componente Icon con nombres semánticos */}
      <div className="space-y-2">
        <h3 className="font-semibold">Componente Icon (Recomendado)</h3>

        {/* Tamaños diferentes */}
        <div className="flex items-center gap-2">
          <Icon name="increase" size="xs" />
          <Icon name="increase" size="sm" />
          <Icon name="increase" size="md" />
          <Icon name="increase" size="lg" />
          <Icon name="increase" size="xl" />
          <Icon name="increase" size="2xl" />
        </div>

        {/* Colores diferentes */}
        <div className="flex items-center gap-2">
          <Icon name="decrease" color="default" />
          <Icon name="decrease" color="primary" />
          <Icon name="decrease" color="destructive" />
          <Icon name="decrease" color="success" />
          <Icon name="decrease" color="warning" />
          <Icon name="decrease" color="muted" />
        </div>

        {/* Con interactividad */}
        <div className="flex items-center gap-2">
          <Icon
            name="increase"
            size="lg"
            color="primary"
            onClick={() => console.log('¡Incrementar!')}
            aria-label="Incrementar valor"
          />
          <Icon
            name="decrease"
            size="lg"
            color="destructive"
            onClick={() => console.log('¡Decrementar!')}
            aria-label="Decrementar valor"
          />
        </div>
      </div>

      {/* Opción 2: Usando picto directamente (para casos específicos) */}
      <div className="space-y-2">
        <h3 className="font-semibold">Usando picto directamente</h3>
        <div className="flex items-center gap-2">
          {/* Cuando necesitas más control o usarlo dentro de otro componente */}
          <picto.increase className="size-6 text-green-600" />
          <picto.decrease className="size-6 text-red-600" />
        </div>
      </div>

      {/* Ejemplo en botones (como en activity-goal) */}
      <div className="space-y-2">
        <h3 className="font-semibold">En Botones (Reemplazando el uso actual)</h3>
        <div className="flex gap-2">
          {/* ❌ Antes: */}
          {/* <MinusIcon /> */}
          {/* <PlusIcon /> */}

          {/* ✅ Ahora: */}
          <button className="p-2 border rounded">
            <Icon name="decrease" size="sm" aria-label="Decrease" />
          </button>
          <button className="p-2 border rounded">
            <Icon name="increase" size="sm" aria-label="Increase" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Para usar en activity-goal.tsx, cambiarías:
/*
// ❌ Antes:
import { MinusIcon, PlusIcon } from "lucide-react"
<MinusIcon />
<PlusIcon />

// ✅ Ahora:
import { Icon } from "@workspace/ui/lib"
<Icon name="decrease" size="sm" />
<Icon name="increase" size="sm" />
*/