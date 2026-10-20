var IMG={"hand": "hand.webp", "n_afternoon": "n_afternoon.webp", "n_again": "n_again.webp", "n_arrival": "n_arrival.webp", "n_close": "n_close.webp", "n_colon": "n_colon.webp", "n_cover": "n_cover.webp", "n_cryo": "n_cryo.webp", "n_dome": "n_dome.webp", "n_gardens": "n_gardens.webp", "n_hammam": "n_hammam.webp", "n_heat": "n_heat.webp", "n_imm": "n_imm.webp", "n_invite": "n_invite.webp", "n_lime": "n_lime.webp", "n_mind": "n_mind.webp", "n_mp": "n_mp.webp", "n_night": "n_night.webp", "n_res": "n_res.webp", "n_room": "n_room.webp", "n_still": "n_still.webp", "n_stillw": "n_stillw.webp", "n_table": "n_table.webp", "n_thermae": "n_thermae.webp", "n_treat": "n_treat.webp", "night": "night.webp", "s3": "s3.webp", "v_aerial": "v_aerial.webp", "v_pav": "v_pav.webp", "v_pool": "v_pool.webp", "v_pool2": "v_pool2.webp"};
var VIDM="oria-film.mp4";
ORIA_TR(document.body);
var ORIA_REV=(window.ORIA_LANG==='ar')?170:118;
(function(){
  var L=window.ORIA_LANG||'en';
  Array.prototype.forEach.call(document.querySelectorAll('[data-lang-toggle]'),function(b){
    b.textContent = L==='ar' ? 'English' : 'العربية';
    b.setAttribute('lang', L==='ar' ? 'en' : 'ar');
    b.setAttribute('aria-label', L==='ar' ? 'Switch to English' : 'التبديل إلى العربية');
    b.addEventListener('click',function(){
      var next = L==='ar' ? 'en' : 'ar';
      try{ localStorage.setItem('oria-lang',next); sessionStorage.setItem('oria-skip-pre','1'); }catch(e){}
      location.href = location.pathname + '?lang=' + next;
    });
  });
})();
(function(){
"use strict";
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var pad2=function(n){return String(n).padStart(2,'0')};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, G=!!(window.gsap&&window.ScrollTrigger), motion=G&&!reduce;
if(motion) document.documentElement.classList.add('mo');
if(G) gsap.registerPlugin(ScrollTrigger);

/* images (each embedded once) */
$$('img[data-img]').forEach(function(im){var k=im.getAttribute('data-img'); if(IMG[k]) im.src=IMG[k]; im.decoding='async';});

/* smooth scroll */
var lenis=null;
if(motion&&window.Lenis){try{lenis=new Lenis({duration:1.2,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);}catch(e){lenis=null}}
function lock(on){if(lenis){on?lenis.stop():lenis.start()} document.documentElement.style.overflow=on?'hidden':''}
function toTop(){ if(lenis) lenis.scrollTo(0,{immediate:true,force:true}); window.scrollTo(0,0); }

/* split */
function split(el){ if(el._w) return el._w; var w=el.textContent.trim().split(/\s+/);
  el.innerHTML=w.map(function(x){return '<span class="w"><span class="wi">'+x.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</span></span>'}).join(' ');
  el._w=$$('.wi',el); return el._w; }

function words(el){ if(el._ws) return el._ws; var out=[];
  (function walk(n){ Array.prototype.slice.call(n.childNodes).forEach(function(c){
    if(c.nodeType===3){ var parts=c.nodeValue.split(/(\s+)/), f=document.createDocumentFragment();
      parts.forEach(function(t){ if(!t) return; if(/^\s+$/.test(t)){ f.appendChild(document.createTextNode(t)); return; } var s=document.createElement('span'); s.className='wd'; s.textContent=t; out.push(s); f.appendChild(s); });
      n.replaceChild(f,c); }
    else if(c.nodeType===1 && !/^(SVG|BR)$/i.test(c.nodeName)) walk(c); }); })(el);
  el._ws=out; return out; }

/* header */
var hdr=$('#hdr'), darkEls=[], lastY=0, menuOpen=false;
function onScroll(y){
  if(!menuOpen){ if(y>lastY+4&&y>320) hdr.classList.add('hide'); else if(y<lastY-4) hdr.classList.remove('hide'); }
  lastY=y; var light=false;
  for(var i=0;i<darkEls.length;i++){var r=darkEls[i].getBoundingClientRect(); if(r.top<=40&&r.bottom>40){light=true;break;}}
  hdr.classList.toggle('light',light);
}
if(lenis) lenis.on('scroll',function(e){onScroll(e.scroll)}); else addEventListener('scroll',function(){onScroll(scrollY)},{passive:true});

/* menu */
var menu=$('#menu'), mbtn=$('#mbtn'), mimg=$('#mimg img');
function setMenu(open){
  menuOpen=open; document.body.classList.toggle('mopen',open); mbtn.setAttribute('aria-expanded',open); menu.setAttribute('aria-hidden',!open);
  var t=$('#mtxt'); t.textContent=ORIA_L(open?'Close':'Menu'); t.setAttribute('data-t',ORIA_L(open?'Close':'Menu')); hdr.classList.remove('hide');
  if(open){menu.style.visibility='visible'; lock(true);}
  if(motion){
    if(open){ gsap.to(menu,{clipPath:'inset(0 0 0% 0)',duration:1.1,ease:'expo.inOut'});
      gsap.fromTo('.menu nav a',{yPercent:120,opacity:0},{yPercent:0,opacity:1,duration:1.1,ease:'expo.out',stagger:.06,delay:.35});
      gsap.fromTo('#mimg',{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:1.3,ease:'expo.inOut',delay:.3});
      gsap.fromTo('.menu .mfoot',{opacity:0,y:16},{opacity:1,y:0,duration:1,delay:.7}); }
    else{ gsap.to(menu,{clipPath:'inset(0 0 100% 0)',duration:.9,ease:'expo.inOut',onComplete:function(){menu.style.visibility='hidden'}}); lock(false); }
  } else { menu.style.clipPath=open?'inset(0)':'inset(0 0 100% 0)'; if(!open){menu.style.visibility='hidden';lock(false);} }
}
mbtn.addEventListener('click',function(){setMenu(!menuOpen)});
$$('.menu nav a').forEach(function(a){a.addEventListener('mouseenter',function(){var k=a.dataset.mi; if(IMG[k]&&mimg.src!==IMG[k]){ if(motion){gsap.fromTo(mimg,{opacity:.2,scale:1.08},{opacity:1,scale:1,duration:1,ease:'expo.out'});} mimg.src=IMG[k]; }})});
addEventListener('keydown',function(e){if(e.key==='Escape'&&menuOpen) setMenu(false)});

/* custom cursor */
(function(){
  if(!(G&&matchMedia('(hover:hover) and (pointer:fine)').matches)) return;
  var c=$('#cur'), ring=$('.cur-ring',c), dot=$('.cur-dot',c), lab=$('.cur-lab',c), txt=$('#curTxt');
  document.documentElement.classList.add('cc');
  var dx=gsap.quickTo(dot,'x',{duration:.08,ease:'none'}), dy=gsap.quickTo(dot,'y',{duration:.08,ease:'none'});
  var rx=gsap.quickTo(ring,'x',{duration:.5,ease:'power3'}), ry=gsap.quickTo(ring,'y',{duration:.5,ease:'power3'});
  var lx=gsap.quickTo(lab,'x',{duration:.35,ease:'power3'}), ly=gsap.quickTo(lab,'y',{duration:.35,ease:'power3'});
  function state(t){
    var lb=t.closest&&t.closest('[data-cursor]'), tx=t.closest&&t.closest('input,textarea,select'), ln=t.closest&&t.closest('a,button,label,.slide,.mat');
    c.classList.toggle('label',!!lb); if(lb) txt.textContent=lb.dataset.cursor;
    c.classList.toggle('text',!lb&&!!tx);
    c.classList.toggle('link',!lb&&!tx&&!!ln);
  }
  addEventListener('pointermove',function(e){ dx(e.clientX);dy(e.clientY);rx(e.clientX);ry(e.clientY);lx(e.clientX);ly(e.clientY); c.classList.add('show'); state(e.target); },{passive:true});
  addEventListener('pointerdown',function(){c.classList.add('down')});
  addEventListener('pointerup',function(){c.classList.remove('down')});
  document.addEventListener('mouseleave',function(){c.classList.remove('show')});
  document.addEventListener('mouseenter',function(){c.classList.add('show')});
  addEventListener('blur',function(){c.classList.remove('show')});
})();

/* ---- static interactive widgets (bound once) ---- */
// hover lists
$$('[data-hl]').forEach(function(root){
  var items=$$('.hlist li',root), ly=$$('.hlimg .ly',root), c=0;
  function set(n){ if(n===c) return; items[c].classList.remove('on'); items[n].classList.add('on'); ly.forEach(function(l){l.classList.remove('bl')}); ly[c].classList.remove('on'); ly[c].classList.add('bl'); ly[n].classList.add('on'); c=n; }
  root._set=set;
  items.forEach(function(li,n){var b=li.querySelector('button'); ['mouseenter','focus','click'].forEach(function(ev){b.addEventListener(ev,function(){set(n)})});});
});
// drag galleries
$$('[data-track]').forEach(function(tr){
  var sec=tr.closest('section'), items=$$('.slide',tr), now=$('[data-gnow]',sec), down=false,sx=0,sl=0,moved=false;
  function pl(){return parseFloat(getComputedStyle(tr).paddingLeft)}
  function idx(){var b=0,d=1e9; items.forEach(function(it,i){var v=Math.abs(it.offsetLeft-pl()-tr.scrollLeft); if(v<d){d=v;b=i}}); return b;}
  tr.addEventListener('scroll',function(){if(now) now.textContent=pad2(idx()+1)},{passive:true});
  tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return; down=true;moved=false;sx=e.clientX;sl=tr.scrollLeft;});
  addEventListener('pointermove',function(e){if(!down)return; var dx=e.clientX-sx; if(Math.abs(dx)>4){moved=true;tr.classList.add('dragging')} tr.scrollLeft=sl-dx;});
  addEventListener('pointerup',function(){if(!down)return; down=false; if(moved){var i=idx(); tr.classList.remove('dragging'); tr.scrollTo({left:items[i].offsetLeft-pl(),behavior:'smooth'});}});
  $$('[data-gstep]',sec).forEach(function(b){b.addEventListener('click',function(){var i=Math.max(0,Math.min(items.length-1,idx()+(+b.dataset.gstep))); tr.scrollTo({left:items[i].offsetLeft-pl(),behavior:reduce?'auto':'smooth'})})});
});
// day / night
$$('[data-dn]').forEach(function(sec){
  var nt=$('[data-nt]',sec), pill=$('.pill',sec), bs=$$('.tg button',sec);
  function place(b){pill.style.left=b.offsetLeft+'px';pill.style.width=b.offsetWidth+'px'}
  bs.forEach(function(b){b.addEventListener('click',function(){ bs.forEach(function(x){x.setAttribute('aria-pressed',x===b)}); place(b); var n=b.dataset.m==='night';
    if(motion){gsap.to(nt,{clipPath:n?'inset(0 0 0 0%)':'inset(0 0 0 100%)',duration:1.5,ease:'expo.inOut'}); gsap.fromTo(nt.querySelector('img'),{scale:n?1.15:1},{scale:1,duration:2,ease:'expo.out'});} else nt.style.clipPath=n?'inset(0)':'inset(0 0 0 100%)'; })});
  sec._place=function(){place($('.tg button[aria-pressed="true"]',sec))};
});
// masterplan drag
$$('[data-dvp]').forEach(function(vp){
  var inner=$('.inner',vp), ar=1432/955, W,H,x=0,y=0,minX,minY,down=false,sx,sy,ox,oy,lx,ly,lt,vx=0,vy=0,touch=false;
  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function apply(){inner.style.transform='translate3d('+x+'px,'+y+'px,0)'}
  function size(){var vw=vp.clientWidth,vh=vp.clientHeight; if(!vw) return; W=Math.max(vw*1.15,vh*1.1*ar); H=W/ar; if(H<vh*1.06){H=vh*1.06;W=H*ar}
    inner.style.width=W+'px'; inner.style.height=H+'px'; minX=vw-W; minY=vh-H; x=minX/2; y=minY/2; apply();}
  vp._size=size;
  vp.addEventListener('pointerdown',function(e){if(e.target.closest('.key'))return; down=true; touch=e.pointerType!=='mouse'; sx=lx=e.clientX; sy=ly=e.clientY; ox=x; oy=y; lt=performance.now(); vx=vy=0; vp.classList.add('dragging'); if(G) gsap.killTweensOf(inner); if(!touch) vp.setPointerCapture(e.pointerId);});
  vp.addEventListener('pointermove',function(e){if(!down)return; var n=performance.now(),dt=Math.max(1,n-lt); vx=(e.clientX-lx)/dt; vy=(e.clientY-ly)/dt; lx=e.clientX; ly=e.clientY; lt=n; x=clamp(ox+e.clientX-sx,minX,0); if(!touch) y=clamp(oy+e.clientY-sy,minY,0); apply();});
  function up(){if(!down)return; down=false; vp.classList.remove('dragging'); var tx=clamp(x+vx*320,minX,0), ty=touch?y:clamp(y+vy*320,minY,0);
    if(motion){var o={x:x,y:y}; gsap.to(o,{x:tx,y:ty,duration:1.2,ease:'expo.out',onUpdate:function(){x=o.x;y=o.y;apply()}})} else {x=tx;y=ty;apply()}}
  vp.addEventListener('pointerup',up); vp.addEventListener('pointercancel',up); vp.addEventListener('lostpointercapture',up);
  addEventListener('resize',size);
});
// form
(function(){ var fm=$('#form'); if(!fm) return; fm.addEventListener('submit',function(e){e.preventDefault(); var f=e.target, lines=[];
  $$('input:not([type=checkbox]),select,textarea',f).forEach(function(el){ if(el.name==='msg') return; var l=$('label[for="'+el.id+'"]',f); lines.push((l?l.textContent:el.name)+': '+el.value); });
  var body=lines.join('\n')+'\n\n'+(f.msg?f.msg.value:'');
  var a=document.createElement('a'); a.href='mailto:oria@elalfyco.com?subject='+encodeURIComponent(f.dataset.subject||'ORIA — enquiry')+'&body='+encodeURIComponent(body); a.target='_blank'; a.rel='noopener'; document.body.appendChild(a); a.click(); a.remove(); f.classList.add('sent');}); })();
// in-page scroll links & to top
$$('[data-scroll]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault(); var t=$(a.getAttribute('href')); if(lenis) lenis.scrollTo(t,{duration:1.6}); else t.scrollIntoView({behavior:'smooth'});})});
$$('[data-top]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault(); if(lenis) lenis.scrollTo(0,{duration:1.8}); else window.scrollTo({top:0,behavior:'smooth'});})});

/* ---- per-page scroll motion ---- */
var ctx=null;
function initPage(page){
  darkEls=$$('[data-dark]',page).concat([$('.foot')]);
  $$('[data-dn]',page).forEach(function(s){s._place()});
  $$('[data-dvp]',page).forEach(function(v){v._size()});
  if(!motion){ staticPage(page); return; }
  ctx=gsap.context(function(){
    $$('[data-split]',page).forEach(function(el){ gsap.from(split(el),{yPercent:ORIA_REV,duration:1.1,ease:'expo.out',stagger:.028,scrollTrigger:{trigger:el,start:'top 88%'}}); });
    $$('[data-fade]',page).forEach(function(el){ gsap.from(el,{y:22,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 90%'}}); });
    $$('[data-fill]',page).forEach(function(el){ gsap.fromTo(split(el),{opacity:.2},{opacity:1,ease:'none',stagger:.1,scrollTrigger:{trigger:el,start:'top 80%',end:'bottom 58%',scrub:true}}); });
    $$('[data-clip]',page).forEach(function(el){ var im=el.querySelector('img');
      var wp=el.querySelector(':scope > .wipe'); if(!wp){ wp=document.createElement('i'); wp.className='wipe'; el.appendChild(wp); }
      var tl=gsap.timeline({scrollTrigger:{trigger:el,start:'top 88%'}});
      tl.fromTo(el,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.2,ease:'expo.inOut'},0)
        .fromTo(wp,{scaleY:1},{scaleY:0,duration:1.15,ease:'expo.inOut'},.5)
        .fromTo(im,{scale:1.35,filter:'saturate(.4) brightness(1.08)'},{scale:1.08,filter:'saturate(1) brightness(1)',duration:2.2,ease:'expo.out'},.45); });
    $$('.shd .lead, .feat .tx .lead, .cta-p, .dn-p, .room .lead, .names p, .duo .t .lead, .gal-head .lead',page).forEach(function(el){
      gsap.from(words(el),{y:14,opacity:0,filter:'blur(8px)',duration:1.1,ease:'expo.out',stagger:.012,scrollTrigger:{trigger:el,start:'top 90%'}}); });
    $$('.tag',page).forEach(function(t){ if(t.closest('.chap')){ t.classList.add('in'); return; } ScrollTrigger.create({trigger:t,start:'top 92%',once:true,onEnter:function(){t.classList.add('in')}}); });
    $$('.fig .v',page).forEach(function(v){ ScrollTrigger.create({trigger:v,start:'top 90%',once:true,onEnter:function(){v.parentNode.classList.add('in')}}); });
    $$('.names .nm',page).forEach(function(n){ gsap.from(n,{yPercent:40,opacity:0,letterSpacing:'.2em',duration:1.8,ease:'expo.out',scrollTrigger:{trigger:n,start:'top 88%'}}); });
    $$('.cta .d2',page).forEach(function(h){ gsap.fromTo(h,{scale:1.06},{scale:1,ease:'none',scrollTrigger:{trigger:h.closest('.cta'),start:'top bottom',end:'center center',scrub:true}}); });
    $$('[data-par]',page).forEach(function(im){ gsap.fromTo(im,{yPercent:-5},{yPercent:5,ease:'none',scrollTrigger:{trigger:im.parentElement,start:'top bottom',end:'bottom top',scrub:true}}); });
    // hero scroll-out
    $$('.phero',page).forEach(function(h){
      gsap.to($('.bg',h),{yPercent:24,ease:'none',scrollTrigger:{trigger:h,start:'top top',end:'bottom top',scrub:true}});
      gsap.to($('.ui',h),{yPercent:-12,opacity:0,ease:'none',scrollTrigger:{trigger:h,start:'top top',end:'70% top',scrub:true}}); });
    // counters
    $$('[data-count]',page).forEach(function(el){ var to=+el.dataset.count,o={v:0}; el.textContent='0';
      ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:function(){gsap.to(o,{v:to,duration:2.2,ease:'expo.out',onUpdate:function(){el.textContent=Math.round(o.v).toLocaleString('en-US')}})}}); });
    $$('[data-range]',page).forEach(function(el){ var r=el.dataset.range.split(',').map(Number),o={a:r[0]+10,b:r[1]-14}; el.textContent=o.a+'–'+o.b;
      ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:function(){gsap.to(o,{a:r[0],b:r[1],duration:2.2,ease:'expo.out',onUpdate:function(){el.textContent=Math.round(o.a)+'–'+Math.round(o.b)}})}}); });
    $$('.figs',page).forEach(function(f){ gsap.from(f.children,{y:30,opacity:0,duration:1.2,ease:'expo.out',stagger:.08,scrollTrigger:{trigger:f,start:'top 88%'}}); });
    ['.ogrid','.mgrid','.pgrid','.modes','.crit','.works','.tables','.keys','.safe','.team','.inst','.std','.roles','.opts','.reach','.thr .side','.cmp2','.reg'].forEach(function(s){ $$(s,page).forEach(function(g){ gsap.from(g.children,{y:28,opacity:0,filter:'blur(6px)',duration:1.1,ease:'expo.out',stagger:.07,scrollTrigger:{trigger:g,start:'top 88%'}}); }); });
    $$('.spec dl > div',page).forEach(function(r,i){ gsap.from(r,{y:18,opacity:0,duration:1,ease:'expo.out',delay:i*.04,scrollTrigger:{trigger:r,start:'top 92%'}}); });
    $$('[data-line]',page).forEach(function(l){ gsap.to($('.ln',l),{scaleX:1,ease:'none',scrollTrigger:{trigger:l,start:'top 85%',end:'top 45%',scrub:true}}); gsap.from($$(':scope > div',l),{y:24,opacity:0,duration:1.1,ease:'expo.out',stagger:.12,scrollTrigger:{trigger:l,start:'top 85%'}}); });
    $$('.pin-dot',page).forEach(function(d,i){ gsap.from(d,{scale:0,duration:.9,ease:'back.out(2)',delay:.8+i*.12,scrollTrigger:{trigger:d.parentElement,start:'top 70%'}}); });
    // pinned stack
    $$('[data-stack]',page).forEach(function(sec){
      var cards=$$('.card',sec),n=cards.length,now=$('[data-now]',sec),li=$$('.list li',sec);
      gsap.set(cards,{zIndex:function(i){return i+1}}); gsap.set(cards.slice(1),{yPercent:110});
      var tl=gsap.timeline({scrollTrigger:{trigger:sec,start:'top top',end:function(){return '+='+(n-1)*innerHeight*1.1},pin:$('.stack-pin',sec),scrub:.8,anticipatePin:1,
        onUpdate:function(s){var i=Math.min(n-1,Math.round(s.progress*(n-1))); now.textContent=pad2(i+1); li.forEach(function(l,k){l.classList.toggle('on',k===i)});}}});
      cards.forEach(function(c,i){ if(!i) return; tl.to(c,{yPercent:0,ease:'none',duration:1},i-1).to(cards[i-1],{scale:.9,opacity:.3,ease:'none',duration:1},i-1).fromTo(c.querySelector('img'),{scale:1.3,yPercent:-10},{scale:1,yPercent:0,ease:'none',duration:1},i-1); });
    });
    // gallery entrance
    $$('[data-track]',page).forEach(function(t){ gsap.from($$('.slide',t),{xPercent:40,opacity:0,duration:1.6,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:t,start:'top 85%'}}); });
    // big words
    $$('.big',page).forEach(function(b){ gsap.fromTo($('.l1',b),{xPercent:-20},{xPercent:6,ease:'none',scrollTrigger:{trigger:b,start:'top bottom',end:'bottom top',scrub:true}}); gsap.fromTo($('.l2',b),{xPercent:20},{xPercent:-6,ease:'none',scrollTrigger:{trigger:b,start:'top bottom',end:'bottom top',scrub:true}}); });
    // hover list on touch: follow scroll
    if(matchMedia('(hover:none)').matches){ $$('[data-hl]',page).forEach(function(r){ $$('.hlist li',r).forEach(function(li,n){ ScrollTrigger.create({trigger:li,start:'top 62%',end:'bottom 62%',onToggle:function(s){if(s.isActive) r._set(n)}}); }); }); }
    // rooms sticky swap
    $$('[data-rooms]',page).forEach(function(r){ var ly=$$('.stick .ly',r), c=0; $$('.room',r).forEach(function(room,n){ ScrollTrigger.create({trigger:room,start:'top 55%',end:'bottom 55%',onToggle:function(s){ if(!s.isActive||n===c) return; ly.forEach(function(l){l.classList.remove('bl')}); ly[c].classList.remove('on'); ly[c].classList.add('bl'); ly[n].classList.add('on'); c=n; }}); }); });
    // ritual pin
    $$('[data-ritual]',page).forEach(function(sec){ var li=$$('.steps li',sec), ly=$$('.rimg .ly',sec), bar=$('.rbar i',sec), c=0;
      ScrollTrigger.create({trigger:sec,start:'top top',end:function(){return '+='+innerHeight*3.2},pin:$('.ritual-pin',sec),scrub:true,anticipatePin:1,onUpdate:function(s){
        bar.style.transform='scaleX('+s.progress+')'; var n=Math.min(4,Math.floor(s.progress*5)); if(n===c) return;
        li.forEach(function(l,k){l.classList.toggle('on',k===n)}); ly.forEach(function(l){l.classList.remove('bl')}); ly[c].classList.remove('on'); ly[c].classList.add('bl'); ly[n].classList.add('on'); c=n; }}); });
    // masterplan reveal
    $$('[data-dvp]',page).forEach(function(v){ gsap.fromTo(v,{clipPath:'inset(8% 6% 8% 6%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:v,start:'top 95%',end:'top 20%',scrub:true}}); gsap.fromTo($('.inner img',v),{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:v,start:'top 95%',end:'top 20%',scrub:true}}); });
    // day/night reveal
    $$('[data-dn]',page).forEach(function(d){ gsap.fromTo(d,{clipPath:'inset(10% 8% 10% 8%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:d,start:'top bottom',end:'top top',scrub:true}}); });
    // CTA
    $$('[data-cta]',page).forEach(function(c){ gsap.fromTo($('.bg img',c),{scale:1.3},{scale:1,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'bottom bottom',scrub:true}});
      gsap.fromTo($('.bg',c),{clipPath:'inset(12% 10% 0% 10%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'top top',scrub:true}}); });
    // contact image
    $$('.contact .im img',page).forEach(function(im){ gsap.fromTo(im,{scale:1.25},{scale:1,duration:2.4,ease:'expo.out'}); });
  },page);
}
function staticPage(page){
  $$('[data-rooms]',page).forEach(function(r){ var ly=$$('.stick .ly',r); if(G) $$('.room',r).forEach(function(room,n){ScrollTrigger.create({trigger:room,start:'top 55%',end:'bottom 55%',onToggle:function(s){if(s.isActive){ly.forEach(function(l,k){l.classList.toggle('on',k===n)})}}})}); });
  $$('[data-ritual]',page).forEach(function(sec){ var li=$$('.steps li',sec),ly=$$('.rimg .ly',sec); if(G) ScrollTrigger.create({trigger:sec,start:'top center',end:'bottom center',onUpdate:function(s){var n=Math.min(4,Math.floor(s.progress*5)); li.forEach(function(l,k){l.classList.toggle('on',k===n)}); ly.forEach(function(l,k){l.classList.toggle('on',k===n)})}}); });
}
function heroIn(page){
  if(!motion) return;
  var h=$('[data-hero]',page), side=$('[data-hero-side]',page), bg=$('.phero .bg img, .phero .bg video',page), meta=$('.phero .meta',page);
  var tl=gsap.timeline();
  if(h) tl.from(split(h),{yPercent:ORIA_REV,duration:1.5,ease:'expo.out',stagger:.045},0);
  if(bg) tl.from(bg,{scale:1.22,duration:2.4,ease:'expo.out'},0);
  if(side) tl.from(side.children,{y:26,opacity:0,duration:1.2,ease:'expo.out',stagger:.1},.4);
  if(meta) tl.from(meta,{opacity:0,y:-10,duration:1},.6);
}

/* ---- scroll-scrubbed film ---- */
var filmReady=false;
(function(){
  var sec=$('[data-scrolly]'); if(!sec) return;
  var v=$('.sv',sec), chaps=$$('.chap',sec), rail=$$('.sv-rail li',sec), bar=$('.sv-bar b',sec), hint=$('.sv-hint',sec);
  chaps.forEach(function(c){ split($('.ch-h',c)).forEach(function(w,i){w.style.setProperty('--i',i)}); });
  if(window.VIDTEST){ v.src=window.VIDTEST; }
  else if(VIDM.indexOf('data:')===0 && window.fetch){ fetch(VIDM).then(function(r){return r.blob()}).then(function(bl){ v.src=URL.createObjectURL(bl); v.load(); }).catch(function(){ v.src=VIDM; }); }
  else if(/^https?:/.test(location.protocol) && window.fetch && window.URL){
    /* load the original file once into memory, so scrubbing seeks locally instead of over the network */
    v.src=VIDM;
    fetch(VIDM).then(function(r){ if(!r.ok) throw 0; return r.blob(); }).then(function(bl){ var t=v.currentTime; v.src=URL.createObjectURL(bl); v.load(); try{ v.currentTime=t; }catch(e){} }).catch(function(){});
  }
  else { v.src=VIDM; }
  var dur=20.18, cur=0, last=-1, bounds=[0,3.1,8.1,12.8,17.2];
  v.addEventListener('loadedmetadata',function(){ dur=v.duration||20.18; });
  // nudge iOS/Safari to render frames on seek
  var primed=false; function prime(){ if(primed) return; primed=true; var p=v.play(); if(p&&p.then) p.then(function(){v.pause()}).catch(function(){}); }
  addEventListener('touchstart',prime,{once:true,passive:true}); addEventListener('pointerdown',prime,{once:true});
  function tick(){
    if(sec.offsetParent!==null){
      var r=sec.getBoundingClientRect(), span=r.height-innerHeight, p=span>0?Math.min(1,Math.max(0,-r.top/span)):0;
      var target=p*(dur-.06);
      cur+= reduce ? (target-cur) : (target-cur)*0.12;
      if(Math.abs(cur-target)<.002) cur=target;
      if(v.readyState>=1 && Math.abs(v.currentTime-cur)>0.01 && !v.seeking){ try{ v.currentTime=cur; }catch(e){} }
      bar.style.transform='scaleX('+p+')'; hint.style.opacity=p>0.02?0:1;
      var t=cur;
      if(filmReady){ chaps.forEach(function(c){ var a=+c.dataset.t0,b=+c.dataset.t1; c.classList.toggle('on',t>=a&&t<b); c.classList.toggle('past',t>=b); }); }
      var k=0; for(var j=0;j<bounds.length;j++) if(t>=bounds[j]) k=j;
      if(k!==last){ rail.forEach(function(l,n){l.classList.toggle('on',n===k)}); last=k; }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ---- buttons: fill grows from the cursor; gentle magnetic pull ---- */
(function(){
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  $$('.btn, .arrow, .mbtn').forEach(function(b){
    b.addEventListener('pointerenter',function(e){ var r=b.getBoundingClientRect(); b.style.setProperty('--mx',(e.clientX-r.left)+'px'); b.style.setProperty('--my',(e.clientY-r.top)+'px'); });
    b.addEventListener('pointerleave',function(e){ var r=b.getBoundingClientRect(); b.style.setProperty('--mx',(e.clientX-r.left)+'px'); b.style.setProperty('--my',(e.clientY-r.top)+'px'); });
    if(!fine || !motion) return;
    var qx=gsap.quickTo(b,'x',{duration:.6,ease:'power3.out'}), qy=gsap.quickTo(b,'y',{duration:.6,ease:'power3.out'});
    b.addEventListener('pointermove',function(e){ var r=b.getBoundingClientRect(); qx((e.clientX-r.left-r.width/2)*.22); qy((e.clientY-r.top-r.height/2)*.3); });
    b.addEventListener('pointerleave',function(){ qx(0); qy(0); });
  });
})();

/* ---- router with curtain transition ---- */
var pages={}; $$('.page').forEach(function(p){pages[p.dataset.page]=p});
var current=null;
var FILES={"home": "index.html", "about": "about.html", "destination": "destination.html", "wellness": "wellness.html", "contact": "contact.html"};
function routeName(){ var h=location.hash.replace(/^#\/?/,''); if(pages[h]) return h;
  var f=(location.pathname.split('/').pop()||'index.html').replace(/\.html$/,''); for(var k in FILES){ if(FILES[k].replace(/\.html$/,'')===f) return k; } return 'home'; }
function show(name){
  if(ctx){ctx.revert(); ctx=null;} if(G) ScrollTrigger.getAll().forEach(function(t){t.kill()});
  if(current) current.classList.remove('on');
  current=pages[name]; current.classList.add('on');
  $$('[data-nav]').forEach(function(a){a.classList.toggle('cur',a.dataset.nav===name)});
  document.title=(name==='home'?ORIA_L('ORIA | Longevity & Wellness Resort'):current.dataset.title+' — '+ORIA_L('ORIA | Longevity & Wellness Resort'));
  toTop(); hdr.classList.remove('hide'); lastY=0;
  initPage(current); if(G) ScrollTrigger.refresh(); onScroll(0);
}
var busy=false;
function go(name){
  if(busy) return; if(current===pages[name]){ if(menuOpen) setMenu(false); if(lenis) lenis.scrollTo(0,{duration:1.4}); else scrollTo(0,0); return; }
  if(menuOpen) setMenu(false);
  if(!motion){ show(name); return; }
  busy=true; var cu=$('#curtain'); $('#curtainTxt').textContent=pages[name].dataset.title; lock(true);
  gsap.timeline({onComplete:function(){busy=false}})
    .set(cu,{clipPath:'inset(100% 0% 0% 0%)'})
    .to(cu,{clipPath:'inset(0% 0% 0% 0%)',duration:1,ease:'expo.inOut'})
    .from('#curtain .in > *',{y:30,opacity:0,duration:.8,ease:'expo.out',stagger:.08},'-=.45')
    .add(function(){ show(name); lock(false); })
    .to(cu,{clipPath:'inset(0% 0% 100% 0%)',duration:1.1,ease:'expo.inOut'},'+=.15')
    .add(function(){heroIn(current); filmReady=true;},'-=.7');
}
addEventListener('popstate',function(){ go(routeName()); });
$$('a[href$=".html"]').forEach(function(a){ var f=a.getAttribute('href'), n=null; for(var k in FILES){ if(FILES[k]===f) n=k; } if(!n) return;
  a.addEventListener('click',function(e){ if(e.metaKey||e.ctrlKey||e.shiftKey||e.button) return; e.preventDefault();
    if(current!==pages[n]){ try{ history.pushState(null,'',f+location.search); }catch(err){ location.href=f+location.search; return; } }
    go(n); }); });

/* ---- preloader ---- */
show(routeName());
var pre=$('#pre'); var skipPre=false; try{ skipPre=sessionStorage.getItem('oria-skip-pre')==='1'; sessionStorage.removeItem('oria-skip-pre'); }catch(e){}
if(motion && !skipPre){
  lock(true);
  var frames=$$('#pframe img'), o={v:0}, tl=gsap.timeline({onComplete:function(){pre.remove(); lock(false); ScrollTrigger.refresh();}});
  tl.from('.pre .ptop, .pre .pword',{opacity:0,y:10,duration:.9,ease:'power2.out',stagger:.1},0)
    .from('#pframe',{clipPath:'inset(50% 50% 50% 50%)',duration:1.1,ease:'expo.inOut'},.1)
    .to(o,{v:100,duration:2.6,ease:'power1.inOut',onUpdate:function(){$('#pnum').textContent=Math.round(o.v)}},0);
  frames.forEach(function(f,i){ tl.fromTo(f,{opacity:0,scale:1.2},{opacity:1,scale:1,duration:.7,ease:'expo.out'},.5+i*.55); });
  tl.to('.pre .pnum, .pre .ptop, .pre .pword',{opacity:0,y:-16,duration:.5,ease:'power2.in'},2.75)
    .to('#pframe',{width:'100vw',height:'100vh',duration:1.3,ease:'expo.inOut'},2.8)
    .to(pre,{backgroundColor:'rgba(0,0,0,0)',duration:.3},3.9)
    .add(function(){ heroIn(current); filmReady=true; },3.7)
    .to(pre,{opacity:0,duration:.5},4.05);
}else{ pre.remove(); filmReady=true; if(motion) heroIn(current); }
addEventListener('load',function(){if(G) ScrollTrigger.refresh()});
})();
