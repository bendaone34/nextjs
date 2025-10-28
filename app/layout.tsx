import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NourishCare",
  description: "Digital Care Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}

function Sidebar({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: (item: string) => void;
}) {
  const sections = [
    {
      title: '',
      items: ['Dashboard', 'Personal Information', 'Location', 'Financial Information', 'Settings', 'Contacts', 'NMDS', 'Client Preferences', 'Carer Preferences', 'Documents'],
    },
    {
      title: '',
      items: ['Diary', 'Availability', 'Roster', 'Call Monitoring', 'Medication', 'Respite', 'Checklist', 'Care Required'],
    },
  ];

  return (
    <aside className="w-64 bg-[#f7f9fc] border-r border-gray-300 shadow-inner h-screen overflow-y-auto">
      {/* Profile header */}
      <div className="flex flex-col items-center py-5 border-b border-gray-300">
        <div className="w-20 h-20 rounded bg-gray-200 border border-gray-300 mb-2" />
        <h2 className="text-blue-800 font-semibold text-sm">Brian Cranston</h2>
      </div>

      {/* Navigation sections */}
      <nav className="px-2 pt-3 pb-8">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-5">
            {section.title && (
              <div className="px-3 py-1 text-xs font-bold uppercase text-gray-500">
                {section.title}
              </div>
            )}
            <div className="flex flex-col border border-gray-300 rounded overflow-hidden">
              {section.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMenu(item)}
                  className={`text-left px-4 py-2.5 text-sm font-medium border-b border-gray-200 transition ${
                    activeMenu === item
                      ? 'bg-[#cce4ff] text-blue-900 font-semibold'
                      : 'bg-white hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

