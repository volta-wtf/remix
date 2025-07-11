"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/lib/icon"

interface PreviewTogglerProps {
  isPreviewOpen: boolean
  togglePreview: () => void
}

export const PreviewToggler = ({ isPreviewOpen, togglePreview }: PreviewTogglerProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="-ml-2 group"
      onClick={togglePreview}
    >
      <span className="relative inline-block">
        <Icon.RightPanel className=" shrink-0 text-current transition-opacity duration-150 group-hover:opacity-0" />
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {isPreviewOpen
            ? <Icon.CloseRightPanel className="shrink-0 text-current" />
            : <Icon.OpenRightPanel className="shrink-0 text-current" />
          }
        </span>
      </span>
    </Button>
  )
}