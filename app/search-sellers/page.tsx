import { Metadata } from 'next';
import SearchSellersClient from '../../components/SearchSellersClient'; // Import the client component

export const metadata: Metadata = {
  title: 'Search Sellers – MarketScope',
  description: 'Search and analyze eBay sellers and their listings.',
};

export default function SearchSellersPage() {
  return (
    <SearchSellersClient />
  );
} 