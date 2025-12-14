'use client';

import { useRouter } from 'next/navigation';
import { adminLogoutAction } from '@/app/actions/admin';
import ChatInquiriesTable from './chat-inquiries-table';
import AdminSidebar from './admin-sidebar';
import './_admin-dashboard.scss';
import { ReactNode } from 'react';

interface AdminDashboardProps {
  username: string;
  children?: ReactNode;
}

export default function AdminDashboard({ username, children }: AdminDashboardProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogoutAction();
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-dashboard-main">
        <header className="admin-dashboard-header">
          <h1>Админ Панель</h1>
          <div className="admin-dashboard-user">
            <span>Добро пожаловать, {username}</span>
            <button onClick={handleLogout} className="admin-dashboard-logout">
              Выйти
            </button>
          </div>
        </header>
        <main className="admin-dashboard-content">
          {children || (
            <>
              <div className="admin-dashboard-card">
                <h2>Админ Панель</h2>
                <p>Вы успешно вошли в систему как администратор.</p>
                <p>
                  Это защищенная область администратора, защищенная серверной
                  аутентификацией NextAuth.
                </p>
              </div>
              <div className="admin-dashboard-card">
                <ChatInquiriesTable />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
