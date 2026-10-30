"use client";
import { useId, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, ArrowUpRight, Bell, Check, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, CircleDashed, CircleHelp, Clock, CreditCard, FileText, LayoutDashboard, ListFilter, MoreHorizontal, PanelLeft, Plus, Search, Settings, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { transactions, visibleTransactions, money, validateGoal } from "@/lib/demo";
import { cn } from "@/lib/utils";
import { SpendingChart } from "./spending-chart";

const groups=[
  {title:"Overview",items:["Analytics","Transactions","Investments","Accounts","Spending"]},
  {title:"Planning",items:["Documents","Budget","Reports","Goals","Calendar"]},
  {title:"Support",items:["Help Center","Docs","Contact Us","Status","Community"]},
  {title:"Account",items:["Profile","Billing","Notifications","Security","Appearance"]},
];

export function DemoSidebar({className="",cards=false}:{className?:string;cards?:boolean}) {
  const [active,setActive]=useState("Analytics");
  return <aside aria-label="Demonstration navigation" className={cn(cards?"grid grid-cols-2 gap-4":"specimen-sidebar","min-w-0 text-sm",className)}>
    {!cards&&<div className="mb-5 flex items-center gap-2 px-2 font-medium"><div className="flex size-7 items-center justify-center rounded-full bg-foreground text-background"><Wallet className="size-4"/></div>Ledger<span className="ml-auto text-xs text-muted-foreground">Demo</span></div>}
    {groups.map(group=><Collapsible key={group.title} defaultOpen className={cards?"rounded-2xl bg-card p-2 ring-1 ring-foreground/5":"mb-4"}><CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md px-2 py-2 text-xs font-medium text-muted-foreground hover:bg-background"><span>{group.title}</span><ChevronDown className="size-3 transition-transform group-data-[state=closed]:-rotate-90"/></CollapsibleTrigger><CollapsibleContent><ul className="space-y-0.5">{group.items.map((label,index)=>{const Icon=[LayoutDashboard,CreditCard,FileText,Wallet,Settings][index];return <li key={label}><button type="button" aria-pressed={active===label} onClick={()=>{setActive(label);toast(`${label} selected`,{description:"This is a local navigation demonstration."});}} className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs hover:bg-muted",active===label&&"bg-muted font-medium")}><Icon className="size-3.5 shrink-0"/>{label}</button></li>;})}</ul></CollapsibleContent></Collapsible>)}
  </aside>;
}

export function SavingsCard() {
  return <Card><CardHeader><CardTitle>Savings targets</CardTitle><CardDescription>Two goals. One clear view of progress.</CardDescription></CardHeader><CardContent className="space-y-6">
    {[{name:"A place of your own",target:85000,amount:27200,progress:32},{name:"Future fund",target:420000,amount:273000,progress:65}].map(goal=><div key={goal.name}><div className="mb-2 flex items-center justify-between gap-2"><span className="text-sm font-medium">{goal.name}</span><span className="text-xs text-muted-foreground">{money(goal.target)}</span></div><Progress value={goal.progress} aria-label={`${goal.name}: ${goal.progress}% funded`}/><div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>{goal.progress}% achieved</span><span>{money(goal.amount)}</span></div></div>)}
  </CardContent><CardFooter className="border-t pt-4"><p className="text-xs text-muted-foreground">Illustrative balances. No linked accounts.</p></CardFooter></Card>;
}

export function GoalCard() {
  const id=useId();const [name,setName]=useState(""),[amount,setAmount]=useState(""),[date,setDate]=useState("");
  const [error,setError]=useState<string|null>(null),[success,setSuccess]=useState("");
  return <Card><CardHeader><CardTitle>Set a new milestone</CardTitle><CardDescription>Give your next goal a name and a number.</CardDescription></CardHeader><CardContent>
    <form noValidate className="space-y-4" onSubmit={event=>{event.preventDefault();const issue=validateGoal(name,amount,date);setError(issue);if(!issue){setSuccess(`${name.trim()} · ${money(Number(amount))} · ${date}`);toast("Demo goal created");}}}>
      <div className="field"><label htmlFor={`${id}-name`}>Goal name</label><Input id={`${id}-name`} value={name} onChange={e=>setName(e.target.value)} placeholder="Studio renovation" required aria-invalid={!!error&&!name.trim()} aria-describedby={error?`${id}-error`:undefined}/></div>
      <div className="field"><label htmlFor={`${id}-amount`}>Target amount</label><Input id={`${id}-amount`} type="number" inputMode="decimal" min="1" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="12000" required aria-describedby={error?`${id}-error`:undefined}/></div>
      <div className="field"><label htmlFor={`${id}-date`}>Target date</label><Input id={`${id}-date`} type="date" value={date} onChange={e=>setDate(e.target.value)} required aria-describedby={error?`${id}-error`:undefined}/></div>
      {error&&<p role="alert" id={`${id}-error`} className="flex gap-2 text-xs"><CircleHelp className="size-4 shrink-0"/>{error}</p>}
      {success&&<p role="status" className="text-xs">Created for this session: {success}</p>}
      <div className="flex flex-wrap gap-2"><Button type="submit" size="sm">Create goal</Button><Button type="button" variant="ghost" size="sm" onClick={()=>{setName("");setAmount("");setDate("");setError(null);setSuccess("");}}>Clear</Button></div>
    </form>
  </CardContent></Card>;
}

