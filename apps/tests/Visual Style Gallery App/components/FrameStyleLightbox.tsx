import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Copy, X, Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { FrameStyle, BoxShadow } from './FrameStyleSection';

interface FrameStylePanelProps {
  frameStyle: FrameStyle;
  onClose: () => void;
  onUpdate: (style: FrameStyle) => void;
  onDuplicate: (style: FrameStyle) => void;
}

export function FrameStylePanel({ frameStyle, onClose, onUpdate, onDuplicate }: FrameStylePanelProps) {
  const [editedStyle, setEditedStyle] = useState<FrameStyle>(frameStyle);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const boxShadowCSS = editedStyle.shadows.map(shadow =>
      `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
    ).join(', ');

    let css = `background: ${editedStyle.background}; border-radius: ${editedStyle.borderRadius};`;
    if (editedStyle.border !== 'none') css += ` border: ${editedStyle.border};`;
    if (boxShadowCSS) css += ` box-shadow: ${boxShadowCSS};`;
    if (editedStyle.backdrop !== 'none') css += ` backdrop-filter: ${editedStyle.backdrop};`;

    setEditedStyle(prev => ({ ...prev, css }));
  }, [editedStyle.shadows, editedStyle.background, editedStyle.border, editedStyle.borderRadius, editedStyle.backdrop]);

  const addShadow = () => {
    const newShadow: BoxShadow = {
      id: Date.now().toString(),
      x: 0,
      y: 0,
      blur: 0,
      spread: 0,
      color: '#000000',
      inset: false
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

  const updateShadow = (shadowId: string, updates: Partial<BoxShadow>) => {
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
    toast.success('Frame style updated successfully!');
  };

  const handleDuplicate = () => {
    onDuplicate(editedStyle);
    onClose();
    toast.success('Frame style duplicated successfully!');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Edit Frame Style
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Customize frame properties including box shadows, borders, background, and backdrop filters. See live preview and copy CSS.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Preview */}
          <div className="space-y-4">
            <div>
              <Label>Live Preview</Label>
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-border flex items-center justify-center p-8">
                <motion.div
                  key={editedStyle.css}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-32 h-24 flex items-center justify-center"
                  style={{
                    background: editedStyle.background,
                    borderRadius: editedStyle.borderRadius,
                    border: editedStyle.border !== 'none' ? editedStyle.border : undefined,
                    boxShadow: editedStyle.shadows.map(shadow =>
                      `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
                    ).join(', '),
                    backdropFilter: editedStyle.backdrop !== 'none' ? editedStyle.backdrop : undefined
                  }}
                >
                  <span className="text-sm font-medium opacity-50">Preview</span>
                </motion.div>
              </div>
            </div>

            <div>
              <Label>CSS Output</Label>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-40">
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

            <div>
              <Label htmlFor="className">Class Name</Label>
              <Input
                id="className"
                value={editedStyle.className}
                onChange={(e) => setEditedStyle(prev => ({ ...prev, className: e.target.value }))}
                placeholder="e.g., my-custom-frame"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedStyle.description}
                onChange={(e) => setEditedStyle(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe this frame style"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="background">Background</Label>
                <Input
                  id="background"
                  value={editedStyle.background}
                  onChange={(e) => setEditedStyle(prev => ({ ...prev, background: e.target.value }))}
                  placeholder="e.g., #ffffff or linear-gradient(...)"
                />
              </div>
              <div>
                <Label htmlFor="borderRadius">Border Radius</Label>
                <Input
                  id="borderRadius"
                  value={editedStyle.borderRadius}
                  onChange={(e) => setEditedStyle(prev => ({ ...prev, borderRadius: e.target.value }))}
                  placeholder="e.g., 8px"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="border">Border</Label>
                <Input
                  id="border"
                  value={editedStyle.border}
                  onChange={(e) => setEditedStyle(prev => ({ ...prev, border: e.target.value }))}
                  placeholder="e.g., 1px solid #000000 or none"
                />
              </div>
              <div>
                <Label htmlFor="backdrop">Backdrop Filter</Label>
                <Input
                  id="backdrop"
                  value={editedStyle.backdrop}
                  onChange={(e) => setEditedStyle(prev => ({ ...prev, backdrop: e.target.value }))}
                  placeholder="e.g., blur(10px) or none"
                />
              </div>
            </div>

            {/* Shadow Editor */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Box Shadows</Label>
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
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Switch
                            checked={shadow.inset}
                            onCheckedChange={(checked) => updateShadow(shadow.id, { inset: checked })}
                          />
                          <Label className="text-xs">Inset</Label>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeShadow(shadow.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
                          max={100}
                          step={1}
                          className="mt-1"
                        />
                        <div className="text-xs text-muted-foreground mt-1">{shadow.blur}px</div>
                      </div>
                      <div>
                        <Label className="text-xs">Spread</Label>
                        <Slider
                          value={[shadow.spread]}
                          onValueChange={([value]) => updateShadow(shadow.id, { spread: value })}
                          min={-50}
                          max={50}
                          step={1}
                          className="mt-1"
                        />
                        <div className="text-xs text-muted-foreground mt-1">{shadow.spread}px</div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Color</Label>
                      <div className="flex space-x-2 mt-1">
                        <input
                          type="color"
                          value={shadow.color.startsWith('#') ? shadow.color : '#000000'}
                          onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                          className="w-10 h-8 rounded border border-border cursor-pointer"
                        />
                        <Input
                          value={shadow.color}
                          onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                          className="flex-1 text-xs"
                          placeholder="e.g., #000000 or rgba(0,0,0,0.5)"
                        />
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