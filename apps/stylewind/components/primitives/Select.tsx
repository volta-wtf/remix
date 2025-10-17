export function Select({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-between rounded-md bg-surface px-3 py-2 shadow-sm ring-1 ring-border ${className}`}>
            Tom Cook
            <svg className="size-5 flex-none fill-slate-400">
                <path d="M10 3a1 1 0 0 1 .707.293l3 3a1 1 0 0 1-1.414 1.414L10 5.414 7.707 7.707a1 1 0 0 1-1.414-1.414l3-3A1 1 0 0 1 10 3Zm-3.707 9.293a1 1 0 0 1 1.414 0L10 14.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414Z"></path>
            </svg>
        </div>
    );
}