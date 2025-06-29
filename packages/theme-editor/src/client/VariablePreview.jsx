import React from 'react';
import { analyzeVariable } from '../utils/variable-type-detector.js';
import { getVariableIcon } from '../icons/index.js';

/**
 * VariablePreview - Componente que muestra un preview visual de una variable CSS
 * basándose en su tipo detectado automáticamente
 */
export function VariablePreview({ varName, value, size = 'normal' }) {
  if (!varName) {
    return null;
  }

  // Detectar si es una referencia a variable CSS
  const isVariableReference = /^var\(--[\w-]+\)/.test(value?.trim() || '');

  // Usar la nueva función para obtener el icono apropiado
  const specialIcon = getVariableIcon(varName, value, isVariableReference);

  if (specialIcon) {
    return (
      <div
        title={specialIcon.tooltip}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'help'
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            flexShrink: 0
          }}
          dangerouslySetInnerHTML={{ __html: specialIcon.svg }}
        />
      </div>
    );
  }

  const analysis = analyzeVariable(varName, value);
  const { preview } = analysis;

  if (!preview) {
    return null;
  }

  // Ajustar tamaños según el prop size
  const sizeMultiplier = size === 'small' ? 0.8 : size === 'large' ? 1.2 : 1;

  const adjustedStyle = {
    ...preview.style,
    width: preview.style.width ? `${parseInt(preview.style.width) * sizeMultiplier}px` : undefined,
    height: preview.style.height ? `${parseInt(preview.style.height) * sizeMultiplier}px` : undefined,
    fontSize: preview.style.fontSize ? `${parseInt(preview.style.fontSize) * sizeMultiplier}px` : undefined
  };

  const PreviewElement = preview.element || 'div';

  // Renderizar contenido según el tipo
  const renderContent = () => {
    if (!preview.content) return null;

    if (typeof preview.content === 'object' && preview.content.type) {
      switch (preview.content.type) {
        case 'spacing-bar':
          return (
            <div style={preview.content} />
          );
        case 'typography-text':
          return (
            <span style={preview.content.style}>
              {preview.content.text}
            </span>
          );
        case 'unknown-icon':
          return (
            <div dangerouslySetInnerHTML={{ __html: preview.content.svg }} />
          );
        case 'empty-icon':
          return (
            <div dangerouslySetInnerHTML={{ __html: preview.content.svg }} />
          );
        default:
          return preview.content;
      }
    }

    return preview.content;
  };

  return (
    <div
      title={preview.tooltip}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'help'
      }}
    >
      <PreviewElement style={adjustedStyle}>
        {renderContent()}
      </PreviewElement>
    </div>
  );
}

/**
 * VariableTypeIndicator - Muestra un indicador del tipo de variable detectado
 */
export function VariableTypeIndicator({ varName, value, showLabel = false }) {
  if (!varName || !value) {
    return null;
  }

  const analysis = analyzeVariable(varName, value);
  const { type, metadata } = analysis;

  // Mapeo de tipos a colores e iconos
  const typeConfig = {
    color: {
      color: '#ef4444',
      icon: '●',
      label: 'Color'
    },
    spacing: {
      color: '#3b82f6',
      icon: '↔',
      label: 'Espaciado'
    },
    typography: {
      color: '#8b5cf6',
      icon: 'Aa',
      label: 'Tipografía'
    },
    border: {
      color: '#06b6d4',
      icon: '▢',
      label: 'Borde'
    },
    shadow: {
      color: '#6b7280',
      icon: '◐',
      label: 'Sombra'
    },
    default: {
      color: '#6b7280',
      icon: '?',
      label: 'Otro'
    }
  };

  const config = typeConfig[type] || typeConfig.default;

  return (
    <span
      title={`Tipo: ${config.label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '12px',
        color: config.color,
        fontWeight: '500'
      }}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

/**
 * VariableAnalysisPanel - Panel informativo que muestra el análisis completo de una variable
 */
export function VariableAnalysisPanel({ varName, value, isVisible = false }) {
  if (!isVisible || !varName || !value) {
    return null;
  }

  const analysis = analyzeVariable(varName, value);

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '12px',
        marginTop: '4px',
        zIndex: 1000
      }}
    >
      <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px' }}>
        <strong>Análisis de Variable</strong>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <VariablePreview varName={varName} value={value} size="normal" />
        <div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            Tipo detectado: <strong style={{ color: '#374151' }}>{analysis.type}</strong>
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            Valor: <code style={{ background: '#f3f4f6', padding: '2px 4px', borderRadius: '2px' }}>{value}</code>
          </div>
        </div>
      </div>

      {/* Información adicional basada en el tipo */}
      {analysis.metadata.isColor && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como color. Se muestra con un preview de color sólido.
        </div>
      )}

      {analysis.metadata.isSpacing && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como espaciado. Se muestra con una barra proporcional.
        </div>
      )}

      {analysis.metadata.isTypography && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como tipografía. Se muestra con texto de ejemplo.
        </div>
      )}

      {analysis.metadata.isBorder && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como borde. Se muestra con un elemento con borde.
        </div>
      )}

      {analysis.metadata.isShadow && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable se detectó como sombra. Se muestra con un elemento con la sombra aplicada.
        </div>
      )}

      {analysis.metadata.isDefault && (
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          💡 Esta variable no se pudo categorizar. Se muestra con un preview genérico.
        </div>
      )}
    </div>
  );
}