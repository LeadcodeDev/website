import { Children, isValidElement, useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { Step, Steps, useSlidePageNumber } from '@open-slide/core';

// ─── Design ───────────────────────────────────────────────────────────────────
export const design: DesignSystem = {
  palette: { bg: '#fafaf9', text: '#1c1917', accent: '#EF7809' },
  fonts: {
    display: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    body: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  typeScale: { hero: 120, body: 34 },
  radius: 4,
};

const muted = '#57534e';
const dim = '#a8a29e';
const border = '#d6d3d1';
const surface = '#f5f5f4';
const accentSoft = '#fff3e6';
const warn = '#b42318';
const warnSoft = '#fef3f2';
const mono = '"JetBrains Mono", "Fira Code", ui-monospace, monospace';

// ─── Briques ──────────────────────────────────────────────────────────────────
const page: CSSProperties = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  position: 'relative',
};

const GridBackdrop = () => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `linear-gradient(${border} 1px, transparent 1px), linear-gradient(90deg, ${border} 1px, transparent 1px)`,
      backgroundSize: '80px 80px',
      opacity: 0.22,
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
    }}
  />
);

const Footer = ({ section }: { section: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 48,
        left: 110,
        right: 110,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: mono,
        fontSize: 16,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: dim,
      }}
    >
      <span>{section}</span>
      <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ color: muted }}>{String(current).padStart(2, '0')}</span>
        <span style={{ width: 20, height: 1, background: dim }} />
        <span>{String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

// Content area: 1700 x 840 (110 px side margins, 90 px top, 150 px bottom).
const Slide = ({ section, children }: { section: string; children: ReactNode }) => (
  <div style={page}>
    <GridBackdrop />
    <div
      style={{
        position: 'absolute',
        top: 90,
        left: 110,
        right: 110,
        bottom: 150,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
    <Footer section={section} />
  </div>
);

const Tag = ({ text }: { text: string }) => (
  <div
    style={{
      fontFamily: mono,
      fontSize: 22,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
      marginBottom: 24,
    }}
  >
    {text}
  </div>
);

const Title = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 64,
      fontWeight: 800,
      lineHeight: 1.2,
      margin: '0 0 32px',
    }}
  >
    {children}
  </h2>
);

type Tone = 'neutral' | 'accent' | 'muted' | 'warn';

const toneStyle: Record<Tone, { bg: string; line: string; ink: string; dash?: string }> = {
  neutral: { bg: surface, line: border, ink: 'var(--osd-text)' },
  accent: { bg: accentSoft, line: 'var(--osd-accent)', ink: 'var(--osd-text)' },
  muted: { bg: 'transparent', line: dim, ink: muted, dash: '8 6' },
  warn: { bg: warnSoft, line: warn, ink: warn },
};

const Box = ({
  label,
  sub,
  tone = 'neutral',
  w = 260,
  h = 100,
}: {
  label: string;
  sub?: string;
  tone?: Tone;
  w?: number;
  h?: number;
}) => {
  const t = toneStyle[tone];
  return (
    <div
      style={{
        width: w,
        height: h,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 16px',
        background: t.bg,
        color: t.ink,
        border: `3px ${t.dash ? 'dashed' : 'solid'} ${t.line}`,
        borderRadius: 'var(--osd-radius)',
        flexShrink: 0,
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>
        {label}
      </div>
      {sub ? (
        <div style={{ fontSize: 22, lineHeight: 1.3, color: muted, marginTop: 4 }}>{sub}</div>
      ) : null}
    </div>
  );
};

const Arrow = ({
  dir,
  label,
  dashed,
}: {
  dir: 'right' | 'down' | 'left' | 'up';
  label?: string;
  dashed?: boolean;
}) => {
  const horizontal = dir === 'right' || dir === 'left';
  const flip = dir === 'left' || dir === 'up';
  const line = dashed ? dim : 'var(--osd-text)';
  const caption = label ? (
    <span style={{ fontFamily: mono, fontSize: 22, color: muted, whiteSpace: 'nowrap' }}>
      {label}
    </span>
  ) : null;
  const svg = horizontal ? (
    <svg
      width={110}
      height={28}
      viewBox="0 0 110 28"
      style={{ transform: flip ? 'rotate(180deg)' : undefined, flexShrink: 0 }}
    >
      <line
        x1={2}
        y1={14}
        x2={92}
        y2={14}
        stroke={line}
        strokeWidth={3}
        strokeDasharray={dashed ? '8 6' : undefined}
      />
      <polygon points="108,14 90,4 90,24" fill={line} />
    </svg>
  ) : (
    <svg
      width={28}
      height={80}
      viewBox="0 0 28 80"
      style={{ transform: flip ? 'rotate(180deg)' : undefined, flexShrink: 0 }}
    >
      <line
        x1={14}
        y1={2}
        x2={14}
        y2={62}
        stroke={line}
        strokeWidth={3}
        strokeDasharray={dashed ? '8 6' : undefined}
      />
      <polygon points="14,78 4,60 24,60" fill={line} />
    </svg>
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: horizontal ? 'column' : 'row',
        alignItems: 'center',
        gap: horizontal ? 4 : 14,
        flexShrink: 0,
      }}
    >
      {caption}
      {svg}
    </div>
  );
};

const markColor: Record<'neutral' | 'accent' | 'muted', string> = {
  neutral: '#1c1917',
  accent: '#EF7809',
  muted,
};

