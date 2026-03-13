'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

interface Props {
  fontSize?: number
  isLandscape?: boolean
}

export default function TypedGreeting({ fontSize = 14, isLandscape = true }: Props) {
  const elRef = useRef<HTMLSpanElement>(null)
  const typedRef = useRef<Typed | null>(null)

  useEffect(() => {
    if (!elRef.current) return

    typedRef.current = new Typed(elRef.current, {
      strings: [
        "Hey, I'm Caleb.",
        'Iovine & Young Academy @ USC.',
        "Let's build something.",
      ],
      typeSpeed: 48,
      backSpeed: 28,
      backDelay: 1800,
      startDelay: 400,
      loop: true,
      cursorChar: '|',
      smartBackspace: false,
    })

    return () => {
      typedRef.current?.destroy()
    }
  }, [])

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        fontSize,
        fontWeight: 400,
        color: 'rgba(255,255,255,0.72)',
        letterSpacing: 0.1,
        lineHeight: 1.4,
        textAlign: 'center',
        minHeight: isLandscape ? 20 : 22,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <span ref={elRef} />
    </div>
  )
}
