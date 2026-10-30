"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUp, Paperclip, RotateCcw, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type Message={id:number;role:"you"|"assistant";text:string};
const response="Start with one clear goal, then divide it into small, measurable steps. This is a scripted preview response; no AI service is connected.";
export function ChatPreview() {
  const [input,setInput]=useState(""),[messages,setMessages]=useState<Message[]>([]),[streaming,setStreaming]=useState(false),[attachments,setAttachments]=useState<string[]>([]);
  const timer=useRef<ReturnType<typeof setInterval>|null>(null),nextId=useRef(1),fileInput=useRef<HTMLInputElement>(null),id=useId();
  function stop(){if(timer.current){clearInterval(timer.current);timer.current=null;}}
  useEffect(()=>()=>{if(timer.current)clearInterval(timer.current);},[]);
  function reset(){stop();setMessages([]);setStreaming(false);setInput("");setAttachments([]);}
  function send(){if(!input.trim()||streaming)return;const userId=nextId.current++,answerId=nextId.current++;const messageText=input.trim()+(attachments.length?` [${attachments.join(", ")}]`:"");setMessages(previous=>[...previous,{id:userId,role:"you",text:messageText},{id:answerId,role:"assistant",text:""}]);setInput("");setAttachments([]);setStreaming(true);let length=0;timer.current=setInterval(()=>{length=Math.min(length+7,response.length);setMessages(previous=>previous.map(message=>message.id===answerId?{...message,text:response.slice(0,length)}:message));if(length>=response.length){stop();setStreaming(false);}},40);}
  return <Card><CardHeader className="flex flex-row items-center justify-between gap-3"><div><CardTitle>New conversation</CardTitle><CardDescription>Scripted assistant preview</CardDescription></div><Button variant="ghost" size="icon-sm" aria-label="Reset conversation" onClick={reset}><RotateCcw/></Button></CardHeader><CardContent className="space-y-4">
    <div className="max-h-64 min-h-44 space-y-3 overflow-y-auto" role="log" aria-label="Demo conversation" aria-live="off">{messages.length?messages.map(message=><div key={message.id} className={message.role==="you"?"ml-6 rounded-xl bg-muted p-3 text-sm":"mr-2 p-2 text-sm"}><span className="mb-1 block text-xs font-medium text-muted-foreground">{message.role==="you"?"You":"Demo assistant"}</span>{message.text||"Preparing a response…"}</div>):<div className="flex min-h-44 flex-col items-center justify-center text-center"><Sparkles className="mb-3 size-6"/><p className="font-medium">What are we building today?</p><p className="mt-2 max-w-52 text-xs text-muted-foreground">Try the composer. Messages stay in this session.</p></div>}</div>
    <form className="rounded-2xl border p-2" onSubmit={event=>{event.preventDefault();send();}}><label htmlFor={id} className="sr-only">Message the demo assistant</label><Textarea id={id} className="min-h-16 resize-none border-0 bg-transparent shadow-none" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a question..." disabled={streaming}/>
      {attachments.length>0&&<p className="px-2 text-xs text-muted-foreground">Selected locally: {attachments.join(", ")}</p>}
      <div className="mt-2 flex items-center justify-between"><input ref={fileInput} type="file" multiple className="sr-only" tabIndex={-1} aria-label="Choose demo attachments" onChange={e=>setAttachments(Array.from(e.target.files??[]).map(file=>file.name))}/><Button type="button" size="icon-sm" variant="ghost" aria-label="Choose attachment (no upload)" onClick={()=>fileInput.current?.click()}><Paperclip/></Button><Button type="submit" size="icon-sm" aria-label="Send message" disabled={!input.trim()||streaming}><ArrowUp/></Button></div>
    </form><p className="text-xs text-muted-foreground" role="status" aria-live="polite">{streaming?"Demo assistant is responding…":messages.length?"Response complete. No external service was contacted.":"Files are not uploaded. No AI service is connected."}</p>
  </CardContent></Card>;
}
