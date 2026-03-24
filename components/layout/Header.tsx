"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";

// Her kan man tilføje nye titler til header, så brugeren ved hvilken side, de er på.

const TITLE_CONFIG = {
    "/": { title: "Dashboard", description: "Velkommen tilbage, Thomas!" },
    "/clients": { title: "Klienter", description: "Overblik over dine klienter." },
    "/trainer": { title: "Træner", description: "Planlæg og administrér træning." },
    "/teams": { title: "Hold", description: "Administrér dine hold og forløb." },
    "/exercises": { title: "Øvelser", description: "Find, filtrér og opret øvelser." },
    "/profile": { title: "Min Profil", description: "Opdatér dine personlige oplysninger." },
}

export default function Header() {
    const pathname = usePathname()
    const config = TITLE_CONFIG[pathname as keyof typeof TITLE_CONFIG]
    const title = config?.title ?? "Dashboard"
    const description = config?.description ?? "Velkommen tilbage, Thomas!"

    return (
        <header className="shrink-0 bg-gray-100 items-center flex px-10 justify-between py-6">
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <Image src={"/avatar.jpg"} alt="Work It" width={36} height={36} className="h-14 w-14 rounded-full" />
        </header>
    );
}
