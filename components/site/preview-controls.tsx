"use client";
import { useState } from "react";
import { Check, ChevronDown, Plus, MoreHorizontal, ArrowUpRight, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

export function PreviewControls({compact=false}:{compact?:boolean}) {
  const [alignment,setAlignment]=useState("Center");
  return <section aria-label="Interactive component sampler" className={compact?"flex flex-wrap items-center gap-x-3 gap-y-5":"mx-auto mb-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-4 px-2"}>
    <div className="flex gap-2"><Button size="sm" onClick={()=>toast("Primary action selected")}>Button</Button><Button variant="secondary" size="sm" onClick={()=>toast("Secondary action selected")}>Secondary</Button><Button variant="outline" size="sm" onClick={()=>toast("Outline action selected")}>Outline</Button></div>
    <Input aria-label="Sampler name" placeholder="Name" className={compact?"w-full":"w-36"}/>
    {compact&&<Textarea aria-label="Sampler message" placeholder="Message" className="min-h-16 w-full resize-none"/>}
    <Badge>Badge</Badge><Badge variant="secondary">Secondary</Badge>
    <Checkbox aria-label="Accept preview terms" defaultChecked/>
    <RadioGroup aria-label="Sampler density" defaultValue="compact" className="flex w-auto gap-3"><RadioGroupItem aria-label="Compact" value="compact"/><RadioGroupItem aria-label="Comfortable" value="comfortable"/></RadioGroup>
    <Switch aria-label="Enable preview notifications" defaultChecked/>
    <AlertDialog><AlertDialogTrigger asChild><Button variant="outline" size="sm">Dialog</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Reset this preview?</AlertDialogTitle><AlertDialogDescription>This demonstrates an accessible confirmation. It does not delete records.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep preview</AlertDialogCancel><AlertDialogAction onClick={()=>toast("Preview reset demonstrated")}>Reset preview</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    <div role="group" aria-label="Text alignment" className="flex rounded-full border p-0.5">{["Left","Center","Right"].map(value=><Button key={value} aria-pressed={alignment===value} variant={alignment===value?"secondary":"ghost"} size="sm" onClick={()=>setAlignment(value)}>{value}</Button>)}</div>
    <Popover><PopoverTrigger asChild><Button variant="outline" size="icon-sm" aria-label="Add a note"><Plus/></Button></PopoverTrigger><PopoverContent><label htmlFor="quick-note" className="text-sm font-medium">Quick note</label><Textarea id="quick-note" placeholder="Write a note for your team..." className="mt-3"/></PopoverContent></Popover>
    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Preview actions"><MoreHorizontal/></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem onSelect={()=>toast("Duplicate preview created locally")}><Copy/>Duplicate</DropdownMenuItem><DropdownMenuItem onSelect={()=>toast("Preview marked as reviewed")}><Check/>Mark reviewed</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
    <Tooltip><TooltipTrigger asChild><Button size="icon-sm" variant="ghost" asChild><a href="/components" aria-label="Explore all components"><ArrowUpRight/></a></Button></TooltipTrigger><TooltipContent>Explore components</TooltipContent></Tooltip>
  </section>;
}
