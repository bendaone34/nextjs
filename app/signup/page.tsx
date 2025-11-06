'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // 🧠 In a real setup, this would POST to your Supabase or backend
      // For now, we’ll simulate successful signup
      await new Promise((res) => setTimeout(res, 800));

      // Redirect to login
      router.push('/login');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-sky-900 mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-6">
          Join NourishCare and simplify care coordination.
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border rounded focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full px-4 py-2 border rounded focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full px-4 py-2 border rounded focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              required
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className="mt-1 w-full px-4 py-2 border rounded focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-800 text-white py-2.5 rounded hover:bg-sky-700 transition font-semibold disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-sky-700 hover:underline font-medium"
          >
            Log in
          </button>
        </p>
      </div>

      <footer className="mt-8 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} NourishCare — All Rights Reserved.
      </footer>
    </main>
  );
}
