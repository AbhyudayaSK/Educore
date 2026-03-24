'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import apiClient from '../../lib/apiClient';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (e) { console.error('Logout err', e); }
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 shadow-xl relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-white tracking-tighter transition-all hover:opacity-90 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">E</span>
            </div>
            Edu<span className="text-blue-400 italic">core</span>
          </Link>
          <nav>
            {user ? (
              <div className="flex items-center space-x-8">
                <Link href="/my-learnings" className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group">
                  <div className="p-2 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="hidden md:inline">My Learnings</span>
                </Link>
                <Link href="/ai" className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group">
                  <div className="p-2 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-all text-blue-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="hidden md:inline">AI Tutor</span>
                </Link>
                <Link href="/profile" className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group">
                  <div className="p-2 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="hidden md:inline">Profile</span>
                </Link>
                <div className="h-4 w-px bg-slate-800"></div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link href="/auth/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/auth/register" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
