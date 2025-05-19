import useSWR from 'swr';
import { useMemo } from 'react';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

interface Product {
  title: string;
  price: number;
  sold: number;
  category: string;
  seller: string;
  lastSold: string;
}

interface SellerProfile {
  name: string;
  listings: number;
  totalSold: number;
  topProduct: {
    title: string;
    sold: number;
  };
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Competitors() {
  const { data, error } = useSWR<Product[]>('/api/trends', fetcher);

  const sellerProfiles = useMemo(() => {
    if (!data) return [];
    
    const profiles: Record<string, SellerProfile> = {};
    
    data.forEach((item) => {
      if (!profiles[item.seller]) {
        profiles[item.seller] = {
          name: item.seller,
          listings: 0,
          totalSold: 0,
          topProduct: {
            title: item.title,
            sold: item.sold
          }
        };
      }
      
      profiles[item.seller].listings++;
      profiles[item.seller].totalSold += item.sold;
      
      if (item.sold > profiles[item.seller].topProduct.sold) {
        profiles[item.seller].topProduct = {
          title: item.title,
          sold: item.sold
        };
      }
    });
    
    return Object.values(profiles).sort((a, b) => b.totalSold - a.totalSold);
  }, [data]);

  return (
    <div className="min-h-screen bg-mme-background font-sans">
      <ThemeToggle />
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-mme-text tracking-tight">
            Competitor Analysis
          </h1>
          <Link
            href="/"
            className="text-mme-text hover:text-mme-buttonHover transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <p className="text-red-500 text-center">Failed to load competitor data</p>
        )}
        
        {!data && (
          <p className="text-mme-body text-center">Loading...</p>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sellerProfiles.map((profile) => (
              <div
                key={profile.name}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-mme-text mb-4">
                  {profile.name}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-mme-text">Active Listings</p>
                    <p className="text-lg font-medium text-mme-body">
                      {profile.listings}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-mme-text">Total Units Sold</p>
                    <p className="text-lg font-medium text-mme-body">
                      {profile.totalSold}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-mme-text">Top Product</p>
                    <div className="mt-1">
                      <p className="text-sm font-medium text-mme-body">
                        {profile.topProduct.title}
                      </p>
                      <p className="text-sm text-mme-body">
                        {profile.topProduct.sold} units sold
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 