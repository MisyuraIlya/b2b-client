import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { customerServer } from "@/provider/api";
import urls from "@/provider/api/urls";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: (60 * 60 * 8) - (60 * 10)
  },
  pages: {
    signIn: '/login'
  },
  secret: 'dq1hgDy3dHS6kI3ixiH/zfWDed5Pt2wMT2BQhHriJj8=',
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password"
        },
      },
      async authorize(credentials) {
        try {
          const data = await customerServer.fetch<{ token: string }>(urls.customer.login, { method: 'POST', body: JSON.stringify({ email: credentials?.email, password: credentials?.password }), headers: { 'Content-Type': 'application/json' } })
          return { email: credentials!.email, token: data.token as string, id: credentials!.email };
        } catch (e) {
          throw e;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (
          c !== "iat" &&
          c !== "exp" &&
          c !== "jti" &&
          c !== "token"
        ) {
          return { ...p, [c]: token[c] }
        } else {
          return p
        }
      }, {})
      return { ...session, user: sanitizedToken, token: token.token }
    },
    async jwt({ token, user }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        return user as unknown as any
      }
      return token
    }
  }
};