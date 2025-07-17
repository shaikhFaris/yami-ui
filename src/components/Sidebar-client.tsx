"use client";
import Link from "next/link";
import { useState } from "react";
import useViewStore from "@/store/viewStore";
import bgs from "@/info/bginfo";

export default function SidebarClient() {
  const [selected, setSelected] = useState<number>(-1);
  const updateToggleSidebar = useViewStore((state) => state.updateToggleSidebar);
  const toggleSidebar = useViewStore((state) => state.toggleSidebar);

  return (
    <div className="pt-5 md:pt-3">
      <div className="relative flex gap-5 md:gap-2 flex-col text-xl md:text-sm text-[var(--secondary)] pl-3">
        {bgs.length !== 0 &&
          bgs.map((el, i) => (
            <Link
              key={i}
              href={el.path}
              className={`hover:text-[var(--primary)] duration-150 hover:translate-0.5 ${
                selected === i && "text-[var(--primary)] translate-0.5"
              }`}
              onClick={() => {
                setSelected(i);
                if (toggleSidebar === true) {
                  updateToggleSidebar(false);
                }
              }}
            >
              {el.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
