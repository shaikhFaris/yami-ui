import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function HomeNav() {
  return (
    <div className="px-3 fixed top-0 items-center bg-transparent md:px-10 pt-4 w-full flex justify-between z-50">
      <div className="flex gap-2 relative items-center hover:cursor-default justify-center">
        <div className="[mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)] absolute w-[120%] h-20 bg-[var(--background)] "></div>
        <Image width={25} height={25} className="z-20" src={"/logo.png"} alt="logo" />
        <Link href={"/"} className="text-2xl font-semibold z-20">
          Yami UI
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <a
          href="https://github.com/shaikhFaris/yami-ui"
          target="_blank"
          className="text-2xl duration-150 lg:hover:text-[var(--primary)] rounded-md border-[var(--border)] bg-[var(--background)] border p-1.5 "
        >
          <FaGithub />
        </a>
        <a
          href="https://x.com/faris_shaikh247"
          target="_blank"
          className="text-2xl duration-150 lg:hover:text-[var(--primary)] rounded-md border-[var(--border)] bg-[var(--background)] border p-1.5 "
        >
          <FaXTwitter />
        </a>
      </div>
    </div>
  );
}
