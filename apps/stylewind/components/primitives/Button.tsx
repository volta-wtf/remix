import { ReactNode } from "react";


interface ButtonProps {
    label?: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

function Button({ children, className, onClick }: ButtonProps) {
    return (
        <div className={`pointer-events-auto_ flex-none rounded-button px-2 py-[0.3125rem] font-medium text-subtle shadow-button ring-1 ring-button hover:bg-state-hover ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

Button.Filled = function ButtonFilled({ children, className, onClick }: ButtonProps) {
    return (
        <div className={`pointer-events-auto_ rounded-button px-3 py-2 text-[0.8125rem]/5 font-semibold text-lightest bg-primary hover:bg-primary-suble ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

Button.Tonal = function ButtonTonal({ children, className, onClick }: ButtonProps) {
    return (
        <div className={`pointer-events-auto_ rounded-button px-4 py-2 text-center font-medium shadow-sm ring-1 ring-border bg-button hover:bg-state-hover ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

Button.Surface = function ButtonSurface({ children, className, onClick }: ButtonProps) {
    return (
        <div className={`pointer-events-auto_ flex-none rounded-button px-2 py-[0.3125rem] font-medium text-subtle shadow-button ring-1 ring-button hover:bg-state-hover ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

Button.Segmented = function ButtonSegmented({ label, children, className, onClick }: ButtonProps) {
    return (
        <div className={`pointer-events-auto_ relative inline-flex rounded-button bg-surface text-[0.8125rem]/5 font-medium text-subtle shadow-button ring-1 ring-border hover:bg-slate-50 hover:text-default ${className}`}>
            <div className="flex px-3 py-2">
                {children}
            </div>
            <div className="border-l border-slate-400/20 px-2.5 py-2">{label}</div>
        </div>
    );
}
export { Button };
