import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { queryToDB } from "@/utils/db";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const user = await queryToDB({
            query: `SELECT * FROM users WHERE email = '${email}'`,
            value: [],
          });

          if (!user.length) {
            return null;
          }

          // const passwordMath = await bcrypt.compare(password, user[0].password);

          if (password !== user[0].password) {
            return null;
          }

          return user[0];
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          idToken: user.user_id,
          accessToken: user.token,
          roleToken: user.role,
          refreshToken: user.refreshToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.role = token.roleToken;
      session.user.id = token.idToken;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
