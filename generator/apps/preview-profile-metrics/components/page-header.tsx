import DebugToggle from "./debug-toggle";
import ThemeToggle from "./theme-toggle";
import { Separator } from "./ui/separator";

export default function PageHeader() {
  return (
    <header className="flex flex-col w-full">
      <div className="flex flex-row justify-between w-full p-4">
        <h1 className="text-xl font-bold font-mono text-muted-foreground">
          Profile Metrics Preview
        </h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <DebugToggle />
        </div>
      </div>
      <Separator />
    </header>
  );
}
