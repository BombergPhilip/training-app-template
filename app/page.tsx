export default function HomePage() {

    return (
        <main className="min-h-screen bg-zinc-100 text-zinc-900">
            <div className="grid min-h-screen grid-cols-[220px_1fr_320px] grid-rows-[90px_1fr]">
                {/* Topbar */}
                <header className="col-span-3 flex items-center justify-center border-b border-zinc-300 bg-white px-6">
                    <h1 className="text-3xl font-semibold tracking-wide">
                        Velkommen til Hopfit - Første skridt mod en stærkere dig!
                    </h1>
                </header>

                {/* Left sidebar */}
                <aside className="flex flex-col justify-between border-r border-zinc-300 bg-white p-4">
                    <nav>
                        <h2 className="mb-4 text-xl font-semibold">Menuer</h2>

                        <ul className="space-y-3">
                            <li className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3">
                                Program
                            </li>
                            <li className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3">
                                Træner
                            </li>
                            <li className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3">
                                Clients
                            </li>
                            <li className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3">
                                Hold
                            </li>
                        </ul>
                    </nav>

                    <button className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-left">
                        Indstillinger
                    </button>
                </aside>

                {/* Center content */}
                <section className="border-r border-zinc-300 bg-zinc-50 p-6">
                    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white">
                        <div className="text-center">
                            <h2 className="mb-2 text-2xl font-semibold">Main content</h2>
                            <p className="text-zinc-500">
                                Her kan du vise dagens workout, programmer eller oversigt.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Right column */}
                <aside className="grid grid-rows-[140px_140px_1fr] gap-4 bg-white p-4">
                    <div className="grid grid-cols-[1fr_110px] overflow-hidden rounded-2xl border border-zinc-300">
                        <div className="p-4">
                            <h3 className="mb-2 text-2xl font-semibold">Profile</h3>
                            <p className="text-sm text-zinc-500">Din profil og hurtig info</p>
                        </div>

                        <div className="flex flex-col items-center justify-center border-l border-zinc-300 bg-zinc-50 p-2">
                            <div className="mb-2 h-16 w-16 rounded-full bg-zinc-300" />
                            <span className="text-xs font-medium">MOTFLS</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-300 p-4">
                        <h3 className="mb-2 text-2xl font-semibold">Kalender</h3>
                        <p className="text-sm text-zinc-500">Vis kommende træninger og aftaler</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-300 p-4">
                        <h3 className="mb-4 text-2xl font-semibold">Progress chart</h3>

                        <div className="flex h-[260px] items-end gap-3 rounded-xl bg-zinc-50 p-4">
                            <div
                                className="w-full rounded-t-md bg-zinc-300"
                                style={{ height: "20%" }}
                            />
                            <div
                                className="w-full rounded-t-md bg-zinc-400"
                                style={{ height: "35%" }}
                            />
                            <div
                                className="w-full rounded-t-md bg-zinc-300"
                                style={{ height: "28%" }}
                            />
                            <div
                                className="w-full rounded-t-md bg-zinc-400"
                                style={{ height: "50%" }}
                            />
                            <div
                                className="w-full rounded-t-md bg-zinc-300"
                                style={{ height: "40%" }}
                            />
                            <div
                                className="w-full rounded-t-md bg-zinc-400"
                                style={{ height: "70%" }}
                            />
                            <div
                                className="w-full rounded-t-md bg-zinc-500"
                                style={{ height: "88%" }}
                            />
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
