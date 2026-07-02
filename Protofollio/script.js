/* =========================================
   LOADING SCREEN
========================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.pointerEvents = "none";

    setTimeout(() => {

        loader.style.display = "none";

    },800);

});


/* =========================================
   TYPING EFFECT
========================================= */

const typingText = [

    "Front-End Developer",

    "Web Designer",

    "JavaScript Developer",

    "UI Developer"

];

const typing = document.getElementById("typing");

let wordIndex = 0;

let charIndex = 0;

let deleting = false;

function typeEffect(){

    const currentWord = typingText[wordIndex];

    if(!deleting){

        typing.textContent = currentWord.substring(0,charIndex);

        charIndex++;

        if(charIndex > currentWord.length){

            deleting = true;

            setTimeout(typeEffect,1200);

            return;

        }

    }else{

        typing.textContent = currentWord.substring(0,charIndex);

        charIndex--;

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= typingText.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 50 : 120);

}

typeEffect();


/* =========================================
   SCROLL REVEAL
========================================= */

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

hiddenElements.forEach(el=>{

    observer.observe(el);

});


/* =========================================
   BACK TO TOP
========================================= */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        topBtn.style.opacity = "1";

        topBtn.style.visibility = "visible";

    }else{

        topBtn.style.opacity = "0";

        topBtn.style.visibility = "hidden";

    }

});

topBtn.onclick = ()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* =========================================
   3D TILT CARDS
========================================= */

const cards = document.querySelectorAll(
".project-card,.service-card,.info-box,.stat-card"
);

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

const rotateY = (x / rect.width - .5) * 18;

const rotateX = (y / rect.height - .5) * -18;

card.style.transform =

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1000px) rotateX(0) rotateY(0)";

});

});


/* =========================================
   MOUSE GLOW
========================================= */

const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove",(e)=>{

glow.style.left = e.clientX + "px";

glow.style.top = e.clientY + "px";

});


/* =========================================
   MAGNETIC BUTTONS
========================================= */

const buttons = document.querySelectorAll(

".primary-btn,.secondary-btn,.cv-btn"

);

buttons.forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect = btn.getBoundingClientRect();

const x = e.clientX - rect.left - rect.width/2;

const y = e.clientY - rect.top - rect.height/2;

btn.style.transform =

`translate(${x*.18}px,${y*.18}px)`;

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translate(0,0)";

});

});


/* =========================================
   ACTIVE NAVBAR
========================================= */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top = section.offsetTop-200;

const height = section.clientHeight;

if(scrollY >= top){

current = section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/* =========================================
   COUNTER
========================================= */

const counters=document.querySelectorAll(".stat-card h2");

let started=false;

window.addEventListener("scroll",()=>{

const stats=document.querySelector(".stats");

if(!stats) return;

if(window.scrollY>stats.offsetTop-500 && !started){

started=true;

counters.forEach(counter=>{

const target=parseInt(counter.innerText);

let count=0;

const speed=target/80;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count)+"+";

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

};

update();

});

}

});

/* =========================================
   PARALLAX HERO
========================================= */

const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image img");

window.addEventListener("mousemove",(e)=>{

    if(!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform =
    `translate(${x}px,${y}px)`;

});


/* =========================================
   STAGGER ANIMATION
========================================= */

const revealItems = document.querySelectorAll(
".project-card,.service-card,.skill,.info-box"
);

const staggerObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const items =
            entry.target.parentElement.children;

            [...items].forEach((item,index)=>{

                setTimeout(()=>{

                    item.style.opacity="1";
                    item.style.transform="translateY(0)";

                },index*120);

            });

        }

    });

},{
    threshold:.2
});

revealItems.forEach(item=>{

    item.style.opacity="0";
    item.style.transform="translateY(40px)";
    item.style.transition=".8s";

    staggerObserver.observe(item);

});


/* =========================================
   RIPPLE EFFECT
========================================= */

const rippleButtons = document.querySelectorAll(
".primary-btn,.secondary-btn,.cv-btn"
);

rippleButtons.forEach(button=>{

button.addEventListener("click",(e)=>{

const circle = document.createElement("span");

const diameter =
Math.max(button.clientWidth,button.clientHeight);

circle.style.width = diameter+"px";
circle.style.height = diameter+"px";

circle.style.position="absolute";
circle.style.borderRadius="50%";
circle.style.background="rgba(255,255,255,.35)";
circle.style.transform="scale(0)";
circle.style.animation="ripple .6s linear";
circle.style.pointerEvents="none";

const rect=button.getBoundingClientRect();

circle.style.left=
(e.clientX-rect.left-diameter/2)+"px";

circle.style.top=
(e.clientY-rect.top-diameter/2)+"px";

button.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});


/* =========================================
   NAVBAR SHADOW
========================================= */

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

header.style.background="rgba(8,17,31,.85)";
header.style.backdropFilter="blur(25px)";

}else{

header.style.background="transparent";

}

});


/* =========================================
   SMOOTH HOVER SOUND STYLE
========================================= */

document.querySelectorAll("a,button").forEach(el=>{

el.addEventListener("mouseenter",()=>{

el.style.transition=".25s";

});

});


console.log("%c Ahmed Portfolio Loaded 🚀",
"color:#4ea5ff;font-size:18px;font-weight:bold;");

const form = document.getElementById("contact-form");
const status = document.getElementById("status");
const button = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    button.innerHTML = "Sending...";
    button.disabled = true;

    const data = new FormData(form);

    const response = await fetch(form.action, {
        method: "POST",
        body: data
    });

    if (response.ok) {

        status.innerHTML = "✅ Your message has been sent successfully!";
        status.style.color = "#4CAF50";

        form.reset();

        setTimeout(() => {
    status.innerHTML = "";
}, 4000);

    } else {

        status.innerHTML = "❌ Failed to send message.";
        status.style.color = "red";
        setTimeout(() => {
    status.innerHTML = "";
}, 4000);

    }

    button.innerHTML = "Send Message";
    button.disabled = false;

});