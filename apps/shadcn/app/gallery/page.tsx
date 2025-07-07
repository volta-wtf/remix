"use client"
import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { MainNavigation } from './partials/MainNavigation';
import { GradientGrid } from './partials/GradientGrid';
import { GradientLightbox } from './partials/GradientLightbox';
import { TextStylesGrid } from './partials/TextStylesGrid';
import { TextStyleLightbox } from './partials/TextStyleLightbox';
import { FrameStylesGrid } from './partials/FrameStylesGrid';
import { FrameStyleLightbox } from './partials/FrameStyleLightbox';
import { SearchAndFilter } from './partials/SearchAndFilter';

export interface Gradient {
  id: string;
  name: string;
  description: string;
  gradient: string;
  colors: string[];
  inspiration: string;
  usage: string;
  category: string;
  tags: string[];
  isCustom?: boolean;
  isModified?: boolean;
}

export interface TextStyle {
  id: string;
  name: string;
  description: string;
  previewText: string;
  style: React.CSSProperties;
  category: string;
  tags: string[];
  cssClass: string;
  isCustom?: boolean;
  isModified?: boolean;
}

export interface FrameStyle {
  id: string;
  name: string;
  description: string;
  style: React.CSSProperties;
  category: string;
  tags: string[];
  cssClass: string;
  material: string;
  isCustom?: boolean;
  isModified?: boolean;
}

type Section = 'gradients' | 'text-styles' | 'frame-styles';

const gradients: Gradient[] = [
  {
    id: '1',
    name: 'Sunset Bloom',
    description: 'A warm gradient that captures the essence of a perfect sunset',
    gradient: 'linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3)',
    colors: ['#ff6b6b', '#feca57', '#ff9ff3'],
    inspiration: 'Golden hour sunsets and blooming flowers',
    usage: 'Perfect for wellness apps, lifestyle brands, and creative portfolios',
    category: 'Nature',
    tags: ['warm', 'organic', 'wellness']
  },
  {
    id: '2',
    name: 'Ocean Depths',
    description: 'Deep blue tones reminiscent of diving into crystal clear waters',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2, #6b73ff)',
    colors: ['#667eea', '#764ba2', '#6b73ff'],
    inspiration: 'Deep ocean trenches and mysterious underwater worlds',
    usage: 'Ideal for tech companies, meditation apps, and professional services',
    category: 'Tech',
    tags: ['cool', 'professional', 'tech']
  },
  {
    id: '3',
    name: 'Forest Whisper',
    description: 'Natural greens that evoke peaceful forest walks',
    gradient: 'linear-gradient(135deg, #56ab2f, #a8e6cf, #88d8a3)',
    colors: ['#56ab2f', '#a8e6cf', '#88d8a3'],
    inspiration: 'Morning mist through dense forest canopies',
    usage: 'Great for eco-friendly brands, health apps, and outdoor companies',
    category: 'Nature',
    tags: ['green', 'eco', 'health']
  },
  {
    id: '4',
    name: 'Cosmic Dance',
    description: 'Vibrant purples and pinks that capture the beauty of nebulae',
    gradient: 'linear-gradient(135deg, #a8edea, #fed6e3, #d299c2)',
    colors: ['#a8edea', '#fed6e3', '#d299c2'],
    inspiration: 'Distant galaxies and colorful cosmic phenomena',
    usage: 'Perfect for creative agencies, entertainment brands, and art platforms',
    category: 'Creative',
    tags: ['vibrant', 'artistic', 'cosmic']
  },
  {
    id: '5',
    name: 'Golden Hour',
    description: 'Warm amber tones that capture the magic of dawn',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c, #4facfe)',
    colors: ['#f093fb', '#f5576c', '#4facfe'],
    inspiration: 'The first light of dawn breaking through clouds',
    usage: 'Excellent for luxury brands, photography portfolios, and lifestyle apps',
    category: 'Luxury',
    tags: ['warm', 'premium', 'photography']
  },
  {
    id: '6',
    name: 'Arctic Aurora',
    description: 'Cool blues and teals inspired by northern lights',
    gradient: 'linear-gradient(135deg, #74b9ff, #0984e3, #6c5ce7)',
    colors: ['#74b9ff', '#0984e3', '#6c5ce7'],
    inspiration: 'Aurora borealis dancing across arctic skies',
    usage: 'Ideal for technology brands, finance apps, and modern websites',
    category: 'Tech',
    tags: ['cool', 'modern', 'finance']
  },
  {
    id: '7',
    name: 'Desert Mirage',
    description: 'Warm earth tones that shimmer like heat waves',
    gradient: 'linear-gradient(135deg, #fab1a0, #e17055, #fdcb6e)',
    colors: ['#fab1a0', '#e17055', '#fdcb6e'],
    inspiration: 'Endless desert dunes under scorching sun',
    usage: 'Perfect for travel brands, adventure apps, and cultural organizations',
    category: 'Travel',
    tags: ['warm', 'adventure', 'travel']
  },
  {
    id: '8',
    name: 'Lavender Dreams',
    description: 'Soft purples and blues for a dreamy, calming effect',
    gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7, #fd79a8)',
    colors: ['#a29bfe', '#6c5ce7', '#fd79a8'],
    inspiration: 'Lavender fields swaying in gentle summer breeze',
    usage: 'Great for wellness brands, beauty products, and mindfulness apps',
    category: 'Wellness',
    tags: ['soft', 'calming', 'beauty']
  }
];

