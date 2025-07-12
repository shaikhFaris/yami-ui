export default function Home() {
  return (
    <div className="p-2 md:p-5 flex items-center justify-center min-h-screen">
      <div className="">
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
      </div>
    </div>
  );
}
