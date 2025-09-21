export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {children}
        <div className="text-xs text-gray-400 mt-2 text-center">
          Powered by{' '}
          <a 
            href="https://getcalculation.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 underline"
          >
            getcalculation.com
          </a>
        </div>
      </div>
    </div>
  );
}
