export function FormToggle() {
    return (
        <div className="pointer-events-auto_ rounded-button flex divide-x divide-slate-400/20 overflow-hidden rounded-control bg-surface text-[0.8125rem]/5 font-medium text-subtle shadow-button ring-1 ring-border">
            <div className="px-4 py-2 hover:bg-slate-50 hover:text-default">Years</div>
            <div className="px-4 py-2 hover:bg-slate-50 hover:text-default">Months</div>
            <div className="px-4 py-2 hover:bg-slate-50 hover:text-default">Days</div>
        </div>
    );
}