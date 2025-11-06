'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  HeartHandshake,
  Users,
  CalendarDays,
  ClipboardList,
  Sun,
  Moon,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is loaded before rendering to avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* --- Header --- */}
      <header className="flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
        <h1
          className="text-2xl font-bold text-sky-900 dark:text-sky-400 cursor-pointer"
          onClick={() => router.push('/')}
        >
          NourishCare
        </h1>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-sky-700" />
            )}
          </button>

          {/* Auth Buttons */}
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 rounded border border-sky-800 text-sky-800 hover:bg-sky-800 hover:text-white dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-400 dark:hover:text-gray-900 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="px-4 py-2 rounded bg-sky-800 text-white hover:bg-sky-700 dark:bg-sky-400 dark:text-gray-900 dark:hover:bg-sky-300 transition"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-sky-50 dark:bg-gray-800 flex-1">
        {/* Text Column */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-sky-900 dark:text-sky-300 leading-tight">
            Empowering Care Teams. <br />
            Supporting Every Client.
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            NourishCare is a digital care planning platform designed to simplify
            daily operations for care providers, carers, and clients — all in
            one connected system.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/signup')}
              className="px-6 py-3 rounded bg-sky-800 text-white hover:bg-sky-700 dark:bg-sky-400 dark:text-gray-900 dark:hover:bg-sky-300 transition text-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-3 rounded border border-sky-800 text-sky-800 hover:bg-sky-800 hover:text-white dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-400 dark:hover:text-gray-900 transition text-lg"
            >
              Login
            </button>
          </div>
        </div>

        {/* Image Column */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-[85%] max-w-lg aspect-video">
            <Image
              src="/Images/CareManagement.png"
              alt="Care management illustration"
              fill
              priority
              className="object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold text-sky-900 dark:text-sky-300 mb-10">
            Why Choose NourishCare?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <Users className="w-10 h-10 text-sky-700 dark:text-sky-400 mb-3" />
                ),
                title: 'Client Management',
                desc: 'Keep all client information organized, accessible, and secure in one place.',
              },
              {
                icon: (
                  <CalendarDays className="w-10 h-10 text-green-700 dark:text-green-400 mb-3" />
                ),
                title: 'Smart Scheduling',
                desc: 'Easily schedule and manage shifts, appointments, and daily care routines.',
              },
              {
                icon: (
                  <ClipboardList className="w-10 h-10 text-orange-700 dark:text-orange-400 mb-3" />
                ),
                title: 'Care Tracking',
                desc: 'Monitor care plans, track tasks, and ensure compliance effortlessly.',
              },
              {
                icon: (
                  <HeartHandshake className="w-10 h-10 text-purple-700 dark:text-purple-400 mb-3" />
                ),
                title: 'Team Collaboration',
                desc: 'Empower carers and managers to communicate and work efficiently.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-6 bg-sky-900 dark:bg-sky-950 text-white text-center text-sm">
        © {new Date().getFullYear()} NourishCare — All Rights Reserved.
      </footer>
    </main>
  );
}
