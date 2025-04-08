import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Skip middleware for login page and API routes
  if (path === "/admin/login" || path.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Only check admin paths
  if (path.startsWith("/admin")) {
    // Check for authentication cookie
    const adminAuth = request.cookies.get("adminAuth")
    const isAuthenticated = adminAuth?.value === "true"

    if (!isAuthenticated) {
      // Redirect to login page
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
}
