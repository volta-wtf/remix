"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/lib/icon"

interface MenuTogglerProps {
  className?: string
}

export const MenuToggler = ({ className }: MenuTogglerProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`group xl:hidden _md:inline-flex ${className}`}
    >
      <Icon.Menu className="text-current" />
    </Button>
  )
}