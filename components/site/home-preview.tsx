"use client";
import { useId, useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Bell, Check, ChevronRight, CreditCard, Download, Ellipsis, Plus, ShieldCheck, Wallet } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DemoSidebar, SavingsCard, GoalCard } from "./dashboard";
import { SpendingChart } from "./spending-chart";
import { ChatPreview } from "./chat-preview";
import { PreviewControls } from "./preview-controls";

function DividendCard(){return <Card><CardHeader><CardTitle>Portfolio income</CardTitle><CardDescription>Four sample positions, one simple view.</CardDescription></CardHeader><CardContent className="space-y-4">{[{name:"Broad market fund",shares:"450 shares",amount:"$216.00"},{name:"Index portfolio",shares:"112 shares",amount:"$84.50"},{name:"Technology fund",shares:"85 shares",amount:"$42.75"},{name:"Property trust",shares:"320 shares",amount:"$96.00"}].map(item=><div className="flex items-center gap-3" key={item.name}><span className="flex size-8 items-center justify-center rounded-full bg-muted"><Wallet className="size-4"/></span><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-muted-foreground">{item.shares}</p></div><span className="text-sm tabular-nums">{item.amount}</span></div>)}</CardContent></Card>;}

function AccessCard(){const id=useId();return <Card><CardHeader><CardTitle>Account access</CardTitle><CardDescription>Preview the familiar sign-in controls.</CardDescription></CardHeader><CardContent><form className="space-y-4" onSubmit={event=>{event.preventDefault();toast("Demo credentials reviewed",{description:"No authentication request was made."});}}><div className="field"><label htmlFor={`${id}-email`}>Email address</label><Input id={`${id}-email`} type="email" placeholder="you@example.com" required autoComplete="off"/></div><div className="field"><label htmlFor={`${id}-password`}>Password</label><Input id={`${id}-password`} type="password" minLength={8} required autoComplete="off" placeholder="At least 8 characters"/></div><Button type="submit" variant="outline" size="sm">Review access</Button></form></CardContent></Card>;}

function BalanceCard() {
  return <Card><CardHeader><CardTitle>Available balance</CardTitle><CardDescription>Ready when you are.</CardDescription></CardHeader><CardContent><p className="text-3xl font-semibold tracking-tight">$1,284.50</p><Badge variant="outline" className="mt-3"><Wallet/>Demo account</Badge><dl className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-muted-foreground">Gross amount</dt><dd>$1,325.00</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Processing</dt><dd>−$40.50</dd></div><div className="flex justify-between border-t pt-3 font-medium"><dt>Available</dt><dd>$1,284.50 USD</dd></div></dl></CardContent><CardFooter><Button className="w-full" variant="secondary" onClick={()=>toast("Demo balance details",{description:"No bank account or payment service is connected."})}>View balance<ArrowUpRight/></Button></CardFooter></Card>;
}

function ThresholdCard() {
  const id=useId();const [threshold,setThreshold]=useState([2500]);const [currency,setCurrency]=useState("USD");
  return <Card><CardHeader><CardTitle>Transfer threshold</CardTitle><CardDescription>Choose when your demo balance moves.</CardDescription></CardHeader><CardContent><form className="space-y-4" onSubmit={e=>{e.preventDefault();toast("Demo threshold saved",{description:`${currency} ${threshold[0].toLocaleString("en-US")} · session preview only`});}}>
    <div className="field"><label htmlFor={`${id}-currency`}>Currency</label><Select value={currency} onValueChange={setCurrency}><SelectTrigger id={`${id}-currency`} className="w-full"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="USD">USD — US Dollar</SelectItem><SelectItem value="EUR">EUR — Euro</SelectItem><SelectItem value="GBP">GBP — British Pound</SelectItem></SelectContent></Select></div>
    <div><label id={`${id}-amount`} className="text-sm font-medium">Minimum transfer</label><p className="mt-2 text-2xl font-semibold tabular-nums">{new Intl.NumberFormat("en-US",{style:"currency",currency}).format(threshold[0])}</p><Slider aria-labelledby={`${id}-amount`} value={threshold} min={50} max={10000} step={50} onValueChange={setThreshold}/><div className="flex justify-between text-xs text-muted-foreground"><span>50 min</span><span>10,000 max</span></div></div>
    <div className="field"><label htmlFor={`${id}-note`}>Notes</label><Textarea id={`${id}-note`} placeholder="Add context for your team..." className="min-h-16"/></div><Button type="submit" size="sm">Save threshold</Button>
  </form></CardContent></Card>;
}

function NotificationsCard() {
  const [saved,setSaved]=useState(false);return <Card><CardHeader><CardTitle>Notifications</CardTitle><CardDescription>A little less noise. The updates you need.</CardDescription></CardHeader><CardContent className="space-y-5">
    {[{name:"Transaction alerts",desc:"Transfers and account activity.",enabled:true},{name:"Security updates",desc:"Sign-ins and account changes.",enabled:true},{name:"Goal milestones",desc:"Progress worth celebrating.",enabled:true},{name:"Weekly summary",desc:"Your week, in a few numbers.",enabled:false}].map(item=><label key={item.name} className="flex cursor-pointer items-start gap-3"><Switch defaultChecked={item.enabled} aria-label={item.name} onCheckedChange={()=>setSaved(false)}/><span><span className="block text-sm font-medium">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.desc}</span></span></label>)}
  </CardContent><CardFooter className="flex-col items-start gap-2"><Button variant="outline" size="sm" onClick={()=>{setSaved(true);toast("Demo preferences saved");}}>Save preferences</Button>{saved&&<p role="status" className="text-xs text-muted-foreground">Saved for this preview session.</p>}</CardFooter></Card>;
}

function DeviceCard() {return <Card><CardHeader><CardTitle>Connect a device</CardTitle><CardDescription>A familiar flow, down to the details.</CardDescription></CardHeader><CardContent className="flex flex-col items-center gap-4"><div className="qr-placeholder w-36" role="img" aria-label="Decorative QR-code placeholder, not scannable">{Array.from({length:169},(_,i)=><span key={i} data-dark={((i*13+i%7*3)%11)<5}/>)}</div><p className="max-w-56 text-center text-xs text-muted-foreground">Illustrative QR placeholder. This preview cannot link a device.</p></CardContent></Card>;}

function PaymentsCard() {return <Card><CardHeader><CardTitle>Account options</CardTitle><CardDescription>Keep your payments in order.</CardDescription></CardHeader><CardContent className="space-y-1">{[{name:"Transfer limit",desc:"Choose a daily sending limit.",icon:Wallet},{name:"Scheduled transfers",desc:"Plan ahead with a specific date.",icon:CreditCard},{name:"Recurring payments",desc:"Review regular outgoing payments.",icon:ShieldCheck}].map(item=><Dialog key={item.name}><DialogTrigger asChild><button type="button" className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-muted"><item.icon className="size-4 shrink-0"/><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.desc}</span></span><ChevronRight className="size-4 shrink-0"/></button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>{item.name}</DialogTitle><DialogDescription>{item.desc} This is a local preview; no payments will be made.</DialogDescription></DialogHeader><label className="field"><span className="text-sm font-medium">Notes for this setting</span><Textarea placeholder="Add a note..."/></label><DialogFooter><DialogClose asChild><Button onClick={()=>toast("Demo setting reviewed")}>Done</Button></DialogClose></DialogFooter></DialogContent></Dialog>)}</CardContent></Card>;}

function CalendarCard() {const [date,setDate]=useState("2026-10-18");return <Card><CardHeader><CardTitle>Make room for what matters.</CardTitle><CardDescription>Select a date for your next review.</CardDescription></CardHeader><CardContent className="flex flex-col items-center"><Calendar value={date} onChange={setDate}/><p className="mt-3 text-xs text-muted-foreground" role="status">Selected: {date}</p></CardContent></Card>;}

export function HomePreview() {
  return <section aria-label="Component ecosystem demonstration" className="preview-frame">
    <div className="specimen-grid">
      <div className="specimen-column"><Card><CardContent><PreviewControls compact/></CardContent></Card><DemoSidebar cards/><SavingsCard/></div>
      <div className="specimen-column"><Card><CardHeader><CardTitle>Contribution history</CardTitle><CardDescription>Six months of demonstration activity.</CardDescription></CardHeader><CardContent><SpendingChart compact/></CardContent><CardFooter><Button variant="outline" size="sm" onClick={()=>toast("Demo report opened")}>View full report</Button></CardFooter></Card><BalanceCard/><DividendCard/></div>
      <div className="specimen-column"><GoalCard/><ThresholdCard/><AccessCard/></div>
      <div className="specimen-column"><DeviceCard/><ChatPreview/><PaymentsCard/></div>
      <div className="specimen-column"><Card><CardHeader><CardTitle>A new project starts here.</CardTitle><CardDescription>Bring a first idea into your workspace.</CardDescription></CardHeader><CardFooter><Button size="sm" onClick={()=>toast("Demo project created")}><Plus/>Create project</Button></CardFooter></Card><Card><CardHeader><CardTitle>Activity overview</CardTitle><CardDescription>Sample workspace visits</CardDescription></CardHeader><CardContent><p className="text-3xl font-semibold">418.2K</p><p className="mt-2 text-xs text-muted-foreground">10% above previous period · demo</p></CardContent></Card><NotificationsCard/><Card><CardHeader><CardTitle>A clearer picture.</CardTitle><CardDescription>Spending and savings · sample data</CardDescription></CardHeader><CardContent><SpendingChart compact/></CardContent></Card></div>
    </div>
  </section>;
}
