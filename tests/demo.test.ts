import {test} from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { transactions,visibleTransactions,validateGoal } from "../lib/demo";
import { componentNames,componentId } from "../lib/catalog";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Progress } from "../components/ui/progress";

test("transaction search is case-insensitive, trims input, and matches status",()=>{
  assert.equal(visibleTransactions(transactions,"  MORGAN  ","name",false)[0]?.id,"TX-1001");
  const rows=visibleTransactions(transactions,"pending","name",false);
  assert.equal(rows.length,2);assert.ok(rows.every(row=>row.status==="Pending"));
  assert.equal(visibleTransactions(transactions,"absent","name",false).length,0);
});
test("amount sorting is numeric and leaves source records untouched",()=>{
  const original=transactions.map(row=>row.id);
  const ascending=visibleTransactions(transactions,"","amount",false),descending=visibleTransactions(transactions,"","amount",true);
  assert.equal(ascending[0].amount,150);assert.equal(descending[0].amount,2400);
  assert.deepEqual(ascending.map(row=>row.id).reverse(),descending.map(row=>row.id));assert.deepEqual(transactions.map(row=>row.id),original);
});
test("goal validation rejects invalid amounts and impossible calendar dates",()=>{
  assert.ok(validateGoal("","100","2026-12-01"));
  for(const amount of ["", "0", "-5", "Infinity", "hello"])assert.ok(validateGoal("Studio",amount,"2026-12-01"));
  for(const date of ["", "2026-02-30", "2026-13-01", "2026-2-1"])assert.ok(validateGoal("Studio","100",date));
  assert.equal(validateGoal("Studio","1200.50","2026-12-01"),null);
  assert.equal(validateGoal("Leap year","100","2028-02-29"),null);
});
test("catalog anchors remain unique and navigation-safe",()=>{
  assert.equal(componentNames.length,67);assert.equal(new Set(componentNames.map(componentId)).size,67);
  assert.ok(componentNames.map(componentId).every(id=>/^[a-z0-9-]+$/.test(id)));
});

test("progress exposes its actual numeric value to assistive technology",()=>{
  const html=renderToStaticMarkup(createElement(Progress,{value:65,"aria-label":"Savings goal"}));
  assert.ok(html.includes('role="progressbar"'));assert.ok(html.includes('aria-valuenow="65"'));assert.ok(html.includes('aria-label="Savings goal"'));
});

function luminance(hex:string){const channels=[1,3,5].map(offset=>parseInt(hex.slice(offset,offset+2),16)/255).map(channel=>channel<=.04045?channel/12.92:((channel+.055)/1.055)**2.4);return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;}
function contrast(a:string,b:string){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
function opaqueGray(value:string):string {
  if(/^#[\da-f]{6}$/i.test(value))return value;
  const match=value.match(/^oklch\(([\d.]+) 0 0\)$/);assert.ok(match,`Unsupported opaque neutral: ${value}`);
  const linear=Number(match[1])**3;
  const encoded=linear<=.0031308?linear*12.92:1.055*linear**(1/2.4)-.055;
  return `#${Math.round(encoded*255).toString(16).padStart(2,"0").repeat(3)}`;
}
test("all explicit palette colors are achromatic and core role pairs meet AA",()=>{
  const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
  for(const match of css.matchAll(/#([\da-f]{6})(?:[\da-f]{2})?\b/gi)){const hex=match[1].toLowerCase();assert.equal(hex.slice(0,2),hex.slice(2,4));assert.equal(hex.slice(2,4),hex.slice(4,6));}
  for(const match of css.matchAll(/oklch\(([^)]+)\)/g))assert.match(match[1],/^[\d.]+ 0 0(?: \/ [\d.]+%)?$/);
  for(const selector of [":root, .light", ".dark"]){
    const start=css.indexOf(`${selector} {`),end=css.indexOf("\n}",start);
    assert.ok(start>=0&&end>start);
    const roles=Object.fromEntries([...css.slice(start,end).matchAll(/(--[\w-]+):\s*([^;]+);/gi)].map(match=>[match[1],match[2]]));
    for(const role of ["--background","--foreground","--muted-foreground","--muted","--primary","--primary-foreground","--focus-indicator"])assert.ok(roles[role],`Missing ${selector} ${role}`);
    for(const role of ["--background","--foreground","--muted-foreground","--muted","--primary","--primary-foreground","--focus-indicator","--readable-muted","--chart-4","--card"])roles[role]=opaqueGray(roles[role]);
    assert.ok(contrast(roles["--foreground"],roles["--background"])>=4.5);
    assert.ok(contrast(roles["--muted-foreground"],roles["--background"])>=4.5);
    assert.ok(contrast(roles["--readable-muted"],roles["--muted"])>=4.5);
    assert.ok(contrast(roles["--primary"],roles["--primary-foreground"])>=4.5);
    assert.ok(contrast(roles["--focus-indicator"],roles["--background"])>=3);
    assert.ok(contrast(roles["--chart-4"],roles["--card"])>=3);
  }
});
