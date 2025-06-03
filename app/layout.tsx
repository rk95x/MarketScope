import { Inter } from 'next/font/google';
import Sidebar from '../components/Sidebar';
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
        <div className="flex min-h-screen bg-[#F0F9FF]">
          <Sidebar />
          <div className="flex-1 ml-0 md:ml-64">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
} 