export function CardTeam() {
    return (
        <div className="w-full rounded-xl border bg-card text-default shadow">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold leading-none tracking-tight">
                    Team Members
                </div>
                <div className="text-base text-muted">
                    Invite your team members to collaborate.
                </div>
            </div>
            <div className="p-6 pt-0 grid gap-6">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                            <img
                                className="aspect-square h-full w-full"
                                alt="Image"
                                src="/avatars/01.png"
                            />
                        </span>
                        <div>
                            <p className="text-base font-medium leading-none">Sofia Davis</p>
                            <p className="text-base text-muted">m@example.com</p>
                        </div>
                    </div>
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-button-xs ml-auto"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:R16bmfkv9u6ja:"
                        data-state="closed"
                    >
                        Owner{" "}
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
                            className="lucide lucide-chevron-down text-muted"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                            <img
                                className="aspect-square h-full w-full"
                                alt="Image"
                                src="/avatars/02.png"
                            />
                        </span>
                        <div>
                            <p className="text-base font-medium leading-none">Jackson Lee</p>
                            <p className="text-base text-muted">p@example.com</p>
                        </div>
                    </div>
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-button-xs ml-auto"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:R1abmfkv9u6ja:"
                        data-state="closed"
                    >
                        Member{" "}
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
                            className="lucide lucide-chevron-down text-muted"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                            <img
                                className="aspect-square h-full w-full"
                                alt="Image"
                                src="/avatars/03.png"
                            />
                        </span>
                        <div>
                            <p className="text-base font-medium leading-none">Isabella Nguyen</p>
                            <p className="text-base text-muted">i@example.com</p>
                        </div>
                    </div>
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-button-xs ml-auto"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:R1ebmfkv9u6ja:"
                        data-state="closed"
                    >
                        Member{" "}
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
                            className="lucide lucide-chevron-down text-muted"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}