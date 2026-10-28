/* Backdrops for the later chapters, in the line-drawn style of the
   Nashik vineyard: a desk for "Hi", the vineyard and train for uni, a
   data centre for ESDS, a workshop belt under the projects and paper
   planes over the blogs. Each is a 1440x320 strip pinned to the bottom
   of its section; parts carry data-sc hooks that Story's scroll
   timelines animate. Continuous touches (blinking LEDs, packets, steam)
   are native SVG/CSS so they cost nothing per scroll frame. */

import esdsLogo from "../../assets/esds-logo.webp";

const LINE = "#e9e4ff";
const INK = "#15131f";
const strip = { viewBox: "0 0 1440 320", preserveAspectRatio: "xMidYMax slice", "aria-hidden": true };

/** "Hi, I'm Shivraj": his desk, item by item. */
export function DeskScene({ className }) {
  const st = { fill: "none", stroke: LINE, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <svg className={className} {...strip}>
      <line data-sc="draw" x1="80" y1="262" x2="1360" y2="262" {...st} />
      {/* laptop */}
      <g data-sc="item">
        <path d="M250 255 L270 175 L400 175 L380 255 Z" {...st} fill="rgba(233,228,255,0.08)" />
        <path d="M230 258 H420" {...st} />
        <path d="M300 205 l14 10 l-14 10 M326 228 h24" stroke="#7bdcb5" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      {/* chai with live steam */}
      <g data-sc="item">
        <path d="M480 212 H526 L520 258 H486 Z" {...st} fill="rgba(244,239,230,0.12)" />
        <path d="M526 222 q16 4 10 20 q-4 8 -12 8" {...st} />
        <path className="sc-steam" d="M494 200 q-8 -12 0 -24 q8 -12 0 -24 M512 200 q-8 -12 0 -24 q8 -12 0 -24" {...st} strokeWidth="2.5" opacity="0.7" />
      </g>
      {/* headphones */}
      <g data-sc="item">
        <path d="M610 250 C610 196 700 196 700 250" {...st} />
        <rect x="598" y="232" width="20" height="28" rx="8" {...st} fill="rgba(233,228,255,0.2)" />
        <rect x="692" y="232" width="20" height="28" rx="8" {...st} fill="rgba(233,228,255,0.2)" />
      </g>
      {/* sketchbook and pencil */}
      <g data-sc="item">
        <path d="M790 256 L812 214 L900 214 L878 256 Z" {...st} fill="rgba(255,209,102,0.15)" />
        <path d="M822 236 q20 -14 40 0" stroke="#ff7a59" strokeWidth="2.5" fill="none" />
        <path d="M905 250 L960 210" stroke="#ffd166" strokeWidth="6" strokeLinecap="round" />
      </g>
      {/* film clapper, for Whitespot */}
      <g data-sc="item">
        <rect x="1020" y="208" width="90" height="48" rx="4" {...st} />
        <path d="M1020 208 L1030 186 L1118 196 L1110 208" {...st} fill="rgba(233,228,255,0.15)" />
        <path d="M1046 190 L1040 206 M1068 192 L1062 206 M1090 194 L1084 207" {...st} strokeWidth="2.5" />
      </g>
      {/* mic, for the anchoring */}
      <g data-sc="item">
        <rect x="1190" y="170" width="30" height="50" rx="15" {...st} fill="rgba(240,166,255,0.18)" />
        <path d="M1182 210 q23 30 46 0 M1205 236 V258 M1188 258 H1222" {...st} />
      </g>
    </svg>
  );
}

