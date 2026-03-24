'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, CheckCircle2, Lock, PlayCircle } from 'lucide-react';

export default function SectionItem({ section, subjectId }: { section: any, subjectId: number }) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="font-medium text-sm text-gray-800">{section.title}</span>
        {expanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
      </button>
      
      {expanded && (
        <div className="bg-gray-50 py-1">
          {section.videos.map((video: any) => {
            const isActive = pathname === `/subjects/${subjectId}/video/${video.id}`;
            
            return (
              <div key={video.id}>
                {video.locked ? (
                  <div className="flex items-start p-3 pl-6 opacity-60 text-sm cursor-not-allowed">
                     <Lock size={16} className="mr-3 text-gray-500 shrink-0 mt-0.5" />
                     <span className="text-gray-600 line-clamp-2">{video.title}</span>
                  </div>
                ) : (
                  <Link 
                    href={`/subjects/${subjectId}/video/${video.id}`}
                    className={`flex items-start p-3 pl-6 text-sm hover:bg-blue-50 transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-600' : 'text-gray-700'}`}
                  >
                     {video.is_completed ? (
                       <CheckCircle2 size={16} className="mr-3 text-green-500 shrink-0 mt-0.5" />
                     ) : (
                       <PlayCircle size={16} className={`mr-3 shrink-0 mt-0.5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                     )}
                     <span className="line-clamp-2">{video.title}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
