import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  className?: string
}

export const ScrollProgress = ({ className }: ScrollProgressProps) => {
  return (
    <div className={cn("w-full h-px bg-primary/10", className)}>
    </div>
  )
}