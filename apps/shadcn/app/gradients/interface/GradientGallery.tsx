import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, Plus, User, LogOut, Heart } from "lucide-react";
import { GradientCard } from "./GradientCard";
import { GradientDrawer } from "./GradientDrawer";
import { GradientEditor } from "./GradientEditor";
import { AuthDialog } from "./AuthDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Gradient, gradientData } from "../types/gradient";
import { useAuth } from "../contexts/AuthContext";

export function GradientGallery() {
    const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const [editingGradient, setEditingGradient] = useState<Gradient | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [customGradients, setCustomGradients] = useState<Gradient[]>([]);

    const { user, logout, isFavorite } = useAuth();

    useEffect(() => {
        // Load custom gradients from localStorage
        const saved = localStorage.getItem('custom-gradients');
        if (saved) {
            setCustomGradients(JSON.parse(saved));
        }
    }, []);

    const allGradients = [...gradientData, ...customGradients];
    const categories = ["All", ...Array.from(new Set(allGradients.map(g => g.category)))];

    const filteredGradients = allGradients.filter(gradient => {
        const matchesSearch = gradient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gradient.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || gradient.category === selectedCategory;
        const matchesFavorites = !showFavoritesOnly || (user && isFavorite(gradient.id));
        return matchesSearch && matchesCategory && matchesFavorites;
    });

    const handleGradientClick = (gradient: Gradient) => {
        setSelectedGradient(gradient);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedGradient(null), 300);
    };

    const handleEditGradient = (gradient: Gradient) => {
        setEditingGradient(gradient);
        setIsEditorOpen(true);
        setIsDrawerOpen(false);
    };

    const handleCreateNew = () => {
        setEditingGradient(null);
        setIsEditorOpen(true);
    };

    const handleSaveGradient = (gradient: Gradient) => {
        const isEditing = editingGradient?.id === gradient.id;

        if (isEditing) {
            // Update existing gradient
            setCustomGradients(prev => prev.map(g => g.id === gradient.id ? gradient : g));
        } else {
            // Add new gradient
            setCustomGradients(prev => [...prev, gradient]);
        }

        // Save to localStorage
        const updated = isEditing
            ? customGradients.map(g => g.id === gradient.id ? gradient : g)
            : [...customGradients, gradient];
        localStorage.setItem('custom-gradients', JSON.stringify(updated));

        setIsEditorOpen(false);
        setEditingGradient(null);
    };

    const handleLogout = () => {
        logout();
        setShowFavoritesOnly(false);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b"
            >
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1>Gradient Gallery</h1>
                            <p className="text-muted-foreground">
                                Discover and create beautiful gradients for your next project
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {user ? (
                                <>
                                    <Button onClick={handleCreateNew} className="hidden sm:flex">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="hidden sm:inline">{user.name}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={handleCreateNew}>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create Gradient
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
                                                <Heart className="h-4 w-4 mr-2" />
                                                {showFavoritesOnly ? 'Show All' : 'Favorites Only'}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleLogout}>
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <Button onClick={() => setIsAuthDialogOpen(true)}>
                                    <User className="h-4 w-4 mr-2" />
                                    Login
                                </Button>
                            )}

                            <div className="flex items-center gap-1 ml-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search gradients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto">
                            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            {categories.map((category) => (
                                <Badge
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    className="cursor-pointer whitespace-nowrap"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Badge>
                            ))}
                            {user && (
                                <Badge
                                    variant={showFavoritesOnly ? "default" : "outline"}
                                    className="cursor-pointer whitespace-nowrap"
                                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                >
                                    ❤️ Favorites
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Gallery */}
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    layout
                    className={`grid gap-6 ${viewMode === "grid"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            : "grid-cols-1 max-w-2xl mx-auto"
                        }`}
                >
                    {filteredGradients.map((gradient, index) => (
                        <GradientCard
                            key={gradient.id}
                            gradient={gradient}
                            onClick={() => handleGradientClick(gradient)}
                            index={index}
                        />
                    ))}
                </motion.div>

                {filteredGradients.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <p className="text-muted-foreground mb-4">
                            {showFavoritesOnly
                                ? "No favorite gradients yet. Start exploring and add some!"
                                : "No gradients found matching your criteria."
                            }
                        </p>
                        {user && (
                            <Button onClick={handleCreateNew}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Your First Gradient
                            </Button>
                        )}
                    </motion.div>
                )}
            </main>

            {/* Gradient Drawer */}
            <GradientDrawer
                gradient={selectedGradient}
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                onEdit={handleEditGradient}
            />

            {/* Gradient Editor */}
            <GradientEditor
                isOpen={isEditorOpen}
                onClose={() => {
                    setIsEditorOpen(false);
                    setEditingGradient(null);
                }}
                initialGradient={editingGradient}
                onSave={handleSaveGradient}
            />

            {/* Auth Dialog */}
            <AuthDialog
                isOpen={isAuthDialogOpen}
                onClose={() => setIsAuthDialogOpen(false)}
            />
        </div>
    );
}