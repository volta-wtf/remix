// Script de depuración para diagnosticar stylesheets
console.log('=== DIAGNÓSTICO COMPLETO DE STYLESHEETS ===');

// 1. Listar todos los stylesheets
console.log(`Total stylesheets: ${document.styleSheets.length}`);

for (let i = 0; i < document.styleSheets.length; i++) {
  const sheet = document.styleSheets[i];

  const info = {
    index: i,
    href: sheet.href,
    title: sheet.title,
    disabled: sheet.disabled,
    media: sheet.media ? sheet.media.mediaText : null,
    ownerNode: sheet.ownerNode ? sheet.ownerNode.tagName : 'unknown',
    rules: 0
  };

  // Intentar contar reglas
  try {
    info.rules = sheet.cssRules ? sheet.cssRules.length : 0;
  } catch (e) {
    info.rules = 'CORS blocked';
  }

  // Identificar si es globals.css
  if (sheet.href) {
    const url = new URL(sheet.href);
    const pathname = url.pathname;
    const filename = pathname.split('/').pop();

    info.pathname = pathname;
    info.filename = filename;
    info.isGlobalsCss = filename === 'globals.css' || pathname.includes('globals.css');
  }

  console.log(`Stylesheet ${i}:`, info);
}

// 2. Buscar específicamente globals.css
console.log('\n=== BÚSQUEDA ESPECÍFICA DE GLOBALS.CSS ===');

let globalsCssFound = false;
for (let i = 0; i < document.styleSheets.length; i++) {
  const sheet = document.styleSheets[i];

  if (sheet.href) {
    const url = new URL(sheet.href);
    const pathname = url.pathname;
    const filename = pathname.split('/').pop();

    if (filename === 'globals.css' || pathname.includes('globals.css')) {
      globalsCssFound = true;
      console.log(`✅ Encontrado globals.css en index ${i}:`, {
        href: sheet.href,
        pathname,
        filename,
        disabled: sheet.disabled
      });

      // Intentar extraer variables
      try {
        const variables = {};
        for (let j = 0; j < sheet.cssRules.length; j++) {
          const rule = sheet.cssRules[j];
          if (rule.type === CSSRule.STYLE_RULE) {
            const cssText = rule.style.cssText;
            const varMatches = cssText.match(/--[\w-]+:\s*[^;]+/g);
            if (varMatches) {
              varMatches.forEach(match => {
                const [prop, value] = match.split(':').map(s => s.trim());
                variables[prop] = value.replace(/;$/, '');
              });
            }
          }
        }
        console.log(`📌 Variables encontradas:`, variables);
      } catch (e) {
        console.error(`❌ Error accediendo a reglas CSS:`, e.message);
      }
    }
  }
}

if (!globalsCssFound) {
  console.warn('❌ No se encontró globals.css en document.styleSheets');
}

// 3. Verificar elementos link
console.log('\n=== ELEMENTOS LINK EN EL DOM ===');
const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
linkElements.forEach((link, i) => {
  console.log(`Link ${i}:`, {
    href: link.href,
    pathname: link.href ? new URL(link.href).pathname : null,
    disabled: link.disabled
  });
});

console.log('=== FIN DIAGNÓSTICO ===');