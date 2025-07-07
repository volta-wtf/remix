import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download, Heart, Edit3, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface TextStylePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  shadowCount: number;
  tags: string[];
  style: React.CSSProperties;
}

interface TextDrawerProps {
  textStyle: TextStylePreset | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (textStyle: TextStylePreset) => void;
}

export function TextDrawer({ textStyle, isOpen, onClose, onEdit }: TextDrawerProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!textStyle) return null;

  const handleCopyCSS = () => {
    const cssString = Object.entries(textStyle.style)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
      .join('\n  ');
    
    const fullCSS = `.${textStyle.id.replace(/\s+/g, '-').toLowerCase()} {\n  ${cssString}\n}`;
    
    navigator.clipboard.writeText(fullCSS);
    toast.success('Text style CSS copied to clipboard!');
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Create a canvas element to render the text
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 800;
      canvas.height = 200;

      if (ctx) {
        // Dark background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Apply text styling (simplified for canvas)
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Simple color application
        if (textStyle.style.color && typeof textStyle.style.color === 'string') {
          ctx.fillStyle = textStyle.style.color;
        } else {
          ctx.fillStyle = '#ffffff';
        }
        
        ctx.fillText(textStyle.name, canvas.width / 2, canvas.height / 2);

        // Create download link
        const link = document.createElement('a');
        link.download = `${textStyle.name.replace(/\s+/g, '-').toLowerCase()}-text-style.png`;
        link.href = canvas.toDataURL();
        link.click();
      }

      toast.success('Text style downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download text style');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{textStyle.name}</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Text Preview */}
              <div className="space-y-4">
                <div className="w-full h-32 bg-slate-800 rounded-lg flex items-center justify-center">
                  <span 
                    className="text-2xl font-bold"
                    style={textStyle.style}
                  >
                    {textStyle.name}
                  </span>
                </div>

                {/* Category and Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{textStyle.category}</Badge>
                  {textStyle.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{textStyle.description}</p>
              </div>

              {/* Properties */}
              <div>
                <h3 className="font-semibold mb-2">Properties</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shadow Count:</span>
                    <span>{textStyle.shadowCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{textStyle.category}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button onClick={handleCopyCSS} className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy CSS
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </Button>
                  
                  {onEdit && (
                    <Button variant="outline" onClick={() => onEdit(textStyle)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorite
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}