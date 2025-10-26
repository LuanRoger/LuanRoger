import { renderModules } from "@/app/actions/render";
import Image from "next/image";

export default async function Home() {
  const imagesBuffer = await renderModules();

  return (
    <div className="flex flex-col gap-2">
      <Image
        width={800}
        height={600}
        src={`data:image/png;base64,${imagesBuffer.toString("base64")}`}
        alt="github profile"
      />
    </div>
  );
}
