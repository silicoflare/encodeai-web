import db from "@/lib/db";
import { compareSync } from "bcryptjs";
import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: "student" | "admin";
    };
  }
  interface User {
    id: string;
    name: string;
    role: "student" | "admin";
  }
}

const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: "student-auth",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password" },
      },
      async authorize(credentials, req) {
        const user = await db.student.findFirst({
          where: {
            srn: credentials?.username,
          },
        });

        if (!user || !compareSync(credentials!.password, user.password)) {
          return null;
        }

        return {
          id: user.srn,
          name: user.name,
          role: "student",
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as "student" | "admin";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    // signIn: "/",
    signOut: "/",
  },
};

export default authOptions;
