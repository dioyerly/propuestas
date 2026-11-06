/* ================================================================
   UTILIDADES
================================================================ */
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=s=>{s=String(s??'').replace(/[^\d.,]/g,'');if(!s)return 0;if(s.indexOf(',')>-1)s=s.replace(/\./g,'').replace(',','.');else if(/\.\d{3}$/.test(s)||(s.match(/\./g)||[]).length>1)s=s.replace(/\./g,'');return parseFloat(s)||0};
const ars=n=>'$'+Math.round(n).toLocaleString('es-AR');
const usd=n=>'USD '+Math.round(n).toLocaleString('es-AR');
const slug=s=>(s||'negocio').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'negocio';
const lum=h=>{h=String(h).replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const c=[0,2,4].map(i=>parseInt(h.substr(i,2),16)/255).map(v=>v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4));return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const igUser=s=>String(s||'').trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i,'').replace(/^@/,'').replace(/\/.*$/,'');

/* ================================================================
   RUBROS: textos base en español e inglés
================================================================ */
const RUBROS={
ropa:{l:'Tienda de ropa',k:['Moda y estilo','Fashion & style'],kw:['ropa','indumentaria','remera','jean','vestido','moda','boutique','camisa','zapatilla','outfit','prenda','lencer','calzado'],
 slogan:['Ropa con estilo propio, pensada para vos','Clothes with a style of your own'],
 about:['En {n} elegimos cada prenda pensando en cómo te sentís al usarla: buena calidad, calce cómodo y diseños que se renuevan en cada temporada.','At {n} we pick every piece thinking about how it feels to wear it: great quality, comfortable fit and designs that change every season.'],
 difs:[['Novedades todas las semanas','New arrivals every week'],['Envíos a todo el país','Shipping nationwide'],['Cambios sin vueltas','Easy exchanges'],['Te asesoramos por WhatsApp','Style advice on WhatsApp']],
 prods:'Remeras básicas | $18.000 | Algodón, varios colores\nJeans rectos | $42.000 | Tiro alto, talles del 36 al 48\nVestidos de temporada | $55.000 | Livianos y fáciles de combinar\nAccesorios | $9.500 | Carteras, cinturones y más',
 pt:['Lo que tenemos','What we have'],cta:['Quiero ver el catálogo','See the catalog'],kind:'goods'},
cafe:{l:'Cafetería / gastronomía',k:['Café y comida casera','Coffee & homemade food'],kw:['café','cafe','cafetería','cafeteria','restaurante','comida','pastelería','pasteleria','panadería','panaderia','bar ','pizzer','hamburguesa','delivery','tortas','gastronom','heladería','heladeria'],
 slogan:['Hecho en el día, servido con cariño','Made fresh, served with care'],
 about:['{n} es ese lugar al que querés volver: ingredientes frescos, recetas de siempre y una atención que te hace sentir en casa.','{n} is that place you want to come back to: fresh ingredients, classic recipes and service that feels like home.'],
 difs:[['Ingredientes frescos todos los días','Fresh ingredients every day'],['Opciones para todos los gustos','Options for every taste'],['Pedidos para llevar y por encargo','Takeaway and custom orders'],['Atención cálida','Warm service']],
 prods:'Café de especialidad | $3.200 | Grano recién molido\nMedialunas | $1.800 | Por unidad, de manteca\nTostado completo | $6.500 | Pan de masa madre\nTorta del día | $5.900 | Consultá los sabores',
 pt:['Nuestra carta','Our menu'],cta:['Quiero hacer un pedido','Place an order'],kind:'goods'},
belleza:{l:'Belleza / peluquería / estética',k:['Belleza y bienestar','Beauty & wellness'],kw:['peluquer','belleza','uñas','unas','manicur','estética','estetica','maquillaje','barber','spa','masaje','depilaci','cejas','pestañas','pestanas','salón','salon'],
 slogan:['Tu momento para sentirte increíble','Your moment to feel amazing'],
 about:['En {n} cuidamos cada detalle: productos de calidad, profesionales con experiencia y un espacio pensado para que te relajes.','At {n} we care about every detail: quality products, experienced professionals and a space designed to help you relax.'],
 difs:[['Turnos online por WhatsApp','Book by WhatsApp'],['Profesionales con experiencia','Experienced professionals'],['Productos de primera calidad','Top-quality products'],['Espacio cómodo y cuidado','A cozy, clean space']],
 prods:'Corte y peinado | $15.000 | Incluye lavado\nColor completo | $38.000 | Consultá según largo\nManicuría semipermanente | $14.000 | Duración 3 semanas\nTratamiento facial | $22.000 | Limpieza profunda',
 pt:['Servicios','Services'],cta:['Quiero sacar un turno','Book an appointment'],kind:'serv'},
ferre:{l:'Ferretería / hogar / construcción',k:['Todo para tu obra y tu hogar','Everything for your home & projects'],kw:['ferreter','herramienta','pintura','tornillo','construcci','corralón','corralon','sanitari','electricidad','bazar','hogar','mueble','deco','colchon','colchón'],
 slogan:['Todo lo que necesitás para tu hogar y tu obra','Everything you need for your home and projects'],
 about:['{n} te acompaña en cada proyecto con productos de calidad, buen precio y asesoramiento de gente que sabe del tema.','{n} supports every project with quality products, fair prices and advice from people who know the trade.'],
 difs:[['Asesoramiento real','Real advice'],['Stock permanente','Always in stock'],['Entregas en la zona','Local delivery'],['Precios para particulares y empresas','Prices for homes and businesses']],
 prods:'Herramientas manuales | Consultar | Marcas reconocidas\nPinturas y accesorios | Consultar | Interior y exterior\nElectricidad | Consultar | Cables, tomas y lámparas\nBaño y cocina | Consultar | Griferías y sanitarios',
 pt:['Rubros','Departments'],cta:['Pedir presupuesto','Request a quote'],kind:'goods'},
fitness:{l:'Gimnasio / fitness / deportes',k:['Entrená a tu ritmo','Train at your pace'],kw:['gimnasio','gym','fitness','entrenamiento','crossfit','pilates','yoga','deporte','personal trainer','entrenador','funcional','running'],
 slogan:['Entrená a tu ritmo, con quien te acompaña','Train at your pace, with people who back you'],
 about:['En {n} armamos un plan para vos, sin importar tu nivel: clases, seguimiento cercano y un ambiente que motiva.','At {n} we build a plan for you at any level: classes, close follow-up and a motivating environment.'],
 difs:[['Primera clase de prueba','Free trial class'],['Grupos reducidos','Small groups'],['Planes flexibles','Flexible plans'],['Seguimiento personalizado','Personalized follow-up']],
 prods:'Clase funcional | $22.000 | Pase mensual, 3 veces por semana\nPilates | $28.000 | Pase mensual\nEntrenamiento personal | $12.000 | Por sesión\nPlan online | $18.000 | Rutina y seguimiento',
 pt:['Planes y clases','Plans & classes'],cta:['Quiero probar una clase','Try a class'],kind:'serv'},
mascotas:{l:'Mascotas / veterinaria',k:['Cuidamos a los que más querés','We care for the ones you love'],kw:['mascota','veterinar','perro','gato','petshop','pet shop','alimento balanceado','peluquería canina','canina'],
 slogan:['Todo para el bienestar de tu mascota','Everything for your pet’s wellbeing'],
 about:['En {n} sabemos que tu mascota es parte de la familia. Por eso elegimos productos y servicios que la cuidan de verdad.','At {n} we know your pet is family, so we choose products and services that truly take care of them.'],
 difs:[['Alimentos de primeras marcas','Premium food brands'],['Envío a domicilio','Home delivery'],['Consejos de gente que ama a los animales','Advice from animal lovers'],['Baño y peluquería','Grooming']],
 prods:'Alimento balanceado | Consultar | Perros y gatos\nAccesorios | Consultar | Correas, camas y juguetes\nBaño y corte | $16.000 | Con turno previo\nAntipulgas y salud | Consultar | Con asesoramiento',
 pt:['Productos y servicios','Products & services'],cta:['Quiero consultar','Ask us'],kind:'goods'},
regalos:{l:'Regalos / flores / decoración',k:['Detalles que emocionan','Details that move people'],kw:['regalo','flores','florería','floreria','ramo','souvenir','cotillón','cotillon','vela','aromas','artesan','decoraci','vivero','plantas','cerámica','ceramica','bijou','joyer'],
 slogan:['Detalles hechos a mano que emocionan','Handmade details that move people'],
 about:['En {n} cada pieza se prepara con dedicación. Armamos regalos y ambientaciones únicos para cada ocasión.','At {n} every piece is made with care. We create unique gifts and settings for every occasion.'],
 difs:[['Hecho a mano','Handmade'],['Personalizado a tu gusto','Customized to your taste'],['Envolvemos para regalar','Gift wrapping included'],['Entregas coordinadas','Scheduled delivery']],
 prods:'Ramo de temporada | $24.000 | Flores frescas\nBox de regalo | $32.000 | Armado a tu gusto\nVelas aromáticas | $9.800 | Cera de soja\nPlantas de interior | $12.500 | Con maceta',
 pt:['Nuestras creaciones','Our creations'],cta:['Quiero encargar un regalo','Order a gift'],kind:'goods'},
servicios:{l:'Servicios profesionales',k:['Profesionales de confianza','Trusted professionals'],kw:['estudio','abogad','contador','contable','consultor','arquitect','inmobiliaria','seguros','psicólog','psicolog','nutricion','odontolog','dentista','clínica','clinica','profesor','clases particulares','coach','fotograf','diseñ','mudanza','plomer','electricista','limpieza'],
 slogan:['Soluciones claras, atención personalizada','Clear solutions, personal attention'],
 about:['En {n} trabajamos con compromiso y claridad. Escuchamos lo que necesitás y te proponemos el mejor camino, sin vueltas.','At {n} we work with commitment and clarity. We listen to what you need and propose the best path, no fuss.'],
 difs:[['Atención personalizada','Personal attention'],['Respuesta rápida','Fast response'],['Presupuestos claros','Clear quotes'],['Experiencia comprobada','Proven experience']],
 prods:'Consulta inicial | Sin cargo | Conversamos sobre tu caso\nServicio principal | Consultar | Según lo que necesites\nPlan mensual | Consultar | Acompañamiento continuo',
 pt:['Servicios','Services'],cta:['Quiero consultar','Get in touch'],kind:'serv'},
tech:{l:'Tecnología / celulares / electrónica',k:['Tecnología al mejor precio','Tech at the best price'],kw:['celular','tecnolog','electrónica','electronica','computaci','notebook','accesorio','funda','auricular','reparaci','gamer','consola','smart'],
 slogan:['La tecnología que necesitás, al mejor precio','The tech you need, at the best price'],
 about:['En {n} te asesoramos para que elijas bien: productos originales, garantía y soporte después de la compra.','At {n} we help you choose well: original products, warranty and post-sale support.'],
 difs:[['Productos con garantía','Warranty included'],['Asesoramiento honesto','Honest advice'],['Servicio técnico','Repair service'],['Envíos y retiro en local','Shipping or in-store pickup']],
 prods:'Celulares | Consultar | Nuevos y reacondicionados\nAccesorios | Consultar | Fundas, cargadores, auriculares\nReparaciones | Consultar | Pantallas y baterías\nNotebooks | Consultar | Para trabajo y estudio',
 pt:['Productos','Products'],cta:['Quiero consultar stock','Check stock'],kind:'goods'},
otro:{l:'Otro tipo de negocio',k:['Bienvenidos','Welcome'],kw:[],
 slogan:['Conocé {n}','Meet {n}'],
 about:['{n} nació para ofrecerte lo mejor de lo que hacemos: calidad, dedicación y trato cercano en cada detalle.','{n} was born to offer you the best of what we do: quality, dedication and a personal touch in every detail.'],
 difs:[['Calidad en cada detalle','Quality in every detail'],['Atención cercana','Personal attention'],['Respuesta rápida','Fast response']],
 prods:'Producto o servicio 1 | $0 | Descripción breve\nProducto o servicio 2 | $0 | Descripción breve\nProducto o servicio 3 | $0 | Descripción breve',
 pt:['Lo que ofrecemos','What we offer'],cta:['Quiero consultar','Get in touch'],kind:'goods'}
};

