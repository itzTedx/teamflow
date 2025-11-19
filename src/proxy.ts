import arcjet, { createMiddleware, detectBot } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      allow: ["CATEGORY:PREVIEW", "CATEGORY:MONITOR", "CATEGORY:WEBHOOK"],
    }),
  ],
});

export default createMiddleware(aj);

export const config = {
  // matcher tells Next.js which routes to run the middleware on.
  // This runs the middleware on all routes except for static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
