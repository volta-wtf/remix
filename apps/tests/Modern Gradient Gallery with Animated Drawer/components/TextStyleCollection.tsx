import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextCard } from './TextCard';
import { TextDrawer } from './TextDrawer';

interface TextStylePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  shadowCount: number;
  tags: string[];
  style: React.CSSProperties;
}

const textStyles: TextStylePreset[] = [
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'Futuristic',
    description: 'Bright neon text with electric glow effect',
    shadowCount: 3,
    tags: ['neon', 'glow', 'futuristic'],
    style: {
      color: '#ff00ff',
      textShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff',
      fontWeight: 'bold'
    }
  },
  {
    id: 'embossed-stone',
    name: 'Embossed Stone',
    category: 'Classic',
    description: 'Carved stone effect with depth and dimension',
    shadowCount: 2,
    tags: ['emboss', 'stone', 'classic'],
    style: {
      color: '#8a8a8a',
      textShadow: '1px 1px 0px #ccc, 2px 2px 0px #999',
      fontWeight: 'bold'
    }
  },
  {
    id: 'chrome-metallic',
    name: 'Chrome Metallic',
    category: 'Metallic',
    description: 'Shiny chrome effect with metallic reflection',
    shadowCount: 4,
    tags: ['chrome', 'metal', 'shiny'],
    style: {
      background: 'linear-gradient(90deg, #c0c0c0, #f0f0f0, #c0c0c0)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      textShadow: '0 1px 0 #ccc',
      fontWeight: 'bold'
    }
  },
  {
    id: 'glass-frost',
    name: 'Glass Frost',
    category: 'Modern',
    description: 'Frosted glass effect with transparency',
    shadowCount: 2,
    tags: ['glass', 'frost', 'modern'],
    style: {
      color: 'rgba(255, 255, 255, 0.9)',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      fontWeight: '500'
    }
  },
  {
    id: 'fire-flame',
    name: 'Fire Flame',
    category: 'Dynamic',
    description: 'Burning flame effect with warm colors',
    shadowCount: 3,
    tags: ['fire', 'flame', 'warm'],
    style: {
      background: 'linear-gradient(90deg, #ff4500, #ff6347, #ffd700)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      textShadow: '0 0 10px #ff4500',
      fontWeight: 'bold'
    }
  },
  {
    id: 'ice-crystal',
    name: 'Ice Crystal',
    category: 'Cool',
    description: 'Icy crystalline effect with cool tones',
    shadowCount: 2,
    tags: ['ice', 'crystal', 'cool'],
    style: {
      color: '#87ceeb',
      textShadow: '0 0 5px #87ceeb, 1px 1px 0px #b0e0e6',
      fontWeight: 'bold'
    }
  },
  {
    id: 'gold-luxury',
    name: 'Gold Luxury',
    category: 'Luxury',
    description: 'Premium gold effect with elegant shine',
    shadowCount: 3,
    tags: ['gold', 'luxury', 'elegant'],
    style: {
      background: 'linear-gradient(90deg, #ffd700, #ffed4e, #ffd700)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      fontWeight: 'bold'
    }
  },
  {
    id: 'retro-80s',
    name: 'Retro 80s',
    category: 'Retro',
    description: 'Vintage 80s style with neon pink and blue',
    shadowCount: 2,
    tags: ['retro', '80s', 'vintage'],
    style: {
      background: 'linear-gradient(45deg, #ff006e, #8338ec)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      textShadow: '0 0 10px #ff006e',
      fontWeight: 'bold'
    }
  },
  {
    id: 'rainbow-pride',
    name: 'Rainbow Pride',
    category: 'Colorful',
    description: 'Vibrant rainbow gradient effect',
    shadowCount: 1,
    tags: ['rainbow', 'colorful', 'pride'],
    style: {
      background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      fontWeight: 'bold'
    }
  },
  {
    id: 'cyberpunk-glitch',
    name: 'Cyberpunk Glitch',
    category: 'Futuristic',
    description: 'Glitchy cyberpunk effect with RGB separation',
    shadowCount: 3,
    tags: ['cyberpunk', 'glitch', 'digital'],
    style: {
      color: '#00ffff',
      textShadow: '2px 0px 0px #ff0000, -2px 0px 0px #0000ff',
      fontWeight: 'bold'
    }
  },
  {
    id: 'wooden-carved',
    name: 'Wooden Carved',
    category: 'Natural',
    description: 'Hand-carved wood effect with natural texture',
    shadowCount: 2,
    tags: ['wood', 'carved', 'natural'],
    style: {
      color: '#8b4513',
      textShadow: '1px 1px 0px #654321, 2px 2px 2px rgba(0, 0, 0, 0.3)',
      fontWeight: 'bold'
    }
  },
  {
    id: 'plasma-energy',
    name: 'Plasma Energy',
    category: 'Dynamic',
    description: 'Electric plasma energy with animated glow',
    shadowCount: 4,
    tags: ['plasma', 'energy', 'electric'],
    style: {
      color: '#ffffff',
      textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #ff00ff, 0 0 20px #ff00ff',
      fontWeight: 'bold'
    }
  }
];

export function TextStyleCollection() {
  const [selectedTextStyle, setSelectedTextStyle] = useState<TextStylePreset | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTextClick = (textStyle: TextStylePreset) => {
    setSelectedTextStyle(textStyle);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedTextStyle(null), 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Text Style Collection</h2>
        <p className="text-muted-foreground">
          WordArt-inspired text effects with customizable shadows. Click any style to view details and copy CSS.
        </p>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {textStyles.map((textStyle, index) => (
          <TextCard
            key={textStyle.id}
            textStyle={textStyle}
            onClick={handleTextClick}
            index={index}
          />
        ))}
      </motion.div>

      {/* Text Drawer */}
      <TextDrawer
        textStyle={selectedTextStyle}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}