const textStyles: TextStyle[] = [
  {
    id: '1',
    name: 'Neon Glow',
    description: 'Electric neon text with a vibrant glow effect',
    previewText: 'NEON',
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
    previewText: 'GOLD',
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
    previewText: 'RAINBOW',
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
    previewText: 'CHROME',
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
    previewText: 'FIRE',
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
    previewText: 'ICE',
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
    previewText: 'RETRO',
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
    previewText: 'OUTLINE',
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

const frameStyles: FrameStyle[] = [
  {
    id: '1',
    name: 'Glass Morphism',
    description: 'Modern glass effect with blur and transparency',
    style: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '16px'
    },
    category: 'Modern',
    tags: ['glass', 'blur', 'transparent'],
    cssClass: 'glass-morphism',
    material: 'Glass'
  },
  {
    id: '2',
    name: 'Metallic Steel',
    description: 'Industrial steel frame with metallic shine',
    style: {
      background: 'linear-gradient(145deg, #b8b8b8, #e8e8e8)',
      border: '2px solid #999',
      borderRadius: '8px',
      boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.8), inset -2px -2px 5px rgba(0,0,0,0.3)'
    },
    category: 'Industrial',
    tags: ['metal', 'steel', 'industrial'],
    cssClass: 'metallic-steel',
    material: 'Metal'
  },
  {
    id: '3',
    name: 'Neon Border',
    description: 'Glowing neon border with electric effect',
    style: {
      background: 'rgba(0, 0, 0, 0.8)',
      border: '2px solid #00ffff',
      borderRadius: '12px',
      boxShadow: '0 0 10px #00ffff, inset 0 0 10px rgba(0, 255, 255, 0.1)'
    },
    category: 'Retro',
    tags: ['neon', 'glow', 'cyberpunk'],
    cssClass: 'neon-border',
    material: 'Energy'
  },
  {
    id: '4',
    name: 'Wood Grain',
    description: 'Natural wood texture with grain pattern',
    style: {
      background: 'linear-gradient(90deg, #8B4513 0%, #CD853F 25%, #8B4513 50%, #CD853F 75%, #8B4513 100%)',
      border: '3px solid #654321',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
    },
    category: 'Natural',
    tags: ['wood', 'natural', 'organic'],
    cssClass: 'wood-grain',
    material: 'Wood'
  },
  {
    id: '5',
    name: 'Crystal Diamond',
    description: 'Prismatic crystal effect with rainbow reflections',
    style: {
      background: 'linear-gradient(45deg, rgba(255,255,255,0.9), rgba(255,255,255,0.1))',
      border: '2px solid rgba(255,255,255,0.5)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 0 20px rgba(255,255,255,0.2)'
    },
    category: 'Luxury',
    tags: ['crystal', 'diamond', 'luxury'],
    cssClass: 'crystal-diamond',
    material: 'Crystal'
  },
  {
    id: '6',
    name: 'Fabric Textile',
    description: 'Soft fabric texture with woven pattern',
    style: {
      background: 'linear-gradient(45deg, #e6e6e6 25%, transparent 25%, transparent 75%, #e6e6e6 75%), linear-gradient(45deg, #e6e6e6 25%, transparent 25%, transparent 75%, #e6e6e6 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 10px 10px',
      backgroundColor: '#f0f0f0',
      border: '2px solid #ccc',
      borderRadius: '12px'
    },
    category: 'Textile',
    tags: ['fabric', 'textile', 'soft'],
    cssClass: 'fabric-textile',
    material: 'Fabric'
  },
  {
    id: '7',
    name: 'Liquid Mercury',
    description: 'Flowing liquid metal with chrome reflection',
    style: {
      background: 'radial-gradient(ellipse at center, #c0c0c0 0%, #808080 50%, #404040 100%)',
      border: '1px solid #606060',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1)'
    },
    category: 'Liquid',
    tags: ['mercury', 'liquid', 'chrome'],
    cssClass: 'liquid-mercury',
    material: 'Liquid'
  },
  {
    id: '8',
    name: 'Holographic Foil',
    description: 'Iridescent holographic surface with color shifting',
    style: {
      background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
      backgroundSize: '400% 400%',
      animation: 'gradient 3s ease infinite',
      border: '2px solid rgba(255,255,255,0.3)',
      borderRadius: '16px',
      boxShadow: '0 0 20px rgba(255,0,255,0.3)'
    },
    category: 'Futuristic',
    tags: ['hologram', 'iridescent', 'futuristic'],
    cssClass: 'holographic-foil',
    material: 'Hologram'
  }
];

