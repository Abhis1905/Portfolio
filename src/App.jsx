import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import photo from "./assets/abhishek.png";

const ROLES = ["Full Stack Engineer","Backend Developer","ML Engineer","Java + Spring Boot","Open Source Builder","Problem Solver"];
const MARQUEE_ITEMS = ["JAVA","SPRING BOOT","PYTHON","FLASK","REACT","POSTGRESQL","SCIKIT-LEARN","REST APIs","ML ENGINEER","FULL STACK","OPEN SOURCE","DSA","VERCEL","RAILWAY","CARDIOSCAN"];
const SKILLS = {
  "Languages & Frameworks": [
    {name:"Java",pct:85},{name:"Spring Boot",pct:80},{name:"Python",pct:82},{name:"Flask / REST APIs",pct:83},{name:"React / Next.js",pct:76},
  ],
  "ML & Infrastructure": [
    {name:"scikit-learn",pct:80},{name:"NumPy / Pandas",pct:78},{name:"PostgreSQL / SQL",pct:74},{name:"Git / GitHub",pct:88},{name:"Vercel / Railway",pct:80},
  ],
};
const TAGS = ["DSA","OOP","DBMS","System Design","JWT Auth","SHAP Explainability","LLM APIs","Framer Motion","MVC Architecture","Competitive Programming","Groq API"];
const EXP = [
  {when:"FEB 2026 · IN PROGRESS",role:"NaturalApp Builder",where:"Personal Project · Full Stack",body:"Building a natural language to web app platform. Java + Spring Boot backend with prompt pipelines, version control workflows, and automated deployment — inspired by Lovable.dev.",tech:["Java","Spring Boot","REST APIs","PostgreSQL"]},
  {when:"2025 – 2026",role:"CardioScan",where:"Personal Project · Full Stack ML · Live",body:"End-to-end ML app predicting heart disease with 98.54% accuracy. React 18, Flask, scikit-learn ensemble, SHAP explainability, JWT auth, PostgreSQL, Llama 3.3 70B chatbot via Groq.",tech:["React","Flask","scikit-learn","PostgreSQL","Railway","Vercel"]},
  {when:"2026 – PRESENT",role:"General Secretary",where:"Literary Society · CV Raman Global University",body:"Leading student initiatives and organizing inter-college literary events as General Secretary. Managing cross-functional teams, driving campus engagement, and developing strong communication and leadership capabilities.",tech:["Leadership","Team Management","Communication"]},
  {when:"AUG 2025",role:"Smart Agri Dashboard",where:"Personal Project · Full Stack · Live on Netlify",body:"Real-time agriculture analytics platform. Weather APIs, commodity price feeds, crop health monitoring, and government scheme data in one interactive dashboard.",tech:["React","Python","APIs","Netlify"]},
  {when:"AUG 2024 – PRESENT",role:"B.Tech Computer Science",where:"CV Raman Global University, Bhubaneswar",body:"Studying DSA, OOP, DBMS, OS, and Computer Networks. Actively shipping projects alongside coursework and grinding competitive programming.",tech:["DSA","OOP","DBMS","OS"]},
];

const GithubIcon=()=>(<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>);
const LinkedinIcon=()=>(<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const MailIcon=()=>(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>);
const XIcon=()=>(<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const DiscordIcon=()=>(<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.1.128 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>);

function Cursor(){
  const curRef=useRef(null),ringRef=useRef(null),rx=useRef(0),ry=useRef(0),mx=useRef(0),my=useRef(0);
  useEffect(()=>{const move=(e)=>{mx.current=e.clientX;my.current=e.clientY;if(curRef.current){curRef.current.style.left=e.clientX+"px";curRef.current.style.top=e.clientY+"px";}};window.addEventListener("mousemove",move);const loop=()=>{rx.current+=(mx.current-rx.current)*0.12;ry.current+=(my.current-ry.current)*0.12;if(ringRef.current){ringRef.current.style.left=rx.current+"px";ringRef.current.style.top=ry.current+"px";}requestAnimationFrame(loop);};loop();return()=>window.removeEventListener("mousemove",move);},[]);
  useEffect(()=>{const over=()=>{curRef.current?.classList.add("hover");ringRef.current?.classList.add("hover");};const out=()=>{curRef.current?.classList.remove("hover");ringRef.current?.classList.remove("hover");};const els=document.querySelectorAll("a,button,.hoverable");els.forEach(el=>{el.addEventListener("mouseenter",over);el.addEventListener("mouseleave",out);});return()=>els.forEach(el=>{el.removeEventListener("mouseenter",over);el.removeEventListener("mouseleave",out);});});
  return(<><div ref={curRef} className="cursor"/><div ref={ringRef} className="cursor-ring"/></>);
}

function Typewriter(){
  const [text,setText]=useState("");const ri=useRef(0),ci=useRef(0),del=useRef(false);
  useEffect(()=>{let t;const tick=()=>{const cur=ROLES[ri.current];if(!del.current){setText(cur.slice(0,ci.current+1));ci.current++;if(ci.current===cur.length){del.current=true;t=setTimeout(tick,1900);return;}}else{setText(cur.slice(0,ci.current-1));ci.current--;if(ci.current===0){del.current=false;ri.current=(ri.current+1)%ROLES.length;}}t=setTimeout(tick,del.current?38:88);};t=setTimeout(tick,800);return()=>clearTimeout(t);},[]);
  return <span className="font-mono text-[var(--muted)] text-sm md:text-base">{text}<span className="tw-cursor"/></span>;
}

function useReveal(){
  const ref=useRef(null);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}},{threshold:0.1});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return ref;
}

