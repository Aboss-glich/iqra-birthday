
const $ = (s,root=document)=>root.querySelector(s);
const photos = Array.from({length:26},(_,i)=>`photo-${String(i+1).padStart(2,'0')}.jpg`);
const navItems=[['Home','home.html'],['Little things','little-things.html'],['Gallery','gallery.html'],['A note','letter.html'],['Birthday wish','wish.html'],['Mini fun','fun.html'],['Surprise','surprise.html']];
function nav(active=''){return `<nav class="nav" id="nav"><a class="brand" href="home.html">a little world <b>♡</b></a><div class="navlinks">${navItems.map(([n,h])=>`<a class="${active===h?'active':''}" href="${h}">${n}</a>`).join('')}</div><div class="nav-actions"><button class="mobile-menu" id="menu" aria-label="Open menu">☰</button></div></nav>`}
function footer(){return `<footer class="footer">A little birthday universe, made with care by <b>Anmol</b> · <a href="https://instagram.com/iqra_135853" target="_blank" rel="noopener">@iqra_135853 ↗</a></footer>`}
function dock(){return `<aside class="music-dock"><button id="musicToggle" aria-label="Play music">♫</button><select id="track"><option value="soft">Soft instrumental</option><option value="piano">Dreamy piano</option><option value="birthday">Birthday celebration</option></select><span id="musicState" style="font-size:.7rem;color:#927d95">Music</span></aside>`}

function birthdayDecor(){
 const decor=document.createElement('div');
 decor.className='birthday-decor';
 decor.setAttribute('aria-hidden','true');
 decor.innerHTML=`<div class="sky-balloons"><span>🎈</span><span>🎈</span><span>🎈</span><span>🎈</span></div><div class="confetti-rain">${Array.from({length:34},(_,i)=>`<i style="--x:${(i*37)%100}%;--d:${(i%9)*.55}s;--r:${(i*47)%360}deg"></i>`).join('')}</div><div class="side-sparkles">✦　♡　✧　✿　✦</div>`;
 document.body.appendChild(decor);
}
function burstConfetti(){
 const layer=document.createElement('div');layer.className='burst-layer';document.body.appendChild(layer);
 const colors=['#f39abb','#b9a5e2','#ffd18b','#9edbd0','#f7c5d7'];
 for(let i=0;i<72;i++){const p=document.createElement('i');p.style.left='50%';p.style.top='48%';p.style.setProperty('--tx',`${(Math.random()-.5)*innerWidth}px`);p.style.setProperty('--ty',`${(Math.random()-.7)*innerHeight}px`);p.style.setProperty('--rot',`${Math.random()*900}deg`);p.style.background=colors[i%colors.length];layer.appendChild(p);}
 setTimeout(()=>layer.remove(),1800);
}
function pagePager(active){
 const pages=[['Home','home.html'],['Little things','little-things.html'],['Gallery','gallery.html'],['A note','letter.html'],['Birthday wish','wish.html'],['Mini fun','fun.html'],['Surprise','surprise.html']];
 const i=Math.max(0,pages.findIndex(x=>x[1]===active));
 const prev=i>0?`<a class="btn secondary" href="${pages[i-1][1]}">← Previous</a>`:'';
 const next=i<pages.length-1?`<a class="btn next-preview" href="${pages[i+1][1]}">Next preview <span aria-hidden="true">→</span></a>`:`<a class="btn next-preview" href="home.html">Replay little world ↻</a>`;
 return `<div class="page-pager wrap"><div class="pager-copy"><span>ONE LITTLE PAGE AT A TIME</span><b>Ready for the next surprise?</b></div><div class="pager-actions">${prev}${next}</div></div>`;
}
function shell(active,content){birthdayDecor();document.body.insertAdjacentHTML('afterbegin',nav(active));document.body.insertAdjacentHTML('beforeend',pagePager(active)+footer()+dock());$('#menu')?.addEventListener('click',()=>$('#nav').classList.toggle('open'));initMusic();}
function initMusic(){let audio=null;const tracks={soft:'soft-instrumental.mp3',piano:'dreamy-piano.mp3',birthday:'birthday-celebration.mp3'};let playing=false;$('#track')?.addEventListener('change',()=>{if(playing){audio?.pause();audio=new Audio(tracks[$('#track').value]);audio.loop=true;audio.volume=.45;audio.play().catch(()=>{});}});$('#musicToggle')?.addEventListener('click',()=>{if(!audio){audio=new Audio(tracks[$('#track').value]);audio.loop=true;audio.volume=.45;}if(playing){audio.pause();playing=false;$('#musicState').textContent='Paused';$('#musicToggle').textContent='♫';}else{audio.play().then(()=>{$('#musicState').textContent='Playing';$('#musicToggle').textContent='Ⅱ';playing=true;}).catch(()=>$('#musicState').textContent='Add MP3 files');}})}
function gallery(){const g=$('#gallery');if(!g)return;g.innerHTML=photos.map((p,i)=>`<button class="photo-card" style="--r:${(i%5-2)*1.1}deg" data-photo="${p}" aria-label="Open photo ${i+1}"><img loading="lazy" src="${p}" alt="Iqra photo ${i+1}"><span>a little moment ♡</span></button>`).join('');g.addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(!b)return;$('#lightbox img').src=b.dataset.photo;$('#lightbox').classList.add('open')});$('#closeLightbox')?.addEventListener('click',()=>$('#lightbox').classList.remove('open'));$('#lightbox')?.addEventListener('click',e=>{if(e.target.id==='lightbox')e.currentTarget.classList.remove('open')})}
function gift(){const b=$('#openGift');b?.addEventListener('click',()=>{burstConfetti();$('.gift-scene').classList.add('open');$('#giftMessage').classList.add('show');b.textContent='A little surprise, opened ♡';b.disabled=true;});$('#wishBtn')?.addEventListener('click',()=>{burstConfetti();const msg=$('#wishMessage');msg.textContent='May this year bring you gentle days, unexpected laughter, kind people and all the little things that make you happy. ✨';msg.classList.add('show');});}
document.addEventListener('DOMContentLoaded',()=>{const page=document.body.dataset.page||'';if(page!=='entry')shell(page+'.html');else birthdayDecor();if(page==='gallery')gallery();if(page==='surprise'||page==='wish')gift();if(page==='fun')initQuiz();});

function initQuiz(){
 const result=$('#quizResult');
 document.querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{
   document.querySelectorAll('[data-answer]').forEach(b=>b.classList.remove('chosen'));
   btn.classList.add('chosen');
   result.textContent=btn.dataset.answer==='cake'?'Bilkul! Birthday cake ke bina celebration kaise complete hogi? 🍰':btn.dataset.answer==='music'?'Yesss! Ek favourite song poore mood ko special bana deta hai. 🎶':'Perfect choice! Sweet moments hi toh birthday ko yaadgaar banate hain. 🌷';
   result.classList.add('show');
 }));
}
