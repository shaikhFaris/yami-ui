import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Navbar />
      {/* client component */}
      <Sidebar smallDevice={true} />
      <div className="flex flex-1">
        {/* client component */}
        <Sidebar smallDevice={false} />
        {children}
      </div>
      {/* <div className="">footer</div> */}
    </div>
  );
}
