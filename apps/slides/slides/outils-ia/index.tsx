import { useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import ferrisKeyLogo from './assets/ferriskey-logo.svg';
import { useSlidePageNumber } from '@open-slide/core';

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

const Loop = ({ steps, center }: { steps: string[]; center?: string }) => {
  const W = 800;
  const markerId = `loop-arrow-${useId().replace(/:/g, '')}`;
  const H = 400;
  const cx = W / 2;
  const cy = H / 2;
  const rx = 290;
  const ry = 140;
  const n = steps.length;
  const gap = 360 / n;
  const trim = Math.min(24, gap * 0.3);
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const at = (deg: number) => ({
    x: cx + rx * Math.sin(rad(deg)),
    y: cy - ry * Math.cos(rad(deg)),
  });
  const nodes = steps.map((label, i) => ({ label, i, ...at(i * gap) }));
  const arcs = steps.map((_, i) => {
    const a = at(i * gap + trim);
    const b = at((i + 1) * gap - trim);
    return `M ${a.x} ${a.y} A ${rx} ${ry} 0 0 1 ${b.x} ${b.y}`;
  });
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ flexShrink: 0 }}>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX={8}
          refY={5}
          markerWidth={7}
          markerHeight={7}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1c1917" />
        </marker>
      </defs>
      {arcs.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#1c1917"
          strokeWidth={3}
          markerEnd={`url(#${markerId})`}
        />
      ))}
      {center ? (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily={mono}
          fontSize={28}
          fontWeight={700}
          fill={muted}
        >
          {center}
        </text>
      ) : null}
      {nodes.map((s) => {
        const w = Math.max(170, s.label.length * 16 + 40);
        return (
          <g key={s.i}>
            <rect
              x={s.x - w / 2}
              y={s.y - 30}
              width={w}
              height={60}
              rx={4}
              fill={s.i === 0 ? accentSoft : surface}
              stroke={s.i === 0 ? '#EF7809' : border}
              strokeWidth={3}
            />
            <text
              x={s.x}
              y={s.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily={mono}
              fontSize={26}
              fontWeight={700}
              fill="#1c1917"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
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

const Gauge = ({ value, label, valueText }: { value: number; label: string; valueText?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: 28, lineHeight: 1.2 }}>{label}</span>
      <span style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, color: muted }}>
        {valueText ?? `${Math.round(value * 100)} %`}
      </span>
    </div>
    <div
      style={{
        height: 28,
        background: surface,
        border: `3px solid ${border}`,
        borderRadius: 'var(--osd-radius)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(1, value)) * 100}%`,
          height: '100%',
          background: 'var(--osd-accent)',
        }}
      />
    </div>
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
type Entry = { page: Page; note?: string };

const Cover: Page = () => (
  <Slide section="">
    <BreakSquares n="IA" seed="cover-outils-ia" />
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
        BACHELOR 1 · 12H
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
        Introduction
        <br />
        à l’<span style={{ color: 'var(--osd-accent)' }}>IA</span>
      </h1>
      <div style={{ width: 160, height: 8, background: 'var(--osd-accent)' }} />
      <p style={{ fontSize: 48, lineHeight: 1.4, color: muted, margin: 0 }}>
        Comprendre, piloter, contrôler
      </p>
    </div>
  </Slide>
);

const Agenda: Page = () => (
  <Slide section="Ouverture">
    <Tag text="Planning" />
    <Title>Deux jours, 12 heures</Title>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 50, marginTop: 20 }}>
      <Timeline
        marks={[
          { at: 0, label: 'Comprendre', tone: 'accent' },
          { at: 0.25, label: 'Environnement', tone: 'muted' },
          { at: 0.5, label: 'API Go' },
          { at: 0.75, label: 'Bilan', tone: 'muted' },
          { at: 1, label: 'Pratique', tone: 'accent' },
        ]}
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 60 }}>
        <Box label="J1 matin" sub="3h30 + 30 min d’environnement" tone="accent" w={480} h={130} />
        <Box label="J1 après-midi" sub="4h de TP" w={480} h={130} />
        <Box label="J2" sub="1h de bilan + 3h de pratique" tone="accent" w={480} h={130} />
      </div>
    </div>
  </Slide>
);

const opening: Entry[] = [
  {
    page: Cover,
    note: `Bienvenue. Deux jours, 12 heures, un seul fil : comprendre les outils d’IA, les piloter, contrôler ce qu’ils produisent.
On ne fera pas de maths : pas de calcul de réseaux de neurones, juste des repères utiles.`,
  },
  {
    page: Agenda,
    note: `Annonce du planning. J1 matin : 3h30 de théorie, puis 30 minutes pour vérifier l’environnement.
J1 après-midi : 4h de TP, avec un fil rouge, une API en Go.
J2 : 1h de bilan, puis 3h de pratique.`,
  },
];

// ─── J1 matin : 1 Bases ───────────────────────────────────────────────────────
const BasesBreak: Page = () => (
  <Break n="1" title="Les bases" sub="Ce qu’est un modèle, un LLM, un agent." />
);

const StepPanel = ({ n, title, h = 380, children }: { n: string; title: string; h?: number; children: ReactNode }) => (
  <div
    style={{
      width: 480,
      height: h,
      boxSizing: 'border-box',
      border: `3px solid ${border}`,
      background: surface,
      borderRadius: 'var(--osd-radius)',
      padding: '22px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          background: 'var(--osd-accent)',
          color: '#fff',
          fontFamily: mono,
          fontSize: 26,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {n}
      </span>
      <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 700 }}>{title}</span>
    </div>
    {children}
  </div>
);

const Chip = ({ text, hot }: { text: string; hot?: boolean }) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 32,
      padding: '8px 16px',
      border: `3px solid ${hot ? 'var(--osd-accent)' : border}`,
      background: hot ? accentSoft : '#fff',
      color: hot ? 'var(--osd-accent)' : 'var(--osd-text)',
      fontWeight: hot ? 700 : 400,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    {text}
  </span>
);

const CandidateBar = ({ word, share, hot, bad }: { word: string; share: number; hot?: boolean; bad?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <span style={{ fontFamily: mono, fontSize: 28, width: 130, fontWeight: hot || bad ? 700 : 400 }}>{word}</span>
    <div
      style={{
        height: 30,
        width: Math.round(260 * share),
        background: bad ? warn : hot ? 'var(--osd-accent)' : dim,
        borderRadius: 3,
      }}
    />
  </div>
);

const NextToken: Page = () => (
  <Slide section="1 · Les bases">
    <Tag text="Le principe" />
    <Title>Un LLM prédit le token suivant, en boucle</Title>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 20, marginLeft: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StepPanel n="1" title="Le texte, en tokens">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Chip text="Le" />
            <Chip text="chat" />
            <Chip text="dort" />
            <Chip text="sur" />
            <Chip text="le" />
          </div>
          <span style={{ fontSize: 26, color: muted }}>Un token : un morceau de mot.</span>
        </StepPanel>
        <Arrow dir="right" />
        <StepPanel n="2" title="Le modèle note la suite">
          <CandidateBar word="canapé" share={1} hot />
          <CandidateBar word="lit" share={0.6} />
          <CandidateBar word="toit" share={0.3} />
          <CandidateBar word="frigo" share={0.08} />
          <span style={{ fontSize: 24, color: muted }}>Probabilités : illustration.</span>
        </StepPanel>
        <Arrow dir="right" />
        <StepPanel n="3" title="On en choisit un">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Chip text="Le" />
            <Chip text="chat" />
            <Chip text="dort" />
            <Chip text="sur" />
            <Chip text="le" />
            <Chip text="canapé" hot />
          </div>
          <span style={{ fontSize: 26, color: muted }}>Il rejoint le texte.</span>
        </StepPanel>
      </div>
      <div style={{ position: 'relative', marginLeft: 240, width: 1180, height: 80 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderLeft: `3px dashed ${dim}`,
            borderRight: `3px dashed ${dim}`,
            borderBottom: `3px dashed ${dim}`,
            boxSizing: 'border-box',
          }}
        />
        <svg width={28} height={20} style={{ position: 'absolute', left: -14, top: -2 }}>
          <polygon points="14,0 3,18 25,18" fill={dim} />
        </svg>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: -18, textAlign: 'center' }}>
          <span style={{ fontFamily: mono, fontSize: 26, color: muted, background: 'var(--osd-bg)', padding: '0 20px' }}>
            on recommence avec le texte allongé
          </span>
        </div>
      </div>
    </div>
  </Slide>
);

const KindCard = ({
  name,
  sub,
  io,
  example,
  acts,
  hot,
}: {
  name: string;
  sub: string;
  io: string;
  example: string;
  acts: boolean;
  hot?: boolean;
}) => (
  <div
    style={{
      width: 470,
      height: 470,
      boxSizing: 'border-box',
      border: `3px solid ${hot ? 'var(--osd-accent)' : border}`,
      background: hot ? accentSoft : surface,
      borderRadius: 'var(--osd-radius)',
      padding: '26px 30px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}
  >
    <div>
      <div style={{ fontFamily: mono, fontSize: 48, fontWeight: 700 }}>{name}</div>
      <div style={{ fontSize: 28, color: muted, marginTop: 4 }}>{sub}</div>
    </div>
    <div
      style={{
        fontFamily: mono,
        fontSize: 30,
        padding: '10px 16px',
        background: '#fff',
        border: `3px solid ${border}`,
        borderRadius: 'var(--osd-radius)',
      }}
    >
      {io}
    </div>
    <div style={{ fontSize: 30, lineHeight: 1.35, flex: 1 }}>{example}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ fontSize: 26, color: muted }}>Agit seul ?</span>
      <span
        style={{
          fontFamily: mono,
          fontSize: 28,
          fontWeight: 700,
          padding: '4px 18px',
          borderRadius: 'var(--osd-radius)',
          background: acts ? 'var(--osd-accent)' : border,
          color: acts ? '#fff' : 'var(--osd-text)',
        }}
      >
        {acts ? 'Oui' : 'Non'}
      </span>
    </div>
  </div>
);

const Nested: Page = () => (
  <Slide section="1 · Les bases">
    <Tag text="Vocabulaire" />
    <Title>Modèle, LLM, agent : qui fait quoi ?</Title>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
      <KindCard
        name="Modèle"
        sub="Une fonction apprise"
        io="données → prédiction"
        example="Reconnaît un chat sur une photo."
        acts={false}
      />
      <Arrow dir="right" label="+ langage" />
      <KindCard
        name="LLM"
        sub="Un modèle de langage"
        io="texte → texte"
        example="Écrit une fonction Go. Ne la lance pas."
        acts={false}
      />
      <Arrow dir="right" label="+ outils" />
      <KindCard
        name="Agent"
        sub="Un LLM, des outils, une boucle"
        io="objectif → actions"
        example="Écrit, lance les tests, corrige, recommence."
        acts
        hot
      />
    </div>
  </Slide>
);

const TwoWay = ({ toward, back, dir }: { toward: string; back: string; dir: 'left' | 'right' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
    <Arrow dir={dir} label={toward} />
    <Arrow dir={dir === 'left' ? 'right' : 'left'} label={back} />
  </div>
);

const AgentAnatomy: Page = () => (
  <Slide section="1 · Les bases">
    <Tag text="Anatomie" />
    <Title>Un agent, c’est un LLM et trois choses</Title>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
      <Box label="Objectif" sub="Ajoute l’endpoint POST /loans" w={500} h={130} />
      <Arrow dir="down" label="ce qu’on lui demande" />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Box label="Outils" sub="lire un fichier, lancer les tests" w={440} h={150} />
        <TwoWay dir="left" toward="appelle" back="résultat" />
        <Box label="LLM" sub="décide de la suite" w={340} h={190} tone="accent" />
        <TwoWay dir="right" toward="note" back="relit" />
        <Box label="Mémoire" sub="ce qu’il a déjà lu et fait" w={440} h={150} tone="muted" />
      </div>
    </div>
  </Slide>
);

const AgentLoop: Page = () => (
  <Slide section="1 · Les bases">
    <Tag text="Fonctionnement" />
    <Title>Un agent tourne en boucle</Title>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <div style={{ transform: 'scale(1.5)', transformOrigin: 'top center', height: 600 }}>
        <Loop steps={['Observer', 'Décider', 'Agir', 'Vérifier']} center="Agent" />
      </div>
    </div>
  </Slide>
);

const bases: Entry[] = [
  {
    page: BasesBreak,
    note: `Première partie : les bases. Trois mots à fixer : modèle, LLM, agent.`,
  },
  {
    page: NextToken,
    note: `Exemple concret avec « Le chat dort sur le ». Le texte est découpé en tokens, des morceaux de mots.
Le modèle donne une note à chaque suite possible : « canapé » arrive en tête, « frigo » est très improbable. Les barres sont une illustration, pas des mesures.
On choisit un token, on l'ajoute au texte, puis on recommence avec le texte allongé. Une réponse entière n'est que cette boucle répétée.
Un LLM ne comprend pas comme nous : il prédit une suite plausible.`,
  },
  {
    page: Nested,
    note: `Trois niveaux, du plus général au plus concret. Un modèle est une fonction apprise sur des données : il peut reconnaître une image comme prédire du texte.
Un LLM est un modèle de langage : du texte en entrée, du texte en sortie. Il écrit une fonction Go, mais il ne la lance pas.
Un agent est un LLM branché à des outils et à une boucle : il écrit, lance les tests, corrige, recommence. C'est le seul des trois qui agit seul.
Demander à la salle où se place ChatGPT, et où se place un assistant de code.`,
  },
  {
    page: AgentAnatomy,
    note: `Un agent, c'est un LLM autour duquel on branche trois choses. Exemple du TP : on lui demande d'ajouter l'endpoint POST /loans.
L'objectif dit quoi faire. Les outils, c'est ce qu'il peut faire : lire un fichier, lancer les tests. Il les appelle et reçoit un résultat.
La mémoire, c'est ce qu'il a déjà lu et fait : il la relit à chaque tour. Sans outils il ne peut que parler. Sans objectif il ne sait pas quand s'arrêter.`,
  },
  {
    page: AgentLoop,
    note: `Il observe, il décide, il agit, il vérifie, puis il recommence.
Retenir le dernier mot : vérifier. C'est là que l'humain doit rester dans la boucle.`,
  },
];

// ─── J1 matin : 2 Date de coupure ─────────────────────────────────────────────
const CutoffBreak: Page = () => (
  <Break n="2" title={'L’apprentissage\nd’un modèle'} sub="Comment il apprend, et pourquoi il ne connait pas les dernières news." />
);

const Training: Page = () => (
  <Slide section="2 · Apprentissage">
    <Tag text="Comment il apprend" />
    <Title>Un modèle apprend une fois, puis il est figé</Title>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
      <StepPanel n="1" title="Les données">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Chip text="livres" />
          <Chip text="web" />
          <Chip text="code" />
          <Chip text="articles" />
        </div>
        <span style={{ fontSize: 28, color: warn }}>Arrêtées à la date de coupure.</span>
      </StepPanel>
      <Arrow dir="right" />
      <StepPanel n="2" title="L’entraînement">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <Chip text="Prédire" />
          <Chip text="Comparer" />
          <Chip text="Corriger" />
        </div>
        <span style={{ fontSize: 26, color: muted }}>Répété sur énormément de textes.</span>
      </StepPanel>
      <Arrow dir="right" />
      <StepPanel n="3" title="Le modèle figé">
        <div style={{ display: 'flex' }}>
          <Chip text="paramètres fixes" hot />
        </div>
        <span style={{ fontSize: 28, lineHeight: 1.35 }}>Ta conversation ne le change pas. Il n’apprend plus.</span>
      </StepPanel>
    </div>
  </Slide>
);

const HowLearns: Page = () => (
  <Slide section="2 · Apprentissage">
    <Tag text="La mécanique" />
    <Title>Apprendre, c’est corriger ses erreurs</Title>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 20, marginLeft: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StepPanel n="1" title="Entrée et attendu" h={440}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Chip text="Le" />
            <Chip text="chat" />
            <Chip text="dort" />
            <Chip text="sur" />
            <Chip text="le" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 26, color: muted }}>Attendu :</span>
            <Chip text="canapé" hot />
          </div>
          <span style={{ fontSize: 24, color: muted }}>Le vrai texte donne la bonne réponse.</span>
        </StepPanel>
        <Arrow dir="right" />
        <StepPanel n="2" title="La prédiction" h={440}>
          <CandidateBar word="frigo" share={1} bad />
          <CandidateBar word="lit" share={0.55} />
          <CandidateBar word="canapé" share={0.2} />
          <span style={{ fontSize: 26, color: warn }}>Faux : « canapé » est trop peu probable.</span>
        </StepPanel>
        <Arrow dir="right" />
        <StepPanel n="3" title="La rectification" h={440}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <Chip text="Mesurer l’écart" />
            <Chip text="Ajuster un peu" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 24, color: muted }}>Probabilité de « canapé »</span>
            <CandidateBar word="avant" share={0.2} />
            <CandidateBar word="après" share={0.55} hot />
          </div>
        </StepPanel>
      </div>
      <div style={{ position: 'relative', marginLeft: 240, width: 1180, height: 80 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderLeft: `3px dashed ${dim}`,
            borderRight: `3px dashed ${dim}`,
            borderBottom: `3px dashed ${dim}`,
            boxSizing: 'border-box',
          }}
        />
        <svg width={28} height={20} style={{ position: 'absolute', left: -14, top: -2 }}>
          <polygon points="14,0 3,18 25,18" fill={dim} />
        </svg>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: -18, textAlign: 'center' }}>
          <span style={{ fontFamily: mono, fontSize: 26, color: muted, background: 'var(--osd-bg)', padding: '0 20px' }}>
            on recommence avec le texte suivant
          </span>
        </div>
      </div>
    </div>
  </Slide>
);

