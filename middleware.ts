import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("midd-req", req);
    const token = req.nextauth.token;
    console.log("middleware-token--", token);
    // Check if user is trying to access employer routes
    if (req.nextUrl.pathname.startsWith('/profiles')) {
      if (token?.role !== "EMPLOYER") {
        // Redirect to home page with an error message in the URL
        return NextResponse.redirect(
          new URL('/?error=unauthorized&message=Employer access only', req.url)
        );
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token // ensure there is a token
    },
  }
);


// Configure which routes to protect
export const config = {
  matcher: ["/profiles/:path*"]
};