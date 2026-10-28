import React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { Step, Steps, useSlidePageNumber } from '@open-slide/core';
import grafanaBenchmark from './assets/grafana-benchmark.webp';

// ─── Design system ────────────────────────────────────────────────────────────
export const design: DesignSystem = {
  palette: { bg: '#fafaf9', text: '#1c1917', accent: '#EF7809' },
  fonts: {
    display: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    body: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  typeScale: { hero: 120, body: 34 },
  radius: 4,
};

// ─── Extra tokens ─────────────────────────────────────────────────────────────
const muted        = '#57534e';
const dim          = '#a8a29e';
const border       = '#d6d3d1';
const surface      = '#f5f5f4';
const accentSoft   = '#FDEBD6';
const mono         = '"JetBrains Mono", "Fira Code", ui-monospace, monospace';
const dangerColor  = '#B91C1C';
const warnColor    = '#B45309';
const successColor = '#047857';
const violet       = '#7C3AED';

// Code panel (dark) palette
const codeBg      = '#1c1917';
const codeText    = '#e7e5e4';
const codeKeyword = '#FDBA74';
const codeString  = '#86EFAC';
const codeComment = '#78716C';
const codeNumber  = '#FCD34D';
const codeVar     = '#F9A8D4';

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useFadeIn(delay = 0) {
  const [v, setV] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setV(true), delay + 40);
    return () => clearTimeout(t);
  }, []);
  const d = `${delay}ms`;
  return {
    opacity: v ? 1 : 0,
    transform: v ? 'translateY(0px)' : 'translateY(10px)',
    transition: `opacity 0.45s ${EASE_OUT} ${d}, transform 0.45s ${EASE_OUT} ${d}`,
  } as React.CSSProperties;
}

// ─── Layout primitives ───────────────────────────────────────────────────────
const fill: React.CSSProperties = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)' };
const page: React.CSSProperties = { ...fill, background: 'var(--osd-bg)', position: 'relative' };
const inner: React.CSSProperties = { padding: '90px 110px 0' };

const GridBackdrop = () => (
  <div aria-hidden style={{
    position: 'absolute', inset: 0,
    backgroundImage: `linear-gradient(${border} 1px, transparent 1px), linear-gradient(90deg, ${border} 1px, transparent 1px)`,
    backgroundSize: '80px 80px', opacity: 0.55,
    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
  }} />
);

// ─── Shared components ────────────────────────────────────────────────────────
function Footer({ section }: { section: string }) {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{
      position: 'absolute', bottom: 48, left: 110, right: 110,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: mono, fontSize: 16, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim,
    }}>
      <span>{section}</span>
      <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ color: muted }}>{String(current).padStart(2, '0')}</span>
        <span style={{ width: 20, height: 1, background: dim }} />
        <span>{String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return <div style={{ fontFamily: mono, fontSize: 17, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--osd-accent)', marginBottom: 24 }}>{text}</div>;
}
function H({ children, size = 56 }: { children: React.ReactNode; size?: number }) {
  return <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 700, margin: 0, lineHeight: 1.1, color: 'var(--osd-text)', letterSpacing: '-0.01em' }}>{children}</h2>;
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 34, lineHeight: 1.6, color: muted, margin: '24px 0 28px', maxWidth: 1500, fontWeight: 400 }}>{children}</p>;
}
function ColH({ children, accent = false, color }: { children: React.ReactNode; accent?: boolean; color?: string }) {
  const c = color ?? (accent ? 'var(--osd-accent)' : dim);
  return (
    <div style={{ fontFamily: mono, fontSize: 17, letterSpacing: '0.14em', textTransform: 'uppercase', color: c, borderBottom: `1.5px solid ${color ?? (accent ? 'var(--osd-accent)' : border)}`, paddingBottom: 10, marginBottom: 20 }}>{children}</div>
  );
}
function Code({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: mono, fontSize: '0.82em', background: accentSoft, color: 'var(--osd-text)', padding: '1px 8px', borderRadius: 3 }}>{children}</span>;
}
function B({ children, size = 30 }: { children: React.ReactNode; size?: number }) {
  return (
    <li style={{ listStyle: 'none', paddingLeft: 28, position: 'relative', marginBottom: 14, color: 'var(--osd-text)', fontSize: size, lineHeight: 1.5 }}>
      <span style={{ position: 'absolute', left: 0, top: '0.42em', width: 10, height: 10, borderRadius: '50%', background: 'var(--osd-accent)', opacity: 0.65 }} />
      {children}
    </li>
  );
}
function BW({ children, size = 30 }: { children: React.ReactNode; size?: number }) {
  return (
    <li style={{ listStyle: 'none', paddingLeft: 36, position: 'relative', marginBottom: 14, color: dangerColor, fontSize: size, lineHeight: 1.5 }}>
      <span style={{ position: 'absolute', left: 0, top: '0.05em', fontSize: size - 4 }}>⚠</span>
      {children}
    </li>
  );
}
function BG({ children, size = 30 }: { children: React.ReactNode; size?: number }) {
  return (
    <li style={{ listStyle: 'none', paddingLeft: 36, position: 'relative', marginBottom: 14, color: successColor, fontSize: size, lineHeight: 1.5 }}>
      <span style={{ position: 'absolute', left: 0, top: '0.05em', fontSize: size - 4 }}>✓</span>
      {children}
    </li>
  );
}
function DefRow({ term, full, desc }: { term: string; full?: string; desc: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: '14px 0', borderBottom: `1px solid ${border}` }}>
      <div style={{ fontFamily: mono, fontSize: 18, color: 'var(--osd-accent)', minWidth: 210, paddingTop: 6, letterSpacing: '0.06em', flexShrink: 0 }}>{term}{full && <div style={{ fontSize: 15, color: dim, letterSpacing: '0.02em', marginTop: 2 }}>{full}</div>}</div>
      <div style={{ fontSize: 28, color: 'var(--osd-text)', lineHeight: 1.45 }}>{desc}</div>
    </div>
  );
}
function FlowBox({ label, sub, accent = false }: { label: string; sub: string; accent?: boolean }) {
  return (
    <div style={{ flex: 1, background: accent ? 'var(--osd-accent)' : surface, border: `1px solid ${accent ? 'var(--osd-accent)' : border}`, borderRadius: 'var(--osd-radius)', padding: '18px 16px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 24, fontWeight: 600, color: accent ? '#ffffff' : 'var(--osd-text)', lineHeight: 1.2, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: mono, fontSize: 15, color: accent ? 'rgba(255,255,255,0.75)' : muted, letterSpacing: '0.02em', lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}
function Arrow() {
  return <div style={{ display: 'flex', alignItems: 'center', color: dim, fontSize: 26, flexShrink: 0 }}>→</div>;
}
function StepRow({ n, actor, action, detail }: { n: string; actor: string; action: React.ReactNode; detail?: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '44px 200px 1fr', columnGap: 24, padding: '13px 0', borderBottom: `1px solid ${border}`, alignItems: 'flex-start' }}>
      <div style={{ fontFamily: mono, fontSize: 16, color: 'var(--osd-accent)', paddingTop: 6 }}>{n}</div>
      <div style={{ fontFamily: mono, fontSize: 17, fontWeight: 600, color: 'var(--osd-text)', paddingTop: 5, letterSpacing: '0.04em', lineHeight: 1.4, textTransform: 'uppercase' }}>{actor}</div>
      <div>
        <div style={{ fontSize: 30, color: 'var(--osd-text)', lineHeight: 1.4 }}>{action}</div>
        {detail && <div style={{ fontSize: 22, color: muted, marginTop: 4, lineHeight: 1.4 }}>{detail}</div>}
      </div>
    </div>
  );
}
function Callout({ children, color = 'var(--osd-accent)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ borderLeft: `4px solid ${color}`, background: surface, padding: '18px 26px', fontSize: 28, lineHeight: 1.5, color: 'var(--osd-text)', borderRadius: '0 var(--osd-radius) var(--osd-radius) 0' }}>
      {children}
    </div>
  );
}

// ─── Syntax-highlighted code block ───────────────────────────────────────────
type Lang = 'bash' | 'ts' | 'dart' | 'gradle' | 'json' | 'sql' | 'text';

const KEYWORDS: Record<Lang, string[]> = {
  bash:   ['curl', 'jq', 'export'],
  ts:     ['const', 'async', 'await', 'function', 'return', 'type', 'new', 'if', 'throw', 'for', 'of', 'as', 'null', 'true', 'false', 'Promise', 'string', 'Error', 'import', 'from', 'export', 'try', 'catch', 'function', 'type', 'let'],
  dart:   ['final', 'const', 'await', 'async', 'Future', 'void', 'return', 'class', 'var', 'if', 'null'],
  gradle: ['android', 'defaultConfig'],
  json:   ['true', 'false', 'null'],
  sql:    ['CREATE', 'TABLE', 'SERIAL', 'PRIMARY', 'KEY', 'UNIQUE', 'TEXT'],
  text:   [],
};

const STRING_RE = String.raw`"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'` + '|`(?:[^`\\\\]|\\\\.)*`';

function highlight(src: string, lang: Lang): React.ReactNode[] {
  if (lang === 'text') return [src];
  const comment = lang === 'dart' || lang === 'gradle' || lang === 'ts' ? String.raw`\/\/.*` : lang === 'sql' ? '--.*' : '#.*';
  const kws = KEYWORDS[lang].join('|');
  const re = new RegExp(`(${comment})|(${STRING_RE})|(\\$\\w+)|\\b(${kws})\\b|\\b(\\d+)\\b`, 'g');
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(src)) !== null) {
    if (m.index > last) out.push(src.slice(last, m.index));
    const color = m[1] ? codeComment : m[2] ? codeString : m[3] ? codeVar : m[4] ? codeKeyword : codeNumber;
    out.push(<span key={k++} style={{ color, fontStyle: m[1] ? 'italic' : 'normal' }}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push(src.slice(last));
  return out;
}

function CodeBlock({ code, lang, title, size = 19 }: { code: string; lang: Lang; title?: string; size?: number }) {
  return (
    <div style={{ background: codeBg, borderRadius: 'var(--osd-radius)', overflow: 'hidden' }}>
      {title && (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontFamily: mono, fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a8a29e' }}>
          <span>{title}</span>
          <span style={{ color: codeKeyword }}>{lang}</span>
        </div>
      )}
      <pre style={{ margin: 0, padding: '16px 20px', fontFamily: mono, fontSize: size, lineHeight: 1.55, color: codeText, whiteSpace: 'pre' }}>
        {highlight(code.replace(/^\n/, '').replace(/\n\s*$/, ''), lang)}
      </pre>
    </div>
  );
}

// ─── Sequence diagram (SVG) ──────────────────────────────────────────────────
type SeqLayout = { xs: number[]; top: number; rowH: number; rows: number; animated: boolean };
const SeqCtx = React.createContext<SeqLayout>({ xs: [], top: 0, rowH: 60, rows: 1, animated: false });
const SEQ_STEP_S = 1.1;

function SeqDiagram({ actors, rows, rowH, width = 1700, animated = false, children }: { actors: string[]; rows: number; rowH: number; width?: number; animated?: boolean; children: React.ReactNode }) {
  const colW = width / actors.length;
  const xs = actors.map((_, i) => colW * i + colW / 2);
  const top = 72;
  const height = top + rows * rowH + 16;
  const boxW = Math.min(colW - 30, 300);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <marker id="seq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'var(--osd-accent)' }} />
        </marker>
        <marker id="seq-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={muted} />
        </marker>
      </defs>
      {xs.map((x, i) => (
        <g key={actors[i]}>
          <line x1={x} y1={52} x2={x} y2={height} stroke={border} strokeWidth={2} strokeDasharray="6 6" />
          <rect x={x - boxW / 2} y={0} width={boxW} height={52} rx={4} fill={surface} stroke="var(--osd-text)" strokeWidth={1.5} />
          <text x={x} y={33} textAnchor="middle" style={{ fontFamily: mono, fontSize: 19, fontWeight: 700, fill: 'var(--osd-text)' }}>{actors[i]}</text>
        </g>
      ))}
      <SeqCtx.Provider value={{ xs, top, rowH, rows, animated }}>{children}</SeqCtx.Provider>
    </svg>
  );
}

function Msg({ row, from, to, label, sub, n, reply = false }: { row: number; from: number; to: number; label: string; sub?: string; n: number; reply?: boolean }) {
  const { xs, top, rowH, rows, animated } = React.useContext(SeqCtx);
  const y = top + row * rowH + (sub ? rowH * 0.5 : rowH * 0.62);
  const x1 = xs[from];
  const x2 = xs[to];
  const mid = (x1 + x2) / 2;
  const color = reply ? muted : 'var(--osd-accent)';
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 + (x2 > x1 ? -4 : 4)} y2={y} strokeWidth={2.5} strokeDasharray={reply ? '8 6' : undefined}
            style={{ stroke: color }} markerEnd={reply ? 'url(#seq-arrow-muted)' : 'url(#seq-arrow)'} />
      <text x={mid} y={y - 12} textAnchor="middle" style={{ fontFamily: mono, fontSize: 19, fill: 'var(--osd-text)' }}>
        <tspan style={{ fill: 'var(--osd-accent)', fontWeight: 700 }}>{n}. </tspan>{label}
      </text>
      {sub && <text x={mid} y={y + 28} textAnchor="middle" style={{ fontFamily: mono, fontSize: 16, fill: muted }}>{sub}</text>}
      {animated && <FlowDot x1={x1} x2={x2} y={y} row={row} rows={rows} color={color} />}
    </g>
  );
}