const CutoffTimeline: Page = () => (
  <Slide section="2 · Apprentissage">
    <Tag text="Le principe" />
    <Title>Le modèle s’arrête à une date</Title>
    <div style={{ position: 'relative', height: 170, marginTop: 120 }}>
      <div
        style={{
          position: 'absolute',
          left: 110 + 0.6 * 1480,
          width: 0.4 * 1480,
          top: 73,
          height: 26,
          border: `3px dashed ${warn}`,
          boxSizing: 'border-box',
          backgroundImage: `repeating-linear-gradient(45deg, ${warnSoft} 0 12px, #fbd5d1 12px 16px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 110,
          width: 0.6 * 1480,
          top: 82,
          height: 10,
          background: 'var(--osd-accent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 110 + 0.6 * 1480,
          width: 0.4 * 1480,
          top: 112,
          textAlign: 'center',
          fontFamily: mono,
          fontSize: 28,
          fontWeight: 700,
          color: warn,
        }}
      >
        Aveugle
      </div>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Timeline
          marks={[
            { at: 0, label: 'Données d’entraînement', tone: 'accent' },
            { at: 0.6, label: 'Date de coupure' },
            { at: 1, label: 'Aujourd’hui', tone: 'muted' },
          ]}
        />
      </div>
    </div>
    <p style={{ fontSize: 30, lineHeight: 1.4, color: muted, margin: '90px 0 0', textAlign: 'center' }}>
      Tout ce qui suit la coupure n’a jamais été vu.
    </p>
  </Slide>
);

const FailBox = ({ y, label, lines }: { y: number; label: string; lines: [string, string] }) => (
  <g>
    <rect x={1056} y={y} width={640} height={130} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
    <text x={1086} y={y + 46} fontFamily={mono} fontSize={32} fontWeight={700} fill={warn}>
      {label}
    </text>
    <text x={1086} y={y + 82} fontSize={24} fill={muted}>
      {lines[0]}
    </text>
    <text x={1086} y={y + 110} fontSize={24} fill={muted}>
      {lines[1]}
    </text>
  </g>
);

const CutoffBlind: Page = () => (
  <Slide section="2 · Apprentissage">
    <Tag text="Le piège" />
    <Title>Il répond toujours, même à tort</Title>
    <svg width={1700} height={630} viewBox="0 0 1700 630" style={{ marginTop: 10 }}>
      <defs>
        <marker id="blind-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      <rect x={2} y={182} width={336} height={136} rx={6} fill={surface} stroke={border} strokeWidth={3} />
      <text x={170} y={262} textAnchor="middle" fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
        Question
      </text>
      <path d="M 342 250 L 452 250" fill="none" stroke="#1c1917" strokeWidth={3} markerEnd="url(#blind-arrow)" />
      <rect x={458} y={150} width={420} height={200} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={668} y={236} textAnchor="middle" fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
        Réponse sûre
      </text>
      <text x={668} y={278} textAnchor="middle" fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
        d’elle
      </text>
      <text x={668} y={320} textAnchor="middle" fontSize={24} fill={muted}>
        même ton, même aplomb
      </text>
      {[70, 250, 430].map((y) => (
        <path
          key={y}
          d={`M 880 250 C 960 250 970 ${y} 1050 ${y}`}
          fill="none"
          stroke={warn}
          strokeWidth={3}
          markerEnd="url(#blind-arrow)"
        />
      ))}
      <FailBox y={5} label="Périmée" lines={['Elle ignore ce qui s’est passé', 'après sa date de coupure.']} />
      <FailBox y={185} label="Inventée" lines={['Faux chiffre, fausse citation,', 'faux nom : dits avec aplomb.']} />
      <FailBox y={365} label="À côté" lines={['Elle répond bien, mais à une', 'autre question que la vôtre.']} />
      <rect x={0} y={540} width={1700} height={90} rx={6} fill="#EF7809" />
      <text x={850} y={598} textAnchor="middle" fontFamily={mono} fontSize={34} fontWeight={700} fill="#fff">
        Esprit critique : source, date, question posée
      </text>
    </svg>
  </Slide>
);

const FixCard = ({
  y,
  label,
  label2,
  sub,
  children,
}: {
  y: number;
  label: string;
  label2?: string;
  sub: string;
  children: ReactNode;
}) => (
  <g transform={`translate(0 ${y})`}>
    <rect x={2} y={2} width={436} height={136} rx={6} fill={surface} stroke={border} strokeWidth={3} />
    <g transform="translate(70 70)" fill="none" stroke="#1c1917" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
    <text x={140} y={label2 ? 48 : 64} fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
      {label}
    </text>
    {label2 ? (
      <text x={140} y={80} fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
        {label2}
      </text>
    ) : null}
    <text x={140} y={label2 ? 114 : 100} fontSize={24} fill={muted}>
      {sub}
    </text>
  </g>
);

const CutoffFix: Page = () => (
  <Slide section="2 · Apprentissage">
    <Tag text="La parade" />
    <Title>Donner au modèle des super-pouvoirs</Title>
    <svg width={1700} height={560} viewBox="0 0 1700 560" style={{ marginTop: 20 }}>
      <defs>
        <marker id="fix-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      <FixCard y={20} label="Recherche web" sub="l’information récente">
        <circle r={30} />
        <ellipse rx={13} ry={30} />
        <line x1={-30} y1={0} x2={30} y2={0} />
      </FixCard>
      <FixCard y={210} label="Votre contexte" label2="métier" sub="vos propres fichiers">
        <rect x={-22} y={-30} width={36} height={46} rx={3} />
        <rect x={-10} y={-16} width={36} height={46} rx={3} fill={surface} />
        <line x1={-2} y1={-2} x2={16} y2={-2} />
        <line x1={-2} y1={10} x2={16} y2={10} />
      </FixCard>
      <FixCard y={400} label="Des outils" sub="des actions à la demande">
        <circle r={22} strokeWidth={10} strokeDasharray="7 8.6" />
        <circle r={14} />
      </FixCard>
      {[90, 280, 470].map((y) => (
        <path
          key={y}
          d={`M 442 ${y} C 650 ${y} 690 280 846 280`}
          fill="none"
          stroke="#1c1917"
          strokeWidth={3}
          markerEnd="url(#fix-arrow)"
        />
      ))}
      <circle cx={960} cy={280} r={110} fill="#EF7809" />
      <text x={960} y={292} textAnchor="middle" fontFamily={mono} fontSize={36} fontWeight={700} fill="#fff">
        Modèle
      </text>
      <path d="M 1074 280 L 1226 280" fill="none" stroke="#1c1917" strokeWidth={3} markerEnd="url(#fix-arrow)" />
      <rect x={1232} y={190} width={464} height={180} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <circle cx={1292} cy={280} r={26} fill="#EF7809" />
      <polyline points="1280,280 1290,291 1306,268" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <text x={1340} y={272} fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
        Réponse
      </text>
      <text x={1340} y={312} fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
        à jour
      </text>
    </svg>
  </Slide>
);

const cutoff: Entry[] = [
  {
    page: CutoffBreak,
    note: `Deuxième partie : l’apprentissage d’un modèle. Une question simple : comment un modèle sait-il ce qu’il sait, et sait-il ce qui s’est passé hier ?`,
  },
  {
    page: Training,
    note: `Trois temps. Un : les données, des livres, du web, du code, collectés jusqu’à une date.
Deux : l’entraînement. Le modèle prédit la suite, compare avec le vrai texte, corrige ses paramètres, et recommence sur énormément de textes. C’est la même mécanique que le token suivant vu juste avant.
Trois : le modèle est figé. Ses paramètres ne bougent plus. Votre conversation ne le change pas : il ne retient rien d’une discussion à l’autre.
La date où les données s’arrêtent est la date de coupure, c’est le sujet de la page suivante.`,
  },
  {
    page: HowLearns,
    note: `Le principe de l'apprentissage, sans maths. On donne au modèle un début de phrase pris dans un vrai texte : « Le chat dort sur le ». On connaît la suite attendue : « canapé ».
Le modèle fait une prédiction. Au début, elle est mauvaise : il met « frigo » en tête et donne à « canapé » une probabilité trop faible.
On mesure l'écart entre sa prédiction et la bonne réponse, puis on ajuste un tout petit peu ses paramètres pour que la probabilité de « canapé » augmente : c'est l'avant/après du dernier panneau. Les barres sont une illustration.
On recommence avec le texte suivant, énormément de fois. À la fin, ses paramètres encodent des régularités du langage. C'est tout ce qu'il a appris.`,
  },
  {
    page: CutoffTimeline,
    note: `Ses données s’arrêtent à une date, puis le modèle est figé. Après, il n’apprend plus rien tout seul.
Citer la date de coupure du modèle utilisé, à vérifier le jour J.`,
  },
  {
    page: CutoffBlind,
    note: `Le vrai danger : le modèle ne dit pas « je ne sais pas ». Il répond avec le même aplomb dans tous les cas, et il peut se tromper de trois façons.
Réponse périmée : il ignore ce qui s'est passé après sa date de coupure. Réponse inventée : un faux chiffre, une fausse citation, un faux nom, une fausse source. Réponse à côté : il répond bien, mais à une autre question que la vôtre.
Rien dans le ton ne vous prévient. C'est ici qu'il faut avoir un esprit critique : vérifier la source, la date, et que la question posée est bien celle qu'on voulait poser.
Faire deviner à la salle une question où chacun de ces cas peut arriver.`,
  },
  {
    page: CutoffFix,
    note: `Trois façons de combler le trou : une recherche web, des documents qu’on lui fournit, des outils qui vont chercher l’information.
On y reviendra avec le contexte métier et les outils.`,
  },
];

// ─── J1 matin : 3 Modèles ─────────────────────────────────────────────────────
const ModelsBreak: Page = () => (
  <Break n="3" title="Les modèles" sub="Choisir le bon, pas le plus gros." />
);

const Pips = ({ label, filled }: { label: string; filled: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <span style={{ fontSize: 24, color: muted, width: 150 }}>{label}</span>
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          boxSizing: 'border-box',
          border: `3px solid ${i < filled ? 'var(--osd-accent)' : border}`,
          background: i < filled ? 'var(--osd-accent)' : 'transparent',
        }}
      />
    ))}
  </div>
);

const ModelCard = ({
  name,
  word,
  example,
  speed,
  smart,
  h,
  hot,
}: {
  name: string;
  word: string;
  example: string;
  speed: number;
  smart: number;
  h: number;
  hot?: boolean;
}) => (
  <div
    style={{
      width: 400,
      height: h,
      boxSizing: 'border-box',
      border: `3px solid ${hot ? 'var(--osd-accent)' : border}`,
      background: hot ? accentSoft : surface,
      borderRadius: 'var(--osd-radius)',
      padding: '26px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <div style={{ fontFamily: mono, fontSize: 38, fontWeight: 700 }}>{name}</div>
    <div style={{ display: 'flex' }}>
      <span
        style={{
          fontFamily: mono,
          fontSize: 26,
          fontWeight: 700,
          padding: '4px 16px',
          borderRadius: 'var(--osd-radius)',
          background: hot ? 'var(--osd-accent)' : border,
          color: hot ? '#fff' : 'var(--osd-text)',
        }}
      >
        {word}
      </span>
    </div>
    <div style={{ fontSize: 28, lineHeight: 1.35, flex: 1 }}>{example}</div>
    <Pips label="Vitesse" filled={speed} />
    <Pips label="Intelligence" filled={smart} />
  </div>
);

const Family: Page = () => (
  <Slide section="3 · Modèles">
    <Tag text="Les familles" />
    <Title>Chaque modèle a son usage</Title>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 28, height: 540, marginTop: 10 }}>
      <ModelCard name="Haiku" word="Rapide" example="Classer des tickets, extraire un champ." speed={4} smart={1} h={420} />
      <ModelCard name="Sonnet" word="Équilibré" example="Écrire une fonction, résumer une réunion." speed={3} smart={2} h={460} />
      <ModelCard name="Opus" word="Profond" example="Refactorer un module, déboguer un cas rare." speed={2} smart={3} h={500} />
      <ModelCard name="Fable / Mythos" word="Frontière" example="Les chantiers les plus longs et les plus difficiles." speed={1} smart={4} h={540} hot />
    </div>
    <p style={{ fontSize: 26, color: muted, margin: '14px 0 0', textAlign: 'center' }}>
      Repères relatifs : chaque cran d’intelligence se paie en vitesse et en coût.
    </p>
  </Slide>
);

const DiffBar = ({ x, y, share, accent }: { x: number; y: number; share: number; accent?: boolean }) => (
  <g>
    <rect x={x} y={y} width={540} height={34} rx={6} fill={surface} stroke={border} strokeWidth={3} />
    <rect x={x} y={y} width={Math.max(24, Math.round(540 * share))} height={34} rx={6} fill={accent ? '#EF7809' : dim} />
  </g>
);

const ClassicVsFrontier: Page = () => {
  const colA = 460;
  const colB = 1120;
  const rows = [
    { y: 100, label: 'Taille', sub: 'paramètres, données' },
    { y: 216, label: 'Coût', sub: 'entraîner, puis servir' },
    { y: 332, label: 'Capacités', sub: 'ce qu’il sait faire' },
    { y: 448, label: 'Sécurité', sub: 'avant d’être publié' },
  ];
  return (
    <Slide section="3 · Modèles">
      <Tag text="Les différences" />
      <Title>Classique ou frontière : ce qui change</Title>
      <svg width={1700} height={650} viewBox="0 0 1700 650" style={{ marginTop: 0 }}>
        <text x={1700} y={44} textAnchor="end" fontFamily={mono} fontSize={22} fill={dim}>
          barres : illustration
        </text>
        <text x={colA} y={50} fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
          Classique
        </text>
        <text x={colB} y={50} fontFamily={mono} fontSize={34} fontWeight={700} fill="#EF7809">
          Frontière
        </text>
        {rows.map((row) => (
          <g key={row.label}>
            <line x1={0} y1={row.y - 18} x2={1700} y2={row.y - 18} stroke={border} strokeWidth={2} />
            <text x={0} y={row.y + 34} fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
              {row.label}
            </text>
            <text x={0} y={row.y + 68} fontSize={24} fill={muted}>
              {row.sub}
            </text>
          </g>
        ))}
        <DiffBar x={colA} y={rows[0].y + 14} share={0.3} />
        <DiffBar x={colB} y={rows[0].y + 14} share={1} accent />
        <text x={colA} y={rows[0].y + 82} fontSize={26} fill={muted}>
          Moins de paramètres, moins de données
        </text>
        <text x={colB} y={rows[0].y + 82} fontSize={26} fill={muted}>
          Beaucoup plus de paramètres et de données
        </text>
        <DiffBar x={colA} y={rows[1].y + 14} share={0.22} />
        <DiffBar x={colB} y={rows[1].y + 14} share={1} accent />
        <text x={colA} y={rows[1].y + 82} fontSize={26} fill={muted}>
          Peu de calcul, réponses rapides
        </text>
        <text x={colB} y={rows[1].y + 82} fontSize={26} fill={muted}>
          Énormément de calcul, réponses plus lentes
        </text>
        <text x={colA} y={rows[2].y + 36} fontSize={30} fill="#1c1917">
          Tâches courtes, bien cadrées
        </text>
        <text x={colB} y={rows[2].y + 36} fontSize={30} fontWeight={700} fill="#1c1917">
          Raisonnement long, planification
        </text>
        <text x={colB} y={rows[2].y + 78} fontSize={26} fill={muted}>
          Certaines n’apparaissent qu’à cette échelle
        </text>
        <text x={colA} y={rows[3].y + 36} fontSize={30} fill="#1c1917">
          Risques déjà bien connus
        </text>
        <text x={colB} y={rows[3].y + 36} fontSize={30} fontWeight={700} fill="#1c1917">
          Beaucoup plus de tests de sécurité
        </text>
        <text x={colB} y={rows[3].y + 78} fontSize={26} fill={muted}>
          Plus il est capable, plus il peut être détourné
        </text>
        <rect x={2} y={554} width={1696} height={88} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
        <text x={850} y={592} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
          Où commence la « frontière » ? Pas en paramètres, mais en calcul.
        </text>
        <text x={850} y={628} textAnchor="middle" fontSize={26} fill="#1c1917">
          UE : au-delà de 10
          <tspan dy={-10} fontSize={18}>
            25
          </tspan>
          <tspan dy={10}> opérations de calcul pour l’entraîner, un modèle est présumé à risque systémique.</tspan>
        </text>
      </svg>
    </Slide>
  );
};

const PairChip = ({ text, tone }: { text: string; tone?: 'warn' }) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 28,
      fontWeight: 700,
      padding: '8px 18px',
      borderRadius: 'var(--osd-radius)',
      border: `3px solid ${tone === 'warn' ? warn : border}`,
      background: tone === 'warn' ? warnSoft : '#fff',
      color: tone === 'warn' ? warn : 'var(--osd-text)',
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </span>
);

const TradeRow = ({ a, b, result }: { a: string; b: string; result: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <PairChip text={a} />
    <span style={{ fontFamily: mono, fontSize: 28, color: muted }}>+</span>
    <PairChip text={b} />
    <span style={{ fontFamily: mono, fontSize: 28, color: muted }}>→</span>
    <PairChip text={result} tone="warn" />
  </div>
);

const Triangle: Page = () => (
  <Slide section="3 · Modèles">
    <Tag text="Le compromis" />
    <Title>Trois qualités, rarement ensemble</Title>
    <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 10 }}>
      <svg width={800} height={560} viewBox="0 0 800 560" style={{ flexShrink: 0 }}>
        <polygon points="420,80 130,470 710,470" fill={accentSoft} stroke="#EF7809" strokeWidth={4} />
        <circle cx={420} cy={80} r={14} fill="#1c1917" />
        <circle cx={130} cy={470} r={14} fill="#1c1917" />
        <circle cx={710} cy={470} r={14} fill="#1c1917" />
        <text x={420} y={50} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
          Intelligence
        </text>
        <text x={130} y={522} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
          Petit prix
        </text>
        <text x={710} y={522} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
          Vitesse
        </text>
        <line x1={420} y1={430} x2={420} y2={130} stroke={dim} strokeWidth={3} strokeDasharray="8 6" />
        {[
          { y: 430, name: 'Léger' },
          { y: 330, name: 'Équilibré' },
          { y: 230, name: 'Profond' },
          { y: 140, name: 'Frontière' },
        ].map((m) => (
          <g key={m.name}>
            <circle cx={420} cy={m.y} r={13} fill="#EF7809" stroke="#fff" strokeWidth={3} />
            <text x={444} y={m.y + 9} fontFamily={mono} fontSize={26} fontWeight={700} fill="#1c1917" stroke={accentSoft} strokeWidth={8} paintOrder="stroke">
              {m.name}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ fontSize: 34, fontWeight: 700 }}>On en choisit deux</div>
        <TradeRow a="Intelligence" b="Vitesse" result="Coûte cher" />
        <TradeRow a="Intelligence" b="Petit prix" result="Plus lent" />
        <TradeRow a="Vitesse" b="Petit prix" result="Moins intelligent" />
      </div>
    </div>
  </Slide>
);

const RADAR_AXES = [
  { label: 'Raisonnement', sub: '' },
  { label: 'Code', sub: '' },
  { label: 'Autonomie', sub: 'tâches longues' },
  { label: 'Petit prix', sub: '' },
  { label: 'Vitesse', sub: '' },
  { label: 'Nuance', sub: 'rédaction fine' },
];

const RADAR_MODELS = [
  { name: 'Haiku', word: 'Rapide', color: '#a8a29e', v: [1, 1, 1, 4, 4, 1] },
  { name: 'Sonnet', word: 'Équilibré', color: '#f6b07a', v: [2, 2, 2, 3, 3, 2] },
  { name: 'Opus', word: 'Profond', color: '#EF7809', v: [3, 3, 3, 2, 2, 3] },
  { name: 'Fable / Mythos', word: 'Frontière', color: '#1c1917', v: [4, 4, 4, 1, 1, 4] },
];

const Radar: Page = () => {
  const cx = 480;
  const cy = 320;
  const r = 220;
  const angle = (i: number) => ((-90 + 60 * i) * Math.PI) / 180;
  const point = (i: number, value: number): [number, number] => [
    cx + ((r * value) / 4) * Math.cos(angle(i)),
    cy + ((r * value) / 4) * Math.sin(angle(i)),
  ];
  const ring = (value: number) => RADAR_AXES.map((_, i) => point(i, value).join(',')).join(' ');
  return (
    <Slide section="3 · Modèles">
      <Tag text="Le profil" />
      <Title>Chaque modèle a son profil</Title>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width={960} height={620} viewBox="0 0 960 620" style={{ flexShrink: 0 }}>
          {[1, 2, 3, 4].map((value) => (
            <polygon key={value} points={ring(value)} fill="none" stroke={border} strokeWidth={value === 4 ? 3 : 2} />
          ))}
          {RADAR_AXES.map((_, i) => {
            const [x, y] = point(i, 4);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={border} strokeWidth={2} />;
          })}
          {RADAR_MODELS.map((m) => (
            <g key={m.name}>
              <polygon
                points={m.v.map((value, i) => point(i, value).join(',')).join(' ')}
                fill={m.color}
                fillOpacity={0.14}
                stroke={m.color}
                strokeWidth={m.name === 'Fable / Mythos' ? 4 : 5}
                strokeLinejoin="round"
              />
              {m.v.map((value, i) => {
                const [x, y] = point(i, value);
                return <circle key={i} cx={x} cy={y} r={6} fill={m.color} />;
              })}
            </g>
          ))}
          {RADAR_AXES.map((axis, i) => {
            const [x, y] = point(i, 4);
            const cos = Math.cos(angle(i));
            const anchor = Math.abs(cos) < 0.1 ? 'middle' : cos > 0 ? 'start' : 'end';
            const dx = Math.abs(cos) < 0.1 ? 0 : cos > 0 ? 26 : -26;
            const dy = i === 0 ? -26 : i === 3 ? 52 : 10;
            return (
              <g key={axis.label}>
                <text x={x + dx} y={y + dy} textAnchor={anchor} fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
                  {axis.label}
                </text>
                {axis.sub ? (
                  <text x={x + dx} y={y + dy + 30} textAnchor={anchor} fontSize={22} fill={muted}>
                    {axis.sub}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {RADAR_MODELS.map((m) => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ width: 34, height: 34, borderRadius: 6, background: m.color, flexShrink: 0 }} />
              <span style={{ fontFamily: mono, fontSize: 32, fontWeight: 700 }}>{m.name}</span>
              <span style={{ fontSize: 28, color: muted }}>{m.word}</span>
            </div>
          ))}
          <p style={{ fontSize: 28, lineHeight: 1.4, color: muted, margin: '14px 0 0' }}>
            Aucun modèle ne gagne partout. Repères relatifs.
          </p>
        </div>
      </div>
    </Slide>
  );
};

const SCOPE_ROWS = [
  { name: 'Haiku', share: 0.3, fits: true },
  { name: 'Sonnet', share: 0.55, fits: false },
  { name: 'Opus', share: 0.8, fits: false },
  { name: 'Fable / Mythos', share: 1, fits: false },
];

const Diminishing: Page = () => {
  const x0 = 330;
  const w = 960;
  const task = x0 + 0.2 * w;
  return (
    <Slide section="3 · Modèles">
      <Tag text="Le bon modèle" />
      <Title>Un besoin courant a déjà son modèle</Title>
      <svg width={1700} height={636} viewBox="0 0 1700 636" style={{ marginTop: 0 }}>
        <text x={x0} y={46} fontSize={24} fill={muted}>
          tâche simple
        </text>
        <text x={x0 + w / 2} y={46} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#1c1917">
          Difficulté de la tâche
        </text>
        <text x={x0 + w} y={46} textAnchor="end" fontSize={24} fill={muted}>
          très difficile
        </text>
        {SCOPE_ROWS.map((row, i) => {
          const y = 80 + i * 90;
          return (
            <g key={row.name}>
              <text x={0} y={y + 40} fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
                {row.name}
              </text>
              <rect x={x0} y={y} width={w} height={60} rx={6} fill={surface} stroke={border} strokeWidth={3} />
              <rect x={x0} y={y} width={w * row.share} height={60} rx={6} fill={row.fits ? '#EF7809' : '#f6b07a'} />
              <text
                x={x0 + w * row.share - 16}
                y={y + 39}
                textAnchor="end"
                fontFamily={mono}
                fontSize={24}
                fontWeight={700}
                fill={row.fits ? '#fff' : '#1c1917'}
              >
                usage
              </text>
              <text
                x={x0 + w + 40}
                y={y + 28}
                fontFamily={row.fits ? mono : undefined}
                fontSize={row.fits ? 28 : 24}
                fontWeight={row.fits ? 700 : 400}
                fill={row.fits ? '#EF7809' : muted}
              >
                {row.fits ? '✓ Il suffit' : 'Plus lent, plus cher'}
              </text>
              <text x={x0 + w + 40} y={y + 58} fontSize={24} fill={muted}>
                {row.fits ? 'rapide, peu cher' : 'pour le même résultat'}
              </text>
            </g>
          );
        })}
        <line x1={task} y1={70} x2={task} y2={448} stroke="#1c1917" strokeWidth={3} strokeDasharray="8 6" />
        <text x={task} y={482} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#1c1917">
          Un besoin courant
        </text>
        <rect x={2} y={516} width={1696} height={106} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
        <text x={850} y={562} textAnchor="middle" fontSize={29} fontWeight={700} fill="#1c1917">
          Un besoin courant a déjà son modèle : un petit modèle, rapide et peu cher,
        </text>
        <text x={850} y={602} textAnchor="middle" fontSize={29} fill="#1c1917">
          plutôt qu’un très gros modèle puissant, mais lent et coûteux.
        </text>
      </svg>
    </Slide>
  );
};

const ROLES = [
  { name: 'Éclaireur', tier: 'petit modèle', hot: false, lines: ['Cherche des faits,', 'en lecture seule'] },
  { name: 'Mécanicien', tier: 'petit modèle', hot: false, lines: ['Renomme, formate,', 'génère du boilerplate'] },
  { name: 'Implémenteur', tier: 'modèle intermédiaire', hot: true, lines: ['Code et tests, sur un', 'contrat déjà gelé'] },
  { name: 'Relecteur', tier: 'modèle intermédiaire', hot: true, lines: ['Une seule lentille :', 'correction, sécurité'] },
];

const Orchestration: Page = () => (
  <Slide section="3 · Modèles">
    <Tag text="L’orchestration FerrisLabs" />
    <Title>Le gros modèle décide, les petits exécutent</Title>
    <svg width={1700} height={640} viewBox="0 0 1700 640" style={{ marginTop: 0 }}>
      <defs>
        <marker id="orch-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      {ROLES.map((role, i) => {
        const cx = 190 + i * 440;
        return (
          <path
            key={role.name}
            d={`M 850 150 C 850 205 ${cx} 195 ${cx} 246`}
            fill="none"
            stroke="#1c1917"
            strokeWidth={3}
            markerEnd="url(#orch-arrow)"
          />
        );
      })}
      <rect x={430} y={10} width={840} height={140} rx={6} fill="#EF7809" />
      <text x={850} y={58} textAnchor="middle" fontFamily={mono} fontSize={40} fontWeight={700} fill="#fff">
        Orchestrateur
      </text>
      <text x={850} y={94} textAnchor="middle" fontFamily={mono} fontSize={26} fill="#fff">
        gros modèle
      </text>
      <text x={850} y={126} textAnchor="middle" fontSize={26} fill="#fff">
        spec · découpage · contrats · intégration
      </text>
      {ROLES.map((role, i) => {
        const x = i * 440 + 2;
        return (
          <g key={role.name}>
            <rect
              x={x}
              y={250}
              width={376}
              height={190}
              rx={6}
              fill={role.hot ? accentSoft : surface}
              stroke={role.hot ? '#EF7809' : border}
              strokeWidth={3}
            />
            <text x={x + 24} y={296} fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
              {role.name}
            </text>
            <rect x={x + 24} y={312} width={role.hot ? 276 : 170} height={36} rx={18} fill={role.hot ? '#EF7809' : border} />
            <text
              x={x + 24 + (role.hot ? 138 : 85)}
              y={337}
              textAnchor="middle"
              fontFamily={mono}
              fontSize={22}
              fontWeight={700}
              fill={role.hot ? '#fff' : '#1c1917'}
            >
              {role.tier}
            </text>
            <text x={x + 24} y={386} fontSize={26} fill="#1c1917">
              {role.lines[0]}
            </text>
            <text x={x + 24} y={418} fontSize={26} fill="#1c1917">
              {role.lines[1]}
            </text>
          </g>
        );
      })}
      <rect x={2} y={490} width={1696} height={130} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={850} y={546} textAnchor="middle" fontSize={32} fontWeight={700} fill="#1c1917">
        On délègue l’exécution, jamais la décision.
      </text>
      <text x={850} y={592} textAnchor="middle" fontSize={26} fill="#1c1917">
        Les tests et le lint sont des commandes, pas des agents.
      </text>
    </svg>
  </Slide>
);

const ARCH_LAYERS = [
  { name: 'Présentation', chips: ['HTTP', 'CLI'], hot: false },
  { name: 'Domain', chips: ['Ports', 'Services'], hot: true },
  { name: 'Infrastructure', chips: ['Adapters Postgres'], hot: false },
];

const ARCH_BENEFITS = [
  { title: 'Lecture plus rapide', lines: ['On sait où chercher :', 'une règle métier est dans le domaine.'] },
  { title: 'Lecture moins coûteuse', lines: ['L’IA charge peu de fichiers :', 'moins de tokens, moins d’oublis.'] },
  { title: 'Même recette à chaque fois', lines: ['Domaine, service, adapter :', 'l’IA répète le même geste.'] },
];

const Architecture: Page = () => (
  <Slide section="3 · Modèles">
    <Tag text="Poser l’architecture" />
    <Title>Une architecture posée aide l’IA</Title>
    <svg width={1700} height={650} viewBox="0 0 1700 650" style={{ marginTop: 0, flexShrink: 0 }}>
      {ARCH_LAYERS.map((layer, i) => {
        const y = 3 + i * 200;
        return (
          <g key={layer.name}>
            <rect x={3} y={y} width={794} height={150} rx={6} fill={layer.hot ? accentSoft : surface} stroke={layer.hot ? '#EF7809' : border} strokeWidth={3} />
            <text x={30} y={y + 46} fontFamily={mono} fontSize={30} fontWeight={700} fill={layer.hot ? '#EF7809' : '#1c1917'}>
              {layer.name}
            </text>
            {layer.chips.map((chip, k) => (
              <g key={chip}>
                <rect x={30 + k * 380} y={y + 72} width={350} height={56} rx={4} fill="#fff" stroke={layer.hot ? '#EF7809' : border} strokeWidth={3} />
                <text x={205 + k * 380} y={y + 108} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700} fill="#1c1917">
                  {chip}
                </text>
              </g>
            ))}
          </g>
        );
      })}
      {[0, 1].map((i) => (
        <g key={i}>
          <line x1={400} y1={153 + i * 200} x2={400} y2={203 + i * 200} stroke="#EF7809" strokeWidth={3} strokeDasharray="8 6" />
          <text x={420} y={186 + i * 200} fontSize={24} fill={muted}>
            {i === 0 ? 'appelle le domaine' : 'implémente les ports'}
          </text>
        </g>
      ))}
      <text x={400} y={626} textAnchor="middle" fontSize={26} fill={muted}>
        Le domaine ne dépend de personne
      </text>
      {ARCH_BENEFITS.map((b, i) => {
        const y = 3 + i * 200;
        return (
          <g key={b.title}>
            <rect x={880} y={y} width={816} height={170} rx={6} fill={i === 1 ? accentSoft : surface} stroke={i === 1 ? '#EF7809' : border} strokeWidth={3} />
            <circle cx={934} cy={y + 85} r={24} fill="#EF7809" />
            <text x={934} y={y + 94} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#fff">
              {i + 1}
            </text>
            <text x={984} y={y + 58} fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
              {b.title}
            </text>
            <text x={984} y={y + 104} fontSize={26} fill={muted}>
              {b.lines[0]}
            </text>
            <text x={984} y={y + 138} fontSize={26} fill={muted}>
              {b.lines[1]}
            </text>
          </g>
        );
      })}
    </svg>
  </Slide>
);

const TypedLanguages: Page = () => {
  const cols = [
    {
      x: 0,
      head: 'Rust · Go',
      good: true,
      steps: [
        { label: 'L’IA écrit le code', sub: 'et lance le build' },
        { label: 'Le compilateur refuse', sub: 'erreur précise, au build' },
        { label: 'L’IA corrige et relance', sub: 'Rust explique, et propose le correctif' },
      ],
      loop: 'boucle courte',
      result: 'Les erreurs de type sont bloquées avant',
    },
    {
      x: 850,
      head: 'TypeScript · Python',
      good: false,
      steps: [
        { label: 'L’IA écrit le code', sub: 'types déduits, ou optionnels' },
        { label: 'Ça s’exécute', sub: 'rien ne bloque au build' },
        { label: 'L’erreur arrive tard', sub: 'à l’exécution, ou dans un test' },
      ],
      loop: 'boucle longue',
      result: 'Plus d’erreurs découvertes tard',
    },
  ];
  return (
    <Slide section="3 · Modèles">
      <Tag text="Le choix du langage" />
      <Title>Un compilateur strict guide l’IA</Title>
      <svg width={1700} height={650} viewBox="0 0 1700 650" style={{ marginTop: 0, flexShrink: 0 }}>
        {cols.map((c) => {
          const tone = c.good ? '#EF7809' : warn;
          return (
            <g key={c.head} transform={`translate(${c.x} 0)`}>
              <rect x={20} y={3} width={560} height={56} rx={28} fill={c.good ? '#EF7809' : '#fff'} stroke={tone} strokeWidth={3} />
              <text x={300} y={40} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill={c.good ? '#fff' : warn}>
                {c.head}
              </text>
              {[0, 1].map((i) => (
                <line key={i} x1={300} y1={170 + i * 150} x2={300} y2={200 + i * 150} stroke={tone} strokeWidth={3} strokeDasharray="8 6" />
              ))}
              <path d="M 580 435 H 630 V 135 H 580" fill="none" stroke={tone} strokeWidth={3} strokeDasharray="8 6" />
              <text x={646} y={278} fontFamily={mono} fontSize={22} fontWeight={700} fill={tone}>
                {c.loop}
              </text>
              {c.steps.map((st, i) => {
                const y = 80 + i * 150;
                const hot = i === 1;
                return (
                  <g key={st.label}>
                    <rect
                      x={20}
                      y={y}
                      width={560}
                      height={90}
                      rx={6}
                      fill={hot ? (c.good ? accentSoft : warnSoft) : surface}
                      stroke={hot ? tone : border}
                      strokeWidth={3}
                    />
                    <text x={300} y={y + 40} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
                      {st.label}
                    </text>
                    <text x={300} y={y + 72} textAnchor="middle" fontSize={24} fill={muted}>
                      {st.sub}
                    </text>
                  </g>
                );
              })}
              <rect x={20} y={540} width={560} height={80} rx={6} fill={c.good ? '#EF7809' : warnSoft} stroke={tone} strokeWidth={3} />
              <text x={300} y={588} textAnchor="middle" fontSize={26} fontWeight={700} fill={c.good ? '#fff' : warn}>
                {c.result}
              </text>
            </g>
          );
        })}
      </svg>
    </Slide>
  );
};

const models: Entry[] = [
  {
    page: ModelsBreak,
    note: `Troisième partie : les modèles. Message à retenir : le plus gros n’est pas toujours le bon choix.`,
  },
  {
    page: Family,
    note: `Quatre familles, du plus léger au plus puissant : Haiku, Sonnet, Opus, Fable / Mythos. Un mot d'usage chacun : rapide, équilibré, profond, frontière.
Pour chacune, un exemple de tâche du TP. Haiku classe des tickets. Sonnet écrit une fonction ou résume une réunion. Opus refactore un module. Fable / Mythos est réservé aux chantiers les plus difficiles.
Les pastilles sont des repères relatifs, pas des mesures : plus on monte en intelligence, plus on perd en vitesse et on paie en coût. Pas de chiffres : ils changent trop vite.`,
  },
  {
    page: ClassicVsFrontier,
    note: `La page précédente disait où placer chaque modèle. Ici : ce qui change vraiment entre un modèle classique et un modèle frontière.
Un, la taille : beaucoup plus de paramètres et de données. Deux, le coût : énormément plus de calcul pour l'entraîner, puis pour répondre, donc plus lent et plus cher. Trois, les capacités : raisonnement long, planification, et certaines capacités n'apparaissent qu'à cette échelle. Quatre, la sécurité : plus un modèle est capable, plus il peut être détourné pour de mauvais usages, par exemple écrire du code malveillant ou tromper à grande échelle. Un modèle frontière subit donc beaucoup plus de tests de sécurité avant d'être publié. Un modèle classique a des risques déjà bien connus.
Les barres sont une illustration, pas des mesures.
Sur le nombre de paramètres : il n'existe pas de seuil officiel, et les paramètres des modèles de pointe ne sont en général pas publiés. Les textes de loi définissent un modèle frontière par le calcul utilisé pour l'entraîner : l'UE présume un risque systémique au-delà de 10 puissance 25 opérations de calcul (règlement européen sur l'IA, article 51), la Californie retient 10 puissance 26 (loi SB 53). Une opération de calcul, c'est une addition ou une multiplication sur des nombres décimaux. Ces seuils évoluent : à revérifier avant le cours.`,
  },
  {
    page: Triangle,
    note: `Coût, vitesse, intelligence : on en choisit deux. Intelligence et vitesse, ça coûte cher. Intelligence et petit prix, c'est plus lent. Vitesse et petit prix, c'est moins intelligent.
Les modèles se placent sur une ligne, du plus léger au plus frontière : le léger est près de la vitesse et du petit prix, le frontière près de l'intelligence. Plus on monte, plus on s'éloigne des deux autres sommets.
Demander à la salle quel sommet elle sacrifierait pour un chatbot de support.`,
  },
  {
    page: Radar,
    note: `Même idée que le triangle, mais modèle par modèle, sur six axes : raisonnement, code, autonomie sur les tâches longues, petit prix, vitesse, nuance de rédaction.
Haiku occupe le côté petit prix et vitesse. Fable / Mythos occupe le côté raisonnement, code, autonomie et nuance. Sonnet et Opus sont entre les deux.
Aucun profil n'est plus grand que les autres partout : c'est tout le sujet. Repères relatifs, pas des mesures : ils changent vite, à tester sur ses propres données.`,
  },
  {
    page: Diminishing,
    note: `Chaque ligne est un modèle, et la partie colorée est son usage : les tâches qu'il réussit bien. Plus le modèle est gros, plus son usage est large.
Prenez un besoin courant, la ligne en pointillés : classer, résumer, extraire, écrire une fonction. Il existe déjà des modèles dont c'est la fonction. Le plus petit suffit, et il est rapide et peu cher. Les autres donnent le même résultat, en plus lent et en plus cher.
L'idée à transmettre : au lieu de chercher plus puissant, regarder d'abord ce que les petits modèles, moins chers, savent déjà faire. Un très gros modèle, puissant mais lent et coûteux, ne se justifie que pour les tâches très difficiles.
Les barres sont une illustration, pas des mesures.`,
  },
  {
    page: Orchestration,
    note: `C'est la façon dont les skills FerrisLabs orchestrent le travail : diviser pour régner, et dépenser le gros modèle seulement sur le jugement.
L'orchestrateur est le gros modèle. Il lit la demande, écrit la spec, découpe le chantier, fige les contrats, relit chaque résultat et décide. Les autres exécutent à partir d'un briefing écrit.
Un éclaireur, petit modèle, cherche des faits en lecture seule. Un mécanicien, petit modèle aussi, fait les modifications mécaniques : renommer, formater, générer du boilerplate. Un implémenteur, modèle intermédiaire, écrit le code et les tests sur un contrat gelé. Un relecteur, modèle intermédiaire, relit avec une seule lentille à la fois.
Règles de routage : un petit modèle quand le résultat se vérifie d'un coup d'œil ou par une commande et qu'il n'y a aucune décision de conception. Un modèle intermédiaire pour écrire de la vraie logique. Le gros modèle pour tout ce où se tromper coûte cher. On ne délègue jamais une décision, et on ne monte pas de modèle pour réparer un mauvais briefing : on corrige le briefing. Si un sous-agent échoue deux fois, l'orchestrateur reprend la tâche.
Les tests et le lint sont des commandes, pas des agents. Rappel : ces skills ne sont que des instructions.`,
  },
  {
    page: Architecture,
    note: `Pourquoi poser l'architecture avant de laisser l'IA coder. Schéma en trois couches. En haut, la présentation : HTTP, CLI, ce qui reçoit les demandes. Au milieu, le domaine : les ports, c'est-à-dire les interfaces, et les services, c'est-à-dire les règles métier et les cas d'usage. En bas, l'infrastructure : les adapters, par exemple celui de Postgres, qui implémentent les ports. La présentation appelle le domaine, l'infrastructure implémente ses ports, et le domaine ne dépend de personne : il ne connaît ni la base ni le web. C'est l'architecture hexagonale.
Trois avantages. Un, la lecture est plus rapide : on sait où chercher, une règle métier est dans le domaine, une requête SQL dans l'adapter. Deux, la lecture coûte moins cher : l'IA charge peu de fichiers pour une modification, donc moins de tokens et moins de contexte pollué, ce qui rejoint ce qu'on verra sur la fenêtre de contexte. Trois, la méthode d'implémentation est récurrente : chaque nouvelle fonctionnalité suit le même geste, domaine, service, adapter, et l'IA le répète sans réinventer la structure à chaque fois.
Sans architecture posée, l'IA invente une organisation différente à chaque demande.`,
  },
  {
    page: TypedLanguages,
    note: `Le choix du langage change la boucle de l'IA. Avec un langage fortement typé et compilé, Rust ou Go, une erreur de type fait échouer le build. L'IA reçoit un message précis, corrige, relance : une boucle courte. Le compilateur Rust est particulièrement utile : il explique l'erreur et propose souvent le correctif, et les IA itèrent très bien dessus.
Avec TypeScript ou Python, les types sont déduits ou optionnels, et la détermination des types vient plus tard : plus d'erreurs passent jusqu'à l'exécution ou jusqu'à un test, et la boucle est plus longue. Nuance à donner : TypeScript en mode strict et Python avec un vérificateur de types réduisent l'écart, mais il faut les configurer et les lancer ; en Rust et Go, le compilateur impose le contrôle.
Ce n'est pas un jugement de valeur sur les langages : c'est un critère de choix quand c'est une IA qui écrit le code. Les tests restent indispensables dans tous les cas.`,
  },
];

