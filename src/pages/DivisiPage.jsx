// src/pages/DivisiPage.jsx
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DivisiPage() {
  // --- MOCK DATA ---
  const radarData = [
    { dimensi: 'Affect', skor: 3.45, fullMark: 5 },
    { dimensi: 'Loyalty', skor: 3.21, fullMark: 5 },
    { dimensi: 'Contribution', skor: 3.28, fullMark: 5 },
    { dimensi: 'Professional Respect', skor: 3.28, fullMark: 5 },
  ];

  const lineData = [
    { bulan: 'Des 23', skor: 3.8 }, { bulan: 'Jan 24', skor: 3.8 },
    { bulan: 'Feb 24', skor: 4.1 }, { bulan: 'Mar 24', skor: 3.7 },
    { bulan: 'Apr 24', skor: 3.9 }, { bulan: 'Mei 24', skor: 3.9 },
  ];

  return (
    <div className="text-sm">
      
      {/* JUDUL HALAMAN (Sesuai Desain Baru) */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Per Divisi</h1>
        <p className="text-sm text-gray-500 mt-1">Lihat detail penilaian LMX untuk setiap divisi dalam organisasi.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* SIDEBAR KIRI (Pilih Divisi) */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="font-bold text-gray-800 mb-4">Pilih Divisi</h3>
            <div className="relative mb-4">
              <input type="text" placeholder="Cari divisi..." className="w-full pl-8 pr-2 py-2.5 border border-gray-200 rounded-lg text-xs focus:outline-blue-500" />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <div className="space-y-1 text-xs font-medium text-gray-600">
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">Human Capital</div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">Finance & Accounting</div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">Information Technology</div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">Marketing & Sales</div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">Operations</div>
              {/* Menu Aktif */}
              <div className="p-3 bg-blue-50 text-blue-700 cursor-pointer rounded-lg font-semibold">Customer Service</div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">Product Development</div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">Production</div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">Logistics</div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer rounded-lg">General Affairs</div>
            </div>
          </div>
        </div>

        {/* KONTEN UTAMA (Kanan) */}
        <div className="flex-1 space-y-6">
          
          {/* 1. Header Card (Customer Service) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Bagian Atas: Profil Divisi */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl">
                👤
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Customer Service</h2>
                <p className="text-xs text-gray-500 mt-1">Jumlah Karyawan: 96 orang &nbsp;|&nbsp; Jumlah Responden: 83 orang (86%)</p>
              </div>
            </div>
            
            {/* Bagian Bawah: Metrik Skor */}
            <div className="flex flex-wrap items-center justify-between border-t border-gray-100 pt-6">
                <div>
                  <p className="text-[11px] font-bold text-gray-800 mb-2">Overall LMX Score</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">3.42</span>
                    <span className="text-sm text-gray-500">/5</span>
                  </div>
                  <p className="text-[10px] text-red-500 font-bold mt-1">Kategori: Perlu Perbaikan</p>
                </div>
                {/* Garis Pemisah Vertikal (Desktop) */}
                <div className="hidden md:block w-px h-12 bg-gray-100"></div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800 mb-2">Affect</p>
                  <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900">3.45</span><span className="text-xs text-gray-500">/5</span></div>
                </div>
                <div className="hidden md:block w-px h-12 bg-gray-100"></div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800 mb-2">Loyalty</p>
                  <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900">3.21</span><span className="text-xs text-gray-500">/5</span></div>
                </div>
                <div className="hidden md:block w-px h-12 bg-gray-100"></div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800 mb-2">Contribution</p>
                  <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900">3.28</span><span className="text-xs text-gray-500">/5</span></div>
                </div>
                <div className="hidden md:block w-px h-12 bg-gray-100"></div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800 mb-2">Professional Respect</p>
                  <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900">3.28</span><span className="text-xs text-gray-500">/5</span></div>
                </div>
            </div>
          </div>

          {/* 2. Baris Tengah: Grafik */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex flex-col">
              <h3 className="text-sm font-bold text-gray-800 mb-6">Tren Skor LMX</h3>
              <div className="flex-1 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="bulan" tick={{ fill: '#6b7280' }} />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="skor" stroke="#dc2626" strokeWidth={2} dot={{ r: 5, fill: '#dc2626' }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex flex-col">
              <h3 className="text-sm font-bold text-gray-800 mb-0">Skor per Dimensi</h3>
              <div className="flex-1 w-full text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="dimensi" tick={{ fill: '#4b5563', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                    <Radar name="Skor" dataKey="skor" stroke="#dc2626" strokeWidth={2} fill="#fee2e2" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>

          {/* 3. Baris Bawah: Insight */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             
             {/* Indikator Terendah */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-6">Indikator Terendah</h3>
                  <div className="flex justify-between text-xs font-bold text-gray-800 border-b pb-3 mb-4">
                    <span>Indikator</span>
                    <span>Skor</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-4">
                      <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50">
                        <span className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span>
                          <span>Atasan saya memberikan feedback yang membangun.</span>
                        </span>
                        <span className="font-bold text-gray-900">2.98</span>
                      </li>
                      <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50">
                        <span className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span>
                          <span>Atasan saya mendukung pengembangan karir saya.</span>
                        </span>
                        <span className="font-bold text-gray-900">3.05</span>
                      </li>
                      <li className="flex justify-between items-start gap-4">
                        <span className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span>
                          <span>Atasan saya memperhatikan kebutuhan dan masalah saya.</span>
                        </span>
                        <span className="font-bold text-gray-900">3.08</span>
                      </li>
                  </ul>
                </div>
                <div className="mt-6 text-xs text-blue-600 font-bold cursor-pointer hover:underline">
                  Lihat Semua Indikator
                </div>
             </div>

             {/* Rekomendasi */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-6">Rekomendasi untuk Divisi ini</h3>
                  <ul className="text-xs text-gray-600 space-y-5">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 shrink-0"></span>
                        <span>Tingkatkan komunikasi dan feedback secara rutin.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 shrink-0"></span>
                        <span>Perkuat dukungan atasan terhadap anggota tim.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 shrink-0"></span>
                        <span>Lakukan coaching rutin agar para supervisor lebih aktif.</span>
                      </li>
                  </ul>
                </div>
                <button className="mt-8 w-max px-6 py-2 border border-blue-600 text-blue-600 rounded-lg text-[11px] font-bold hover:bg-blue-50 transition-colors ml-auto">
                  Buat Rekomendasi
                </button>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
}