import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TextStylePanel } from './TextStylePanel';

export interface TextShadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread?: number;
  color: string;
}

export interface TextStyle {
  id: string;
  name: string;
  category: string;
  shadows: TextShadow[];
  fontSize: string;
  fontWeight: string;
  color: string;
  tags: string[];
  css: string;
  description: string;
  customStyles?: string; // For complex styles with pseudo-elements
}

const initialTextStyles: TextStyle[] = [
  // Gradient Text Styles
  {
    id: '1',
    name: 'Gradient Text',
    category: 'Gradient',
    shadows: [],
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'transparent',
    tags: ['gradient', 'colorful', 'modern', 'vibrant'],
    css: 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 48px; font-weight: bold;',
    description: 'Vibrant gradient fill with rainbow colors',
    customStyles: `
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `
  },
  {
    id: '2',
    name: 'Purple Gradient',
    category: 'Gradient',
    shadows: [],
    fontSize: '44px',
    fontWeight: 'bold',
    color: 'transparent',
    tags: ['gradient', 'purple', 'elegant', 'smooth'],
    css: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 44px; font-weight: bold;',
    description: 'Elegant purple to blue gradient',
    customStyles: `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `
  },
  {
    id: '3',
    name: 'Fire Gradient',
    category: 'Gradient',
    shadows: [],
    fontSize: '46px',
    fontWeight: 'bold',
    color: 'transparent',
    tags: ['gradient', 'fire', 'hot', 'vibrant'],
    css: 'background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 46px; font-weight: bold;',
    description: 'Hot fire gradient from red to pink',
    customStyles: `
      background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `
  },
  {
    id: '4',
    name: 'Gold Gradient',
    category: 'Gradient',
    shadows: [],
    fontSize: '42px',
    fontWeight: 'bold',
    color: 'transparent',
    tags: ['gradient', 'gold', 'luxury', 'metallic'],
    css: 'background: linear-gradient(45deg, #f7971e, #ffd200); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 42px; font-weight: bold;',
    description: 'Luxurious gold gradient',
    customStyles: `
      background: linear-gradient(45deg, #f7971e, #ffd200);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `
  },

  // Outline Styles
  {
    id: '5',
    name: 'Simple Outline',
    category: 'Outline',
    shadows: [
      { id: '1', x: 1, y: 0, blur: 0, color: '#000000' },
      { id: '2', x: -1, y: 0, blur: 0, color: '#000000' },
      { id: '3', x: 0, y: 1, blur: 0, color: '#000000' },
      { id: '4', x: 0, y: -1, blur: 0, color: '#000000' }
    ],
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['outline', 'simple', 'clean', 'contrast'],
    css: 'color: #ffffff; font-size: 40px; font-weight: bold; text-shadow: 1px 0px 0px #000000, -1px 0px 0px #000000, 0px 1px 0px #000000, 0px -1px 0px #000000;',
    description: 'Clean black outline on white text'
  },
  {
    id: '6',
    name: 'Thick Outline',
    category: 'Outline',
    shadows: [
      { id: '1', x: 2, y: 0, blur: 0, color: '#000000' },
      { id: '2', x: -2, y: 0, blur: 0, color: '#000000' },
      { id: '3', x: 0, y: 2, blur: 0, color: '#000000' },
      { id: '4', x: 0, y: -2, blur: 0, color: '#000000' },
      { id: '5', x: 2, y: 2, blur: 0, color: '#000000' },
      { id: '6', x: -2, y: -2, blur: 0, color: '#000000' },
      { id: '7', x: 2, y: -2, blur: 0, color: '#000000' },
      { id: '8', x: -2, y: 2, blur: 0, color: '#000000' }
    ],
    fontSize: '44px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['outline', 'thick', 'bold', 'strong'],
    css: 'color: #ffffff; font-size: 44px; font-weight: bold; text-shadow: 2px 0px 0px #000000, -2px 0px 0px #000000, 0px 2px 0px #000000, 0px -2px 0px #000000, 2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000;',
    description: 'Bold thick black outline'
  },
  {
    id: '7',
    name: 'Colored Outline',
    category: 'Outline',
    shadows: [
      { id: '1', x: 1, y: 0, blur: 0, color: '#ff4757' },
      { id: '2', x: -1, y: 0, blur: 0, color: '#ff4757' },
      { id: '3', x: 0, y: 1, blur: 0, color: '#ff4757' },
      { id: '4', x: 0, y: -1, blur: 0, color: '#ff4757' }
    ],
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['outline', 'colored', 'red', 'vibrant'],
    css: 'color: #ffffff; font-size: 40px; font-weight: bold; text-shadow: 1px 0px 0px #ff4757, -1px 0px 0px #ff4757, 0px 1px 0px #ff4757, 0px -1px 0px #ff4757;',
    description: 'Vibrant red outline effect'
  },
  {
    id: '8',
    name: 'Blue Outline',
    category: 'Outline',
    shadows: [
      { id: '1', x: 1, y: 0, blur: 0, color: '#3742fa' },
      { id: '2', x: -1, y: 0, blur: 0, color: '#3742fa' },
      { id: '3', x: 0, y: 1, blur: 0, color: '#3742fa' },
      { id: '4', x: 0, y: -1, blur: 0, color: '#3742fa' }
    ],
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['outline', 'blue', 'cool', 'clean'],
    css: 'color: #ffffff; font-size: 40px; font-weight: bold; text-shadow: 1px 0px 0px #3742fa, -1px 0px 0px #3742fa, 0px 1px 0px #3742fa, 0px -1px 0px #3742fa;',
    description: 'Cool blue outline effect'
  },

  // Shadow Styles
  {
    id: '9',
    name: 'Drop Shadow',
    category: 'Shadow',
    shadows: [
      { id: '1', x: 4, y: 4, blur: 8, color: 'rgba(0, 0, 0, 0.5)' }
    ],
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#333333',
    tags: ['shadow', 'drop', 'subtle', 'depth'],
    css: 'color: #333333; font-size: 42px; font-weight: bold; text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);',
    description: 'Classic drop shadow effect'
  },
  {
    id: '10',
    name: 'Hard Shadow',
    category: 'Shadow',
    shadows: [
      { id: '1', x: 6, y: 6, blur: 0, color: '#000000' }
    ],
    fontSize: '44px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['shadow', 'hard', 'bold', 'retro'],
    css: 'color: #ffffff; font-size: 44px; font-weight: bold; text-shadow: 6px 6px 0px #000000;',
    description: 'Bold hard shadow for retro feel'
  },
  {
    id: '11',
    name: 'Colored Shadow',
    category: 'Shadow',
    shadows: [
      { id: '1', x: 5, y: 5, blur: 10, color: '#ff6b6b' }
    ],
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['shadow', 'colored', 'pink', 'modern'],
    css: 'color: #ffffff; font-size: 40px; font-weight: bold; text-shadow: 5px 5px 10px #ff6b6b;',
    description: 'Colorful pink shadow effect'
  },
  {
    id: '12',
    name: 'Multiple Shadows',
    category: 'Shadow',
    shadows: [
      { id: '1', x: 2, y: 2, blur: 4, color: 'rgba(255, 0, 0, 0.8)' },
      { id: '2', x: 4, y: 4, blur: 8, color: 'rgba(0, 255, 0, 0.6)' },
      { id: '3', x: 6, y: 6, blur: 12, color: 'rgba(0, 0, 255, 0.4)' }
    ],
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['shadow', 'multiple', 'colorful', 'layered'],
    css: 'color: #ffffff; font-size: 38px; font-weight: bold; text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.8), 4px 4px 8px rgba(0, 255, 0, 0.6), 6px 6px 12px rgba(0, 0, 255, 0.4);',
    description: 'Multiple colored shadow layers'
  },

  // 3D Text Styles
  {
    id: '13',
    name: '3D Blue',
    category: '3D',
    shadows: [
      { id: '1', x: 1, y: 1, blur: 0, color: '#2196f3' },
      { id: '2', x: 2, y: 2, blur: 0, color: '#1976d2' },
      { id: '3', x: 3, y: 3, blur: 0, color: '#1565c0' },
      { id: '4', x: 4, y: 4, blur: 0, color: '#0d47a1' },
      { id: '5', x: 5, y: 5, blur: 10, color: 'rgba(0, 0, 0, 0.3)' }
    ],
    fontSize: '46px',
    fontWeight: 'bold',
    color: '#64b5f6',
    tags: ['3d', 'blue', 'dimensional', 'depth'],
    css: 'color: #64b5f6; font-size: 46px; font-weight: bold; text-shadow: 1px 1px 0px #2196f3, 2px 2px 0px #1976d2, 3px 3px 0px #1565c0, 4px 4px 0px #0d47a1, 5px 5px 10px rgba(0, 0, 0, 0.3);',
    description: 'Three-dimensional blue text effect'
  },
  {
    id: '14',
    name: '3D Green',
    category: '3D',
    shadows: [
      { id: '1', x: 1, y: 1, blur: 0, color: '#4caf50' },
      { id: '2', x: 2, y: 2, blur: 0, color: '#388e3c' },
      { id: '3', x: 3, y: 3, blur: 0, color: '#2e7d32' },
      { id: '4', x: 4, y: 4, blur: 0, color: '#1b5e20' },
      { id: '5', x: 5, y: 5, blur: 10, color: 'rgba(0, 0, 0, 0.3)' }
    ],
    fontSize: '46px',
    fontWeight: 'bold',
    color: '#81c784',
    tags: ['3d', 'green', 'dimensional', 'fresh'],
    css: 'color: #81c784; font-size: 46px; font-weight: bold; text-shadow: 1px 1px 0px #4caf50, 2px 2px 0px #388e3c, 3px 3px 0px #2e7d32, 4px 4px 0px #1b5e20, 5px 5px 10px rgba(0, 0, 0, 0.3);',
    description: 'Three-dimensional green text effect'
  },

  // Neon Styles
  {
    id: '15',
    name: 'Pink Neon',
    category: 'Neon',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 5, color: '#ff1493' },
      { id: '2', x: 0, y: 0, blur: 10, color: '#ff1493' },
      { id: '3', x: 0, y: 0, blur: 15, color: '#ff1493' },
      { id: '4', x: 0, y: 0, blur: 20, color: '#ff1493' }
    ],
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['neon', 'pink', 'glow', 'electric'],
    css: 'color: #ffffff; font-size: 42px; font-weight: bold; text-shadow: 0px 0px 5px #ff1493, 0px 0px 10px #ff1493, 0px 0px 15px #ff1493, 0px 0px 20px #ff1493;',
    description: 'Electric pink neon glow'
  },
  {
    id: '16',
    name: 'Green Neon',
    category: 'Neon',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 5, color: '#39ff14' },
      { id: '2', x: 0, y: 0, blur: 10, color: '#39ff14' },
      { id: '3', x: 0, y: 0, blur: 15, color: '#39ff14' },
      { id: '4', x: 0, y: 0, blur: 20, color: '#39ff14' }
    ],
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['neon', 'green', 'glow', 'cyber'],
    css: 'color: #ffffff; font-size: 42px; font-weight: bold; text-shadow: 0px 0px 5px #39ff14, 0px 0px 10px #39ff14, 0px 0px 15px #39ff14, 0px 0px 20px #39ff14;',
    description: 'Cyber green neon effect'
  },
  {
    id: '17',
    name: 'Cyan Neon',
    category: 'Neon',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 5, color: '#00ffff' },
      { id: '2', x: 0, y: 0, blur: 10, color: '#00ffff' },
      { id: '3', x: 0, y: 0, blur: 15, color: '#00ffff' },
      { id: '4', x: 0, y: 0, blur: 20, color: '#00ffff' }
    ],
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['neon', 'cyan', 'glow', 'futuristic'],
    css: 'color: #ffffff; font-size: 42px; font-weight: bold; text-shadow: 0px 0px 5px #00ffff, 0px 0px 10px #00ffff, 0px 0px 15px #00ffff, 0px 0px 20px #00ffff;',
    description: 'Futuristic cyan neon glow'
  },

  // Distortion & Glitch Effects
  {
    id: '18',
    name: 'Distortion',
    category: 'Distortion',
    shadows: [
      { id: '1', x: 2, y: 0, blur: 0, color: '#ff0000' },
      { id: '2', x: -2, y: 0, blur: 0, color: '#00ffff' },
      { id: '3', x: 0, y: 2, blur: 0, color: '#ffff00' }
    ],
    fontSize: '44px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['distortion', 'glitch', 'digital', 'rgb'],
    css: 'color: #ffffff; font-size: 44px; font-weight: bold; text-shadow: 2px 0px 0px #ff0000, -2px 0px 0px #00ffff, 0px 2px 0px #ffff00;',
    description: 'Digital distortion with RGB separation'
  },
  {
    id: '19',
    name: 'Glitch RGB',
    category: 'Distortion',
    shadows: [
      { id: '1', x: 3, y: 0, blur: 0, color: '#ff0000' },
      { id: '2', x: -3, y: 0, blur: 0, color: '#00ff00' },
      { id: '3', x: 0, y: 3, blur: 0, color: '#0000ff' }
    ],
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['glitch', 'rgb', 'digital', 'error'],
    css: 'color: #ffffff; font-size: 42px; font-weight: bold; text-shadow: 3px 0px 0px #ff0000, -3px 0px 0px #00ff00, 0px 3px 0px #0000ff;',
    description: 'RGB glitch effect with color separation'
  },

  // Focus & Highlight Effects
  {
    id: '20',
    name: 'Focus Red',
    category: 'Focus',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 0, color: '#ff4444' },
      { id: '2', x: 0, y: 0, blur: 10, color: '#ff4444' },
      { id: '3', x: 0, y: 0, blur: 20, color: '#ff4444' }
    ],
    fontSize: '44px',
    fontWeight: 'bold',
    color: '#ff6666',
    tags: ['focus', 'red', 'highlight', 'attention'],
    css: 'color: #ff6666; font-size: 44px; font-weight: bold; text-shadow: 0px 0px 0px #ff4444, 0px 0px 10px #ff4444, 0px 0px 20px #ff4444;',
    description: 'Red focus highlight effect'
  },
  {
    id: '21',
    name: 'Focus Blue',
    category: 'Focus',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 0, color: '#4444ff' },
      { id: '2', x: 0, y: 0, blur: 10, color: '#4444ff' },
      { id: '3', x: 0, y: 0, blur: 20, color: '#4444ff' }
    ],
    fontSize: '44px',
    fontWeight: 'bold',
    color: '#6666ff',
    tags: ['focus', 'blue', 'highlight', 'cool'],
    css: 'color: #6666ff; font-size: 44px; font-weight: bold; text-shadow: 0px 0px 0px #4444ff, 0px 0px 10px #4444ff, 0px 0px 20px #4444ff;',
    description: 'Blue focus highlight effect'
  },

  // Highlight Styles
  {
    id: '22',
    name: 'Yellow Highlight',
    category: 'Highlight',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 5, color: '#ffff00' },
      { id: '2', x: 0, y: 0, blur: 10, color: '#ffff00' }
    ],
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#333333',
    tags: ['highlight', 'yellow', 'marker', 'attention'],
    css: 'color: #333333; font-size: 40px; font-weight: bold; text-shadow: 0px 0px 5px #ffff00, 0px 0px 10px #ffff00;',
    description: 'Yellow marker highlight effect'
  },
  {
    id: '23',
    name: 'Green Highlight',
    category: 'Highlight',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 5, color: '#00ff00' },
      { id: '2', x: 0, y: 0, blur: 10, color: '#00ff00' }
    ],
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#333333',
    tags: ['highlight', 'green', 'marker', 'fresh'],
    css: 'color: #333333; font-size: 40px; font-weight: bold; text-shadow: 0px 0px 5px #00ff00, 0px 0px 10px #00ff00;',
    description: 'Green marker highlight effect'
  },

  // Blur Effects
  {
    id: '24',
    name: 'Blur Effect',
    category: 'Blur',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 8, color: '#333333' }
    ],
    fontSize: '42px',
    fontWeight: 'bold',
    color: 'transparent',
    tags: ['blur', 'soft', 'dreamy', 'motion'],
    css: 'color: transparent; font-size: 42px; font-weight: bold; text-shadow: 0px 0px 8px #333333;',
    description: 'Soft blur effect for motion feel'
  },
  {
    id: '25',
    name: 'Double Blur',
    category: 'Blur',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 4, color: '#666666' },
      { id: '2', x: 0, y: 0, blur: 12, color: '#333333' }
    ],
    fontSize: '44px',
    fontWeight: 'bold',
    color: 'transparent',
    tags: ['blur', 'double', 'layered', 'depth'],
    css: 'color: transparent; font-size: 44px; font-weight: bold; text-shadow: 0px 0px 4px #666666, 0px 0px 12px #333333;',
    description: 'Double layered blur effect'
  },

  // Special Effects
  {
    id: '26',
    name: 'Floating Effect',
    category: 'Special',
    shadows: [
      { id: '1', x: 0, y: 8, blur: 16, color: 'rgba(0, 0, 0, 0.3)' },
      { id: '2', x: 0, y: 4, blur: 8, color: 'rgba(0, 0, 0, 0.2)' }
    ],
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#333333',
    tags: ['floating', 'elevated', 'shadow', 'depth'],
    css: 'color: #333333; font-size: 42px; font-weight: bold; text-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3), 0px 4px 8px rgba(0, 0, 0, 0.2);',
    description: 'Floating text with elevation shadow'
  },
  {
    id: '27',
    name: 'Inset Effect',
    category: 'Special',
    shadows: [
      { id: '1', x: 0, y: 1, blur: 2, color: 'rgba(255, 255, 255, 0.8)' },
      { id: '2', x: 0, y: -1, blur: 1, color: 'rgba(0, 0, 0, 0.5)' }
    ],
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#888888',
    tags: ['inset', 'carved', 'embossed', 'depth'],
    css: 'color: #888888; font-size: 40px; font-weight: bold; text-shadow: 0px 1px 2px rgba(255, 255, 255, 0.8), 0px -1px 1px rgba(0, 0, 0, 0.5);',
    description: 'Inset carved text effect'
  },
  {
    id: '28',
    name: 'Colorful Background',
    category: 'Special',
    shadows: [
      { id: '1', x: 0, y: 0, blur: 20, color: 'rgba(255, 0, 255, 0.6)' },
      { id: '2', x: 0, y: 0, blur: 40, color: 'rgba(0, 255, 255, 0.4)' }
    ],
    fontSize: '44px',
    fontWeight: 'bold',
    color: '#ffffff',
    tags: ['background', 'colorful', 'vibrant', 'aura'],
    css: 'color: #ffffff; font-size: 44px; font-weight: bold; text-shadow: 0px 0px 20px rgba(255, 0, 255, 0.6), 0px 0px 40px rgba(0, 255, 255, 0.4);',
    description: 'Colorful background aura effect'
  }
];

