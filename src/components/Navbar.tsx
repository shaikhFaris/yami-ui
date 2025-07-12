import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import NavMenuButton from "./NavMenuButton";

export default function Navbar() {
  return (
    <div className="px-3 md:px-10 py-4 border-b w-full flex justify-between border-[var(--border)] z-50 bg-[var(--background)]">
      <div className="flex gap-2 items-center hover:cursor-default justify-center">
        <Image width={25} height={25} src={"/logo.png"} alt="logo" />
        <Link href={"/"} className="text-2xl font-semibold">
          Yami UI
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Link href={"/backgrounds"} className="hover:text-[var(--primary)] duration-150 ">
          Backgrounds
        </Link>
        <a
          href="https://github.com/shaikhFaris/yami-ui"
          target="_blank"
          className="md:bg-[var(--primary)] md:hover:bg-[var(--secondary-foreground)] duration-150 hover:scale-x-110 md:px-3 md:py-2 rounded-full text-[var(--primary-foreground)] font-bold flex items-center justify-center gap-2"
        >
          <div className="text-2xl text-[var(--primary)] md:text-[var(--primary-foreground)] ">
            <FaGithub />
          </div>
          <p className="hidden md:block ">Star on github</p>
        </a>
        <NavMenuButton />
      </div>
    </div>
  );
}
