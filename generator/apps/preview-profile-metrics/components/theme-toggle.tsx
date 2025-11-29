"use client";

import { MoonIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  function toggleTheme() {
    document.body.classList.toggle("dark");
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <MoonIcon />
    </Button>
  );
}
