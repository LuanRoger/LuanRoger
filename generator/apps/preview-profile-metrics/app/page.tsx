import { renderModules } from "@/app/actions/render";
import ModuleRenderItem from "@/components/module-render-item";

export default async function Home() {
  const renderResult = await renderModules();

  return (
    <div className="flex flex-col gap-2">
      {renderResult.map((result, index) => {
        const { buffer, metadata } = result;

        return (
          <ModuleRenderItem
            key={index}
            moduleMetadata={metadata}
            base64Image={buffer.toString("base64")}
          />
        );
      })}
    </div>
  );
}
