export function CardExercise() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold leading-none tracking-tight">
                    Exercise Minutes
                </div>
                <div className="text-base text-muted">
                    Your exercise minutes are ahead of where you normally are.
                </div>
            </div>
            <div className="p-6 pt-0 pb-4">
                <div
                    data-chart="chart-R1cqfkv9u6ja"
                    className="flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none w-full md:h-[200px]"
                >
                    <style
                        dangerouslySetInnerHTML={{
                            __html:
                                "\n [data-chart=chart-R1cqfkv9u6ja] {\n  --color-today: hsl(var(--primary));\n  --color-average: hsl(var(--primary));\n}\n\n\n.dark [data-chart=chart-R1cqfkv9u6ja] {\n  --color-today: hsl(var(--primary));\n  --color-average: hsl(var(--primary));\n}\n"
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
                                maxHeight: 200,
                                maxWidth: 555
                            }}
                        >
                            <svg
                                className="recharts-surface"
                                width={555}
                                height={200}
                                viewBox="0 0 555 200"
                                style={{ width: "100%", height: "100%" }}
                            >
                                <title />
                                <desc />
                                <defs>
                                    <clipPath id="recharts12-clip">
                                        <rect x={10} y={5} height={195} width={535} />
                                    </clipPath>
                                </defs>
                                <g className="recharts-layer recharts-line">
                                    <path
                                        strokeWidth={2}
                                        stroke="var(--color-average)"
                                        strokeOpacity="0.5"
                                        fill="none"
                                        width={535}
                                        height={195}
                                        className="recharts-curve recharts-line-curve"
                                        d="M10,122C39.722,128.5,69.444,135,99.167,141.5C128.889,148,158.611,161,188.333,161C218.056,161,247.778,145.79,277.5,145.79C307.222,145.79,336.944,163.145,366.667,163.145C396.389,163.145,426.111,158.595,455.833,153.395C485.556,148.195,515.278,140.07,545,131.945"
                                    />
                                    <g className="recharts-layer" />
                                    <g className="recharts-layer recharts-line-dots">
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-average)"
                                            strokeOpacity="0.5"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx={10}
                                            cy={122}
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-average)"
                                            strokeOpacity="0.5"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="99.16666666666667"
                                            cy="141.5"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-average)"
                                            strokeOpacity="0.5"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="188.33333333333334"
                                            cy={161}
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-average)"
                                            strokeOpacity="0.5"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="277.5"
                                            cy="145.79"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-average)"
                                            strokeOpacity="0.5"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="366.6666666666667"
                                            cy="163.14499999999998"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-average)"
                                            strokeOpacity="0.5"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="455.83333333333337"
                                            cy="153.39499999999998"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-average)"
                                            strokeOpacity="0.5"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx={545}
                                            cy="131.94500000000002"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                    </g>
                                </g>
                                <g className="recharts-layer recharts-line">
                                    <path
                                        strokeWidth={2}
                                        stroke="var(--color-today)"
                                        fill="none"
                                        width={535}
                                        height={195}
                                        className="recharts-curve recharts-line-curve"
                                        d="M10,153.2C39.722,163.047,69.444,172.895,99.167,172.895C128.889,172.895,158.611,8.9,188.333,8.9C218.056,8.9,247.778,123.95,277.5,123.95C307.222,123.95,336.944,106.4,366.667,106.4C396.389,106.4,426.111,125.9,455.833,125.9C485.556,125.9,515.278,121.025,545,116.15"
                                    />
                                    <g className="recharts-layer" />
                                    <g className="recharts-layer recharts-line-dots">
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-today)"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx={10}
                                            cy="153.2"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-today)"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="99.16666666666667"
                                            cy="172.89499999999998"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-today)"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="188.33333333333334"
                                            cy="8.900000000000004"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-today)"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="277.5"
                                            cy="123.95"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-today)"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="366.6666666666667"
                                            cy="106.4"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-today)"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx="455.83333333333337"
                                            cy="125.9"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                        <circle
                                            r={3}
                                            strokeWidth={2}
                                            stroke="var(--color-today)"
                                            fill="#fff"
                                            width={535}
                                            height={195}
                                            cx={545}
                                            cy="116.15000000000002"
                                            className="recharts-dot recharts-line-dot"
                                        />
                                    </g>
                                </g>
                            </svg>
                            <div
                                tabIndex={-1}
                                className="recharts-tooltip-wrapper recharts-tooltip-wrapper-right recharts-tooltip-wrapper-bottom"
                                style={{
                                    visibility: "hidden",
                                    pointerEvents: "none",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    transform: "translate(109.167px, 39.0049px)"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}