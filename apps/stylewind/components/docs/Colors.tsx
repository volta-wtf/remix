import { styles } from "@/app/styles";

export const ColorPalette = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.colorPalette}>
            {children}
        </div>
    )
}

export const ColorTone = ({ className }: { className: string }) => {
    return (
        <div className={styles.colorTone} style={{ backgroundColor: `var(--color-${className})` }}></div>
    )
}
export const ColorSwatch = ({ className }: { className: string }) => {
    return (
        <div className={styles.property}>
            <div className={styles.colorSwatch} style={{ backgroundColor: `var(--color-${className})` }}></div>
            <div className={styles.label}>{className.replace('-500', '')}</div>
        </div>
    )
}

export const TintSwatch = ({ className }: { className: string }) => {
    return (
        <div className={styles.property}>
            <div className={`${styles.colorSwatch} ${className}`} style={{ backgroundColor: `var(--tint-${className})` }}></div>
            <div className={styles.label}>tint-{className.replace('bg-', '')}</div>
        </div>
    )
}

export const TonalPalette = ({ color }: { color: string }) => {
    return (
        <div className={styles.colorPalette}>
            <ColorTone className={`${color}-50`} />
            <ColorTone className={`${color}-100`} />
            <ColorTone className={`${color}-200`} />
            <ColorTone className={`${color}-300`} />
            <ColorTone className={`${color}-400`} />
            <ColorTone className={`${color}-500`} />
            <ColorTone className={`${color}-600`} />
            <ColorTone className={`${color}-700`} />
            <ColorTone className={`${color}-800`} />
            <ColorTone className={`${color}-900`} />
            <ColorTone className={`${color}-950`} />
        </div>
    )
}
