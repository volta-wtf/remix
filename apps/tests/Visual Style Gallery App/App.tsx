import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Input } from "./components/ui/input";
import { Search, Palette, Type, Square } from 'lucide-react';
import { GradientSection } from './components/GradientSection';
import { TextStyleSection } from './components/TextStyleSection';
import { FrameStyleSection } from './components/FrameStyleSection';
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('gradients');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gradients':
        return <GradientSection searchQuery={searchQuery} />;
      case 'text':
        return <TextStyleSection searchQuery={searchQuery} />;
      case 'frames':
        return <FrameStyleSection searchQuery={searchQuery} />;
      default:
        return <GradientSection searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3"
            >
              <Palette className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Style Gallery</h1>
                <p className="text-muted-foreground">Visual design system collection</p>
              </div>
            </motion.div>
            
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative w-80"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="gradients" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Gradients</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <span>Text Styles</span>
              </TabsTrigger>
              <TabsTrigger value="frames" className="flex items-center space-x-2">
                <Square className="h-4 w-4" />
                <span>Frame Styles</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}