/* ================================================================
   ILUSTRACIONES (dibujadas con código, viewBox 200x200)
   clases: m1 acento · m2 tinta · m3 claro · sk trazo tinta · sa trazo acento · sw trazo claro
================================================================ */
const MOTIF={
ropa:`<path class="sk" d="M100 46v-8c0-8 12-8 12-18a12 12 0 1 0-24 0"/><path class="m2" d="M100 44 L176 84 Q184 90 174 92 H26 Q16 90 24 84 Z"/><path class="m1" d="M66 92 H134 L128 118 L156 182 Q100 198 44 182 L72 118 Z"/><path class="m3" d="M72 118 H128 L131 128 H69 Z"/><path class="m3" d="M80 92 Q100 114 120 92 Z"/><circle class="m3" cx="100" cy="150" r="3"/><circle class="m3" cx="88" cy="160" r="3"/><circle class="m3" cx="112" cy="162" r="3"/>`,
cafe:`<path class="sk" opacity=".55" d="M82 68c-10-10 10-18 0-32M118 68c-10-10 10-18 0-32"/><ellipse class="m3" cx="100" cy="178" rx="78" ry="13"/><path class="m2" d="M42 84 H158 V124 Q158 170 100 170 Q42 170 42 124 Z"/><path class="sk" stroke-width="11" d="M158 98 H170 Q188 98 188 116 Q188 136 162 136"/><ellipse class="m1" cx="100" cy="84" rx="58" ry="10"/><path class="sw" d="M58 108 Q58 142 78 154"/><path class="m3" d="M92 80 q8-6 16 0 q-8 5-16 0z"/>`,
belleza:`<circle class="m2" cx="84" cy="82" r="52"/><circle class="m3" cx="84" cy="82" r="42"/><rect class="m2" x="77" y="130" width="14" height="52" rx="7"/><path class="sw" stroke="var(--m1)" d="M60 70 Q66 54 84 50"/><rect class="m2" x="130" y="124" width="32" height="58" rx="5"/><rect class="m3" x="130" y="136" width="32" height="6"/><rect class="m1" x="135" y="86" width="22" height="42" rx="3"/><path class="m1" d="M135 90 L157 90 L157 72 Q146 56 135 72 Z"/><path class="m1" d="M156 30 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4Z"/>`,
ferre:`<g transform="rotate(-28 100 100)"><rect class="m1" x="86" y="70" width="18" height="118" rx="9"/><rect class="m2" x="42" y="40" width="92" height="38" rx="7"/><path class="m2" d="M134 46 L176 30 L168 62 L134 72Z"/><rect class="m3" x="50" y="48" width="8" height="22" rx="4" opacity=".55"/></g><polygon class="m3" points="150,124 174,138 174,164 150,178 126,164 126,138"/><circle class="m2" cx="150" cy="151" r="10"/>`,
fitness:`<g transform="rotate(-24 100 100)"><rect class="m2" x="36" y="93" width="128" height="14" rx="7"/><rect class="m2" x="12" y="74" width="16" height="52" rx="6"/><rect class="m1" x="28" y="56" width="26" height="88" rx="10"/><rect class="m1" x="146" y="56" width="26" height="88" rx="10"/><rect class="m2" x="172" y="74" width="16" height="52" rx="6"/><rect class="m3" x="34" y="70" width="5" height="60" rx="2.5" opacity=".65"/><rect class="m3" x="152" y="70" width="5" height="60" rx="2.5" opacity=".65"/></g>`,
mascotas:`<path class="m1" d="M100 100c-28 0-46 24-46 44 0 16 13 22 28 20 8-1 12-4 18-4s10 3 18 4c15 2 28-4 28-20 0-20-18-44-46-44z"/><ellipse class="m1" cx="52" cy="84" rx="13" ry="18" transform="rotate(-22 52 84)"/><ellipse class="m1" cx="82" cy="56" rx="14" ry="20" transform="rotate(-6 82 56)"/><ellipse class="m1" cx="118" cy="56" rx="14" ry="20" transform="rotate(6 118 56)"/><ellipse class="m1" cx="148" cy="84" rx="13" ry="18" transform="rotate(22 148 84)"/><ellipse class="m3" cx="100" cy="142" rx="20" ry="13" opacity=".5"/><path class="m2" d="M168 34c-8-13-25-4-18 9 3 6 18 17 18 17s15-11 18-17c7-13-10-22-18-9z"/>`,
regalos:`<rect class="m1" x="38" y="98" width="124" height="82" rx="8"/><rect class="m2" x="30" y="76" width="140" height="30" rx="8"/><rect class="m3" x="91" y="76" width="18" height="104"/><path class="m3" d="M100 76 C66 22 34 48 60 70 C72 80 92 78 100 76Z"/><path class="m3" d="M100 76 C134 22 166 48 140 70 C128 80 108 78 100 76Z"/><circle class="m2" cx="100" cy="76" r="9"/><path class="m2" d="M172 34 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z"/>`,
servicios:`<rect class="m2" x="44" y="30" width="112" height="148" rx="14"/><rect class="m3" x="54" y="44" width="92" height="124" rx="7"/><rect class="m1" x="76" y="20" width="48" height="26" rx="9"/><path class="sa" d="M70 84 l14 14 30-32"/><rect class="m2" x="68" y="116" width="64" height="7" rx="3.5" opacity=".35"/><rect class="m2" x="68" y="134" width="46" height="7" rx="3.5" opacity=".35"/>`,
tech:`<rect class="m2" x="58" y="18" width="84" height="164" rx="16"/><rect class="m3" x="65" y="32" width="70" height="136" rx="9"/><rect class="m2" x="88" y="36" width="24" height="5" rx="2.5"/><rect class="m1" x="73" y="54" width="54" height="34" rx="7"/><rect class="m2" x="73" y="98" width="54" height="7" rx="3.5" opacity=".3"/><rect class="m2" x="73" y="112" width="38" height="7" rx="3.5" opacity=".3"/><circle class="m1" cx="100" cy="146" r="9"/><path class="sa" stroke-width="7" opacity=".7" d="M158 70 q12 12 0 24M170 60 q20 22 0 44"/>`,
otro:`<path class="m1" d="M28 74 L46 30 H154 L172 74 Z"/><path class="m3" d="M62 30 H80 L76 74 H54Z M104 30 H122 L124 74 H102Z"/><rect class="m2" x="38" y="74" width="124" height="104" rx="5"/><rect class="m3" x="86" y="112" width="30" height="66" rx="3"/><rect class="m3" x="50" y="88" width="28" height="30" rx="3"/><rect class="m3" x="124" y="88" width="28" height="30" rx="3"/><circle class="m1" cx="108" cy="146" r="3"/>`
};
const art=(k,cls)=>`<svg class="mt ${cls||''}" viewBox="0 0 200 200" aria-hidden="true">${MOTIF[k]||MOTIF.otro}</svg>`;

