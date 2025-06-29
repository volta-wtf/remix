import React from 'react';
import { styles } from './panel-styles.js';

export function SettingsPanel({
  settings,
  onSettingChange,
  onClose
}) {
  const handleToggle = (settingKey) => {
    onSettingChange(settingKey, !settings[settingKey]);
  };

  const handleSelect = (settingKey, value) => {
    onSettingChange(settingKey, value);
  };

  return (
    <div style={styles.settingsOverlay}>
      <div style={styles.settingsPanel}>
        {/* Header */}
        <div style={styles.settingsPanelHeader}>
          <h3 style={styles.settingsPanelTitle}>
            ⚙️ Configuración del Editor
          </h3>
          <button
            onClick={onClose}
            style={styles.settingsCloseButton}
            title="Cerrar configuración"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={styles.settingsPanelContent}>

          {/* Sección: Fuente de Valores */}
          <div style={styles.settingsSection}>
            <h4 style={styles.settingsSectionTitle}>
              📄 Fuente de Valores CSS
            </h4>
            <p style={styles.settingsSectionDescription}>
              Elige qué valores mostrar para las variables CSS
            </p>

            <div style={styles.settingsGroup}>
              <label style={styles.settingsRadioLabel}>
                <input
                  type="radio"
                  name="valueSource"
                  checked={settings.useSourceValues === true}
                  onChange={() => handleSelect('useSourceValues', true)}
                  style={styles.settingsRadioInput}
                />
                <div style={styles.settingsRadioOption}>
                  <div style={styles.settingsRadioTitle}>
                    📝 Valores del Archivo CSS
                  </div>
                  <div style={styles.settingsRadioDescription}>
                    Muestra los valores exactos tal como están escritos en el CSS.<br/>
                    Ejemplo: <code>var(--primary)</code>, <code>--alpha(var(--ambient)/20%)</code>
                  </div>
                </div>
              </label>

              <label style={styles.settingsRadioLabel}>
                <input
                  type="radio"
                  name="valueSource"
                  checked={settings.useSourceValues === false}
                  onChange={() => handleSelect('useSourceValues', false)}
                  style={styles.settingsRadioInput}
                />
                <div style={styles.settingsRadioOption}>
                  <div style={styles.settingsRadioTitle}>
                    🖥️ Valores Computados del Navegador
                  </div>
                  <div style={styles.settingsRadioDescription}>
                    Muestra los valores finales calculados por el navegador.<br/>
                    Ejemplo: <code>#3b82f6</code>, <code>rgba(59, 130, 246, 0.2)</code>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Sección: Visualización */}
          <div style={styles.settingsSection}>
            <h4 style={styles.settingsSectionTitle}>
              🎨 Opciones de Visualización
            </h4>

            <label style={styles.settingsCheckboxLabel}>
              <input
                type="checkbox"
                checked={settings.showPreview}
                onChange={() => handleToggle('showPreview')}
                style={styles.settingsCheckboxInput}
              />
              <div style={styles.settingsCheckboxOption}>
                <div style={styles.settingsCheckboxTitle}>
                  👁️ Mostrar Preview Visual
                </div>
                <div style={styles.settingsCheckboxDescription}>
                  Muestra previews de colores, espaciado y otros valores
                </div>
              </div>
            </label>

            <label style={styles.settingsCheckboxLabel}>
              <input
                type="checkbox"
                checked={settings.showTypeIndicator}
                onChange={() => handleToggle('showTypeIndicator')}
                style={styles.settingsCheckboxInput}
              />
              <div style={styles.settingsCheckboxOption}>
                <div style={styles.settingsCheckboxTitle}>
                  🏷️ Mostrar Indicadores de Tipo
                </div>
                <div style={styles.settingsCheckboxDescription}>
                  Muestra iconos para variables vacías, transparentes, etc.
                </div>
              </div>
            </label>

            <label style={styles.settingsCheckboxLabel}>
              <input
                type="checkbox"
                checked={settings.groupByType}
                onChange={() => handleToggle('groupByType')}
                style={styles.settingsCheckboxInput}
              />
              <div style={styles.settingsCheckboxOption}>
                <div style={styles.settingsCheckboxTitle}>
                  📂 Agrupar por Tipo
                </div>
                <div style={styles.settingsCheckboxDescription}>
                  Organiza las variables en secciones (colores, espaciado, etc.)
                </div>
              </div>
            </label>
          </div>

          {/* Sección: Debug */}
          <div style={styles.settingsSection}>
            <h4 style={styles.settingsSectionTitle}>
              🐛 Opciones de Depuración
            </h4>

            <label style={styles.settingsCheckboxLabel}>
              <input
                type="checkbox"
                checked={settings.showDebugInfo}
                onChange={() => handleToggle('showDebugInfo')}
                style={styles.settingsCheckboxInput}
              />
              <div style={styles.settingsCheckboxOption}>
                <div style={styles.settingsCheckboxTitle}>
                  🔍 Mostrar Información de Debug
                </div>
                <div style={styles.settingsCheckboxDescription}>
                  Muestra origen de cada variable y información técnica
                </div>
              </div>
            </label>

            <label style={styles.settingsCheckboxLabel}>
              <input
                type="checkbox"
                checked={settings.showAllVariables}
                onChange={() => handleToggle('showAllVariables')}
                style={styles.settingsCheckboxInput}
              />
              <div style={styles.settingsCheckboxOption}>
                <div style={styles.settingsCheckboxTitle}>
                  📋 Mostrar Todas las Variables
                </div>
                <div style={styles.settingsCheckboxDescription}>
                  Incluye variables del sistema y librerías externas
                </div>
              </div>
            </label>
          </div>

          {/* Sección: Funciones Alpha */}
          <div style={styles.settingsSection}>
            <h4 style={styles.settingsSectionTitle}>
              🎛️ Funciones Alpha/Opacidad
            </h4>

            <label style={styles.settingsCheckboxLabel}>
              <input
                type="checkbox"
                checked={settings.enableAlphaInputs}
                onChange={() => handleToggle('enableAlphaInputs')}
                style={styles.settingsCheckboxInput}
              />
              <div style={styles.settingsCheckboxOption}>
                <div style={styles.settingsCheckboxTitle}>
                  🎚️ Inputs Separados para Opacidad
                </div>
                <div style={styles.settingsCheckboxDescription}>
                  Muestra controles separados para modificar opacidad en funciones alpha
                </div>
              </div>
            </label>
          </div>

        </div>

        {/* Footer */}
        <div style={styles.settingsPanelFooter}>
          <button
            onClick={onClose}
            style={styles.settingsPrimaryButton}
          >
            ✅ Aplicar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}