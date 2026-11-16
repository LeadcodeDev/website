import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Square {
  col: number
  row: number
  colorClass: string
}

const DEFAULT_GRID = 75
const DEFAULT_COUNT = 10
const COLORS = [
  'bg-primary/30',
  'bg-primary/20',
  'bg-primary/45',
  'bg-sky-400/25',
  'bg-cyan-400/20',
]
const DIRECTIONS = [
  { dc: 0, dr: -1 },
  { dc: 0, dr: 1 },
  { dc: -1, dr: 0 },
  { dc: 1, dr: 0 },
]

function randomCell(cols: number, rows: number) {
  return {
    col: Math.floor(Math.random() * cols),
    row: Math.floor(Math.random() * rows),
  }
}

function makeSquares(cols: number, rows: number, count: number, colors: string[]): Square[] {
  return Array.from({ length: count }, (_, i) => ({
    ...randomCell(cols, rows),
    colorClass: colors[i % colors.length],
  }))
}

export interface BackgroundAnimationProps {
  /** Cell and square size in px */
  grid?: number
  /** Fixed number of squares (ignored when `density` is set) */
  count?: number
  /** Squares per grid cell: scales the count with the container area (tall gutters) */
  density?: number
  colors?: string[]
}

export function BackgroundAnimation({
  grid = DEFAULT_GRID,
  count = DEFAULT_COUNT,
  density,
  colors = COLORS,
}: BackgroundAnimationProps = {}) {
  const GRID = grid
  const SIZE = grid
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ cols: 8, rows: 5 })
  const [squares, setSquares] = useState<Square[]>(() => makeSquares(8, 5, density ? 6 : count, colors))
  const [ready, setReady] = useState(false)
  const hasMeasured = useRef(false)
  const lastDims = useRef({ cols: 0, rows: 0 })

  useLayoutEffect(() => {
    function measure() {
      const el = containerRef.current
      if (!el) return
      const cols = Math.max(1, Math.ceil(el.offsetWidth / GRID))
      const rows = Math.max(4, Math.ceil(el.offsetHeight / GRID))
      if (hasMeasured.current && cols === lastDims.current.cols && rows === lastDims.current.rows) return
      lastDims.current = { cols, rows }
      setDims({ cols, rows })
      setSquares(makeSquares(cols, rows, density ? Math.max(6, Math.round(cols * rows * density)) : count, colors))
      hasMeasured.current = true
    }
    measure()
    // The container height changes once content has loaded, so observe it rather than only the window.
    const el = containerRef.current
    const observer = el ? new ResizeObserver(measure) : null
    if (el && observer) observer.observe(el)
    return () => observer?.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GRID, count, density])

  useEffect(() => {
    if (!hasMeasured.current) return
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!squares.length) return

    const timers = squares.map((_, i) =>
      setInterval(
        () => {
          setSquares((prev) =>
            prev.map((sq, j) => {
              if (j !== i) return sq
              const { dc, dr } = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
              return {
                ...sq,
                col: Math.min(dims.cols - 1, Math.max(0, sq.col + dc)),
                row: Math.min(dims.rows - 1, Math.max(0, sq.row + dr)),
              }
            }),
          )
        },
        900 + i * 250 + Math.random() * 600,
      ),
    )

    return () => timers.forEach(clearInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares.length, dims.cols, dims.rows])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {squares.map((sq, i) => (
        <div
          key={i}
          className={`absolute ${sq.colorClass} ${ready ? 'transition-transform ease-in-out duration-700' : ''}`}
          style={{
            width: SIZE,
            height: SIZE,
            transform: `translate3d(${sq.col * GRID + (GRID - SIZE) / 2}px, ${sq.row * GRID + (GRID - SIZE) / 2}px, 0)`,
          }}
        />
      ))}
    </div>
  )
}