// ─── J1 matin : 4 Contexte métier ─────────────────────────────────────────────
const ContextBreak: Page = () => (
  <Break n="4" title="Le contexte métier" sub="Ce que le modèle ne sait pas de votre entreprise." />
);

const Padlock = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -13 -4 V -14 A 13 13 0 0 1 13 -14 V -4" fill="none" stroke={warn} strokeWidth={5} strokeLinecap="round" />
    <rect x={-20} y={-4} width={40} height={32} rx={5} fill={warn} />
    <circle cx={0} cy={9} r={4} fill="#fff" />
    <rect x={-1.5} y={11} width={3} height={9} fill="#fff" />
  </g>
);

const SecretCard = ({ y, label, sub }: { y: number; label: string; sub: string }) => (
  <g>
    <rect x={822} y={y} width={874} height={96} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} strokeDasharray="14 8" />
    <Padlock x={884} y={y + 46} />
    <text x={940} y={y + 46} fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
      {label}
    </text>
    <text x={940} y={y + 78} fontSize={26} fill={muted}>
      {sub}
    </text>
  </g>
);

const KnowledgeGap: Page = () => (
  <Slide section="4 · Contexte métier">
    <Tag text="Le fossé" />
    <Title>Même le plus puissant ignore votre métier</Title>
    <svg width={1700} height={630} viewBox="0 0 1700 630" style={{ marginTop: 0 }}>
      <defs>
        <marker id="gap-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#EF7809" />
        </marker>
      </defs>
      <rect x={2} y={40} width={520} height={326} rx={6} fill={surface} stroke={border} strokeWidth={3} />
      <g transform="translate(262 108)" fill="none" stroke="#EF7809" strokeWidth={4} strokeLinecap="round">
        <rect x={-26} y={-26} width={52} height={52} rx={6} fill={accentSoft} />
        <rect x={-12} y={-12} width={24} height={24} rx={3} />
        {[-14, 0, 14].map((o) => (
          <g key={o}>
            <line x1={o} y1={-26} x2={o} y2={-38} />
            <line x1={o} y1={26} x2={o} y2={38} />
            <line x1={-26} y1={o} x2={-38} y2={o} />
            <line x1={26} y1={o} x2={38} y2={o} />
          </g>
        ))}
      </g>
      <text x={262} y={196} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
        Un modèle, même puissant
      </text>
      <text x={262} y={240} textAnchor="middle" fontFamily={mono} fontSize={26} fill={muted}>
        sait le public
      </text>
      <text x={262} y={292} textAnchor="middle" fontSize={27} fill="#1c1917">
        Go, SQL, HTTP, le droit,
      </text>
      <text x={262} y={326} textAnchor="middle" fontSize={27} fill="#1c1917">
        l’histoire, des millions de sites
      </text>
      <line x1={672} y1={30} x2={672} y2={376} stroke={warn} strokeWidth={6} strokeDasharray="14 10" />
      <circle cx={672} cy={150} r={46} fill="#fafaf9" stroke={warn} strokeWidth={4} />
      <g transform="translate(672 150)" fill="none" stroke={warn} strokeWidth={5} strokeLinecap="round">
        <path d="M -26 0 Q 0 -22 26 0 Q 0 22 -26 0 Z" />
        <circle r={6} />
        <line x1={-28} y1={-24} x2={28} y2={24} />
      </g>
      <rect x={560} y={218} width={224} height={40} rx={6} fill="#fafaf9" />
      <text x={672} y={246} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill={warn}>
        Il ne connaît pas
      </text>
      <SecretCard y={40} label="Vos clients" sub="fiches, historiques, échanges" />
      <SecretCard y={158} label="Vos procédures" sub="comment on fait, chez vous" />
      <SecretCard y={276} label="Vos règles de gestion" sub="quotas, délais, exceptions" />
      <path
        d="M 1259 380 C 1259 480 262 480 262 372"
        fill="none"
        stroke="#EF7809"
        strokeWidth={4}
        strokeDasharray="12 8"
        markerEnd="url(#gap-arrow)"
      />
      <text x={760} y={500} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill="#EF7809">
        Le contexte : ce qu’on lui donne
      </text>
      <rect x={2} y={520} width={1696} height={104} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={850} y={568} textAnchor="middle" fontSize={29} fontWeight={700} fill="#1c1917">
        Un modèle aussi puissant soit-il devient incapable, et se trompera,
      </text>
      <text x={850} y={606} textAnchor="middle" fontSize={29} fill="#1c1917">
        s’il s’agit de vos règles et de vos données métier.
      </text>
    </svg>
  </Slide>
);

