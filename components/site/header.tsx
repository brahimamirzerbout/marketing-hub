"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitFork, Menu, Search, Sun, Moon, Monitor, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname=usePathname(),router=useRouter();
  const {theme,setTheme}=useTheme();
  const [searchOpen,setSearchOpen]=useState(false);
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{setMounted(true);const listener=(event:KeyboardEvent)=>{
    if(event.defaultPrevented||event.repeat||event.altKey||event.shiftKey) return;
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k") {event.preventDefault();setSearchOpen(open=>!open);}
  };document.addEventListener("keydown",listener);return()=>document.removeEventListener("keydown",listener);},[]);
  return <header className="sticky top-0 z-40 w-full bg-background">
    <div className="site-container flex h-16 items-center gap-6">
      <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open navigation" className="lg:hidden"><Menu/></Button></SheetTrigger>
        <SheetContent side="left" className="w-72"><SheetHeader><SheetTitle>Monochrome</SheetTitle><SheetDescription>Explore the component foundation.</SheetDescription></SheetHeader>
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4">{navigation.map(item=><SheetClose key={item.href} asChild><Link aria-current={pathname===item.href?"page":undefined} className="rounded-md px-3 py-3 hover:bg-muted" href={item.href}>{item.label}</Link></SheetClose>)}</nav>
        </SheetContent></Sheet>
      <Link href="/" aria-label="Monochrome home" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 16 16 5M8 20 20 8"/></svg><span className="hidden xl:inline">monochrome/ui</span>
      </Link>
      <nav aria-label="Primary" className="hidden items-center gap-5 text-sm lg:flex">{navigation.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?"page":undefined} className={cn("transition-colors hover:text-foreground",pathname===item.href?"text-foreground":"text-muted-foreground")}>{item.label}</Link>)}</nav>
      <div className="ml-auto flex min-w-0 items-center gap-2">
        <Button variant="secondary" className="justify-between gap-8 text-muted-foreground sm:w-52" aria-haspopup="dialog" aria-expanded={searchOpen} onClick={()=>setSearchOpen(true)}>
          <span className="hidden sm:inline">Search documentation...</span><Search className="sm:hidden"/><span className="sr-only sm:hidden">Search documentation</span><kbd className="hidden rounded border bg-background px-1.5 py-.5 font-mono text-xs sm:inline">⌘ K</kbd>
        </Button>
        <Button variant="ghost" size="icon" asChild><a href="https://github.com/shadcn-ui/ui" aria-label="shadcn/ui source on GitHub"><GitFork/></a></Button>
        <span title="Reference count observed October 18, 2026" className="hidden font-mono text-xs text-muted-foreground xl:inline">126k</span>
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Choose theme"><Sun className="dark:hidden"/><Moon className="hidden dark:block"/></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end"><DropdownMenuLabel>Appearance</DropdownMenuLabel><DropdownMenuRadioGroup value={mounted?theme:"light"} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light"><Sun className="mr-2 size-4"/>Light</DropdownMenuRadioItem><DropdownMenuRadioItem value="dark"><Moon className="mr-2 size-4"/>Dark</DropdownMenuRadioItem><DropdownMenuRadioItem value="system"><Monitor className="mr-2 size-4"/>System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>
      </div>
    </div>
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}><DialogContent className="p-2 sm:max-w-xl" showCloseButton={false}>
      <DialogTitle className="sr-only">Search documentation</DialogTitle><DialogDescription className="sr-only">Type a page name. Use arrow keys to select and Enter to navigate.</DialogDescription>
      <Command><CommandInput placeholder="Search pages and components..." aria-label="Search pages"/><CommandList><CommandEmpty>No pages found.</CommandEmpty><CommandGroup heading="Explore">
        {navigation.map(item=><CommandItem key={item.href} onSelect={()=>{setSearchOpen(false);router.push(item.href);}}>{item.label}<ArrowUpRight className="ml-auto size-4"/></CommandItem>)}
      </CommandGroup></CommandList></Command>
    </DialogContent></Dialog>
  </header>;
}
