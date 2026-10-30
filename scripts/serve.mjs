import { createServer } from "node:http";
import { stat, readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root=resolve(process.cwd(),"out");
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".ico":"image/x-icon",".woff":"font/woff",".woff2":"font/woff2",".txt":"text/plain; charset=utf-8"};
const server=createServer(async(request,response)=>{
  if(request.method!=="GET"&&request.method!=="HEAD"){response.writeHead(405,{Allow:"GET, HEAD"});response.end();return;}
  let pathname;try{pathname=decodeURIComponent(new URL(request.url??"/","http://localhost").pathname);}catch{response.writeHead(400);response.end("Bad request");return;}
  const base=resolve(root,`.${pathname}`);
  if(base!==root&&!base.startsWith(root+sep)){response.writeHead(403);response.end("Forbidden");return;}
  for(const candidate of [base,`${base}.html`,resolve(base,"index.html")]){
    try{const info=await stat(candidate);if(!info.isFile())continue;response.writeHead(200,{"Content-Type":mime[extname(candidate)]??"application/octet-stream","Content-Length":info.size,"X-Content-Type-Options":"nosniff"});response.end(request.method==="HEAD"?undefined:await readFile(candidate));return;}catch{}
  }
  response.writeHead(404,{"Content-Type":"text/html; charset=utf-8"});try{response.end(request.method==="HEAD"?undefined:await readFile(resolve(root,"404.html")));}catch{response.end("Not found");}
});
server.listen(3012,"127.0.0.1",()=>console.log("Local static preview: http://127.0.0.1:3012"));
for(const signal of ["SIGINT","SIGTERM"])process.on(signal,()=>server.close(()=>process.exit(0)));
