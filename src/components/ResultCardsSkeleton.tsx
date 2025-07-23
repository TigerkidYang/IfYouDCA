export default function ResultCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border bg-gray-100 p-4 animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-3 bg-gray-200 rounded w-full mx-auto mt-2 hidden md:block"></div>
        </div>
      ))}
    </div>
  );
}
