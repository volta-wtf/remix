import React from 'react';
import { styles } from './panel-styles.js';

/**
 * PropertyItem - Componente reutilizable para renderizar una variable CSS
 */
export function PropertyItem({
  varName,
  value,
  isModified,
  onUpdate,
  onReset,
  placeholder = "Valor CSS",
  showDropdown = false,
  dropdownProps = {},
  labelTransform = (name) => name.replace(/^--/, '').replace(/(^\w|-\w)/g, (m) => m.replace('-', ' ').toUpperCase()),
  hoveredItem,
  onHover
}) {
  const currentStyle = isModified ? styles.variableModified : styles.variable;
  const isHovered = hoveredItem === varName;
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      data-slot="property-item"
      style={currentStyle}
      onMouseEnter={() => onHover?.(varName)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div style={styles.property}>
        <label style={styles.label}>
          {labelTransform(varName)}
          {isModified && <span style={styles.indicator}>●</span>}
        </label>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            style={{
              ...styles.input,
              borderColor: (isFocused ? 'rgba(0,0,0,0.4)' : (isHovered ? 'rgba(0,0,0,0.1)' : 'transparent')),
              paddingRight: '28px',
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={(e) => onUpdate(varName, e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
          />

          {showDropdown ? (
            <DropdownButton
              varName={varName}
              {...dropdownProps}
            />
          ) : (
            // Solo mostrar reset button si está modificado Y tiene hover
            isModified && isHovered && (
              <ResetButton
                varName={varName}
                onReset={onReset}
              />
            )
          )}

          {showDropdown && dropdownProps.isOpen && (
            <VariableDropdown
              varName={varName}
              onUpdate={onUpdate}
              {...dropdownProps}
            />
          )}
        </div>
      </div>
      <div style={styles.value}>
        Valor actual: {value}
        {isModified && dropdownProps.originalValue && (
          <span style={{ color: '#ef4444', marginLeft: '12px', fontSize: '12px' }}>
            Valor anterior: {dropdownProps.originalValue}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * ResetButton - Botón para resetear una variable
 */
export function ResetButton({ varName, onReset }) {
  return (
    <button
      type="button"
      style={{
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280',
        fontSize: '12px',
        padding: '2px',
      }}
      onClick={() => onReset(varName)}
      title="Resetear valor"
    >
      ↺
    </button>
  );
}

/**
 * DropdownButton - Botón para abrir dropdown de variables
 */
export function DropdownButton({ varName, isOpen, onToggle }) {
  return (
    <button
      type="button"
      style={{
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280',
        fontSize: '12px',
        padding: '2px',
      }}
      onClick={() => onToggle(varName)}
    >
      {isOpen ? '▲' : '▼'}
    </button>
  );
}

/**
 * VariableDropdown - Dropdown para seleccionar variables CSS
 */
export function VariableDropdown({
  varName,
  cssVars,
  filter,
  onFilterChange,
  onUpdate,
  onClose,
  hoveredItem,
  onHover
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        zIndex: 10001,
        maxHeight: '180px',
        overflowY: 'auto',
        marginTop: '2px',
      }}
    >
      <input
        type="text"
        style={{
          ...styles.input,
          border: 'none',
          borderBottom: '1px solid #e5e7eb',
          borderRadius: 0,
          margin: 0,
          width: '100%',
          fontSize: '12px',
          background: '#f3f4f6',
        }}
        placeholder="Filtrar variables..."
        value={filter}
        onChange={onFilterChange}
        onBlur={() => setTimeout(onClose, 200)}
        autoFocus
      />
      {Object.keys(cssVars)
        .filter(v =>
          v !== varName &&
          (!filter || v.toLowerCase().includes(filter.toLowerCase()))
        )
        .map(v => (
          <div
            key={v}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#374151',
              background: hoveredItem === `${varName}-${v}` ? '#e0e7ff' : 'transparent',
              borderBottom: '1px solid #f3f4f6',
              transition: 'background-color 0.1s ease',
            }}
            onMouseEnter={() => onHover(`${varName}-${v}`)}
            onMouseLeave={() => onHover(null)}
            onMouseDown={e => {
              e.preventDefault();
              onUpdate(varName, `var(${v})`);
              onClose();
            }}
          >
            <div style={{ fontWeight: '500' }}>{v}</div>
            <div style={{ fontSize: '10px', color: '#9ca3af' }}>
              {cssVars[v]}
            </div>
          </div>
        ))}
    </div>
  );
}

/**
 * SaveButton - Botón para guardar cambios (versión inline/sticky)
 */
export function SaveButton({
  onSave,
  saving,
  modifiedCount,
  buttonText = "Guardar Cambios",
  savingText = "Guardando..."
}) {
  if (modifiedCount === 0) return null;

  return (
    <div style={{
      position: 'sticky',
      top: '0',
      zIndex: 1000,
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      padding: '12px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontSize: '13px', color: '#64748b' }}>
        {modifiedCount} variable{modifiedCount > 1 ? 's' : ''} modificada{modifiedCount > 1 ? 's' : ''}
      </span>
      <button
        style={{
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '6px 12px',
          cursor: saving ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          opacity: saving ? 0.6 : 1
        }}
        onClick={onSave}
        disabled={saving}
      >
        {saving ? savingText : buttonText}
      </button>
    </div>
  );
}

/**
 * SaveFooter - Footer elegante para guardar cambios (se muestra en la parte inferior)
 */
export function SaveFooter({
  onSave,
  saving,
  modifiedCount,
  onResetAll,
  buttonText = "Guardar Cambios",
  savingText = "Guardando...",
  resetAllText = "Descartar Todo"
}) {
  if (modifiedCount === 0) return null;

  return (
    <div style={{
      position: 'sticky',
      bottom: '0',
      left: '0',
      right: '0',
      background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid #e2e8f0',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      zIndex: 1001
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#f59e0b',
          animation: 'pulse 2s infinite'
        }} />
        <span style={{ fontSize: '11px', color: '#374151', fontWeight: '500' }}>
          {modifiedCount} cambio{modifiedCount > 1 ? 's' : ''} pendiente{modifiedCount > 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {onResetAll && (
          <button
            style={{
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onClick={onResetAll}
            disabled={saving}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
              e.target.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = '#d1d5db';
            }}
          >
            {resetAllText}
          </button>
        )}

        <button
          style={{
            background: saving ? '#93c5fd' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.2s',
            boxShadow: saving ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
          onClick={onSave}
          disabled={saving}
          onMouseEnter={(e) => {
            if (!saving) {
              e.target.style.background = '#2563eb';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!saving) {
              e.target.style.background = '#3b82f6';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
          }}
        >
          {saving ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '12px',
                height: '12px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              {savingText}
            </span>
          ) : (
            buttonText
          )}
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/**
 * SectionHeader - Header colapsable para secciones
 */
export function SectionHeader({
  title,
  count,
  isCollapsed,
  onToggle
}) {
  return (
    <div
      style={styles.sectionHeader}
      onClick={onToggle}
      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.03)'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
    >
      <span>
        {title} ({count})
      </span>
      <span
        style={{
          ...styles.collapseIcon,
          transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'
        }}
      >
        ▼
      </span>
    </div>
  );
}

/**
 * ColorSectionTabs - Tabs para secciones de colores
 */
export function ColorSectionTabs({
  activeSection,
  onSectionChange,
  sections
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      padding: '8px',
      zIndex: 1,
      position: 'relative'
    }}>
      {sections.map(({ key, label, icon, count }) => (
        <button
          key={key}
          style={{
            padding: '6px 12px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderColor: activeSection === key ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: '500',
            background: activeSection === key ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
            color: activeSection === key ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.7)',
          }}
          onClick={() => onSectionChange(key)}
        >
          {icon} {label} ({count})
        </button>
      ))}
    </div>
  );
}

/**
 * EmptyState - Estado vacío cuando no hay variables
 */
export function EmptyState({ message }) {
  return (
    <div style={{
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '14px',
      padding: '32px 16px',
      maxWidth: '50%'
    }}>
      {message}
    </div>
  );
}