/** Uni: Nashik — hills, vineyard rows heavy with grapes, the train. */
export function NashikScene({ className }) {
  return (
    <svg className={className} {...strip}>
      <path data-sc="draw" d="M0 196 C200 136 380 216 600 176 S980 126 1180 186 S1380 196 1440 166" fill="none" stroke={LINE} strokeWidth="2" opacity="0.6" />
      <path data-sc="draw" d="M0 236 C240 196 420 256 700 222 S1100 200 1440 232" fill="none" stroke={LINE} strokeWidth="2" opacity="0.75" />
      {/* the Godavari, a lazy blue ribbon */}
      <path data-sc="draw" d="M0 300 C260 280 520 312 760 294 S1200 280 1440 298" fill="none" stroke="#7fb6ff" strokeWidth="3" opacity="0.7" />
      {Array.from({ length: 34 }, (_, i) => {
        const x = 30 + i * 42;
        const y = 248 + (i % 2) * 6;
        return (
          <g key={i} data-sc="vine">
            <line x1={x} y1={y} x2={x} y2={y + 30} stroke={LINE} strokeWidth="2" />
            <path d={`M${x} ${y + 2} q-10 -10 -16 0 q8 6 16 0 q10 -10 16 0 q-8 6 -16 0`} fill="#7bdcb5" opacity="0.8" />
            <circle cx={x - 5} cy={y + 8} r="5" fill="#b07ccf" />
            <circle cx={x + 5} cy={y + 8} r="5" fill="#9b63bd" />
            <circle cx={x} cy={y + 16} r="5" fill="#b07ccf" />
            <circle cx={x} cy={y + 24} r="4" fill="#9b63bd" />
          </g>
        );
      })}
      <line x1="0" y1="286" x2="1440" y2="286" stroke={LINE} strokeWidth="2" />
      <g data-sc="train">
        <rect x="4" y="244" width="76" height="38" rx="10" fill="#2f6f8f" stroke={INK} strokeWidth="3" />
        <rect x="88" y="244" width="76" height="38" rx="6" fill="#2f6f8f" stroke={INK} strokeWidth="3" />
        <rect x="172" y="244" width="76" height="38" rx="6" fill="#2f6f8f" stroke={INK} strokeWidth="3" />
        {[14, 40, 98, 124, 182, 208].map((x) => (
          <rect key={x} x={x} y="252" width="18" height="12" rx="2" fill="#ffd166" stroke={INK} strokeWidth="2" />
        ))}
        <rect x="4" y="268" width="244" height="5" fill="#ffd166" />
        {[18, 64, 102, 148, 186, 232].map((x) => (
          <circle key={x} cx={x} cy="284" r="6" fill={INK} />
        ))}
      </g>
      {/* mortarboards thrown for the class of '26, low enough that the
          top-cropped strip on wide screens never slices them */}
      {[[1160, 214, -18], [1262, 200, 14], [1350, 226, -8]].map(([x, y, r]) => (
        <g key={x} data-sc="cap" transform={`rotate(${r} ${x} ${y})`}>
          <path d={`M${x - 26} ${y} L${x} ${y - 12} L${x + 26} ${y} L${x} ${y + 12} Z`} fill={INK} stroke={LINE} strokeWidth="2" />
          <rect x={x - 12} y={y + 4} width="24" height="10" fill={INK} stroke={LINE} strokeWidth="2" />
          <path d={`M${x + 8} ${y} q10 6 6 20`} stroke="#ffd166" strokeWidth="2" fill="none" />
        </g>
      ))}
    </svg>
  );
}

