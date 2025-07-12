import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="p-2 md:p-5 flex items-center justify-center min-h-screen">
      <div className="mt-[10vh]">
        <div className="flex justify-center">
          <p className="border border-[var(--secondary-foreground)] rounded-full px-4 py-0.5 mb-3 ">
            ✨ Explore cool backgrounds
          </p>
        </div>
        <h1 className="md:text-7xl text-center text-[var(--font-mono)] font-bold">
          Shader Backgrounds, <br />
          Copy and Paste.
        </h1>
        <p className="mt-3 mx-auto max-w-2xl text-[var(--primary)] text-center">
          You can use these reusable React shader background components right out of the
          box to add some seriously cool vibes to your website. No complicated setup or
          extra hassle .
        </p>
        <div className="flex max-w-2xl mx-auto md:gap-5 justify-center items-center mt-3">
          <Link
            href={"/backgrounds"}
            className="border border-[var(--border)] bg-[var(--foreground)] font-semibold text-[var(--background)] px-8 py-3 rounded-[var(--radius)] "
          >
            Get Started
          </Link>
          <a
            href="https://github.com/shaikhFaris/yami-ui"
            target="_blank"
            className="border border-[var(--foregound)] flex justify-between gap-2 px-8 py-3 rounded-[var(--radius)] "
          >
            <FaGithub className="text-xl" />
            <p className="">Star on Github</p>
          </a>
        </div>
        <div className="mt-8 flex justify-center">
          <video
            className="rounded-[var(--radius)] w-4/5"
            preload="auto"
            autoPlay
            muted
            loop
          >
            <source src="/yamiUI.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
