import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings – MarketScope',
  description: 'Manage saved searches, alerts, and user preferences.',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      <main className="ml-0 md:ml-64 pt-24 p-4 md:p-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
              Settings – Coming Soon
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here you'll be able to manage saved searches, alerts, and user preferences.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 