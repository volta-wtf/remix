interface SummaryProps {
    label: string;
    className?: string;
}

interface GroupProps {
    children: React.ReactNode;
    className?: string;
    [key: string]: any; // Para permitir otras props
}

interface DetailsProps {
    label: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: any; // Para permitir otras props
}

export const Summary = ({ label, className = "" }: SummaryProps) => {
    return (
        <summary className={`text-label text-color-accented ${className} my-2`}>{label}</summary>
    )
}

export const Group = ({ children, className = "", ...props }: GroupProps) => {
    return (
        <div className={`flex flex-col gap-2 pl-5 pb-4 ${className}`} {...props}>
            {children}
        </div>
    )
}

export const Details = ({ label, children, className = "", ...props }: DetailsProps) => {
    return (
        <details
            id={label.toLowerCase().replace(/\s+/g, '-')}
            className={className}
            {...props}
        >
            {children}
        </details>
    )
}
export const Disclosure = ({ label, children, className = "", ...props }: DetailsProps) => {
    return (
        <Details
            label={label}
            className={className}
            {...props}
        >
            <Summary label={label} />
            <Group>
                {children}
            </Group>
        </Details>
    )
}
