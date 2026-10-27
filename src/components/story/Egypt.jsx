/* The lifecycle, told as a pyramid build. Ancient Egyptian animal-folk
   (jackal and cat pharaohs, shout-out to the ancient-aliens crowd) work
   through one phase per planet. Every scene shares a 400x260 stage with
   the ground at y=232; figures are drawn facing right with their feet
   at the origin. Classes prefixed eg- are hooked by Story.module.css
   for the small idle loops (UFO bob, beam pulse, sun glow). */

const INK = "#15131f";
const GOLD = "#e9b949";
const TEAL = "#3fb6a8";
const LAPIS = "#2f5fb5";
const LINEN = "#f4efe6";
const SAND = "#e6c27a";
const SAND_DARK = "#c99b52";
const GROUND = 232;

const stroke = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round", strokeLinecap: "round" };

/* ---------- Props a figure can hold (origin = the hand) ---------- */

export const Ankh = () => (
  <g>
    <line x1="0" y1="-46" x2="0" y2="44" stroke={GOLD} strokeWidth="4" />
    <line x1="0" y1="-46" x2="0" y2="44" stroke={INK} strokeWidth="1" opacity="0.4" />
    <ellipse cx="0" cy="-56" rx="6" ry="9" fill="none" stroke={GOLD} strokeWidth="4" />
    <line x1="-9" y1="-46" x2="9" y2="-46" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
  </g>
);

const Scroll = ({ open }) =>
  open ? (
    <g {...stroke}>
      <rect x="-4" y="-18" width="34" height="24" rx="2" fill={LINEN} />
      <path d="M3 -12 H24 M3 -6 H20 M3 0 H24" stroke="#9a8a6a" strokeWidth="1.5" />
      <rect x="-7" y="-20" width="5" height="28" rx="2.5" fill={SAND_DARK} />
      <rect x="28" y="-20" width="5" height="28" rx="2.5" fill={SAND_DARK} />
    </g>
  ) : (
    <g {...stroke}>
      <rect x="-3" y="-14" width="10" height="26" rx="4" fill={LINEN} />
    </g>
  );

const Rod = () => (
  <g>
    <rect x="-2.5" y="-70" width="5" height="96" fill={LINEN} stroke={INK} strokeWidth="2" />
    {[-60, -40, -20, 0].map((y) => (
      <rect key={y} x="-2.5" y={y} width="5" height="10" fill="#d9534f" />
    ))}
  </g>
);

const Mallet = () => (
  <g {...stroke}>
    <rect x="-2" y="-30" width="4" height="34" fill={SAND_DARK} />
    <rect x="-10" y="-42" width="20" height="13" rx="3" fill="#8a6a45" />
  </g>
);

const Broom = () => (
  <g {...stroke}>
    <line x1="0" y1="-30" x2="0" y2="46" stroke="#8a6a45" strokeWidth="4" />
    <path d="M-10 44 L10 44 L14 62 L-14 62 Z" fill={GOLD} />
    <path d="M-8 50 L-10 62 M0 50 V62 M8 50 L10 62" stroke="#a9802f" strokeWidth="1.5" />
  </g>
);

const Stylus = () => <line x1="0" y1="0" x2="16" y2="-14" stroke={INK} strokeWidth="3" strokeLinecap="round" />;

const Plumb = () => (
  <g>
    <line x1="0" y1="0" x2="0" y2="48" stroke={INK} strokeWidth="1.5" />
    <path d="M-5 48 L5 48 L0 60 Z" fill={GOLD} stroke={INK} strokeWidth="2" />
  </g>
);

const RopeEnd = () => <circle r="3" fill="#b08a55" stroke={INK} strokeWidth="1.5" />;

/* ---------- The cast ---------- */

/** An arm hanging from `at`, swung by `angle`, with `hold` in the hand. */
function Arm({ at, angle, hold, fur }) {
  return (
    <g transform={`rotate(${angle} ${at[0]} ${at[1]})`}>
      <rect x={at[0] - 4.5} y={at[1]} width="9" height="40" rx="4.5" fill={fur} {...stroke} />
      <rect x={at[0] - 5} y={at[1] + 9} width="10" height="5" fill={GOLD} stroke={INK} strokeWidth="1.5" />
      <rect x={at[0] - 4.5} y={at[1] + 30} width="9" height="5" fill={TEAL} stroke={INK} strokeWidth="1.5" />
      <circle cx={at[0]} cy={at[1] + 42} r="5.5" fill={fur} {...stroke} />
      {hold && <g transform={`translate(${at[0]} ${at[1] + 42})`}>{hold}</g>}
    </g>
  );
}

