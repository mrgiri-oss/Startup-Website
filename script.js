document.addEventListener("DOMContentLoaded", function(){

/* ================= CURSOR GLOW ================= */
const glow = document.getElementById("glow");
if(glow){
  document.addEventListener("mousemove", e=>{
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

/* ================= SCROLL REVEAL ================= */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("active");
    }else{
      entry.target.classList.remove("active");
    }
  });
},{ threshold:0.2 });

document.querySelectorAll(".reveal").forEach(el=>{
  observer.observe(el);
});

/* ================= HERO PARALLAX ================= */
const hero = document.querySelector(".hero-parallax");
if(hero){
  document.addEventListener("mousemove", e => {
    const x = (window.innerWidth/2 - e.pageX) / 40;
    const y = (window.innerHeight/2 - e.pageY) / 40;

    hero.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  });
}

/* ================= DOUBLE TAP THEME TOGGLE ================= */

const heroSection = document.getElementById("about");

if(heroSection){

  let lastTap = 0;

  // MOBILE DOUBLE TAP
  heroSection.addEventListener("touchend", function () {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      document.getElementById("themeToggle").click(); // 👈 triggers your existing toggle
    }

    lastTap = currentTime;
  });

  // DESKTOP DOUBLE CLICK
  heroSection.addEventListener("dblclick", function () {
    document.getElementById("themeToggle").click();
  });

}

/* ================= COUNTERS (REPEAT ON SCROLL) ================= */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const counter = entry.target;
    const target = +counter.getAttribute("data-target");

    if(entry.isIntersecting){
      counter.innerText = "0";
      let current = 0;

      const updateCounter = () => {
        const increment = target / 40;
        current += increment;

        if(current < target){
          counter.innerText = Math.floor(current);
          requestAnimationFrame(updateCounter);
        }else{
          counter.innerText = target + "+";
        }
      };

      updateCounter();
    }else{
      counter.innerText = "0";
    }
  });
},{ threshold:0.3 });

counters.forEach(counter => {
  counterObserver.observe(counter);
});

/* ================= NAV CTA BUTTON EFFECT ================= */
const navBtn = document.querySelector(".nav-cta-btn");

if(navBtn){
  navBtn.addEventListener("mousemove", (e)=>{
    const rect = navBtn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;

    navBtn.style.transform = `translate(${x*0.2}px, ${y*0.2}px) scale(1.05)`;
  });

  navBtn.addEventListener("mouseleave", ()=>{
    navBtn.style.transform = "translate(0,0) scale(1)";
  });
}

/* ================= ACTIVITY POPUP ================= */
const popup = document.getElementById("activity-popup");

const messages = [
"🔥 Aman from Delhi just pitched a FinTech startup",
"🚀 Riya secured funding from an angel investor",
"💡 AI-based startup submitted a pitch",
"📈 5 investors joined recently",
"💰 Startup raised ₹1.8 Cr in seed round",
"🧠 SaaS startup got shortlisted",
"🌍 Founder from Bangalore just applied",
"⚡ Pitch deck reviewed by investors",
"💼 EdTech startup is trending",
"📊 Investor showed interest",
"🏆 Top startups updated",
"💸 Funding opportunity unlocked",
"🤝 Startup matched with investor",
"🚀 Early-stage startup gaining traction",
"📩 Pitch sent to investors",
"🌱 GreenTech startup joined",
"🔥 Startup from Mumbai trending",
"📈 New applications received",
"💡 Founder updated pitch",
"💰 Pre-seed discussion started"
];

function showPopup(){
  if(!popup) return;

  const timeLabels = ["just now","1 min ago","2 min ago","a moment ago"];
  const msg = messages[Math.floor(Math.random()*messages.length)];
  const time = timeLabels[Math.floor(Math.random()*timeLabels.length)];

  popup.innerText = msg + " • " + time;
  popup.classList.add("show");

  const visibleTime = Math.random() * 1500 + 2500;

  setTimeout(()=>{
    popup.classList.remove("show");
  }, visibleTime);

  const nextDelay = Math.random() * 4000 + 4000;
  setTimeout(showPopup, nextDelay);
}

setTimeout(showPopup, 3000);

/* ================= THEME TOGGLE ================= */
const toggle = document.getElementById("themeToggle");

if(toggle){
  const icon = toggle.querySelector(".icon");

  if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-theme");
    icon.textContent = "☀️";
  }

  toggle.addEventListener("click", ()=>{
    document.body.classList.toggle("light-theme");
    icon.style.transform = "rotate(360deg)";

    if(document.body.classList.contains("light-theme")){
      icon.textContent = "☀️";
      localStorage.setItem("theme","light");
    }else{
      icon.textContent = "🌙";
      localStorage.setItem("theme","dark");
    }

    setTimeout(()=>{
      icon.style.transform = "rotate(0deg)";
    },500);
  });
}

/* ================= MOBILE MENU ================= */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if(menuBtn && mobileMenu){

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });

  document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuBtn.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.remove("active");
      menuBtn.classList.remove("active");
    }
  });
}

});