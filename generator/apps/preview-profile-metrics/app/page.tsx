import { renderModules } from "@/app/actions/render";
import ModuleRenderItem from "@/components/module-render-item";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ debug: string }>;
}) {
  const { debug } = await searchParams;
  const isDebug = debug === "true";

  const renderResult = await renderModules(isDebug);

  return (
    <div className="flex flex-col gap-2">
      {renderResult.map((result, index) => {
        const { buffer, metadata } = result;
        const base64Image = buffer.toString("base64")

        return (
          <ModuleRenderItem
            key={index}
            moduleMetadata={metadata}
            base64Image={base64Image}
          />
        );
      })}
    </div>
  );
}
