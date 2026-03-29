"use client";

import { useState } from "react";

import { SidebarPanel } from "@/components/layout/SidebarPanel";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "hidden h-screen shrink-0 flex-col gap-12 border-r border-gray-200 bg-white py-6 transition-all duration-300 overflow-hidden lg:flex",
                collapsed ? "w-[72px] px-3" : "w-[280px] px-6"
            )}
        >
            <SidebarPanel
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed((c) => !c)}
                showCollapseButton={true}
            />
        </aside>
    );
};

export default Sidebar;
