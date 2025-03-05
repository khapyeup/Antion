import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    authorized: async ({ request, auth }) => {
      const url = request.nextUrl;

      if (url.pathname.startsWith("/documents")) {
        if (!auth) {
          return NextResponse.redirect(new URL("/login", request.nextUrl));
        } else {
          return true;
        }
      } 
      if (url.pathname.startsWith("/login") && auth) {
        return NextResponse.redirect(new URL("/documents", request.nextUrl));
      }
      return true
    },
  },
});
