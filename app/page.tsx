import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PreviewControls } from "@/components/site/preview-controls";
import { HomePreview } from "@/components/site/home-preview";
import { Dashboard } from "@/components/site/dashboard";
import { Features } from "@/components/site/features";

export default function Home(){return <>
  <section className="hero"><Badge variant="secondary" asChild><Link href="/components">Explore the interactive collection<ArrowRight/></Link></Badge>
    <h1>The Foundation for your Design System</h1>
    <p>Thoughtful components. Familiar interactions. Build a library that belongs to your project, with every detail open to change.</p>
    <div className="flex flex-wrap justify-center gap-2 pt-2"><Button asChild><Link href="/docs">Get Started</Link></Button><Button asChild variant="secondary"><Link href="/components">View Components</Link></Button></div>
  </section>
  <HomePreview/><div className="site-container">
    <section className="py-20" id="dashboard"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-semibold tracking-tight">From components to a workspace.</h2><p className="mt-3 text-muted-foreground">Explore a complete dashboard built from the same pieces.</p></div><Button asChild variant="outline"><Link href="/blocks">View blocks<ArrowRight/></Link></Button></div><Dashboard/></section>
    <Features/>
  </div>
</>;}
