import { Gradient } from '../types';

export const gradientCategories = [
  'All',
  'Nature',
  'Tech',
  'Creative',
  'Luxury',
  'Travel',
  'Wellness',
  'Custom',
  'Modified'
];

export const gradients: Gradient[] = [
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