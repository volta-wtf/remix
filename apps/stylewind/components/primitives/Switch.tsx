"use client";

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
}

function Switch({ checked = false, onChange, className = "" }: SwitchProps) {
    return (
        <div
            className={`pointer-events-auto_ h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out ${checked ? 'bg-active' : 'bg-track'} ring-outline ${className}`}
            onClick={() => onChange?.(!checked)}
        >
            <div className={`size-4 rounded-full bg-surface shadow-sm ring-1 ${checked ? 'ring-border translate-x-4' : 'ring-outline'} transition duration-200 ease-in-out`}></div>
        </div>
    );
}

export { Switch };