// A dot travelling along one arrow; rows play one after another, then loop.
function FlowDot({ x1, x2, y, row, rows, color }: { x1: number; x2: number; y: number; row: number; rows: number; color: string }) {
  const start = row / rows;
  const end = (row + 1) / rows;
  const dur = `${rows * SEQ_STEP_S}s`;
  return (
    <circle r={8} cx={0} cy={0} style={{ fill: color }} opacity={0}>
      <animateMotion dur={dur} repeatCount="indefinite" path={`M ${x1} ${y} L ${x2} ${y}`}
                     keyPoints="0;0;1;1" keyTimes={`0;${start};${end};1`} calcMode="linear" />
      <animate attributeName="opacity" dur={dur} repeatCount="indefinite"
               values="0;1;0" keyTimes={`0;${start};${end}`} calcMode="discrete" />
    </circle>
  );
}

function Note({ row, at, text, n }: { row: number; at: number; text: string; n: number }) {
  const { xs, top, rowH } = React.useContext(SeqCtx);
  const w = text.length * 9.4 + 60;
  const h = Math.min(rowH - 14, 46);
  const y = top + row * rowH + (rowH - h) / 2;
  return (
    <g>
      <rect x={xs[at] - w / 2} y={y} width={w} height={h} rx={4} fill={accentSoft} stroke="var(--osd-accent)" strokeWidth={1} />
      <text x={xs[at]} y={y + h / 2 + 7} textAnchor="middle" style={{ fontFamily: 'var(--osd-font-body)', fontSize: 19, fill: 'var(--osd-text)' }}>
        <tspan style={{ fill: 'var(--osd-accent)', fontWeight: 700, fontFamily: mono }}>{n}. </tspan>{text}
      </text>
    </g>
  );
}

// ─── Domain-specific components ──────────────────────────────────────────────
function AgendaRow({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', columnGap: 28, padding: '18px 0', borderTop: `1px solid ${border}`, alignItems: 'baseline' }}>
      <div style={{ fontFamily: mono, fontSize: 17, color: 'var(--osd-accent)', paddingTop: 3 }}>{n}</div>
      <div>
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 600, color: 'var(--osd-text)', letterSpacing: '-0.01em' }}>{title}</span>
        <span style={{ fontSize: 24, color: dim, marginLeft: 18 }}>{desc}</span>
      </div>
    </div>
  );
}

function TRow({ label, a, b, head = false }: { label: string; a: React.ReactNode; b: React.ReactNode; head?: boolean }) {
  const cell: React.CSSProperties = head
    ? { fontFamily: mono, fontSize: 17, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--osd-accent)' }
    : { fontSize: 26, color: 'var(--osd-text)', lineHeight: 1.4 };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 1fr', columnGap: 32, padding: head ? '0 0 12px' : '11px 0', borderBottom: `${head ? 2 : 1}px solid ${head ? 'var(--osd-accent)' : border}` }}>
      <div style={{ ...cell, fontFamily: mono, fontSize: head ? 17 : 19, color: head ? 'var(--osd-accent)' : muted, letterSpacing: '0.06em', textTransform: 'uppercase', paddingTop: head ? 0 : 5 }}>{label}</div>
      <div style={cell}>{a}</div>
      <div style={cell}>{b}</div>
    </div>
  );
}

function WhyCard({ tag, title, color, children }: { tag: string; title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderTop: `3px solid ${color}`, borderRadius: 'var(--osd-radius)', padding: '22px 28px' }}>
      <div style={{ fontFamily: mono, fontSize: 15, color, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>{tag}</div>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700, color: 'var(--osd-text)', marginBottom: 12, letterSpacing: '-0.01em' }}>{title}</div>
      <div style={{ fontSize: 26, color: muted, lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}

function KeyCard({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 'var(--osd-radius)', padding: '22px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12 }}>
        <span style={{ fontFamily: mono, fontSize: 18, color: 'var(--osd-accent)' }}>{n}</span>
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700, color: 'var(--osd-text)', letterSpacing: '-0.01em' }}>{title}</span>
      </div>
      <div style={{ fontSize: 25, color: muted, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

// ─── Page 01: Cover ───────────────────────────────────────────────────────────
const P01Cover: Page = () => {
  const f0 = useFadeIn(0);
  const f1 = useFadeIn(100);
  const f2 = useFadeIn(230);
  return (
    <div style={{ ...page, overflow: 'hidden' }}>
      <GridBackdrop />
      <div style={{ padding: '0 110px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={f0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 52 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--osd-accent)', boxShadow: '0 0 18px rgba(239,120,9,0.35)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: mono, fontSize: 17, color: 'var(--osd-accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>BTS SIO 2 · SLAM / SISR · Cybersécurité</span>
          </div>
        </div>
        <div style={f1}>
          <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', fontWeight: 700, lineHeight: 1.07, letterSpacing: '-0.02em', margin: '0 0 44px', color: 'var(--osd-text)' }}>
            IAM<br />&amp; FerrisKey
          </h1>
        </div>
        <div style={f2}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, maxWidth: 1200 }}>
            <div style={{ width: 4, background: 'var(--osd-accent)', opacity: 0.7, alignSelf: 'stretch', flexShrink: 0 }} />
            <p style={{ fontSize: 36, color: muted, lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
              Identités, tokens et OAuth2 / OIDC : de la théorie à l'intégration dans un backend et une app Flutter
            </p>
          </div>
        </div>
      </div>
      <Footer section="IAM & FerrisKey" />
    </div>
  );
};

// ─── Page 02: Sommaire ────────────────────────────────────────────────────────
const P02Agenda: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="Sommaire" /></div>
        <div style={f2}><H size={60}>Au programme</H></div>
        <div style={{ ...f3, marginTop: 40 }}>
          <AgendaRow n="01" title="Fondamentaux IAM" desc="L'histoire de John, ce qu'est un IAM, auth classique" />
          <AgendaRow n="02" title="Tokens" desc="Opaque Access Token vs JWT, stateful vs stateless" />
          <AgendaRow n="03" title="Fédération d'identité" desc="IdP, OIDC vs SAML, broker, liaison de comptes" />
          <AgendaRow n="04" title="Pourquoi FerrisKey ?" desc="Présentation, comparaison avec Keycloak, alternatives" />
          <AgendaRow n="05" title="Server-to-Server" desc="Client Credentials · TP 1 à 3 : script, API et service backend" />
          <AgendaRow n="06" title="Client-to-FerrisKey" desc="Authorization Code + PKCE · TP 4 : app Flutter ou Vue.js" />
          <AgendaRow n="07" title="Synthèse" desc="Les points clés à retenir" />
        </div>
      </div>
      <Footer section="Sommaire" />
    </div>
  );
};

// ─── Prologue: l'histoire de John ─────────────────────────────────────────────
function Bubble({ when, who, children }: { when: string; who: string; children: React.ReactNode }) {
  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: '4px 18px 18px 18px', padding: '14px 22px', marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 15, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
        <span style={{ color: 'var(--osd-accent)' }}>{who}</span>
        <span style={{ color: dim }}>{when}</span>
      </div>
      <div style={{ fontSize: 27, color: 'var(--osd-text)', lineHeight: 1.4 }}>{children}</div>
    </div>
  );
}

function TimeBar({ label, product, note }: { label: string; product: number; note?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 330px', columnGap: 24, alignItems: 'center', marginBottom: 18 }}>
      <div style={{ fontFamily: mono, fontSize: 18, color: muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'flex', height: 46, borderRadius: 'var(--osd-radius)', overflow: 'hidden', fontFamily: mono, fontSize: 17, color: '#ffffff' }}>
        <div style={{ width: `${product}%`, background: successColor, display: 'flex', alignItems: 'center', paddingLeft: product > 8 ? 14 : 0 }}>{product > 8 ? `${product}%` : ''}</div>
        <div style={{ flex: 1, background: 'var(--osd-accent)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 14 }}>{100 - product}%</div>
      </div>
      <div style={{ fontSize: 22, color: muted, fontStyle: 'italic' }}>{note}</div>
    </div>
  );
}

function AppBox({ name, children }: { name: string; children?: React.ReactNode }) {
  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 'var(--osd-radius)', padding: '14px 18px', textAlign: 'center', flex: 1 }}>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, fontWeight: 700, color: 'var(--osd-text)' }}>{name}</div>
      {children}
    </div>
  );
}

function HomeMadeAuth() {
  return <div style={{ marginTop: 8, fontFamily: mono, fontSize: 14, color: dangerColor, background: '#FEE2E2', borderRadius: 3, padding: '4px 6px' }}>users + auth maison</div>;
}

const DAY_ONE_SQL = `
-- Jour 1, 23h47. « Ça prend 2 heures, max. »
CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  email    TEXT UNIQUE,
  password TEXT  -- on hashera plus tard
);
`;

const PStory1: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="Prologue · Une histoire (presque) vraie" /></div>
        <div style={f2}><H>John a une idée géniale</H></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 44, alignItems: 'start' }}>
          <div style={f3}>
            <p style={{ fontSize: 34, lineHeight: 1.55, color: 'var(--osd-text)', margin: '0 0 28px' }}>
              John, ex-BTS SIO, lance <strong>Révizz</strong> : une app où les élèves partagent leurs fiches de révision.
            </p>
            <ul style={{ margin: 0, padding: 0 }}>
              <B>Son vrai sujet : les fiches, les quiz, le partage</B>
              <B>Mais d'abord, il faut « un petit login »</B>
              <B>Un formulaire, une table, c'est plié</B>
            </ul>
          </div>
          <div style={f4}>
            <CodeBlock lang="sql" title="schema.sql" size={20} code={DAY_ONE_SQL} />
            <div style={{ fontSize: 24, color: muted, marginTop: 16, fontStyle: 'italic' }}>
              Spoiler : il a oublié. On le lui a rappelé… un vendredi à 17h58.
            </div>
          </div>
        </div>
      </div>
      <Footer section="Prologue · L'histoire de John" />
    </div>
  );
};

const PStory2: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="Prologue · Six mois plus tard" /></div>
        <div style={f2}><H>« Juste une petite feature… »</H></div>
        <div style={{ ...f3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 40 }}>
          <div>
            <Steps>
              <Step><Bubble who="Un élève" when="Semaine 2">J'ai oublié mon mot de passe 😭</Bubble></Step>
              <Step><Bubble who="Tous les élèves" when="Mois 1">Tu peux mettre « Continuer avec Google » ?</Bubble></Step>
              <Step><Bubble who="Le lycée" when="Mois 2">Nos profs doivent se connecter avec l'ENT (SSO)</Bubble></Step>
              <Step><Bubble who="Le RSSI" when="Mois 3">MFA obligatoire pour les comptes profs. Lundi.</Bubble></Step>
            </Steps>
          </div>
          <div>
            <Steps>
              <Step><Bubble who="Un élève" when="Mois 4">Pourquoi j'ai pas Face ID comme partout ? (passkeys)</Bubble></Step>
              <Step><Bubble who="La DPO" when="Mois 5">RGPD : export et suppression des données, on en est où ?</Bubble></Step>
              <Step><Bubble who="La proviseure" when="Mois 6">Il faut des rôles : élève, prof, parent, admin…</Bubble></Step>
              <Step><Bubble who="Un parent" when="Mois 6">… et je ne dois voir QUE les fiches de ma fille.</Bubble></Step>
            </Steps>
          </div>
        </div>
      </div>
      <Footer section="Prologue · L'histoire de John" />
    </div>
  );
};

