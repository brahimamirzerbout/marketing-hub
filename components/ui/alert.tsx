import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function Alert({className,...props}:ComponentProps<"div">){return <div role="alert" data-slot="alert" className={cn("relative w-full rounded-xl border bg-card p-4 text-sm [&>svg]:mb-2 [&>svg]:size-4",className)} {...props}/>;}
export function AlertTitle({className,...props}:ComponentProps<"h3">){return <h3 className={cn("mb-1 font-medium",className)} {...props}/>;}
export function AlertDescription({className,...props}:ComponentProps<"div">){return <div className={cn("text-muted-foreground",className)} {...props}/>;}
