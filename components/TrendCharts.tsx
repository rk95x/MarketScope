import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the last 7 days
const generateMockData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      listings: Math.floor(Math.random() * 50) + 20,
      avgPrice: Math.floor(Math.random() * 100) + 50
    });
  }
  
  return data;
};

const mockData = generateMockData();

export default function TrendCharts() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mt-6">
      <h2 className="text-lg font-semibold text-[#111827] mb-6">Listing Trends</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listings Over Time Chart */}
        <div className="h-[300px]">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Listings Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="listings" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Average Price Chart */}
        <div className="h-[300px]">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Average Price Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="avgPrice" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 