const fs = require('fs');

// Leer el CSS
const css = fs.readFileSync('../ui/src/styles/globals.css', 'utf8');

console.log('🔍 Debug: Búsqueda de selectores hacia atrás');
console.log('CSS length:', css.length);

// Buscar todas las ocurrencias de --background
const varName = '--background';
const escapedVarName = varName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
const varRegex = new RegExp(`(\\s*${escapedVarName}\\s*:\\s*)[^;\\n]+`, 'g');

let match;
const matches = [];

while ((match = varRegex.exec(css)) !== null) {
  matches.push({
    start: match.index,
    end: match.index + match[0].length,
    fullMatch: match[0],
    prefix: match[1],
    line: css.substring(0, match.index).split('\n').length
  });
}

console.log(`\n📍 Encontradas ${matches.length} ocurrencias de ${varName}:`);

matches.forEach((match, index) => {
  console.log(`\n🔍 Ocurrencia ${index + 1}:`);
  console.log(`  Posición: ${match.start}-${match.end}`);
  console.log(`  Línea: ${match.line}`);
  console.log(`  Contenido: "${match.fullMatch.trim()}"`);

  // Buscar hacia atrás para encontrar el selector más cercano
  const beforeVariable = css.substring(0, match.start);

  console.log(`  Buscando selectores hacia atrás...`);

  // Buscar los selectores hacia atrás
  const rootMatch = beforeVariable.lastIndexOf(':root');
  const darkMatch = beforeVariable.lastIndexOf('.dark');

  console.log(`  Última ocurrencia de ':root': ${rootMatch}`);
  console.log(`  Última ocurrencia de '.dark': ${darkMatch}`);

  // Determinar cuál selector está más cerca
  let closestSelector = null;
  let closestPosition = -1;

  if (rootMatch !== -1 && rootMatch > closestPosition) {
    closestSelector = ':root';
    closestPosition = rootMatch;
  }

  if (darkMatch !== -1 && darkMatch > closestPosition) {
    closestSelector = '.dark';
    closestPosition = darkMatch;
  }

  console.log(`  Selector más cercano: ${closestSelector} en posición ${closestPosition}`);

  // Mostrar contexto alrededor del selector
  if (closestPosition !== -1) {
    const selectorContext = css.substring(closestPosition, closestPosition + 50);
    console.log(`  Contexto del selector: "${selectorContext}..."`);
  }
});

// Verificar si hay algún problema con los selectores
console.log('\n🔍 Verificando selectores en el archivo:');
const rootPositions = [];
const darkPositions = [];

let pos = 0;
while ((pos = css.indexOf(':root', pos)) !== -1) {
  rootPositions.push(pos);
  pos++;
}

pos = 0;
while ((pos = css.indexOf('.dark', pos)) !== -1) {
  darkPositions.push(pos);
  pos++;
}

console.log(`Posiciones de ':root': ${rootPositions}`);
console.log(`Posiciones de '.dark': ${darkPositions}`);