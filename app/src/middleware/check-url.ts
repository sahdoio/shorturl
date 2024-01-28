// pages/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log(`[check-url] Request to ${ req.nextUrl.pathname }`);

  // You can add custom logic here
  // For example, redirect based on some condition
  // if (req.nextUrl.pathname === '/old-path') {
  //   return NextResponse.redirect('/new-path');
  // }

  // Continue to the next middleware or return the response
  return NextResponse.next();
}
