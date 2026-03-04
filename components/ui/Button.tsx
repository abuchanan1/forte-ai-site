'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brass text-navy-deep hover:shadow-[0_0_20px_rgba(160,120,64,0.3)] active:opacity-90',
  ghost:
    'bg-transparent border border-white/30 text-white hover:border-brass hover:shadow-[0_0_20px_rgba(160,120,64,0.15)]',
  text: 'bg-transparent text-white hover:text-brass-light',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-body font-semibold uppercase tracking-button transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-40 cursor-not-allowed',
    loading && 'opacity-70 cursor-wait',
    className,
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} data-cta>
        {loading ? <LoadingSpinner /> : children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      data-cta
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  )
}

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
