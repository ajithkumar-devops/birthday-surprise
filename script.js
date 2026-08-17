const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let scene=0,mem=0,secret=0,holding=false,holdStart=0,candlesOut=false,ctx=null,analyser=null,stream=null,raf=null;
$$("[data-her]").forEach(x=>x.textContent=CONFIG.herName);$$("[data-your]").forEach(x=>x.textContent=CONFIG.yourName);
const scenes=$$(".scene"), progress=$("#progress");
function go(n){scene=Math.max(0,Math.min(9,n));scenes.forEach((x,i)=>x.classList.toggle("active",i===scene));progress.style.width=`${(scene+1)/10*100}%`;window.scrollTo({top:0,behavior:"smooth"});if(scene===3)renderMemory();if(scene===4)renderSecret();}
$$(".next").forEach(x=>x.onclick=()=>go(scene+1));

$("#promiseBtn").onclick=()=>{burst($("#promiseBurst"),12);go(2)};
function burst(host,n=24){for(let i=0;i<n;i++){let s=document.createElement("i");s.textContent=["✦","♡","✿"][i%3];s.style.setProperty("--x",`${(Math.random()-.5)*300}px`);s.style.setProperty("--y",`${(Math.random()-.5)*300}px`);host.appendChild(s);setTimeout(()=>s.remove(),1200)}}

function renderMemory(){let m=CONFIG.memories[mem],box=$("#memoryImage");box.innerHTML="";if(m.image){let img=new Image();img.src=m.image;img.alt=m.title;box.appendChild(img)}else box.innerHTML=`Your photo<br><small>add the URL in config.js</small>`;$("#memoryTitle").textContent=m.title;$("#memoryText").textContent=m.text;$("#memoryDots").innerHTML=CONFIG.memories.map((_,i)=>`<button class="${i===mem?"on":""}" data-i="${i}"></button>`).join("");$$("#memoryDots button").forEach(b=>b.onclick=()=>{mem=+b.dataset.i;renderMemory()})}
$("#memPrev").onclick=()=>{mem=(mem-1+CONFIG.memories.length)%CONFIG.memories.length;renderMemory();tilt(-1)};$("#memNext").onclick=()=>{mem=(mem+1)%CONFIG.memories.length;renderMemory();tilt(1)};
function tilt(d){$("#polaroid").animate([{transform:`rotate(${d*2}deg) translateX(${d*10}px)`},{transform:`rotate(-1deg) translateX(0)`}],{duration:420,easing:"cubic-bezier(.2,.8,.2,1)"})}

// Secret flower garden
function renderSecret(){let flowers=$$("#secretGarden .flower");flowers.forEach((f,i)=>{f.onclick=()=>{secret=(i)%CONFIG.secrets.length;$("#secretText").textContent=CONFIG.secrets[secret];f.classList.add("picked");burst(f,8)}});if(!$("#secretText").textContent)$("#secretText").textContent="Tap a flower…";}

// Hold heart
const heart=$("#holdHeart"),fill=$("#holdFill"),status=$("#holdStatus");
function startHold(){if(holding)return;holding=true;holdStart=performance.now();status.textContent="keep holding…";tickHold()}
function tickHold(){if(!holding)return;let p=Math.min(1,(performance.now()-holdStart)/1800);fill.style.width=`${p*100}%`;heart.style.setProperty("--p",p);if(p>=1){holding=false;status.textContent="Okay… you did it. ♡";burst(document.body,18);setTimeout(()=>go(6),650);return}requestAnimationFrame(tickHold)}
function stopHold(){if(holding){holding=false;fill.style.width="0";status.textContent="don't let go yet…"}}
["pointerdown"].forEach(e=>heart.addEventListener(e,startHold));["pointerup","pointercancel","pointerleave"].forEach(e=>heart.addEventListener(e,stopHold));

