'use client';

import { useActionState } from 'react';
import { adminLoginAction } from '@/app/actions/admin';
import './_admin-login.scss';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLoginAction, {
    success: false,
  });

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Вход в админ панель</h1>
        <form action={formAction} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              disabled={isPending}
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={isPending}
            />
          </div>
          {state.error && (
            <div className="admin-login-error">{state.error}</div>
          )}
          <button
            type="submit"
            className="admin-login-button"
            disabled={isPending}
          >
            {isPending ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
