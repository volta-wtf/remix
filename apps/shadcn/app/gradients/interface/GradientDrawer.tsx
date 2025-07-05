import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Download, Heart, Share, Edit, FileImage, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Gradient } from "../types/gradient";
import { useAuth } from "../contexts/AuthContext";
import { GradientExporter } from "../utils/exportUtils";
import { toast } from "sonner@2.0.3";

interface GradientDrawerProps {
    gradient: Gradient | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (gradient: Gradient) => void;
}

export function GradientDrawer({ gradient, isOpen, onClose, onEdit }: GradientDrawerProps) {
    const { user, isFavorite, addToFavorites, removeFromFavorites } = useAuth();
    const [exportFormat, setExportFormat] = useState<'svg' | 'png' | 'jpg' | 'css'>('png');
    const [exportPreset, setExportPreset] = useState('Desktop Wallpaper');
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard!`);
    };

    const handleFavoriteToggle = () => {
        if (!gradient || !user) {
            toast.error("Please login to save favorites");
            return;
        }

        if (isFavorite(gradient.id)) {
            removeFromFavorites(gradient.id);
            toast.success("Removed from favorites");
        } else {
            addToFavorites(gradient.id);
            toast.success("Added to favorites");
        }
    };

    const handleExport = async () => {
        if (!gradient) return;

        const presets = GradientExporter.getExportPresets();
        const dimensions = presets[exportPreset as keyof typeof presets] || presets['Custom'];

        try {
            await GradientExporter.exportGradient(gradient, {
                format: exportFormat,
                width: dimensions.width,
                height: dimensions.height,
                quality: 0.9
            });
            toast.success(`Gradient exported as ${exportFormat.toUpperCase()}!`);
            setIsExportDialogOpen(false);
        } catch (error) {
            toast.error("Export failed");
            console.error(error);
        }
    };

    const handleShare = () => {
        if (!gradient) return;

        const shareData = {
            title: gradient.name,
            text: `Check out this beautiful gradient: ${gradient.name}`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback: copy URL to clipboard
            copyToClipboard(window.location.href, "Share link");
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
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-2xl z-50 overflow-y-auto"
                    >
                        {gradient && (
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2>{gradient.name}</h2>
                                    <div className="flex items-center gap-2">
                                        {onEdit && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(gradient)}
                                                className="h-8 w-8"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={onClose}
                                            className="h-8 w-8"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Large Gradient Preview */}
                                <div
                                    className="w-full h-48 rounded-lg mb-6 shadow-lg"
                                    style={{ background: gradient.cssValue }}
                                />

                                {/* Gradient Details */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-2">Description</h3>
                                        <p className="text-muted-foreground">{gradient.description}</p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="mb-3">Colors</h3>
                                        <div className="space-y-2">
                                            {gradient.colors.map((color, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div
                                                        className="w-8 h-8 rounded-md border shadow-sm"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                    <span className="font-mono text-sm flex-1">{color}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(color, "Color")}
                                                    >
                                                        <Copy className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="mb-3">CSS Code</h3>
                                        <div className="relative">
                                            <pre className="bg-muted p-3 rounded-lg text-sm font-mono overflow-x-auto">
                                                <code>background: {gradient.cssValue};</code>
                                            </pre>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={() => copyToClipboard(`background: ${gradient.cssValue};`, "CSS code")}
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Badge variant="secondary">{gradient.category}</Badge>
                                            <p className="text-muted-foreground mt-1">by {gradient.author}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-muted-foreground">Direction</p>
                                            <p>{gradient.direction}</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button className="flex-1">
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Export
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Export Gradient</DialogTitle>
                                                        <DialogDescription>
                                                            Choose your preferred format and size for exporting this gradient.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div>
                                                            <Label>Format</Label>
                                                            <Select value={exportFormat} onValueChange={(value: 'svg' | 'png' | 'jpg' | 'css') => setExportFormat(value)}>
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="png">PNG (Recommended)</SelectItem>
                                                                    <SelectItem value="jpg">JPG</SelectItem>
                                                                    <SelectItem value="svg">SVG</SelectItem>
                                                                    <SelectItem value="css">CSS File</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {exportFormat !== 'css' && (
                                                            <div>
                                                                <Label>Size</Label>
                                                                <Select value={exportPreset} onValueChange={setExportPreset}>
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {Object.keys(GradientExporter.getExportPresets()).map((preset) => (
                                                                            <SelectItem key={preset} value={preset}>
                                                                                {preset}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}

                                                        <Button onClick={handleExport} className="w-full">
                                                            <FileImage className="h-4 w-4 mr-2" />
                                                            Export as {exportFormat.toUpperCase()}
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Button
                                                variant="outline"
                                                onClick={() => copyToClipboard(gradient.cssValue, "Gradient")}
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant={user && isFavorite(gradient.id) ? "default" : "outline"}
                                                onClick={handleFavoriteToggle}
                                                className="flex-1"
                                            >
                                                <Heart className={`h-4 w-4 mr-2 ${user && isFavorite(gradient.id) ? 'fill-current' : ''}`} />
                                                {user && isFavorite(gradient.id) ? 'Favorited' : 'Favorite'}
                                            </Button>
                                            <Button variant="outline" onClick={handleShare}>
                                                <Share className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}