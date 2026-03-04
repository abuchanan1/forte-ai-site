import { NextResponse } from 'next/server'
import { COMPANY, SERVICES, PAGES } from '@/lib/constants'
import type { CompanyInfoResponse } from '@/types'

export async function GET() {
  const data: CompanyInfoResponse = {
    name: COMPANY.name,
    tagline: COMPANY.tagline,
    description: COMPANY.description,
    services: SERVICES,
    founded: COMPANY.founded,
    contact: {
      email: COMPANY.email,
    },
    pages: PAGES,
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
