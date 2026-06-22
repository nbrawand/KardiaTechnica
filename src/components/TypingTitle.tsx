import { useEffect, useState } from 'react'
import './TypingTitle.css'

type TypingTitleProps = {
  text: string
  /** ms between each character */
  speed?: number
  /** when true, (re)type from the start; when false, leave text as-is */
  play?: boolean
}

function TypingTitle({ text, speed = 90, play = true }: TypingTitleProps) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    // While not playing, keep whatever's shown (so it can fade out intact).
    if (!play) return

    // Playing: restart the type-on from an empty string.
    setTyped('')
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)

    return () => clearInterval(id)
  }, [play, text, speed])

  return <h1 className="typing-title">{typed}</h1>
}

export default TypingTitle
