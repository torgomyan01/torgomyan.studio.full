'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './_admin-sidebar.scss';

interface MenuItem {
  label: string;
  path: string;
  icon?: string;
}

const menuItems: MenuItem[] = [
  {
    label: 'Панель управления',
    path: '/admin',
    icon: '📊',
  },
  {
    label: 'Заявки из чата',
    path: '/admin/inquiries',
    icon: '💬',
  },
  {
    label: 'Запланированные звонки',
    path: '/admin/scheduled-calls',
    icon: '📞',
  },
  {
    label: 'Заявки из калькулятора',
    path: '/admin/calculator-submissions',
    icon: '🧮',
  },
  {
    label: 'Настройки',
    path: '/admin/settings',
    icon: '⚙️',
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Update body margin when sidebar collapses
    const body = document.body;
    if (isCollapsed) {
      body.style.setProperty('--sidebar-width', '70px');
    } else {
      body.style.setProperty('--sidebar-width', '250px');
    }
  }, [isCollapsed]);

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header">
        {!isCollapsed && <h2 className="admin-sidebar-logo">Админ</h2>}
        <button
          className="admin-sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="admin-sidebar-nav">
        <ul className="admin-sidebar-menu">
          {menuItems.map((item) => {
            // Check if current path matches the menu item path exactly
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`admin-sidebar-menu-item ${
                    isActive ? 'active' : ''
                  }`}
                >
                  {item.icon && (
                    <span className="admin-sidebar-menu-icon">{item.icon}</span>
                  )}
                  {!isCollapsed && (
                    <span className="admin-sidebar-menu-label">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
