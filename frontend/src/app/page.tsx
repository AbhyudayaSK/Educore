'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import AppShell from '@/components/Layout/AppShell';
import { Spinner } from '@/components/common/Spinner';
import { useAuthStore } from '@/store/authStore';

interface Subject {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail_url?: string;
  total_videos?: number;
  total_duration_seconds?: number;
}

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    apiClient.get('/subjects')
      .then(res => setSubjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0m';
    const hrs = Math.floor(Number(seconds) / 3600);
    const mins = Math.floor((Number(seconds) % 3600) / 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const getRating = (id: number) => {
    // Deterministic rating between 3.5 and 5.0
    const rating = 3.5 + (id % 15) / 10;
    return rating > 5 ? 5 : rating.toFixed(1);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Refined Welcome Card */}
        <div className="relative mb-16 p-8 md:p-12 bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-1000">
          {/* Subtle Background Accent Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 font-outfit leading-tight">
              Welcome, <span className="inline-block pr-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-blue-600 to-violet-700 italic">{(user?.name || 'Scholar').split(' ')[0]}</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium font-outfit max-w-2xl leading-relaxed border-l-4 border-indigo-100 pl-6">
              Start learning today and master your craft with our premium courses.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 font-outfit">Available Subjects</h2>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-6"></div>
        </div>
        
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map(sub => (
               <div key={sub.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-1 duration-300">
                {sub.thumbnail_url && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={sub.thumbnail_url} 
                      alt={sub.title}
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm">
                       <span className="text-sm font-bold text-slate-800">⭐ {getRating(sub.id)}</span>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">{sub.title}</h3>
                  <p className="text-slate-600 mb-6 h-12 overflow-hidden text-ellipsis line-clamp-2 text-sm leading-relaxed">
                    {sub.description}
                  </p>
                  <button 
                    onClick={() => setSelectedSubject(sub)}
                    className="w-full py-3 bg-blue-600 border border-transparent text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all flex justify-center items-center gap-2 group transform active:scale-[0.98]"
                  >
                    View Details
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
            {subjects.length === 0 && (
              <p className="text-gray-500">No subjects available right now.</p>
            )}
          </div>
        )}

        {/* Course Details Modal */}
        {selectedSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
              <div className="relative h-48">
                <img 
                  src={selectedSubject.thumbnail_url} 
                  alt={selectedSubject.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-2 text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-slate-800 font-outfit leading-tight">{selectedSubject.title}</h2>
                  <div className="bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100 flex items-center gap-1">
                    <span className="text-sm font-bold text-yellow-700">⭐ {getRating(selectedSubject.id)}</span>
                  </div>
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed text-sm">
                  {selectedSubject.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Total Videos</p>
                    <p className="text-lg font-bold text-slate-800">{Number(selectedSubject.total_videos) || 0} Lessons</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Duration</p>
                    <p className="text-lg font-bold text-slate-800">{formatDuration(selectedSubject.total_duration_seconds)}</p>
                  </div>
                </div>
                
                <Link href={`/subjects/${selectedSubject.id}`}>
                  <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5 active:translate-y-0">
                    Start Learning Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