function SkillBar({name,pct}){
  const ref=useRef(null);const [filled,setFilled]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setFilled(true);obs.unobserve(e.target);}},{threshold:0.2});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return(<div ref={ref} className="mb-4"><div className="flex justify-between mb-1"><span className="text-sm font-medium">{name}</span><span className="font-mono text-xs text-[var(--or)]">{pct}%</span></div><div className="h-[2px] bg-[var(--wire)] rounded-full overflow-hidden"><div className="skill-bar-fill h-full rounded-full bg-[var(--or)]" style={{width:filled?`${pct}%`:"0%"}}/></div></div>);
}

function Eyebrow({children}){return(<div className="flex items-center gap-3 mb-4"><div className="w-7 h-px bg-[var(--or)]"/><span className="font-mono text-[10px] text-[var(--or)] tracking-[4px] uppercase">{children}</span></div>);}
function Tag({children}){return <span className="font-mono text-[10px] px-[9px] py-1 border border-[var(--wire)] rounded-sm text-[var(--muted)]">{children}</span>;}

function Nav(){
  const links=["About","Skills","Projects","Experience","Leetcode","Contact"];
  return(<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[60px] bg-[rgba(13,13,15,0.85)] backdrop-blur-xl border-b border-[var(--wire)]"><div className="font-display text-2xl tracking-[3px]">AK<span className="text-[var(--or)]">.</span></div><div className="hidden md:flex gap-7">{links.map(s=>(<a key={s} href={`#${s.toLowerCase()}`} className="nav-link-hover font-mono text-[11px] text-[var(--muted)] hover:text-[var(--or)] no-underline tracking-[1px] transition-colors">{s}</a>))}</div><a href="#contact" className="font-mono text-xs bg-[var(--or)] text-white no-underline px-5 py-2 rounded-sm hover:opacity-90 transition-opacity">Get In Touch</a></nav>);
}

function Hero(){
  return(
    <section id="home" className="min-h-screen flex items-center justify-between gap-12 px-[5%] pt-20 pb-16 relative overflow-hidden">
      <div className="hero-grid-bg absolute inset-0 pointer-events-none"/>
      <div className="hero-orb absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(255,107,43,0.08) 0%,transparent 65%)",top:"50%",right:"-150px"}}/>
      <div className="flex-1 relative z-10 max-w-[600px]">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--or)] tracking-[1.5px] uppercase mb-7 fade-up" style={{animationDelay:"0.2s"}}><div className="status-dot"/> Open to work · 2025–26</div>
        <h1 className="font-display overflow-hidden mb-5" style={{fontSize:"clamp(72px,12vw,148px)",lineHeight:0.9,letterSpacing:"-1px"}}><span className="name-line">ABHISHEK</span><span className="name-line">KUMAR</span></h1>
        <div className="mb-6 h-7"><Typewriter/></div>
        <p className="text-[var(--muted)] text-base leading-[1.85] mb-9 max-w-[500px] fade-up" style={{animationDelay:"0.7s"}}><strong className="text-[var(--text)]">Full Stack + ML Engineer.</strong> Second-year CS at CV Raman Global University — passionate about backend systems, clean APIs, and building things that actually work in production.</p>
        <div className="flex gap-3 flex-wrap mb-14 fade-up" style={{animationDelay:"0.9s"}}>
          <a href="#projects" className="flex items-center gap-2 bg-[var(--or)] text-white no-underline px-7 py-3 rounded-sm text-sm font-bold hover:opacity-90 transition-all hover:-translate-y-0.5">View Work →</a>
          <a href="https://github.com/Abhis1905" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-[var(--wire2)] text-[var(--muted)] no-underline px-6 py-3 rounded-sm text-sm hover:border-[var(--or)] hover:text-[var(--or)] transition-all hover:-translate-y-0.5">↗ GitHub</a>
          <a href="https://leetcode.com/u/1905-abhishek/" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-[var(--wire2)] text-[var(--muted)] no-underline px-6 py-3 rounded-sm text-sm hover:border-[var(--or)] hover:text-[var(--or)] transition-all hover:-translate-y-0.5">↗ LeetCode</a>
        </div>
        <div className="flex gap-0 border-t border-[var(--wire)] pt-8 fade-up" style={{animationDelay:"1.1s"}}>
          {[["3","LIVE PROJECTS"],["98.5%","ML ACCURACY"],["51","DSA SOLVED"]].map(([n,l])=>(<div key={l} className="pr-9 mr-9 border-r border-[var(--wire)] last:border-0 last:mr-0 last:pr-0"><div className="font-display text-[36px] text-[var(--or)] leading-none tracking-[-1px]">{n}</div><div className="font-mono text-[10px] text-[var(--muted)] mt-0.5 tracking-[0.5px]">{l}</div></div>))}
        </div>
      </div>
      <div className="hidden md:block relative z-10 flex-shrink-0">
        <div className="relative w-[300px]">
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--or)]"/>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--or)]"/>
          <div className="w-[300px] h-[360px] rounded-xl overflow-hidden border border-[var(--wire)]">
            <img src={photo} alt="Abhishek Kumar" className="w-full h-full object-cover object-top" style={{filter:"grayscale(15%) contrast(1.05)"}}/>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] text-[var(--muted2)] tracking-[2px] fade-up" style={{animationDelay:"1.4s"}}><div className="scroll-line"/>SCROLL</div>
    </section>
  );
}

