import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Forte AI Solutions'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #060E1C 0%, #162444 50%, rgba(160,120,64,0.12) 100%)',
          fontFamily: 'serif',
        }}
      >
        {/* Logo Mark */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '6px',
              borderRadius: '2px',
              backgroundColor: '#A07840',
            }}
          />
          <div
            style={{
              width: '40px',
              height: '6px',
              borderRadius: '2px',
              backgroundColor: '#C49A58',
              opacity: 0.75,
            }}
          />
          <div
            style={{
              width: '24px',
              height: '6px',
              borderRadius: '2px',
              backgroundColor: '#7A5C2E',
              opacity: 0.45,
            }}
          />
        </div>

        {/* Company Name */}
        <div
          style={{
            fontSize: '48px',
            color: '#F7F4EE',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Forte
        </div>
        <div
          style={{
            fontSize: '18px',
            color: '#F7F4EE',
            letterSpacing: '0.30em',
            textTransform: 'uppercase',
            opacity: 0.5,
            fontWeight: 300,
            marginTop: '4px',
          }}
        >
          AI Solutions
        </div>

        {/* Page Title */}
        {title !== 'Forte AI Solutions' && (
          <div
            style={{
              fontSize: '28px',
              color: '#C49A58',
              marginTop: '32px',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            {title}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
