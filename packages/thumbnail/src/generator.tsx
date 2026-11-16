import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import satori from 'satori'
import * as culori from 'culori'
import { resolveColor } from './colors'

export type ThumbnailTheme = 'default' | 'gradient' | 'minimal'

const __dirname = dirname(fileURLToPath(import.meta.url))

const interRegular = readFileSync(resolve(__dirname, 'assets/Inter-Regular.woff'))
const interSemiBold = readFileSync(resolve(__dirname, 'assets/Inter-SemiBold.woff'))
const interBold = readFileSync(resolve(__dirname, 'assets/Inter-Bold.woff'))
const monoRegular = readFileSync(resolve(__dirname, 'assets/JetBrainsMono-Regular.ttf'))
const monoBold = readFileSync(resolve(__dirname, 'assets/JetBrainsMono-Bold.ttf'))

export interface ThumbnailOptions {
  headline?: string
  title: string
  description?: string
  primaryColor?: string
  theme?: ThumbnailTheme
  scheme?: 'light' | 'dark'
}

const fonts = [
  { name: 'Inter', data: interRegular, weight: 400 as const },
  { name: 'Inter', data: interSemiBold, weight: 600 as const },
  { name: 'Inter', data: interBold, weight: 700 as const },
  { name: 'JetBrains Mono', data: monoRegular, weight: 400 as const },
  { name: 'JetBrains Mono', data: monoBold, weight: 700 as const },
]