const gradientCategories = ['All', 'Nature', 'Tech', 'Creative', 'Luxury', 'Travel', 'Wellness', 'Custom', 'Modified'];
const textStyleCategories = ['All', 'Retro', 'Luxury', 'Colorful', 'Metallic', 'Effects', 'Minimal', 'Custom', 'Modified'];
const frameStyleCategories = ['All', 'Modern', 'Industrial', 'Retro', 'Natural', 'Luxury', 'Textile', 'Liquid', 'Futuristic', 'Custom', 'Modified'];

export default function GalleryPage() {
  const [activeSection, setActiveSection] = useState<Section>('gradients');
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);
  const [selectedTextStyle, setSelectedTextStyle] = useState<TextStyle | null>(null);
  const [selectedFrameStyle, setSelectedFrameStyle] = useState<FrameStyle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modified and custom items state
  const [modifiedGradients, setModifiedGradients] = useState<Gradient[]>([]);
  const [modifiedTextStyles, setModifiedTextStyles] = useState<TextStyle[]>([]);
  const [modifiedFrameStyles, setModifiedFrameStyles] = useState<FrameStyle[]>([]);
  const [customGradients, setCustomGradients] = useState<Gradient[]>([]);
  const [customTextStyles, setCustomTextStyles] = useState<TextStyle[]>([]);
  const [customFrameStyles, setCustomFrameStyles] = useState<FrameStyle[]>([]);

  // Get current data and categories based on active section
  const getCurrentData = () => {
    switch (activeSection) {
      case 'gradients':
        return {
          data: [...gradients, ...modifiedGradients, ...customGradients],
          categories: gradientCategories
        };
      case 'text-styles':
        return {
          data: [...textStyles, ...modifiedTextStyles, ...customTextStyles],
          categories: textStyleCategories
        };
      case 'frame-styles':
        return {
          data: [...frameStyles, ...modifiedFrameStyles, ...customFrameStyles],
          categories: frameStyleCategories
        };
      default:
        return { data: gradients, categories: gradientCategories };
    }
  };

  const { data: currentData, categories: currentCategories } = getCurrentData();

  const filteredData = useMemo(() => {
    return currentData.filter((item: any) => {
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.usage && item.usage.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [currentData, searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    clearFilters();
  };

  // Duplicate handlers (now creates custom items)
  const handleDuplicateGradient = (gradient: Gradient) => {
    const newGradient: Gradient = {
      ...gradient,
      id: `custom-${Date.now()}`,
      name: `${gradient.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomGradients(prev => [...prev, newGradient]);
    setSelectedGradient(newGradient);
  };

  const handleDuplicateTextStyle = (textStyle: TextStyle) => {
    const newTextStyle: TextStyle = {
      ...textStyle,
      id: `custom-${Date.now()}`,
      name: `${textStyle.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomTextStyles(prev => [...prev, newTextStyle]);
    setSelectedTextStyle(newTextStyle);
  };

  const handleDuplicateFrameStyle = (frameStyle: FrameStyle) => {
    const newFrameStyle: FrameStyle = {
      ...frameStyle,
      id: `custom-${Date.now()}`,
      name: `${frameStyle.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomFrameStyles(prev => [...prev, newFrameStyle]);
    setSelectedFrameStyle(newFrameStyle);
  };

  // Update handlers (now handle all items)
  const handleUpdateGradient = (updatedGradient: Gradient) => {
    if (updatedGradient.isCustom) {
      // Update custom items
      setCustomGradients(prev =>
        prev.map(g => g.id === updatedGradient.id ? updatedGradient : g)
      );
    } else {
      // Check if this is a built-in item being modified
      const isBuiltIn = gradients.find(g => g.id === updatedGradient.id);
      if (isBuiltIn) {
        // Mark as modified and add to modified items
        const modifiedGradient: Gradient = {
          ...updatedGradient,
          isModified: true,
          category: updatedGradient.category === 'Modified' ? updatedGradient.category : updatedGradient.category
        };

        setModifiedGradients(prev => {
          const existing = prev.find(g => g.id === updatedGradient.id);
          if (existing) {
            return prev.map(g => g.id === updatedGradient.id ? modifiedGradient : g);
          } else {
            return [...prev, modifiedGradient];
          }
        });
      } else {
        // Update modified items
        setModifiedGradients(prev =>
          prev.map(g => g.id === updatedGradient.id ? updatedGradient : g)
        );
      }
    }
    setSelectedGradient(updatedGradient);
  };

  const handleUpdateTextStyle = (updatedTextStyle: TextStyle) => {
    if (updatedTextStyle.isCustom) {
      setCustomTextStyles(prev =>
        prev.map(ts => ts.id === updatedTextStyle.id ? updatedTextStyle : ts)
      );
    } else {
      const isBuiltIn = textStyles.find(ts => ts.id === updatedTextStyle.id);
      if (isBuiltIn) {
        const modifiedTextStyle: TextStyle = {
          ...updatedTextStyle,
          isModified: true
        };

        setModifiedTextStyles(prev => {
          const existing = prev.find(ts => ts.id === updatedTextStyle.id);
          if (existing) {
            return prev.map(ts => ts.id === updatedTextStyle.id ? modifiedTextStyle : ts);
          } else {
            return [...prev, modifiedTextStyle];
          }
        });
      } else {
        setModifiedTextStyles(prev =>
          prev.map(ts => ts.id === updatedTextStyle.id ? updatedTextStyle : ts)
        );
      }
    }
    setSelectedTextStyle(updatedTextStyle);
  };

  const handleUpdateFrameStyle = (updatedFrameStyle: FrameStyle) => {
    if (updatedFrameStyle.isCustom) {
      setCustomFrameStyles(prev =>
        prev.map(fs => fs.id === updatedFrameStyle.id ? updatedFrameStyle : fs)
      );
    } else {
      const isBuiltIn = frameStyles.find(fs => fs.id === updatedFrameStyle.id);
      if (isBuiltIn) {
        const modifiedFrameStyle: FrameStyle = {
          ...updatedFrameStyle,
          isModified: true
        };

        setModifiedFrameStyles(prev => {
          const existing = prev.find(fs => fs.id === updatedFrameStyle.id);
          if (existing) {
            return prev.map(fs => fs.id === updatedFrameStyle.id ? modifiedFrameStyle : fs);
          } else {
            return [...prev, modifiedFrameStyle];
          }
        });
      } else {
        setModifiedFrameStyles(prev =>
          prev.map(fs => fs.id === updatedFrameStyle.id ? updatedFrameStyle : fs)
        );
      }
    }
    setSelectedFrameStyle(updatedFrameStyle);
  };

  const isLightboxOpen = selectedGradient || selectedTextStyle || selectedFrameStyle;

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <AnimatePresence mode="wait">
        {!isLightboxOpen ? (
          <>
            <SearchAndFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={currentCategories}
              onClearFilters={clearFilters}
              resultsCount={filteredData.length}
              totalCount={currentData.length}
            />

            {activeSection === 'gradients' && (
              <GradientGrid
                key="gradients-grid"
                gradients={filteredData as Gradient[]}
                onSelectGradient={setSelectedGradient}
                searchQuery={searchQuery}
              />
            )}

            {activeSection === 'text-styles' && (
              <TextStylesGrid
                key="text-styles-grid"
                textStyles={filteredData as TextStyle[]}
                onSelectTextStyle={setSelectedTextStyle}
                searchQuery={searchQuery}
              />
            )}

            {activeSection === 'frame-styles' && (
              <FrameStylesGrid
                key="frame-styles-grid"
                frameStyles={filteredData as FrameStyle[]}
                onSelectFrameStyle={setSelectedFrameStyle}
                searchQuery={searchQuery}
              />
            )}
          </>
        ) : (
          <>
            {selectedGradient && (
              <GradientLightbox
                key="gradient-lightbox"
                gradient={selectedGradient}
                onClose={() => setSelectedGradient(null)}
                onDuplicate={handleDuplicateGradient}
                onUpdate={handleUpdateGradient}
              />
            )}

            {selectedTextStyle && (
              <TextStyleLightbox
                key="text-style-lightbox"
                textStyle={selectedTextStyle}
                onClose={() => setSelectedTextStyle(null)}
                onDuplicate={handleDuplicateTextStyle}
                onUpdate={handleUpdateTextStyle}
              />
            )}

            {selectedFrameStyle && (
              <FrameStyleLightbox
                key="frame-style-lightbox"
                frameStyle={selectedFrameStyle}
                onClose={() => setSelectedFrameStyle(null)}
                onDuplicate={handleDuplicateFrameStyle}
                onUpdate={handleUpdateFrameStyle}
              />
            )}
          </>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
}