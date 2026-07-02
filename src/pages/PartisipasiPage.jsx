// src/pages/PartisipasiPage.jsx
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PartisipasiPage() {
  const totalKaryawan = 1452; // Total karyawan tetap
  const [selesai, setSelesai] = useState(1246); // Angka dasar awal

  // Cek memori browser pas halaman dibuka
  useEffect(() => {
    const savedCount = localStorage.getItem('survey_count');
    if (savedCount) {
      setSelesai(parseInt(savedCount));
    }
  }, []);

  // Sistem ngitung otomatis
  const belum = totalKaryawan - selesai;
  const rate = Math.round((selesai / totalKaryawan) * 100);

  // Data dinamis buat grafik donat
  const pieData = [
    { name: 'Selesai', value: selesai, color: '#2563eb' },
    { name: 'Belum', value: belum, color: '#f1f5f9' }
  ];

  // Data divisi statis
  const barData = [
    { divisi: 'HC', rate: 95 }, { divisi: 'Finance', rate: 93 },
    { divisi: 'IT', rate: 88 }, { divisi: 'Marketing', rate: 85 },
    { divisi: 'OS', rate: 82 }, { divisi: 'Prod.', rate: 78 },
    { divisi: 'Logistics', rate: 75 }, { divisi: 'GA', rate: 70 },
  ];

  return (
    <div className="text-sm font-sans">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ringkasan Partisipasi (Periode Aktif)</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau tingkat partisipasi karyawan dalam pengisian survei LMX.</p>
        </div>
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
          Buat Periode Baru
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Total Responden</p>
          <p className="text-2xl font-bold text-gray-800">{selesai.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Jumlah Karyawan</p>
          <p className="text-2xl font-bold text-gray-800">{totalKaryawan.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 bg-blue-50/30">
          <p className="text-[11px] font-bold text-blue-600 uppercase mb-1">Response Rate</p>
          <p className="text-2xl font-bold text-blue-700">{rate}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Selesai Mengisi</p>
          <p className="text-2xl font-bold text-green-600">{selesai.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Belum Mengisi</p>
          <p className="text-2xl font-bold text-red-500">{belum.toLocaleString('id-ID')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1 flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 mb-6">Progress Partisipasi</h3>
          <div className="relative flex-1 flex items-center justify-center min-h-[250px]">
            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none z-10">
              <span className="text-4xl font-bold text-gray-900">{rate}%</span>
              <span className="text-[10px] text-gray-500 font-medium">Progress Total</span>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={75} outerRadius={100} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Karyawan`, 'Jumlah']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600"></span><span className="text-gray-700 font-medium">Selesai:</span></div>
              <span className="font-bold text-gray-900">{selesai.toLocaleString('id-ID')} ({rate}%)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-200"></span><span className="text-gray-700 font-medium">Belum:</span></div>
              <span className="font-bold text-gray-900">{belum.toLocaleString('id-ID')} ({100 - rate}%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 mb-6">Response Rate per Divisi</h3>
          <div className="flex-1 min-h-[250px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="divisi" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={10} />
                <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value}%`, 'Response Rate']} />
                <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={35}>
                  {barData.map((entry, index) => <Cell key={`cell-${index}`} fill="#3b82f6" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}