import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

interface Product {
  id: string;
  title: string;
  price: number;
  sold: number;
  category: string;
  seller: string;
  image?: string;
  url: string;
  condition: string;
}

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'product' | 'seller'>('product');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const queryParam = searchType === 'product' ? 'q' : 'seller';
      const response = await fetch(`/api/seller-listings?${queryParam}=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Chart data: total sold per seller
  const chartData = useMemo(() => {
    const totals: Record<string, number> = {};
    products.forEach((item) => {
      if (!totals[item.seller]) totals[item.seller] = 0;
      totals[item.seller] += item.sold;
    });
    return Object.entries(totals)
      .map(([seller, total]) => ({ seller, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10); // Show top 10 sellers
  }, [products]);

  // Global stats
  const globalStats = useMemo(() => {
    const totalProducts = products.length;
    const totalSold = products.reduce((sum, item) => sum + item.sold, 0);
    const averagePrice = products.reduce((sum, item) => sum + item.price, 0) / totalProducts || 0;
    
    return { totalProducts, totalSold, averagePrice };
  }, [products]);

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

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex-1 w-full md:max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchType === 'product' ? 'Search products...' : 'Enter seller name...'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mme-button focus:border-transparent bg-white text-mme-body"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as 'product' | 'seller')}
                    className="px-3 py-1 rounded border border-gray-300 bg-white text-mme-body focus:ring-2 focus:ring-mme-button"
                  >
                    <option value="product">Search by product</option>
                    <option value="seller">Search by seller</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-6 py-3 bg-mme-button text-white rounded-lg hover:bg-mme-buttonHover transition-colors shadow-md disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {products.length > 0 && (
          <>
            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-sm font-medium text-mme-text">Total Products</h3>
                <p className="text-2xl font-semibold text-mme-body">{globalStats.totalProducts}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-sm font-medium text-mme-text">Total Units Sold</h3>
                <p className="text-2xl font-semibold text-mme-body">{globalStats.totalSold}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-sm font-medium text-mme-text">Average Price</h3>
                <p className="text-2xl font-semibold text-mme-price">£{globalStats.averagePrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white mb-8">
              <table className="min-w-full text-sm text-mme-body">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 font-bold text-mme-text">Product</th>
                    <th className="p-3 font-bold text-mme-text">Price</th>
                    <th className="p-3 font-bold text-mme-text">Sold</th>
                    <th className="p-3 font-bold text-mme-text">Seller</th>
                    <th className="p-3 font-bold text-mme-text">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 hover:text-mme-buttonHover"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <span className="font-medium">{item.title}</span>
                        </a>
                      </td>
                      <td className="p-3 font-bold text-mme-price">£{item.price.toFixed(2)}</td>
                      <td className="p-3">{item.sold}</td>
                      <td className="p-3">{item.seller}</td>
                      <td className="p-3">{item.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4 text-mme-text">Top Sellers by Units Sold</h2>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="seller" className="text-xs" stroke="#9CA3AF" />
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
          </>
        )}

        {!isLoading && products.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-mme-body text-lg">No products found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
