import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function Empty({className,...props}:ComponentProps<"div">){return <div data-slot="empty" className={cn("flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 text-center",className)} {...props}/>;}
