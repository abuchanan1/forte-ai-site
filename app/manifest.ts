import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Forte AI Solutions',
    short_name: 'Forte',
    description:
      'Forte transforms fragmented enterprise data into structured intelligence.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#0C1B33',
    background_color: '#060E1C',
  }
}
