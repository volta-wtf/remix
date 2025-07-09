import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { FrameStylePanel } from "./FrameStylePanel";

export interface BoxShadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export interface FrameStyle {
  id: string;
  name: string;
  category: string;
  shadows: BoxShadow[];
  border: string;
  borderRadius: string;
  background: string;
  backdrop: string;
  tags: string[];
  css: string;
  className: string;
  description: string;
}

const initialFrameStyles: FrameStyle[] = [
  {
    id: "1",
    name: "Glassmorphism",
    category: "Modern",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 8,
        blur: 32,
        spread: 0,
        color: "rgba(31, 38, 135, 0.37)",
        inset: false,
      },
    ],
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.25)",
    backdrop: "blur(4px)",
    tags: ["glass", "modern", "transparent", "blur"],
    css: "background: rgba(255, 255, 255, 0.25); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.18); box-shadow: 0px 8px 32px rgba(31, 38, 135, 0.37); backdrop-filter: blur(4px);",
    className: "glassmorphism",
    description: "Modern glass-like effect with backdrop blur",
  },
  {
    id: "2",
    name: "Neon Border",
    category: "Futuristic",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 0,
        blur: 20,
        spread: 0,
        color: "#00ffff",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 0,
        blur: 40,
        spread: 0,
        color: "#00ffff",
        inset: false,
      },
    ],
    border: "2px solid #00ffff",
    borderRadius: "8px",
    background: "rgba(0, 0, 0, 0.8)",
    backdrop: "none",
    tags: ["neon", "glow", "futuristic", "electric"],
    css: "background: rgba(0, 0, 0, 0.8); border-radius: 8px; border: 2px solid #00ffff; box-shadow: 0px 0px 20px #00ffff, 0px 0px 40px #00ffff;",
    className: "neon-border",
    description: "Electric neon glow with bright borders",
  },
  {
    id: "3",
    name: "Neumorphism",
    category: "Soft UI",
    shadows: [
      {
        id: "1",
        x: 20,
        y: 20,
        blur: 60,
        spread: 0,
        color: "#d1d9e6",
        inset: false,
      },
      {
        id: "2",
        x: -20,
        y: -20,
        blur: 60,
        spread: 0,
        color: "#ffffff",
        inset: false,
      },
    ],
    border: "none",
    borderRadius: "20px",
    background: "#e0e5ec",
    backdrop: "none",
    tags: ["neumorphism", "soft", "minimal", "subtle"],
    css: "background: #e0e5ec; border-radius: 20px; box-shadow: 20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff;",
    className: "neumorphism",
    description: "Soft 3D effect with subtle shadows",
  },
  {
    id: "4",
    name: "Metal Frame",
    category: "Industrial",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 2,
        blur: 4,
        spread: 0,
        color: "rgba(0, 0, 0, 0.3)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 1,
        blur: 0,
        spread: 0,
        color: "rgba(255, 255, 255, 0.3)",
        inset: true,
      },
      {
        id: "3",
        x: 0,
        y: -1,
        blur: 0,
        spread: 0,
        color: "rgba(0, 0, 0, 0.3)",
        inset: true,
      },
    ],
    border: "2px solid #8e8e93",
    borderRadius: "4px",
    background:
      "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    backdrop: "none",
    tags: ["metal", "industrial", "chrome", "gradient"],
    css: "background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 4px; border: 2px solid #8e8e93; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px -1px 0px rgba(0, 0, 0, 0.3);",
    className: "metal-frame",
    description: "Industrial metal frame with chrome finish",
  },
  {
    id: "5",
    name: "Floating Card",
    category: "Elevation",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 1,
        blur: 3,
        spread: 0,
        color: "rgba(0, 0, 0, 0.12)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 1,
        blur: 2,
        spread: 0,
        color: "rgba(0, 0, 0, 0.24)",
        inset: false,
      },
    ],
    border: "none",
    borderRadius: "12px",
    background: "#ffffff",
    backdrop: "none",
    tags: ["card", "floating", "shadow", "material"],
    css: "background: #ffffff; border-radius: 12px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);",
    className: "floating-card",
    description: "Clean floating card with material shadows",
  },
  {
    id: "6",
    name: "Holographic",
    category: "Futuristic",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 0,
        blur: 30,
        spread: 0,
        color: "rgba(255, 0, 255, 0.5)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 0,
        blur: 60,
        spread: 0,
        color: "rgba(0, 255, 255, 0.3)",
        inset: false,
      },
    ],
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "10px",
    background:
      "linear-gradient(45deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))",
    backdrop: "blur(10px)",
    tags: [
      "holographic",
      "iridescent",
      "futuristic",
      "colorful",
    ],
    css: "background: linear-gradient(45deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1)); border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0px 0px 30px rgba(255, 0, 255, 0.5), 0px 0px 60px rgba(0, 255, 255, 0.3); backdrop-filter: blur(10px);",
    className: "holographic",
    description:
      "Iridescent holographic effect with color shifts",
  },
  {
    id: "7",
    name: "Paper Depth",
    category: "Material",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 2,
        blur: 2,
        spread: 0,
        color: "rgba(0, 0, 0, 0.14)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 3,
        blur: 1,
        spread: -2,
        color: "rgba(0, 0, 0, 0.12)",
        inset: false,
      },
      {
        id: "3",
        x: 0,
        y: 1,
        blur: 5,
        spread: 0,
        color: "rgba(0, 0, 0, 0.20)",
        inset: false,
      },
    ],
    border: "none",
    borderRadius: "2px",
    background: "#ffffff",
    backdrop: "none",
    tags: ["paper", "material", "depth", "clean"],
    css: "background: #ffffff; border-radius: 2px; box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.20);",
    className: "paper-depth",
    description: "Material Design paper elevation effect",
  },
  {
    id: "8",
    name: "Retro Frame",
    category: "Vintage",
    shadows: [
      {
        id: "1",
        x: 4,
        y: 4,
        blur: 0,
        spread: 0,
        color: "#8b4513",
        inset: false,
      },
      {
        id: "2",
        x: 8,
        y: 8,
        blur: 0,
        spread: 0,
        color: "#a0522d",
        inset: false,
      },
    ],
    border: "3px solid #daa520",
    borderRadius: "0px",
    background: "#f5deb3",
    backdrop: "none",
    tags: ["retro", "vintage", "frame", "gold"],
    css: "background: #f5deb3; border: 3px solid #daa520; box-shadow: 4px 4px 0px #8b4513, 8px 8px 0px #a0522d;",
    className: "retro-frame",
    description: "Vintage golden frame with retro shadows",
  },
  {
    id: "9",
    name: "Liquid Morphism",
    category: "Organic",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 20,
        blur: 40,
        spread: -10,
        color: "rgba(0, 0, 0, 0.2)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
        color: "rgba(255, 255, 255, 0.3)",
        inset: true,
      },
    ],
    border: "none",
    borderRadius: "40px 60px 30px 50px",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backdrop: "none",
    tags: ["liquid", "organic", "fluid", "gradient"],
    css: "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 40px 60px 30px 50px; box-shadow: 0px 20px 40px -10px rgba(0, 0, 0, 0.2), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.3);",
    className: "liquid-morphism",
    description: "Organic liquid shape with fluid borders",
  },
  {
    id: "10",
    name: "Cyberpunk Grid",
    category: "Futuristic",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 0,
        blur: 20,
        spread: 0,
        color: "#ff0080",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 0,
        blur: 40,
        spread: 0,
        color: "#8000ff",
        inset: false,
      },
      {
        id: "3",
        x: 2,
        y: 2,
        blur: 10,
        spread: 0,
        color: "rgba(0, 0, 0, 0.8)",
        inset: false,
      },
    ],
    border: "1px solid #00ffff",
    borderRadius: "0px",
    background:
      "linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 30%, rgba(0, 255, 255, 0.1) 70%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgba(255, 0, 128, 0.1) 30%, rgba(255, 0, 128, 0.1) 70%, transparent 70%)",
    backdrop: "none",
    tags: ["cyberpunk", "grid", "neon", "tech"],
    css: "background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 30%, rgba(0, 255, 255, 0.1) 70%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgba(255, 0, 128, 0.1) 30%, rgba(255, 0, 128, 0.1) 70%, transparent 70%); border: 1px solid #00ffff; box-shadow: 0px 0px 20px #ff0080, 0px 0px 40px #8000ff, 2px 2px 10px rgba(0, 0, 0, 0.8);",
    className: "cyberpunk-grid",
    description:
      "Cyberpunk aesthetic with grid pattern and neon glow",
  },
  {
    id: "11",
    name: "Crystal Clear",
    category: "Transparent",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 8,
        blur: 16,
        spread: 0,
        color: "rgba(0, 0, 0, 0.1)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
        color: "rgba(255, 255, 255, 0.8)",
        inset: true,
      },
      {
        id: "3",
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
        color: "rgba(0, 0, 0, 0.1)",
        inset: false,
      },
    ],
    border: "none",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.1)",
    backdrop: "blur(20px)",
    tags: ["crystal", "transparent", "clear", "glass"],
    css: "background: rgba(255, 255, 255, 0.1); border-radius: 12px; box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.8), 0px 0px 0px 1px rgba(0, 0, 0, 0.1); backdrop-filter: blur(20px);",
    className: "crystal-clear",
    description:
      "Ultra-transparent crystal effect with strong blur",
  },
  {
    id: "12",
    name: "Wood Grain",
    category: "Natural",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 4,
        blur: 8,
        spread: 0,
        color: "rgba(0, 0, 0, 0.3)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 0,
        blur: 0,
        spread: 2,
        color: "rgba(139, 69, 19, 0.3)",
        inset: true,
      },
      {
        id: "3",
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
        color: "rgba(160, 82, 45, 0.5)",
        inset: false,
      },
    ],
    border: "2px solid #8b4513",
    borderRadius: "8px",
    background:
      "linear-gradient(90deg, #deb887 0%, #d2b48c 25%, #deb887 50%, #d2b48c 75%, #deb887 100%)",
    backdrop: "none",
    tags: ["wood", "natural", "organic", "textured"],
    css: "background: linear-gradient(90deg, #deb887 0%, #d2b48c 25%, #deb887 50%, #d2b48c 75%, #deb887 100%); border-radius: 8px; border: 2px solid #8b4513; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3), inset 0px 0px 0px 2px rgba(139, 69, 19, 0.3), 0px 0px 0px 1px rgba(160, 82, 45, 0.5);",
    className: "wood-grain",
    description:
      "Natural wood grain texture with rustic border",
  },
  {
    id: "13",
    name: "Plasma Field",
    category: "Energy",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 0,
        blur: 30,
        spread: 0,
        color: "#ff006e",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 0,
        blur: 60,
        spread: 0,
        color: "#8338ec",
        inset: false,
      },
      {
        id: "3",
        x: 0,
        y: 0,
        blur: 90,
        spread: 0,
        color: "#3a86ff",
        inset: false,
      },
    ],
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "50px",
    background:
      "radial-gradient(circle, rgba(255, 0, 110, 0.3) 0%, rgba(131, 56, 236, 0.2) 50%, rgba(58, 134, 255, 0.1) 100%)",
    backdrop: "blur(15px)",
    tags: ["plasma", "energy", "radial", "electric"],
    css: "background: radial-gradient(circle, rgba(255, 0, 110, 0.3) 0%, rgba(131, 56, 236, 0.2) 50%, rgba(58, 134, 255, 0.1) 100%); border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0px 0px 30px #ff006e, 0px 0px 60px #8338ec, 0px 0px 90px #3a86ff; backdrop-filter: blur(15px);",
    className: "plasma-field",
    description:
      "Electric plasma field with radial energy glow",
  },
  {
    id: "14",
    name: "Torn Paper",
    category: "Craft",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 6,
        blur: 12,
        spread: 0,
        color: "rgba(0, 0, 0, 0.2)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 2,
        blur: 4,
        spread: 0,
        color: "rgba(0, 0, 0, 0.1)",
        inset: false,
      },
    ],
    border: "none",
    borderRadius: "0px",
    background: "#ffffff",
    backdrop: "none",
    tags: ["paper", "torn", "craft", "irregular"],
    css: "background: #ffffff; clip-path: polygon(0% 0%, 95% 0%, 100% 8%, 98% 15%, 100% 25%, 95% 35%, 100% 50%, 98% 65%, 100% 75%, 95% 85%, 100% 100%, 0% 100%); box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.1);",
    className: "torn-paper",
    description:
      "Irregular torn paper edge with realistic shadows",
  },
  {
    id: "15",
    name: "Bubble Wrap",
    category: "Textured",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 2,
        blur: 4,
        spread: 0,
        color: "rgba(0, 0, 0, 0.1)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
        color: "rgba(255, 255, 255, 0.8)",
        inset: true,
      },
      {
        id: "3",
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
        color: "rgba(0, 0, 0, 0.1)",
        inset: false,
      },
    ],
    border: "none",
    borderRadius: "15px",
    background:
      "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.8) 2px, transparent 2px), radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.8) 2px, transparent 2px), radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.8) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.8) 2px, transparent 2px), #f0f0f0",
    backdrop: "none",
    tags: ["bubble", "textured", "pattern", "tactile"],
    css: "background: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.8) 2px, transparent 2px), radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.8) 2px, transparent 2px), radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.8) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.8) 2px, transparent 2px), #f0f0f0; border-radius: 15px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.8), 0px 0px 0px 1px rgba(0, 0, 0, 0.1);",
    className: "bubble-wrap",
    description:
      "Tactile bubble wrap texture with subtle depth",
  },
  {
    id: "16",
    name: "Origami Fold",
    category: "Geometric",
    shadows: [
      {
        id: "1",
        x: 0,
        y: 8,
        blur: 16,
        spread: 0,
        color: "rgba(0, 0, 0, 0.2)",
        inset: false,
      },
      {
        id: "2",
        x: 0,
        y: 4,
        blur: 8,
        spread: 0,
        color: "rgba(0, 0, 0, 0.1)",
        inset: false,
      },
      {
        id: "3",
        x: 0,
        y: 0,
        blur: 0,
        spread: 1,
        color: "rgba(255, 255, 255, 0.3)",
        inset: true,
      },
    ],
    border: "none",
    borderRadius: "0px",
    background:
      "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)",
    backdrop: "none",
    tags: ["origami", "fold", "geometric", "paper"],
    css: "background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%); clip-path: polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%); box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.3);",
    className: "origami-fold",
    description: "Geometric origami fold with angular shadows",
  },
];

