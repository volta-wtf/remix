import React, { useState, useMemo } from 'react';
import { styles } from './panel-styles.js';
import { PropertyItem, SaveFooter, ColorSectionTabs, EmptyState } from './PropertyComponents.jsx';
import { AlphaInput, isAlphaFunction } from './AlphaInput.jsx';

/**
 * ColorPanel - Panel especializado para variables de colores
 *
 * Responsabilidades:
 * - Color Wheel: Variables tipo Tailwind (--color-red-*, --color-blue-*, etc.)
 * - Color Palette: Variables semánticas (--color-contrast-*, --tone-primary-*, etc.)
 *
 * Separado del VariablesPanel que maneja variables generales del tema.
 */
export function ColorPanel({
  cssVars,
  computedVars,
  originalVars,
  modifiedVars,
  saving,
  onSave,
  onResetAll,
  updateCSSVar,
  resetVar,
  settings = {} // Agregar settings
}) {
  const [activeSection, setActiveSection] = useState('wheel'); // 'wheel' o 'palette'
  const [hoveredItem, setHoveredItem] = useState(null);

  // Función para decidir qué componente usar
  const shouldUseAlphaInput = (value) => {
    const hasAlpha = isAlphaFunction(value);
    const enabledInSettings = settings.enableAlphaInputs;
    console.log(`🎨 ColorPanel shouldUseAlphaInput: value="${value}", hasAlpha=${hasAlpha}, enabled=${enabledInSettings}`);
    if (hasAlpha) {
      console.log(`🎨 ✅ Variable de color con función alpha detectada: ${value}`);
    }
    return enabledInSettings && hasAlpha;
  };

  // Filtrar y agrupar variables de colores
  const colorVars = useMemo(() => {
    const wheelColors = {};
    const paletteColors = {};

    console.log('🎨 Analizando variables para ColorPanel:', Object.keys(cssVars));

    // Definir los nombres de colores de la rueda
    const wheelColorNames = [
      'white', 'black', 'red', 'orange', 'amber', 'yellow', 'lime', 'green',
      'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
      'fuchsia', 'pink', 'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone'
    ];

    // Definir las categorías de la paleta semántica
    const paletteCategories = [
      'contrast', 'ambiental', 'primary', 'secondary', 'tertiary',
      'destructive', 'cautionary', 'positive', 'informative'
    ];

    Object.entries(cssVars).forEach(([varName, value]) => {
      // Filtrar variables que empiecen con --color- o --tone-
      if (!varName.startsWith('--color-') && !varName.startsWith('--tone-')) return;

      console.log(`🔍 Analizando variable de color: ${varName} = ${value}`);

      const colorName = varName.replace(/^--(color|tone)-/, '');

      // Verificar si es una variable de rueda de colores
      const isWheelColor = wheelColorNames.some(name => {
        return colorName === name || colorName.startsWith(`${name}-`);
      });

      // Verificar si es una variable de paleta semántica
      const isPaletteColor = paletteCategories.some(category => {
        return colorName.startsWith(`${category}-`);
      });

      console.log(`📊 ${varName}: isWheelColor=${isWheelColor}, isPaletteColor=${isPaletteColor}`);

      if (isWheelColor) {
        // Agrupar por color base (red, blue, etc.)
        const baseColor = wheelColorNames.find(name =>
          colorName === name || colorName.startsWith(`${name}-`)
        );

        if (!wheelColors[baseColor]) {
          wheelColors[baseColor] = [];
        }
        wheelColors[baseColor].push({ varName, value });
        console.log(`✅ Agregado a wheel: ${baseColor} -> ${varName}`);
      } else if (isPaletteColor) {
        // Agrupar por categoría semántica (contrast, primary, etc.)
        const category = paletteCategories.find(cat =>
          colorName.startsWith(`${cat}-`)
        );

        if (!paletteColors[category]) {
          paletteColors[category] = [];
        }
        paletteColors[category].push({ varName, value });
        console.log(`✅ Agregado a palette: ${category} -> ${varName}`);
      }
    });

    // Ordenar las variables dentro de cada grupo
    Object.keys(wheelColors).forEach(color => {
      wheelColors[color].sort((a, b) => {
        const aNum = parseInt(a.varName.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.varName.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });
    });

    Object.keys(paletteColors).forEach(category => {
      paletteColors[category].sort((a, b) => {
        const aNum = parseInt(a.varName.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.varName.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });
    });

    console.log('🎨 Resultado final ColorPanel:', {
      wheelColors: Object.keys(wheelColors),
      paletteColors: Object.keys(paletteColors),
      totalWheel: Object.keys(wheelColors).length,
      totalPalette: Object.keys(paletteColors).length
    });

    return { wheelColors, paletteColors };
  }, [cssVars]);

  const colorLabelTransform = (varName) => {
    return varName.replace(/^--(color|tone)-/, '').replace(/(^\w|-\w)/g, (m) => m.replace('-', '').toUpperCase());
  };

  const modifiedCount = Object.keys(modifiedVars).length;

  // Configuración de tabs de sección
  const sectionTabs = [
    {
      key: 'wheel',
      label: 'Color Wheel',
      icon: '',
      count: Object.keys(colorVars.wheelColors).length
    },
    {
      key: 'palette',
      label: 'Color Palette',
      icon: '',
      count: Object.keys(colorVars.paletteColors).length
    }
  ];

  // Función para renderizar una variable de color
  const renderColorVariable = ({ varName, value }) => {
    if (shouldUseAlphaInput(value)) {
      return (
        <AlphaInput
          key={varName}
          varName={varName}
          value={value}
          computedValue={computedVars[varName]}
          isModified={modifiedVars.hasOwnProperty(varName)}
          onUpdate={updateCSSVar}
          onReset={resetVar}
          placeholder="Valor de color"
          showPreview={settings.showPreview !== false}
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
          placeholder="Valor de color"
          labelTransform={colorLabelTransform}
          hoveredItem={hoveredItem}
          onHover={setHoveredItem}
          showPreview={settings.showPreview !== false}
          showTypeIndicator={false} // Los colores ya se muestran claramente
        />
      );
    }
  };

  console.log('🎨 ColorPanel render - settings:', settings);
  console.log('🎨 ColorPanel render - cssVars keys:', Object.keys(cssVars));

  // Log de variables que empiezan con --color- o --tone-
  const colorVariables = Object.entries(cssVars).filter(([varName]) =>
    varName.startsWith('--color-') || varName.startsWith('--tone-')
  );
  console.log('🎨 ColorPanel - Variables de colores encontradas:', colorVariables);

  return (
    <div data-slot="color-panel">
      {/* Header con tabs de sección */}
      <ColorSectionTabs
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={sectionTabs}
      />

      {/* Contenido de Color Wheel */}
      {activeSection === 'wheel' && (
        <div style={{ marginTop: '-1px' }}>
          {Object.entries(colorVars.wheelColors).map(([colorName, variables]) => (
            <div
              key={colorName}
              style={{
                paddingBlock: '8px',
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'hidden'
              }}>
              <h3 style={{
                fontSize: '11px',
                lineHeight: '16px',
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.4)',
                padding: '8px 16px',
                textTransform: 'capitalize'
              }}>
                {colorName} ({variables.length})
              </h3>
              {variables.map(renderColorVariable)}
            </div>
          ))}
        </div>
      )}

      {/* Contenido de Color Palette */}
      {activeSection === 'palette' && (
        <div>
          {Object.entries(colorVars.paletteColors).map(([category, variables]) => (
            <div key={category} style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1f2937',
                marginBottom: '12px',
                textTransform: 'capitalize'
              }}>
                {category} ({variables.length})
              </h3>
              {variables.map(renderColorVariable)}
            </div>
          ))}
        </div>
      )}

      {/* Estado vacío */}
      {Object.keys(colorVars.wheelColors).length === 0 && Object.keys(colorVars.paletteColors).length === 0 && (
        <EmptyState message="No se encontraron variables de colores en el tema actual." />
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