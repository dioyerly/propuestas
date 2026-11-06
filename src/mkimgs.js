const fs=require('fs'),vm=require('vm');const {chromium}=require('playwright');
const ctx={console};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('engine.js','utf8')+';this.buildLanding=buildLanding;this.DESIGNS=DESIGNS;',ctx);
const {buildLanding,DESIGNS}=ctx;
const names={ropa:'Boutique Aurora',cafe:'Café Nube',belleza:'Studio Lumi',ferre:'Ferretería Don Raúl',fitness:'Forma Gym',mascotas:'Patitas Felices',regalos:'Lazos & Flores',servicios:'Estudio Ramos',tech:'Cel Point',otro:'Casa Norte'};
(async()=>{const b=await chromium.launch();const out={};fs.mkdirSync('out/im',{recursive:true});
for(const cat of Object.keys(DESIGNS)){
 const d=DESIGNS[cat][0];
 const S={negocio:names[cat],rubro:cat,diseno:d.id,resumen:'',slogan:'',sloganEn:'',about:'',aboutEn:'',prods:'',difs:'',wa:'11 5555-1234',igCliente:'@demo',direccion:'Av. Corrientes 1234',ciudad:'Buenos Aires',horarios:'Lunes a viernes: 10 a 19 hs\nSábados: 10 a 14 hs',color:'',lang:'es',modo:'landing',cartel:false,creditos:false,heroImg:'',gal:[],marca:'EstrategIA',portafolio:''};
 const html=buildLanding(S);
 const ctxb=await b.newContext({viewport:{width:390,height:700},deviceScaleFactor:1.25,isMobile:true,hasTouch:true});
 const p=await ctxb.newPage();await p.setContent(html);await p.waitForTimeout(900);
 await p.addStyleTag({content:'.rv{opacity:1!important;transform:none!important}*{animation-play-state:paused}'});
 const shots=[];
 for(const sel of [null,'#productos','#visita']){
  if(sel){await p.evaluate(s=>{const e=document.querySelector(s);if(e)window.scrollTo({top:e.getBoundingClientRect().top+scrollY-70,behavior:'instant'})},sel)}else await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await p.waitForTimeout(700);
  const buf=await p.screenshot({type:'jpeg',quality:52});
  fs.writeFileSync(`out/im/${cat}-${shots.length}.jpg`,buf);
  shots.push('data:image/jpeg;base64,'+buf.toString('base64'));
 }
 out[cat]=shots;await ctxb.close();
}
fs.writeFileSync('imgs.js','const IMGS='+JSON.stringify(out)+';\n');
console.log(fs.statSync('imgs.js').size);await b.close()})();
