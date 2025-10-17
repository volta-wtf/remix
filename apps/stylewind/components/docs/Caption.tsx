export const Caption = ({ label, className = "" }: { label: string, className?: string }) => {
    return (
        <h3 className={`text-label text-accent ${className} mb-2 mt-8`}>{label}</h3>
    )
}
