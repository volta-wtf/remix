// Auto-inyector del Theme Editor
(function() {
  if (typeof window === 'undefined') return;

  const port = 4444;
  const scriptUrl = `http://localhost:${port}/theme-editor.js`;

  // Verificar si ya está cargado
  if (document.querySelector(`script[src="${scriptUrl}"]`)) return;

  console.log(`🔌 Auto-inyectando Theme Editor desde puerto ${port}...`);

  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  script.onload = () => console.log('✅ Theme Editor cargado automáticamente');
  script.onerror = () => console.warn(`⚠️ Error cargando Theme Editor desde puerto ${port}`);

  (document.head || document.documentElement).appendChild(script);
})();
