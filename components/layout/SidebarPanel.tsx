"use client";

import Image from "next/image";
import {
    GraduationCap,
    Users,
    Building2,
    Settings,
    BicepsFlexed,
    House,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { MenuItem } from "@/components/shared/MenuItem";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const mainMenu = [
    { icon: <House size={20} />, title: "Dashboard", path: "/" },
    { icon: <Users size={20} />, title: "Klienter", path: "/clients" },
    { icon: <GraduationCap size={20} />, title: "Træner", path: "/trainer" },
    { icon: <Building2 size={20} />, title: "Hold", path: "/teams" },
    { icon: <BicepsFlexed size={20} />, title: "Øvelser", path: "/exercises" },
];

type SidebarNavItemProps = {
    collapsed: boolean;
    icon: React.ReactNode;
    title: string;
    path: string;
    onNavigate?: () => void;
};

const SidebarNavItem = ({
    collapsed,
    icon,
    title,
    path,
    onNavigate,
}: SidebarNavItemProps) => {
    const inner =
        !collapsed ? (
            <MenuItem icon={icon} title={title} path={path} />
        ) : (
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="w-full [&_a>div>span]:hidden [&_a>div]:justify-center [&_a>div]:gap-0 [&_a>div]:px-2">
                        <MenuItem icon={icon} title={title} path={path} />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                    {title}
                </TooltipContent>
            </Tooltip>
        );

    if (!onNavigate) {
        return inner;
    }

    return (
        <div className="w-full" role="presentation" onClick={onNavigate}>
            {inner}
        </div>
    );
};

export type SidebarPanelProps = {
    collapsed: boolean;
    onToggleCollapse: () => void;
    showCollapseButton: boolean;
    onNavigate?: () => void;
};

export const SidebarPanel = ({
    collapsed,
    onToggleCollapse,
    showCollapseButton,
    onNavigate,
}: SidebarPanelProps) => {
    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex h-full min-h-0 flex-col gap-12">
            <div
                className={cn(
                    "flex h-fit w-full min-w-0 items-center",
                    collapsed ? "flex-col gap-3" : "gap-2"
                )}
            >
                <div
                    className={cn(
                        "flex min-w-0 items-center",
                        collapsed ? "justify-center gap-0" : "flex-1 gap-2"
                    )}
                >
                    <Image
                        src={"/logo.svg"}
                        alt=""
                        width={36}
                        height={36}
                        className="h-10 w-10 shrink-0 "
                    />
                    <div
                        className={cn(
                            "min-w-0 overflow-hidden whitespace-nowrap font-sans text-xl font-bold uppercase text-gray-900 transition-[max-width,opacity] duration-300 ease-in-out",
                            collapsed ? "max-w-0 opacity-0" : "max-w-48 opacity-100"
                        )}
                        aria-hidden={collapsed}
                    >
                        Work It
                    </div>
                </div>
                {showCollapseButton && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={collapsed ? "Udvid sidebar" : "Sammenklap sidebar"}
                        aria-expanded={!collapsed}
                        className={cn(
                            "h-9 w-9 shrink-0 text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                            !collapsed && "ml-auto"
                        )}
                        onClick={onToggleCollapse}
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </Button>
                )}
            </div>
            <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <div
                        className={cn(
                            "overflow-hidden px-4 text-xs uppercase text-gray-400 transition-[max-height,max-width,opacity] duration-300 ease-in-out",
                            collapsed
                                ? "max-h-0 max-w-0 py-0 opacity-0"
                                : "max-h-8 max-w-full opacity-100"
                        )}
                        aria-hidden={collapsed}
                    >
                        main menu
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            {mainMenu.map((item) => (
                                <SidebarNavItem
                                    key={item.path}
                                    collapsed={collapsed}
                                    icon={item.icon}
                                    title={item.title}
                                    path={item.path}
                                    onNavigate={onNavigate}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <SidebarNavItem
                        collapsed={collapsed}
                        icon={<Settings size={20} />}
                        title="Indstillinger"
                        path="/profile"
                        onNavigate={onNavigate}
                    />
                </div>
            </div>
            </div>
        </TooltipProvider>
    );
};
