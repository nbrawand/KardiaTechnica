import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TypingTitle from './components/TypingTitle'
import IconRow from './components/IconRow'
import Mission from './sections/Mission'
import Technology from './sections/Technology'
import Dialog from './sections/Dialog'
import './App.css'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="shell" data-home={isHome}>
      {/* Persistent header: never unmounts, so the title/icons keep their
          state. `layout` animates it from centered (home) to docked (top). */}
      <motion.header
        className="masthead"
        layout
        transition={{ layout: { duration: 0.6, ease: 'easeInOut' } }}
      >
        {/* title floats ABOVE the icon (out of flow) and just fades, so
            showing/hiding it never shifts the icon vertically */}
        <motion.div
          className="masthead-title"
          animate={{ opacity: isHome ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ pointerEvents: isHome ? 'auto' : 'none' }}
          aria-hidden={!isHome}
        >
          <TypingTitle text="KardiaTechnica" play={isHome} />
        </motion.div>
        <IconRow />
      </motion.header>

      {/* Content swaps below; mode="wait" clears the old before showing new. */}
      <main className="content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={null} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/dialog" element={<Dialog />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
