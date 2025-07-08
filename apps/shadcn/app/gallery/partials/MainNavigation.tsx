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
    <nav>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`
              relative flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
              ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-border/50 rounded-sm"
                initial={false}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}

            <div className="relative flex items-center gap-3">
              <Icon className="w-4 h-4" />
              <div className="text-left">
                <div className="text-sm font-medium">{item.label}</div>
              </div>
            </div>
          </button>
        );
      })}
    </nav>
  );
}