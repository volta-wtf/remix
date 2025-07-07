import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FrameCard } from './FrameCard';
import { FrameDrawer } from './FrameDrawer';

interface FrameStylePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  shadowCount: number;
  tags: string[];
  frameStyle: React.CSSProperties;
  backgroundColor: string;
}

const frameStyles: FrameStylePreset[] = [
  // Glassmorphism & Glass Effects
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    category: 'Modern',
    description: 'Modern glass-like effect with backdrop blur and transparency',
    shadowCount: 1,
    tags: ['glass', 'modern', 'transparent', 'blur'],
    frameStyle: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'frosted-ui',
    name: 'Frosted UI',
    category: 'Modern',
    description: 'Heavy frosted glass effect with strong blur and subtle borders',
    shadowCount: 2,
    tags: ['frosted', 'glass', 'blur', 'modern'],
    frameStyle: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    },
    backgroundColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
  },
  {
    id: 'crystal-glass',
    name: 'Crystal Glass',
    category: 'Luxury',
    description: 'Premium crystal-like glass with prismatic reflections',
    shadowCount: 3,
    tags: ['crystal', 'luxury', 'prismatic', 'glass'],
    frameStyle: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
      backdropFilter: 'blur(15px)',
      border: '2px solid rgba(255, 255, 255, 0.4)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
    },
    backgroundColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },

  // Morphism Variants
  {
    id: 'neumorphism',
    name: 'Neumorphism',
    category: 'Soft UI',
    description: 'Soft 3D effect with subtle inset and outset shadows',
    shadowCount: 2,
    tags: ['neumorphism', 'soft', 'minimal', '3d'],
    frameStyle: {
      background: '#e0e5ec',
      borderRadius: '16px',
      boxShadow: '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff'
    },
    backgroundColor: '#e0e5ec'
  },
  {
    id: 'claymorphism',
    name: 'Claymorphism',
    category: 'Organic',
    description: 'Clay-like organic shapes with soft matte finish',
    shadowCount: 2,
    tags: ['clay', 'organic', 'matte', 'soft'],
    frameStyle: {
      background: '#f0f0f0',
      borderRadius: '24px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },
    backgroundColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 'plasticmorphism',
    name: 'Plasticmorphism',
    category: 'Futuristic',
    description: 'Glossy plastic-like surface with high reflectivity',
    shadowCount: 3,
    tags: ['plastic', 'glossy', 'reflective', 'futuristic'],
    frameStyle: {
      background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.6)'
    },
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'blackmorphism',
    name: 'Blackmorphism',
    category: 'Dark',
    description: 'Dark theme morphism with subtle highlights',
    shadowCount: 2,
    tags: ['dark', 'morphism', 'minimal', 'elegant'],
    frameStyle: {
      background: '#1a1a1a',
      borderRadius: '16px',
      boxShadow: '8px 8px 16px #0d0d0d, -8px -8px 16px #272727',
      border: '1px solid #333'
    },
    backgroundColor: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)'
  },
  {
    id: 'neuromorphism',
    name: 'Neuromorphism',
    category: 'Experimental',
    description: 'Brain-inspired neural network patterns with organic curves',
    shadowCount: 3,
    tags: ['neural', 'organic', 'experimental', 'curves'],
    frameStyle: {
      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 70%)',
      backgroundColor: '#f5f5f5',
      borderRadius: '20px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.05)'
    },
    backgroundColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },

  // Design System Styles  
  {
    id: 'skeuomorphism',
    name: 'Skeuomorphism',
    category: 'Classic',
    description: 'Realistic 3D design mimicking physical objects',
    shadowCount: 4,
    tags: ['realistic', '3d', 'classic', 'detailed'],
    frameStyle: {
      background: 'linear-gradient(145deg, #f0f0f0, #d0d0d0)',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
      border: '1px solid #bbb'
    },
    backgroundColor: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  },
  {
    id: 'flat-design',
    name: 'Flat Design',
    category: 'Minimal',
    description: 'Clean flat design with solid colors and sharp edges',
    shadowCount: 0,
    tags: ['flat', 'minimal', 'clean', 'sharp'],
    frameStyle: {
      background: '#3498db',
      borderRadius: '4px',
      border: 'none'
    },
    backgroundColor: '#ecf0f1'
  },
  {
    id: 'material-design',
    name: 'Material Design',
    category: 'Google',
    description: 'Google Material Design with elevation shadows',
    shadowCount: 1,
    tags: ['material', 'google', 'elevation', 'modern'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)',
      border: 'none'
    },
    backgroundColor: '#f5f5f5'
  },
  {
    id: 'metro-ui',
    name: 'Metro UI',
    category: 'Microsoft',
    description: 'Microsoft Metro design with bold typography and tiles',
    shadowCount: 0,
    tags: ['metro', 'microsoft', 'tiles', 'bold'],
    frameStyle: {
      background: '#e74c3c',
      borderRadius: '0px',
      border: 'none'
    },
    backgroundColor: '#2c3e50'
  },
  {
    id: 'ultra-flat',
    name: 'Ultra-flat',
    category: 'Minimal',
    description: 'Extreme minimalism with no shadows or gradients',
    shadowCount: 0,
    tags: ['ultra-flat', 'minimal', 'extreme', 'simple'],
    frameStyle: {
      background: '#2ecc71',
      borderRadius: '0px',
      border: '1px solid #27ae60'
    },
    backgroundColor: '#ffffff'
  },

  // Aesthetic Styles
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'Futuristic',
    description: 'Neon-lit cyberpunk aesthetic with glitch effects',
    shadowCount: 3,
    tags: ['cyberpunk', 'neon', 'glitch', 'futuristic'],
    frameStyle: {
      background: 'linear-gradient(45deg, #000000, #1a1a2e)',
      border: '2px solid #00ffff',
      borderRadius: '4px',
      boxShadow: '0 0 20px #00ffff, inset 0 0 20px rgba(0, 255, 255, 0.1), 0 0 40px rgba(0, 255, 255, 0.3)'
    },
    backgroundColor: 'linear-gradient(135deg, #0f0f23 0%, #16213e 100%)'
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    category: 'Retro',
    description: 'Retro 80s aesthetic with pink and purple gradients',
    shadowCount: 2,
    tags: ['vaporwave', 'retro', '80s', 'aesthetic'],
    frameStyle: {
      background: 'linear-gradient(45deg, #ff006e, #8338ec)',
      borderRadius: '8px',
      boxShadow: '0 8px 16px rgba(255, 0, 110, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    },
    backgroundColor: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)'
  },
  {
    id: 'aurora-ui',
    name: 'Aurora UI',
    category: 'Ethereal',
    description: 'Aurora-inspired gradients with luminous effects',
    shadowCount: 2,
    tags: ['aurora', 'ethereal', 'luminous', 'gradients'],
    frameStyle: {
      background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.3), rgba(255, 140, 0, 0.3), rgba(255, 0, 128, 0.3))',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(64, 224, 208, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },

  // Brutalism & Anti-design
  {
    id: 'brutalism',
    name: 'Brutalism',
    category: 'Raw',
    description: 'Raw, unrefined design with bold geometric shapes',
    shadowCount: 1,
    tags: ['brutalism', 'raw', 'geometric', 'bold'],
    frameStyle: {
      background: '#000000',
      borderRadius: '0px',
      border: '4px solid #ffffff',
      boxShadow: '8px 8px 0px #ff0000'
    },
    backgroundColor: '#ffff00'
  },
  {
    id: 'neobrutalism',
    name: 'Neobrutalism',
    category: 'Modern Raw',
    description: 'Modern take on brutalism with digital elements',
    shadowCount: 1,
    tags: ['neobrutalism', 'modern', 'digital', 'bold'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '0px',
      border: '3px solid #000000',
      boxShadow: '6px 6px 0px #000000'
    },
    backgroundColor: '#00ff00'
  },
  {
    id: 'anti-design',
    name: 'Anti-design',
    category: 'Rebellious',
    description: 'Intentionally broken design rules with chaotic elements',
    shadowCount: 2,
    tags: ['anti-design', 'chaotic', 'rebellious', 'broken'],
    frameStyle: {
      background: '#ff00ff',
      borderRadius: '0px 16px 0px 16px',
      border: '2px dashed #00ffff',
      boxShadow: '-4px 4px 0px #ffff00, 4px -4px 0px #ff0000',
      transform: 'rotate(-1deg)'
    },
    backgroundColor: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ffff00)'
  },
  {
    id: 'memphis-ui',
    name: 'Memphis UI',
    category: 'Playful',
    description: 'Memphis design with geometric patterns and bright colors',
    shadowCount: 2,
    tags: ['memphis', 'playful', 'geometric', 'bright'],
    frameStyle: {
      background: '#ff6b6b',
      borderRadius: '12px',
      border: '3px solid #4ecdc4',
      boxShadow: '5px 5px 0px #ffe66d, -3px -3px 0px #a8e6cf'
    },
    backgroundColor: 'linear-gradient(45deg, #ff9ff3, #54a0ff, #5f27cd, #00d2d3)'
  },

  // Specialized UI Styles
  {
    id: 'dashboard-style',
    name: 'Dashboard Style',
    category: 'Professional',
    description: 'Clean dashboard interface with data visualization focus',
    shadowCount: 1,
    tags: ['dashboard', 'professional', 'data', 'clean'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e1e5e9',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    backgroundColor: '#f8f9fa'
  },
  {
    id: 'command-line',
    name: 'Command-line',
    category: 'Terminal',
    description: 'Terminal-inspired monospace design with green text',
    shadowCount: 0,
    tags: ['terminal', 'monospace', 'developer', 'retro'],
    frameStyle: {
      background: '#000000',
      borderRadius: '4px',
      border: '1px solid #00ff00',
      fontFamily: 'monospace'
    },
    backgroundColor: '#001100'
  },
  {
    id: 'blueprint-ui',
    name: 'Blueprint UI',
    category: 'Technical',
    description: 'Technical blueprint design with precise lines and measurements',
    shadowCount: 0,
    tags: ['blueprint', 'technical', 'precise', 'lines'],
    frameStyle: {
      background: '#003366',
      borderRadius: '0px',
      border: '1px solid #0099cc',
      position: 'relative'
    },
    backgroundColor: '#001122'
  },
  {
    id: 'wireframe-ui',
    name: 'Wireframe UI',
    category: 'Prototype',
    description: 'Wireframe prototype style with outlined elements',
    shadowCount: 0,
    tags: ['wireframe', 'prototype', 'outlined', 'minimal'],
    frameStyle: {
      background: 'transparent',
      borderRadius: '4px',
      border: '2px solid #666666'
    },
    backgroundColor: '#f0f0f0'
  },

  // Artistic Styles
  {
    id: 'bauhaus-ui',
    name: 'Bauhaus UI',
    category: 'Architectural',
    description: 'Bauhaus design principles with geometric forms',
    shadowCount: 0,
    tags: ['bauhaus', 'geometric', 'architectural', 'minimal'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '0px',
      border: '2px solid #000000'
    },
    backgroundColor: 'linear-gradient(90deg, #ff0000 33%, #ffff00 33%, #ffff00 66%, #0000ff 66%)'
  },
  {
    id: 'constructivist-ui',
    name: 'Constructivist UI',
    category: 'Revolutionary',
    description: 'Soviet constructivist design with bold red and geometric shapes',
    shadowCount: 1,
    tags: ['constructivist', 'revolutionary', 'geometric', 'bold'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '0px',
      border: '3px solid #cc0000',
      boxShadow: '4px 4px 0px #000000'
    },
    backgroundColor: 'linear-gradient(45deg, #cc0000, #000000)'
  },
  {
    id: 'swiss-style',
    name: 'Swiss Style',
    category: 'Typography',
    description: 'Swiss International Style with clean typography and grid systems',
    shadowCount: 0,
    tags: ['swiss', 'typography', 'grid', 'clean'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '0px',
      border: '1px solid #000000'
    },
    backgroundColor: '#ffffff'
  },
  {
    id: 'art-deco-ui',
    name: 'Art Deco UI',
    category: 'Vintage',
    description: 'Art Deco style with luxurious gold and geometric patterns',
    shadowCount: 2,
    tags: ['art-deco', 'luxury', 'geometric', 'vintage'],
    frameStyle: {
      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
      borderRadius: '8px',
      border: '2px solid #b8860b',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
    },
    backgroundColor: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
  },

  // Organic & Fluid Styles
  {
    id: 'liquid-ui',
    name: 'Liquid UI',
    category: 'Fluid',
    description: 'Liquid-like flowing forms with organic curves',
    shadowCount: 2,
    tags: ['liquid', 'fluid', 'organic', 'curves'],
    frameStyle: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '30px 10px 30px 10px',
      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    },
    backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'biomorphic-ui',
    name: 'Biomorphic UI',
    category: 'Organic',
    description: 'Biology-inspired organic shapes and natural patterns',
    shadowCount: 2,
    tags: ['biomorphic', 'organic', 'natural', 'biology'],
    frameStyle: {
      background: '#8bc34a',
      borderRadius: '50% 20% 30% 40%',
      boxShadow: '0 8px 16px rgba(139, 195, 74, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
    },
    backgroundColor: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc8 100%)'
  },
  {
    id: 'auroraism',
    name: 'Auroraism',
    category: 'Ethereal',
    description: 'Enhanced aurora effects with multiple color layers and movement',
    shadowCount: 3,
    tags: ['aurora', 'ethereal', 'movement', 'layers'],
    frameStyle: {
      background: 'linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3), rgba(255, 255, 0, 0.3))',
      backdropFilter: 'blur(15px)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2), 0 0 64px rgba(255, 0, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
  },

  // Advanced Styles
  {
    id: 'liminal-ui',
    name: 'Liminal UI',
    category: 'Surreal',
    description: 'Surreal liminal space aesthetic with unsettling beauty',
    shadowCount: 2,
    tags: ['liminal', 'surreal', 'unsettling', 'ethereal'],
    frameStyle: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(240, 240, 240, 0.1))',
      backdropFilter: 'blur(8px) saturate(0.8)',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(200, 200, 200, 0.2)'
    },
    backgroundColor: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  },
  {
    id: 'post-flat',
    name: 'Post-Flat',
    category: 'Evolution',
    description: 'Evolution of flat design with subtle depth and micro-interactions',
    shadowCount: 1,
    tags: ['post-flat', 'evolution', 'subtle', 'depth'],
    frameStyle: {
      background: '#4a90e2',
      borderRadius: '6px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    backgroundColor: '#f8f9fa'
  },
  {
    id: 'noise-layering',
    name: 'Noise Layering',
    category: 'Textured',
    description: 'Textured flat design with noise patterns and grain',
    shadowCount: 1,
    tags: ['noise', 'texture', 'grain', 'layered'],
    frameStyle: {
      background: '#34495e',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      position: 'relative'
    },
    backgroundColor: '#2c3e50'
  },
  {
    id: 'gradient-noise',
    name: 'Gradient Noise',
    category: 'Textured',
    description: 'Gradient backgrounds with noise texture overlay',
    shadowCount: 2,
    tags: ['gradient', 'noise', 'texture', 'overlay'],
    frameStyle: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    },
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },

  // Experimental Styles
  {
    id: 'escher-ui',
    name: 'Escher UI',
    category: 'Impossible',
    description: 'Impossible geometry inspired by M.C. Escher',
    shadowCount: 3,
    tags: ['escher', 'impossible', 'geometry', 'illusion'],
    frameStyle: {
      background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
      borderRadius: '0px',
      border: '2px solid #333333',
      boxShadow: '4px 4px 0px #666666, 8px 8px 0px #999999, 12px 12px 0px #cccccc',
      transform: 'perspective(100px) rotateX(5deg)'
    },
    backgroundColor: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  },
  {
    id: 'kinetic-ui',
    name: 'Kinetic UI',
    category: 'Dynamic',
    description: 'Motion-focused design with animated elements',
    shadowCount: 2,
    tags: ['kinetic', 'motion', 'animated', 'dynamic'],
    frameStyle: {
      background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
      borderRadius: '16px',
      boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3), 0 0 32px rgba(238, 90, 36, 0.2)'
    },
    backgroundColor: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)'
  },
  {
    id: 'moire-ui',
    name: 'Moiré UI',
    category: 'Optical',
    description: 'Moiré pattern effects with optical illusions',
    shadowCount: 1,
    tags: ['moire', 'optical', 'illusion', 'pattern'],
    frameStyle: {
      background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    backgroundColor: '#f8f9fa'
  },
  {
    id: 'techno-chrome',
    name: 'Techno-Chrome',
    category: 'Futuristic',
    description: 'High-tech chrome with digital circuit patterns',
    shadowCount: 3,
    tags: ['techno', 'chrome', 'digital', 'circuits'],
    frameStyle: {
      background: 'linear-gradient(135deg, #c0c0c0, #e8e8e8, #c0c0c0)',
      borderRadius: '4px',
      border: '1px solid #00ffff',
      boxShadow: '0 0 10px #00ffff, 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
    },
    backgroundColor: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)'
  },
  {
    id: 'glitch-ui',
    name: 'Glitch UI',
    category: 'Digital Error',
    description: 'Digital glitch effects with RGB separation and distortion',
    shadowCount: 2,
    tags: ['glitch', 'digital', 'error', 'distortion'],
    frameStyle: {
      background: '#000000',
      borderRadius: '4px',
      border: '1px solid #ff0000',
      boxShadow: '2px 0px 0px #00ff00, -2px 0px 0px #0000ff',
      position: 'relative'
    },
    backgroundColor: 'linear-gradient(135deg, #000000 0%, #330033 100%)'
  },
  {
    id: 'holographic-advanced',
    name: 'Holographic',
    category: 'Futuristic',
    description: 'Advanced holographic effect with rainbow iridescence',
    shadowCount: 3,
    tags: ['holographic', 'iridescent', 'rainbow', 'futuristic'],
    frameStyle: {
      background: 'linear-gradient(45deg, #ff0080, #00ff80, #8000ff, #ff0080)',
      backgroundSize: '400% 400%',
      borderRadius: '12px',
      border: '2px solid transparent',
      boxShadow: '0 8px 24px rgba(255, 0, 128, 0.3), 0 0 48px rgba(0, 255, 128, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
    },
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },

  // System & Modular
  {
    id: 'modular-ui',
    name: 'Modular UI',
    category: 'Systematic',
    description: 'Modular component system with consistent spacing',
    shadowCount: 1,
    tags: ['modular', 'systematic', 'components', 'consistent'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e1e5e9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)'
    },
    backgroundColor: '#f8f9fa'
  },
  {
    id: 'systematic-design',
    name: 'Systematic Design',
    category: 'Design System',
    description: 'Structured design system with consistent tokens',
    shadowCount: 1,
    tags: ['systematic', 'tokens', 'structured', 'consistent'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #d1d5db',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
    },
    backgroundColor: '#f9fafb'
  },
  {
    id: 'monochrome-ui',
    name: 'Monochrome UI',
    category: 'Minimal',
    description: 'Pure monochrome design with only black and white',
    shadowCount: 1,
    tags: ['monochrome', 'minimal', 'black', 'white'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '4px',
      border: '2px solid #000000',
      boxShadow: '4px 4px 0px #000000'
    },
    backgroundColor: '#ffffff'
  },

  // Additional Unique Styles
  {
    id: '3d-isometric',
    name: '3D Isometric',
    category: '3D',
    description: 'Isometric 3D design with depth and perspective',
    shadowCount: 2,
    tags: ['3d', 'isometric', 'depth', 'perspective'],
    frameStyle: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '8px',
      boxShadow: '8px 8px 0px #4a69bd, 16px 16px 0px #3c5aa6',
      transform: 'perspective(500px) rotateX(10deg) rotateY(-10deg)'
    },
    backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'drawing-style',
    name: 'Drawing Style',
    category: 'Artistic',
    description: 'Hand-drawn sketchy style with rough edges',
    shadowCount: 1,
    tags: ['drawing', 'sketchy', 'artistic', 'hand-drawn'],
    frameStyle: {
      background: '#ffffff',
      borderRadius: '4px',
      border: '2px solid #333333',
      boxShadow: '2px 2px 0px #333333',
      position: 'relative'
    },
    backgroundColor: '#fefefe'
  },
  {
    id: 'vintage-paper',
    name: 'Vintage Paper',
    category: 'Classic',
    description: 'Aged paper effect with worn edges and sepia tones',
    shadowCount: 1,
    tags: ['vintage', 'paper', 'aged', 'sepia'],
    frameStyle: {
      background: '#f4f1e8',
      border: '3px solid #8b7355',
      borderRadius: '4px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    backgroundColor: '#d4af37'
  },
  {
    id: 'wooden-frame',
    name: 'Wooden Frame',
    category: 'Natural',
    description: 'Rustic wooden border with natural wood texture',
    shadowCount: 2,
    tags: ['wood', 'rustic', 'natural', 'texture'],
    frameStyle: {
      background: 'linear-gradient(45deg, #8b4513, #a0522d)',
      border: '8px solid #654321',
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
    },
    backgroundColor: 'linear-gradient(135deg, #8fbc8f 0%, #556b2f 100%)'
  }
];

export function FrameStyleCollection() {
  const [selectedFrameStyle, setSelectedFrameStyle] = useState<FrameStylePreset | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFrameClick = (frameStyle: FrameStylePreset) => {
    setSelectedFrameStyle(frameStyle);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedFrameStyle(null), 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Frame Style Collection</h2>
        <p className="text-muted-foreground">
          Discover trending UI design styles from glassmorphism to cyberpunk. Click any frame to view details and copy CSS.
        </p>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {frameStyles.map((frameStyle, index) => (
          <FrameCard
            key={frameStyle.id}
            frameStyle={frameStyle}
            onClick={handleFrameClick}
            index={index}
          />
        ))}
      </motion.div>

      {/* Frame Drawer */}
      <FrameDrawer
        frameStyle={selectedFrameStyle}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}