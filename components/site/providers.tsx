"use client";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function SiteProviders({children}: {children: React.ReactNode}) {
  return <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="monochrome-theme" disableTransitionOnChange>
    <TooltipProvider delayDuration={250}>{children}<Toaster richColors={false} closeButton/></TooltipProvider>
  </ThemeProvider>;
}
