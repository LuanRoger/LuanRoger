"use client";

import { BugIcon, BugOffIcon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function DebugToggle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isDebug = searchParams.get("debug") === "true";

  const params = new URLSearchParams(searchParams.toString());

  if (isDebug) {
    params.delete("debug");
  } else {
    params.set("debug", "true");
  }

  const newSearch = params.toString();
  const newUrl = `${pathname}${newSearch ? `?${newSearch}` : ""}`;

  return (
    <Link href={newUrl}>
      <Button variant="ghost" size="icon">
        {!isDebug ? <BugIcon /> : <BugOffIcon />}
      </Button>
    </Link>
  );
}
