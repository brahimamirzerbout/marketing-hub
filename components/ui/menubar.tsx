"use client";
import * as React from "react";
import { Menubar as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export function Menubar({className,...props}:React.ComponentProps<typeof Primitive.Root>){return <Primitive.Root className={cn("flex rounded-lg border p-1",className)} {...props}/>;}
export const MenubarMenu=Primitive.Menu;
export function MenubarTrigger({className,...props}:React.ComponentProps<typeof Primitive.Trigger>){return <Primitive.Trigger className={cn("rounded-md px-3 py-1.5 text-sm outline-none data-[highlighted]:bg-muted data-[state=open]:bg-muted",className)} {...props}/>;}
export function MenubarContent({className,sideOffset=6,...props}:React.ComponentProps<typeof Primitive.Content>){return <Primitive.Portal><Primitive.Content sideOffset={sideOffset} className={cn("z-50 min-w-40 rounded-xl border bg-popover p-1 text-sm shadow-sm",className)} {...props}/></Primitive.Portal>;}
export function MenubarItem({className,...props}:React.ComponentProps<typeof Primitive.Item>){return <Primitive.Item className={cn("rounded-md px-3 py-2 outline-none data-[highlighted]:bg-muted",className)} {...props}/>;}
