// apps/shadcn
// --port 3001
// Opción con globals locales y shadcn.css en worspace
// ✅ Carga bien el estilo en la página
// ✅ Carga variables en el panel
// ❌ Muestra valores compilados
// ❌ No muestra la referencia a la variable en el panel
// ✅ Guarda correctamente los valores
import "@workspace/ui-registry/shadcn.css"
import "./globals.css"

// apps/stylewind
// --port 3002
// opción con globals locales y stylewind.css en worspace
// ✅ Carga bien el estilo en la página
// ✅ Carga variables en el panel
// ❌ Muestra valores compilados
// ❌ No muestra la referencia a la variable en el panel
// ✅ Guarda correctamente los valores
import "@workspace/ui-registry/stylewind.css"
import "./globals.css"

// apps/tmp
// --port 3003
// Opción con globals locales con import de stylewind
// ✅ Carga bien el estilo en la página
// ✅ Carga variables en el panel
// ❌ Muestra valores compilados
// ❌ No muestra la referencia a la variable en el panel
// ✅ Guarda correctamente los valores
import "./globals.css"

// apps/tmp-1
// --port 3004
// Opción con globals en workspace
// ✅ Carga bien el estilo en la página
// ❌ No carga variables en el panel
import "../../../registry/styles/globals.css"

// apps/tmp-2
// --port 3005
// Opción con globals locales en workspace
// ✅ Carga bien el estilo en la página
// ❌ No carga variables en el panel
import "@workspace/ui-registry/globals.css"


// apps/tmp-3
// --port 3006
// Opción con globals locales sin import de stylewind
// ✅ Carga bien el estilo en la página
// ✅ Carga variables en el panel
// ❌ Muestra valores compilados
// ✅ Guarda correctamente los valores
import "./globals.css"