const ContextFrame = ({ children }: { children?: ReactNode }) => (
  <div
    style={{
      width: '100%',
      height: 480,
      boxSizing: 'border-box',
      border: `4px dashed ${dim}`,
      borderRadius: 'var(--osd-radius)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

const EXAMPLES = [
  { kind: 'Règle', lines: ['3 emprunts actifs', 'maximum par étudiant'] },
  { kind: 'Règle', lines: ['Un retard bloque', 'tout nouvel emprunt'] },
  { kind: 'Règle', lines: ['Une seule prolongation,', 'pas si déjà en retard'] },
  { kind: 'Règle', lines: ['Un exemplaire abîmé', 'passe en maintenance'] },
  { kind: 'Donnée', lines: ['Le catalogue :', 'Raspberry Pi 5,', 'casque VR'] },
  { kind: 'Donnée', lines: ['Statut : disponible,', 'emprunté, maintenance,', 'perdu'] },
  { kind: 'Vocabulaire', lines: ['« Modèle » ≠', '« exemplaire »'] },
  { kind: 'Vocabulaire', lines: ['« En retard » =', 'après minuit,', 'heure de Paris'] },
] as const;

const KIND_STYLE = {
  Règle: { bg: '#EF7809', fg: '#fff', w: 112 },
  Donnée: { bg: '#1c1917', fg: '#fff', w: 128 },
  Vocabulaire: { bg: '#f6b07a', fg: '#1c1917', w: 200 },
} as const;

const EmptyContext: Page = () => (
  <Slide section="4 · Contexte métier">
    <Tag text="Exemples du TP" />
    <Title>Votre contexte métier</Title>
    <svg width={1700} height={540} viewBox="0 0 1700 540" style={{ marginTop: 0 }}>
      {EXAMPLES.map((ex, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = col * 430;
        const y = row * 270;
        const kind = KIND_STYLE[ex.kind];
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect x={2} y={2} width={406} height={250} rx={6} fill={surface} stroke={border} strokeWidth={3} />
            <rect x={26} y={26} width={kind.w} height={38} rx={19} fill={kind.bg} />
            <text x={26 + kind.w / 2} y={52} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={700} fill={kind.fg}>
              {ex.kind}
            </text>
            {ex.lines.map((line, j) => (
              <text key={line} x={26} y={116 + j * 42} fontSize={30} fill="#1c1917">
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  </Slide>
);

const DangerCard = ({ x, title, lines, children }: { x: number; title: string; lines: [string, string]; children: ReactNode }) => (
  <g transform={`translate(${x} 96)`}>
    <rect x={2} y={2} width={396} height={190} rx={6} fill={surface} stroke={border} strokeWidth={3} />
    <g transform="translate(58 56)" fill="none" stroke="#1c1917" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
    <text x={28} y={114} fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
      {title}
    </text>
    <text x={28} y={148} fontSize={24} fill={muted}>
      {lines[0]}
    </text>
    <text x={28} y={175} fontSize={24} fill={muted}>
      {lines[1]}
    </text>
  </g>
);

const Bubble = ({ x, w, text, hot }: { x: number; w: number; text: string; hot?: boolean }) => (
  <g>
    <rect x={x} y={452} width={w} height={70} rx={35} fill="#fff" stroke={hot ? warn : border} strokeWidth={3} />
    <text x={x + w / 2} y={497} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill={hot ? warn : '#1c1917'}>
      {text}
    </text>
  </g>
);

const ContextDanger: Page = () => (
  <Slide section="4 · Contexte métier">
    <Tag text="Le revers" />
    <Title>Trop de contexte, c’est dangereux</Title>
    <svg width={1700} height={640} viewBox="0 0 1700 640" style={{ marginTop: 0 }}>
      <defs>
        <linearGradient id="ctx-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fdecc8" />
          <stop offset="1" stopColor="#b42318" />
        </linearGradient>
        <marker id="ctx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      <text x={0} y={30} fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
        Plus le contexte se charge, plus les risques montent
      </text>
      <rect x={0} y={46} width={1700} height={26} rx={13} fill="url(#ctx-grad)" />
      <DangerCard x={0} title="Oublie" lines={['Des infos anciennes ou', 'au milieu disparaissent']}>
        <line x1={-28} y1={-14} x2={28} y2={-14} />
        <line x1={-28} y1={0} x2={10} y2={0} strokeOpacity={0.5} />
        <line x1={-28} y1={14} x2={-6} y2={14} strokeOpacity={0.2} />
      </DangerCard>
      <DangerCard x={433} title="Consignes ignorées" lines={['Vos instructions se noient', 'dans le volume']}>
        <rect x={-24} y={-24} width={48} height={48} rx={6} />
        <line x1={-12} y1={-12} x2={12} y2={12} />
        <line x1={12} y1={-12} x2={-12} y2={12} />
      </DangerCard>
      <DangerCard x={866} title="Coûteux" lines={['Toute la conversation est', 'renvoyée à chaque message']}>
        <circle r={26} />
        <text x={0} y={12} textAnchor="middle" fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917" stroke="none">
          €
        </text>
      </DangerCard>
      <DangerCard x={1299} title="Se perd" lines={['Des réponses longues,', 'qui partent dans tous les sens']}>
        <path d="M -30 16 C -18 -22 -4 30 8 -8 S 26 22 32 -14" />
      </DangerCard>
      <rect x={2} y={320} width={1696} height={304} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
      <text x={36} y={372} fontFamily={mono} fontSize={34} fontWeight={700} fill={warn}>
        Le plus dangereux : les contradictions
      </text>
      <text x={36} y={410} fontSize={26} fill={muted}>
        Plusieurs messages, un même sujet
      </text>
      <Bubble x={36} w={170} text="Non" />
      <path d="M 210 487 L 262 487" stroke="#1c1917" strokeWidth={3} markerEnd="url(#ctx-arrow)" />
      <Bubble x={268} w={170} text="Oui" />
      <path d="M 442 487 L 494 487" stroke="#1c1917" strokeWidth={3} markerEnd="url(#ctx-arrow)" />
      <Bubble x={500} w={170} text="Non" />
      <path d="M 674 487 L 726 487" stroke="#1c1917" strokeWidth={3} markerEnd="url(#ctx-arrow)" />
      <Bubble x={732} w={300} text="En fait, si…" />
      <path d="M 1036 487 L 1118 487" stroke={warn} strokeWidth={4} markerEnd="url(#ctx-arrow)" />
      <rect x={1124} y={440} width={540} height={94} rx={6} fill="#fff" stroke={warn} strokeWidth={3} />
      <text x={1394} y={480} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill={warn}>
        Laquelle est la bonne ?
      </text>
      <text x={1394} y={516} textAnchor="middle" fontSize={24} fill={muted}>
        il peut suivre n’importe laquelle
      </text>
      <text x={36} y={588} fontSize={26} fill="#1c1917">
        Le modèle ne sait pas quelle version est valable : il se trompe sans le dire.
      </text>
    </svg>
  </Slide>
);

const MemoryLayers: Page = () => (
  <Slide section="4 · Contexte métier">
    <Tag text="La mémoire" />
    <Title>Trois couches, trois durées de vie</Title>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginTop: 10 }}>
      <Box label="Fenêtre de contexte" sub="(oublie à la fin)" tone="muted" w={1300} h={150} />
      <Box label="Fichiers d’instructions" sub="(relus à chaque session)" w={1300} h={150} />
      <Box label="Mémoire persistante" sub="(conservée)" tone="accent" w={1300} h={150} />
    </div>
  </Slide>
);

const DataTable = ({
  x,
  rows,
  flags,
}: {
  x: number;
  rows: [string, string][];
  flags?: Record<number, string>;
}) => (
  <g transform={`translate(${x} 0)`}>
    <text x={24} y={118} fontFamily={mono} fontSize={22} fontWeight={700} fill={muted}>
      EXEMPLAIRE
    </text>
    <text x={330} y={118} fontFamily={mono} fontSize={22} fontWeight={700} fill={muted}>
      STATUT
    </text>
    <line x1={0} y1={132} x2={760} y2={132} stroke={border} strokeWidth={3} />
    {rows.map(([name, status], i) => {
      const y = 132 + i * 58;
      const flagged = flags?.[i];
      return (
        <g key={`${name}-${i}`}>
          <text x={24} y={y + 40} fontFamily={mono} fontSize={28} fill={flagged ? warn : '#1c1917'}>
            {name}
          </text>
          <text x={330} y={y + 40} fontFamily={mono} fontSize={28} fill={flagged ? warn : '#1c1917'}>
            {status}
          </text>
          {flagged ? (
            <g>
              <rect x={590} y={y + 11} width={150} height={36} rx={18} fill={warn} />
              <text x={665} y={y + 36} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={700} fill="#fff">
                {flagged}
              </text>
            </g>
          ) : null}
          <line x1={0} y1={y + 58} x2={760} y2={y + 58} stroke={border} strokeWidth={2} />
        </g>
      );
    })}
  </g>
);

const DataQuality: Page = () => (
  <Slide section="4 · Contexte métier">
    <Tag text="La donnée" />
    <Title>Donnée en désordre, réponse fausse</Title>
    <svg width={1700} height={560} viewBox="0 0 1700 560" style={{ marginTop: 0 }}>
      <defs>
        <marker id="dq-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      <rect x={2} y={2} width={756} height={64} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
      <text x={380} y={46} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill={warn}>
        Donnée sale
      </text>
      <DataTable
        x={0}
        rows={[
          ['Pi-005', 'dispo'],
          ['pi005', 'Disponible'],
          ['Pi-007', 'rendu ?'],
          ['Casque VR 2', 'HS'],
        ]}
        flags={{ 1: 'doublon', 2: 'ambigu' }}
      />
      <rect x={942} y={2} width={756} height={64} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={1320} y={46} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill="#EF7809">
        Donnée propre
      </text>
      <DataTable
        x={940}
        rows={[
          ['PI-005', 'available'],
          ['PI-007', 'borrowed'],
          ['VR-002', 'maintenance'],
        ]}
      />
      <text x={850} y={236} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700} fill="#1c1917">
        Nettoyer
      </text>
      <text x={850} y={264} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700} fill="#1c1917">
        avant
      </text>
      <path d="M 774 290 L 926 290" fill="none" stroke="#1c1917" strokeWidth={3} markerEnd="url(#dq-arrow)" />
      <text x={0} y={406} fontSize={26} fill={muted}>
        « Combien de Raspberry Pi disponibles ? »
      </text>
      <text x={940} y={406} fontSize={26} fill={muted}>
        « Combien de Raspberry Pi disponibles ? »
      </text>
      <rect x={2} y={426} width={756} height={120} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
      <text x={30} y={480} fontFamily={mono} fontSize={34} fontWeight={700} fill={warn}>
        2 ? 1 ? Il devine.
      </text>
      <text x={30} y={520} fontSize={26} fill={muted}>
        Un doublon, un statut ambigu : sa réponse est fausse.
      </text>
      <rect x={942} y={426} width={756} height={120} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={970} y={480} fontFamily={mono} fontSize={34} fontWeight={700} fill="#EF7809">
        1 : PI-005
      </text>
      <text x={970} y={520} fontSize={26} fill={muted}>
        Une donnée claire : sa réponse est fiable.
      </text>
    </svg>
  </Slide>
);

const context: Entry[] = [
  {
    page: ContextBreak,
    note: `Quatrième partie : le contexte métier. Le modèle est fort en général, mais il ignore tout de votre entreprise.
On regarde ce qu’il ne connaît pas, comment on le lui donne, et pourquoi la qualité de la donnée compte.`,
  },
  {
    page: KnowledgeGap,
    note: `Deux cercles. À gauche, ce que le modèle a appris : du public, comme Go, SQL, HTTP, le droit, l'histoire. À droite, vos règles et vos données métier : vos clients, vos procédures, vos règles de gestion. Ce n'est pas dans son entraînement.
Le point à faire passer : un modèle aussi puissant soit-il devient incapable, et se trompera, dès qu'il s'agit de vos règles et de vos données métier. La puissance ne remplace pas une information qu'il n'a jamais vue.
La parade, c'est la flèche au milieu : le contexte, ce qu'on lui donne dans la conversation. On y revient avec la mémoire et la qualité des données.
Pour le TP : les règles de prêt de matériel sont exactement ce que le modèle ne connaît pas.`,
  },
  {
    page: EmptyContext,
    note: `Votre contexte métier, c'est ce que le modèle ne peut pas deviner. Huit exemples tirés du TP, le prêt de matériel, en trois familles.
Quatre règles : trois emprunts actifs maximum par étudiant, un retard bloque tout nouvel emprunt, une seule prolongation et pas si l'emprunt est déjà en retard, un exemplaire abîmé passe en maintenance. Deux données : le catalogue, par exemple un Raspberry Pi 5 ou un casque VR, et le statut d'un exemplaire. Deux mots de vocabulaire : un modèle de matériel n'est pas un exemplaire, et « en retard » veut dire après minuit heure de Paris.
Rien de tout ça n'est dans l'entraînement du modèle. Demander à la salle : et chez vous, qu'est-ce qui irait dans ces trois familles ? On le remplit ensemble en clôture du jour 2.`,
  },
  {
    page: ContextDanger,
    note: `Attention : plus de contexte n'est pas toujours mieux. Plus la fenêtre se remplit, plus les risques montent.
Un, l'oubli : des informations anciennes, ou au milieu d'un long contexte, finissent par être mal prises en compte. Deux, les consignes ignorées : vos instructions se noient dans le volume. Trois, le coût : un modèle ne garde pas la conversation en mémoire, tout l'historique est renvoyé à chaque message, donc plus la conversation est longue, plus chaque message coûte cher. Un cache de prompt réduit la facture, mais ne change pas le principe. Quatre, il se perd : des réponses longues, qui partent dans tous les sens.
Le plus dangereux, ce sont les contradictions. Sur un même sujet, vous dites non, puis oui, puis non, puis en fait si. Le modèle ne sait pas quelle version est valable : il peut suivre n'importe laquelle, et il ne vous prévient pas.
Réflexe : ouvrir une nouvelle conversation pour un nouveau sujet, et repartir d'un résumé propre quand elle s'est trop chargée.`,
  },
  {
    page: MemoryLayers,
    note: `Trois couches. La fenêtre de contexte : tout ce qui est dans la conversation, oublié à la fin.
Les fichiers d’instructions : relus à chaque session, c’est là qu’on met les règles du métier. La mémoire persistante : conservée d’une session à l’autre.
Question : dans quelle couche rangeriez-vous votre charte de nommage ?`,
  },
  {
    page: DataQuality,
    note: `Même exemple, du matériel prêté. À gauche, une donnée sale : le même Raspberry Pi écrit « Pi-005 » et « pi005 » (un doublon), et un statut « rendu ? » dont personne ne sait ce qu'il veut dire. À droite, la même donnée propre : un identifiant unique, un statut dans une liste fermée.
On pose la même question aux deux : combien de Raspberry Pi sont disponibles ? Avec la donnée sale, le modèle hésite ou devine : deux ? un ? Avec la donnée propre, il répond un, PI-005, avec certitude.
Le message : un LLM ne corrige pas vos données, il les lit telles qu'elles sont et les interprète, parfois de travers, avec aplomb. Le nettoyage reste un travail humain, fait avant. Dans le projet Go, c'est le rôle d'une liste fermée : available, borrowed, maintenance, lost.`,
  },
];

// ─── J1 matin : 5 Hype ───────────────────────────────────────────────────
const HypeBreak: Page = () => (
  <Break n="5" title="Les dérives de la hype" sub="Quand l’IA n’est pas la bonne réponse." />
);

const DriftCard = ({ x, title, sub }: { x: number; title: string; sub: string }) => (
  <g transform={`translate(${x} 100)`}>
    <rect x={2} y={2} width={544} height={140} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
    <circle cx={60} cy={72} r={28} fill={warn} />
    <g stroke="#fff" strokeWidth={6} strokeLinecap="round">
      <line x1={49} y1={61} x2={71} y2={83} />
      <line x1={71} y1={61} x2={49} y2={83} />
    </g>
    <text x={110} y={72} fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
      {title}
    </text>
    <text x={110} y={110} fontSize={25} fill={muted}>
      {sub}
    </text>
  </g>
);

const HypeNonsense: Page = () => (
  <Slide section="5 · Dérives">
    <Tag text="Le constat" />
    <svg width={1700} height={640} viewBox="0 0 1700 640" style={{ marginTop: 0 }}>
      <text x={850} y={52} textAnchor="middle" fontFamily={mono} fontSize={50} fontWeight={800} fill="#1c1917">
        « Mettre de l’IA pour en mettre n’a aucun sens »
      </text>
      <DriftCard x={0} title="Un chatbot sur tout" sub="alors qu’un formulaire suffit" />
      <DriftCard x={576} title="Un LLM pour un if" sub="une règle simple, déjà codable" />
      <DriftCard x={1152} title="Un agent sans objectif" sub="il agit, mais pour quoi faire ?" />
      <text x={0} y={300} fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
        Avant d’ajouter de l’IA, il faut :
      </text>
      <rect x={2} y={326} width={826} height={190} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <g transform="translate(90 421)" fill="none" stroke="#EF7809" strokeWidth={5} strokeLinecap="round">
        <circle cx={-44} cy={0} r={13} />
        <circle cx={0} cy={0} r={13} />
        <circle cx={44} cy={0} r={13} />
        <line x1={-31} y1={0} x2={-13} y2={0} />
        <line x1={13} y1={0} x2={31} y2={0} />
      </g>
      <text x={170} y={398} fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
        Un process clair
      </text>
      <text x={170} y={440} fontSize={27} fill="#1c1917">
        Des étapes connues, des règles
      </text>
      <text x={170} y={474} fontSize={27} fill="#1c1917">
        écrites, un responsable.
      </text>
      <rect x={872} y={326} width={826} height={190} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <g transform="translate(960 421)" fill="none" stroke="#EF7809" strokeWidth={5} strokeLinecap="round">
        <rect x={-34} y={-28} width={68} height={56} rx={4} />
        <line x1={-34} y1={-9} x2={34} y2={-9} />
        <line x1={-34} y1={10} x2={34} y2={10} />
        <line x1={-11} y1={-28} x2={-11} y2={28} />
      </g>
      <text x={1040} y={398} fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
        Une donnée structurée et propre
      </text>
      <text x={1040} y={440} fontSize={27} fill="#1c1917">
        Des champs fixes,
      </text>
      <text x={1040} y={474} fontSize={27} fill="#1c1917">
        sans doublon, une source unique.
      </text>
      <rect x={2} y={544} width={1696} height={88} rx={6} fill="#1c1917" />
      <text x={850} y={596} textAnchor="middle" fontSize={30} fontWeight={700} fill="#fff">
        L’IA amplifie l’existant : process flou ou donnée sale, elle amplifie le désordre.
      </text>
    </svg>
  </Slide>
);

const REQUEST_PARTS = [
  { label: 'Consignes', w: 190, fill: '#fdecc8' },
  { label: 'Documents fournis', w: 330, fill: '#fbd9bd' },
  { label: 'Historique de la conversation', w: 470, fill: '#f8c39a' },
  { label: 'Question', w: 180, fill: '#f6b07a' },
];

const CostCard = ({ x, n, title, lines }: { x: number; n: string; title: string; lines: [string, string] }) => (
  <g transform={`translate(${x} 268)`}>
    <rect x={2} y={2} width={544} height={170} rx={6} fill={surface} stroke={border} strokeWidth={3} />
    <circle cx={50} cy={52} r={24} fill="#EF7809" />
    <text x={50} y={61} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#fff">
      {n}
    </text>
    <text x={92} y={61} fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
      {title}
    </text>
    <text x={28} y={116} fontSize={26} fill="#1c1917">
      {lines[0]}
    </text>
    <text x={28} y={150} fontSize={26} fill="#1c1917">
      {lines[1]}
    </text>
  </g>
);

const CostBars: Page = () => {
  let cursor = 0;
  const parts = REQUEST_PARTS.map((part) => {
    const x = cursor;
    cursor += part.w;
    return { ...part, x };
  });
  const inputEnd = cursor;
  const outX = inputEnd + 80;
  return (
    <Slide section="5 · Dérives">
      <Tag text="Le coût" />
      <Title>Un appel LLM n’est jamais gratuit</Title>
      <svg width={1700} height={650} viewBox="0 0 1700 650" style={{ marginTop: 0 }}>
        <defs>
          <marker id="cost-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
          </marker>
        </defs>
        <g transform="translate(0 16)">
        <text x={inputEnd / 2} y={26} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#1c1917">
          Entrée : les tokens lus, payés
        </text>
        <path d={`M 0 46 V 36 H ${inputEnd} V 46`} fill="none" stroke="#1c1917" strokeWidth={3} />
        <text x={outX + 160} y={18} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#EF7809">
          Sortie : les tokens écrits,
        </text>
        <text x={outX + 160} y={48} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#EF7809">
          payés plus cher
        </text>
        <path d={`M ${outX} 66 V 58 H ${outX + 330} V 66`} fill="none" stroke="#EF7809" strokeWidth={3} />
        {parts.map((part) => (
          <g key={part.label}>
            <rect x={part.x + 2} y={78} width={part.w - 4} height={86} rx={6} fill={part.fill} stroke="#fff" strokeWidth={2} />
            <text x={part.x + part.w / 2} y={128} textAnchor="middle" fontSize={24} fontWeight={700} fill="#1c1917">
              {part.label}
            </text>
          </g>
        ))}
        <path d={`M ${inputEnd + 8} 121 L ${outX - 8} 121`} fill="none" stroke="#1c1917" strokeWidth={3} markerEnd="url(#cost-arrow)" />
        <rect x={outX} y={78} width={330} height={86} rx={6} fill="#EF7809" />
        <text x={outX + 165} y={128} textAnchor="middle" fontSize={26} fontWeight={700} fill="#fff">
          Réponse
        </text>
        <text x={0} y={216} fontFamily={mono} fontSize={26} fill={muted}>
          Un seul appel au modèle. Le coût suit la taille de chaque bloc.
        </text>
        <CostCard x={0} n="1" title="Tout est renvoyé" lines={['À chaque message, l’historique', 'complet repart : le coût grossit.']} />
        <CostCard x={576} n="2" title="Lu + écrit = payé" lines={['On paie ce que le modèle lit', 'et ce qu’il écrit, au token.']} />
        <CostCard x={1152} n="3" title="Écrit token par token" lines={['Plus la réponse est longue,', 'plus l’attente est longue.']} />
        <rect x={2} y={472} width={1696} height={160} rx={6} fill="#1c1917" />
        <text x={850} y={534} textAnchor="middle" fontSize={32} fontWeight={700} fill="#fff">
          Une règle, elle, ne consomme aucun token.
        </text>
        <text x={850} y={590} textAnchor="middle" fontSize={32} fontWeight={700} fill="#EF7809">
          Si une règle suffit, on écrit la règle.
        </text>
        </g>
      </svg>
    </Slide>
  );
};

const DecisionTree: Page = () => (
  <Slide section="5 · Dérives">
    <Tag text="La décision" />
    <Title>Faut-il de l’IA ?</Title>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 200, marginTop: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Box label="La règle est-elle écrivable ?" w={640} h={110} />
        <Arrow dir="right" label="oui" />
        <Box label="Code" w={300} h={110} />
      </div>
      <div style={{ width: 640, display: 'flex', justifyContent: 'center' }}>
        <Arrow dir="down" label="non" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Box label="Une erreur est-elle tolérable ?" w={640} h={110} />
        <Arrow dir="right" label="oui" />
        <Box label="IA + contrôle" w={300} h={110} tone="accent" />
      </div>
      <div style={{ width: 640, display: 'flex', justifyContent: 'center' }}>
        <Arrow dir="down" label="non" />
      </div>
      <div style={{ width: 640, display: 'flex', justifyContent: 'center' }}>
        <Box label="Humain" w={300} h={110} />
      </div>
    </div>
  </Slide>
);

const TICKET_STEPS = [
  { lines: ['Ticket reçu'], kind: 'Code', desc: ['Le client écrit', 'au support'] },
  { lines: ['Contexte', 'du client'], kind: 'IA · recherche', desc: ['Contrat, historique,', 'échanges passés'] },
  { lines: ['Documents', 'liés'], kind: 'IA · recherche', desc: ['Articles et procédures', 'liés à la demande'] },
  { lines: ['Brouillon', 'de réponse'], kind: 'IA · rédaction', desc: ['Rédigé à partir de', 'ce qu’on a retrouvé'] },
  { lines: ['Humain', 'valide'], kind: 'Humain', desc: ['Relecture', 'avant envoi'] },
] as const;

const TICKET_KIND = {
  Code: { bg: border, fg: '#1c1917', w: 100 },
  'IA · recherche': { bg: '#EF7809', fg: '#fff', w: 232 },
  'IA · rédaction': { bg: '#EF7809', fg: '#fff', w: 232 },
  Humain: { bg: '#1c1917', fg: '#fff', w: 130 },
} as const;

const ExampleTicket: Page = () => (
  <Slide section="5 · Dérives">
    <Tag text="Exemple 1" />
    <Title>Répondre à un ticket client</Title>
    <svg width={1700} height={600} viewBox="0 0 1700 600" style={{ marginTop: 0 }}>
      <defs>
        <marker id="ticket-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      {TICKET_STEPS.map((step, i) => {
        const x = i * 350;
        const kind = TICKET_KIND[step.kind];
        const isAi = step.kind.startsWith('IA');
        return (
          <g key={i} transform={`translate(${x} 10)`}>
            <rect
              x={2}
              y={2}
              width={296}
              height={136}
              rx={6}
              fill={isAi ? accentSoft : surface}
              stroke={isAi ? '#EF7809' : border}
              strokeWidth={3}
            />
            <text x={20} y={38} fontFamily={mono} fontSize={22} fontWeight={700} fill={muted}>
              {i + 1}
            </text>
            {step.lines.map((line, j) => (
              <text
                key={line}
                x={150}
                y={(step.lines.length === 1 ? 84 : 78) + j * 36}
                textAnchor="middle"
                fontFamily={mono}
                fontSize={28}
                fontWeight={700}
                fill="#1c1917"
              >
                {line}
              </text>
            ))}
            <rect x={150 - kind.w / 2} y={160} width={kind.w} height={40} rx={20} fill={kind.bg} />
            <text x={150} y={188} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={700} fill={kind.fg}>
              {step.kind}
            </text>
            {step.desc.map((line, j) => (
              <text key={line} x={150} y={236 + j * 30} textAnchor="middle" fontSize={25} fill={muted}>
                {line}
              </text>
            ))}
            {i < TICKET_STEPS.length - 1 ? (
              <path d="M 302 72 L 346 72" stroke="#1c1917" strokeWidth={3} markerEnd="url(#ticket-arrow)" />
            ) : null}
          </g>
        );
      })}
      <path d="M 352 316 V 328 H 952 V 316" fill="none" stroke="#EF7809" strokeWidth={3} />
      <text x={652} y={364} textAnchor="middle" fontSize={26} fontWeight={700} fill="#1c1917">
        Base vectorielle : propre et structurée
      </text>
      <path d="M 1052 316 V 328 H 1352 V 316" fill="none" stroke="#EF7809" strokeWidth={3} />
      <text x={1202} y={364} textAnchor="middle" fontSize={26} fontWeight={700} fill="#EF7809">
        Le LLM rédige
      </text>
      <rect x={2} y={412} width={1696} height={170} rx={6} fill="#1c1917" />
      <text x={850} y={480} textAnchor="middle" fontSize={38} fontWeight={700} fill="#fff">
        L’IA cherche, puis rédige.
      </text>
      <text x={850} y={538} textAnchor="middle" fontSize={30} fontWeight={700} fill="#EF7809">
        Le reste : du code, et un humain.
      </text>
    </svg>
  </Slide>
);

const ForkArrows = () => (
  <svg width={90} height={240} viewBox="0 0 90 240" style={{ flexShrink: 0 }}>
    <path d="M0 120 H45 M45 50 V190 M45 50 H74 M45 190 H74" fill="none" stroke="var(--osd-text)" strokeWidth={3} />
    <polygon points="90,50 72,40 72,60" fill="var(--osd-text)" />
    <polygon points="90,190 72,180 72,200" fill="var(--osd-text)" />
  </svg>
);

const ExampleMeeting: Page = () => (
  <Slide section="5 · Dérives">
    <Tag text="Exemple 2" />
    <Title>Exploiter une réunion</Title>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
      <Box label="Audio" w={230} />
      <Arrow dir="right" />
      <Box label="Diarisation" w={230} />
      <Arrow dir="right" />
      <Box label="Résumé" w={230} tone="accent" />
      <ForkArrows />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-start' }}>
        <Box label="Opportunités commerciales" w={480} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Box label="Actions" w={220} />
          <Arrow dir="right" />
          <Box label="Ticket / roadmap" w={360} />
        </div>
      </div>
    </div>
  </Slide>
);

const hype: Entry[] = [
  {
    page: HypeBreak,
    note: `Cinquième partie : les dérives de la hype. Après les bases, on regarde quand l’IA n’est pas la bonne réponse.
On finit par deux exemples concrets où elle l’est.`,
  },
  {
    page: HypeNonsense,
    note: `Lire la citation. Mettre de l'IA pour en mettre n'a aucun sens.
Trois dérives courantes : un chatbot sur tout, alors qu'un formulaire suffit ; un LLM pour remplacer un simple if, une règle déjà codable ; un agent sans objectif, qui agit sans savoir pourquoi. Demander à la salle si elle en a déjà croisé une.
Le point à faire passer : mettre de l'IA dans un process suppose que ce process soit clair, avec des étapes connues, des règles écrites et un responsable, et que la donnée soit structurée et propre, avec des champs fixes, sans doublon, une source unique. Sans ça, l'IA n'apporte rien : elle amplifie l'existant, donc le désordre.
C'est pour ça que les deux exemples qui suivent, le ticket de support et le compte rendu de réunion, ne marchent que parce que leur process est clair et leurs données bien rangées.`,
  },
  {
    page: CostBars,
    note: `Voilà ce qu'on paie vraiment quand on appelle un LLM. Un appel, c'est un bloc de tokens envoyés au modèle : les consignes, les documents qu'on lui fournit, tout l'historique de la conversation, et la question. On paie ces tokens lus. Puis le modèle écrit sa réponse, et on paie aussi ces tokens écrits, en général plus cher que les tokens lus.
Trois conséquences. Un : le modèle ne garde pas la conversation en mémoire, tout l'historique est renvoyé à chaque message, donc le coût grossit au fil de l'échange. Deux : on paie au volume, ce qui est lu et ce qui est écrit. Trois : la réponse s'écrit token par token, donc plus elle est longue, plus l'attente est longue. Un cache de prompt réduit la facture, mais ne change pas ce principe.
Une règle, elle, ne consomme aucun token : elle s'exécute instantanément, pour presque rien, et donne toujours le même résultat. Si une règle suffit, on écrit la règle.
Aucun chiffre ici : les prix changent trop vite, et varient selon le modèle.`,
  },
  {
    page: DecisionTree,
    note: `Deux questions. La règle est-elle écrivable ? Alors c’est du code.
Sinon : une erreur est-elle tolérable ? Si oui, IA avec un contrôle. Si non, un humain.
Reprendre un cas de la salle et le faire passer dans l’arbre.`,
  },
  {
    page: ExampleTicket,
    note: `Premier exemple : répondre à un ticket client. Cinq étapes, dont trois reposent sur de l'IA.
Un, du code : le ticket arrive. Deux et trois, de l'IA aussi : on cherche dans la base de connaissance, d'abord le contexte du client, son contrat, son historique, puis les articles et procédures liés à la demande. C'est une recherche dans une base vectorielle : le texte de la demande et les documents sont transformés en vecteurs par un modèle, des embeddings, et on retrouve ce qui a le même sens. Ce n'est pas un LLM qui écrit, mais c'est bien de l'IA. Et ça ne marche que si la base est propre et structurée, c'est le prérequis vu juste avant. Quatre, le LLM rédige un brouillon de réponse, à partir de tout ce qu'on a retrouvé. Cinq, un humain relit et valide avant l'envoi.
Message : l'IA cherche, puis rédige. Le reste est du code et un humain. On ne met pas de l'IA partout, on la met aux deux endroits où elle apporte quelque chose.`,
  },
  {
    page: ExampleMeeting,
    note: `Deuxième exemple : une réunion enregistrée. L’audio passe par la diarisation, c’est-à-dire qui parle, puis un résumé.
Deux sorties : les opportunités commerciales, et les actions.
Les actions alimentent un ticket ou la roadmap. Demander où il faut un contrôle humain.`,
  },
];

// ─── J1 matin : 6 MCP ────────────────────────────────────────────────────
const McpBreak: Page = () => (
  <Break n="6" title="MCP contre un simple appel d’API" sub="Ce que le protocole change, et ce qu’il laisse à votre charge." />
);

const SvgNode = ({ x, y, w, h, label, sub, dashed, tone = 'neutral' }: { x: number; y: number; w: number; h: number; label: string; sub?: string; dashed?: boolean; tone?: Tone }) => {
  const t = toneStyle[tone];
  const subLines = sub ? sub.split('\n') : [];
  const blockH = subLines.length ? 36 + subLines.length * 28 : 0;
  const top = y + (h - blockH) / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={t.bg === 'transparent' ? 'none' : t.bg} stroke={t.line} strokeWidth={3} strokeDasharray={dashed ? '10 7' : undefined} />
      <text x={x + w / 2} y={subLines.length ? top + 15 : y + h / 2} textAnchor="middle" dominantBaseline="central" fontFamily={mono} fontSize={24} fontWeight={700} fill="var(--osd-text)">
        {label}
      </text>
      {subLines.map((line, i) => (
        <text key={i} x={x + w / 2} y={top + 50 + i * 28} textAnchor="middle" dominantBaseline="central" fontSize={22} fill={muted}>
          {line}
        </text>
      ))}
    </g>
  );
};

const Panel = ({ caption, sub, children }: { caption: string; sub: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 800 }}>
    <svg width={800} height={380} viewBox="0 0 800 380">
      {children}
    </svg>
    <div style={{ fontFamily: mono, fontSize: 36, fontWeight: 800, color: 'var(--osd-accent)' }}>{caption}</div>
    <div style={{ fontSize: 26, color: muted }}>{sub}</div>
  </div>
);

