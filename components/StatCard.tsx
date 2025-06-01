interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 h-full flex flex-col justify-between">
      <div className="flex items-start flex-grow">
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-[#111827] mt-1 truncate">
            {value}
          </p>
        </div>
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#F0F9FF] flex items-center justify-center flex-shrink-0">
          <span className="text-xl sm:text-2xl">{icon}</span>
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-2">
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? 'text-[#10B981]' : 'text-red-500'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-sm text-gray-500 ml-1 truncate">vs last period</span>
        </div>
      )}
    </div>
  );
} 