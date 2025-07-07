import bgs from "@/info/bginfo";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;
  //   console.log(name);

  const bg = bgs.find((el) => el.slug === name);

  return (
    <div className="no-scrollbar p-5 h-[calc(100vh-64px)] flex flex-col overflow-y-scroll flex-1">
      <div className="mt-10">
        <h1 className="text-5xl font-semibold mb-5">{bg?.name}</h1>
      </div>
      <div className="my-5">{children}</div>
    </div>
  );
}
