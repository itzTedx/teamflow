import { NextRequest, NextResponse } from "next/server";

import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      allow: ["CATEGORY:PREVIEW", "CATEGORY:MONITOR", "CATEGORY:WEBHOOK"],
    }),
  ],
});

async function existingMiddleware(req: NextRequest) {
  const { getClaim } = getKindeServerSession();
  const orgCode = await getClaim("org_code");

  const url = req.nextUrl;

  if (url.pathname.startsWith("/workspace") && !url.pathname.includes(orgCode?.value || "")) {
    url.pathname = `/workspace/${orgCode?.value}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default createMiddleware(aj, existingMiddleware);

export const config = {
  // matcher tells Next.js which routes to run the middleware on.
  // This runs the middleware on all routes except for static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
