"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/lib/icon"

interface SearchTogglerProps {
  className?: string
}

export const SearchToggler = ({ className }: SearchTogglerProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`group md:hidden _md:inline-flex ${className}`}
    >
      <Icon.Search className="text-current" />
    </Button>
  )
}