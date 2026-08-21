const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];let scene=0,mem=0,candlesOut=false,ctx=null,analyser=null,stream=null,raf=null;$$("[data-her]").forEach(x=>x.textContent=CONFIG.herName);$$("[data-your]").forEach(x=>x.textContent=CONFIG.yourName);const scenes=$$(".scene"),progress=$("#progress");function go(n){scene=Math.max(0,Math.min(5,n));scenes.forEach((x,i)=>x.classList.toggle("active",i===scene));progress.style.width=`${(scene+1)/6*100}%`;window.scrollTo({top:0,behavior:"smooth"});if(scene===1)renderMemory()}$$(".next").forEach(x=>x.onclick=()=>go(scene+1));function renderMemory(){
 $("#polaroid").classList.toggle("first-memory", mem===0);
    const m = CONFIG.memories[mem];
    const box = $("#memoryImage");
    const polaroid = $("#polaroid");

    // Reset the special height class when changing photos.
    polaroid.classList.toggle("tall-memory", mem === 1);

    // Render the selected image.
    if (m.image) {
        box.innerHTML = "";
        const img = document.createElement("img");
        img.src = m.image;
        img.alt = m.title || `Memory ${mem + 1}`;
        img.loading = "eager";
        box.appendChild(img);
    } else {
        box.innerHTML = `Your photo<br><small>add the URL in config.js</small>`;
    }

    $("#memoryTitle").textContent = m.title || "";
    $("#memoryText").textContent = m.text || "";

    $("#memoryDots").innerHTML = CONFIG.memories.map((_, i) =>
        `<button class="${i === mem ? "on" : ""}" data-i="${i}" aria-label="Memory ${i + 1}"></button>`
    ).join("");

    $$("#memoryDots button").forEach(button => {
        button.addEventListener("click", () => {
            mem = Number(button.dataset.i);
            renderMemory();
        });
    });
}

$("#memPrev").addEventListener("click", () => {
    mem = (mem - 1 + CONFIG.memories.length) % CONFIG.memories.length;
    renderMemory();
});

$("#memNext").addEventListener("click", () => {
    mem = (mem + 1) % CONFIG.memories.length;
    renderMemory();
});


const petalMessages = [
    "You make ordinary days feel a little different.",
    "I notice more about you than I probably let you know.",
    "Without even trying, you changed something in me.",
    "Somewhere along the way, you became someone special to me."
];

let revealedPetals = 0;

$$(".flower").forEach((flower, index) => {
    flower.addEventListener("click", (event) => {
        event.preventDefault();

        if (flower.classList.contains("picked")) return;

        flower.classList.add("picked");
        revealedPetals++;

        $("#petalText").textContent = petalMessages[index];
        $("#petalHint").textContent =
            revealedPetals === 4
                ? "You found them all. ♡"
                : `${4 - revealedPetals} more little secret${4 - revealedPetals === 1 ? "" : "s"}…`;

        // Give the selected flower a small burst.
        for (let i = 0; i < 6; i++) {
            const spark = document.createElement("span");
            spark.className = "petal-spark";
            spark.textContent = "✦";
            spark.style.setProperty("--sx", `${(Math.random() - 0.5) * 80}px`);
            spark.style.setProperty("--sy", `${(Math.random() - 0.5) * 80}px`);
            flower.appendChild(spark);
            setTimeout(() => spark.remove(), 700);
        }
    });
});

function openEnvelope(){let w=$("#envelope");if(w.classList.contains("opened"))return;w.classList.add("opened");let f=w.querySelector(".env-flap"),fr=w.querySelector(".env-front"),l=w.querySelector(".paper-letter"),s=w.querySelector(".seal");f.style.transform="translateY(-180px) rotateX(70deg)";f.style.opacity=0;f.style.pointerEvents="none";fr.style.transform="translateY(230px)";fr.style.opacity=0;fr.style.pointerEvents="none";l.style.zIndex=100;l.style.transform="translateY(-75px)";l.style.height="";s.style.opacity=0;s.style.pointerEvents="none";$("#letterHint").textContent="Your letter is opening…";setTimeout(()=>{$("#letterHint").textContent="";$("#afterLetter").classList.remove("hidden")},1100)}$("#openLetter").onclick=openEnvelope;$("#envelope").onclick=e=>{if(!e.target.closest("#openLetter"))openEnvelope()};$("#afterLetter").onclick=()=>go(4);const flames=$$(".flames span"),meter=$("#blowMeter");function extinguish(){if(candlesOut)return;candlesOut=true;flames.forEach((f,i)=>setTimeout(()=>f.classList.add("out"),i*100));$("#cake").classList.add("celebrated");$("#cakeInstruction").textContent="Perfect. ✨ Your wish has been made.";$("#micStatus").textContent="All the candles are out. ♡";meter.style.width="100%";setTimeout(()=>$("#wish").classList.remove("hidden"),650)}$("#tapCandles").onclick=extinguish;$("#micBtn").onclick=async()=>{if(!navigator.mediaDevices?.getUserMedia){$("#micStatus").textContent="Microphone unavailable — use the tap button.";return}try{stream=await navigator.mediaDevices.getUserMedia({audio:true});ctx=new(window.AudioContext||window.webkitAudioContext)();let src=ctx.createMediaStreamSource(stream);analyser=ctx.createAnalyser();analyser.fftSize=512;src.connect(analyser);$("#micStatus").textContent="Blow toward your microphone… 🎂";detect()}catch{$("#micStatus").textContent="Permission blocked — use the tap button instead."}};function detect(){if(candlesOut)return;let a=new Uint8Array(analyser.fftSize);analyser.getByteTimeDomainData(a);let sum=0;for(let v of a){let x=(v-128)/128;sum+=x*x}let p=Math.min(1,Math.sqrt(sum/a.length)*5);meter.style.width=`${p*100}%`;if(p>.43){extinguish();stream?.getTracks().forEach(t=>t.stop());ctx?.close();return}raf=requestAnimationFrame(detect)}$("#gift").onclick=()=>{$("#gift").classList.add("opened");setTimeout(()=>{$("#finalStart").classList.add("hidden");$("#finalMessage").classList.remove("hidden")},700)};const music=$("#music");$("#musicBtn").onclick=async()=>{try{if(music.paused){await music.play();$("#musicBtn").textContent="♫ On"}else{music.pause();$("#musicBtn").textContent="♫ Music"}}catch{}};for(let i=0;i<18;i++){let p=document.createElement("span");p.textContent=i%3?"✿":"♡";p.style.left=Math.random()*100+"%";p.style.animationDelay=(-Math.random()*12)+"s";p.style.animationDuration=(8+Math.random()*8)+"s";$("#petals").appendChild(p)}go(0);
