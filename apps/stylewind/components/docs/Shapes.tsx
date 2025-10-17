import { styles } from "@/app/styles";

export const ShapeSwatch = ({ className }: { className: string }) => {
    return (
        <div className={styles.property}>
            <div className={`${styles.radiusSwatch}`} style={{ borderTopLeftRadius: `var(--radius-${className.replace('rounded-', '')})` }}></div>
            <div className={styles.label}>{className.replace('rounded-', '')}</div>
        </div>
    )
}
