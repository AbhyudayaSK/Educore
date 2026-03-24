'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import { Spinner } from '@/components/common/Spinner';

export default function SubjectDashboard() {
  const { subjectId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    apiClient.get(`/progress/subjects/${subjectId}`)
      .then(res => setProgress(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [subjectId]);

  if (loading) return <Spinner />;

  return (
    <div className="p-8 max-w-3xl mx-auto mt-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Subject Overview</h1>
      
      {progress && (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Your Progress</h2>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{progress.completed_videos} of {progress.total_videos} videos completed</span>
            <span>{progress.percent_complete}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progress.percent_complete}%` }}
            ></div>
          </div>
        </div>
      )}

      <button 
        onClick={async () => {
          try {
            if (progress?.last_video_id) {
              router.push(`/subjects/${subjectId}/video/${progress.last_video_id}`);
            } else {
              const res = await apiClient.get(`/subjects/${subjectId}/first-video`);
              router.push(`/subjects/${subjectId}/video/${res.data.id}`);
            }
          } catch(e) { console.error('Error finding video', e); }
        }}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition"
      >
        Resume Learning
      </button>
    </div>
  );
}
