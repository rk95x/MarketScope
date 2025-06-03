import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings – MarketScope',
  description: 'Manage saved searches, alerts, and user preferences.',
};

export default function SettingsPage() {
  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            Settings – Coming Soon
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here you'll be able to manage saved searches, alerts, and user preferences.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Settings Panel Coming Soon
            </h2>
            <p className="text-gray-600">
              We're building a comprehensive settings panel to help you customize your experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 