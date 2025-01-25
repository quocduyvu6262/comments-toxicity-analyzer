"use client";

import React, { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSection } from "@/hooks/useSection";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

type menuItem = {
  icon: string;
  label: string;
  route: string;
};

const menus: any = [
  {
    name: "SECTIONS",
    menuItems: [
      {
        icon: "/images/icon/icon-moon.svg",
        label: "Section 1",
        route: "/sections/1",
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const router = useRouter();
  const [menuGroups, setMenuGroups] = useLocalStorage("menuGroups", menus);
  const { id } = useParams();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const { clearSectionData } = useSection();

  const handleAddMenuItem = () => {
    const len = menuGroups[0].menuItems.length;
    const newId =
      parseInt(menuGroups[0].menuItems[len - 1]["label"].split(" ")[1]) + 1;
    const sectionCount = newId.toString();
    const sectionName = `Section ${sectionCount}`;
    const updatedGroup = [...menuGroups];
    updatedGroup[0]["menuItems"].push({
      icon: "/images/icon/icon-moon.svg",
      label: sectionName,
      route: `/sections/${sectionCount}`,
    });
    setMenuGroups(updatedGroup);
  };

  const handleDeleteMenuItem = (label: string) => {
    const updatedGroup = [...menuGroups];
    let prevSection = "Section 1";
    let mustUpdate = true;
    const toDeleteId = label.split(" ")[1];
    updatedGroup[0]["menuItems"] = menuGroups[0]["menuItems"].filter(
      (obj: any) => {
        if (obj.label != label) {
          if (mustUpdate) prevSection = obj.label;
          return true;
        }
        mustUpdate = false;
        return false;
      },
    );
    let clickedId = pageName.split(" ")[1];
    clearSectionData(toDeleteId);
    setMenuGroups(updatedGroup);
    if (clickedId == toDeleteId) {
      const prevId = prevSection.split(" ")[1];
      router.push(`/sections/${prevId}`);
      setPageName(prevSection.toLowerCase());
    }
  };

  useEffect(() => {
    setPageName(`section ${id?.toString()}`);
  }, [id, setPageName]);

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-10">
          <Link href="/">
            {/*<Image*/}
            {/*  width={176}*/}
            {/*  height={32}*/}
            {/*  src={"/images/logo/logo-dark.svg"}*/}
            {/*  alt="Logo"*/}
            {/*  priority*/}
            {/*  className="dark:hidden"*/}
            {/*  style={{ width: "auto", height: "auto" }}*/}
            {/*/>*/}
            {/*<Image*/}
            {/*  width={176}*/}
            {/*  height={32}*/}
            {/*  src={"/images/logo/logo.svg"}*/}
            {/*  alt="Logo"*/}
            {/*  priority*/}
            {/*  className="hidden dark:block"*/}
            {/*  style={{ width: "auto", height: "auto" }}*/}
            {/*/>*/}
            <p className="font-satoshi text-heading-5 font-bold text-dark dark:text-white">
              Dashboard
            </p>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col justify-center overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4 lg:px-6">
            {menuGroups.map((group: any, groupIndex: any) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem: any, menuIndex: any) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                      handleDeleteMenuItem={handleDeleteMenuItem}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
          <div className="mb-6 mt-auto flex justify-center">
            <button
              disabled={menuGroups[0]["menuItems"].length >= 8}
              onClick={handleAddMenuItem}
              className="w-1/2 items-center rounded-md py-2 text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
            >
              + Add Section
            </button>
          </div>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