const PStory3: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="Prologue · Le relevé de temps" /></div>
        <div style={f2}><H>Où passe le temps de John ?</H></div>
        <div style={{ ...f3, marginTop: 44 }}>
          <div style={{ display: 'flex', gap: 32, fontFamily: mono, fontSize: 17, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24, marginLeft: 164 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: successColor }}><span style={{ width: 16, height: 16, background: successColor, borderRadius: 2 }} />Révizz (le produit)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--osd-accent)' }}><span style={{ width: 16, height: 16, background: 'var(--osd-accent)', borderRadius: 2 }} />L'authentification</span>
          </div>
          <TimeBar label="Mois 1" product={90} note="« le login, c'est fait »" />
          <TimeBar label="Mois 2" product={65} note="reset de mdp + Google" />
          <TimeBar label="Mois 3" product={40} note="SAML… c'est quoi SAML ?" />
          <TimeBar label="Mois 4" product={25} note="MFA, TOTP, WebAuthn" />
          <TimeBar label="Mois 6" product={10} note="rôles, RGPD, audit" />
        </div>
        <div style={{ ...f4, marginTop: 36 }}>
          <Callout>Révizz est devenue une excellente solution d'authentification… qui propose aussi des fiches de révision.</Callout>
        </div>
      </div>
      <Footer section="Prologue · L'histoire de John" />
    </div>
  );
};

const PStory4: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(150); const f3 = useFadeIn(400);
  return (
    <div style={page}>
      <div style={{ ...inner, paddingTop: 150 }}>
        <div style={f1}><Tag text="Prologue · Le rebondissement" /></div>
        <div style={f2}>
          <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 96, fontWeight: 700, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--osd-text)' }}>Vendredi, 17h58.</h2>
          <p style={{ fontSize: 38, color: muted, lineHeight: 1.5, margin: '32px 0 48px', maxWidth: 1400 }}>
            Un mail : « Bonjour John, les 12 000 comptes Révizz sont en vente sur une plateforme. »
          </p>
        </div>
        <div style={f3}>
          <ColH color={dangerColor}>L'enquête du week-end</ColH>
          <ul style={{ margin: 0, padding: 0 }}>
            <BW>Mots de passe en MD5 sans sel, « temporairement », depuis le jour 1</BW>
            <BW>Aucune limite de tentatives sur /login</BW>
            <BW>Le lien de réinitialisation n'expirait jamais</BW>
          </ul>
        </div>
      </div>
      <Footer section="Prologue · L'histoire de John" />
    </div>
  );
};

const PStory5: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="Prologue · Le diagnostic" /></div>
        <div style={f2}><H>L'auth n'était pas son métier</H></div>
        <div style={{ ...f3, marginTop: 44 }}>
          <ColH color={dangerColor}>Chaque app réinvente la roue</ColH>
          <div style={{ display: 'flex', gap: 24 }}>
            <AppBox name="Révizz"><HomeMadeAuth /></AppBox>
            <AppBox name="App profs"><HomeMadeAuth /></AppBox>
            <AppBox name="Back-office"><HomeMadeAuth /></AppBox>
          </div>
        </div>
        <div style={{ ...f4, marginTop: 40 }}>
          <ul style={{ margin: 0, padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 56 }}>
            <BW size={28}>3 bases d'utilisateurs à synchroniser</BW>
            <BW size={28}>3 mots de passe différents par prof</BW>
            <BW size={28}>Un prof parti reste actif dans l'app oubliée</BW>
            <BW size={28}>3 fois les mêmes failles à corriger</BW>
            <BW size={28}>Aucune vue d'ensemble : qui accède à quoi ?</BW>
            <BW size={28}>Chaque nouvelle app repart de zéro</BW>
          </ul>
          <div style={{ marginTop: 28 }}>
            <Callout color={dangerColor}>Le problème n'est pas John : c'est que chaque application gère elle-même l'identité.</Callout>
          </div>
        </div>
      </div>
      <Footer section="Prologue · L'histoire de John" />
    </div>
  );
};

const PStoryBridge: Page = () => {
  const f0 = useFadeIn(0); const f1 = useFadeIn(120); const f2 = useFadeIn(320);
  return (
    <div style={{ ...page, overflow: 'hidden' }}>
      <GridBackdrop />
      <div style={{ padding: '0 110px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={f0}><Tag text="Prologue · Le tournant" /></div>
        <div style={f1}>
          <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 110, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 44px', color: 'var(--osd-text)' }}>
            <span style={{ color: 'var(--osd-accent)' }}>Déléguez</span> ce que<br />vous ne maîtrisez pas.
          </h2>
        </div>
        <div style={f2}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, maxWidth: 1200 }}>
            <div style={{ width: 4, background: 'var(--osd-accent)', opacity: 0.7, alignSelf: 'stretch', flexShrink: 0 }} />
            <p style={{ fontSize: 36, color: muted, lineHeight: 1.5, margin: 0 }}>L'IAM est votre meilleur ami.</p>
          </div>
        </div>
      </div>
      <Footer section="Prologue · L'histoire de John" />
    </div>
  );
};

const PIamOverview: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(300);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="Prologue · L'IAM en bref" /></div>
        <div style={f2}><H>Un IAM, concrètement</H></div>
        <div style={{ ...f3, fontFamily: mono, fontSize: 30, marginTop: 28, color: muted, letterSpacing: '0.02em' }}>
          <strong style={{ color: 'var(--osd-accent)' }}>I</strong>dentity &amp; <strong style={{ color: 'var(--osd-accent)' }}>A</strong>ccess <strong style={{ color: 'var(--osd-accent)' }}>M</strong>anagement
          <span style={{ fontFamily: 'var(--osd-font-body)', fontSize: 28, color: dim, marginLeft: 20 }}>(gestion des identités et des accès)</span>
        </div>
        <div style={f3}>
          <Lead>Un service dédié qui répond, pour toutes vos applications, à deux questions :<br /><strong style={{ color: 'var(--osd-text)' }}>qui es-tu&nbsp;?</strong> et <strong style={{ color: 'var(--osd-text)' }}>as-tu le droit&nbsp;?</strong></Lead>
        </div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <KeyCard n="01" title="Gérer les identités">Comptes, groupes, arrivées et départs, au même endroit.</KeyCard>
          <KeyCard n="02" title="Authentifier">Mot de passe, MFA, passkeys, anti brute-force.</KeyCard>
          <KeyCard n="03" title="Fédérer">SSO entre apps, connexion Google ou ENT.</KeyCard>
          <KeyCard n="04" title="Autoriser">Rôles et permissions, gérés sans toucher au code.</KeyCard>
          <KeyCard n="05" title="Émettre des tokens">Standards OAuth2 / OIDC, compris par toutes les apps.</KeyCard>
          <KeyCard n="06" title="Tracer">Journal des connexions et des accès, preuve pour le RGPD.</KeyCard>
        </div>
      </div>
      <Footer section="Prologue · L'histoire de John" />
    </div>
  );
};

const PStory6: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="Prologue · La solution" /></div>
        <div style={f2}><H>Sortir l'identité des applications</H></div>
        <div style={{ ...f3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, marginTop: 44, alignItems: 'start' }}>
          <div>
            <ColH color={successColor}>Après : les apps délèguent à un IAM</ColH>
            <div style={{ display: 'flex', gap: 16 }}>
              <AppBox name="Révizz" />
              <AppBox name="App profs" />
              <AppBox name="Back-office" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', color: dim, fontFamily: mono, fontSize: 17, margin: '10px 0' }}>
              <span>↕ token</span><span>↕ token</span><span>↕ token</span>
            </div>
            <FlowBox label="IAM" sub="utilisateurs · login · MFA · passkeys · rôles · audit" accent />
          </div>
          <div>
            <ColH accent>Les notions clés</ColH>
            <DefRow term="IdP" desc="Fournisseur d'identité : le seul à connaître les mots de passe" />
            <DefRow term="Délégation" desc={<>L'app redirige vers l'IdP et reçoit un token (OAuth2 / OIDC)<br /><span style={{ fontSize: 24, color: muted }}>ex. « Se connecter avec Google, Discord, GitHub »</span></>} />
            <DefRow term="SSO" desc={<>Une connexion, toutes les applications<br /><span style={{ fontSize: 24, color: muted }}>ex. Google Workspace : Gmail, Drive, Meet avec un seul compte</span></>} />
            <DefRow term="Source unique" desc="Désactiver un compte une fois, il l'est partout" />
          </div>
        </div>
        <div style={{ ...f4, marginTop: 44 }}>
          <Callout>Un <strong>IAM</strong>, c'est confier l'identité à un service spécialisé… pour que John retourne coder des fiches de révision.</Callout>
        </div>
      </div>
      <Footer section="Prologue · L'histoire de John" />
    </div>
  );
};

// ─── Page 04: Authentification classique ─────────────────────────────────────
const P04ClassicAuth: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="01 · Fondamentaux" /></div>
        <div style={f2}><H>Authentification classique</H></div>
        <div style={{ ...f3, marginTop: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
            <div>
              <ColH accent>Basic Auth (HTTP)</ColH>
              <SeqDiagram actors={['Client', 'API']} rows={3} rowH={84} width={822} animated>
                <Msg row={0} n={1} from={0} to={1} label="GET /notes" sub="Authorization: Basic YWxpY2U6czNjcjN0" />
                <Msg row={1} n={2} from={1} to={0} reply label="200 OK" />
                <Msg row={2} n={3} from={0} to={1} label="GET /profil" sub="Basic YWxpY2U6czNjcjN0… encore !" />
              </SeqDiagram>
              <div style={{ fontFamily: mono, fontSize: 17, color: muted, marginTop: 8 }}>YWxpY2U6czNjcjN0 = base64("alice:s3cr3t")</div>
              <ul style={{ margin: '20px 0 0', padding: 0 }}>
                <B size={26}>Identifiants renvoyés à <strong>chaque</strong> requête</B>
                <B size={26}>Pas de déconnexion, pas de MFA</B>
              </ul>
            </div>
            <div>
              <ColH accent>Email / Password + session</ColH>
              <SeqDiagram actors={['Navigateur', 'Serveur']} rows={3} rowH={84} width={822} animated>
                <Msg row={0} n={1} from={0} to={1} label="POST /login" sub="{ email, password }" />
                <Msg row={1} n={2} from={1} to={0} reply label="Set-Cookie: session=8f3a…" sub="HttpOnly · Secure" />
                <Msg row={2} n={3} from={0} to={1} label="GET /notes" sub="Cookie: session=8f3a…" />
              </SeqDiagram>
              <div style={{ fontFamily: mono, fontSize: 17, color: muted, marginTop: 8 }}>le mot de passe ne circule qu'une fois</div>
              <ul style={{ margin: '20px 0 0', padding: 0 }}>
                <B size={26}>Mot de passe envoyé une seule fois</B>
                <B size={26}>À recoder dans <strong>chaque</strong> application</B>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 36 }}>
            <ColH color={dangerColor}>Vulnérabilités fréquentes</ColH>
            <ul style={{ margin: 0, padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 56 }}>
              <BW size={27}>Base64 ≠ chiffrement : HTTPS obligatoire</BW>
              <BW size={27}>Brute force &amp; credential stuffing</BW>
              <BW size={27}>Mdp stockés en clair / MD5 → Argon2id</BW>
              <BW size={27}>Session fixation, cookie sans HttpOnly</BW>
            </ul>
          </div>
        </div>
      </div>
      <Footer section="01 · Fondamentaux IAM" />
    </div>
  );
};

