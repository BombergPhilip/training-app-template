"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Element3, DocumentText, Edit2, SearchNormal, Archive, Briefcase } from "iconsax-reactjs";
import SidebarMenuItem from "@/components/shared/SidebarMenuItem";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: Element3, label: "Dashboard", path: "/dashboard" },
    { icon: DocumentText, label: "Resumes", path: "/resumes" },
    { icon: Edit2, label: "Cover Letters", path: "/cover-letters" },
    { icon: SearchNormal, label: "Job Search", path: "/job-search" },
    { icon: Archive, label: "Saved Jobs", path: "/saved-jobs" },
    { icon: Briefcase, label: "Job Tracker", path: "/job-tracking" },
  ];

  return (
    <div id="root">
      <main className="relative flex min-h-screen w-full bg-gray-50 px-6">
        <div className="sticky top-6 flex h-[calc(100vh-3rem)] w-72 flex-col gap-5 overflow-hidden rounded-xl border border-gray-200 bg-white px-5 py-8">
          <div>
            <div className="flex w-fit items-center gap-2">
              <Image src="/logo-new.svg" alt="Vyros Logo" width={40} height={40} className="h-10 w-10" />
              <h1 className="font-gilroy text-xl font-bold text-gray-900">Resumify</h1>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <SidebarMenuItem
                    icon={item.icon}
                    label={item.label}
                    active={pathname === item.path}
                    onClick={() => router.push(item.path)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative h-full w-full">{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
