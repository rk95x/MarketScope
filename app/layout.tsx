import { Inter } from 'next/font/google';
import Sidebar from '../components/Sidebar';
import './globals.css';
import Head from 'next/head';

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
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body className={inter.className}>
        <div className="min-h-screen bg-[#FAFAFA]">
          <Sidebar />
          <div>
            {children}
          </div>
          <footer className="text-center text-gray-500 text-sm py-4 border-t border-gray-200 bg-white ml-0 md:ml-64">
            © 2025 MarketScope. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
} 