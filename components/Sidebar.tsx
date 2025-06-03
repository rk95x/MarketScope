'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Search Products', href: '/', icon: '🔍' },
  { name: 'Search Sellers', href: '/search-sellers', icon: '👥' },
  { name: 'Competitors', href: '/competitors', icon: '📈' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar - now a flex item */}
      <div
        className="h-full w-64 bg-white border-r border-gray-200 p-4"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#111827]">MarketScope</h1>
        </div>

        {/* Mock Data Banner */}
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ This demo uses mock data while we await eBay API approval.
          </p>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
} 