import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Copy, X, Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { TextStyle, TextShadow } from './TextStyleSection';

interface TextStylePanelProps {
  textStyle: TextStyle;
  onClose: () => void;
  onUpdate: (style: TextStyle) => void;
  onDuplicate: (style: TextStyle) => void;
}

export function TextStylePanel({ textStyle, onClose, onUpdate, onDuplicate }: TextStylePanelProps) {
  const [editedStyle, setEditedStyle] = useState<TextStyle>(textStyle);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const textShadowCSS = editedStyle.shadows.map(shadow =>
      `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`
    ).join(', ');

    const css = `color: ${editedStyle.color}; font-size: ${editedStyle.fontSize}; font-weight: ${editedStyle.fontWeight}; text-shadow: ${textShadowCSS};`;
    setEditedStyle(prev => ({ ...prev, css }));
  }, [editedStyle.shadows, editedStyle.color, editedStyle.fontSize, editedStyle.fontWeight]);

  const addShadow = () => {
    const newShadow: TextShadow = {
      id: Date.now().toString(),
      x: 0,
      y: 0,
      blur: 0,
      color: '#000000'
    };
    setEditedStyle(prev => ({
      ...prev,
      shadows: [...prev.shadows, newShadow]
    }));
  };

  const removeShadow = (shadowId: string) => {
    setEditedStyle(prev => ({
      ...prev,
      shadows: prev.shadows.filter(shadow => shadow.id !== shadowId)
    }));
  };

  const updateShadow = (shadowId: string, updates: Partial<TextShadow>) => {
    setEditedStyle(prev => ({
      ...prev,
      shadows: prev.shadows.map(shadow =>
        shadow.id === shadowId ? { ...shadow, ...updates } : shadow
      )
    }));
  };

  const addTag = () => {
    if (newTag && !editedStyle.tags.includes(newTag)) {
      setEditedStyle(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEditedStyle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedStyle.css);
    toast.success('CSS copied to clipboard!');
  };

  const handleSave = () => {
    onUpdate(editedStyle);
    onClose();
    toast.success('Text style updated successfully!');
  };

  const handleDuplicate = () => {
    onDuplicate(editedStyle);
    onClose();
    toast.success('Text style duplicated successfully!');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Edit Text Style
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Customize text shadows, colors, and typography. Adjust multiple shadow layers for complex effects.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Preview */}
          <div className="space-y-4">
            <div>
              <Label>Live Preview</Label>
              <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <motion.div
                  key={editedStyle.css}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center select-none"
                  style={{
                    color: editedStyle.color,
                    fontSize: editedStyle.fontSize,
                    fontWeight: editedStyle.fontWeight,
                    textShadow: editedStyle.shadows.map(shadow =>
                      `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`
                    ).join(', ')
                  }}
                >
                  {editedStyle.name}
                </motion.div>
              </div>
            </div>

            <div>
              <Label>CSS Output</Label>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-32">
                  <code>{editedStyle.css}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editedStyle.name}
                  onChange={(e) => setEditedStyle(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={editedStyle.category}
                  onChange={(e) => setEditedStyle(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="color">Text Color</Label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={editedStyle.color}
                    onChange={(e) => setEditedStyle(prev => ({ ...prev, color: e.target.value }))}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <Input
                    value={editedStyle.color}
                    onChange={(e) => setEditedStyle(prev => ({ ...prev, color: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="fontSize">Font Size</Label>
                <Input
                  id="fontSize"
                  value={editedStyle.fontSize}
                  onChange={(e) => setEditedStyle(prev => ({ ...prev, fontSize: e.target.value }))}
                  placeholder="e.g., 48px"
                />
              </div>
              <div>
                <Label htmlFor="fontWeight">Font Weight</Label>
                <Input
                  id="fontWeight"
                  value={editedStyle.fontWeight}
                  onChange={(e) => setEditedStyle(prev => ({ ...prev, fontWeight: e.target.value }))}
                  placeholder="e.g., bold"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedStyle.description}
                onChange={(e) => setEditedStyle(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe this text style"
              />
            </div>

            {/* Shadow Editor */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Text Shadows</Label>
                <Button size="sm" variant="outline" onClick={addShadow}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Shadow
                </Button>
              </div>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {editedStyle.shadows.map((shadow, index) => (
                  <motion.div
                    key={shadow.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Shadow {index + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeShadow(shadow.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">X Offset</Label>
                        <Slider
                          value={[shadow.x]}
                          onValueChange={([value]) => updateShadow(shadow.id, { x: value })}
                          min={-50}
                          max={50}
                          step={1}
                          className="mt-1"
                        />
                        <div className="text-xs text-muted-foreground mt-1">{shadow.x}px</div>
                      </div>
                      <div>
                        <Label className="text-xs">Y Offset</Label>
                        <Slider
                          value={[shadow.y]}
                          onValueChange={([value]) => updateShadow(shadow.id, { y: value })}
                          min={-50}
                          max={50}
                          step={1}
                          className="mt-1"
                        />
                        <div className="text-xs text-muted-foreground mt-1">{shadow.y}px</div>
                      </div>
                      <div>
                        <Label className="text-xs">Blur</Label>
                        <Slider
                          value={[shadow.blur]}
                          onValueChange={([value]) => updateShadow(shadow.id, { blur: value })}
                          min={0}
                          max={50}
                          step={1}
                          className="mt-1"
                        />
                        <div className="text-xs text-muted-foreground mt-1">{shadow.blur}px</div>
                      </div>
                      <div>
                        <Label className="text-xs">Color</Label>
                        <div className="flex space-x-2 mt-1">
                          <input
                            type="color"
                            value={shadow.color}
                            onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                            className="w-8 h-8 rounded border border-border cursor-pointer"
                          />
                          <Input
                            value={shadow.color}
                            onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editedStyle.tags.map((tag, index) => (
                  <Badge key={`tag-${tag}-${index}`} variant="secondary" className="cursor-pointer">
                    {tag}
                    <X
                      className="h-3 w-3 ml-1"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag}>Add</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={handleDuplicate}>
            Duplicate
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}