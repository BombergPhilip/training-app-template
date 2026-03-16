"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function MenuItem({ icon, title, path }: { icon: React.ReactNode, title: string, path: string }) {
    const pathname = usePathname()

    return (
        <Link href={path}>
            <div className={`flex gap-2 items-center px-4 py-3 rounded-lg cursor-pointer  ${pathname === path ? "text-blue-600 bg-blue-50" : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"}`}>
                {icon}
                <span>{title}</span>
            </div>
        </Link>
    );
}