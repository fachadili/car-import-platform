import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/dashboard"];

      if (protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
        return isLoggedIn;
      }

      return true;
    }
  }
} satisfies NextAuthConfig;