// ─── Page 05a: Pourquoi des tokens ? ─────────────────────────────────────────
const P05aWhyTokens: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(280);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="02 · Tokens" /></div>
        <div style={f2}><H>Pourquoi des tokens ?</H></div>
        <div style={f3}>
          <Lead>Après la connexion, le client reçoit un <strong style={{ color: 'var(--osd-text)' }}>jeton</strong> : une preuve temporaire qui remplace le mot de passe dans chaque requête.</Lead>
        </div>
        <div style={{ ...f4, display: 'flex', gap: 12, alignItems: 'stretch' }}>
          <FlowBox label="Login" sub="identifiants, une seule fois" />
          <Arrow />
          <FlowBox label="IAM" sub="vérifie et émet les tokens" accent />
          <Arrow />
          <FlowBox label="Client" sub="conserve les tokens" />
          <Arrow />
          <FlowBox label="API" sub="Authorization: Bearer <token>" />
        </div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28, marginTop: 44 }}>
          <WhyCard tag="Accès · minutes" title="Access token" color="var(--osd-accent)">
            Envoyé à chaque appel d'API. Durée de vie courte : 5 à 15 minutes.
          </WhyCard>
          <WhyCard tag="Renouvellement · jours" title="Refresh token" color={violet}>
            Sert uniquement à obtenir un nouvel access token, sans redemander le mot de passe.
          </WhyCard>
          <WhyCard tag="Identité · OIDC" title="ID token" color={successColor}>
            Décrit l'utilisateur au client (nom, email). Jamais envoyé à une API.
          </WhyCard>
        </div>
      </div>
      <Footer section="02 · Tokens" />
    </div>
  );
};

// ─── Page 05b: Opaque Access Token ───────────────────────────────────────────
const P05bOpaque: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="02 · Tokens" /></div>
        <div style={f2}><H>Opaque Access Token (OAT)</H></div>
        <div style={f3}>
          <Lead>Une chaîne aléatoire sans signification : seul l'IAM sait à qui et à quoi elle correspond.</Lead>
          <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 56 }}>
            <div>
              <ColH accent>Validation par introspection (RFC 7662)</ColH>
              <SeqDiagram actors={['Client', 'API', 'IAM']} rows={5} rowH={62} width={913} animated>
                <Msg row={0} n={1} from={0} to={1} label="GET /notes · Bearer 8Qm3…" />
                <Msg row={1} n={2} from={1} to={2} label="POST /token/introspect" />
                <Note row={2} n={3} at={2} text="lecture en BDD" />
                <Msg row={3} n={4} from={2} to={1} reply label='{ "active": true, "sub": "42" }' />
                <Msg row={4} n={5} from={1} to={0} reply label="200 · les notes" />
              </SeqDiagram>
              <div style={{ fontSize: 24, color: muted, marginTop: 14, lineHeight: 1.5 }}>
                L'API ne peut rien déduire du token seul : elle <strong>doit</strong> demander à l'IAM.
              </div>
            </div>
            <div>
              <ColH color={successColor}>Avantages</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <BG size={27}>Révocation immédiate</BG>
                <BG size={27}>Aucune donnée exposée</BG>
                <BG size={27}>Token court et simple</BG>
              </ul>
              <div style={{ marginTop: 24 }}>
                <ColH color={dangerColor}>Inconvénients</ColH>
                <ul style={{ margin: 0, padding: 0 }}>
                  <BW size={27}>L'IAM se fait spammer à chaque requête</BW>
                  <BW size={27}>L'IAM devient critique : s'il est lent, il ralentit <strong>toutes</strong> les apps</BW>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer section="02 · Tokens" />
    </div>
  );
};

// ─── Page 05c: Anatomie d'un JWT ─────────────────────────────────────────────
const JWT_HEADER = `
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "k1"
}
`;

const JWT_PAYLOAD = `
{
  "iss": "https://auth.lycee.fr/realms/bts-sio",
  "sub": "42",
  "aud": "api-notes",
  "exp": 1790694000,
  "iat": 1790693700,
  "roles": ["prof"]
}
`;

function SigKeyRow({ icon, name, desc, color = successColor }: { icon: string; name: string; desc: string; color?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '36px 170px 1fr', alignItems: 'baseline', padding: '8px 0', borderBottom: `1px solid ${border}` }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span style={{ fontFamily: mono, fontSize: 18, color, letterSpacing: '0.04em' }}>{name}</span>
      <span style={{ fontSize: 25, color: 'var(--osd-text)', lineHeight: 1.4 }}>{desc}</span>
    </div>
  );
}

const P05cJwtAnatomy: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="02 · Tokens" /></div>
        <div style={f2}><H>Anatomie d'un JWT (RFC 7519)</H></div>
        <div style={f3}>
          <div style={{ fontFamily: mono, fontSize: 24, background: surface, border: `1px solid ${border}`, borderRadius: 'var(--osd-radius)', padding: '16px 22px', margin: '32px 0 28px', wordBreak: 'break-all' }}>
            <span style={{ color: dangerColor }}>eyJhbGciOiJSUzI1NiIsImtpZCI6ImsxIn0</span>
            <span style={{ color: dim }}>.</span>
            <span style={{ color: violet }}>eyJzdWIiOiI0MiIsImV4cCI6MTcyNywicm9sZXMiOlsicHJvZiJdfQ</span>
            <span style={{ color: dim }}>.</span>
            <span style={{ color: successColor }}>SflKxwRJSMeKKF2QT4fw…</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 40, alignItems: 'start' }}>
            <div>
              <ColH color={dangerColor}>Header : comment vérifier</ColH>
              <CodeBlock lang="json" size={18} code={JWT_HEADER} />
              <div style={{ marginTop: 22 }}>
                <ColH color={successColor}>Signature : les clés</ColH>
                <div style={{ fontFamily: mono, fontSize: 18, color: muted, marginBottom: 10 }}>RS256( header.payload , clé privée )</div>
                <SigKeyRow icon="🔒" name="Clé privée" desc="Reste dans l'IAM, sert à signer" />
                <SigKeyRow icon="🔓" name="Clé publique" desc="Publiée via JWKS, sert à vérifier" />
                <SigKeyRow icon="🏷" name="kid" desc="Désigne la clé → rotation possible" />
              </div>
            </div>
            <div>
              <ColH color={violet}>Payload : les claims</ColH>
              <CodeBlock lang="json" size={18} code={JWT_PAYLOAD} />
              <div style={{ marginTop: 22 }}>
                <Callout color={dangerColor}>Base64URL ≠ chiffrement : n'importe qui peut <strong>lire</strong> un JWT. Seule la signature empêche de le <strong>modifier</strong>.</Callout>
              </div>
              <div style={{ marginTop: 26 }}>
                <ColH>Pourquoi une paire de clés ?</ColH>
                <SigKeyRow icon="⚠" color={dangerColor} name="HS256" desc="Un secret partagé : qui vérifie peut aussi signer" />
                <SigKeyRow icon="✓" name="RS256 / ES256" desc="Seul l'IAM signe, tout le monde vérifie" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer section="02 · Tokens" />
    </div>
  );
};

// ─── Page 05d: Les claims ────────────────────────────────────────────────────
const P05dClaims: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="02 · Tokens" /></div>
        <div style={f2}><H>Les claims à connaître</H></div>
        <div style={f3}>
          <Lead>Un <em>claim</em> est une affirmation signée par l'IAM à propos du porteur du token.</Lead>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <ColH accent>À vérifier systématiquement</ColH>
              <DefRow term="iss" full="issuer" desc="Qui a émis le token (URL du realm)" />
              <DefRow term="aud" full="audience" desc="À qui il est destiné (ton API ?)" />
              <DefRow term="exp" full="expiration time" desc="Date d'expiration (timestamp Unix)" />
              <DefRow term="sub" full="subject" desc="Identifiant stable de l'utilisateur" />
            </div>
            <div>
              <ColH>Utiles selon le contexte</ColH>
              <DefRow term="iat / nbf" full="issued at / not before" desc="Émis à / pas valide avant" />
              <DefRow term="jti" full="JWT ID" desc="Identifiant unique du token (anti-rejeu)" />
              <DefRow term="scope" desc="Ce que le client peut faire" />
              <DefRow term="roles" full="claim privé" desc="Claim privé : rôles RBAC de l'utilisateur" />
            </div>
          </div>
          <div style={{ marginTop: 40 }}>
            <Callout color={dangerColor}>Jamais de donnée sensible dans le payload : mot de passe, n° de sécurité sociale, notes, données de santé…</Callout>
          </div>
        </div>
      </div>
      <Footer section="02 · Tokens" />
    </div>
  );
};

// ─── Page 05e: Valider un JWT ────────────────────────────────────────────────
const P05eValidate: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="02 · Tokens" /></div>
        <div style={f2}><H>John valide les JWT dans son API</H></div>
        <div style={f3}>
          <Lead>John code le backend de Révizz : à chaque requête, son API vérifie le JWT avec la clé publique de l'IAM (RS256), sans l'appeler.</Lead>
          <Steps>
            <Step><StepRow n="01" actor="Header" action={<>Lire <Code>kid</Code> pour savoir quelle clé a signé</>} detail="L'IAM fait tourner ses clés : plusieurs peuvent coexister" /></Step>
            <Step><StepRow n="02" actor="JWKS" action="Récupérer la clé publique, puis la mettre en cache" detail="GET /realms/bts-sio/protocol/openid-connect/certs" /></Step>
            <Step><StepRow n="03" actor="Signature" action={<>Vérifier avec l'algorithme <strong>attendu</strong> (RS256)</>} detail={<>Refuser <Code>alg: none</Code> et ne jamais faire confiance à l'alg du header</>} /></Step>
            <Step><StepRow n="04" actor="Claims" action={<>Contrôler <Code>iss</Code>, <Code>aud</Code>, <Code>exp</Code></>} detail="Tolérance d'horloge de 30 s maximum" /></Step>
            <Step><StepRow n="05" actor="Autorisation" action="Vérifier le rôle ou le scope exigé par la route" detail="Token valide ≠ accès autorisé : 401 si invalide, 403 si droits insuffisants" /></Step>
          </Steps>
        </div>
      </div>
      <Footer section="02 · Tokens" />
    </div>
  );
};

// ─── Page 05f: Stateful vs Stateless ─────────────────────────────────────────
const P05fStateful: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(280);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="02 · Tokens" /></div>
        <div style={f2}><H>Stateful vs Stateless</H></div>
        <div style={{ ...f3, marginTop: 36 }}>
          <TRow head label="Critère" a="OAT · stateful" b="JWT · stateless" />
          <TRow label="Validation" a="Appel à l'IAM (introspection)" b="Locale, via la clé publique" />
          <TRow label="Source de vérité" a="La base de l'IAM" b="La signature du token" />
          <TRow label="Révocation" a="Immédiate" b="Attendre l'expiration" />
          <TRow label="Montée en charge" a="L'IAM est sollicité à chaque requête" b="Aucune dépendance réseau" />
        </div>
        <div style={{ ...f4, marginTop: 44 }}>
          <ColH accent>Le compromis classique : combiner les deux</ColH>
          <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
            <FlowBox label="Access token JWT" sub="5–15 min · vérifié localement" accent />
            <div style={{ display: 'flex', alignItems: 'center', color: dim, fontSize: 32, flexShrink: 0 }}>+</div>
            <FlowBox label="Refresh token opaque" sub="longue durée · révocable en base" />
            <Arrow />
            <FlowBox label="Compte désactivé" sub="refresh refusé → accès coupé en ≤ 15 min" />
          </div>
        </div>
      </div>
      <Footer section="02 · Tokens" />
    </div>
  );
};

// ─── Section 03: Fédération : concepts ───────────────────────────────────────
const P06aFederation: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="03 · Fédération d'identité" /></div>
        <div style={f2}><H>Faire confiance à l'identité d'un autre</H></div>
        <div style={f3}>
          <Lead>Fédérer, c'est accepter qu'un <strong style={{ color: 'var(--osd-text)' }}>fournisseur d'identité</strong> authentifie l'utilisateur à la place de l'application.</Lead>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <ColH accent>L'analogie du passeport</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <B size={28}>La France émet le passeport → <strong>l'IdP</strong></B>
                <B size={28}>Le Japon l'accepte sans vérifier l'état civil → <strong>l'app</strong></B>
                <B size={28}>Un accord signé à l'avance → <strong>la fédération</strong></B>
              </ul>
            </div>
            <div>
              <ColH>Le vocabulaire</ColH>
              <DefRow term="IdP" full="identity provider" desc="Authentifie l'utilisateur (Google, ENT…)" />
              <DefRow term="SP / RP" full="service provider / relying party" desc="L'application qui fait confiance à l'IdP" />
              <DefRow term="Broker" desc="Intermédiaire qui fédère plusieurs IdP" />
            </div>
          </div>
        </div>
        <div style={{ ...f4, marginTop: 36 }}>
          <Callout>Chez John : les élèves arrivent via Google, les profs via l'ENT du lycée. Révizz ne stocke plus aucun mot de passe.</Callout>
        </div>
      </div>
      <Footer section="03 · Fédération d'identité" />
    </div>
  );
};

