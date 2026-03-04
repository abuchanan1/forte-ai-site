import { NAV_LINKS } from '@/lib/constants'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { NavbarClient } from './NavbarClient'

export function Navbar() {
  return (
    <NavbarClient>
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <a href="/" aria-label="Forte AI Solutions home">
          <Logo size={36} />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm font-normal text-white/70 transition-colors duration-200 hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="/contact" size="sm">
            Request a Demo
          </Button>
        </div>

        <MobileMenuButton />
      </nav>
    </NavbarClient>
  )
}

function MobileMenuButton() {
  return (
    <button
      type="button"
      className="flex flex-col gap-1.5 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      aria-label="Open menu"
      data-mobile-menu-trigger
    >
      <span className="block h-0.5 w-6 bg-white" />
      <span className="block h-0.5 w-6 bg-white" />
      <span className="block h-0.5 w-4 bg-white" />
    </button>
  )
}
