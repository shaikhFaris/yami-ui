"use client";
import SidebarClient from "./Sidebar-client";
import useViewStore from "@/store/viewStore";

export default function Sidebar({ smallDevice }: { smallDevice: boolean }) {
  const toggleSidebar = useViewStore((state) => state.toggleSidebar);

  return (
    <>
      <div
        className={`${
          smallDevice
            ? toggleSidebar
              ? "w-full absolute bg-[var(--background)] top-[68px] z-50 flex"
              : "hidden"
            : "hidden md:flex w-1/5"
        } no-scrollbar h-[calc(100vh-64px)] justify-center overflow-y-scroll py-5`}
      >
        <div className="w-4/5 md:w-2/3 flex pt-10 flex-col justify-start mx-auto">
          <div className="">
            <h3 className="text-3xl md:text-base font-semibold">Backgrounds</h3>
            <SidebarClient />
          </div>
        </div>
      </div>
    </>
  );
}
