export function DropdownSelect({ className }: { className?: string }) {
    return (
        <div className={`overflow-hidden rounded-md bg-surface py-1 shadow-xl shadow-base ring-1 ring-border ${className}`}>
            <div className="px-3 py-2 bg-active text-lightest">Wade Cooper</div>
            <div className="px-3 py-2">Arlene Mccoy</div>
            <div className="px-3 py-2">Tom Cook</div>
            <div className="px-3 py-2">Devon Webb</div>
        </div>
    );
}