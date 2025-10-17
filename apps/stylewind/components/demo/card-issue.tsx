export function CardIssue() {
    return (
        <div className="hidden xl:block">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="font-semibold leading-none tracking-tight">
                        Report an issue
                    </div>
                    <div className="text-base text-muted">
                        What area are you having problems with?
                    </div>
                </div>
                <div className="p-6 pt-0 grid gap-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="area-:Rtmfkv9u6ja:"
                            >
                                Area
                            </label>
                            <button
                                type="button"
                                role="combobox"
                                aria-controls="radix-:R9dtmfkv9u6ja:"
                                aria-expanded="false"
                                aria-autocomplete="none"
                                dir="ltr"
                                data-state="closed"
                                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                id="area-:Rtmfkv9u6ja:"
                                aria-label="Area"
                            >
                                <span style={{ pointerEvents: "none" }}>Billing</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                                    aria-hidden="true"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>
                        </div>
                        <div className="grid gap-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="security-level-:Rtmfkv9u6ja:"
                            >
                                Security Level
                            </label>
                            <button
                                type="button"
                                role="combobox"
                                aria-controls="radix-:Radtmfkv9u6ja:"
                                aria-expanded="false"
                                aria-autocomplete="none"
                                dir="ltr"
                                data-state="closed"
                                className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 line-clamp-1 w-full truncate"
                                id="security-level-:Rtmfkv9u6ja:"
                                aria-label="Security Level"
                            >
                                <span style={{ pointerEvents: "none" }}>Severity 2</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                                    aria-hidden="true"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="subject-:Rtmfkv9u6ja:"
                        >
                            Subject
                        </label>
                        <input
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            id="subject-:Rtmfkv9u6ja:"
                            placeholder="I need help with..."
                        />
                    </div>
                    <div className="grid gap-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="description-:Rtmfkv9u6ja:"
                        >
                            Description
                        </label>
                        <textarea
                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            id="description-:Rtmfkv9u6ja:"
                            placeholder="Please include all information relevant to your issue."
                            defaultValue={""}
                        />
                    </div>
                </div>
                <div className="flex items-center p-6 pt-0 justify-between space-x-2">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs">
                        Cancel
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}