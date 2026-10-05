const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const secs=$$('main>section'),NOTES=[
"Assalamu'alaikum. Kelompok 4 membahas Fathonah (cerdas) dan lawannya Baladah (bodoh) dalam etika mengelola data. Ada lima bagian: contoh nilai, contoh pelanggaran, dalil, dampak, dan kepedulian kita.",
"<b>Fathonah</b> berarti bijak dan teliti: mengambil keputusan dengan bijak, dan mengolah data mentah menjadi data bermanfaat. Contoh: London 1854, Dr. John Snow memetakan korban kolera, polanya menunjuk ke pompa Broad Street.",
"<b>Baladah</b>: tidak teliti memilah data dan memanipulasi data demi kepentingan pribadi. Contoh: Reinhart &amp; Rogoff 2010. Herndon (2013) menemukan rumus Excel yang salah. Hasil awal −0,1%, setelah dikoreksi sekitar +2,2%.",
"<b>Dalil</b>: Al-Hujurat 6 (telitilah kebenaran berita) dan Al-Isra 36 (jangan mengikuti yang tidak diketahui ilmunya). Dalam data: verifikasi sumber dan cek ulang hitungan.",
"<b>Dampak</b> menerapkan: data akurat, keputusan tepat, kepercayaan publik terjaga. Melanggar: kesimpulan keliru, keputusan merugikan, kepercayaan publik menurun.",
"<b>Kepedulian</b>: tabayyun, teliti dan transparan, berani mengoreksi, terus belajar. Sekian presentasi kami. Wassalamu'alaikum.",
"Terima kasih."];
let cur=0;
const go=i=>secs[Math.max(0,Math.min(secs.length-1,i))].scrollIntoView({behavior:'smooth'});
// nav dots
const dots=$('#dots');secs.forEach((s,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',s.dataset.t);b.title=s.dataset.t;b.onclick=()=>go(i);dots.append(b)});
$$('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){cur=secs.indexOf(e.target);$$('button',dots).forEach((b,i)=>b.classList.toggle('on',i===cur));$('#notes').innerHTML=NOTES[cur];if(cur===1&&!mapDone)setTimeout(plot,500)}}),{threshold:.55});
secs.forEach(s=>io.observe(s));
addEventListener('scroll',()=>{$('#bar').style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
const nt=$('#notes'),tn=$('#tN');const tog=()=>{const o=nt.classList.toggle('open');tn.setAttribute('aria-expanded',o)};tn.onclick=tog;
$('#tT').onclick=()=>{const r=document.documentElement,d=getComputedStyle(r).getPropertyValue('--bg').trim()==='#0b231a';r.dataset.theme=d?'light':'dark'};
addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','PageDown'].includes(e.key)){e.preventDefault();go(cur+1)}else if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(cur-1)}else if(e.key==='n'||e.key==='N')tog();else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}});
$('#notes').innerHTML=NOTES[0];$$('button',dots)[0].classList.add('on');
// stars
for(let i=0;i<45;i++){const s=document.createElement('i');s.className='st';s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*85}%;animation-delay:${Math.random()*3}s`;$('#hero').prepend(s)}
const anim=(el,a,b,d,f)=>{const t0=performance.now();(function s(t){const p=Math.min(1,(t-t0)/d),e=1-Math.pow(1-p,3);el.textContent=f(a+(b-a)*e);if(p<1)requestAnimationFrame(s)})(t0)};
// ---- peta Snow
const svg=$('#svg');let r=7;const rnd=()=>(r=(r*9301+49297)%233280)/233280;
let h='<g stroke="#d8cfa8" stroke-width="10" stroke-linecap="round" fill="none"><path d="M0 150H400M0 70H400M0 235H400M80 0V300M200 0V300M320 0V300M0 20L400 280"/></g>';
const pumps=[[200,150,'Pompa Broad Street',1],[80,70,'Pompa lain'],[320,75,'Pompa lain'],[85,232,'Pompa lain'],[325,232,'Pompa lain']];
pumps.forEach(p=>h+=`<g class="pump" data-n="${p[2]}"><circle cx="${p[0]}" cy="${p[1]}" r="${p[3]?10:7}" fill="${p[3]?'#e2b04a':'#8a9a90'}" stroke="#10281e" stroke-width="2"/></g>`);
h+='<circle class="ring" id="ring" cx="200" cy="150" r="52"/>';
const pts=[];for(let i=0;i<54;i++){const c=i<40,a=rnd()*6.28,d=c?Math.pow(rnd(),.8)*46:60+rnd()*120;pts.push([Math.max(8,Math.min(392,200+Math.cos(a)*d*(c?1:1.5))),Math.max(8,Math.min(292,150+Math.sin(a)*d))])}
pts.forEach(p=>h+=`<circle class="dot" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.5"/>`);
svg.innerHTML=h;
let mapDone=false,busy=false;
function plot(){if(busy)return;const ds=$$('.dot',svg);if(mapDone){ds.forEach(d=>d.classList.remove('on'));$('#ring').classList.remove('on');$('#cnt').textContent='0 titik';$('#plot').textContent='Petakan korban';$('#ins').textContent='Tekan tombol, lalu lihat ke mana polanya mengarah.';mapDone=false;return}
busy=true;$('#plot').textContent='Memetakan…';ds.forEach((d,i)=>setTimeout(()=>{d.classList.add('on');$('#cnt').textContent=(i+1)+' titik';if(i===ds.length-1){setTimeout(()=>{$('#ring').classList.add('on');$('#ins').textContent='Data mentah berubah jadi bukti: titik terbanyak mengelilingi pompa Broad Street.';$('#plot').textContent='Ulangi';busy=false;mapDone=true},400)}},i*45))}
$('#plot').onclick=plot;
$$('.pump',svg).forEach(p=>{p.onclick=()=>{$('#ins').textContent=p.dataset.n+(p.dataset.n.includes('Broad')?': pusat sebaran korban.':': sedikit korban di sekitarnya.')}});
// ---- Reinhart-Rogoff
const ch=$('#chips');for(let i=0;i<20;i++){const e=document.createElement('i');if(i>=15)e.className='miss';ch.append(e)}
$('#sw').onclick=function(){const on=this.getAttribute('aria-checked')!=='true';this.setAttribute('aria-checked',on);ch.classList.toggle('all',on);const b=$('#big');b.className='big '+(on?'good':'bad');anim(b,on?-0.1:2.2,on?2.2:-0.1,900,v=>(v>=0?'+':'−')+Math.abs(v).toFixed(1).replace('.',',')+'%');$('#mk').style.left=((on?2.2:-0.1)+1)/4*100+'%';$('#fx').textContent=on?'=AVERAGE(20 negara)':'=AVERAGE(15 negara)';$('#swl').textContent=on?'Semua 20 negara dihitung':'Masukkan 5 negara yang terlewat'};
// ---- dalil
$$('.fc').forEach(c=>c.onclick=()=>c.classList.toggle('flip'));
// ---- dampak
const D={good:['Data akurat, keputusan tepat','Kepercayaan publik terjaga','Kesalahan cepat terungkap, seperti temuan Herndon (2013)'],bad:['Kesimpulan keliru, keputusan merugikan','Hasil keliru sempat dipakai dalam debat kebijakan penghematan','Kepercayaan publik menurun']};
const draw=m=>{$('#list').innerHTML=D[m].map((t,i)=>`<div class="li"><em>${m==='good'?'+':'−'}</em><span>${t}</span></div>`).join('');$('#dampak').dataset.m=m;$('#ill').src=m==='good'?'assets/bulan.webp':'assets/kantong.webp';$$('.seg button').forEach(b=>b.classList.toggle('on',b.dataset.m===m))};
$$('.seg button').forEach(b=>b.onclick=()=>draw(b.dataset.m));draw('good');
// ---- kepedulian
const K=[['Tabayyun','Cek ulang sumber dan hitungan sebelum menyimpulkan'],['Teliti dan transparan','Catat proses kerja agar bisa diperiksa orang lain'],['Berani mengoreksi','Laporkan kesalahan data, seperti yang dilakukan Herndon'],['Terus belajar','Asah ilmu dan kemampuan analisis']];
const cks=$('#cks');K.forEach((k,i)=>{const b=document.createElement('button');b.className='ck';b.setAttribute('aria-pressed','false');b.innerHTML=`<span class="n">${i+1}</span><div><b>${k[0]}</b><span>${k[1]}</span></div>`;b.onclick=e=>{const on=b.classList.toggle('on');b.setAttribute('aria-pressed',on);const n=$$('.ck.on').length;$('#pg').style.width=n*25+'%';$('#kid').style.filter=`drop-shadow(0 0 ${n*8}px rgba(226,176,74,.9))`;$('#pm').textContent=n===4?'Lengkap! Siap jadi analis data yang amanah.':n+' dari 4 komitmen';if(n===4&&on)burst(e.clientX,e.clientY)};cks.append(b)});
function burst(x,y){for(let i=0;i<28;i++){const s=document.createElement('i');s.className='bst';s.style.left=x+'px';s.style.top=y+'px';document.body.append(s);const a=Math.random()*6.28,d=80+Math.random()*180;requestAnimationFrame(()=>{s.style.transform=`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) rotate(${Math.random()*360}deg) scale(${1+Math.random()*1.5})`;s.style.opacity=0});setTimeout(()=>s.remove(),1200)}}
