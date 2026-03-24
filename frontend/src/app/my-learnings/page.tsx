'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppShell from '@/components/Layout/AppShell';
import apiClient from '@/lib/apiClient';
import { Spinner } from '@/components/common/Spinner';

interface EnrolledSubject {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  total_videos: number;
  completed_videos: number;
  percent_complete: number;
}

export default function MyLearningsPage() {
  const [subjects, setSubjects] = useState<EnrolledSubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearnings = async () => {
      try {
        const res = await apiClient.get('/progress/enrolled');
        setSubjects(res.data);
      } catch (err) {
        console.error('Failed to fetch learnings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLearnings();
  }, []);

  const handleCancelLearning = async (subjectId: number) => {
    if (!window.confirm('Are you sure you want to remove this course from your learnings? Your progress will be lost.')) return;
    
    try {
      await apiClient.delete(`/progress/subjects/${subjectId}`);
      setSubjects(subjects.filter(s => s.id !== subjectId));
    } catch (err) {
      console.error('Failed to cancel learning', err);
      alert('Failed to remove course. Please try again.');
    }
  };

  if (loading) return <AppShell><div className="flex justify-center py-20"><Spinner /></div></AppShell>;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4 font-outfit">My Learnings</h1>
          <p className="text-lg text-slate-500 font-medium font-outfit">Continue your journey where you left off.</p>
        </div>

        {subjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl shadow-slate-100/50">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
               </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No courses started yet</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Browse our library and start learning your favorite subjects today!</p>
            <Link href="/">
              <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-95">
                Explore Subjects
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((sub) => (
              <div key={sub.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={sub.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800'} 
                    alt={sub.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{sub.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">{sub.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{sub.percent_complete}% Completed</span>
                       <span className="text-xs font-bold text-slate-900">{sub.completed_videos}/{sub.total_videos} Lessons</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                        style={{ width: `${sub.percent_complete}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Link href={`/subjects/${sub.id}`} className="flex-1">
                        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-95">
                          Continue
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleCancelLearning(sub.id)}
                        className="px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
                        title="Cancel Learning"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