/** ESDS: racks with live LEDs, packets riding up to the cloud. */
export function DataCentreScene({ className }) {
  const racks = [120, 300, 480, 960, 1140, 1320];
  // The hub sits low, between the racks: the strip is cropped from the
  // top on wide screens, so anything above y~150 can disappear.
  const HX = 720;
  const HY = 220;
  return (
    <svg className={className} {...strip}>
      <defs>
        <radialGradient id="esds-glow">
          <stop offset="0" stopColor="#5ec8e5" stopOpacity="0.45" />
          <stop offset="1" stopColor="#5ec8e5" stopOpacity="0" />
        </radialGradient>
      </defs>
      {racks.map((x, i) => {
        const side = x < HX ? HX - 96 : HX + 96;
        return (
          <path
            key={`l${x}`}
            id={`esds-link-${i}`}
            data-sc="draw"
            d={`M${x} 160 C${x} 118 ${(x + side) / 2} 128 ${side} ${HY}`}
            fill="none"
            stroke={LINE}
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.55"
          />
        );
      })}
      {racks.map((x, i) => (
        <circle key={`p${x}`} r="4" fill="#7bdcb5">
          <animateMotion dur={`${2.4 + (i % 3) * 0.6}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" keyPoints={i % 2 ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear">
            <mpath href={`#esds-link-${i}`} />
          </animateMotion>
        </circle>
      ))}
      {/* ESDS: the cloud everything feeds into */}
      <g data-sc="cloud">
        <ellipse className="sc-pulse" cx={HX} cy={HY} rx="150" ry="96" fill="url(#esds-glow)" />
        <image href={esdsLogo.src} x={HX - 88} y="150" width="176" height="135" />
      </g>
      {racks.map((x, i) => (
        <g key={x} data-sc="rack">
          <rect x={x - 46} y="160" width="92" height="126" rx="6" fill="#16263a" stroke={LINE} strokeWidth="2.5" />
          {[0, 1, 2, 3, 4].map((r) => (
            <g key={r}>
              <rect x={x - 36} y={172 + r * 22} width="72" height="14" rx="2" fill="#203650" stroke="#2f4a6a" strokeWidth="1.5" />
              <circle className="sc-led" cx={x + 26} cy={179 + r * 22} r="2.6" fill={(r + i) % 3 ? "#7bdcb5" : "#ffd166"} style={{ animationDelay: `${((r * 7 + i * 3) % 10) / 10}s` }} />
              <line x1={x - 30} y1={179 + r * 22} x2={x + 10} y2={179 + r * 22} stroke="#3b5a7e" strokeWidth="2" />
            </g>
          ))}
        </g>
      ))}
      <line x1="0" y1="288" x2="1440" y2="288" stroke={LINE} strokeWidth="2" />
    </svg>
  );
}

/** A toothed gear outline centred on (cx, cy). */
function gearPath(cx, cy, r, teeth = 12, depth = 0.22) {
  const pts = [];
  const steps = teeth * 4;
  for (let k = 0; k < steps; k++) {
    const a = (k / steps) * Math.PI * 2;
    const rr = k % 4 < 2 ? r : r * (1 - depth);
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

const BELT_Y = 70; // belt centre line

/** Projects: a workshop line under the reel. The belt runs past both
    edges of the screen (no ends to crop, nowhere for a sign to stand
    on air), and every moving part is connected: the motor on the floor
    turns a pulley, a chain carries that up to the drive sprocket on one
    roller, and the rollers carry the tread. */
export function BeltScene({ className }) {
  const rollers = Array.from({ length: 42 }, (_, i) => -80 + i * 42);
  const legs = [150, 420, 690, 960, 1230];
  const Y = BELT_Y;
  const DX = 550; // the driven roller
  const PY = 126; // motor pulley centre

  return (
    <svg className={className} viewBox="0 0 1440 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* floor and the frame: legs with cross-bracing */}
      <line x1="-100" y1="164" x2="1540" y2="164" stroke={LINE} strokeWidth="2" opacity="0.6" />
      {legs.map((x) => (
        <g key={x} opacity="0.85">
          <path d={`M${x - 30} ${Y + 18} L${x - 44} 164 M${x + 30} ${Y + 18} L${x + 44} 164`} stroke={LINE} strokeWidth="5" strokeLinecap="round" />
          <path d={`M${x - 34} ${Y + 40} L${x + 40} 150 M${x + 34} ${Y + 40} L${x - 40} 150`} stroke={LINE} strokeWidth="2" opacity="0.6" />
          <rect x={x - 52} y="158" width="20" height="8" rx="2" fill={LINE} />
          <rect x={x + 32} y="158" width="20" height="8" rx="2" fill={LINE} />
        </g>
      ))}
      {/* motor, bolted to the floor, with its drive chain */}
      <g>
        <rect x={DX - 44} y={PY - 6} width="88" height="44" rx="8" fill="#2a2433" stroke={LINE} strokeWidth="2.5" />
        <rect x={DX - 54} y="156" width="108" height="8" rx="2" fill={LINE} />
        <circle className="sc-led" cx={DX - 30} cy={PY + 10} r="3.5" fill="#7bdcb5" />
        <rect x={DX - 18} y={PY + 4} width="52" height="18" rx="3" fill="#15131f" stroke="#3b3550" strokeWidth="1.5" />
        <path d={`M${DX - 13} ${PY + 13} h7 l4 -5 l4 10 l4 -5 h22`} fill="none" stroke="#7bdcb5" strokeWidth="1.5" />
        <line data-sc="tread" x1={DX - 24} y1={Y} x2={DX - 11} y2={PY} stroke="#ffd166" strokeWidth="4" strokeDasharray="5 4" />
        <line data-sc="tread" x1={DX + 24} y1={Y} x2={DX + 11} y2={PY} stroke="#ffd166" strokeWidth="4" strokeDasharray="5 4" />
        <g data-sc="pulley" style={{ transformOrigin: `${DX}px ${PY}px` }}>
          <path d={gearPath(DX, PY, 12, 9)} fill="#3b3550" stroke={LINE} strokeWidth="2" />
          <path d={`M${DX - 7} ${PY} H${DX + 7} M${DX} ${PY - 7} V${PY + 7}`} stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
      {/* the belt: casing, rollers (one carries the drive sprocket), tread */}
      <rect data-sc="deck" x="-100" y={Y - 18} width="1640" height="36" fill="rgba(21,19,31,0.55)" stroke={LINE} strokeWidth="2.5" />
      {rollers.map((x) => (
        <g key={x} data-sc="roller" style={{ transformOrigin: `${x}px ${Y}px` }}>
          {x === DX && <path d={gearPath(x, Y, 24, 14)} fill="#3b3550" stroke={LINE} strokeWidth="2" />}
          <circle cx={x} cy={Y} r="12" fill="#2a2433" stroke={LINE} strokeWidth="1.5" />
          <path d={`M${x} ${Y - 9} V${Y + 9} M${x - 9} ${Y} H${x + 9} M${x - 6.4} ${Y - 6.4} L${x + 6.4} ${Y + 6.4} M${x + 6.4} ${Y - 6.4} L${x - 6.4} ${Y + 6.4}`} stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <line data-sc="tread" x1="-100" y1={Y - 18} x2="1540" y2={Y - 18} stroke={LINE} strokeWidth="4" strokeDasharray="10 6" />
      <line data-sc="tread" x1="-100" y1={Y + 18} x2="1540" y2={Y + 18} stroke={LINE} strokeWidth="4" strokeDasharray="10 6" opacity="0.5" />
    </svg>
  );
}

/** Blogs: paper planes on dashed trails, in a strip under the notes so
    no trail ever crosses the words. */
export function PlanesScene({ className }) {
  const planes = [
    // Kept in the strip's bottom band, which stays below the notes even
    // where the strip itself reaches up behind them.
    "M-80 270 C240 236 520 290 860 252 S1300 232 1540 262",
    "M-80 240 C300 222 620 268 980 238 S1340 226 1540 236",
    "M-80 304 C360 290 700 312 1040 288 S1360 284 1540 300",
  ];
  return (
    <svg className={className} {...strip}>
      {planes.map((d) => (
        <g key={d}>
          <path data-sc="trail" d={d} fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="6 9" opacity="0.35" />
          <g data-sc="plane" data-path={d}>
            <path d="M0 0 L-34 -12 L-24 0 L-34 12 Z" fill="#f4efe6" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
            <path d="M0 0 L-24 0" stroke={INK} strokeWidth="1.5" />
          </g>
        </g>
      ))}
    </svg>
  );
}
