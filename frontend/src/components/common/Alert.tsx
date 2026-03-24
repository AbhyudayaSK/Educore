export function Alert({ message, type = 'error' }: { message: string, type?: 'error' | 'success' }) {
  const bg = type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200';
  return (
    <div className={`p-4 rounded-md border text-sm ${bg}`}>
      {message}
    </div>
  );
}
