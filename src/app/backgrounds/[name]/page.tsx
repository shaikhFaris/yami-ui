import BlackHole from "@/bg-components/BlackHole";
import MetallicWaves from "@/bg-components/MetallicWaves";
import ShaderArt from "@/bg-components/ShaderArt";
import Views from "./_components/Views";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import bgs from "@/info/bginfo";

// dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const name = (await params).name;
  const bg = bgs.find((el) => el.slug === name);

  return {
    title: bg?.name,
  };
}

export default async function page({ params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name;
  let Component: React.ReactNode = null;

  if (name === "metallic-waves") {
    Component = <MetallicWaves width="100%" height="80vh" />;
  } else if (name === "black-hole") {
    Component = <BlackHole width="100%" height="80vh" />;
  } else if (name === "shader-art") {
    Component = <ShaderArt width="100%" height="80vh" />;
  } else {
    notFound();
  }

  return Component ? (
    <div className="">
      <Views component={Component} name={name} />
    </div>
  ) : null;
}
