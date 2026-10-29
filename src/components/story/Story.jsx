"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { PhaseScene } from "./Egypt";
import { Ufo, PlanetArt } from "./Cosmos";
import { BlogArt } from "./BlogArt";
import { Spidey, Cobweb } from "./Spidey";
import { Armour, Einstein, Newton } from "./Costumes";
import Radio from "./Radio";
import { DeskScene, NashikScene, DataCentreScene, BeltScene, PlanesScene } from "./Scenery";
import { site } from "../../data/site";
import { work, college, academics, rangeOf, spanOf } from "../../data/experience";
import { stackNames } from "../../data/stack";
import { projects } from "../../data/projects";
import { blogs } from "../../data/blogs";
import { toolkit } from "../../data/toolkit";
import esdsLogo from "../../assets/esds-logo.webp";
import s from "./Story.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

/* One colour per chapter. The fixed backdrop tweens between these as
   each pinned scene takes the stage; with reduced motion each section
   simply paints its own. */
const BG = {
  hero: "#252a5f", // sampled from the avatar's sky so its edges disappear
  solar: "#110e26",
  tour: "#110e26", // the teaser is already out in space
  hi: "#6e3a63",
  uni: "#4a2333",
  exp: "#1f3b52",
  work: "#8a5a1e",
  blogs: "#2b1f3d",
  finale: "#1c3a4a",
};

const CHAPTERS = [
  { id: "hero", label: "Hello" },
  { id: "work", label: "Work" },
  { id: "exp", label: "Experience" },
  { id: "uni", label: "Academia" },
  { id: "tour", label: "Lifecycle" },
  { id: "blogs", label: "Blogs" },
  { id: "finale", label: "About" },
];

/* The product lifecycle as a solar system: the product is the sun and
   each phase is a planet, innermost first. Landing on a planet opens
   its pyramid-site scene and the belief it stands for. `focus` (1-5)
   is how much of his work lives in that phase, and sets the planet's
   size; `kind` picks what sort of world it is drawn as. */
const PHASES = [
  {
    name: "Plan",
    kind: "earth",
    focus: 3,
    color: "#7bdcb5",
    belief: "Start with the why.",
    body: "Before anyone touches a tool, I want one sentence: who is this for, and what changes for them. If we can’t write it, we’re not ready to build it.",
    scene: "the pharaoh points at the plan; the scribe asks who the pyramid is for.",
  },
  {
    name: "Analysis",
    kind: "survey",
    focus: 3,
    color: "#8fa8ff",
    belief: "Measure the ground before you lay a stone.",
    body: "Requirements come from users and data, not from the loudest voice in the room. Constraints found now are cheap; found later, they’re rebuilds.",
    scene: "surveyors rope out the site by starlight. Something is watching.",
  },
  {
    name: "Design",
    kind: "ringed",
    focus: 5,
    color: "#ff7a59",
    belief: "Design is the cheapest place to be wrong.",
    body: "A sketch costs minutes, a migration costs months. I argue about flows and structure on paper, so the build becomes the boring part.",
    scene: "the architect checks the elevation before a single block moves.",
  },
  {
    name: "Development",
    kind: "giant",
    focus: 5,
    color: "#f4a3c9",
    belief: "Ship in blocks, not boulders.",
    body: "Small, reviewable pieces that each stand on their own. Big-bang launches are how pyramids end up as rubble.",
    scene: "one block at a time up the ramp, with someone watching the line.",
  },
  {
    name: "AI/ML",
    kind: "neural",
    focus: 4,
    color: "#f0a6ff",
    belief: "Use AI where it earns its place.",
    body: "Not every feature needs a model. I reach for AI when it removes real friction or does what plain rules can’t — and keep the craft, the judgment and the last word human.",
    scene: "the machine lifts the heaviest stone; the carving stays by hand.",
  },
  {
    name: "Testing",
    kind: "moon",
    focus: 2,
    color: "#b8e05a",
    belief: "Tap every stone before anyone climbs.",
    body: "The empty state, the slow network, the user who does it backwards. The happy path is the one case I worry about least.",
    scene: "the inspector finds the cracked block before the tourists do.",
  },
  {
    name: "Deployment",
    kind: "ice",
    focus: 5,
    color: "#5ec8e5",
    belief: "Launch with a way back.",
    body: "CI/CD, staged rollouts and a rollback plan written before it’s needed. The capstone goes on last, and carefully.",
    scene: "the capstone is delivered. Nobody asks by whom.",
  },
  {
    name: "Maintenance",
    kind: "swirl",
    focus: 3,
    color: "#c49bff",
    belief: "Shipping is the start, not the finish.",
    body: "Watch the numbers, read the feedback, fix the cracks — then go round the sun again with what you learned.",
    scene: "sweeping the steps and reading the visitors’ notes at sunset.",
  },
];

/* Deterministic jitter so the tilted letters render the same on the
   server and the client. */
const tilt = (i) => ((i * 37) % 11) - 5;
const scatter = (i, span) => (((i * 7919) % 1000) / 1000) * span;
const pad2 = (n) => String(n).padStart(2, "0");
// Planet size from focus: the phases he lives in are the giants.
const SIZE_OF = { 1: 0.5, 2: 0.62, 3: 0.9, 4: 1.15, 5: 1.45 };
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* Where the planet journey sits inside the solar scene's scroll range. */
const JOURNEY_IN = 0.04;
const JOURNEY_LEN = 0.88;

