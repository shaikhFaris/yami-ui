"use client";
import useViewStore from "@/store/viewStore";

export default function ButtonDiv() {
  const updateView = useViewStore((state) => state.updateView);
  const view = useViewStore((state) => state.view);

  return (
    <div className="flex justify-end items-center gap-3">
      <button
        className={`border border-[var(--border)] hover:bg-[var(--accent)] rounded-[var(--radius)] text-[var(--secondary-foreground)] duration-150 px-5 py-2 ${
          view === "preview" && "bg-[var(--secondary)]"
        }`}
        onClick={() => updateView("preview")}
      >
        Preview
      </button>
      <button
        onClick={() => updateView("code")}
        className={`border border-[var(--border)] hover:bg-[var(--accent)] rounded-[var(--radius)] text-[var(--secondary-foreground)] duration-150 px-5 py-2 ${
          view === "code" && "bg-[var(--secondary)]"
        }`}
      >
        View Code
      </button>
    </div>
  );
}
