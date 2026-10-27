/* Backdrops for the later chapters, in the line-drawn style of the
   Nashik vineyard: a desk for "Hi", the vineyard and train for uni, a
   data centre for ESDS, a workshop belt under the projects and paper
   planes over the blogs. Each is a 1440x320 strip pinned to the bottom
   of its section; parts carry data-sc hooks that Story's scroll
   timelines animate. Continuous touches (blinking LEDs, packets, steam)
   are native SVG/CSS so they cost nothing per scroll frame. */

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
      {/* mortarboards thrown for the class of '26 */}
      {[[1180, 90, -18], [1270, 60, 14], [1340, 110, -8]].map(([x, y, r]) => (
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
  const cloud = (cx, cy, s = 1) =>
    `M${cx - 50 * s} ${cy + 18 * s} a22 22 0 0 1 8 -42 a30 30 0 0 1 56 -10 a24 24 0 0 1 36 30 a18 18 0 0 1 -6 22 Z`;
  return (
    <svg className={className} {...strip}>
      <path data-sc="cloud" d={cloud(720, 70, 1.3)} fill="rgba(233,228,255,0.1)" stroke={LINE} strokeWidth="2.5" />
      {racks.map((x, i) => (
        <path
          key={`l${x}`}
          id={`esds-link-${i}`}
          data-sc="draw"
          d={`M${x} 160 C${x} 110 ${(x + 720) / 2} 110 720 92`}
          fill="none"
          stroke={LINE}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.5"
        />
      ))}
      {racks.map((x, i) => (
        <circle key={`p${x}`} r="4" fill="#7bdcb5">
          <animateMotion dur={`${2.4 + (i % 3) * 0.6}s`} begin={`${i * 0.4}s`} repeatCount="indefinite">
            <mpath href={`#esds-link-${i}`} />
          </animateMotion>
        </circle>
      ))}
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

/** Projects: a workshop belt; the rollers turn as the reel moves. */
export function BeltScene({ className }) {
  const rollers = Array.from({ length: 24 }, (_, i) => 40 + i * 60);
  return (
    <svg className={className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <rect x="10" y="30" width="1420" height="54" rx="27" fill="rgba(21,19,31,0.35)" stroke={LINE} strokeWidth="2.5" />
      <line data-sc="tread" x1="30" y1="34" x2="1410" y2="34" stroke={LINE} strokeWidth="2" strokeDasharray="14 18" opacity="0.6" />
      {rollers.map((x) => (
        <g key={x} data-sc="roller">
          <circle cx={x} cy="57" r="18" fill="#2a2433" stroke={LINE} strokeWidth="2" />
          <path d={`M${x - 14} 57 H${x + 14} M${x} 43 V71`} stroke="#ffd166" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

/** Blogs: paper planes trailing dashed paths across the page. */
export function PlanesScene({ className }) {
  const planes = [
    { path: "M-80 260 C240 120 520 300 860 140 S1300 80 1540 160", y: 0 },
    { path: "M-80 120 C300 40 620 200 980 90 S1340 40 1540 60", y: 0 },
    { path: "M-80 300 C360 250 700 320 1040 230 S1360 220 1540 260", y: 0 },
  ];
  return (
    <svg className={className} viewBox="0 0 1440 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {planes.map((p, i) => (
        <g key={i}>
          <path data-sc="draw" d={p.path} fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="6 9" opacity="0.4" />
          <g data-sc="plane" data-path={p.path}>
            <path d="M0 0 L-34 -12 L-24 0 L-34 12 Z" fill="#f4efe6" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
            <path d="M0 0 L-24 0" stroke={INK} strokeWidth="1.5" />
          </g>
        </g>
      ))}
    </svg>
  );
}