function Chars({ text, className }) {
  return (
    <span aria-hidden="true">
      {text.split("").map((c, i) => (
        <span key={i} className={className} style={{ "--r": `${tilt(i)}deg` }}>
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

function Words({ text, className }) {
  return (
    <span aria-hidden="true">
      {text.split(" ").map((w, i) => (
        <span key={i} className={className}>
          {w}{" "}
        </span>
      ))}
    </span>
  );
}

/* "Here's the short version": the chapters after Hi, in story order. */
const AGENDA = [
  { id: "work", label: "My projects" },
  { id: "exp", label: "Work experience" },
  { id: "uni", label: "Academia" },
  { id: "tour", label: "Why I love product" },
];

// Finale doodles live in the side margins, clear of the words.
const DOODLES = [
  { k: "brackets", x: "2%", y: "24%" },
  { k: "chai", x: "2.5%", y: "62%" },
  { k: "spark", x: "94%", y: "48%" },
  { k: "terminal", x: "93.5%", y: "70%" },
];

function Doodle({ k }) {
  const st = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (k) {
    case "brackets":
      return (
        <svg viewBox="0 0 60 60"><path {...st} d="M22 14 L10 30 L22 46 M38 14 L50 30 L38 46 M34 10 L26 50" /></svg>
      );
    case "pyramid":
      return (
        <svg viewBox="0 0 60 60">
          <path d="M6 50 L30 10 L54 50 Z" fill="#e6c27a" stroke="#15131f" strokeWidth="3" strokeLinejoin="round" />
          <path d="M24 20 L30 10 L36 20 Z" fill="#e9b949" stroke="#15131f" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 60 60">
          <rect x="6" y="10" width="40" height="26" rx="8" fill="#e9e4ff" stroke="#15131f" strokeWidth="3" />
          <path d="M14 36 L12 46 L24 36" fill="#e9e4ff" stroke="#15131f" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="18" cy="23" r="2.5" fill="#15131f" /><circle cx="26" cy="23" r="2.5" fill="#15131f" /><circle cx="34" cy="23" r="2.5" fill="#15131f" />
        </svg>
      );
    case "chai":
      return (
        <svg viewBox="0 0 60 60">
          <path d="M14 22 L44 22 L40 50 L18 50 Z" fill="#f4efe6" stroke="#15131f" strokeWidth="3" strokeLinejoin="round" />
          <path {...st} d="M24 16 q-4 -5 0 -10 M32 16 q-4 -5 0 -10" />
        </svg>
      );
    case "terminal":
      return (
        <svg viewBox="0 0 60 60">
          <rect x="6" y="12" width="48" height="36" rx="6" fill="#15131f" stroke="#e9e4ff" strokeWidth="3" />
          <path d="M14 24 L22 30 L14 36 M26 38 L38 38" fill="none" stroke="#7bdcb5" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 60 60"><path d="M30 6 L35 25 L54 30 L35 35 L30 54 L25 35 L6 30 L25 25 Z" fill="#ffd166" stroke="#15131f" strokeWidth="3" strokeLinejoin="round" /></svg>
      );
  }
}

function Sparkle({ style }) {
  return (
    <svg className={s.sparkle} style={style} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
    </svg>
  );
}

export default function Story({ fonts, avatar }) {
  const root = useRef(null);
  // Filled in by the effect: jump straight to a planet's card.
  const nav = useRef({ to: () => {}, step: () => {}, tour: () => {}, play: () => {}, go: null, land: null, skipSolar: null });

  useEffect(() => {
    const el = root.current;
    // Every load (reload, hard reload, back/forward) starts the story on
    // the avatar. The browser, ScrollTrigger and a stray #hash all try to
    // restore an old position, so each one is switched off here, and the
    // position saved on the way out is always the top.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);
    let touched = false;
    const markTouched = () => {
      touched = true;
    };
    const toTop = () => window.scrollTo(0, 0);
    const onPageShow = (e) => {
      if (e.persisted) toTop(); // restored from the back/forward cache
    };
    window.addEventListener("wheel", markTouched, { passive: true, once: true });
    window.addEventListener("touchstart", markTouched, { passive: true, once: true });
    window.addEventListener("keydown", markTouched, { once: true });
    window.addEventListener("beforeunload", toTop);
    window.addEventListener("pageshow", onPageShow);
    const q = (sel) => el.querySelector(sel);
    const qa = (sel) => gsap.utils.toArray(el.querySelectorAll(sel));
    const bg = q(`.${s.backdrop}`);
    const setBg = (c) => gsap.to(bg, { backgroundColor: c, duration: 0.6, ease: "power2.out", overwrite: true });

    /* Orbits are sized from the stage box so the system fits any
       screen: wide screens get flat, tilted ellipses, portrait ones
       rounder orbits. Planet i sits on orbit i at angle a_i, and its
       live position is kept in pos[i] for the camera to follow. */
    const stage = q(`.${s.solarStage}`);
    const camera = q(`.${s.camera}`);
    const solarHead = q(`.${s.solarHead}`);
    const planetNav = q(`.${s.planetNav}`);
    const orbits = qa(`.${s.orbit}`);
    const planets = qa(`.${s.planet}`);
    const panels = qa(`.${s.planetPanel}`);
    const angles = PHASES.map((_, i) => i * 0.9 + 0.4);
    const speeds = PHASES.map((_, i) => 0.32 / (1 + i * 0.35));
    const pos = PHASES.map(() => [0, 0]);
    const frac = (i) => 0.28 + (i * 0.7) / (PHASES.length - 1);
    /* Layout the per-frame code needs, read once per resize/refresh so
       the ticker never forces a layout. Offsets are relative to the
       solar section, which is also where the UFO is positioned. */
    const ufoPos = q(`.${s.ufoPos}`);
    const geo = { cx: 0, cy: 0, sizes: [], panel: [], uw: 0, uh: 0 };
    const solarSection = q('[data-scene="solar"]');
    const measure = () => {
      // Walk the offset chain: transforms (the system shrinking away at
      // the end) don't affect offsets, so this is safe at any time.
      let ox = 0;
      let oy = 0;
      for (let n = stage; n && n !== solarSection; n = n.offsetParent) {
        ox += n.offsetLeft;
        oy += n.offsetTop;
      }
      geo.cx = ox + stage.offsetWidth / 2;
      geo.cy = oy + stage.offsetHeight / 2;
      geo.sizes = planets.map((p) => p.querySelector(`.${s.planetDot}`).offsetWidth || 40);
      geo.panel = panels.map((p) => [p.offsetLeft, p.offsetTop]);
      geo.W = stage.offsetWidth / 2;
      geo.H = stage.offsetHeight / 2;
      geo.uw = ufoPos.offsetWidth;
      geo.uh = ufoPos.offsetHeight;
    };
    const placeOrbits = (dt = 0) => {
      const W = stage.offsetWidth / 2;
      const H = stage.offsetHeight / 2;
      planets.forEach((p, i) => {
        angles[i] += speeds[i] * dt;
        const rx = W * 0.94 * frac(i);
        const ry = H * 0.86 * frac(i);
        const sin = Math.sin(angles[i]);
        const depth = 0.82 + 0.18 * ((sin + 1) / 2);
        pos[i][0] = Math.cos(angles[i]) * rx;
        pos[i][1] = sin * ry;
        p.style.transform = `translate(${pos[i][0]}px, ${pos[i][1]}px) scale(${depth})`;
        p.style.zIndex = sin > 0 ? 4 : 1;
        if (!dt) {
          orbits[i].style.width = `${rx * 2}px`;
          orbits[i].style.height = `${ry * 2}px`;
        }
      });
      if (!dt) measure();
    };

    /* The planet journey. journey.target is set from scroll; journey.f
       eases toward it every frame. f in [0, 7) means "visiting planet
       floor(f)": the first quarter flies in, the middle holds with the
       panel open, the last quarter flies back out to the overview. */
    const journey = { f: -1, target: -1, lock: false };
    let activePhase = -2;
    const navDots = qa(`.${s.navDot}`);
    const setPhase = (n) => {
      if (n === activePhase) return;
      activePhase = n;
      planets.forEach((p, i) => p.classList.toggle(s.active, i === n));
      navDots.forEach((d, i) => d.classList.toggle(s.active, i === n));
    };

    /* Fast-forward. Arrow keys and the planet buttons don't scrub: the
       page jumps straight to the target's scroll position while the
       journey itself plays the real fly-out / fly-in at speed, passing
       every planet in between. While that runs, scroll can't steer the
       camera (journey.lock); any wheel, touch or key from the visitor
       cancels it and hands control straight back. */
    const N = PHASES.length;
    let ff = null;
    const cancelFF = () => {
      ff?.kill();
      ff = null;
      journey.lock = false;
    };
    const jumpTo = (i) => {
      const st = ScrollTrigger.getById("solar");
      if (!st) return;
      const to = i < 0 ? -0.001 : i >= N ? N : i + 0.5;
      const p = i < 0 ? 0 : i >= N ? 1 : JOURNEY_IN + ((i + 0.5) / N) * JOURNEY_LEN;
      cancelFF();
      journey.lock = true;
      window.scrollTo({ top: st.start + p * (st.end - st.start) + (i >= N ? 2 : 0), behavior: "instant" });
      const from = Math.max(-0.001, journey.f);
      journey.f = from;
      ff = gsap.to(journey, {
        f: to,
        duration: Math.min(3.6, 0.7 + Math.abs(to - from) * 0.55),
        ease: "sine.inOut",
        onComplete: () => {
          journey.target = to;
          journey.lock = false;
          ff = null;
        },
      });
      return ff.duration();
    };
    const current = () => (journey.f < 0 ? -1 : Math.min(N - 1, Math.floor(journey.f)));

    /* Tour: fast-forward through every planet, holding each card. */
    const tourBtn = q(`.${s.tourBtn}`);
    let tourCall = null;
    const stopTour = () => {
      tourCall?.kill();
      tourCall = null;
      tourBtn?.setAttribute("aria-pressed", "false");
      if (tourBtn) tourBtn.textContent = "▶ Play tour";
    };
    const tourStep = (k) => {
      if (k >= N) {
        stopTour();
        return;
      }
      const d = jumpTo(k) ?? 0;
      tourCall = gsap.delayedCall(d + 2.4, () => tourStep(k + 1));
    };
    nav.current.to = (i) => {
      stopTour();
      jumpTo(i);
    };
    nav.current.step = (dir) => {
      stopTour();
      jumpTo(current() + dir);
    };
    nav.current.tour = () => {
      if (tourCall) {
        stopTour();
        return;
      }
      tourBtn?.setAttribute("aria-pressed", "true");
      if (tourBtn) tourBtn.textContent = "❚❚ Pause";
      const c = current();
      tourStep(c >= N - 1 ? 0 : c + 1);
    };
    const onKey = (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      if (e.target.closest?.("input, textarea, [contenteditable]")) return;
      const st = ScrollTrigger.getById("solar");
      if (!st?.isActive) return;
      e.preventDefault();
      nav.current.step(e.key === "ArrowRight" ? 1 : -1);
    };
    // The visitor taking the wheel always wins over a fast-forward.
    const onUserScroll = () => {
      if (!ff && !tourCall) return;
      stopTour();
      cancelFF();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    /* The UFO: circles the sun in the overview, flies with the camera
       to each planet, then docks on the corner of the open card. It
       lives outside the camera so it never scales with the zoom. */
    const ufo = { x: 0, y: 0, a: 2.4, clock: 0 };
    const lerp = (a, b, k) => a + (b - a) * k;
    const applyCamera = (dt) => {
      const f = journey.f;
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      let z = 1;
      let fx = 0;
      let fy = 0;
      let open = -1;
      let show = 0;
      let t = 0;
      if (f >= 0 && f < PHASES.length) {
        const i = Math.floor(f);
        const u = f - i;
        // Each planet is sized by focus, so each gets its own zoom.
        const Z = Math.min(16, Math.max(3, (minDim * 0.55) / (geo.sizes[i] || 40)));
        t = u < 0.25 ? easeInOut(u / 0.25) : u > 0.75 ? easeInOut((1 - u) / 0.25) : 1;
        z = 1 + (Z - 1) * t;
        fx = pos[i][0] * t;
        fy = pos[i][1] * t;
        open = i;
        show = clamp01(Math.min(u - 0.22, 0.78 - u) / 0.08);
      }
      camera.style.transform = `translate(${-fx * z}px, ${-fy * z}px) scale(${z})`;
      // Heading and hopper belong to the system view; both clear out
      // once the journey is over, and planet labels hide while zoomed.
      const done = f >= PHASES.length - 0.02;
      solarHead.style.opacity = String(done ? 0 : 1 - t);
      planetNav.style.opacity = done ? "0" : "1";
      planetNav.style.pointerEvents = done ? "none" : "";
      camera.classList.toggle(s.zoomed, t > 0.3);
      panels.forEach((p, k) => {
        const o = k === open ? show : 0;
        p.style.opacity = String(o);
        p.style.visibility = o > 0.01 ? "visible" : "hidden";
        p.style.transform = `translateY(${(1 - o) * 30}px) scale(${0.96 + 0.04 * o})`;
      });
      setPhase(open);

      // UFO target, relative to the stage centre.
      ufo.a += dt * 0.35;
      ufo.clock += dt;
      let tx = Math.cos(ufo.a) * geo.W * 0.6;
      let ty = Math.sin(ufo.a) * geo.H * 0.55;
      if (open >= 0) {
        const r = (geo.sizes[open] / 2) * z * 1.4;
        const px = pos[open][0] * (1 - t) * z;
        const py = pos[open][1] * (1 - t) * z;
        tx = lerp(tx, px - r * 0.7 - geo.uw * 0.3, t);
        ty = lerp(ty, py - r * 0.7 - geo.uh * 0.3, t);
        // Dock on the card's top-left corner; on phones the card reaches
        // up to the header, so it parks just inside the corner instead.
        const [lx, ly] = geo.panel[open] ?? [0, 0];
        const roomAbove = ly > geo.uh * 0.6 + 70;
        tx = lerp(tx, lx - geo.cx + geo.uw * (roomAbove ? 0.2 : 0.6), show);
        ty = lerp(ty, ly - geo.cy + (roomAbove ? -geo.uh * 0.55 : geo.uh * 0.2), show);
      }
      const k = Math.min(1, dt * 4);
      const vx = (tx - ufo.x) * k;
      ufo.x += vx;
      ufo.y += (ty - ufo.y) * k;
      const bob = Math.sin(ufo.clock * 2.2) * 6;
      const tilt = Math.max(-14, Math.min(14, vx * 0.6));
      ufoPos.style.transform = `translate(${geo.cx + ufo.x - geo.uw / 2}px, ${geo.cy + ufo.y - geo.uh / 2 + bob}px) rotate(${tilt}deg)`;
      ufoPos.style.opacity = done ? "0" : "1";
    };
    const orbitTick = (time, deltaMs) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      if (!journey.lock) journey.f += (journey.target - journey.f) * Math.min(1, dt * 3.2);
      // Planets slow right down while the camera is visiting one.
      placeOrbits(journey.f >= 0 && journey.f < PHASES.length ? dt * 0.2 : dt);
      applyCamera(dt);
    };
    const onResize = () => placeOrbits();
    placeOrbits();
    window.addEventListener("resize", onResize);
    ScrollTrigger.addEventListener("refresh", measure);

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 820px)",
      },
      (ctx) => {
        const { motion, wide } = ctx.conditions;
        if (!motion) return;
        el.classList.add(s.animated);

        /* ---------- Intro, on load ---------- */
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          // He stays grounded on the screen's bottom edge and simply
          // fades up in place: no slide, so the cut edge never shows.
          .from(`.${s.mascotWrap}`, { opacity: 0, duration: 1.1, ease: "power2.out" }, 0)
          .from(qa(`.${s.nameChar}`), { yPercent: 110, opacity: 0, filter: "blur(10px)", stagger: 0.04, duration: 0.9 }, 0.25)
          .from(q(`.${s.kicker}`), { y: 16, opacity: 0, duration: 0.6 }, 0.5)
          .from(qa(`.${s.roleWord}`), { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, 0.9)
          .from(q(`.${s.header}`), { yPercent: -120, duration: 0.8 }, 1)
          .from(q(`.${s.rail}`), { yPercent: 120, duration: 0.8 }, 1)
          .from(q(`.${s.cue}`), { opacity: 0, y: 10, duration: 0.6 }, 1.3)
          .from(q(`.${s.heroMeta}`), { opacity: 0, y: 10, duration: 0.6 }, 1.3);

        intro.from(q(`.${s.hey}`), { scale: 0, rotation: -20, duration: 0.5, ease: "back.out(3)" }, 1.1);
        gsap.to(q(`.${s.hey}`), { rotation: 8, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut", delay: 1.7 });
        gsap.to(q(`.${s.avatar}`), { y: 8, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" });

        // Avatar life: pivots are in the SVG's 3x artwork space.
        // Wrist (267, 680), eyes at the centres of their traced groups.
        gsap.timeline({ repeat: -1, repeatDelay: 2.2, delay: 1.1 })
          .to(".av-hand", { rotation: 14, svgOrigin: "800 2040", duration: 0.22, ease: "sine.inOut", yoyo: true, repeat: 5 })
          .to(".av-hand", { rotation: 0, svgOrigin: "800 2040", duration: 0.2 });
        gsap.timeline({ repeat: -1, repeatDelay: 3.4, delay: 2 })
          .to(".av-eyeL", { scaleY: 0.08, svgOrigin: "1922 1215", duration: 0.07, yoyo: true, repeat: 1 }, 0)
          .to(".av-eyeR", { scaleY: 0.08, svgOrigin: "2476 1252", duration: 0.07, yoyo: true, repeat: 1 }, 0);
        gsap.utils.toArray(".av-steam path").forEach((p, i) => {
          gsap.fromTo(p, { y: 0, opacity: 0.9 }, { y: -90, opacity: 0, duration: 2.2, delay: i * 1.1, repeat: -1, ease: "sine.in" });
          gsap.to(p, { x: i ? -12 : 12, duration: 1.1, yoyo: true, repeat: -1, ease: "sine.inOut" });
        });
        gsap.to(q(`.${s.cueDot}`), { y: 10, duration: 0.8, yoyo: true, repeat: -1, ease: "sine.inOut" });

        /* ---------- Scroll scenes ---------- */
        // Leaving a scene hands the backdrop straight to the next one,
        // so the gap before the next pin never flashes the old colour.
        const order = qa("[data-scene]").map((n) => n.dataset.scene);
        const nextBg = (id) => BG[order[order.indexOf(id) + 1]] ?? BG[id];
        const lastScene = qa("[data-scene]").pop();
        const holdAt = {};
        const pinned = {};
        const scene = (id, end, build, extra = {}) => {
          const sec = q(`[data-scene="${id}"]`);
          // A scene taller than the screen (About on a phone, anything on
          // a landscape phone) can't be pinned without clipping, so it
          // scrolls normally and plays as it passes through view.
          const fits = sec.offsetHeight <= window.innerHeight + 2;
          pinned[id] = fits;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id,
              trigger: sec,
              start: fits ? "top top" : "top 85%",
              // A scrolling scene plays out as it passes; the last one on the
              // page ends where the page does, or it could never finish.
              end: fits ? end : sec === lastScene ? "bottom bottom" : "bottom 35%",
              pin: fits,
              scrub: 1,
              onEnter: () => setBg(BG[id]),
              onEnterBack: () => setBg(BG[id]),
              onLeave: () => setBg(nextBg(id)),
              ...extra,
            },
          });
          build(tl, (sel) => sec.querySelector(sel), (sel) => gsap.utils.toArray(sec.querySelectorAll(sel)));
          // A "hold" label marks the moment everything has played in;
          // the director lands there.
          if (tl.labels.hold != null) holdAt[id] = tl.labels.hold / tl.duration();
          return tl;
        };

        // Pins are created in page order: each one's start depends on the
        // pin spacing of every pinned scene above it.
        // Hero: the camera dives straight into his pupil. Nothing is
        // faked: the whole vector face scales in proportion until the
        // dark of the eye fills the screen, and out the other side he
        // says hello.
        let inside = false;
        scene("hero", "+=180%", (tl, $) => {
          // Only wrappers the intro never touches, so the two timelines
          // can't fight over the same opacity.
          tl.to([$(`.${s.heroText}`), $(`.${s.heroFade}`), $(`.${s.hey}`)], { y: -60, opacity: 0, duration: 0.2 }, 0)
            .to($(`.${s.mascotWrap}`), { scale: 90, duration: 1, ease: "power4.in" }, 0.02)
            .to($(`.${s.mascotWrap}`), { opacity: 0, duration: 0.1 }, 0.94);
        }, {
          // Once the pupil fills the screen we are already "inside".
          onUpdate: (st) => {
            const now = st.progress > 0.88;
            if (now !== inside) {
              inside = now;
              setBg(inside ? BG.hi : BG.hero);
            }
          },
        });

        // Line-drawn scenery: strokes start undrawn and draw on scroll.
        const undraw = (els) =>
          els.forEach((e) => {
            const l = e.getTotalLength();
            gsap.set(e, { strokeDasharray: l, strokeDashoffset: l });
          });

        // Hi: chunky letters tumble in, then the line blows past the camera.
        scene("hi", "+=200%", (tl, $, $$) => {
          undraw($$('[data-sc="draw"]'));
          tl.to($$('[data-sc="draw"]'), { strokeDashoffset: 0, duration: 0.4 }, 0)
            .from($$('[data-sc="item"]'), { y: 40, opacity: 0, stagger: 0.06, duration: 0.25, ease: "back.out(2)" }, 0.1);
          const chars = $$(`.${s.chunkChar}`);
          const line = $(`.${s.squiggle} path`);
          const len = line.getTotalLength();
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
          tl.from(chars, { yPercent: 160, rotation: (i) => tilt(i) * 6, opacity: 0, stagger: 0.04, duration: 0.35, ease: "back.out(2)" }, 0)
            .to(line, { strokeDashoffset: 0, duration: 0.3 })
            .from($$(`.${s.sparkle}`), { scale: 0, rotation: -90, stagger: 0.04, duration: 0.2, ease: "back.out(3)" }, "<")
            .from($(`.${s.hiWork}`), { y: 30, opacity: 0, duration: 0.25 })
            .from($(`.${s.esds}`), { scale: 0, rotation: -12, duration: 0.2, ease: "back.out(2.4)" }, "<0.1")
            .from($(`.${s.bio}`), { y: 30, opacity: 0, duration: 0.2 })
            .from($$(`.${s.agenda} li`), { y: 24, opacity: 0, stagger: 0.05, duration: 0.2, ease: "back.out(2)" }, "<0.05")
            .addLabel("hold", "+=0.1")
            .to({}, { duration: 0.35 })
            .to([$(`.${s.hiWork}`), $(`.${s.bio}`), $(`.${s.agenda}`), $(`.${s.squiggle}`), ...$$(`.${s.sparkle}`)], { opacity: 0, duration: 0.15 })
            .to($(`.${s.hiLine}`), { scale: 7, opacity: 0, duration: 0.6, ease: "power2.in" }, "<")
            .to($(`.${s.scenery}`), { y: 60, opacity: 0, duration: 0.3 }, "<");
        });

        // Work: a horizontal reel on wide screens, a plain stack on narrow.
        if (wide) {
          const track = q(`.${s.track}`);
          const dist = () => track.scrollWidth - window.innerWidth;
          // The project signs stand on the belt: tell CSS how high its
          // deck sits above the bottom of the section (0 when hidden).
          const workSec = q('[data-scene="work"]');
          const deck = q('[data-sc="deck"]');
          const setDeck = () => {
            const d = deck.getBoundingClientRect();
            const h = d.height ? workSec.getBoundingClientRect().bottom - d.top : 0;
            workSec.style.setProperty("--deck", `${Math.round(h)}px`);
          };
          setDeck();
          ScrollTrigger.addEventListener("refreshInit", setDeck);
          ctx.add(() => () => ScrollTrigger.removeEventListener("refreshInit", setDeck));
          scene("work", () => `+=${dist()}`, (tl, $, $$) => {
            tl.to(track, { x: () => -dist(), duration: 1 });
            // The belt rolls with the reel.
            tl.to($$('[data-sc="roller"]'), { rotation: -1440, transformOrigin: "50% 50%", duration: 1 }, 0)
              // The motor pulley is half the sprocket's size: twice the turns.
              .to($$('[data-sc="pulley"]'), { rotation: -2880, transformOrigin: "50% 50%", duration: 1 }, 0)
              .to($$('[data-sc="tread"]'), { strokeDashoffset: 800, duration: 1 }, 0);
            $$(`.${s.cardImg}`).forEach((img) => {
              tl.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 0.5 }, 0);
            });
          });
        } else {
          ScrollTrigger.create({
            trigger: q('[data-scene="work"]'),
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (st) => st.isActive && setBg(BG.work),
          });
          qa(`.${s.card}`).forEach((c) =>
            gsap.from(c, { y: 60, opacity: 0, duration: 0.6, scrollTrigger: { trigger: c, start: "top 85%" } })
          );
        }

        // Experience: the timeline draws itself and the roles slot in.
        scene("exp", "+=160%", (tl, $, $$) => {
          // ESDS: the racks rise, the cloud forms, the links draw in.
          undraw($$('[data-sc="draw"]'));
          tl.from($$('[data-sc="rack"]'), { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.05, duration: 0.25, ease: "back.out(1.4)" }, 0)
            .from($('[data-sc="cloud"]'), { scale: 0.6, opacity: 0, transformOrigin: "50% 50%", duration: 0.3 }, 0.1)
            .to($$('[data-sc="draw"]'), { strokeDashoffset: 0, stagger: 0.04, duration: 0.3 }, 0.2);
          tl.from($$(`.${s.expHead} > *`), { y: 24, opacity: 0, stagger: 0.06, duration: 0.2 }, 0)
            .from($(`.${s.expLine}`), { scaleY: 0, duration: 0.35 }, "<0.1")
            .from($$(`.${s.expRole}`), { y: 40, opacity: 0, stagger: 0.15, duration: 0.25 }, "<0.1")
            .addLabel("hold", "+=0.1")
            .to({}, { duration: 0.35 })
            .to([$(`.${s.expStage}`), $(`.${s.scenery}`)], { y: -40, opacity: 0, duration: 0.2 });
        });

        // Academia: school days and the degree on one screen, then
        // college life is stamped done.
        scene("uni", "+=150%", (tl, $, $$) => {
          // Nashik: hills and river draw in, the vines fill with grapes,
          // the train runs the whole length, caps fly for the class of '26.
          undraw($$('[data-sc="draw"]'));
          tl.to($$('[data-sc="draw"]'), { strokeDashoffset: 0, stagger: 0.08, duration: 0.4 }, 0)
            .from($$('[data-sc="vine"]'), { scale: 0, transformOrigin: "50% 100%", stagger: 0.008, duration: 0.2, ease: "back.out(2)" }, 0.15)
            .fromTo($('[data-sc="train"]'), { x: -300 }, { x: 1700, duration: 1.1, ease: "none" }, 0)
            .from($$('[data-sc="cap"]'), { y: 160, opacity: 0, stagger: 0.08, duration: 0.3, ease: "back.out(1.6)" }, 0.45);
          tl.from($$(`.${s.uniChar}`), { yPercent: 110, stagger: 0.03, duration: 0.3, ease: "power3.out" }, 0)
            .from($(`.${s.uniSub}`), { y: 16, opacity: 0, duration: 0.15 }, "<0.15")
            .from($$(`.${s.grade}`), { scale: 0.4, opacity: 0, stagger: 0.06, duration: 0.18, ease: "back.out(2.4)" }, "<0.05")
            .from($(`.${s.schoolCard}`), { y: 24, opacity: 0, duration: 0.18 }, "<0.05")
            .from($$(`.${s.schoolChips} li`), { y: 10, opacity: 0, stagger: 0.04, duration: 0.12 }, "<0.08")
            .from($$(`.${s.uniRow}`), { y: 24, opacity: 0, stagger: 0.05, duration: 0.2 }, "<0.1")
            .from($(`.${s.stamp}`), { scale: 2.4, rotation: -30, opacity: 0, duration: 0.2, ease: "back.out(2)" })
            .addLabel("hold", "+=0.1")
            .to({}, { duration: 0.3 })
            .to([$(`.${s.uniStage}`), $(`.${s.scenery}`)], { y: -40, opacity: 0, duration: 0.2 });
        });

        // Tour teaser: the saucer swoops in with its pilot, waits for the
        // question to land, then shoots off into the system ahead.
        scene("tour", "+=170%", (tl, $, $$) => {
          const u = $(`.${s.tourUfo}`);
          tl.fromTo(u, { xPercent: -320, yPercent: -140, rotation: -24, scale: 0.5 }, { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, duration: 0.35, ease: "power2.out" }, 0)
            .from($$(`.${s.tourText} > *`), { y: 30, opacity: 0, stagger: 0.08, duration: 0.2 }, 0.15)
            .addLabel("hold", "+=0.1")
            .to({}, { duration: 0.35 })
            .to($(`.${s.tourText}`), { y: -30, opacity: 0, duration: 0.15 })
            .to(u, { y: () => window.innerHeight * 0.18, scale: 0.08, rotation: 30, opacity: 0, duration: 0.3, ease: "power2.in" }, "<");
        }, { invalidateOnRefresh: true });

        // Solar: the system grows in while the section is still rising
        // out of the eye, so there's no empty stretch; once pinned, the
        // camera visits each planet in turn.
        const solarSec = q('[data-scene="solar"]');
        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: solarSec, start: "top bottom", end: "top top", scrub: 0.6 },
        })
          .from(q(`.${s.sun}`), { scale: 0, duration: 0.5, ease: "back.out(1.6)" }, 0)
          .from(qa(`.${s.orbit}`), { scale: 0.2, opacity: 0, stagger: 0.04, duration: 0.5 }, 0.1)
          .from(qa(`.${s.planetBody}`), { scale: 0, stagger: 0.04, duration: 0.3, ease: "back.out(2)" }, 0.4)
          .from(q(`.${s.solarHead}`), { y: 30, opacity: 0, duration: 0.3 }, 0.6)
          .from(q(`.${s.ufoPos} svg`), { scale: 0, opacity: 0, duration: 0.3, ease: "back.out(2)" }, 0.6);
        scene("solar", `+=${(PHASES.length + 1) * 170}%`, (tl, $) => {
          tl.to({}, { duration: JOURNEY_LEN }, JOURNEY_IN)
            .to($(`.${s.system}`), { scale: 0.08, rotation: 25, opacity: 0, duration: 0.08, ease: "power2.in" });
        }, {
          onUpdate: (st) => {
            const f = ((st.progress - JOURNEY_IN) / JOURNEY_LEN) * PHASES.length;
            journey.target = Math.min(PHASES.length, Math.max(-0.001, f));
          },
        });
        gsap.ticker.add(orbitTick);

        // Blogs: every note rises in turn and its cover draws itself;
        // paper planes cross the strip underneath.
        scene("blogs", "+=130%", (tl, $, $$) => {
          undraw($$('[data-sc="draw"]'));
          // He drops down his thread first, then the notes follow.
          tl.from($(`.${s.spideyHang}`), { y: () => -window.innerHeight * 0.5, duration: 0.35, ease: "back.out(1.4)" }, 0)
            .from($$(`.${s.blogHead} > *`), { y: 24, opacity: 0, stagger: 0.06, duration: 0.2 }, 0.05)
            .from($$(`.${s.blogCard}`), { y: 60, opacity: 0, stagger: 0.12, duration: 0.3 }, "<0.1")
            .from($$(`.${s.blogFrame}`), { scale: 0.85, rotation: (i) => (i - 1) * 4, stagger: 0.12, duration: 0.3, ease: "back.out(1.8)" }, "<")
            .to($$('[data-sc="draw"]'), { strokeDashoffset: 0, stagger: 0.12, duration: 0.4 }, "<0.15")
            .from($$('[data-sc="trail"]'), { opacity: 0, stagger: 0.1, duration: 0.3 }, 0);
          $$('[data-sc="plane"]').forEach((pl, i) => {
            tl.to(pl, { motionPath: { path: pl.dataset.path, autoRotate: true }, duration: 0.8, ease: "none" }, i * 0.1);
          });
        }, { invalidateOnRefresh: true });

        // Finale: one closing page. The armour and Einstein arrive,
        // the pitch rises word by word, then the facts and links.
        scene("finale", "+=170%", (tl, $, $$) => {
          // He swings in on a web line from off the top-left.
          // The armour flies in from the left, Einstein walks in from the right.
          tl.from($(`.${s.costumeL}`), { x: () => -window.innerWidth * 0.5, y: -120, rotation: -20, duration: 0.35, ease: "power2.out" })
            .from($(`.${s.costumeR}`), { x: () => window.innerWidth * 0.4, opacity: 0, duration: 0.35, ease: "power2.out" }, "<")
            .from($$(`.${s.ctaWord}`), { yPercent: 100, opacity: 0, stagger: 0.04, duration: 0.25 }, "<0.1")
            .from($$(`.${s.doodle}`), { scale: 0, rotation: -40, opacity: 0, stagger: 0.05, duration: 0.2, ease: "back.out(2.2)" }, "<")
            .from([$(`.${s.finaleBody}`), $(`.${s.ctaBtns}`)], { y: 20, opacity: 0, stagger: 0.06, duration: 0.2 })
            .from($$(`.${s.finaleAbout} > *`), { y: 24, opacity: 0, stagger: 0.06, duration: 0.2 }, "<0.05")
            .from($$(`.${s.chip}`), { scale: 0.6, opacity: 0, stagger: 0.015, duration: 0.15, ease: "back.out(2)" }, "<0.1")
            .from($(`.${s.finaleFoot}`), { opacity: 0, duration: 0.15 })
            .addLabel("hold", "+=0.1")
            .to({}, { duration: 0.3 });
        }, { invalidateOnRefresh: true });
        qa(`.${s.doodle}`).forEach((d, i) => {
          gsap.to(d.firstChild, { y: 8 + (i % 3) * 4, rotation: i % 2 ? 6 : -6, duration: 1.6 + (i % 3) * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
        });

        /* ---------- Chapter rail ---------- */
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (st) => gsap.set(q(`.${s.railFill}`), { scaleX: st.progress }),
        });

        /* ---------- Director: ↑ ↓ skip scene to scene, ▶ plays it all ----------
           Stops are the moments worth landing on: the top, the solar
           overview, every planet card, then the point where each later
           scene has fully played in. Moving between stops scrolls the
           page with a tween, so every scrubbed animation fast-forwards
           exactly as it would under a slow scroll. */
        const HOLD_AT = { finale: 0.9, tour: 0.5, hi: 0.55, uni: 0.62, exp: 0.62, blogs: 0.75 };
        // Where a scene "starts" for a visitor. Pinned scenes start where
        // the pin does. Scenes that scroll (taller than the screen, so most
        // of them on phones) start with their top just under the header;
        // their trigger fires earlier, at "top 85%", which is no place to
        // land.
        const header = q(`.${s.header}`);
        const landOn = (id) => {
          const st = ScrollTrigger.getById(id);
          // A pinned scene is empty at its start, so land where it has played
          // in. The hero and the belt read from their first frame.
          if (st && pinned[id] && (id === "hero" || id === "work")) return st.start + 2;
          if (st && pinned[id]) return st.start +(holdAt[id] ?? HOLD_AT[id] ?? 0.5) * (st.end - st.start);
          const sec = q(`[data-scene="${id}"]`);
          if (!sec) return null;
          // The last page plays out as it reaches the bottom: land there.
          if (sec === lastScene) return ScrollTrigger.maxScroll(window);
          return Math.max(0, sec.getBoundingClientRect().top + window.scrollY - header.offsetHeight);
        };
        const stopsFor = (id, hold) => {
          const st = ScrollTrigger.getById(id);
          if (!st) return [];
          if (pinned[id]) return [{ y: st.start + (holdAt[id] ?? HOLD_AT[id] ?? 0.5) * (st.end - st.start), hold }];
          // A scrolling scene: its top, and its bottom if it runs long.
          const sec = q(`[data-scene="${id}"]`);
          const top = landOn(id);
          const extra = sec.offsetHeight + header.offsetHeight - window.innerHeight;
          return extra > window.innerHeight * 0.2 ? [{ y: top, hold }, { y: top + extra, hold }] : [{ y: top, hold }];
        };
        const stops = () => {
          const get = (id) => ScrollTrigger.getById(id);
          const at = (st, f) => st.start + f * (st.end - st.start);
          const out = [{ y: 0, hold: 1.6 }];
          const sol = get("solar");
          if (sol) {
            out.push({ y: at(sol, JOURNEY_IN), hold: 1.4 });
            PHASES.forEach((_, i) => out.push({ y: at(sol, JOURNEY_IN + ((i + 0.5) / N) * JOURNEY_LEN), hold: 2.6 }));
          }
          ["hi", "uni", "exp", "tour"].forEach((id) => out.push(...stopsFor(id, 2.4)));
          const w = get("work");
          if (w) {
            // Land on the intro, then with each project card centred.
            const track = q(`.${s.track}`);
            const dist = Math.max(1, track.scrollWidth - window.innerWidth);
            out.push({ y: at(w, 0), hold: 1.6 });
            qa(`.${s.card}`).forEach((c) => {
              const f = (c.offsetLeft + c.offsetWidth / 2 - window.innerWidth / 2) / dist;
              out.push({ y: at(w, Math.min(1, Math.max(0, f))), hold: 2 });
            });
          } else {
            // Narrow screens list the work vertically: one stop per card.
            const h = header.offsetHeight + 16;
            qa(`.${s.card}`).forEach((c) => out.push({ y: c.getBoundingClientRect().top + window.scrollY - h, hold: 1.6 }));
          }
          ["blogs", "finale"].forEach((id) => out.push(...stopsFor(id, 2.4)));
          return out.sort((a, b) => a.y - b.y);
        };

        let dirTween = null;
        let aim = null;
        const scrollToY = (y) => {
          const dist = Math.abs(y - window.scrollY);
          const d = Math.min(3.4, Math.max(0.8, (dist / window.innerHeight) * 0.5));
          dirTween?.kill();
          aim = y;
          dirTween = gsap.to(window, {
            scrollTo: { y, autoKill: false },
            duration: d,
            ease: "power2.inOut",
            onComplete: () => {
              dirTween = null;
            },
          });
          return d;
        };
        const skip = (dir) => {
          const list = stops();
          const from = dirTween && aim != null ? aim : window.scrollY;
          let next = null;
          if (dir > 0) next = list.find((st) => st.y > from + 4);
          else for (let k = list.length - 1; k >= 0 && !next; k--) if (list[k].y < from - 4) next = list[k];
          if (next) scrollToY(next.y);
        };

        const playBtn = q(`.${s.playBtn}`);
        let playCall = null;
        const setPlayUI = (on) => {
          playBtn.setAttribute("aria-pressed", on ? "true" : "false");
          playBtn.querySelector("[data-label]").textContent = on ? "Pause" : "Play the story";
        };
        const stopPlay = () => {
          if (!playCall) return;
          playCall.kill();
          playCall = null;
          dirTween?.kill();
          dirTween = null;
          setPlayUI(false);
        };
        const playNext = () => {
          const list = stops();
          const next = list.find((st) => st.y > window.scrollY + 4);
          if (!next) {
            playCall = null;
            setPlayUI(false);
            return;
          }
          const d = scrollToY(next.y);
          playCall = gsap.delayedCall(d + next.hold, playNext);
        };
        const togglePlay = () => {
          if (playCall) {
            stopPlay();
            return;
          }
          setPlayUI(true);
          // From the very end, play starts over from the top.
          if (window.scrollY >= ScrollTrigger.maxScroll(window) - 4) window.scrollTo({ top: 0, behavior: "instant" });
          playCall = gsap.delayedCall(0.2, playNext);
        };
        nav.current.play = togglePlay;
        nav.current.go = scrollToY;
        nav.current.land = landOn;
        // "Skip the lifecycle": straight past the solar system to Blogs.
        nav.current.skipSolar = () => {
          stopTour();
          cancelFF();
          const y = landOn("blogs");
          if (y != null) scrollToY(y);
        };

        const onDirectorKey = (e) => {
          if (e.target.closest?.("input, textarea, [contenteditable]")) return;
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            stopPlay();
            skip(e.key === "ArrowDown" ? 1 : -1);
          } else if (e.key === "Escape") {
            stopPlay();
          }
        };
        const onDirectorTakeover = () => {
          stopPlay();
          dirTween?.kill();
          dirTween = null;
        };
        window.addEventListener("keydown", onDirectorKey);
        window.addEventListener("wheel", onDirectorTakeover, { passive: true });
        window.addEventListener("touchstart", onDirectorTakeover, { passive: true });

        return () => {
          window.removeEventListener("keydown", onDirectorKey);
          window.removeEventListener("wheel", onDirectorTakeover);
          window.removeEventListener("touchstart", onDirectorTakeover);
          stopPlay();
          nav.current.play = () => {};
          nav.current.go = null;
          nav.current.land = null;
          nav.current.skipSolar = null;
          gsap.ticker.remove(orbitTick);
          el.classList.remove(s.animated);
        };
      }
    );

    // Pin spacing depends on fonts and images, so measure once more
    // after everything has settled.
    const refresh = () => {
      ScrollTrigger.refresh();
      // Late layout (fonts, images) must not leave a fresh load mid-story.
      if (!touched) toTop();
    };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refresh", measure);
      window.removeEventListener("wheel", markTouched);
      window.removeEventListener("touchstart", markTouched);
      window.removeEventListener("keydown", markTouched);
      window.removeEventListener("beforeunload", toTop);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      stopTour();
      cancelFF();
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  const onChapter = (e) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.go;
    const sec = document.querySelector(`[data-scene="${id}"]`);
    const target = nav.current.land?.(id) ?? (sec ? sec.getBoundingClientRect().top + window.scrollY : 0);
    // Fast-forward through the scenes in between when motion is on.
    if (nav.current.go) nav.current.go(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const current = work.find((w) => w.current);
  const [nowRole] = current?.roles ?? [];
  const hiText = "Hi, I'm Shivraj.";

  return (
    <div ref={root} className={`${s.story} ${fonts}`}>
      <div className={s.backdrop} aria-hidden="true" />
      <div className={s.stars} aria-hidden="true">
        {Array.from({ length: 70 }, (_, i) => (
          <i key={i} style={{ left: `${scatter(i, 100)}%`, top: `${scatter(i * 3 + 1, 100)}%`, animationDelay: `${scatter(i * 5 + 2, 4)}s` }} />
        ))}
      </div>
      <div className={s.grain} aria-hidden="true" />

      <header className={s.header}>
        <div className={s.brandBlock}>
          <a href="#top" className={s.brand} data-go="hero" onClick={onChapter}>
            Shivraj Talekar
          </a>
          <span className={s.badge}>
            <span className={s.pulse} /> {site.employer.role} @ {site.employer.name}
          </span>
        </div>
        {/* In the header so it can never sit on top of the content. */}
        <button type="button" className={s.playBtn} aria-pressed="false" onClick={() => nav.current.play()}>
          <span className={s.playIcon} aria-hidden="true" />
          <span data-label>Play the story</span>
        </button>
      </header>
      <Radio url={site.radio} />

      <nav className={s.rail} aria-label="Chapters">
        <div className={s.railTrack}>
          <div className={s.railFill} />
        </div>
        <ul>
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} data-go={c.id} onClick={onChapter}>{c.label}</a>
            </li>
          ))}
          <li>
            <a href={site.mailto} target="_blank" rel="noreferrer">Contact ↗</a>
          </li>
        </ul>
      </nav>

      {/* ---------------- Hero ---------------- */}
      <section id="top" data-scene="hero" className={s.scene} style={{ "--bg": BG.hero }}>
        <div className={s.heroText}>
          <p className={s.kicker}>
            Rendering the life of<span className={s.dots} aria-hidden="true"><i>.</i><i>.</i><i>.</i></span>
          </p>
          <h1 className={s.name} aria-label="Shivraj Talekar">
            <span className={s.nameWord}><Chars text="SHIVRAJ" className={s.nameChar} /></span>{" "}
            <span className={s.nameWord}><Chars text="TALEKAR" className={s.nameChar} /></span>
          </h1>
          <p className={s.role}>
            <Words text="AI Product & Solutions Engineer" className={s.roleWord} />
          </p>
        </div>
        <div className={s.mascotWrap}>
          <div className={s.avatar}>
            {/* Inline vector avatar (server-rendered by page.js), so the
                eye zoom never pixelates and its parts can move. */}
            <div className={s.avatarImg}>{avatar}</div>
            <span className={s.hey} aria-hidden="true">hey!</span>
          </div>
        </div>
        <div className={s.heroFade}>
          <p className={s.cue}>
            <span className={s.cueDot} /> Scroll to step inside
            <span className={s.cueKeys}>
              · <kbd>↓</kbd> skips · <kbd>▶</kbd> plays it all
            </span>
          </p>
          <p className={s.heroMeta}>
            Product · Design · Engineering
            <br />
            Builds products people come back to.
          </p>
        </div>
      </section>

      {/* ---------------- Hi ---------------- */}
      <section id="hi" data-scene="hi" className={s.scene} style={{ "--bg": BG.hi }}>
        <DeskScene className={s.scenery} />
        <div className={s.hiStage}>
          <Sparkle style={{ left: "12%", top: "22%" }} />
          <Sparkle style={{ left: "84%", top: "18%" }} />
          <Sparkle style={{ left: "78%", top: "70%", width: 14 }} />
          <Sparkle style={{ left: "20%", top: "74%", width: 12 }} />
          <h2 className={s.hiLine} aria-label={hiText}>
            <Chars text={hiText} className={s.chunkChar} />
          </h2>
          <svg className={s.squiggle} viewBox="0 0 300 24" aria-hidden="true">
            <path d="M4 12 Q22 0 40 12 T76 12 T112 12 T148 12 T184 12 T220 12 T256 12 T292 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <p className={s.hiWork}>
            I work at
            <span className={s.esds}>
              <Image src={esdsLogo} alt="ESDS" className={s.esdsLogo} sizes="80px" />
            </span>
            as an {nowRole?.role ?? site.employer.role}.
          </p>
          <p className={s.bio}>
            I take products from the first question to the hundredth release: research, design,
            build, ship, and round again. Here&apos;s the short version.
          </p>
          <ul className={s.agenda}>
            {AGENDA.map((a, i) => (
              <li key={a.id}>
                <a href={`#${a.id}`} data-go={a.id} onClick={onChapter} className={s.agendaLink}>
                  <b>{pad2(i + 1)}</b> {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Work ---------------- */}
      <section id="work" data-scene="work" className={`${s.scene} ${s.workScene}`} style={{ "--bg": BG.work }}>
        <BeltScene className={s.belt} />
        <div className={s.track}>
          <div className={s.workIntro}>
            <h2 className={s.workTitle}>Selected<br />work</h2>
            <p>Products I&apos;ve researched, designed and shipped, each one a full lap of the lifecycle.</p>
            <Link href="/projects" className={s.inlineLink}>Every project →</Link>
          </div>
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className={s.card} data-wip={p.status ? "" : undefined}>
              {/* the sign's two posts, clamped to the belt on big screens */}
              <span className={s.posts} aria-hidden="true"><i /><i /></span>
              {p.status && (
                <span className={s.wipTag} aria-hidden="true">🚧 Work in progress</span>
              )}
              <span className={s.cardMeta}>
                <span>{p.role}</span>
                <span>
                  {p.status && <em className={s.cardStatus}>{p.status}</em>}
                  {p.year}
                </span>
              </span>
              <span className={s.cardFrame}>
                <Image src={p.image} alt="" className={s.cardImg} sizes="(min-width: 820px) 34vw, 90vw" />
              </span>
              <span className={s.cardTitle}>{p.title}</span>
              <span className={s.cardSummary}>{p.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Experience ---------------- */}
      <section id="exp" data-scene="exp" className={s.scene} style={{ "--bg": BG.exp }}>
        <DataCentreScene className={s.scenery} />
        <div className={s.expStage}>
          {work.map((w) => (
            <div key={w.org} className={s.expGrid}>
              <div className={s.expHead}>
                <p className={s.kicker}>Work experience</p>
                <h2 className={s.expOrg}>{w.org.replace(" Limited", "")}</h2>
                <p className={s.expMeta}>
                  {w.employment} · {w.arrangement} · {rangeOf(w.start, w.end)} · {spanOf(w.start, w.end)}
                </p>
              </div>
              <ol className={s.expRoles}>
                <span className={s.expLine} aria-hidden="true" />
                {w.roles.map((r) => (
                  <li key={r.role} className={s.expRole}>
                    <span className={s.expDot} data-current={r.current ? "" : undefined} aria-hidden="true" />
                    <p className={s.expWhen}>
                      {rangeOf(r.start, r.end)} · {spanOf(r.start, r.end)}
                    </p>
                    <h3 className={s.expTitle}>{r.role}</h3>
                    <p className={s.expWhere}>{r.location}</p>
                    {r.summary && <p className={s.expSummary}>{r.summary}</p>}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Uni ---------------- */}
      <section id="uni" data-scene="uni" className={s.scene} style={{ "--bg": BG.uni }}>
        <NashikScene className={s.scenery} />
        <div className={s.newton} aria-hidden="true">
          <Newton className={s.costumeArt} />
        </div>
        <div className={s.uniStage}>
          <div className={s.uniLeft}>
            <p className={s.kicker}>Academia · Bordi → Nashik</p>
            <h2 className={s.uniBig} aria-label="Class of '26.">
              <span className={s.cityRow}><Chars text="CLASS" className={s.uniChar} /></span>
              <span className={s.cityRow}><Chars text="OF '26." className={s.uniChar} /></span>
            </h2>
            <p className={s.uniSub}>
              {academics.degree.name} · {academics.degree.school}. Four years of building things, and
              leading the people who built them with me.
            </p>
            <div className={s.gradeRow}>
              <span className={s.grade}>
                <b>{academics.degree.cgpa}</b>
                <small>CGPA</small>
              </span>
              <span className={s.grade}>
                <b>1st</b>
                <small>{academics.degree.honours.replace("First ", "")}</small>
              </span>
            </div>
            <div className={s.schoolCard}>
              <p className={s.schoolKicker}>Before that · school days</p>
              <p className={s.schoolName}>
                {academics.school.name}, {academics.school.place}
              </p>
              <ul className={s.schoolChips}>
                {academics.school.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={s.uniRight}>
            <div className={s.uniHeadRow}>
              <p className={s.uniListHead}>Where I led at KKWIEER</p>
              <span className={s.stamp} role="img" aria-label="College life: complete">
                <small>Certified</small>
                <b>College life ✓ complete</b>
                <small>KKWIEER · Class of 2026</small>
              </span>
            </div>
            <ul className={s.uniList}>
              {college.map((c) => (
                <li key={`${c.role}-${c.org}`} className={s.uniRow}>
                  <strong>{c.role}</strong>
                  <span>{c.org}</span>
                  <em>{c.duration}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Tour ---------------- */}
      <section id="tour" data-scene="tour" className={`${s.scene} ${s.tourScene}`} style={{ "--bg": BG.tour }}>
        <div className={s.tourUfo} aria-hidden="true">
          <Ufo uid="tour" className={s.ufoArt} />
        </div>
        <div className={s.tourText}>
          <p className={s.kicker}>Story time</p>
          <h2 className={s.tourTitle}>Wanna know why I love product?</h2>
          <p className={s.tourSub}>
            Hop in. Captain Shivraj is flying you round the product lifecycle, one planet at a time.
            The bigger the planet, the more of my work lives there.
          </p>
          <button type="button" className={`${s.skipBtn} ${s.skipTour}`} onClick={() => nav.current.skipSolar?.()}>
            In a hurry? Skip the lifecycle <span aria-hidden="true">⏭</span>
          </button>
        </div>
      </section>

      {/* ---------------- Solar ---------------- */}
      <section id="solar" data-scene="solar" className={`${s.scene} ${s.solarScene}`} style={{ "--bg": BG.solar }}>
        <div className={s.solarHead}>
          <p className={s.kicker}>The product lifecycle · tap a planet</p>
          <h2 className={s.solarTitle}>Everything I build orbits one thing.</h2>
        </div>
        <div className={s.system}>
          <div className={s.solarStage}>
            <div className={s.camera}>
              {PHASES.map((p) => (
                <span key={p.name} className={s.orbit} aria-hidden="true" />
              ))}
              <div className={s.sun}>
                <span>Product</span>
              </div>
              {PHASES.map((p, i) => (
                <div key={p.name} className={s.planet} style={{ "--c": p.color, "--k": SIZE_OF[p.focus] }}>
                  <button type="button" className={s.planetBody} aria-label={`Visit ${p.name}`} onClick={() => nav.current.to(i)}>
                    <span className={s.planetDot}>
                      <PlanetArt kind={p.kind} c={p.color} uid={i} className={s.planetArt} />
                    </span>
                    <span className={s.planetName}>
                      <b>{pad2(i + 1)}</b> {p.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.panels}>
          {PHASES.map((p, i) => (
            <article key={p.name} className={s.planetPanel} style={{ "--c": p.color }}>
              <PhaseScene name={p.name} className={s.panelArt} />
              <div className={s.panelText}>
                <p className={s.panelKicker}>
                  Planet {pad2(i + 1)} / {pad2(PHASES.length)} · {p.name}
                  <span className={s.focus} aria-label={`Focus ${p.focus} of 5`}>
                    {Array.from({ length: 5 }, (_, k) => (
                      <i key={k} data-on={k < p.focus ? "" : undefined} />
                    ))}
                  </span>
                </p>
                <h3 className={s.panelBelief}>{p.belief}</h3>
                <p className={s.panelBody}>{p.body}</p>
                <ul className={s.toolkit} aria-label={`Tools for ${p.name}`}>
                  {(toolkit[p.name] ?? []).map((t) => (
                    <li key={t.name} className={s.tool}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d={t.path} fill={t.hex} />
                      </svg>
                      {t.name}
                    </li>
                  ))}
                </ul>
                <p className={s.panelScene}>On site: {p.scene}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={s.ufoPos} aria-hidden="true">
          <Ufo uid="solar" className={s.ufoArt} />
        </div>
        <nav className={s.planetNav} aria-label="Lifecycle phases">
          <button type="button" className={s.tourBtn} aria-pressed="false" onClick={() => nav.current.tour()}>
            ▶ Play tour
          </button>
          <button type="button" className={s.navArrow} aria-label="Previous phase" onClick={() => nav.current.step(-1)}>
            ←
          </button>
          {PHASES.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className={s.navDot}
              style={{ "--c": p.color }}
              aria-label={`Go to ${p.name}`}
              title={p.name}
              onClick={() => nav.current.to(i)}
            >
              {pad2(i + 1)}
            </button>
          ))}
          <button type="button" className={s.navArrow} aria-label="Next phase" onClick={() => nav.current.step(1)}>
            →
          </button>
          <span className={s.keyHint}>
            Tip: use <kbd>←</kbd> <kbd>→</kbd> to hop planets
          </span>
          <button type="button" className={s.skipBtn} onClick={() => nav.current.skipSolar?.()}>
            Skip <span aria-hidden="true">⏭</span>
          </button>
        </nav>
      </section>

      {/* ---------------- Blogs ---------------- */}
      <section id="blogs" data-scene="blogs" className={s.scene} style={{ "--bg": BG.blogs }}>
        <PlanesScene className={s.scenery} />
        <Cobweb corner="tl" className={`${s.cobweb} ${s.webTL}`} />
        {/* outer: drops down the thread on scroll; inner: idle sway */}
        <div className={s.spideyHang} aria-hidden="true">
          <div className={s.spideySway}>
            <Spidey pose="hang" uid="blogs" className={s.spideyArt} />
          </div>
        </div>
        <div className={s.blogStage}>
          <div className={s.blogHead}>
            <p className={s.kicker}>Field notes</p>
            <h2 className={s.serifHead}>I write things down.</h2>
            <p className={s.blogLinks}>
              <a href={site.medium} target="_blank" rel="noreferrer">All posts on Medium →</a>
              <Link href="/blogs">Blog index</Link>
            </p>
          </div>
          <div className={s.blogGrid}>
            {blogs.map((b) => (
              <a key={b.url} href={b.url} target="_blank" rel="noreferrer" className={s.blogCard}>
                <span className={s.blogFrame}>
                  <BlogArt url={b.url} className={s.blogImg} />
                </span>
                <span className={s.blogMeta}>
                  {b.dateLabel} · {b.readingTime} read
                </span>
                <span className={s.blogTitle}>{b.title}</span>
                <span className={s.blogDesc}>{b.description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Finale ---------------- */}
      <section id="finale" data-scene="finale" className={`${s.scene} ${s.finale}`} style={{ "--bg": BG.finale }}>
        {DOODLES.map((d) => (
          <span key={d.k} className={s.doodle} style={{ left: d.x, top: d.y }}>
            <Doodle k={d.k} />
          </span>
        ))}
        <div className={s.finaleGrid}>
          {/* the builder and the thinker, either side of the pitch */}
          <div className={`${s.costume} ${s.costumeL}`} aria-hidden="true">
            <Armour className={s.costumeArt} />
          </div>
          <div className={`${s.costume} ${s.costumeR}`} aria-hidden="true">
            <Einstein className={s.costumeArt} />
          </div>
          <div className={s.finalePitch}>
            <p className={s.kicker}>That&apos;s the whole head</p>
            <h2 className={s.serifHead} aria-label="Got a product to build? Let's make it boring.">
              <span className={s.ctaMask}><Words text="Got a product to build?" className={s.ctaWord} /></span>{" "}
              <span className={s.ctaMask}><Words text="Let's make it boring." className={s.ctaWord} /></span>
            </h2>
            <p className={s.finaleBody}>
              Reliable is boring. Boring is the goal. If you&apos;re building something that has to work for
              real people, let&apos;s talk.
            </p>
            <p className={s.ctaBtns}>
              <a href={site.mailto} target="_blank" rel="noreferrer" className={s.btn}>Say hello</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className={s.btnGhost}>LinkedIn</a>
              <a href={site.socials[0].href} target="_blank" rel="noreferrer" className={s.btnGhost}>GitHub</a>
            </p>
          </div>
          <div className={s.finaleAbout}>
            <h3 className={s.finaleNote}>I care about the part nobody demos.</h3>
            <p className={s.aboutLead}>
              The onboarding nobody notices, the error message that actually helps, the loading state,
              the second visit. The work that decides whether people come back.
            </p>
            <ul className={s.chips}>
              {stackNames.map((n) => (
                <li key={n} className={s.chip}>{n}</li>
              ))}
            </ul>
            <p className={s.aboutLinks}>
              <a href={site.medium} target="_blank" rel="noreferrer">Medium</a>
              {site.socials.map((x) => (
                <a key={x.label} href={x.href} target="_blank" rel="noreferrer">{x.label}</a>
              ))}
            </p>
          </div>
        </div>
        <footer className={s.finaleFoot}>
          <a href="#top" data-go="hero" onClick={onChapter} className={s.topLink}>↑ Back to the avatar</a>
          <span className={s.copy}>© {new Date().getFullYear()} {site.name} · {site.employer.role} @ {site.employer.name}</span>
        </footer>
      </section>
    </div>
  );
}
