"use client";

import { useState } from "react";
import s from "./Story.module.css";

/* Shivraj FM: a playlist in the corner of the page, like a radio left
   on in the next room. Three modes:
     min      a cassette tape, nothing else
     cassette the tape plus a compact player (reels spin)
     poster   a gig poster with the full playlist
   The provider's own embed does the playing, so visitors signed in to
   Apple Music / Spotify hear full tracks and everyone else hears the
   provider's previews. The iframe is created the first time the radio
   opens and is never unmounted after that: switching modes only
   resizes it, so the music keeps going. */

/** Turns a normal share link into the provider's embed URL. */
export function toEmbed(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    // Accept both the share link and an already-embedded link.
    if (u.hostname === "music.apple.com" || u.hostname === "embed.music.apple.com") {
      return { src: `https://embed.music.apple.com${u.pathname}${u.search}`, compact: 175, full: 450, provider: "Apple Music" };
    }
    if (u.hostname === "open.spotify.com") {
      const path = u.pathname.replace(/^\/(intl-[a-z]+\/)?/, "/");
      return { src: `https://open.spotify.com/embed${path}?theme=0`, compact: 152, full: 352, provider: "Spotify" };
    }
  } catch {
    return null;
  }
  return null;
}

function Cassette({ spinning }) {
  const reel = (cx) => (
    <g className={spinning ? s.reelSpin : undefined} style={{ transformOrigin: `${cx}px 38px` }}>
      <circle cx={cx} cy="38" r="11" fill="#f4efe6" stroke="#15131f" strokeWidth="2" />
      {[0, 60, 120].map((a) => (
        <rect key={a} x={cx - 1.5} y="29" width="3" height="18" rx="1.5" fill="#15131f" transform={`rotate(${a} ${cx} 38)`} />
      ))}
      <circle cx={cx} cy="38" r="3.5" fill="#15131f" />
    </g>
  );
  return (
    <svg viewBox="0 0 120 76" className={s.cassette} aria-hidden="true">
      <rect x="2" y="2" width="116" height="72" rx="8" fill="#2a2433" stroke="#e9e4ff" strokeWidth="2" />
      <rect x="10" y="8" width="100" height="22" rx="3" fill="#ffd166" />
      <text x="60" y="23" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15131f" letterSpacing="1.5" fontFamily="Arial, sans-serif">
        SHIVRAJ FM
      </text>
      <rect x="28" y="28" width="64" height="20" rx="10" fill="#15131f" />
      {reel(40)}
      {reel(80)}
      <path d="M30 74 L36 60 H84 L90 74" fill="#1d1927" stroke="#e9e4ff" strokeWidth="1.5" />
      {[[9, 9], [111, 9], [9, 67], [111, 67]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill="#e9e4ff" opacity="0.7" />
      ))}
    </svg>
  );
}

export default function Radio({ url, title = "Shivraj FM" }) {
  const embed = toEmbed(url);
  const [mode, setMode] = useState("min");
  const [loaded, setLoaded] = useState(false);
  if (!embed) return null;

  const open = (m) => {
    setLoaded(true);
    setMode(m);
  };
  const isOpen = mode !== "min";

  return (
    <div className={s.radio} data-mode={mode}>
      <button
        type="button"
        className={s.tapeBtn}
        onClick={() => open(isOpen ? "min" : "cassette")}
        aria-expanded={isOpen}
        aria-controls="shivraj-fm"
        aria-label={isOpen ? "Minimise Shivraj FM" : "Open Shivraj FM"}
        title={title}
      >
        <Cassette spinning={isOpen} />
      </button>

      <div className={s.radioPanel} aria-hidden={!isOpen} id="shivraj-fm">
        {mode === "poster" && (
          <div className={s.poster} aria-hidden="true">
            <span className={s.posterKicker}>Now spinning · {embed.provider}</span>
            <span className={s.posterTitle}>Shivraj FM</span>
            <span className={s.posterSub}>Favourite songs, on rotation. Code to this.</span>
          </div>
        )}
        <div className={s.radioHead}>
          <span>
            <strong>{title}</strong> · {mode === "poster" ? "poster mode" : "cassette mode"}
          </span>
          <span className={s.radioCtrls}>
            {mode === "poster" ? (
              <button type="button" onClick={() => setMode("cassette")} aria-label="Shrink to cassette mode" title="Cassette mode">
                ▭
              </button>
            ) : (
              <button type="button" onClick={() => open("poster")} aria-label="Maximise to poster mode" title="Poster mode">
                ⤢
              </button>
            )}
            <button type="button" onClick={() => setMode("min")} aria-label="Minimise" title="Minimise">
              —
            </button>
          </span>
        </div>
        {loaded && (
          <iframe
            title={`${title} playlist`}
            src={embed.src}
            height={mode === "poster" ? embed.full : embed.compact}
            loading="lazy"
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          />
        )}
      </div>
    </div>
  );
}
