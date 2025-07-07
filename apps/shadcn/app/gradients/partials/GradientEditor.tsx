"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, RotateCw, Save, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gradient } from "../types/gradient";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

interface GradientEditorProps {
    isOpen: boolean;
    onClose: () => void;
    initialGradient?: Gradient | null;
    onSave?: (gradient: Gradient) => void;
}

const GRADIENT_DIRECTIONS = [
    { value: "0deg", label: "Top" },
    { value: "45deg", label: "Top Right" },
    { value: "90deg", label: "Right" },
    { value: "135deg", label: "Bottom Right" },
    { value: "180deg", label: "Bottom" },
    { value: "225deg", label: "Bottom Left" },
    { value: "270deg", label: "Left" },
    { value: "315deg", label: "Top Left" }
];

const CATEGORIES = ["Nature", "Warm", "Cool", "Dark", "Bright", "Custom"];

const PRESET_COLORS = [
    "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57",
    "#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43",
    "#a55eea", "#26de81", "#fd79a8", "#6c5ce7", "#fdcb6e"
];

export function GradientEditor({ isOpen, onClose, initialGradient, onSave }: GradientEditorProps) {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Custom");
    const [colors, setColors] = useState(["#667eea", "#764ba2"]);
    const [direction, setDirection] = useState("135deg");

    useEffect(() => {
        if (initialGradient) {
            setName(initialGradient.name);
            setDescription(initialGradient.description);
            setCategory(initialGradient.category);
            setColors([...initialGradient.colors]);
            setDirection(initialGradient.direction);
        } else {
            // Reset for new gradient
            setName("");
            setDescription("");
            setCategory("Custom");
            setColors(["#667eea", "#764ba2"]);
            setDirection("135deg");
        }
    }, [initialGradient, isOpen]);

    const generateCssValue = () => {
        const colorStops = colors.map((color, index) =>
            `${color} ${(index / (colors.length - 1)) * 100}%`
        ).join(", ");
        return `linear-gradient(${direction}, ${colorStops})`;
    };

    const addColor = () => {
        if (colors.length < 5) {
            const randomColor = PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
            setColors([...colors, randomColor]);
        }
    };

    const removeColor = (index: number) => {
        if (colors.length > 2) {
            setColors(colors.filter((_, i) => i !== index));
        }
    };

    const updateColor = (index: number, color: string) => {
        const newColors = [...colors];
        newColors[index] = color;
        setColors(newColors);
    };

    const randomizeGradient = () => {
        const numColors = Math.floor(Math.random() * 3) + 2; // 2-4 colors
        const randomColors = [];
        for (let i = 0; i < numColors; i++) {
            randomColors.push(PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]);
        }
        setColors(randomColors);

        const randomDirection = GRADIENT_DIRECTIONS[Math.floor(Math.random() * GRADIENT_DIRECTIONS.length)];
        setDirection(randomDirection.value);
    };

    const handleSave = () => {
        if (!name.trim()) {
            toast.error("Please enter a gradient name");
            return;
        }

        const gradient: Gradient = {
            id: initialGradient?.id || Date.now().toString(),
            name: name.trim(),
            description: description.trim() || "Custom gradient",
            colors: [...colors],
            direction,
            cssValue: generateCssValue(),
            category,
            author: user?.name || "Anonymous"
        };

        onSave?.(gradient);
        toast.success(initialGradient ? "Gradient updated!" : "Gradient created!");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2>{initialGradient ? "Edit Gradient" : "Create New Gradient"}</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={randomizeGradient}>
                                <Shuffle className="h-4 w-4 mr-2" />
                                Random
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                ✕
                            </Button>
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="mb-6">
                        <Label className="mb-3 block">Preview</Label>
                        <div
                            className="w-full h-32 rounded-lg shadow-lg border"
                            style={{ background: generateCssValue() }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="gradient-name">Gradient Name</Label>
                                <Input
                                    id="gradient-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g., Ocean Sunset"
                                />
                            </div>

                            <div>
                                <Label htmlFor="gradient-description">Description</Label>
                                <Textarea
                                    id="gradient-description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe your gradient..."
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="gradient-category">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Colors & Direction */}
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <Label>Colors</Label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addColor}
                                        disabled={colors.length >= 5}
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {colors.map((color, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => updateColor(index, e.target.value)}
                                                className="w-12 h-10 rounded border cursor-pointer"
                                            />
                                            <Input
                                                value={color}
                                                onChange={(e) => updateColor(index, e.target.value)}
                                                className="font-mono"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeColor(index)}
                                                disabled={colors.length <= 2}
                                                className="flex-shrink-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="mb-3 block">Direction</Label>
                                <Select value={direction} onValueChange={setDirection}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {GRADIENT_DIRECTIONS.map((dir) => (
                                            <SelectItem key={dir.value} value={dir.value}>
                                                {dir.label} ({dir.value})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Preset Colors */}
                            <div>
                                <Label className="mb-3 block">Quick Colors</Label>
                                <div className="grid grid-cols-5 gap-2">
                                    {PRESET_COLORS.map((color) => (
                                        <button
                                            key={color}
                                            className="w-8 h-8 rounded border-2 border-white shadow-sm hover:scale-110 transition-transform"
                                            style={{ backgroundColor: color }}
                                            onClick={() => {
                                                const index = colors.length - 1;
                                                updateColor(index, color);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* CSS Output */}
                    <div className="mb-6">
                        <Label className="mb-3 block">CSS Code</Label>
                        <div className="bg-muted p-3 rounded-lg">
                            <code className="text-sm font-mono break-all">
                                background: {generateCssValue()};
                            </code>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            <Save className="h-4 w-4 mr-2" />
                            {initialGradient ? "Update" : "Create"} Gradient
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}