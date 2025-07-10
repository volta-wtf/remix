"use client"
import { useState, useMemo } from 'react';
import { AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Icon } from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { MainNavigation } from './partials/MainNavigation';
import { GradientGrid } from './partials/GradientGrid';
import { GradientPanel } from './partials/GradientPanel';
import { TextStylesGrid } from './partials/TextStylesGrid';
import { TextStylePanel } from './partials/TextStylePanel';
import TextClassGrid from './partials/TextClassGrid';
import { TextClassPanel } from './partials/TextClassPanel';
import { FrameStylesGrid } from './partials/FrameStylesGrid';
import { FrameStylePanel } from './partials/FrameStylePanel';
import { MainSearchInput } from './partials/MainSearchInput';
import { MainCategoryFilter } from './partials/MainCategoryFilter';

// Types
import { Gradient, TextStyle, FrameStyle, TextClass, Section } from './types';

// Data
import {
  gradients,
  gradientCategories,
  textStyles,
  textStyleCategories,
  frameStyles,
  frameStyleCategories
} from './data';
import { textClasses, textClassesCategories } from './data/textClasses';

import "@/styles/index.css";

const styles = {
  name: "Style 1",
  description: "A modern and clean style",
  image: "https://via.placeholder.com/150",

  container: "flex px-8",
  aside: "w-2/10 px-12",
  main: "flex-1",
  content: "w-2/5 px-8 gap-4",
  preview: "px-12 gap-4",
  scroll: "h-svh py-24 overflow-y-auto overscroll-contain scroll-auto"
}

const changeTheme = () => {
  // Cambia el tema entre 'light' y 'dark' usando el provider de next-themes
  if (typeof window !== "undefined") {
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(nextTheme);
    // Si usas next-themes, lo ideal es usar el hook useTheme:
    // const { setTheme, theme } = useTheme();
    // setTheme(theme === "dark" ? "light" : "dark");
  }
}

const ScrollProgress = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-px w-full bg-border", className)}></div>
  )
}

function AppHeader({ isPreviewOpen, togglePreview, children }: { isPreviewOpen: boolean; togglePreview: () => void, children: React.ReactNode }) {
  return (
    <header className={cn("fixed top-0 z-10 bg-background/80 backdrop-blur-lg h-24 w-full ", styles.container)}>
      <div className={cn("flex flex-row items-center gap-4 pr-0!", styles.aside)}>
        <div className="text-2xl">styles</div>
        <Icon.Select sm className="shrink-0 text-black/60" />
        <ScrollProgress />
      </div>
      <div className={cn("flex flex-row", styles.main)}>

        <div className={cn(isPreviewOpen ? "" : "w-full! pr-0!", "flex flex-row items-center", styles.content)}>
          <div className="flex flex-row items-center gap-2">
            {children}
          </div>
          <ScrollProgress />
        </div>

        <div className={cn("flex flex-1 items-center", styles.preview)}>
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2"
            onClick={togglePreview}
          >
            <Icon.RightPanel className={cn("shrink-0 text-black/60 transition-transform",
              isPreviewOpen ? "" : "rotate-180"
            )} />
          </Button>
          <ScrollProgress className={cn(isPreviewOpen ? "w-full" : "hidden")} />
          <Button
            variant="ghost"
            size="icon"
            className="-mr-2"
            onClick={changeTheme}
          >
            <Icon.ThemeDark className="shrink-0 text-black/60" />
          </Button>
        </div>

      </div>
    </header>
  )
}

function StyleCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center min-w-20 bg-black/3 p-10", className)}>
      <p className="text-4xl font-bold">Aa</p>
    </div>
  )
}

