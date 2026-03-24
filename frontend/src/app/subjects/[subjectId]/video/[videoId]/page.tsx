'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import VideoPlayer from '@/components/Video/VideoPlayer';
import VideoMeta from '@/components/Video/VideoMeta';
import { Spinner } from '@/components/common/Spinner';
import { extractYoutubeId } from '@/lib/youtube';
import toast from 'react-hot-toast';

export default function VideoPage() {
  const { subjectId, videoId } = useParams();
  const router = useRouter();
  
  const [video, setVideo] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    Promise.all([
      apiClient.get(`/videos/${videoId}`),
      apiClient.get(`/progress/videos/${videoId}`)
    ]).then(([videoRes, progRes]) => {
      if (videoRes.data.locked) {
        toast.error(videoRes.data.unlock_reason || "Video locked");
        router.push(`/subjects/${subjectId}`);
        return;
      }
      setVideo(videoRes.data);
      setProgress(progRes.data);
      setLoading(false);
      
      // Auto-enroll: Mark as started immediately if no progress exists
      if (!progRes.data || progRes.data.last_position_seconds === 0) {
        apiClient.post(`/progress/videos/${videoId}`, {
          last_position_seconds: 0,
          is_completed: false
        }).catch(console.error);
      }
    }).catch(err => {
      console.error(err);
      toast.error("Failed to load video");
      router.push(`/subjects/${subjectId}`);
    });
  }, [videoId, subjectId, router]);

  const handleProgress = useCallback((seconds: number) => {
    if (Math.abs(seconds - lastUpdateRef.current) > 5) {
      lastUpdateRef.current = seconds;
      apiClient.post(`/progress/videos/${videoId}`, {
        last_position_seconds: Math.floor(seconds),
        is_completed: false
      }).catch(console.error);
    }
  }, [videoId]);

  const handleCompleted = useCallback(async () => {
    try {
      await apiClient.post(`/progress/videos/${videoId}`, {
        last_position_seconds: video?.duration_seconds || progress?.last_position_seconds || 0,
        is_completed: true
      });
      toast.success("Video completed!");
      
      if (video.next_video_id) {
        setTimeout(() => {
          router.push(`/subjects/${subjectId}/video/${video.next_video_id}`);
        }, 2000);
      } else {
        setTimeout(() => {
          router.push(`/subjects/${subjectId}`);
          toast.success("Subject completed!");
        }, 2000);
      }
    } catch(e) {
      toast.error('Failed to save completion');
    }
  }, [video, videoId, subjectId, router, progress]);

  if (loading || !video) return <Spinner />;

  const ytId = extractYoutubeId(video.youtube_url);
  if (!ytId) return <div className="p-8 text-center text-red-600">Invalid YouTube URL</div>;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <VideoPlayer 
        youtubeId={ytId}
        startPositionSeconds={progress?.is_completed ? 0 : (progress?.last_position_seconds || 0)}
        onProgress={handleProgress}
        onCompleted={handleCompleted}
      />
      <VideoMeta video={video} />
      
      {video.next_video_id && (
        <div className="mt-12 flex justify-end pb-8">
          <button
            onClick={() => router.push(`/subjects/${subjectId}/video/${video.next_video_id}`)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition flex items-center"
          >
            Next Video &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