const P06bProtocols: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="03 · Fédération d'identité" /></div>
        <div style={f2}><H>OIDC ou SAML ?</H></div>
        <div style={f3}>
          <Lead>Deux standards pour transporter une identité d'un IdP vers une application.</Lead>
          <TRow head label="Critère" a="OpenID Connect" b="SAML 2.0" />
          <TRow label="Âge" a="2014, construit sur OAuth2" b="2005" />
          <TRow label="Format" a="JSON · JWT (id_token)" b="XML signé (assertion)" />
          <TRow label="Transport" a="Redirections + appel à /token" b="Formulaire POST via le navigateur" />
          <TRow label="Cible" a="Web, mobile, SPA, APIs" b="SSO d'entreprise et d'établissement" />
          <TRow label="Exemples" a="Google, Microsoft, Apple" b="ENT, Renater, Microsoft Entra" />
        </div>
        <div style={{ ...f4, marginTop: 36 }}>
          <Callout color={warnColor}><strong>OAuth2 seul n'authentifie pas.</strong> GitHub et Discord ne fournissent pas d'id_token : le broker appelle leur API <Code>/user</Code> pour savoir qui s'est connecté.</Callout>
        </div>
      </div>
      <Footer section="03 · Fédération d'identité" />
    </div>
  );
};

// ─── Page 06: Authentification via IdP ───────────────────────────────────────
const P06IdP: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(280);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="03 · Fédération d'identité" /></div>
        <div style={f2}><H>Authentification via un IdP</H></div>
        <div style={f3}>
          <Lead>
            <strong style={{ color: 'var(--osd-text)' }}>OAuth2</strong> délègue l'<em>autorisation</em> (access token).{' '}
            <strong style={{ color: 'var(--osd-text)' }}>OIDC</strong> ajoute l'<em>identité</em> (id_token). Ici : « Continuer avec Google ».
          </Lead>
        </div>
        <div style={{ ...f4, display: 'flex', gap: 10, alignItems: 'stretch' }}>
          <FlowBox label="① Élève" sub="clique « Google »" />
          <Arrow />
          <FlowBox label="② App" sub="redirige vers l'IAM" />
          <Arrow />
          <FlowBox label="③ IAM" sub="broker d'identité" accent />
          <Arrow />
          <FlowBox label="④ Google" sub="login + consentement" />
          <Arrow />
          <FlowBox label="⑤ IAM" sub="lie le compte, émet SES tokens" accent />
          <Arrow />
          <FlowBox label="⑥ App" sub="id_token + access_token" />
        </div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 44 }}>
          <div>
            <ColH accent>Ce que l'app reçoit</ColH>
            <DefRow term="id_token" desc={<>Qui est l'utilisateur : <Code>sub</Code>, <Code>email</Code>, <Code>name</Code></>} />
            <DefRow term="access_token" desc="Ce qu'il a le droit de faire (scopes, rôles)" />
          </div>
          <div>
            <ColH color={successColor}>Bonnes pratiques</ColH>
            <ul style={{ margin: 0, padding: 0 }}>
              <BG size={27}>Vérifier <Code>iss</Code>, <Code>aud</Code>, <Code>exp</Code>, <Code>nonce</Code></BG>
              <BG size={27}>Identifier par <Code>sub</Code>, jamais par l'email</BG>
              <BG size={27}>Scopes minimaux : <Code>openid email profile</Code></BG>
            </ul>
          </div>
        </div>
      </div>
      <Footer section="03 · Fédération d'identité" />
    </div>
  );
};

// ─── Section 03: Fédération : broker & liaison de comptes ────────────────────
const P06cBroker: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="03 · Fédération d'identité" /></div>
        <div style={f2}><H size={48}>Dans les coulisses du broker</H></div>
        <div style={{ ...f3, marginTop: 30 }}>
          <SeqDiagram actors={['Élève', 'App Révizz', 'IAM', 'Google']} rows={8} rowH={58} animated>
            <Msg row={0} n={1} from={0} to={1} label="clique « Continuer avec Google »" />
            <Msg row={1} n={2} from={1} to={2} label="redirection vers /auth (PKCE)" />
            <Msg row={2} n={3} from={2} to={3} label="redirection vers Google (OIDC)" />
            <Msg row={3} n={4} from={0} to={3} label="se connecte et accepte les scopes" />
            <Msg row={4} n={5} from={3} to={2} reply label="code → id_token Google" />
            <Note row={5} n={6} at={2} text="lie (Google, sub) au compte Révizz" />
            <Msg row={6} n={7} from={2} to={1} reply label="code → tokens émis par l'IAM" />
            <Note row={7} n={8} at={1} text="ne connaît que l'IAM" />
          </SeqDiagram>
        </div>
        <div style={{ ...f4, marginTop: 24 }}>
          <Callout>Ajouter GitHub ou l'ENT = une configuration dans l'IAM, <strong>zéro ligne de code</strong> dans Révizz.</Callout>
        </div>
      </div>
      <Footer section="03 · Fédération d'identité" />
    </div>
  );
};

const P06dLinking: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="03 · Fédération d'identité" /></div>
        <div style={f2}><H>Lier les comptes sans se faire pirater</H></div>
        <div style={f3}>
          <Lead>Un élève se connecte avec Google, puis avec l'ENT. Même personne ? Tout dépend de ce qu'on compare.</Lead>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <ColH color={dangerColor}>L'attaque : fusion sur l'email</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <BW size={27}>L'attaquant crée un compte chez un IdP laxiste</BW>
                <BW size={27}>Il y déclare l'email de sa victime, non vérifié</BW>
                <BW size={27}>Le broker fusionne sur l'email</BW>
                <BW size={27}>L'attaquant accède au compte de la victime</BW>
              </ul>
            </div>
            <div>
              <ColH color={successColor}>Les règles</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <BG size={27}>Identifier par le couple (<Code>iss</Code>, <Code>sub</Code>)</BG>
                <BG size={27}>Fusionner seulement si <Code>email_verified</Code></BG>
                <BG size={27}>Sinon, exiger une connexion au compte existant</BG>
                <BG size={27}>1ʳᵉ connexion : créer le compte (JIT)</BG>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer section="03 · Fédération d'identité" />
    </div>
  );
};

// ─── Page 07: Pourquoi un IAM ? ──────────────────────────────────────────────
// ─── Section 04: FerrisKey ───────────────────────────────────────────────────
const PFkIntro: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(300);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="04 · Pourquoi FerrisKey ?" /></div>
        <div style={f2}><H>FerrisKey en bref</H></div>
        <div style={f3}>
          <Lead>Un IAM <strong style={{ color: 'var(--osd-text)' }}>open source</strong> (licence Apache-2.0), écrit en <strong style={{ color: 'var(--osd-text)' }}>Rust</strong>, pensé pour le cloud.</Lead>
        </div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <KeyCard n="01" title="Standards">OIDC, OAuth2, SAML, JWT signés exposés via JWKS.</KeyCard>
          <KeyCard n="02" title="Realms">Isolation multi-tenant des utilisateurs, rôles et clients.</KeyCard>
          <KeyCard n="03" title="Authentification">MFA (TOTP), passkeys (WebAuthn), reset de mot de passe.</KeyCard>
          <KeyCard n="04" title="Fédération">Broker vers des fournisseurs d'identité externes.</KeyCard>
          <KeyCard n="05" title="Extensible">Webhooks, audit, API d'administration complète.</KeyCard>
          <KeyCard n="06" title="Cloud-native">Docker, chart Helm, Kubernetes, métriques Prometheus.</KeyCard>
        </div>
      </div>
      <Footer section="04 · Pourquoi FerrisKey ?" />
    </div>
  );
};

const PFkVsKeycloak: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="04 · Pourquoi FerrisKey ?" /></div>
        <div style={f2}><H>FerrisKey vs Keycloak</H></div>
        <div style={f3}>
          <Lead>Keycloak est la référence open source. FerrisKey reprend ses concepts avec une autre approche technique.</Lead>
          <TRow head label="Critère" a="Keycloak" b="FerrisKey" />
          <TRow label="Langage" a="Java (Quarkus)" b="Rust" />
          <TRow label="Maturité" a="Référence depuis 2014, projet CNCF" b="Projet jeune, très grosse vélocité" />
          <TRow label="Concepts" a="Realms, clients, rôles, IdP" b="Les mêmes" />
          <TRow label="Ressources" a="JVM : empreinte mémoire élevée" b="Binaire natif, empreinte réduite" />
          <TRow label="Démarrage" a="30 s à 1 min" b={<strong style={{ color: successColor }}>≈ 50 ms</strong>} />
          <TRow label="Extensibilité" a="Extensions Java (SPI) à déployer" b="Natif dans le core, webhooks" />
          <TRow label="Licence" a="Apache-2.0" b="Apache-2.0" />
        </div>
        <div style={{ ...f4, marginTop: 32 }}>
          <Callout>Mêmes concepts, mêmes standards : ce que vous apprenez sur FerrisKey vous servira aussi sur Keycloak.</Callout>
        </div>
      </div>
      <Footer section="04 · Pourquoi FerrisKey ?" />
    </div>
  );
};

function StatCompare({ label, unit, fk, kc, verdict, better = 'high' }: { label: string; unit: string; fk: number; kc: number; verdict: string; better?: 'high' | 'low' }) {
  const max = Math.max(fk, kc);
  const fmt = (v: number) => v.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
  const Bar = ({ name, value, strong }: { name: string; value: number; strong: boolean }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 170px', alignItems: 'center', columnGap: 14, marginTop: 8 }}>
      <span style={{ fontFamily: mono, fontSize: 17, color: strong ? 'var(--osd-accent)' : muted, letterSpacing: '0.06em' }}>{name}</span>
      <div style={{ height: 22, background: border, borderRadius: 3 }}>
        <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: strong ? 'var(--osd-accent)' : dim, borderRadius: 3 }} />
      </div>
      <span style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, color: strong ? 'var(--osd-text)' : muted, textAlign: 'right' }}>{fmt(value)} <span style={{ fontSize: 16, fontWeight: 400 }}>{unit}</span></span>
    </div>
  );
  return (
    <div style={{ borderBottom: `1px solid ${border}`, padding: '12px 0 14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 700, color: 'var(--osd-text)' }}>
          {label} <span title={better === 'high' ? 'plus haut = mieux' : 'plus bas = mieux'} style={{ fontSize: 18, color: dim, fontWeight: 400 }}>{better === 'high' ? '↑' : '↓'}</span>
        </span>
        <span style={{ fontSize: 21, color: successColor, fontWeight: 600 }}>{verdict}</span>
      </div>
      <Bar name="FerrisKey" value={fk} strong />
      <Bar name="Keycloak" value={kc} strong={false} />
    </div>
  );
}

const PFkBench: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f4 = useFadeIn(220);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="04 · Pourquoi FerrisKey ?" /></div>
        <div style={f2}><H>FerrisKey vs Keycloak : les mesures</H></div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 44, alignItems: 'start', marginTop: 36 }}>
          <div>
            <img src={grafanaBenchmark} alt="Dashboard Grafana : débit, latence, CPU et mémoire de FerrisKey et Keycloak" style={{ width: '100%', display: 'block', borderRadius: 'var(--osd-radius)', border: `1px solid ${border}` }} />
            <div style={{ fontFamily: mono, fontSize: 16, color: dim, marginTop: 10, letterSpacing: '0.04em' }}>Test de charge sur /token · Grafana + Prometheus · moyennes sur 15 min</div>
          </div>
          <div>
            <StatCompare label="Débit" unit="req/s" fk={92.6} kc={29.5} verdict="≈ 3× plus de tokens émis par seconde" />
            <StatCompare label="Latence p95" unit="ms" fk={104} kc={335} better="low" verdict="≈ 3× plus rapide pour 95 % des requêtes" />
            <StatCompare label="Mémoire" unit="MiB" fk={287} kc={801} better="low" verdict="≈ 2,8× moins de RAM consommée" />
            <StatCompare label="CPU" unit="cœurs" fk={0.61} kc={0.59} better="low" verdict="Même CPU… pour 3× plus de travail" />
          </div>
        </div>
      </div>
      <Footer section="04 · Pourquoi FerrisKey ?" />
    </div>
  );
};

