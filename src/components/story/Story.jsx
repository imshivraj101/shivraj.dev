"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { PhaseScene } from "./Egypt";
import Radio from "./Radio";
import { DeskScene, NashikScene, DataCentreScene, BeltScene, PlanesScene } from "./Scenery";
import { site } from "../../data/site";
import { work, college, rangeOf, spanOf } from "../../data/experience";
import { stackNames } from "../../data/stack";
import { projects } from "../../data/projects";
import { blogs } from "../../data/blogs";
import { toolkit } from "../../data/toolkit";
import s from "./Story.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

/* One colour per chapter. The fixed backdrop tweens between these as
   each pinned scene takes the stage; with reduced motion each section
   simply paints its own. */
const BG = {
  hero: "#252a5f", // sampled from the avatar's sky so its edges disappear
  solar: "#110e26",
  hi: "#6e3a63",
  uni: "#4a2333",
  exp: "#1f3b52",
  work: "#8a5a1e",
  cta: "#1c3a4a",
  about: "#1e3550",
  blogs: "#2b1f3d",
  outro: "#252a5f",
};

const CHAPTERS = [
  { id: "hero", label: "Hello" },
  { id: "solar", label: "Lifecycle" },
  { id: "uni", label: "Uni" },
  { id: "exp", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "blogs", label: "Blogs" },
  { id: "about", label: "About" },
];

/* The product lifecycle as a solar system: the product is the sun and
   each phase is a planet, innermost first. Landing on a planet opens
   its pyramid-site scene and the belief it stands for. */
