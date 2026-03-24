'use client';
import { useSidebarStore } from '@/store/sidebarStore';
import SectionItem from './SectionItem';
import { Menu, X } from 'lucide-react';

export default function SubjectSidebar({ tree }: { tree: any }) {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <>
      <button 
        className="md:hidden absolute top-4 left-4 z-50 p-2 bg-white rounded-md shadow"
        onClick={toggle}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`
        absolute md:relative z-40 h-full w-72 bg-gray-50 border-r transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b bg-white">
          <h2 className="font-bold text-lg text-gray-900 line-clamp-2">{tree.title}</h2>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-60px)] pb-20">
          {tree.sections.map((section: any) => (
            <SectionItem key={section.id} section={section} subjectId={tree.id} />
          ))}
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-30" 
          onClick={toggle}
        />
      )}
    </>
  );
}