const PFkAlternatives: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="04 · Pourquoi FerrisKey ?" /></div>
        <div style={f2}><H>Et les autres ?</H></div>
        <div style={f3}>
          <Lead>Le marché de l'IAM se partage entre solutions auto-hébergées et services SaaS.</Lead>
        </div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <WhyCard tag="Open source · auto-hébergé" title="FerrisKey" color="var(--osd-accent)">Rust, léger, standards OIDC et SAML.</WhyCard>
          <WhyCard tag="Open source · auto-hébergé" title="Keycloak" color="var(--osd-accent)">La référence, soutenue par Red Hat.</WhyCard>
          <WhyCard tag="Open source · auto-hébergé" title="Authentik, Zitadel" color="var(--osd-accent)">Alternatives récentes, orientées simplicité.</WhyCard>
          <WhyCard tag="SaaS" title="Okta / Auth0" color={violet}>Leader du marché, facturé par utilisateur.</WhyCard>
          <WhyCard tag="SaaS" title="Microsoft Entra ID" color={violet}>L'identité de l'écosystème Microsoft 365.</WhyCard>
          <WhyCard tag="SaaS" title="AWS Cognito, Firebase" color={violet}>Intégrés à leur fournisseur cloud.</WhyCard>
        </div>
        <div style={{ ...f3, marginTop: 32 }}>
          <Callout>Critères de choix : auto-hébergé ou SaaS · coût par utilisateur actif · souveraineté des données (RGPD) · standards supportés.</Callout>
        </div>
      </div>
      <Footer section="04 · Pourquoi FerrisKey ?" />
    </div>
  );
};

const P07Why: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="04 · Pourquoi FerrisKey ?" /></div>
        <div style={f2}><H>Ne pas réinventer le login</H></div>
        <div style={f3}>
          <Lead>Ce que John aurait dû faire dès le jour 1 : déléguer l'identité à un composant dédié, audité et standard.</Lead>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <WhyCard tag="Sécurité" title="Une seule surface à durcir" color={dangerColor}>
              MFA, hachage Argon2, anti brute-force, rotation des clés : configurés une fois, appliqués partout.
            </WhyCard>
            <WhyCard tag="Expérience" title="SSO : Single Sign-On" color="var(--osd-accent)">
              Un compte, une connexion, N applications (ENT, Pronote, Moodle…). Déconnexion globale possible.
            </WhyCard>
            <WhyCard tag="Conformité" title="RGPD &amp; traçabilité" color={violet}>
              Données personnelles centralisées : minimisation, droit à l'effacement, journal d'audit des accès.
            </WhyCard>
            <WhyCard tag="Productivité" title="Du temps de dev gagné" color={successColor}>
              Inscription, reset de mdp, MFA, rôles : déjà faits. Le dev se concentre sur le métier via OAuth2 / OIDC.
            </WhyCard>
          </div>
        </div>
      </div>
      <Footer section="04 · Pourquoi FerrisKey ?" />
    </div>
  );
};

// ─── Page 08: Flow Server-to-Server ──────────────────────────────────────────
const P08S2S: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(280);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="05 · Server-to-Server" /></div>
        <div style={f2}><H>OAuth2 Client Credentials</H></div>
        <div style={f3}>
          <Lead>Aucun humain dans la boucle : un <strong style={{ color: 'var(--osd-text)' }}>service</strong> s'authentifie avec ses propres identifiants : <Code>client_id</Code> + <Code>client_secret</Code>.</Lead>
        </div>
        <div style={{ ...f4, display: 'flex', gap: 12, alignItems: 'stretch' }}>
          <FlowBox label="Script / service" sub="client confidentiel" />
          <Arrow />
          <FlowBox label="FerrisKey" sub="POST /token · client_credentials" accent />
          <Arrow />
          <FlowBox label="Access token" sub="JWT · courte durée" />
          <Arrow />
          <FlowBox label="API" sub="Authorization: Bearer <JWT>" />
        </div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 44 }}>
          <div>
            <ColH accent>Quand l'utiliser ?</ColH>
            <ul style={{ margin: 0, padding: 0 }}>
              <B>Tâche planifiée (cron, export nocturne)</B>
              <B>Microservice → microservice</B>
              <B>Script d'administration, synchronisation</B>
            </ul>
          </div>
          <div>
            <ColH color={successColor}>Règles d'or</ColH>
            <ul style={{ margin: 0, padding: 0 }}>
              <BG>Secret hors du code → variable d'env</BG>
              <BG>Service account aux rôles minimaux</BG>
              <BG>Pas de refresh token : on redemande</BG>
            </ul>
          </div>
        </div>
      </div>
      <Footer section="05 · Server-to-Server" />
    </div>
  );
};

// ─── Page 09: Diagramme de séquence : Client Credentials ─────────────────────
const P09S2SSeq: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="05 · Server-to-Server" /></div>
        <div style={f2}><H size={48}>Séquence : Client Credentials</H></div>
        <div style={{ ...f3, marginTop: 36 }}>
          <SeqDiagram actors={['Script backend', 'FerrisKey · Auth', 'FerrisKey · Admin API']} rows={7} rowH={92} animated>
            <Msg row={0} n={1} from={0} to={1} label="POST …/protocol/openid-connect/token" sub="grant_type=client_credentials · client_id · client_secret" />
            <Note row={1} n={2} at={1} text="vérifie le secret · charge les rôles du service account" />
            <Msg row={2} n={3} from={1} to={0} reply label="200 { access_token, expires_in: 300 }" />
            <Msg row={3} n={4} from={0} to={2} label="GET /realms/<realm>/users" sub="Authorization: Bearer <JWT>" />
            <Note row={4} n={5} at={2} text="signature (JWKS) · exp · rôle view_users" />
            <Msg row={5} n={6} from={2} to={0} reply label='200 { "data": [ { "username", "email", … } ] }' />
            <Note row={6} n={7} at={0} text="garde le token en cache jusqu'à exp − 30 s" />
          </SeqDiagram>
        </div>
      </div>
      <Footer section="05 · Server-to-Server" />
    </div>
  );
};

// ─── Page 10: TP 1 : Énoncé ──────────────────────────────────────────────────
const P10TP1: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 1 · Énoncé" /></div>
        <div style={f2}><H>Exporter les comptes du lycée</H></div>
        <div style={f3}>
          <Lead>Chaque nuit, un script backend récupère la liste des utilisateurs FerrisKey pour alimenter l'ENT.</Lead>
          <Steps>
            <Step><StepRow n="01" actor="Console" action={<>Créer le realm <Code>bts-sio</Code> et un client confidentiel <Code>sync-script</Code></>} detail="Activer « Service Account » : c'est lui qui portera les droits du script" /></Step>
            <Step><StepRow n="02" actor="Console" action={<>Attribuer au service account le rôle <Code>view_users</Code></>} detail="Principe du moindre privilège : lecture seule, pas manage_users" /></Step>
            <Step><StepRow n="03" actor="Script" action="Obtenir un access token via le grant client_credentials" detail="POST {FK_URL}/realms/bts-sio/protocol/openid-connect/token" /></Step>
            <Step><StepRow n="04" actor="Script" action="Lister les utilisateurs et afficher username + email" detail="GET {FK_URL}/realms/bts-sio/users, réponse : { data: [ … ] }" /></Step>
            <Step><StepRow n="05" actor="Bonus" action="Gérer les erreurs 401 / 403 et mettre le token en cache" detail="Réutiliser le token tant que exp − 30 s n'est pas atteint" /></Step>
          </Steps>
        </div>
      </div>
      <Footer section="TP 1 · Server-to-Server" />
    </div>
  );
};

// ─── Page 11: TP 1 : Solution ────────────────────────────────────────────────
const CURL_SOLUTION = `
# 1. Token via client_credentials
TOKEN=$(curl -s -X POST \\
  "$FK_URL/realms/bts-sio/protocol/openid-connect/token" \\
  -d grant_type=client_credentials \\
  -d client_id=sync-script \\
  -d client_secret="$FK_SECRET" | jq -r .access_token)

# 2. Liste des utilisateurs
curl -s "$FK_URL/realms/bts-sio/users" \\
  -H "Authorization: Bearer $TOKEN" \\
  | jq '.data[] | {username, email}'
`;

const TS_SOLUTION = `
const BASE = \`\${process.env.FK_URL}/realms/bts-sio\`;

// 1. Token via client_credentials
async function getToken(): Promise<string> {
  const res = await fetch(\`\${BASE}/protocol/openid-connect/token\`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "sync-script",
      client_secret: process.env.FK_SECRET!,
    }),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(\`token: \${res.status}\`);
  return (await res.json()).access_token;
}

// 2. Liste des utilisateurs
const token = await getToken();
const res = await fetch(\`\${BASE}/users\`, {
  headers: { Authorization: \`Bearer \${token}\` },
  signal: AbortSignal.timeout(5000),
});
const { data } = await res.json();
for (const u of data) console.log(u.username, u.email);
`;

const P11TP1Solution: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 1 · Solution" /></div>
        <div style={f2}><H size={48}>cURL &amp; TypeScript</H></div>
        <div style={{ ...f3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 32, alignItems: 'start' }}>
          <div>
            <CodeBlock lang="bash" title="sync.sh" code={CURL_SOLUTION} />
            <div style={{ marginTop: 28 }}>
              <ColH color={warnColor}>Points de vigilance</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <B size={25}><Code>FK_SECRET</Code> en variable d'env, jamais dans git ni les logs</B>
                <B size={25}><strong>401</strong> → token absent / expiré · <strong>403</strong> → rôle manquant</B>
                <B size={25}>Toujours un <Code>timeout</Code> sur les appels réseau</B>
              </ul>
            </div>
          </div>
          <CodeBlock lang="ts" title="sync.ts" size={17} code={TS_SOLUTION} />
        </div>
      </div>
      <Footer section="TP 1 · Server-to-Server" />
    </div>
  );
};

// ─── TP 2 (Server-to-Server) ─────────────────────────────────────────────────
const P10dTP3: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 2 · Énoncé" /></div>
        <div style={f2}><H>Protéger l'API de notes</H></div>
        <div style={f3}>
          <Lead>John expose une API <Code>/notes</Code>. Elle ne doit répondre qu'aux requêtes portant un JWT valide émis par FerrisKey.</Lead>
          <Steps>
            <Step><StepRow n="01" actor="API" action="Récupérer les clés publiques du realm (JWKS) pour vérifier la signature" detail="GET {FK_URL}/realms/bts-sio/protocol/openid-connect/certs" /></Step>
            <Step><StepRow n="02" actor="API" action={<>Écrire un middleware qui vérifie la signature, <Code>iss</Code> et <Code>exp</Code></>} detail="Refuser un token absent, expiré, ou signé par un autre émetteur" /></Step>
            <Step><StepRow n="03" actor="API" action="Répondre 401 si le token est invalide, 403 si le rôle manque" detail="Décoder un token réel pour repérer le claim des rôles de votre realm" /></Step>
            <Step><StepRow n="04" actor="Test" action="Appeler /notes sans token, avec un token expiré, puis avec un token valide" detail="Résultat attendu : 401, 401, 200" /></Step>
            <Step><StepRow n="05" actor="Bonus" action="Comparer avec un OAT : combien d'appels à FerrisKey par requête ?" detail="JWT : aucun une fois le JWKS chargé. OAT : un appel d'introspection à chaque requête" /></Step>
          </Steps>
        </div>
      </div>
      <Footer section="TP 2 · Server-to-Server" />
    </div>
  );
};

const TP3_AUTH = `
import { Hono, type Context, type Next } from "hono";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const ISSUER = \`\${process.env.FK_URL}/realms/bts-sio\`;
const jwks = jwksClient({ jwksUri: \`\${ISSUER}/protocol/openid-connect/certs\` });

async function requireAuth(c: Context, next: Next) {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return c.text("Unauthorized", 401);
  try {
    // quelle clé ? → le kid du header
    const kid = jwt.decode(token, { complete: true })?.header.kid;
    const key = await jwks.getSigningKey(kid);
    // signature + iss + exp
    const payload = jwt.verify(token, key.getPublicKey(), {
      issuer: ISSUER,
      algorithms: ["RS256"],
    });
    c.set("user", payload);
  } catch {
    return c.text("Unauthorized", 401);
  }
  await next();
}
`;

const TP3_ROLE = `
function requireRole(role: string) {
  return async function (c: Context, next: Next) {
    const { roles = [] } = c.get("user");
    if (!roles.includes(role)) return c.text("Forbidden", 403);
    await next();
  };
}

const app = new Hono();
app.get("/notes", requireAuth, requireRole("prof"), (c) => c.json(notes));
`;

