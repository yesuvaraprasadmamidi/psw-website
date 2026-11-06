import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight, Github, Mail, Menu, MessageCircle, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const EMAIL = "prasadmamidivlogs@gmail.com";
const WA = "919398334458";
const GH = "https://github.com/yesuvaraprasadmamidi";

const NAV = [["about", "About"], ["services", "Services"], ["projects", "Work"], ["process", "Process"], ["pricing", "Pricing"], ["why", "Why PWS"], ["contact", "Contact"]];
const SERVICES = [
  ["Website Development", "Fast, responsive sites coded from scratch."],
  ["UI/UX Design", "Interfaces shaped for clarity and feel."],
  ["Domain & Hosting Setup", "Your name online, live and secure."],
  ["AI Integration", "Smart features wired into your product."],
  ["Website Maintenance", "Updates and fixes after launch."],
  ["Custom Web Applications", "Tools built around your workflow."],
];
// Edit this list as real projects ship.
const PROJECTS = [
  ["PWS Studio Website", "React, TypeScript, GSAP, Tailwind. The site you are on.", GH],
  ["Your project", "Slot open. Tell me what you need.", "#contact"],
  ["Your project", "Slot open. Tell me what you need.", "#contact"],
];
const STEPS = [
  ["Discover", "Goals, audience and scope agreed before a single pixel moves."],
  ["Design", "Visual direction and UI/UX shaped around your brand."],
  ["Develop", "Clean, fast, mobile-first code with purposeful motion."],
  ["Launch and grow", "Domain, hosting, go-live, then care as you grow."],
];
const PRICES = [
  ["Starter Website", "₹2,999", "A sharp, focused web presence."],
  ["Business Website", "₹4,999", "A complete site for a growing business."],
  ["Premium Website", "₹7,999", "Cinematic, animated, fully custom."],
  ["Custom Web Applications", "₹12,999+", "Scoped around your requirements."],
];
const WHY = [
  ["Mobile-first", "Designed for the phone in your customer's hand first."],
  ["A direct line", "You talk to the person who builds your site."],
  ["Built light", "Lean code and optimised assets for fast loads."],
  ["Launch-ready", "Domain, hosting and SEO basics handled."],
];
const ABOUT =
  "Prasad Web Solutions is an independent web studio founded by Yesu Vara Prasad Mamidi, crafting websites, interfaces and AI-powered web apps with cinematic design and clean, fast code.";

