import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { GradientPanel } from './GradientPanel';

export interface Gradient {
  id: string;
  name: string;
  category: string;
  colors: string[];
  direction: string;
  inspiration: string;
  usageTips: string;
  tags: string[];
  css: string;
}

const initialGradients: Gradient[] = [
  {
    id: '1',
    name: 'Ocean Breeze',
    category: 'Nature',
    colors: ['#667eea', '#764ba2'],
    direction: 'to right',
    inspiration: 'Deep ocean waters meeting twilight sky',
    usageTips: 'Perfect for headers, hero sections, and call-to-action buttons',
    tags: ['blue', 'purple', 'ocean', 'calm'],
    css: 'linear-gradient(to right, #667eea, #764ba2)'
  },
  {
    id: '2',
    name: 'Sunset Glow',
    category: 'Nature',
    colors: ['#ffecd2', '#fcb69f'],
    direction: 'to bottom',
    inspiration: 'Golden hour sunset over the horizon',
    usageTips: 'Great for warm, inviting sections and testimonials',
    tags: ['orange', 'yellow', 'warm', 'sunset'],
    css: 'linear-gradient(to bottom, #ffecd2, #fcb69f)'
  },
  {
    id: '3',
    name: 'Neon Dreams',
    category: 'Futuristic',
    colors: ['#ff00cc', '#333399'],
    direction: 'to right',
    inspiration: 'Cyberpunk city lights and electric energy',
    usageTips: 'Bold choice for modern tech interfaces and gaming',
    tags: ['neon', 'pink', 'blue', 'electric'],
    css: 'linear-gradient(to right, #ff00cc, #333399)'
  },
  {
    id: '4',
    name: 'Forest Mist',
    category: 'Nature',
    colors: ['#134e5e', '#71b280'],
    direction: 'to bottom right',
    inspiration: 'Morning mist rolling through pine forests',
    usageTips: 'Excellent for eco-friendly brands and nature content',
    tags: ['green', 'forest', 'natural', 'mist'],
    css: 'linear-gradient(to bottom right, #134e5e, #71b280)'
  },
  {
    id: '5',
    name: 'Royal Amethyst',
    category: 'Luxury',
    colors: ['#8b5cf6', '#a855f7', '#9333ea'],
    direction: 'to right',
    inspiration: 'Rich amethyst gemstones with regal elegance',
    usageTips: 'Perfect for luxury brands and premium products',
    tags: ['purple', 'royal', 'luxury', 'amethyst'],
    css: 'linear-gradient(to right, #8b5cf6, #a855f7, #9333ea)'
  },
  {
    id: '6',
    name: 'Cherry Blossom',
    category: 'Nature',
    colors: ['#ffeef8', '#ff6b9d'],
    direction: 'to bottom',
    inspiration: 'Delicate pink cherry blossoms in spring',
    usageTips: 'Soft and feminine, great for beauty and wellness',
    tags: ['pink', 'soft', 'spring', 'delicate'],
    css: 'linear-gradient(to bottom, #ffeef8, #ff6b9d)'
  },
  {
    id: '7',
    name: 'Arctic Ice',
    category: 'Cool',
    colors: ['#e0f2f1', '#b2dfdb'],
    direction: 'to right',
    inspiration: 'Crystal clear arctic ice formations',
    usageTips: 'Clean and minimal, perfect for medical or tech',
    tags: ['blue', 'ice', 'clean', 'minimal'],
    css: 'linear-gradient(to right, #e0f2f1, #b2dfdb)'
  },
  {
    id: '8',
    name: 'Volcanic Fire',
    category: 'Intense',
    colors: ['#ff4081', '#ff6ec7'],
    direction: 'to bottom right',
    inspiration: 'Molten lava and volcanic intensity',
    usageTips: 'High energy, perfect for sports and action content',
    tags: ['red', 'fire', 'intense', 'energy'],
    css: 'linear-gradient(to bottom right, #ff4081, #ff6ec7)'
  },
  {
    id: '9',
    name: 'Aurora Borealis',
    category: 'Cosmic',
    colors: ['#00c6ff', '#0072ff', '#9d50bb', '#6e48aa'],
    direction: '45deg',
    inspiration: 'Northern lights dancing across the polar sky',
    usageTips: 'Mystical and ethereal, perfect for creative portfolios',
    tags: ['aurora', 'cosmic', 'mystical', 'colorful'],
    css: 'linear-gradient(45deg, #00c6ff, #0072ff, #9d50bb, #6e48aa)'
  },
  {
    id: '10',
    name: 'Space Nebula',
    category: 'Cosmic',
    colors: ['#200122', '#6f0000', '#cc5500'],
    direction: 'to bottom right',
    inspiration: 'Deep space nebula with cosmic dust and stars',
    usageTips: 'Perfect for sci-fi themes and space-related content',
    tags: ['space', 'nebula', 'dark', 'cosmic'],
    css: 'linear-gradient(to bottom right, #200122, #6f0000, #cc5500)'
  },
  {
    id: '11',
    name: 'Tropical Paradise',
    category: 'Nature',
    colors: ['#11998e', '#38ef7d'],
    direction: 'to right',
    inspiration: 'Tropical rainforest canopy and crystal waters',
    usageTips: 'Fresh and vibrant, great for travel and lifestyle',
    tags: ['tropical', 'green', 'fresh', 'paradise'],
    css: 'linear-gradient(to right, #11998e, #38ef7d)'
  },
  {
    id: '12',
    name: 'Desert Mirage',
    category: 'Nature',
    colors: ['#f093fb', '#f5576c', '#4facfe', '#00f2fe'],
    direction: 'to bottom',
    inspiration: 'Shimmering desert heat and distant mirages',
    usageTips: 'Warm and dreamy, perfect for travel and adventure',
    tags: ['desert', 'warm', 'mirage', 'dreamy'],
    css: 'linear-gradient(to bottom, #f093fb, #f5576c, #4facfe, #00f2fe)'
  },
  {
    id: '13',
    name: 'Vintage Sepia',
    category: 'Retro',
    colors: ['#ddd6f3', '#faaca8'],
    direction: 'to bottom right',
    inspiration: 'Old photographs and vintage film aesthetics',
    usageTips: 'Nostalgic feel, great for vintage brands and memories',
    tags: ['vintage', 'sepia', 'retro', 'nostalgic'],
    css: 'linear-gradient(to bottom right, #ddd6f3, #faaca8)'
  },
  {
    id: '14',
    name: 'Electric Storm',
    category: 'Intense',
    colors: ['#0f0c29', '#302b63', '#24243e'],
    direction: 'to right',
    inspiration: 'Lightning illuminating dark storm clouds',
    usageTips: 'Dramatic and powerful, perfect for bold statements',
    tags: ['storm', 'electric', 'dark', 'dramatic'],
    css: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)'
  },
  {
    id: '15',
    name: 'Candy Shop',
    category: 'Playful',
    colors: ['#a8edea', '#fed6e3'],
    direction: 'to bottom',
    inspiration: 'Sweet cotton candy and colorful confections',
    usageTips: 'Fun and playful, perfect for kids content and sweet brands',
    tags: ['candy', 'sweet', 'playful', 'pastel'],
    css: 'linear-gradient(to bottom, #a8edea, #fed6e3)'
  },
  {
    id: '16',
    name: 'Golden Hour',
    category: 'Warm',
    colors: ['#ff9a9e', '#fecfef', '#fecfef'],
    direction: 'to top',
    inspiration: 'Soft golden light of early morning or late evening',
    usageTips: 'Romantic and warm, great for lifestyle and beauty',
    tags: ['golden', 'warm', 'romantic', 'soft'],
    css: 'linear-gradient(to top, #ff9a9e, #fecfef, #fecfef)'
  }
];