const P10eTP3Solution: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 2 · Solution" /></div>
        <div style={f2}><H size={48}>Middleware Hono + jsonwebtoken</H></div>
        <div style={{ ...f3, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 36, marginTop: 32, alignItems: 'start' }}>
          <CodeBlock lang="ts" title="auth.ts" size={16} code={TP3_AUTH} />
          <div>
            <CodeBlock lang="ts" title="routes.ts" size={15} code={TP3_ROLE} />
            <div style={{ marginTop: 26 }}>
              <ColH color={warnColor}>À retenir</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <B size={25}><Code>jwks-rsa</Code> récupère et met en cache la clé</B>
                <B size={25}>Algorithme imposé : <Code>RS256</Code>, pas celui du header</B>
                <B size={25}><strong>401</strong> : pas authentifié · <strong>403</strong> : pas autorisé</B>
                <B size={25}><Code>jwt.decode</Code> ne valide rien : il lit juste le <Code>kid</Code></B>
              </ul>
              <div style={{ fontSize: 22, color: muted, marginTop: 4, lineHeight: 1.45 }}>Le claim <Code>roles</Code> est à adapter à celui de votre realm.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer section="TP 2 · Server-to-Server" />
    </div>
  );
};

// ─── TP 3 (Server-to-Server) : service qui appelle l'API du TP 2 ─────────────
const PTP3: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 3 · Énoncé" /></div>
        <div style={f2}><H>Un service qui appelle l'API de notes</H></div>
        <div style={f3}>
          <Lead>Le service de statistiques du lycée doit lire les notes, sans compte utilisateur. On réutilise l'API protégée du TP 2.</Lead>
          <Steps>
            <Step><StepRow n="01" actor="Console" action={<>Créer le client confidentiel <Code>stats-service</Code> avec service account</>} detail="Un service = un client : ne pas réutiliser sync-script" /></Step>
            <Step><StepRow n="02" actor="Console" action={<>Créer le rôle <Code>notes-reader</Code> et l'attribuer au service account</>} detail="Ce rôle ne doit donner accès qu'aux statistiques, rien d'autre" /></Step>
            <Step><StepRow n="03" actor="API" action={<>Ajouter <Code>GET /notes/stats</Code> protégée par <Code>requireRole("notes-reader")</Code></>} detail="Réutiliser requireAuth et requireRole du TP 2 : aucune ligne d'auth à réécrire" /></Step>
            <Step><StepRow n="04" actor="Service" action={<>Obtenir un token, le garder en cache jusqu'à <Code>exp − 30 s</Code>, puis appeler l'API</>} detail="Un seul appel à /token pour plusieurs requêtes vers l'API" /></Step>
            <Step><StepRow n="05" actor="Test" action="Appeler /notes/stats avec le token de stats-service, puis avec celui de sync-script, puis sans token" detail="Résultat attendu : 200, 403 (autre rôle), 401" /></Step>
          </Steps>
        </div>
      </div>
      <Footer section="TP 3 · Server-to-Server" />
    </div>
  );
};

const TP3_SERVICE = `
const BASE = \`\${process.env.FK_URL}/realms/bts-sio\`;
let cache = { token: "", exp: 0 };

async function getToken(): Promise<string> {
  if (Date.now() < cache.exp) return cache.token;
  const res = await fetch(\`\${BASE}/protocol/openid-connect/token\`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "stats-service",
      client_secret: process.env.STATS_SECRET!,
    }),
  });
  const { access_token, expires_in } = await res.json();
  cache = { token: access_token, exp: Date.now() + (expires_in - 30) * 1000 };
  return access_token;
}

export async function fetchStats() {
  const res = await fetch(\`\${process.env.NOTES_API}/notes/stats\`, {
    headers: { Authorization: \`Bearer \${await getToken()}\` },
  });
  if (!res.ok) throw new Error(\`notes-api: \${res.status}\`);
  return res.json();
}
`;

const TP3_ROUTE = `
// notes-api : même middleware qu'au TP 2
app.get(
  "/notes/stats",
  requireAuth,
  requireRole("notes-reader"),
  (c) => c.json(stats()),
);
`;

const PTP3Solution: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 3 · Solution" /></div>
        <div style={f2}><H size={48}>Le service, sa route et son rôle</H></div>
        <div style={{ ...f3, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 36, marginTop: 32, alignItems: 'start' }}>
          <CodeBlock lang="ts" title="stats-service.ts" size={16} code={TP3_SERVICE} />
          <div>
            <CodeBlock lang="ts" title="notes-api.ts" size={15} code={TP3_ROUTE} />
            <div style={{ marginTop: 26 }}>
              <ColH color={warnColor}>À retenir</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <B size={25}>Un client par service : <Code>stats-service</Code> ≠ <Code>sync-script</Code></B>
                <B size={25}><Code>notes-reader</Code> n'ouvre que cette route</B>
                <B size={25}>Token en cache : un appel à <Code>/token</Code>, N appels à l'API</B>
                <B size={25}>Même middleware qu'au TP 2 : rien à réécrire</B>
              </ul>
              <div style={{ fontSize: 22, color: muted, marginTop: 4, lineHeight: 1.45 }}>Vérifiez que le rôle apparaît bien dans le token du service.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer section="TP 3 · Server-to-Server" />
    </div>
  );
};

// ─── "Pour quel cas ?" : une slide après chaque divider de flux ──────────────
const PUseCaseS2S: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="05 · Server-to-Server" /></div>
        <div style={f2}><H>Pour quel cas ?</H></div>
        <div style={f3}>
          <Lead>Personne n'est connecté : c'est le <strong style={{ color: 'var(--osd-text)' }}>service lui-même</strong> qui s'authentifie, avec son propre identifiant.</Lead>
        </div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <WhyCard tag="TP 1" title="Tâche planifiée" color="var(--osd-accent)">L'export nocturne des comptes vers l'ENT, sans personne devant l'écran.</WhyCard>
          <WhyCard tag="TP 3" title="Service → service" color={violet}>Le service de statistiques lit l'API de notes avec son propre token.</WhyCard>
          <WhyCard tag="Administration" title="Script ou pipeline CI" color={successColor}>Provisionner ou synchroniser des comptes depuis un script d'administration.</WhyCard>
          <WhyCard tag="Arrière-plan" title="Worker, webhook" color={warnColor}>Un traitement asynchrone qui n'a aucun utilisateur à représenter.</WhyCard>
        </div>
        <div style={{ ...f4, marginTop: 28 }}>
          <Callout color={dangerColor}><strong>Pas adapté</strong> si un utilisateur agit, ni dans une app installée chez lui : le secret y serait extractible.</Callout>
        </div>
      </div>
      <Footer section="05 · Server-to-Server" />
    </div>
  );
};

const PUseCasePKCE: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(320);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="06 · Client-to-FerrisKey" /></div>
        <div style={f2}><H>Pour quel cas ?</H></div>
        <div style={f3}>
          <Lead>Un <strong style={{ color: 'var(--osd-text)' }}>utilisateur</strong> se connecte depuis une application qu'il possède : elle ne peut garder aucun secret.</Lead>
        </div>
        <div style={{ ...f4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <WhyCard tag="TP 4 · Flutter" title="Application mobile" color="var(--osd-accent)">L'app « Vie scolaire » en Flutter : navigateur système et deep link.</WhyCard>
          <WhyCard tag="TP 4 · Vue.js" title="Single-page app" color={violet}>Un front React ou Vue qui appelle directement l'API.</WhyCard>
          <WhyCard tag="Poste de travail" title="App desktop ou CLI" color={successColor}>Un outil installé qui ouvre le navigateur pour se connecter.</WhyCard>
          <WhyCard tag="Identité" title="Action au nom de l'élève" color={warnColor}>L'API doit savoir qui agit : l'access token porte son identité (<Code>sub</Code>).</WhyCard>
        </div>
        <div style={{ ...f4, marginTop: 28 }}>
          <Callout color={dangerColor}><strong>Pas adapté</strong> sans utilisateur : préférer Client Credentials. Et jamais Implicit ni le password grant (ROPC), dépréciés.</Callout>
        </div>
      </div>
      <Footer section="06 · Client-to-FerrisKey" />
    </div>
  );
};

// ─── Page 12: Flow Client-to-FerrisKey (PKCE) ────────────────────────────────
const P12PKCE: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="06 · Client-to-FerrisKey" /></div>
        <div style={f2}><H>Authorization Code + PKCE</H></div>
        <div style={f3}>
          <Lead>Une app mobile ou une SPA est un <strong style={{ color: 'var(--osd-text)' }}>client public</strong> : elle ne peut garder aucun secret. PKCE remplace le secret par une preuve à usage unique.</Lead>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 64 }}>
            <div>
              <ColH color={dangerColor}>Pourquoi pas de client_secret ?</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <BW size={28}>Un APK / IPA se décompile</BW>
                <BW size={28}>Le bundle JS d'une SPA est public</BW>
                <BW size={28}>Une app malveillante peut intercepter le code via le deep link</BW>
              </ul>
            </div>
            <div>
              <ColH accent>PKCE en 3 temps (RFC 7636)</ColH>
              <DefRow term="code_verifier" desc="Secret aléatoire (43–128 car.) gardé en mémoire par l'app" />
              <DefRow term="code_challenge" desc="BASE64URL(SHA256(verifier)) envoyé à /auth" />
              <DefRow term="échange /token" desc="L'app renvoie le verifier, FerrisKey recalcule et compare" />
            </div>
          </div>
          <div style={{ marginTop: 36 }}>
            <Callout>Toujours le <strong>navigateur système</strong> (Custom Tabs / ASWebAuthenticationSession), jamais une WebView embarquée.</Callout>
          </div>
        </div>
      </div>
      <Footer section="06 · Client-to-FerrisKey" />
    </div>
  );
};

// ─── Page 13: Diagramme de séquence : PKCE Flutter ───────────────────────────
const P13PKCESeq: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="06 · Client-to-FerrisKey" /></div>
        <div style={f2}><H size={48}>Séquence PKCE</H></div>
        <div style={{ ...f3, marginTop: 30 }}>
          <SeqDiagram actors={['Élève', 'Application client', 'Navigateur', 'FerrisKey', 'API métier']} rows={11} rowH={57} animated>
            <Msg row={0} n={1} from={0} to={1} label="tape « Se connecter »" />
            <Note row={1} n={2} at={1} text="génère verifier + state · challenge = S256(verifier)" />
            <Msg row={2} n={3} from={1} to={2} label="ouvre /auth?code_challenge=…&state=…" />
            <Msg row={3} n={4} from={2} to={3} label="GET /protocol/openid-connect/auth" />
            <Msg row={4} n={5} from={0} to={3} label="saisit identifiant + mot de passe (+ MFA)" />
            <Msg row={5} n={6} from={3} to={1} reply label="302 → fr.lycee.viescolaire://callback?code=…&state=…" />
            <Msg row={6} n={7} from={1} to={3} label="vérifie state, puis POST /token (code + code_verifier)" />
            <Note row={7} n={8} at={3} text="SHA256(verifier) == challenge ?" />
            <Msg row={8} n={9} from={3} to={1} reply label="access_token · refresh_token · id_token" />
            <Msg row={9} n={10} from={1} to={4} label="GET /api/notes · Bearer <access_token>" />
            <Note row={10} n={11} at={4} text="vérifie le JWT (JWKS)" />
          </SeqDiagram>
        </div>
      </div>
      <Footer section="06 · Client-to-FerrisKey" />
    </div>
  );
};

// ─── Page 14: TP 4 : Énoncé ──────────────────────────────────────────────────
const P14TP2: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 4 · Énoncé · Flutter" /></div>
        <div style={f2}><H>Connexion dans l'app mobile</H></div>
        <div style={f3}>
          <Lead>L'élève se connecte à l'application Flutter avec son compte FerrisKey, sans que l'app ne voie jamais son mot de passe.</Lead>
          <Steps>
            <Step><StepRow n="01" actor="Console" action={<>Créer un client <strong>public</strong> <Code>vie-scolaire-mobile</Code></>} detail="Pas de secret · PKCE S256 obligatoire · grant authorization_code uniquement" /></Step>
            <Step><StepRow n="02" actor="Console" action={<>Déclarer la redirect URI <Code>fr.lycee.viescolaire://callback</Code></>} detail="Correspondance exacte, pas de wildcard" /></Step>
            <Step><StepRow n="03" actor="Flutter" action={<>Implémenter le login avec <Code>flutter_appauth</Code></>} detail="Discovery via l'issuer : {FK_URL}/realms/bts-sio" /></Step>
            <Step><StepRow n="04" actor="Flutter" action={<>Stocker les tokens dans <Code>flutter_secure_storage</Code></>} detail="Keychain (iOS) / Keystore (Android), jamais SharedPreferences" /></Step>
            <Step><StepRow n="05" actor="Bonus" action="Afficher le profil (userinfo) + refresh automatique + logout" detail="Rafraîchir quand l'access token expire, révoquer au logout" /></Step>
          </Steps>
        </div>
      </div>
      <Footer section="TP 4 · Client-to-FerrisKey" />
    </div>
  );
};

