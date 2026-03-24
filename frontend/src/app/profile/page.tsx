'use client';
import AppShell from '@/components/Layout/AppShell';
import AuthGuard from '@/components/Auth/AuthGuard';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <AuthGuard>
      <AppShell>
        <div className="max-w-3xl mx-auto py-12">
          <div className="bg-white rounded-lg shadow p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <div className="mt-1 text-lg text-gray-900">{user?.name}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 text-lg text-gray-900">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
