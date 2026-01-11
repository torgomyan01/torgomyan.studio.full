# Vercel Deployment - Session Configuration

## Environment Variables Required

Make sure these environment variables are set in Vercel:

1. **NEXTAUTH_URL** - Your production URL (e.g., `https://your-domain.vercel.app`)
2. **NEXTAUTH_SECRET** or **AUTH_SECRET** - A random secret string (generate with `openssl rand -base64 32`)
3. **ADMIN_USERNAME** - Admin username
4. **ADMIN_PASSWORD_HASH** - Bcrypt hash of admin password

## Cookie Configuration

The application automatically detects Vercel environment and uses secure cookies with `__Secure-` prefix.

### Important Notes:

1. **NEXTAUTH_URL must start with `https://`** - This is required for secure cookies
2. **Cookie name** - Automatically uses `__Secure-next-auth.session-token` in production
3. **SameSite** - Set to `lax` for better compatibility
4. **Domain** - Not set, allowing browser to handle it automatically

## Troubleshooting Session Issues

If sessions are not persisting on Vercel:

1. **Check NEXTAUTH_URL** - Must be your exact Vercel domain with `https://`
2. **Check NEXTAUTH_SECRET** - Must be set and match between deployments
3. **Check browser console** - Look for cookie-related errors
4. **Check Vercel logs** - Look for authentication errors
5. **Clear browser cookies** - Old cookies might interfere

## Testing

After deployment:

1. Clear browser cookies for your domain
2. Try logging in
3. Check browser DevTools → Application → Cookies
4. Verify cookie name is `__Secure-next-auth.session-token`
5. Verify cookie has `Secure` and `HttpOnly` flags
