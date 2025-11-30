import createMiddleware from 'next-intl/middleware'
import { routing } from './lib/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest): NextResponse {
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
