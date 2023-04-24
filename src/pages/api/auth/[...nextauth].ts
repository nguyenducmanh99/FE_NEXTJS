import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.APP_GOOGLE_ID as string,
      clientSecret: process.env.APP_GOOGLE_SECRET as string,
    }),
  ],
};

export default NextAuth(authOptions);
