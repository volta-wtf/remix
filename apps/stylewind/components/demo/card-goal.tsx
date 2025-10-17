export function CardGoal() {
    return (
        <div className="w-full rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <div className="font-semibold leading-none tracking-tight">Move Goal</div>
                <div className="text-base text-muted">
                    Set your daily activity goal.
                </div>
            </div>
            <div className="p-6 pt-0 pb-2">
                <div className="flex items-center justify-center space-x-2">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full">
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
                            className="lucide lucide-minus"
                        >
                            <path d="M5 12h14" />
                        </svg>
                        <span className="sr-only">Decrease</span>
                    </button>
                    <div className="flex-1 text-center">
                        <div className="text-5xl font-bold tracking-tighter">350</div>
                        <div className="text-[0.70rem] uppercase text-muted">
                            Calories/day
                        </div>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full">
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
                        <span className="sr-only">Increase</span>
                    </button>
                </div>
                <div className="my-3 h-[60px]">
                    <div
                        data-chart="chart-R58qfkv9u6ja"
                        className="flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none aspect-auto h-full w-full"
                    >
                        <style
                            dangerouslySetInnerHTML={{
                                __html:
                                    "\n [data-chart=chart-R58qfkv9u6ja] {\n  --color-goal: hsl(var(--primary));\n}\n\n\n.dark [data-chart=chart-R58qfkv9u6ja] {\n  --color-goal: hsl(var(--primary));\n}\n"
                            }}
                        />
                        <div
                            className="recharts-responsive-container"
                            style={{ width: "100%", height: "100%", minWidth: 0 }}
                        >
                            <div
                                className="recharts-wrapper"
                                style={{
                                    position: "relative",
                                    cursor: "default",
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: 60,
                                    maxWidth: 279
                                }}
                            >
                                <svg
                                    className="recharts-surface"
                                    width={279}
                                    height={60}
                                    viewBox="0 0 279 60"
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <title />
                                    <desc />
                                    <defs>
                                        <clipPath id="recharts9-clip">
                                            <rect x={5} y={5} height={50} width={269} />
                                        </clipPath>
                                    </defs>
                                    <g className="recharts-layer recharts-bar">
                                        <g className="recharts-layer recharts-bar-rectangles">
                                            <g className="recharts-layer">
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="7.069230769230769"
                                                        y={5}
                                                        width={16}
                                                        height={50}
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 7.069230769230769,9
      A 4,4,0,0,1,11.069230769230769,5
      L 19.06923076923077,5
      A 4,4,0,0,1,23.06923076923077,9
      L 23.06923076923077,51
      A 4,4,0,0,1,19.06923076923077,55
      L 11.069230769230769,55
      A 4,4,0,0,1,7.069230769230769,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="27.761538461538464"
                                                        y="17.5"
                                                        width={16}
                                                        height="37.5"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 27.761538461538464,21.5
      A 4,4,0,0,1,31.761538461538464,17.5
      L 39.761538461538464,17.5
      A 4,4,0,0,1,43.761538461538464,21.5
      L 43.761538461538464,51
      A 4,4,0,0,1,39.761538461538464,55
      L 31.761538461538464,55
      A 4,4,0,0,1,27.761538461538464,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="48.45384615384616"
                                                        y={30}
                                                        width={16}
                                                        height={25}
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 48.45384615384616,34
      A 4,4,0,0,1,52.45384615384616,30
      L 60.45384615384616,30
      A 4,4,0,0,1,64.45384615384616,34
      L 64.45384615384616,51
      A 4,4,0,0,1,60.45384615384616,55
      L 52.45384615384616,55
      A 4,4,0,0,1,48.45384615384616,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="69.14615384615385"
                                                        y="17.5"
                                                        width={16}
                                                        height="37.5"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 69.14615384615385,21.5
      A 4,4,0,0,1,73.14615384615385,17.5
      L 81.14615384615385,17.5
      A 4,4,0,0,1,85.14615384615385,21.5
      L 85.14615384615385,51
      A 4,4,0,0,1,81.14615384615385,55
      L 73.14615384615385,55
      A 4,4,0,0,1,69.14615384615385,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="89.83846153846154"
                                                        y={30}
                                                        width={16}
                                                        height={25}
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 89.83846153846154,34
      A 4,4,0,0,1,93.83846153846154,30
      L 101.83846153846154,30
      A 4,4,0,0,1,105.83846153846154,34
      L 105.83846153846154,51
      A 4,4,0,0,1,101.83846153846154,55
      L 93.83846153846154,55
      A 4,4,0,0,1,89.83846153846154,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="110.53076923076924"
                                                        y="20.25"
                                                        width={16}
                                                        height="34.75"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 110.53076923076924,24.25
      A 4,4,0,0,1,114.53076923076924,20.25
      L 122.53076923076924,20.25
      A 4,4,0,0,1,126.53076923076924,24.25
      L 126.53076923076924,51
      A 4,4,0,0,1,122.53076923076924,55
      L 114.53076923076924,55
      A 4,4,0,0,1,110.53076923076924,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="131.22307692307692"
                                                        y="31.375000000000004"
                                                        width={16}
                                                        height="23.624999999999996"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 131.22307692307692,35.375
      A 4,4,0,0,1,135.22307692307692,31.375000000000004
      L 143.22307692307692,31.375000000000004
      A 4,4,0,0,1,147.22307692307692,35.375
      L 147.22307692307692,51
      A 4,4,0,0,1,143.22307692307692,55
      L 135.22307692307692,55
      A 4,4,0,0,1,131.22307692307692,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="151.91538461538462"
                                                        y="25.125"
                                                        width={16}
                                                        height="29.875"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 151.91538461538462,29.125
      A 4,4,0,0,1,155.91538461538462,25.125
      L 163.91538461538462,25.125
      A 4,4,0,0,1,167.91538461538462,29.125
      L 167.91538461538462,51
      A 4,4,0,0,1,163.91538461538462,55
      L 155.91538461538462,55
      A 4,4,0,0,1,151.91538461538462,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="172.6076923076923"
                                                        y="17.5"
                                                        width={16}
                                                        height="37.5"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 172.6076923076923,21.5
      A 4,4,0,0,1,176.6076923076923,17.5
      L 184.6076923076923,17.5
      A 4,4,0,0,1,188.6076923076923,21.5
      L 188.6076923076923,51
      A 4,4,0,0,1,184.6076923076923,55
      L 176.6076923076923,55
      A 4,4,0,0,1,172.6076923076923,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="193.29999999999998"
                                                        y={30}
                                                        width={16}
                                                        height={25}
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 193.29999999999998,34
      A 4,4,0,0,1,197.29999999999998,30
      L 205.29999999999998,30
      A 4,4,0,0,1,209.29999999999998,34
      L 209.29999999999998,51
      A 4,4,0,0,1,205.29999999999998,55
      L 197.29999999999998,55
      A 4,4,0,0,1,193.29999999999998,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="213.9923076923077"
                                                        y="20.25"
                                                        width={16}
                                                        height="34.75"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 213.9923076923077,24.25
      A 4,4,0,0,1,217.9923076923077,20.25
      L 225.9923076923077,20.25
      A 4,4,0,0,1,229.9923076923077,24.25
      L 229.9923076923077,51
      A 4,4,0,0,1,225.9923076923077,55
      L 217.9923076923077,55
      A 4,4,0,0,1,213.9923076923077,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="234.6846153846154"
                                                        y="31.375000000000004"
                                                        width={16}
                                                        height="23.624999999999996"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 234.6846153846154,35.375
      A 4,4,0,0,1,238.6846153846154,31.375000000000004
      L 246.6846153846154,31.375000000000004
      A 4,4,0,0,1,250.6846153846154,35.375
      L 250.6846153846154,51
      A 4,4,0,0,1,246.6846153846154,55
      L 238.6846153846154,55
      A 4,4,0,0,1,234.6846153846154,51 Z"
                                                    />
                                                </g>
                                                <g className="recharts-layer recharts-bar-rectangle">
                                                    <path
                                                        x="255.37692307692308"
                                                        y="11.374999999999998"
                                                        width={16}
                                                        height="43.625"
                                                        radius={4}
                                                        fill="var(--color-goal)"
                                                        className="recharts-rectangle"
                                                        d="M 255.37692307692308,15.374999999999998
      A 4,4,0,0,1,259.37692307692305,11.374999999999998
      L 267.37692307692305,11.374999999999998
      A 4,4,0,0,1,271.37692307692305,15.374999999999998
      L 271.37692307692305,51
      A 4,4,0,0,1,267.37692307692305,55
      L 259.37692307692305,55
      A 4,4,0,0,1,255.37692307692308,51 Z"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                        <g className="recharts-layer" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center p-6 pt-0">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
                    Set Goal
                </button>
            </div>
        </div>

    );
}