import React from 'react';
import { motion } from 'framer-motion';

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

interface FrameCardProps {
  frameStyle: FrameStylePreset;
  onClick: (frameStyle: FrameStylePreset) => void;
  index: number;
}

export function FrameCard({ frameStyle, onClick, index }: FrameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(frameStyle)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-md transition-all duration-300">
        {/* Frame Preview */}
        <div 
          className="aspect-video w-full flex items-center justify-center p-8"
          style={{ background: frameStyle.backgroundColor }}
        >
          <div 
            className="w-32 h-20 flex items-center justify-center"
            style={frameStyle.frameStyle}
          >
            <div className="w-6 h-4 bg-white/20 rounded-sm"></div>
          </div>
        </div>
        
        {/* Frame Name */}
        <div className="p-4">
          <h3 className="font-medium text-sm text-center group-hover:text-primary transition-colors">
            {frameStyle.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}