import { DefaultSession, DefaultUser } from "next-auth";

declare module 'next-auth'{
  interface User extends DefaultUser {
    nickname?: string
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      nickname?: string
    } & DefaultSession['user']
  }
}