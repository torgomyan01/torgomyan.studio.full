import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminDashboard from '@/components/admin/admin-dashboard';

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/admin/login');
  }

  const user = session.user as any;

  if (user.type !== 'admin' && user.role !== 'admin') {
    redirect('/admin/login');
  }

  return (
    <AdminDashboard username={user.username || user.name || 'Admin'}>
      <div className="admin-dashboard-card">
        <h2>Настройки</h2>
        <p>Здесь будут настройки административной панели.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Уведомления
            </label>
            <p className="text-gray-600 text-sm">
              Настройки уведомлений будут доступны в ближайшее время.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Безопасность
            </label>
            <p className="text-gray-600 text-sm">
              Настройки безопасности будут доступны в ближайшее время.
            </p>
          </div>
        </div>
      </div>
    </AdminDashboard>
  );
}
