'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Search Products', href: '/', icon: '🔍' },
  { name: 'Search Sellers', href: '/search-sellers', icon: '👥', badge: 'Beta' },
  { name: 'Competitors', href: '/competitors', icon: '📈' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    if (window.innerWidth < 768) {
      setIsOpen(false);
    }

  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-4 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#111827]">MarketScope</h1>
        </div>

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
                    ? 'bg-[#007BFF] text-white'
                    : 'text-[#333333] hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto text-xs bg-[#C7F464] text-black px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
} 