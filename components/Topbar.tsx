import { useState } from 'react';

type TimeFilter = 'Daily' | '7 days' | '30 days';
type ViewType = 'Product' | 'Seller';

interface TopbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewType: ViewType;
  onViewTypeChange: (value: ViewType) => void;
}

export default function Topbar({ searchTerm, onSearchChange, viewType, onViewTypeChange }: TopbarProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30 days');

  return (
    <div className="fixed top-0 left-0 md:left-64 right-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 transition-all duration-300 z-50">

      {/* Search input */}
      <div className="flex-1 w-full max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products or sellers..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {/* Time Filters */}
        <div className="flex space-x-1 md:space-x-2">
          {(['Daily', '7 days', '30 days'] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-2 md:px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeFilter === filter
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <select
          value={viewType}
          onChange={(e) => onViewTypeChange(e.target.value as ViewType)}
          className="px-2 md:px-3 py-1 rounded-md border border-gray-200 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
        >
          <option value="Product">Product</option>
          <option value="Seller">Seller</option>
        </select>
      </div>
    </div>
  );
}
