import useSWR from 'swr';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ThemeToggle from '../components/ThemeToggle';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import Link from 'next/link';

// Define interfaces for our data types
interface Product {
  title: string;
  price: number;
  sold: number;
  category: string;
  seller: string;
  lastSold: string;
  history?: {
    date: string;
    unitsSold: number;
  }[];
}

interface SellerStats {
  name: string;
  totalProducts: number;
  totalSold: number;
  averagePrice: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Helper function to generate CSV
const generateCSV = (data: Product[]) => {
  const headers = ['Title', 'Price', 'Units Sold', 'Category', 'Seller'];
  const rows = data.map(item => [
    item.title,
    item.price,
    item.sold,
    item.category,
    item.seller
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
};

// Helper function to download CSV
const downloadCSV = (data: Product[]) => {
  const csv = generateCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'products.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Helper function to generate fake history
const generateFakeHistory = (product: Product): Product => {
  const history = [];
  const today = new Date();
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split('T')[0],
      unitsSold: Math.floor(Math.random() * 11) // Random number between 0 and 10
    });
  }
  
  return {
    ...product,
    history
  };
};

export default function Home() {
  const router = useRouter();
  const { data: rawData, error } = useSWR<Product[]>('/api/trends', fetcher);
  const [category, setCategory] = useState('');
  const [minSold, setMinSold] = useState('');
  const [timeRange, setTimeRange] = useState('30'); // Default to 30 days

  // Add fake history to the data
  const data = useMemo(() => {
    if (!rawData) return [];
    return rawData.map(generateFakeHistory);
  }, [rawData]);

  // Initialize filters from URL
  useEffect(() => {
    if (router.isReady) {
      const { category: cat, minSold: sold, days } = router.query;
      if (cat) setCategory(cat as string);
      if (sold) setMinSold(sold as string);
      if (days) setTimeRange(days as string);
    }
  }, [router.isReady, router.query]);

  // Update URL when filters change
  useEffect(() => {
    if (router.isReady) {
      const query: Record<string, string> = {};
      if (category) query.category = category;
      if (minSold) query.minSold = minSold;
      if (timeRange) query.days = timeRange;
      
      router.replace({
        pathname: router.pathname,
        query
      }, undefined, { shallow: true });
    }
  }, [category, minSold, timeRange, router.isReady]);

  // Calculate cutoff date based on time range
  const cutoffDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - parseInt(timeRange));
    return date;
  }, [timeRange]);

  // Calculate total sold within time range for a product
  const calculateTotalSold = (product: Product) => {
    if (!product.history) return product.sold;
    
    return product.history
      .filter(entry => new Date(entry.date) >= cutoffDate)
      .reduce((sum, entry) => sum + entry.unitsSold, 0);
  };

  // Filtered data with time range applied
  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      const catMatch = category ? item.category === category : true;
      const totalSold = calculateTotalSold(item);
      const soldMatch = minSold ? totalSold >= Number(minSold) : true;
      return catMatch && soldMatch;
    });
  }, [data, category, minSold, cutoffDate]);

  // Chart data: total sold per category within time range
  const chartData = useMemo(() => {
    if (!data) return [];
    const totals: Record<string, number> = {};
    data.forEach((item) => {
      if (!totals[item.category]) totals[item.category] = 0;
      totals[item.category] += calculateTotalSold(item);
    });
    return Object.entries(totals).map(([cat, total]) => ({ category: cat, total }));
  }, [data, cutoffDate]);

  // Seller stats with time range
  const sellerStats = useMemo(() => {
    if (!filtered) return [];
    const stats: Record<string, SellerStats> = {};
    
    filtered.forEach((item) => {
      if (!stats[item.seller]) {
        stats[item.seller] = {
          name: item.seller,
          totalProducts: 0,
          totalSold: 0,
          averagePrice: 0
        };
      }
      
      stats[item.seller].totalProducts++;
      stats[item.seller].totalSold += calculateTotalSold(item);
      stats[item.seller].averagePrice = 
        (stats[item.seller].averagePrice * (stats[item.seller].totalProducts - 1) + item.price) / 
        stats[item.seller].totalProducts;
    });
    
    return Object.values(stats);
  }, [filtered, cutoffDate]);

  // Global stats with time range
  const globalStats = useMemo(() => {
    if (!filtered) return { totalProducts: 0, totalSold: 0, averagePrice: 0 };
    
    const totalProducts = filtered.length;
    const totalSold = filtered.reduce((sum, item) => sum + calculateTotalSold(item), 0);
    const averagePrice = filtered.reduce((sum, item) => sum + item.price, 0) / totalProducts;
    
    return { totalProducts, totalSold, averagePrice };
  }, [filtered, cutoffDate]);

  // Get unique categories for dropdown
  const categories = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map((item) => item.category)));
  }, [data]);

  return (
    <div className="min-h-screen bg-mme-background font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-mme-text tracking-tight">
            MarketScope
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/competitors"
              className="text-mme-text hover:text-mme-buttonHover transition-colors"
            >
              View Competitors
            </Link>
            <ThemeToggle />
          </div>
        </div>
        
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-mme-text">Total Products</h3>
            <p className="text-2xl font-semibold text-mme-body">{globalStats.totalProducts}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-mme-text">Total Units Sold</h3>
            <p className="text-2xl font-semibold text-mme-body">{globalStats.totalSold}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-mme-text">Average Price</h3>
            <p className="text-2xl font-semibold text-mme-price">£{globalStats.averagePrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <div>
            <label className="block text-sm font-semibold text-mme-text mb-1">Category</label>
            <select
              className="w-full md:w-56 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-mme-button bg-white dark:bg-gray-800 text-mme-body"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-mme-text mb-1">Min Units Sold</label>
            <input
              type="number"
              min={0}
              className="w-full md:w-40 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-mme-button bg-white dark:bg-gray-800 text-mme-body placeholder-gray-400"
              value={minSold}
              onChange={e => setMinSold(e.target.value)}
              placeholder="e.g. 100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-mme-text mb-1">Time Range</label>
            <select
              className="w-full md:w-40 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-mme-button bg-white dark:bg-gray-800 text-mme-body"
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="14">Last 14 days</option>
              <option value="30">Last 30 days</option>
              <option value="60">Last 60 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Download CSV Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => downloadCSV(filtered)}
            className="bg-mme-button text-white rounded-lg px-6 py-2 hover:bg-mme-buttonHover transition-colors shadow-md"
          >
            Download CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <table className="min-w-full text-sm text-mme-body text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-3 font-bold text-mme-text">Product</th>
                <th className="p-3 font-bold text-mme-text">Price (£)</th>
                <th className="p-3 font-bold text-mme-text">Units Sold</th>
                <th className="p-3 font-bold text-mme-text">Category</th>
                <th className="p-3 font-bold text-mme-text">Seller</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3 font-bold text-mme-price">£{item.price.toFixed(2)}</td>
                  <td className="p-3">{calculateTotalSold(item)}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.seller}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-mme-body">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bar Chart */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-mme-text">Units Sold by Category</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" className="text-xs" stroke="#9CA3AF" />
                <YAxis className="text-xs" stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar dataKey="total" fill="#4ECDC4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seller Summary */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-mme-text">Seller Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-mme-body text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 font-bold text-mme-text">Seller</th>
                  <th className="p-3 font-bold text-mme-text">Total Products</th>
                  <th className="p-3 font-bold text-mme-text">Total Units Sold</th>
                  <th className="p-3 font-bold text-mme-text">Average Price</th>
                </tr>
              </thead>
              <tbody>
                {sellerStats.map((stat, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3 font-medium">{stat.name}</td>
                    <td className="p-3">{stat.totalProducts}</td>
                    <td className="p-3">{stat.totalSold}</td>
                    <td className="p-3 font-bold text-mme-price">£{stat.averagePrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">Failed to load data</p>}
        {!data && <p className="mt-4 text-center text-mme-body">Loading...</p>}
      </div>
    </div>
  );
}
