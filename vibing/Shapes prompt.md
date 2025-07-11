Shapes

Crea un editor visual de formas en React que permita modificar y aplicar formas CSS directamente sobre un elemento HTML usando Tailwind CSS.

Debe incluir soporte para:
	•	border-radius individual por esquina (top-left, top-right, bottom-right, bottom-left)
	•	Nuevas funciones de shape() de CSS como:
	•	inset()
	•	circle()
	•	ellipse()
	•	polygon()
	•	path()

El editor debe tener:
	•	Selectores para elegir la función de shape().
	•	Inputs visuales (sliders o campos numéricos) para modificar los parámetros de cada función.
	•	Un preview en vivo de la forma aplicada a un div.
	•	Un botón para copiar el código CSS generado.
	•	Todo debe funcionar usando solo estilos en línea o style={{}} (sin clases personalizadas), para aplicar directamente los valores generados.

Si se usa Tailwind, solo debe ser para estructura y layout. Los estilos dinámicos deben ser aplicados directamente con style.

Bonus: si puedes, usa shadcn/ui para los sliders e inputs, y organiza todo como un solo componente llamado ShapeEditor.  Dentro mantén cada parte en componentes y usa archivos diferentes.