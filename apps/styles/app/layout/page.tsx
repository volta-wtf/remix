"use client"

import { useState } from "react"
import { Toaster } from 'sonner'

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

export default function LayoutPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <AppLayout>
      <AppHeader isPreviewOpen={isPreviewOpen}>
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search..."
        />
        <PreviewToggler
          isPreviewOpen={isPreviewOpen}
          togglePreview={() => setIsPreviewOpen(!isPreviewOpen)}
        />
      </AppHeader>

      <AppContainer>
        <AppSidebar>
          <MainNavigation
            activeSection="layout"
            onSectionChange={() => {}}
          />
          <div className="mt-8">
            <CategoryFilter
              selectedCategory="All"
              onCategoryChange={() => {}}
              categories={['All', 'Text', 'Background']}
              selectedTag="All"
              onTagChange={() => {}}
              tags={['All', 'Modern', 'Classic']}
              onClearFilters={() => {}}
              resultsCount={0}
              totalCount={0}
            />
          </div>
        </AppSidebar>

        <AppMain isPreviewOpen={isPreviewOpen}>
          <section>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Layout Demo</h2>
              <p className="text-muted-foreground">
                Esta es una demostración básica de la estructura del layout.
              </p>
            </div>
          </section>

          {isPreviewOpen && (
            <section>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Preview Panel</h3>
                <p className="text-muted-foreground">
                  Aquí aparecería el contenido del preview.
                </p>
              </div>
            </section>
          )}
        </AppMain>
      </AppContainer>

      <Toaster />
    </AppLayout>
  )
}
