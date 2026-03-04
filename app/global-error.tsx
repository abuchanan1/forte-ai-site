'use client'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#060E1C',
          color: '#F7F4EE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 400 }}>
            Something went wrong.
          </h1>
          <p
            style={{
              marginTop: '16px',
              opacity: 0.6,
              fontSize: '16px',
              fontWeight: 300,
            }}
          >
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            type="button"
            style={{
              marginTop: '32px',
              padding: '12px 32px',
              border: '1px solid rgba(247,244,238,0.3)',
              background: 'transparent',
              color: '#F7F4EE',
              cursor: 'pointer',
              fontSize: '14px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
