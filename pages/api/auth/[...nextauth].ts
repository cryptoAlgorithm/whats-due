import NextAuth from 'next-auth';
import mongoPromise from '../../../lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import AzureADProvider from "next-auth/providers/azure-ad";
import { ObjectId } from 'mongodb';

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  secret: 'jrqxZMvBgrPAAd+GttXOGpd3zuX8wP/49gQUFiWeSW0=', // Used to encrypt session data
  adapter: MongoDBAdapter(mongoPromise),
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      const db = (await mongoPromise).db();
      return !!(await db.collection('classes').findOne({ members: { $in: [new ObjectId(user.id)] }}));
    },
    async session({ session, user, token }) {
      return { ...session, user: { ...user } };
    },
  }
})