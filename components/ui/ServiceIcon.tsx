'use client'

interface ServiceIconProps {
  icon: 'pipeline' | 'dashboard' | 'model'
  size?: number
}

export function ServiceIcon({ icon, size = 40 }: ServiceIconProps) {
  const iconMap = {
    pipeline: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="rgba(160,120,64,0.12)" />
        <path d="M12 14h4v12h-4M24 14h4v12h-4M16 20h8" stroke="#C49A58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="2" fill="#C49A58" opacity="0.5" />
        <circle cx="28" cy="26" r="2" fill="#C49A58" opacity="0.5" />
      </svg>
    ),
    dashboard: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="rgba(160,120,64,0.12)" />
        <rect x="10" y="10" width="8" height="8" rx="1" stroke="#C49A58" strokeWidth="1.5" />
        <rect x="22" y="10" width="8" height="4" rx="1" stroke="#C49A58" strokeWidth="1.5" />
        <rect x="22" y="18" width="8" height="12" rx="1" stroke="#C49A58" strokeWidth="1.5" />
        <rect x="10" y="22" width="8" height="8" rx="1" stroke="#C49A58" strokeWidth="1.5" />
        <path d="M12 28l3-4 2 2 3-4" stroke="#C49A58" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
    ),
    model: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="rgba(160,120,64,0.12)" />
        <circle cx="20" cy="14" r="3" stroke="#C49A58" strokeWidth="1.5" />
        <circle cx="12" cy="26" r="3" stroke="#C49A58" strokeWidth="1.5" />
        <circle cx="28" cy="26" r="3" stroke="#C49A58" strokeWidth="1.5" />
        <path d="M18 16.5l-4 7M22 16.5l4 7M15 26h10" stroke="#C49A58" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <circle cx="20" cy="14" r="1" fill="#C49A58" />
        <circle cx="12" cy="26" r="1" fill="#C49A58" />
        <circle cx="28" cy="26" r="1" fill="#C49A58" />
      </svg>
    ),
  }

  return iconMap[icon] || null
}
