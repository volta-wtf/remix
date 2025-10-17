
export function Field({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={`pointer-events-auto_ text-[0.8125rem]/5 text-subtle ${className}`}>
            {children}
        </div>
    );
}