"use client";

import bgs from "@/info/bginfo";
import useViewStore from "@/store/viewStore";
import Prism from "prismjs";
import { useEffect, useRef } from "react";
import "@/app/backgrounds/[name]/_components/syntax.css";
import { IoCopyOutline } from "react-icons/io5";

export default function Views({
  component,
  name,
}: {
  component: React.ReactNode;
  name: string;
}) {
  const codeRef = useRef<HTMLElement>(null);
  const codeRef2 = useRef<HTMLElement>(null);

  const view = useViewStore((state) => state.view);
  const info = bgs.find((el) => el.slug === name);
  const updateView = useViewStore((state) => state.updateView);

  useEffect(() => {
    if (codeRef.current && codeRef2.current) {
      Prism.highlightElement(codeRef.current);
      Prism.highlightElement(codeRef2.current);
    }
  }, [view, info?.fullCode]);

  useEffect(() => {
    return () => {
      updateView("preview");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {view === "preview" ? (
        <div className="border border-[var(--border)] relative rounded-[var(--radius)] overflow-hidden flex justify-center items-center w-full">
          {component}
        </div>
      ) : (
        <div className="pb-5">
          <pre className="border border-[var(--border)] relative overflow-scroll rounded-[var(--radius)] h-[60vh] w-full">
            <div
              className="absolute right-4 top-2 border hover:bg-[var(--accent)] duration-150 p-2 border-[var(--border)] text-xl rounded-[var(--radius)] "
              onClick={() => {
                if (info?.fullCode) {
                  navigator.clipboard.writeText(info?.fullCode);
                }
              }}
            >
              <IoCopyOutline />
            </div>
            <code ref={codeRef} className={"language-js"}>
              {info?.fullCode}
            </code>
          </pre>
          <div className="my-8">
            <h2 className="text-3xl mb-4 text-[var(--primary)] font-medium">
              Installation
            </h2>
            <p>First install these dependencies in your project.</p>
            <pre className="border mt-2 relative border-[var(--border)] bg-[#030314] rounded-[var(--radius)]  [padding:1.5em_1em]">
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 border hover:bg-[var(--accent)] duration-150 p-2 border-[var(--border)] text-xl rounded-[var(--radius)] "
                onClick={() => {
                  if (info?.dependenciesInstallation) {
                    navigator.clipboard.writeText(info?.dependenciesInstallation);
                  }
                }}
              >
                <IoCopyOutline />
              </div>
              {info?.dependenciesInstallation}
            </pre>
          </div>
          <div className="my-8">
            <p>
              Create a component and paste the code. Then import the component to use it.{" "}
            </p>
            <pre className="language-js mt-2 relative">
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 border hover:bg-[var(--accent)] duration-150 p-2 border-[var(--border)] text-xl rounded-[var(--radius)] "
                onClick={() => {
                  if (info?.import) {
                    navigator.clipboard.writeText(info?.import);
                  }
                }}
              >
                <IoCopyOutline />
              </div>
              <code ref={codeRef2}>{info?.import}</code>
            </pre>
          </div>
          <div className="text-center text-[var(--destructive)] font-medium">
            The width and height props must be provided
          </div>
        </div>
      )}
    </>
  );
}
