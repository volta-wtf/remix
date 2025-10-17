import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

function Card({ children }: CardProps) {
    return (
        <div className="-ui-card text-default bg-surface-card rounded-card ring-card shadow-card">
            {children}
        </div>
    );
}

Card.Header = function CardTitle({ children }: CardProps) {
    return (
        <div className="flex flex-col p-6 space-y-1">
            {children}
        </div>
    );
}

Card.Body = function CardContent({ children }: CardProps) {
    return (
        <div className="p-6 pt-0 grid gap-4">
            {children}
        </div>
    );
}

Card.Footer = function CardActions({ children }: CardProps) {
    return (
        <div className="flex items-center p-6 pt-0">
            {children}
        </div>
    );
}

export { Card };
