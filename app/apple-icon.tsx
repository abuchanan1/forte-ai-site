import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          background: '#0C1B33',
          gap: '6px',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '8px',
            borderRadius: '2px',
            backgroundColor: '#A07840',
          }}
        />
        <div
          style={{
            width: '40px',
            height: '8px',
            borderRadius: '2px',
            backgroundColor: '#C49A58',
            opacity: 0.75,
          }}
        />
        <div
          style={{
            width: '24px',
            height: '8px',
            borderRadius: '2px',
            backgroundColor: '#7A5C2E',
            opacity: 0.45,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
