/* Covers for the blog cards on the home story, drawn in the site's own
   ink-outline style instead of the Medium artwork. Each has a little
   idle life (CSS/SMIL, so nothing runs per scroll frame), and paths
   marked data-sc="draw" draw in with the Blogs scene. */

const INK = "#15131f";
const CREAM = "#f4efe6";

/** "X to Y": a life plotted as data, the fitted path running to Y. */
function LifeFit() {
  const pts = [[58, 132], [80, 120], [96, 124], [118, 104], [140, 100], [160, 86], [184, 80], [204, 66], [228, 58], [250, 44]];
  return (
    <>
      <rect width="320" height="180" fill="#ffe8b8" />
      <g stroke="#e9c98a" strokeWidth="1">
        {Array.from({ length: 15 }, (_, i) => <line key={`v${i}`} x1={i * 22 + 6} y1="0" x2={i * 22 + 6} y2="180" />)}
        {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 22 + 4} x2="320" y2={i * 22 + 4} />)}
      </g>
      <path d="M40 150 H290 M40 150 V20" stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M284 144 L292 150 L284 156 M34 26 L40 18 L46 26" stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="292" y="170" fontSize="16" fontWeight="700" fill={INK} textAnchor="end" fontFamily="system-ui, sans-serif">X</text>
      <text x="18" y="30" fontSize="16" fontWeight="700" fill={INK} fontFamily="system-ui, sans-serif">Y</text>
      <path data-sc="draw" d="M52 138 C110 126 150 96 196 76 S250 46 262 40" stroke="#ff7a59" strokeWidth="4" strokeLinecap="round" fill="none" />
      {pts.map(([x, y], i) => (
        <circle key={x} className="bl-pop" cx={x} cy={y} r="5" fill={i % 3 ? "#7bdcb5" : "#8fa8ff"} stroke={INK} strokeWidth="2" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
      {/* the target: a flag at Y */}
      <g className="bl-bob">
        <path d="M262 40 V14" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M262 14 L286 20 L262 28 Z" fill="#ffd166" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </>
  );
}

/** Cloud computing over coffee: the cup is the server, its steam the cloud. */
function CoffeeCloud() {
  return (
    <>
      <rect width="320" height="180" fill="#bfe3f0" />
      <path d="M0 150 H320 V180 H0 Z" fill="#c98f5a" stroke={INK} strokeWidth="3" />
      {/* the client: a laptop asking for coffee */}
      <g>
        <path d="M30 148 L38 104 L100 104 L94 148 Z" fill="#3b3550" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M22 150 H104" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <path d="M52 120 L60 126 L52 132 M66 134 H78" stroke="#7bdcb5" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
      <path id="bl-order" d="M100 116 C130 90 160 96 188 112" stroke={INK} strokeWidth="2" strokeDasharray="5 6" fill="none" opacity="0.6" />
      <circle r="5" fill="#ff7a59" stroke={INK} strokeWidth="2">
        <animateMotion dur="2.2s" repeatCount="indefinite">
          <mpath href="#bl-order" />
        </animateMotion>
      </circle>
      {/* the server: a takeaway cup */}
      <path d="M190 92 H262 L254 150 H198 Z" fill={CREAM} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M193 112 H259 L257 126 H195 Z" fill="#b5651d" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="186" y="84" width="80" height="10" rx="4" fill="#ffffff" stroke={INK} strokeWidth="3" />
      {/* steam rising into a cloud full of servers */}
      <path className="bl-steam" d="M214 80 q-8 -10 0 -20 M238 80 q-8 -10 0 -20" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      <g className="bl-bob">
        <path d="M176 46 a18 18 0 0 1 14 -28 a26 26 0 0 1 48 -6 a20 20 0 0 1 32 22 a14 14 0 0 1 -6 22 Z" fill="#ffffff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {[198, 220, 242].map((x, i) => (
          <g key={x}>
            <rect x={x - 8} y="26" width="16" height="22" rx="2" fill="#3b3550" stroke={INK} strokeWidth="2" />
            <circle className="sc-led" cx={x} cy="32" r="2.2" fill={i === 1 ? "#ffd166" : "#7bdcb5"} style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        ))}
      </g>
    </>
  );
}

/** AWS regions and McAloo Tikkis: the same burger served from every region. */
function TikkiRegions() {
  const pins = [[96, 66], [132, 52], [160, 84], [118, 104], [176, 58]];
  return (
    <>
      <rect width="320" height="180" fill="#ffd9a8" />
      <circle cx="40" cy="30" r="60" fill="#ffc778" />
      {/* the globe, with a pin per region */}
      <g>
        <circle cx="136" cy="82" r="62" fill="#7fc6e0" stroke={INK} strokeWidth="3" />
        <path d="M90 60 Q110 46 128 56 Q138 70 122 78 Q104 86 92 76 Z M146 92 Q170 82 184 96 Q182 120 160 124 Q144 112 146 92 Z" fill="#7bdcb5" stroke={INK} strokeWidth="2.5" />
        <ellipse className="bl-spin" cx="136" cy="82" rx="26" ry="62" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.5" />
        <path d="M74 82 H198" stroke={INK} strokeWidth="1.5" opacity="0.5" />
        {pins.map(([x, y], i) => (
          <g key={x}>
            <circle className="bl-ping" cx={x} cy={y} r="9" fill="none" stroke="#ff7a59" strokeWidth="2" style={{ animationDelay: `${i * 0.35}s` }} />
            <circle cx={x} cy={y} r="4.5" fill="#ff7a59" stroke={INK} strokeWidth="2" />
          </g>
        ))}
      </g>
      {/* the burger, front and centre */}
      <g className="bl-bob">
        <path d="M214 96 Q248 58 284 96 Z" fill="#e8a24a" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M232 80 l2 2 M248 72 l2 2 M262 82 l2 2" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
        <path d="M208 100 Q218 94 228 100 T248 100 T268 100 T290 100" stroke="#5fbf5a" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="210" y="104" width="78" height="18" rx="9" fill="#ffb627" stroke={INK} strokeWidth="3" />
        <path d="M222 113 h6 M240 111 h8 M262 114 h6" stroke="#c97a10" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M212 126 H286 Q286 144 249 144 Q212 144 212 126 Z" fill="#e8a24a" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      </g>
      {/* three availability zones, all serving */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={214 + i * 26} y="152" width="20" height="16" rx="3" fill={CREAM} stroke={INK} strokeWidth="2.5" />
          <circle className="sc-led" cx={224 + i * 26} cy="160" r="2.6" fill="#7bdcb5" style={{ animationDelay: `${i * 0.25}s` }} />
        </g>
      ))}
    </>
  );
}

/** Picks the cover from the post's URL; falls back to the coffee one. */
export function BlogArt({ url, className }) {
  return (
    <svg className={className} viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {url.includes("x-to-y") ? <LifeFit /> : url.includes("aws-regions") ? <TikkiRegions /> : <CoffeeCloud />}
    </svg>
  );
}
