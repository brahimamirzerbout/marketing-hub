"use client";
import * as React from "react";
import { Slider as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";

export function Slider({className,value,defaultValue=[50],...props}:React.ComponentProps<typeof Primitive.Root>) {
  const values=value??defaultValue;
  return <Primitive.Root data-slot="slider" value={value} defaultValue={defaultValue} className={cn("relative flex w-full touch-none select-none items-center py-3",className)} {...props}>
    <Primitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"><Primitive.Range className="absolute h-full bg-primary"/></Primitive.Track>
    {values.map((_,index)=><Primitive.Thumb key={index} aria-label={values.length>1?`Value ${index+1}`:undefined} className="block size-4 rounded-full border border-primary bg-background shadow-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:opacity-50"/>)}
  </Primitive.Root>;
}