/* ================================================================
   DISEÑOS: 3 por rubro, cada uno con estructura, tipografías y paleta propias
================================================================ */
const TPLN={t1:'Editorial',t2:'Vidrio oscuro',t3:'Bento moderno',t4:'Pop con color',t5:'Suave y orgánico',t6:'Carta elegante'};
const DESIGNS={},DESIGN_BY_ID={};
function DD(cat,i,n,t,f,hf,bf,o){
 const d=Object.assign({id:cat+'-'+i,cat,n,t,f,hf:"'"+hf+"',"+(o.serif?'Georgia,serif':'system-ui,sans-serif'),bf:"'"+bf+"',system-ui,sans-serif",hw:600},o);
 d.ink=o.ink||o.fg;d.lt=o.lt||(o.dark?o.acc2:'#ffffff');d.sh=o.sh||o.fg;
 (DESIGNS[cat]=DESIGNS[cat]||[]).push(d);DESIGN_BY_ID[d.id]=d;
}
const F_FR='Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600',F_SG='Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600',F_CG='Cormorant+Garamond:wght@500;600&family=Montserrat:wght@400;500;600',
 F_YS='Young+Serif&family=Karla:wght@400;500;700',F_BR='Bricolage+Grotesque:wght@600;800&family=DM+Sans:wght@400;500;700',F_PF='Playfair+Display:wght@500;700&family=DM+Sans:wght@400;500;700',
 F_SY='Syne:wght@600;800&family=Inter:wght@400;500;600',F_DS='DM+Serif+Display&family=DM+Sans:wght@400;500;700',F_BB='Bebas+Neue&family=Barlow:wght@400;500;600',F_OU='Outfit:wght@400;500;600;700',
 F_AR='Archivo:wght@400;500;800',F_UN='Unbounded:wght@500;800&family=Inter:wght@400;500;600',F_NU='Nunito:wght@400;700;800',F_MA='Manrope:wght@400;500;700;800';

DD('ropa',1,'Atelier','t1',F_FR,'Fraunces','Inter',{serif:1,bg:'#F6EFE6',fg:'#2B2320',mut:'#7B6B60',card:'#FFFFFF',acc:'#B5532F',acc2:'#EBCFB2',line:'#E6D8C6'});
DD('ropa',2,'Urbano','t3',F_SG,'Space Grotesk','Inter',{bg:'#EFEFEC',fg:'#111111',mut:'#62625E',card:'#FFFFFF',acc:'#5B3DF5',acc2:'#D8FF55',line:'#E0E0DA',hw:700});
DD('ropa',3,'Noir','t6',F_CG,'Cormorant Garamond','Montserrat',{serif:1,dark:1,bg:'#0F0E0D',fg:'#F1EADF',mut:'#A39B8E',card:'#1A1816',acc:'#C8A15A',acc2:'#8C6B2F',line:'#2E2A26'});
DD('cafe',1,'Casero','t5',F_YS,'Young Serif','Karla',{serif:1,hw:400,bg:'#FBF3E4',fg:'#3A2A1E',mut:'#7F6A55',card:'#FFFDF8',acc:'#C7682B',acc2:'#F2D9A9',line:'#EBD9BC'});
DD('cafe',2,'Brunch','t4',F_BR,'Bricolage Grotesque','DM Sans',{hw:800,bg:'#FFF1C9',fg:'#1D1A16',mut:'#58524A',card:'#FFFFFF',acc:'#E8432E',acc2:'#BFE3C8',line:'#1D1A16'});
DD('cafe',3,'Carta','t6',F_PF,'Playfair Display','DM Sans',{serif:1,bg:'#F7F1E5',fg:'#231A12',mut:'#76695A',card:'#FFFFFF',acc:'#8A4B2A',acc2:'#E9D8BA',line:'#DDD0B8'});
DD('belleza',1,'Rosé','t1',F_PF,'Playfair Display','DM Sans',{serif:1,bg:'#FBF1F0',fg:'#3A2428',mut:'#85686C',card:'#FFFFFF',acc:'#C0577A',acc2:'#F5D2D6',line:'#EFD9DA'});
DD('belleza',2,'Glow','t2',F_SY,'Syne','Inter',{dark:1,hw:800,bg:'#110913',fg:'#F8EAF4',mut:'#B79DB1',card:'#1B1020',acc:'#FF6FB5',acc2:'#8E5BFF',line:'#2D1B33'});
DD('belleza',3,'Spa','t5',F_DS,'DM Serif Display','DM Sans',{serif:1,hw:400,bg:'#EEF3EE',fg:'#223028',mut:'#5F7267',card:'#FFFFFF',acc:'#4F8369',acc2:'#E6D6BF',line:'#D6E0D6'});
DD('ferre',1,'Obra','t4',F_BB,'Bebas Neue','Barlow',{hw:400,ht:'uppercase',bg:'#FFF3B0',fg:'#111111',mut:'#4A4733',card:'#FFFFFF',acc:'#FFC400',acc2:'#C9D6E8',line:'#111111'});
DD('ferre',2,'Pro','t3',F_OU,'Outfit','Outfit',{hw:700,bg:'#E8EEF6',fg:'#0B1B2E',mut:'#51647A',card:'#FFFFFF',acc:'#1F5FFF',acc2:'#FFC24D',line:'#D5DEEA'});
DD('ferre',3,'Catálogo','t6',F_AR,'Archivo','Archivo',{hw:800,bg:'#F3F3EF',fg:'#1A1A1A',mut:'#666660',card:'#FFFFFF',acc:'#D64018',acc2:'#E4E2DA',line:'#D8D6CE'});
DD('fitness',1,'Power','t2',F_UN,'Unbounded','Inter',{dark:1,hw:800,bg:'#090A10',fg:'#F2F5FF',mut:'#9AA2BD',card:'#141622',acc:'#B6FF3B',acc2:'#3B82FF',line:'#262A3D'});
DD('fitness',2,'Energía','t4',F_BB,'Bebas Neue','Barlow',{hw:400,ht:'uppercase',bg:'#FFE9DA',fg:'#141414',mut:'#5C4A40',card:'#FFFFFF',acc:'#FF5A1F',acc2:'#FFD0B8',line:'#141414'});
DD('fitness',3,'Club','t3',F_OU,'Outfit','Outfit',{hw:700,bg:'#EEF0F8',fg:'#0E1330',mut:'#57608A',card:'#FFFFFF',acc:'#6C4DFF',acc2:'#3EE0B0',line:'#DADEEE'});
DD('mascotas',1,'Amigos','t5',F_NU,'Nunito','Nunito',{hw:800,bg:'#FFF5E8',fg:'#3B2A20',mut:'#85705F',card:'#FFFFFF',acc:'#F08A32',acc2:'#BFE5DD',line:'#F0DCC2'});
DD('mascotas',2,'Huellitas','t4',F_BR,'Bricolage Grotesque','DM Sans',{hw:800,bg:'#DDF0FF',fg:'#14213D',mut:'#4C5F7E',card:'#FFFFFF',acc:'#2F80ED',acc2:'#FFD97A',line:'#14213D'});
DD('mascotas',3,'Pet Club','t3',F_OU,'Outfit','Outfit',{hw:700,bg:'#E9F4EE',fg:'#12372A',mut:'#52726A',card:'#FFFFFF',acc:'#1F9E68',acc2:'#FFD166',line:'#D2E4DA'});
DD('regalos',1,'Floral','t1',F_FR,'Fraunces','Inter',{serif:1,bg:'#FFF3F1',fg:'#3B2531',mut:'#8A6B78',card:'#FFFFFF',acc:'#D1486B',acc2:'#F8CFD6',line:'#F1D8DB'});
DD('regalos',2,'Jardín','t5',F_DS,'DM Serif Display','DM Sans',{serif:1,hw:400,bg:'#F2F6EC',fg:'#27382B',mut:'#65786A',card:'#FFFFFF',acc:'#6F9444',acc2:'#F6D3B3',line:'#DCE6D0'});
DD('regalos',3,'Fiesta','t2',F_SY,'Syne','Inter',{dark:1,hw:800,bg:'#150E29',fg:'#FFF0FA',mut:'#B7A6CC',card:'#201540',acc:'#FFB703',acc2:'#FF4D8D',line:'#33265A'});
DD('servicios',1,'Estudio','t6',F_CG,'Cormorant Garamond','Montserrat',{serif:1,bg:'#F6F5F1',fg:'#14181F',mut:'#5F6470',card:'#FFFFFF',acc:'#1E3A5F',acc2:'#E5DCC6',line:'#DCD8CC'});
DD('servicios',2,'Corporativo','t3',F_MA,'Manrope','Manrope',{hw:800,bg:'#EAF1F6',fg:'#0F2236',mut:'#546A7C',card:'#FFFFFF',acc:'#0E7490',acc2:'#FFC56B',line:'#D4E0EA'});
DD('servicios',3,'Consultora','t1',F_FR,'Fraunces','Inter',{serif:1,bg:'#F7F3EC',fg:'#1F2A24',mut:'#68746C',card:'#FFFFFF',acc:'#2F5D50',acc2:'#E3D6B8',line:'#E4DCCB'});
DD('tech',1,'Neón','t2',F_SG,'Space Grotesk','Inter',{dark:1,hw:700,bg:'#060A14',fg:'#E8F0FF',mut:'#8FA0C0',card:'#0E1526',acc:'#00E5FF',acc2:'#7C4DFF',line:'#1C2742'});
DD('tech',2,'Smart','t3',F_OU,'Outfit','Outfit',{hw:700,bg:'#EDF1F8',fg:'#0B1220',mut:'#58657B',card:'#FFFFFF',acc:'#0A6CFF',acc2:'#FFB547',line:'#D9E0EC'});
DD('tech',3,'Gamer','t4',F_UN,'Unbounded','Inter',{dark:1,hw:800,bg:'#14102B',fg:'#FFFFFF',mut:'#B3ACD6',card:'#1E1840',acc:'#FF3EA5',acc2:'#3EF2FF',sh:'#3EF2FF',line:'#3EF2FF'});
DD('otro',1,'Clásico','t1',F_FR,'Fraunces','Inter',{serif:1,bg:'#F7F4EE',fg:'#1E2A32',mut:'#667078',card:'#FFFFFF',acc:'#0F766E',acc2:'#EAD9B0',line:'#E5DFD1'});
DD('otro',2,'Moderno','t3',F_MA,'Manrope','Manrope',{hw:800,bg:'#EFEFF4',fg:'#111827',mut:'#5E6679',card:'#FFFFFF',acc:'#4F46E5',acc2:'#F9A8D4',line:'#DEDFEA'});
DD('otro',3,'Vibrante','t4',F_BR,'Bricolage Grotesque','DM Sans',{hw:800,bg:'#FFF1D6',fg:'#1B1B1B',mut:'#5A564D',card:'#FFFFFF',acc:'#FF4D2E',acc2:'#BCD3FF',line:'#1B1B1B'});

