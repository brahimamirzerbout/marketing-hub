export interface Transaction {id:string;name:string;email:string;amount:number;status:"Completed"|"Pending"|"Review";date:string}
export const transactions:Transaction[]=[
  {id:"TX-1001",name:"Morgan Lee",email:"morgan@example.com",amount:1250,status:"Completed",date:"2026-10-18"},
  {id:"TX-1002",name:"Alex Rivera",email:"alex@example.com",amount:320,status:"Pending",date:"2026-10-17"},
  {id:"TX-1003",name:"Sam Chen",email:"sam@example.com",amount:875,status:"Completed",date:"2026-10-17"},
  {id:"TX-1004",name:"Jordan Ellis",email:"jordan@example.com",amount:2400,status:"Review",date:"2026-10-16"},
  {id:"TX-1005",name:"Taylor Reed",email:"taylor@example.com",amount:150,status:"Completed",date:"2026-10-16"},
  {id:"TX-1006",name:"Casey Park",email:"casey@example.com",amount:685,status:"Pending",date:"2026-10-15"},
  {id:"TX-1007",name:"Drew James",email:"drew@example.com",amount:1920,status:"Completed",date:"2026-10-14"},
];
export function visibleTransactions(rows:readonly Transaction[],query:string,sort:"name"|"amount",descending:boolean) {
  const q=query.trim().toLowerCase();
  return rows.filter(row=>`${row.name} ${row.email} ${row.status}`.toLowerCase().includes(q))
    .sort((a,b)=>(sort==="amount"?a.amount-b.amount:a.name.localeCompare(b.name))*(descending?-1:1));
}
export const money=(amount:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(amount);
export function validateGoal(name:string,amount:string,date:string):string|null {
  if(!name.trim()) return "Give this goal a name.";
  if(!Number.isFinite(Number(amount))||Number(amount)<=0) return "Enter a target greater than zero.";
  const timestamp=Date.parse(`${date}T00:00:00Z`);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(timestamp)||new Date(timestamp).toISOString().slice(0,10)!==date) return "Choose a valid target date.";
  return null;
}
