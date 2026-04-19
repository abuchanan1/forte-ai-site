'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

const STORAGE_KEY = 'forte-cookie-consent'
const EVENT_NAME = 'forte:consent-change'

export function ConsentAwareAnalytics({ gaId }: { gaId: string }) {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const read = () => setAccepted(localStorage.getItem(STORAGE_KEY) === 'accepted')
    read()
    const onChange = () => read()
    window.addEventListener(EVENT_NAME, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(EVENT_NAME, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  if (!accepted) return null
  return <GoogleAnalytics gaId={gaId} />
}
