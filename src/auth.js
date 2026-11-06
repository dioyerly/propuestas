/* ================================================================
   CANDADO DE ACCESO (en el navegador): clave + mail + código de recuperación
================================================================ */
(function(){
const K='ep_auth_v1',KS='ep_ok',MAIL0='dioyer0321@gmail.com';
const $a=s=>document.querySelector(s);
/* SHA-256 compacto (síncrono) */
function sha256(str){
 const rr=(n,x)=>(x>>>n)|(x<<(32-n));
 const kk=[],hh=[];let pc=0;const isP={};
 for(let c=2;pc<64;c++){if(!isP[c]){for(let i=0;i<313;i+=c)isP[i]=c;hh[pc]=(Math.pow(c,.5)*4294967296)|0;kk[pc++]=(Math.pow(c,1/3)*4294967296)|0}}
 const b=unescape(encodeURIComponent(str));const L=b.length;const w=[];
 let s=b+'\x80';while(s.length%64-56)s+='\x00';
 for(let i=0;i<s.length;i++)w[i>>2]|=s.charCodeAt(i)<<((3-i)%4)*8;
 w[w.length]=((L*8)/4294967296)|0;w[w.length]=(L*8)|0;
 let H=hh.slice(0,8);
 for(let j=0;j<w.length;){
  const W=w.slice(j,j+=16),o=H;H=H.slice(0,8);
  for(let i=0;i<64;i++){
   const w15=W[i-15],w2=W[i-2],a=H[0],e=H[4];
   const t1=H[7]+(rr(6,e)^rr(11,e)^rr(25,e))+((e&H[5])^(~e&H[6]))+kk[i]+(W[i]=(i<16)?W[i]:(W[i-16]+(rr(7,w15)^rr(18,w15)^(w15>>>3))+W[i-7]+(rr(17,w2)^rr(19,w2)^(w2>>>10)))|0);
   const t2=(rr(2,a)^rr(13,a)^rr(22,a))+((a&H[1])^(a&H[2])^(H[1]&H[2]));
   H=[(t1+t2)|0].concat(H);H[4]=(H[4]+t1)|0;
  }
  for(let i=0;i<8;i++)H[i]=(H[i]+o[i])|0;
 }
 return H.slice(0,8).map(x=>(x>>>0).toString(16).padStart(8,'0')).join('');
}
function hash(pw,salt){let h=sha256(salt+'|'+pw);for(let i=0;i<4000;i++)h=sha256(salt+h);return h}
window.__sha=sha256;
const rnd=n=>{const a=new Uint8Array(n);(window.crypto||window.msCrypto).getRandomValues(a);return a};
const hex=n=>[...rnd(n)].map(x=>x.toString(16).padStart(2,'0')).join('');
function newCode(){const al='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',r=rnd(16);let s='';r.forEach(x=>s+=al[x%al.length]);return s.match(/.{4}/g).join('-')}
const normCode=c=>String(c||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
const get=()=>{try{return JSON.parse(localStorage.getItem(K)||'null')}catch(e){return null}};
const put=o=>{try{localStorage.setItem(K,JSON.stringify(o));return true}catch(e){return false}};
function setSession(a,keep){try{sessionStorage.setItem(KS,a.ph)}catch(e){}try{if(keep)localStorage.setItem(KS,a.ph);else localStorage.removeItem(KS)}catch(e){}}
function hasSession(a){try{return a&&(sessionStorage.getItem(KS)===a.ph||localStorage.getItem(KS)===a.ph)}catch(e){return false}}
function clearSession(){try{sessionStorage.removeItem(KS);localStorage.removeItem(KS)}catch(e){}}

const box=$a('#lockBox');
function unlock(){document.body.classList.remove('locked');$a('#authBtns').hidden=false;
 try{if(typeof renderProp==='function'){renderProp();scheduleGal()}}catch(e){}window.dispatchEvent(new Event('resize'))}
function lock(){clearSession();location.reload()}
function msg(t,ok){const m=$a('#lockMsg');if(m){m.textContent=t||'';m.className='lm'+(ok?' ok':'')}}
const fld=(id,label,type,val,ph)=>`<label for="${id}">${label}</label><input id="${id}" type="${type||'text'}" value="${val||''}" placeholder="${ph||''}" autocomplete="off">`;

function viewSetup(){
 box.innerHTML=`<h1>Estrateg<i>IA</i> · Estudio</h1><p class="lh">Primera vez: creá tu contraseña para proteger esta página.</p>
 ${fld('lEmail','Tu mail (sirve para recuperar la clave)','email',MAIL0)}${fld('lP1','Contraseña nueva (mínimo 6)','password')}${fld('lP2','Repetí la contraseña','password')}
 <button class="lb" id="lGo">Crear contraseña</button><p class="lm" id="lockMsg"></p>`;
 $a('#lGo').onclick=()=>{
  const em=$a('#lEmail').value.trim().toLowerCase(),p1=$a('#lP1').value,p2=$a('#lP2').value;
  if(!/^\S+@\S+\.\S+$/.test(em))return msg('Revisá el mail.');
  if(p1.length<6)return msg('La contraseña tiene que tener al menos 6 caracteres.');
  if(p1!==p2)return msg('Las contraseñas no coinciden.');
  const code=newCode(),salt=hex(12),rs=hex(12);
  const a={v:1,email:em,salt,ph:hash(p1,salt),rs,rh:hash(normCode(code),rs)};
  if(!put(a))return msg('Este navegador no deja guardar datos. Probá en otra ventana normal (no privada).');
  setSession(a,false);viewCode(code,a);
 };
}
function viewCode(code,a){
 const body=encodeURIComponent('Código de recuperación de EstrategIA Estudio:\n\n'+code+'\n\nGuardalo: si olvidás tu contraseña lo vas a necesitar.');
 box.innerHTML=`<h1>Guardá tu código</h1><p class="lh">Este es tu <b>código de recuperación</b>. Se muestra una sola vez. Con tu mail y este código podés crear una contraseña nueva si la olvidás.</p>
 <div class="code" id="lCode">${code}</div>
 <div class="lrow"><button class="lb alt" id="lCopy">Copiar</button><a class="lb alt" id="lMail" href="mailto:${encodeURIComponent(a.email)}?subject=${encodeURIComponent('Código de recuperación EstrategIA Estudio')}&body=${body}">Enviármelo por mail</a></div>
 <label class="chk"><input type="checkbox" id="lOk"> Ya lo guardé en un lugar seguro</label>
 <button class="lb" id="lGo">Entrar</button><p class="lm" id="lockMsg"></p>`;
 $a('#lCopy').onclick=()=>{const t=code;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>msg('Copiado.',1)).catch(()=>msg('Seleccionalo y copialo a mano.'));else msg('Seleccionalo y copialo a mano.')};
 $a('#lGo').onclick=()=>{if(!$a('#lOk').checked)return msg('Marcá que ya lo guardaste.');unlock()};
}
function viewLogin(){
 const a=get();
 box.innerHTML=`<h1>Estrateg<i>IA</i> · Estudio</h1><p class="lh">Ingresá tu contraseña.</p>
 ${fld('lP','Contraseña','password')}<label class="chk"><input type="checkbox" id="lKeep"> Mantener abierta en este equipo</label>
 <button class="lb" id="lGo">Entrar</button><button class="ll" id="lForgot">Olvidé mi contraseña</button><p class="lm" id="lockMsg"></p>`;
 const go=()=>{const p=$a('#lP').value;if(hash(p,a.salt)===a.ph){setSession(a,$a('#lKeep').checked);unlock()}else{msg('Contraseña incorrecta.');$a('#lP').select()}};
 $a('#lGo').onclick=go;$a('#lP').addEventListener('keydown',e=>{if(e.key==='Enter')go()});$a('#lForgot').onclick=viewRecover;setTimeout(()=>$a('#lP').focus(),50);
}
function viewRecover(){
 const a=get();
 box.innerHTML=`<h1>Recuperar contraseña</h1><p class="lh">Ingresá tu mail y el código de recuperación que guardaste.</p>
 ${fld('lEmail','Mail','email',a.email)}${fld('lC','Código de recuperación','text','','XXXX-XXXX-XXXX-XXXX')}${fld('lP1','Contraseña nueva (mínimo 6)','password')}${fld('lP2','Repetí la contraseña','password')}
 <button class="lb" id="lGo">Cambiar contraseña</button><button class="ll" id="lBack">Volver</button>
 <p class="lh small">¿No tenés el código? Se puede reiniciar borrando los datos del sitio en el navegador, pero se pierden los clientes guardados.</p><p class="lm" id="lockMsg"></p>`;
 $a('#lBack').onclick=viewLogin;
 $a('#lGo').onclick=()=>{
  const em=$a('#lEmail').value.trim().toLowerCase(),c=normCode($a('#lC').value),p1=$a('#lP1').value,p2=$a('#lP2').value;
  if(em!==a.email||hash(c,a.rs)!==a.rh)return msg('El mail o el código no coinciden.');
  if(p1.length<6)return msg('La contraseña tiene que tener al menos 6 caracteres.');
  if(p1!==p2)return msg('Las contraseñas no coinciden.');
  const code=newCode(),salt=hex(12),rs=hex(12);
  const n={v:1,email:a.email,salt,ph:hash(p1,salt),rs,rh:hash(normCode(code),rs)};
  if(!put(n))return msg('No pude guardar. Probá de nuevo.');
  setSession(n,false);viewCode(code,n);
 };
}
/* cambiar contraseña desde adentro */
function viewChange(){
 const a=get();document.body.classList.add('locked');$a('#authBtns').hidden=true;
 box.innerHTML=`<h1>Cambiar contraseña</h1>${fld('lP0','Contraseña actual','password')}${fld('lP1','Contraseña nueva (mínimo 6)','password')}${fld('lP2','Repetí la contraseña nueva','password')}
 <button class="lb" id="lGo">Guardar</button><button class="ll" id="lBack">Cancelar</button><p class="lm" id="lockMsg"></p>`;
 $a('#lBack').onclick=unlock;
 $a('#lGo').onclick=()=>{
  const p0=$a('#lP0').value,p1=$a('#lP1').value,p2=$a('#lP2').value;
  if(hash(p0,a.salt)!==a.ph)return msg('La contraseña actual no es correcta.');
  if(p1.length<6)return msg('La contraseña tiene que tener al menos 6 caracteres.');
  if(p1!==p2)return msg('Las contraseñas no coinciden.');
  const salt=hex(12),n=Object.assign({},a,{salt,ph:hash(p1,salt)});put(n);setSession(n,false);msg('Listo, contraseña cambiada.',1);setTimeout(unlock,900);
 };
}
$a('#aChange').onclick=viewChange;$a('#aOut').onclick=lock;
const a=get();
if(!a)viewSetup();else if(hasSession(a))unlock();else viewLogin();
})();
