import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminDashboard from '@/components/admin/admin-dashboard';
import CompaniesTable from '@/components/admin/companies-table';

export default async function AdminCompaniesPage() {
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
        <CompaniesTable />
      </div>
    </AdminDashboard>
  );
}
