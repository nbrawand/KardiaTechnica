import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import './Page.css'

// Wraps each view so it fades/slides in on enter and out on exit.
function Page({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default Page
