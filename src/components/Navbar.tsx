export default function Navbar() {
  return (
    <div className="px-16 py-4 border-b w-full flex justify-between border-[var(--border)] z-50 bg-[var(--background)]">
      <div className="">
        <h1 className="text-2xl font-semibold">Yami UI</h1>
      </div>
      <div className="flex items-center justify-center gap-10">
        <p>home</p>
        <p>backgrounds</p>
      </div>
    </div>
  );
}
