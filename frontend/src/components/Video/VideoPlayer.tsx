'use client';
import { useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface VideoPlayerProps {
  youtubeId: string;
  startPositionSeconds: number;
  onProgress: (currentTime: number) => void;
  onCompleted: () => void;
}

export default function VideoPlayer({ youtubeId, startPositionSeconds, onProgress, onCompleted }: VideoPlayerProps) {
  const playerRef = useRef<any>(null);

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      start: startPositionSeconds,
      rel: 0,
      modestbranding: 1
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const playerState = playerRef.current.getPlayerState();
        if (playerState === 1) { // Playing
          const time = playerRef.current.getCurrentTime();
          onProgress(time);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [onProgress]);

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
  };

  const onEnd: YouTubeProps['onEnd'] = () => {
    onCompleted();
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      <YouTube 
        videoId={youtubeId} 
        opts={opts} 
        onReady={onReady} 
        onEnd={onEnd}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}
