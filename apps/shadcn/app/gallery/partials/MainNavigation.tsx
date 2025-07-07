import { motion } from '@/lib/motion';
import { Palette, Type, Frame } from 'lucide-react';

type Section = 'gradients' | 'text-styles' | 'frame-styles';

interface MainNavigationProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navigationItems = [
  {
    id: 'gradients' as Section,
    label: 'Gradients',
    icon: Palette,
    description: 'Beautiful color gradients'
  },
  {
    id: 'text-styles' as Section,
    label: 'Text Styles',
    icon: Type,
    description: 'WordArt and typography effects'
  },
  {
    id: 'frame-styles' as Section,
    label: 'Frame Styles',
    icon: Frame,
    description: 'Material-based frame effects'
  }
];

export function MainNavigation({ activeSection, onSectionChange }: MainNavigationProps) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <nav className="flex bg-muted/50 rounded-xl p-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    relative flex items-center gap-3 px-6 py-3 rounded-lg transition-colors
                    ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-background rounded-lg shadow-sm border border-border/50"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}

                  <div className="relative flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}