/* ================================================================
   TEXTOS DE LA PÁGINA
================================================================ */
const UI={
 es:{about:'Nosotros',prod:'Productos',contact:'Contacto',why:'Por qué elegirnos',visit:'Visitanos',hours:'Horarios',where:'Dónde estamos',map:'Ver en Google Maps',wa:'Escribinos por WhatsApp',ig:'Seguinos en Instagram',gal:'Galería',add:'Agregar',cart:'Tu pedido',empty:'Todavía no agregaste nada.',total:'Total',send:'Enviar pedido por WhatsApp',consult:'Consultar',hello:'Hola! Vi tu página y quiero consultar.',order:'Hola! Quiero hacer este pedido:',ready:'¿Hablamos?',ready2:'Escribinos y te respondemos en el día.',rights:'Todos los derechos reservados',by:'Diseño web por',demo:'Demo de ejemplo para',how:'Cómo funciona',simple:'Así de simple',write:'Escribinos',hi:'¡Hola!'},
 en:{about:'About',prod:'Products',contact:'Contact',why:'Why choose us',visit:'Visit us',hours:'Opening hours',where:'Where to find us',map:'Open in Google Maps',wa:'Message us on WhatsApp',ig:'Follow us on Instagram',gal:'Gallery',add:'Add',cart:'Your order',empty:'Nothing added yet.',total:'Total',send:'Send order on WhatsApp',consult:'Ask',hello:'Hi! I saw your website and would like to ask something.',order:'Hi! I would like to place this order:',ready:'Shall we talk?',ready2:'Write to us and we will reply the same day.',rights:'All rights reserved',by:'Web design by',demo:'Example demo for',how:'How it works',simple:'As simple as it gets',write:'Message us',hi:'Hi!'}
};
const STEPS={
 goods:{es:[['Elegí','Mirá lo que tenemos y quedate con lo que más te guste.'],['Escribinos','Mandanos tu consulta o tu pedido por WhatsApp.'],['Recibilo','Coordinamos el pago y la entrega o el retiro.']],en:[['Choose','Browse what we have and pick what you love.'],['Message us','Send your question or order on WhatsApp.'],['Get it','We arrange payment and delivery or pickup.']]},
 serv:{es:[['Contanos','Escribinos y contanos qué necesitás.'],['Coordinamos','Te proponemos horario o presupuesto, sin vueltas.'],['Listo','Nos encargamos del resto.']],en:[['Tell us','Message us and tell us what you need.'],['We plan','We offer a time or a quote, no fuss.'],['Done','We take care of the rest.']]}
};
function parseProds(txt){return String(txt||'').split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const p=l.split('|').map(x=>x.trim());return{n:p[0],p:p[1]||'',d:p[2]||''}})}
function waNum(s){let d=String(s||'').replace(/\D/g,'');if(!d)return'';if(d.startsWith('00'))d=d.slice(2);if(d.startsWith('54'))return d;if(d.length===10)return'549'+d;if(d.length===11&&d[0]==='0')return'549'+d.slice(1);return d}

