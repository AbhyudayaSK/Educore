export function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
