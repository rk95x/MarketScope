import { useState, useEffect } from 'react';
import { mockListings, MockListing } from '../mock/buyApiResults';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { StatCardShimmer, ProductCardShimmer } from '../components/LoadingShimmer';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'Product' | 'Seller'>('Product');
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
    <div className="min-h-screen bg-[#F0F9FF]">
      <Sidebar />
      <Topbar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewType={viewType}
        onViewTypeChange={setViewType}
      />
      
      <main className="ml-0 md:ml-64 pt-24 p-4 md:p-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Product List */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-[#111827]">Products</h2>
              </div>
              <div className="divide-y divide-gray-100">
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
            <div className="space-y-4 md:space-y-6">
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
                  ) : (
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
        </div>
      </main>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