/* ================================================================
   CSS DE LA LANDING
================================================================ */
const CSS_BASE=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--fg);font-family:var(--bf);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit}img{max-width:100%;display:block}
.wrap{max-width:1160px;margin:0 auto;padding:0 max(22px,env(safe-area-inset-left))}
h1,h2,h3{font-family:var(--hf);font-weight:var(--hw);line-height:1.04;text-transform:var(--ht,none)}
h2{font-size:clamp(2rem,4.2vw,3.2rem);letter-spacing:-.02em;margin-bottom:18px}h3{font-size:1.25rem}
.eyebrow{display:block;font-size:.76rem;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:var(--acc);margin-bottom:16px}
.nav{position:sticky;top:0;z-index:40;background:color-mix(in srgb,var(--bg) 86%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.nav .wrap{display:flex;align-items:center;gap:18px;height:70px}
.brand{font-family:var(--hf);font-weight:var(--hw);font-size:1.35rem;text-decoration:none;margin-right:auto;text-transform:var(--ht,none)}
.nav nav{display:flex;gap:26px;font-size:.92rem}.nav nav a{text-decoration:none;opacity:.7;transition:.2s}.nav nav a:hover{opacity:1}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:.95em 1.7em;border-radius:var(--rb);background:var(--acc);color:var(--accfg);font:700 .95rem var(--bf);text-decoration:none;border:0;cursor:pointer;transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-3px)}.btn.sm{padding:.5em 1.1em;font-size:.85rem}.btn svg{width:18px;height:18px}
.btn.ghost{background:transparent;color:var(--fg);box-shadow:inset 0 0 0 1.5px var(--line)}
.nbtn{padding:.6em 1.2em;font-size:.86rem}
.lang{display:flex;gap:4px}.lang button{background:none;border:1px solid var(--line);color:var(--mut);padding:.2em .6em;border-radius:6px;cursor:pointer;font:600 .78rem var(--bf)}.lang button.on{background:var(--fg);color:var(--bg)}
.cartbtn{padding:.55em .95em}.cartbtn b{font-size:.85rem}
.mt{display:block;width:100%;height:auto}.mt .m1{fill:var(--m1)}.mt .m2{fill:var(--m2)}.mt .m3{fill:var(--m3)}
.mt .sk,.mt .sa,.mt .sw{fill:none;stroke-width:6;stroke-linecap:round;stroke-linejoin:round}.mt .sk{stroke:var(--m2)}.mt .sa{stroke:var(--m1);stroke-width:11}.mt .sw{stroke:var(--m3)}
.himg{position:absolute;inset:0;background-size:cover;background-position:center}
.lead{font-size:1.15rem;color:var(--mut);max-width:34em;margin:22px 0 32px}.btns{display:flex;gap:12px;flex-wrap:wrap}
.sec{padding:96px 0}.alt{background:var(--bg2)}.head{margin-bottom:44px}
.about{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px;align-items:start}.about p{color:var(--mut);font-size:1.08rem;margin-bottom:16px}
.cd{background:var(--card);border:var(--bd,1px solid var(--line));border-radius:var(--r);box-shadow:var(--sh2,none)}
.pcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:24px}
.pc{overflow:hidden;transition:transform .3s,box-shadow .3s}.pc:hover{transform:translateY(-6px)}
.pc .ph{aspect-ratio:5/4;position:relative;overflow:hidden;background:color-mix(in srgb,var(--stage-c) var(--t),var(--card))}
.pc .ph .mt{position:absolute;width:58%;left:50%;top:52%;transform:translate(-50%,-50%) rotate(var(--rot));transition:transform .5s}.pc:hover .ph .mt{transform:translate(-50%,-52%) rotate(0) scale(1.08)}
.pc .ph .ix{position:absolute;left:16px;top:12px;font-family:var(--hf);font-size:.9rem;opacity:.5}
.pc .bd{padding:20px 22px 22px}.pc h3{margin-bottom:6px}.pc p{color:var(--mut);font-size:.92rem}
.pc .pr{margin-top:14px;display:flex;justify-content:space-between;align-items:center;font-weight:700;gap:10px}
.plist .row{display:flex;align-items:baseline;gap:16px;padding:24px 0;border-bottom:1px solid var(--line)}.plist .row .nm{font-family:var(--hf);font-size:1.55rem;display:block}.plist .row p{color:var(--mut);font-size:.95rem}
.plist .dots{flex:1;border-bottom:2px dotted var(--line);transform:translateY(-6px);min-width:30px}.plist .pr{font-weight:700;color:var(--acc);white-space:nowrap}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.st{padding:34px 30px}.st b{font-family:var(--hf);font-size:3.6rem;line-height:1;color:var(--acc);display:block;margin-bottom:14px}.st p{color:var(--mut);margin-top:8px}
.gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px}.gal img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:var(--r)}
.difs{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:30px}.dif{padding-top:22px;border-top:2px solid var(--acc)}.dif b{font-family:var(--hf);font-size:2.4rem;color:var(--acc);display:block;line-height:1;margin-bottom:12px}
.info{display:grid;grid-template-columns:1fr 1fr;gap:22px}.pad{padding:34px}.pad h3{font-size:1.5rem;margin-bottom:12px}.pad p{color:var(--mut)}
.band{background:var(--acc);color:var(--accfg);text-align:center;padding:96px 0}.band h2{font-size:clamp(2.2rem,5vw,3.8rem)}.band p{opacity:.9}
.band .btn.inv{background:var(--accfg);color:var(--acc)}.band .btn.invl{background:transparent;color:var(--accfg);box-shadow:inset 0 0 0 1.5px currentColor}
footer{padding:36px 0 96px;border-top:1px solid var(--line);color:var(--mut);font-size:.88rem}footer .wrap{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.mq{overflow:hidden;white-space:nowrap}.mqi{display:inline-flex;align-items:center;gap:36px;animation:mq 34s linear infinite;padding:20px 0}.mqi span{font-family:var(--hf);font-weight:var(--hw);font-size:1.5rem;text-transform:var(--ht,none)}.mqi i{width:14px;height:14px;background:var(--acc);clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)}
.wafab{position:fixed;right:18px;bottom:18px;width:58px;height:58px;border-radius:50%;background:#25D366;display:grid;place-items:center;box-shadow:0 10px 26px rgba(0,0,0,.28);z-index:50;transition:transform .2s}.wafab:hover{transform:scale(1.08)}
.demo{position:fixed;left:12px;bottom:14px;background:#111;color:#fff;font:600 .74rem var(--bf);padding:.55em 1em;border-radius:99px;z-index:50;opacity:.92;max-width:calc(100% - 100px)}
.drawer{position:fixed;top:0;right:0;height:100%;width:min(390px,100%);background:var(--card);color:var(--fg);border-left:1px solid var(--line);z-index:60;transform:translateX(105%);transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column}
.drawer.on{transform:none;box-shadow:-20px 0 50px rgba(0,0,0,.25)}.dh{display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:1px solid var(--line)}.dh .x{background:none;border:0;font-size:1.8rem;cursor:pointer;color:var(--fg);line-height:1}
.dl{flex:1;overflow:auto;padding:14px 20px}.ci{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid var(--line)}.ci small{display:block;color:var(--mut)}
.qt{display:flex;align-items:center;gap:10px}.qt button{width:28px;height:28px;border-radius:50%;border:1px solid var(--line);background:transparent;color:var(--fg);cursor:pointer;font-size:1rem}
.df{padding:18px 20px;border-top:1px solid var(--line)}.tt{display:flex;justify-content:space-between;margin-bottom:14px;font-size:1.1rem}
.js .rv{opacity:0;transform:translateY(30px);transition:opacity .9s ease,transform .9s ease}.js .rv.in{opacity:1;transform:none}
.ht>*{animation:up .9s both}.ht>*:nth-child(2){animation-delay:.08s}.ht>*:nth-child(3){animation-delay:.16s}.ht>*:nth-child(4){animation-delay:.24s}.ht>*:nth-child(5){animation-delay:.32s}
@keyframes up{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes mq{to{transform:translateX(-50%)}}
@keyframes blob{0%{transform:translate(0,0) scale(1)}100%{transform:translate(50px,-40px) scale(1.15)}}
@keyframes wob{0%,100%{transform:rotate(10deg)}50%{transform:rotate(-6deg) scale(1.05)}}
html.st *{animation:none!important;transition:none!important}html.st .rv{opacity:1!important;transform:none!important}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1!important;transform:none!important}}
@media(max-width:900px){.about{grid-template-columns:1fr;gap:20px}.steps{grid-template-columns:1fr}.info{grid-template-columns:1fr}.nav nav,.nbtn{display:none}.sec{padding:64px 0}}
`;

const CSS_T={
t1:`
.t1{--r:20px;--rb:99px}
.t1 .nav{border-bottom:1px solid var(--line)}
.t1 .hero{padding:80px 0 110px;position:relative;overflow:hidden}
.t1 .hero::before{content:"";position:absolute;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,var(--stage-c),transparent 68%);opacity:.7;left:-220px;top:-160px}
.t1 .g2{display:grid;grid-template-columns:1.1fr .9fr;gap:64px;align-items:center;position:relative}
.t1 h1{font-size:clamp(2.7rem,6vw,5rem);letter-spacing:-.03em}.t1 h1 em{font-style:italic;color:var(--acc);font-weight:400}
.t1 .hv{position:relative;aspect-ratio:4/5;max-width:470px;justify-self:center;width:100%}
.t1 .arch{position:absolute;inset:0;border-radius:999px 999px 30px 30px;background:var(--stage);overflow:hidden;display:grid;align-items:end;justify-items:center}
.t1 .arch::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 28% 18%,rgba(255,255,255,.6),transparent 52%)}
.t1 .arch .mt{width:82%;margin-bottom:8%;position:relative;z-index:1}
.t1 .chip{position:absolute;background:var(--card);border:1px solid var(--line);border-radius:99px;padding:.75em 1.2em;font-size:.86rem;font-weight:600;box-shadow:0 18px 34px -16px rgba(0,0,0,.35);display:flex;gap:9px;align-items:center;animation:fl 6s ease-in-out infinite;z-index:3}
.t1 .chip svg{width:18px;height:18px;color:var(--acc)}.t1 .c1{left:-9%;top:24%}.t1 .c2{right:-6%;bottom:12%;animation-delay:-3s}
.t1 .rot{position:absolute;width:124px;height:124px;right:-4%;top:-3%;z-index:3}.t1 .rot svg{width:100%;height:100%;animation:spin 24s linear infinite}.t1 .rot text{fill:var(--fg);font-family:var(--bf);font-weight:600}
.t1 .about p:first-child{font-family:var(--hf);color:var(--fg);font-size:clamp(1.4rem,2.4vw,1.9rem);line-height:1.35}
.t1 .pc{--sh2:0 22px 40px -28px rgba(40,25,10,.5)}
.t1 .band{background:linear-gradient(135deg,var(--acc),color-mix(in srgb,var(--acc) 60%,#000))}.t1 .band h2{font-style:italic;font-weight:400}
@media(max-width:900px){.t1 .g2{grid-template-columns:1fr;gap:44px}.t1 .hv{max-width:380px}.t1 .c1{left:-2%}.t1 .c2{right:-2%}}
`,
t2:`
.t2{--r:22px;--rb:99px;--glass:rgba(255,255,255,.06);--bd:1px solid rgba(255,255,255,.1)}
.t2 .nav{background:rgba(0,0,0,.25);border-bottom:1px solid rgba(255,255,255,.08)}
.t2 .hero{position:relative;overflow:hidden;padding:120px 0 130px}
.t2 .blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5;animation:blob 14s ease-in-out infinite alternate}
.t2 .b1{width:540px;height:540px;background:var(--acc);right:-140px;top:-120px}.t2 .b2{width:480px;height:480px;background:var(--acc2);left:-180px;bottom:-180px;animation-delay:-6s}
.t2 .grain{position:absolute;inset:0;opacity:.1;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.t2 .hero .wrap{position:relative;z-index:2}
.t2 .pill{display:inline-flex;gap:10px;align-items:center;padding:.5em 1.1em;border:1px solid rgba(255,255,255,.16);border-radius:99px;background:var(--glass);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;margin-bottom:30px}
.t2 .pill i{width:8px;height:8px;border-radius:50%;background:var(--acc);box-shadow:0 0 14px var(--acc)}
.t2 .ht{max-width:min(700px,100%)}.t2 h1{font-size:clamp(2.6rem,6vw,5.2rem);letter-spacing:-.045em;max-width:10.5em;background:linear-gradient(115deg,var(--fg) 25%,var(--acc) 68%,var(--acc2));-webkit-background-clip:text;background-clip:text;color:transparent}
.t2 .lead{max-width:30em}
.t2 .floatart{position:absolute;right:max(24px,4vw);top:50%;width:min(26vw,360px);margin-top:-190px;animation:fl 7s ease-in-out infinite;z-index:1;filter:drop-shadow(0 40px 60px rgba(0,0,0,.55))}
.t2 .floatart .himg{position:relative;aspect-ratio:1;border-radius:32px;inset:auto}
.t2 .glassrow{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:70px;max-width:780px}
.t2 .gl{padding:20px 22px;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:var(--glass);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);font-size:.92rem}
.t2 .gl b{display:block;font-family:var(--hf);color:var(--acc);margin-bottom:6px}
.t2 .mq{border-block:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.02)}
.t2 .pc{background:var(--glass);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.t2 .pc:hover{box-shadow:0 0 0 1px var(--acc),0 20px 50px -20px var(--acc)}
.t2 .pc .ph{background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--acc) 28%,transparent),transparent 70%)}
.t2 .st{background:var(--glass)}.t2 .band{background:radial-gradient(circle at 20% 0%,var(--acc),transparent 55%),radial-gradient(circle at 90% 100%,var(--acc2),transparent 55%),var(--card);color:var(--fg)}
.t2 .band .btn.inv{background:var(--acc);color:var(--accfg)}.t2 .band .btn.invl{color:var(--fg)}
@media(max-width:1180px){.t2 .ht{max-width:58%}}@media(max-width:900px){.t2 .ht{max-width:100%}.t2 .floatart{position:relative;right:auto;top:auto;margin:40px auto 0;width:min(70vw,320px)}.t2 .glassrow{grid-template-columns:1fr;margin-top:44px}}
`,
t3:`
.t3{--r:28px;--rb:16px}
.t3 .nav{background:transparent;-webkit-backdrop-filter:none;backdrop-filter:none;top:10px}
.t3 .nav .wrap{background:var(--card);border-radius:22px;height:62px;padding:0 20px;box-shadow:0 12px 34px -20px rgba(10,20,40,.45);max-width:1120px}
.t3 .hero{padding:32px 0 70px}
.t3 .bento{display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:minmax(104px,auto);gap:16px}
.t3 .bx{border-radius:28px;padding:34px;position:relative;overflow:hidden;background:var(--card)}
.t3 .big{grid-column:span 7;grid-row:span 4;display:flex;flex-direction:column;justify-content:center}
.t3 .big h1{font-size:clamp(2.5rem,5.2vw,4.4rem);letter-spacing:-.035em}
.t3 .artb{grid-column:span 5;grid-row:span 3;background:var(--stage);display:grid;place-items:center;padding:30px}
.t3 .artb .mt{width:80%;animation:fl 7s ease-in-out infinite}.t3 .artb::before{content:"";position:absolute;width:70%;aspect-ratio:1;border-radius:50%;background:var(--acc);opacity:.18;left:-12%;bottom:-18%}
.t3 .waT{grid-column:span 5;grid-row:span 1;background:var(--fg);color:var(--bg);text-decoration:none;display:flex;align-items:center;justify-content:space-between;font-family:var(--hf);font-weight:var(--hw);font-size:1.5rem;transition:transform .25s}.t3 .waT:hover{transform:scale(.98)}
.t3 .waT i{width:46px;height:46px;border-radius:50%;background:var(--acc);color:var(--accfg);display:grid;place-items:center}.t3 .waT i svg{width:22px;height:22px}
.t3 .s1{grid-column:span 6;grid-row:span 2;background:var(--acc);color:var(--accfg)}.t3 .s2{grid-column:span 6;grid-row:span 2;background:var(--acc2);color:var(--acc2fg)}
.t3 .s1 b,.t3 .s2 b{font-family:var(--hf);font-size:2.6rem;display:block;line-height:1;opacity:.9;margin-bottom:10px}.t3 .s1 p,.t3 .s2 p{font-size:1.15rem;font-weight:600;max-width:14em}
.t3 .pc:nth-child(3n+2) .ph{background:var(--acc2)}.t3 .pc:nth-child(3n) .ph{background:color-mix(in srgb,var(--acc) 22%,var(--card))}
.t3 .band{margin:30px max(22px,calc((100% - 1116px)/2)) 0;border-radius:36px;padding:80px 24px}
.t3 .sec.alt{background:transparent}.t3 .st{border:0}
@media(max-width:900px){.t3 .bento{display:flex;flex-direction:column}.t3 .artb{min-height:280px}.t3 .nav .wrap{margin:0 12px}}
`,
t4:`
.t4{--r:20px;--rb:14px;--bd:3px solid var(--fg);--sh2:7px 7px 0 var(--sh)}
.t4 .nav{border-bottom:3px solid var(--fg);background:var(--bg)}
.t4 .btn{border:3px solid var(--fg);box-shadow:4px 4px 0 var(--sh)}.t4 .btn:hover{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--sh)}.t4 .btn.ghost{box-shadow:4px 4px 0 var(--sh);background:var(--card)}
.t4 .hero{padding:70px 0 80px}
.t4 .g2{display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:center}
.t4 .tag{display:inline-block;background:var(--fg);color:var(--bg);font-weight:700;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;padding:.5em 1em;border-radius:8px;transform:rotate(-2deg);margin-bottom:24px}
.t4 h1{font-size:clamp(2.5rem,5.8vw,5.4rem);letter-spacing:-.02em;line-height:.95;overflow-wrap:anywhere}
.t4 .hv{position:relative}.t4 .box{border:3px solid var(--fg);border-radius:26px;background:var(--stage);box-shadow:12px 12px 0 var(--sh);aspect-ratio:1;display:grid;place-items:center;position:relative;overflow:hidden}
.t4 .box .mt{width:76%;animation:fl 6s ease-in-out infinite}
.t4 .stk{position:absolute;right:-18px;top:-26px;width:116px;height:116px;border-radius:50%;background:var(--acc);color:var(--accfg);border:3px solid var(--fg);box-shadow:5px 5px 0 var(--sh);display:grid;place-items:center;text-align:center;font:800 1.15rem/1.05 var(--hf);text-transform:uppercase;animation:wob 4s ease-in-out infinite;padding:10px}
.t4 .tape{background:var(--acc);color:var(--accfg);border-block:3px solid var(--fg)}.t4 .tape .mqi span{font-size:2rem}.t4 .tape .mqi i{background:var(--fg)}
.t4 .pc .ph{border-bottom:3px solid var(--fg)}.t4 .pc:nth-child(3n+2) .ph{background:var(--acc2)}.t4 .pc:nth-child(3n) .ph{background:var(--acc)}
.t4 .pc:nth-child(3n) .mt{--m1:var(--accfg)}.t4 .pc:hover{transform:translate(-3px,-3px);box-shadow:10px 10px 0 var(--sh)}
.t4 .dif{border-top:4px solid var(--fg)}.t4 .band{border-block:3px solid var(--fg)}.t4 .band h2{text-transform:var(--ht,none)}
.t4 footer{border-top:3px solid var(--fg)}.t4 .sec.alt{background:var(--acc2)}
@media(max-width:900px){.t4 .g2{grid-template-columns:1fr}.t4 .hv{max-width:360px;margin:0 auto}}
`,
t5:`
.t5{--r:30px;--rb:99px}
.t5 .nav{border-bottom:1px solid var(--line)}
.t5 .hero{text-align:center;padding:84px 0 0;position:relative;overflow:hidden}
.t5 .hero .ht{max-width:820px;margin:0 auto}.t5 .lead{margin-inline:auto}.t5 .btns{justify-content:center}
.t5 h1{font-size:clamp(2.6rem,6.2vw,4.9rem);letter-spacing:-.02em}.t5 h1 em{font-style:normal;color:var(--acc);position:relative;white-space:nowrap}
.t5 h1 em::after{content:"";position:absolute;left:0;right:0;bottom:.04em;height:.16em;background:var(--acc2);z-index:-1;border-radius:99px}
.t5 .scene{position:relative;margin-top:50px;height:clamp(260px,38vw,430px);max-width:900px;margin-inline:auto}
.t5 .arc{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:min(560px,86%);aspect-ratio:1.15/1;background:var(--stage);border-radius:999px 999px 0 0}
.t5 .scene .mt{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:min(330px,54%);animation:fl 7s ease-in-out infinite}
.t5 .pic{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:min(560px,86%);aspect-ratio:1.15/1;border-radius:999px 999px 0 0;overflow:hidden}
.t5 .bub{position:absolute;background:var(--card);border-radius:99px;padding:.8em 1.3em;font-weight:700;font-size:.9rem;box-shadow:0 18px 34px -18px rgba(0,0,0,.3);max-width:200px;text-align:left;animation:fl 6s ease-in-out infinite}
.t5 .bub.l{left:0;top:24%}.t5 .bub.r{right:0;top:44%;animation-delay:-3s}
.t5 .dot{position:absolute;border-radius:50%}.t5 .d1{width:46px;height:46px;background:var(--acc);left:16%;bottom:12%}.t5 .d2{width:26px;height:26px;background:var(--acc2);right:18%;top:12%}.t5 .d3{width:70px;height:70px;background:var(--acc2);right:8%;bottom:6%;opacity:.7}
.t5 .wave{display:block;width:100%;height:60px;margin-top:-1px}.t5 .wave path{fill:var(--bg2)}
.t5 .pc{--sh2:0 20px 40px -26px rgba(30,40,30,.5)}.t5 .pc .ph{border-radius:0 0 50% 50%/0 0 22% 22%}
.t5 .st{text-align:center}.t5 .st b{width:78px;height:78px;border-radius:50%;background:var(--acc2);display:grid;place-items:center;margin:0 auto 16px;font-size:2rem;color:var(--fg)}
.t5 .band{border-radius:0}.t5 .dif{border-top:0;text-align:center}.t5 .dif b{width:58px;height:58px;border-radius:50%;background:var(--acc2);display:grid;place-items:center;margin:0 auto 14px;font-size:1.4rem}
@media(max-width:900px){.t5 .bub{display:none}}
`,
t6:`
.t6{--r:2px;--rb:2px}
.t6 .nav{border-bottom:1px solid var(--line)}.t6 .brand{letter-spacing:.14em;text-transform:uppercase;font-size:1.05rem}
.t6 .btn{text-transform:uppercase;letter-spacing:.14em;font-size:.78rem}
.t6 .hero{display:grid;grid-template-columns:1fr 1fr;min-height:88vh}
.t6 .hl{padding:90px max(22px,5vw) 90px max(22px,calc((100vw - 1160px)/2 + 22px));display:flex;flex-direction:column;justify-content:center}
.t6 .eyebrow{letter-spacing:.42em}.t6 h1{font-size:clamp(2.7rem,5.6vw,5rem);font-weight:500;letter-spacing:-.01em}
.t6 .rule{width:64px;height:2px;background:var(--acc);margin:28px 0 0}.t6 .lead{margin-top:24px}
.t6 .hr{background:var(--stage);position:relative;display:grid;place-items:center;overflow:hidden}
.t6 .hr::before{content:"";position:absolute;inset:34px;border:1px solid var(--acc);opacity:.7;z-index:2;pointer-events:none}
.t6 .hr .mt{width:54%;filter:drop-shadow(0 30px 40px rgba(0,0,0,.25));animation:fl 8s ease-in-out infinite;position:relative;z-index:1}
.t6 h2{font-weight:500}
.t6 .pcards{gap:0}.t6 .pc{border-radius:0;border-width:0 1px 1px 0}
.t6 .band{background:var(--fg);color:var(--bg)}.t6 .band .btn.inv{background:var(--acc);color:var(--accfg)}.t6 .band h2{font-weight:500}
.t6 .sec.alt .plist{max-width:880px}.t6 .st{border-radius:0}
.t6 .dif{border-top:1px solid var(--acc)}
@media(max-width:900px){.t6 .hero{grid-template-columns:1fr;min-height:0}.t6 .hl{padding:60px 22px}.t6 .hr{min-height:360px}}
`};

const ICO={arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',
 wa:'<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.9 13.4c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .1-3.1-.7-2.6-1.100-4.300-3.700-4.400-3.900-.1-.2-1-1.400-1-2.600s.6-1.900.9-2.100c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.7 1.900c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.300-.1.600.2.300.8 1.200 1.600 1.900 1 .9 1.900 1.200 2.200 1.300.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.800.9c.3.1.4.2.5.3.1.2.1.7-.1 1.200Z"/></svg>'};

/* ================================================================
   GENERADOR DE LA LANDING
================================================================ */
function buildLanding(S,opt){
 opt=opt||{};const thumb=!!opt.thumb;
 const R=RUBROS[S.rubro]||RUBROS.otro;
 const dz=DESIGN_BY_ID[S.diseno]||DESIGNS[S.rubro][0];const tp=dz.t;
 const acc=/^#[0-9a-f]{6}$/i.test(S.color||'')?S.color:dz.acc;
 const accfg=lum(acc)>.5?'#16130f':'#ffffff';
 const acc2fg=lum(dz.acc2)>.45?'#16130f':'#ffffff';
 const stage=dz.dark?`radial-gradient(circle at 50% 38%,${acc}66,transparent 68%),${dz.card}`:dz.acc2;
 const L=S.lang||'es',both=L==='both';
 const name=(S.negocio||'').trim()||'Tu negocio';
 const rep=s=>String(s).replace(/\{n\}/g,name);
 const TT=(es,en,f)=>{f=f||(x=>x);return L==='es'?f(esc(es)):L==='en'?f(esc(en||es)):`<span data-l="es">${f(esc(es))}</span><span data-l="en">${f(esc(en||es))}</span>`};
 const T=(es,en)=>TT(es,en);const U=k=>T(UI.es[k],UI.en[k]);
 const emph=s=>{const w=s.split(' ');if(w.length<4)return s;const k=Math.min(2,Math.floor(w.length/3));return w.slice(0,-k).join(' ')+' <em>'+w.slice(-k).join(' ')+'</em>'};
 const slogan=[(S.slogan||'').trim()||rep(R.slogan[0]),((S.sloganEn||'').trim()||((S.slogan||'').trim()?S.slogan.trim():rep(R.slogan[1])))];
 const aboutTxt=(S.about||'').trim()?[S.about.trim(),(S.aboutEn||'').trim()||S.about.trim()]:[rep(R.about[0]),rep(R.about[1])];
 const resumen=(S.resumen||'').trim();
 const leadTxt=resumen?[resumen,resumen]:[aboutTxt[0].split(/\n/)[0],aboutTxt[1].split(/\n/)[0]];
 const para=(es,en)=>{const a=es.split(/\n\s*\n|\n/).filter(Boolean),b=en.split(/\n\s*\n|\n/).filter(Boolean);return a.map((x,i)=>`<p>${T(x,b[i]||x)}</p>`).join('')};
 const prods=parseProds((S.prods||'').trim()?S.prods:R.prods);
 const difs=(S.difs||'').trim()?S.difs.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>[x,x]):R.difs;
 const dA=difs[0]||['',''],dB=difs[1]||difs[0]||['',''],dC=difs[2]||dB;
 const wa=waNum(S.wa),ig=igUser(S.igCliente);
 const waLink=wa?`https://wa.me/${wa}?text=${encodeURIComponent(L==='en'?UI.en.hello:UI.es.hello)}`:'';
 const igLink=ig?`https://instagram.com/${ig}`:'';
 const mainLink=waLink||igLink||'#contacto';
 const ext=u=>u.startsWith('http')?' target="_blank" rel="noopener"':'';
 const pedido=S.modo==='pedido'&&prods.length&&!thumb;
 const dir=[S.direccion,S.ciudad].map(x=>(x||'').trim()).filter(Boolean).join(', ');
 const hours=(S.horarios||'').split('\n').map(x=>x.trim()).filter(Boolean);
 const mapLink=dir?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dir)}`:'';
 const kick=(S.ciudad||'').trim()?esc(S.ciudad.trim())+' · '+T(R.k[0],R.k[1]):T(R.k[0],R.k[1]);
 const himgDiv=S.heroImg?`<div class="himg" style="background-image:url('${S.heroImg}')"></div>`:'';
 const vis=S.heroImg?himgDiv:art(S.rubro);
 const h1=TT(slogan[0],slogan[1],(tp==='t1'||tp==='t5')?emph:null);
 const lead=`<p class="lead">${T(leadTxt[0],leadTxt[1])}</p>`;
 const btns=`<div class="btns"><a class="btn" href="${esc(mainLink)}"${ext(mainLink)}>${T(R.cta[0],R.cta[1])} ${ICO.arrow}</a>${prods.length?`<a class="btn ghost" href="#productos">${T(R.pt[0],R.pt[1])}</a>`:''}</div>`;
 const mqItems=(prods.length?prods.map(p=>p.n):difs.map(d=>d[0])).filter(Boolean).slice(0,8);
 const mq=cls=>`<div class="mq ${cls||''}"><div class="mqi">${[...mqItems,...mqItems,...mqItems,...mqItems].map(x=>`<span>${esc(x)}</span><i></i>`).join('')}</div></div>`;
 let hero='',afterHero='';
 if(tp==='t1')hero=`<section class="hero"><div class="wrap g2"><div class="ht"><span class="eyebrow">${kick}</span><h1>${h1}</h1>${lead}${btns}</div><div class="hv"><div class="arch">${vis}</div><div class="chip c1">${ICO.check}${T(dA[0],dA[1])}</div><div class="chip c2">${ICO.check}${T(dB[0],dB[1])}</div><div class="rot"><svg viewBox="0 0 120 120"><defs><path id="cp" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs><text font-size="10.5" letter-spacing="2.6"><textPath href="#cp">${esc(name.toUpperCase())} • ${esc(name.toUpperCase())} • </textPath></text><circle cx="60" cy="60" r="20" fill="${acc}"/><path d="M60 48l3.5 8.5 8.5 3.5-8.5 3.5L60 72l-3.5-8.5L48 60l8.5-3.5Z" fill="${accfg}"/></svg></div></div></div></section>`;
 else if(tp==='t2'){hero=`<section class="hero"><div class="blob b1"></div><div class="blob b2"></div><div class="grain"></div><div class="wrap"><div class="ht"><span class="pill"><i></i>${kick}</span><h1>${h1}</h1>${lead}${btns}</div><div class="glassrow"><div class="gl"><b>01</b>${T(dA[0],dA[1])}</div><div class="gl"><b>02</b>${T(dB[0],dB[1])}</div><div class="gl"><b>03</b>${T(dC[0],dC[1])}</div></div></div><div class="floatart">${vis}</div></section>`;afterHero=mq('')}
 else if(tp==='t3')hero=`<section class="hero"><div class="wrap bento"><div class="bx big"><span class="eyebrow">${kick}</span><h1>${h1}</h1>${lead}${btns}</div><div class="bx artb">${vis}</div><a class="bx waT" href="${esc(mainLink)}"${ext(mainLink)}><span>${U('write')}</span><i>${ICO.arrow}</i></a><div class="bx s1"><b>01</b><p>${T(dA[0],dA[1])}</p></div><div class="bx s2"><b>02</b><p>${T(dB[0],dB[1])}</p></div></div></section>`;
 else if(tp==='t4'){hero=`<section class="hero"><div class="wrap g2"><div class="ht"><span class="tag">${kick}</span><h1>${h1}</h1>${lead}${btns}</div><div class="hv"><div class="box">${vis}</div><div class="stk">${(S.ciudad||'').trim()?esc(S.ciudad.trim()):U('hi')}</div></div></div></section>`;afterHero=mq('tape')}
 else if(tp==='t5')hero=`<section class="hero"><div class="wrap"><div class="ht"><span class="eyebrow">${kick}</span><h1>${h1}</h1>${lead}${btns}</div></div><div class="scene"><div class="arc"></div>${S.heroImg?`<div class="pic">${himgDiv}</div>`:art(S.rubro)}<div class="bub l">${T(dA[0],dA[1])}</div><div class="bub r">${T(dB[0],dB[1])}</div><span class="dot d1"></span><span class="dot d2"></span><span class="dot d3"></span></div><svg class="wave" viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0 30 C240 70 480 0 720 28 S1200 64 1440 24 V60 H0Z"/></svg></section>`;
 else hero=`<section class="hero"><div class="hl"><span class="eyebrow">${kick}</span><h1>${h1}</h1><div class="rule"></div>${lead}${btns}</div><div class="hr">${vis}</div></section>`;
 const aboutSec=`<section class="sec" id="nosotros"><div class="wrap about rv"><div><span class="eyebrow">${U('about')}</span><h2>${esc(name)}</h2></div><div>${para(aboutTxt[0],aboutTxt[1])}</div></div></section>`;
 const rots=[-8,6,-4,9,-10,5];
 let prodHTML='';
 if(prods.length){
  if(tp==='t6')prodHTML=`<div class="plist">${prods.map((p,i)=>`<div class="row rv"><div><span class="nm">${esc(p.n)}</span>${p.d?`<p>${esc(p.d)}</p>`:''}</div><span class="dots"></span><span class="pr">${p.p?esc(p.p):T(UI.es.consult,UI.en.consult)}</span>${pedido?`<button class="btn sm" data-add="${i}">${U('add')}</button>`:''}</div>`).join('')}</div>`;
  else prodHTML=`<div class="pcards">${prods.map((p,i)=>{const g=(S.gal||[])[i];return `<article class="cd pc rv"><div class="ph" style="--t:${46+((i*19)%44)}%;--rot:${rots[i%6]}deg">${g?`<div class="himg" style="background-image:url('${g}')"></div>`:`<span class="ix">${String(i+1).padStart(2,'0')}</span>${art(S.rubro)}`}</div><div class="bd"><h3>${esc(p.n)}</h3>${p.d?`<p>${esc(p.d)}</p>`:''}<div class="pr"><span>${p.p?esc(p.p):T(UI.es.consult,UI.en.consult)}</span>${pedido?`<button class="btn sm" data-add="${i}">${U('add')}</button>`:''}</div></div></article>`}).join('')}</div>`;
 }
 const prodSec=prods.length?`<section class="sec alt" id="productos"><div class="wrap"><div class="head rv"><span class="eyebrow">${U('prod')}</span><h2>${T(R.pt[0],R.pt[1])}</h2></div>${prodHTML}</div></section>`:'';
 const stp=STEPS[R.kind||'goods'];
 const stepsSec=`<section class="sec" id="como"><div class="wrap"><div class="head rv"><span class="eyebrow">${U('how')}</span><h2>${U('simple')}</h2></div><div class="steps">${stp.es.map((s,i)=>`<div class="cd st rv"><b>${i+1}</b><h3>${T(s[0],stp.en[i][0])}</h3><p>${T(s[1],stp.en[i][1])}</p></div>`).join('')}</div></div></section>`;
 const galSec=(S.gal&&S.gal.length>prods.length)?`<section class="sec"><div class="wrap"><div class="head rv"><span class="eyebrow">${U('gal')}</span></div><div class="gal">${S.gal.map(g=>`<img src="${g}" alt="" loading="lazy">`).join('')}</div></div></section>`:'';
 const difSec=`<section class="sec alt" id="porque"><div class="wrap"><div class="head rv"><span class="eyebrow">${U('why')}</span></div><div class="difs">${difs.map((d,i)=>`<div class="dif rv"><b>${String(i+1).padStart(2,'0')}</b><p>${T(d[0],d[1])}</p></div>`).join('')}</div></div></section>`;
 const infoCards=[];
 if(dir||mapLink)infoCards.push(`<div class="cd pad rv"><h3>${U('where')}</h3><p>${esc(dir)}</p>${mapLink?`<p style="margin-top:18px"><a class="btn ghost" href="${mapLink}"${ext(mapLink)}>${U('map')}</a></p>`:''}</div>`);
 if(hours.length)infoCards.push(`<div class="cd pad rv"><h3>${U('hours')}</h3>${hours.map(h=>`<p>${esc(h)}</p>`).join('')}</div>`);
 const infoSec=infoCards.length?`<section class="sec" id="visita"><div class="wrap"><div class="head rv"><span class="eyebrow">${U('visit')}</span></div><div class="info">${infoCards.join('')}</div></div></section>`:'';
 const band=`<section class="band" id="contacto"><div class="wrap rv"><h2>${U('ready')}</h2><p>${U('ready2')}</p><div class="btns" style="justify-content:center;margin-top:28px">${waLink?`<a class="btn inv" href="${waLink}"${ext(waLink)}>${U('wa')}</a>`:''}${igLink?`<a class="btn invl" href="${igLink}"${ext(igLink)}>${U('ig')}</a>`:''}</div></div></section>`;
 const credit=S.creditos&&S.marca?`<span>${U('by')} ${S.portafolio?`<a href="${esc(S.portafolio)}" target="_blank" rel="noopener">${esc(S.marca)}</a>`:esc(S.marca)}</span>`:'';
 const foot=`<footer><div class="wrap"><span>© ${new Date().getFullYear()} ${esc(name)} · ${U('rights')}</span>${credit}</div></footer>`;
 const fab=wa?`<a class="wafab" href="${waLink}"${ext(waLink)} aria-label="WhatsApp">${ICO.wa}</a>`:'';
 const demo=S.cartel?`<div class="demo">${U('demo')} ${esc(name)} · ${T('imágenes de representación','sample images')}</div>`:'';
 const langBtn=both?`<div class="lang"><button class="on" data-lg="es">ES</button><button data-lg="en">EN</button></div>`:'';
 const navLinks=`<nav><a href="#nosotros">${U('about')}</a>${prodSec?`<a href="#productos">${U('prod')}</a>`:''}${infoSec?`<a href="#visita">${U('visit')}</a>`:''}<a href="#contacto">${U('contact')}</a></nav>`;
 const nbtn=(waLink||igLink)?`<a class="btn nbtn" href="${esc(mainLink)}"${ext(mainLink)}>${U('write')}</a>`:'';
 const cartBtn=pedido?`<button class="btn ghost cartbtn" id="cb" aria-label="Pedido"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg><b id="cn">0</b></button>`:'';
 const drawer=pedido?`<aside class="drawer" id="dr"><div class="dh"><h3>${U('cart')}</h3><button class="x" id="dx" aria-label="Cerrar">×</button></div><div class="dl" id="dl"></div><div class="df"><div class="tt"><span>${U('total')}</span><b id="tv">$0</b></div><button class="btn" id="ds" style="width:100%">${U('send')}</button></div></aside>`:'';
 const cartData=pedido?JSON.stringify({p:prods.map(p=>({n:p.n,v:num(p.p)})),wa:wa,ui:UI,def:L==='en'?'en':'es'}).replace(/</g,'\\u003c'):'';
 const cartJS=pedido?`
var D=${cartData},cart={},lang=D.def;
function fmt(n){return '$'+Math.round(n).toLocaleString('es-AR')}
function draw(){var dl=document.getElementById('dl'),u=D.ui[lang],tot=0,c=0,ks=Object.keys(cart);dl.innerHTML='';
 if(!ks.length){dl.innerHTML='<p style="opacity:.6">'+u.empty+'</p>'}
 ks.forEach(function(k){var q=cart[k],p=D.p[k];tot+=p.v*q;c+=q;var r=document.createElement('div');r.className='ci';
  r.innerHTML='<div><b></b><small></small></div><div class="qt"><button data-m="'+k+'">−</button><span>'+q+'</span><button data-p="'+k+'">+</button></div>';
  r.querySelector('b').textContent=p.n;r.querySelector('small').textContent=p.v?fmt(p.v*q):u.consult;dl.appendChild(r)});
 document.getElementById('cn').textContent=c;document.getElementById('tv').textContent=fmt(tot)}
document.addEventListener('click',function(e){var t=e.target;
 if(t.closest('[data-add]')){var k=t.closest('[data-add]').dataset.add;cart[k]=(cart[k]||0)+1;draw();var cb=document.getElementById('cb');cb.style.transform='scale(1.15)';setTimeout(function(){cb.style.transform=''},180)}
 else if(t.dataset.p){cart[t.dataset.p]++;draw()}
 else if(t.dataset.m){var k2=t.dataset.m;cart[k2]--;if(cart[k2]<=0)delete cart[k2];draw()}
 else if(t.closest('#cb')){document.getElementById('dr').classList.add('on')}
 else if(t.closest('#dx')){document.getElementById('dr').classList.remove('on')}
 else if(t.closest('#ds')){var u=D.ui[lang],ks=Object.keys(cart);if(!ks.length)return;var tot=0,m=u.order+'\\n';
  ks.forEach(function(k){var p=D.p[k],q=cart[k];tot+=p.v*q;m+='- '+q+' x '+p.n+(p.v?' ('+fmt(p.v*q)+')':'')+'\\n'});
  if(tot)m+='\\n'+u.total+': '+fmt(tot);
  if(D.wa){window.open('https://wa.me/'+D.wa+'?text='+encodeURIComponent(m),'_blank')}}
});
document.addEventListener('langchange',function(e){lang=e.detail;draw()});
draw();`:'';
 const langJS=both?`
document.querySelectorAll('[data-lg]').forEach(function(b){b.addEventListener('click',function(){var l=b.dataset.lg;document.documentElement.lang=l;document.querySelectorAll('[data-lg]').forEach(function(x){x.classList.toggle('on',x===b)});document.dispatchEvent(new CustomEvent('langchange',{detail:l}))})});`:'';
 const revJS=`
document.documentElement.classList.add('js');
(function(){var els=[].slice.call(document.querySelectorAll('.rv'));if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});els.forEach(function(e,i){e.style.transitionDelay=((i%4)*70)+'ms';io.observe(e)});
setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in')})},60)})();`;
 const vars=`--bg:${dz.bg};--bg2:color-mix(in srgb,${dz.fg} 5%,${dz.bg});--fg:${dz.fg};--mut:${dz.mut};--card:${dz.card};--acc:${acc};--accfg:${accfg};--acc2:${dz.acc2};--acc2fg:${acc2fg};--line:${dz.line};--hf:${dz.hf};--bf:${dz.bf};--hw:${dz.hw};${dz.ht?`--ht:${dz.ht};`:''}--stage:${stage};--stage-c:${dz.acc2};--m1:${acc};--m2:${dz.ink};--m3:${dz.lt};--sh:${dz.sh}`;
 return `<!doctype html>
<html lang="${L==='en'?'en':'es'}"${thumb?' class="st"':''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(name)}${(S.ciudad||'').trim()?' — '+esc(S.ciudad.trim()):''}</title>
<meta name="description" content="${esc(slogan[0])}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=${dz.f}&display=swap" rel="stylesheet">
<style>:root{${vars}}${CSS_BASE}${CSS_T[tp]}
${both?'html[lang=es] [data-l=en],html[lang=en] [data-l=es]{display:none}':''}</style>
</head>
<body class="${tp}">
<header class="nav"><div class="wrap"><a class="brand" href="#">${esc(name)}</a>${navLinks}${langBtn}${nbtn}${cartBtn}</div></header>
${hero}${afterHero}${aboutSec}${prodSec}${stepsSec}${galSec}${difSec}${infoSec}${band}${foot}${fab}${demo}${drawer}
${thumb?'':'<script>'+revJS+langJS+cartJS+'<'+'/script>'}
</body>
</html>`;
}
