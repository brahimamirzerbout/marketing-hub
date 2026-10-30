import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features=[
  {title:"The code belongs to you.",text:"Every component lives in your project. Read the source, adjust a detail, or rethink the whole thing. The implementation is yours to shape."},
  {title:"Small pieces. Complete interfaces.",text:"Combine a button, a field, and a dialog into something useful. Shared conventions keep each piece familiar as your product grows."},
  {title:"A foundation for interaction.",text:"Radix primitives provide focus handling, keyboard patterns, and accessible semantics. Clear labels and careful integration complete the experience."},
  {title:"One system, two perspectives.",text:"Light and dark use the same neutral roles. Change the tokens once, then carry that decision through every component and state."},
];
export function Features(){return <section id="principles" className="mx-auto max-w-5xl py-20 sm:py-28"><div className="mb-12 max-w-2xl"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Start with the details.<br/>Build something of your own.</h2><p className="mt-5 text-muted-foreground">A component foundation should make the ordinary dependable, so you can spend your time on what makes your product different.</p></div><div className="grid gap-x-16 gap-y-10 md:grid-cols-2">{features.map(feature=><article key={feature.title} className="border-t pt-5"><h3 className="text-lg font-medium tracking-tight">{feature.title}</h3><p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">{feature.text}</p></article>)}</div><Button asChild variant="outline" className="mt-10"><Link href="/docs">Read the documentation<ArrowRight/></Link></Button></section>;}
