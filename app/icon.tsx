import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
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
          background: '#060E1C',
          gap: '2px',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '3px',
            borderRadius: '1px',
            backgroundColor: '#A07840',
          }}
        />
        <div
          style={{
            width: '14px',
            height: '3px',
            borderRadius: '1px',
            backgroundColor: '#C49A58',
            opacity: 0.75,
          }}
        />
        <div
          style={{
            width: '8px',
            height: '3px',
            borderRadius: '1px',
            backgroundColor: '#7A5C2E',
            opacity: 0.45,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
