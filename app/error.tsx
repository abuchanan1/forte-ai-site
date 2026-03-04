'use client'

import { Button } from '@/components/ui/Button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-deep px-6 text-center">
      <div className="mb-4 h-px w-8 bg-brass" />
      <h1 className="font-display text-4xl font-normal leading-display text-white md:text-5xl">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-md font-body text-base font-light text-white/60">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8">
        <Button variant="ghost" size="lg" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
