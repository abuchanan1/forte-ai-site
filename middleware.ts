import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Basic auth gate for /admin/*
  if (url.pathname.startsWith('/admin')) {
    const user = process.env.ADMIN_USERNAME
    const pass = process.env.ADMIN_PASSWORD
    if (!user || !pass) {
      return new NextResponse('Admin not configured.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' },
      })
    }
    const header = request.headers.get('authorization') ?? ''
    if (!header.startsWith('Basic ')) {
      return new NextResponse('Authentication required.', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Forte Admin"' },
      })
    }
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf-8')
    const [u, p] = decoded.split(':')
    if (u !== user || p !== pass) {
      return new NextResponse('Invalid credentials.', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Forte Admin"' },
      })
    }
  }

  // Generate a CSP nonce per request
  const nonce = crypto.randomUUID()
  const response = NextResponse.next()
  response.headers.set('x-csp-nonce', nonce)
  response.headers.set('x-pathname', request.nextUrl.pathname)

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt).*)',
  ],
}
