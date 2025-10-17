export const Label = ({ text, className = "", children }: { text?: string, className?: string, children?: React.ReactNode }) => {
    return (
        <p className={`font-semibold text-default ${className}`}>
            {text}
            {children}
        </p>
    )
}
