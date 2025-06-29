import React, { useState, useEffect, memo } from 'react';
import { styles } from './panel-styles.js';
import { PropertyItem } from './PropertyComponents.jsx';

/**
 * AlphaInput - Wrapper que combina PropertyItem normal con campo de opacidad
 * - Usa PropertyItem exactamente igual que otros componentes
 * - Agrega campo de opacidad al lado
 * - Convierte automáticamente a --alpha() cuando se usa opacidad
 */
const AlphaInputComponent = function AlphaInput({
  varName,
  value,
  computedValue,
  isModified,
  onUpdate,
  onReset,
  placeholder = "Valor CSS",
  showPreview = true,
  showDropdown = true,
  dropdownProps = {},
  hoveredItem,
  onHover,
  labelTransform = (name) => name.replace(/^--/, '').replace(/(^\w|-\w)/g, (m) => m.replace('-', ' ').toUpperCase())
}) {
  const [baseColor, setBaseColor] = useState('');
  const [alphaValue, setAlphaValue] = useState(100);
  const [hasAlpha, setHasAlpha] = useState(false);

    // Analizar el valor actual para extraer color base y opacidad
  useEffect(() => {
    console.log(`🔍 AlphaInput ${varName}: analyzing value "${value}"`);

    if (!value) {
      console.log(`❌ AlphaInput ${varName}: empty value`);
      setBaseColor('');
      setAlphaValue(100);
      setHasAlpha(false);
      return;
    }

    const result = parseAlphaFromAnyFunction(value);
    console.log(`🔍 AlphaInput ${varName}: parseAlphaFromAnyFunction result:`, result);

    if (result) {
      setBaseColor(result.baseColor);
      setAlphaValue(result.alphaPercentage);
      setHasAlpha(result.hasAlpha);
      console.log(`✅ AlphaInput ${varName}: parsed → base: "${result.baseColor}", alpha: ${result.alphaPercentage}%, hasAlpha: ${result.hasAlpha}`);
    } else {
      setBaseColor(value);
      setAlphaValue(100);
      setHasAlpha(false);
      console.log(`❌ AlphaInput ${varName}: parseAlphaFromAnyFunction returned null, using defaults`);
    }
  }, [value, varName]);

  // Manejar cambio en el color base (desde PropertyItem)
  const handleBaseColorChange = (receivedVarName, newBaseColor) => {
    console.log(`🔄 AlphaInput.handleBaseColorChange: ${varName} received change for ${receivedVarName} → "${newBaseColor}"`);

    if (receivedVarName !== varName) {
      console.log(`❌ AlphaInput: Variable mismatch! Expected ${varName}, got ${receivedVarName}`);
      return;
    }

    setBaseColor(newBaseColor);

    // Generar el valor final con la opacidad actual
    const newValue = buildColorWithAlpha(newBaseColor, alphaValue);
    console.log(`🔄 AlphaInput ${varName}: updating value to "${newValue}"`);
    onUpdate(varName, newValue);
  };

  // Manejar cambio en la opacidad
  const handleAlphaChange = (newAlpha) => {
    console.log(`🔄 AlphaInput ${varName}: alpha change to ${newAlpha}%`);
    const numericAlpha = parseFloat(newAlpha) || 100;
    setAlphaValue(numericAlpha);

    // Generar el valor final con la nueva opacidad
    const newValue = buildColorWithAlpha(baseColor, numericAlpha);
    console.log(`🔄 AlphaInput ${varName}: updating value to "${newValue}"`);
    onUpdate(varName, newValue);
    setHasAlpha(numericAlpha < 100);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
      {/* PropertyItem normal - exactamente igual que otros componentes */}
      <div style={{ flex: 1 }}>
        <PropertyItem
          varName={varName}
          value={baseColor}
          computedValue={computedValue}
          isModified={isModified}
          onUpdate={handleBaseColorChange}
          onReset={onReset}
          placeholder={placeholder}
          showPreview={showPreview}
          showDropdown={showDropdown}
          dropdownProps={dropdownProps}
          hoveredItem={hoveredItem}
          onHover={onHover}
          labelTransform={labelTransform}
        />
      </div>

      {/* Campo de opacidad */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        minWidth: '80px'
      }}>
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          value={alphaValue}
          onChange={(e) => handleAlphaChange(e.target.value)}
          style={{
            ...styles.input,
            fontSize: '13px',
            width: '50px',
            textAlign: 'center',
            borderColor: hasAlpha ? 'rgba(59, 130, 246, 0.3)' : 'rgba(0,0,0,0.1)',
            backgroundColor: hasAlpha ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
          }}
          title="Opacidad (100% = sin función alpha)"
        />
        <span style={{
          fontSize: '13px',
          color: hasAlpha ? '#3b82f6' : '#6b7280',
          fontWeight: hasAlpha ? '600' : '500'
        }}>
          %
        </span>
      </div>
    </div>
  );
};

// Exportar componente memoizado para evitar re-renders innecesarios
export const AlphaInput = memo(AlphaInputComponent);

/**
 * Detecta si un valor contiene función --alpha()
 */
export function isAlphaFunction(value) {
  if (!value || typeof value !== 'string') return false;

  // Patrón más flexible que permite ; opcional al final
  const alphaPattern = /^--alpha\s*\(\s*[^/]+\s*\/\s*\d+(?:\.\d+)?\s*%\s*\)\s*;?\s*$/i;
  const result = alphaPattern.test(value.trim());

  return result;
}

/**
 * Parsea CUALQUIER función con alpha y extrae color base + porcentaje
 * Soporta: --alpha(), rgba(), hsla(), oklch(), etc.
 */
