import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Competitor Insights – MarketScope',
  description: 'Compare sellers by listings, pricing trends, and sell-through rates.',
};

export default function CompetitorsPage() {
  return (
    <main className="ml-0 md:ml-64 pt-24 p-4 md:p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            Competitor Insights – Coming Soon
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare sellers by listings, pricing trends, and sell-through rates.
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📈</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Competitor Analysis Coming Soon
            </h2>
            <p className="text-gray-600">
              We're working on powerful tools to help you analyze and compare seller performance.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 