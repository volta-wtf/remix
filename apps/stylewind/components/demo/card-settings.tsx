export function CardSettings() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold leading-none tracking-tight">
                    Cookie Settings
                </div>
                <div className="text-base text-muted">
                    Manage your cookie settings here.
                </div>
            </div>
            <div className="p-6 pt-0 grid gap-6">
                <div className="flex items-center justify-between space-x-4">
                    <label
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col space-y-1"
                        htmlFor="necessary"
                    >
                        <span>Strictly Necessary</span>
                        <span className="text-small font-normal leading-snug text-muted">
                            These cookies are essential in order to use the website and use its
                            features.
                        </span>
                    </label>
                    <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        data-state="checked"
                        value="on"
                        className="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                        id="necessary"
                        aria-label="Necessary"
                    >
                        <span
                            data-state="checked"
                            className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
                        />
                    </button>
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <label
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col space-y-1"
                        htmlFor="functional"
                    >
                        <span>Functional Cookies</span>
                        <span className="text-small font-normal leading-snug text-muted">
                            These cookies allow the website to provide personalized
                            functionality.
                        </span>
                    </label>
                    <button
                        type="button"
                        role="switch"
                        aria-checked="false"
                        data-state="unchecked"
                        value="on"
                        className="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                        id="functional"
                        aria-label="Functional"
                    >
                        <span
                            data-state="unchecked"
                            className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
                        />
                    </button>
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <label
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col space-y-1"
                        htmlFor="performance"
                    >
                        <span>Performance Cookies</span>
                        <span className="text-small font-normal leading-snug text-muted">
                            These cookies help to improve the performance of the website.
                        </span>
                    </label>
                    <button
                        type="button"
                        role="switch"
                        aria-checked="false"
                        data-state="unchecked"
                        value="on"
                        className="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                        id="performance"
                        aria-label="Performance"
                    >
                        <span
                            data-state="unchecked"
                            className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
                        />
                    </button>
                </div>
            </div>
            <div className="flex items-center p-6 pt-0">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full">
                    Save preferences
                </button>
            </div>
        </div>
    );
}