import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function ButtonGroup({className,...props}:ComponentProps<"div">){return <div role="group" data-slot="button-group" className={cn("inline-flex rounded-full border p-0.5 [&>button]:rounded-full",className)} {...props}/>;}
