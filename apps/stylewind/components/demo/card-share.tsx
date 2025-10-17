export function CardShare() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="font-semibold leading-none tracking-tight">
                    Share this document
                </div>
                <div className="text-sm text-muted">
                    Anyone with the link can view this document.
                </div>
            </div>
            <div className="p-6 pt-0">
                <div className="flex space-x-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                        htmlFor="link"
                    >
                        Link
                    </label>
                    <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="link"
                        readOnly
                        defaultValue="http://example.com/link/to/document"
                    />
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0">
                        Copy Link
                    </button>
                </div>
                <div
                    data-orientation="horizontal"
                    role="none"
                    className="shrink-0 bg-border h-[1px] w-full my-4"
                />
                <div className="space-y-4">
                    <div className="text-sm font-medium">People with access</div>
                    <div className="grid gap-6">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                    <img
                                        className="aspect-square h-full w-full"
                                        alt="Image"
                                        src="/avatars/03.png"
                                    />
                                </span>
                                <div>
                                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                    <p className="text-sm text-muted">m@example.com</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                role="combobox"
                                aria-controls="radix-:R2dpqfkv9u6ja:"
                                aria-expanded="false"
                                aria-autocomplete="none"
                                dir="ltr"
                                data-state="closed"
                                className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ml-auto w-[110px]"
                                aria-label="Edit"
                            >
                                <span style={{ pointerEvents: "none" }}>Can edit</span>
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
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                    <img
                                        className="aspect-square h-full w-full"
                                        alt="Image"
                                        src="/avatars/05.png"
                                    />
                                </span>
                                <div>
                                    <p className="text-sm font-medium leading-none">
                                        Isabella Nguyen
                                    </p>
                                    <p className="text-sm text-muted">b@example.com</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                role="combobox"
                                aria-controls="radix-:R2lpqfkv9u6ja:"
                                aria-expanded="false"
                                aria-autocomplete="none"
                                dir="ltr"
                                data-state="closed"
                                className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ml-auto w-[110px]"
                                aria-label="Edit"
                            >
                                <span style={{ pointerEvents: "none" }}>Can view</span>
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
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                    <img
                                        className="aspect-square h-full w-full"
                                        alt="Image"
                                        src="/avatars/01.png"
                                    />
                                </span>
                                <div>
                                    <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                    <p className="text-sm text-muted">p@example.com</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                role="combobox"
                                aria-controls="radix-:R2tpqfkv9u6ja:"
                                aria-expanded="false"
                                aria-autocomplete="none"
                                dir="ltr"
                                data-state="closed"
                                className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ml-auto w-[110px]"
                                aria-label="Edit"
                            >
                                <span style={{ pointerEvents: "none" }}>Can view</span>
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
                </div>
            </div>
        </div>

    );
}