interface GradientSectionProps {
  searchQuery: string;
}

export function GradientSection({ searchQuery }: GradientSectionProps) {
  const [gradients, setGradients] = useState<Gradient[]>(initialGradients);
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);

  const filteredGradients = useMemo(() => {
    if (!searchQuery) return gradients;
    return gradients.filter(gradient =>
      gradient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gradient.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gradient.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [gradients, searchQuery]);

  const handleGradientUpdate = (updatedGradient: Gradient) => {
    setGradients(prev => prev.map(g => g.id === updatedGradient.id ? updatedGradient : g));
  };

  const handleGradientDuplicate = (gradient: Gradient) => {
    const newGradient: Gradient = {
      ...gradient,
      id: Date.now().toString(),
      name: `${gradient.name} Copy`
    };
    setGradients(prev => [...prev, newGradient]);
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Gradient Collection</h2>
        <p className="text-muted-foreground">
          Beautiful gradients for modern web design. Click any gradient to customize it.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGradients.map((gradient, index) => (
          <motion.div
            key={gradient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer group hover:shadow-lg transition-all duration-200 overflow-hidden"
              onClick={() => setSelectedGradient(gradient)}
            >
              <div
                className="h-32 w-full relative"
                style={{ background: gradient.css }}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-white font-medium">Click to Edit</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{gradient.name}</h3>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {gradient.category}
                  </Badge>
                  <div className="flex space-x-1">
                    {gradient.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={`${gradient.id}-${tag}-${tagIndex}`} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedGradient && (
        <GradientPanel
          gradient={selectedGradient}
          onClose={() => setSelectedGradient(null)}
          onUpdate={handleGradientUpdate}
          onDuplicate={handleGradientDuplicate}
        />
      )}
    </div>
  );
}