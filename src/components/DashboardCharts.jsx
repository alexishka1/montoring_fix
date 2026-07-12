// src/components/DashboardCharts.jsx
import { BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardCharts() {
  // Data statis untuk Bar Chart
  const barData = [
    { name: 'Affect', score: 3.45, prev: 3.28, color: '#3b82f6' }, // Biru
    { name: 'Loyalty', score: 3.21, prev: 3.02, color: '#8b5cf6' }, // Ungu
    { name: 'Contribution', score: 3.28, prev: 3.05, color: '#f97316' }, // Orange
    { name: 'Professional Respect', score: 4.10, prev: 3.89, color: '#0ea5e9' }, // Biru Muda
  ];

  // Data statis untuk Line Chart
  const lineData = [
    { month: 'Des 23', score: 3.62, responden: 82 },
    { month: 'Jan 24', score: 3.71, responden: 88 },
    { month: 'Feb 24', score: 3.85, responden: 75 },
    { month: 'Mar 24', score: 3.78, responden: 91 },
    { month: 'Apr 24', score: 3.82, responden: 84 },
    { month: 'Mei 24', score: 3.91, responden: 79 },
  ];

  // Data statis untuk Tabel Top 5 Divisi
  const topDivisions = [
    { rank: 1, name: 'Human Capital (HC)', score: 4.26, color: 'text-green-600 bg-green-50' },
    { rank: 2, name: 'Finance & Accounting', score: 4.13, color: 'text-green-600 bg-green-50' },
    { rank: 3, name: 'Operations', score: 3.95, color: 'text-green-600 bg-green-50' },
    { rank: 4, name: 'Marketing & Sales', score: 3.80, color: 'text-orange-600 bg-orange-50' },
    { rank: 5, name: 'Information Technology', score: 3.72, color: 'text-orange-600 bg-orange-50' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
      
      {/* 1. Bar Chart: Skor per Dimensi */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-80 flex flex-col">
        <h3 className="text-xs font-bold text-gray-800 uppercase mb-4">Skor LMX Per Dimensi (Seluruh Organisasi)</h3>
        <div className="flex-1 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={30}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Line Chart: Tren Overall */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-80 flex flex-col">
        <h3 className="text-xs font-bold text-gray-800 uppercase mb-4">Tren Overall LMX Score</h3>
        <div className="flex-1 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value, name) => [value, name === 'score' ? 'Skor LMX' : name === 'responden' ? 'Responden' : name]} />
              <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} label={{ position: 'top', fontSize: 10, fill: '#4b5563' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Tabel Top 5 Divisi */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-80 flex flex-col">
        <h3 className="text-xs font-bold text-gray-800 uppercase mb-4">Top 5 Divisi</h3>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="pb-2 font-medium">#</th>
                <th className="pb-2 font-medium">Divisi</th>
                <th className="pb-2 font-medium text-right">Overall LMX Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topDivisions.map((div) => (
                <tr key={div.rank}>
                  <td className="py-3 text-gray-500">{div.rank}</td>
                  <td className="py-3 font-medium text-gray-700">{div.name}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-1 rounded-md font-semibold ${div.color}`}>
                      {div.score.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-xs font-semibold text-blue-600 cursor-pointer hover:underline">
          Lihat Semua Divisi
        </div>
      </div>

    </div>
  );
}