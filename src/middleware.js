import { NextResponse } from 'next/server'

const rateLimit = new Map()
const WINDOW = 60000 // 1 minute
const MAX_REQS = 60

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // 跳过静态资源
  if (/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$/i.test(pathname)) {
    return NextResponse.next()
  }

  // 速率限制
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  const now = Date.now()
  const windowStart = now - WINDOW
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, [])
  }
  
  const timestamps = rateLimit.get(ip).filter(t => t > windowStart)
  
  if (timestamps.length >= MAX_REQS) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' }
    })
  }
  
  timestamps.push(now)
  rateLimit.set(ip, timestamps)

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