/**
 * One of the animal-folk. kind: "dog" (jackal) or "cat".
 * armBack / armFront are degrees from hanging straight down; negative
 * swings the arm forward (toward the way the figure faces).
 */
export function Figure({
  x,
  y = GROUND,
  s = 1,
  kind = "dog",
  fur = kind === "dog" ? "#3a3542" : "#d9a25f",
  flip = false,
  armBack = 12,
  armFront = -12,
  holdBack = null,
  holdFront = null,
  nemes = true,
  kilt = LINEN,
  lean = 0,
}) {
  const shoulderB = [-11, -98];
  const shoulderF = [11, -98];

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${lean})`}>
      {/* tail */}
      {kind === "dog" ? (
        <path d="M-12 -62 Q-38 -54 -34 -18 Q-30 -40 -14 -54 Z" fill={fur} {...stroke} />
      ) : (
        <path d="M-12 -60 Q-40 -64 -36 -30 Q-34 -22 -28 -26" fill="none" stroke={fur} strokeWidth="5" strokeLinecap="round" />
      )}
      <Arm at={shoulderB} angle={armBack} hold={holdBack} fur={fur} />
      {/* legs and feet */}
      <rect x="-10" y="-52" width="9" height="50" rx="4" fill={fur} {...stroke} />
      <rect x="2" y="-52" width="9" height="50" rx="4" fill={fur} {...stroke} />
      <ellipse cx="-3" cy="-2" rx="8" ry="3.5" fill={fur} {...stroke} />
      <ellipse cx="10" cy="-2" rx="8" ry="3.5" fill={fur} {...stroke} />
      {/* shendyt kilt with belt and front panel */}
      <path d="M-16 -62 L16 -62 L19 -34 L-17 -34 Z" fill={kilt} {...stroke} />
      <path d="M2 -60 L11 -60 L13 -32 L4 -32 Z" fill={GOLD} {...stroke} />
      <rect x="-16" y="-66" width="32" height="6" fill={GOLD} {...stroke} />
      <circle cx="6" cy="-63" r="3" fill={TEAL} stroke={INK} strokeWidth="1.5" />
      {/* torso */}
      <path d="M-17 -101 Q-19 -80 -13 -64 L13 -64 Q19 -80 17 -101 Q0 -107 -17 -101 Z" fill={fur} {...stroke} />
      {/* usekh collar */}
      <path d="M-16 -103 Q0 -82 16 -103 L12 -106 Q0 -92 -12 -106 Z" fill={TEAL} {...stroke} />
      <path d="M-14 -101 Q0 -86 14 -101" fill="none" stroke={GOLD} strokeWidth="2.5" />
      <rect x="-5" y="-112" width="10" height="10" fill={fur} {...stroke} />
      {/* head */}
      <g transform="translate(0 -120)">
        {nemes && (
          <g>
            <path d="M-15 -8 Q-18 14 -11 24 L9 24 Q14 10 12 -6 Q0 -17 -15 -8 Z" fill={GOLD} {...stroke} />
            {[-3, 4, 11, 18].map((yy) => (
              <line key={yy} x1="-15" y1={yy} x2="11" y2={yy} stroke={LAPIS} strokeWidth="3" />
            ))}
          </g>
        )}
        {kind === "dog" ? (
          <g>
            <path d="M-7 -7 L-4 -36 L4 -9 Z" fill={fur} {...stroke} />
            <path d="M1 -9 L7 -35 L11 -7 Z" fill={fur} {...stroke} />
            <path d="M-2 -12 L-3 -28 M5 -12 L7 -27" stroke="#6b5f72" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="12.5" ry="11" fill={fur} {...stroke} />
            <path d="M6 -5 L29 1 Q32 5 28 8 L6 9 Z" fill={fur} {...stroke} />
            <circle cx="29" cy="3" r="2.6" fill={INK} />
            <path d="M14 7 L24 7" stroke={INK} strokeWidth="1.5" />
            <path d="M2 -3 Q7 -7 12 -3 Q7 -1 2 -3 Z" fill="#f3d36b" stroke={INK} strokeWidth="1.2" />
            <circle cx="8" cy="-3.3" r="1.3" fill={INK} />
          </g>
        ) : (
          <g>
            <path d="M-11 -5 L-9 -22 L0 -11 Z" fill={fur} {...stroke} />
            <path d="M2 -11 L11 -22 L12 -4 Z" fill={fur} {...stroke} />
            <circle cx="0" cy="0" r="12.5" fill={fur} {...stroke} />
            <ellipse cx="9" cy="4" rx="6.5" ry="4.5" fill="#f1d3a6" stroke={INK} strokeWidth="1.5" />
            <path d="M12 1 L15 1 L13.5 3.5 Z" fill="#d9534f" />
            <path d="M3 -3 Q7 -6.5 11 -3 Q7 -0.5 3 -3 Z" fill="#9be07a" stroke={INK} strokeWidth="1.2" />
            <ellipse cx="7.5" cy="-3.2" rx="0.9" ry="1.8" fill={INK} />
            <path d="M14 5 L24 3 M14 7 L24 8" stroke={INK} strokeWidth="1" />
            <circle cx="-8" cy="9" r="2.5" fill="none" stroke={GOLD} strokeWidth="2" />
          </g>
        )}
        {nemes && <rect x="-12" y="-11" width="22" height="4" rx="2" fill={GOLD} stroke={INK} strokeWidth="1.5" />}
      </g>
      <Arm at={shoulderF} angle={armFront} hold={holdFront} fur={fur} />
    </g>
  );
}

/* ---------- Scenery ---------- */

function Sky({ id, top, bottom }) {
  return (
    <>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#sky-${id})`} />
    </>
  );
}

