export function CardCalendar() {
    return (
        <div className="w-full rounded-card border-card ring ring-card bg-card shadow-card max-w-[260px]">
            <div className="p-1">
                <div className="rdp p-3">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
                        <div className="space-y-4 rdp-caption_start rdp-caption_end">
                            <div className="flex justify-center pt-1 relative items-center">
                                <div
                                    className="text-sm font-medium"
                                    aria-live="polite"
                                    role="presentation"
                                    id="react-day-picker-2"
                                >
                                    June 2023
                                </div>
                                <div className="space-x-1 flex items-center">
                                    <button
                                        aria-label="Go to previous month"
                                        className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
                                        type="button"
                                        name="previous-month"
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
                                            className="lucide lucide-chevron-left h-4 w-4 rdp-nav_icon"
                                        >
                                            <path d="m15 18-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <button
                                        aria-label="Go to next month"
                                        className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
                                        type="button"
                                        name="next-month"
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
                                            className="lucide lucide-chevron-right h-4 w-4 rdp-nav_icon"
                                        >
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <table
                                className="w-full border-collapse space-y-1"
                                role="grid"
                                aria-labelledby="react-day-picker-2"
                            >
                                <thead className="rdp-head">
                                    <tr className="flex">
                                        <th
                                            scope="col"
                                            className="text-muted rounded-md w-8 font-normal text-[0.8rem]"
                                            aria-label="Sunday"
                                        >
                                            Su
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-muted rounded-md w-8 font-normal text-[0.8rem]"
                                            aria-label="Monday"
                                        >
                                            Mo
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-muted rounded-md w-8 font-normal text-[0.8rem]"
                                            aria-label="Tuesday"
                                        >
                                            Tu
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-muted rounded-md w-8 font-normal text-[0.8rem]"
                                            aria-label="Wednesday"
                                        >
                                            We
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-muted rounded-md w-8 font-normal text-[0.8rem]"
                                            aria-label="Thursday"
                                        >
                                            Th
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-muted rounded-md w-8 font-normal text-[0.8rem]"
                                            aria-label="Friday"
                                        >
                                            Fr
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-muted rounded-md w-8 font-normal text-[0.8rem]"
                                            aria-label="Saturday"
                                        >
                                            Sa
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="rdp-tbody">
                                    <tr className="flex w-full mt-2">
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 day-outside text-muted aria-selected:bg-accent/50 aria-selected:text-muted"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                28
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 day-outside text-muted aria-selected:bg-accent/50 aria-selected:text-muted"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                29
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 day-outside text-muted aria-selected:bg-accent/50 aria-selected:text-muted"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                30
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 day-outside text-muted aria-selected:bg-accent/50 aria-selected:text-muted"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                31
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                1
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                2
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                3
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="flex w-full mt-2">
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                4
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground day-range-start"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={0}
                                                type="button"
                                                name="day"
                                            >
                                                5
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                6
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                7
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                8
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                9
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                10
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="flex w-full mt-2">
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                11
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                12
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground day-range-end"
                                                role="gridcell"
                                                aria-selected="true"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                13
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                14
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                15
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                16
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                17
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="flex w-full mt-2">
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                18
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                19
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                20
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                21
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                22
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                23
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                24
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="flex w-full mt-2">
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                25
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                26
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                27
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                28
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                29
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                30
                                            </button>
                                        </td>
                                        <td
                                            className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                                            role="presentation"
                                        >
                                            <button
                                                className="rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 day-outside text-muted aria-selected:bg-accent/50 aria-selected:text-muted"
                                                role="gridcell"
                                                tabIndex={-1}
                                                type="button"
                                                name="day"
                                            >
                                                1
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}