import { motion, AnimatePresence } from '@/lib/motion';
import { Search, Type } from 'lucide-react';

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
}

interface TextStylesGridProps {
  textStyles: TextStyle[];
  onSelectTextStyle: (textStyle: TextStyle) => void;
  searchQuery: string;
}

export function TextStylesGrid({ textStyles, onSelectTextStyle, searchQuery }: TextStylesGridProps) {
  if (textStyles.length === 0) {
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
        <h3 className="text-xl mb-2">No text styles found</h3>
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
          {textStyles.map((textStyle, index) => (
            <motion.button
              key={textStyle.id}
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
              onClick={() => onSelectTextStyle(textStyle)}
              className="group relative aspect-square rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-border/20"
              style={{ width: '200px', height: '200px' }}
            >
              {/* Text preview */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                  className="text-center select-none pointer-events-none"
                  style={textStyle.style}
                >
                  {textStyle.previewText}
                </div>
              </div>

              {/* Overlay with name */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end p-4">
                <div className="text-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm">
                  {textStyle.name}
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs bg-black/10 backdrop-blur-sm text-foreground px-2 py-1 rounded-full border border-border/20">
                  {textStyle.category}
                </span>
              </div>

              {/* Type icon */}
              <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <Type className="w-5 h-5 text-foreground" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}