function Stars({ n = 26 }) {
  return Array.from({ length: n }, (_, i) => (
    <circle key={i} cx={(i * 137) % 400} cy={(i * 59) % 150} r={i % 3 ? 0.9 : 1.5} fill="#fff" opacity={0.4 + (i % 4) * 0.15} />
  ));
}

function Dunes({ far = "#d8b06a" }) {
  return (
    <>
      <path d="M0 200 Q80 176 170 196 T400 190 V260 H0 Z" fill={far} />
      <path d={`M0 ${GROUND} Q120 222 220 230 T400 226 V260 H0 Z`} fill={SAND} />
      <line x1="0" y1={GROUND} x2="400" y2={GROUND} stroke={INK} strokeWidth="2" opacity="0.25" />
    </>
  );
}

/** A pyramid on the ground. built in 0..1 crops it to its lower courses. */
function Pyramid({ x, base, h, built = 1, capstone = true, ghost = false }) {
  const half = base / 2;
  const topY = GROUND - h;
  if (ghost) {
    return (
      <path
        d={`M${x - half} ${GROUND} L${x} ${topY} L${x + half} ${GROUND} Z`}
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeDasharray="6 6"
        opacity="0.55"
      />
    );
  }
  const cut = GROUND - h * built;
  const w = half * (1 - built);
  const courses = Math.round(h / 14);
  return (
    <g>
      <path
        d={built < 1 ? `M${x - half} ${GROUND} L${x - w} ${cut} L${x + w} ${cut} L${x + half} ${GROUND} Z` : `M${x - half} ${GROUND} L${x} ${topY} L${x + half} ${GROUND} Z`}
        fill={SAND}
        {...stroke}
      />
      <path d={built < 1 ? `M${x} ${cut} L${x + w} ${cut} L${x + half} ${GROUND} L${x} ${GROUND} Z` : `M${x} ${topY} L${x + half} ${GROUND} L${x} ${GROUND} Z`} fill={SAND_DARK} opacity="0.55" />
      {Array.from({ length: courses }, (_, i) => {
        const yy = GROUND - (i + 1) * 14;
        if (yy < cut) return null;
        const hw = half * ((yy - topY) / h);
        return <line key={i} x1={x - hw} y1={yy} x2={x + hw} y2={yy} stroke={INK} strokeWidth="1" opacity="0.35" />;
      })}
      {built >= 1 && capstone && <path d={`M${x - 12} ${topY + 16} L${x} ${topY} L${x + 12} ${topY + 16} Z`} fill={GOLD} {...stroke} />}
    </g>
  );
}

function Ufo({ x, y, beam = false }) {
  return (
    <g className="eg-bob">
      {beam && <path className="eg-beam" d={`M${x - 14} ${y + 8} L${x - 40} ${GROUND - 120} L${x + 40} ${GROUND - 120} L${x + 14} ${y + 8} Z`} fill="#9ff2e2" opacity="0.35" />}
      <ellipse cx={x} cy={y - 6} rx="14" ry="11" fill="#bfe9ff" {...stroke} />
      <ellipse cx={x} cy={y + 2} rx="38" ry="10" fill="#9aa3b8" {...stroke} />
      {[-24, -8, 8, 24].map((d) => (
        <circle key={d} cx={x + d} cy={y + 3} r="2.5" fill="#ffe066" />
      ))}
    </g>
  );
}

