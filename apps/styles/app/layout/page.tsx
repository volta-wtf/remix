"use client"

import { cn } from "@/lib/utils"

import {
  AppLayout,
  AppHeader,
  AppContainer,
  AppSidebar,
  AppMain
} from '@/components/layout/AppLayout';

import { MainNavigation } from '@/components/layout/MainNavigation';
import { PreviewToggler } from '@/components/layout/PreviewToggler';
import { SearchInput } from '@/components/layout/SearchInput';
import { CategoryFilter } from '@/components/layout/CategoryFilter';

function StyleCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center min-w-20 bg-black/3 p-10", className)}>
      <p className="text-4xl font-bold">Aa</p>
    </div>
  )
}

function StylesGrid({ isPreviewOpen }: { isPreviewOpen: boolean }) {
  return (
    <div className={`grid ${isPreviewOpen ? "grid-cols-2" : "grid-cols-5"} gap-2`}>
      {Array.from({ length: 30 }).map((_, i) => (
        <StyleCard key={i} className="col-span-1" />
      ))}
    </div>
  )
}

function PreviewContent() {
  return (
    <div>
      preview content
    </div>
  )
}

export default function Page() {
  return (
    <AppLayout>

      <AppHeader isPreviewOpen={isPreviewOpen}>
        <SearchInput
          slot="content"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search..."
        />
        <PreviewToggler slot="actions" isPreviewOpen={isPreviewOpen} togglePreview={togglePreview} />
      </AppHeader>

      <AppContainer>

        <AppSidebar>
          <MainNavigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <div className="mt-8">
            <CategoryFilter
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
        </AppSidebar>

        <AppMain isPreviewOpen={isPreviewOpen}>
          <section slot="content">
            <StylesGrid isPreviewOpen={isPreviewOpen} />
          </section>
          <section slot="complement">
            <PreviewContent />
          </section>
        </AppMain>

      </AppContainer>

      <Toaster />
    </AppLayout>
  )
}
