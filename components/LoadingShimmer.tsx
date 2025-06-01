export default function LoadingShimmer() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

export function ProductCardShimmer() {
  return (
    <div className="flex items-center space-x-4 p-4 animate-pulse">
      <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="flex space-x-8">
        <div className="text-right">
          <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="text-right">
          <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="text-right">
          <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-14"></div>
        </div>
      </div>
    </div>
  );
}

export function StatCardShimmer() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
} 