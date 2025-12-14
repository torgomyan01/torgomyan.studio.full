// src/lib/auth.ts
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
    signOut: '/admin/login',
    error: '/admin/login',
  },
  providers: [
    // Admin credentials provider
    Credentials({
      id: 'admin',
      name: 'Admin',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        const username = (creds?.username as string)?.trim() || '';
        const password = String(creds?.password ?? '');

        if (!username || !password) {
          return null;
        }

        // Import admin credentials
        const { adminCredentials } = await import('@/config/admin-credentials');
        const adminUsername =
          adminCredentials.username || process.env.ADMIN_USERNAME?.trim();
        const adminPasswordHash =
          adminCredentials.passwordHash ||
          process.env.ADMIN_PASSWORD_HASH?.trim();

        if (!adminUsername || !adminPasswordHash) {
          return null;
        }

        // Verify username
        if (username !== adminUsername) {
          // Use bcrypt.compare even for wrong username to prevent timing attacks
          await bcrypt.compare(password, adminPasswordHash);
          return null;
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, adminPasswordHash);
        if (!passwordMatch) {
          return null;
        }

        return {
          id: 'admin',
          name: adminUsername,
          email: `${adminUsername}@admin.local`,
          role: 'admin',
          type: 'admin',
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Handle admin authentication
      if (
        user &&
        ((user as any).type === 'admin' || (user as any).role === 'admin')
      ) {
        token.sub = (user as any).id ?? 'admin';
        token.email = (user as any).email;
        (token as any).role = 'admin';
        (token as any).type = 'admin';
        (token as any).username = (user as any).name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // Handle admin session
        (session.user as any).id = token.sub;
        (session.user as any).email = token.email;
        (session.user as any).role = 'admin';
        (session.user as any).type = 'admin';
        (session.user as any).username = (token as any).username;
        (session.user as any).name = (token as any).username || token.email;
      }
      return session;
    },
  },
};
