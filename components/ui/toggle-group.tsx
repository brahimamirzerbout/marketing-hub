"use client";
import * as React from "react";
import { ToggleGroup as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export function ToggleGroup({className,...props}:React.ComponentProps<typeof Primitive.Root>){return <Primitive.Root className={cn("inline-flex gap-1 rounded-full border p-1",className)} {...props}/>;}
export function ToggleGroupItem({className,...props}:React.ComponentProps<typeof Primitive.Item>){return <Primitive.Item className={cn("flex size-8 items-center justify-center rounded-full text-sm hover:bg-muted data-[state=on]:bg-primary data-[state=on]:text-primary-foreground disabled:opacity-50",className)} {...props}/>;}
