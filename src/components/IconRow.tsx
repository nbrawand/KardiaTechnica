import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './IconRow.css'

type IconDef = { label: string; shape: React.ReactNode }

// Three placeholder outline icons mapped to their label.
// Swap the `shape` SVG for meaningful icons later — labels stay the same.
const ICONS: IconDef[] = [
  {
    label: 'mission',
    // target / bullseye
    shape: (
      <>
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="7" />
      </>
    ),
  },
  {
    label: 'technology',
    // hexagon
    shape: <polygon points="24,5 41,15 41,33 24,43 7,33 7,15" />,
  },
  {
    label: 'dialog',
    // two opposing arcs — back-and-forth exchange
    shape: (
      <>
        <path d="M18,8 a20,20 0 0 0 0,32" />
        <path d="M30,8 a20,20 0 0 1 0,32" />
      </>
    ),
  },
]

function IconItem({ label, shape, index }: IconDef & { index: number }) {
  const navigate = useNavigate()
  const location = useLocation()
  const active = location.pathname === `/${label}`

  const [typed, setTyped] = useState('')
  const [hovering, setHovering] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startTyping = () => {
    setHovering(true)
    if (active) return // active label is always shown in full
    stop()
    let i = 0
    intervalRef.current = window.setInterval(() => {
      i += 1
      setTyped(label.slice(0, i))
      if (i >= label.length) stop()
    }, 70)
  }

  const handleLeave = () => {
    setHovering(false)
    stop()
    setTyped('')
  }

  // When selection flips, drop any hover/typed state so stale text can't
  // linger under the icon after it's unselected (the slide can swallow mouseleave).
  useEffect(() => {
    setHovering(false)
    setTyped('')
    stop()
  }, [active])

  // Clean up the timer if the component unmounts mid-type.
  useEffect(() => () => stop(), [])

  // Click toggles: go to the view, or back home if it's already active.
  const handleClick = () => navigate(active ? '/' : `/${label}`)

  return (
    <motion.button
      type="button"
      // `layout` animates this icon sliding to center when its siblings leave
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 0.35 }, layout: { duration: 0.6, ease: 'easeInOut' } }}
      className={`icon-slot${active ? ' is-active' : ''}`}
      onMouseEnter={startTyping}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {/* inner element owns the float so it never fights the layout transform */}
      <span className="icon-item" style={{ animationDelay: `${index * -1.3}s` }}>
        <svg
          className="icon"
          viewBox="0 0 48 48"
          style={{ animationDelay: `${index * 0.4}s` }}
          aria-hidden="true"
        >
          {shape}
        </svg>
        <span className="icon-label">
          {active ? label : hovering ? typed : ''}
        </span>
      </span>
    </motion.button>
  )
}

function IconRow() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Home: show all. On a view: show only the selected icon.
  const visible = isHome
    ? ICONS
    : ICONS.filter((icon) => location.pathname === `/${icon.label}`)

  return (
    <div className="icon-row">
      <AnimatePresence>
        {visible.map((icon) => (
          <IconItem
            key={icon.label}
            label={icon.label}
            shape={icon.shape}
            index={ICONS.indexOf(icon)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default IconRow
