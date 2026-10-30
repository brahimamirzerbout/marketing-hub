import type { Metadata } from "next";
import { ComponentCatalog } from "@/components/site/component-catalog";
export const metadata:Metadata={title:"Components"};
export default function ComponentsPage(){return <div className="site-container py-12"><h1 className="text-4xl font-semibold tracking-tight">Components</h1><p className="mt-4 mb-10 max-w-2xl text-muted-foreground">Explore the live collection. Try each control with your keyboard, switch the preview theme, and inspect the locally owned source.</p><ComponentCatalog/></div>;}
