"use client";
import * as React from "react";
import { ContextMenu as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export const ContextMenu=Primitive.Root;
export const ContextMenuTrigger=Primitive.Trigger;
export function ContextMenuContent({className,...props}:React.ComponentProps<typeof Primitive.Content>){return <Primitive.Portal><Primitive.Content className={cn("z-50 min-w-40 rounded-xl border bg-popover p-1 text-sm shadow-sm",className)} {...props}/></Primitive.Portal>;}
export function ContextMenuItem({className,...props}:React.ComponentProps<typeof Primitive.Item>){return <Primitive.Item className={cn("flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 outline-none data-[highlighted]:bg-muted data-[disabled]:opacity-50",className)} {...props}/>;}
