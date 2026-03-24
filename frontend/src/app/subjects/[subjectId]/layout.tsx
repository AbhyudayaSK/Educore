'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import AppShell from '@/components/Layout/AppShell';
import AuthGuard from '@/components/Auth/AuthGuard';
import SubjectSidebar from '@/components/Sidebar/SubjectSidebar';
import { Spinner } from '@/components/common/Spinner';

export default function SubjectLayout({ children }: { children: React.ReactNode }) {
  const { subjectId } = useParams();
  const [tree, setTree] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get(`/subjects/${subjectId}/tree`)
      .then(res => setTree(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [subjectId]);

  if (loading) return <AppShell><Spinner /></AppShell>;
  if (!tree) return <AppShell><div className="p-8 text-center text-red-600">Failed to load subject.</div></AppShell>;

  return (
    <AuthGuard>
      <AppShell>
        <div className="flex h-[calc(100vh-120px)] border rounded-lg overflow-hidden bg-white shadow-sm">
          <SubjectSidebar tree={tree} />
          
          <div className="flex-1 overflow-y-auto relative">
            {children}
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