function Marquee(){
  const items=[...MARQUEE_ITEMS,...MARQUEE_ITEMS];
  return(<div className="border-t border-b border-[var(--wire)] py-3 overflow-hidden bg-[var(--ink2)]"><div className="flex marquee-track" style={{width:"max-content"}}>{items.map((t,i)=>(<React.Fragment key={i}><span className={`font-display text-[17px] tracking-[3px] px-6 whitespace-nowrap ${i%5===0?"text-[var(--or)]":"text-[var(--muted2)]"}`}>{t}</span><span className="font-display text-[17px] px-2 text-[var(--muted2)] opacity-40">·</span></React.Fragment>))}</div></div>);
}

function About(){
  const ref=useReveal();
  const facts=[
    {icon:"🎓",title:"CV Raman Global University",sub:"B.Tech CS · Bhubaneswar, Odisha"},
    {icon:"⚙️",title:"Backend Engineer",sub:"Java · Spring Boot · REST APIs · PostgreSQL"},
    {icon:"🧠",title:"ML & Full Stack",sub:"Python · Flask · React · scikit-learn · Cloud"},
    {icon:"⚔️",title:"DSA Grinder",sub:"51 solved · 17 Hard · Codeforces 593"},
    {icon:"🔓",title:"Open Source",sub:"CardioScan · MIT License · Production deployed"},
    {icon:"📖",title:"General Secretary",sub:"Literary Society · CV Raman Global University"},
  ];
  return(
    <section id="about" className="py-24 px-[5%] bg-[var(--ink2)]">
      <Eyebrow>About</Eyebrow>
      <h2 className="font-display mb-4" style={{fontSize:"clamp(42px,6vw,76px)",letterSpacing:"-1px"}}>Who I Am</h2>
      <div ref={ref} className="reveal grid md:grid-cols-2 gap-16 mt-14 items-center">
        <div>
          <p className="text-[var(--muted)] text-lg leading-[1.95] mb-5">I'm <strong className="text-[var(--text)] text-xl">Abhishek Kumar</strong>, a second-year CS student at CV Raman Global University with a genuine interest in backend engineering and building things that work at scale.</p>
          <p className="text-[var(--muted)] text-base leading-[1.9] mb-5">I enjoy working on <strong className="text-[var(--text)]">backend systems, REST APIs, and data-driven applications</strong>. I've built and deployed full-stack projects including an ML-powered web app and a natural language application generator in <strong className="text-[var(--text)]">Java + Spring Boot</strong>.</p>
          <p className="text-[var(--muted)] text-base leading-[1.9] mb-8">Outside of code, I serve as <strong className="text-[var(--text)]">General Secretary of the Literary Society</strong>, which has helped me grow as a communicator and team leader. I'm actively grinding DSA and looking to contribute to impactful engineering teams.</p>
          <div className="flex flex-wrap gap-2">
            {["Backend Engineering","REST APIs","Java + Spring Boot","Machine Learning","DSA","Open Source","Cloud Deployment"].map(c=>(<span key={c} className="hoverable font-mono text-[11px] px-3 py-1.5 border border-[var(--wire)] rounded-sm text-[var(--muted)] hover:border-[var(--or)] hover:text-[var(--or)] transition-all cursor-default">{c}</span>))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {facts.map((f,i)=>(<div key={i} className="about-fact-card group bg-[var(--ink3)] border border-[var(--wire)] rounded-xl p-5 hover:border-[var(--or)] hover:-translate-y-1 transition-all duration-300"><div className="text-2xl mb-3">{f.icon}</div><div className="text-sm font-semibold text-[var(--text)] mb-1 leading-snug">{f.title}</div><div className="font-mono text-[10px] text-[var(--muted)] leading-relaxed">{f.sub}</div></div>))}
        </div>
      </div>
    </section>
  );
}

function Skills(){
  const ref=useReveal();
  return(
    <section id="skills" className="py-24 px-[5%]">
      <Eyebrow>Skills</Eyebrow>
      <h2 className="font-display mb-4" style={{fontSize:"clamp(42px,6vw,76px)",letterSpacing:"-1px"}}>Tech Stack</h2>
      <div ref={ref} className="reveal grid md:grid-cols-2 gap-10 mt-14">
        {Object.entries(SKILLS).map(([group,skills])=>(<div key={group}><div className="font-mono text-[11px] text-[var(--or)] tracking-[2px] uppercase mb-6">{`// ${group}`}</div>{skills.map(s=><SkillBar key={s.name} {...s}/>)}</div>))}
        <div className="md:col-span-2 flex flex-wrap gap-2 pt-7 border-t border-[var(--wire)]">
          {TAGS.map(t=>(<span key={t} className="hoverable font-mono text-[11px] px-3 py-1.5 border border-[var(--wire)] rounded-sm text-[var(--muted)] hover:border-[var(--or)] hover:text-[var(--or)] transition-all cursor-default">{t}</span>))}
        </div>
      </div>
    </section>
  );
}

function Projects(){
  const ref=useReveal();
  return(
    <section id="projects" className="py-24 px-[5%] bg-[var(--ink2)]">
      <Eyebrow>Projects</Eyebrow>
      <h2 className="font-display mb-4" style={{fontSize:"clamp(42px,6vw,76px)",letterSpacing:"-1px"}}>Things I've Built</h2>
      <div ref={ref} className="reveal grid md:grid-cols-[55%_45%] border border-[var(--wire)] rounded-xl overflow-hidden mt-14 hover:border-[rgba(255,107,43,0.3)] transition-colors group relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--or)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
        <div className="p-11 bg-[var(--ink3)]">
          <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--or)] tracking-[2px] uppercase mb-4">01 · Featured <span className="mit-badge">MIT LICENSE</span></div>
          <div className="font-display mb-2.5" style={{fontSize:"clamp(30px,4vw,50px)",letterSpacing:"-1px"}}>CardioScan</div>
          <p className="text-[var(--muted)] text-sm leading-[1.8] mb-5">AI-powered heart disease prediction. 13 clinical features, ensemble of 3 ML models, risk score in under 2 seconds — with SHAP explainability and a Llama 3.3 70B chatbot.</p>
          <div className="flex flex-wrap gap-2 mb-5">{["98.54% Accuracy","<2s Prediction","3 ML Models","8 Languages","AUC-ROC 0.99"].map(m=>(<span key={m} className="font-mono text-[11px] text-[var(--or)] bg-[rgba(255,107,43,0.06)] border border-[rgba(255,107,43,0.15)] rounded-sm px-2.5 py-1">{m}</span>))}</div>
          <div className="flex flex-wrap gap-1.5 mb-6">{["React 18","Flask","scikit-learn","SHAP","PostgreSQL","Framer Motion","Groq/Llama 3.3","Railway","Vercel","JWT"].map(t=><Tag key={t}>{t}</Tag>)}</div>
          <div className="flex gap-4">
            <a href="https://cardio-scan-lac.vercel.app/" target="_blank" rel="noreferrer" className="font-mono text-xs text-[var(--muted)] no-underline hover:text-[var(--or)] transition-colors">↗ Live Demo</a>
            <a href="https://github.com/Abhis1905/CardioScan" target="_blank" rel="noreferrer" className="font-mono text-xs text-[var(--muted)] no-underline hover:text-[var(--or)] transition-colors">○ GitHub</a>
          </div>
        </div>
        <div className="hidden md:flex flex-col bg-[var(--ink)] border-l border-[var(--wire)] font-mono text-[11px]">
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--ink3)] border-b border-[var(--wire)]"><div className="w-2 h-2 rounded-full bg-[#FF5F57]"/><div className="w-2 h-2 rounded-full bg-[#FFBD2E]"/><div className="w-2 h-2 rounded-full bg-[#28CA41]"/><span className="ml-2 text-[9px] text-[var(--muted)]">cardio-scan-lac.vercel.app</span></div>
          <div className="flex-1 p-5 flex flex-col gap-[5px] overflow-hidden">{[["d","// CardioScan · ML Engine v2.1"],["d","// Ensemble: RF + LR + KNN"],["",""],["c","POST /api/v1/predict"],["d","Authorization: Bearer <jwt>"],["",""],["d","{ age:54, cp:2, chol:256,"],["d","  trestbps:130, thal:2 ... }"],["",""],["d","RandomForest  → HIGH ✓"],["d","LogisticReg   → HIGH ✓"],["d","KNN           → HIGH ✓"],["",""],["g","200 OK · 87ms"],["g","{ prediction: 'HIGH_RISK',"],["g","  confidence: 98.54% }"]].map(([type,line],i)=>(<div key={i} className={`leading-[1.65] ${type==="g"?"text-green-400":type==="c"?"text-blue-400":type==="d"?"text-[var(--muted2)]":"text-[var(--text)]"}`}>{line||"\u00a0"}</div>))}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {[{num:"02",title:"NaturalApp Builder",wip:true,desc:"Natural language → full web application. Describe what you want, get a working app. Java + Spring Boot backend with prompt pipelines and versioning.",tech:["Java","Spring Boot","REST APIs","PostgreSQL"],link:null},{num:"03",title:"Smart Agri Dashboard",wip:false,desc:"Real-time farming intelligence — weather alerts, crop health monitoring, commodity price feeds, and government scheme data.",tech:["React","Python","APIs","Netlify"],link:"https://agriaii.netlify.app/"}].map(p=>(<div key={p.num} className="proj-card-border relative bg-[var(--ink3)] border border-[var(--wire)] rounded-xl p-7 flex flex-col hover:border-[rgba(255,107,43,0.2)] hover:-translate-y-1 transition-all overflow-hidden"><div className="font-mono text-[10px] text-[var(--muted2)] mb-3.5">{p.num}</div>{p.wip&&<div className="wip-badge mb-2.5">● In Progress</div>}<div className="font-display text-2xl tracking-[-0.5px] mb-2 leading-snug">{p.title}</div><p className="text-[var(--muted)] text-[13px] leading-[1.75] flex-1 mb-4">{p.desc}</p><div className="flex flex-wrap gap-1.5 mb-4">{p.tech.map(t=><Tag key={t}>{t}</Tag>)}</div>{p.link&&<a href={p.link} target="_blank" rel="noreferrer" className="font-mono text-xs text-[var(--muted)] no-underline hover:text-[var(--or)] transition-colors">↗ Live</a>}</div>))}
      </div>
    </section>
  );
}

