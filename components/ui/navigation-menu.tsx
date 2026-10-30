"use client";
import * as React from "react";
import { NavigationMenu as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
export function NavigationMenu({className,...props}:React.ComponentProps<typeof Primitive.Root>){return <Primitive.Root className={cn("relative flex",className)} {...props}/>;}
export function NavigationMenuList({className,...props}:React.ComponentProps<typeof Primitive.List>){return <Primitive.List className={cn("flex gap-2",className)} {...props}/>;}
export const NavigationMenuItem=Primitive.Item;
export function NavigationMenuTrigger({className,...props}:React.ComponentProps<typeof Primitive.Trigger>){return <Primitive.Trigger className={cn("rounded-lg px-3 py-2 text-sm hover:bg-muted data-[state=open]:bg-muted",className)} {...props}/>;}
export function NavigationMenuContent({className,...props}:React.ComponentProps<typeof Primitive.Content>){return <Primitive.Content className={cn("absolute top-full left-0 z-20 mt-2 min-w-56 rounded-xl border bg-popover p-3 shadow-sm",className)} {...props}/>;}
export function NavigationMenuLink({className,...props}:React.ComponentProps<typeof Primitive.Link>){return <Primitive.Link className={cn("block rounded-md px-3 py-2 text-sm hover:bg-muted",className)} {...props}/>;}
