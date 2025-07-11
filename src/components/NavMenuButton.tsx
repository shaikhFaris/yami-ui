"use client";

import useViewStore from "@/store/viewStore";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function NavMenuButton() {
  const updateToggleSidebar = useViewStore((state) => state.updateToggleSidebar);
  const toggleSidebar = useViewStore((state) => state.toggleSidebar);

  return (
    <>
      {!toggleSidebar ? (
        <div
          className="text-3xl md:hidden cursor-default "
          onClick={() => updateToggleSidebar(!toggleSidebar)}
        >
          <IoMenu />
        </div>
      ) : (
        <div
          className="text-3xl md:hidden cursor-default "
          onClick={() => updateToggleSidebar(false)}
        >
          <IoMdClose />
        </div>
      )}
    </>
  );
}
