import Image from "next/image";

export const Avatar = ({ src, className = "" }: { src: string, className?: string }) => {
    return (
        <Image src={src} alt="" className={`size-10 flex-none rounded-avatar ${className}`} />
    )
}
