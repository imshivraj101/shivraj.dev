/* Shivraj as a friendly-neighbourhood web-slinger, for the Blogs and
   the finale: his own face, a red suit with black web lines and blue
   sides, a home-made spider emblem. Two poses:
   - "hang": upside down on a thread from the top of the section;
   - "swing": one hand on a web line, the other shooting a web.
   The figure is drawn upright in a 200x300 box; "hang" flips it, and
   the thread runs off past the box (overflow visible) to the top edge. */
import pilot from "../../assets/pilot.webp";

const INK = "#15131f";
const RED = "#d62828";
const BLUE = "#2b59c3";

/** A limb as a thick outlined stroke: ink underneath, colour on top. */
function Limb({ d, color = RED, w = 18 }) {
  return (
    <>
      <path d={d} stroke={INK} strokeWidth={w + 6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={d} stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  );
}

export function Spidey({ pose = "hang", uid, className }) {
  const head = `sp-head-${uid}`;
  const torso = `sp-torso-${uid}`;
  const hang = pose === "hang";
  return (
    <svg className={className} viewBox="0 0 200 300" overflow="visible" aria-hidden="true">
      <defs>
        <clipPath id={head}>
          <circle cx="100" cy="56" r="38" />
        </clipPath>
        <clipPath id={torso}>
          <path d="M62 94 Q100 84 138 94 L132 172 Q100 182 68 172 Z" />
        </clipPath>
      </defs>
      <g transform={hang ? "rotate(180 100 150)" : undefined}>
        {/* the web he hangs from / swings on */}
        {hang ? (
          <line x1="100" y1="282" x2="100" y2="1400" stroke="#f4efe6" strokeWidth="2.5" />
        ) : (
          <line x1="62" y1="14" x2="-60" y2="-900" stroke="#f4efe6" strokeWidth="2.5" />
        )}

        {/* legs: blue thighs, red boots */}
        <Limb d="M84 168 L76 222" color={BLUE} w={22} />
        <Limb d="M116 168 L126 222" color={BLUE} w={22} />
        <Limb d={hang ? "M76 222 L96 276" : "M76 222 L64 270"} />
        <Limb d={hang ? "M126 222 L104 276" : "M126 222 L146 262"} />

        {/* arms */}
        {hang ? (
          <>
            <Limb d="M70 104 L44 62 L36 28" />
            <Limb d="M130 104 L156 62 L164 28" />
            <circle cx="36" cy="24" r="10" fill={RED} stroke={INK} strokeWidth="3" />
            <circle cx="164" cy="24" r="10" fill={RED} stroke={INK} strokeWidth="3" />
          </>
        ) : (
          <>
            <Limb d="M72 102 L66 54 L62 20" />
            <circle cx="62" cy="14" r="10" fill={RED} stroke={INK} strokeWidth="3" />
            <g className="sp-thwip">
              <Limb d="M130 104 L168 104 L196 92" />
              <circle cx="200" cy="90" r="10" fill={RED} stroke={INK} strokeWidth="3" />
              {/* a fresh web shot: strand plus a little splat */}
              <path d="M208 86 L320 40" stroke="#f4efe6" strokeWidth="2.5" strokeDasharray="10 6" />
              <path d="M320 40 m-12 -4 l24 8 m-20 8 l16 -16 m-14 -2 l12 20" stroke="#f4efe6" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* torso: red with a web pattern, blue side panels, emblem */}
        <path d="M62 94 Q100 84 138 94 L132 172 Q100 182 68 172 Z" fill={RED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <g clipPath={`url(#${torso})`}>
          <path d="M62 94 L74 94 L80 176 L64 176 Z M138 94 L126 94 L120 176 L136 176 Z" fill={BLUE} />
          <g stroke={INK} strokeWidth="1.3" fill="none" opacity="0.85">
            <path d="M100 92 V180 M100 92 L80 180 M100 92 L120 180 M100 92 L66 150 M100 92 L134 150" />
            <path d="M84 104 Q100 112 116 104 M78 124 Q100 134 122 124 M74 146 Q100 158 126 146 M72 166 Q100 178 128 166" />
          </g>
        </g>
        {/* home-made spider emblem */}
        <g stroke={INK} strokeWidth="2.2" strokeLinecap="round">
          <path d="M100 118 l-12 -8 M100 118 l12 -8 M100 122 l-14 0 M100 122 l14 0 M100 126 l-12 8 M100 126 l12 8 M100 120 l-8 -12 M100 120 l8 -12" />
        </g>
        <ellipse cx="100" cy="117" rx="4" ry="5" fill={INK} />
        <ellipse cx="100" cy="127" rx="5" ry="7" fill={INK} />

        {/* head: his face, with a red collar where the suit meets it */}
        <g clipPath={`url(#${head})`}>
          <rect x="60" y="16" width="80" height="80" fill="#2a3a8a" />
          <image href={pilot.src} x="58" y="14" width="84" height="84" />
        </g>
        <circle cx="100" cy="56" r="38" fill="none" stroke={INK} strokeWidth="3" />
        <path d="M74 92 Q100 104 126 92 L128 100 Q100 112 72 100 Z" fill={RED} stroke={INK} strokeWidth="3" strokeLinejoin="round" />

        {/* spider-sense */}
        <g className="sp-sense" stroke="#ffd166" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M52 34 l-10 -4 l6 -6 l-10 -4" />
          <path d="M148 34 l10 -4 l-6 -6 l10 -4" />
          <path d="M100 6 l-4 -8 l6 -2 l-4 -8" />
        </g>
      </g>
    </svg>
  );
}

/** A corner cobweb. `corner` picks which way it fans out. */
export function Cobweb({ corner = "tl", className }) {
  const flip = { tl: "", tr: "scale(-1 1)", bl: "scale(1 -1)", br: "scale(-1 -1)" }[corner];
  const spokes = [0, 15, 30, 45, 60, 75, 90];
  const ring = (r) =>
    spokes
      .map((a, i) => {
        const t = (a * Math.PI) / 180;
        const x = (Math.cos(t) * r).toFixed(1);
        const y = (Math.sin(t) * r).toFixed(1);
        return `${i ? "Q" + (Math.cos(t - 0.13) * r * 0.86).toFixed(1) + " " + (Math.sin(t - 0.13) * r * 0.86).toFixed(1) + " " : "M"}${x} ${y}`;
      })
      .join(" ");
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <g transform={flip ? `translate(${corner.includes("r") ? 200 : 0} ${corner.includes("b") ? 200 : 0}) ${flip}` : undefined} fill="none" stroke="#e9e4ff" strokeWidth="1.6" opacity="0.5">
        {spokes.map((a) => {
          const t = (a * Math.PI) / 180;
          return <path key={a} data-sc="draw" d={`M0 0 L${(Math.cos(t) * 200).toFixed(1)} ${(Math.sin(t) * 200).toFixed(1)}`} />;
        })}
        {[40, 75, 110, 145, 180].map((r) => (
          <path key={r} data-sc="draw" d={ring(r)} />
        ))}
      </g>
    </svg>
  );
}
