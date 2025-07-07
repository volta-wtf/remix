import React from 'react';
import { motion } from 'framer-motion';

interface TextStylePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  shadowCount: number;
  tags: string[];
  style: React.CSSProperties;
}

interface TextCardProps {
  textStyle: TextStylePreset;
  onClick: (textStyle: TextStylePreset) => void;
  index: number;
}

export function TextCard({ textStyle, onClick, index }: TextCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(textStyle)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-300">
        {/* Text Preview */}
        <div className="aspect-video w-full bg-slate-800 flex items-center justify-center p-8">
          <span 
            className="text-xl font-bold truncate max-w-full"
            style={textStyle.style}
          >
            {textStyle.name}
          </span>
        </div>
        
        {/* Text Name */}
        <div className="p-4">
          <h3 className="font-medium text-sm text-center group-hover:text-primary transition-colors">
            {textStyle.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}