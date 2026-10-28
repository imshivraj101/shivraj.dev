/* Shivraj in costume, for the closing chapters. All three reuse his
   face (the same crop the UFO pilot uses) inside a circle, with the
   costume drawn around it:
   - Armour: a red-and-gold armoured suit, hovering on boot thrusters,
     arc reactor glowing in the chest, palm blaster raised;
   - Einstein: the wild white wig and moustache, tweed jacket, chalking
     E = mc² on a board;
   - Newton: curled wig and long coat, sat under an apple tree while the
     apple keeps landing on his head.
   Idle motion is CSS (classes styled in Story.module.css). */
import pilot from "../../assets/pilot.webp";

const INK = "#15131f";
const GOLD = "#f2c94c";

/** His face in a circle centred on (cx, cy), radius r. */
function Face({ cx, cy, r, uid }) {
  const id = `face-${uid}`;
  const s = r * 2.21;
  return (
    <>
      <defs>
        <clipPath id={id}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill="#2a3a8a" />
        <image href={pilot.src} x={cx - s / 2} y={cy - r * 1.1} width={s} height={s} />
      </g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="3" />
    </>
  );
}

/** A limb as a thick outlined stroke. */
function Limb({ d, color, w = 18 }) {
  return (
    <>
      <path d={d} stroke={INK} strokeWidth={w + 6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={d} stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  );
}

export function Armour({ className }) {
  const RED = "#c81d25";
  return (
    <svg className={className} viewBox="0 0 200 320" overflow="visible" aria-hidden="true">
      <defs>
        <radialGradient id="arc-core">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#bff6ff" />
          <stop offset="1" stopColor="#38d5ff" />
        </radialGradient>
        <radialGradient id="arc-halo">
          <stop offset="0" stopColor="#7beaff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#7beaff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arc-thrust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6c2" />
          <stop offset="0.4" stopColor="#ffb347" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ff7a59" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="cs-hover">
        {/* boot thrusters */}
        <path className="cs-flame" d="M66 284 L90 284 L78 326 Z M110 284 L134 284 L122 326 Z" fill="url(#arc-thrust)" />
        {/* legs: red plates, gold knees, red boots */}
        <Limb d="M86 172 L80 232 L78 276" color={RED} w={22} />
        <Limb d="M114 172 L120 232 L122 276" color={RED} w={22} />
        <circle cx="80" cy="232" r="8" fill={GOLD} stroke={INK} strokeWidth="2.5" />
        <circle cx="120" cy="232" r="8" fill={GOLD} stroke={INK} strokeWidth="2.5" />
        <rect x="64" y="270" width="30" height="16" rx="5" fill={RED} stroke={INK} strokeWidth="3" />
        <rect x="106" y="270" width="30" height="16" rx="5" fill={RED} stroke={INK} strokeWidth="3" />
        {/* arm raised, palm blaster lit */}
        <Limb d="M64 104 L42 72 L32 38" color={RED} w={18} />
        <circle cx="42" cy="72" r="6" fill={GOLD} stroke={INK} strokeWidth="2" />
        <circle className="cs-glow" cx="30" cy="30" r="22" fill="url(#arc-halo)" />
        <circle cx="31" cy="32" r="11" fill={RED} stroke={INK} strokeWidth="3" />
        <circle cx="30" cy="30" r="5" fill="url(#arc-core)" />
        {/* torso: red shell, gold abdomen, shoulder plates */}
        <path d="M60 94 Q100 84 140 94 L134 174 Q100 184 66 174 Z" fill={RED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M82 136 L118 136 L114 172 Q100 176 86 172 Z" fill={GOLD} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M86 148 H114 M88 160 H112" stroke="#b8901f" strokeWidth="2" />
        <circle cx="64" cy="102" r="14" fill={RED} stroke={INK} strokeWidth="3" />
        <circle cx="136" cy="102" r="14" fill={RED} stroke={INK} strokeWidth="3" />
        {/* arc reactor */}
        <circle className="cs-glow" cx="100" cy="114" r="28" fill="url(#arc-halo)" />
        <circle cx="100" cy="114" r="12" fill="url(#arc-core)" stroke={INK} strokeWidth="3" />
        <circle cx="100" cy="114" r="7" fill="none" stroke="#38d5ff" strokeWidth="1.5" />
        {/* other hand at the reactor, "using" it */}
        <Limb d="M136 104 L150 136 L124 124" color={RED} w={16} />
        <circle cx="122" cy="122" r="8" fill={GOLD} stroke={INK} strokeWidth="2.5" />
        {/* open helmet: shell around the face, faceplate raised */}
        <circle cx="100" cy="56" r="45" fill={RED} stroke={INK} strokeWidth="3" />
        <Face cx={100} cy={58} r={34} uid="armour" />
        <path d="M70 24 Q100 2 130 24 L124 36 Q100 24 76 36 Z" fill={GOLD} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** Points of a spiky wig around (cx, cy): r alternates between two radii. */
function spiky(cx, cy, r1, r2, from, to, n) {
  const pts = [];
  for (let k = 0; k <= n; k++) {
    const t = ((from + ((to - from) * k) / n) * Math.PI) / 180;
    const r = k % 2 ? r2 : r1;
    pts.push(`${(cx + Math.cos(t) * r).toFixed(1)} ${(cy - Math.sin(t) * r).toFixed(1)}`);
  }
  return pts;
}

export function Einstein({ className }) {
  const TWEED = "#7d6f5c";
  const hair = spiky(100, 58, 58, 44, 208, -28, 22);
  return (
    <svg className={className} viewBox="0 0 200 320" overflow="visible" aria-hidden="true">
      {/* chalkboard on its easel */}
      <g>
        <path d="M150 180 L140 300 M190 180 L200 300" stroke="#7a5230" strokeWidth="5" strokeLinecap="round" />
        <rect x="128" y="96" width="84" height="88" rx="4" fill="#24453a" stroke="#7a5230" strokeWidth="6" />
        <text x="170" y="134" textAnchor="middle" fill="#f4efe6" fontSize="20" fontFamily="Georgia, serif" fontStyle="italic">
          E=mc²
        </text>
        <path d="M140 150 q8 -8 16 0 t16 0 M144 166 h40" stroke="#f4efe6" strokeWidth="1.8" fill="none" opacity="0.7" />
      </g>
      <g className="cs-ponder">
        {/* trousers and shoes */}
        <Limb d="M86 172 L82 232 L80 276" color="#5b5550" w={22} />
        <Limb d="M114 172 L118 232 L120 276" color="#5b5550" w={22} />
        <path d="M62 278 Q66 268 84 270 L88 284 L62 284 Z M112 270 Q132 268 138 278 L138 284 L112 284 Z" fill="#4a2e1a" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {/* the hand on the hip */}
        <Limb d="M64 102 L48 140 L70 158" color={TWEED} w={18} />
        {/* tweed jacket, white shirt, lapels */}
        <path d="M60 94 Q100 84 140 94 L136 178 Q100 186 64 178 Z" fill={TWEED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M88 92 L100 128 L112 92 Z" fill="#f4efe6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M86 94 L98 134 L86 150 M114 94 L102 134 L114 150" stroke={INK} strokeWidth="2.5" fill="none" />
        <circle cx="100" cy="146" r="3" fill={INK} />
        <circle cx="100" cy="160" r="3" fill={INK} />
        {/* chalk arm, reaching for the board */}
        <Limb d="M136 102 L150 128 L136 128" color={TWEED} w={16} />
        <path d="M130 118 L150 112" stroke={INK} strokeWidth="4" fill="none" />
        <circle cx="134" cy="128" r="8" fill="#e0a86e" stroke={INK} strokeWidth="2.5" />
        <rect x="136" y="122" width="12" height="4" rx="1" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <Face cx={100} cy={58} r={36} uid="einstein" />
        {/* the wig: spiky white crown over the top, hairline at the brow */}
        <path
          d={`M${hair.join(" L")} L136 66 Q100 16 64 66 Z`}
          fill="#f6f6f6"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* and the moustache */}
        <path d="M82 76 Q90 66 100 73 Q110 66 118 76 Q110 84 100 78 Q90 84 82 76 Z" fill="#f6f6f6" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function Newton({ className }) {
  const COAT = "#6b4226";
  const curls = [];
  for (let k = 0; k < 6; k++) {
    curls.push([118 - 26, 168 + k * 9]);
    curls.push([118 + 26, 168 + k * 9]);
  }
  return (
    <svg className={className} viewBox="0 0 240 300" overflow="visible" aria-hidden="true">
      {/* the tree he's leaning on */}
      <path d="M40 296 Q52 220 46 150 L70 150 Q66 220 80 296 Z" fill="#7a5230" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M58 160 Q90 140 110 120" stroke="#7a5230" strokeWidth="9" strokeLinecap="round" fill="none" />
      <g fill="#4f9d58" stroke={INK} strokeWidth="3">
        <circle cx="40" cy="96" r="40" />
        <circle cx="96" cy="78" r="46" />
        <circle cx="62" cy="44" r="38" />
        <circle cx="130" cy="110" r="30" />
      </g>
      <g fill="#e63946" stroke={INK} strokeWidth="2">
        <circle cx="30" cy="80" r="6" />
        <circle cx="70" cy="40" r="6" />
        <circle cx="96" cy="96" r="6" />
        <circle cx="140" cy="104" r="6" />
      </g>
      {/* the apple that keeps falling */}
      <g className="cs-apple">
        <circle cx="118" cy="70" r="8" fill="#e63946" stroke={INK} strokeWidth="2.5" />
        <path d="M118 62 q2 -6 6 -7" stroke="#4a2e1a" strokeWidth="2" fill="none" />
      </g>
      {/* sat against the trunk, legs out, a book on his knee */}
      <path d="M96 238 L170 236 L176 284 L196 286" stroke={INK} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M96 238 L170 236 L176 284 L196 286" stroke="#3b3550" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M90 186 Q118 176 146 186 L150 248 Q118 256 88 248 Z" fill={COAT} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {[198, 212, 226, 240].map((y) => (
        <circle key={y} cx="119" cy={y} r="2.6" fill={GOLD} />
      ))}
      <path d="M108 186 L118 200 L128 186 Z" fill="#f4efe6" stroke={INK} strokeWidth="2" />
      <rect x="140" y="214" width="32" height="22" rx="2" fill="#8a2be2" stroke={INK} strokeWidth="2.5" transform="rotate(-14 156 225)" />
      <path d="M146 196 L150 222" stroke={INK} strokeWidth="20" strokeLinecap="round" />
      <path d="M146 196 L150 222" stroke={COAT} strokeWidth="14" strokeLinecap="round" />
      {/* curled wig falling to the shoulders */}
      {curls.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="9" fill="#e9e4d8" stroke={INK} strokeWidth="2" />
      ))}
      <Face cx={118} cy={158} r={26} uid="newton" />
      <path d="M90 154 Q92 124 118 122 Q144 124 146 154 Q132 138 118 140 Q104 138 90 154 Z" fill="#e9e4d8" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* bonk */}
      <g className="cs-bonk" fill="#ffd166" stroke={INK} strokeWidth="1.5">
        <path d="M150 118 l3 7 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1 Z" />
        <path d="M86 112 l2 5 l5 1 l-4 3 l1 5 l-4 -2 l-4 2 l1 -5 l-4 -3 l5 -1 Z" />
      </g>
    </svg>
  );
}
