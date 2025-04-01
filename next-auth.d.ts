// types/next-auth.d.ts

import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

// Extend the default session type to include the accessToken
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string; // Access token can be present, but it’s optional
  }

  interface User extends DefaultUser {
    accessToken?: string; // Optionally add accessToken to the User type
  }

  interface JWT {
    accessToken?: string; // Add accessToken to JWT type as well
  }
}
