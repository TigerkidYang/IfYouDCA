export default function SkeletonLoader() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden my-8 p-6 animate-pulse">
      {/* Toggler Skeleton */}
      <div className="h-10 bg-gray-100 rounded-lg w-1/3 mx-auto mb-6"></div>

      {/* Result Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="h-24 bg-gray-100 rounded-lg"></div>
        <div className="h-24 bg-gray-100 rounded-lg"></div>
        <div className="h-24 bg-gray-100 rounded-lg"></div>
        <div className="h-24 bg-gray-100 rounded-lg"></div>
      </div>

      {/* Chart Skeleton */}
      <div className="h-96 bg-gray-100 rounded-lg"></div>
    </div>
  );
}