const H2 = "text-[clamp(2.6rem,9vw,8rem)] font-extrabold leading-[.92] tracking-tighter";

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const cnt = useRef<HTMLSpanElement>(null);
  const cur = useRef<HTMLDivElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const [loaded, setLoaded] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [menu, setMenu] = useState(false);

  const go = (id: string) => {
    setMenu(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis.current) lenis.current.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!loaded) return;
    if (menu) lenis.current?.stop();
    else lenis.current?.start();
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu, loaded]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const fine = window.matchMedia("(pointer: fine)").matches;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const off: Array<() => void> = [];
      const l = new Lenis({ lerp: 0.1 });
      lenis.current = l;
      l.stop();
      l.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => l.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      off.push(() => { gsap.ticker.remove(tick); l.destroy(); lenis.current = null; });

      // Preloader, then hero reveal: the one orchestrated moment
      const c = { n: 0 };
      gsap
        .timeline({ onComplete: () => { setLoaded(true); l.start(); } })
        .to(c, { n: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => { if (cnt.current) cnt.current.textContent = String(Math.round(c.n)).padStart(3, "0"); } })
        .to(".pl", { opacity: 0, duration: 0.3 })
        .to(".pre", { yPercent: -100, duration: 1, ease: "expo.inOut" })
        .from(".hl > span", { yPercent: 115, duration: 1.3, stagger: 0.12, ease: "expo.out" }, "-=0.35")
        .from(".hf", { opacity: 0, y: 24, duration: 1, stagger: 0.12, ease: "power3.out" }, "-=0.9");

      // Pinned horizontal story (created first so later triggers measure correctly)
      const track = document.querySelector<HTMLElement>(".track");
      if (track) {
        const dist = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: "#process", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
      }

      gsap.to(".glow", { yPercent: 40, scale: 1.4, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hin", { yPercent: -12, opacity: 0, ease: "none", scrollTrigger: { trigger: "#hero", start: "25% top", end: "bottom top", scrub: true } });
      gsap.to(".mq", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      gsap.to(".bar", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 } });
      gsap.fromTo(".aw", { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: "#about", start: "top 70%", end: "center 40%", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-ln]", root.current).forEach((el) =>
        gsap.from(el.querySelectorAll(".ln > span"), { yPercent: 115, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } })
      );
      gsap.utils.toArray<HTMLElement>("[data-r]", root.current).forEach((el) =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } })
      );
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      if (fine && cur.current) {
        const el = cur.current;
        const xt = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
        const yt = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
        const mv = (e: PointerEvent) => { el.style.opacity = "1"; xt(e.clientX); yt(e.clientY); };
        const ov = (e: PointerEvent) => {
          const hot = e.target instanceof Element && e.target.closest("a,button,input,textarea,[data-h]");
          gsap.to(el, { scale: hot ? 2.2 : 1, backgroundColor: hot ? "rgba(22,139,255,.25)" : "rgba(22,139,255,0)", duration: 0.3 });
        };
        window.addEventListener("pointermove", mv);
        window.addEventListener("pointerover", ov);
        document.body.classList.add("cur");
        off.push(() => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerover", ov); document.body.classList.remove("cur"); });

        gsap.utils.toArray<HTMLElement>("[data-mag]", root.current).forEach((m) => {
          const move = (e: PointerEvent) => {
            const r = m.getBoundingClientRect();
            gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power3" });
          };
          const leave = () => gsap.to(m, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.4)" });
          m.addEventListener("pointermove", move);
          m.addEventListener("pointerleave", leave);
          off.push(() => { m.removeEventListener("pointermove", move); m.removeEventListener("pointerleave", leave); });
        });
      }
      return () => off.forEach((f) => f());
    }, root);

    return () => mm.revert();
  }, []);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Hi PWS, I'm ${f.get("n")}. ${f.get("m")}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  const field = "w-full border-b border-white/25 bg-transparent py-4 text-xl outline-none transition-colors placeholder:text-white/35 focus:border-[#168BFF]";

  return (
    <div ref={root}>
      {!loaded && (
        <div className="pre fixed inset-0 z-[100] flex items-end justify-between bg-[#050505] p-6 md:p-12">
          <div className="pl text-sm text-white/60">Prasad Web Solutions</div>
          <span ref={cnt} className="pl silver text-[24vw] font-extrabold leading-none md:text-[14vw]">000</span>
        </div>
      )}
      <div className="bar fixed left-0 top-0 z-[85] h-[2px] w-full origin-left scale-x-0 bg-[#168BFF]" />
      <div ref={cur} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 hidden h-10 w-10 rounded-full border border-white/70 opacity-0 [@media(pointer:fine)]:block" />

      <header className="fixed inset-x-0 top-0 z-[75] flex items-center justify-between bg-[#050505]/55 px-5 py-4 backdrop-blur-md md:px-10">
        <button onClick={() => go("hero")} className="text-xl font-extrabold tracking-tight" aria-label="PWS home">PWS<span className="text-[#168BFF]">.</span></button>
        <nav className="hidden gap-7 text-sm text-white/75 lg:flex">
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#168BFF] after:transition-transform hover:after:scale-x-100">{label}</button>
          ))}
        </nav>
        <button className="lg:hidden" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X /> : <Menu />}</button>
      </header>
      <div className={`fixed inset-0 z-[70] flex flex-col justify-center gap-3 bg-[#050505] px-6 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:hidden ${menu ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"}`}>
        {NAV.map(([id, label]) => (
          <button key={id} onClick={() => go(id)} className="text-left text-5xl font-extrabold tracking-tighter active:text-[#168BFF]">{label}</button>
        ))}
      </div>

      <main>
        <section id="hero" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-28 md:px-10">
          <div className="glow pointer-events-none absolute left-1/2 top-1/3 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#168BFF55,transparent_65%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(#ffffff0f_1px,transparent_1px),linear-gradient(90deg,#ffffff0f_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_72%)]" />
          <div className="hin relative">
            <p className="hf mb-6 text-sm tracking-[.3em] text-[#168BFF]">BUILD • DESIGN • GROW</p>
            <h1 className="text-[clamp(3.4rem,15vw,13.5rem)] font-extrabold leading-[.88] tracking-tighter">
              <span className="hl ln"><span className="silver">Websites</span></span>
              <span className="hl ln"><span>that feel</span></span>
              <span className="hl ln"><span className="text-[#168BFF]">cinematic.</span></span>
            </h1>
          </div>
          <div className="hin relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="hf max-w-sm text-lg text-white/60">Prasad Web Solutions is an independent studio building premium websites and web apps.</p>
            <button data-mag onClick={() => go("contact")} className="hf flex w-fit items-center gap-3 rounded-full bg-[#168BFF] px-8 py-4 font-semibold">Start a project <ArrowUpRight size={20} /></button>
          </div>
          <div className="relative -mx-5 mt-10 overflow-hidden border-y border-white/10 py-3 md:-mx-10">
            <div className="mq flex w-max whitespace-nowrap text-sm text-white/50">
              {[0, 1].map((k) => SERVICES.map((s) => <span key={`${k}${s[0]}`} className="pr-10">{s[0]} <span className="text-[#168BFF]">✦</span></span>))}
            </div>
          </div>
        </section>

        <section id="about" className="px-5 py-40 md:px-10">
          <p className="max-w-6xl text-[clamp(1.7rem,4.6vw,4rem)] font-medium leading-[1.1] tracking-tight">
            {ABOUT.split(" ").map((w, i) => <span key={i} className="aw mr-[.28em] inline-block">{w}</span>)}
          </p>
          <p data-r className="mt-12 text-white/60">Yesu Vara Prasad Mamidi, Founder & Independent Web Developer</p>
        </section>

        <section id="services" className="px-5 py-32 md:px-10">
          <h2 data-ln className={`mb-16 ${H2}`}><span className="ln"><span>What PWS</span></span><span className="ln"><span className="silver">builds.</span></span></h2>
          {SERVICES.map(([t, d]) => (
            <div key={t} data-r className="group relative overflow-hidden border-t border-white/15 last:border-b">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#168BFF] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100" />
              <div className="relative flex flex-col gap-2 px-1 py-7 md:flex-row md:items-center md:gap-10 md:px-6 md:py-9">
                <h3 className="flex-1 text-[clamp(1.8rem,5vw,4rem)] font-bold tracking-tight">{t}</h3>
                <p className="max-w-xs text-white/60 transition-colors group-hover:text-white">{d}</p>
                <ArrowUpRight size={40} className="hidden transition-transform duration-500 group-hover:rotate-45 md:block" />
              </div>
            </div>
          ))}
        </section>

        <section id="projects" className="px-5 py-32 md:px-10">
          <h2 data-ln className={`mb-16 ${H2}`}><span className="ln"><span>Selected</span></span><span className="ln"><span className="silver">work.</span></span></h2>
          {PROJECTS.map(([t, d, href], i) => (
            <a key={i} data-r href={href} {...(href.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              onClick={(e) => { if (href.startsWith("#")) { e.preventDefault(); go(href.slice(1)); } }}
              className="group flex items-end justify-between gap-6 border-t border-white/15 py-8 last:border-b md:py-12">
              <div>
                <h3 className="text-[clamp(2.1rem,8vw,7rem)] font-extrabold leading-none tracking-tighter transition-all duration-500 group-hover:translate-x-4 group-hover:text-[#168BFF]">{t}</h3>
                <p className="mt-3 text-white/55">{d}</p>
              </div>
              <ArrowUpRight size={44} className="shrink-0 text-[#168BFF] transition-transform duration-500 group-hover:rotate-45" />
            </a>
          ))}
        </section>

        <section id="process" className="relative h-[100svh] overflow-hidden">
          <div className="track flex h-full w-max">
            <div className="pn flex h-full w-screen shrink-0 flex-col justify-center px-5 md:px-10">
              <h2 className="text-[clamp(3rem,12vw,11rem)] font-extrabold leading-[.9] tracking-tighter">Four steps.<br /><span className="silver">One flow.</span></h2>
              <p className="mt-8 text-white/50">Keep scrolling. It moves sideways.</p>
            </div>
            {STEPS.map(([t, d], i) => (
              <div key={t} className="pn relative flex h-full w-screen shrink-0 flex-col justify-center border-l border-white/10 px-5 md:px-16">
                <span className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 text-[55vw] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_#168BFF66] md:text-[38vw]">{i + 1}</span>
                <h3 className="relative text-[clamp(2.8rem,10vw,9rem)] font-extrabold tracking-tighter">{t}</h3>
                <p className="relative mt-6 max-w-md text-lg text-white/65">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="px-5 py-32 md:px-10">
          <h2 data-ln className={`mb-16 ${H2}`}><span className="ln"><span className="silver">Pricing.</span></span></h2>
          {PRICES.map(([t, p, d]) => (
            <a key={t} data-r href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }} className="group flex flex-col gap-3 border-t border-white/15 py-8 last:border-b md:flex-row md:items-center md:justify-between md:py-10">
              <div>
                <h3 className="text-2xl font-bold tracking-tight md:text-4xl">{t}</h3>
                <p className="mt-2 text-white/55">{d}</p>
              </div>
              <span className="text-[clamp(2.6rem,8vw,6rem)] font-extrabold leading-none tracking-tighter transition-colors duration-300 group-hover:text-[#168BFF]">{p}</span>
            </a>
          ))}
          <p className="mt-6 text-sm text-white/40">All prices in Indian rupees.</p>
        </section>

        <section id="why" className="px-5 py-32 md:px-10">
          <div className="grid gap-16 md:grid-cols-2">
            <h2 data-ln className={`md:sticky md:top-32 md:self-start ${H2}`}><span className="ln"><span>Why</span></span><span className="ln"><span className="silver">PWS.</span></span></h2>
            <div>
              {WHY.map(([t, d]) => (
                <div key={t} data-r className="border-t border-white/15 py-8">
                  <h3 className="text-3xl font-bold tracking-tight md:text-5xl">{t}</h3>
                  <p className="mt-3 max-w-md text-white/60">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-24 pt-32 md:px-10">
          <h2 data-ln className={H2}><span className="ln"><span>Let's build</span></span><span className="ln"><span className="text-[#168BFF]">yours.</span></span></h2>
          <div className="mt-16 grid gap-14 md:grid-cols-2">
            <form onSubmit={send} className="space-y-6">
              <input name="n" required placeholder="Your name" className={field} />
              <textarea name="m" required rows={3} placeholder="Tell me about your project" className={field} />
              <button data-mag type="submit" className="flex items-center gap-3 rounded-full bg-[#168BFF] px-8 py-4 font-semibold">Send on WhatsApp <ArrowUpRight size={20} /></button>
            </form>
            <div className="space-y-6 text-xl md:text-2xl">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 break-all transition-colors hover:text-[#168BFF]"><Mail className="shrink-0" /> {EMAIL}</a>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-[#168BFF]"><MessageCircle className="shrink-0" /> +91 93983 34458</a>
              <a href={GH} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 break-all transition-colors hover:text-[#168BFF]"><Github className="shrink-0" /> yesuvaraprasadmamidi</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden border-t border-white/10 px-5 pt-10 md:px-10">
        <div className="flex flex-wrap justify-between gap-4 text-sm text-white/50">
          <span>Build • Design • Grow</span>
          <button onClick={() => go("hero")} data-mag>Back to top ↑</button>
        </div>
        <div className="silver select-none text-center text-[38vw] font-extrabold leading-[.8] tracking-tighter">PWS</div>
        <p className="pb-6 pt-4 text-center text-xs text-white/40">© {new Date().getFullYear()} Prasad Web Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
