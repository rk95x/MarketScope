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
        <div className="min-h-screen bg-[#F0F9FF]">
          <Sidebar />
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
} 