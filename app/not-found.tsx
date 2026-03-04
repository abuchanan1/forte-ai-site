import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-deep px-6 text-center">
      <Logo size={48} />
      <h1 className="mt-10 font-display text-4xl font-normal leading-display text-white md:text-5xl">
        This page does not exist.
      </h1>
      <p className="mt-4 font-body text-base font-light text-white/60">
        But your data problem does. Let us help with that.
      </p>
      <div className="mt-8">
        <Button href="/" variant="ghost" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  )
}
