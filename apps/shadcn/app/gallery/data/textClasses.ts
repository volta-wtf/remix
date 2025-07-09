import { TextClass } from '../types';

export const textClassesCategories = [
  'All',
  'Colors',
  'Effects',
  'Strokes',
  'Images',
  'Gradients',
  'Shadows',
  'Decorative',
  '3D',
  'Glitch',
  'Special',
  'Underlines'
];

export const textClasses: TextClass[] = [
  // Colors
  {
    id: 'fill-solid',
    name: 'Solid Fill',
    description: 'Simple solid color text fill',
    category: 'Colors',
    tags: ['solid', 'basic', 'fill'],
    cssFile: 'fill-solid.css',
    previewText: 'Solid',
    background: '#d6fad9'
  },
  {
    id: 'fill-alpha',
    name: 'Alpha Fill',
    description: 'Semi-transparent text fill with background',
    category: 'Colors',
    tags: ['alpha', 'transparent', 'fill'],
    cssFile: 'fill-alpha.css',
    previewText: 'Alpha',
    background: 'waves'
  },
  {
    id: 'fill-glass',
    name: 'Glass Fill',
    description: 'Glass-like transparent text effect',
    category: 'Colors',
    tags: ['glass', 'transparent', 'effect'],
    cssFile: 'fill-glass.css',
    previewText: 'Glass',
    background: 'waves2'
  },
  {
    id: 'fill-blend',
    name: 'Blend Fill',
    description: 'Text with blend mode effects',
    category: 'Colors',
    tags: ['blend', 'mix', 'effect'],
    cssFile: 'fill-blend.css',
    previewText: 'Blend',
    background: 'waves3'
  },

  // Effects
  {
    id: 'inset',
    name: 'Inset Effect',
    description: 'Pressed or engraved text appearance',
    category: 'Effects',
    tags: ['inset', 'pressed', 'engraved'],
    cssFile: 'inset.css',
    previewText: 'Inset',
    background: '#a3bdc2'
  },
  {
    id: 'emboss',
    name: 'Emboss',
    description: 'Raised embossed text effect',
    category: 'Effects',
    tags: ['emboss', 'raised', '3d'],
    cssFile: 'emboss.css',
    previewText: 'Emboss',
    background: '#1e9db6'
  },

  // Strokes
  {
    id: 'stroke-only',
    name: 'Stroke Only',
    description: 'Outline text without fill',
    category: 'Strokes',
    tags: ['stroke', 'outline', 'border'],
    cssFile: 'stroke-only.css',
    previewText: 'Stroke',
    background: '#d6fad9'
  },
  {
    id: 'fill-stroke',
    name: 'Fill + Stroke',
    description: 'Text with both fill and stroke',
    category: 'Strokes',
    tags: ['fill', 'stroke', 'border'],
    cssFile: 'fill-stroke.css',
    previewText: 'Fill + Stroke',
    background: '#d6fad9'
  },
  {
    id: 'solid-stroke',
    name: 'Solid Stroke',
    description: 'Text with solid color stroke',
    category: 'Strokes',
    tags: ['solid', 'stroke', 'border'],
    cssFile: 'solid-stroke.css',
    previewText: 'Solid Stroke',
    background: '#000000'
  },
  {
    id: 'gradient-stroke',
    name: 'Gradient Stroke',
    description: 'Text with gradient stroke effect',
    category: 'Strokes',
    tags: ['gradient', 'stroke', 'colorful'],
    cssFile: 'gradient-stroke.css',
    previewText: 'Gradient Stroke',
    background: '#000000'
  },

  // Images
  {
    id: 'image',
    name: 'Image Fill',
    description: 'Text filled with image pattern',
    category: 'Images',
    tags: ['image', 'pattern', 'texture'],
    cssFile: 'image.css',
    previewText: 'Image',
    background: '#d6fad9'
  },
  {
    id: 'image-stroke',
    name: 'Image Stroke',
    description: 'Text with image-based stroke',
    category: 'Images',
    tags: ['image', 'stroke', 'texture'],
    cssFile: 'image-stroke.css',
    previewText: 'Image Stroke',
    background: '#d6fad9'
  },
  {
    id: 'image-light',
    name: 'Image Light',
    description: 'Light image text effect',
    category: 'Images',
    tags: ['image', 'light', 'bright'],
    cssFile: 'image-light.css',
    previewText: 'Image Light',
    background: '#d6fad9'
  },

  // Gradients
  {
    id: 'gradient-v',
    name: 'Vertical Gradient',
    description: 'Vertical gradient text fill',
    category: 'Gradients',
    tags: ['gradient', 'vertical', 'color'],
    cssFile: 'gradient.css',
    previewText: 'Gradient',
    background: '#292452'
  },
  {
    id: 'gradient-h',
    name: 'Horizontal Gradient',
    description: 'Horizontal gradient text fill',
    category: 'Gradients',
    tags: ['gradient', 'horizontal', 'color'],
    cssFile: 'gradient.css',
    previewText: 'Gradient',
    background: '#0e213a'
  },
  {
    id: 'gradient-motion',
    name: 'Motion Gradient',
    description: 'Animated gradient text effect',
    category: 'Gradients',
    tags: ['gradient', 'motion', 'animated'],
    cssFile: 'gradient-motion.css',
    previewText: 'Gradient',
    background: '#4d094d'
  },
  {
    id: 'stripes-rainbow',
    name: 'Rainbow Stripes',
    description: 'Rainbow striped text pattern',
    category: 'Gradients',
    tags: ['rainbow', 'stripes', 'colorful'],
    cssFile: 'stripes-rainbow.css',
    previewText: 'Stripes',
    background: '#411b58'
  },
  {
    id: 'stripes-colors',
    name: 'Color Stripes',
    description: 'Multi-color striped pattern',
    category: 'Gradients',
    tags: ['stripes', 'colors', 'pattern'],
    cssFile: 'stripes-colors.css',
    previewText: 'Stripes',
    background: '#4d094d'
  },

  // Shadows
  {
    id: 'shadow-rainbow',
    name: 'Rainbow Shadow',
    description: 'Text with rainbow shadow effect',
    category: 'Shadows',
    tags: ['shadow', 'rainbow', 'colorful'],
    cssFile: 'shadow-rainbow.css',
    previewText: 'Rainbow',
    background: '#e0e0e0'
  },

  // Decorative
  {
    id: 'pop-art',
    name: 'Pop Art',
    description: 'Pop art style text effect',
    category: 'Decorative',
    tags: ['pop-art', 'retro', 'vintage'],
    cssFile: 'pop-art.css',
    previewText: 'Pop Art',
    background: '#0f88fe'
  },
  {
    id: 'striped-layers',
    name: 'Striped Layers',
    description: 'Layered striped text effect',
    category: 'Decorative',
    tags: ['stripes', 'layers', 'complex'],
    cssFile: 'striped-layers.css',
    previewText: 'Striped Layers',
    usesData: true,
    background: '#593439'
  },
  {
    id: 'shadow-animated',
    name: 'Animated Shadow',
    description: 'Text with animated shadow effects',
    category: 'Decorative',
    tags: ['shadow', 'animated', 'motion'],
    cssFile: 'shadow-animated.css',
    previewText: 'Animated Shadow',
    usesData: true,
    background: 'dark'
  },
  {
    id: 'shadow-stripes',
    name: 'Shadow Stripes',
    description: 'Striped shadow text effect',
    category: 'Decorative',
    tags: ['shadow', 'stripes', 'pattern'],
    cssFile: 'shadow-stripes.css',
    previewText: 'Aa',
    usesData: true,
    background: '#ffc0cb'
  },
  {
    id: 'stripes',
    name: 'Stripes',
    description: 'Simple striped text pattern',
    category: 'Decorative',
    tags: ['stripes', 'pattern', 'lines'],
    cssFile: 'stripes.css',
    previewText: 'Aa',
    usesData: true,
    background: '#278293'
  },

  // 3D
  {
    id: '3D',
    name: '3D Basic',
    description: 'Basic 3D text effect',
    category: '3D',
    tags: ['3d', 'depth', 'basic'],
    cssFile: '3d.css',
    previewText: 'Aa',
    background: '#fed90f'
  },
  {
    id: '3D-sugar',
    name: '3D Sugar',
    description: 'Sweet candy-like 3D text',
    category: '3D',
    tags: ['3d', 'sugar', 'candy'],
    cssFile: '3d-sugar.css',
    previewText: 'Aa',
    background: '#e589ff'
  },
  {
    id: 'shadow-3D',
    name: '3D Shadow',
    description: 'Deep 3D shadow text effect',
    category: '3D',
    tags: ['3d', 'shadow', 'depth'],
    cssFile: 'shadow-3d.css',
    previewText: 'Aa',
    usesData: true,
    background: 'ambient'
  },
  {
    id: '3D-light',
    name: '3D Light',
    description: 'Illuminated 3D text effect',
    category: '3D',
    tags: ['3d', 'light', 'illuminated'],
    cssFile: '3d-light.css',
    previewText: 'Aa',
    usesData: true,
    background: '#10353e'
  },
  {
    id: '3D-glow',
    name: '3D Glow',
    description: 'Glowing 3D text effect',
    category: '3D',
    tags: ['3d', 'glow', 'bright'],
    cssFile: '3d-glow.css',
    previewText: 'Aa',
    usesData: true,
    background: '#c3c3c3'
  },
  {
    id: '3D-sweet',
    name: '3D Sweet',
    description: 'Sweet pastel 3D text',
    category: '3D',
    tags: ['3d', 'sweet', 'pastel'],
    cssFile: '3d-sweet.css',
    previewText: 'Aa',
    usesData: true,
    background: 'sweet'
  },
  {
    id: '3D-gold',
    name: '3D Gold',
    description: 'Luxurious gold 3D text',
    category: '3D',
    tags: ['3d', 'gold', 'luxury'],
    cssFile: '3d-gold.css',
    previewText: 'Aa',
    usesData: true,
    background: 'radial'
  },

  // Glitch
  {
    id: 'glitch-giro',
    name: 'Giro Glitch',
    description: 'Rotating glitch text effect',
    category: 'Glitch',
    tags: ['glitch', 'giro', 'digital'],
    cssFile: 'glitch-giro.css',
    previewText: 'Aa',
    background: '#151515'
  },
  {
    id: 'glitch',
    name: 'Classic Glitch',
    description: 'Classic digital glitch effect',
    category: 'Glitch',
    tags: ['glitch', 'digital', 'classic'],
    cssFile: 'glitch.css',
    previewText: 'Aa',
    background: '#7c7575'
  },
  {
    id: 'glitch-layers',
    name: 'Layered Glitch',
    description: 'Multi-layered glitch effect',
    category: 'Glitch',
    tags: ['glitch', 'layers', 'complex'],
    cssFile: 'glitch-layers.css',
    previewText: 'Aa',
    usesData: true,
    background: '#151515'
  },
  {
    id: 'rgb-split',
    name: 'RGB Split',
    description: 'RGB color separation effect',
    category: 'Glitch',
    tags: ['rgb', 'split', 'chromatic'],
    cssFile: 'rgb-split.css',
    previewText: 'Aa',
    usesData: true,
    background: '#151515'
  },

  // Special
  {
    id: 'distortion',
    name: 'Distortion',
    description: 'Distorted text appearance',
    category: 'Special',
    tags: ['distortion', 'warped', 'effect'],
    cssFile: 'distortion.css',
    previewText: 'Aa',
    usesData: true,
    background: '#FFFFFF'
  },
  {
    id: 'lighting',
    name: 'Lighting',
    description: 'Dramatic lighting text effect',
    category: 'Special',
    tags: ['lighting', 'dramatic', 'bright'],
    cssFile: 'lighting.css',
    previewText: 'Aa',
    usesData: true,
    background: '#000000'
  },
  {
    id: 'lighting-stroke',
    name: 'Lighting Stroke',
    description: 'Illuminated stroke text effect',
    category: 'Special',
    tags: ['lighting', 'stroke', 'glow'],
    cssFile: 'lighting-stroke.css',
    previewText: 'Aa',
    usesData: true,
    background: '#000000'
  },
  {
    id: 'lighting-border',
    name: 'Lighting Border',
    description: 'Text with illuminated border',
    category: 'Special',
    tags: ['lighting', 'border', 'glow'],
    cssFile: 'lighting-border.css',
    previewText: 'Aa',
    usesData: true,
    background: '#000000'
  },
  {
    id: 'cut-bright',
    name: 'Cut Bright',
    description: 'Bright cut-out text effect',
    category: 'Special',
    tags: ['cut', 'bright', 'sharp'],
    cssFile: 'cut-bright.css',
    previewText: 'Aa',
    usesData: true,
    background: 'radial3'
  },
  {
    id: 'cut-dark',
    name: 'Cut Dark',
    description: 'Dark cut-out text effect',
    category: 'Special',
    tags: ['cut', 'dark', 'sharp'],
    cssFile: 'cut-dark.css',
    previewText: 'Aa',
    usesData: true,
    background: 'radial'
  },
  {
    id: 'glass-reflex',
    name: 'Glass Reflex',
    description: 'Reflective glass text effect',
    category: 'Special',
    tags: ['glass', 'reflex', 'shiny'],
    cssFile: 'glass-reflex.css',
    previewText: 'Aa',
    usesData: true,
    background: 'radial'
  },
  {
    id: 'glass-new',
    name: 'New Glass',
    description: 'Modern glass text effect',
    category: 'Special',
    tags: ['glass', 'modern', 'clean'],
    cssFile: 'glass-new.css',
    previewText: 'Aa',
    usesData: true,
    background: 'radial2'
  },
  {
    id: 'glass',
    name: 'Classic Glass',
    description: 'Classic glass text effect',
    category: 'Special',
    tags: ['glass', 'classic', 'transparent'],
    cssFile: 'glass.css',
    previewText: 'Aa',
    usesData: true,
    background: 'radial2'
  }
];