export default function VideoMeta({ video }: { video: any }) {
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
          {video.section.title}
        </span>
      </div>
      <div className="prose max-w-none text-gray-700">
        <p>{video.description}</p>
      </div>
    </div>
  );
}
