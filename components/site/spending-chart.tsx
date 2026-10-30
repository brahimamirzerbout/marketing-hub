"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data=[{month:"May",spending:1420,saved:780},{month:"Jun",spending:1260,saved:920},{month:"Jul",spending:1840,saved:640},{month:"Aug",spending:1510,saved:1100},{month:"Sep",spending:1680,saved:1250},{month:"Oct",spending:1390,saved:1480}];
export function SpendingChart({compact=false}:{compact?:boolean}) {
  return <figure aria-label="Demonstration monthly spending and savings">
    <ChartContainer className={compact?"h-36 w-full":"h-60 w-full"} config={{spending:{label:"Spending",color:"var(--chart-1)"},saved:{label:"Saved",color:"var(--chart-4)"}}}>
      <BarChart accessibilityLayer data={data} margin={{left:0,right:0,top:10,bottom:0}}><CartesianGrid vertical={false} stroke="var(--border)"/>
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10}/>{!compact&&<YAxis width={42} tickLine={false} axisLine={false} tickFormatter={v=>`$${v}`}/>}
        <ChartTooltip content={<ChartTooltipContent/>}/><Bar dataKey="spending" fill="var(--color-spending)" radius={[3,3,0,0]}/><Bar dataKey="saved" fill="var(--color-saved)" radius={[3,3,0,0]}/>
      </BarChart>
    </ChartContainer>
    <figcaption className="mt-3 flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><span aria-hidden className="size-2 rounded-sm bg-chart-1"/>Spending</span><span className="flex items-center gap-1.5"><span aria-hidden className="size-2 rounded-sm bg-chart-4"/>Saved</span></figcaption>
    <details className="mt-3 text-xs text-muted-foreground"><summary className="cursor-pointer">View chart data</summary><table className="mt-2 w-full text-left"><caption className="sr-only">Values in US dollars</caption><thead><tr><th scope="col">Month</th><th scope="col">Spending</th><th scope="col">Saved</th></tr></thead><tbody>{data.map(row=><tr key={row.month}><th scope="row" className="font-normal">{row.month}</th><td>${row.spending}</td><td>${row.saved}</td></tr>)}</tbody></table></details>
  </figure>;
}
