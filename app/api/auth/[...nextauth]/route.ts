import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }

    interface JWT {
        accessToken?: string;
    }
}

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token; // Assigning access token from account
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken =
                typeof token.accessToken === "string"
                    ? token.accessToken
                    : undefined; // Type check for safety
            return session;
        },
    },
});

export { handler as GET, handler as POST };
