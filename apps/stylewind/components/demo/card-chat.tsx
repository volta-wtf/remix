export function CardChat() {
    return (
        <div className="w-full rounded-xl border bg-card text-card-foreground shadow">
            <div className="space-y-1.5 p-6 flex flex-row items-center">
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
                        <p className="text-sm text-muted">m@example.com</p>
                    </div>
                </div>
                <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 ml-auto rounded-full"
                    data-state="closed"
                >
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
                        className="lucide lucide-plus"
                    >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                    <span className="sr-only">New message</span>
                </button>
            </div>
            <div className="p-6 pt-0">
                <div className="space-y-4">
                    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-base bg-variant">
                        Hi, how can I help you today?
                    </div>
                    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-base ml-auto bg-primary text-lightest">
                        Hey, I'm having trouble with my account.
                    </div>
                    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-base bg-variant">
                        What seems to be the problem?
                    </div>
                    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-base ml-auto bg-primary text-lightest">
                        I can't log in.
                    </div>
                </div>
            </div>
            <div className="flex items-center p-6 pt-0">
                <form className="flex w-full items-center space-x-2">
                    <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
                        id="message"
                        placeholder="Type your message..."
                        autoComplete="off"
                        defaultValue=""
                    />
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
                        type="submit"
                        disabled
                    >
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
                            className="lucide lucide-send"
                        >
                            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                            <path d="m21.854 2.147-10.94 10.939" />
                        </svg>
                        <span className="sr-only">Send</span>
                    </button>
                </form>
            </div>
        </div>
    );
}