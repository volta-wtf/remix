import { Switch } from "@/components/primitives/Switch";

export function CardOptions() {
    return (
        <div className="-mr-[4.625rem] w-[30.25rem] rounded-md bg-surface p-4 shadow-xl shadow-base ring-1 ring-border">
            <div className="text-[0.8125rem]/5 font-semibold text-default">Account</div>
            <div className="mt-2 text-[0.8125rem]/5 text-slate-500">Manage how information is displayed on your account.</div>
            <div className="mt-4 text-[0.8125rem]/6 text-default">
                <div className="flex items-center border-t border-slate-400/20 py-3">
                    <span className="w-2/5 flex-none">Language</span>
                    <span className="">English</span>
                    <span className="pointer-events-auto_ ml-auto font-medium text-indigo-600 hover:text-indigo-500">Update</span>
                </div>
                <div className="flex items-center border-t border-slate-400/20 py-3">
                    <span className="w-2/5 flex-none">Date format</span>
                    <span className="">DD-MM-YYYY</span>
                    <span className="ml-auto flex items-center font-medium text-indigo-600"><span className="pointer-events-auto_ hover:text-indigo-500">Update</span>
                    <span className="mx-3 h-6 w-px bg-slate-400/20"></span><span className="pointer-events-auto_ hover:text-indigo-500">Remove</span></span>
                </div>
                <div className="flex items-center border-t border-slate-400/20 py-3">
                    <span>Automatic timezone</span>
                    <span className="ml-auto">
                        <Switch checked={true} />
                    </span>
                </div>
                <div className="flex items-center border-t border-slate-400/20 pt-3">
                    <span>Auto-update applicant data</span>
                    <span className="ml-auto">
                        <Switch />
                    </span>
                </div>
            </div>
        </div>
    );
}