function TextContent({
  headline,
  title,
  description,
  primaryColor,
}: {
  headline?: string
  title: string
  description?: string
  primaryColor: string
}) {
  return (
    <div tw="flex flex-col w-[800px] pl-[100px]">
      {headline && (
        <p tw="uppercase text-[24px] mb-4" style={{ color: primaryColor, fontWeight: 600 }}>
          {headline}
        </p>
      )}
      <h1
        tw="w-[800px] m-0 text-[75px] font-bold mb-4"
        style={{
          display: 'block',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          color: 'white',
          fontWeight: 700,
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          tw="text-[32px] text-[#E4E4E7] leading-tight"
          style={{
            display: 'block',
            WebkitLineClamp: 3,
            textOverflow: 'ellipsis',
            opacity: 0.5,
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

// Style « Swiss » du site : cadre central à filets verticaux, filets horizontaux pleine largeur,
// carrés colorés discrets dans les marges, titre serré, libellés en mono.
const FRAME_LEFT = 120
const FRAME_RIGHT = 840
const HEAD_H = 72
const FOOT_TOP = 476
const CELL = 40

// [col, ligne, teinte] dans les marges gauche (cols 0-2) et droite (cols 21-23), grille de 40 px
const GUTTER_SQUARES: [number, number, number][] = [
  [0, 1, 1], [2, 2, 3], [1, 4, 0], [0, 6, 2], [2, 7, 1], [1, 9, 3], [0, 11, 0], [2, 12, 2],
  [21, 0, 2], [23, 1, 0], [22, 3, 3], [21, 5, 1], [23, 7, 2], [22, 9, 0], [21, 10, 3], [23, 12, 1],
]

function toRgba(hex: string, alpha: number): string {
  const rgb = culori.rgb(culori.parse(hex) ?? { mode: 'rgb', r: 0, g: 0, b: 0 })
  const r = Math.round((rgb.r ?? 0) * 255)
  const g = Math.round((rgb.g ?? 0) * 255)
  const b = Math.round((rgb.b ?? 0) * 255)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function DefaultTheme({
  headline,
  title,
  description,
  primaryColor,
  scheme,
}: Required<Pick<ThumbnailOptions, 'primaryColor'>> & Omit<ThumbnailOptions, 'primaryColor' | 'theme'> & { scheme: 'light' | 'dark' }) {
  const isDark = scheme === 'dark'
  const bg = isDark ? '#0f0f0e' : '#fcfcfa'
  const fg = isDark ? '#f4f4f0' : '#151513'
  const muted = isDark ? '#a3a39e' : '#6b6a63'
  const line = isDark ? '#2b2b29' : '#e4e2da'
  const alphas = isDark ? [0.22, 0.14, 0.09, 0.05] : [0.18, 0.11, 0.07, 0.04]
  const tints = alphas.map((a) => toRgba(primaryColor, a))

  const hairV = (left: number) => (
    <div style={{ position: 'absolute', left, top: 0, width: 1, height: 540, backgroundColor: line }} />
  )
  const hairH = (top: number) => (
    <div style={{ position: 'absolute', left: 0, top, width: 960, height: 1, backgroundColor: line }} />
  )

  return (
    <div style={{ display: 'flex', position: 'relative', width: 960, height: 540, backgroundColor: bg }}>
      {GUTTER_SQUARES.map(([c, r, t], i) => (
        <div
          key={i}
          style={{ position: 'absolute', left: c * CELL, top: r * CELL, width: CELL, height: CELL, backgroundColor: tints[t] }}
        />
      ))}

      {hairV(FRAME_LEFT)}
      {hairV(FRAME_RIGHT)}
      {hairH(HEAD_H)}
      {hairH(FOOT_TOP)}

      {/* Ligne d'en-tête */}
      <div
        style={{
          position: 'absolute',
          left: FRAME_LEFT + 1,
          top: 0,
          width: FRAME_RIGHT - FRAME_LEFT - 1,
          height: HEAD_H,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 40,
        }}
      >
        <div style={{ width: 14, height: 14, backgroundColor: primaryColor, marginRight: 16 }} />
        {headline && (
          <div
            style={{
              display: 'flex',
              fontFamily: 'JetBrains Mono',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: fg,
            }}
          >
            {headline}
          </div>
        )}
      </div>

      {/* Titre et description */}
      <div
        style={{
          position: 'absolute',
          left: FRAME_LEFT + 1,
          top: HEAD_H + 1,
          width: FRAME_RIGHT - FRAME_LEFT - 1,
          height: FOOT_TOP - HEAD_H - 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <h1
          style={{
            display: 'block',
            margin: 0,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: -2.5,
            lineHeight: 1.02,
            color: fg,
            lineClamp: 3,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              display: 'block',
              margin: 0,
              marginTop: 24,
              fontSize: 24,
              lineHeight: 1.3,
              color: muted,
              maxWidth: 600,
              lineClamp: 2,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Pied : barre de couleur + flèche */}
      <div
        style={{
          position: 'absolute',
          left: FRAME_LEFT + 1,
          top: FOOT_TOP + 1,
          width: FRAME_RIGHT - FRAME_LEFT - 1,
          height: 540 - FOOT_TOP - 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <div style={{ width: 120, height: 8, backgroundColor: primaryColor }} />
        <div style={{ display: 'flex', fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 22, color: primaryColor }}>→</div>
      </div>
    </div>
  )
}

function GradientTheme({ headline, title, description, primaryColor }: Required<Pick<ThumbnailOptions, 'primaryColor'>> & Omit<ThumbnailOptions, 'primaryColor' | 'theme'>) {
  return (
    <div
      tw="w-full h-full flex flex-col justify-center"
      style={{
        background: `linear-gradient(135deg, #020420 0%, ${primaryColor}33 50%, #020420 100%)`,
      }}
    >
      <div
        tw="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${primaryColor}44 0%, transparent 60%)`,
        }}
      />
      <TextContent headline={headline} title={title} description={description} primaryColor={primaryColor} />
    </div>
  )
}

function MinimalTheme({ headline, title, description, primaryColor }: Required<Pick<ThumbnailOptions, 'primaryColor'>> & Omit<ThumbnailOptions, 'primaryColor' | 'theme'>) {
  return (
    <div tw="w-full h-full flex flex-col justify-center bg-[#020420]">
      <div
        tw="absolute left-0 top-0 bottom-0 w-[6px]"
        style={{ backgroundColor: primaryColor }}
      />
      <TextContent headline={headline} title={title} description={description} primaryColor={primaryColor} />
    </div>
  )
}

export async function generateThumbnail(options: ThumbnailOptions): Promise<string> {
  const { headline, title, description, theme = 'default', scheme = 'light' } = options
  const primaryColor = resolveColor(options.primaryColor)

  const props = { headline, title, description, primaryColor }

  const themeElement =
    theme === 'gradient' ? <GradientTheme {...props} /> :
    theme === 'minimal' ? <MinimalTheme {...props} /> :
    <DefaultTheme {...props} scheme={scheme} />

  return satori(themeElement, {
    width: 960,
    height: 540,
    fonts,
  })
}
