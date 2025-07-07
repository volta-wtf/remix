export interface Gradient {
  id: string;
  name: string;
  description: string;
  colors: string[];
  direction: string;
  cssValue: string;
  category: string;
  author: string;
}

export const gradientData: Gradient[] = [
  {
    id: "1",
    name: "Ocean Breeze",
    description: "A calming blend of ocean blues and turquoise",
    colors: ["#667eea", "#764ba2"],
    direction: "135deg",
    cssValue: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    category: "Nature",
    author: "Design Pro"
  },
  {
    id: "2",
    name: "Sunset Glow",
    description: "Warm sunset colors transitioning from orange to pink",
    colors: ["#ff9a9e", "#fecfef", "#fecfef"],
    direction: "120deg",
    cssValue: "linear-gradient(120deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    category: "Warm",
    author: "Color Master"
  },
  {
    id: "3",
    name: "Forest Green",
    description: "Fresh forest greens with a hint of emerald",
    colors: ["#11998e", "#38ef7d"],
    direction: "45deg",
    cssValue: "linear-gradient(45deg, #11998e 0%, #38ef7d 100%)",
    category: "Nature",
    author: "Nature Lover"
  },
  {
    id: "4",
    name: "Purple Haze",
    description: "Mystical purple gradient with deep violet tones",
    colors: ["#8360c3", "#2ebf91"],
    direction: "180deg",
    cssValue: "linear-gradient(180deg, #8360c3 0%, #2ebf91 100%)",
    category: "Cool",
    author: "Mystic Designer"
  },
  {
    id: "5",
    name: "Golden Hour",
    description: "Warm golden tones reminiscent of golden hour light",
    colors: ["#f093fb", "#f5576c"],
    direction: "90deg",
    cssValue: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
    category: "Warm",
    author: "Light Artist"
  },
  {
    id: "6",
    name: "Arctic Frost",
    description: "Cool blues and whites like arctic ice",
    colors: ["#74b9ff", "#0984e3"],
    direction: "225deg",
    cssValue: "linear-gradient(225deg, #74b9ff 0%, #0984e3 100%)",
    category: "Cool",
    author: "Ice Designer"
  },
  {
    id: "7",
    name: "Peachy Keen",
    description: "Soft peach tones with coral accents",
    colors: ["#ffb3ba", "#ffdfba"],
    direction: "60deg",
    cssValue: "linear-gradient(60deg, #ffb3ba 0%, #ffdfba 100%)",
    category: "Warm",
    author: "Peach Lover"
  },
  {
    id: "8",
    name: "Midnight Blue",
    description: "Deep midnight blues with starlight shimmer",
    colors: ["#2c3e50", "#3498db"],
    direction: "315deg",
    cssValue: "linear-gradient(315deg, #2c3e50 0%, #3498db 100%)",
    category: "Dark",
    author: "Night Owl"
  },
  {
    id: "9",
    name: "Spring Bloom",
    description: "Fresh spring colors with floral inspiration",
    colors: ["#a8edea", "#fed6e3"],
    direction: "135deg",
    cssValue: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    category: "Nature",
    author: "Spring Artist"
  },
  {
    id: "10",
    name: "Cosmic Purple",
    description: "Deep space purples with cosmic energy",
    colors: ["#667eea", "#764ba2"],
    direction: "270deg",
    cssValue: "linear-gradient(270deg, #667eea 0%, #764ba2 100%)",
    category: "Dark",
    author: "Space Explorer"
  },
  {
    id: "11",
    name: "Flamingo Pink",
    description: "Vibrant pink gradient inspired by flamingo feathers",
    colors: ["#ff758c", "#ff7eb3"],
    direction: "45deg",
    cssValue: "linear-gradient(45deg, #ff758c 0%, #ff7eb3 100%)",
    category: "Warm",
    author: "Pink Enthusiast"
  },
  {
    id: "12",
    name: "Electric Blue",
    description: "High-energy electric blue with lightning effects",
    colors: ["#00c6ff", "#0072ff"],
    direction: "180deg",
    cssValue: "linear-gradient(180deg, #00c6ff 0%, #0072ff 100%)",
    category: "Cool",
    author: "Electric Designer"
  }
];