"use client";
import Link from "next/link";
import { useState } from "react";
import useViewStore from "@/store/viewStore";

export default function SidebarClient() {
  const [selected, setSelected] = useState<number>(-1);
  const updateToggleSidebar = useViewStore((state) => state.updateToggleSidebar);
  const toggleSidebar = useViewStore((state) => state.toggleSidebar);

  return (
    <div className="pt-5 md:pt-3">
      <div className="relative flex gap-5 md:gap-2 flex-col text-xl md:text-sm text-[var(--secondary)] pl-3">
        <Link
          className={`hover:text-[var(--primary)] duration-150 hover:translate-0.5 ${
            selected === 0 && "text-[var(--primary)] translate-0.5"
          }`}
          onClick={() => {
            setSelected(0);
            if (toggleSidebar === true) {
              updateToggleSidebar(false);
            }
          }}
          href={"/backgrounds/black-hole"}
        >
          Black Hole
        </Link>
        <Link
          className={`hover:text-[var(--primary)] duration-150 hover:translate-0.5 ${
            selected === 1 && "text-[var(--primary)] translate-0.5"
          }`}
          onClick={() => {
            setSelected(1);
            if (toggleSidebar === true) {
              updateToggleSidebar(false);
            }
          }}
          href={"/backgrounds/metallic-waves"}
        >
          Metallic Waves
        </Link>
        <Link
          className={`hover:text-[var(--primary)] duration-150 hover:translate-0.5 ${
            selected === 2 && "text-[var(--primary)] translate-0.5"
          }`}
          onClick={() => {
            setSelected(2);
            if (toggleSidebar === true) {
              updateToggleSidebar(false);
            }
          }}
          href={"/backgrounds/shader-art"}
        >
          Shader Art
        </Link>
      </div>
    </div>
  );
}
