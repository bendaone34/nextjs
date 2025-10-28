'use client';

import { useState } from 'react';
import { Menu, Users, Home, FileText, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blue-800">Clients</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-600">
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 text-sm">
          <div className="flex flex-col space-y-1">
            <Link
              href="/clients"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 font-medium text-blue-700"
            >
              <Home size={16} /> Dashboard
            </Link>
            <Link
              href="/clients/location"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50"
            >
              <MapPin size={16} /> Location
            </Link>
            <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50">
              <FileText size={16} /> Documents
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50">
              <Users size={16} /> Contacts
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between bg-sky-900 text-white px-6 py-3 shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-200"
            >
              <Menu />
            </button>
            <h1 className="text-lg font-semibold">NourishCare</h1>
          </div>

          <nav className="flex space-x-6 text-sm">
            {['Dashboard', 'Carers', 'Clients', 'Manage', 'Reports', 'Finance', 'Admin'].map(
              item => (
                <Link
                  key={item}
                  href={item === 'Clients' ? '/clients' : '#'}
                  className={`hover:text-yellow-300 ${
                    item === 'Clients' ? 'text-yellow-300 font-semibold' : ''
                  }`}
                >
                  {item}
                </Link>
              )
            )}
          </nav>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </main>
  );
}
