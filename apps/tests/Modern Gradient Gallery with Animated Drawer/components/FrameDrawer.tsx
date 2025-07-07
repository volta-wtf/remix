import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download, Heart, Edit3, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

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

interface FrameDrawerProps {
  frameStyle: FrameStylePreset | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (frameStyle: FrameStylePreset) => void;
}

export function FrameDrawer({ frameStyle, isOpen, onClose, onEdit }: FrameDrawerProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!frameStyle) return null;

  const handleCopyCSS = () => {
    const cssString = Object.entries(frameStyle.frameStyle)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
      .join('\n  ');
    
    const fullCSS = `.${frameStyle.id.replace(/\s+/g, '-').toLowerCase()} {\n  ${cssString}\n}`;
    
    navigator.clipboard.writeText(fullCSS);
    toast.success('CSS copied to clipboard!');
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Create a canvas element to render the frame
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 800;
      canvas.height = 600;

      if (ctx) {
        // Apply background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Create download link
        const link = document.createElement('a');
        link.download = `${frameStyle.name.replace(/\s+/g, '-').toLowerCase()}-frame.png`;
        link.href = canvas.toDataURL();
        link.click();
      }

      toast.success('Frame downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download frame');
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
                <h2 className="text-2xl font-bold">{frameStyle.name}</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Frame Preview */}
              <div className="space-y-4">
                <div 
                  className="w-full h-48 rounded-lg flex items-center justify-center"
                  style={{ background: frameStyle.backgroundColor }}
                >
                  <div 
                    className="w-32 h-20 flex items-center justify-center text-sm font-medium"
                    style={frameStyle.frameStyle}
                  >
                    <span className="text-gray-700">Preview</span>
                  </div>
                </div>

                {/* Category and Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{frameStyle.category}</Badge>
                  {frameStyle.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{frameStyle.description}</p>
              </div>

              {/* Properties */}
              <div>
                <h3 className="font-semibold mb-2">Properties</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shadow Count:</span>
                    <span>{frameStyle.shadowCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{frameStyle.category}</span>
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
                    <Button variant="outline" onClick={() => onEdit(frameStyle)}>
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