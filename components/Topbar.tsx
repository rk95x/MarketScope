'use client';

import { useState } from 'react';

type TimeFilter = 'Daily' | '7 days' | '30 days';
type ViewType = 'Product' | 'Seller';

interface TopbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewType: ViewType;
  onViewTypeChange: (value: ViewType) => void;
}

export default function Topbar({
  searchTerm,
  onSearchChange,
  viewType,
  onViewTypeChange,
}: TopbarProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30 days');

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 md:left-64">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products or sellers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* View Type Toggle */}
        <div className="hidden md:flex items-center space-x-4 ml-4">
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => onViewTypeChange('Product')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewType === 'Product'
                  ? 'bg-[#007BFF] text-white shadow-sm'
                  : 'text-[#333333] hover:text-[#007BFF]'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onViewTypeChange('Seller')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewType === 'Seller'
                  ? 'bg-[#007BFF] text-white shadow-sm'
                  : 'text-[#333333] hover:text-[#007BFF]'
              }`}
            >
              Sellers
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            {(['Daily', '7 days', '30 days'] as TimeFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timeFilter === filter
                    ? 'bg-[#007BFF] text-white shadow-sm'
                    : 'text-[#333333] hover:text-[#007BFF]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