function parseAlphaFromAnyFunction(value) {
  console.log(`🔍 parseAlphaFromAnyFunction: received value:`, value);

  if (!value || typeof value !== 'string') {
    console.log(`❌ parseAlphaFromAnyFunction: invalid value (${typeof value})`);
    return null;
  }

  const trimmed = value.trim();
  console.log(`🔍 parseAlphaFromAnyFunction: trimmed value: "${trimmed}"`);

  // 1. Función --alpha(color/percentage%)
  const alphaPattern = /^--alpha\s*\(\s*([^/]+)\s*\/\s*(\d+(?:\.\d+)?)\s*%\s*\)\s*;?\s*$/i;
  const alphaMatch = trimmed.match(alphaPattern);
  if (alphaMatch) {
    console.log(`✅ parseAlphaFromAnyFunction: --alpha() match found:`, alphaMatch);
    return {
      baseColor: alphaMatch[1].trim(),
      alphaPercentage: parseFloat(alphaMatch[2]),
      hasAlpha: true
    };
  }

  // 2. rgba(r, g, b, alpha) - alpha como decimal 0-1
  const rgbaPattern = /^rgba?\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\s*\)\s*$/i;
  const rgbaMatch = trimmed.match(rgbaPattern);
  if (rgbaMatch) {
    const alpha = parseFloat(rgbaMatch[4]);
    const percentage = Math.round(alpha * 100);
    const baseColor = `rgb(${rgbaMatch[1].trim()}, ${rgbaMatch[2].trim()}, ${rgbaMatch[3].trim()})`;
    console.log(`✅ parseAlphaFromAnyFunction: rgba() match found, alpha: ${alpha}, percentage: ${percentage}%`);
    return {
      baseColor,
      alphaPercentage: percentage,
      hasAlpha: alpha < 1
    };
  }

  // 3. hsla(h, s, l, alpha) - alpha como decimal 0-1
  const hslaPattern = /^hsla?\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\s*\)\s*$/i;
  const hslaMatch = trimmed.match(hslaPattern);
  if (hslaMatch) {
    const alpha = parseFloat(hslaMatch[4]);
    const percentage = Math.round(alpha * 100);
    const baseColor = `hsl(${hslaMatch[1].trim()}, ${hslaMatch[2].trim()}, ${hslaMatch[3].trim()})`;
    console.log(`✅ parseAlphaFromAnyFunction: hsla() match found, alpha: ${alpha}, percentage: ${percentage}%`);
    return {
      baseColor,
      alphaPercentage: percentage,
      hasAlpha: alpha < 1
    };
  }

  // 4. Para cualquier otro valor (hex, named colors, var(), etc.) - 100% opacidad
  console.log(`🔍 parseAlphaFromAnyFunction: no special format found, using default 100%`);
  return {
    baseColor: trimmed,
    alphaPercentage: 100,
    hasAlpha: false
  };
}

/**
 * Construye un valor de color con alpha en el formato correcto
 * Detecta el tipo de color y usa el formato apropiado
 */
function buildColorWithAlpha(baseColor, alphaPercentage) {
  console.log(`🔧 buildColorWithAlpha: baseColor="${baseColor}", alphaPercentage=${alphaPercentage}%`);

  if (!baseColor) {
    console.log(`❌ buildColorWithAlpha: empty baseColor`);
    return '';
  }

  // Si opacidad es 100%, devolver color base sin modificar
  if (alphaPercentage >= 100) {
    console.log(`✅ buildColorWithAlpha: 100% opacity, returning original "${baseColor}"`);
    return baseColor;
  }

  const trimmed = baseColor.trim();
  const alphaDecimal = alphaPercentage / 100;
  console.log(`🔧 buildColorWithAlpha: trimmed="${trimmed}", alphaDecimal=${alphaDecimal}`);

  // 1. rgb(r, g, b) → rgba(r, g, b, alpha)
  const rgbPattern = /^rgb\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\s*\)\s*$/i;
  const rgbMatch = trimmed.match(rgbPattern);
  if (rgbMatch) {
    const result = `rgba(${rgbMatch[1].trim()}, ${rgbMatch[2].trim()}, ${rgbMatch[3].trim()}, ${alphaDecimal})`;
    console.log(`✅ buildColorWithAlpha: rgb → rgba: "${result}"`);
    return result;
  }

  // 2. hsl(h, s, l) → hsla(h, s, l, alpha)
  const hslPattern = /^hsl\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\s*\)\s*$/i;
  const hslMatch = trimmed.match(hslPattern);
  if (hslMatch) {
    const result = `hsla(${hslMatch[1].trim()}, ${hslMatch[2].trim()}, ${hslMatch[3].trim()}, ${alphaDecimal})`;
    console.log(`✅ buildColorWithAlpha: hsl → hsla: "${result}"`);
    return result;
  }

  // 3. Para cualquier otro formato (hex, var(), nombres CSS, etc.) → --alpha()
  const result = `--alpha(${trimmed}/${alphaPercentage}%)`;
  console.log(`✅ buildColorWithAlpha: other format → --alpha(): "${result}"`);
  return result;
}

/**
 * Parsea una función --alpha() y extrae sus componentes
 * (Función legacy mantenida para compatibilidad)
 */
export function parseAlphaFunction(value) {
  if (!value || typeof value !== 'string') return null;

  // Patrón flexible que permite ; opcional al final
  const alphaPattern = /^--alpha\s*\(\s*([^/]+)\s*\/\s*(\d+(?:\.\d+)?)\s*%\s*\)\s*;?\s*$/i;
  const match = value.match(alphaPattern);

  if (match) {
    return {
      color: match[1].trim(),
      alpha: parseFloat(match[2])
    };
  }

  return null;
}