const MCP_CLIENTS = [
  { name: 'Chatbot', way: 'REST + clé API', stroke: '#1c1917', dash: undefined },
  { name: 'Assistant code', way: 'SDK maison', stroke: '#EF7809', dash: '12 7' },
  { name: 'Agent interne', way: 'GraphQL', stroke: '#57534e', dash: '2 7' },
];
const MCP_SERVICES = ['Catalogue', 'Emprunts', 'Utilisateurs'];
const ly = [14, 142, 270];

const ApiVsMcp: Page = () => (
  <Slide section="6 · MCP">
    <Tag text="Le problème" />
    <Title>Pourquoi pas juste une API ?</Title>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10 }}>
      <Panel caption="N × M intégrations" sub="chaque client appelle chaque service à sa façon">
        {MCP_CLIENTS.flatMap((client, i) =>
          ly.map((sy, j) => (
            <line
              key={`${i}-${j}`}
              x1={264}
              y1={ly[i] + 48}
              x2={556}
              y2={sy + 48}
              stroke={client.stroke}
              strokeWidth={3}
              strokeDasharray={client.dash}
            />
          )),
        )}
        {MCP_CLIENTS.map((client, i) => (
          <SvgNode key={client.name} x={4} y={ly[i]} w={260} h={96} label={client.name} sub={client.way} />
        ))}
        {MCP_SERVICES.map((name, j) => (
          <SvgNode key={name} x={556} y={ly[j]} w={240} h={96} label={name} />
        ))}
      </Panel>
      <Panel caption="N + M" sub="une fonction liste directement chaque action possible">
        {ly.map((y) => (
          <g key={y}>
            <line x1={264} y1={y + 48} x2={300} y2={190} stroke="var(--osd-text)" strokeWidth={3} />
            <line x1={520} y1={190} x2={556} y2={y + 48} stroke="var(--osd-text)" strokeWidth={3} />
          </g>
        ))}
        {MCP_CLIENTS.map((client, i) => (
          <SvgNode key={client.name} x={4} y={ly[i]} w={260} h={96} label={client.name} sub="parle MCP" />
        ))}
        <SvgNode x={300} y={102} w={220} h={176} label="Protocole MCP" sub="tools/list()" tone="accent" dashed />
        {MCP_SERVICES.map((name, j) => (
          <SvgNode key={name} x={556} y={ly[j]} w={240} h={96} label={name} />
        ))}
      </Panel>
    </div>
  </Slide>
);

const MCP_EXPOSED = [
  { x: 10, title: 'Outils', sub: 'des actions que l’IA peut lancer', items: ['emprunter(item)', 'prolonger(emprunt)'] },
  { x: 580, title: 'Ressources', sub: 'des données que l’IA peut lire', items: ['le catalogue', 'mes emprunts'] },
  { x: 1150, title: 'Prompts', sub: 'des demandes toutes prêtes', items: ['emprunts en retard ?'] },
];

