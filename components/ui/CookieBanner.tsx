'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('forte-cookie-consent')
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('forte-cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('forte-cookie-consent', 'declined')
    setVisible(false)
    // Disable GA if user declines
    if (typeof window !== 'undefined') {
      const gaId = process.env.NEXT_PUBLIC_GA_ID
      if (gaId) {
        (window as Record<string, unknown>)[`ga-disable-${gaId}`] = true
      }
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-navy/95 backdrop-blur-md px-6 py-4 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-body text-sm font-light text-white/60">
                We use cookies and analytics to improve your experience.{' '}
                <Link
                  href="/privacy"
                  className="text-brass-light/80 underline underline-offset-2 hover:text-brass transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={decline}
                  className="font-body text-xs font-medium uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors px-4 py-2"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="font-body text-xs font-semibold uppercase tracking-wider bg-brass text-navy-deep px-5 py-2 rounded hover:shadow-[0_0_15px_rgba(160,120,64,0.3)] transition-all"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