interface FrameStyleSectionProps {
  searchQuery: string;
}

export function FrameStyleSection({
  searchQuery,
}: FrameStyleSectionProps) {
  const [frameStyles, setFrameStyles] = useState<FrameStyle[]>(
    initialFrameStyles,
  );
  const [selectedStyle, setSelectedStyle] =
    useState<FrameStyle | null>(null);

  const filteredStyles = useMemo(() => {
    if (!searchQuery) return frameStyles;
    return frameStyles.filter(
      (style) =>
        style.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        style.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        style.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [frameStyles, searchQuery]);

  const handleStyleUpdate = (updatedStyle: FrameStyle) => {
    setFrameStyles((prev) =>
      prev.map((s) =>
        s.id === updatedStyle.id ? updatedStyle : s,
      ),
    );
  };

  const handleStyleDuplicate = (style: FrameStyle) => {
    const newStyle: FrameStyle = {
      ...style,
      id: Date.now().toString(),
      name: `${style.name} Copy`,
      className: `${style.className}-copy`,
    };
    setFrameStyles((prev) => [...prev, newStyle]);
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Frame Style Collection
        </h2>
        <p className="text-muted-foreground">
          Material-inspired frame effects with customizable
          shadows. Click any frame to edit.
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
              <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 relative">
                <div
                  className="w-20 h-16 flex items-center justify-center"
                  style={{
                    background: style.background,
                    borderRadius: style.borderRadius,
                    border: style.border,
                    boxShadow: style.shadows
                      .map(
                        (shadow) =>
                          `${shadow.inset ? "inset " : ""}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`,
                      )
                      .join(", "),
                    backdropFilter:
                      style.backdrop !== "none"
                        ? style.backdrop
                        : undefined,
                  }}
                >
                  <span className="text-xs font-medium opacity-50">
                    Frame
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-white font-medium">
                    Click to Edit
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">
                  {style.name}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {style.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {style.shadows.length} shadow
                    {style.shadows.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {style.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {style.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs"
                    >
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
        <FrameStylePanel
          frameStyle={selectedStyle}
          onClose={() => setSelectedStyle(null)}
          onUpdate={handleStyleUpdate}
          onDuplicate={handleStyleDuplicate}
        />
      )}
    </div>
  );
}