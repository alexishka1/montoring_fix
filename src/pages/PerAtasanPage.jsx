// src/pages/PerAtasanPage.jsx
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function PerAtasanPage() {
  // 10 Divisi lengkap sesuai request lu
  const daftarDivisi = [
    'Human Capital', 'Finance & Accounting', 'Information Technology',
    'Marketing & Sales', 'Operations', 'Customer Service',
    'Product Development', 'Production', 'Logistics', 'General Affairs'
  ];
  
  const [activeDivisi, setActiveDivisi] = useState('Human Capital');
  
  // ==========================================
  // DATABASE BOHONGAN (DUMMY) 10 DIVISI LENGKAP
  // ==========================================
  const databaseAtasan = {
    'Human Capital': [
      { id: 'hc1', nama: 'Budi Santoso', jabatan: 'HR Director', teamSize: 15, responden: 15, overall: 4.60, affect: 4.70, loyalty: 4.50, contribution: 4.60, respect: 4.60, kekuatan: 'Semua dimensi kepemimpinan sangat baik', kelemahan: 'Tidak ada kelemahan signifikan' },
      { id: 'hc2', nama: 'Siti Aminah', jabatan: 'Talent Acquisition Manager', teamSize: 10, responden: 9, overall: 4.20, affect: 4.30, loyalty: 4.10, contribution: 4.20, respect: 4.20, kekuatan: 'Kedekatan emosional dan komunikasi (Affect)', kelemahan: 'Kurang tegas dalam membela tim (Loyalty)' }
    ],
    'Finance & Accounting': [
      { id: 'fa1', nama: 'Hendra Gunawan', jabatan: 'Chief Financial Officer', teamSize: 20, responden: 18, overall: 3.80, affect: 3.50, loyalty: 3.90, contribution: 3.80, respect: 4.00, kekuatan: 'Sangat dihormati secara kompetensi (Professional Respect)', kelemahan: 'Kedekatan personal dengan bawahan (Affect)' },
      { id: 'fa2', nama: 'Maya Sari', jabatan: 'Tax & Audit Manager', teamSize: 8, responden: 8, overall: 2.90, affect: 2.80, loyalty: 2.70, contribution: 3.10, respect: 3.00, kekuatan: 'Fokus pada target dan tugas (Contribution)', kelemahan: 'Sering lepas tangan saat tim ada masalah (Loyalty)' }
    ],
    'Information Technology': [
      { id: 'it1', nama: 'Reza Rahadian', jabatan: 'VP of Engineering', teamSize: 60, responden: 55, overall: 3.90, affect: 3.75, loyalty: 4.10, contribution: 3.80, respect: 3.95, kekuatan: 'Selalu melindungi tim dari tekanan manajemen (Loyalty)', kelemahan: 'Frekuensi diskusi informal jarang (Affect)' },
      { id: 'it2', nama: 'Dian Sastro', jabatan: 'IT Support Lead', teamSize: 25, responden: 20, overall: 4.40, affect: 4.50, loyalty: 4.30, contribution: 4.40, respect: 4.40, kekuatan: 'Komunikasi sangat terbuka dan santai (Affect)', kelemahan: 'Sering menuntut kerja lembur mendadak (Contribution)' }
    ],
    'Marketing & Sales': [
      { id: 'ms1', nama: 'Andi Wijaya', jabatan: 'Head of Sales', teamSize: 45, responden: 42, overall: 4.15, affect: 4.30, loyalty: 3.85, contribution: 4.10, respect: 4.35, kekuatan: 'Mendukung pengembangan karir bawahan (Professional Respect)', kelemahan: 'Kurang membela tim saat gagal capai target (Loyalty)' },
      { id: 'ms2', nama: 'Rina Marlina', jabatan: 'Marketing Manager', teamSize: 20, responden: 18, overall: 2.85, affect: 2.90, loyalty: 2.70, contribution: 3.10, respect: 2.70, kekuatan: 'Mendorong ide baru dan effort lebih (Contribution)', kelemahan: 'Cara komunikasi yang sering bikin tim tidak nyaman (Affect)' }
    ],
    'Operations': [
      { id: 'op1', nama: 'Joko Susilo', jabatan: 'Operations Manager', teamSize: 100, responden: 85, overall: 3.50, affect: 3.20, loyalty: 3.60, contribution: 3.70, respect: 3.50, kekuatan: 'Sangat rapi dalam pengorganisasian tugas (Contribution)', kelemahan: 'Kurangnya empati terhadap masalah pribadi bawahan (Affect)' }
    ],
    'Customer Service': [
      { id: 'cs1', nama: 'Ayu Lestari', jabatan: 'CS Head', teamSize: 50, responden: 48, overall: 4.80, affect: 4.90, loyalty: 4.80, contribution: 4.70, respect: 4.80, kekuatan: 'Tingkat empati dan kedekatan yang luar biasa (Affect)', kelemahan: 'Terkadang terlalu toleran terhadap kesalahan kecil' },
      { id: 'cs2', nama: 'Kevin Sanjaya', jabatan: 'CS Supervisor', teamSize: 15, responden: 12, overall: 3.10, affect: 3.00, loyalty: 3.20, contribution: 3.10, respect: 3.10, kekuatan: 'Selalu pasang badan untuk bawahan di depan klien (Loyalty)', kelemahan: 'Kurang menghargai masukan bawahan (Professional Respect)' }
    ],
    'Product Development': [
      { id: 'pd1', nama: 'Nadiem Makarim', jabatan: 'Head of Product', teamSize: 30, responden: 28, overall: 3.75, affect: 3.60, loyalty: 3.70, contribution: 3.90, respect: 3.80, kekuatan: 'Selalu menuntut inovasi dan usaha ekstra (Contribution)', kelemahan: 'Komunikasi dua arah yang masih kaku (Affect)' }
    ],
    'Production': [
      { id: 'pr1', nama: 'Bambang Pamungkas', jabatan: 'Plant Manager', teamSize: 200, responden: 150, overall: 3.20, affect: 3.00, loyalty: 3.30, contribution: 3.40, respect: 3.10, kekuatan: 'Sangat tegas dengan aturan operasional', kelemahan: 'Sangat pelit memberikan apresiasi kerja (Professional Respect)' },
      { id: 'pr2', nama: 'Eka Putra', jabatan: 'Shift Supervisor', teamSize: 45, responden: 40, overall: 4.05, affect: 4.10, loyalty: 4.00, contribution: 4.10, respect: 4.00, kekuatan: 'Mau turun tangan membantu tim saat repot (Contribution)', kelemahan: 'Kurang rapi dalam administrasi' }
    ],
    'Logistics': [
      { id: 'lg1', nama: 'Anton Syahputra', jabatan: 'Logistics Manager', teamSize: 40, responden: 38, overall: 4.05, affect: 4.00, loyalty: 4.10, contribution: 4.00, respect: 4.10, kekuatan: 'Loyalitas yang tinggi kepada anggota tim (Loyalty)', kelemahan: 'Sulit mendelegasikan tugas besar ke bawahan (Contribution)' }
    ],
    'General Affairs': [
      { id: 'ga1', nama: 'Rudy Salim', jabatan: 'GA Manager', teamSize: 25, responden: 20, overall: 3.65, affect: 3.80, loyalty: 3.50, contribution: 3.60, respect: 3.70, kekuatan: 'Sangat mudah diajak diskusi santai (Affect)', kelemahan: 'Kurang berani membela tim di depan direksi (Loyalty)' }
    ]
  };

  const [daftarLeader, setDaftarLeader] = useState(databaseAtasan['Human Capital']);
  const [activeLeader, setActiveLeader] = useState(daftarLeader[0]);

  // Efek ganti data pas dropdown divisi diganti
  useEffect(() => {
    const leaders = databaseAtasan[activeDivisi] || [];
    setDaftarLeader(leaders);
    if (leaders.length > 0) setActiveLeader(leaders[0]);
    else setActiveLeader(null);
  }, [activeDivisi]);

  if (!activeLeader) return <div className="p-10 font-sans text-gray-500">Belum ada data atasan di divisi ini.</div>;

  const chartData = [
    { name: 'Affect', skor: activeLeader.affect },
    { name: 'Loyalty', skor: activeLeader.loyalty },
    { name: 'Contrib.', skor: activeLeader.contribution },
    { name: 'Respect', skor: activeLeader.respect },
  ];

  let badgeColor = "bg-green-100 text-green-700";
  let statusText = "Sehat (Healthy)";
  if (activeLeader.overall < 3.0) {
    badgeColor = "bg-red-100 text-red-700";
    statusText = "Bermasalah (At Risk)";
  } else if (activeLeader.overall < 4.0) {
    badgeColor = "bg-orange-100 text-orange-700";
    statusText = "Perlu Perhatian (Moderate)";
  }

  return (
    <div className="font-sans text-gray-800 pb-10">
      
      {/* HEADER & FILTER */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Evaluasi Per Atasan</h1>
          <p className="text-sm text-gray-500 mt-1">Analisis mendalam kualitas kepemimpinan masing-masing leader di seluruh divisi.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600">Filter Divisi:</span>
          <select 
            value={activeDivisi} 
            onChange={(e) => setActiveDivisi(e.target.value)}
            className="p-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm cursor-pointer"
          >
            {daftarDivisi.map(div => <option key={div} value={div}>{div}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* KIRI: DAFTAR LEADER */}
        <div className="w-full lg:w-1/4 shrink-0 space-y-3">
          <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2">Daftar Leader</h3>
          {daftarLeader.map((leader) => (
            <div 
              key={leader.id}
              onClick={() => setActiveLeader(leader)}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${
                activeLeader.id === leader.id 
                ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-[1.02]' 
                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${activeLeader.id === leader.id ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
                  {leader.nama.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{leader.nama}</h4>
                  <p className={`text-xs ${activeLeader.id === leader.id ? 'text-blue-100' : 'text-gray-500'}`}>{leader.jabatan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* KANAN: HASIL EVALUASI LEADER */}
        <div className="w-full lg:w-3/4 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-sm">
                {activeLeader.nama.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{activeLeader.nama}</h2>
                <p className="text-sm font-semibold text-blue-600 mb-1">{activeLeader.jabatan} • {activeDivisi}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1">👥 {activeLeader.teamSize} Anggota Tim</span>
                  <span className="flex items-center gap-1">📝 {activeLeader.responden} Responden ({Math.round(activeLeader.responden/activeLeader.teamSize*100)}%)</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Overall LMX Score</p>
              <div className="flex items-baseline justify-end gap-1 mb-2">
                <span className="text-4xl font-bold text-gray-900">{activeLeader.overall.toFixed(2)}</span>
                <span className="text-gray-500">/5</span>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${badgeColor}`}>
                {statusText}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 flex flex-col">
              <h3 className="font-bold text-gray-800 mb-6">Skor per Dimensi</h3>
              <div className="flex-1 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="skor" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.skor >= 4 ? '#16a34a' : entry.skor >= 3 ? '#eab308' : '#ef4444'} /> 
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">⭐ Kekuatan Utama</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-green-50/50 p-4 rounded-xl border border-green-100">
                  {activeLeader.kekuatan}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">⚠️ Area Perbaikan</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-red-50/50 p-4 rounded-xl border border-red-100">
                  {activeLeader.kelemahan}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}