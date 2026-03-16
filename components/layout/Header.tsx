import Image from "next/image";

export default function Header() {
    return (
        <header className="shrink-0 bg-gray-100 items-center flex px-10 justify-between py-6">
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-gray-900">Øvelser</h1>
                <p className="text-sm text-gray-500">Velkommen tilbage, Thomas!</p>
            </div>
            <Image src={"/avatar.jpg"} alt="Work It" width={36} height={36} className="h-14 w-14 rounded-full" />
        </header>
    );
}