const McpAnatomy: Page = () => (
  <Slide section="6 · MCP">
    <Tag text="Anatomie" />
    <Title>Ce que le serveur MCP expose à l’IA</Title>
    <svg width={1700} height={640} viewBox="0 0 1700 640" style={{ marginTop: 0 }}>
      <defs>
        <marker id="mcp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
        <marker id="mcp-arrow-o" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#EF7809" />
        </marker>
      </defs>
      <rect x={2} y={2} width={440} height={136} rx={6} fill={surface} stroke={border} strokeWidth={3} />
      <text x={222} y={62} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
        Application IA
      </text>
      <text x={222} y={100} textAnchor="middle" fontSize={24} fill={muted}>
        le client MCP
      </text>
      <rect x={630} y={2} width={440} height={136} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={850} y={62} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
        Serveur MCP
      </text>
      <text x={850} y={100} textAnchor="middle" fontSize={24} fill={muted}>
        décrit et expose
      </text>
      <rect x={1258} y={2} width={440} height={136} rx={6} fill={surface} stroke={border} strokeWidth={3} />
      <text x={1478} y={62} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
        Votre service
      </text>
      <text x={1478} y={100} textAnchor="middle" fontSize={24} fill={muted}>
        l’API Go du TP
      </text>
      <path d="M 446 54 L 626 54" stroke="#1c1917" strokeWidth={3} markerEnd="url(#mcp-arrow)" />
      <text x={536} y={40} textAnchor="middle" fontFamily={mono} fontSize={22} fill={muted}>
        demande
      </text>
      <path d="M 626 98 L 446 98" stroke="#1c1917" strokeWidth={3} markerEnd="url(#mcp-arrow)" />
      <text x={536} y={128} textAnchor="middle" fontFamily={mono} fontSize={22} fill={muted}>
        répond
      </text>
      <path d="M 1074 54 L 1254 54" stroke="#1c1917" strokeWidth={3} markerEnd="url(#mcp-arrow)" />
      <text x={1164} y={40} textAnchor="middle" fontFamily={mono} fontSize={22} fill={muted}>
        appelle l’API
      </text>
      <path d="M 1254 98 L 1074 98" stroke="#1c1917" strokeWidth={3} markerEnd="url(#mcp-arrow)" />
      <text x={1164} y={128} textAnchor="middle" fontFamily={mono} fontSize={22} fill={muted}>
        résultat
      </text>
      <rect x={22} y={162} width={400} height={54} rx={27} fill="#fff" stroke={border} strokeWidth={3} />
      <text x={222} y={198} textAnchor="middle" fontSize={26} fill="#1c1917">
        « Prolonge mon emprunt »
      </text>
      {MCP_EXPOSED.map((card) => (
        <path
          key={card.title}
          d={`M 850 142 C 850 214 ${card.x + 270} 190 ${card.x + 270} 262`}
          fill="none"
          stroke="#EF7809"
          strokeWidth={3}
          markerEnd="url(#mcp-arrow-o)"
        />
      ))}
      {MCP_EXPOSED.map((card) => (
        <g key={card.title} transform={`translate(${card.x} 270)`}>
          <rect x={2} y={2} width={536} height={250} rx={6} fill={surface} stroke={border} strokeWidth={3} />
          <text x={28} y={56} fontFamily={mono} fontSize={34} fontWeight={700} fill="#EF7809">
            {card.title}
          </text>
          <text x={28} y={94} fontSize={26} fill={muted}>
            {card.sub}
          </text>
          {card.items.map((item, i) => {
            const w = Math.round(item.length * 14.6 + 36);
            return (
              <g key={item}>
                <rect x={28} y={120 + i * 58} width={w} height={46} rx={6} fill="#fff" stroke={border} strokeWidth={3} />
                <text x={28 + w / 2} y={152 + i * 58} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700} fill="#1c1917">
                  {item}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <text x={850} y={612} textAnchor="middle" fontSize={29} fontWeight={700} fill="#1c1917">
        Le serveur décrit tout ça à l’IA : elle sait quoi demander, et comment.
      </text>
    </svg>
  </Slide>
);

const CALL_LANES = [
  { name: 'Utilisateur', sub: 'vous' },
  { name: 'Application IA', sub: 'le client MCP' },
  { name: 'Modèle (LLM)', sub: 'qui réfléchit' },
  { name: 'Serveur MCP', sub: 'devant l’API Go' },
];

const CALL_STEPS = [
  { from: 0, to: 1, label: '« Prolonge mon emprunt »' },
  { from: 1, to: 3, label: 'Quels outils as-tu ?' },
  { from: 3, to: 1, label: 'emprunter, prolonger, lister…', dashed: true },
  { from: 1, to: 2, label: 'Question + liste des outils' },
  { from: 2, to: 1, label: 'Je veux : prolonger(emprunt)', dashed: true },
  { from: 1, to: 3, label: 'prolonger(emprunt)', hot: true },
  { from: 3, to: 1, label: 'Résultat : prolongé', dashed: true, hot: true },
  { from: 1, to: 0, label: '« C’est fait »', dashed: true },
] as const;

const McpCall: Page = () => {
  const laneX = (i: number) => 170 + i * 440;
  const rowY = (i: number) => 134 + i * 62;
  return (
    <Slide section="6 · MCP">
      <Tag text="Un appel, pas à pas" />
      <Title>De la question à la réponse</Title>
      <svg width={1700} height={640} viewBox="0 0 1700 640" style={{ marginTop: 0 }}>
        <defs>
          {(['n', 'h'] as const).map((k) => (
            <marker key={k} id={`call-${k}`} markerWidth={12} markerHeight={12} refX={10} refY={6} orient="auto">
              <polygon points="0,0 12,6 0,12" fill={k === 'h' ? '#EF7809' : '#1c1917'} />
            </marker>
          ))}
        </defs>
        {CALL_LANES.map((lane, i) => (
          <g key={lane.name}>
            <line x1={laneX(i)} y1={84} x2={laneX(i)} y2={600} stroke={dim} strokeWidth={2} strokeDasharray="8 6" />
            <rect x={laneX(i) - 150} y={2} width={300} height={80} rx={6} fill={i === 3 ? accentSoft : surface} stroke={i === 3 ? '#EF7809' : border} strokeWidth={3} />
            <text x={laneX(i)} y={38} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#1c1917">
              {lane.name}
            </text>
            <text x={laneX(i)} y={68} textAnchor="middle" fontSize={22} fill={muted}>
              {lane.sub}
            </text>
          </g>
        ))}
        {CALL_STEPS.map((step, i) => {
          const hot = 'hot' in step && step.hot;
          const dashed = 'dashed' in step && step.dashed;
          const y = rowY(i);
          const x1 = laneX(step.from);
          const x2 = laneX(step.to);
          const dir = x2 > x1 ? 1 : -1;
          return (
            <g key={i}>
              <line
                x1={x1 + dir * 4}
                y1={y}
                x2={x2 - dir * 6}
                y2={y}
                stroke={hot ? '#EF7809' : '#1c1917'}
                strokeWidth={3.5}
                strokeDasharray={dashed ? '10 7' : undefined}
                markerEnd={`url(#call-${hot ? 'h' : 'n'})`}
              />
              <text
                x={(x1 + x2) / 2}
                y={y - 12}
                textAnchor="middle"
                fontSize={25}
                fontWeight={hot ? 700 : 400}
                fill={hot ? '#EF7809' : '#1c1917'}
                stroke="#fafaf9"
                strokeWidth={8}
                paintOrder="stroke"
              >
                {step.label}
              </text>
              <circle cx={x1 + dir * 30} cy={y} r={15} fill="#1c1917" />
              <text x={x1 + dir * 30} y={y + 6} textAnchor="middle" fontFamily={mono} fontSize={18} fontWeight={700} fill="#fff">
                {i + 1}
              </text>
            </g>
          );
        })}
        <text x={850} y={632} textAnchor="middle" fontSize={22} fill={muted}>
          trait plein : une demande · pointillé : une réponse
        </text>
      </svg>
    </Slide>
  );
};

const LIMITS = [
  {
    x: 0,
    title: 'MCP apporte',
    fg: '#EF7809',
    bg: accentSoft,
    rows: [
      ['L’IA découvre les outils', 'Elle les voit seule : emprunter, prolonger, lister.'],
      ['Chaque outil est décrit', 'Nom, paramètres, rôle : l’IA sait quoi envoyer.'],
      ['Écrit une fois, servi à tous', 'Chatbot, assistant, agent : le même serveur.'],
    ],
  },
  {
    x: 870,
    title: 'MCP ne règle pas',
    fg: warn,
    bg: warnSoft,
    rows: [
      ['Les droits', 'Un étudiant ne doit pas voir les emprunts d’un autre.'],
      ['La validation des entrées', 'Refuser un identifiant inventé ou une date absurde.'],
      ['La confiance dans la réponse', 'L’IA peut se tromper : un humain vérifie avant d’agir.'],
    ],
  },
] as const;

const McpLimits: Page = () => (
  <Slide section="6 · MCP">
    <Tag text="Le bilan" />
    <Title>Ce que MCP apporte, ce qu’il laisse</Title>
    <svg width={1700} height={640} viewBox="0 0 1700 640" style={{ marginTop: 0 }}>
      {LIMITS.map((col) => (
        <g key={col.title} transform={`translate(${col.x} 0)`}>
          <rect x={2} y={2} width={826} height={72} rx={6} fill={col.bg} stroke={col.fg} strokeWidth={3} />
          <text x={414} y={50} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill={col.fg}>
            {col.title}
          </text>
          {col.rows.map(([title, example], i) => (
            <g key={title} transform={`translate(0 ${96 + i * 140})`}>
              <rect x={2} y={2} width={826} height={124} rx={6} fill={surface} stroke={border} strokeWidth={3} />
              <rect x={2} y={2} width={10} height={124} fill={col.fg} />
              <text x={40} y={52} fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
                {title}
              </text>
              <text x={40} y={94} fontSize={26} fill={muted}>
                {example}
              </text>
            </g>
          ))}
        </g>
      ))}
      <rect x={2} y={536} width={1696} height={96} rx={6} fill="#1c1917" />
      <text x={850} y={596} textAnchor="middle" fontSize={34} fontWeight={700} fill="#fff">
        Un MCP est un contrat d’accès, pas de la magie.
      </text>
    </svg>
  </Slide>
);

const mcp: Entry[] = [
  {
    page: McpBreak,
    note: `Sixième partie : MCP. La question qu’on entend tout de suite : pourquoi pas juste appeler l’API ?
On regarde ce que le protocole standardise, et surtout ce qu’il ne fait pas à votre place.`,
  },
  {
    page: ApiVsMcp,
    note: `À gauche, chaque application IA a sa propre façon d'utiliser chaque service. Le chatbot appelle en REST avec une clé API, l'assistant de code passe par un SDK maison, l'agent interne utilise du GraphQL. Chacun écrit et maintient sa propre liaison avec chaque service : trois clients, trois services, neuf liaisons différentes. C'est le N fois M.
À droite, un protocole commun : MCP. Chaque service s'expose une seule fois en MCP, et chaque client sait parler MCP une seule fois. Les neuf liaisons deviennent six branchements : c'est le N plus M. Les trois clients utilisent alors les services de la même façon. Surtout, le protocole fournit une fonction, tools/list, qui liste directement chaque action possible : le client n'a plus à lire la documentation de chaque API, il demande la liste et l'obtient.
MCP est un langage commun. Il ne remplace pas l'API, il standardise la façon dont l'IA la découvre et l'appelle.`,
  },
  {
    page: McpAnatomy,
    note: `MCP veut dire Model Context Protocol. Trois acteurs, de gauche à droite. L'application IA, c'est le client : celle que l'utilisateur utilise, par exemple un assistant. Le serveur MCP, c'est la couche qui décrit à l'IA ce qu'elle peut faire. Et derrière, votre service, ici l'API Go du TP.
Exemple : l'utilisateur dit « Prolonge mon emprunt ». L'application demande au serveur MCP ce qui est disponible, puis appelle ce qu'il faut. Le serveur MCP, lui, appelle l'API Go et renvoie le résultat.
Le serveur expose trois choses. Des outils, ce sont des actions que l'IA peut lancer : emprunter un exemplaire, prolonger un emprunt. Des ressources, ce sont des données qu'elle peut lire : le catalogue, mes emprunts. Des prompts, ce sont des demandes toutes prêtes : quels emprunts sont en retard.
Le point clé : le serveur décrit tout ça à l'IA, donc elle sait quoi demander et comment, sans qu'on ait écrit une intégration pour chaque client.`,
  },
  {
    page: McpCall,
    note: `Suivre les numéros, de haut en bas. Quatre acteurs : vous, l'application IA, le modèle, et le serveur MCP, qui est devant l'API Go.
Un : vous dites « Prolonge mon emprunt ». Deux et trois : l'application demande au serveur MCP quels outils existent, et il répond avec une liste décrite : emprunter, prolonger, lister. Quatre : l'application envoie au modèle votre question et cette liste. Cinq : le modèle choisit un outil, ici prolonger(emprunt). Il ne l'exécute pas lui-même, il dit seulement ce qu'il veut. Six : l'application exécute l'appel auprès du serveur MCP. Sept : le serveur appelle l'API Go et renvoie le résultat. Huit : l'application vous répond : c'est fait.
Retenir : le modèle choisit, l'application exécute, le serveur MCP fait le lien avec le service. Le modèle ne touche jamais le service directement.`,
  },
  {
    page: McpLimits,
    note: `À gauche, ce que MCP apporte. Un : l'IA découvre les outils toute seule, elle voit qu'on peut emprunter, prolonger, lister. Deux : chaque outil est décrit, avec son nom, ses paramètres et son rôle, donc l'IA sait quoi envoyer. Trois : on l'écrit une fois, et le chatbot, l'assistant et l'agent utilisent le même serveur.
À droite, ce que MCP ne règle pas, et c'est à vous de le poser. Les droits : un étudiant ne doit pas voir les emprunts d'un autre, MCP n'y change rien, c'est le piège d'autorisation du TP. La validation des entrées : refuser un identifiant inventé ou une date absurde. La confiance dans la réponse : l'IA peut se tromper, donc un humain vérifie avant d'agir.
Retenir : un MCP est un contrat d'accès, pas de la magie.`,
  },
];

// ─── J1 matin : 7 Sécuriser un MCP ───────────────────────────────────────
const SecureBreak: Page = () => (
  <Break n="7" title="Sécuriser un MCP" sub="Qui est l’agent, et que peut-il faire ?" />
);

const IAM_TILES = [
  { label: 'IdP', sub: 'fournisseur d’identité' },
  { label: 'SSO', sub: 'une connexion pour tout' },
  { label: 'Organizations', sub: 'plusieurs clients isolés' },
  { label: 'MFA', sub: 'double vérification' },
  { label: 'FerrisKey', sub: '', hero: true },
  { label: 'Branding', sub: 'vos couleurs' },
  { label: 'RBAC', sub: 'des rôles et des droits' },
  { label: 'Audits', sub: 'qui a fait quoi' },
  { label: 'Webhooks', sub: 'notifier un système' },
] as const;

const FerrisKeyIntro: Page = () => (
  <Slide section="7 · Sécuriser un MCP">
    <Tag text="Le point de départ" />
    <Title>FerrisKey : l’IAM open source</Title>
    <svg width={1700} height={600} viewBox="0 0 1700 600" style={{ marginTop: 0 }}>
      {IAM_TILES.map((tile, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = col * 264 + 2;
        const y = row * 196 + 2;
        const hero = 'hero' in tile && tile.hero;
        return (
          <g key={tile.label} transform={`translate(${x} ${y})`}>
            <rect width={252} height={184} rx={6} fill={hero ? '#EF7809' : surface} stroke={hero ? '#EF7809' : border} strokeWidth={3} />
            {hero ? <image href={ferrisKeyLogo} x={76} y={14} width={100} height={108} /> : null}
            <text
              x={126}
              y={hero ? 158 : 84}
              textAnchor="middle"
              fontFamily={mono}
              fontSize={hero ? 30 : 27}
              fontWeight={700}
              fill={hero ? '#fff' : '#1c1917'}
            >
              {tile.label}
            </text>
            {tile.sub ? (
              <text x={126} y={122} textAnchor="middle" fontSize={22} fill={muted}>
                {tile.sub}
              </text>
            ) : null}
          </g>
        );
      })}
      <text x={880} y={52} fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
        IAM = Identity &amp; Access Management
      </text>
      <text x={880} y={96} fontSize={28} fill={muted}>
        Il répond à deux questions, à la place de chaque application.
      </text>
      <rect x={882} y={140} width={816} height={130} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={918} y={196} fontFamily={mono} fontSize={38} fontWeight={700} fill="#EF7809">
        Qui es-tu ?
      </text>
      <text x={918} y={240} fontSize={28} fill="#1c1917">
        L’identité : se connecter, prouver qui on est.
      </text>
      <rect x={882} y={298} width={816} height={130} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={918} y={354} fontFamily={mono} fontSize={38} fontWeight={700} fill="#EF7809">
        Que peux-tu faire ?
      </text>
      <text x={918} y={398} fontSize={28} fill="#1c1917">
        Les droits : des rôles, donc des permissions.
      </text>
      <rect x={882} y={462} width={816} height={90} rx={6} fill="#1c1917" />
      <text x={1290} y={518} textAnchor="middle" fontSize={28} fontWeight={700} fill="#fff">
        Open source · Apache 2.0 · pensé pour le cloud
      </text>
    </svg>
  </Slide>
);

const IamRole: Page = () => {
  const arrow = (id: string, color: string) => (
    <marker id={id} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill={color} />
    </marker>
  );
  const Step = ({ n, x, y }: { n: number; x: number; y: number }) => (
    <g>
      <circle cx={x} cy={y} r={15} fill="#1c1917" />
      <text x={x} y={y + 6} textAnchor="middle" fontFamily={mono} fontSize={18} fontWeight={700} fill="#fff">
        {n}
      </text>
    </g>
  );
  return (
    <Slide section="7 · Sécuriser un MCP">
      <Tag text="Dans un système d’information" />
      <Title>Le rôle de l’IAM dans un SI</Title>
      <svg width={1700} height={620} viewBox="0 0 1700 620" style={{ marginTop: 0 }}>
        <defs>
          {arrow('iam-a', '#1c1917')}
        </defs>
        <rect x={2} y={30} width={380} height={230} rx={6} fill={surface} stroke={border} strokeWidth={3} />
        <text x={192} y={84} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
          Utilisateur
        </text>
        {['student', 'staff', 'admin'].map((role, i) => (
          <g key={role}>
            <rect x={22 + i * 118} y={120} width={108} height={42} rx={21} fill="#fff" stroke={border} strokeWidth={3} />
            <text x={76 + i * 118} y={148} textAnchor="middle" fontFamily={mono} fontSize={20} fontWeight={700} fill="#1c1917">
              {role}
            </text>
          </g>
        ))}
        <text x={192} y={214} textAnchor="middle" fontSize={24} fill={muted}>
          des rôles, définis dans l’IAM
        </text>
        <rect x={660} y={30} width={380} height={230} rx={6} fill="#EF7809" />
        <image href={ferrisKeyLogo} x={800} y={40} width={100} height={108} />
        <text x={850} y={186} textAnchor="middle" fontFamily={mono} fontSize={34} fontWeight={700} fill="#fff">
          FerrisKey
        </text>
        <text x={850} y={228} textAnchor="middle" fontSize={25} fill="#fff">
          identité · rôles · jetons
        </text>
        <rect x={1318} y={30} width={380} height={230} rx={6} fill={surface} stroke={border} strokeWidth={3} />
        <text x={1508} y={80} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
          API Go
        </text>
        <text x={1508} y={114} textAnchor="middle" fontSize={25} fill={muted}>
          le service du TP
        </text>
        <rect x={1338} y={136} width={340} height={44} rx={22} fill="#fff" stroke="#EF7809" strokeWidth={3} />
        <g transform="translate(1366 158)" fill="none" stroke="#EF7809" strokeWidth={3.5} strokeLinecap="round">
          <circle cx={0} cy={0} r={7} />
          <line x1={7} y1={0} x2={22} y2={0} />
          <line x1={17} y1={0} x2={17} y2={7} />
        </g>
        <text x={1400} y={166} fontSize={23} fontWeight={700} fill="#1c1917">
          clé publique de FerrisKey
        </text>
        <text x={1536} y={226} textAnchor="middle" fontSize={25} fill="#1c1917">
          Elle vérifie le jeton seule
        </text>
        <Step n={4} x={1370} y={218} />
        <path d="M 386 100 L 656 100" stroke="#1c1917" strokeWidth={3.5} markerEnd="url(#iam-a)" />
        <text x={521} y={76} textAnchor="middle" fontSize={25} fill="#1c1917">
          Je me connecte
        </text>
        <Step n={1} x={416} y={100} />
        <path d="M 656 200 L 386 200" stroke="#1c1917" strokeWidth={3.5} strokeDasharray="10 7" markerEnd="url(#iam-a)" />
        <text x={521} y={176} textAnchor="middle" fontSize={25} fill="#1c1917">
          Il me donne un jeton
        </text>
        <Step n={2} x={626} y={200} />
        <path d="M 192 264 V 340 H 1508 V 266" fill="none" stroke="#EF7809" strokeWidth={4} markerEnd="url(#iam-a)" />
        <rect x={640} y={318} width={420} height={44} fill="#fafaf9" />
        <text x={850} y={349} textAnchor="middle" fontSize={26} fontWeight={700} fill="#EF7809">
          J’appelle l’API avec le jeton
        </text>
        <Step n={3} x={192} y={308} />
        <rect x={2} y={420} width={1696} height={170} rx={6} fill="#1c1917" />
        <text x={850} y={488} textAnchor="middle" fontSize={34} fontWeight={700} fill="#fff">
          L’API ne gère pas les mots de passe : elle vérifie la signature du jeton.
        </text>
        <text x={850} y={546} textAnchor="middle" fontSize={28} fontWeight={700} fill="#EF7809">
          Le jeton prouve qui je suis et quels rôles j’ai.
        </text>
      </svg>
    </Slide>
  );
};

const AgentProblem: Page = () => (
  <Slide section="7 · Sécuriser un MCP">
    <Tag text="Le problème" />
    <Title>L’agent agit en votre nom propre</Title>
    <svg width={1700} height={620} viewBox="0 0 1700 620" style={{ marginTop: 0 }}>
      <defs>
        <marker id="prob-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
        <marker id="prob-w" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#b42318" />
        </marker>
      </defs>
      <rect x={2} y={10} width={400} height={130} rx={6} fill={surface} stroke={border} strokeWidth={3} />
      <text x={202} y={70} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
        Vous
      </text>
      <text x={202} y={110} textAnchor="middle" fontSize={25} fill={muted}>
        avec votre jeton
      </text>
      <rect x={650} y={10} width={400} height={130} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={850} y={70} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
        Agent IA
      </text>
      <text x={850} y={110} textAnchor="middle" fontSize={25} fill={muted}>
        utilise votre jeton
      </text>
      <rect x={1298} y={10} width={400} height={130} rx={6} fill={surface} stroke={border} strokeWidth={3} />
      <text x={1498} y={70} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
        Serveur MCP + API
      </text>
      <text x={1498} y={110} textAnchor="middle" fontSize={25} fill={muted}>
        voit : « c’est vous »
      </text>
      <path d="M 406 75 L 646 75" stroke="#1c1917" strokeWidth={3.5} markerEnd="url(#prob-a)" />
      <text x={526} y={58} textAnchor="middle" fontSize={24} fill="#1c1917">
        lui confie
      </text>
      <path d="M 1054 75 L 1294 75" stroke="#b42318" strokeWidth={3.5} markerEnd="url(#prob-w)" />
      <text x={1174} y={58} textAnchor="middle" fontSize={24} fill="#b42318">
        agit « comme vous »
      </text>
      {[
        { x: 0, title: 'Mêmes droits que vous', l1: 'Tout ce que vous pouvez faire,', l2: 'il peut le faire.' },
        { x: 576, title: 'Aucune trace propre', l1: 'Les journaux disent', l2: '« c’est vous qui avez agi ».' },
        { x: 1152, title: 'Un message piégé suffit', l1: 'Une consigne cachée le fait agir', l2: 'avec vos droits.' },
      ].map((card) => (
        <g key={card.title} transform={`translate(${card.x} 190)`}>
          <rect x={2} y={2} width={544} height={190} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
          <circle cx={50} cy={56} r={24} fill={warn} />
          <g stroke="#fff" strokeWidth={5} strokeLinecap="round">
            <line x1={41} y1={47} x2={59} y2={65} />
            <line x1={59} y1={47} x2={41} y2={65} />
          </g>
          <text x={90} y={66} fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
            {card.title}
          </text>
          <text x={28} y={126} fontSize={26} fill="#1c1917">
            {card.l1}
          </text>
          <text x={28} y={160} fontSize={26} fill="#1c1917">
            {card.l2}
          </text>
        </g>
      ))}
      <rect x={2} y={420} width={1696} height={170} rx={6} fill="#1c1917" />
      <text x={850} y={488} textAnchor="middle" fontSize={36} fontWeight={700} fill="#fff">
        L’agent n’a pas d’identité à lui : il emprunte la vôtre.
      </text>
      <text x={850} y={546} textAnchor="middle" fontSize={28} fontWeight={700} fill="#EF7809">
        Le MCP ne le voit pas : il lit seulement le jeton.
      </text>
    </svg>
  </Slide>
);

const AgentIdentity: Page = () => (
  <Slide section="7 · Sécuriser un MCP">
    <Tag text="La parade" />
    <Title>Donner à l’agent sa propre identité</Title>
    <svg width={1700} height={620} viewBox="0 0 1700 620" style={{ marginTop: 0 }}>
      <defs>
        <marker id="id-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      <rect x={2} y={10} width={780} height={64} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
      <text x={392} y={54} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill={warn}>
        Avant : le jeton de l’utilisateur
      </text>
      <rect x={918} y={10} width={780} height={64} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={1308} y={54} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700} fill="#EF7809">
        Après : un jeton pour l’agent
      </text>
      <path d="M 790 150 L 910 150" stroke="#1c1917" strokeWidth={4} markerEnd="url(#id-a)" />
      <text x={850} y={130} textAnchor="middle" fontFamily={mono} fontSize={20} fontWeight={700} fill={muted}>
        IAM
      </text>
      {[
        { y: 96, k: 'Droits', a: 'Tous les vôtres', b: 'Réduits au besoin' },
        { y: 232, k: 'Durée', a: 'Celle de votre session', b: 'Courte' },
        { y: 368, k: 'Trace', a: 'C’est vous', b: 'L’agent, pour vous' },
      ].map((row) => (
        <g key={row.k} transform={`translate(0 ${row.y})`}>
          <rect x={2} y={2} width={780} height={118} rx={6} fill={surface} stroke={border} strokeWidth={3} />
          <text x={28} y={48} fontFamily={mono} fontSize={24} fontWeight={700} fill={muted}>
            {row.k.toUpperCase()}
          </text>
          <text x={28} y={92} fontSize={32} fontWeight={700} fill={warn}>
            {row.a}
          </text>
          <rect x={918} y={2} width={780} height={118} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
          <text x={944} y={48} fontFamily={mono} fontSize={24} fontWeight={700} fill={muted}>
            {row.k.toUpperCase()}
          </text>
          <text x={944} y={92} fontSize={32} fontWeight={700} fill="#1c1917">
            {row.b}
          </text>
        </g>
      ))}
      <rect x={2} y={510} width={1696} height={100} rx={6} fill="#1c1917" />
      <text x={850} y={572} textAnchor="middle" fontSize={32} fontWeight={700} fill="#fff">
        Le moindre privilège : que ce dont l’agent a besoin, le temps qu’il en a besoin.
      </text>
    </svg>
  </Slide>
);

const secure: Entry[] = [
  {
    page: SecureBreak,
    note: `Septième partie : sécuriser un MCP. On a vu que MCP ne règle pas les permissions. Cette partie répond à une question : qui est l'agent, et que peut-il faire ?
On commence par le problème : un agent agit en notre nom propre. Puis on introduit FerrisKey, un IAM, son rôle dans un système d'information, et comment il permet de donner à l'agent sa propre identité et ses propres droits.`,
  },
  {
    page: AgentProblem,
    note: `On commence par le problème. Un jeton, c'est la preuve d'identité qu'on présente à une API : il dit qui on est et ce qu'on a le droit de faire. Dans le schéma classique, c'est un humain qui se connecte et qui agit. Avec un agent, on lui confie notre jeton, et il agit à notre place.
Trois conséquences. Un : il a les mêmes droits que nous, tout ce que nous pouvons faire, il peut le faire. Deux : aucune trace propre, les journaux disent que c'est nous qui avons agi. Trois : un message piégé, une consigne cachée dans un document ou un mail, peut le faire agir, avec nos droits.
Et le serveur MCP ne voit rien de tout ça : il lit seulement le jeton. L'agent n'a pas d'identité à lui, il emprunte la nôtre. Pour résoudre ça, il faut un outil qui gère les identités et les droits : un IAM.`,
  },
  {
    page: FerrisKeyIntro,
    note: `Pour résoudre ce problème, il faut un outil qui gère les identités et les droits : un IAM. FerrisKey est un IAM open source, sous licence Apache 2.0, pensé pour le cloud. IAM veut dire Identity and Access Management.
Il répond à deux questions à la place de chaque application. Qui es-tu : l'identité, se connecter, prouver qui on est. Que peux-tu faire : les droits, des rôles, donc des permissions.
Autour, ce qu'il apporte : un fournisseur d'identité, du SSO, des organisations isolées, de la double vérification, la personnalisation, des rôles et des droits, des journaux d'audit, et des webhooks pour prévenir un autre système. C'est le même outil que celui du TP : les rôles student, staff et admin y sont définis.`,
  },
  {
    page: IamRole,
    note: `Le rôle d'un IAM dans un système d'information, avec l'exemple du TP. Suivre les numéros.
Un : l'utilisateur se connecte à FerrisKey. Deux : FerrisKey lui donne un jeton, signé, qui contient son identité et ses rôles : student, staff ou admin. Trois : il appelle l'API Go avec ce jeton. Quatre : l'API vérifie la signature elle-même, avec la clé publique de FerrisKey qu'elle possède. Elle n'appelle pas FerrisKey à chaque requête.
Résultat : l'API ne gère jamais de mot de passe. Elle vérifie la signature du jeton, et c'est lui qui prouve qui on est et quels rôles on a. C'est exactement ce que fait l'API du TP, avec le JWKS de FerrisKey : la liste de ses clés publiques.`,
  },
  {
    page: AgentIdentity,
    note: `La parade : donner à l'agent sa propre identité, délivrée par l'IAM. Colonne de gauche, avant : le jeton de l'utilisateur, avec tous ses droits, pour la durée de sa session, et une trace qui dit que c'est lui. Colonne de droite, après : un jeton pour l'agent, avec des droits réduits au besoin, une durée courte, et une trace qui distingue l'agent de l'utilisateur.
C'est le principe du moindre privilège : l'agent n'a que ce dont il a besoin, le temps dont il a besoin. Dans le TP : un agent qui ne sert qu'à consulter le catalogue et prolonger mes emprunts n'a pas à pouvoir supprimer un exemplaire.
Précision pour la salle : ces notions, jeton limité en droits et en durée, sont standard dans OAuth et dans le protocole MCP, où le serveur MCP vérifie le jeton sans le délivrer. La façon exacte de configurer un agent dans FerrisKey est à vérifier dans la version utilisée.`,
  },
];

// ─── J1 matin : 8 Marché du travail ──────────────────────────────────────
const MarketBreak: Page = () => (
  <Break n="8" title="Le marché du travail" sub="Ce qui change dans le métier, et ce qui reste à vous." />
);

const Step = ({
  name,
  gone,
  h,
  tone = 'neutral',
}: {
  name: string;
  gone: string;
  h: number;
  tone?: Tone;
}) => {
  const t = toneStyle[tone];
  return (
    <div
      style={{
        width: 520,
        height: h,
        boxSizing: 'border-box',
        padding: '28px 32px',
        background: t.bg,
        border: `3px solid ${t.line}`,
        borderRadius: 'var(--osd-radius)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 36, fontWeight: 800 }}>{name}</div>
      <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.1em', color: muted }}>
        ON NE RÉÉCRIT PLUS
      </div>
      <div style={{ fontSize: 30, lineHeight: 1.35 }}>{gone}</div>
    </div>
  );
};

const Staircase: Page = () => (
  <Slide section="8 · Marché du travail">
    <Tag text="Une habitude ancienne" />
    <Title>L'IA l'évolution logique de notre stack de développement</Title>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 70, height: 600, justifyContent: 'center' }}>
      <Step name="Bibliothèques" gone="Le tri, le parsing, les calculs courants" h={260} />
      <Step name="Frameworks" gone="Le routage, l’authentification, l’accès aux données" h={380} />
      <Step name="IA" gone="Le code répétitif, les premiers jets de tests" h={500} tone="accent" />
    </div>
  </Slide>
);

const ValueShift: Page = () => (
  <Slide section="8 · Marché du travail">
    <Tag text="Où se déplace la valeur" />
    <Title>Exécuter pèse moins, décider pèse plus</Title>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={1200} height={560} viewBox="0 0 1200 560">
        <line x1={600} y1={200} x2={600} y2={540} stroke="var(--osd-text)" strokeWidth={8} />
        <line x1={480} y1={540} x2={720} y2={540} stroke="var(--osd-text)" strokeWidth={8} />
        <g transform="rotate(12 600 200)">
          <line x1={180} y1={200} x2={1020} y2={200} stroke="var(--osd-text)" strokeWidth={10} strokeLinecap="round" />
        </g>
        <circle cx={600} cy={200} r={14} fill="var(--osd-accent)" />
        <line x1={189} y1={113} x2={19} y2={263} stroke={muted} strokeWidth={3} />
        <line x1={189} y1={113} x2={359} y2={263} stroke={muted} strokeWidth={3} />
        <rect x={19} y={263} width={340} height={14} rx={4} fill={surface} stroke="var(--osd-text)" strokeWidth={3} />
        <text x={189} y={320} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="var(--osd-text)">
          Exécuter
        </text>
        <line x1={1011} y1={287} x2={841} y2={437} stroke="var(--osd-accent)" strokeWidth={3} />
        <line x1={1011} y1={287} x2={1181} y2={437} stroke="var(--osd-accent)" strokeWidth={3} />
        <rect x={841} y={437} width={340} height={14} rx={4} fill={accentSoft} stroke="var(--osd-accent)" strokeWidth={3} />
        <text x={1011} y={493} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="var(--osd-text)">
          Comprendre, cadrer,
        </text>
        <text x={1011} y={527} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="var(--osd-text)">
          décider
        </text>
      </svg>
      <div style={{ fontFamily: mono, fontSize: 34, fontWeight: 700, color: 'var(--osd-accent)', marginTop: 10 }}>
        L’exécutant, c’est l’IA
      </div>
    </div>
  </Slide>
);

const Pillar = ({ label, sub, tone = 'neutral' }: { label: string; sub: string; tone?: Tone }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
    <Box label={label} sub={sub} tone={tone} w={395} h={440} />
  </div>
);

const ValuePillars: Page = () => (
  <Slide section="8 · Marché du travail">
    <Tag text="Ce qui reste à vous" />
    <Title>Quatre piliers de valeur</Title>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 40 }}>
      <div style={{ display: 'flex', gap: 40 }}>
        <Pillar label="Business et enjeux" sub="Savoir pourquoi on construit" />
        <Pillar label="Vision produit" sub="Choisir ce qui compte" />
        <Pillar label="Spécifier les chantiers" sub="Dire précisément quoi faire" />
        <Pillar label="Relation client B2C / B2B" sub="Comprendre un besoin réel" tone="accent" />
      </div>
      <div
        style={{
          width: 1700,
          height: 28,
          background: surface,
          border: `3px solid ${border}`,
          borderRadius: 'var(--osd-radius)',
          boxSizing: 'border-box',
        }}
      />
    </div>
  </Slide>
);

const REFLEXES = [
  { q: 'Qu’est-ce qui le prouve ?', e: ['Un test qui échoue', 'sans le code.'] },
  { q: 'Et les cas limites ?', e: ['Un emprunt déjà en retard,', 'un exemplaire en maintenance.'] },
  { q: 'Est-ce bien notre règle ?', e: ['Une seule prolongation,', 'pas deux, pas zéro.'] },
  { q: 'Qui le relit avant livraison ?', e: ['Un humain.', 'Pas l’IA qui l’a écrit.'] },
] as const;

const CriticalMind: Page = () => (
  <Slide section="8 · Marché du travail">
    <Tag text="Esprit critique" />
    <Title>Ne pas dire oui à tout</Title>
    <svg width={1700} height={620} viewBox="0 0 1700 620" style={{ marginTop: 0 }}>
      <defs>
        <marker id="cm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#EF7809" />
        </marker>
      </defs>
      <rect x={2} y={60} width={520} height={376} rx={30} fill={surface} stroke={border} strokeWidth={3} />
      <text x={36} y={112} fontFamily={mono} fontSize={24} fontWeight={700} fill={muted}>
        RÉPONSE DE L’IA
      </text>
      <text x={36} y={186} fontSize={32} fill="#1c1917">
        J’ai ajouté la prolongation.
      </text>
      <text x={36} y={232} fontSize={32} fill="#1c1917">
        Tous les tests passent.
      </text>
      <circle cx={262} cy={316} r={44} fill="#16a34a" />
      <polyline points="240,316 256,334 288,298" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={146} y={374} width={232} height={42} rx={21} fill="#fff" stroke={border} strokeWidth={3} />
      <text x={262} y={403} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={700} fill="#1c1917">
        ton très sûr
      </text>
      <path d="M 530 248 L 584 248" stroke="#EF7809" strokeWidth={5} markerEnd="url(#cm-arrow)" />
      <text x={600} y={40} fontFamily={mono} fontSize={34} fontWeight={700} fill="#EF7809">
        Questionner : quatre réflexes
      </text>
      {REFLEXES.map((r, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 600 + col * 566;
        const y = 60 + row * 200;
        return (
          <g key={r.q} transform={`translate(${x} ${y})`}>
            <rect x={2} y={2} width={528} height={176} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
            <circle cx={44} cy={52} r={22} fill="#EF7809" />
            <text x={44} y={60} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700} fill="#fff">
              {i + 1}
            </text>
            <text x={84} y={62} fontSize={29} fontWeight={700} fill="#1c1917">
              {r.q}
            </text>
            <text x={28} y={116} fontSize={26} fill={muted}>
              {r.e[0]}
            </text>
            <text x={28} y={150} fontSize={26} fill={muted}>
              {r.e[1]}
            </text>
          </g>
        );
      })}
      <rect x={2} y={480} width={1696} height={136} rx={6} fill="#1c1917" />
      <text x={850} y={540} textAnchor="middle" fontSize={36} fontWeight={700} fill="#fff">
        Une réponse sûre d’elle n’est pas une réponse juste.
      </text>
      <text x={850} y={588} textAnchor="middle" fontSize={28} fontWeight={700} fill="#EF7809">
        Vous restez responsable de ce qui est livré.
      </text>
    </svg>
  </Slide>
);

const market: Entry[] = [
  {
    page: MarketBreak,
    note: `Huitième et dernier thème : le marché du travail.
On reste factuel : on regarde ce que l’IA change dans le quotidien d’un développeur, et ce qui reste de votre côté.`,
  },
  {
    page: Staircase,
    note: `Chaque génération d’outils a supprimé du travail répétitif : les bibliothèques, puis les frameworks, maintenant l’IA.
À chaque marche, on a arrêté de réécrire quelque chose, et le métier a continué.
L’IA est une marche de plus, pas un changement de nature.`,
  },
  {
    page: ValueShift,
    note: `Une balance : d’un côté exécuter, de l’autre comprendre, cadrer, décider.
Plus l’IA exécute, moins l’exécution seule distingue quelqu’un. La valeur se déplace vers le côté qui descend.
Retenir : l’exécutant, c’est l’IA ; la décision reste humaine.`,
  },
  {
    page: ValuePillars,
    note: `Quatre piliers sur lesquels vous avez la main : les enjeux business, la vision produit, la capacité à spécifier un chantier, et la relation client.
Le dernier est le plus difficile à déléguer : comprendre un besoin réel, en B2C comme en B2B.
Demander à la salle lequel ils travaillent déjà.`,
  },
  {
    page: CriticalMind,
    note: `L'esprit critique, c'est ce qui reste de votre côté quand l'IA exécute. Exemple du TP : l'IA répond « J'ai ajouté la prolongation, tous les tests passent », avec un ton très sûr. Ça ne prouve rien.
Quatre réflexes. Un : qu'est-ce qui le prouve ? Un test qui échoue sans le code. Deux : et les cas limites ? Un emprunt déjà en retard, un exemplaire en maintenance. Trois : est-ce bien notre règle ? Une seule prolongation, pas deux, pas zéro. Quatre : qui le relit avant la livraison ? Un humain, pas l'IA qui l'a écrit.
Le lien avec ce qu'on a vu : une réponse peut être périmée, inventée ou à côté, et rien dans le ton ne prévient. Une réponse sûre d'elle n'est pas une réponse juste. Vous restez responsable de ce qui est livré.`,
  },
];

const Pill = ({ text, tone = 'neutral' }: { text: string; tone?: 'neutral' | 'accent' }) => (
  <span
    style={{
      display: 'inline-block',
      fontFamily: mono,
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.2,
      padding: '10px 22px',
      borderRadius: 999,
      border: `3px solid ${tone === 'accent' ? 'var(--osd-accent)' : border}`,
      background: tone === 'accent' ? accentSoft : surface,
      color: 'var(--osd-text)',
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </span>
);

const Badge = ({ n }: { n: number }) => (
  <span
    style={{
      width: 44,
      height: 44,
      borderRadius: 22,
      background: 'var(--osd-accent)',
      color: '#fff',
      fontFamily: mono,
      fontSize: 26,
      fontWeight: 800,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {n}
  </span>
);

const SvgBox = ({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={4}
      fill={accent ? accentSoft : surface}
      stroke={accent ? 'var(--osd-accent)' : border}
      strokeWidth={3}
    />
    <text
      x={x + w / 2}
      y={sub ? y + h / 2 - 12 : y + h / 2}
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily={mono}
      fontSize={28}
      fontWeight={700}
      fill="var(--osd-text)"
    >
      {label}
    </text>
    {sub ? (
      <text
        x={x + w / 2}
        y={y + h / 2 + 22}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={22}
        fill={muted}
      >
        {sub}
      </text>
    ) : null}
  </g>
);

const SvgArrowDefs = ({ id }: { id: string }) => (
  <defs>
    <marker id={id} markerUnits="userSpaceOnUse" markerWidth={18} markerHeight={18} refX={15} refY={9} orient="auto">
      <path d="M0 0 L18 9 L0 18 Z" fill="var(--osd-text)" />
    </marker>
  </defs>
);

// ─── J1 matin : Méthodologie ──────────────────────────────────────────────────
const MethodBreak: Page = () => (
  <Break
    n="Méthode"
    title="La méthodologie"
    sub="Cadrer avant de coder, déléguer sans abdiquer, contrôler ce qui revient."
  />
);

const VISION = [
  { n: '1', name: 'Problème', q: 'Qu’est-ce qui coince ?', lines: ['Personne ne sait qui a', 'emprunté quoi, ni', 'jusqu’à quand.'], hot: false },
  { n: '2', name: 'Utilisateur', q: 'Qui est concerné ?', lines: ['L’étudiant : emprunte', 'Le staff : enregistre', 'L’admin : gère le catalogue'], hot: false },
  { n: '3', name: 'Valeur', q: 'Qu’est-ce qui change ?', lines: ['On voit d’un coup d’œil', 'ce qui est disponible', 'et qui est en retard.'], hot: false },
  { n: '4', name: 'Périmètre', q: 'Ce qu’on fait, ou non', lines: ['Dans le MVP :', 'emprunter, rendre, prolonger', 'Hors MVP :', 'file d’attente, notifications'], hot: true },
] as const;

const ProductVision: Page = () => (
  <Slide section="Méthodologie">
    <Tag text="Avant de coder" />
    <Title>Quoi, pour qui, pourquoi</Title>
    <svg width={1700} height={620} viewBox="0 0 1700 620" style={{ marginTop: 0 }}>
      {VISION.map((card, i) => (
        <g key={card.name} transform={`translate(${i * 430} 0)`}>
          <rect
            x={2}
            y={2}
            width={406}
            height={404}
            rx={6}
            fill={card.hot ? accentSoft : surface}
            stroke={card.hot ? '#EF7809' : border}
            strokeWidth={3}
          />
          <circle cx={44} cy={52} r={24} fill="#EF7809" />
          <text x={44} y={61} textAnchor="middle" fontFamily={mono} fontSize={26} fontWeight={700} fill="#fff">
            {card.n}
          </text>
          <text x={84} y={62} fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
            {card.name}
          </text>
          <text x={28} y={112} fontSize={25} fill={muted}>
            {card.q}
          </text>
          <line x1={28} y1={132} x2={382} y2={132} stroke={border} strokeWidth={3} />
          {card.lines.map((line, j) => {
            const heading = line.endsWith(':');
            return (
              <text
                key={line}
                x={28}
                y={184 + j * 44}
                fontSize={27}
                fontWeight={heading ? 700 : 400}
                fill={heading ? '#EF7809' : '#1c1917'}
              >
                {line}
              </text>
            );
          })}
        </g>
      ))}
      <text x={0} y={452} fontSize={24} fill={dim}>
        Exemple : le prêt de matériel du TP
      </text>
      <rect x={2} y={478} width={1696} height={136} rx={6} fill="#1c1917" />
      <text x={850} y={538} textAnchor="middle" fontSize={36} fontWeight={700} fill="#fff">
        L’IA code vite : c’est à vous de décider quoi construire.
      </text>
      <text x={850} y={586} textAnchor="middle" fontSize={28} fontWeight={700} fill="#EF7809">
        Ces quatre réponses, c’est la vision produit.
      </text>
    </svg>
  </Slide>
);

const POSSIBLE = [
  'Chatbot',
  'Export PDF',
  'Slack',
  'Thème sombre',
  'Gamification',
  'Dashboard',
  'Audit',
  'File d’attente',
  'Notifications',
  'Emprunt',
  'Retour',
  'Prolongation',
];
const KEPT = [
  { label: 'Emprunt', name: 'Emprunt de matériel', sub: 'L’étudiant emprunte un exemplaire' },
  { label: 'Retour', name: 'Retour de matériel', sub: 'Le staff enregistre le retour' },
  { label: 'Prolongation', name: 'Prolongation', sub: 'Une seule fois, jamais en retard' },
];

const ScopeDiscipline: Page = () => (
  <Slide section="Méthodologie">
    <Tag text="La tentation" />
    <Title>Tout est possible, tout n’est pas utile</Title>
    <svg width={1700} height={620} viewBox="0 0 1700 620" style={{ marginTop: 0 }}>
      <defs>
        <marker id="scope-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      <text x={0} y={36} fontFamily={mono} fontSize={30} fontWeight={700} fill={muted}>
        L’IA rend tout possible
      </text>
      {POSSIBLE.map((label, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const kept = KEPT.some((k) => k.label === label);
        return (
          <g key={label} transform={`translate(${col * 214 + 2} ${60 + row * 72})`}>
            <rect width={200} height={54} rx={27} fill={kept ? '#EF7809' : '#fff'} stroke={kept ? '#EF7809' : border} strokeWidth={3} />
            <text x={100} y={34} textAnchor="middle" fontFamily={mono} fontSize={20} fontWeight={700} fill={kept ? '#fff' : '#57534e'}>
              {label}
            </text>
          </g>
        );
      })}
      <path d="M 650 150 L 688 150" stroke="#1c1917" strokeWidth={3.5} markerEnd="url(#scope-a)" />
      <polygon points="694,60 1006,60 896,230 804,230" fill={accentSoft} stroke="#EF7809" strokeWidth={4} strokeLinejoin="round" />
      <text x={850} y={122} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
        Le filtre
      </text>
      <text x={850} y={158} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
        business
      </text>
      <path d="M 964 145 L 1056 145" stroke="#1c1917" strokeWidth={3.5} markerEnd="url(#scope-a)" />
      <rect x={690} y={262} width={320} height={190} rx={6} fill={surface} stroke={border} strokeWidth={3} />
      {['Quel problème ça résout ?', 'Qui le demande ?', 'Et si on ne le fait pas ?'].map((q, i) => (
        <g key={q}>
          <circle cx={722} cy={306 + i * 56} r={13} fill="#EF7809" />
          <text x={722} y={312 + i * 56} textAnchor="middle" fontFamily={mono} fontSize={17} fontWeight={700} fill="#fff">
            {i + 1}
          </text>
          <text x={746} y={313 + i * 56} fontSize={23} fill="#1c1917">
            {q}
          </text>
        </g>
      ))}
      <text x={1060} y={36} fontFamily={mono} fontSize={30} fontWeight={700} fill="#EF7809">
        On ne construit que l’utile
      </text>
      {KEPT.map((feature, i) => (
        <g key={feature.label} transform={`translate(1060 ${64 + i * 100})`}>
          <rect x={2} y={2} width={636} height={84} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
          <circle cx={48} cy={44} r={22} fill="#EF7809" />
          <polyline points="38,44 46,53 59,36" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={88} y={40} fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
            {feature.name}
          </text>
          <text x={88} y={70} fontSize={24} fill={muted}>
            {feature.sub}
          </text>
          <text x={620} y={32} textAnchor="end" fontFamily={mono} fontSize={19} fontWeight={700} fill="#EF7809">
            {`FEATURE ${i + 1}`}
          </text>
        </g>
      ))}
      <text x={1062} y={394} fontSize={25} fill={muted}>
        Le reste : plus tard, ou jamais.
      </text>
      <rect x={2} y={488} width={1696} height={128} rx={6} fill="#1c1917" />
      <text x={850} y={546} textAnchor="middle" fontSize={36} fontWeight={700} fill="#fff">
        Possible ne veut pas dire utile.
      </text>
      <text x={850} y={592} textAnchor="middle" fontSize={28} fontWeight={700} fill="#EF7809">
        Chaque feature ajoutée est du code à relire, à tester et à maintenir.
      </text>
    </svg>
  </Slide>
);

const SpecDriven: Page = () => (
  <Slide section="Méthodologie">
    <Tag text="Spec-driven" />
    <Title>La spec avant le code</Title>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 56, paddingBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 40 }}>
        <Box label="Idée" w={200} h={120} />
        <Arrow dir="right" />
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 'calc(100% + 18px)', left: '50%', transform: 'translateX(-50%)' }}>
            <Pill text="superpowers:brainstorming" tone="accent" />
          </div>
          <Box label="Questions" tone="accent" w={200} h={120} />
        </div>
        <Arrow dir="right" />
        <Box label="Spec" w={200} h={120} />
        <Arrow dir="right" />
        <Box label="Plan" w={200} h={120} />
        <Arrow dir="right" />
        <Box label="Code" w={200} h={120} />
      </div>
      <div style={{ fontSize: 34, lineHeight: 1.4, color: muted }}>
        Les questions viennent avant la spec, la spec avant le plan.
      </div>
    </div>
  </Slide>
);

const AgenticLoop: Page = () => (
  <Slide section="Méthodologie">
    <Tag text="Boucle agentique" />
    <Title>Diviser pour mieux régner</Title>
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
      <svg width={1700} height={528} viewBox="0 0 1700 528">
        <g transform="translate(0 4)">
          <SvgBox x={690} y={0} w={320} h={120} label="Orchestrateur" sub="découpe, délègue, assemble" accent />
          <SvgBox x={110} y={400} w={320} h={110} label="Sous-agent 1" sub="une tâche" />
          <SvgBox x={690} y={400} w={320} h={110} label="Sous-agent 2" sub="une tâche" />
          <SvgBox x={1270} y={400} w={320} h={110} label="Sous-agent 3" sub="une tâche" />
          <g stroke="#EF7809" strokeWidth={3.5} strokeDasharray="10 8" fill="none">
            <line x1={850} y1={124} x2={850} y2={396} />
            <line x1={270} y1={240} x2={1430} y2={240} />
            <line x1={270} y1={240} x2={270} y2={396} />
            <line x1={1430} y1={240} x2={1430} y2={396} />
          </g>
          <g fill="#EF7809">
            <circle cx={270} cy={240} r={8} />
            <circle cx={850} cy={240} r={8} />
            <circle cx={1430} cy={240} r={8} />
            <circle cx={270} cy={396} r={8} />
            <circle cx={850} cy={396} r={8} />
            <circle cx={1430} cy={396} r={8} />
          </g>
          <g fontFamily={mono} fontSize={22}>
            {[270, 850, 1430].map((x) => (
              <g key={x}>
                <text x={x - 16} y={326} textAnchor="end" fill={muted}>
                  tâche
                </text>
                <text x={x + 16} y={326} textAnchor="start" fill="#EF7809">
                  résultat
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  </Slide>
);

const ContextWindow: Page = () => (
  <Slide section="Méthodologie">
    <Tag text="Fenêtre de contexte" />
    <Title>Le contexte = tout ce que le modèle voit</Title>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36, paddingBottom: 30 }}>
      <Gauge value={0.95} label="Une seule fenêtre, tout mélangé" valueText="saturée" />
      <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, color: 'var(--osd-accent)', marginTop: 12 }}>
        Un contexte par sous-agent
      </div>
      <Gauge value={0.25} label="Sous-agent 1" valueText="léger" />
      <Gauge value={0.3} label="Sous-agent 2" valueText="léger" />
      <div style={{ fontFamily: mono, fontSize: 22, color: dim }}>illustration</div>
    </div>
  </Slide>
);

const TDD_STEPS = [
  { n: '1', title: 'Test rouge', dot: '#b42318', lines: ['On écrit la règle en test :', 'un retard bloque', 'tout nouvel emprunt.'], who: 'Vous', bg: '#1c1917', fg: '#fff', w: 110 },
  { n: '2', title: 'Code', dot: '#EF7809', lines: ['L’IA écrit le minimum', 'pour que le test', 'passe.'], who: 'L’IA', bg: '#EF7809', fg: '#fff', w: 100 },
  { n: '3', title: 'Test vert', dot: '#16a34a', lines: ['Les tests passent :', 'c’est une commande,', 'pas un avis.'], who: 'Commande', bg: '#d6d3d1', fg: '#1c1917', w: 180 },
  { n: '4', title: 'Refactor', dot: '#a8a29e', lines: ['On nettoie le code,', 'sans casser les tests.', 'Vous relisez.'], who: 'L’IA + vous', bg: '#f6b07a', fg: '#1c1917', w: 190 },
] as const;

const Delegation: Page = () => (
  <Slide section="Méthodologie">
    <Tag text="Délégation" />
    <Title>Le cycle TDD</Title>
    <svg width={1700} height={610} viewBox="0 0 1700 610" style={{ marginTop: 0 }}>
      <defs>
        <marker id="tdd-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
        <marker id="tdd-o" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#EF7809" />
        </marker>
      </defs>
      {TDD_STEPS.map((step, i) => (
        <g key={step.title} transform={`translate(${i * 443} 6)`}>
          <rect x={2} y={2} width={366} height={262} rx={6} fill={surface} stroke={border} strokeWidth={3} />
          <circle cx={44} cy={50} r={22} fill={step.dot} />
          <text x={44} y={58} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700} fill="#fff">
            {step.n}
          </text>
          <text x={84} y={60} fontFamily={mono} fontSize={30} fontWeight={700} fill="#1c1917">
            {step.title}
          </text>
          {step.lines.map((line, j) => (
            <text key={line} x={26} y={116 + j * 36} fontSize={26} fill="#1c1917">
              {line}
            </text>
          ))}
          <rect x={26} y={212} width={step.w} height={40} rx={20} fill={step.bg} />
          <text x={26 + step.w / 2} y={239} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={700} fill={step.fg}>
            {step.who}
          </text>
          {i < TDD_STEPS.length - 1 ? (
            <path d="M 374 134 L 437 134" stroke="#1c1917" strokeWidth={3.5} markerEnd="url(#tdd-a)" />
          ) : null}
        </g>
      ))}
      <path
        d="M 1514 274 V 322 H 185 V 276"
        fill="none"
        stroke="#EF7809"
        strokeWidth={3.5}
        strokeDasharray="10 8"
        markerEnd="url(#tdd-o)"
      />
      <text x={850} y={362} textAnchor="middle" fontSize={26} fill={muted}>
        on recommence, une règle à la fois
      </text>
      <rect x={2} y={396} width={1696} height={190} rx={6} fill="#1c1917" />
      <text x={850} y={472} textAnchor="middle" fontSize={44} fontWeight={800} fill="#EF7809">
        On délègue le code, pas le jugement.
      </text>
      <text x={850} y={534} textAnchor="middle" fontSize={30} fontWeight={700} fill="#fff">
        Le test, c’est la règle : c’est vous qui la posez.
      </text>
    </svg>
  </Slide>
);

const GATES = [
  { title: 'Tests', who: 'Commande', bg: '#d6d3d1', fg: '#1c1917', w: 180, lines: ['Bornes de dates,', 'quota + retard', 'combinés'] },
  { title: 'Revue', who: 'Humain', bg: '#1c1917', fg: '#fff', w: 130, lines: ['Autorisation oubliée,', 'règle mal comprise'] },
  { title: 'Garde-fous', who: 'Code défensif', bg: '#EF7809', fg: '#fff', w: 230, lines: ['Entrées invalides,', 'droits non vérifiés', 'côté serveur'] },
] as const;

const ZeroTrust: Page = () => (
  <Slide section="Méthodologie">
    <Tag text="Contrôle" />
    <Title>Zéro confiance, programmation défensive</Title>
    <svg width={1700} height={620} viewBox="0 0 1700 620" style={{ marginTop: 0 }}>
      <defs>
        <marker id="zt-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      <rect x={2} y={24} width={256} height={110} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
      <text x={130} y={72} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700} fill="#1c1917">
        Sortie de l’IA
      </text>
      <text x={130} y={108} textAnchor="middle" fontSize={24} fill={warn}>
        rien n’est prouvé
      </text>
      {GATES.map((gate, i) => {
        const x = 322 + i * 372;
        return (
          <g key={gate.title}>
            <rect x={x} y={24} width={310} height={110} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
            <text x={x + 155} y={92} textAnchor="middle" fontFamily={mono} fontSize={34} fontWeight={700} fill="#1c1917">
              {gate.title}
            </text>
            <rect x={x + 2} y={170} width={306} height={284} rx={6} fill={surface} stroke={border} strokeWidth={3} />
            <rect x={x + 24} y={192} width={gate.w} height={40} rx={20} fill={gate.bg} />
            <text x={x + 24 + gate.w / 2} y={219} textAnchor="middle" fontFamily={mono} fontSize={22} fontWeight={700} fill={gate.fg}>
              {gate.who}
            </text>
            <text x={x + 24} y={276} fontFamily={mono} fontSize={22} fontWeight={700} fill={muted}>
              ATTRAPE
            </text>
            {gate.lines.map((line, j) => (
              <text key={line} x={x + 24} y={318 + j * 40} fontSize={27} fill="#1c1917">
                {line}
              </text>
            ))}
          </g>
        );
      })}
      <rect x={1440} y={24} width={258} height={110} rx={6} fill={accentSoft} stroke="#16a34a" strokeWidth={3} />
      <text x={1569} y={72} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill="#1c1917">
        Livré
      </text>
      <text x={1569} y={108} textAnchor="middle" fontSize={24} fill="#15803d">
        en confiance
      </text>
      {[0, 1, 2, 3].map((i) => {
        const x1 = i === 0 ? 262 : 322 + (i - 1) * 372 + 314;
        const x2 = i === 3 ? 1436 : 322 + i * 372 - 4;
        return <path key={i} d={`M ${x1} 79 L ${x2} 79`} stroke="#1c1917" strokeWidth={3.5} markerEnd="url(#zt-a)" />;
      })}
      <rect x={2} y={492} width={1696} height={124} rx={6} fill="#1c1917" />
      <text x={850} y={548} textAnchor="middle" fontSize={34} fontWeight={700} fill="#fff">
        On ne croit ni la sortie de l’IA, ni les entrées.
      </text>
      <text x={850} y={594} textAnchor="middle" fontSize={28} fontWeight={700} fill="#EF7809">
        Trois barrières, avant que ça n’arrive à un utilisateur.
      </text>
    </svg>
  </Slide>
);

