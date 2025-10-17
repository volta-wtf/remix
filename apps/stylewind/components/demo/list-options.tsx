export function ListOptions() {
    return (
        <div className="space-y-4">
            <div className="pointer-events-auto_ w-[21rem] rounded-card bg-surface p-4 text-[0.8125rem]/5 shadow-xl shadow-base hover:bg-slate-50 ring-2 ring-accent">
                <div className="flex justify-between">
                    <div className="font-medium text-default">Newsletter</div>
                    <svg className="size-5 flex-none fill-accent" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"></path>
                    </svg>
                </div>
                <div className="mt-1 text-subtle">Last message sent an hour ago</div>
                <div className="mt-6 font-medium text-default">621 users</div>
            </div>
            <div className="pointer-events-auto_ w-[21rem] rounded-card bg-surface p-4 text-[0.8125rem]/5 shadow-xl shadow-base hover:bg-slate-50 ring-1 ring-border">
                <div className="flex justify-between">
                    <div className="font-medium text-default">Existing customers</div>
                </div>
                <div className="mt-1 text-subtle">Last message sent an hour ago</div>
                <div className="mt-6 font-medium text-default">1200 users</div>
            </div>
        </div>
    );
}