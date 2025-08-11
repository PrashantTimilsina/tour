import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/db/db";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connect();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("User not found");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials?.password as string,
            user.password
          );
          if (!isPasswordValid) {
            return null;
          }
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        await connect();
        const existingUser = await User.findOne({ email: profile?.email });
        if (!existingUser) {
          await User.create({
            name: profile?.name,
            email: profile?.email,

            provider: [account?.provider],
          });
        } else {
          if (!existingUser.provider.includes(account.provider)) {
            existingUser.provider.push(account.provider);
            await existingUser.save();
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString();
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token?.name,
          email: token?.email,
          image: token?.picture as string,
        };
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