function Block({ x, y, w = 34, h = 22, cracked = false }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={SAND} {...stroke} />
      <rect x={x} y={y + h - 6} width={w} height="6" fill={SAND_DARK} opacity="0.5" />
      {cracked && <path d={`M${x + w * 0.3} ${y} L${x + w * 0.45} ${y + h * 0.4} L${x + w * 0.35} ${y + h * 0.6} L${x + w * 0.55} ${y + h}`} fill="none" stroke="#d9534f" strokeWidth="2.5" />}
    </g>
  );
}

/* ---------- The seven scenes ---------- */

function Plan() {
  return (
    <>
      <Sky id="plan" top="#ffd9a0" bottom="#f7b267" />
      <circle className="eg-sun" cx="330" cy="70" r="26" fill="#fff1c1" />
      <Dunes />
      <Pyramid x={200} base={170} h={120} ghost />
      {/* table with the plan on it */}
      <rect x="150" y="186" width="100" height="7" fill="#8a6a45" {...stroke} />
      <rect x="160" y="193" width="6" height="39" fill="#8a6a45" {...stroke} />
      <rect x="234" y="193" width="6" height="39" fill="#8a6a45" {...stroke} />
      <rect x="160" y="172" width="64" height="15" fill={LINEN} {...stroke} transform="skewX(-12)" />
      <path d="M170 184 L184 174 L198 184" fill="none" stroke={LAPIS} strokeWidth="2" />
      <path d="M232 186 L242 172 L252 186 Z" fill={GOLD} {...stroke} />
      <Figure x={110} kind="dog" s={0.92} armFront={-72} armBack={8} holdBack={<Ankh />} />
      <Figure x={300} kind="cat" flip s={0.86} armFront={-40} holdFront={<Scroll open />} nemes={false} kilt="#f6d6e2" />
    </>
  );
}

function Analysis() {
  return (
    <>
      <Sky id="analysis" top="#1b1f4a" bottom="#5a4a8a" />
      <Stars />
      <Ufo x={318} y={46} />
      <Dunes far="#b58f58" />
      {/* surveying rope between stakes */}
      <path d="M150 226 Q235 232 330 226" fill="none" stroke="#b08a55" strokeWidth="2.5" />
      {[150, 213, 270, 330].map((sx) => (
        <rect key={sx} x={sx - 2} y="212" width="4" height="18" fill="#8a6a45" stroke={INK} strokeWidth="1.5" />
      ))}
      <Figure x={110} kind="dog" s={0.92} armFront={-18} holdFront={<Rod />} armBack={10} />
      <Figure x={300} kind="cat" flip s={0.86} armFront={-160} armBack={-20} holdBack={<Scroll />} nemes />
    </>
  );
}

function Design() {
  return (
    <>
      <Sky id="design" top="#bfe3ff" bottom="#f4d9a8" />
      <Dunes />
      {/* easel with the elevation drawing */}
      <path d="M232 232 L252 92 L272 232 M252 92 L252 232" fill="none" stroke="#8a6a45" strokeWidth="5" strokeLinecap="round" />
      <rect x="182" y="70" width="150" height="112" fill="#f8f1df" {...stroke} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`v${i}`} x1={192 + i * 26} y1="78" x2={192 + i * 26} y2="174" stroke={LAPIS} strokeWidth="0.8" opacity="0.4" />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <line key={`h${i}`} x1="190" y1={86 + i * 26} x2="324" y2={86 + i * 26} stroke={LAPIS} strokeWidth="0.8" opacity="0.4" />
      ))}
      <path d="M200 166 L257 92 L314 166 Z" fill="none" stroke={LAPIS} strokeWidth="2.5" />
      <path d="M257 92 V166 M228 129 H286" stroke={LAPIS} strokeWidth="1.2" strokeDasharray="4 3" />
      <path d="M200 174 H314 M200 170 V178 M314 170 V178" stroke="#d9534f" strokeWidth="1.5" />
      <text x="257" y="182" textAnchor="middle" fontSize="8" fill="#d9534f" fontFamily="monospace">230 cubits</text>
      <Figure x={120} kind="cat" s={0.92} armFront={-80} holdFront={<Stylus />} armBack={6} holdBack={<Scroll />} nemes />
    </>
  );
}

