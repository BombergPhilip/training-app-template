import Image from "next/image"
import { GraduationCap, Users, Building2, Settings, BicepsFlexed, House } from "lucide-react"
import { MenuItem } from "../shared/MenuItem"


// Her kan man tilføje nye menu items til main menu, så man bliver navigeret over til den relevante side.

const mainMenu = [
    { icon: <House size={20} />, title: "Dashboard", path: "/" },
    { icon: <Users size={20} />, title: "Klienter", path: "/clients" },
    { icon: <GraduationCap size={20} />, title: "Træner", path: "/trainer" },
    { icon: <Building2 size={20} />, title: "Hold", path: "/teams" },
    { icon: <BicepsFlexed size={20} />, title: "Øvelser", path: "/exercises" },
]

export default function Sidebar() {
    return (
        <aside className="flex flex-col h-screen w-[280px] shrink-0 py-6 px-6 bg-white gap-12 border-r border-gray-200">
            <div className="flex items-center gap-2 h-fit w-full">
                <Image src={"/logo.svg"} alt="" width={36} height={36} className="h-10 w-10 " />
                <div className="text-gray-900 text-xl font-bold font-sans uppercase">Work It</div>
            </div>
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2">
                    <div className="text-xs text-gray-400 uppercase px-4">
                        main menu
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            {mainMenu.map((item) => {
                                return <MenuItem key={item.path} icon={item.icon} title={item.title} path={item.path} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <MenuItem icon={<Settings size={20} />} title="Indstillinger" path="/profile" />
                </div>
            </div>
        </aside>
    )
}