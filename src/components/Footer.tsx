import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-center pt-5 pb-3 gap-1 items-center justify-center font-semibold flex text-lg mt-[5vh] lg:mt-[15vh]">
      <span className="bg-[var(--background)]">Developed with</span>
      <FaHeart className="bg-[var(--background)] text-white" />
      <span className="bg-[var(--background)]"> by Faris</span>
    </footer>
  );
}
