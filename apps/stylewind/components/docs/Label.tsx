export const Label = ({ label, className = "" }: { label: string, className?: string }) => {
    return (
        <p className={`text-small text-muted ${className} mt-2`}>{label}</p>
    )
}
