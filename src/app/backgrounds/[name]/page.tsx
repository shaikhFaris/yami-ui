import BlackHole from "@/bg-components/BlackHole";
import MetallicWaves from "@/bg-components/MetallicWaves";

export default async function page({ params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name;
  console.log(name);

  if (name === "metallic-waves") {
    return (
      <div className="">
        <div className=" border border-[var(--border)] relative rounded-[var(--radius)] overflow-hidden flex justify-center items-center w-full">
          <MetallicWaves width={"100%"} height="80vh" />
          {/* <div className="absolute h-[80vh] w-full z-20 bg-black/70 flex items-center justify-center">
            <p className="text-center text-xs max-w-[35%] ">
              Wrap this component around a relative div and then put an absolute dive with
              same widht and height as the component. THen write your code in this
              absolute div
            </p>
          </div> */}
        </div>
        <div className=" border flex justify-center items-center w-full">
          customisation
        </div>
      </div>
    );
  } else if (name === "black-hole") {
    return (
      <div className="">
        <div className=" border border-[var(--border)] relative rounded-[var(--radius)] overflow-hidden flex justify-center items-center w-full">
          <BlackHole width={"100%"} height="80vh" />
          {/* <div className="absolute h-[80vh] w-full z-20 bg-black/70 flex items-center justify-center">
            <p className="text-center text-xs max-w-[35%] ">
              Wrap this component around a relative div and then put an absolute dive with
              same widht and height as the component. THen write your code in this
              absolute div
            </p>
          </div> */}
        </div>
      </div>
    );
  }
}
