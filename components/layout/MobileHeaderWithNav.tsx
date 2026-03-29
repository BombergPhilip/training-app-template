"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { SidebarPanel } from "@/components/layout/SidebarPanel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

type MobileHeaderWithNavProps = {
    className?: string;
};

const MobileHeaderWithNav = ({ className }: MobileHeaderWithNavProps) => {
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <>
            <div
                className={`flex h-16 shrink-0 items-center justify-between gap-3 border-b border-gray-200/90 bg-white px-4 shadow-sm md:h-16 md:px-6 lg:hidden${className ? ` ${className}` : ""}`}
            >
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 shrink-0 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    aria-label="Åbn menu"
                    aria-expanded={sheetOpen}
                    aria-controls="mobile-sidebar-sheet"
                    onClick={() => setSheetOpen((open) => !open)}
                >
                    <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
                </Button>

                <Link
                    href="/"
                    className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                >
                    <Image
                        src="/logo.svg"
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0"
                    />
                    <span className="truncate font-sans text-base font-bold uppercase tracking-tight text-gray-900 md:text-lg">
                        Work It
                    </span>
                </Link>

                <div className="shrink-0">
                    <Image
                        src="/avatar.jpg"
                        alt=""
                        width={40}
                        height={40}
                        className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200 md:h-10 md:w-10"
                    />
                </div>
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen} modal>
                <SheetContent
                    id="mobile-sidebar-sheet"
                    side="left"
                    showCloseButton={false}
                    className="h-full w-[min(280px,85vw)] max-w-[min(280px,85vw)] gap-0 border-r border-gray-200 bg-white p-0 shadow-none"
                >
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <SheetDescription className="sr-only">
                        Hovedmenu og indstillinger
                    </SheetDescription>
                    <div className="flex h-full min-h-0 flex-col overflow-auto px-6 py-6">
                        <SidebarPanel
                            collapsed={false}
                            onToggleCollapse={() => {}}
                            showCollapseButton={false}
                            onNavigate={() => setSheetOpen(false)}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default MobileHeaderWithNav;
