import connect from "@/app/lib/db";
import User from "@/app/models/User";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export async function LoginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
}

export async function LoginIsRequiredClient() {}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
