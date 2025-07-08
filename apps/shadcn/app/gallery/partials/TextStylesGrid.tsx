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
  isPreviewOpen: boolean;
}

export function TextStylesGrid({ textStyles, onSelectTextStyle, searchQuery, isPreviewOpen }: TextStylesGridProps) {
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
    >
      <div className={`grid ${isPreviewOpen ? "grid-cols-2" : "grid-cols-5"} gap-2`}>
        <AnimatePresence>
          {textStyles.map((textStyle, index) => (
            <motion.button
              key={textStyle.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
                layout: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTextStyle(textStyle)}
              className="group relative aspect-4/3 rounded-md cursor-pointer bg-primary/3 border border-transparent hover:border-primary/20 transition-border duration-300 overflow-hidden "
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

            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}