const CI_STEPS = [
  { title: 'Push / PR', cmd: '', sub: 'à chaque modification' },
  { title: 'Build', cmd: 'go build ./...', sub: '' },
  { title: 'Lint', cmd: 'go vet ./...', sub: '' },
  { title: 'Tests', cmd: 'go test ./...', sub: '' },
  { title: 'Merge', cmd: '', sub: 'si tout est vert' },
] as const;

const CI_REASONS = [
  { n: '1', title: 'L’IA produit vite', l1: 'Plus de code à contrôler,', l2: 'bien plus qu’à la main.' },
  { n: '2', title: 'La CI est impartiale', l1: 'Mêmes règles pour tous,', l2: 'humain ou IA.' },
  { n: '3', title: 'La branche est protégée', l1: 'Rien n’est fusionné', l2: 'tant que ce n’est pas vert.' },
] as const;

const CiPipeline: Page = () => (
  <Slide section="Méthodologie">
    <Tag text="Contrôle automatique" />
    <Title>Une pipeline de tests en CI</Title>
    <svg width={1700} height={620} viewBox="0 0 1700 620" style={{ marginTop: 0 }}>
      <defs>
        <marker id="ci-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#1c1917" />
        </marker>
      </defs>
      {CI_STEPS.map((step, i) => {
        const x = i * 360;
        const last = i === CI_STEPS.length - 1;
        const first = i === 0;
        return (
          <g key={step.title} transform={`translate(${x} 6)`}>
            <rect
              x={2}
              y={2}
              width={256}
              height={112}
              rx={6}
              fill={last ? '#f0fdf4' : first ? surface : accentSoft}
              stroke={last ? '#16a34a' : first ? border : '#EF7809'}
              strokeWidth={3}
            />
            <text x={130} y={78} textAnchor="middle" fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
              {step.title}
            </text>
            {step.cmd ? (
              <g>
                <rect x={130 - 112} y={134} width={224} height={42} rx={21} fill="#1c1917" />
                <text x={130} y={162} textAnchor="middle" fontFamily={mono} fontSize={21} fontWeight={700} fill="#fff">
                  {step.cmd}
                </text>
              </g>
            ) : (
              <text x={130} y={162} textAnchor="middle" fontSize={24} fill={last ? '#15803d' : muted}>
                {step.sub}
              </text>
            )}
            {!last ? <path d="M 262 58 L 356 58" stroke="#1c1917" strokeWidth={3.5} markerEnd="url(#ci-a)" /> : null}
          </g>
        );
      })}
      <path d="M 1210 188 V 236" stroke={warn} strokeWidth={3.5} strokeDasharray="8 6" fill="none" />
      <rect x={722} y={236} width={620} height={66} rx={6} fill={warnSoft} stroke={warn} strokeWidth={3} />
      <text x={1032} y={279} textAnchor="middle" fontSize={28} fontWeight={700} fill={warn}>
        Un test échoue : le merge est bloqué
      </text>
      {CI_REASONS.map((r, i) => (
        <g key={r.title} transform={`translate(${i * 576} 334)`}>
          <rect x={2} y={2} width={544} height={140} rx={6} fill={surface} stroke={border} strokeWidth={3} />
          <circle cx={44} cy={46} r={22} fill="#EF7809" />
          <text x={44} y={54} textAnchor="middle" fontFamily={mono} fontSize={24} fontWeight={700} fill="#fff">
            {r.n}
          </text>
          <text x={84} y={54} fontFamily={mono} fontSize={26} fontWeight={700} fill="#1c1917">
            {r.title}
          </text>
          <text x={28} y={92} fontSize={26} fill="#1c1917">
            {r.l1}
          </text>
          <text x={28} y={122} fontSize={26} fill="#1c1917">
            {r.l2}
          </text>
        </g>
      ))}
      <rect x={2} y={496} width={1696} height={116} rx={6} fill="#1c1917" />
      <text x={850} y={550} textAnchor="middle" fontSize={34} fontWeight={700} fill="#fff">
        La CI transforme la méfiance en règle automatique.
      </text>
      <text x={850} y={592} textAnchor="middle" fontSize={26} fontWeight={700} fill="#EF7809">
        Le test qui échoue arrête tout, avant qu’un humain ne s’en occupe.
      </text>
    </svg>
  </Slide>
);

