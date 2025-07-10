"use client";

import useViewStore from "@/store/viewStore";

export default function Views({
  component,
  name,
}: {
  component: React.ReactNode;
  name: string;
}) {
  const view = useViewStore((state) => state.view);

  return (
    <>
      {view === "preview" ? (
        <div className="border border-[var(--border)] relative rounded-[var(--radius)] overflow-hidden flex justify-center items-center w-full">
          {component}
        </div>
      ) : (
        <div className="border border-[var(--border)] relative rounded-[var(--radius)] overflow-hidden flex justify-center items-center w-full">
          code instructions {name}
        </div>
      )}
    </>
  );
}