const Timeline = ({
  marks,
}: {
  marks: { at: number; label: string; tone?: 'neutral' | 'accent' | 'muted' }[];
}) => (
  <div style={{ position: 'relative', height: 170, margin: '0 110px' }}>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 85,
        height: 4,
        background: border,
      }}
    />
    {marks.map((m, i) => {
      const c = markColor[m.tone ?? 'neutral'];
      const above = i % 2 === 0;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${m.at * 100}%`,
            top: 0,
            height: 170,
            width: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -11,
              top: 76,
              width: 22,
              height: 22,
              borderRadius: 11,
              background: c,
              border: '3px solid #fafaf9',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -110,
              width: 220,
              textAlign: 'center',
              fontFamily: mono,
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.2,
              color: c,
              ...(above ? { bottom: 98 } : { top: 98 }),
            }}
          >
            {m.label}
          </div>
        </div>
      );
    })}
  </div>
);

const Exercise = ({ steps }: { steps: string[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
    {steps.map((s, i) => (
      <div key={i} style={{ display: 'flex', gap: 22, alignItems: 'baseline' }}>
        <span
          style={{
            fontFamily: mono,
            fontSize: 34,
            fontWeight: 700,
            color: 'var(--osd-accent)',
            width: 56,
            flexShrink: 0,
          }}
        >
          {i + 1}.
        </span>
        <span style={{ fontSize: 34, lineHeight: 1.4 }}>{s}</span>
      </div>
    ))}
  </div>
);

const Middle = ({ children }: { children: ReactNode }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 60 }}>
    {children}
  </div>
);

const BREAK_TINTS = ['#fbd9bd', '#f8c39a', '#f6b07a', '#fdecc8', '#fbe3d0'];
const BREAK_PALE = '#fdecc8';
const BREAK_CELL = 56;
const BREAK_HERO = { x: 1568, y: 448, size: 224 };

const seeded = (seed: string) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const BreakSquares = ({ n, seed }: { n: string; seed: string }) => {
  const rand = seeded(seed);
  const cols = Math.ceil(1920 / BREAK_CELL);
  const rows = Math.ceil(1080 / BREAK_CELL);
  const heroCx = BREAK_HERO.x + BREAK_HERO.size / 2;
  const heroCy = BREAK_HERO.y + BREAK_HERO.size / 2;
  const free = (x: number, y: number) => {
    const inHero =
      x + BREAK_CELL > BREAK_HERO.x &&
      x < BREAK_HERO.x + BREAK_HERO.size &&
      y + BREAK_CELL > BREAK_HERO.y &&
      y < BREAK_HERO.y + BREAK_HERO.size;
    const inText = x < 1400 && y + BREAK_CELL > 270 && y < 780;
    const inFooter = y > 940 && x > 1600;
    return x >= 0 && y >= 0 && x + BREAK_CELL <= 1920 && y + BREAK_CELL <= 1080 && !inHero && !inText && !inFooter;
  };
  const taken = new Set<string>();
  const cells: ReactNode[] = [];
  const put = (x: number, y: number) => {
    const key = `${x}-${y}`;
    if (taken.has(key) || !free(x, y)) return false;
    taken.add(key);
    const pale = rand() < 0.2;
    const tint = BREAK_TINTS[Math.floor(rand() * BREAK_TINTS.length)];
    cells.push(
      <div
        key={key}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: BREAK_CELL,
          height: BREAK_CELL,
          background: pale ? BREAK_PALE : tint,
        }}
      />,
    );
    return true;
  };
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * BREAK_CELL;
      const y = row * BREAK_CELL;
      const dx = x + BREAK_CELL / 2 - heroCx;
      const dy = y + BREAK_CELL / 2 - heroCy;
      const gapX = Math.max(BREAK_HERO.x - (x + BREAK_CELL), x - (BREAK_HERO.x + BREAK_HERO.size), 0);
      const gapY = Math.max(BREAK_HERO.y - (y + BREAK_CELL), y - (BREAK_HERO.y + BREAK_HERO.size), 0);
      const gap = Math.max(gapX, gapY);
      const falloff = 0.55 * Math.exp(-((dx * dx) / (620 * 620) + (dy * dy) / (300 * 300)));
      const p = gap === 0 ? 0.9 : gap <= BREAK_CELL ? Math.max(falloff, 0.7) : falloff;
      if (rand() < p && put(x, y) && rand() < 0.35) put(x + BREAK_CELL, y);
    }
  }
  return (
    <div aria-hidden style={{ position: 'absolute', left: -110, top: -90, width: 1920, height: 1080 }}>
      {cells}
      <div
        style={{
          position: 'absolute',
          left: BREAK_HERO.x,
          top: BREAK_HERO.y,
          width: BREAK_HERO.size,
          height: BREAK_HERO.size,
          background: 'var(--osd-accent)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: mono,
          fontSize: n.length > 5 ? 44 : n.length > 2 ? 72 : 110,
          fontWeight: 800,
        }}
      >
        {n}
      </div>
    </div>
  );
};

const Break = ({ n, title, sub }: { n: string; title: string; sub: string }) => (
  <Slide section="">
    <BreakSquares n={n} seed={`${n}${title}`} />
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
        maxWidth: 1250,
        position: 'relative',
      }}
    >
      <div
        style={{
          fontFamily: mono,
          fontSize: 28,
          letterSpacing: '0.2em',
          color: 'var(--osd-accent)',
        }}
      >
        {/^\d+$/.test(n) ? `PARTIE ${n}` : n === 'Env' ? 'MISE EN PLACE' : n.toUpperCase()}
      </div>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 100,
          fontWeight: 800,
          lineHeight: 1.1,
          margin: 0,
          whiteSpace: 'pre-line',
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: 40, lineHeight: 1.5, color: muted, margin: 0 }}>{sub}</p>
    </div>
  </Slide>
);

// ─── Ouverture ────────────────────────────────────────────────────────────────

// ─── Couleurs et briques propres à ce deck ────────────────────────────────────
const ok = '#15803d';
const okSoft = '#f0fdf4';
const codeBg = '#1c1917';
const codeText = '#e7e5e4';
const codeKeyword = '#FDBA74';
const codeString = '#86EFAC';
const codeComment = '#78716C';
const codeNumber = '#FCD34D';

const TOKEN =
  /(\/\/.*$|"(?:[^"\\]|\\.)*"|`[^`]*`|\b(?:package|import|func|return|if|else|for|range|type|struct|var|const|defer|go|switch|case|default|interface|map|make|nil|true|false|error)\b|\b\d+\b)/;
const tokenColor = (t: string) =>
  t.startsWith('//') ? codeComment : /^["`]/.test(t) ? codeString : /^\d/.test(t) ? codeNumber : codeKeyword;

const Hl = ({ line }: { line: string }) => (
  <>
    {line.split(TOKEN).map((p, i) =>
      i % 2 === 1 ? (
        <span key={i} style={{ color: tokenColor(p) }}>
          {p}
        </span>
      ) : (
        p
      ),
    )}
  </>
);

const Code = ({
  code,
  size = 26,
  w,
  title,
  hot,
  plain,
}: {
  code: string;
  size?: number;
  w?: number;
  title?: string;
  hot?: number[];
  plain?: boolean;
}) => {
  const lines = code.replace(/^\n/, '').replace(/\n$/, '').split('\n');
  return (
    <div
      style={{
        width: w,
        background: codeBg,
        borderRadius: 'var(--osd-radius)',
        overflow: 'hidden',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {title ? (
        <div
          style={{
            fontFamily: mono,
            fontSize: 20,
            letterSpacing: '0.1em',
            color: codeComment,
            padding: '12px 28px',
            borderBottom: '2px solid #44403c',
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ padding: '20px 28px', fontFamily: mono, fontSize: size, lineHeight: 1.45, color: codeText }}>
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              whiteSpace: 'pre',
              minHeight: size * 1.45,
              margin: '0 -28px',
              padding: '0 28px',
              background: hot?.includes(i + 1) ? 'rgba(239,120,9,0.28)' : 'transparent',
            }}
          >
            {plain ? l : <Hl line={l} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const Tbl = ({
  head,
  rows,
  widths,
  size = 28,
}: {
  head: string[];
  rows: string[][];
  widths: number[];
  size?: number;
}) => (
  <div style={{ border: `3px solid ${border}`, borderRadius: 'var(--osd-radius)', overflow: 'hidden', background: '#fff' }}>
    <div style={{ display: 'flex', background: 'var(--osd-text)', color: '#fff' }}>
      {head.map((h, i) => (
        <div
          key={i}
          style={{
            width: widths[i],
            boxSizing: 'border-box',
            padding: '14px 22px',
            fontFamily: mono,
            fontSize: 22,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {h}
        </div>
      ))}
    </div>
    {rows.map((r, ri) => (
      <div
        key={ri}
        style={{ display: 'flex', borderTop: ri ? `2px solid ${border}` : 'none', background: ri % 2 ? surface : '#fff' }}
      >
        {r.map((c, i) => (
          <div
            key={i}
            style={{
              width: widths[i],
              boxSizing: 'border-box',
              padding: '11px 22px',
              fontFamily: i === 0 ? mono : undefined,
              fontWeight: i === 0 ? 700 : 400,
              fontSize: size,
              lineHeight: 1.3,
              color: i === 0 ? 'var(--osd-text)' : muted,
            }}
          >
            {c}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Cap = ({ children }: { children: ReactNode }) => (
  <p style={{ fontSize: 32, lineHeight: 1.45, color: muted, margin: '20px 0 0' }}>{children}</p>
);

const Card = ({
  title,
  tone = 'neutral',
  w = 540,
  h,
  children,
}: {
  title: string;
  tone?: 'neutral' | 'accent' | 'warn' | 'ok';
  w?: number;
  h?: number;
  children: ReactNode;
}) => {
  const c = {
    neutral: { line: border, bg: surface, ink: 'var(--osd-text)' },
    accent: { line: 'var(--osd-accent)', bg: accentSoft, ink: 'var(--osd-text)' },
    warn: { line: warn, bg: warnSoft, ink: warn },
    ok: { line: ok, bg: okSoft, ink: ok },
  }[tone];
  return (
    <div
      style={{
        width: w,
        height: h,
        boxSizing: 'border-box',
        border: `3px solid ${c.line}`,
        background: c.bg,
        borderRadius: 'var(--osd-radius)',
        padding: '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        flexShrink: 0,
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 30, fontWeight: 700, color: c.ink, lineHeight: 1.2 }}>{title}</div>
      <div style={{ fontSize: 28, lineHeight: 1.45, color: muted }}>{children}</div>
    </div>
  );
};

// ─── SVG animé (SMIL) ─────────────────────────────────────────────────────────
// Un cycle dure D secondes. s et e sont des fractions du cycle (0 à 1) :
// l'élément n'existe que dans la fenêtre [s, e].
const SVG_PAD = 40;
// Les lignes passent sous les badges, les badges sous les cartes.
const layer = (c: ReactNode) =>
  isValidElement(c) ? (c.type === Ln ? 0 : c.type === Pkt ? 1 : 2) : 2;

const Svg = ({ h, children, w = 1700 }: { h: number; children: ReactNode; w?: number }) => (
  <svg
    width={w + 2 * SVG_PAD}
    height={h + 2 * SVG_PAD}
    viewBox={`${-SVG_PAD} ${-SVG_PAD} ${w + 2 * SVG_PAD} ${h + 2 * SVG_PAD}`}
    style={{ display: 'block', flexShrink: 0, margin: -SVG_PAD }}
  >
    <defs>
      <marker id="ap-a" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1c1917" />
      </marker>
      <marker id="ap-o" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#EF7809" />
      </marker>
      <marker id="ap-d" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#a8a29e" />
      </marker>
    </defs>
    {Children.toArray(children).sort((a, b) => layer(a) - layer(b))}
  </svg>
);

type NTone = 'neutral' | 'accent' | 'muted' | 'warn' | 'ok';
const nTone: Record<NTone, { bg: string; line: string; ink: string; dash?: string }> = {
  neutral: { bg: surface, line: border, ink: '#1c1917' },
  accent: { bg: accentSoft, line: '#EF7809', ink: '#1c1917' },
  muted: { bg: '#ffffff', line: dim, ink: muted, dash: '8 6' },
  warn: { bg: warnSoft, line: warn, ink: warn },
  ok: { bg: okSoft, line: ok, ink: ok },
};

const Nd = ({
  x,
  y,
  w,
  h,
  label,
  sub,
  tone = 'neutral',
  size = 28,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tone?: NTone;
  size?: number;
}) => {
  const t = nTone[tone];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={t.bg} stroke={t.line} strokeWidth={3} strokeDasharray={t.dash} />
      <text
        x={x + w / 2}
        y={y + h / 2 - (sub ? 14 : 0)}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={mono}
        fontSize={size}
        fontWeight={700}
        fill={t.ink}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 22}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={size - 6}
          fill={muted}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
};

const Ln = ({ d, tone = 'dark', dashed }: { d: string; tone?: 'dark' | 'accent' | 'dim'; dashed?: boolean }) => (
  <path
    d={d}
    fill="none"
    stroke={tone === 'accent' ? '#EF7809' : tone === 'dim' ? dim : '#1c1917'}
    strokeWidth={3}
    strokeDasharray={dashed ? '8 6' : undefined}
    markerEnd={`url(#${tone === 'accent' ? 'ap-o' : tone === 'dim' ? 'ap-d' : 'ap-a'})`}
  />
);

const T = ({
  x,
  y,
  children,
  size = 26,
  anchor = 'middle',
  color = muted,
  mono: useMono = true,
  weight = 400,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
  mono?: boolean;
  weight?: number;
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    dominantBaseline="central"
    fontFamily={useMono ? mono : 'Inter, system-ui, sans-serif'}
    fontSize={size}
    fontWeight={weight}
    fill={color}
  >
    {children}
  </text>
);

const win = (s: number, e: number, D: number) => (
  <animate
    attributeName="opacity"
    dur={`${D}s`}
    repeatCount="indefinite"
    calcMode="discrete"
    values="0;1;0;0"
    keyTimes={`0;${s};${e};1`}
  />
);

const PKT_COLOR = { accent: '#EF7809', ok: ok, warn: warn, dark: '#1c1917' };

const Pkt = ({
  path,
  label,
  s,
  e,
  D = 6,
  tone = 'accent',
}: {
  path: string;
  label: string;
  s: number;
  e: number;
  D?: number;
  tone?: keyof typeof PKT_COLOR;
}) => {
  const w = label.length * 14 + 30;
  return (
    <g opacity={0}>
      <animateMotion
        dur={`${D}s`}
        repeatCount="indefinite"
        path={path}
        calcMode="linear"
        keyPoints="0;0;1;1"
        keyTimes={`0;${s};${e};1`}
      />
      {win(s, e, D)}
      <rect x={-w / 2} y={-20} width={w} height={40} rx={4} fill={PKT_COLOR[tone]} />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={mono}
        fontSize={21}
        fontWeight={700}
        fill="#fff"
      >
        {label}
      </text>
    </g>
  );
};

const Hot = ({
  x,
  y,
  w,
  h,
  s,
  e,
  D = 6,
  tone = 'accent',
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  e: number;
  D?: number;
  tone?: keyof typeof PKT_COLOR;
}) => (
  <rect
    x={x - 5}
    y={y - 5}
    width={w + 10}
    height={h + 10}
    rx={6}
    fill="none"
    stroke={PKT_COLOR[tone]}
    strokeWidth={6}
    opacity={0}
  >
    {win(s, e, D)}
  </rect>
);

const Say = ({
  x,
  y,
  s,
  e,
  D = 6,
  children,
  size = 26,
  anchor = 'middle',
  color = '#EF7809',
}: {
  x: number;
  y: number;
  s: number;
  e: number;
  D?: number;
  children: ReactNode;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    dominantBaseline="central"
    fontFamily={mono}
    fontSize={size}
    fontWeight={700}
    fill={color}
    opacity={0}
  >
    {win(s, e, D)}
    {children}
  </text>
);

const Grille = ({
  n,
  section,
  intro,
  rows,
  title = 'Grille de notation : on part de 20',
}: {
  n: number;
  section: string;
  intro: string;
  rows: string[][];
  title?: string;
}) => (
  <Slide section={section}>
    <Tag text={`Évaluation · note ${n} / 3`} />
    <Title>{title}</Title>
    <p style={{ fontSize: 28, lineHeight: 1.4, color: muted, margin: '0 0 22px' }}>{intro}</p>
    <Tbl head={['Critère', 'Pénalité']} widths={[1300, 400]} rows={rows} size={27} />
  </Slide>
);

const Tp = ({
  n,
  section,
  title,
  steps,
  rendu,
}: {
  n: number;
  section: string;
  title: string;
  steps: string[];
  rendu: string;
}) => (
  <Slide section={section}>
    <Tag text={`TP noté ${n}`} />
    <Title>{title}</Title>
    <div style={{ marginTop: 10 }}>
      <Exercise steps={steps} />
    </div>
    <div
      style={{
        marginTop: 'auto',
        borderLeft: '8px solid var(--osd-accent)',
        paddingLeft: 24,
        fontSize: 30,
        lineHeight: 1.4,
        color: muted,
      }}
    >
      {rendu}
    </div>
  </Slide>
);

// ─── Ouverture ────────────────────────────────────────────────────────────────
type Entry = { page: Page; note?: string };

const Cover: Page = () => (
  <Slide section="">
    <BreakSquares n="API" seed="cover-api-ynov" />
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 28,
        maxWidth: 1300,
        position: 'relative',
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 28, letterSpacing: '0.2em', color: 'var(--osd-accent)' }}>
        BACHELOR 1 · DÉVELOPPEMENT WEB
      </div>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 130,
          fontWeight: 800,
          lineHeight: 1.05,
          margin: 0,
        }}
      >
        Anatomie
        <br />
        d’une <span style={{ color: 'var(--osd-accent)' }}>API</span>
      </h1>
      <div style={{ width: 160, height: 8, background: 'var(--osd-accent)' }} />
      <p style={{ fontSize: 48, lineHeight: 1.4, color: muted, margin: 0 }}>
        Construire et sécuriser une API REST en Go
      </p>
    </div>
  </Slide>
);

 const MonolithPage: Page = () => (
  <Slide section={S1}>
    <Tag text="Monolithe" />
    <Title>Monolithe : le serveur renvoie du HTML</Title>
    <Svg h={480}>
      <Nd x={0} y={170} w={300} h={130} label="Navigateur" sub="affiche la page" />
      <rect x={1000} y={10} width={700} height={450} rx={4} fill="none" stroke={dim} strokeWidth={3} strokeDasharray="8 6" />
      <T x={1350} y={40} size={22} color={dim}>UN SEUL PROGRAMME</T>
      <Nd x={1040} y={70} w={620} h={90} label="Routes" tone="neutral" />
      <Nd x={1040} y={190} w={620} h={90} label="Logique métier" tone="neutral" />
      <Nd x={1040} y={310} w={620} h={90} label="Templates HTML" tone="accent" />
      <Ln d="M 305 215 H 995" />
      <Ln d="M 995 265 H 305" tone="accent" />
      <T x={650} y={180} size={24}>GET /artists</T>
      <T x={650} y={300} size={24}>page HTML complète</T>
      <Pkt path="M 300 215 H 1000" label="GET /artists" s={0.05} e={0.3} D={7} tone="dark" />
      <Hot x={1040} y={190} w={620} h={90} s={0.3} e={0.45} D={7} />
      <Hot x={1040} y={310} w={620} h={90} s={0.45} e={0.6} D={7} />
      <Pkt path="M 1000 265 H 300" label="<html>…</html>" s={0.62} e={0.9} D={7} />
    </Svg>
    <Cap>Données, logique et mise en page sont mélangées. Le client reçoit du HTML, pas des données.</Cap>
  </Slide>
);

const ApiPage: Page = () => (
  <Slide section={S1}>
    <Tag text="API" />
    <Title>API : le serveur renvoie du JSON</Title>
    <Svg h={560}>
      <Nd x={0} y={30} w={290} h={100} label="App web" />
      <Nd x={0} y={230} w={290} h={100} label="App mobile" />
      <Nd x={0} y={430} w={290} h={100} label="Postman" tone="accent" />
      <Nd x={880} y={170} w={380} h={220} label="API Go" sub="renvoie du JSON" tone="accent" size={34} />
      <rect x={1340} y={190} width={360} height={180} rx={4} fill={codeBg} />
      <T x={1370} y={228} size={21} anchor="start" color={codeText}>{'{'}</T>
      <T x={1395} y={268} size={21} anchor="start" color={codeString}>"id": 1,</T>
      <T x={1395} y={304} size={21} anchor="start" color={codeString}>"name": "Daft Punk"</T>
      <T x={1370} y={340} size={21} anchor="start" color={codeText}>{'}'}</T>
      <Ln d="M 295 80 L 875 230" dashed tone="dim" />
      <Ln d="M 295 280 L 875 280" dashed tone="dim" />
      <Ln d="M 295 480 L 875 330" dashed tone="dim" />
      <Pkt path="M 290 80 L 880 230" label="GET" s={0.04} e={0.2} D={9} tone="dark" />
      <Pkt path="M 880 235 L 290 85" label="JSON" s={0.22} e={0.38} D={9} />
      <Pkt path="M 290 280 L 880 280" label="GET" s={0.36} e={0.52} D={9} tone="dark" />
      <Pkt path="M 880 285 L 290 285" label="JSON" s={0.54} e={0.7} D={9} />
      <Pkt path="M 290 480 L 880 330" label="GET" s={0.68} e={0.84} D={9} tone="dark" />
      <Pkt path="M 880 335 L 290 485" label="JSON" s={0.86} e={0.98} D={9} />
    </Svg>
    <Cap>Un seul backend sert tous les clients. Chacun décide comment afficher les données.</Cap>
  </Slide>
);

const MonolithVsApi: Page = () => (
  <Slide section={S1}>
    <Tag text="Comparaison" />
    <Title>Monolithe et API : comparaison</Title>
    <Tbl
      head={['', 'Monolithe (HTML)', 'API (JSON)']}
      widths={[360, 670, 670]}
      size={28}
      rows={[
        ['Réponse', 'Une page HTML', 'Des données JSON'],
        ['Clients', 'Un navigateur', 'Web, mobile, Postman, autres services'],
        ['Mise en page', 'Côté serveur', 'Côté client'],
        ['Évolution', 'Tout bouge ensemble', 'Le contrat reste stable'],
        ['Test', 'Il faut un navigateur', 'Postman suffit'],
      ]}
    />
    <Cap>Ce module : on ne construit que l’API. Pas de HTML renvoyé, que du JSON.</Cap>
  </Slide>
);

const HttpCycle: Page = () => (
  <Slide section={S1}>
    <Tag text="HTTP" />
    <Title>Le cycle requête / réponse HTTP</Title>
    <Svg h={440}>
      <Nd x={0} y={120} w={300} h={170} label="Client" sub="Postman, navigateur" size={34} />
      <Nd x={1400} y={120} w={300} h={170} label="Serveur Go" sub=":8080" tone="accent" size={34} />
      <Ln d="M 305 165 H 1395" />
      <Ln d="M 1395 250 H 305" tone="accent" />
      <Pkt path="M 300 165 H 1400" label="Request" s={0.05} e={0.35} D={8} tone="dark" />
      <Hot x={1400} y={120} w={300} h={170} s={0.35} e={0.52} D={8} />
      <Pkt path="M 1400 250 H 300" label="Response" s={0.55} e={0.85} D={8} />
      <Say x={850} y={90} s={0.05} e={0.35} D={8} color="#1c1917">1 · Le client demande</Say>
      <Say x={1480} y={330} s={0.35} e={0.52} D={8}>2 · Le serveur traite</Say>
      <Say x={850} y={330} s={0.55} e={0.85} D={8}>3 · Le serveur répond</Say>
    </Svg>
    <Cap>HTTP ne garde pas de mémoire : chaque requête est indépendante.</Cap>
  </Slide>
);

const AnatRow = ({ code, label, sub, hot }: { code: string; label: string; sub: string; hot?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
    <Code code={code} w={1000} size={26} />
    <div style={{ borderLeft: `8px solid ${hot ? 'var(--osd-accent)' : dim}`, paddingLeft: 22 }}>
      <div style={{ fontFamily: mono, fontSize: 30, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 26, color: muted, lineHeight: 1.35 }}>{sub}</div>
    </div>
  </div>
);

const RequestAnatomy: Page = () => (
  <Slide section={S1}>
    <Tag text="Request" />
    <Title>Structure d’une requête HTTP</Title>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Steps>
        <Step>
          <AnatRow code={'POST /artists HTTP/1.1'} label="Méthode + chemin" sub="Quoi faire, sur quelle ressource" hot />
        </Step>
        <Step>
          <AnatRow
            code={'Host: localhost:8080\nContent-Type: application/json\nAuthorization: Bearer abc123'}
            label="En-têtes"
            sub="Des infos sur la requête : format, identité"
          />
        </Step>
        <Step>
          <AnatRow code={'{ "name": "Daft Punk", "genre": "electro" }'} label="Corps (body)" sub="Les données envoyées, en JSON" hot />
        </Step>
      </Steps>
    </div>
  </Slide>
);

const ResponseAnatomy: Page = () => (
  <Slide section={S1}>
    <Tag text="Response" />
    <Title>Structure d’une réponse HTTP</Title>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Steps>
        <Step>
          <AnatRow code={'HTTP/1.1 201 Created'} label="Code de statut" sub="Le résultat : réussi, refusé, cassé" hot />
        </Step>
        <Step>
          <AnatRow
            code={'Content-Type: application/json\nLocation: /artists/42'}
            label="En-têtes"
            sub="Format de la réponse, adresse de la ressource créée"
          />
        </Step>
        <Step>
          <AnatRow code={'{ "id": 42, "name": "Daft Punk", "genre": "electro" }'} label="Corps (body)" sub="Les données renvoyées" hot />
        </Step>
      </Steps>
    </div>
  </Slide>
);

const Methods: Page = () => (
  <Slide section={S1}>
    <Tag text="Méthodes HTTP" />
    <Title>Les méthodes HTTP</Title>
    <Tbl
      head={['Méthode', 'Rôle', 'Body', 'Idempotente', 'Exemple']}
      widths={[220, 400, 170, 260, 650]}
      size={27}
      rows={[
        ['GET', 'Lire', 'non', 'oui', 'GET /artists/42'],
        ['POST', 'Créer', 'oui', 'non', 'POST /artists'],
        ['PUT', 'Remplacer entièrement', 'oui', 'oui', 'PUT /artists/42'],
        ['PATCH', 'Modifier une partie', 'oui', 'selon le cas', 'PATCH /artists/42'],
        ['DELETE', 'Supprimer', 'non', 'oui', 'DELETE /artists/42'],
      ]}
    />
    <Cap>GET ne modifie jamais rien. Un client peut le répéter sans danger.</Cap>
  </Slide>
);

const IdempotenceLane = ({
  y,
  title,
  tone,
  method,
  stateStart,
  stateOne,
  stateTwo,
  verdict,
}: {
  y: number;
  title: string;
  tone: 'ok' | 'warn';
  method: string;
  stateStart: string;
  stateOne: string;
  stateTwo: string;
  verdict: string;
}) => {
  const D = 12;
  const col = tone === 'ok' ? ok : warn;
  const row = y + 50;
  const mid = row + 55;
  return (
    <g>
      <T x={0} y={y + 10} size={30} anchor="start" color={col} weight={700}>{title}</T>
      <Nd x={0} y={row} w={260} h={110} label="Client" />
      <Nd x={560} y={row} w={300} h={110} label="Serveur" tone="accent" />
      <Nd x={1100} y={row} w={600} h={110} label="" tone={tone} />
      <T x={1400} y={row - 18} size={22} color={dim}>données du serveur</T>
      <Ln d={`M 265 ${mid} H 555`} />
      <Ln d={`M 865 ${mid} H 1095`} dashed tone="dim" />
      <Pkt path={`M 260 ${mid} H 560`} label={`${method} #1`} s={0.04} e={0.16} D={D} tone="dark" />
      <Pkt path={`M 260 ${mid} H 560`} label={`${method} #2`} s={0.3} e={0.42} D={D} tone="dark" />
      <Say x={410} y={mid + 50} s={0.04} e={0.28} D={D} color="#1c1917">envoi n°1</Say>
      <Say x={410} y={mid + 50} s={0.3} e={0.55} D={D} color="#1c1917">envoi n°2</Say>
      <Say x={1400} y={mid} s={0} e={0.17} D={D} color={dim}>{stateStart}</Say>
      <Say x={1400} y={mid} s={0.17} e={0.43} D={D} color={col}>{stateOne}</Say>
      <Say x={1400} y={mid} s={0.43} e={1} D={D} color={col}>{stateTwo}</Say>
      <Say x={850} y={row + 150} s={0.45} e={1} D={D} color={col} size={28}>{verdict}</Say>
    </g>
  );
};

const IdempotenceProblem: Page = () => (
  <Slide section={S3}>
    <Tag text="Idempotence" />
    <Title>Idempotence : le problème</Title>
    <Svg h={400}>
      <Nd x={0} y={110} w={300} h={130} label="Client" sub="Postman" />
      <Nd x={1400} y={110} w={300} h={130} label="Serveur" sub="votre API" tone="accent" />
      <Ln d="M 305 150 H 1395" />
      <Ln d="M 1395 205 H 305" dashed tone="dim" />
      <Pkt path="M 300 150 H 1400" label="PUT /artists/42" s={0.04} e={0.3} D={11} tone="dark" />
      <Hot x={1400} y={110} w={300} h={130} s={0.3} e={0.42} D={11} />
      <Pkt path="M 1400 205 H 860" label="200 OK" s={0.44} e={0.62} D={11} tone="ok" />
      <Say x={850} y={205} s={0.62} e={1} D={11} color={warn} size={64}>✕</Say>
      <Say x={850} y={275} s={0.62} e={1} D={11} color={warn}>réponse perdue</Say>
      <Say x={0} y={330} s={0.7} e={1} D={11} color="#1c1917" size={30} anchor="start">Ça a marché ? Je renvoie la requête ?</Say>
    </Svg>
    <Cap>Le réseau coupe : le client ne sait pas si le serveur a traité sa requête. Peut-il la renvoyer sans risque ?</Cap>
  </Slide>
);

const IdempotencePage: Page = () => (
  <Slide section={S3}>
    <Tag text="Idempotence" />
    <Title>Idempotence : envoyer la requête 2 fois</Title>
    <p style={{ fontSize: 28, lineHeight: 1.4, color: muted, margin: '0 0 8px' }}>
      Le client envoie 2 fois la même requête. On regarde ce que contiennent les données du serveur après chaque envoi.
    </p>
    <Svg h={520}>
      <IdempotenceLane
        y={0}
        title="PUT : remplacer l’artiste 42 par « Daft Punk »"
        tone="ok"
        method="PUT"
        stateStart={'artiste 42 : "Ancien nom"'}
        stateOne={'artiste 42 : "Daft Punk"'}
        stateTwo={'artiste 42 : "Daft Punk"'}
        verdict="Même état qu’après un seul envoi : idempotent"
      />
      <IdempotenceLane
        y={270}
        title="POST : créer l’artiste « Daft Punk »"
        tone="warn"
        method="POST"
        stateStart="aucun artiste"
        stateOne="1 artiste : id 1"
        stateTwo="2 artistes : id 1 et id 2"
        verdict="Un doublon a été créé : pas idempotent"
      />
    </Svg>
    <Cap>Idempotent : répéter la requête laisse le serveur dans le même état qu’un seul envoi.</Cap>
  </Slide>
);

const IdempotenceAxes: Page = () => {
  const Ex = ({ children }: { children: ReactNode }) => (
    <div style={{ fontFamily: mono, fontSize: 25, color: 'var(--osd-text)', marginTop: 6 }}>{children}</div>
  );
  return (
    <Slide section={S3}>
      <Tag text="Idempotence" />
      <Title>Obtenir l’idempotence : 4 pistes</Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
        <Card title="1 · Choisir la bonne méthode" tone="accent" w={830} h={290}>
          PUT et DELETE sont idempotents par définition. POST ne l’est pas.
          <Ex>PUT /artists/42</Ex>
        </Card>
        <Card title="2 · Décrire l’état final" w={830} h={290}>
          On envoie la valeur voulue, pas une opération à rejouer.
          <Ex>{'{ "stock": 10 }'} et non {'{ "add": 1 }'}</Ex>
        </Card>
        <Card title="3 · Clé d’idempotence" w={830} h={290}>
          Le client joint un identifiant unique. Au 2e envoi, le serveur renvoie la même réponse sans recréer.
          <Ex>Idempotency-Key: 7f3a9c</Ex>
        </Card>
        <Card title="4 · Refuser les doublons" w={830} h={290}>
          Une règle d’unicité rejette le 2e POST au lieu de créer un doublon.
          <Ex>POST /artists → 409 Conflict</Ex>
        </Card>
      </div>
    </Slide>
  );
};

const CrudTable: Page = () => (
  <Slide section={S1}>
    <Tag text="Étape 2" />
    <Title>Les 5 routes de /artists</Title>
    <Tbl
      head={['Action', 'Méthode et chemin', 'Succès']}
      widths={[500, 800, 400]}
      size={28}
      rows={[
        ['Lister', 'GET /artists', '200 OK'],
        ['Lire un artiste', 'GET /artists/{id}', '200 OK'],
        ['Créer', 'POST /artists', '201 Created'],
        ['Remplacer', 'PUT /artists/{id}', '200 OK'],
        ['Supprimer', 'DELETE /artists/{id}', '204 No Content'],
      ]}
    />
    <Cap>Les chemins sont des noms au pluriel. Le verbe, c’est la méthode HTTP.</Cap>
  </Slide>
);

const StatusFamilies: Page = () => {
  const Fam = ({ n, title, sub, tone }: { n: string; title: string; sub: string; tone: 'ok' | 'accent' | 'warn' | 'neutral' }) => (
    <Card title={n} tone={tone} w={400} h={360}>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 800, color: 'var(--osd-text)', lineHeight: 1.2 }}>
        {title}
      </div>
      <div style={{ marginTop: 10 }}>{sub}</div>
    </Card>
  );
  return (
    <Slide section={S1}>
      <Tag text="Status code" />
      <Title>Les familles de status codes</Title>
      <div style={{ display: 'flex', gap: 33 }}>
        <Fam n="2xx" title="Réussi" sub="Tout s’est bien passé" tone="ok" />
        <Fam n="3xx" title="Redirigé" sub="Allez voir ailleurs" tone="neutral" />
        <Fam n="4xx" title="Erreur du client" sub="La requête est à corriger" tone="accent" />
        <Fam n="5xx" title="Erreur du serveur" sub="Le client n’y peut rien" tone="warn" />
      </div>
      <Cap>On renvoie 4xx quand le client se trompe, 5xx quand c’est notre code qui casse.</Cap>
    </Slide>
  );
};

const StatusTable: Page = () => (
  <Slide section={S1}>
    <Tag text="Status code" />
    <Title>Les 10 codes à connaître</Title>
    <Tbl
      head={['Code', 'Nom', 'Quand l’utiliser']}
      widths={[160, 470, 1070]}
      size={25}
      rows={[
        ['200', 'OK', 'Lecture ou modification réussie'],
        ['201', 'Created', 'Ressource créée (avec l’en-tête Location)'],
        ['204', 'No Content', 'Réussi, rien à renvoyer (DELETE)'],
        ['400', 'Bad Request', 'Requête illisible : JSON invalide'],
        ['401', 'Unauthorized', 'Pas identifié : jeton absent ou faux'],
        ['403', 'Forbidden', 'Identifié, mais pas le droit'],
        ['404', 'Not Found', 'La ressource n’existe pas'],
        ['409', 'Conflict', 'Conflit avec l’état actuel : doublon'],
        ['422', 'Unprocessable Entity', 'JSON valide, mais données incorrectes'],
        ['500', 'Internal Server Error', 'Bug côté serveur'],
      ]}
    />
  </Slide>
);

const StatusFlow: Page = () => {
  const Row = ({ y, q, code }: { y: number; q: string; code: string }) => (
    <g>
      <Nd x={0} y={y} w={640} h={70} label={q} size={26} />
      <Ln d={`M 645 ${y + 35} H 915`} dashed tone="dim" />
      <T x={780} y={y + 12} size={22}>non</T>
      <Nd x={920} y={y} w={300} h={70} label={code} tone="warn" size={26} />
    </g>
  );
  return (
    <Slide section={S1}>
      <Tag text="Décider" />
      <Title>Choisir le status code</Title>
      <Svg h={650} w={1700}>
        <Pkt path="M 320 0 V 570" label="requête" s={0.05} e={0.95} D={9} />
        <Row y={0} q="Le JSON est-il lisible ?" code="400 Bad Request" />
        <Row y={92} q="Le client est-il identifié ?" code="401 Unauthorized" />
        <Row y={184} q="A-t-il le droit ?" code="403 Forbidden" />
        <Row y={276} q="La ressource existe-t-elle ?" code="404 Not Found" />
        <Row y={368} q="Les données sont-elles valides ?" code="422 Unprocessable" />
        <Row y={460} q="Pas de bug de notre côté ?" code="500 Internal" />
        <Nd x={0} y={565} w={640} h={70} label="Tout va bien" tone="ok" size={26} />
        <Nd x={920} y={565} w={300} h={70} label="200 · 201 · 204" tone="ok" size={26} />
        <Ln d="M 645 600 H 915" tone="accent" />
        <T x={1500} y={300} size={26} color={muted} anchor="middle" mono={false}>
          On teste les erreurs d’abord.
        </T>
        <T x={1500} y={340} size={26} color={muted} anchor="middle" mono={false}>
          Le succès arrive en dernier.
        </T>
      </Svg>
    </Slide>
  );
};

const RichardsonLevels: Page = () => {
  const Level = ({
    n,
    title,
    sub,
    ex,
    h,
    tone = 'neutral',
  }: {
    n: number;
    title: string;
    sub: string;
    ex: string[];
    h: number;
    tone?: 'neutral' | 'accent';
  }) => (
    <Card title={`Niveau ${n} · ${title}`} tone={tone} w={400} h={h}>
      <div>{sub}</div>
      <div style={{ fontFamily: mono, fontSize: 22, lineHeight: 1.5, color: 'var(--osd-text)', marginTop: 14 }}>
        {ex.map((l) => (
          <div key={l} style={{ whiteSpace: 'pre' }}>
            {l}
          </div>
        ))}
      </div>
    </Card>
  );
  return (
    <Slide section={S1}>
      <Tag text="REST" />
      <Title>Les 4 niveaux de maturité de Richardson</Title>
      <div style={{ display: 'flex', gap: 33, alignItems: 'flex-end', height: 470 }}>
        <Level n={0} title="POX" h={310} sub="Un seul endpoint, tout en POST." ex={['POST /api', '{"action": "getArtist"}']} />
        <Level n={1} title="URLs" h={360} sub="Une URL par ressource, mais toujours POST." ex={['POST /artists/42']} />
        <Level
          n={2}
          title="Verbes"
          h={410}
          tone="accent"
          sub="Méthodes HTTP et status codes."
          ex={['GET /artists/42', '→ 200 ou 404']}
        />
        <Level n={3} title="HATEOAS" h={470} sub="La réponse contient les liens des actions suivantes." ex={['"links": {', '  "delete": "/artists/42"', '}']} />
      </div>
      <Cap>Ce module vise le niveau 2. Le niveau 3 est rare en pratique.</Cap>
    </Slide>
  );
};

const RoutingPage: Page = () => (
  <Slide section={S1}>
    <Tag text="Routing" />
    <Title>Routing : le routeur appelle le bon handler</Title>
    <Svg h={540}>
      <Pkt path="M 260 270 L 620 280" label="GET /artists/42" s={0.04} e={0.2} D={10} tone="dark" />
      <Pkt path="M 260 270 L 620 360" label="POST /artists" s={0.52} e={0.68} D={10} tone="dark" />
      <Nd x={0} y={210} w={260} h={120} label="Client" />
      <rect x={620} y={110} width={420} height={320} rx={4} fill={surface} stroke={border} strokeWidth={3} />
      <T x={830} y={140} size={24} weight={700} color="#1c1917">ServeMux</T>
      <Nd x={645} y={170} w={370} h={60} label="GET /artists" size={24} />
      <Nd x={645} y={250} w={370} h={60} label="GET /artists/{id}" size={24} />
      <Nd x={645} y={330} w={370} h={60} label="POST /artists" size={24} />
      <Nd x={1280} y={20} w={420} h={100} label="listArtists" tone="accent" />
      <Nd x={1280} y={220} w={420} h={100} label="getArtist" tone="accent" />
      <Nd x={1280} y={420} w={420} h={100} label="createArtist" tone="accent" />
      <Ln d="M 265 270 H 615" />
      <Ln d="M 1020 200 C 1150 200 1150 70 1275 70" dashed tone="dim" />
      <Ln d="M 1020 280 H 1275" dashed tone="dim" />
      <Ln d="M 1020 360 C 1150 360 1150 470 1275 470" dashed tone="dim" />
      <Hot x={645} y={250} w={370} h={60} s={0.2} e={0.45} D={10} />
      <Pkt path="M 1020 280 H 1280" label="→" s={0.22} e={0.36} D={10} />
      <Hot x={1280} y={220} w={420} h={100} s={0.36} e={0.48} D={10} />
      <Hot x={645} y={330} w={370} h={60} s={0.68} e={0.95} D={10} />
      <Pkt path="M 1020 360 C 1150 360 1150 470 1280 470" label="→" s={0.7} e={0.84} D={10} />
      <Hot x={1280} y={420} w={420} h={100} s={0.84} e={0.96} D={10} />
    </Svg>
    <Cap>Le routeur compare la méthode et le chemin à sa table, puis appelle le handler.</Cap>
  </Slide>
);

const RoutingCode: Page = () => (
  <Slide section={S1}>
    <Tag text="Routing en Go" />
    <Title>Déclarer ses routes en Go</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1000}
        size={26}
        title="main.go"
        code={`
mux := http.NewServeMux()

mux.HandleFunc("GET /artists", listArtists)
mux.HandleFunc("GET /artists/{id}", getArtist)
mux.HandleFunc("POST /artists", createArtist)
mux.HandleFunc("PUT /artists/{id}", updateArtist)
mux.HandleFunc("DELETE /artists/{id}", deleteArtist)
`}
        hot={[4, 5]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Méthode + chemin" tone="accent" w={660}>
          Un seul motif suffit depuis Go 1.22
        </Card>
        <Card title="{id}" w={660}>
          Un paramètre de chemin, lu avec <b style={{ fontFamily: mono }}>r.PathValue("id")</b>
        </Card>
        <Card title="Mauvaise méthode" w={660}>
          Le chemin existe mais pas la méthode : Go répond 405 tout seul
        </Card>
      </div>
    </div>
  </Slide>
);

const ParamsPage: Page = () => (
  <Slide section={S1}>
    <Tag text="Paramètres" />
    <Title>Paramètres : chemin, query, body</Title>
    <div style={{ display: 'flex', gap: 40 }}>
      <Card title="Chemin" tone="accent" w={540} h={430}>
        <div style={{ fontFamily: mono, fontSize: 25, color: 'var(--osd-text)' }}>/artists/42</div>
        Identifie <b>une</b> ressource.
        <div style={{ fontFamily: mono, fontSize: 24, color: 'var(--osd-text)', marginTop: 14 }}>r.PathValue("id")</div>
      </Card>
      <Card title="Requête (query)" w={540} h={430}>
        <div style={{ fontFamily: mono, fontSize: 25, color: 'var(--osd-text)' }}>/artists?genre=rock</div>
        Filtre, trie, pagine.
        <div style={{ fontFamily: mono, fontSize: 24, color: 'var(--osd-text)', marginTop: 14 }}>
          r.URL.Query().Get("genre")
        </div>
      </Card>
      <Card title="Corps (body)" w={540} h={430}>
        <div style={{ fontFamily: mono, fontSize: 25, color: 'var(--osd-text)' }}>{'{ "name": "…" }'}</div>
        Les données à créer ou modifier.
        <div style={{ fontFamily: mono, fontSize: 24, color: 'var(--osd-text)', marginTop: 14 }}>
          json.NewDecoder(r.Body)
        </div>
      </Card>
    </div>
  </Slide>
);

const HandlerAnatomy: Page = () => (
  <Slide section={S1}>
    <Tag text="Handler" />
    <Title>Structure d’un handler</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1010}
        size={25}
        code={`
func getArtist(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")

    artist, found := store[id]
    if !found {
        http.Error(w, "not found", http.StatusNotFound)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(artist)
}
`}
        hot={[2, 5, 6, 7, 8]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Card title="r : la requête" w={650}>
          Ce que le client a envoyé. On ne fait que lire.
        </Card>
        <Card title="w : la réponse" tone="accent" w={650}>
          Ce qu’on renvoie : en-têtes d’abord, puis le body.
        </Card>
        <Card title="return" tone="warn" w={650}>
          Après une erreur, on s’arrête. Sinon le code continue.
        </Card>
      </div>
    </div>
  </Slide>
);

const HandlerJson: Page = () => (
  <Slide section={S1}>
    <Tag text="JSON" />
    <Title>Lire et écrire du JSON</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1050}
        size={24}
        code={`
func createArtist(w http.ResponseWriter, r *http.Request) {
    var a Artist
    if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
        http.Error(w, "invalid json", http.StatusBadRequest)
        return
    }
    a.ID = nextID()
    store[a.ID] = a

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(a)
}
`}
        hot={[3, 11, 12]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Code
          w={620}
          size={24}
          code={`
type Artist struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Genre string \`json:"genre"\`
}
`}
        />
        <Card title="Dans cet ordre" tone="accent" w={620}>
          En-têtes, puis WriteHeader, puis le body
        </Card>
      </div>
    </div>
  </Slide>
);

const HelloServer: Page = () => (
  <Slide section={S1}>
    <Tag text="Démarrer" />
    <Title>Un serveur Go minimal</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1000}
        size={25}
        code={`
package main

import (
    "log"
    "net/http"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /health", health)

    log.Println("écoute sur :8080")
    log.Fatal(http.ListenAndServe(":8080", mux))
}
`}
        hot={[10, 13]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Lancer" tone="accent" w={660}>
          <span style={{ fontFamily: mono }}>go run .</span>
        </Card>
        <Card title="Tester" w={660}>
          Postman : GET <span style={{ fontFamily: mono }}>localhost:8080/health</span>
        </Card>
        <Card title="ListenAndServe" w={660}>
          Bloque et sert les requêtes. S’il rend la main, c’est une erreur.
        </Card>
      </div>
    </div>
  </Slide>
);

 const Rappel2: Page = () => (
  <Slide section={S1}>
    <Tag text="Étape 1 terminée" />
    <Title>Du code répété dans chaque handler</Title>
    <Svg h={330}>
      <Nd x={0} y={90} w={300} h={130} label="Postman" />
      <Nd x={470} y={90} w={300} h={130} label="Routeur" />
      <Nd x={940} y={90} w={300} h={130} label="Handler" tone="accent" />
      <Nd x={1410} y={90} w={290} h={130} label="Réponse" sub="status + JSON" />
      <Ln d="M 305 155 H 465" />
      <Ln d="M 775 155 H 935" />
      <Ln d="M 1245 155 H 1405" />
      <Pkt path="M 70 155 H 1630" label="requête" s={0.05} e={0.9} D={8} tone="dark" />
    </Svg>
    <Cap>Et si on veut journaliser chaque requête, lui donner un identifiant… dans chaque handler ?</Cap>
  </Slide>
);

const Onion: Page = () => (
  <Slide section={S1}>
    <Tag text="Middleware" />
    <Title>Middleware : principe</Title>
    <Svg h={590}>
      <rect x={100} y={10} width={1500} height={520} rx={4} fill="none" stroke={border} strokeWidth={3} />
      <rect x={250} y={80} width={1200} height={380} rx={4} fill="none" stroke={border} strokeWidth={3} />
      <rect x={400} y={150} width={900} height={240} rx={4} fill="none" stroke={border} strokeWidth={3} />
      <T x={130} y={38} size={24} anchor="start" weight={700} color="#1c1917">Logging</T>
      <T x={280} y={108} size={24} anchor="start" weight={700} color="#1c1917">Request ID</T>
      <T x={430} y={178} size={24} anchor="start" weight={700} color="#1c1917">Auth</T>
      <Nd x={620} y={210} w={460} h={140} label="Handler" tone="accent" size={34} />
      <Ln d="M 0 280 H 95" />
      <Ln d="M 1605 280 H 1695" tone="accent" />
      <Pkt path="M 70 280 H 620" label="Request" s={0.04} e={0.42} D={10} tone="dark" />
      <Hot x={100} y={10} w={1500} h={520} s={0.08} e={0.16} D={10} />
      <Hot x={250} y={80} w={1200} h={380} s={0.16} e={0.24} D={10} />
      <Hot x={400} y={150} w={900} h={240} s={0.24} e={0.32} D={10} />
      <Hot x={620} y={210} w={460} h={140} s={0.34} e={0.46} D={10} />
      <Pkt path="M 1080 310 H 1630" label="Response" s={0.52} e={0.94} D={10} />
      <Hot x={400} y={150} w={900} h={240} s={0.6} e={0.68} D={10} />
      <Hot x={250} y={80} w={1200} h={380} s={0.68} e={0.76} D={10} />
      <Hot x={100} y={10} w={1500} h={520} s={0.76} e={0.84} D={10} />
      <Say x={850} y={570} s={0.04} e={0.46} D={10} color="#1c1917">Aller : chaque couche peut agir, ou bloquer</Say>
      <Say x={850} y={570} s={0.52} e={0.94} D={10} color="#1c1917">Retour : chaque couche peut compléter la réponse</Say>
    </Svg>
  </Slide>
);

const MiddlewareCode: Page = () => (
  <Slide section={S1}>
    <Tag text="Middleware en Go" />
    <Title>Écrire un middleware en Go</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Code
          w={1060}
          size={24}
          title="middleware.go"
          code={`
func Logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}
`}
          hot={[4]}
        />
        <Code w={1060} size={24} code={`http.ListenAndServe(":8080", Logging(mux))`} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Card title="Reçoit un handler" w={600}>
          next est le suivant dans la chaîne
        </Card>
        <Card title="Rend un handler" w={600}>
          On peut donc en empiler plusieurs
        </Card>
        <Card title="next.ServeHTTP" tone="accent" w={600}>
          Passe la main. Avant : la requête. Après : la réponse.
        </Card>
      </div>
    </div>
  </Slide>
);

const RequestIDPage: Page = () => (
  <Slide section={S1}>
    <Tag text="Request ID" />
    <Title>Middleware Request ID</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1060}
        size={24}
        code={`
func RequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := fmt.Sprintf("%x", rand.Uint64())
        w.Header().Set("X-Request-Id", id)
        log.Printf("[%s] %s %s", id, r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}
`}
        hot={[3, 4]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Card title="Sans Request ID" tone="warn" w={600}>
          Impossible de relier une ligne de log à la réponse reçue par le client.
        </Card>
        <Card title="Avec Request ID" tone="ok" w={600}>
          Le client voit X-Request-Id dans Postman. La même valeur est dans les logs.
        </Card>
      </div>
    </div>
  </Slide>
);
const CorsPage: Page = () => (
  <Slide section={S2}>
    <Tag text="CORS" />
    <Title>Middleware CORS</Title>
    <Svg h={460}>
      <Nd x={0} y={140} w={340} h={150} label="Navigateur" sub="front sur :5173" />
      <Nd x={1360} y={140} w={340} h={150} label="API" sub=":8080" tone="accent" />
      <Ln d="M 345 180 H 1355" dashed tone="dim" />
      <Ln d="M 1355 250 H 345" dashed tone="dim" />
      <Pkt path="M 340 180 H 1360" label="OPTIONS /artists" s={0.04} e={0.26} D={10} tone="dark" />
      <Pkt path="M 1360 250 H 340" label="Allow-Origin" s={0.28} e={0.5} D={10} />
      <Pkt path="M 340 180 H 1360" label="POST /artists" s={0.55} e={0.75} D={10} tone="dark" />
      <Pkt path="M 1360 250 H 340" label="201 Created" s={0.77} e={0.96} D={10} tone="ok" />
      <Say x={850} y={90} s={0.04} e={0.5} D={10} color="#1c1917">1 · Préflight : « j’ai le droit ? »</Say>
      <Say x={850} y={90} s={0.55} e={0.96} D={10} color="#1c1917">2 · La vraie requête</Say>
    </Svg>
    <Cap>Seul le navigateur applique CORS. Avec Postman, vous ne le verrez jamais.</Cap>
  </Slide>
);

const AuthPage: Page = () => (
  <Slide section={S3}>
    <Tag text="Auth" />
    <Title>Middleware d’authentification</Title>
    <Svg h={470}>
      <T x={0} y={14} size={24} anchor="start" color={ok} weight={700}>Avec un jeton valide</T>
      <Nd x={0} y={40} w={240} h={100} label="Client" />
      <Nd x={700} y={40} w={300} h={100} label="Auth" tone="accent" />
      <Nd x={1400} y={40} w={300} h={100} label="Handler" />
      <Ln d="M 245 80 H 695" />
      <Ln d="M 1005 80 H 1395" />
      <Pkt path="M 240 75 H 700" label="Bearer abc" s={0.03} e={0.14} D={11} tone="dark" />
      <Hot x={700} y={40} w={300} h={100} s={0.14} e={0.2} D={11} tone="ok" />
      <Pkt path="M 1000 75 H 1400" label="→" s={0.2} e={0.3} D={11} />
      <Hot x={1400} y={40} w={300} h={100} s={0.3} e={0.36} D={11} />
      <Pkt path="M 1400 115 H 240" label="200 OK" s={0.36} e={0.47} D={11} tone="ok" />
      <T x={0} y={254} size={24} anchor="start" color={warn} weight={700}>Sans jeton</T>
      <Nd x={0} y={280} w={240} h={100} label="Client" />
      <Nd x={700} y={280} w={300} h={100} label="Auth" tone="accent" />
      <Nd x={1400} y={280} w={300} h={100} label="Handler" tone="muted" />
      <Ln d="M 245 320 H 695" />
      <Pkt path="M 240 315 H 700" label="(aucun)" s={0.52} e={0.63} D={11} tone="dark" />
      <Hot x={700} y={280} w={300} h={100} s={0.63} e={0.7} D={11} tone="warn" />
      <Pkt path="M 700 355 H 240" label="401" s={0.7} e={0.82} D={11} tone="warn" />
      <Say x={1550} y={430} s={0.5} e={0.96} D={11} color={dim}>jamais appelé</Say>
    </Svg>
  </Slide>
);

const ErrorFormat: Page = () => (
  <Slide section={S1}>
    <Tag text="Format d’erreur" />
    <Title>Format d’erreur JSON unique</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={24}
        code={`
type APIError struct {
    Code    string \`json:"code"\`
    Message string \`json:"message"\`
}

func writeError(w http.ResponseWriter, status int, code, msg string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(APIError{Code: code, Message: msg})
}
`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Code
          w={630}
          size={24}
          plain
          title="réponse"
          code={`
404 Not Found

  {
  "code": "artist_not_found",
  "message": "artist 42 not found"
}
`}
        />
        <Card title="Pourquoi" tone="accent" w={630}>
          Le client traite toutes les erreurs de la même façon
        </Card>
      </div>
    </div>
  </Slide>
);

const ErrorMapping: Page = () => (
  <Slide section={S1}>
    <Tag text="Erreurs métier" />
    <Title>Associer une erreur à un status code</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={24}
        code={`
var ErrNotFound = errors.New("not found")
var ErrConflict = errors.New("conflict")

func statusFor(err error) int {
    switch {
    case errors.Is(err, ErrNotFound):
        return http.StatusNotFound
    case errors.Is(err, ErrConflict):
        return http.StatusConflict
    default:
        return http.StatusInternalServerError
    }
}
`}
        hot={[11, 12]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Erreur connue" tone="ok" w={630}>
          Le client peut agir : 404, 409, 422
        </Card>
        <Card title="Erreur inconnue" tone="warn" w={630}>
          500, et le détail va dans les logs, jamais dans la réponse
        </Card>
      </div>
    </div>
  </Slide>
);

const Validation: Page = () => (
  <Slide section={S1}>
    <Tag text="Validation" />
    <Title>Validation : 400 ou 422</Title>
    <div style={{ display: 'flex', gap: 40 }}>
      <Card title="400 Bad Request" tone="warn" w={830} h={250}>
        Le JSON est illisible
        <div style={{ fontFamily: mono, fontSize: 26, color: 'var(--osd-text)', marginTop: 10 }}>{'{ "name": '}</div>
      </Card>
      <Card title="422 Unprocessable" tone="accent" w={830} h={250}>
        Le JSON est lisible, mais les données sont fausses
        <div style={{ fontFamily: mono, fontSize: 26, color: 'var(--osd-text)', marginTop: 10 }}>{'{ "name": "" }'}</div>
      </Card>
    </div>
    <div style={{ marginTop: 30 }}>
      <Code
        w={1700}
        size={26}
        code={`
if a.Name == "" {
    writeError(w, http.StatusUnprocessableEntity, "invalid_name", "name is required")
    return
}
`}
      />
    </div>
  </Slide>
);

const ErrorTraps: Page = () => (
  <Slide section={S1}>
    <Tag text="Pièges" />
    <Title>Erreurs fréquentes à éviter</Title>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
      <Card title="200 avec une erreur dedans" tone="warn" w={830} h={210}>
        Le client lit le code d’abord. Un 200 veut dire « réussi ».
      </Card>
      <Card title="err.Error() renvoyé tel quel" tone="warn" w={830} h={210}>
        On expose du SQL, des chemins de fichiers, la structure interne.
      </Card>
      <Card title="Oublier le return" tone="warn" w={830} h={210}>
        Le code continue après l’erreur et écrit une deuxième réponse.
      </Card>
      <Card title="Tout en 500" tone="warn" w={830} h={210}>
        Le client ne sait plus s’il doit corriger sa requête.
      </Card>
    </div>
  </Slide>
);

const TimeoutPage: Page = () => (
  <Slide section={S3}>
    <Tag text="Timeouts" />
    <Title>Timeouts du serveur</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={24}
        code={`
srv := &http.Server{
    Addr:              ":8080",
    Handler:           handler,
    ReadHeaderTimeout: 5 * time.Second,
    ReadTimeout:       10 * time.Second,
    WriteTimeout:      10 * time.Second,
}
log.Fatal(srv.ListenAndServe())
`}
        hot={[5, 6, 7]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="ListenAndServe seul" tone="warn" w={630}>
          Aucun timeout : un client lent garde la connexion ouverte
        </Card>
        <Card title="http.Server" tone="ok" w={630}>
          Chaque limite coupe une connexion qui traîne
        </Card>
      </div>
    </div>
  </Slide>
);

 const Spaghetti: Page = () => (
  <Slide section={S1}>
    <Tag text="Le problème" />
    <Title>Sans architecture : tout est dans le handler</Title>
    <Svg h={540}>
      <Nd x={0} y={200} w={300} h={120} label="Client" />
      <rect x={500} y={10} width={700} height={520} rx={4} fill={surface} stroke={border} strokeWidth={3} />
      <T x={850} y={38} size={24} weight={700} color="#1c1917">Handler</T>
      <Nd x={530} y={70} w={640} h={70} label="Décoder le JSON" size={25} />
      <Nd x={530} y={160} w={640} h={70} label="Valider" size={25} />
      <Nd x={530} y={250} w={640} h={70} label="Règle métier" size={25} />
      <Nd x={530} y={340} w={640} h={70} label="Accès aux données" size={25} />
      <Nd x={530} y={430} w={640} h={70} label="Écrire la réponse" size={25} />
      <Ln d="M 305 260 H 495" />
      <Pkt path="M 300 260 H 500" label="Request" s={0.04} e={0.17} D={10} tone="dark" />
      <Hot x={530} y={70} w={640} h={70} s={0.18} e={0.3} D={10} />
      <Hot x={530} y={160} w={640} h={70} s={0.3} e={0.42} D={10} />
      <Hot x={530} y={250} w={640} h={70} s={0.42} e={0.54} D={10} />
      <Hot x={530} y={340} w={640} h={70} s={0.54} e={0.66} D={10} />
      <Hot x={530} y={430} w={640} h={70} s={0.66} e={0.78} D={10} />
      <T x={1450} y={220} size={26} color={warn} mono={false}>Tout est mélangé :</T>
      <T x={1450} y={262} size={26} color={warn} mono={false}>difficile à tester,</T>
      <T x={1450} y={304} size={26} color={warn} mono={false}>difficile à changer.</T>
    </Svg>
  </Slide>
);

const Layers: Page = () => (
  <Slide section={S1}>
    <Tag text="3 couches" />
    <Title>Les 3 couches</Title>
    <Svg h={540}>
      <Nd x={0} y={200} w={260} h={120} label="Client" />
      <Nd x={400} y={10} w={900} h={150} label="Présentation" sub="couche HTTP : handlers, JSON, status" tone="neutral" size={32} />
      <Nd x={400} y={190} w={900} h={150} label="Domain" sub="règles métier" tone="accent" size={32} />
      <Nd x={400} y={370} w={900} h={150} label="Infrastructure" sub="stockage : map, base de données" tone="neutral" size={32} />
      <Ln d="M 265 255 L 395 100" />
      <Ln d="M 850 165 V 185" tone="dim" />
      <Ln d="M 850 345 V 365" tone="dim" />
      <Pkt path="M 260 260 L 400 100" label="Request" s={0.04} e={0.14} D={11} tone="dark" />
      <Hot x={400} y={10} w={900} h={150} s={0.14} e={0.26} D={11} />
      <Pkt path="M 850 160 V 190" label="↓" s={0.26} e={0.32} D={11} />
      <Hot x={400} y={190} w={900} h={150} s={0.32} e={0.44} D={11} />
      <Pkt path="M 850 340 V 370" label="↓" s={0.44} e={0.5} D={11} />
      <Hot x={400} y={370} w={900} h={150} s={0.5} e={0.62} D={11} />
      <Ln d="M 1305 445 H 1400 V 85 H 1305" dashed tone="accent" />
      <Pkt path="M 1400 445 V 85" label="200 + JSON" s={0.64} e={0.92} D={11} tone="ok" />
    </Svg>
  </Slide>
);

const CliProblem: Page = () => (
  <Slide section={S1}>
    <Tag text="Le problème" />
    <Title>Même outil, en ligne de commande ?</Title>
    <Svg h={540}>
      <Nd x={0} y={40} w={240} h={110} label="Client HTTP" size={26} />
      <Nd x={420} y={40} w={760} h={110} label="Handler HTTP" sub="décoder, valider, règle métier, stockage" size={28} />
      <Ln d="M 245 95 H 415" />
      <Pkt path="M 240 95 H 420" label="POST" s={0.04} e={0.16} D={10} tone="dark" />
      <Hot x={420} y={40} w={760} h={110} s={0.16} e={0.3} D={10} />

      <Nd x={0} y={330} w={240} h={110} label="Terminal" sub="artists add …" size={26} />
      <Nd x={420} y={330} w={760} h={110} label="Handler HTTP ?" sub="inutilisable : il attend une requête HTTP" tone="muted" size={28} />
      <Ln d="M 245 385 H 415" tone="dim" dashed />
      <Pkt path="M 240 385 H 420" label="artists add" s={0.34} e={0.46} D={10} tone="dark" />
      <Hot x={420} y={330} w={760} h={110} s={0.46} e={0.56} D={10} tone="warn" />

      <Nd x={1330} y={330} w={370} h={110} label="Copie du code" sub="pour la CLI" tone="warn" size={28} />
      <Ln d="M 1185 385 H 1325" tone="dim" dashed />
      <Hot x={1330} y={330} w={370} h={110} s={0.6} e={0.8} D={10} tone="warn" />

      <T x={420} y={500} size={26} color={warn} mono={false}>Les règles sont dans le handler : on les recopie, ou on ne peut pas réutiliser l’outil.</T>
    </Svg>
  </Slide>
);

const CliSolution: Page = () => (
  <Slide section={S1}>
    <Tag text="La solution" />
    <Title>Deux entrées, une seule logique</Title>
    <Svg h={540}>
      <Nd x={0} y={40} w={240} h={110} label="Client HTTP" size={26} />
      <Nd x={0} y={330} w={240} h={110} label="Terminal" size={26} />
      <Nd x={420} y={40} w={420} h={110} label="Handler HTTP" sub="présentation" size={28} />
      <Nd x={420} y={330} w={420} h={110} label="Commande CLI" sub="présentation" size={28} />
      <Nd x={1060} y={185} w={640} h={120} label="Domain" sub="règles métier, écrites une seule fois" tone="accent" size={30} />
      <Ln d="M 245 95 H 415" />
      <Ln d="M 245 385 H 415" />
      <Ln d="M 845 95 L 1055 230" />
      <Ln d="M 845 385 L 1055 260" />
      <Pkt path="M 240 95 H 420" label="POST" s={0.04} e={0.14} D={12} tone="dark" />
      <Hot x={420} y={40} w={420} h={110} s={0.14} e={0.24} D={12} />
      <Pkt path="M 840 95 L 1060 230" label="Créer" s={0.24} e={0.36} D={12} />
      <Hot x={1060} y={185} w={640} h={120} s={0.36} e={0.48} D={12} />
      <Pkt path="M 240 385 H 420" label="artists add" s={0.52} e={0.62} D={12} tone="dark" />
      <Hot x={420} y={330} w={420} h={110} s={0.62} e={0.72} D={12} />
      <Pkt path="M 840 385 L 1060 260" label="Créer" s={0.72} e={0.84} D={12} />
      <Hot x={1060} y={185} w={640} h={120} s={0.84} e={0.96} D={12} />
    </Svg>
    <Cap>Le handler et la commande ne font que traduire : HTTP ou arguments d’un côté, appel au domain de l’autre.</Cap>
  </Slide>
);

const Direction: Page = () => (
  <Slide section={S1}>
    <Tag text="Dépendances" />
    <Title>Sens des dépendances entre couches</Title>
    <Svg h={330}>
      <Nd x={0} y={90} w={480} h={150} label="Présentation" sub="connaît HTTP" />
      <Nd x={610} y={90} w={480} h={150} label="Domain" sub="ne connaît rien d’autre" tone="accent" />
      <Nd x={1220} y={90} w={480} h={150} label="Infrastructure" sub="connaît le stockage" />
      <Ln d="M 485 165 H 605" tone="accent" />
      <Ln d="M 1215 165 H 1095" tone="accent" />
      <T x={545} y={130} size={22}>utilise</T>
      <T x={1155} y={130} size={22}>implémente</T>
    </Svg>
    <Cap>Le domain n’importe ni net/http ni le stockage. On peut changer l’un sans toucher aux règles.</Cap>
  </Slide>
);

const Tree: Page = () => (
  <Slide section={S1}>
    <Tag text="Dossiers" />
    <Title>Organisation des dossiers</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={26}
        plain
        code={`
concerts-api/
├── main.go                // assemble les couches
├── presentation/          // HTTP
│   ├── handler.go
│   └── middleware.go
├── domain/                // règles métier
│   ├── artist.go
│   └── service.go
└── infrastructure/        // stockage
    └── memory.go
`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Un dossier = une couche" tone="accent" w={630}>
          Un package Go par dossier
        </Card>
        <Card title="Les noms sont libres" w={630}>
          Ce qui compte : qui dépend de qui
        </Card>
      </div>
    </div>
  </Slide>
);

const Limits: Page = () => (
  <Slide section={S1}>
    <Tag text="Jusqu’où aller" />
    <Title>Limites de ce cours</Title>
    <div style={{ display: 'flex', gap: 40 }}>
      <Card title="On fait" tone="ok" w={830} h={330}>
        Trois dossiers. Une interface. Un main qui assemble.
      </Card>
      <Card title="On ne fait pas encore" tone="neutral" w={830} h={330}>
        Objets de transfert séparés, injection avancée, architecture hexagonale complète. Ces noms existent : vous les
        croiserez plus tard.
      </Card>
    </div>
  </Slide>
);

const PostmanCollection: Page = () => (
  <Slide section={S1}>
    <Tag text="Postman" />
    <Title>Postman : collection et environnement</Title>
    <div style={{ display: 'flex', gap: 40 }}>
      <Card title="Collection" tone="accent" w={540} h={350}>
        Un dossier par ressource : Artists, Concerts. Une requête par route.
      </Card>
      <Card title="Environnement" w={540} h={350}>
        <div style={{ fontFamily: mono, fontSize: 25, lineHeight: 1.6, color: 'var(--osd-text)' }}>
          {'{{baseUrl}}'}
          <br />
          {'{{token}}'}
        </div>
        Changer de serveur sans toucher aux requêtes.
      </Card>
      <Card title="Export" w={540} h={350}>
        La collection en JSON, dans le dépôt Git. Elle fait partie du rendu.
      </Card>
    </div>
  </Slide>
);

const PostmanTests: Page = () => (
  <Slide section={S1}>
    <Tag text="Postman" />
    <Title>Postman : écrire des tests</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={24}
        title="Scripts › Post-response"
        code={`
pm.test("status is 201", () => {
    pm.response.to.have.status(201);
});

pm.test("returns the created artist", () => {
    const body = pm.response.json();
    pm.expect(body.name).to.eql("Daft Punk");
});
`}
        hot={[2, 7]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Un test par attente" tone="accent" w={630}>
          Le code, puis le contenu
        </Card>
        <Card title="Collection Runner" w={630}>
          Lance toutes les requêtes et les tests d’un clic
        </Card>
      </div>
    </div>
  </Slide>
);

const Closing: Page = () => (
  <Break n="Fin" title="Conclusion" sub="Une API est un contrat HTTP clair : le serveur et le front n’ont que lui en commun." />
);

const S1 = '1 · API en Go';
const S2 = '2 · Front React';
const S3 = '3 · Sécurisation';

const Ex = ({ children }: { children: ReactNode }) => (
  <div style={{ fontFamily: mono, fontSize: 25, color: 'var(--osd-text)', marginTop: 6 }}>{children}</div>
);

const Side = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>{children}</div>
);

// Chaîne de middlewares animée : une requête traverse chaque maillon.
const ChainSlide = ({
  section,
  tag,
  title,
  expr,
  nodes,
  cap,
}: {
  section: string;
  tag: string;
  title: string;
  expr: string;
  nodes: string[];
  cap: string;
}) => {
  const n = nodes.length;
  const gap = n > 5 ? 36 : 60;
  const w = (1700 - gap * (n - 1)) / n;
  const size = n > 5 ? 22 : 28;
  const left = (i: number) => i * (w + gap);
  const s0 = 0.06;
  const e0 = 0.86;
  const at = (i: number) => s0 + ((e0 - s0) * i) / (n - 1);
  return (
    <Slide section={section}>
      <Tag text={tag} />
      <Title>{title}</Title>
      <Svg h={330}>
        <T x={850} y={20} size={n > 5 ? 30 : 34} weight={700} color="#1c1917">
          {expr}
        </T>
        {nodes.map((label, i) => (
          <Nd key={label} x={left(i)} y={150} w={w} h={130} label={label} size={size} tone={i === n - 1 ? 'accent' : 'neutral'} />
        ))}
        {nodes.slice(1).map((label, i) => (
          <Ln key={label} d={`M ${left(i) + w + 3} 215 H ${left(i + 1) - 3}`} />
        ))}
        <Pkt path={`M ${w / 2} 90 H ${left(n - 1) + w / 2}`} label="Request" s={s0} e={e0} D={10} tone="dark" />
        {nodes.map((label, i) => (
          <Hot
            key={label}
            x={left(i)}
            y={150}
            w={w}
            h={130}
            s={Math.max(0, at(i) - 0.05)}
            e={Math.min(0.98, at(i) + 0.05)}
            D={10}
          />
        ))}
      </Svg>
      <Cap>{cap}</Cap>
    </Slide>
  );
};

// ─── Ouverture ────────────────────────────────────────────────────────────────
const Agenda: Page = () => (
  <Slide section="Ouverture">
    <Tag text="Planning" />
    <Title>Planning des 3 matinées</Title>
    <div style={{ display: 'flex', gap: 40, marginTop: 10 }}>
      <Box label="Matinée 1" sub="API en Go" tone="accent" w={540} h={130} />
      <Box label="Matinée 2" sub="Front React" w={540} h={130} />
      <Box label="Matinée 3" sub="Sécurisation avec FerrisKey" w={540} h={130} />
    </div>
    <div style={{ marginTop: 70 }}>
      <Timeline
        marks={[
          { at: 0, label: 'cours', tone: 'accent' },
          { at: 0.5, label: 'TP noté', tone: 'accent' },
          { at: 0.94, label: 'rendu', tone: 'muted' },
        ]}
      />
    </div>
    <Cap>Même rythme chaque matinée : cours, puis un TP noté sur 20.</Cap>
  </Slide>
);

const StepsPage: Page = () => (
  <Slide section="Ouverture">
    <Tag text="Le projet" />
    <Title>Un projet en 4 étapes</Title>
    <Svg h={420}>
      <T x={396} y={14} size={24} weight={700} color="var(--osd-accent)">Matinée 1</T>
      <rect x={0} y={34} width={793} height={5} fill="#EF7809" />
      <T x={1076} y={14} size={24} weight={700} color="var(--osd-accent)">Matinée 2</T>
      <rect x={906} y={34} width={340} height={5} fill="#EF7809" />
      <T x={1530} y={14} size={24} weight={700} color="var(--osd-accent)">Matinée 3</T>
      <rect x={1360} y={34} width={340} height={5} fill="#EF7809" />
      <Pkt path="M 70 135 H 1630" label="API" s={0.05} e={0.93} D={14} tone="dark" />
      <Nd x={0} y={70} w={340} h={130} label="1 · Serveur" sub="HTTP, sans IA" size={30} />
      <Nd x={453} y={70} w={340} h={130} label="2 · CRUD" sub="5 routes" size={30} />
      <Nd x={906} y={70} w={340} h={130} label="3 · Front" sub="React" size={30} />
      <Nd x={1360} y={70} w={340} h={130} label="4 · FerrisKey" sub="sécurisation" size={30} tone="accent" />
      <Ln d="M 343 135 H 450" />
      <Ln d="M 796 135 H 903" />
      <Ln d="M 1249 135 H 1357" />
      <Ln d="M 396 150 V 270" dashed tone="dim" />
      <Ln d="M 849 150 V 270" dashed tone="dim" />
      <Ln d="M 1303 150 V 270" dashed tone="dim" />
      <Nd x={196} y={280} w={400} h={110} label="Middlewares" sub="logging, request ID" tone="muted" />
      <Nd x={649} y={280} w={400} h={110} label="Contrat HTTP" sub="JSON, CORS" tone="muted" size={26} />
      <Nd x={1103} y={280} w={400} h={110} label="Sécurité" sub="idempotence, limites, auth" tone="muted" size={26} />
      <Hot x={0} y={70} w={340} h={130} s={0.05} e={0.16} D={14} />
      <Hot x={196} y={280} w={400} h={110} s={0.2} e={0.27} D={14} />
      <Hot x={453} y={70} w={340} h={130} s={0.31} e={0.4} D={14} />
      <Hot x={649} y={280} w={400} h={110} s={0.45} e={0.53} D={14} />
      <Hot x={906} y={70} w={340} h={130} s={0.58} e={0.67} D={14} />
      <Hot x={1103} y={280} w={400} h={110} s={0.71} e={0.78} D={14} />
      <Hot x={1360} y={70} w={340} h={130} s={0.83} e={0.93} D={14} />
    </Svg>
    <Cap>Chaque étape prolonge le même projet. Entre deux étapes, une nouvelle notion.</Cap>
  </Slide>
);

const Tools: Page = () => (
  <Slide section="Ouverture">
    <Tag text="Outils" />
    <Title>Outils utilisés</Title>
    <div style={{ display: 'flex', gap: 40, marginTop: 10 }}>
      <Card title="Go 1.22 ou plus" tone="accent" w={540} h={250}>
        Le langage de l’API. Une seule installation.
      </Card>
      <Card title="Une bibliothèque web" w={540} h={250}>Chi, Gin, Echo ou Fiber : à vous de choisir</Card>
      <Card title="Postman" w={540} h={250}>
        Le client pour appeler votre API et vérifier chaque réponse.
      </Card>
    </div>
    <div style={{ display: 'flex', gap: 40, marginTop: 40 }}>
      <Card title="Git" w={540} h={200}>
        Un dépôt par étudiant, un commit par fonctionnalité.
      </Card>
      <Card title="Node.js et Vite" w={540} h={200}>
        Pour le front React de la matinée 2.
      </Card>
      <Card title="FerrisKey" tone="accent" w={540} h={200}>
        Un serveur d’identité open source, utilisé à la matinée 3 pour sécuriser l’API.
      </Card>
    </div>
  </Slide>
);

const FilRouge: Page = () => (
  <Slide section="Ouverture">
    <Tag text="Fil rouge" />
    <Title>Le fil rouge : l’API concerts</Title>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
      <Card title="Artist" tone="accent" w={460}>
        <div style={{ fontFamily: mono, fontSize: 26, lineHeight: 1.6 }}>
          id
          <br />
          name
          <br />
          genre
        </div>
      </Card>
      <Arrow dir="right" label="1 → N" />
      <Card title="Concert" w={460}>
        <div style={{ fontFamily: mono, fontSize: 26, lineHeight: 1.6 }}>
          id
          <br />
          date
          <br />
          artist_id · venue_id
        </div>
      </Card>
      <Arrow dir="left" label="N → 1" />
      <Card title="Venue" w={460}>
        <div style={{ fontFamily: mono, fontSize: 26, lineHeight: 1.6 }}>
          id
          <br />
          city
          <br />
          country
        </div>
      </Card>
    </div>
    <Cap>Obligatoire : la ressource /artists. En bonus : /concerts et /venues si vous avez le temps.</Cap>
  </Slide>
);

// ─── Matinée 1 ────────────────────────────────────────────────────────────────
const P1Break: Page = () => (
  <Break n="1" title="Serveur HTTP et CRUD" sub="Un serveur sans IA, les middlewares, puis les 5 routes CRUD." />
);

const StepOne: Page = () => (
  <Slide section={S1}>
    <Tag text="Étape 1" />
    <Title>Étape 1 : créer un serveur HTTP, sans IA</Title>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
      <Card title="Objectif" tone="accent" w={830} h={250}>
        Un programme Go qui écoute sur le port 8080 et répond 200 à <b style={{ fontFamily: mono }}>GET /health</b>.
      </Card>
      <Card title="Sans IA" tone="warn" w={830} h={250}>
        Ni chat, ni complétion de code. Vous écrivez chaque ligne vous-même.
      </Card>
      <Card title="Pourquoi" w={830} h={250}>
        Une bibliothèque cache beaucoup de choses. Il faut les avoir comprises avant de les déléguer.
      </Card>
      <Card title="Contrôle" w={830} h={250}>
        À l’oral, on vous demandera d’expliquer votre code. Un code non expliqué retire des points.
      </Card>
    </div>
  </Slide>
);

const ChainOrder1: Page = () => (
  <ChainSlide
    section={S1}
    tag="Chaînage"
    title="Ordre des middlewares"
    expr="Logging(RequestID(mux))"
    nodes={['Logging', 'RequestID', 'Routeur', 'Handler']}
    cap="Le premier écrit est le plus extérieur : la requête le traverse en premier."
  />
);

// ─── Matinée 3 ────────────────────────────────────────────────────────────────
const SecBreak: Page = () => (
  <Break n="3" title="Sécuriser l’API" sub="Idempotence et rate limiting, puis authentification avec FerrisKey." />
);

const DataRisks: Page = () => (
  <Slide section={S3}>
    <Tag text="Sécurité des données" />
    <Title>Deux risques pour les données de l’API</Title>
    <Svg h={480}>
      <T x={0} y={14} size={26} anchor="start" weight={700} color={warn}>Risque 1 · la même requête arrive 2 fois</T>
      <Nd x={0} y={50} w={260} h={110} label="Client" sub="réseau instable" />
      <Nd x={720} y={50} w={300} h={110} label="API" tone="accent" />
      <Nd x={1380} y={50} w={320} h={110} label="Données" sub="artistes" />
      <Ln d="M 265 105 H 715" />
      <Ln d="M 1025 105 H 1375" />
      <Pkt path="M 60 80 H 720" label="POST" s={0.03} e={0.12} D={12} tone="dark" />
      <Pkt path="M 60 80 H 720" label="POST" s={0.14} e={0.23} D={12} tone="dark" />
      <Hot x={1380} y={50} w={320} h={110} s={0.25} e={0.45} D={12} tone="warn" />
      <Say x={1530} y={200} s={0.25} e={0.45} D={12} color={warn}>2 artistes identiques</Say>
      <T x={0} y={304} size={26} anchor="start" weight={700} color={warn}>Risque 2 · trop de requêtes en peu de temps</T>
      <Nd x={0} y={340} w={260} h={110} label="Client" sub="script abusif" tone="warn" />
      <Nd x={720} y={340} w={300} h={110} label="API" tone="accent" />
      <Ln d="M 265 395 H 715" />
      {[0, 1, 2, 3, 4].map((k) => (
        <Pkt key={k} path="M 60 370 H 720" label="GET" s={0.5 + k * 0.06} e={0.58 + k * 0.06} D={12} tone="dark" />
      ))}
      <Hot x={720} y={340} w={300} h={110} s={0.7} e={0.97} D={12} tone="warn" />
      <Say x={1360} y={395} s={0.72} e={0.97} D={12} color={warn} anchor="start">API saturée</Say>
    </Svg>
    <Cap>Deux défenses : l’idempotence contre le 1er risque, le rate limiting contre le 2e.</Cap>
  </Slide>
);

const IdemKeyFlow: Page = () => (
  <Slide section={S3}>
    <Tag text="Idempotence" />
    <Title>Clé d’idempotence : le serveur se souvient</Title>
    <Svg h={400}>
      <Nd x={0} y={110} w={280} h={130} label="Client" sub="Postman" />
      <Nd x={700} y={110} w={300} h={130} label="API" tone="accent" />
      <Nd x={1380} y={110} w={320} h={130} label="Clés" sub="clé → réponse" />
      <Ln d="M 285 150 H 695" />
      <Ln d="M 695 215 H 285" dashed tone="dim" />
      <Ln d="M 1005 175 H 1375" />
      <Say x={850} y={40} s={0.03} e={0.46} D={14} color="#1c1917">1 · premier envoi : on crée et on mémorise</Say>
      <Pkt path="M 140 150 H 700" label="POST + clé 7f3a" s={0.03} e={0.13} D={14} tone="dark" />
      <Hot x={700} y={110} w={300} h={130} s={0.13} e={0.18} D={14} />
      <Pkt path="M 1000 150 H 1380" label="mémorise" s={0.18} e={0.26} D={14} />
      <Hot x={1380} y={110} w={320} h={130} s={0.26} e={0.31} D={14} />
      <Pkt path="M 700 215 H 140" label="201 Created" s={0.31} e={0.45} D={14} tone="ok" />
      <Say x={850} y={40} s={0.52} e={0.97} D={14} color="#1c1917">2 · même clé : on rejoue, sans créer</Say>
      <Pkt path="M 140 150 H 700" label="POST + clé 7f3a" s={0.52} e={0.62} D={14} tone="dark" />
      <Hot x={700} y={110} w={300} h={130} s={0.62} e={0.67} D={14} />
      <Pkt path="M 1000 150 H 1380" label="clé connue ?" s={0.67} e={0.75} D={14} />
      <Hot x={1380} y={110} w={320} h={130} s={0.75} e={0.8} D={14} tone="ok" />
      <Pkt path="M 700 215 H 140" label="201 rejouée" s={0.8} e={0.95} D={14} tone="ok" />
      <Say x={1540} y={310} s={0.8} e={0.97} D={14} color={ok}>1 seul artiste créé</Say>
    </Svg>
    <Cap>Même clé, même réponse : le client peut renvoyer sa requête sans risque.</Cap>
  </Slide>
);

const IdemKeyCode: Page = () => (
  <Slide section={S3}>
    <Tag text="Idempotence en Go" />
    <Title>Middleware d’idempotence en Go</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1100}
        size={22}
        title="idempotency.go"
        hot={[5, 10, 11, 14, 15, 16]}
        code={`
func Idempotency(next http.Handler) http.Handler {
    store := newReplayStore()

    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        key := r.Header.Get("Idempotency-Key")
        if r.Method != http.MethodPost || key == "" {
            next.ServeHTTP(w, r)
            return
        }
        saved, ok := store.get(key)
        if !ok {
            saved = record(next, r)
            store.put(key, saved)
        }
        saved.replay(w)
    })
}
`}
      />
      <Side>
        <Card title="Clé absente" w={560}>
          Rien ne change : la requête passe.
        </Card>
        <Card title="Clé inconnue" tone="accent" w={560}>
          On exécute le handler et on garde la réponse.
        </Card>
        <Card title="Clé connue" tone="ok" w={560}>
          On rejoue la réponse sans toucher aux données.
        </Card>
      </Side>
    </div>
  </Slide>
);

const RateLimitFlow: Page = () => (
  <Slide section={S3}>
    <Tag text="Rate limiting" />
    <Title>Rate limiting : une limite par client</Title>
    <Svg h={450}>
      <Say x={850} y={14} s={0.02} e={0.34} D={14} color="#1c1917">3 requêtes passent</Say>
      <Say x={850} y={14} s={0.36} e={0.6} D={14} color={warn}>la 4e dépasse la limite : 429</Say>
      <Say x={850} y={14} s={0.62} e={0.97} D={14} color="#1c1917">un autre client n’est pas touché</Say>
      <Nd x={0} y={60} w={260} h={110} label="Client A" sub="script abusif" tone="warn" />
      <Nd x={0} y={320} w={260} h={110} label="Client B" sub="utilisateur normal" />
      <Nd x={640} y={190} w={340} h={110} label="Limiteur" sub="3 requêtes / seconde" tone="accent" size={30} />
      <Nd x={1380} y={190} w={320} h={110} label="API" />
      <Ln d="M 265 125 L 635 225" />
      <Ln d="M 265 375 L 635 270" />
      <Ln d="M 985 245 H 1375" />
      <Pkt path="M 60 90 L 640 215" label="GET" s={0.02} e={0.1} D={14} tone="dark" />
      <Pkt path="M 980 245 H 1380" label="GET" s={0.1} e={0.16} D={14} tone="dark" />
      <Pkt path="M 60 90 L 640 215" label="GET" s={0.12} e={0.2} D={14} tone="dark" />
      <Pkt path="M 980 245 H 1380" label="GET" s={0.2} e={0.26} D={14} tone="dark" />
      <Pkt path="M 60 90 L 640 215" label="GET" s={0.22} e={0.3} D={14} tone="dark" />
      <Pkt path="M 980 245 H 1380" label="GET" s={0.3} e={0.34} D={14} tone="dark" />
      <Pkt path="M 60 90 L 640 215" label="GET" s={0.38} e={0.46} D={14} tone="dark" />
      <Hot x={640} y={190} w={340} h={110} s={0.46} e={0.54} D={14} tone="warn" />
      <Pkt path="M 640 235 L 60 120" label="429" s={0.54} e={0.62} D={14} tone="warn" />
      <Pkt path="M 60 375 L 640 270" label="GET" s={0.66} e={0.74} D={14} tone="dark" />
      <Pkt path="M 980 245 H 1380" label="GET" s={0.74} e={0.8} D={14} tone="dark" />
      <Hot x={1380} y={190} w={320} h={110} s={0.8} e={0.85} D={14} />
      <Pkt path="M 1380 285 L 60 395" label="200 OK" s={0.85} e={0.97} D={14} tone="ok" />
    </Svg>
    <Cap>Le limiteur compte les requêtes de chaque client. Au-delà de la limite : 429 Too Many Requests.</Cap>
  </Slide>
);

// Un jeton qui disparaît quand une requête le consomme, puis revient quand le seau se remplit.
const Tok = ({ cx, gone, back, D }: { cx: number; gone: number; back: number; D: number }) => (
  <circle cx={cx} cy={200} r={30} fill="#EF7809" opacity={1}>
    <animate
      attributeName="opacity"
      dur={`${D}s`}
      repeatCount="indefinite"
      calcMode="discrete"
      values="1;0;1;1"
      keyTimes={`0;${gone};${back};1`}
    />
  </circle>
);

const TokenBucket: Page = () => {
  const D = 14;
  const xs = [700, 780, 860, 940, 1020];
  const ends = [0.1, 0.2, 0.3, 0.4, 0.5];
  const backs = [0.72, 0.8, 0.88, 0.95, 0.99];
  return (
    <Slide section={S3}>
      <Tag text="Rate limiting" />
      <Title>Algorithme : le seau de jetons</Title>
      <Svg h={400}>
        <Say x={850} y={14} s={0.02} e={0.5} D={D} color="#1c1917">chaque requête prend 1 jeton</Say>
        <Say x={850} y={14} s={0.52} e={0.66} D={D} color={warn}>seau vide : 429</Say>
        <Say x={850} y={14} s={0.68} e={0.97} D={D}>+1 jeton par seconde</Say>
        <rect x={620} y={90} width={480} height={220} rx={4} fill={surface} stroke={border} strokeWidth={3} />
        <T x={860} y={125} size={24} weight={700} color="#1c1917">Seau : capacité 5</T>
        {xs.map((cx, i) => (
          <Tok key={cx} cx={cx} gone={ends[i]} back={backs[i]} D={D} />
        ))}
        <Nd x={1400} y={145} w={300} h={110} label="API" tone="accent" />
        <Ln d="M 1105 200 H 1395" />
        {ends.map((e, i) => (
          <Pkt key={`in${i}`} path="M 60 200 H 620" label="req" s={e - 0.07} e={e} D={D} tone="dark" />
        ))}
        {ends.map((e, i) => (
          <Pkt key={`out${i}`} path="M 1100 200 H 1400" label="req" s={e} e={e + 0.06} D={D} tone="dark" />
        ))}
        <Pkt path="M 60 200 H 620" label="req" s={0.45} e={0.56} D={D} tone="dark" />
        <Hot x={620} y={90} w={480} h={220} s={0.56} e={0.64} D={D} tone="warn" />
        <Pkt path="M 620 270 H 60" label="429" s={0.58} e={0.7} D={D} tone="warn" />
      </Svg>
      <Cap>Le seau se remplit à vitesse fixe : on tolère une rafale, pas un flot continu.</Cap>
    </Slide>
  );
};

const RateLimitCode: Page = () => (
  <Slide section={S3}>
    <Tag text="Rate limiting en Go" />
    <Title>Middleware de rate limiting en Go</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1060}
        size={22}
        title="ratelimit.go"
        hot={[2, 7, 8]}
        code={`
func RateLimit(next http.Handler) http.Handler {
    store := newLimiterStore(5, 10)

    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ip, _, _ := net.SplitHostPort(r.RemoteAddr)

        if !store.get(ip).Allow() {
            w.Header().Set("Retry-After", "1")
            writeError(w, 429, "rate_limited", "too many requests")
            return
        }
        next.ServeHTTP(w, r)
    })
}
`}
      />
      <Side>
        <Card title="newLimiterStore(5, 10)" tone="accent" w={600}>
          5 requêtes par seconde, rafale de 10
        </Card>
        <Card title="Un limiteur par IP" w={600}>
          Une map protégée par un mutex, avec <b style={{ fontFamily: mono }}>rate.Limiter</b> de golang.org/x/time/rate
        </Card>
        <Card title="Allow()" w={600}>
          Faux : le seau est vide, on répond 429
        </Card>
      </Side>
    </div>
  </Slide>
);

const RateLimitHttp: Page = () => (
  <Slide section={S3}>
    <Tag text="Rate limiting" />
    <Title>Réponse 429 : informer le client</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={820}
        size={24}
        plain
        title="réponse"
        code={`
HTTP/1.1 429 Too Many Requests
Retry-After: 1
Content-Type: application/json

  {
  "code": "rate_limited",
  "message": "too many requests"
}
`}
        hot={[1, 2]}
      />
      <Side>
        <Card title="Retry-After" tone="accent" w={840}>
          Nombre de secondes à attendre avant de réessayer
        </Card>
        <Card title="Quelle clé de limite ?" w={840}>
          L’adresse IP avant l’authentification. L’utilisateur une fois connecté (avec FerrisKey).
        </Card>
        <Card title="Derrière un proxy" tone="warn" w={840}>
          RemoteAddr est l’adresse du proxy, pas du client. Ne lire X-Forwarded-For que s’il est de confiance.
        </Card>
      </Side>
    </div>
  </Slide>
);

const ChainOrder2: Page = () => (
  <ChainSlide
    section={S3}
    tag="Chaînage"
    title="Où placer les limites dans la chaîne"
    expr="Logging(RequestID(RateLimit(Idempotency(mux))))"
    nodes={['Logging', 'RequestID', 'RateLimit', 'Idempotency', 'Handler']}
    cap="RateLimit tôt : on refuse avant de travailler. Idempotency au plus près du handler, sur les POST."
  />
);

const PostmanProtect: Page = () => (
  <Slide section={S3}>
    <Tag text="Tester" />
    <Title>Tester idempotence et rate limiting</Title>
    <Tbl
      head={['Scénario', 'Dans Postman', 'Résultat attendu']}
      widths={[480, 700, 520]}
      size={25}
      rows={[
        ['POST avec une clé', 'POST /artists + Idempotency-Key: abc', '201, 1 artiste créé'],
        ['Même POST, même clé', 'Send une 2e fois', '201 identique, toujours 1 artiste'],
        ['PUT deux fois', 'PUT /artists/42 × 2', '200 puis 200, même état'],
        ['DELETE deux fois', 'DELETE /artists/42 × 2', '204 puis 404'],
        ['Rafale de requêtes', 'Collection Runner, 30 itérations, 0 ms', '200 puis 429 + Retry-After'],
        ['Après une pause', 'Attendre 2 secondes, renvoyer', '200 de nouveau'],
      ]}
    />
  </Slide>
);

// ─── Matinée 3, suite ────────────────────────────────────────────────────────────────
const P2bBreak: Page = () => (
  <Break n="Partie 3 · suite" title="Sécuriser avec FerrisKey" sub="Authentification, rôles et CORS, avec un token délivré par FerrisKey." />
);

const WhoCalls: Page = () => (
  <Slide section={S3}>
    <Tag text="Le problème" />
    <Title>Aujourd’hui, n’importe qui peut tout faire</Title>
    <Svg h={360}>
      <Nd x={0} y={110} w={320} h={130} label="Inconnu" sub="aucune identité" tone="warn" />
      <Nd x={1380} y={110} w={320} h={130} label="API" sub="API actuelle" tone="accent" />
      <Ln d="M 325 150 H 1375" />
      <Ln d="M 1375 215 H 325" dashed tone="dim" />
      <Pkt path="M 150 150 H 1380" label="DELETE /artists/42" s={0.05} e={0.4} D={10} tone="dark" />
      <Hot x={1380} y={110} w={320} h={130} s={0.4} e={0.5} D={10} tone="warn" />
      <Pkt path="M 1380 215 H 150" label="204 No Content" s={0.52} e={0.8} D={10} tone="warn" />
      <Say x={850} y={310} s={0.52} e={0.97} D={10} color={warn}>Aucun contrôle : l’artiste est supprimé</Say>
    </Svg>
    <Cap>Il manque deux contrôles : qui appelle (authentification) et a-t-il le droit (autorisation).</Cap>
  </Slide>
);

const AuthnAuthz: Page = () => (
  <Slide section={S3}>
    <Tag text="Vocabulaire" />
    <Title>Authentification et autorisation</Title>
    <div style={{ display: 'flex', gap: 40 }}>
      <Card title="Authentification" tone="accent" w={830} h={340}>
        Qui appelle ? On vérifie le token.
        <Ex>Token absent ou invalide → 401</Ex>
      </Card>
      <Card title="Autorisation" w={830} h={340}>
        A-t-il le droit de faire cette action ? On vérifie le rôle.
        <Ex>Rôle manquant → 403</Ex>
      </Card>
    </div>
    <Cap>Un 401 se corrige en s’identifiant. Un 403 demande un autre rôle.</Cap>
  </Slide>
);

const FerrisFlow: Page = () => (
  <Slide section={S3}>
    <Tag text="FerrisKey" />
    <Title>FerrisKey délivre, l’API vérifie</Title>
    <Svg h={450}>
      <Say x={850} y={14} s={0.03} e={0.34} D={14} color="#1c1917">Obtenir un token</Say>
      <Say x={850} y={14} s={0.36} e={0.58} D={14} color="#1c1917">Appeler l’API avec le token</Say>
      <Say x={850} y={14} s={0.6} e={0.97} D={14} color="#1c1917">L’API vérifie la signature</Say>
      <Nd x={0} y={160} w={300} h={130} label="Postman" />
      <Nd x={700} y={160} w={300} h={130} label="FerrisKey" sub="serveur d’identité" tone="accent" />
      <Nd x={1400} y={160} w={300} h={130} label="Votre API" />
      <Ln d="M 305 200 H 695" />
      <Ln d="M 695 250 H 305" dashed tone="dim" />
      <Ln d="M 1395 200 H 1005" dashed tone="dim" />
      <Ln d="M 1005 250 H 1395" dashed tone="dim" />
      <Ln d="M 150 295 C 150 440 1550 440 1550 295" dashed tone="dim" />
      <Pkt path="M 150 200 H 700" label="identifiants" s={0.03} e={0.15} D={14} tone="dark" />
      <Hot x={700} y={160} w={300} h={130} s={0.15} e={0.2} D={14} />
      <Pkt path="M 700 250 H 150" label="access token (JWT)" s={0.2} e={0.33} D={14} tone="ok" />
      <Pkt path="M 150 290 C 150 440 1550 440 1550 290" label="Authorization: Bearer" s={0.36} e={0.58} D={14} tone="dark" />
      <Hot x={1400} y={160} w={300} h={130} s={0.58} e={0.62} D={14} />
      <Pkt path="M 1400 200 H 1000" label="JWKS ?" s={0.62} e={0.7} D={14} tone="dark" />
      <Pkt path="M 1000 250 H 1400" label="clés publiques" s={0.7} e={0.82} D={14} tone="ok" />
      <Hot x={1400} y={160} w={300} h={130} s={0.84} e={0.96} D={14} tone="ok" />
    </Svg>
    <Cap>Une fois les clés publiques chargées, l’API ne rappelle plus FerrisKey à chaque requête.</Cap>
  </Slide>
);

const JwtPayload: Page = () => (
  <Slide section={S3}>
    <Tag text="Token" />
    <Title>Contenu d’un token JWT</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={920}
        size={24}
        plain
        title="payload décodé"
        code={`
  {
  "iss": "https://auth.example.com/realms/ynov",
  "sub": "7f3a9c12",
  "aud": "concerts-api",
  "exp": 1768000000,
  "roles": ["artists-writer"]
}
`}
      />
      <Side>
        <Card title="iss · aud" tone="accent" w={740}>
          Qui a émis le token, et pour quelle API
        </Card>
        <Card title="exp" w={740}>
          Date d’expiration : après, le token est refusé
        </Card>
        <Card title="roles" w={740}>
          Les droits de l’appelant. Décodez un token réel pour voir où votre realm les place.
        </Card>
      </Side>
    </div>
    <Cap>Le payload est lisible par tous : jamais de secret dedans.</Cap>
  </Slide>
);

const JwtChecks: Page = () => (
  <Slide section={S3}>
    <Tag text="Validation" />
    <Title>Valider un token : 6 contrôles</Title>
    <Tbl
      head={['Contrôle', 'Ce qu’on vérifie', 'Sinon']}
      widths={[360, 1000, 340]}
      size={26}
      rows={[
        ['Présence', 'En-tête Authorization: Bearer …', '401'],
        ['Signature', 'Clé publique du JWKS, algorithme RS256 imposé', '401'],
        ['Émetteur (iss)', 'Égal à l’URL du realm FerrisKey', '401'],
        ['Audience (aud)', 'Égale au client de votre API', '401'],
        ['Expiration (exp)', 'La date est dans le futur', '401'],
        ['Rôle', 'Le rôle exigé par la route est présent', '403'],
      ]}
    />
  </Slide>
);

const AuthCode: Page = () => (
  <Slide section={S3}>
    <Tag text="Auth en Go" />
    <Title>Middleware d’authentification en Go</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1100}
        size={22}
        title="auth.go"
        hot={[3, 8, 9, 10]}
        code={`
func Auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        raw, ok := strings.CutPrefix(r.Header.Get("Authorization"), "Bearer ")
        if !ok {
            writeError(w, 401, "unauthorized", "missing token")
            return
        }
        claims := &Claims{}
        _, err := jwt.ParseWithClaims(raw, claims, keys.Keyfunc,
            jwt.WithValidMethods([]string{"RS256"}),
            jwt.WithIssuer(issuer), jwt.WithAudience(audience))
        if err != nil {
            writeError(w, 401, "unauthorized", "invalid token")
            return
        }
        next.ServeHTTP(w, r.WithContext(withClaims(r.Context(), claims)))
    })
}
`}
      />
      <Side>
        <Card title="keys" w={560}>
          Clés publiques chargées depuis le JWKS, avec cache
        </Card>
        <Card title="ParseWithClaims" tone="accent" w={560}>
          Vérifie la signature, iss, aud et exp
        </Card>
        <Card title="withClaims" w={560}>
          Garde l’identité pour les middlewares suivants
        </Card>
      </Side>
    </div>
  </Slide>
);

const RolesCode: Page = () => (
  <Slide section={S3}>
    <Tag text="Autorisation en Go" />
    <Title>Exiger un rôle sur une route</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1100}
        size={22}
        title="roles.go"
        hot={[4, 5]}
        code={`
func RequireRole(role string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            claims := claimsFrom(r.Context())
            if !slices.Contains(claims.Roles, role) {
                writeError(w, 403, "forbidden", "missing role")
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
`}
      />
      <Side>
        <Card title="Dans FerrisKey" tone="accent" w={560}>
          Créer le rôle et l’attribuer au client de Postman
        </Card>
        <Card title="Dans l’API" w={560}>
          Lire les rôles dans le token, répondre 403 s’il manque
        </Card>
      </Side>
    </div>
  </Slide>
);

const RoutePolicy: Page = () => (
  <Slide section={S3}>
    <Tag text="Politique d’accès" />
    <Title>Qui peut appeler quelle route</Title>
    <Tbl
      head={['Route', 'Accès', 'Sans le droit']}
      widths={[560, 720, 420]}
      size={26}
      rows={[
        ['GET /health', 'public', '—'],
        ['GET /artists', 'token valide', '401'],
        ['GET /artists/{id}', 'token valide', '401'],
        ['POST /artists', 'rôle artists-writer', '401 ou 403'],
        ['PUT /artists/{id}', 'rôle artists-writer', '401 ou 403'],
        ['DELETE /artists/{id}', 'rôle artists-writer', '401 ou 403'],
      ]}
    />
    <Cap>La lecture demande d’être identifié. L’écriture demande en plus un rôle.</Cap>
  </Slide>
);

const CorsCode: Page = () => (
  <Slide section={S2}>
    <Tag text="CORS en Go" />
    <Title>Middleware CORS en Go</Title>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <Code
        w={1100}
        size={22}
        title="cors.go"
        hot={[9, 10, 11]}
        code={`
const headers = "Content-Type"

func CORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        h := w.Header()
        h.Set("Access-Control-Allow-Origin", "http://localhost:5173")
        h.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        h.Set("Access-Control-Allow-Headers", headers)
        if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusNoContent)
            return
        }
        next.ServeHTTP(w, r)
    })
}
`}
      />
      <Side>
        <Card title="Origine précise" tone="warn" w={560}>
          Listez les origines autorisées plutôt qu’une étoile
        </Card>
        <Card title="OPTIONS" tone="accent" w={560}>
          Répondre 204 sans demander de token
        </Card>
        <Card title="En-têtes personnalisés" w={560}>
          Tout en-tête que le front envoie doit être déclaré
        </Card>
      </Side>
    </div>
  </Slide>
);

const ChainOrder3: Page = () => (
  <ChainSlide
    section={S3}
    tag="Chaînage"
    title="Ordre final : CORS avant Auth"
    expr="Logging(RequestID(CORS(RateLimit(Auth(Idempotency(mux))))))"
    nodes={['Logging', 'RequestID', 'CORS', 'RateLimit', 'Auth', 'Idempotency', 'Handler']}
    cap="Le préflight OPTIONS n’envoie pas de token : CORS répond avant Auth. Idempotency voit l’identité."
  />
);

const PostmanFerris: Page = () => (
  <Slide section={S3}>
    <Tag text="Postman" />
    <Title>Postman : obtenir un token FerrisKey</Title>
    <Tbl
      head={['Réglage', 'Valeur']}
      widths={[560, 1140]}
      size={26}
      rows={[
        ['Onglet Authorization', 'Type OAuth 2.0'],
        ['Grant type', 'Client Credentials'],
        ['Access Token URL', '{FK_URL}/realms/{realm}/protocol/openid-connect/token'],
        ['Client ID et Client Secret', 'Ceux de votre client FerrisKey, en variables d’environnement'],
        ['Get New Access Token', 'Puis Use Token : Postman ajoute l’en-tête Bearer'],
      ]}
    />
    <Cap>Le secret reste dans l’environnement Postman, jamais dans le dépôt Git.</Cap>
  </Slide>
);

const PostmanAuthTests: Page = () => (
  <Slide section={S3}>
    <Tag text="Tester" />
    <Title>Tester la sécurité avec Postman</Title>
    <Tbl
      head={['Scénario', 'Requête Postman', 'Résultat attendu']}
      widths={[500, 700, 500]}
      size={25}
      rows={[
        ['Sans token', 'GET /artists, sans Authorization', '401'],
        ['Token falsifié ou expiré', 'GET /artists, token modifié', '401'],
        ['Token sans le rôle', 'POST /artists', '403'],
        ['Token avec le rôle', 'POST /artists', '201'],
        ['Route publique', 'GET /health, sans token', '200'],
        ['Préflight', 'OPTIONS /artists avec Origin', '204 + Access-Control-*'],
      ]}
    />
  </Slide>
);

const SecretsTraps: Page = () => (
  <Slide section={S3}>
    <Tag text="Pièges" />
    <Title>Erreurs fréquentes de sécurité</Title>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
      <Card title="Secret dans Git" tone="warn" w={830} h={210}>
        Le client secret va dans une variable d’environnement, jamais dans un commit.
      </Card>
      <Card title="Token dans les logs" tone="warn" w={830} h={210}>
        Un token journalisé peut être rejoué par quiconque lit les logs.
      </Card>
      <Card title="Signature seule" tone="warn" w={830} h={210}>
        Un token bien signé mais expiré, ou pour une autre API, doit être refusé.
      </Card>
      <Card title="Tout le monde admin" tone="warn" w={830} h={210}>
        Donnez le rôle minimal. Un 403 vaut mieux qu’une suppression accidentelle.
      </Card>
    </div>
  </Slide>
);

const Recap1: Page = () => (
  <Slide section={S1}>
    <Tag text="Récapitulatif" />
    <Title>Récapitulatif : le parcours d’une requête</Title>
    <Svg h={440}>
      <Nd x={0} y={130} w={220} h={140} label="Postman" />
      <Nd x={330} y={130} w={280} h={140} label="Middlewares" sub="logging, request ID" />
      <Nd x={700} y={130} w={260} h={140} label="Routeur" sub="méthode + chemin" />
      <Nd x={1050} y={130} w={280} h={140} label="Handler" sub="lit r, écrit w" tone="accent" />
      <Nd x={1420} y={130} w={280} h={140} label="Stockage" sub="map en mémoire" tone="muted" />
      <Ln d="M 225 200 H 325" />
      <Ln d="M 615 200 H 695" />
      <Ln d="M 965 200 H 1045" />
      <Ln d="M 1335 200 H 1415" />
      <Pkt path="M 190 180 H 360" label="Request" s={0.04} e={0.16} D={12} tone="dark" />
      <Hot x={330} y={130} w={280} h={140} s={0.16} e={0.28} D={12} />
      <Pkt path="M 610 180 H 720" label="→" s={0.28} e={0.36} D={12} tone="dark" />
      <Hot x={700} y={130} w={260} h={140} s={0.36} e={0.46} D={12} />
      <Pkt path="M 960 180 H 1070" label="→" s={0.46} e={0.54} D={12} tone="dark" />
      <Hot x={1050} y={130} w={280} h={140} s={0.54} e={0.64} D={12} />
      <Hot x={1420} y={130} w={280} h={140} s={0.64} e={0.72} D={12} />
      <Pkt path="M 1190 310 H 190" label="200 + JSON" s={0.74} e={0.96} D={12} tone="ok" />
      <Say x={470} y={70} s={0.04} e={0.28} D={12} color="#1c1917">1 · middlewares</Say>
      <Say x={900} y={70} s={0.28} e={0.64} D={12} color="#1c1917">2 · routage, handler</Say>
      <Say x={1560} y={70} s={0.64} e={0.74} D={12}>3 · donnée lue</Say>
      <Say x={640} y={375} s={0.74} e={0.96} D={12}>4 · status + JSON</Say>
    </Svg>
  </Slide>
);

const Tp1: Page = () => (
  <Tp
    n={1}
    section={S1}
    title="Créer l’API artistes avec une bibliothèque Go"
    steps={[
      'Étape 1, sans IA : go mod init, serveur HTTP, GET /health',
      'Choisir sa bibliothèque : Chi, Gin, Echo, Fiber…',
      'Middlewares Logging et Request ID',
      'Étape 2 : type Artist, stockage en mémoire, 5 routes CRUD',
      '201, 204, 404, 400 : les bons codes, testés avec Postman',
      'Code rangé : presentation, domain, infrastructure',
      'Un commit par fonctionnalité, poussé à la fin du TP',
    ]}
    rendu="Rendu : le dépôt Git. L’API démarre avec go run . et vous savez expliquer l’étape 1 à l’oral."
  />
);

const Grille1: Page = () => (
  <Grille
    n={1}
    section={S1}
    intro="Plancher à 0. Les pénalités s’additionnent."
    rows={[
      ['Le projet ne compile pas ou ne démarre pas', '−10'],
      ['Route CRUD manquante (par route sur les 5)', '−2'],
      ['Mauvaise méthode ou mauvais status (par cas, maximum −4)', '−1'],
      ['Réponse sans Content-Type: application/json', '−2'],
      ['Identifiant inconnu qui ne renvoie pas 404', '−2'],
      ['JSON invalide qui ne renvoie pas 400', '−2'],
      ['Middleware Logging ou Request ID absent (par middleware)', '−2'],
      ['Code non séparé en trois dossiers, ou domain qui importe net/http', '−3'],
      ['Étape 1 non expliquée à l’oral', '−5'],
      ['Pas de commits Git réguliers', '−1'],
    ]}
  />
);

// ─── Matinée 2 ────────────────────────────────────────────────────────────────
const FrontBreak: Page = () => (
  <Break n="2" title="Consommer l’API avec React" sub="Un front qui appelle votre API : fetch, états, erreurs et CORS." />
);

const FrontGoal: Page = () => (
  <Slide section={S2}>
    <Tag text="Étape 3" />
    <Title>Étape 3 : un front React pour votre API</Title>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
      <Card title="Objectif" tone="accent" w={830} h={250}>
        Lister les artistes de votre API dans une page React.
      </Card>
      <Card title="Votre API" w={830} h={250}>
        Celle de la matinée 1, lancée sur le port 8080. Vous ne la réécrivez pas.
      </Card>
      <Card title="Le front ne sait rien d’elle" w={830} h={250}>
        Il n’a que le contrat : routes, JSON, status codes, en-têtes.
      </Card>
      <Card title="Un autre dépôt" w={830} h={250}>
        Le front est un projet à part, avec son propre serveur de développement.
      </Card>
    </div>
  </Slide>
);

const FrontBack: Page = () => (
  <Slide section={S2}>
    <Tag text="Vue d’ensemble" />
    <Title>Du navigateur à l’API</Title>
    <Svg h={380}>
      <Nd x={0} y={100} w={380} h={130} label="Navigateur" sub="React, port 5173" />
      <Nd x={1320} y={100} w={380} h={130} label="API Go" sub="port 8080" tone="accent" />
      <Ln d="M 385 140 H 1315" />
      <Ln d="M 1315 205 H 385" dashed tone="dim" />
      <Nd x={750} y={100} w={200} h={130} label="CORS" sub="origine ?" tone="muted" />
      <Pkt path="M 190 140 H 1510" label="GET /artists" s={0.05} e={0.4} D={11} tone="dark" />
      <Hot x={750} y={100} w={200} h={130} s={0.2} e={0.28} D={11} />
      <Hot x={1320} y={100} w={380} h={130} s={0.4} e={0.5} D={11} />
      <Pkt path="M 1510 205 H 190" label="200 + JSON" s={0.52} e={0.86} D={11} tone="ok" />
      <Hot x={0} y={100} w={380} h={130} s={0.86} e={0.97} D={11} />
      <Say x={850} y={320} s={0.86} e={0.99} D={11} color={ok}>React affiche la liste</Say>
    </Svg>
    <Cap>Le navigateur envoie la requête, vérifie CORS, puis affiche le JSON reçu.</Cap>
  </Slide>
);

const ReactSetup: Page = () => (
  <Slide section={S2}>
    <Tag text="Démarrage" />
    <Title>Démarrer le projet avec Vite</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Code
          w={1030}
          size={24}
          plain
          title="terminal"
          code={`
npm create vite@latest concerts-front -- --template react-ts
cd concerts-front
npm install
npm run dev
`}
        />
        <Code
          w={1030}
          size={24}
          plain
          title=".env"
          code={`
VITE_API_URL=http://localhost:8080
`}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Vite" tone="accent" w={630}>
          Serveur de développement sur localhost:5173
        </Card>
        <Card title="VITE_API_URL" w={630}>
          L’adresse de l’API ne s’écrit pas en dur dans le code. Le fichier .env reste hors de Git.
        </Card>
      </div>
    </div>
  </Slide>
);

const FrontTypes: Page = () => (
  <Slide section={S2}>
    <Tag text="Le contrat" />
    <Title>Les types reprennent le contrat de l’API</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={26}
        code={`
export type Artist = {
  id: number;
  name: string;
  genre: string;
};

export type ApiError = {
  code: string;
  message: string;
};
`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Artist" tone="accent" w={630}>
          Les champs du JSON renvoyé par GET /artists
        </Card>
        <Card title="ApiError" w={630}>
          Le format d’erreur unique défini à la matinée 1
        </Card>
      </div>
    </div>
  </Slide>
);

const FetchPitfall: Page = () => (
  <Slide section={S2}>
    <Tag text="Piège" />
    <Title>fetch ne signale pas les erreurs HTTP</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={26}
        hot={[2, 3, 4]}
        code={`
const res = await fetch(\`\${API}/artists\`);
if (!res.ok) {
  throw new Error(\`HTTP \${res.status}\`);
}
const artists: Artist[] = await res.json();
`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Promesse rejetée" tone="warn" w={630}>
          Seulement si le réseau échoue : serveur éteint, CORS refusé
        </Card>
        <Card title="404, 400, 500" tone="warn" w={630}>
          La promesse réussit quand même : tester res.ok soi-même
        </Card>
      </div>
    </div>
  </Slide>
);

const ApiClient: Page = () => (
  <Slide section={S2}>
    <Tag text="Client API" />
    <Title>Un seul endroit qui appelle fetch</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1130}
        size={22}
        title="src/api/client.ts"
        code={`
const API = import.meta.env.VITE_API_URL;

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API + path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new HttpError(res.status, body?.message ?? 'Erreur inconnue');
  }
  return res.status === 204 ? (undefined as T) : res.json();
}
`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Une erreur typée" tone="accent" w={530}>
          HttpError garde le status pour décider quoi afficher
        </Card>
        <Card title="204 sans corps" w={530}>
          DELETE ne renvoie pas de JSON : on ne le lit pas
        </Card>
      </div>
    </div>
  </Slide>
);

const RequestStates: Page = () => (
  <Slide section={S2}>
    <Tag text="États" />
    <Title>Trois états à afficher pour chaque appel</Title>
    <Svg h={400}>
      <Nd x={0} y={140} w={420} h={120} label="Chargement" sub="requête en cours" tone="muted" />
      <Nd x={1280} y={10} w={420} h={120} label="Succès" sub="afficher la liste" tone="ok" />
      <Nd x={1280} y={270} w={420} h={120} label="Erreur" sub="afficher le message" tone="warn" />
      <Ln d="M 425 175 L 1275 80" />
      <Ln d="M 425 225 L 1275 320" />
      <Pkt path="M 420 175 L 1280 80" label="200" s={0.05} e={0.35} D={12} tone="ok" />
      <Hot x={1280} y={10} w={420} h={120} s={0.35} e={0.46} D={12} tone="ok" />
      <Hot x={0} y={140} w={420} h={120} s={0.5} e={0.58} D={12} />
      <Pkt path="M 420 225 L 1280 320" label="400, 500…" s={0.58} e={0.88} D={12} tone="warn" />
      <Hot x={1280} y={270} w={420} h={120} s={0.88} e={0.98} D={12} tone="warn" />
    </Svg>
    <Cap>Sans état de chargement, l’écran reste vide. Sans état d’erreur, il reste vide sans explication.</Cap>
  </Slide>
);

const LoadList: Page = () => (
  <Slide section={S2}>
    <Tag text="Lecture" />
    <Title>Charger la liste avec useEffect</Title>
    <Code
      w={1700}
      size={24}
      title="src/components/ArtistList.tsx"
      hot={[6, 7, 8, 9, 10, 11]}
      code={`
function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    request<Artist[]>('/artists')
      .then(setArtists)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p role="alert">{error}</p>;
  return <ul>{artists.map((a) => <li key={a.id}>{a.name}</li>)}</ul>;
}
`}
    />
  </Slide>
);

const CreateArtist: Page = () => (
  <Slide section={S3}>
    <Tag text="Écriture" />
    <Title>Côté front : créer sans doublon</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1130}
        size={24}
        hot={[1, 6, 9]}
        code={`
const [key, setKey] = useState(() => crypto.randomUUID());

async function submit() {
  await request<Artist>('/artists', {
    method: 'POST',
    headers: { 'Idempotency-Key': key },
    body: JSON.stringify({ name, genre }),
  });
  setKey(crypto.randomUUID());
  await reload();
}
`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="Une clé par formulaire" tone="accent" w={530}>
          Un double-clic ou un rejeu renvoie la même clé : l’API ne crée qu’un artiste
        </Card>
        <Card title="Nouvelle clé après succès" w={530}>
          Sinon le prochain artiste serait pris pour un rejeu
        </Card>
      </div>
    </div>
    <Cap>Supprimer suit le même schéma : DELETE sur /artists/ plus l’identifiant, puis on recharge la liste.</Cap>
  </Slide>
);

const FrontErrors: Page = () => (
  <Slide section={S2}>
    <Tag text="Erreurs" />
    <Title>Que faire de chaque réponse d’erreur</Title>
    <Tbl
      head={['Réponse', 'Ce que fait le front']}
      widths={[420, 1280]}
      size={27}
      rows={[
        ['400', 'Afficher le message de l’API près du formulaire'],
        ['404', 'Dire que la ressource n’existe pas ou plus'],
        ['5xx', 'Message générique, sans détail technique'],
        ['Erreur réseau', 'Serveur injoignable ou CORS refusé'],
      ]}
    />
  </Slide>
);

const BrowserSecret: Page = () => (
  <Slide section={S3}>
    <Tag text="Token" />
    <Title>Aucun secret dans le navigateur</Title>
    <div style={{ display: 'flex', gap: 40 }}>
      <Card title="client_credentials dans React" tone="warn" w={540} h={400}>
        Le secret serait dans le JavaScript livré : tout visiteur peut le lire.
      </Card>
      <Card title="Code + PKCE" tone="ok" w={540} h={400}>
        L’utilisateur se connecte sur FerrisKey, le front reçoit un token sans aucun secret. C’est la voie réelle.
      </Card>
      <Card title="Pour le TP" tone="accent" w={540} h={400}>
        Un token obtenu avec Postman, collé dans un champ de la page. Jamais dans le code ni dans Git.
      </Card>
    </div>
  </Slide>
);

const SendToken: Page = () => (
  <Slide section={S3}>
    <Tag text="Token" />
    <Title>Envoyer et garder le token</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={24}
        hot={[4]}
        code={`
const [token, setToken] = useState('');

request<Artist[]>('/artists', {
  headers: { Authorization: \`Bearer \${token}\` },
});
`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="En mémoire (useState)" tone="ok" w={630}>
          Perdu au rechargement, mais aucun autre script ne le relit
        </Card>
        <Card title="localStorage" tone="warn" w={630}>
          Conservé, mais lisible par tout script de la page : une faille XSS le vole
        </Card>
      </div>
    </div>
  </Slide>
);

const CorsDebug: Page = () => (
  <Slide section={S2}>
    <Tag text="CORS" />
    <Title>Quand CORS bloque : lire l’onglet Réseau</Title>
    <Tbl
      head={['Ce qu’on voit', 'Cause probable']}
      widths={[780, 920]}
      size={26}
      rows={[
        ['Blocage CORS, OPTIONS en erreur', 'L’origine http://localhost:5173 n’est pas autorisée'],
        ['OPTIONS en 404 ou 405', 'Le middleware CORS ne s’applique pas à OPTIONS'],
        ['Content-Type refusé', 'Absent de Access-Control-Allow-Headers'],
        ['Ça marche dans Postman, pas dans le navigateur', 'Seul le navigateur applique CORS'],
      ]}
    />
    <Cap>Le navigateur envoie un OPTIONS de préflight avant un POST, un DELETE ou une requête avec Authorization.</Cap>
  </Slide>
);

const FrontTree: Page = () => (
  <Slide section={S2}>
    <Tag text="Dossiers" />
    <Title>Ranger le front comme l’API</Title>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <Code
        w={1030}
        size={26}
        plain
        code={`
concerts-front/
├── .env                   // VITE_API_URL, hors Git
└── src/
    ├── api/
    │   ├── client.ts      // fetch, erreurs, token
    │   └── artists.ts     // list, create, remove
    ├── components/
    │   ├── ArtistList.tsx
    │   └── ArtistForm.tsx
    └── App.tsx
`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card title="api/" tone="accent" w={630}>
          Seul endroit qui connaît fetch et les URL, comme l’infrastructure
        </Card>
        <Card title="components/" w={630}>
          Affichent des données : aucun fetch dedans, comme la présentation
        </Card>
      </div>
    </div>
  </Slide>
);

const FrontSecurity: Page = () => (
  <Slide section={S3}>
    <Tag text="Côté front" />
    <Title>Le front face à la sécurité</Title>
    <Tbl
      head={['Cas', 'Ce que fait le front']}
      widths={[560, 1140]}
      size={26}
      rows={[
        ['401', 'Demander un token : absent, invalide ou expiré'],
        ['403', 'Dire que le droit manque, sans proposer de réessayer'],
        ['429', 'Attendre la durée de Retry-After, puis réessayer'],
        ['Authorization refusé par CORS', 'À déclarer dans Access-Control-Allow-Headers'],
        ['Retry-After illisible', 'À déclarer dans Access-Control-Expose-Headers'],
      ]}
    />
  </Slide>
);

const RecapFront: Page = () => (
  <Slide section={S2}>
    <Tag text="Bilan" />
    <Title>Récapitulatif de la matinée 2</Title>
    <div style={{ display: 'flex', gap: 40 }}>
      <Card title="Appeler" tone="accent" w={540} h={400}>
        fetch, res.ok, JSON, un client unique avec une erreur typée.
      </Card>
      <Card title="Afficher" w={540} h={400}>
        Chargement, succès, erreur. Un message adapté à chaque status.
      </Card>
      <Card title="Autoriser" w={540} h={400}>
        CORS dans l’API pour l’origine du front, vérifié dans l’onglet Réseau.
      </Card>
    </div>
    <Cap>Le front et l’API ne partagent rien d’autre que leur contrat HTTP.</Cap>
  </Slide>
);

const TpFront: Page = () => (
  <Tp
    n={2}
    section={S2}
    title="Un front React pour lister vos artistes"
    steps={[
      'Projet Vite React + TypeScript, adresse de l’API dans .env',
      'Client dans api/ : fetch, res.ok, erreur typée',
      'Lister les artistes avec chargement et erreur',
      'Autoriser l’origine du front dans le CORS de l’API',
      'Message clair quand l’API renvoie une erreur',
      'Code rangé : api/ et components/',
      'Un commit par fonctionnalité, poussé à la fin du TP',
    ]}
    rendu="Rendu : le dépôt Git du front. L’API de la matinée 1 tourne pour la démonstration."
  />
);

const GrilleFront: Page = () => (
  <Grille
    n={2}
    section={S2}
    intro="Plancher à 0. Les pénalités s’additionnent."
    rows={[
      ['Le front ne démarre pas (npm run dev)', '−10'],
      ['Liste écrite en dur, non lue depuis l’API', '−5'],
      ['Erreur de l’API non affichée', '−3'],
      ['Pas d’état de chargement', '−2'],
      ['res.ok non vérifié', '−2'],
      ['fetch dans un composant, hors de api/', '−2'],
      ['Adresse de l’API écrite en dur', '−1'],
      ['Type Artist absent (any partout)', '−1'],
      ['Fichier .env dans le dépôt Git', '−1'],
      ['Pas de commits Git réguliers', '−1'],
    ]}
  />
);

const RecapSec: Page = () => (
  <Slide section={S3}>
    <Tag text="Bilan" />
    <Title>Récapitulatif de la matinée 3</Title>
    <div style={{ display: 'flex', gap: 40 }}>
      <Card title="Données" tone="accent" w={540} h={400}>
        Idempotence : répéter ne change pas le résultat. Rate limiting : 429 et Retry-After.
      </Card>
      <Card title="Accès" w={540} h={400}>
        Token JWT de FerrisKey, signature, iss, aud, exp. 401 sans token, 403 sans rôle.
      </Card>
      <Card title="Chaîne" w={540} h={400}>
        CORS avant Auth, RateLimit tôt, Idempotency près du handler.
      </Card>
    </div>
    <Cap>Une API sûre : elle limite les abus, vérifie qui appelle et ce qu’il a le droit de faire.</Cap>
  </Slide>
);

const TpSec: Page = () => (
  <Tp
    n={3}
    section={S3}
    title="Sécuriser l’API avec FerrisKey"
    steps={[
      'FerrisKey : un realm, un client et le rôle artists-writer',
      'Middleware Auth : signature, iss, aud, exp via le JWKS',
      'Sans token valide : 401. Sans le rôle : 403',
      'GET /health reste public',
      'CORS avant Auth : OPTIONS passe sans token',
      'Postman : obtenir un token et tester 401, 403, 2xx',
      'Bonus non noté : idempotence et rate limiting',
    ]}
    rendu="Rendu : le dépôt Git de l’API, sans secret dedans. Les routes de la matinée 1 doivent toujours marcher."
  />
);

const GrilleSec: Page = () => (
  <Grille
    n={3}
    section={S3}
    intro="Plancher à 0. Les pénalités s’additionnent."
    rows={[
      ['Le projet ne compile pas ou ne démarre pas', '−10'],
      ['Route d’écriture accessible sans token', '−5'],
      ['Signature du token non vérifiée', '−5'],
      ['iss, aud ou exp non contrôlé (par contrôle)', '−1'],
      ['Sans token : une autre réponse que 401', '−1'],
      ['Sans le rôle : une autre réponse que 403', '−2'],
      ['Préflight OPTIONS bloqué par Auth (CORS après Auth)', '−2'],
      ['Secret ou token dans le dépôt Git', '−3'],
      ['Régression de la matinée 1 (par route cassée)', '−2'],
    ]}
  />
);

const opening: Entry[] = [
  {
    page: Cover,
    note: `Bienvenue. Trois matinées. Vous allez construire une vraie API en Go, avec la bibliothèque web de votre choix, l'équivalent d'Express pour Node.
Matinée 1 : créer l'API, un serveur HTTP et le CRUD. Matinée 2 : un front React qui la consomme. Matinée 3 : sécuriser l'API avec FerrisKey. Chaque matinée est notée sur 20.`,
  },
  {
    page: Agenda,
    note: `Trois matinées, un rythme identique.
D'abord le cours, puis le TP noté, puis le rendu du dépôt Git. Matinée 1 : l'API. Matinée 2 : le front React. Matinée 3 : la sécurisation.
Chaque matinée donne une note sur 20, on part de 20 et on retire des points.`,
  },
  {
    page: StepsPage,
    note: `Le projet tient en une phrase : une API, son front, puis sa sécurité, en 4 étapes. Laissez le paquet traverser le schéma.
Étape 1 : créer un serveur HTTP, sans IA. Étape 2 : implémenter chaque méthode du CRUD. Les deux sont la matinée 1. Entre 1 et 2 : on aborde les middlewares.
Étape 3 : un front React qui lit l'API, matinée 2. Entre 2 et 3 : le contrat HTTP et le CORS vus depuis le navigateur.
Étape 4 : sécuriser avec FerrisKey, matinée 3. Entre 3 et 4 : la sécurité des données, idempotence et rate limiting, puis les middlewares d'authentification.
C'est la même API du début à la fin : ce que vous codez le premier jour sert encore le dernier jour.`,
  },
  {
    page: Tools,
    note: `Go 1.22 minimum. Vous choisissez une bibliothèque web : Chi, Gin, Echo ou Fiber. Toutes jouent le rôle d'Express : routeur, middlewares, aide pour lire et écrire du JSON.
Postman est votre client : tout ce que vous codez doit être vérifiable avec lui. Git : un commit par fonctionnalité, ça se voit dans la notation.
FerrisKey est le serveur d'identité de la matinée 3. Node.js et Vite servent à la matinée 2 pour le front React. Vérifiez maintenant : go version, Postman installé, dépôt créé.`,
  },
  {
    page: FilRouge,
    note: `Le fil rouge, c'est l'API d'un site de concerts : des artistes, des concerts, des lieux.
Seule la ressource artistes est obligatoire. Les concerts et les lieux sont un bonus pour ceux qui avancent vite.`,
  },
];

const part1: Entry[] = [
  {
    page: P1Break,
    note: `Matinée 1. À la fin vous avez un serveur HTTP qui sert un CRUD complet, avec des middlewares et des erreurs propres.
Plan : monolithe contre API, anatomie HTTP, puis l'étape 1 sans IA (serveur, routage, handler), les middlewares, l'étape 2 (le CRUD, les status codes, les erreurs), un peu d'architecture en trois couches et Postman. Ensuite, le TP noté.`,
  },
  {
    page: MonolithPage,
    note: `Schéma animé : le navigateur demande /artists, le serveur exécute sa logique et fabrique une page HTML entière avec les données dedans. Un seul programme fait tout : routes, logique, templates.
Le client reçoit du HTML. C'est de la présentation, pas des données utilisables par un autre programme.`,
  },
  {
    page: ApiPage,
    note: `Même besoin, autre approche : le serveur ne renvoie que des données, en JSON. Trois clients différents, application web, mobile, Postman, utilisent la même API.
L'API ne se soucie pas de l'affichage. C'est cette séparation que le syllabus appelle séparation frontend et backend.`,
  },
  {
    page: MonolithVsApi,
    note: `Comparaison. Ce n'est pas "monolithe mauvais, API bon". Un monolithe est très bien pour un petit site. L'API devient utile dès qu'il y a plusieurs clients ou qu'on veut faire évoluer le front sans toucher au back.
Dans ce module : API uniquement, JSON uniquement, pas de HTML renvoyé. On teste avec Postman.`,
  },
  {
    page: HttpCycle,
    note: `Le cycle HTTP en trois temps : le client envoie une requête, le serveur traite, le serveur répond. Puis la connexion est oubliée : chaque requête est indépendante.
Laissez tourner l'animation une fois complète avant de parler.`,
  },
  {
    page: RequestAnatomy,
    note: `Une requête a trois parties. Révélez-les une par une.
1. Ligne de requête : la méthode et le chemin. 2. Les en-têtes : métadonnées, ici le format et l'identité. 3. Le corps : les données, seulement pour POST, PUT, PATCH.`,
  },
  {
    page: ResponseAnatomy,
    note: `La réponse a la même forme : une ligne de statut, des en-têtes, un corps.
Insistez sur le code 201 et l'en-tête Location : on dit au client où trouver ce qu'on vient de créer.`,
  },
  {
    page: Methods,
    note: `Les méthodes disent l'intention. GET lit, POST crée, PUT remplace entièrement, PATCH modifie une partie, DELETE supprime.
Seul le body change selon la méthode. Le point clé : GET ne modifie jamais rien. On n'utilise jamais GET pour supprimer ou créer.
La colonne idempotente : on la laisse de côté pour l'instant. On y revient à la matinée 3, avec la protection des données.`,
  },
  {
    page: StepOne,
    note: `Étape 1 : un serveur HTTP, sans IA. C'est volontaire. Une bibliothèque, et encore plus un assistant, cache ce qu'il se passe. Il faut avoir écrit à la main un serveur qui répond avant de déléguer.
Objectif minimal : go run . démarre et GET /health répond 200 dans Postman.
Prévenez-les : à la fin de la matinée, vous passez dans les rangs et vous demandez d'expliquer une partie du code. Un code non expliqué retire 5 points dans la grille.`,
  },
  {
    page: RoutingPage,
    note: `Le routeur. Une requête GET /artists/42 arrive, il la compare à sa table, trouve la ligne GET /artists/{id}, appelle getArtist. Puis POST /artists arrive et part vers createArtist.
Le routeur ne fait que choisir. Le travail est dans le handler. Même principe dans toutes les bibliothèques.`,
  },
  {
    page: RoutingCode,
    note: `En Go, depuis la 1.22, un seul motif porte la méthode et le chemin. Les accolades déclarent un paramètre qu'on lit avec r.PathValue.
Bonus : si le chemin existe mais pas la méthode, Go renvoie 405 tout seul.
Avec Chi, Gin ou Echo : même idée, mais la syntaxe change un peu.`,
  },
  {
    page: ParamsPage,
    note: `Trois façons de passer une info. Chemin : identifie une ressource. Query : filtre, tri, pagination, on l'utilisera plus tard. Body : les données à enregistrer.
Question de contrôle : où met-on l'identifiant à supprimer ? Dans le chemin.`,
  },
  {
    page: HandlerAnatomy,
    note: `Un handler est une fonction à deux arguments : r pour lire la requête, w pour écrire la réponse.
Les lignes surlignées : lecture du paramètre, test, erreur 404. Le return après l'erreur est indispensable. Sans lui le code continue et écrit une deuxième réponse.`,
  },
  {
    page: HelloServer,
    note: `Un serveur complet tient en peu de lignes : un ServeMux, une route, ListenAndServe.
Tout le monde le lance maintenant : go run ., puis GET /health dans Postman. C'est la vérification que l'environnement marche avant le TP.`,
  },
  {
    page: Rappel2,
    note: `Vous avez un serveur qui répond. Maintenant imaginez ce qu'on veut sur chaque route : journaliser la requête, lui donner un identifiant.
Question à la salle : si on le fait dans chaque handler, que se passe-t-il quand on en a vingt ? On recopie le même code vingt fois. Réponse : un middleware.`,
  },
  {
    page: Onion,
    note: `L'image à retenir : un oignon. La requête traverse chaque couche vers le handler, puis la réponse ressort en traversant les mêmes couches.
Chaque couche peut agir avant, après, ou bloquer. Laissez l'animation tourner deux fois.`,
  },
  {
    page: MiddlewareCode,
    note: `En Go, un middleware est une fonction qui reçoit un handler et en rend un autre. L'exemple : Logging.
La ligne surlignée est le coeur : next.ServeHTTP passe la main au suivant. Ce qui est avant est exécuté à l'aller, ce qui est après au retour : ici on mesure la durée.
Pour l'utiliser, on enveloppe le routeur. Avec Gin ou Echo, la forme change mais l'idée est la même : une fonction avant et après l'appel du suivant.`,
  },
  {
    page: ChainOrder1,
    note: `On empile en imbriquant. Logging(RequestID(mux)) : Logging est le plus extérieur, le premier écrit est le premier traversé.
La requête passe par Logging, puis RequestID, puis le routeur, puis le handler. La réponse refait le chemin inverse. Retenez : on reviendra sur cet ordre à la matinée 3, quand on ajoutera des middlewares.`,
  },
  {
    page: RequestIDPage,
    note: `Un identifiant par requête. Le middleware génère une valeur aléatoire, la met dans l'en-tête de réponse X-Request-Id et l'écrit dans les logs.
Montrez dans Postman, onglet Headers de la réponse : l'identifiant est là. Si un client signale un problème, il donne cet identifiant et on retrouve sa requête dans les logs.
Notez que ce code est écrit une seule fois et s'applique à toutes les routes : c'est tout l'intérêt d'un middleware.`,
  },
  {
    page: CrudTable,
    note: `Étape 2 : le CRUD. Voici les 5 routes que vous allez coder ce matin. Elles sont dans le TP.
Notez les chemins : des noms au pluriel, jamais de verbes dans l'URL. Le verbe est dans la méthode. /artists, pas /getArtists.`,
  },
  {
    page: HandlerJson,
    note: `Pour créer : on décode le JSON du body dans une structure. Si ça échoue, 400. Ensuite on écrit : Content-Type, WriteHeader 201, puis le body.
Ordre à retenir : en-têtes, code, corps. Une fois le corps commencé, le code de statut part en 200 automatiquement et on ne peut plus le changer.`,
  },
  {
    page: StatusFamilies,
    note: `Le premier chiffre du code dit tout. 2xx réussi. 3xx redirection, on n'en fera pas. 4xx le client s'est trompé. 5xx c'est le serveur qui a un bug.
Règle simple : si le client peut corriger sa requête, c'est 4xx.`,
  },
  {
    page: StatusTable,
    note: `Les dix codes à connaître par coeur pour ce module. Ne lisez pas le tableau ligne par ligne : demandez aux étudiants un cas, "JSON cassé", "id inconnu", "pas de jeton", et laissez-les trouver le code.
Piège classique : confondre 401, pas identifié, et 403, identifié mais interdit.`,
  },
  {
    page: StatusFlow,
    note: `Dans quel ordre tester ? Du plus fondamental au plus fin : JSON lisible, identifié, autorisé, ressource existante, données valides, pas de bug. Le succès arrive en dernier.
La requête descend la liste. Dès qu'une réponse est "non", on s'arrête avec le code à droite.`,
  },
  {
    page: RichardsonLevels,
    note: `Tous les services qui parlent HTTP ne sont pas REST au même degré. Richardson a défini quatre niveaux de maturité, de 0 à 3.
Niveau 0 : un seul endpoint, tout passe en POST, l'action est décrite dans le corps. C'est du RPC sur HTTP.
Niveau 1 : on a des ressources, une URL par ressource, mais on utilise encore POST partout.
Niveau 2 : on utilise les méthodes HTTP pour leur sens, et les status codes pour le résultat. C'est ce qu'on fait dans ce module : GET /artists/42, 404 si absent.
Niveau 3 : HATEOAS. La réponse embarque des liens vers les actions possibles, le client les suit au lieu de construire les URL. C'est rare, la plupart des API "REST" s'arrêtent au niveau 2.`,
  },
  {
    page: ErrorFormat,
    note: `Premier principe : un seul format d'erreur, partout. Un code lisible par une machine, un message lisible par un humain.
La fonction writeError fait le travail : en-tête, code, JSON. Tous les handlers l'utilisent.`,
  },
  {
    page: ErrorMapping,
    note: `Deuxième principe : les erreurs métier sont des valeurs nommées, et une fonction les traduit en codes.
errors.Is compare. Le cas par défaut : 500. Une erreur qu'on n'a pas prévue est un bug du serveur, pas une erreur du client.`,
  },
  {
    page: Validation,
    note: `400 ou 422 ? 400 : le serveur n'arrive pas à lire la requête. 422 : il la lit, mais les données n'ont pas de sens.
Dans le TP : le POST /concerts avec un artist_id inexistant donne un 422.`,
  },
  {
    page: ErrorTraps,
    note: `Quatre erreurs fréquentes en TP. 200 avec un champ error : le client croit que ça a marché. err.Error() brut : on expose SQL, chemins. Oublier return : deux réponses. Tout en 500 : plus d'information.
Ces trois derniers coûtent des points.`,
  },
  {
    page: Spaghetti,
    note: `Vous avez maintenant du code HTTP, des règles, du stockage, des middlewares. Où ranger tout ça ?
Sans architecture, le handler fait tout : décoder, valider, appliquer les règles, lire les données, écrire la réponse. Ça marche, mais on ne peut pas tester les règles sans lancer HTTP, et changer de stockage oblige à réécrire les handlers.
On y passe peu de temps : une version simple, suffisante pour ce niveau.`,
  },
  {
    page: CliProblem,
    note: `Un exemple concret. Votre API d'artistes marche. Demain, on veut le même outil en ligne de commande : « artists add Daft Punk » dans un terminal, sans serveur.
Si les règles sont dans le handler, on est bloqué : le handler attend une requête HTTP et écrit une réponse HTTP, il n'y a rien à appeler depuis un terminal.
Il reste deux mauvaises solutions : recopier décodage, validation, règles et stockage dans la commande, ou simuler de fausses requêtes HTTP. Dans les deux cas, chaque correction doit être faite deux fois.
Question à la salle : si on corrige une règle dans le handler, qui pense à corriger la CLI ?`,
  },
  {
    page: Layers,
    note: `La solution : trois couches. Présentation : tout ce qui est HTTP, handlers et middlewares. Domain : les règles. Infrastructure : le stockage.
Suivez la requête : elle entre par la présentation, passe au domain, qui demande les données à l'infrastructure. La réponse remonte par le même chemin.
Placez maintenant vos middlewares Logging et Request ID : ce sont de la présentation.`,
  },
  {
    page: CliSolution,
    note: `Même exemple, avec les trois couches. Le handler HTTP et la commande CLI sont deux présentations : l'une traduit une requête HTTP, l'autre traduit des arguments de terminal.
Les deux appellent le même domain, qui contient les règles une seule fois. Une règle corrigée est corrigée pour les deux.
C'est l'argument pour séparer : on peut ajouter une entrée sans réécrire la logique.`,
  },
  {
    page: Direction,
    note: `Une seule règle à retenir : le domain ne dépend de personne. La présentation et l'infrastructure dépendent du domain, pas l'inverse.
Concrètement : aucun import de net/http, ni de votre bibliothèque web, dans le dossier domain. C'est un critère de la grille.`,
  },
  {
    page: Tree,
    note: `Sur le disque : un dossier par couche et un main.go à la racine. Les noms de dossiers sont libres, l'important est la direction des dépendances.
Un package Go par dossier. main.go assemble : il crée le stockage, le donne au service, donne le service au handler.`,
  },
  {
    page: Limits,
    note: `Ce qu'on ne fait pas, volontairement. Il existe des architectures plus complètes, hexagonale, DTO séparés, injection de dépendances. Vous les croiserez, mais elles ne servent à rien tant que les bases ne sont pas solides.
Si un étudiant pose la question : renvoyez vers plus tard.`,
  },
  {
    page: PostmanCollection,
    note: `Postman en vrai : une collection organisée en dossiers, un environnement avec des variables pour l'adresse et plus tard le token, et un export JSON versionné dans le dépôt.
Montrez la création d'un environnement en direct.`,
  },
  {
    page: PostmanTests,
    note: `Dans Postman, l'onglet Scripts, partie Post-response, anciennement Tests. On écrit des assertions : le code, puis le contenu.
Le Collection Runner exécute toute la collection. Il sert aussi pour la rafale du rate limiting : plusieurs itérations sans délai.`,
  },
  {
    page: Recap1,
    note: `Récapitulatif animé du trajet : Postman envoie, les middlewares journalisent et protègent, le routeur choisit, le handler lit r et écrit w, le stockage donne la donnée, la réponse remonte avec un code et du JSON.
Demandez à un étudiant de refaire ce trajet à l'oral.`,
  },
  {
    page: () => <Break n="TP 1" title="TP noté" sub="Créer l’API artistes avec une bibliothèque Go" />,
    note: `Fin du cours, début du TP noté 1. Rappelez la grille, le rendu du dépôt, puis lancez le TP.`,
  },
  {
    page: Tp1,
    note: `TP noté 1. L'étape 1 d'abord, sans IA : le serveur et GET /health. Puis le choix de la bibliothèque, les deux middlewares, le CRUD complet sur /artists avec les bons codes, et le rangement en trois dossiers. Un commit par fonctionnalité.
Rappelez que les erreurs 404 et 400 sont notées, ainsi que la présence de Logging et Request ID. Circulez, répondez aux blocages, ne donnez pas le code. Posez à chacun une question sur son serveur pour la note d'oral.`,
  },
  {
    page: Grille1,
    note: `La grille, annoncée avant le TP. On part de 20. Un projet qui ne compile pas coûte 10 points, donc ils doivent lancer go run régulièrement.
Les 5 points d'oral : vous demandez d'expliquer un passage de l'étape 1. Un code qu'on ne sait pas expliquer retire 5 points.
Les pénalités s'additionnent, le plancher est 0.
Le rangement en trois dossiers : −3, y compris si le domain importe net/http.`,
  },
];

const part2: Entry[] = [
  {
    page: FrontBreak,
    note: `Matinée 2. L'API de la matinée 1 tourne. Aujourd'hui on se met de l'autre côté : on écrit le client, un front React qui appelle cette API.
Plan : l'objectif, le trajet d'une requête, le projet Vite, fetch et ses pièges, les états, lister, le CORS, les erreurs, le rangement. Ensuite, le TP noté.`,
  },
  {
    page: FrontGoal,
    note: `Étape 3. Un front : lister les artistes de votre API. Votre API de la matinée 1 tourne sur le port 8080, vous la modifiez seulement pour le CORS.
Idée clé : le front n'a aucun accès au code de l'API. Il n'a que le contrat : routes, JSON, status codes, en-têtes. Si le contrat est clair, le front se code facilement. Créer, supprimer et le token viendront à la matinée 3.`,
  },
  {
    page: FrontBack,
    note: `Le trajet d'une requête. Le navigateur est sur le port 5173, l'API sur le 8080 : deux origines différentes. Avant d'accepter la réponse, le navigateur vérifie que l'API autorise l'origine : c'est CORS, qu'on configure dans cette matinée.
Suivez le paquet : GET /artists part, passe CORS, arrive à l'API, la réponse 200 avec du JSON revient, React l'affiche.`,
  },
  {
    page: ReactSetup,
    note: `Vite crée le projet. On prend le modèle react-ts : React et TypeScript. npm run dev lance le serveur sur le port 5173.
L'adresse de l'API va dans un fichier .env, variable VITE_API_URL : elle change entre le poste de développement et la production. Le .env ne va pas dans Git.`,
  },
  {
    page: FrontTypes,
    note: `En TypeScript, on décrit le contrat avec des types. Artist reprend les champs du JSON. ApiError reprend le format d'erreur unique de la matinée 1 : code et message.
Si l'API change un champ, le compilateur le signale côté front. Vérifiez que les noms correspondent exactement à votre JSON.`,
  },
  {
    page: FetchPitfall,
    note: `Le piège numéro un de fetch. La promesse n'est rejetée que si le réseau échoue : serveur éteint, CORS refusé. Une réponse 404 ou 500 est une réponse comme une autre, la promesse réussit.
Il faut donc tester res.ok soi-même, avant de lire le JSON. C'est un critère de la grille.`,
  },
  {
    page: ApiClient,
    note: `On ne répète pas ce test dans chaque composant. Un petit client, request, appelle fetch, ajoute le Content-Type, teste res.ok, et lève une HttpError avec le status et le message de l'API.
Cas particulier : un 204, comme sur DELETE, n'a pas de corps, donc pas de JSON à lire. Même idée que les trois couches de la matinée 1 : un seul endroit qui connaît le transport.`,
  },
  {
    page: RequestStates,
    note: `Un appel réseau n'est pas instantané. Trois états : chargement, succès, erreur. Suivez le paquet : il part en chargement, arrive en succès avec un 200, puis un deuxième appel arrive en erreur avec un 400 ou un 500.
Une interface qui n'affiche pas l'état de chargement semble cassée. Une qui n'affiche pas l'erreur échoue sans explication.`,
  },
  {
    page: LoadList,
    note: `Le chargement de la liste. Trois états React : la liste, le chargement, l'erreur. useEffect lance la requête une fois, quand le composant apparaît, grâce au tableau de dépendances vide.
Les lignes en couleur : succès dans then, erreur dans catch, fin du chargement dans finally. Puis trois return selon l'état.`,
  },
  {
    page: CorsPage,
    note: `CORS : maintenant il compte, parce que votre front tourne sur le port 5173 et votre API sur le 8080. Le navigateur envoie d'abord un OPTIONS pour demander la permission. L'API répond avec des en-têtes qui autorisent.
Seul le navigateur fait ça. Avec Postman rien ne se passe, ce qui explique pourquoi "ça marche dans Postman mais pas dans le navigateur".`,
  },
  {
    page: CorsCode,
    note: `Le middleware CORS, à ajouter à votre API ce matin. Trois en-têtes : origine autorisée, méthodes, en-têtes. Ici l'origine est celle de Vite, localhost:5173, et Content-Type est le seul en-tête déclaré pour l'instant.
Pour OPTIONS on répond 204 tout de suite. Plus tard, avec FerrisKey, il faudra ajouter Authorization, et le préflight ne devra jamais passer par Auth. Listez les origines précises plutôt qu'une étoile. Chi, Gin et Echo ont des middlewares CORS tout faits : à vous de choisir.`,
  },
  {
    page: CorsDebug,
    note: `CORS vu du côté front. Ouvrez l'onglet Réseau des outils de développement. Avant un POST, un DELETE ou une requête avec un en-tête particulier, le navigateur envoie un OPTIONS, le préflight.
Lisez le tableau : origine non autorisée, OPTIONS qui n'est pas traité par le middleware, en-tête absent d'Allow-Headers. Dernière ligne : "ça marche dans Postman" ne prouve rien, Postman n'applique pas CORS. Les corrections se font dans l'API.`,
  },
  {
    page: FrontErrors,
    note: `Chaque status a une réaction. 400 : montrer le message de l'API. 404 : la ressource n'existe pas ou plus. 5xx : message générique, jamais de détail technique à l'utilisateur.
Dernière ligne : une erreur réseau, sans status, veut dire serveur injoignable ou CORS refusé. Les cas 401, 403 et 429 viendront avec la sécurité, à la matinée 3.`,
  },
  {
    page: FrontTree,
    note: `Même principe que les trois couches de l'API. Le dossier api contient les appels : seul endroit qui connaît fetch et les URL. Le dossier components affiche des données, sans aucun fetch dedans.
Si l'API change d'adresse ou de format, on corrige à un seul endroit.`,
  },
  {
    page: RecapFront,
    note: `Bilan de la matinée 2. Appeler : fetch, res.ok, un client unique. Afficher : trois états, un message par status. Autoriser : CORS dans l'API, vérifié dans l'onglet Réseau.
Demandez à chaque étudiant de citer une chose du côté client qu'il n'avait pas imaginée.`,
  },
  {
    page: () => <Break n="TP 2" title="TP noté" sub="Un front React pour lister vos artistes" />,
    note: `Fin du cours, début du TP noté 2. Rappelez la grille, le rendu du dépôt, puis lancez le TP.`,
  },
  {
    page: TpFront,
    note: `TP noté 2. Un projet Vite à part, qui appelle votre propre API lancée en local. Lister les artistes, avec chargement et erreur, ajuster le CORS de l'API, ranger le code.
Le plus risqué : oublier res.ok, mettre l'adresse de l'API en dur, ou ne pas voir l'erreur CORS. Dites-leur de vérifier l'onglet Réseau à chaque étape.`,
  },
  {
    page: GrilleFront,
    note: `La grille. Un front qui ne démarre pas : −10. Une liste écrite en dur au lieu d'être lue depuis l'API : −5, c'est le coeur du sujet. Une erreur non affichée : −3.
Les pénalités s'additionnent, plancher 0.`,
  },
];

const part3: Entry[] = [
  {
    page: SecBreak,
    note: `Matinée 3. L'API marche, le front l'appelle. Aujourd'hui on la sécurise en deux temps : d'abord les données, puis l'accès.
Premier temps : que se passe-t-il quand une requête est envoyée deux fois, ou mille fois ? L'idempotence, la clé d'idempotence, le rate limiting et le seau de jetons, les timeouts. Deuxième temps : l'authentification avec FerrisKey, les rôles. Un seul TP noté à la fin : FerrisKey. L'idempotence et le rate limiting sont en bonus, non notés.`,
  },
  {
    page: DataRisks,
    note: `Début de la sécurité. D'abord celle des données : deux risques, deux schémas.
Risque 1 : le réseau coupe, le client renvoie son POST sans savoir si le premier est passé. Résultat : deux artistes identiques en base.
Risque 2 : un script, volontaire ou non, envoie des milliers de requêtes. L'API n'a plus de ressources et ne répond plus à personne.
Les deux défenses sont l'idempotence et le rate limiting.`,
  },
  {
    page: IdempotenceProblem,
    note: `Avant la définition, le problème concret. Le client envoie un PUT. Le serveur le traite. Mais la réponse se perd en route : le réseau a coupé.
Le client ne sait pas si la requête est passée. Question à la salle : est-ce qu'il peut la renvoyer sans risque ? Laissez répondre, puis passez à la page suivante.`,
  },
  {
    page: IdempotencePage,
    note: `Idempotent veut dire : envoyer la même requête plusieurs fois donne le même état final que l'envoyer une seule fois.
Voie du haut : PUT /artists/42 avec le nom Daft Punk, envoyé deux fois. Après le premier envoi le nom est Daft Punk, après le deuxième il l'est toujours. Rien n'a changé : c'est idempotent.
Voie du bas : POST /artists envoyé deux fois. Chaque envoi crée un artiste, on se retrouve avec deux artistes, id 1 et id 2. Ce n'est pas idempotent.
Pourquoi c'est utile : si le réseau coupe et que le client ne sait pas si sa requête est passée, il peut renvoyer un PUT ou un DELETE sans risque, mais pas un POST.`,
  },
  {
    page: IdempotenceAxes,
    note: `Comment obtenir de l'idempotence. Quatre pistes, de la plus simple à la plus avancée.
1. Choisir la bonne méthode : PUT remplace, DELETE supprime, les deux donnent le même état si on les répète. POST crée : il faut un autre moyen.
2. Décrire l'état final : envoyer stock égale 10 est idempotent, envoyer "ajoute 1" ne l'est pas, chaque envoi change le résultat.
3. Clé d'idempotence : pour un POST qu'on doit pouvoir renvoyer, comme un paiement, le client génère un identifiant unique et l'envoie dans un en-tête. Le serveur mémorise la clé : au deuxième envoi il renvoie la réponse du premier sans rien recréer. C'est utilisé par les API de paiement. On ne le code pas dans ce module.
4. Refuser les doublons : une règle d'unicité, par exemple deux artistes de même nom, fait répondre 409 Conflict au deuxième POST.
Pour le TP : DELETE deux fois sur le même id donne 204 puis 404. L'état final est le même, l'artiste n'existe plus.`,
  },
  {
    page: IdemKeyFlow,
    note: `Retour au POST, qui n'est pas idempotent. La solution la plus courante : la clé d'idempotence.
Premier envoi : le client joint une clé unique dans l'en-tête Idempotency-Key. L'API ne la connaît pas, elle crée l'artiste, mémorise la clé avec la réponse, et répond 201.
Deuxième envoi avec la même clé : l'API la reconnaît et rejoue la même réponse, sans rien créer. Un seul artiste en base.
Laissez l'animation tourner deux fois.`,
  },
  {
    page: IdemKeyCode,
    note: `Le middleware s'applique seulement aux POST qui portent la clé. Sans clé, rien ne change.
Les lignes surlignées : on cherche la clé dans la mémoire. Si elle est absente, on exécute le vrai handler avec record, qui capture la réponse, et on la garde. Dans tous les cas, on rejoue la réponse sauvegardée.
Limites à dire à l'oral : deux requêtes simultanées avec la même clé peuvent passer toutes les deux si on ne met pas de verrou. En production on stocke dans une base ou Redis, avec une expiration. Pour le TP, une map en mémoire protégée par un mutex suffit.`,
  },
  {
    page: CreateArtist,
    note: `Côté front, l'écriture. Le formulaire envoie un POST avec un en-tête Idempotency-Key, celui qu'on vient de coder. La clé est créée avec crypto.randomUUID quand le formulaire s'ouvre, pas à chaque clic : si l'utilisateur double-clique ou si la requête est rejouée, la même clé revient et l'API ne crée qu'un artiste.
Après un succès, on génère une nouvelle clé, sinon l'artiste suivant serait pris pour un rejeu. Puis on recharge la liste. Supprimer suit le même schéma. Pensez à déclarer Idempotency-Key dans le CORS.`,
  },
  {
    page: RateLimitFlow,
    note: `Le rate limiting. Le limiteur compte les requêtes de chaque client. Le client A envoie un flot : les 3 premières passent, la 4e est refusée avec un 429.
Le client B, un utilisateur normal, n'est pas affecté : la limite est par client, pas globale.
Pourquoi : protéger l'API contre les abus, mais aussi contre les erreurs de code d'un client qui boucle.`,
  },
  {
    page: TokenBucket,
    note: `L'algorithme le plus utilisé : le seau de jetons, token bucket en anglais. Le seau contient au plus 5 jetons. Chaque requête en prend un. À vitesse fixe, un jeton est ajouté.
Tant qu'il reste un jeton, la requête passe. Quand le seau est vide : 429. Le seau permet une rafale, ici 5 requêtes d'un coup, mais pas un flot continu au-delà du rythme de remplissage.
Les deux paramètres à retenir : le rythme de remplissage et la capacité.`,
  },
  {
    page: RateLimitCode,
    note: `Go fournit un limiteur prêt à l'emploi dans golang.org/x/time/rate. On crée un limiteur par adresse IP, rangé dans une map protégée par un mutex : le détail est dans newLimiterStore, à vous de l'écrire.
Allow() renvoie faux quand le seau est vide : on répond 429 avec l'en-tête Retry-After. Les bibliothèques web ont aussi des middlewares tout faits, mais pour le TP vous écrivez le vôtre.
Pensez à nettoyer les limiteurs inactifs en production, sinon la map grossit.`,
  },
  {
    page: RateLimitHttp,
    note: `À quoi ressemble la réponse. Le code 429, l'en-tête Retry-After qui dit combien attendre, et le même format d'erreur JSON que les autres routes.
Quelle clé de limite ? Avant l'authentification, on n'a que l'adresse IP. Une fois FerrisKey en place, on pourra limiter par utilisateur.
Piège derrière un proxy : RemoteAddr est celle du proxy, donc tous les clients ont la même limite. X-Forwarded-For ne se lit que si le proxy est de confiance, sinon n'importe qui peut la falsifier.`,
  },
  {
    page: ChainOrder2,
    note: `Nouvelle chaîne. RateLimit se place tôt : on refuse les abus avant de dépenser des ressources. Idempotency se place près du handler : elle ne concerne que les POST qui arrivent jusqu'à lui.
Question à la salle : pourquoi RateLimit après RequestID ? Parce qu'une requête refusée doit quand même avoir un identifiant dans les logs et dans la réponse 429.`,
  },
  {
    page: TimeoutPage,
    note: `Le dernier maillon de la protection : les timeouts. ListenAndServe seul n'a aucun timeout. Un client très lent peut garder des connexions ouvertes indéfiniment et épuiser le serveur, c'est une forme d'abus, comme celle du rate limiting.
On construit un http.Server avec des limites. Valeurs raisonnables pour le TP : 5 secondes pour les en-têtes, 10 pour lire et écrire. Les bibliothèques permettent la même chose sur leur serveur.`,
  },
  {
    page: PostmanProtect,
    note: `Les scénarios à passer ce matin. Idempotence : POST avec la clé deux fois, un seul artiste. PUT deux fois, même état. DELETE deux fois : 204 puis 404, l'état final est le même.
Rate limiting : le Collection Runner avec 30 itérations et aucun délai, on doit voir des 429 avec Retry-After. Après une pause de 2 secondes, ça repasse en 200.`,
  },
  {
    page: P2bBreak,
    note: `Deuxième temps. L'API est protégée contre les abus, mais n'importe qui peut encore l'appeler. On la sécurise avec FerrisKey, un serveur d'identité open source.
Plan : authentification et autorisation, le token JWT, la validation, les rôles, l'ordre des middlewares. Postman fait le client. Ensuite, le TP noté.`,
  },
  {
    page: WhoCalls,
    note: `Début de l'étape 4. Montrez le schéma : un inconnu envoie DELETE /artists/42, l'API supprime et répond 204. Elle n'a vérifié ni qui appelle ni s'il en a le droit.
C'est le moment de revenir aux middlewares : on va en ajouter un pour l'authentification, un pour les rôles.`,
  },
  {
    page: AuthnAuthz,
    note: `Deux mots à ne pas mélanger. Authentification : qui appelle ? On vérifie le token. Si absent ou invalide : 401.
Autorisation : a-t-il le droit de faire cette action ? On vérifie le rôle. Si manquant : 403.
Piège classique, déjà vu en matinée 1 : 401 identifie, 403 autorise.`,
  },
  {
    page: FerrisFlow,
    note: `FerrisKey est le serveur d'identité. Le schéma en trois temps.
1. Postman envoie son identifiant et son secret à FerrisKey, qui répond avec un access token, un JWT. C'est le grant client_credentials, celui du cours FerrisKey.
2. Postman appelle votre API avec l'en-tête Authorization: Bearer et le token.
3. L'API vérifie la signature avec les clés publiques de FerrisKey, le JWKS. Elle les charge une fois puis les garde en cache : elle n'appelle pas FerrisKey à chaque requête.`,
  },
  {
    page: JwtPayload,
    note: `Un JWT contient trois parties : en-tête, payload, signature. Ici le payload décodé.
iss : qui a émis le token, l'URL du realm. aud : pour quelle API. exp : la date d'expiration. roles : les droits de l'appelant, un claim privé. Demandez aux étudiants de décoder leur token réel et de repérer où se trouvent les rôles dans leur realm.
Le payload est seulement encodé, pas chiffré : n'importe qui peut le lire. Pas de secret dedans.`,
  },
  {
    page: JwtChecks,
    note: `Les six contrôles de l'API sur chaque requête. Présence, signature, émetteur, audience, expiration : si l'un échoue, 401. Le dernier, le rôle exigé par la route : 403.
Insistez sur l'algorithme imposé : on n'accepte jamais l'algorithme annoncé par le token lui-même, sinon un token sans signature passe.
Une signature valide ne suffit pas : un token expiré ou destiné à une autre API doit être refusé.`,
  },
  {
    page: AuthCode,
    note: `Le middleware Auth. Il lit l'en-tête, retire le préfixe Bearer, puis demande à la bibliothèque JWT de faire les contrôles : signature, algorithme RS256, émetteur, audience, expiration.
Les clés viennent du JWKS de FerrisKey, chargées au démarrage avec cache. Le middleware range l'identité dans le contexte de la requête pour que les middlewares suivants puissent la lire.
Les noms exacts des fonctions dépendent de la bibliothèque JWT choisie, vérifiez sa documentation : l'important est la liste des contrôles.`,
  },
  {
    page: AuthPage,
    note: `Un middleware peut aussi arrêter la requête. En haut : token valide, la requête passe jusqu'au handler. En bas : pas de token, Auth répond 401 et le handler n'est jamais appelé.
C'est exactement ce que fait le code de la page précédente.`,
  },
  {
    page: RolesCode,
    note: `L'autorisation. RequireRole est une fabrique : elle reçoit le rôle exigé et renvoie un middleware. Elle lit l'identité rangée par Auth et répond 403 si le rôle manque.
Dans FerrisKey, on crée le rôle et on l'attribue au client utilisé par Postman. Vérifiez qu'il apparaît bien dans le token.`,
  },
  {
    page: RoutePolicy,
    note: `Qui peut appeler quoi. GET /health reste public, pour que le monitoring marche sans token. La lecture demande un token valide. L'écriture demande en plus le rôle.
Demandez à la salle quel code on obtient quand on appelle POST /artists avec un token valide mais sans le rôle : 403.`,
  },
  {
    page: ChainOrder3,
    note: `La chaîne complète. CORS vient de la matinée 2 : il doit passer avant Auth, sinon le préflight, qui n'a pas de token, recevrait un 401 et le navigateur bloquerait tout.
Pour que le front fonctionne avec la sécurité, ajoutez Authorization et Idempotency-Key dans Access-Control-Allow-Headers, et Retry-After dans Expose-Headers. Idempotency vient après Auth : elle voit l'identité. C'est l'aboutissement de la matinée.`,
  },
  {
    page: SecretsTraps,
    note: `Quatre erreurs fréquentes. Un secret dans Git : il y reste même après suppression, regardez l'historique. Un token dans les logs. Ne valider que la signature. Donner le rôle admin à tout le monde.
Le premier coûte 3 points dans la grille.`,
  },
  {
    page: BrowserSecret,
    note: `Question de sécurité. Dans Postman, vous avez utilisé le grant client_credentials, avec un secret. Si on met ce secret dans React, il est dans le JavaScript livré : n'importe quel visiteur le lit.
Pour une vraie application, un navigateur utilise le flux Authorization Code avec PKCE : l'utilisateur se connecte sur FerrisKey, le front reçoit un token sans aucun secret. Consultez la documentation FerrisKey avant de le montrer en démo. Pour le TP, version simple : un token obtenu avec Postman, collé dans un champ.`,
  },
  {
    page: SendToken,
    note: `Une fois le token en main, on l'envoie dans l'en-tête Authorization, au format Bearer.
Où le garder ? En mémoire, dans un useState : perdu au rechargement, mais aucun autre script ne le lit. Dans localStorage : conservé, mais lisible par tout script de la page, donc une faille XSS le vole. Pour le TP, la mémoire suffit.`,
  },
  {
    page: FrontSecurity,
    note: `Ce que le front doit faire quand la sécurité s'en mêle. 401 : demander un token. 403 : le droit manque, réessayer ne sert à rien. 429 : lire Retry-After et attendre.
Deux pièges CORS : Authorization doit être déclaré dans Allow-Headers, et Retry-After dans Expose-Headers, sinon le JavaScript ne peut pas le lire.`,
  },
  {
    page: PostmanFerris,
    note: `Dans Postman, onglet Authorization de la collection : OAuth 2.0, grant Client Credentials, l'URL du token de votre realm, l'identifiant et le secret de votre client FerrisKey.
Le secret va dans l'environnement Postman. Get New Access Token puis Use Token : Postman ajoute l'en-tête Bearer à chaque requête.
Montrez la manipulation en direct.`,
  },
  {
    page: PostmanAuthTests,
    note: `Les scénarios de sécurité. Sans token : 401. Token modifié ou expiré : 401. Token valide sans le rôle : 403. Avec le rôle : 201. Route publique : 200. Préflight : 204 avec les en-têtes Access-Control.
Ils correspondent à la grille. Une route non testée est une route qu'on découvre cassée à la correction.`,
  },
  {
    page: RecapSec,
    note: `Bilan de la matinée 3. Données : idempotence et rate limiting. Accès : token de FerrisKey, 401 ou 403, rôles. Chaîne : CORS avant Auth, RateLimit tôt, Idempotency près du handler.
Une question orale avant le TP : pourquoi CORS avant Auth ?`,
  },
  {
    page: () => <Break n="TP 3" title="TP noté" sub="Sécuriser l’API avec FerrisKey" />,
    note: `Fin du cours, début du TP noté 3. Rappelez la grille, le rendu du dépôt, puis lancez le TP.`,
  },
  {
    page: TpSec,
    note: `TP noté 3. Même dépôt que la matinée 1. Dans FerrisKey, un realm, un client et un rôle. Dans l'API, le middleware Auth, avec CORS toujours avant. Dans Postman, un token et les scénarios 401, 403 et réussite.
L'idempotence et le rate limiting sont un bonus, non noté. Le plus risqué : casser ce qui marchait, et oublier le secret dans un commit. Dites-leur de relancer leurs tests Postman à chaque étape.`,
  },
  {
    page: GrilleSec,
    note: `La grille. Route d'écriture ouverte et signature non vérifiée : −5 chacune, c'est le coeur de la matinée. Un préflight bloqué par Auth : −2. Un secret dans Git : −3.
Les pénalités s'additionnent, plancher 0.`,
  },
  {
    page: Closing,
    note: `Conclusion. Une API est un contrat clair : une requête, une réponse, un code, du JSON. Côté serveur, middlewares, protection et authentification font tenir ce contrat. Côté client, le front ne s'appuie que sur lui.
Rendez vos dépôts, merci.`,
  },
];

// ─── Deck ─────────────────────────────────────────────────────────────────────
const deck: Entry[] = [...opening, ...part1, ...part2, ...part3];

export const meta: SlideMeta = {
  title: 'Anatomie d’une API',
  createdAt: '2026-11-22T11:21:46.498Z',
};
export default deck.map((e) => e.page) satisfies Page[];
export const notes = deck.map((e) => e.note);