const PHASES = [
  {
    name: "Plan",
    color: "#7bdcb5",
    belief: "Start with the why.",
    body: "Before anyone touches a tool, I want one sentence: who is this for, and what changes for them. If we can’t write it, we’re not ready to build it.",
    scene: "the pharaoh points at the plan; the scribe asks who the pyramid is for.",
  },
  {
    name: "Analysis",
    color: "#8fa8ff",
    belief: "Measure the ground before you lay a stone.",
    body: "Requirements come from users and data, not from the loudest voice in the room. Constraints found now are cheap; found later, they’re rebuilds.",
    scene: "surveyors rope out the site by starlight. Something is watching.",
  },
  {
    name: "Design",
    color: "#ff7a59",
    belief: "Design is the cheapest place to be wrong.",
    body: "A sketch costs minutes, a migration costs months. I argue about flows and structure on paper, so the build becomes the boring part.",
    scene: "the architect checks the elevation before a single block moves.",
  },
  {
    name: "Development",
    color: "#f4a3c9",
    belief: "Ship in blocks, not boulders.",
    body: "Small, reviewable pieces that each stand on their own. Big-bang launches are how pyramids end up as rubble.",
    scene: "one block at a time up the ramp, with someone watching the line.",
  },
  {
    name: "AI/ML",
    color: "#f0a6ff",
    belief: "Use AI where it earns its place.",
    body: "Not every feature needs a model. I reach for AI when it removes real friction or does what plain rules can’t — and keep the craft, the judgment and the last word human.",
    scene: "the machine lifts the heaviest stone; the carving stays by hand.",
  },
  {
    name: "Testing",
    color: "#b8e05a",
    belief: "Tap every stone before anyone climbs.",
    body: "The empty state, the slow network, the user who does it backwards. The happy path is the one case I worry about least.",
    scene: "the inspector finds the cracked block before the tourists do.",
  },
  {
    name: "Deployment",
    color: "#5ec8e5",
    belief: "Launch with a way back.",
    body: "CI/CD, staged rollouts and a rollback plan written before it’s needed. The capstone goes on last, and carefully.",
    scene: "the capstone is delivered. Nobody asks by whom.",
  },
  {
    name: "Maintenance",
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

const DOODLES = [
  { k: "brackets", x: "8%", y: "18%" },
  { k: "pyramid", x: "82%", y: "14%" },
  { k: "chat", x: "86%", y: "62%" },
  { k: "chai", x: "10%", y: "70%" },
  { k: "terminal", x: "22%", y: "84%" },
  { k: "spark", x: "70%", y: "84%" },
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

function Rings({ className }) {
  return (
    <svg className={className} viewBox="0 0 1000 1000" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx="500" cy="500" r={40 + i * 40} fill="none" stroke="rgba(233,228,255,0.28)" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default function Story({ fonts, avatar }) {
  const root = useRef(null);
  // Filled in by the effect: jump straight to a planet's card.
  const nav = useRef({ to: () => {}, step: () => {}, tour: () => {}, play: () => {}, go: null });

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
    const applyCamera = () => {
      const f = journey.f;
      const dot = planets[0].querySelector(`.${s.planetDot}`).offsetWidth || 40;
      const Z = Math.min(12, Math.max(3, (Math.min(window.innerWidth, window.innerHeight) * 0.55) / dot));
      let z = 1;
      let fx = 0;
      let fy = 0;
      let open = -1;
      let show = 0;
      let t = 0;
      if (f >= 0 && f < PHASES.length) {
        const i = Math.floor(f);
        const u = f - i;
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
    };
    const orbitTick = (time, deltaMs) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      if (!journey.lock) journey.f += (journey.target - journey.f) * Math.min(1, dt * 3.2);
      // Planets slow right down while the camera is visiting one.
      placeOrbits(journey.f >= 0 && journey.f < PHASES.length ? dt * 0.2 : dt);
      applyCamera();
    };
    const onResize = () => placeOrbits();
    placeOrbits();
    window.addEventListener("resize", onResize);

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
          .from(`.${s.mascotWrap}`, { yPercent: 70, duration: 1.2, ease: "back.out(1.4)" }, 0)
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
        const scene = (id, end, build, extra = {}) => {
          const sec = q(`[data-scene="${id}"]`);
          // A scene taller than the screen (About on a phone, anything on
          // a landscape phone) can't be pinned without clipping, so it
          // scrolls normally and plays as it passes through view.
          const fits = sec.offsetHeight <= window.innerHeight + 2;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id,
              trigger: sec,
              start: fits ? "top top" : "top 85%",
              end: fits ? end : "bottom 35%",
              pin: fits,
              scrub: 1,
              onEnter: () => setBg(BG[id]),
              onEnterBack: () => setBg(BG[id]),
              onLeave: () => setBg(nextBg(id)),
              ...extra,
            },
          });
          build(tl, (sel) => sec.querySelector(sel), (sel) => gsap.utils.toArray(sec.querySelectorAll(sel)));
          return tl;
        };

        // Hero: the camera dives straight into his pupil. Nothing is
        // faked: the whole vector face scales in proportion until the
        // dark of the eye fills the screen, and that dark becomes space.
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
              setBg(inside ? BG.solar : BG.hero);
            }
          },
        });

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
          .from(q(`.${s.solarHead}`), { y: 30, opacity: 0, duration: 0.3 }, 0.6);
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
            .from($(`.${s.bio}`), { y: 30, opacity: 0, duration: 0.25 })
            .to({}, { duration: 0.35 })
            .to([$(`.${s.bio}`), $(`.${s.squiggle}`), ...$$(`.${s.sparkle}`)], { opacity: 0, duration: 0.15 })
            .to($(`.${s.hiLine}`), { scale: 7, opacity: 0, duration: 0.6, ease: "power2.in" }, "<")
            .to($(`.${s.scenery}`), { y: 60, opacity: 0, duration: 0.3 }, "<");
        });

        // Uni: one compact screen, then college life is stamped done.
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
            .from($$(`.${s.uniRow}`), { y: 24, opacity: 0, stagger: 0.05, duration: 0.2 }, "<0.1")
            .from($(`.${s.stamp}`), { scale: 2.4, rotation: -30, opacity: 0, duration: 0.2, ease: "back.out(2)" })
            .to({}, { duration: 0.3 })
            .to([$(`.${s.uniStage}`), $(`.${s.scenery}`)], { y: -40, opacity: 0, duration: 0.2 });
        });

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
            .to({}, { duration: 0.35 })
            .to([$(`.${s.expStage}`), $(`.${s.scenery}`)], { y: -40, opacity: 0, duration: 0.2 });
        });

        // Work: a horizontal reel on wide screens, a plain stack on narrow.
        if (wide) {
          const track = q(`.${s.track}`);
          const dist = () => track.scrollWidth - window.innerWidth;
          scene("work", () => `+=${dist()}`, (tl, $, $$) => {
            tl.to(track, { x: () => -dist(), duration: 1 });
            // The belt rolls with the reel.
            tl.to($$('[data-sc="roller"]'), { rotation: -1440, transformOrigin: "50% 50%", duration: 1 }, 0)
              .to($$('[data-sc="gear"]'), { rotation: -540, transformOrigin: "50% 50%", duration: 1 }, 0)
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

        // CTA: doodles pop in around the ask.
        scene("cta", "+=170%", (tl, $, $$) => {
          tl.from($$(`.${s.ctaWord}`), { yPercent: 100, opacity: 0, stagger: 0.05, duration: 0.3 })
            .from($$(`.${s.doodle}`), { scale: 0, rotation: -40, opacity: 0, stagger: 0.06, duration: 0.25, ease: "back.out(2.2)" }, "<0.1")
            .from($$(`.${s.ctaBody} > *`), { y: 20, opacity: 0, stagger: 0.08, duration: 0.2 })
            .to({}, { duration: 0.4 })
            .to($(`.${s.ctaStage}`), { opacity: 0, y: -40, duration: 0.25 })
            .to($$(`.${s.doodle}`), { y: (i) => (i % 2 ? -200 : 200), opacity: 0, duration: 0.25 }, "<");
        });
        qa(`.${s.doodle}`).forEach((d, i) => {
          gsap.to(d.firstChild, { y: 8 + (i % 3) * 4, rotation: i % 2 ? 6 : -6, duration: 1.6 + (i % 3) * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
        });

        // About: the closing statement and the facts behind it.
        scene("about", "+=150%", (tl, $, $$) => {
          tl.fromTo($$(`.${s.word}`), { opacity: 0.12 }, { opacity: 1, stagger: 0.05, duration: 0.2 })
            .from($(`.${s.aboutLead}`), { y: 20, opacity: 0, duration: 0.2 })
            .from($$(`.${s.chip}`), { scale: 0.6, opacity: 0, stagger: 0.02, duration: 0.15, ease: "back.out(2)" })
            .from($$(`.${s.aboutLinks} a`), { y: 10, opacity: 0, stagger: 0.05, duration: 0.15 });
        });

        // Blogs: the notes rise in one after another.
        scene("blogs", "+=130%", (tl, $, $$) => {
          tl.from($$(`.${s.blogHead} > *`), { y: 24, opacity: 0, stagger: 0.06, duration: 0.2 })
            .from($(`.${s.blogCard}`), { y: 60, opacity: 0, stagger: 0.1, duration: 0.3 }, "<0.1");
          // Paper planes fly their dashed trails across the notes.
          undraw($$('[data-sc="draw"]'));
          tl.to($$('[data-sc="draw"]'), { strokeDashoffset: 0, stagger: 0.1, duration: 0.6 }, 0);
          $$('[data-sc="plane"]').forEach((pl, i) => {
            tl.to(pl, { motionPath: { path: pl.dataset.path, autoRotate: true }, duration: 0.8, ease: "none" }, i * 0.1);
          });
        });

        // Outro: the rings come back and close the loop.
        scene("outro", "+=120%", (tl, $) => {
          tl.fromTo($(`.${s.outroRings}`), { scale: 2.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 })
            .from($(`.${s.outroText}`), { y: 30, opacity: 0, duration: 0.3 }, 0.3);
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
        const HOLD_AT = { hi: 0.55, uni: 0.62, exp: 0.62, cta: 0.62, about: 0.95, blogs: 0.75, outro: 0.95 };
        const stops = () => {
          const get = (id) => ScrollTrigger.getById(id);
          const at = (st, f) => st.start + f * (st.end - st.start);
          const out = [{ y: 0, hold: 1.6 }];
          const sol = get("solar");
          if (sol) {
            out.push({ y: at(sol, JOURNEY_IN), hold: 1.4 });
            PHASES.forEach((_, i) => out.push({ y: at(sol, JOURNEY_IN + ((i + 0.5) / N) * JOURNEY_LEN), hold: 2.6 }));
          }
          ["hi", "uni", "exp"].forEach((id) => get(id) && out.push({ y: at(get(id), HOLD_AT[id]), hold: 2.4 }));
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
            qa(`.${s.card}`).forEach((c) => out.push({ y: c.getBoundingClientRect().top + window.scrollY - 90, hold: 1.6 }));
          }
          ["cta", "about", "blogs", "outro"].forEach((id) => get(id) && out.push({ y: at(get(id), HOLD_AT[id]), hold: 2.4 }));
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
    const st = ScrollTrigger.getById(id);
    const target = st ? st.start + 2 : document.querySelector(`[data-scene="${id}"]`)?.offsetTop ?? 0;
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
            <span className={s.pulse} /> {site.employer.role.replace("Artificial Intelligence", "AI")} @ {site.employer.name}
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

      {/* ---------------- Solar ---------------- */}
      <section id="solar" data-scene="solar" className={`${s.scene} ${s.solarScene}`} style={{ "--bg": BG.solar }}>
        <div className={s.solarHead}>
          <p className={s.kicker}>Inside: the product lifecycle</p>
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
                <div key={p.name} className={s.planet} style={{ "--c": p.color }} aria-hidden="true">
                  <div className={s.planetBody}>
                    <span className={s.planetDot}>{pad2(i + 1)}</span>
                    <span className={s.planetName}>{p.name}</span>
                  </div>
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
        </nav>
      </section>

      {/* ---------------- Hi ---------------- */}
      <section data-scene="hi" className={s.scene} style={{ "--bg": BG.hi }}>
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
          <p className={s.bio}>
            {nowRole?.role} at {site.employer.name}. I take products from the first question to the
            hundredth release: research, design, build, ship, and round again.
          </p>
        </div>
      </section>

      {/* ---------------- Uni ---------------- */}
      <section id="uni" data-scene="uni" className={s.scene} style={{ "--bg": BG.uni }}>
        <NashikScene className={s.scenery} />
        <div className={s.uniStage}>
          <div className={s.uniLeft}>
            <p className={s.kicker}>Uni life · Nashik</p>
            <h2 className={s.uniBig} aria-label="Class of '26.">
              <span className={s.cityRow}><Chars text="CLASS" className={s.uniChar} /></span>
              <span className={s.cityRow}><Chars text="OF '26." className={s.uniChar} /></span>
            </h2>
            <p className={s.uniSub}>
              B.Tech Computer Science &amp; Design · KKWIEER, Nashik. Four years of building things,
              and leading the people who built them with me.
            </p>
          </div>
          <div className={s.uniRight}>
            <p className={s.uniListHead}>Where I led</p>
            <ul className={s.uniList}>
              {college.map((c) => (
                <li key={`${c.role}-${c.org}`} className={s.uniRow}>
                  <strong>{c.role}</strong>
                  <span>{c.org}</span>
                  <em>{c.duration}</em>
                </li>
              ))}
            </ul>
            <span className={s.stamp} aria-label="College life: complete">College life ✓ complete</span>
          </div>
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
            <Link key={p.slug} href={`/projects/${p.slug}`} className={s.card}>
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

      {/* ---------------- Blogs ---------------- */}
      <section id="blogs" data-scene="blogs" className={s.scene} style={{ "--bg": BG.blogs }}>
        <PlanesScene className={s.sky} />
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
                  <Image src={b.image} alt="" className={s.blogImg} sizes="(min-width: 820px) 30vw, 90vw" />
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

      {/* ---------------- CTA ---------------- */}
      <section data-scene="cta" className={s.scene} style={{ "--bg": BG.cta }}>
        {DOODLES.map((d) => (
          <span key={d.k} className={s.doodle} style={{ left: d.x, top: d.y }}>
            <Doodle k={d.k} />
          </span>
        ))}
        <div className={s.ctaStage}>
          <h2 className={s.serifHead} aria-label="Got a product to build? Let's make it boring.">
            <span className={s.ctaMask}><Words text="Got a product to build?" className={s.ctaWord} /></span>
            <br />
            <span className={s.ctaMask}><Words text="Let's make it boring." className={s.ctaWord} /></span>
          </h2>
          <div className={s.ctaBody}>
            <p>Reliable is boring. Boring is the goal. If you&apos;re building something that has to work for real people, let&apos;s talk.</p>
            <p className={s.ctaBtns}>
              <a href={site.mailto} target="_blank" rel="noreferrer" className={s.btn}>Say hello</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className={s.btnGhost}>LinkedIn</a>
              <a href={site.socials[0].href} target="_blank" rel="noreferrer" className={s.btnGhost}>GitHub</a>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- About ---------------- */}
      <section id="about" data-scene="about" className={s.scene} style={{ "--bg": BG.about }}>
        <div className={s.about}>
          <h2 className={s.serifHead} aria-label="I care about the part nobody demos.">
            <Words text="I care about the part nobody demos." className={s.word} />
          </h2>
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
            <a href={site.medium} target="_blank" rel="noreferrer">Read on Medium</a>
            <Link href="/blogs">Blog</Link>
            {site.socials.map((x) => (
              <a key={x.label} href={x.href} target="_blank" rel="noreferrer">{x.label}</a>
            ))}
          </p>
        </div>
      </section>

      {/* ---------------- Outro ---------------- */}
      <section data-scene="outro" className={s.scene} style={{ "--bg": BG.outro }}>
        <Rings className={s.outroRings} />
        <div className={s.outroText}>
          <p className={s.kicker}>That&apos;s the whole head.</p>
          <a href="#top" className={s.btn} data-go="hero" onClick={onChapter}>Back to the top</a>
          <p className={s.copy}>© {new Date().getFullYear()} {site.name}</p>
        </div>
      </section>
    </div>
  );
}
