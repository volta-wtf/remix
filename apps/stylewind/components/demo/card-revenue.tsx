interface CardRevenueProps {
    amount: string;
    percentage: number;
}

export function ChartRevenue() {
    return (
        <svg
            className="recharts-surface"
            width={307}
            height={80}
            viewBox="0 0 307 80"
            style={{ width: "100%", height: "100%" }}
        >
            <title />
            <desc />
            <defs>
                <clipPath id="recharts97-clip">
                    <rect x={10} y={5} height={75} width={287} />
                </clipPath>
            </defs>
            <g className="recharts-layer recharts-line">
                <path
                    strokeWidth={2}
                    stroke="var(--color-revenue)"
                    fill="none"
                    width={287}
                    height={75}
                    className="recharts-curve recharts-line-curve stroke-accent"
                    strokeDasharray="310.112548828125px 0px"
                    d="M10,52.143C23.667,46.779,37.333,41.415,51,41.415C64.667,41.415,78.333,52.679,92,54.821C105.667,56.964,119.333,56.964,133,58.036C146.667,59.107,160.333,61.25,174,61.25C187.667,61.25,201.333,56.18,215,54.286C228.667,52.391,242.333,52.818,256,49.882C269.667,46.946,283.333,28.016,297,9.085"
                />
                <g className="recharts-layer" />
                <g className="recharts-layer recharts-line-dots">
                    <circle
                        r={3}
                        strokeWidth={2}
                        stroke="var(--color-revenue)"
                        fill="#fff"
                        width={287}
                        height={75}
                        cx={10}
                        cy="52.14285714285714"
                        className="recharts-dot recharts-line-dot stroke-accent"
                    />
                    <circle
                        r={3}
                        strokeWidth={2}
                        stroke="var(--color-revenue)"
                        fill="#fff"
                        width={287}
                        height={75}
                        cx={51}
                        cy="41.41517857142857"
                        className="recharts-dot recharts-line-dot stroke-accent"
                    />
                    <circle
                        r={3}
                        strokeWidth={2}
                        stroke="var(--color-revenue)"
                        fill="#fff"
                        width={287}
                        height={75}
                        cx={92}
                        cy="54.821428571428584"
                        className="recharts-dot recharts-line-dot stroke-accent"
                    />
                    <circle
                        r={3}
                        strokeWidth={2}
                        stroke="var(--color-revenue)"
                        fill="#fff"
                        width={287}
                        height={75}
                        cx={133}
                        cy="58.035714285714285"
                        className="recharts-dot recharts-line-dot stroke-accent"
                    />
                    <circle
                        r={3}
                        strokeWidth={2}
                        stroke="var(--color-revenue)"
                        fill="#fff"
                        width={287}
                        height={75}
                        cx={174}
                        cy="61.25"
                        className="recharts-dot recharts-line-dot stroke-accent"
                    />
                    <circle
                        r={3}
                        strokeWidth={2}
                        stroke="var(--color-revenue)"
                        fill="#fff"
                        width={287}
                        height={75}
                        cx={215}
                        cy="54.285714285714285"
                        className="recharts-dot recharts-line-dot stroke-accent"
                    />
                    <circle
                        r={3}
                        strokeWidth={2}
                        stroke="var(--color-revenue)"
                        fill="#fff"
                        width={287}
                        height={75}
                        cx={256}
                        cy="49.88214285714285"
                        className="recharts-dot recharts-line-dot stroke-accent"
                    />
                    <circle
                        r={3}
                        strokeWidth={2}
                        stroke="var(--color-revenue)"
                        fill="#fff"
                        width={287}
                        height={75}
                        cx={297}
                        cy="9.08482142857143"
                        className="recharts-dot recharts-line-dot stroke-accent"
                    />
                </g>
            </g>
        </svg>
    );
}

export function CardRevenue({ amount, percentage }: CardRevenueProps) {
    return (
        <div className="rounded-card ring ring-card bg-card shadow-card grow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="tracking-tight text-caption font-normal">Total Revenue</div>
            </div>
            <div className="p-6 pt-0 pb-0">
                <div className="text-title font-bold font-digit">{amount}</div>
                <p className="text-small text-muted">
                    {percentage >= 0 ? "+" : ""}{percentage}% from last month
                </p>
                <div
                    data-chart="chart-rmt"
                    className="flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none h-[80px] w-full"
                >
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                [data-chart=chart-rmt] {
                                    --color-revenue: hsl(var(--primary));
                                    --color-subscription: hsl(var(--primary));
                                }
                                .dark [data-chart=chart-rmt] {
                                    --color-revenue: hsl(var(--primary));
                                    --color-subscription: hsl(var(--primary));
                                }
                            `
                        }}
                    />
                    <div className="recharts-responsive-container" style={{ width: "100%", height: "100%", minWidth: 0 }}>
                        <div
                            className="recharts-wrapper"
                            style={{
                                position: "relative",
                                cursor: "default",
                                width: "100%",
                                height: "100%",
                                maxHeight: 80,
                                maxWidth: 307
                            }}
                        >
                            <ChartRevenue />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}