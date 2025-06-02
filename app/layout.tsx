import { Inter } from 'next/font/google';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MarketScope',
  description: 'eBay analytics and insights platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#F0F9FF]">
          <Sidebar />
          <Topbar 
            searchTerm=""
            onSearchChange={() => {}}
            viewType="Product"
            onViewTypeChange={() => {}}
          />
          {children}
        </div>
      </body>
    </html>
  );
} 