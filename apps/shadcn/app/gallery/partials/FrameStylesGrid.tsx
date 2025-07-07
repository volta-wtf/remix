import { motion, AnimatePresence } from 'framer-motion';
import { Search, Frame } from 'lucide-react';

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
}

interface FrameStylesGridProps {
  frameStyles: FrameStyle[];
  onSelectFrameStyle: (frameStyle: FrameStyle) => void;
  searchQuery: string;
}

export function FrameStylesGrid({ frameStyles, onSelectFrameStyle, searchQuery }: FrameStylesGridProps) {
  if (frameStyles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
        </motion.div>
        <h3 className="text-xl mb-2">No frame styles found</h3>
        <p className="text-muted-foreground max-w-md">
          {searchQuery ? (
            <>Try adjusting your search for <span className="font-medium">"{searchQuery}"</span> or browse different categories.</>
          ) : (
            "Try adjusting your filters or browse different categories."
          )}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-8 pt-0"
    >
      <div className="grid grid-cols-2 gap-6 max-w-4xl">
        <AnimatePresence>
          {frameStyles.map((frameStyle, index) => (
            <motion.button
              key={frameStyle.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: "easeOut",
                layout: { duration: 0.3 }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectFrameStyle(frameStyle)}
              className="group relative aspect-square rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              style={{ width: '200px', height: '200px' }}
            >
              {/* Frame preview */}
              <div 
                className="absolute inset-4 rounded-lg"
                style={frameStyle.style}
              >
                {/* Inner content area */}
                <div className="absolute inset-4 bg-white/20 rounded flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/40 rounded-full" />
                </div>
              </div>

              {/* Overlay with name */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end p-4">
                <div className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-sm">
                  {frameStyle.name}
                </div>
              </div>
              
              {/* Category badge */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/20">
                  {frameStyle.category}
                </span>
              </div>

              {/* Frame icon */}
              <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <Frame className="w-5 h-5 text-white" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}