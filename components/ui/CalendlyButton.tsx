'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

const CALENDLY_URL =
  'https://calendly.com/abuchanan-forteaisolutions/30min?primary_color=C49A58&text_color=F7F4EE&hide_landing_page_details=1'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

interface Props {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'ghost'
}

export function CalendlyButton({
  children = 'Book a 30-min Call',
  size = 'md',
  variant = 'primary',
}: Props) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const cssHref = 'https://assets.calendly.com/assets/external/widget.css'
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssHref
      document.head.appendChild(link)
    }
    const scriptSrc = 'https://assets.calendly.com/assets/external/widget.js'
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script')
      script.src = scriptSrc
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  function open() {
    if (typeof window === 'undefined') return
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Button onClick={open} size={size} variant={variant}>
      {children}
    </Button>
  )
}
