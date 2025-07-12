"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/lib/icon"

interface PreviewTogglerProps {
  isPreviewOpen: boolean
  togglePreview: () => void
  className?: string
}

export const PreviewToggler = ({ isPreviewOpen, togglePreview, className }: PreviewTogglerProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`-ml-2 group hidden lg:inline-flex ${className} ${isPreviewOpen ? "flex" : "hidden"}`}
      onClick={togglePreview}
    >
      <span className="relative inline-block">
        { isPreviewOpen ?  <Icon.Back className=" md:hidden shrink-0 text-current" /> : "" }
        <Icon.RightPanel className="hidden md:inline-block shrink-0 text-current transition-opacity duration-150 group-hover:opacity-0" />
        <span className=" hidden md:inline-block absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {isPreviewOpen
            ? <Icon.CloseRightPanel className="shrink-0 text-current" />
            : <Icon.OpenRightPanel className="shrink-0 text-current" />
          }
        </span>
      </span>
    </Button>
  )
}