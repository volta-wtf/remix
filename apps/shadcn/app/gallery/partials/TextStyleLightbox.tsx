import { useState } from 'react';
import { motion } from '@/lib/motion';
import { X, Copy, Type, Tag, Plus, Edit2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CSSPropertyEditor } from './CSSPropertyEditor';
import { ShadowEditor } from './ShadowEditor';
import type { TextStyle } from './TextStylesGrid';

interface Shadow {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  color: string;
  enabled: boolean;
}

interface TextStyleLightboxProps {
  textStyle: TextStyle;
  onClose: () => void;
  onDuplicate?: (textStyle: TextStyle) => void;
  onUpdate?: (textStyle: TextStyle) => void;
}

function parseTextShadows(textShadow: string | undefined): Shadow[] {
  if (!textShadow || textShadow === 'none') return [];

  // Simple parsing for text-shadow values
  const shadows = textShadow.split(',').map((shadow, index) => {
    const parts = shadow.trim().split(/\s+/);
    const offsetX = parseInt(parts[0]) || 0;
    const offsetY = parseInt(parts[1]) || 0;
    const blurRadius = parseInt(parts[2]) || 0;
    const color = parts[3] || '#000000';

    return {
      id: `shadow-${index}`,
      offsetX,
      offsetY,
      blurRadius,
      color,
      enabled: true
    };
  });

  return shadows;
}

function generateTextShadow(shadows: Shadow[]): string {
  const enabledShadows = shadows.filter(shadow => shadow.enabled);
  if (enabledShadows.length === 0) return 'none';

  return enabledShadows.map(shadow =>
    `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`
  ).join(', ');
}