function Experience(){
  const sectionRef=useRef(null),lineRef=useRef(null),itemRefs=useRef([]);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){lineRef.current?.classList.add("line-draw");obs.unobserve(e.target);}},{threshold:0.05});
    if(sectionRef.current)obs.observe(sectionRef.current);
    const itemObs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("exp-item-visible");itemObs.unobserve(e.target);}});},{threshold:0.1});
    itemRefs.current.forEach(el=>{if(el)itemObs.observe(el);});
    return()=>{obs.disconnect();itemObs.disconnect();};
  },[]);
  return(
    <section id="experience" className="py-24 px-[5%]" ref={sectionRef}>
      <Eyebrow>Background</Eyebrow>
      <h2 className="font-display mb-2" style={{fontSize:"clamp(42px,6vw,76px)",letterSpacing:"-1px"}}>The Journey</h2>
      <p className="text-[var(--muted)] text-base mb-14 max-w-md">Every project, every role — building towards something bigger.</p>
      <div className="relative pl-10 mt-4">
        <div ref={lineRef} className="timeline-line absolute left-0 top-2 w-px" style={{bottom:0}}/>
        {EXP.map((e,i)=>(<div key={i} ref={el=>itemRefs.current[i]=el} className="exp-item relative pb-16 last:pb-0"><div className="absolute" style={{left:"-38px",top:"4px"}}><div className="exp-dot w-[11px] h-[11px] rounded-full bg-[var(--or)]"/></div><div className="font-mono text-[11px] text-[var(--or)] mb-2 tracking-[0.5px]">{e.when}</div><div className="font-display leading-none mb-1" style={{fontSize:"clamp(26px,3.5vw,44px)",letterSpacing:"-1px"}}>{e.role}</div><div className="text-sm text-[var(--muted)] mb-4 font-mono">{e.where}</div><div className="bg-[var(--ink2)] border border-[var(--wire)] rounded-lg p-5 mb-4 max-w-[640px]"><p className="text-[15px] text-[var(--muted)] leading-[1.85]">{e.body}</p></div><div className="flex flex-wrap gap-1.5">{e.tech.map(t=><Tag key={t}>{t}</Tag>)}</div></div>))}
      </div>
    </section>
  );
}

