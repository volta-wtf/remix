interface PropertyProps {
    label: string;
    className?: string;
}

export const Property = ({ label, className = "" }: PropertyProps) => {
    return (
        <summary className={`text-label text-accent ${className} my-2`}>{label}</summary>
    )
}
