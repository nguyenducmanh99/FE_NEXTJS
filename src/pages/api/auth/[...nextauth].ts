import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
export interface IJWT {
  token: any;
  account: any;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.APP_GOOGLE_ID as string,
      clientSecret: process.env.APP_GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.APP_GITHUB_ID as string,
      clientSecret: process.env.APP_GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: IJWT) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
