import React, { useState } from "react";
import Link from "next/link";
import SidebarDropdown from "@/components/Sidebar/SidebarDropdown";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmDialog from "@/components/Popups/ConfirmDialog";

const SidebarItem = ({
  item,
  pageName,
  setPageName,
  handleDeleteMenuItem,
}: any) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const handleClick = () => {
    const updatedPageName = item.label.toLowerCase();
    return setPageName(updatedPageName);
  };

  const handleMouseEnter = () => {
    setShowDelete(true);
  };

  const handleMouseLeave = () => {
    setShowDelete(false);
  };

  return (
    <>
      <li>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${pageName === item.label.toLowerCase() ? "bg-primary/[.07] text-primary dark:bg-white/10 dark:text-white" : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"} group relative flex items-center justify-between rounded-[7px] font-medium duration-300 ease-in-out`}
        >
          <Link
            onClick={handleClick}
            className="h-full w-full px-3.5 py-3"
            href={item.route}
          >
            {item.label}
          </Link>
          {item.label != "Section 1" && showDelete && (
            <button>
              <FaTrashAlt
                className="z-20 mr-4"
                onClick={() => {
                  setShowDialog(true);
                }}
              />
            </button>
          )}
        </div>

        {item.children && (
          <div
            className={`translate transform overflow-hidden ${
              pageName !== item.label.toLowerCase() && "hidden"
            }`}
          >
            <SidebarDropdown item={item.children} />
          </div>
        )}
      </li>
      <ConfirmDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        label={item.label}
        accept={handleDeleteMenuItem}
        cancel={() => setShowDialog(false)}
      />
    </>
  );
};

export default SidebarItem;
