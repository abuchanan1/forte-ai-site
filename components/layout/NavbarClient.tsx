'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

interface NavbarClientProps {
  children: React.ReactNode
}

export function NavbarClient({ children }: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openMenu = useCallback(() => {
    triggerRef.current = document.querySelector(
      '[data-mobile-menu-trigger]',
    )
    setMobileOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setMobileOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    const trigger = document.querySelector<HTMLButtonElement>(
      '[data-mobile-menu-trigger]',
    )
    trigger?.addEventListener('click', openMenu)
    return () => trigger?.removeEventListener('click', openMenu)
  }, [openMenu])

  useEffect(() => {
    if (!mobileOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        return
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, closeMenu])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      const firstLink = drawerRef.current?.querySelector<HTMLElement>('a')
      firstLink?.focus()
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out',
          scrolled
            ? 'bg-navy/90 backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        {children}
      </header>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-navy-deep/80"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-y-0 right-0 z-50 w-72 bg-navy-mid p-8"
          >
            <button
              type="button"
              onClick={closeMenu}
              className="mb-8 font-body text-sm text-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              aria-label="Close menu"
            >
              Close
            </button>
            <div className="mb-8">
              <Logo size={28} />
            </div>
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="font-body text-base font-normal text-white/70 transition-colors hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/contact" size="md" onClick={closeMenu}>
                Request a Demo
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
