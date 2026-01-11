'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { encode } from 'next-auth/jwt';

export async function adminLoginAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      return { success: false, error: 'Требуется имя пользователя и пароль' };
    }

    // Import admin credentials
    const { adminCredentials } = await import('@/config/admin-credentials');
    const adminUsername =
      adminCredentials.username || process.env.ADMIN_USERNAME?.trim();
    const adminPasswordHash =
      adminCredentials.passwordHash || process.env.ADMIN_PASSWORD_HASH?.trim();

    if (!adminUsername || !adminPasswordHash) {
      return {
        success: false,
        error: 'Учетные данные администратора не настроены',
      };
    }

    // Verify username
    if (username !== adminUsername) {
      // Use bcrypt.compare even for wrong username to prevent timing attacks
      await bcrypt.compare(password, adminPasswordHash);
      return { success: false, error: 'Неверные учетные данные' };
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, adminPasswordHash);
    if (!passwordMatch) {
      return { success: false, error: 'Неверные учетные данные' };
    }

    // Create user object for JWT
    const user = {
      id: 'admin',
      name: adminUsername,
      email: `${adminUsername}@admin.local`,
      role: 'admin',
      type: 'admin',
    };

    // Create JWT token
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (!secret) {
      return { success: false, error: 'Секрет аутентификации не настроен' };
    }

    const token = await encode({
      token: {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: 'admin',
        type: 'admin',
        username: user.name,
      },
      secret,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    // Set session cookie
    // NextAuth v4 automatically adds __Secure- prefix when secure is true
    // We should use the base name 'next-auth.session-token' and let NextAuth handle the prefix
    const nextAuthUrl = process.env.NEXTAUTH_URL || '';
    const isSecure =
      process.env.NODE_ENV === 'production' ||
      process.env.VERCEL === '1' ||
      nextAuthUrl.startsWith('https://');

    // Use the base cookie name - NextAuth will handle __Secure- prefix automatically
    // But when setting manually, we need to use the full name
    const cookieName = isSecure
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token';

    const cookieStore = await cookies();

    // Delete old cookie first if it exists with different name to avoid conflicts
    if (isSecure) {
      cookieStore.delete('next-auth.session-token');
    } else {
      cookieStore.delete('__Secure-next-auth.session-token');
    }

    cookieStore.set(cookieName, token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
      // Don't set domain - let browser handle it automatically for Vercel
    });

    // Success - redirect to admin dashboard
    redirect('/admin');
  } catch (error: any) {
    console.error('Admin login error:', error);

    // Re-throw redirect errors
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    return {
      success: false,
      error: error?.message || 'Ошибка входа',
    };
  }
}

export async function adminLogoutAction() {
  'use server';
  const cookieStore = await cookies();
  const nextAuthUrl = process.env.NEXTAUTH_URL || '';
  const isSecure =
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL === '1' ||
    nextAuthUrl.startsWith('https://');

  // Delete both possible cookie names to ensure logout works
  cookieStore.delete('next-auth.session-token');
  cookieStore.delete('__Secure-next-auth.session-token');

  redirect('/admin/login');
}
