
/* ================================================================
   HERRAMIENTA
================================================================ */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const clone=o=>JSON.parse(JSON.stringify(o));
Object.keys(RUBROS).forEach(k=>{$$('.rubroSel').forEach(s=>{const o=document.createElement('option');o.value=k;o.textContent=RUBROS[k].l;s.appendChild(o)})});

const DEF={
 negocio:'',contacto:'',igCliente:'',rubro:'otro',resumen:'',obs:'',oferta:'landing',demo:true,panel:true,incluye:'',pasos:'',
 moneda:'ambas',precioUSD:'150',precioARS:'185000',appUSD:'',appARS:'',detallePago:'',
 items:[
  {label:'Hosting y dominio',mode:'unico',ars:'65000',usd:'',months:'',text:'',detail:'Primer año. El dominio queda a tu nombre.'},
  {label:'Mantenimiento',mode:'gratis_luego',ars:'30000',usd:'',months:'3',text:'',detail:'Revisión mensual para ajustes. Pasados los meses gratis es opcional.'}
 ],
 notas:'El dominio se registra a tu nombre.\nSi más adelante no querés seguir con el mantenimiento, te quedás con los archivos de tu página y con tu dominio.',
 tuNombre:'Dio Rodriguez',pLang:'es',marca:'EstrategIA',miWa:'+54 9 11 2642-5994',miIg:'@estrategia.datos',portafolio:'https://descargar.estrategia.site/#landings',bDark:'#0A0E27',bMain:'#00D9FF',bAcc:'#FF00FF',
 avisoEjemplo:'Las landings de prueba que ves en mi página son solo imágenes de representación y ejemplo. La tuya se arma con tu propio contenido, tus fotos y tus colores.',estado:'nuevo',fEnvio:'',fReescribir:'',nota:'',dmSaved:'',dmGen:'',sheetSaved:'',sheetGen:'',
 desc:'',slogan:'',sloganEn:'',about:'',aboutEn:'',prods:'',difs:'',wa:'',direccion:'',ciudad:'',horarios:'',
 diseno:'otro-1',color:'',lang:'es',modo:'landing',cartel:true,creditos:true,heroImg:'',gal:[],auto:{}
};
let S=clone(DEF);
const KEY='ep_estado_v2',KCL='ep_clientes_v2';
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}
function stripImg(o){const c=clone(o);c.heroImg='';c.gal=[];return c}
function save(){const j=JSON.stringify(S);if(!lsSet(KEY,j))lsSet(KEY,JSON.stringify(stripImg(S)))}
function mixHex(a,b,p){const g=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16));const A=g(a),B=g(b);return '#'+A.map((v,i)=>Math.round(v*p+B[i]*(1-p)).toString(16).padStart(2,'0')).join('')}
function applyBrand(){const r=document.documentElement.style;r.setProperty('--acci',mixHex(S.bMain||'#00D9FF',S.bDark||'#0A0E27',.52));r.setProperty('--ink',S.bDark||'#0A0E27');r.setProperty('--acc',S.bMain||'#00D9FF');r.setProperty('--acc2',S.bAcc||'#FF00FF')}
function fix(){if(S.tuNombre==='Dio')S.tuNombre=DEF.tuNombre;if(/portafolio\.estrategia\.site/.test(S.portafolio||''))S.portafolio=DEF.portafolio;['bDark','bMain','bAcc'].forEach(k=>{if(!/^#[0-9a-f]{6}$/i.test(S[k]||''))S[k]=DEF[k]});if(!Array.isArray(S.items))S.items=clone(DEF.items);if(!S.auto||typeof S.auto!=='object')S.auto={};if(!RUBROS[S.rubro])S.rubro='otro';if(!DESIGN_BY_ID[S.diseno])S.diseno=S.rubro+'-1';if(!Array.isArray(S.gal))S.gal=[]}
(function load(){const j=lsGet(KEY);if(j){try{Object.assign(S,JSON.parse(j))}catch(e){}}fix()})();

/* ---------- textos automáticos del rubro ---------- */
const AUTOF=['slogan','sloganEn','about','aboutEn','difs','prods'];
function presetFor(k){const R=RUBROS[S.rubro]||RUBROS.otro;const n=S.negocio.trim()||'tu negocio';const rep=s=>s.replace(/\{n\}/g,n);
 return{slogan:rep(R.slogan[0]),sloganEn:rep(R.slogan[1]),about:rep(R.about[0]),aboutEn:rep(R.about[1]),difs:R.difs.map(d=>d[0]).join('\n'),prods:R.prods}[k]}
function refreshAuto(){AUTOF.forEach(k=>{if(S.auto[k])S[k]=presetFor(k)})}
function completarRubro(replace){AUTOF.forEach(k=>{if(replace||!String(S[k]).trim()){S[k]=presetFor(k);S.auto[k]=true}})}

/* ================================================================
   BINDING
================================================================ */
function applyLangDefaults(){
 const all=f=>Object.keys(PL).map(l=>f(PL[l])),p=PP();
 if(all(x=>x.def.notas).includes(S.notas))S.notas=p.def.notas;
 if(all(x=>x.def.aviso).includes(S.avisoEjemplo))S.avisoEjemplo=p.def.aviso;
 S.items.forEach(it=>{[['i0'],['i1']].forEach(([k])=>{if(all(x=>x.def[k][0]).includes(it.label)){it.label=p.def[k][0];if(all(x=>x.def[k][1]).includes(it.detail))it.detail=p.def[k][1]}})});
}
function afterChange(k){
 if(k==='pLang'){applyLangDefaults();renderItems()}
 if(AUTOF.includes(k))S.auto[k]=false;
 if(k==='rubro'){S.diseno=S.rubro+'-1';refreshAuto();sync()}
 if(k==='negocio'){refreshAuto();sync()}
 if(k==='moneda')sync();
 if(k==='bDark'||k==='bMain'||k==='bAcc')applyBrand();
}
function bind(){
 $$('[data-k]').forEach(el=>{
  const k=el.dataset.k;
  if(el.classList.contains('seg')){
   el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S[k]=b.dataset.v;afterChange(k);sync();save();render(k)});
  }else{
   const ev=(el.type==='checkbox'||el.tagName==='SELECT')?'change':'input';
   el.addEventListener(ev,()=>{S[k]=el.type==='checkbox'?el.checked:el.value;afterChange(k);save();render(k)});
  }
 });
}
function sync(){
 $$('[data-k]').forEach(el=>{
  const k=el.dataset.k;
  if(el.classList.contains('seg')){[...el.querySelectorAll('button')].forEach(b=>b.classList.toggle('on',b.dataset.v===S[k]))}
  else if(el.type==='checkbox'){el.checked=!!S[k]}
  else if(document.activeElement!==el){el.value=S[k]??''}
 });
 const dz=DESIGN_BY_ID[S.diseno]||DESIGNS.otro[0];
 $('#colorIn').value=S.color||dz.acc;
 $('#pLand').classList.toggle('dim',S.oferta==='app');
 $('#pApp').classList.toggle('dim',S.oferta==='landing');
 drawThumbs();
}

/* ================================================================
   FILAS DE COSTOS
================================================================ */
const MODES={gratis:'Gratis',unico:'Pago único',mensual:'Pago mensual',gratis_luego:'Gratis unos meses y luego mensual',texto:'Texto libre'};
const NEWITEM={
 gratis:{label:'Dominio',mode:'gratis',ars:'',usd:'',months:'',text:'',detail:'Incluido, a tu nombre.'},
 unico:{label:'Concepto',mode:'unico',ars:'',usd:'',months:'',text:'',detail:''},
 mensual:{label:'Servicio mensual',mode:'mensual',ars:'',usd:'',months:'',text:'',detail:''},
 gratis_luego:{label:'Mantenimiento',mode:'gratis_luego',ars:'',usd:'',months:'3',text:'',detail:''},
 texto:{label:'Concepto',mode:'texto',ars:'',usd:'',months:'',text:'',detail:''}
};
function money(a,u){const m=S.moneda,A=num(a),U=num(u),pa=A?ars(A):'',pu=U?usd(U):'';if(m==='usd')return pu||pa;if(m==='ars')return pa||pu;return[pu,pa].filter(Boolean).join(' · ')}
const PP=()=>PL[S.pLang]||PL.es;
function itemAmount(it){
 const p=PP(),mm=n=>n==1?p.mo[0]:p.mo[1];
 switch(it.mode){
  case'gratis':return it.months?p.freeN(it.months,mm(+it.months)):p.free;
  case'unico':return money(it.ars,it.usd)||p.tbd;
  case'mensual':return(money(it.ars,it.usd)||p.tbd)+' '+p.perMo;
  case'gratis_luego':{const n=it.months||3,g=p.freeN(n,mm(+n));const m=money(it.ars,it.usd);return m?p.then(g,m):g}
  default:return it.text||''}
}
function renderItems(){
 $('#items').innerHTML=S.items.map((it,i)=>{
  let sub='';
  if(it.mode==='unico'||it.mode==='mensual')sub=`<div class="row2 sub"><input type="text" data-i="${i}" data-f="ars" value="${esc(it.ars)}" placeholder="$ pesos"><input type="text" data-i="${i}" data-f="usd" value="${esc(it.usd)}" placeholder="USD"></div>`;
  else if(it.mode==='gratis_luego')sub=`<div class="row3 sub"><input type="text" data-i="${i}" data-f="months" value="${esc(it.months)}" placeholder="meses"><input type="text" data-i="${i}" data-f="ars" value="${esc(it.ars)}" placeholder="luego $ / mes"><input type="text" data-i="${i}" data-f="usd" value="${esc(it.usd)}" placeholder="luego USD / mes"></div>`;
  else if(it.mode==='gratis')sub=`<div class="sub"><input type="text" data-i="${i}" data-f="months" value="${esc(it.months)}" placeholder="meses gratis (vacío = siempre gratis)"></div>`;
  else sub=`<div class="sub"><input type="text" data-i="${i}" data-f="text" value="${esc(it.text)}" placeholder="Escribí el monto o la condición como quieras"></div>`;
  return `<div class="it"><div class="r1"><input type="text" data-i="${i}" data-f="label" value="${esc(it.label)}" placeholder="Concepto"><select data-i="${i}" data-f="mode">${Object.keys(MODES).map(m=>`<option value="${m}"${m===it.mode?' selected':''}>${MODES[m]}</option>`).join('')}</select><button class="xb" data-del="${i}" title="Quitar">×</button></div>${sub}<textarea data-i="${i}" data-f="detail" placeholder="Detalle (opcional)">${esc(it.detail)}</textarea></div>`;
 }).join('');
}
$('#items').addEventListener('input',e=>{const t=e.target;if(t.dataset.i==null)return;S.items[+t.dataset.i][t.dataset.f]=t.value;save();render('items')});
$('#items').addEventListener('change',e=>{const t=e.target;if(t.dataset.f==='mode'){S.items[+t.dataset.i].mode=t.value;save();renderItems();render('items')}});
$('#items').addEventListener('click',e=>{const b=e.target.closest('[data-del]');if(!b)return;S.items.splice(+b.dataset.del,1);save();renderItems();render('items')});
$$('[data-add]').forEach(b=>b.addEventListener('click',()=>{S.items.push(clone(NEWITEM[b.dataset.add]));save();renderItems();render('items')}));

/* ================================================================
   PROPUESTA
================================================================ */
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1).replace(/[.!\s]+$/,'');
const lines=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
function model(){
 const p=PP(),n=S.negocio.trim()||({es:'tu negocio',en:'your business',pt:'o seu negócio',it:'la tua attività'}[S.pLang]||'tu negocio'),o=S.oferta;
 const incL=p.incL(n),incA=p.incA.slice();
 if(S.panel){incL.push(p.panL);incA.push(p.panA)}
 const custom=lines(S.incluye);
 const inc=custom.length?[[p.incT,custom]]:o==='landing'?[[p.incT,incL]]:o==='app'?[[p.incT,incA]]:[[p.optA,incL],[p.optB,incA]];
 const opt=p.opt[o==='landing'?'landing':o==='app'?'app':'both'];
 const intro=p.hi+(S.contacto?' '+S.contacto.trim():'')+'. '+p.share(opt,n)+(S.obs.trim()?'. '+cap(S.obs.trim())+'.':'.')+p.idea;
 let steps=lines(S.pasos);
 if(!steps.length){
  steps=[S.demo?p.stDemo:p.stTalk,p.stAdj,p.stPay];
  const fr=S.items.find(it=>(it.mode==='gratis_luego'||it.mode==='gratis')&&num(it.months));
  if(fr)steps.push(p.stSup(num(fr.months),num(fr.months)==1?p.mo[0]:p.mo[1],fr.label.toLowerCase()));
 }
 const rows=[];
 const base=S.detallePago.trim();
 if(o!=='app')rows.push([p.rL,base||p.rLd,money(S.precioARS,S.precioUSD)||p.tbd]);
 if(o!=='landing')rows.push([p.rA,base||p.rAd,money(S.appARS,S.appUSD)||p.tbdA]);
 S.items.forEach(it=>{const am=itemAmount(it);if(!it.label.trim()&&!am)return;rows.push([it.label||'—',it.detail||'',am])});
 return{n,intro,inc,steps,rows,notes:lines(S.notas)};
}
const fixUrl=u=>{u=String(u||'').trim();return u?(/^https?:\/\//i.test(u)?u:'https://'+u):''};
const showUrl=u=>fixUrl(u).replace(/^https?:\/\/(www\.)?/i,'').replace(/\/$/,'');
function links(){
 const w=waNum(S.miWa),ig=igUser(S.miIg),p=fixUrl(S.portafolio);
 return{p,pTxt:showUrl(p),w:w?'https://wa.me/'+w:'',wTxt:S.miWa||'',ig:ig?'https://instagram.com/'+ig:'',igTxt:ig?'@'+ig:''};
}
function sheetHTML(){
 const m=model(),L=links();
 const half=Math.ceil(m.inc[0][1].length/2);
 const incBlock=m.inc.length===1?`<h4>${esc(m.inc[0][0])}</h4><div class="incg"><ul>${m.inc[0][1].slice(0,half).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><ul>${m.inc[0][1].slice(half).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`
  :`<div class="incg">${m.inc.map(([t,l])=>`<div><h4>${esc(t)}</h4><ul>${l.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>`;
 const aviso=(S.avisoEjemplo||'').trim();
 const brand=esc(S.marca||'Mi marca').replace(/(IA)$/,'<i>$1</i>');
 const ft=`<div class="ft"><span>${esc(S.tuNombre||'')}${S.marca?' · '+esc(S.marca):''}</span>${L.p?`<a href="${esc(L.p)}">${esc(L.pTxt)}</a>`:''}${L.w?`<a href="${esc(L.w)}">WhatsApp ${esc(L.wTxt)}</a>`:''}${L.ig?`<a href="${esc(L.ig)}">Instagram ${esc(L.igTxt)}</a>`:''}</div>`;
 const p=PP(),kind=S.oferta==='app'?'a':S.oferta==='landing'?'l':'b';
 const shotTitle=p.shotT[kind];
 const SHK=[['L0','A0','A1'],['L0','L1','L2'],['A0','A2','A1']];const keys=kind==='a'?['A0','A2','A1']:kind==='l'?['L0','L1','L2']:['L0','A0','A1'];
 const shots=p.sh[kind].map((c,i)=>[keys[i],c[0],c[1]]).map(s=>`<figure><img alt="Ejemplo" data-im="${s[0]}" src=""><figcaption>${esc(s[1])}<small>${esc(s[2])}</small></figcaption></figure>`).join('');
 return `<div class="pg p1"><div class="hd"><div class="br">${brand}</div><div class="tag">${esc(p.tag)}</div></div>
 <div class="bd"><h1>${esc(p.title(m.n))}</h1><p class="intro">${esc(m.intro)}</p>
 ${incBlock}
 <h4>${shotTitle}</h4><div class="shots">${shots}</div>
 <p class="nt">${aviso?esc(aviso):''}</p></div>${ft}</div>
 <div class="pg p2"><div class="hd slim"><div class="br">${brand}</div><div class="tag">${esc(p.title(m.n))}</div></div>
 <div class="bd"><h4>${esc(p.how)}</h4><ol class="big">${m.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>
 <h4>${esc(p.inv)}</h4><table class="big">${m.rows.map(r=>`<tr><td>${esc(r[0])}${r[1]?`<small>${esc(r[1])}</small>`:''}</td><td>${esc(r[2])}</td></tr>`).join('')}</table>
 ${m.notes.length?`<p class="nt">${m.notes.map(esc).join(' ')}</p>`:''}
 ${aviso?`<div class="ex">${L.p?`<a href="${esc(L.p)}" style="color:inherit;font-weight:700">${esc(p.proj)}</a><br>`:''}${esc(aviso)}</div>`:''}
 ${L.w?`<p class="cta"><a href="${esc(L.w)}">${esc(p.cta)}</a></p>`:''}</div>${ft}</div>`;
}
const cleanSheet=h=>h.replace(/ src="data:[^"]*"/g,' src=""');
function hydrate(root){const r=S.rubro;root.querySelectorAll('img[data-im]').forEach(im=>{const k=im.dataset.im,set=k[0]==='A'?(IMGS_APP[r]||IMGS_APP.otro):(IMGS[r]||IMGS.otro);im.src=set[+k.slice(1)]||''})}
function sheetText(){
 const m=model(),L=links(),p=PP();let t=`${p.h.prop} ${m.n.toUpperCase()}\n\n${m.intro}\n`;
 m.inc.forEach(([h,l])=>{t+=`\n${h.toUpperCase()}\n`+l.map(x=>'• '+x).join('\n')+'\n'});
 t+=`\n${p.h.how}\n`+m.steps.map((x,i)=>(i+1)+'. '+x).join('\n')+'\n';
 t+=`\n${p.h.inv}\n`+m.rows.map(r=>`• ${r[0]}: ${r[2]}${r[1]?' ('+r[1]+')':''}`).join('\n')+'\n';
 if(m.notes.length)t+='\n'+m.notes.join(' ')+'\n';
 if((S.avisoEjemplo||'').trim())t+='\n'+S.avisoEjemplo.trim()+'\n';
 t+=`\n${S.tuNombre||''}${S.marca?' · '+S.marca:''}\n`;
 if(L.p)t+=p.projL+': '+L.p+'\n';if(L.w)t+='WhatsApp: '+L.w+'\n';if(L.ig)t+='Instagram: '+L.ig;return t.trim();
}
function dmText(){
 const p=PP().dm,c=S.contacto.trim(),n=S.negocio.trim();
 const ph=p.ph[S.oferta==='landing'?'landing':S.oferta==='app'?'app':'both'];
 let t=p.greet(c,S.tuNombre||'Dio Rodriguez',S.marca||'EstrategIA')+'\n\n';
 t+=p.saw(n,S.obs.trim().replace(/[.!\s]+$/,''))+'\n\n';
 t+=p.does+ph+'.\n\n';
 t+=(S.demo?p.demo:p.nodemo)+'\n\n';
 if(S.portafolio)t+=`${p.proj} ${fixUrl(S.portafolio)}\n${(S.avisoEjemplo||'').trim()?p.note+'\n':''}\n`;
 t+=p.end;return t;
}
const longText=()=>dmText()+'\n\n— — —\n\n'+sheetText();
function fitSheet(){
 const sh=$('#sheet');if(!sh)return;let shrunk=false;
 sh.querySelectorAll('.pg').forEach((pg,i)=>{
  let fs=i===0?14.5:18;pg.style.fontSize=fs+'px';
  while(pg.scrollHeight>pg.clientHeight+1&&fs>7){fs-=.25;pg.style.fontSize=fs+'px'}
  if(fs<(i===0?12.5:15))shrunk=true;
 });
 $('#fitInfo').textContent=shrunk?'Texto largo: se achicó para que cada hoja entre en su página.':'';
}
function renderProp(k){
 const g=dmText();
 if(k!=='dm')$('#dm').value=(S.dmSaved&&S.dmGen===g)?S.dmSaved:g;
 const sh=$('#sheet');
 if(document.activeElement!==sh){const h=sheetHTML();sh.innerHTML=(S.sheetSaved&&S.sheetGen===h)?S.sheetSaved:h;hydrate(sh)}
 fitSheet();
}
$('#dm').addEventListener('input',()=>{S.dmSaved=$('#dm').value;S.dmGen=dmText();save()});
$('#sheet').addEventListener('input',()=>{S.sheetSaved=cleanSheet($('#sheet').innerHTML);S.sheetGen=sheetHTML();save();fitSheet()});
$('#regen').onclick=()=>{S.dmSaved='';S.sheetSaved='';save();$('#sheet').blur();renderProp();$('#regen').textContent='¡Listo!';setTimeout(()=>$('#regen').textContent='Regenerar texto',1200)};

/* ================================================================
   GALERÍA DE MODELOS (miniaturas en vivo con el nombre y texto del cliente)
================================================================ */
function fitThumbs(host){$$('#'+host.id+' .sc').forEach(sc=>{const f=sc.firstElementChild;if(f&&sc.clientWidth)f.style.transform='scale('+(sc.clientWidth/1280)+')'})}
function renderGal(host,goLand){
 if(!host||!host.offsetParent)return;
 const cat=S.rubro,list=DESIGNS[cat];
 if(host.dataset.cat!==cat||host.dataset.go!==String(!!goLand)){
  host.dataset.cat=cat;host.dataset.go=String(!!goLand);
  host.innerHTML='<div class="chips">'+Object.keys(RUBROS).map(k=>`<button data-c="${k}" class="${k===cat?'on':''}">${esc(RUBROS[k].l.split(' / ')[0])}</button>`).join('')+'</div><div class="ths">'+list.map(d=>`<div class="th" data-d="${d.id}"><div class="sc"><iframe tabindex="-1" sandbox title="${esc(d.n)}"></iframe></div><b>${esc(d.n)}</b><small>${TPLN[d.t]}</small></div>`).join('')+'</div>';
  host.onclick=e=>{
   const c=e.target.closest('[data-c]');
   if(c){S.rubro=c.dataset.c;S.diseno=S.rubro+'-1';refreshAuto();host.dataset.cat='';sync();save();render('rubro');return}
   const t=e.target.closest('[data-d]');
   if(t){S.diseno=t.dataset.d;S.rubro=DESIGN_BY_ID[S.diseno].cat;S.color='';refreshAuto();sync();save();render('diseno');if(goLand)setTab('land')}
  };
 }
 $$('#'+host.id+' .th').forEach((el,i)=>{
  el.classList.toggle('on',el.dataset.d===S.diseno);
  const f=el.querySelector('iframe');const html=buildLanding(Object.assign({},S,{diseno:list[i].id,color:el.dataset.d===S.diseno?S.color:'',modo:'landing'}),{thumb:true});
  if(f._h!==html){f._h=html;f.srcdoc=html}
 });
 fitThumbs(host);
}
let galTimer;
function scheduleGal(){clearTimeout(galTimer);galTimer=setTimeout(()=>{renderGal($('#galP'),true);renderGal($('#galL'),false)},450)}
window.addEventListener('resize',()=>{fitThumbs($('#galP'));fitThumbs($('#galL'))});

/* ================================================================
   INTERPRETAR DESCRIPCIÓN
================================================================ */
function interpretar(){
 const raw=S.desc||'',t=raw.toLowerCase(),found=[];
 if(!raw.trim()){$('#stat').textContent='Primero escribí algo sobre el negocio.';return}
 let best='',bs=0;Object.keys(RUBROS).forEach(k=>{const sc=RUBROS[k].kw.reduce((a,w)=>a+(t.includes(w)?1:0),0);if(sc>bs){bs=sc;best=k}});
 if(best){S.rubro=best;S.diseno=best+'-1';found.push('rubro: '+RUBROS[best].l)}
 if(!S.negocio.trim()){const m=raw.match(/(?:se llama|llamad[oa]|nombre(?: es)?|negocio|local|tienda|marca|emprendimiento)\s+["“']?([A-ZÁÉÍÓÚÑ0-9][\wÁÉÍÓÚÑáéíóúñ&'.\- ]{1,38}?)["”']?(?=[,.\n;]|\s+(?:y|es|que|vende|está|queda|abre|tiene|ofrece)\b|$)/);if(m){S.negocio=m[1].trim();found.push('nombre')}}
 if(!S.wa.trim()){const m=raw.match(/(\+?\d[\d\s().\-]{8,}\d)/);if(m){S.wa=m[1].trim();found.push('WhatsApp')}}
 if(!S.igCliente.trim()){const m=raw.match(/@([\w.]{3,30})/);if(m){S.igCliente='@'+m[1];found.push('Instagram')}}
 if(!S.horarios.trim()){const re=/(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bados?|domingos?)[^.\n;]{0,70}?\d{1,2}(?::\d{2})?\s*(?:a|-|hasta)\s*\d{1,2}(?::\d{2})?\s*(?:hs|h|horas)?/gi;const hs=[...raw.matchAll(re)].map(x=>x[0].trim().replace(/^./,c=>c.toUpperCase()));if(hs.length){S.horarios=hs.join('\n');found.push('horarios')}}
 if(!S.direccion.trim()){const m=raw.match(/(?:[Qq]ueda en|[Uu]bicad[oa] en|[Dd]irecci[oó]n:?|[Ee]st[aá] en|[Ll]ocal en)\s+((?:[Cc]alle |[Aa]v\.? |[Aa]venida )?[A-ZÁÉÍÓÚÑ0-9][^,.\n;]*?\d{1,5})/);if(m){S.direccion=m[1].trim();found.push('dirección')}}
 if(!S.ciudad.trim()){const m=raw.match(/(?:\b(?:en|de)\s+|,\s*)(Buenos Aires|CABA|Córdoba|Rosario|Mendoza|La Plata|Mar del Plata|Tucumán|Salta|Neuquén|Bariloche|San Juan|Santa Fe|Quilmes|Lanús|Morón|Tigre|Pilar)\b/);if(m){S.ciudad=m[1];found.push('ciudad')}}
 if(!S.resumen.trim()){const m=raw.match(/^[^.\n]{20,170}/);if(m){S.resumen=cap(m[0].trim());found.push('texto corto')}}
 if(!S.prods.trim()){const m=raw.match(/(?:vend[eo]n?|vendemos|ofrece(?:mos)?|hace(?:mos)?|tiene(?:mos)?|trabaj[ao]n? con|especializad[oa]s? en)\s+([^.\n]+)/i);
  if(m){const items=m[1].split(/,|;|\sy\s|\se\s/).map(x=>x.trim().replace(/^(de|la|el|los|las|un|una)\s+/i,'')).filter(x=>x.length>2&&x.length<48&&!/\d{4}/.test(x));
   if(items.length>1){S.prods=items.map(x=>x.charAt(0).toUpperCase()+x.slice(1)+' | Consultar | ').join('\n');found.push(items.length+' productos')}}}
 completarRubro(false);refreshAuto();
 sync();save();render('rubro');
 $('#stat').textContent=found.length?'Detecté: '+found.join(', ')+'. Revisá los campos y corregí lo que haga falta.':'No encontré datos claros; completá los campos a mano.';
}

/* ================================================================
   FOTOS
================================================================ */
function shrink(file,max){return new Promise(res=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.82))};im.onerror=()=>res('');im.src=r.result};r.onerror=()=>res('');r.readAsDataURL(file)})}
function drawThumbs(){$('#heroTh').innerHTML=S.heroImg?`<img src="${S.heroImg}" alt="">`:'';$('#galTh').innerHTML=(S.gal||[]).map(g=>`<img src="${g}" alt="">`).join('')}
$('#heroFile').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;S.heroImg=await shrink(f,1600);drawThumbs();save();render()});
$('#galFile').addEventListener('change',async e=>{const fs=[...e.target.files].slice(0,8);const out=[];for(const f of fs){const d=await shrink(f,1100);if(d)out.push(d)}S.gal=out;drawThumbs();save();render()});
$('#clrImg').onclick=()=>{S.heroImg='';S.gal=[];$('#heroFile').value='';$('#galFile').value='';drawThumbs();save();render()};

/* ================================================================
   RENDER Y ACCIONES
================================================================ */
let lpTimer;
function renderLand(){clearTimeout(lpTimer);lpTimer=setTimeout(()=>{if($('#tab-land').hidden)return;$('#lp').srcdoc=buildLanding(S)},260)}
function render(k){renderProp(k);renderLand();scheduleGal()}
function copy(txt,btn){
 const done=()=>{if(btn){const o=btn.textContent;btn.textContent='¡Copiado!';setTimeout(()=>btn.textContent=o,1300)}};
 const fb=()=>{const t=document.createElement('textarea');t.value=txt;document.body.appendChild(t);t.select();try{document.execCommand('copy');done()}catch(e){}t.remove()};
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done).catch(fb)}else fb();
}
function download(name,txt){const b=new Blob([txt],{type:'text/html'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
$('#cpDM').onclick=e=>copy($('#dm').value,e.target);
$('#cpTxt').onclick=e=>copy(sheetText(),e.target);
let _title=document.title;
function printSheet(){const h=$('#pdfHint');h.hidden=false;_title=document.title;document.title='Propuesta '+(S.negocio.trim()||'')+' - '+(S.marca||'EstrategIA');fitSheet();setTimeout(()=>window.print(),80)}
function mkPrint(){fitSheet();let r=$('#printRoot');if(r)r.remove();r=document.createElement('div');r.id='printRoot';const c=$('#sheet').cloneNode(true);c.removeAttribute('contenteditable');c.removeAttribute('id');r.appendChild(c);hydrate(c);document.body.appendChild(r)}
window.addEventListener('beforeprint',mkPrint);window.addEventListener('afterprint',()=>{document.title=_title;const r=$('#printRoot');if(r)r.remove()});
$('#prt').onclick=printSheet;
function dlBlob(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}
async function exportImgs(single,btn){
 btn=btn||$('#imgDl');const o=btn.textContent;btn.disabled=true;btn.textContent='Generando…';
 try{
  if(document.fonts&&document.fonts.ready)await document.fonts.ready;
  fitSheet();
  const stage=document.createElement('div');stage.style.cssText='position:fixed;left:-12000px;top:0;width:210mm;pointer-events:none';document.body.appendChild(stage);
  const pgs=[...$('#sheet').querySelectorAll('.pg')];
  const canv=[];
  for(let i=0;i<pgs.length;i++){
   const w=document.createElement('div');w.className='sheet';w.style.cssText='width:210mm;margin:0;font-family:\'DM Sans\',system-ui,sans-serif';
   const c=pgs[i].cloneNode(true);c.style.margin='0';c.style.boxShadow='none';w.appendChild(c);stage.appendChild(w);hydrate(w);
   const cv=await html2canvas(c,{scale:2,backgroundColor:'#ffffff',useCORS:true,logging:false});
   if(single)canv.push(cv);else{const blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',.92));dlBlob('Propuesta-'+(slug(S.negocio)||'cliente')+'-hoja'+(i+1)+'.jpg',blob);await new Promise(r=>setTimeout(r,500))}
   w.remove();
  }
  if(single){const W=Math.max(...canv.map(c=>c.width)),H=canv.reduce((a,c)=>a+c.height,0);const big=document.createElement('canvas');big.width=W;big.height=H;const x=big.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,W,H);let y=0;canv.forEach(c=>{x.drawImage(c,0,y);y+=c.height});
   const blob=await new Promise(r=>big.toBlob(r,'image/jpeg',.9));dlBlob('Propuesta-'+(slug(S.negocio)||'cliente')+'.jpg',blob)}
  stage.remove();btn.textContent='¡Listo!';
 }catch(e){btn.textContent='No se pudo, probá de nuevo';console.error(e)}
 setTimeout(()=>{btn.textContent=o;btn.disabled=false},1800);
}
$('#imgDl').onclick=()=>exportImgs(true);
$('#imgDl2').onclick=()=>exportImgs(false,$('#imgDl2'));
$('#longMsg').onclick=()=>{$('#longTxt').value=longText();$('#dlgLong').showModal()};
$('#cpLong').onclick=e=>copy($('#longTxt').value,e.target);
$('#longX').onclick=()=>$('#dlgLong').close();
$('#toLand').onclick=()=>setTab('land');
$('#interp').onclick=interpretar;
$('#fillAll').onclick=()=>{completarRubro(true);sync();save();render();$('#stat').textContent='Textos reemplazados con los del rubro.'};
$('#colorIn').addEventListener('input',e=>{S.color=e.target.value;save();render()});
$('#colorReset').onclick=()=>{S.color='';sync();save();render()};
$('#dlLand').onclick=()=>download('landing-'+slug(S.negocio)+'.html',buildLanding(S));
$('#cpLand').onclick=e=>copy(buildLanding(S),e.target);
$$('#dev button').forEach(b=>b.onclick=()=>{$$('#dev button').forEach(x=>x.classList.toggle('on',x===b));$('#frame').classList.toggle('mob',b.dataset.d==='mob')});
function setTab(t){
 $$('.tab').forEach(s=>s.hidden=s.id!=='tab-'+t);
 $$('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===t));
 try{location.hash=t}catch(e){}
 if(t==='land')$('#lp').srcdoc=buildLanding(S);
 scheduleGal();window.scrollTo(0,0);
}
$$('.tabs button').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));

/* clientes */
function getCl(){try{return JSON.parse(lsGet(KCL)||'{}')}catch(e){return{}}}
function setCl(o){if(!lsSet(KCL,JSON.stringify(o))){const c={};Object.keys(o).forEach(k=>c[k]=stripImg(o[k]));lsSet(KCL,JSON.stringify(c))}}
function fillCl(){const o=getCl();$('#cl').innerHTML='<option value="">— clientes guardados —</option>'+Object.keys(o).sort().map(k=>`<option>${esc(k)}</option>`).join('')}
$('#cSave').onclick=()=>{const k=(S.negocio||'').trim();if(!k){$('#cSave').textContent='Poné un nombre';setTimeout(()=>$('#cSave').textContent='Guardar',1300);return}S.dmSaved=$('#dm').value;S.dmGen=dmText();S.sheetSaved=cleanSheet($('#sheet').innerHTML);S.sheetGen=sheetHTML();save();const o=getCl();const prev=o[k];o[k]=clone(S);if(prev&&$('#cl').value!==k){['estado','fEnvio','fReescribir','nota'].forEach(f=>{if(prev[f]!==undefined)o[k][f]=prev[f]})}setCl(o);fillCl();$('#cl').value=k;segCount();$('#cSave').textContent='¡Guardado!';setTimeout(()=>$('#cSave').textContent='Guardar',1200)};
$('#cl').onchange=e=>{const k=e.target.value;if(!k)return;const o=getCl();if(o[k]){S=Object.assign(clone(DEF),o[k]);fix();applyBrand();renderItems();sync();save();render()}};
$('#cNew').onclick=()=>{const keep=['tuNombre','marca','miWa','miIg','portafolio','bDark','bMain','bAcc','avisoEjemplo','moneda','precioUSD','precioARS','appUSD','appARS','detallePago','items','notas','demo','panel','lang','cartel','creditos','oferta'];const n=clone(DEF);keep.forEach(k=>n[k]=clone(S[k]));S=n;$('#cl').value='';applyBrand();renderItems();sync();save();render()};
$('#cDel').onclick=()=>{const k=$('#cl').value;if(!k)return;const o=getCl();delete o[k];setCl(o);fillCl()};
$('#cImp').onclick=()=>{$('#impSt').textContent='';$('#dlgImp').showModal()};
$('#impX').onclick=()=>$('#dlgImp').close();
$('#impExp').onclick=()=>{const c=stripImg(S);delete c.desc;delete c.auto;$('#impTxt').value=JSON.stringify(c,null,1)};
$('#impOk').onclick=()=>{try{const o=JSON.parse($('#impTxt').value);if(typeof o!=='object'||!o)throw 0;Object.keys(o).forEach(k=>{if(k in DEF&&k!=='heroImg'&&k!=='gal'&&k!=='auto'){S[k]=o[k];if(AUTOF.includes(k))S.auto[k]=false}});if(o.rubro&&!o.diseno)S.diseno=S.rubro+'-1';fix();renderItems();sync();save();render();$('#impSt').textContent='Listo, datos importados.';setTimeout(()=>$('#dlgImp').close(),700)}catch(e){$('#impSt').textContent='No pude leer ese bloque. Tiene que ser JSON válido.'}};

/* seguimiento */
const EST={nuevo:'Sin enviar',enviado:'Ya enviada',respondio:'Respondió',acepto:'Aceptó',denego:'Denegó',nunca:'Nunca respondió'};
const hoy=()=>new Date().toISOString().slice(0,10);
const mas3m=()=>{const d=new Date();d.setMonth(d.getMonth()+3);return d.toISOString().slice(0,10)};
const needsRe=c=>c.estado==='nunca'||c.estado==='denego';
const isDue=c=>needsRe(c)&&c.fReescribir&&c.fReescribir<=hoy();
let segFilter='todos';
function segCount(){const n=Object.values(getCl()).filter(isDue).length;const b=$('#segN');b.hidden=!n;b.textContent=n}
function segSet(name,patch){
 const o=getCl();if(!o[name])return;Object.assign(o[name],patch);setCl(o);
 if($('#cl').value===name){Object.assign(S,patch);save()}
}
function segRender(){
 const o=getCl(),names=Object.keys(o).sort();
 const keys=['todos','due',...Object.keys(EST)];
 $('#segF').innerHTML=keys.map(k=>{const n=k==='todos'?names.length:k==='due'?names.filter(x=>isDue(o[x])).length:names.filter(x=>(o[x].estado||'nuevo')===k).length;return`<button data-f="${k}" class="${segFilter===k?'on':''}">${k==='todos'?'Todos':k==='due'?'Escribir de nuevo':EST[k]} (${n})</button>`}).join('');
 const list=names.filter(x=>segFilter==='todos'||(segFilter==='due'?isDue(o[x]):(o[x].estado||'nuevo')===segFilter));
 $('#segL').innerHTML=list.length?list.map(x=>{const c=o[x],st=c.estado||'nuevo';return`<div class="segrow${isDue(c)?' due':''}" data-n="${esc(x)}">
  <div><b>${esc(x)}</b><small>${esc(c.igCliente||c.contacto||'')}${isDue(c)?' · ¡ya toca escribirle!':''}</small></div>
  <select data-f="estado">${Object.keys(EST).map(k=>`<option value="${k}"${k===st?' selected':''}>${EST[k]}</option>`).join('')}</select>
  <div><small>Enviada el</small><input type="date" data-f="fEnvio" value="${esc(c.fEnvio||'')}"></div>
  <div><small>Escribir de nuevo</small><input type="date" data-f="fReescribir" value="${esc(c.fReescribir||'')}"></div>
  <input type="text" data-f="nota" placeholder="Nota" value="${esc(c.nota||'')}">
  <button class="mini" data-open>Abrir</button></div>`}).join(''):'<p class="hint">No hay clientes en esta lista. Guardá una propuesta con “Guardar” para que aparezca acá.</p>';
}
$('#cSeg').onclick=()=>{segRender();$('#dlgSeg').showModal()};
$('#segX').onclick=()=>{$('#dlgSeg').close();segCount()};
$('#segF').onclick=e=>{const b=e.target.closest('button');if(!b)return;segFilter=b.dataset.f;segRender()};
$('#segL').addEventListener('change',e=>{
 const row=e.target.closest('.segrow');if(!row)return;const n=row.dataset.n,f=e.target.dataset.f,v=e.target.value;if(!f)return;
 const p={[f]:v};
 if(f==='estado'){const c=getCl()[n];if(v!=='nuevo'&&!c.fEnvio)p.fEnvio=hoy();if(needsRe({estado:v}))p.fReescribir=mas3m();else p.fReescribir=''}
 segSet(n,p);segRender();segCount();
});
$('#segL').addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(!b)return;const n=b.closest('.segrow').dataset.n;$('#dlgSeg').close();$('#cl').value=n;$('#cl').onchange({target:$('#cl')})});
/* inicio */
applyBrand();bind();fillCl();segCount();renderItems();sync();renderProp();
if(location.hash==='#land')setTab('land');else scheduleGal();