export function TransactionTable() {
  const [query,setQuery]=useState(""),[sort,setSort]=useState<"name"|"amount">("name"),[descending,setDescending]=useState(false),[page,setPage]=useState(0),[selected,setSelected]=useState<string[]>([]);
  const rows=visibleTransactions(transactions,query,sort,descending),pages=Math.max(1,Math.ceil(rows.length/4)),currentPage=Math.min(page,pages-1),visible=rows.slice(currentPage*4,currentPage*4+4);
  const allSelected=visible.length>0&&visible.every(row=>selected.includes(row.id));
  function changeSort(next:"name"|"amount") {setSort(next);setDescending(sort===next?!descending:false);setPage(0);}
  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="relative min-w-0 flex-1 sm:max-w-64"><Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground"/><Input aria-label="Filter demo transactions" className="pl-9" placeholder="Filter transactions..." value={query} onChange={e=>{setQuery(e.target.value);setPage(0);}}/></div><Badge variant="outline">{rows.length} results</Badge></div>
    <div className="overflow-hidden rounded-xl border"><Table><TableCaption className="sr-only">Demonstration transactions. Amounts in US dollars.</TableCaption><TableHeader><TableRow>
      <TableHead className="w-10"><Checkbox aria-label="Select transactions on this page" checked={allSelected?true:visible.some(row=>selected.includes(row.id))?"indeterminate":false} onCheckedChange={checked=>setSelected(previous=>checked?[...new Set([...previous,...visible.map(row=>row.id)])]:previous.filter(id=>!visible.some(row=>row.id===id)))}/></TableHead>
      <TableHead aria-sort={sort==="name"?(descending?"descending":"ascending"):"none"}><button type="button" className="flex items-center gap-1" onClick={()=>changeSort("name")}>Customer{sort==="name"&&(descending?<ArrowDown className="size-3"/>:<ArrowUp className="size-3"/>)}</button></TableHead>
      <TableHead>Status</TableHead><TableHead className="text-right" aria-sort={sort==="amount"?(descending?"descending":"ascending"):"none"}><button type="button" className="ml-auto flex items-center gap-1" onClick={()=>changeSort("amount")}>Amount{sort==="amount"&&(descending?<ArrowDown className="size-3"/>:<ArrowUp className="size-3"/>)}</button></TableHead>
    </TableRow></TableHeader><TableBody>{visible.map(row=><TableRow key={row.id} data-state={selected.includes(row.id)?"selected":undefined}><TableCell><Checkbox aria-label={`Select ${row.name}`} checked={selected.includes(row.id)} onCheckedChange={checked=>setSelected(previous=>checked?[...previous,row.id]:previous.filter(id=>id!==row.id))}/></TableCell><TableCell><div className="font-medium">{row.name}</div><div className="text-xs text-muted-foreground">{row.email}</div></TableCell><TableCell><Badge variant="outline">{row.status==="Completed"?<CircleCheck/>:row.status==="Pending"?<Clock/>:<CircleDashed/>}{row.status}</Badge></TableCell><TableCell className="text-right font-mono tabular-nums">{money(row.amount)}</TableCell></TableRow>)}{!visible.length&&<TableRow><TableCell colSpan={4} className="h-28 text-center">No matching transactions. Try another name or status.</TableCell></TableRow>}</TableBody></Table></div>
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground"><span aria-live="polite">{selected.length} selected · Page {currentPage+1} of {pages}</span><div className="flex gap-2"><Button variant="outline" size="sm" disabled={currentPage===0} onClick={()=>setPage(currentPage-1)}><ChevronLeft/>Previous</Button><Button variant="outline" size="sm" disabled={currentPage>=pages-1} onClick={()=>setPage(currentPage+1)}>Next<ChevronRight/></Button></div></div>
  </div>;
}

