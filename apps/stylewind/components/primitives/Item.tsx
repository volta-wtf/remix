import { ReactNode } from "react";

interface ItemProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

function Item({ children, className, onClick }: ItemProps) {
    return (
        <div className={`flex p-4 gap-4 ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

Item.List = function ItemList({ children, className, onClick }: ItemProps) {
    return (
        <div className={`flex items-center p-4 gap-4 ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

Item.Grid = function ItemGrid({ children, className, onClick }: ItemProps) {
    return (
        <div className={`flex flex-col p-4 gap-4 ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}


export { Item };
