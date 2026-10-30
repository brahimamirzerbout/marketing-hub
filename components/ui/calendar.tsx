"use client";
import { useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const monthFormatter=new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric",timeZone:"UTC"});
const dateFormatter=new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeZone:"UTC"});
const keyFor=(date:Date)=>date.toISOString().slice(0,10);
export function Calendar({value,onChange}:{value?:string;onChange?:(value:string)=>void}) {
  const [month,setMonth]=useState(()=>new Date(Date.UTC(2026,9,1)));
  const [internal,setInternal]=useState("2026-10-18");
  const [focused,setFocused]=useState(value||"2026-10-18");
  const buttons=useRef(new Map<string,HTMLButtonElement>());
  const heading=useId(),selected=value??internal;
  const start=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth(),1));
  const days=Array.from({length:42},(_,i)=>new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),1-start.getUTCDay()+i)));
  function move(date:Date,delta:number) {
    const next=new Date(date);next.setUTCDate(next.getUTCDate()+delta);const key=keyFor(next);
    setFocused(key);setMonth(new Date(Date.UTC(next.getUTCFullYear(),next.getUTCMonth(),1)));
    requestAnimationFrame(()=>buttons.current.get(key)?.focus());
  }
  function shiftMonth(delta:number) {const next=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth()+delta,1));setMonth(next);setFocused(keyFor(next));}
  return <div data-slot="calendar" className="w-full max-w-80 p-1">
    <div className="mb-4 flex items-center justify-between"><Button variant="ghost" size="icon-sm" aria-label="Previous month" onClick={()=>shiftMonth(-1)}><ChevronLeft/></Button><div id={heading} aria-live="polite" className="text-sm font-medium">{monthFormatter.format(month)}</div><Button variant="ghost" size="icon-sm" aria-label="Next month" onClick={()=>shiftMonth(1)}><ChevronRight/></Button></div>
    <table role="grid" aria-labelledby={heading} className="w-full table-fixed text-center text-sm"><thead><tr>{["Su","Mo","Tu","We","Th","Fr","Sa"].map((day,i)=><th key={day} scope="col" className="pb-2 text-xs font-normal text-muted-foreground"><abbr className="no-underline" title={["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][i]}>{day}</abbr></th>)}</tr></thead>
      <tbody>{Array.from({length:6},(_,week)=><tr key={week}>{days.slice(week*7,week*7+7).map(date=>{const key=keyFor(date),active=key===selected;return <td key={key} aria-selected={active} className="p-0.5"><button ref={node=>{if(node)buttons.current.set(key,node);else buttons.current.delete(key);}} type="button" aria-label={dateFormatter.format(date)} tabIndex={key===focused?0:-1}
        className={cn("flex aspect-square w-full items-center justify-center rounded-full text-xs hover:bg-muted",date.getUTCMonth()!==month.getUTCMonth()&&"text-muted-foreground",active&&"bg-primary text-primary-foreground hover:bg-primary/85")}
        onFocus={()=>setFocused(key)} onClick={()=>{setInternal(key);onChange?.(key);}}
        onKeyDown={event=>{const delta:Record<string,number>={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7,Home:-date.getUTCDay(),End:6-date.getUTCDay()};if(event.key in delta){event.preventDefault();move(date,delta[event.key]);}else if(event.key==="PageUp"||event.key==="PageDown"){event.preventDefault();const year=date.getUTCFullYear(),month=date.getUTCMonth()+(event.key==="PageUp"?-1:1);const day=Math.min(date.getUTCDate(),new Date(Date.UTC(year,month+1,0)).getUTCDate());const next=new Date(Date.UTC(year,month,day));move(date,(next.getTime()-date.getTime())/86400000);}}}>{date.getUTCDate()}</button></td>;})}</tr>)}</tbody>
    </table><p className="sr-only">Use arrow keys to move by day or week. Page Up and Page Down change month. Enter selects a date.</p>
  </div>;
}
