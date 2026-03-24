import Image from "next/image"
import { GraduationCap, Users, Building2, Settings, BicepsFlexed, House } from "lucide-react"
import { MenuItem } from "../shared/MenuItem"

export default function Sidebar() {
    return (
        <aside className="flex flex-col h-full w-full lg:h-screen lg:w-[280px] shrink-0 py-4 sm:py-6 px-4 sm:px-6 bg-white gap-8 lg:gap-12 border-b border-gray-200 lg:border-b-0 lg:border-r">
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
                            <MenuItem icon={<Users size={20} />} title="Klienter" path="/clients" />
                            <MenuItem icon={<GraduationCap size={20} />} title="Træner" path="/trainer" />
                            <MenuItem icon={<Building2 size={20} />} title="Hold" path="/teams" />
                            <MenuItem icon={<BicepsFlexed size={20} />} title="Øvelser" path="/exercises" />
                            <MenuItem icon={<House size={20} />} title="Dashboard" path="/" />
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