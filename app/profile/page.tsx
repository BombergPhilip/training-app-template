import Sidebar from "@/components/layout/Sidebar"
import Image from "next/image"

import ProfileName from "@/components/profile/ProfileName"
import WeightCard from "@/components/profile/WeightCard"
import HeightCard from "@/components/profile/HeightCard"
import WeightChart from "@/components/profile/WeightChart"
import { Button } from "@/components/ui/button"



export default function ProfileDashboard() {
    return (
        <div className="flex flex-1 min-w-0 flex-col">
            <div className="flex justify-end">
                <Button variant="destructive">Log out</Button>
            </div>
            <Image
                src="/avatar.jpg"
                alt="Profil"
                width={200}
                height={200}
                className="mx-auto mt-10 rounded-full"
            />

            <ProfileName />


            <main className="flex flex-1 flex-col gap-6 overflow-auto bg-gray-100 px-10 pt-10">

                <div className="grid grid-cols-2 gap-6">

                    <WeightCard />

                    <div className="row-span-2">
                        <WeightChart />
                    </div>

                    <HeightCard />




                </div>

            </main>

        </div>
    )
}