import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
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
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          type: "string",
        },
        accessToken: { type: "string" },
        expired: { type: "string" },
      },
      async authorize(credentials): Promise<any> {
        return credentials;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/404",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.expiresIn = user.expired;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.expiresIn = token.expiresIn as number;
      return session;
    },
  },
  session: {
    maxAge: 24 * 60 * 60, // 1 day
  },
};

export default NextAuth(authOptions);