export function TextStyleLightbox({ textStyle, onClose, onDuplicate, onUpdate }: TextStyleLightboxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTextStyle, setEditedTextStyle] = useState(textStyle);
  const [shadows, setShadows] = useState<Shadow[]>(() =>
    parseTextShadows(textStyle.style.textShadow as string)
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDuplicate) {
      onDuplicate(textStyle);
      toast.success('Text style duplicated as custom item!');
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUpdate) {
      // Update text style with shadow changes
      const updatedStyle = {
        ...editedTextStyle,
        style: {
          ...editedTextStyle.style,
          textShadow: generateTextShadow(shadows)
        }
      };
      onUpdate(updatedStyle);
      toast.success('Text style updated successfully!');
    }
    setIsEditing(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditedTextStyle(textStyle);
    setShadows(parseTextShadows(textStyle.style.textShadow as string));
    setIsEditing(false);
  };

  const handleStyleChange = (newStyle: React.CSSProperties) => {
    setEditedTextStyle(prev => ({
      ...prev,
      style: newStyle
    }));
  };

  const handleShadowsChange = (newShadows: Shadow[]) => {
    setShadows(newShadows);
    // Update the style immediately for preview
    const newTextShadow = generateTextShadow(newShadows);
    setEditedTextStyle(prev => ({
      ...prev,
      style: {
        ...prev.style,
        textShadow: newTextShadow
      }
    }));
  };

  const generateCSSOutput = () => {
    const cssProperties = Object.entries(editedTextStyle.style)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    return `.text-style-${editedTextStyle.id.replace(/[^a-zA-Z0-9]/g, '-')} {
${cssProperties}
}`;
  };

  const handleCopyCSS = () => {
    copyToClipboard(generateCSSOutput(), 'CSS output');
  };

  const currentTextStyle = isEditing ? editedTextStyle : textStyle;
  const canEdit = true; // Now all text styles can be edited
  const showEditButton = canEdit && !isEditing;
  const showDuplicateButton = !isEditing && onDuplicate && !textStyle.isCustom;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1]
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header with text preview */}
        <div className="h-48 relative bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/10 backdrop-blur-sm rounded-full hover:bg-black/20 transition-colors z-10"
            type="button"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Status badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
              {currentTextStyle.category}
            </Badge>
            {currentTextStyle.isCustom && (
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
                Custom
              </Badge>
            )}
            {currentTextStyle.isModified && (
              <Badge variant="outline" className="bg-yellow-500/20 backdrop-blur-sm border-yellow-400/40">
                Modified
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {showDuplicateButton && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDuplicate}
                className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                type="button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
            )}

            {canEdit && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCancel}
                      className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      type="button"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleSave}
                      className="bg-green-500/20 backdrop-blur-sm border-green-400/40 hover:bg-green-500/30"
                      type="button"
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  showEditButton && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleEdit}
                      className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      type="button"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Large text preview */}
          <div
            className="text-center select-none pointer-events-none text-4xl"
            style={currentTextStyle.style}
          >
            {isEditing ? (
              <Input
                value={editedTextStyle.previewText}
                onChange={(e) => setEditedTextStyle(prev => ({ ...prev, previewText: e.target.value }))}
                className="text-center bg-transparent border-none p-0 focus-visible:ring-0"
                style={currentTextStyle.style}
              />
            ) : (
              currentTextStyle.previewText
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-6 h-6 text-muted-foreground" />
            {isEditing ? (
              <Input
                value={editedTextStyle.name}
                onChange={(e) => setEditedTextStyle(prev => ({ ...prev, name: e.target.value }))}
                className="text-2xl font-semibold bg-transparent border-none p-0 focus-visible:ring-0"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{currentTextStyle.name}</h2>
            )}
          </div>

          {isEditing ? (
            <Textarea
              value={editedTextStyle.description}
              onChange={(e) => setEditedTextStyle(prev => ({ ...prev, description: e.target.value }))}
              className="text-muted-foreground mb-6 min-h-[60px]"
            />
          ) : (
            <p className="text-muted-foreground mb-6">{currentTextStyle.description}</p>
          )}

          {!isEditing && (
            <>
              {/* Tags */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-medium">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentTextStyle.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CSS Class */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">CSS Class</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => copyToClipboard(currentTextStyle.cssClass, 'CSS class')}
                  className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                  type="button"
                >
                  <code className="text-sm break-all">{currentTextStyle.cssClass}</code>
                  <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              {/* CSS Properties */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">CSS Properties</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => copyToClipboard(JSON.stringify(currentTextStyle.style, null, 2), 'CSS properties')}
                  className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                  type="button"
                >
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {JSON.stringify(currentTextStyle.style, null, 2)}
                  </pre>
                  <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              <Separator className="my-6" />

              {/* CSS Output */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">CSS Output</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyCSS}
                  className="w-full p-4 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                  type="button"
                >
                  <pre className="text-sm font-mono whitespace-pre-wrap">{generateCSSOutput()}</pre>
                  <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              {/* Usage Examples */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Examples</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div style={currentTextStyle.style} className="text-center">
                        HELLO WORLD
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div style={currentTextStyle.style} className="text-center">
                        Design Gallery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Editing Interface */}
          {isEditing && (
            <Tabs defaultValue="shadows" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shadows">Text Shadows</TabsTrigger>
                <TabsTrigger value="properties">CSS Properties</TabsTrigger>
              </TabsList>

              <TabsContent value="shadows" className="space-y-6">
                <ShadowEditor
                  name={editedTextStyle.name}
                  onNameChange={(name) => setEditedTextStyle(prev => ({ ...prev, name }))}
                  cssClass={editedTextStyle.cssClass}
                  onCssClassChange={(cssClass) => setEditedTextStyle(prev => ({ ...prev, cssClass }))}
                  tags={editedTextStyle.tags}
                  onTagsChange={(tags) => setEditedTextStyle(prev => ({ ...prev, tags }))}
                  shadows={shadows}
                  onShadowsChange={handleShadowsChange}
                  shadowType="text"
                  previewElement={
                    <div className="text-4xl font-bold">
                      {editedTextStyle.previewText}
                    </div>
                  }
                />
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <CSSPropertyEditor
                  properties={editedTextStyle.style}
                  onPropertiesChange={handleStyleChange}
                  onCopyCSS={handleCopyCSS}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}