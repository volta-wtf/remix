import React, { useState } from 'react';
import { styles } from './panel-styles.js';
import { VariableAnalysisPanel, VariableTypeIndicator } from './VariablePreview.jsx';
import { detectVariableType } from '../utils/variable-type-detector.js';

export function DebugPanel({
  cssVars,
  computedVars,
  varSources,
  originalVars,
  debugInfo,
  settings,
  testResolver
}) {
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [showAnalysisFor, setShowAnalysisFor] = useState(null);

  return (
    <div style={{ padding: '16px' }}>
      {/* CSS Resolver Testing Section */}
      <div style={styles.debugSection}>
        <h3 style={styles.debugSectionTitle}>
          🔧 Probador de Resolvedor CSS
        </h3>
        <div style={styles.debugContent}>
          <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '12px' }}>
            Prueba la resolución recursiva de variables CSS y funciones --alpha().
          </p>
          <button
            onClick={() => testResolver && testResolver()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              marginBottom: '12px'
            }}
          >
            🧪 Probar Resolvedor (Ver Consola)
          </button>
          <div style={{
            fontSize: '11px',
            color: '#6b7280',
            backgroundColor: '#f9fafb',
            padding: '8px',
            borderRadius: '4px',
            fontFamily: 'ui-monospace, monospace'
          }}>
            Ejemplo: "--alpha(var(--shadow-tint)/5%)" → "rgba(59, 130, 246, 0.05)"
          </div>
        </div>
      </div>

      {/* Variables Resueltas vs Originales */}
      <div style={styles.debugSection}>
        <h3 style={styles.debugSectionTitle}>
          🔄 Resolución de Variables
        </h3>
        <div style={styles.debugContent}>
          <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '12px' }}>
            Comparación entre valores del archivo CSS y valores resueltos para preview:
          </p>

          {Object.entries(cssVars).slice(0, 8).map(([varName, originalValue]) => {
            const resolvedValue = computedVars[varName];
            const hasChanged = resolvedValue && resolvedValue !== originalValue;

            return (
              <div key={varName} style={{
                padding: '8px',
                marginBottom: '8px',
                backgroundColor: hasChanged ? '#f0f9ff' : '#f9fafb',
                borderRadius: '4px',
                border: `1px solid ${hasChanged ? '#bfdbfe' : '#e5e7eb'}`
              }}>
                <div style={{ fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>
                  {varName}
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'ui-monospace, monospace' }}>
                  <div style={{ color: '#6b7280', marginBottom: '2px' }}>
                    📄 Archivo: {originalValue}
                  </div>
                  <div style={{ color: hasChanged ? '#1d4ed8' : '#6b7280' }}>
                    🎨 Resuelto: {resolvedValue || 'Sin cambios'}
                  </div>
                </div>
              </div>
            );
          })}

          {Object.keys(cssVars).length > 8 && (
            <div style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic' }}>
              ... y {Object.keys(cssVars).length - 8} variables más
            </div>
          )}
        </div>
      </div>

      {/* Análisis de Variables Section */}
      <div style={styles.debugSection}>
        <h3 style={styles.debugSectionTitle}>
          🧪 Análisis de Variables
        </h3>
        <div style={styles.debugContent}>
          <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '12px' }}>
            Selecciona una variable para ver su análisis detallado:
          </p>
          <select
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: 'white',
              marginBottom: '12px'
            }}
            value={selectedVariable || ''}
            onChange={(e) => {
              const varName = e.target.value;
              setSelectedVariable(varName);
              setShowAnalysisFor(varName);
            }}
          >
            <option value="">-- Seleccionar variable --</option>
            {Object.entries(cssVars)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([varName, value]) => (
                <option key={varName} value={varName}>
                  {varName} ({value.length > 30 ? value.substring(0, 30) + '...' : value})
                </option>
              ))}
          </select>

          {selectedVariable && (
            <div style={{ position: 'relative' }}>
              <VariableAnalysisPanel
                varName={selectedVariable}
                value={cssVars[selectedVariable]}
                isVisible={showAnalysisFor === selectedVariable}
              />
            </div>
          )}
        </div>
      </div>

      {/* Debug Info Section */}
      <div style={styles.debugSection}>
        <h3 style={styles.debugSectionTitle}>
          🔍 Información de Detección
        </h3>
        <div style={styles.debugContent}>
          <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '12px' }}>
            {Object.keys(cssVars).length} variables CSS encontradas
          </p>
          {debugInfo.map((info, index) => (
            <div key={index}>{info}</div>
          ))}
        </div>
      </div>

      {/* Nueva sección para debug de variables de colores */}
      <div style={styles.debugSection}>
        <h3 style={styles.debugSectionTitle}>🎨 Variables de Colores Detectadas</h3>
        <div style={styles.debugContent}>
          {Object.entries(cssVars).filter(([varName]) =>
            varName.startsWith('--color-') || varName.startsWith('--tone-')
          ).length > 0 ? (
            Object.entries(cssVars)
              .filter(([varName]) => varName.startsWith('--color-') || varName.startsWith('--tone-'))
              .slice(0, 20) // Mostrar solo las primeras 20
              .map(([varName, value]) => (
                <div key={varName} style={{
                  marginBottom: '4px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#4b5563'
                }}>
                  <strong style={{ color: '#1f2937' }}>{varName}:</strong> {value}
                </div>
              ))
          ) : (
            <div style={{ color: '#dc2626', fontSize: '12px' }}>
              ❌ No se encontraron variables de colores (--color-* o --tone-*)
            </div>
          )}
          {Object.entries(cssVars).filter(([varName]) =>
            varName.startsWith('--color-') || varName.startsWith('--tone-')
          ).length > 20 && (
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              ...y {Object.entries(cssVars).filter(([varName]) =>
                varName.startsWith('--color-') || varName.startsWith('--tone-')
              ).length - 20} más variables de colores
            </div>
          )}
        </div>
      </div>

      {/* Variables :root y principales */}
      <div style={styles.debugSection}>
        <h3 style={styles.debugSectionTitle}>
          🎨 Variables Principales (:root y otros)
        </h3>
        {Object.entries(cssVars)
          .filter(([varName]) =>
            !varSources[varName] ||
            varSources[varName].type !== 'selector-specific'
          )
          .map(([varName, value]) => (
            <div key={varName} style={styles.debugVariable}>
              <div style={styles.debugVariableName}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <VariableTypeIndicator
                    varName={varName}
                    value={value}
                    showLabel={false}
                  />
                  <span>{varName}</span>
                </div>
              </div>
              <div style={styles.debugVariableValue}>
                Valor: {value}
              </div>
              <div style={styles.debugVariableInfo}>
                Tipo detectado: <strong>{detectVariableType(varName, value)}</strong>
              </div>
              <div style={styles.debugVariableInfo}>
                Tipo CSS: {value.startsWith('var(') ? 'Referencia a variable' :
                       value.startsWith('#') ? 'Color hexadecimal' :
                       value.includes('px') ? 'Medida en píxeles' :
                       value.includes('rem') ? 'Medida relativa' :
                       value.includes('oklch') ? 'Color OKLCH' :
                       value === 'transparent' ? 'Transparente' :
                       value === 'currentColor' ? 'Color actual' :
                       'Valor directo'}
              </div>
              {varSources[varName] && (
                <div style={styles.debugVariableInfo}>
                  Archivo: {varSources[varName].file}
                </div>
              )}
              {varSources[varName] && (
                <div style={styles.debugVariableInfo}>
                  Regla: {varSources[varName].rule}
                  {varSources[varName].type !== 'inline' && ` (línea ${varSources[varName].ruleIndex + 1})`}
                </div>
              )}
              {varSources[varName] && varSources[varName].type && (
                <div style={{
                  ...styles.debugVariableInfo,
                  color: varSources[varName].type === 'inline' ? '#8b5cf6' :
                         varSources[varName].type === 'selector-specific' ? '#06b6d4' : '#6b7280'
                }}>
                  Tipo de origen: {
                    varSources[varName].type === 'inline' ? 'Estilo inline en elemento' :
                    varSources[varName].type === 'selector-specific' ? 'Regla CSS específica (no :root)' :
                    'Regla :root'
                  }
                </div>
              )}
              {!varSources[varName] && (
                <div style={{ ...styles.debugVariableInfo, color: '#f59e0b' }}>
                  Origen: Detectada por getComputedStyle - Posibles fuentes:
                  <br />• Variables heredadas de elementos padre
                  <br />• CSS generado por JavaScript/frameworks
                  <br />• Librerías externas (Tailwind, shadcn/ui, etc.)
                  <br />• CSS-in-JS o componentes con estilos dinámicos
                  <br />• Extensiones del navegador
                </div>
              )}

            </div>
          ))}
      </div>

      {/* Variables de Reglas Específicas */}
      {Object.entries(cssVars).filter(([varName]) =>
        varSources[varName] && varSources[varName].type === 'selector-specific'
      ).length > 0 && (
        <div style={styles.debugSection}>
          <h3 style={styles.debugSectionTitle}>
            ⚙️ Variables de Reglas Específicas (no :root)
          </h3>
          {Object.entries(cssVars)
            .filter(([varName]) =>
              varSources[varName] && varSources[varName].type === 'selector-specific'
            )
            .map(([varName, value]) => (
              <div key={varName} style={styles.debugVariable}>
                <div style={styles.debugVariableName}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <VariableTypeIndicator
                      varName={varName}
                      value={value}
                      showLabel={false}
                    />
                    <span>{varName}</span>
                  </div>
                </div>
                <div style={styles.debugVariableValue}>
                  Valor: {value}
                </div>
                <div style={styles.debugVariableInfo}>
                  Tipo detectado: <strong>{detectVariableType(varName, value)}</strong>
                </div>
                <div style={styles.debugVariableInfo}>
                  Tipo CSS: {value.startsWith('var(') ? 'Referencia a variable' :
                         value.startsWith('#') ? 'Color hexadecimal' :
                         value.includes('px') ? 'Medida en píxeles' :
                         value.includes('rem') ? 'Medida relativa' :
                         value.includes('oklch') ? 'Color OKLCH' :
                         value === 'transparent' ? 'Transparente' :
                         value === 'currentColor' ? 'Color actual' :
                         'Valor directo'}
                </div>
                {varSources[varName] && (
                  <div style={styles.debugVariableInfo}>
                    Archivo: {varSources[varName].file}
                  </div>
                )}
                {varSources[varName] && (
                  <div style={styles.debugVariableInfo}>
                    Regla: {varSources[varName].rule}
                    {varSources[varName].type !== 'inline' && ` (línea ${varSources[varName].ruleIndex + 1})`}
                  </div>
                )}
                {varSources[varName] && varSources[varName].type && (
                  <div style={{
                    ...styles.debugVariableInfo,
                    color: '#06b6d4'
                  }}>
                    Tipo de origen: Regla CSS específica (no :root)
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}