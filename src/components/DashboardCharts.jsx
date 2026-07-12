// src/components/DashboardCharts.jsx
import { useState } from 'react';
import { BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardCharts() {
  const [showHistory, setShowHistory] = useState(false);

  // Data statis untuk Bar Chart
  const barData = [
    { name: 'Affect', score: 3.45, prev: 3.28, color: '#3b82f6' },
    { name: 'Loyalty', score: 3.21, prev: 3.02, color: '#8b5cf6' },
    { name: 'Contribution', score: 3.28, prev: 3.05, color: '#f97316' },
    { name: 'Professional Respect', score: 4.10, prev: 3.89, color: '#0ea5e9' },
  ];

  // Data statis untuk Line Chart (periode aktif 2026)
  const lineData = [
    { month: 'Jan 26', score: 3.62, responden: 82 },
    { month: 'Feb 26', score: 3.71, responden: 88 },
    { month: 'Mar 26', score: 3.85, responden: 75 },
    { month: 'Apr 26', score: 3.78, responden: 91 },
    { month: 'Mei 26', score: 3.82, responden: 84 },
    { month: 'Jun 26', score: 3.91, responden: 79 },
  ];

  // DATA HISTORIS DUMMY (tahun-tahun sebelumnya)
  const historyData = [
    { tahun: '2026', data: [
      { bulan: 'Januari', skor: 3.62, responden: 82 },
      { bulan: 'Februari', skor: 3.71, responden: 88 },
      { bulan: 'Maret', skor: 3.85, responden: 75 },
      { bulan: 'April', skor: 3.78, responden: 91 },
      { bulan: 'Mei', skor: 3.82, responden: 84 },
      { bulan: 'Juni', skor: 3.91, responden: 79 },
    ]},
    { tahun: '2025', data: [
      { bulan: 'Januari', skor: 3.15, responden: 72 },
      { bulan: 'Februari', skor: 3.22, responden: 68 },
      { bulan: 'Maret', skor: 3.30, responden: 81 },
      { bulan: 'April', skor: 3.18, responden: 77 },
      { bulan: 'Mei', skor: 3.41, responden: 85 },
      { bulan: 'Juni', skor: 3.38, responden: 70 },
      { bulan: 'Juli', skor: 3.45, responden: 79 },
      { bulan: 'Agustus', skor: 3.50, responden: 82 },
      { bulan: 'September', skor: 3.48, responden: 76 },
      { bulan: 'Oktober', skor: 3.55, responden: 88 },
      { bulan: 'November', skor: 3.58, responden: 80 },
      { bulan: 'Desember', skor: 3.62, responden: 82 },
    ]},
    { tahun: '2024', data: [
      { bulan: 'Januari', skor: 2.85, responden: 55 },
      { bulan: 'Februari', skor: 2.90, responden: 60 },
      { bulan: 'Maret', skor: 2.95, responden: 58 },
      { bulan: 'April', skor: 3.00, responden: 62 },
      { bulan: 'Mei', skor: 2.98, responden: 65 },
      { bulan: 'Juni', skor: 3.05, responden: 61 },
      { bulan: 'Juli', skor: 3.02, responden: 68 },
      { bulan: 'Agustus', skor: 3.08, responden: 70 },
      { bulan: 'September', skor: 3.10, responden: 66 },
      { bulan: 'Oktober', skor: 3.05, responden: 72 },
      { bulan: 'November', skor: 3.12, responden: 69 },
      { bulan: 'Desember', skor: 3.15, responden: 72 },
    ]},
    { tahun: '2023', data: [
      { bulan: 'Januari', skor: 2.50, responden: 45 },
      { bulan: 'Februari', skor: 2.55, responden: 48 },
      { bulan: 'Maret', skor: 2.60, responden: 50 },
      { bulan: 'April', skor: 2.58, responden: 52 },
      { bulan: 'Mei', skor: 2.65, responden: 55 },
      { bulan: 'Juni', skor: 2.70, responden: 53 },
      { bulan: 'Juli', skor: 2.72, responden: 58 },
      { bulan: 'Agustus', skor: 2.78, responden: 56 },
      { bulan: 'September', skor: 2.75, responden: 60 },
      { bulan: 'Oktober', skor: 2.80, responden: 57 },
      { bulan: 'November', skor: 2.82, responden: 62 },
      { bulan: 'Desember', skor: 2.85, responden: 55 },
    ]},
  ];

  // Warna badge berdasar skor
  const getSkorColor = (skor) => {
    if (skor >= 4.0) return 'text-green-700 bg-green-50';
    if (skor >= 3.0) return 'text-orange-700 bg-orange-50';
    return 'text-red-700 bg-red-50';
  };

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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase">Tren Overall LMX Score</h3>
          <button 
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            📊 Lihat Riwayat
          </button>
        </div>
        <div className="flex-1 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value, name) => [value, name === 'score' ? 'Skor LMX' : name === 'responden' ? 'Responden' : name]} />
              <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} label={{ position: 'top', fontSize: 10, fill: '#4b5563' }} />
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

      {/* MODAL RIWAYAT TREN SKOR HISTORIS */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative border border-gray-100">
            {/* Header Modal */}
            <div className="p-6 pb-4 border-b border-gray-100 shrink-0">
              <button 
                onClick={() => setShowHistory(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors font-bold cursor-pointer"
              >
                ✕
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl">📈</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Riwayat Tren Skor LMX</h3>
                  <p className="text-sm text-gray-500">Data historis seluruh organisasi per bulan</p>
                </div>
              </div>
            </div>
            
            {/* Body Modal - Scrollable */}
            <div className="p-6 pt-4 overflow-y-auto flex-1">
              <div className="space-y-6">
                {historyData.map((year) => {
                  const avgSkor = (year.data.reduce((sum, d) => sum + d.skor, 0) / year.data.length).toFixed(2);
                  const totalResp = year.data.reduce((sum, d) => sum + d.responden, 0);
                  return (
                    <div key={year.tahun} className="border border-gray-100 rounded-xl overflow-hidden">
                      {/* Header Tahun */}
                      <div className="bg-slate-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-800">Tahun {year.tahun}</span>
                          <span className="text-[10px] text-gray-500">({year.data.length} bulan)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-500">Rata-rata:</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getSkorColor(parseFloat(avgSkor))}`}>{avgSkor}</span>
                          <span className="text-[10px] text-gray-400">|</span>
                          <span className="text-[10px] text-gray-500">Total: {totalResp} responden</span>
                        </div>
                      </div>
                      {/* Tabel Bulan */}
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-100 text-gray-500">
                            <th className="text-left py-2 px-4 font-medium">Bulan</th>
                            <th className="text-center py-2 px-4 font-medium">Skor LMX</th>
                            <th className="text-center py-2 px-4 font-medium">Responden</th>
                            <th className="text-right py-2 px-4 font-medium">Kategori</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {year.data.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-2.5 px-4 font-medium text-gray-700">{row.bulan}</td>
                              <td className="py-2.5 px-4 text-center">
                                <span className={`px-2 py-0.5 rounded-md font-bold ${getSkorColor(row.skor)}`}>{row.skor.toFixed(2)}</span>
                              </td>
                              <td className="py-2.5 px-4 text-center text-gray-600">{row.responden} org</td>
                              <td className="py-2.5 px-4 text-right">
                                <span className={`text-[10px] font-semibold ${row.skor >= 4 ? 'text-green-600' : row.skor >= 3 ? 'text-orange-500' : 'text-red-500'}`}>
                                  {row.skor >= 4 ? '● Sehat' : row.skor >= 3 ? '● Perlu Perhatian' : '● Bermasalah'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 text-center border-t border-gray-100">
                <p className="text-[10px] text-gray-400 italic">*Data historis di atas adalah rekapan skor LMX bulanan organisasi.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}