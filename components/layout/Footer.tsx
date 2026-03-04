import { COMPANY, NAV_LINKS } from '@/lib/constants'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  return (
    <footer className="border-t border-brass/15 bg-navy-deep" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo size={32} />
            <p className="mt-4 max-w-xs font-body text-sm font-light leading-body text-white/50">
              Turning messy data into decisions that move organizations
              forward.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass">
              Navigation
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm font-normal text-white/60 transition-colors hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[10px] font-medium uppercase tracking-mono-wide text-brass">
              Contact
            </h2>
            <a
              href={`mailto:${COMPANY.email}`}
              className="mt-4 block font-body text-sm font-normal text-white/60 transition-colors hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              {COMPANY.email}
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-brass/10 pt-6">
          <p className="font-mono text-[10px] font-normal uppercase tracking-mono text-white/25">
            {COMPANY.founded} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
