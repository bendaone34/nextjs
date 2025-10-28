'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getUser, logout } from '../utils/auth';

interface DashboardStats {
  appointments: {
    thisWeek: { hours: string; appointments: number; cancelledHours: string };
    lastWeek: { hours: string; appointments: number; cancelledHours: string };
    lastMonth: { hours: string; appointments: number };
  };
  checklist: {
    expired: number;
    expiringSoon: number;
    complete: number;
  };
  diary: {
    thisWeek: number;
    lastWeek: number;
    lastMonth: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect unauthenticated users
  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  // Fetch dashboard stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Role-based menus
  const allMenuItems = [
    'Dashboard',
    'Personal Information',
    'Location',
    'Financial Information',
    'Settings',
    'Contacts',
    'Carer Preferences',
    'Conditions',
    'Documents',
    'Diary',
    'Schedule',
    'Roster',
    'Call Monitoring',
  ];

  const carerMenuItems = [
    'Dashboard',
    'Personal Information',
    'Diary',
    'Schedule',
    'Documents',
  ];

  const menuItems = user?.role === 'admin' ? allMenuItems : carerMenuItems;

  // Top nav buttons
  const topNav = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Carers', path: '/carers' },
    { name: 'Clients', path: '/clients' },
    { name: 'Manage', path: '/manage' },
    { name: 'Reports', path: '/reports' },
    { name: 'Finance', path: '/finance' },
    { name: 'Admin', path: '/admin' },
  ];

  const visibleTopNav =
    user?.role === 'admin'
      ? topNav
      : topNav.filter((item) => !['Finance', 'Admin', 'Reports'].includes(item.name));

  return (
    <main className="flex flex-col h-screen bg-gray-100 text-gray-900">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between bg-sky-900 text-white px-6 py-3 shadow-md">
        <h1
          className="text-lg font-semibold cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          NourishCare
        </h1>
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-6 text-sm">
            {visibleTopNav.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`transition-colors ${
                  pathname === item.path
                    ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300'
                    : 'hover:text-yellow-300'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">
            Dashboard
          </div>
          <nav className="flex flex-col text-sm">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveMenu(item)}
                className={`text-left px-5 py-2.5 border-b border-gray-100 hover:bg-blue-50 ${
                  activeMenu === item ? 'bg-blue-100 font-semibold text-blue-700' : ''
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Area */}
        <section className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">
                {user ? `${user.name}` : 'Loading...'}
              </h2>
              <p className="text-sm text-gray-600">
                Status:{' '}
                <span className="text-green-600 font-medium">Active</span> —{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  click here to edit CRM status
                </a>
              </p>
              {user && (
                <p className="text-xs text-gray-500 mt-1">
                  Role: <span className="font-medium capitalize">{user.role}</span>
                </p>
              )}
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
              Add Notes
            </button>
          </div>

          {/* Stats or Loading */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 h-48 shadow-sm"
                ></div>
              ))}
            </div>
          ) : (
            stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Appointment Stats */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-700 border-b pb-2 mb-3">
                    Appointment Stats
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-gray-800">This week</p>
                    <p className="text-gray-600">
                      Hours: {stats.appointments.thisWeek.hours}
                      <br />
                      Appointments: {stats.appointments.thisWeek.appointments}
                      <br />
                      Cancelled Hours: {stats.appointments.thisWeek.cancelledHours}
                    </p>
                    <p className="font-semibold text-gray-800 mt-3">Last week</p>
                    <p className="text-gray-600">
                      Hours: {stats.appointments.lastWeek.hours}
                      <br />
                      Appointments: {stats.appointments.lastWeek.appointments}
                      <br />
                      Cancelled Hours: {stats.appointments.lastWeek.cancelledHours}
                    </p>
                  </div>
                </div>

                {/* Checklist Summary */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-700 border-b pb-2 mb-3">
                    Checklist Summary
                  </h3>
                  <p className="text-red-600 font-semibold">
                    {stats.checklist.expired} Expired / Required
                  </p>
                  <p className="text-orange-500 font-semibold">
                    {stats.checklist.expiringSoon} Expiring within 1 month
                  </p>
                  <p className="text-green-600 font-semibold">
                    {stats.checklist.complete} Complete
                  </p>
                </div>

                {/* Diary */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-700 border-b pb-2 mb-3">
                    Diary
                  </h3>
                  <p className="text-sm text-gray-600">
                    This week — {stats.diary.thisWeek} entries
                  </p>
                  <p className="text-sm text-gray-600">
                    Last week — {stats.diary.lastWeek} entries
                  </p>
                  <p className="text-sm text-gray-600">
                    Last month — {stats.diary.lastMonth} entries
                  </p>
                </div>
              </div>
            )
          )}
        </section>
      </div>
    </main>
  );
}
