import { DefaultSession } from 'next-auth'

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Also include the user's ID */
      id: string
    } & DefaultSession["user"]
  }
}