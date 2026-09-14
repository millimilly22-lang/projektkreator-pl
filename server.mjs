import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(__dirname,'dist');
const port=Number(process.env.PORT||10000);
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
function send(res,file){fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(data)})}
http.createServer((req,res)=>{const p=decodeURIComponent((req.url||'/').split('?')[0]);const requested=p==='/'?'/index.html':p;const target=path.join(dist,path.normalize(requested));fs.stat(target,(err,stat)=>{if(!err&&stat.isFile())return send(res,target);send(res,path.join(dist,'index.html'))})}).listen(port,'0.0.0.0',()=>console.log(`ProjektKreator.pl running on ${port}`));
