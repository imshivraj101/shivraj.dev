/* Space props for the lifecycle tour: the UFO Shivraj pilots in his
   straw-hat space-pirate get-up, and the planets themselves. Every
   planet is drawn as a real little world (oceans, bands, rings,
   craters, storms) in its phase colour; how big it is says how much of
   the work lives in that phase. */
import pilot from "../../assets/pilot.webp";

const INK = "#15131f";

/** Mix two #rrggbb colours; t = share of b. */
function mix(a, b, t) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (sh) => Math.round(((pa >> sh) & 255) * (1 - t) + ((pb >> sh) & 255) * t);
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}

/** The pilot's saucer, flown by Shivraj in a straw hat and a red
    space suit. `uid` keeps the SVG ids unique per instance. */
export function Ufo({ uid, className }) {
  const dome = `ufo-dome-${uid}`;
  const beam = `ufo-beam-${uid}`;
  const hull = `ufo-hull-${uid}`;
  return (
    <svg className={className} viewBox="0 -6 260 236" overflow="visible" aria-hidden="true">
      <defs>
        <clipPath id={dome}>
          <circle cx="120" cy="80" r="80" />
        </clipPath>
        <linearGradient id={beam} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9a3" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffe9a3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={hull} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef0ff" />
          <stop offset="1" stopColor="#9aa0c8" />
        </linearGradient>
      </defs>

      {/* tractor beam */}
      <path className="ufo-beam" d="M92 160 L148 160 L196 230 L44 230 Z" fill={`url(#${beam})`} />

      {/* pirate flag on its mast: a ringed planet over crossed bones */}
      <g className="ufo-flag">
        <line x1="206" y1="142" x2="214" y2="52" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <path d="M214 52 L256 58 L250 70 L256 82 L214 84 Z" fill={INK} />
        <path d="M222 78 L246 62 M222 62 L246 78" stroke="#f4efe6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="234" cy="68" r="7" fill="#f4efe6" />
        <ellipse cx="234" cy="68" rx="12" ry="3.4" fill="none" stroke="#f4efe6" strokeWidth="2" transform="rotate(-18 234 68)" />
      </g>

      {/* glass dome with the pilot inside: head, straw hat, and a red
          space suit (high collar, yellow trim, gloves) down to the rim */}
      <g clipPath={`url(#${dome})`}>
        <rect x="30" y="-10" width="180" height="180" fill="#1c2152" />
        <image href={pilot.src} x="74" y="18" width="92" height="92" />
        {/* suit: shoulders, trim, then the high collar over the chin */}
        <path d="M58 150 Q60 104 94 96 L146 96 Q180 104 182 150 Z" fill="#d62828" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M106 102 V150 M134 102 V150 M70 122 Q86 106 104 102 M136 102 Q154 106 170 122" stroke="#ffcf3f" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M94 106 L95 88 Q120 104 145 88 L146 106 Q120 114 94 106 Z" fill="#d62828" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M96 90 Q120 105 144 90" stroke="#ffcf3f" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* waving arm */}
        <g className="ufo-wave">
          <path d="M164 116 L182 76" stroke={INK} strokeWidth="22" strokeLinecap="round" />
          <path d="M164 116 L182 76" stroke="#d62828" strokeWidth="15" strokeLinecap="round" />
          <path d="M166 106 L176 84" stroke="#ffcf3f" strokeWidth="3" strokeLinecap="round" />
          <circle cx="183" cy="68" r="11" fill="#9e1f1f" stroke={INK} strokeWidth="3" />
        </g>
        {/* straw hat: crown, red band, wide brim */}
        <path d="M90 36 Q90 8 120 8 Q150 8 150 36 Z" fill="#f2c94c" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M91 28 Q120 22 149 28 L150 36 Q120 32 90 36 Z" fill="#e63946" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <ellipse cx="120" cy="37" rx="50" ry="9" fill="#f2c94c" stroke={INK} strokeWidth="3" />
        <path d="M80 37 h8 M100 41 h10 M130 41 h10 M152 37 h7" stroke="#c9971f" strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle cx="120" cy="80" r="80" fill="rgba(170,220,255,0.12)" stroke={INK} strokeWidth="4" />
      <path d="M62 52 Q76 16 114 6" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="6" strokeLinecap="round" />

      {/* saucer */}
      <ellipse cx="120" cy="158" rx="104" ry="26" fill="#6f75a6" stroke={INK} strokeWidth="4" />
      <ellipse cx="120" cy="146" rx="114" ry="22" fill={`url(#${hull})`} stroke={INK} strokeWidth="4" />
      {[22, 52, 86, 120, 154, 188, 218].map((x, i) => (
        <circle
          key={x}
          className="ufo-light"
          cx={x}
          cy={i === 0 || i === 6 ? 150 : 156}
          r="6"
          fill={i % 2 ? "#ff7a59" : "#ffd166"}
          stroke={INK}
          strokeWidth="2.5"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </svg>
  );
}

/* Surface details per planet, drawn in a 100x100 box around (50, 50). */
function Surface({ kind, c }) {
  const lo = mix(c, "#1a1440", 0.45);
  const hi = mix(c, "#ffffff", 0.45);
  switch (kind) {
    case "earth": // Plan: oceans, continents and weather
      return (
        <>
          <rect width="100" height="100" fill="#2b7fa3" />
          <path d="M14 30 Q26 18 40 24 Q48 34 38 42 Q30 52 18 46 Q8 40 14 30 Z" fill={c} />
          <path d="M56 50 Q70 40 82 50 Q90 64 78 74 Q66 84 58 72 Q50 62 56 50 Z" fill={c} />
          <path d="M30 70 Q38 64 44 72 Q42 82 32 80 Z" fill={c} />
          <path d="M8 58 Q30 52 48 58 M52 26 Q70 20 92 28" stroke="#fff" strokeOpacity="0.75" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      );
    case "survey": // Analysis: an icy world under a measuring grid
      return (
        <>
          <rect width="100" height="100" fill={c} />
          {[[30, 32, 9], [66, 60, 12], [40, 72, 6], [72, 28, 5]].map(([x, y, r]) => (
            <g key={`${x}${y}`}>
              <circle cx={x} cy={y} r={r} fill={lo} />
              <circle cx={x - r * 0.2} cy={y - r * 0.2} r={r * 0.75} fill={mix(c, "#1a1440", 0.25)} />
            </g>
          ))}
          <g fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5">
            <ellipse cx="50" cy="50" rx="48" ry="16" />
            <ellipse cx="50" cy="50" rx="16" ry="48" />
            <ellipse cx="50" cy="50" rx="34" ry="48" />
          </g>
        </>
      );
    case "ringed": // Design: Saturn's banding
      return (
        <>
          <rect width="100" height="100" fill={c} />
          {[18, 34, 52, 68, 84].map((y, i) => (
            <rect key={y} x="0" y={y} width="100" height={i % 2 ? 7 : 10} fill={i % 2 ? hi : lo} opacity="0.7" />
          ))}
        </>
      );
    case "giant": // Development: Jupiter's belts and great storm
      return (
        <>
          <rect width="100" height="100" fill={hi} />
          {[14, 30, 46, 62, 78].map((y, i) => (
            <path
              key={y}
              d={`M0 ${y} Q25 ${y - 4} 50 ${y} T100 ${y} V${y + (i % 2 ? 7 : 11)} Q75 ${y + (i % 2 ? 11 : 15)} 50 ${y + (i % 2 ? 7 : 11)} T0 ${y + (i % 2 ? 7 : 11)} Z`}
              fill={i % 2 ? c : mix(c, "#7a2e4f", 0.35)}
            />
          ))}
          <ellipse cx="64" cy="64" rx="13" ry="7" fill={mix(c, "#b0303d", 0.55)} stroke={lo} strokeWidth="2" />
        </>
      );
    case "neural": // AI/ML: a dark world lit by a network
      return (
        <>
          <rect width="100" height="100" fill={mix(c, "#1a1440", 0.7)} />
          <g stroke={c} strokeWidth="1.6" opacity="0.9">
            <path d="M20 30 L44 22 L70 34 L84 56 L62 70 L36 76 L18 56 Z M44 22 L50 50 L70 34 M50 50 L84 56 M50 50 L36 76 M50 50 L18 56 M50 50 L62 70" fill="none" />
          </g>
          {[[20, 30], [44, 22], [70, 34], [84, 56], [62, 70], [36, 76], [18, 56], [50, 50]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="3.6" fill={hi} />
          ))}
        </>
      );
    case "moon": // Testing: small, grey and well cratered
      return (
        <>
          <rect width="100" height="100" fill={mix(c, "#9a9aa8", 0.55)} />
          {[[28, 30, 10], [64, 26, 7], [70, 62, 13], [34, 66, 8], [50, 46, 5], [18, 52, 4]].map(([x, y, r]) => (
            <g key={`${x}${y}`}>
              <circle cx={x} cy={y} r={r} fill={mix(c, "#3c3c4a", 0.6)} />
              <circle cx={x + r * 0.2} cy={y + r * 0.2} r={r * 0.7} fill={mix(c, "#7a7a88", 0.6)} />
            </g>
          ))}
        </>
      );
    case "ice": // Deployment: Neptune blue with a dark storm
      return (
        <>
          <rect width="100" height="100" fill={c} />
          {[24, 44, 70].map((y) => (
            <path key={y} d={`M0 ${y} Q50 ${y - 6} 100 ${y}`} stroke={hi} strokeWidth="5" fill="none" opacity="0.6" />
          ))}
          <ellipse cx="36" cy="56" rx="12" ry="6" fill={lo} />
          <path d="M26 50 Q36 46 48 52" stroke="#fff" strokeWidth="2" fill="none" opacity="0.8" />
        </>
      );
    default: // swirl — Maintenance: Venus-like cloud tops, always moving
      return (
        <>
          <rect width="100" height="100" fill={c} />
          {[20, 40, 60, 80].map((y, i) => (
            <path
              key={y}
              d={`M-10 ${y} C20 ${y - 14} 40 ${y + 14} 60 ${y} S100 ${y - 10} 110 ${y}`}
              stroke={i % 2 ? hi : lo}
              strokeWidth="7"
              fill="none"
              opacity="0.65"
            />
          ))}
        </>
      );
  }
}

/** One planet: the shaded sphere plus any rings or moons it carries. */
export function PlanetArt({ kind, c, uid, className }) {
  const clip = `pl-clip-${uid}`;
  const shade = `pl-shade-${uid}`;
  const ring = kind === "ringed" || kind === "ice";
  const ringCol = mix(c, "#ffffff", 0.35);
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx="50" cy="50" r="48" />
        </clipPath>
        <radialGradient id={shade} cx="0.34" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.75" stopColor="#0b0820" stopOpacity="0.25" />
          <stop offset="1" stopColor="#0b0820" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      {/* back half of the ring passes behind the planet */}
      {ring && (
        <path
          d="M-30 50 A80 17 0 0 1 130 50"
          transform="rotate(-16 50 50)"
          fill="none"
          stroke={ringCol}
          strokeWidth={kind === "ringed" ? 9 : 3}
          opacity={kind === "ringed" ? 0.9 : 0.55}
        />
      )}
      <g clipPath={`url(#${clip})`}>
        <Surface kind={kind} c={c} />
        <rect width="100" height="100" fill={`url(#${shade})`} />
      </g>
      <circle cx="50" cy="50" r="48" fill="none" stroke={INK} strokeWidth="3" />
      {ring && (
        <path
          d="M-30 50 A80 17 0 0 0 130 50"
          transform="rotate(-16 50 50)"
          fill="none"
          stroke={ringCol}
          strokeWidth={kind === "ringed" ? 9 : 3}
          opacity={kind === "ringed" ? 0.95 : 0.6}
        />
      )}
      {(kind === "neural" || kind === "giant" || kind === "earth") && (
        <g className="pl-moon">
          <circle cx={kind === "giant" ? 118 : 112} cy="30" r={kind === "giant" ? 7 : 6} fill={mix(c, "#d8d4e8", 0.6)} stroke={INK} strokeWidth="2.5" />
        </g>
      )}
    </svg>
  );
}
