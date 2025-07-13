import HomeNav from "@/components/HomeNav";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative  pt-[22vh] md:pt-[20vh] min-h-screen">
      <HomeNav />
      {/* bgs */}
      <div className="absolute top-0 h-full left-0 z-[-2] w-full bg-transparent bg-[radial-gradient(#6C6C6CFF_1px,#00000000_1px)] bg-[size:20px_20px]">
        {" "}
        <div className="absolute bottom-0 [mask-image:radial-gradient(80%_30%_at_50%_37%,black,transparent)] left-0 bg-[var(--background)] right-0 top-0 md:[mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)] "></div>
      </div>
      <div className="">
        <div className="flex justify-center">
          <p className="border bg-transparent text-xs py-1 md:text-base backdrop-blur-sm border-[var(--secondary-foreground)] rounded-full px-4 md:py-0.5 mb-3 ">
            ✨ Explore cool backgrounds
          </p>
        </div>
        <h1 className="lg:text-7xl md:text-5xl text-center text-3xl text-[var(--font-mono)] font-bold">
          Shader Backgrounds, <br />
          Copy and Paste.
        </h1>
        <p className="text-xs px-2 md:px-0 md:text-base mt-1 md:mt-3 mx-auto md:max-w-2xl text-[var(--primary)] text-center">
          You can use these reusable React shader background components
          <span className="hidden md:inline">
            right out of the box to add some seriously cool vibes to your website
          </span>
          . No complicated setup or extra hassle.
        </p>
        <div className="flex max-w-2xl mx-auto gap-3 md:gap-5 justify-center items-center mt-3">
          <Link
            href={"/backgrounds/black-hole"}
            className="border border-[var(--border)] text-sm md:text-base bg-[var(--foreground)] font-semibold text-[var(--background)] px-3 md:px-8 py-2 md:py-3 rounded-[var(--radius)] "
          >
            Get Started
          </Link>
          <a
            href="https://github.com/shaikhFaris/yami-ui"
            target="_blank"
            className="border border-[var(--foregound)] text-sm md:text-base bg-[var(--background)] flex justify-between gap-2 px-3 md:px-8 py-2 md:py-3 rounded-[var(--radius)] "
          >
            <FaGithub className="text-xl" />
            <p className="">Star on Github</p>
          </a>
        </div>
        <div className="mt-8 flex justify-center">
          <video
            className="rounded-[var(--radius)] w-11/12 md:w-4/5"
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
      <Footer />
    </div>
  );
}
