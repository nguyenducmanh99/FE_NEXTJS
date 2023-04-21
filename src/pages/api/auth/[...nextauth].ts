import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "512879808992-i75pdh0f26j508cvt4ft8eoutp1p08f1.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
};

export default NextAuth(authOptions);