export default function GalleryPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(true)

  const [activeSection, setActiveSection] = useState<Section>('text-classes');
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);
  const [selectedTextStyle, setSelectedTextStyle] = useState<TextStyle | null>(null);
  const [selectedTextClass, setSelectedTextClass] = useState<TextClass | null>(null);
  const [selectedFrameStyle, setSelectedFrameStyle] = useState<FrameStyle | null>(null);

  // Handlers that auto-close other panels
  const handleSelectGradient = (gradient: Gradient | null) => {
    setSelectedGradient(gradient);
    setSelectedTextStyle(null);
    setSelectedFrameStyle(null);
  };

  const handleSelectTextStyle = (textStyle: TextStyle | null) => {
    setSelectedTextStyle(textStyle);
    setSelectedGradient(null);
    setSelectedTextClass(null);
    setSelectedFrameStyle(null);
  };

  const handleSelectTextClass = (textClass: TextClass | null) => {
    setSelectedTextClass(textClass);
    setSelectedGradient(null);
    setSelectedTextStyle(null);
    setSelectedFrameStyle(null);
  };

  const handleSelectFrameStyle = (frameStyle: FrameStyle | null) => {
    setSelectedFrameStyle(frameStyle);
    setSelectedGradient(null);
    setSelectedTextStyle(null);
    setSelectedTextClass(null);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  // Modified and custom items state
  const [modifiedGradients, setModifiedGradients] = useState<Gradient[]>([]);
  const [modifiedTextStyles, setModifiedTextStyles] = useState<TextStyle[]>([]);
  const [modifiedFrameStyles, setModifiedFrameStyles] = useState<FrameStyle[]>([]);
  const [customGradients, setCustomGradients] = useState<Gradient[]>([]);
  const [customTextStyles, setCustomTextStyles] = useState<TextStyle[]>([]);
  const [customFrameStyles, setCustomFrameStyles] = useState<FrameStyle[]>([]);

  // const { user, logout, isFavorite } = useAuth()

  // Get current data and categories based on active section
  const getCurrentData = () => {
    switch (activeSection) {
      case 'gradients':
        return {
          data: [...gradients, ...modifiedGradients, ...customGradients],
          categories: gradientCategories
        };
      case 'text-styles':
        return {
          data: [...textStyles, ...modifiedTextStyles, ...customTextStyles],
          categories: textStyleCategories
        };
      case 'text-classes':
        return {
          data: textClasses,
          categories: textClassesCategories
        };
      case 'frame-styles':
        return {
          data: [...frameStyles, ...modifiedFrameStyles, ...customFrameStyles],
          categories: frameStyleCategories
        };
      default:
        return { data: gradients, categories: gradientCategories };
    }
  };

  const { data: currentData, categories: currentCategories } = getCurrentData();

  // Get all unique tags from current data
  const currentTags = useMemo(() => {
    const allTags = new Set<string>();
    allTags.add('All');

    currentData.forEach((item: any) => {
      if (item.tags) {
        item.tags.forEach((tag: string) => allTags.add(tag));
      }
    });

    return Array.from(allTags);
  }, [currentData]);

  const filteredData = useMemo(() => {
    return currentData.filter((item: any) => {
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.usage && item.usage.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

      const matchesTag = selectedTag === 'All' || (item.tags && item.tags.includes(selectedTag));

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [currentData, searchQuery, selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag('All');
  };

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    clearFilters();
  };

  // Duplicate handlers (now creates custom items)
  const handleDuplicateGradient = (gradient: Gradient) => {
    const newGradient: Gradient = {
      ...gradient,
      id: `custom-${Date.now()}`,
      name: `${gradient.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomGradients(prev => [...prev, newGradient]);
    handleSelectGradient(newGradient);
  };

  const handleDuplicateTextStyle = (textStyle: TextStyle) => {
    const newTextStyle: TextStyle = {
      ...textStyle,
      id: `custom-${Date.now()}`,
      name: `${textStyle.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomTextStyles(prev => [...prev, newTextStyle]);
    handleSelectTextStyle(newTextStyle);
  };

  const handleDuplicateFrameStyle = (frameStyle: FrameStyle) => {
    const newFrameStyle: FrameStyle = {
      ...frameStyle,
      id: `custom-${Date.now()}`,
      name: `${frameStyle.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomFrameStyles(prev => [...prev, newFrameStyle]);
    handleSelectFrameStyle(newFrameStyle);
  };

  // Update handlers (now handle all items)
  const handleUpdateGradient = (updatedGradient: Gradient) => {
    if (updatedGradient.isCustom) {
      // Update custom items
      setCustomGradients(prev =>
        prev.map(g => g.id === updatedGradient.id ? updatedGradient : g)
      );
    } else {
      // Check if this is a built-in item being modified
      const isBuiltIn = gradients.find(g => g.id === updatedGradient.id);
      if (isBuiltIn) {
        // Mark as modified and add to modified items
        const modifiedGradient: Gradient = {
          ...updatedGradient,
          isModified: true,
          category: updatedGradient.category === 'Modified' ? updatedGradient.category : updatedGradient.category
        };

        setModifiedGradients(prev => {
          const existing = prev.find(g => g.id === updatedGradient.id);
          if (existing) {
            return prev.map(g => g.id === updatedGradient.id ? modifiedGradient : g);
          } else {
            return [...prev, modifiedGradient];
          }
        });
      } else {
        // Update modified items
        setModifiedGradients(prev =>
          prev.map(g => g.id === updatedGradient.id ? updatedGradient : g)
        );
      }
    }
            handleSelectGradient(updatedGradient);
  };

  const handleUpdateTextStyle = (updatedTextStyle: TextStyle) => {
    if (updatedTextStyle.isCustom) {
      setCustomTextStyles(prev =>
        prev.map(ts => ts.id === updatedTextStyle.id ? updatedTextStyle : ts)
      );
    } else {
      const isBuiltIn = textStyles.find(ts => ts.id === updatedTextStyle.id);
      if (isBuiltIn) {
        const modifiedTextStyle: TextStyle = {
          ...updatedTextStyle,
          isModified: true
        };

        setModifiedTextStyles(prev => {
          const existing = prev.find(ts => ts.id === updatedTextStyle.id);
          if (existing) {
            return prev.map(ts => ts.id === updatedTextStyle.id ? modifiedTextStyle : ts);
          } else {
            return [...prev, modifiedTextStyle];
          }
        });
      } else {
        setModifiedTextStyles(prev =>
          prev.map(ts => ts.id === updatedTextStyle.id ? updatedTextStyle : ts)
        );
      }
    }
            handleSelectTextStyle(updatedTextStyle);
  };

  const handleUpdateFrameStyle = (updatedFrameStyle: FrameStyle) => {
    if (updatedFrameStyle.isCustom) {
      setCustomFrameStyles(prev =>
        prev.map(fs => fs.id === updatedFrameStyle.id ? updatedFrameStyle : fs)
      );
    } else {
      const isBuiltIn = frameStyles.find(fs => fs.id === updatedFrameStyle.id);
      if (isBuiltIn) {
        const modifiedFrameStyle: FrameStyle = {
          ...updatedFrameStyle,
          isModified: true
        };

        setModifiedFrameStyles(prev => {
          const existing = prev.find(fs => fs.id === updatedFrameStyle.id);
          if (existing) {
            return prev.map(fs => fs.id === updatedFrameStyle.id ? modifiedFrameStyle : fs);
          } else {
            return [...prev, modifiedFrameStyle];
          }
        });
      } else {
        setModifiedFrameStyles(prev =>
          prev.map(fs => fs.id === updatedFrameStyle.id ? updatedFrameStyle : fs)
        );
      }
    }
            handleSelectFrameStyle(updatedFrameStyle);
  };

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen)
  }

  const isLightboxOpen = selectedGradient || selectedTextStyle || selectedTextClass || selectedFrameStyle;

  return (
    <div className="h-svh bg-background">

      <AppHeader isPreviewOpen={isPreviewOpen} togglePreview={togglePreview}>
        <MainSearchInput
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search by name, description, or tags..."
        />
      </AppHeader>

      <div className={cn("h-svh", styles.container)}>
        <aside className={cn("flex flex-col", styles.aside, styles.scroll)}>
          <MainNavigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <div className="mt-8">
            <MainCategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={currentCategories}
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
              tags={currentTags}
              onClearFilters={clearFilters}
              resultsCount={filteredData.length}
              totalCount={currentData.length}
            />
          </div>
        </aside>
        <main className={cn("flex flex-row", styles.main)}>

          <section className={cn("flex flex-col", styles.content, styles.scroll, isPreviewOpen ? "" : "flex-1 pr-12")}>
            {activeSection === 'gradients' && (
              <GradientGrid
                key="gradients-grid"
                gradients={filteredData as Gradient[]}
                onSelectGradient={handleSelectGradient}
                isPreviewOpen={isPreviewOpen}
                searchQuery={searchQuery}
              />
            )}
            {activeSection === 'text-styles' && (
              <TextStylesGrid
                key="text-styles-grid"
                textStyles={filteredData as TextStyle[]}
                onSelectTextStyle={handleSelectTextStyle}
                isPreviewOpen={isPreviewOpen}
                searchQuery={searchQuery}
              />
            )}
            {activeSection === 'text-classes' && (
              <TextClassGrid
                key="text-classes-grid"
                textClasses={filteredData as TextClass[]}
                onSelectTextClass={handleSelectTextClass}
                isPreviewOpen={isPreviewOpen}
                searchQuery={searchQuery}
              />
            )}
            {activeSection === 'frame-styles' && (
              <FrameStylesGrid
                key="frame-styles-grid"
                frameStyles={filteredData as FrameStyle[]}
                onSelectFrameStyle={handleSelectFrameStyle}
                isPreviewOpen={isPreviewOpen}
                searchQuery={searchQuery}
              />
            )}
          </section>

          {isPreviewOpen && (
            <section className={cn("flex flex-1", styles.preview, styles.scroll)}>
              {selectedGradient && (
                <GradientPanel
                  key="gradient-lightbox"
                  gradient={selectedGradient}
                  onClose={() => handleSelectGradient(null)}
                  onDuplicate={handleDuplicateGradient}
                  onUpdate={handleUpdateGradient}
                />
              )}
              {selectedTextStyle && (
                <TextStylePanel
                  key="text-style-lightbox"
                  textStyle={selectedTextStyle}
                  onClose={() => handleSelectTextStyle(null)}
                  onDuplicate={handleDuplicateTextStyle}
                  onUpdate={handleUpdateTextStyle}
                />
              )}
              {selectedTextClass && (
                <TextClassPanel
                  key="text-class-lightbox"
                  textClass={selectedTextClass}
                  onClose={() => handleSelectTextClass(null)}
                />
              )}
              {selectedFrameStyle && (
                <FrameStylePanel
                  key="frame-style-lightbox"
                  frameStyle={selectedFrameStyle}
                  onClose={() => handleSelectFrameStyle(null)}
                  onDuplicate={handleDuplicateFrameStyle}
                  onUpdate={handleUpdateFrameStyle}
                />
              )}
            </section>
          )}

        </main>
      </div>
      <Toaster />
    </div>
  );
}

// Re-export types for backward compatibility
export type { Gradient, TextStyle, FrameStyle, Section } from './types';