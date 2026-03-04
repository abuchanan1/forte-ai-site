import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Generate a CSP nonce per request
  const nonce = crypto.randomUUID()

  const response = NextResponse.next()

  // Set nonce header for use in layout.tsx
  response.headers.set('x-csp-nonce', nonce)

  // Set pathname header for use in server components
  response.headers.set('x-pathname', request.nextUrl.pathname)

  // TODO: Add auth checks here when needed

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)',
  ],
}
