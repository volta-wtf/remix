import { MainSearchInput } from './MainSearchInput';
import { MainCategoryFilter } from './MainCategoryFilter';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
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

export function MainSearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedTag,
  onTagChange,
  tags,
  onClearFilters,
  resultsCount,
  totalCount
}: SearchAndFilterProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <MainSearchInput
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        placeholder="Search by name, description, or tags..."
      />

      {/* Category Filters */}
      <MainCategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        selectedTag={selectedTag}
        onTagChange={onTagChange}
        tags={tags}
        onClearFilters={onClearFilters}
        resultsCount={resultsCount}
        totalCount={totalCount}
      />
    </div>
  );
}