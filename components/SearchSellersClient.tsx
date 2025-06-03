'use client';

import { useState, useEffect } from 'react';
import { mockListings, MockListing } from '../mock/buyApiResults';
import Topbar from './Topbar';
import StatCard from './StatCard';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import TrendCharts from './TrendCharts';
import { StatCardShimmer, ProductCardShimmer } from './LoadingShimmer';

export default function SearchSellersClient() {
  const [searchTerm, setSearchTerm] = useState('seller:');
  const [viewType, setViewType] = useState<'Product' | 'Seller'>('Seller');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<MockListing | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<MockListing[]>([]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on search term and view type
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(mockListings);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = mockListings.filter((product) => {
      if (viewType === 'Product') {
        return product.title.toLowerCase().includes(searchLower);
      } else {
        return product.sellerUsername.toLowerCase().includes(searchLower);
      }
    });
    setFilteredProducts(filtered);
  }, [searchTerm, viewType]);

  // Calculate total stats
  const totalProducts = filteredProducts.length;
  const totalUnitsSold = filteredProducts.reduce((sum, item) => sum + item.salesLast30Days, 0);
  const avgPrice = filteredProducts.reduce((sum, item) => sum + item.price, 0) / totalProducts || 0;

  // Get top sellers by units sold
  const topSellers = [...filteredProducts]
    .sort((a, b) => b.salesLast30Days - a.salesLast30Days)
    .slice(0, 5);

  return (
    <>
      <Topbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewType={viewType}
        onViewTypeChange={setViewType}
      />
      {/* Main content area - padding to clear fixed Topbar */}
      <main className="pt-16 p-4 md:p-6"> {/* Adjusted padding */}
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
              Search Sellers
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You can search by seller username here. Try 'seller:tech_world_uk'
            </p>
          </div>

          {/* Rest of the content... */}
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 mt-8 md:mt-12">
            {isLoading ? (
              <>
                <StatCardShimmer />
                <StatCardShimmer />
                <StatCardShimmer />
              </>
            ) : (
              <>
                <StatCard
                  title="Total Products"
                  value={totalProducts}
                  icon="📦"
                  trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                  title="Units Sold"
                  value={totalUnitsSold}
                  icon="💰"
                  trend={{ value: 8, isPositive: true }}
                />
                <StatCard
                  title="Average Price"
                  value={`$${avgPrice.toFixed(2)}`}
                  icon="📊"
                  trend={{ value: 5, isPositive: false }}
                />
              </>
            )}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:col-span-3 gap-6 mb-10">
            {/* Product List */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-[#111827]">Search Results</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Powered by mock data – real insights coming soon
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                <ProductCard isHeader />
                {isLoading ? (
                  <>
                    <ProductCardShimmer />
                    <ProductCardShimmer />
                    <ProductCardShimmer />
                  </>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.itemId}
                      product={product}
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No products found matching your search criteria.
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Top Sellers Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 transition-all duration-300">
                <h3 className="text-lg font-semibold text-[#111827] mb-4">
                  Top Sellers
                </h3>
                <div className="space-y-4">
                  {isLoading ? (
                    <>
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    </>
                  ) : (n
                    topSellers.map((seller) => (
                      <div key={seller.itemId} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 truncate mr-4">
                          {seller.sellerUsername}
                        </span>
                        <span className="text-sm font-medium text-[#111827] whitespace-nowrap">
                          {seller.salesLast30Days} units
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Trend Charts */}
          <TrendCharts />
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </main>
    </>
  );
} 