function LeetCode(){
  const ref=useReveal();const [imgError,setImgError]=useState(false);
  return(
    <section id="leetcode" className="py-24 px-[5%] bg-[var(--ink2)]">
      <Eyebrow>Coding</Eyebrow>
      <h2 className="font-display mb-4" style={{fontSize:"clamp(42px,6vw,76px)",letterSpacing:"-1px"}}>LeetCode Profile</h2>
      <div ref={ref} className="reveal mt-14 bg-[var(--ink3)] border border-[var(--wire)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--wire)]">
          <div className="font-display text-2xl tracking-[-1px]">▲ <span className="text-[var(--or)]">LeetCode</span> · 1905-abhishek</div>
          <a href="https://leetcode.com/u/1905-abhishek/" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-[var(--or)] no-underline border border-[rgba(255,107,43,0.3)] px-4 py-1.5 rounded-sm hover:bg-[rgba(255,107,43,0.08)] transition-colors">View Full Profile ↗</a>
        </div>
        <div className="p-8 flex flex-col items-center gap-5">
          {!imgError?(<img src="https://leetcard.jacoblin.cool/1905-abhishek?theme=dark&font=DM%20Mono&ext=heatmap" alt="LeetCode Stats" className="w-full max-w-[500px] rounded-lg" onError={()=>setImgError(true)}/>):(<div className="w-full max-w-[500px] bg-[var(--ink4)] rounded-lg p-8 text-center"><div className="font-display text-xl text-[var(--or)] mb-2">1905-abhishek</div><div className="font-mono text-xs text-[var(--muted)] mb-4">Easy: 8 · Medium: 26 · Hard: 17</div><a href="https://leetcode.com/u/1905-abhishek/" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-[var(--or)] no-underline border border-[rgba(255,107,43,0.3)] px-4 py-2 rounded-sm">View on LeetCode ↗</a></div>)}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--muted)]"><div className="lc-live-dot"/> Updates automatically when you solve a problem</div>
        </div>
        <div className="grid grid-cols-3 gap-px bg-[var(--wire)] border-t border-[var(--wire)]">
          {[["8","EASY","#4ADE80"],["26","MEDIUM","#FBBF24"],["17","HARD","#F87171"]].map(([n,l,c])=>(<div key={l} className="bg-[var(--ink3)] py-5 text-center"><div className="font-display text-[36px] leading-none tracking-[-1px]" style={{color:c}}>{n}</div><div className="font-mono text-[10px] mt-1" style={{color:c}}>{l}</div></div>))}
        </div>
      </div>
    </section>
  );
}

function Certifications(){
  const ref=useReveal();
  return(
    <section id="certifications" className="py-24 px-[5%]">
      <Eyebrow>Certifications</Eyebrow>
      <h2 className="font-display mb-4" style={{fontSize:"clamp(42px,6vw,76px)",letterSpacing:"-1px"}}>What I've Learned</h2>
      <div ref={ref} className="reveal grid md:grid-cols-2 gap-4 mt-14">
        <div className="bg-[var(--ink3)] border border-[var(--wire)] rounded-xl overflow-hidden hover:border-[rgba(255,107,43,0.3)] hover:-translate-y-1 transition-all"><div className="h-[3px] bg-gradient-to-r from-purple-500 to-violet-400"/><div className="p-7"><div className="flex items-center justify-between mb-4"><div className="font-mono text-[10px] tracking-[2px] text-purple-400 uppercase">UDEMY</div><div className="font-mono text-[10px] text-[var(--muted)]">Sept 16, 2025</div></div><div className="font-display text-2xl leading-snug tracking-[-0.5px] mb-2">The Complete Full-Stack Web Development Bootcamp</div><div className="text-sm text-[var(--muted)] mb-5">Dr. Angela Yu · 61.5 total hours</div><div className="flex flex-wrap gap-1.5 mb-5">{["HTML/CSS","JavaScript","React","Node.js","MongoDB","REST APIs"].map(t=><Tag key={t}>{t}</Tag>)}</div><a href="https://ude.my/UC-6fada862-6d09-40ca-91e8-d3fa5eea2c49" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-[var(--or)] no-underline border border-[rgba(255,107,43,0.3)] px-3.5 py-1.5 rounded-sm hover:bg-[rgba(255,107,43,0.08)] transition-colors inline-flex">View Certificate ↗</a></div></div>
        <div className="bg-[var(--ink3)] border border-[var(--wire)] rounded-xl flex items-center justify-center min-h-[180px] flex-col gap-3" style={{borderStyle:"dashed"}}><div className="text-3xl opacity-20">+</div><div className="font-mono text-[11px] text-[var(--muted2)] tracking-[1px]">MORE COMING SOON</div></div>
      </div>
    </section>
  );
}

function Contact(){
  const ref=useReveal();const [status,setStatus]=useState("idle");
  const handleSubmit=async(e)=>{
    e.preventDefault();setStatus("sending");
    try{
      const res=await fetch("https://api.web3forms.com/submit",{method:"POST",body:new FormData(e.target),headers:{Accept:"application/json"}});
      if(res.ok){setStatus("sent");e.target.reset();}else throw new Error();
    }catch{setStatus("error");}
  };
  return(
    <section id="contact" className="py-24 px-[5%] bg-[var(--ink2)]">
      <Eyebrow>Contact</Eyebrow>
      <div ref={ref} className="reveal grid md:grid-cols-2 gap-20 mt-14 items-start">
        <div>
          <div className="font-display mb-4" style={{fontSize:"clamp(40px,5vw,68px)",letterSpacing:"-2px",lineHeight:1.05}}>Say<br/>Hello<span className="text-[var(--or)]">.</span></div>
          <p className="text-[15px] text-[var(--muted)] leading-[1.8] mb-10">Whether you want to collaborate, talk tech, have an opportunity, or just say hi — my inbox is always open.</p>
          <div className="flex flex-col gap-3">
            {[{href:"mailto:abhishekjha1905@gmail.com",icon:<MailIcon/>,label:"Email",val:"abhishekjha1905@gmail.com"},{href:"https://github.com/Abhis1905",icon:<GithubIcon/>,label:"GitHub",val:"github.com/Abhis1905"},{href:"https://www.linkedin.com/in/1905-abhishek/",icon:<LinkedinIcon/>,label:"LinkedIn",val:"linkedin.com/in/1905-abhishek"},{href:"https://x.com/AbhishekJ_19",icon:<XIcon/>,label:"Twitter / X",val:"@AbhishekJ_19"},{href:"https://discord.com/users/19abhi",icon:<DiscordIcon/>,label:"Discord",val:"19abhi"}].map(({href,icon,label,val})=>(<a key={label} href={href} target={href.startsWith("mailto")?"_self":"_blank"} rel="noreferrer" className="contact-link flex items-center gap-4 px-5 py-3.5 bg-[var(--ink3)] border border-[var(--wire)] rounded-md no-underline"><div className="w-9 h-9 rounded-sm bg-[rgba(255,107,43,0.08)] border border-[rgba(255,107,43,0.15)] flex items-center justify-center text-[var(--or)] flex-shrink-0">{icon}</div><div><div className="text-sm font-semibold text-[var(--text)]">{label}</div><div className="font-mono text-[11px] text-[var(--muted)]">{val}</div></div></a>))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <input type="hidden" name="access_key" value="46df17fe-1833-4379-9114-b05dc0018d8b"/>
          <input type="hidden" name="subject" value="New message from portfolio"/>
          <div className="grid grid-cols-2 gap-3.5">
            <div><label className="font-mono text-[10px] text-[var(--muted)] tracking-[1.5px] uppercase block mb-1.5">Name</label><input name="name" required className="w-full bg-[var(--ink3)] border border-[var(--wire)] rounded-sm px-3.5 py-3 text-[var(--text)] text-sm font-[inherit] outline-none focus:border-[var(--or)] transition-colors placeholder:text-[var(--muted2)]" placeholder="Your name"/></div>
            <div><label className="font-mono text-[10px] text-[var(--muted)] tracking-[1.5px] uppercase block mb-1.5">Subject</label><input name="subject" className="w-full bg-[var(--ink3)] border border-[var(--wire)] rounded-sm px-3.5 py-3 text-[var(--text)] text-sm font-[inherit] outline-none focus:border-[var(--or)] transition-colors placeholder:text-[var(--muted2)]" placeholder="Collab, opportunity, hi..."/></div>
          </div>
          <div><label className="font-mono text-[10px] text-[var(--muted)] tracking-[1.5px] uppercase block mb-1.5">Email</label><input name="email" type="email" required className="w-full bg-[var(--ink3)] border border-[var(--wire)] rounded-sm px-3.5 py-3 text-[var(--text)] text-sm font-[inherit] outline-none focus:border-[var(--or)] transition-colors placeholder:text-[var(--muted2)]" placeholder="your@email.com"/></div>
          <div><label className="font-mono text-[10px] text-[var(--muted)] tracking-[1.5px] uppercase block mb-1.5">Message</label><textarea name="message" required rows={4} className="w-full bg-[var(--ink3)] border border-[var(--wire)] rounded-sm px-3.5 py-3 text-[var(--text)] text-sm font-[inherit] outline-none focus:border-[var(--or)] transition-colors resize-none placeholder:text-[var(--muted2)]" placeholder="What's on your mind?"/></div>
          <button type="submit" disabled={status==="sent"} className="flex items-center justify-center gap-2 bg-[var(--or)] text-white py-3.5 rounded-sm text-[15px] font-bold hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-60">{status==="idle"&&"Send Message →"}{status==="sending"&&"Sending..."}{status==="sent"&&"Message Sent ✓"}{status==="error"&&"Failed — try email directly"}</button>
        </form>
      </div>
    </section>
  );
}

function Footer(){
  return(
    <footer className="px-[5%] py-7 border-t border-[var(--wire)] flex items-center justify-between">
      <div className="font-display text-xl tracking-[2px]">AK<span className="text-[var(--or)]">.</span></div>
      <div className="font-mono text-[10px] text-[var(--muted)]">© 2026 Abhishek Kumar</div>
      <div className="flex gap-2.5">
        {[{href:"https://github.com/Abhis1905",icon:<GithubIcon/>,label:"GitHub"},{href:"https://www.linkedin.com/in/1905-abhishek/",icon:<LinkedinIcon/>,label:"LinkedIn"},{href:"mailto:abhishekjha1905@gmail.com",icon:<MailIcon/>,label:"Email"}].map(({href,icon,label})=>(<a key={label} href={href} target={href.startsWith("mailto")?"_self":"_blank"} rel="noreferrer" aria-label={label} className="w-9 h-9 border border-[var(--wire)] rounded-sm flex items-center justify-center text-[var(--muted)] no-underline hover:border-[var(--or)] hover:text-[var(--or)] transition-colors">{icon}</a>))}
      </div>
    </footer>
  );
}

export default function App(){
  return(<><Cursor/><Nav/><main><Hero/><Marquee/><About/><Skills/><Projects/><Experience/><LeetCode/><Certifications/><Contact/></main><Footer/></>);
}
