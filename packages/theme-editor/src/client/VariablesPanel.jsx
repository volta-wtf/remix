import React, { useState } from 'react';
import { styles } from './panel-styles.js';
import { PropertyItem, SaveFooter, SectionHeader, ThemeSelector } from './PropertyComponents.jsx';
import { AlphaInput, isAlphaFunction } from './AlphaInput.jsx';

/**
 * VariablesPanel - Panel para variables generales del tema
 *
 * Responsabilidades:
 * - Variables de espaciado, tipografía, bordes, etc.
 * - Variables :root y reglas específicas
 *
 * EXCLUYE variables de colores que se manejan en ColorPanel.
 */
export function VariablesPanel({
  cssVars,
  computedVars,
  varSources,
  originalVars,
  modifiedVars,
  saving,
  onSave,
  onResetAll,
  dropdownOpen,
  setDropdownOpen,
  dropdownFilter,
  setDropdownFilter,
  hoveredItem: parentHoveredItem,
  setHoveredItem: setParentHoveredItem,
  isSpecificRulesCollapsed,
  setIsSpecificRulesCollapsed,
  updateCSSVar,
  resetVar,
  settings = {} // Agregar settings
}) {
  const [localHoveredItem, setLocalHoveredItem] = useState(null);

  // Usar hover local para este panel específico
  const hoveredItem = localHoveredItem;
  const setHoveredItem = setLocalHoveredItem;

  // Función para determinar si una variable es de colores
  const isColorVariable = (varName) => {
    return varName.startsWith('--color-') || varName.startsWith('--tone-');
  };

    // Función para decidir qué componente usar - NUEVA LÓGICA según imagen
  const shouldUseAlphaInput = (varName, computedValue, originalValue) => {
    if (!settings.enableAlphaInputs) return false;

    // Regla 1: Solo si el computado de la variable es color mostrar el input de alpha
    const isColor = isColorValue(computedValue);

    console.log(`🔍 shouldUseAlphaInput: ${varName}`);
    console.log(`  computedValue: "${computedValue}" → isColor: ${isColor}`);
    console.log(`  originalValue: "${originalValue}"`);

    return isColor;
  };

  // Función auxiliar para detectar si un valor es un color
  const isColorValue = (value) => {
    if (!value || typeof value !== 'string') return false;

    const colorPatterns = [
      /^#[0-9a-f]{3,8}$/i,           // Hex: #fff, #ffffff, #ffffff80
      /^rgb\s*\(/i,                   // RGB: rgb(255, 255, 255)
      /^rgba\s*\(/i,                  // RGBA: rgba(255, 255, 255, 0.5)
      /^hsl\s*\(/i,                   // HSL: hsl(120, 100%, 50%)
      /^hsla\s*\(/i,                  // HSLA: hsla(120, 100%, 50%, 0.5)
      /^oklch\s*\(/i,                 // OKLCH: oklch(0.5 0.2 120)
      /^(transparent|currentColor)$/i, // CSS keywords
      // Nombres de colores CSS comunes
      /^(red|blue|green|white|black|yellow|orange|purple|pink|brown|gray|grey|cyan|magenta|lime|navy|olive|silver|gold|tan|violet|indigo|coral|salmon|khaki|peru|plum|snow|azure|beige|bisque|ivory|linen|wheat|crimson|tomato|orange|gold|yellow|lime|green|cyan|blue|indigo|violet|magenta|pink|red|maroon|brown|olive|navy|teal|silver|gray|black|white)$/i
    ];

    return colorPatterns.some(pattern => pattern.test(value.trim()));
  };

  const modifiedCount = Object.keys(modifiedVars).length;

  // Variables principales filtradas
  const mainVariables = Object.entries(cssVars)
    .filter(([varName]) =>
      (!varSources[varName] || varSources[varName].type !== 'selector-specific') &&
      !isColorVariable(varName) // Excluir variables de colores
    );

  // Variables de reglas específicas filtradas
  const specificVariables = Object.entries(cssVars)
    .filter(([varName]) =>
      varSources[varName] && varSources[varName].type === 'selector-specific' &&
      !isColorVariable(varName) // Excluir variables de colores
    );

      console.log('🎨 VariablesPanel render - settings:', settings);

  return (
    <div>
      {/* Selector de Temas */}
      <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
        <ThemeSelector />
      </div>

      <div data-slot="property-list" style={styles.propertyList}>
        {/* Variables principales (:root y otros) - EXCLUYENDO variables de colores */}
        {mainVariables.map(([varName, value]) => {
          // Usar valor computado para detectar color, valor original para detectar --alpha()
          const originalValue = originalVars[varName] || value;
          const computedValue = computedVars[varName] || value;
          const shouldUseAlpha = shouldUseAlphaInput(varName, computedValue, originalValue);

          // Decidir qué componente usar basado en si tiene función --alpha()
          if (shouldUseAlpha) {
            return (
              <AlphaInput
                key={varName}
                varName={varName}
                value={value}
                computedValue={computedVars[varName]}
                isModified={modifiedVars.hasOwnProperty(varName)}
                onUpdate={updateCSSVar}
                onReset={resetVar}
                placeholder="Escribir valor CSS"
                showPreview={settings.showPreview !== false}
                showDropdown={true}
                hoveredItem={hoveredItem}
                onHover={setHoveredItem}
                dropdownProps={{
                  isOpen: dropdownOpen === varName,
                  onToggle: (currentVarName) => {
                    const isOpening = dropdownOpen !== currentVarName;
                    setDropdownOpen(isOpening ? currentVarName : null);
                    if (!isOpening) {
                      setParentHoveredItem(null);
                    }
                  },
                  cssVars,
                  filter: dropdownFilter[varName] || '',
                  onFilterChange: (e) => setDropdownFilter({
                    ...dropdownFilter,
                    [varName]: e.target.value
                  }),
                  onClose: () => {
                    setTimeout(() => {
                      setDropdownOpen(null);
                      setParentHoveredItem(null);
                    }, 200);
                  },
                  hoveredItem: parentHoveredItem,
                  onHover: setParentHoveredItem,
                  originalValue: originalVars[varName]
                }}
              />
            );
          } else {
            return (
              <PropertyItem
                key={varName}
                varName={varName}
                value={value}
                computedValue={computedVars[varName]}
                isModified={modifiedVars.hasOwnProperty(varName)}
                onUpdate={updateCSSVar}
                onReset={resetVar}
                placeholder="Escribir valor CSS"
                showDropdown={true}
                hoveredItem={hoveredItem}
                onHover={setHoveredItem}
                dropdownProps={{
                  isOpen: dropdownOpen === varName,
                  onToggle: (currentVarName) => {
                    const isOpening = dropdownOpen !== currentVarName;
                    setDropdownOpen(isOpening ? currentVarName : null);
                    if (!isOpening) {
                      setParentHoveredItem(null);
                    }
                  },
                  cssVars,
                  filter: dropdownFilter[varName] || '',
                  onFilterChange: (e) => setDropdownFilter({
                    ...dropdownFilter,
                    [varName]: e.target.value
                  }),
                  onClose: () => {
                    setTimeout(() => {
                      setDropdownOpen(null);
                      setParentHoveredItem(null);
                    }, 200);
                  },
                  hoveredItem: parentHoveredItem,
                  onHover: setParentHoveredItem,
                  originalValue: originalVars[varName]
                }}
              />
            );
          }
        })}
      </div>
      {/* Sección colapsable para variables de reglas específicas - EXCLUYENDO variables de colores */}
      {specificVariables.length > 0 && (
        <>
          <SectionHeader
            title="Variables de Reglas Específicas"
            count={specificVariables.length}
            isCollapsed={isSpecificRulesCollapsed}
            onToggle={() => setIsSpecificRulesCollapsed(!isSpecificRulesCollapsed)}
          />

          {!isSpecificRulesCollapsed && (
            <div style={{ paddingBlock: '16px' }}>
              {specificVariables.map(([varName, value]) => {
                // Usar valor computado para detectar color, valor original para detectar --alpha()
                const originalValue = originalVars[varName] || value;
                const computedValue = computedVars[varName] || value;
                const shouldUseAlpha = shouldUseAlphaInput(varName, computedValue, originalValue);

                // Decidir qué componente usar basado en si tiene función --alpha()
                if (shouldUseAlpha) {
                  return (
                    <AlphaInput
                      key={varName}
                      varName={varName}
                      value={value}
                      computedValue={computedVars[varName]}
                      isModified={modifiedVars.hasOwnProperty(varName)}
                      onUpdate={updateCSSVar}
                      onReset={resetVar}
                      placeholder="Escribir valor CSS"
                      showPreview={settings.showPreview !== false}
                      showDropdown={true}
                      hoveredItem={hoveredItem}
                      onHover={setHoveredItem}
                      dropdownProps={{
                        isOpen: dropdownOpen === varName,
                        onToggle: (currentVarName) => {
                          const isOpening = dropdownOpen !== currentVarName;
                          setDropdownOpen(isOpening ? currentVarName : null);
                          if (!isOpening) {
                            setParentHoveredItem(null);
                          }
                        },
                        cssVars,
                        filter: dropdownFilter[varName] || '',
                        onFilterChange: (e) => setDropdownFilter({
                          ...dropdownFilter,
                          [varName]: e.target.value
                        }),
                        onClose: () => {
                          setTimeout(() => {
                            setDropdownOpen(null);
                            setParentHoveredItem(null);
                          }, 200);
                        },
                        hoveredItem: parentHoveredItem,
                        onHover: setParentHoveredItem,
                        originalValue: originalVars[varName]
                      }}
                    />
                  );
                } else {
                  return (
                    <PropertyItem
                      key={varName}
                      varName={varName}
                      value={value}
                      computedValue={computedVars[varName]}
                      isModified={modifiedVars.hasOwnProperty(varName)}
                      onUpdate={updateCSSVar}
                      onReset={resetVar}
                      placeholder="Escribir valor CSS"
                      showDropdown={true}
                      hoveredItem={hoveredItem}
                      onHover={setHoveredItem}
                      dropdownProps={{
                        isOpen: dropdownOpen === varName,
                        onToggle: (currentVarName) => {
                          const isOpening = dropdownOpen !== currentVarName;
                          setDropdownOpen(isOpening ? currentVarName : null);
                          if (!isOpening) {
                            setParentHoveredItem(null);
                          }
                        },
                        cssVars,
                        filter: dropdownFilter[varName] || '',
                        onFilterChange: (e) => setDropdownFilter({
                          ...dropdownFilter,
                          [varName]: e.target.value
                        }),
                        onClose: () => {
                          setTimeout(() => {
                            setDropdownOpen(null);
                            setParentHoveredItem(null);
                          }, 200);
                        },
                        hoveredItem: parentHoveredItem,
                        onHover: setParentHoveredItem,
                        originalValue: originalVars[varName]
                      }}
                    />
                  );
                }
              })}
            </div>
          )}
        </>
      )}

      {/* Footer elegante para guardar */}
      <SaveFooter
        onSave={onSave}
        saving={saving}
        modifiedCount={modifiedCount}
        onResetAll={onResetAll}
        buttonText="Guardar"
        savingText="Guardando..."
        resetAllText="Descartar"
      />
    </div>
  );
}