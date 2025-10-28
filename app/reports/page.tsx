'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function ReportsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const topNav = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Carers', path: '/carers' },
    { name: 'Clients', path: '/clients' },
    { name: 'Manage', path: '/manage' },
    { name: 'Reports', path: '/reports' },
    { name: 'Finance', path: '/finance' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <main className="flex flex-col h-screen bg-gray-100 text-gray-900">
      <header className="flex items-center justify-between bg-sky-900 text-white px-6 py-3 shadow-md">
        <h1
          onClick={() => router.push('/dashboard')}
          className="text-lg font-semibold cursor-pointer"
        >
          NourishCare
        </h1>
        <nav className="flex space-x-6 text-sm">
          {topNav.map((item) => (
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
      </header>

      <section className="p-8 flex-1">
        <h2 className="text-3xl font-semibold mb-4">Reports Overview</h2>
        <p className="text-gray-600">
          View care reports, performance analytics, and compliance summaries here.
        </p>
      </section>
    </main>
  );
}