export function Dashboard() {
  const [collapsed,setCollapsed]=useState(false);
  return <section aria-label="Interactive dashboard demonstration" className="overflow-hidden rounded-2xl border bg-background">
    <div className="flex items-center justify-between border-b px-4 py-3"><div className="flex items-center gap-3"><Button variant="ghost" size="icon-sm" className="hidden lg:inline-flex" onClick={()=>setCollapsed(v=>!v)} aria-label={collapsed?"Expand dashboard sidebar":"Collapse dashboard sidebar"} aria-expanded={!collapsed} aria-controls="dashboard-sidebar"><PanelLeft/></Button><Sheet><SheetTrigger asChild><Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open dashboard navigation"><PanelLeft/></Button></SheetTrigger><SheetContent side="left"><SheetHeader><SheetTitle>Demo workspace</SheetTitle><SheetDescription>Explore the dashboard navigation.</SheetDescription></SheetHeader><div className="p-6"><DemoSidebar/></div></SheetContent></Sheet><span className="text-sm font-medium">Workspace overview</span><Badge variant="outline" className="hidden sm:flex">Demo data</Badge></div><div className="flex gap-2">
      <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="View notifications"><Bell/></Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Notifications</SheetTitle><SheetDescription>Sample activity in this preview.</SheetDescription></SheetHeader><ul className="space-y-5 p-6">{["Monthly report is ready to review.","Your future-fund milestone reached 65%.","A scheduled transfer needs confirmation."].map(text=><li key={text} className="flex gap-3 text-sm"><Bell className="size-4 shrink-0"/>{text}</li>)}</ul></SheetContent></Sheet>
      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Account menu"><Avatar className="size-7"><AvatarFallback>ML</AvatarFallback></Avatar></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuLabel>Morgan Lee · demo</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem onSelect={()=>toast("Profile selected")}>Profile</DropdownMenuItem><DropdownMenuItem onSelect={()=>toast("Appearance settings are in the top navigation")}>Appearance</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
    </div></div>
    <div className="flex min-w-0"><div id="dashboard-sidebar" hidden={collapsed} className="hidden w-48 shrink-0 border-r bg-muted/40 p-4 lg:block" style={collapsed?{display:"none"}:undefined}><DemoSidebar/></div>
      <div className="min-w-0 flex-1 p-4 sm:p-6"><div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-2xl font-semibold tracking-tight">A little more clarity.</h2><p className="mt-1 text-sm text-muted-foreground">Your activity, goals, and next steps in one place.</p></div><Dialog><DialogTrigger asChild><Button size="sm"><Plus/>New goal</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Create a demo goal</DialogTitle><DialogDescription>Values remain in this local preview session.</DialogDescription></DialogHeader><GoalCard/></DialogContent></Dialog></div>
        <dl className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">{[{name:"Available balance",value:"$24,580.00",detail:"Across two demo accounts"},{name:"Monthly inflow",value:"$8,420.00",detail:"12.8% above previous month"},{name:"Savings rate",value:"32.4%",detail:"2.1 points above last month"}].map(item=><div key={item.name} className="min-w-0 rounded-xl border p-4"><dt className="text-sm text-muted-foreground">{item.name}</dt><dd className="mt-2 break-words text-2xl font-semibold tracking-tight tabular-nums">{item.value}</dd><p className="mt-2 text-xs text-muted-foreground">{item.detail}</p></div>)}</dl>
        <Tabs defaultValue="overview"><TabsList aria-label="Dashboard view"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="transactions">Transactions</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList>
          <TabsContent value="overview" className="mt-5"><div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]"><Card><CardHeader><CardTitle>Spending overview</CardTitle><CardDescription>Six months of demonstration activity.</CardDescription></CardHeader><CardContent><SpendingChart/></CardContent></Card><SavingsCard/></div></TabsContent>
          <TabsContent value="transactions" className="mt-5"><TransactionTable/></TabsContent>
          <TabsContent value="activity" className="mt-5"><ol className="space-y-6">{["Morgan created a new savings goal.","October account statement became available.","Weekly spending summary was reviewed."].map((text,index)=><li key={text} className="flex items-start gap-3 text-sm"><CircleCheck className="size-4 shrink-0"/><div><p>{text}</p><p className="mt-1 text-xs text-muted-foreground">{index+1} hour{index>0?"s":""} ago · demo event</p></div></li>)}</ol></TabsContent>
        </Tabs>
      </div>
    </div>
  </section>;
}
