import React, { CSSProperties } from 'react';

interface TextStyleProps {
  id: string;
  bg: string;
  type?: 'with-data' | 'only-data';
  children: React.ReactNode;
}

function TextStyle({ id, bg, type, children }: TextStyleProps) {
  // Handle different background types
  let style: CSSProperties & { [key: string]: any } = {};
  let className = '';

  if (bg.startsWith('#') || bg.startsWith('hsla')) {
    // Hex color - use CSS variable
    style = { '--bloc-color': bg };
  } else {
    // Named background - use CSS class
    className = `bg-${bg}`;
  }

  const dataAttr = type ? { 'data-text': children } : {};

  return (
    <div
      className={`bloc_ bg-origin-border! bg-cover! bg-primary/3 cursor-pointer aspect-4/3 rounded-md border border-transparent hover:border-primary/20 transition-border duration-300 overflow-hidden ${className}`}
      style={style}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <h2 className="type-demo">
          <span className={`text-${id}`} {...dataAttr}>
            {children}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default TextStyle;