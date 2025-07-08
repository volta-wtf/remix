import { TextStyle } from '../types';

export const textStyleCategories = [
  'All',
  'Retro',
  'Luxury',
  'Colorful',
  'Metallic',
  'Effects',
  'Minimal',
  'Custom',
  'Modified'
];

export const textStyles: TextStyle[] = [
  {
    id: '1',
    name: 'Neon Glow',
    description: 'Electric neon text with a vibrant glow effect',
    previewText: 'Neon',
    style: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#00ffff',
      textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
      letterSpacing: '2px'
    },
    category: 'Retro',
    tags: ['neon', 'glow', 'cyberpunk'],
    cssClass: 'neon-glow'
  },
  {
    id: '2',
    name: 'Gold Emboss',
    description: 'Luxurious gold embossed text with depth',
    previewText: 'Gold',
    style: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#daa520',
      textShadow: '2px 2px 0px #b8860b, 4px 4px 0px rgba(0,0,0,0.2)',
      letterSpacing: '1px'
    },
    category: 'Luxury',
    tags: ['gold', 'emboss', 'premium'],
    cssClass: 'gold-emboss'
  },
  {
    id: '3',
    name: 'Rainbow Gradient',
    description: 'Colorful rainbow gradient text effect',
    previewText: 'Rainbow',
    style: {
      fontSize: '28px',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '1px'
    },
    category: 'Colorful',
    tags: ['rainbow', 'gradient', 'colorful'],
    cssClass: 'rainbow-gradient'
  },
  {
    id: '4',
    name: 'Chrome Metallic',
    description: 'Shiny chrome metallic text with reflections',
    previewText: 'Chrome',
    style: {
      fontSize: '32px',
      fontWeight: 'bold',
      background: 'linear-gradient(180deg, #eee 0%, #999 50%, #777 51%, #555 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '1px'
    },
    category: 'Metallic',
    tags: ['chrome', 'metal', 'shiny'],
    cssClass: 'chrome-metallic'
  },
  {
    id: '5',
    name: 'Fire Burn',
    description: 'Fiery burning text with flame effect',
    previewText: 'Fire',
    style: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#ff4500',
      textShadow: '0 0 5px #ff4500, 0 0 10px #ff4500, 0 0 15px #ff6347, 0 0 20px #ff6347',
      letterSpacing: '2px'
    },
    category: 'Effects',
    tags: ['fire', 'flame', 'hot'],
    cssClass: 'fire-burn'
  },
  {
    id: '6',
    name: 'Ice Crystal',
    description: 'Cool ice crystal text with frozen effect',
    previewText: 'Ice',
    style: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#87ceeb',
      textShadow: '0 0 5px #87ceeb, 0 0 10px #87ceeb, 0 0 15px #4682b4',
      letterSpacing: '2px'
    },
    category: 'Effects',
    tags: ['ice', 'cold', 'crystal'],
    cssClass: 'ice-crystal'
  },
  {
    id: '7',
    name: 'Retro Wave',
    description: '80s synthwave style text with pink and cyan',
    previewText: 'Retro',
    style: {
      fontSize: '32px',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 0 10px #ff00ff',
      letterSpacing: '2px'
    },
    category: 'Retro',
    tags: ['synthwave', '80s', 'retro'],
    cssClass: 'retro-wave'
  },
  {
    id: '8',
    name: 'Outline Stroke',
    description: 'Bold outline text with transparent fill',
    previewText: 'Outline',
    style: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'transparent',
      WebkitTextStroke: '2px #333',
      letterSpacing: '1px'
    },
    category: 'Minimal',
    tags: ['outline', 'stroke', 'minimal'],
    cssClass: 'outline-stroke'
  }
];