const DemoPostulate: Page = () => (
  <Slide section="Démonstration">
    <Tag text="Démo en direct" />
    <Title>Une issue, du début à la fin</Title>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 64, paddingBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 40 }}>
        <Box label="Issue simple sur Mestier" w={420} h={170} />
        <Arrow dir="right" />
        <Box label="Spec → boucle → TDD" tone="accent" w={520} h={170} />
        <Arrow dir="right" />
        <Box label="Code livré" w={340} h={170} />
      </div>
      <div style={{ display: 'flex', gap: 56, fontSize: 28, lineHeight: 1.3 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Badge n={1} /> Je valide la spec
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Badge n={2} /> Je relis les tests
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Badge n={3} /> Je relis le diff
        </span>
      </div>
    </div>
  </Slide>
);

const method: Entry[] = [
  {
    page: MethodBreak,
    note: `On change de rythme : jusqu’ici on a compris l’outil, maintenant on apprend à le piloter.
Un peu de méthode et une démonstration en direct ; après la vérification de l’environnement et le repas, vous appliquerez tout cela dans le TP.`,
  },
  {
    page: ProductVision,
    note: `Avant de demander du code à une IA, il faut savoir ce qu'on construit. Quatre questions, avec l'exemple du TP : le prêt de matériel.
Un, le problème : personne ne sait qui a emprunté quoi, ni jusqu'à quand. Deux, l'utilisateur : l'étudiant emprunte, le staff enregistre, l'admin gère le catalogue. Trois, la valeur : on voit d'un coup d'œil ce qui est disponible et qui est en retard. Quatre, le périmètre : ce qu'on fait et ce qu'on ne fait pas. Dans le MVP, emprunter, rendre, prolonger. Hors MVP, la file d'attente et les notifications.
L'IA ne répond à aucune de ces questions à votre place. Elle code vite : c'est à vous de décider quoi construire. Ces quatre réponses, c'est la vision produit, et c'est la valeur de l'humain.`,
  },
  {
    page: ScopeDiscipline,
    note: `Avec l'IA, on a l'impression de pouvoir tout faire, et vite. Un chatbot, un export PDF, des notifications Slack, un thème sombre, de la gamification, un tableau de bord. Tout est possible.
Le piège, c'est de céder à cette possibilité. Possible ne veut pas dire utile. Chaque feature ajoutée est du code à relire, à tester et à maintenir, même si l'IA l'a écrite en trente secondes.
Le filtre, ce sont les trois questions. Quel problème ça résout, celui de la page précédente ? Qui le demande ? Et que se passe-t-il si on ne le fait pas ? Dans le TP, on ne garde que trois features : l'emprunt de matériel, le retour de matériel, et la prolongation. Le reste, plus tard, ou jamais.
Message : l'IA rend la construction presque gratuite, donc la valeur se déplace vers le choix de ce qu'on construit.`,
  },
  {
    page: SpecDriven,
    note: `Le flux : une idée, des questions, une spec, un plan, puis seulement du code.
Les questions sont la partie que l’on saute le plus souvent ; la compétence superpowers:brainstorming sert justement à les poser.`,
  },
  {
    page: AgenticLoop,
    note: `Un orchestrateur découpe le travail et le confie à des sous-agents.
Chaque sous-agent reçoit une tâche et rend un résultat ; l’orchestrateur assemble.
Retenez le titre : diviser pour mieux régner.`,
  },
  {
    page: ContextWindow,
    note: `Définition à retenir : le contexte, c’est tout ce que le modèle voit.
Une seule fenêtre où tout se mélange se sature ; un contexte par sous-agent reste léger et ciblé.
Le graphique est une illustration, pas une mesure.`,
  },
  {
    page: Delegation,
    note: `Le TDD, c'est écrire le test avant le code. Quatre temps, avec la règle du TP : un retard bloque tout nouvel emprunt.
Un, test rouge : on écrit la règle sous forme de test, et il échoue, puisque le code n'existe pas. C'est vous qui la posez. Deux, code : l'IA écrit le minimum pour que le test passe. Trois, test vert : les tests passent, et c'est une commande, pas un avis, donc on ne se fie pas à l'IA pour dire que ça marche. Quatre, refactor : on nettoie le code sans casser les tests, et vous relisez. Puis on recommence, une règle à la fois.
Message : on délègue le code, pas le jugement. Le test, c'est la règle, et c'est vous qui la posez. L'IA exécute, les tests contrôlent.`,
  },
  {
    page: ZeroTrust,
    note: `Zéro confiance : on ne croit ni la sortie de l'IA, ni les entrées. Elle a produit du code, rien n'est prouvé. Elle doit traverser trois barrières avant d'être livrée, avec les pièges du TP.
Un : les tests, qui sont une commande. Ils attrapent les bornes de dates, le retard évalué à minuit heure de Paris, le quota combiné avec le retard. Deux : la revue, par un humain. Elle attrape l'autorisation oubliée, ou une règle métier mal comprise. Trois : les garde-fous, c'est la programmation défensive : on valide les entrées et on vérifie les droits dans le service, côté serveur, pas seulement dans un middleware.
Dans cet ordre, avant que ça n'arrive à un utilisateur. Aucune barrière ne suffit seule.`,
  },
  {
    page: CiPipeline,
    note: `La CI, intégration continue, c'est une pipeline qui s'exécute automatiquement à chaque modification : on pousse le code, ou on ouvre une pull request, et elle lance le build, le lint et les tests, dans un environnement propre. Pour le TP en Go : go build, go vet, go test. Si tout est vert, le merge est possible. Si un test échoue, il est bloqué.
Pourquoi c'est encore plus important avec l'IA. Un : l'IA produit vite, donc il y a plus de code à contrôler que ce qu'un humain peut relire. Deux : la CI est impartiale, les mêmes règles s'appliquent à tout le monde, humain ou IA, et elle ne se laisse pas convaincre par un ton sûr. Trois : la branche principale est protégée, rien n'est fusionné tant que ce n'est pas vert.
C'est la barrière « tests » de la page précédente, rendue automatique : la CI transforme la méfiance en règle. Les tests restent à écrire par vous, la CI garantit seulement qu'ils sont toujours lancés.`,
  },
  {
    page: DemoPostulate,
    note: `Démonstration en direct, sur une issue simple du projet Mestier ; le sujet est choisi au moment de la démo.
On suit le chemin : spec, boucle, TDD, code livré, avec trois points de contrôle humain.
Dire à voix haute ce que l’on vérifie à chaque point.`,
  },
];

// ─── J1 matin (30 min) : Vérification de l'environnement ─────────────────────────────────────
const EnvBreak: Page = () => (
  <Break n="Env" title="Votre environnement" sub="Trente minutes pour que tout tourne sur votre machine avant de coder." />
);

const PROJECT_PHASES = [
  { title: 'Créer l’API', lines: ['En Go, TypeScript', 'ou Rust'] },
  { title: 'Sécuriser l’API', lines: ['Avec l’IAM FerrisKey'] },
  { title: 'Créer un MCP', lines: ['Lister les ressources', 'depuis Claude'] },
  { title: 'Sécuriser le MCP', lines: ['Avec l’IAM'] },
] as const;

const ProjectSteps: Page = () => (
  <Slide section="TP">
    <Tag text="Le projet" />
    <Title>L’exercice en quatre phases</Title>
    <p style={{ fontSize: 28, lineHeight: 1.45, color: muted, margin: '0 0 18px', maxWidth: 1700 }}>
      Vous construisez une API de prêt de matériel : les étudiants consultent le catalogue et empruntent, le staff
      enregistre emprunts et retours. Stack imposée : PostgreSQL, FerrisKey comme IAM, le tout dans Docker.
    </p>
    <svg width={1700} height={340} viewBox="0 0 1700 340" style={{ marginTop: 0, flexShrink: 0 }}>
      <line x1={205} y1={44} x2={1495} y2={44} stroke="#EF7809" strokeWidth={3.5} strokeDasharray="10 8" />
      {PROJECT_PHASES.map((phase, i) => (
        <g key={phase.title} transform={`translate(${i * 430} 0)`}>
          <circle cx={205} cy={44} r={28} fill="#EF7809" />
          <text x={205} y={54} textAnchor="middle" fontFamily={mono} fontSize={28} fontWeight={700} fill="#fff">
            {i + 1}
          </text>
          <rect x={2} y={96} width={406} height={236} rx={6} fill={surface} stroke={border} strokeWidth={3} />
          <text x={28} y={160} fontFamily={mono} fontSize={32} fontWeight={700} fill="#1c1917">
            {phase.title}
          </text>
          <line x1={28} y1={184} x2={382} y2={184} stroke={border} strokeWidth={3} />
          {phase.lines.map((line, j) => (
            <text key={line} x={28} y={238 + j * 44} fontSize={30} fill="#1c1917">
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  </Slide>
);

const env: Entry[] = [
  {
    page: EnvBreak,
    note: `Fin de la théorie et de la méthodologie : trente minutes pour vérifier l’environnement, avant le repas et le TP.
L’objectif est simple : chacun a la stack qui tourne avant de toucher au code.`,
  },
  {
    page: ProjectSteps,
    note: `Voici l'exercice du cours, en quatre phases. C'est le même projet du début à la fin : une API de prêt de matériel.
Une : créer l'API, dans le langage de votre choix, Go, TypeScript ou Rust. C'est là qu'on applique la méthode : les contrats d'abord, la structure discutée avec l'IA, les règles métier en TDD. Deux : sécuriser l'API avec l'IAM FerrisKey, c'est le schéma vu dans la partie sécurité : un jeton, une signature vérifiée, des rôles. Trois : créer un MCP, qui permet de lister les ressources depuis Claude. Quatre : sécuriser le MCP avec l'IAM, pour que l'agent n'agisse pas avec nos propres droits.
Chaque phase s'appuie sur la précédente : on ne sécurise que ce qui existe.`,
  },
];

type PhaseCfg = {
  n: number;
  title: string;
  goal: string;
  steps: string[];
  done: string[];
};

const PHASE_TABS = ['API', 'Sécu API', 'MCP', 'Sécu MCP'];

const makePhase = (cfg: PhaseCfg): Page => () => (
  <Slide section="TP">
    <Tag text={`Phase ${cfg.n} sur 4`} />
    <Title>{cfg.title}</Title>
    <p style={{ fontSize: 28, lineHeight: 1.45, color: muted, margin: '0 0 16px', maxWidth: 1700 }}>{cfg.goal}</p>
    <svg width={1700} height={510} viewBox="0 0 1700 510" style={{ marginTop: 0, flexShrink: 0 }}>
      {PHASE_TABS.map((tab, i) => {
        const current = i + 1 === cfg.n;
        return (
          <g key={tab} transform={`translate(${i * 212} 0)`}>
            <rect x={2} y={2} width={200} height={38} rx={19} fill={current ? '#EF7809' : '#fff'} stroke={current ? '#EF7809' : border} strokeWidth={3} />
            <text x={102} y={28} textAnchor="middle" fontFamily={mono} fontSize={20} fontWeight={700} fill={current ? '#fff' : muted}>
              {`${i + 1} ${tab}`}
            </text>
          </g>
        );
      })}
      <rect x={2} y={62} width={1016} height={96 + cfg.steps.length * 56 + cfg.steps.reduce((n, st) => n + st.split('\n').length - 1, 0) * 32} rx={6} fill={surface} stroke={border} strokeWidth={3} />
      <text x={30} y={112} fontFamily={mono} fontSize={30} fontWeight={700} fill="#EF7809">
        À faire
      </text>
      {cfg.steps.map((full, i) => {
        const [step, ...subs] = full.split('\n');
        const y = 156 + i * 56 + cfg.steps.slice(0, i).reduce((n, st) => n + st.split('\n').length - 1, 0) * 32;
        return (
          <g key={step}>
            <circle cx={52} cy={y} r={19} fill="#EF7809" />
            <text x={52} y={y + 7} textAnchor="middle" fontFamily={mono} fontSize={20} fontWeight={700} fill="#fff">
              {i + 1}
            </text>
            <text x={88} y={y + 8} fontSize={26} fill="#1c1917">
              {step}
            </text>
            {subs.map((sub, j) => (
              <text key={sub} x={88} y={y + 40 + j * 32} fontSize={25} fill={muted}>
                {sub}
              </text>
            ))}
          </g>
        );
      })}
      <rect x={1058} y={62} width={640} height={206} rx={6} fill={accentSoft} stroke="#EF7809" strokeWidth={3} />
      <text x={1086} y={112} fontFamily={mono} fontSize={28} fontWeight={700} fill="#EF7809">
        Terminé quand
      </text>
      {cfg.done.map((item, i) => (
        <g key={item}>
          <circle cx={1100} cy={152 + i * 38} r={13} fill="#16a34a" />
          <polyline points={`${1093},${152 + i * 38} ${1099},${158 + i * 38} ${1108},${146 + i * 38}`} fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={1126} y={160 + i * 38} fontSize={25} fill="#1c1917">
            {item}
          </text>
        </g>
      ))}
    </svg>
  </Slide>
);

const PhaseApi = makePhase({
  n: 1,
  title: 'Phase 1 : créer l’API',
  goal: 'Une API de prêt de matériel qui tourne, dans le langage de votre choix : Go, TypeScript ou Rust.',
  steps: [
    'Définir les contrats : endpoints, entrées, sorties, erreurs',
    'Questionner l’IA sur la structure, la comparer à l’hexagonale',
    'Écrire les règles métier en TDD : le test d’abord',
    'Implémenter les CRUDs, un par un, en TDD\nMatériel : créer · lister · lire · modifier · supprimer\nEmprunts : créer · lister · lire · rendre ou prolonger',
    'Brancher PostgreSQL et tout lancer avec Docker Compose',
  ],
  done: ['Les CRUDs répondent', 'Les tests passent', 'Tout tourne avec Docker Compose'],
});

const PhaseApiSecurity = makePhase({
  n: 2,
  title: 'Phase 2 : sécuriser l’API',
  goal: 'Seules les personnes connectées, avec le bon rôle, accèdent à l’API. L’identité vient de FerrisKey.',
  steps: [
    'Démarrer FerrisKey avec le realm et les utilisateurs fournis',
    'Obtenir un jeton pour un étudiant, un staff et un admin',
    'Vérifier la signature du jeton avec les clés publiques (JWKS)',
    'Contrôler le rôle dans le service, pas seulement le middleware',
  ],
  done: ['Sans jeton : 401', 'Un étudiant ne voit que ses emprunts', 'Un staff enregistre un retour'],
});

const PhaseMcp = makePhase({
  n: 3,
  title: 'Phase 3 : créer un MCP',
  goal: 'Un serveur MCP au-dessus de votre service, que Claude peut utiliser pour lister les ressources.',
  steps: [
    'Créer un serveur MCP qui appelle votre API',
    'Commencer en lecture seule : lister le catalogue, mes emprunts',
    'Puis les actions : « Emprunter XXX » et « Prolonger XXX »',
    'Tester depuis son IA, en langage naturel',
  ],
  done: ['Claude liste le catalogue', 'Chaque outil a une description claire', 'Un emprunt passe par le même service'],
});

const PhaseMcpSecurity = makePhase({
  n: 4,
  title: 'Phase 4 : sécuriser le MCP',
  goal: 'L’agent n’agit qu’avec les droits dont il a besoin, vérifiés par l’IAM, pas avec les vôtres sans limite.',
  steps: [
    'Faire valider le jeton par le serveur MCP',
    'Donner à l’agent un jeton limité : que les droits nécessaires',
    'Demander une confirmation pour les actions sensibles',
    'Tenter une attaque par prompt injection sur son propre MCP',
  ],
  done: ['L’agent ne voit pas les emprunts d’autrui', 'Une action sensible demande confirmation', 'L’attaque de test échoue'],
});

const phases: Entry[] = [
  {
    page: PhaseApi,
    note: `Phase 1 : créer l'API, dans le langage de votre choix, Go, TypeScript ou Rust. Quatre choses à faire : définir les contrats, questionner l'IA sur la structure et la comparer à l'architecture hexagonale, écrire les règles métier en TDD, brancher PostgreSQL et tout lancer avec Docker Compose.
C'est terminé quand les CRUDs répondent, que les tests passent, et que tout tourne avec Docker Compose. Le piège de cette phase : la concurrence. L'IA écrit « vérifier puis insérer », et deux emprunts simultanés du même exemplaire passent tous les deux.`,
  },
  {
    page: PhaseApiSecurity,
    note: `Phase 2 : sécuriser l'API avec FerrisKey. On démarre FerrisKey avec le realm et les utilisateurs fournis, on obtient un jeton pour un étudiant, un staff et un admin, on vérifie la signature du jeton avec les clés publiques, le JWKS, et on contrôle le rôle dans le service, pas seulement dans le middleware.
C'est terminé quand une requête sans jeton reçoit un 401, qu'un étudiant ne voit que ses emprunts, et qu'un staff peut enregistrer un retour. Le piège : l'autorisation. Un étudiant devine l'identifiant d'un autre emprunt et le lit. Il doit recevoir un 403 ou un 404.`,
  },
  {
    page: PhaseMcp,
    note: `Phase 3 : créer un MCP. On crée un serveur MCP qui appelle l'API. On commence par des outils en lecture seule, lister le catalogue et lister mes emprunts, puis on ajoute les actions qui modifient des données. Exemples de demandes faites à Claude : « emprunte un Raspberry Pi 5 pour moi », « prolonge mon emprunt », « rends le casque VR ». On teste depuis Claude Desktop, ou avec MCP Inspector.
C'est terminé quand Claude liste le catalogue, que chaque outil a une description claire, et qu'un emprunt passe par le même service que l'API. Le piège : la description d'un outil. Elle fait partie du code : une description floue, et le modèle utilise mal l'outil. Le SDK évolue vite, à vérifier avant le cours.`,
  },
  {
    page: PhaseMcpSecurity,
    note: `Phase 4 : sécuriser le MCP avec l'IAM. Le serveur MCP valide le jeton, l'agent reçoit un jeton limité aux droits nécessaires, les actions sensibles demandent une confirmation, et on tente une attaque par injection de prompt sur son propre serveur.
C'est terminé quand l'agent ne voit pas les emprunts d'un autre étudiant, qu'une action sensible demande confirmation, et que l'attaque de test échoue. Le piège : l'injection de prompt, une consigne cachée qui fait emprunter 50 exemplaires. C'est le moment de revenir sur le problème de l'agent qui agit en notre nom propre.`,
  },
];

// ─── Deck ─────────────────────────────────────────────────────────────────────
const deck: Entry[] = [
  ...opening,
  ...bases,
  ...cutoff,
  ...models,
  ...context,
  ...hype,
  ...mcp,
  ...secure,
  ...market,
  ...method,
  ...env,
  ...phases,
];

export const meta: SlideMeta = {
  title: 'Introduction à l\'IA',
  createdAt: '2026-10-28T12:05:36.340Z',
};
export default deck.map((e) => e.page) satisfies Page[];
export const notes = deck.map((e) => e.note);
