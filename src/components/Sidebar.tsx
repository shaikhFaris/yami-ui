import SidebarClient from "./Sidebar-client";

export default function Sidebar() {
  return (
    <div className="w-1/5 flex no-scrollbar h-[calc(100vh-64px)] justify-center overflow-y-scroll py-5">
      <div className="w-2/3 flex pt-10 flex-col justify-start mx-auto">
        <div className="">
          <h3 className="font-semibold">Backgrounds</h3>
          <SidebarClient />
        </div>
      </div>
    </div>
  );
}