function Development() {
  return (
    <>
      <Sky id="dev" top="#ffcf8a" bottom="#f59e5a" />
      <circle className="eg-sun" cx="70" cy="60" r="22" fill="#fff1c1" />
      <Dunes />
      <Pyramid x={318} base={180} h={130} built={0.55} />
      {/* sled, block and rope */}
      <rect x="168" y="224" width="64" height="6" rx="3" fill="#8a6a45" {...stroke} />
      <Block x={176} y={194} w={48} h={30} />
      <path d="M176 210 Q140 196 88 178" fill="none" stroke="#b08a55" strokeWidth="3" />
      <Figure x={130} kind="dog" s={0.86} lean={8} armFront={-78} armBack={-70} holdFront={<RopeEnd />} />
      <Figure x={84} kind="dog" s={0.86} fur="#55505e" lean={10} armFront={-82} armBack={-74} holdFront={<RopeEnd />} nemes={false} />
      <Figure x={262} kind="cat" flip s={0.78} armFront={-50} holdFront={<Ankh />} />
    </>
  );
}

function Ai() {
  return (
    <>
      <Sky id="ai" top="#123a4a" bottom="#3f7a7a" />
      <Stars n={18} />
      <Dunes far="#b8925a" />
      <Pyramid x={300} base={190} h={140} built={0.72} />
      {/* the machine lifts only the heaviest stone */}
      <Ufo x={250} y={40} beam />
      <g className="eg-cap">
        <Block x={232} y={98} w={40} h={26} />
      </g>
      {/* the carving stays by hand: a stela half inscribed */}
      <rect x="128" y="132" width="60" height="100" rx="26" ry="10" fill="#d9c08a" {...stroke} />
      <path d="M140 150 h10 M156 150 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M142 166 l8 -6 l8 6 M160 168 h14 M140 184 q6 -8 12 0 q6 8 12 0" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M140 200 h20 M164 200 h10" stroke={INK} strokeWidth="2" opacity="0.35" strokeDasharray="3 3" />
      <Figure x={98} kind="cat" s={0.86} armFront={-62} holdFront={<Stylus />} nemes />
      <Figure x={380} kind="dog" flip s={0.8} armFront={-58} holdFront={<Scroll open />} />
    </>
  );
}

function Testing() {
  return (
    <>
      <Sky id="test" top="#c8f0c0" bottom="#f0deb0" />
      <Dunes />
      {/* a test wall of blocks, one flagged */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <Block key={`${r}${c}`} x={168 + c * 36 + (r % 2) * 18} y={210 - r * 24} w={36} h={24} cracked={r === 1 && c === 2} />
        ))
      )}
      <circle cx="267" cy="198" r="13" fill="none" stroke="#d9534f" strokeWidth="3" strokeDasharray="5 3" />
      <Figure x={118} kind="cat" s={0.9} armFront={-138} holdFront={<Mallet />} nemes />
      <Figure x={350} kind="dog" flip s={0.86} armFront={-62} holdFront={<Plumb />} />
    </>
  );
}

function Deployment() {
  return (
    <>
      <Sky id="deploy" top="#141235" bottom="#4b2f6e" />
      <Stars n={34} />
      <Dunes far="#a07c4a" />
      <Pyramid x={200} base={220} h={140} capstone={false} />
      <Ufo x={200} y={34} beam />
      <path className="eg-cap" d="M188 88 L200 70 L212 88 Z" fill={GOLD} {...stroke} />
      <Figure x={70} kind="dog" s={0.86} armFront={-150} />
      <Figure x={336} kind="cat" flip s={0.8} armFront={-168} armBack={-140} />
    </>
  );
}

function Maintenance() {
  return (
    <>
      <Sky id="maint" top="#ff9d6c" bottom="#ffd59e" />
      <circle className="eg-sun" cx="300" cy="96" r="40" fill="#fff0b8" />
      <Dunes />
      <Pyramid x={255} base={200} h={140} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={152 + i * 9} cy={226 - i * 4} r={3 - i * 0.6} fill={SAND_DARK} opacity="0.7" />
      ))}
      <Figure x={118} kind="cat" s={0.9} armFront={-28} armBack={-18} holdFront={<Broom />} nemes={false} kilt="#d8f0e6" />
      <Figure x={370} kind="dog" flip s={0.82} armFront={-70} holdFront={<Scroll open />} />
    </>
  );
}

const SCENES = { Plan, Analysis, Design, Development, "AI/ML": Ai, Testing, Deployment, Maintenance };

export function PhaseScene({ name, className }) {
  const Scene = SCENES[name];
  return (
    <svg className={className} viewBox="0 0 400 260" role="img" aria-label={`${name}: animal-folk in pharaoh dress at work on a pyramid`}>
      <Scene />
    </svg>
  );
}