interface TextStyleSectionProps {
  searchQuery: string;
}

export function TextStyleSection({ searchQuery }: TextStyleSectionProps) {
  const [textStyles, setTextStyles] = useState<TextStyle[]>(initialTextStyles);
  const [selectedStyle, setSelectedStyle] = useState<TextStyle | null>(null);

  const filteredStyles = useMemo(() => {
    if (!searchQuery) return textStyles;
    return textStyles.filter(style =>
      style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [textStyles, searchQuery]);

  const handleStyleUpdate = (updatedStyle: TextStyle) => {
    setTextStyles(prev => prev.map(s => s.id === updatedStyle.id ? updatedStyle : s));
  };

  const handleStyleDuplicate = (style: TextStyle) => {
    const newStyle: TextStyle = {
      ...style,
      id: Date.now().toString(),
      name: `${style.name} Copy`
    };
    setTextStyles(prev => [...prev, newStyle]);
  };

  const getTextStyle = (style: TextStyle) => {
    const baseStyle = {
      fontSize: '24px',
      fontWeight: style.fontWeight,
      textShadow: style.shadows.map(shadow =>
        `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`
      ).join(', ')
    };

    if (style.customStyles) {
      return {
        ...baseStyle,
        background: style.customStyles.includes('background:') ?
          style.customStyles.match(/background:\s*([^;]+)/)?.[1] : undefined,
        WebkitBackgroundClip: style.customStyles.includes('background-clip:') ? 'text' : undefined,
        WebkitTextFillColor: style.customStyles.includes('text-fill-color:') ? 'transparent' : style.color,
        backgroundClip: style.customStyles.includes('background-clip:') ? 'text' : undefined,
        color: style.customStyles.includes('text-fill-color:') ? 'transparent' : style.color
      };
    }

    return {
      ...baseStyle,
      color: style.color
    };
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Text Style Collection</h2>
        <p className="text-muted-foreground">
          Advanced text effects including gradients, outlines, 3D, neon, and distortion styles. Click any style to customize.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStyles.map((style, index) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer group hover:shadow-lg transition-all duration-200 overflow-hidden"
              onClick={() => setSelectedStyle(style)}
            >
              <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                <div
                  className="text-center select-none"
                  style={getTextStyle(style)}
                >
                  {style.name}
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-white font-medium">Click to Edit</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {style.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {style.shadows.length} shadow{style.shadows.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{style.description}</p>
                <div className="flex flex-wrap gap-1">
                  {style.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedStyle && (
        <TextStylePanel
          textStyle={selectedStyle}
          onClose={() => setSelectedStyle(null)}
          onUpdate={handleStyleUpdate}
          onDuplicate={handleStyleDuplicate}
        />
      )}
    </div>
  );
}