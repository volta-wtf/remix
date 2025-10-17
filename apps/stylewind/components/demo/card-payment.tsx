export function CardPayment() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold tracking-tight text-xl">Payments</div>
                <div className="text-base text-muted">Manage your payments.</div>
            </div>
            <div className="p-6 pt-0">
                <div className="mb-4 flex items-center gap-4">
                    <input
                        className="flex h-9 w-full rounded-md border border-input bg-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm max-w-sm"
                        placeholder="Filter emails..."
                        defaultValue=""
                    />
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 ml-auto"
                        type="button"
                        id="radix-:R4pafkv9u6ja:"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                    >
                        Columns{" "}
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
                            className="lucide lucide-chevron-down"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                </div>
                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            type="button"
                                            role="checkbox"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            aria-label="Select all"
                                        />
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        Status
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                            Email
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
                                                className="lucide lucide-arrow-up-down"
                                            >
                                                <path d="m21 16-4 4-4-4" />
                                                <path d="M17 20V4" />
                                                <path d="m3 8 4-4 4 4" />
                                                <path d="M7 4v16" />
                                            </svg>
                                        </button>
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="text-right">Amount</div>
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3" />
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                <tr
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    data-state="false"
                                >
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            type="button"
                                            role="checkbox"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            aria-label="Select row"
                                        />
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="capitalize">success</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="lowercase">ken99@yahoo.com</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="text-right font-medium">$316.00</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                                            type="button"
                                            id="radix-:Rad9afkv9u6ja:"
                                            aria-haspopup="menu"
                                            aria-expanded="false"
                                            data-state="closed"
                                        >
                                            <span className="sr-only">Open menu</span>
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
                                                className="lucide lucide-ellipsis"
                                            >
                                                <circle cx={12} cy={12} r={1} />
                                                <circle cx={19} cy={12} r={1} />
                                                <circle cx={5} cy={12} r={1} />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    data-state="false"
                                >
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            type="button"
                                            role="checkbox"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            aria-label="Select row"
                                        />
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="capitalize">success</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="lowercase">Abe45@gmail.com</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="text-right font-medium">$242.00</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                                            type="button"
                                            id="radix-:Ral9afkv9u6ja:"
                                            aria-haspopup="menu"
                                            aria-expanded="false"
                                            data-state="closed"
                                        >
                                            <span className="sr-only">Open menu</span>
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
                                                className="lucide lucide-ellipsis"
                                            >
                                                <circle cx={12} cy={12} r={1} />
                                                <circle cx={19} cy={12} r={1} />
                                                <circle cx={5} cy={12} r={1} />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    data-state="false"
                                >
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            type="button"
                                            role="checkbox"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            aria-label="Select row"
                                        />
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="capitalize">processing</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="lowercase">Monserrat44@gmail.com</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="text-right font-medium">$837.00</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                                            type="button"
                                            id="radix-:Rat9afkv9u6ja:"
                                            aria-haspopup="menu"
                                            aria-expanded="false"
                                            data-state="closed"
                                        >
                                            <span className="sr-only">Open menu</span>
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
                                                className="lucide lucide-ellipsis"
                                            >
                                                <circle cx={12} cy={12} r={1} />
                                                <circle cx={19} cy={12} r={1} />
                                                <circle cx={5} cy={12} r={1} />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    data-state="false"
                                >
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            type="button"
                                            role="checkbox"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            aria-label="Select row"
                                        />
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="capitalize">failed</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="lowercase">carmella@hotmail.com</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <div className="text-right font-medium">$721.00</div>
                                    </td>
                                    <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pl-3">
                                        <button
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                                            type="button"
                                            id="radix-:Rb59afkv9u6ja:"
                                            aria-haspopup="menu"
                                            aria-expanded="false"
                                            data-state="closed"
                                        >
                                            <span className="sr-only">Open menu</span>
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
                                                className="lucide lucide-ellipsis"
                                            >
                                                <circle cx={12} cy={12} r={1} />
                                                <circle cx={19} cy={12} r={1} />
                                                <circle cx={5} cy={12} r={1} />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex items-center justify-end space-x-2 pt-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        0{/* */} of{/* */} {/* */}4{/* */} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
                            disabled
                        >
                            Previous
                        </button>
                        <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
                            disabled
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}