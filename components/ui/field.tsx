import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function Field({className,...props}:ComponentProps<"div">){return <div data-slot="field" className={cn("field w-full",className)} {...props}/>;}
export function FieldError({className,...props}:ComponentProps<"p">){return <p role="alert" className={cn("text-sm font-medium",className)} {...props}/>;}