// Envelope
function openEnvelope(){
  const wrap = $("#envelope");
  if (wrap.classList.contains("opened")) return;

  wrap.classList.add("opened");

  // Apply the important visual states inline as well as via CSS.
  // This avoids browser/CSS stacking quirks and guarantees the
  // envelope panels cannot cover the letter after opening.
  const flap = wrap.querySelector(".env-flap");
  const front = wrap.querySelector(".env-front");
  const letter = wrap.querySelector(".paper-letter");
  const seal = wrap.querySelector(".seal");

  if (flap) {
    flap.style.transform = "translateY(-180px) rotateX(70deg)";
    flap.style.opacity = "0";
    flap.style.pointerEvents = "none";
    flap.style.zIndex = "0";
  }
  if (front) {
    front.style.transform = "translateY(230px)";
    front.style.opacity = "0";
    front.style.pointerEvents = "none";
    front.style.zIndex = "0";
  }
  if (letter) {
    letter.style.zIndex = "100";
    letter.style.transform = "translateY(-185px)";
    letter.style.height = "315px";
    letter.style.boxShadow = "0 28px 60px rgba(90,60,50,.22)";
  }
  if (seal) {
    seal.style.opacity = "0";
    seal.style.pointerEvents = "none";
    seal.style.transform = "scale(.4)";
  }

  $("#letterHint").textContent = "Your letter is opening…";
  $("#openLetter").setAttribute("aria-label","Letter opened");

  setTimeout(() => {
    $("#letterHint").textContent = "";
    $("#afterLetter").classList.remove("hidden");
  }, 1100);
}
$("#openLetter").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  openEnvelope();
});
$("#envelope").addEventListener("click", (e) => {
  if (e.target.closest("#openLetter")) return;
  if (!$("#envelope").classList.contains("opened")) openEnvelope();
});
$("#afterLetter").onclick=()=>go(7);

// Candle audio detection
const flames=$$(".flames span"),meter=$("#blowMeter");
function extinguish(){if(candlesOut)return;candlesOut=true;flames.forEach((f,i)=>setTimeout(()=>f.classList.add("out"),i*100));$("#cake").classList.add("celebrated");$("#cakeInstruction").textContent="Perfect. ✨ Your wish has been made.";$("#micStatus").textContent="All the candles are out. ♡";meter.style.width="100%";setTimeout(()=>$("#wish").classList.remove("hidden"),650)}
$("#tapCandles").onclick=extinguish;
$("#micBtn").onclick=async()=>{if(candlesOut)return;if(!navigator.mediaDevices?.getUserMedia){$("#micStatus").textContent="Microphone unavailable — use the tap button.";return}try{stream=await navigator.mediaDevices.getUserMedia({audio:true});ctx=new (window.AudioContext||window.webkitAudioContext)();let src=ctx.createMediaStreamSource(stream);analyser=ctx.createAnalyser();analyser.fftSize=512;src.connect(analyser);$("#micStatus").textContent="Blow toward your microphone… 🎂";detect()}catch{$("#micStatus").textContent="Permission blocked — use the tap button instead."}};
function detect(){if(candlesOut)return;let a=new Uint8Array(analyser.fftSize);analyser.getByteTimeDomainData(a);let sum=0;for(let v of a){let x=(v-128)/128;sum+=x*x}let rms=Math.sqrt(sum/a.length),p=Math.min(1,rms*5);meter.style.width=`${p*100}%`;if(p>.43){extinguish();if(stream)stream.getTracks().forEach(t=>t.stop());if(ctx)ctx.close().catch(()=>{});return}raf=requestAnimationFrame(detect)}

// Gift: click + keyboard
$("#gift").onclick=openGift;$("#gift").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openGift()}};
function openGift(){if($("#gift").classList.contains("opened"))return;$("#gift").classList.add("opened");$("#giftHint").textContent="";burst(document.body,42);setTimeout(()=>{$("#finalMessage").classList.remove("hidden");$("#gift").classList.add("hidden")},700)}

// Music
const music=$("#music");$("#musicBtn").onclick=async()=>{try{if(music.paused){await music.play();$("#musicBtn").textContent="♫ On"}else{music.pause();$("#musicBtn").textContent="♫ Music"}}catch{$("#musicBtn").textContent="♫ Add music"}};

// Petals + cursor
for(let i=0;i<24;i++){let p=document.createElement("span");p.textContent=i%3?"✿":"♡";p.style.left=Math.random()*100+"%";p.style.animationDelay=(-Math.random()*12)+"s";p.style.animationDuration=(8+Math.random()*8)+"s";$("#petals").appendChild(p)}
const glow=$("#cursorGlow");window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
go(0);