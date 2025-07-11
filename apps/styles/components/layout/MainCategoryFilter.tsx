import { motion } from '@/lib/motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
  tags: string[];
  onClearFilters: () => void;
  resultsCount: number;
  totalCount: number;
}

export function MainCategoryFilter({
  selectedCategory,
  onCategoryChange,
  categories,
  selectedTag,
  onTagChange,
  tags,
  onClearFilters,
  resultsCount,
  totalCount
}: CategoryFilterProps) {
  const hasActiveFilters = selectedCategory !== 'All' || selectedTag !== 'All';

  return (
    <div className="space-y-4">
      {/* Category Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Categories</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer px-3 py-1 text-xs transition-all duration-200 hover:shadow-md"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          </motion.div>
        ))}
      </div>

      {/* Tag Filters */}
      <div className="space-y-3 hidden">
        <h3 className="text-sm font-medium text-foreground">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer px-2 py-1 text-xs transition-all duration-200 hover:shadow-md"
                onClick={() => onTagChange(tag)}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-xs text-muted-foreground">
        {resultsCount} of {totalCount} items
      </div>
    </div>
  );
}