const fs=require('fs'),vm=require('vm');const {chromium}=require('playwright');
const ctx={console};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('engine.js','utf8')+';this.buildLanding=buildLanding;this.DESIGNS=DESIGNS;',ctx);
const {buildLanding,DESIGNS}=ctx;
const names={ropa:'Boutique Aurora',cafe:'Café Nube',belleza:'Studio Lumi',ferre:'Ferretería Don Raúl',fitness:'Forma Gym',mascotas:'Patitas Felices',regalos:'Lazos & Flores',servicios:'Estudio Ramos',tech:'Cel Point',otro:'Casa Norte'};
(async()=>{const b=await chromium.launch();const out={};
for(const cat of Object.keys(DESIGNS)){
 const d=DESIGNS[cat][0];
 const S={negocio:names[cat],rubro:cat,diseno:d.id,resumen:'',slogan:'',sloganEn:'',about:'',aboutEn:'',prods:'',difs:'',wa:'11 5555-1234',igCliente:'@demo',direccion:'Av. Corrientes 1234',ciudad:'Buenos Aires',horarios:'Lunes a viernes: 10 a 19 hs',color:'',lang:'es',modo:'pedido',cartel:false,creditos:false,heroImg:'',gal:[],marca:'EstrategIA',portafolio:''};
 const c=await b.newContext({viewport:{width:390,height:700},deviceScaleFactor:1.25,isMobile:true,hasTouch:true});
 const p=await c.newPage();await p.setContent(buildLanding(S));await p.waitForTimeout(900);
 await p.addStyleTag({content:'.rv{opacity:1!important;transform:none!important}html{scroll-behavior:auto!important}'});
 const shots=[];const snap=async()=>{await p.waitForTimeout(600);const buf=await p.screenshot({type:'jpeg',quality:52});if(process.env.SAVE)fs.writeFileSync(`out/im/app-${cat}-${shots.length}.jpg`,buf);shots.push('data:image/jpeg;base64,'+buf.toString('base64'))};
 await p.evaluate(()=>{const e=document.querySelector('#productos');scrollTo({top:e.getBoundingClientRect().top+scrollY-70,behavior:'instant'})});
 await snap();
 const adds=await p.$$('[data-add]');for(let i=0;i<Math.min(3,adds.length);i++){await adds[i].scrollIntoViewIfNeeded();await adds[i].click({force:true});await p.waitForTimeout(100)}
 await p.evaluate(()=>{const e=document.querySelector('#productos');scrollTo({top:e.getBoundingClientRect().top+scrollY-70,behavior:'instant'})});
 await p.click('#cb',{force:true});await snap();
 await p.click('#dx',{force:true});await p.evaluate(()=>{const e=document.querySelector('#productos');scrollTo({top:e.getBoundingClientRect().top+scrollY+560,behavior:'instant'})});
 await snap();
 out[cat]=shots;await c.close();
}
fs.writeFileSync('imgs_app.js','const IMGS_APP='+JSON.stringify(out)+';\n');console.log(fs.statSync('imgs_app.js').size);await b.close()})();
