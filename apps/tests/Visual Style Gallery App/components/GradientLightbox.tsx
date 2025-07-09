import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Copy, X, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Gradient } from './GradientSection';

interface GradientPanelProps {
  gradient: Gradient;
  onClose: () => void;
  onUpdate: (gradient: Gradient) => void;
  onDuplicate: (gradient: Gradient) => void;
}

const directions = [
  { value: 'to right', label: 'To Right' },
  { value: 'to left', label: 'To Left' },
  { value: 'to bottom', label: 'To Bottom' },
  { value: 'to top', label: 'To Top' },
  { value: 'to bottom right', label: 'To Bottom Right' },
  { value: 'to bottom left', label: 'To Bottom Left' },
  { value: 'to top right', label: 'To Top Right' },
  { value: 'to top left', label: 'To Top Left' },
  { value: '45deg', label: '45 Degrees' },
  { value: '90deg', label: '90 Degrees' },
  { value: '135deg', label: '135 Degrees' },
  { value: '180deg', label: '180 Degrees' }
];

export function GradientPanel({ gradient, onClose, onUpdate, onDuplicate }: GradientPanelProps) {
  const [editedGradient, setEditedGradient] = useState<Gradient>(gradient);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const css = `linear-gradient(${editedGradient.direction}, ${editedGradient.colors.join(', ')})`;
    setEditedGradient(prev => ({ ...prev, css }));
  }, [editedGradient.direction, editedGradient.colors]);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...editedGradient.colors];
    newColors[index] = color;
    setEditedGradient(prev => ({ ...prev, colors: newColors }));
  };

  const addColor = () => {
    setEditedGradient(prev => ({
      ...prev,
      colors: [...prev.colors, '#000000']
    }));
  };

  const removeColor = (index: number) => {
    if (editedGradient.colors.length > 2) {
      const newColors = editedGradient.colors.filter((_, i) => i !== index);
      setEditedGradient(prev => ({ ...prev, colors: newColors }));
    }
  };

  const addTag = () => {
    if (newTag && !editedGradient.tags.includes(newTag)) {
      setEditedGradient(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEditedGradient(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedGradient.css);
    toast.success('CSS copied to clipboard!');
  };

  const handleSave = () => {
    onUpdate(editedGradient);
    onClose();
    toast.success('Gradient updated successfully!');
  };

  const handleDuplicate = () => {
    onDuplicate(editedGradient);
    onClose();
    toast.success('Gradient duplicated successfully!');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Edit Gradient
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Customize the gradient colors, direction, and properties. See live preview and copy the generated CSS.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Preview */}
          <div className="space-y-4">
            <div>
              <Label>Live Preview</Label>
              <motion.div
                key={editedGradient.css}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-64 w-full rounded-lg border-2 border-dashed border-border"
                style={{ background: editedGradient.css }}
              />
            </div>

            <div>
              <Label>CSS Output</Label>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>background: {editedGradient.css};</code>
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
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedGradient.name}
                onChange={(e) => setEditedGradient(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={editedGradient.category}
                onChange={(e) => setEditedGradient(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>

            <div>
              <Label>Direction</Label>
              <Select
                value={editedGradient.direction}
                onValueChange={(value) => setEditedGradient(prev => ({ ...prev, direction: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {directions.map((dir) => (
                    <SelectItem key={dir.value} value={dir.value}>
                      {dir.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Colors</Label>
                <Button size="sm" variant="outline" onClick={addColor}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {editedGradient.colors.map((color, index) => (
                  <div key={`color-${index}`} className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="flex-1"
                    />
                    {editedGradient.colors.length > 2 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeColor(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="inspiration">Inspiration</Label>
              <Textarea
                id="inspiration"
                value={editedGradient.inspiration}
                onChange={(e) => setEditedGradient(prev => ({ ...prev, inspiration: e.target.value }))}
                placeholder="What inspired this gradient?"
              />
            </div>

            <div>
              <Label htmlFor="usage">Usage Tips</Label>
              <Textarea
                id="usage"
                value={editedGradient.usageTips}
                onChange={(e) => setEditedGradient(prev => ({ ...prev, usageTips: e.target.value }))}
                placeholder="Best practices for using this gradient"
              />
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editedGradient.tags.map((tag, index) => (
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