export const Popover = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
    return (
        <div className={`divide-y-card text-[0.8125rem]/5 text-default bg-popover rounded-popover ring-card shadow-popover  ${className}`}>
            {children}
        </div>
    )
}