const P14bTP4Vue: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 4 · Énoncé · Vue.js" /></div>
        <div style={f2}><H>Connexion dans l'app web</H></div>
        <div style={f3}>
          <Lead>La même application « Vie scolaire », en version web : une single-page app Vue.js, sans backend, qui se connecte avec FerrisKey.</Lead>
          <Steps>
            <Step><StepRow n="01" actor="Console" action={<>Créer un client <strong>public</strong> <Code>vie-scolaire-web</Code></>} detail="Pas de secret · PKCE S256 obligatoire · grant authorization_code uniquement" /></Step>
            <Step><StepRow n="02" actor="Console" action={<>Déclarer la redirect URI <Code>https://vie-scolaire.lycee.fr/callback</Code> et l'origine autorisée</>} detail="Correspondance exacte, pas de wildcard · l'origine (CORS) est celle de la SPA" /></Step>
            <Step><StepRow n="03" actor="Vue.js" action={<>Implémenter le login avec <Code>oidc-client-ts</Code></>} detail="Discovery via l'issuer : {FK_URL}/realms/bts-sio · la bibliothèque génère PKCE et state" /></Step>
            <Step><StepRow n="04" actor="Vue.js" action={<>Traiter le retour sur <Code>/callback</Code> et garder les tokens en mémoire</>} detail="Jamais localStorage : un XSS lirait tout le storage" /></Step>
            <Step><StepRow n="05" actor="Bonus" action="Protéger les routes avec Vue Router et gérer le logout" detail="Guard de navigation : rediriger vers le login s'il n'y a pas de token valide" /></Step>
          </Steps>
        </div>
      </div>
      <Footer section="TP 4 · Client-to-FerrisKey" />
    </div>
  );
};

// ─── Page 15: TP 4 : Intégration Flutter ─────────────────────────────────────
const GRADLE_SNIPPET = `
// android/app/build.gradle
android { defaultConfig {
  manifestPlaceholders += [
    'appAuthRedirectScheme': 'fr.lycee.viescolaire'
  ]
} }
`;

const DART_SNIPPET = `
final appAuth = FlutterAppAuth();
const storage = FlutterSecureStorage();

Future<void> login() async {
  // PKCE (S256) + state générés automatiquement
  final res = await appAuth.authorizeAndExchangeCode(
    AuthorizationTokenRequest(
      'vie-scolaire-mobile',
      'fr.lycee.viescolaire://callback',
      issuer: 'https://auth.lycee.fr/realms/bts-sio',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
    ),
  );
  await storage.write(key: 'access_token', value: res.accessToken);
  await storage.write(key: 'refresh_token', value: res.refreshToken);
}
`;

const P15TP2Steps: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 4 · Solution · Flutter" /></div>
        <div style={f2}><H size={48}>Flutter : deep link, PKCE, stockage</H></div>
        <div style={{ ...f3, display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 44, marginTop: 32, alignItems: 'start' }}>
          <div>
            <ColH accent>① Deep link</ColH>
            <CodeBlock lang="gradle" size={17} code={GRADLE_SNIPPET} />
            <div style={{ fontSize: 22, color: muted, marginTop: 10, lineHeight: 1.45 }}>iOS : déclarer le même scheme dans <Code>Info.plist</Code> (CFBundleURLTypes)</div>
            <div style={{ marginTop: 28 }}>
              <ColH accent>② PKCE</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <B size={25}>Géré par <Code>flutter_appauth</Code></B>
                <B size={25}>Ne jamais implémenter sa crypto</B>
              </ul>
            </div>
            <div style={{ marginTop: 14 }}>
              <ColH accent>③ Stockage</ColH>
              <ul style={{ margin: 0, padding: 0 }}>
                <B size={25}>Keychain / Keystore chiffrés</B>
                <B size={25}>Effacer au logout</B>
              </ul>
            </div>
          </div>
          <CodeBlock lang="dart" title="lib/auth_service.dart" size={19} code={DART_SNIPPET} />
        </div>
      </div>
      <Footer section="TP 4 · Client-to-FerrisKey" />
    </div>
  );
};

const VUE_AUTH = `
import {
  UserManager,
  WebStorageStateStore,
  InMemoryWebStorage,
} from "oidc-client-ts";

export const auth = new UserManager({
  authority: "https://auth.lycee.fr/realms/bts-sio",
  client_id: "vie-scolaire-web",
  redirect_uri: \`\${location.origin}/callback\`,
  post_logout_redirect_uri: location.origin,
  response_type: "code", // Authorization Code + PKCE (S256)
  scope: "openid profile email",
  // tokens en mémoire : jamais localStorage
  userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
});
`;

const VUE_ROUTER = `
router.beforeEach(async (to) => {
  if (to.path === "/callback") {
    await auth.signinRedirectCallback(); // code + code_verifier → tokens
    return "/";
  }
  const user = await auth.getUser();
  if (!user || user.expired) {
    await auth.signinRedirect();
    return false;
  }
});

// appel de l'API avec l'access token
const user = await auth.getUser();
fetch(\`\${API}/notes\`, {
  headers: { Authorization: \`Bearer \${user?.access_token}\` },
});
`;

const P15bTP4VueSolution: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="TP 4 · Solution · Vue.js" /></div>
        <div style={f2}><H size={48}>Vue.js : login, callback et guard</H></div>
        <div style={{ ...f3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, marginTop: 30, alignItems: 'start' }}>
          <CodeBlock lang="ts" title="auth.ts" size={16} code={VUE_AUTH} />
          <CodeBlock lang="ts" title="router.ts" size={16} code={VUE_ROUTER} />
        </div>
        <div style={{ ...f3, marginTop: 26 }}>
          <ul style={{ margin: 0, padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 48 }}>
            <B size={25}><Code>oidc-client-ts</Code> génère <Code>code_verifier</Code>, <Code>state</Code> et <Code>nonce</Code></B>
            <B size={25}>Tokens en mémoire : jamais <Code>localStorage</Code></B>
            <B size={25}>Un rechargement relance un login : silencieux grâce au SSO</B>
            <B size={25}>L'API reçoit l'access token, pas l'<Code>id_token</Code></B>
          </ul>
        </div>
      </div>
      <Footer section="TP 4 · Client-to-FerrisKey" />
    </div>
  );
};

// ─── Page 16: Conclusion ─────────────────────────────────────────────────────
const P16Conclusion: Page = () => {
  const f1 = useFadeIn(0); const f2 = useFadeIn(80); const f3 = useFadeIn(180); const f4 = useFadeIn(300);
  return (
    <div style={page}>
      <div style={inner}>
        <div style={f1}><Tag text="07 · Synthèse" /></div>
        <div style={f2}><H>Ce qu'il faut retenir</H></div>
        <div style={{ ...f3, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 40 }}>
          <KeyCard n="01" title="FerrisKey, une vérité">Les identités vivent dans FerrisKey, pas dans chaque application.</KeyCard>
          <KeyCard n="02" title="RBAC puis ABAC">Des rôles pour le cas général, des attributs pour le contexte.</KeyCard>
          <KeyCard n="03" title="JWT = courte durée">Vérifier signature, exp, iss et aud. Le payload n'est pas secret.</KeyCard>
          <KeyCard n="04" title="Serveur ↔ serveur">client_credentials, secret en variable d'env, rôles minimaux.</KeyCard>
          <KeyCard n="05" title="Mobile / SPA">Authorization Code + PKCE, dans le navigateur système.</KeyCard>
          <KeyCard n="06" title="Tokens protégés">Stockage chiffré, jamais de localStorage ni SharedPreferences.</KeyCard>
        </div>
        <div style={{ ...f4, marginTop: 44 }}>
          <Callout>Règle d'or : <strong>ne jamais coder sa propre authentification</strong>. S'appuyer sur un standard (OAuth2 / OIDC) et un IAM éprouvé comme FerrisKey.</Callout>
        </div>
      </div>
      <Footer section="07 · Synthèse" />
    </div>
  );
};

// ─── Section dividers (same layout as the "Déléguez…" bridge) ───────────────
function SectionBreak({ n, title, subtitle, size = 110 }: { n: string; title: React.ReactNode; subtitle: string; size?: number }) {
  const f0 = useFadeIn(0); const f1 = useFadeIn(120); const f2 = useFadeIn(320);
  return (
    <div style={{ ...page, overflow: 'hidden' }}>
      <GridBackdrop />
      <div style={{ padding: '0 110px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={f0}><Tag text={`Section ${n} / 07`} /></div>
        <div style={f1}>
          <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 44px', color: 'var(--osd-text)' }}>{title}</h2>
        </div>
        <div style={f2}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, maxWidth: 1200 }}>
            <div style={{ width: 4, background: 'var(--osd-accent)', opacity: 0.7, alignSelf: 'stretch', flexShrink: 0 }} />
            <p style={{ fontSize: 36, color: muted, lineHeight: 1.5, margin: 0 }}>{subtitle}</p>
          </div>
        </div>
      </div>
      <div aria-hidden style={{ position: 'absolute', right: 110, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--osd-font-display)', fontSize: 320, fontWeight: 700, color: 'var(--osd-accent)', opacity: 0.08, lineHeight: 1, userSelect: 'none' }}>{n}</div>
      <Footer section={`Section ${n}`} />
    </div>
  );
}

const S01: Page = () => <SectionBreak n="01" title={<>Fondamentaux<br />IAM</>} subtitle="L'histoire de John, puis ce qu'est vraiment un IAM." />;
const S02: Page = () => <SectionBreak n="02" title={<>Les <span style={{ color: 'var(--osd-accent)' }}>tokens</span></>} subtitle="Ce que l'IAM remet à vos applications, et comment les vérifier." />;
const S03: Page = () => <SectionBreak n="03" title={<>Fédération<br />d'identité</>} subtitle="Se connecter avec un compte que l'on possède déjà." />;
const S04: Page = () => <SectionBreak n="04" size={92} title={<>Pourquoi John aurait dû<br />utiliser <span style={{ color: 'var(--osd-accent)' }}>FerrisKey</span> ?</>} subtitle="Un IAM open source écrit en Rust, face à Keycloak et aux autres." />
const S05: Page = () => <SectionBreak n="05" title={<>Server-to-<br />Server</>} subtitle="Quand un service parle à un autre service, sans humain." />;
const S06: Page = () => <SectionBreak n="06" title={<>Client-to-<br />FerrisKey</>} subtitle="Connecter un utilisateur depuis une app mobile." />;
const S07: Page = () => <SectionBreak n="07" title={<>Synthèse</>} subtitle="Ce qu'il faut retenir." />;

// ─── Meta & export ───────────────────────────────────────────────────────────
export const meta: SlideMeta = {
  title: 'IAM & FerrisKey · BTS SIO 2',
  createdAt: '2026-09-29T14:25:59.988Z',
};

export default [
  P01Cover, P02Agenda,
  S01, PStory1, PStory2, PStory3, PStory4, PStory5, PStoryBridge, PIamOverview, PStory6,
  P04ClassicAuth, S02, P05aWhyTokens, P05bOpaque, P05cJwtAnatomy, P05dClaims, P05eValidate, P05fStateful,
  S03, P06aFederation, P06bProtocols, P06IdP, P06cBroker, P06dLinking, S04, PFkIntro, PFkVsKeycloak, PFkBench, PFkAlternatives, P07Why,
  S05, PUseCaseS2S, P08S2S, P09S2SSeq, P10TP1, P11TP1Solution, P10dTP3, P10eTP3Solution, PTP3, PTP3Solution,
  S06, PUseCasePKCE, P12PKCE, P13PKCESeq, P14bTP4Vue, P15bTP4VueSolution, P14TP2, P15TP2Steps,
  S07, P16Conclusion,
] satisfies Page[];
