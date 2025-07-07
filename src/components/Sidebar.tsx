import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-1/5 flex no-scrollbar h-[calc(100vh-64px)] justify-center overflow-y-scroll py-5">
      <div className="w-2/3 flex pt-10 flex-col justify-start mx-auto">
        <div className="">
          <h3 className="font-semibold">Backgrounds</h3>
          <div className="pt-3">
            <div className="relative flex gap-2 flex-col text-sm text-[var(--secondary)] pl-3">
              {/* <div className="absolute border-l-[1px] top-1/2 -translate-y-1/2 left-0"></div> */}
              <Link
                className="hover:text-[var(--primary)] duration-150 hover:translate-0.5"
                href={"/backgrounds/black-hole"}
              >
                Black Hole
              </Link>
              <Link
                className="hover:text-[var(--primary)] duration-150 hover:translate-0.5"
                href={"/backgrounds/metallic-waves"}
              >
                Metallic Waves
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
