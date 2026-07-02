// src/pages/RekomendasiPage.jsx
import { useState, useEffect } from 'react';
import { getActionPlans, saveActionPlans } from '../lib/firestore';

export default function RekomendasiPage() {
  
  // Data rencana tindakan dengan iconType
  const defaultRekomendasi = [
    { 
      id: 1, kode: 'ACT-01', iconType: 'shield', prioritas: 'Tinggi', prioritasColor: 'bg-rose-50 text-rose-700 border-rose-200', 
      judul: 'Intervensi Lini Menengah: Resolusi Dimensi Komitmen (Loyalty)', target: 'Marketing & Sales', 
      status: 'Belum Mulai', 
      deskripsi: 'HR Business Partner (HRBP) diarahkan untuk melakukan konsolidasi internal dan mediasi struktural 1-on-1 guna memitigasi budaya saling menyalahkan (blame culture) akibat tekanan target operasional.' 
    },
    { 
      id: 2, kode: 'ACT-02', iconType: 'workshop', prioritas: 'Tinggi', prioritasColor: 'bg-rose-50 text-rose-700 border-rose-200', 
      judul: 'Edukasi Kepemimpinan: Leadership Empathy & Active Listening', target: 'Operations & Finance', 
      status: 'Dalam Proses', 
      deskripsi: 'Penyelenggaraan workshop wajib bagi jajaran supervisor mengenai teknik komunikasi dua arah untuk mendongkrak dimensi Kedekatan (Affect) tanpa mengendurkan metrik produktivitas.' 
    },
    { 
      id: 3, kode: 'ACT-03', iconType: 'chat', prioritas: 'Menengah', prioritasColor: 'bg-amber-50 text-amber-700 border-amber-200', 
      judul: 'Standardisasi Agenda Evaluasi Berkala (Weekly 1-on-1 Check-in)', target: 'Seluruh Organisasi', 
      status: 'Belum Mulai', 
      deskripsi: 'Mewajibkan seluruh kepala bagian untuk mengalokasikan waktu 15 menit per minggu untuk peninjauan kendala kerja non-teknis dan pendampingan psikologis anggota tim.' 
    },
    { 
      id: 4, kode: 'ACT-04', iconType: 'award', prioritas: 'Rendah', prioritasColor: 'bg-slate-50 text-slate-700 border-slate-200', 
      judul: 'Formalisasi Program Employee Recognition & Apresiasi Kerja', target: 'Divisi Human Capital', 
      status: 'Selesai', 
      deskripsi: 'Pemberian plakat penghargaan kepada manajemen dengan perolehan skor Rasa Hormat Profesional (Professional Respect) tertinggi sebagai tolok ukur implementasi budaya kerja sehat.' 
    }
  ];

  const [rekomendasi, setRekomendasi] = useState(defaultRekomendasi);
  const [isLoading, setIsLoading] = useState(true);

  // Load dari Firestore
  useEffect(() => {
    async function loadData() {
      try {
        const saved = await getActionPlans();
        if (saved) setRekomendasi(saved);
      } catch (err) {
        console.error("Gagal memuat action plans:", err);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Auto-save ke Firestore
  useEffect(() => {
    if (!isLoading) {
      saveActionPlans(rekomendasi).catch(err => console.error("Gagal simpan:", err));
    }
  }, [rekomendasi, isLoading]);

  const handleUpdateStatus = (id, statusBaru) => {
    setRekomendasi(prev => prev.map(item => 
      item.id === id ? { ...item, status: statusBaru } : item
    ));
  };

  const getStatusStyle = (status) => {
    if (status === 'Selesai') return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
    if (status === 'Dalam Proses') return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
    return 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100';
  };

  // Fungsi buat nampilin icon SVG profesional
  const renderIcon = (type) => {
    switch (type) {
      case 'shield': 
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'workshop': 
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316V18" />
          </svg>
        );
      case 'chat': 
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
        );
      case 'award': 
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
          </svg>
        );
      default:
        return null;
    }
  };

  const totalTugas = rekomendasi.length;
  const countBelum = rekomendasi.filter(r => r.status === 'Belum Mulai').length;
  const countProses = rekomendasi.filter(r => r.status === 'Dalam Proses').length;
  const countSelesai = rekomendasi.filter(r => r.status === 'Selesai').length;
  const progressPersen = totalTugas > 0 ? Math.round((countSelesai / totalTugas) * 100) : 0;

  return (
    <div className="font-sans text-slate-800 pb-10">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <span className="text-3xl">⭐</span> Rencana Tindakan Strategis
        </h1>
        <p className="text-sm text-gray-500 mt-1">Matriks pemantauan dan implementasi pembenahan manajerial (Action Plan Tracking) berdasarkan metrik agregat LMX.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resolusi Rencana Tindakan</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600">{progressPersen}%</span>
              <span className="text-xs text-slate-400 font-medium">Implementasi Selesai ({countSelesai} dari {totalTugas} Agenda)</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPersen}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col justify-center border-r border-slate-100">
            <span className="text-2xl font-bold text-slate-700">{countBelum}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">Belum Mulai</span>
          </div>
          <div className="flex flex-col justify-center border-r border-slate-100">
            <span className="text-2xl font-bold text-blue-600">{countProses}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">Dalam Proses</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold text-emerald-600">{countSelesai}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">Selesai</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 animate-fade-in-up">
        {rekomendasi.map((item) => (
          <div key={item.id} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden">
            
            {item.status === 'Selesai' && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
            )}

            <div className="flex-1 flex items-start gap-4">
              
              {/* KOMBINASI ICON DAN KODE DOKUMEN YANG ELEGAN */}
              <div className="flex flex-col items-center gap-2 shrink-0 w-16">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm ${
                    item.prioritas === 'Tinggi' ? 'bg-rose-50 border-rose-100 text-rose-600' :
                    item.prioritas === 'Menengah' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                    'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  {renderIcon(item.iconType)}
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 shadow-sm">
                  {item.kode}
                </span>
              </div>
              
              <div className="pt-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${item.prioritasColor}`}>
                    Prioritas {item.prioritas}
                  </span>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Target: {item.target}</span>
                </div>
                
                <h3 className={`text-base font-bold tracking-tight ${item.status === 'Selesai' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                  {item.judul}
                </h3>
                
                <p className={`text-xs mt-2 leading-relaxed text-justify ${item.status === 'Selesai' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.deskripsi}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Tata Kelola</span>
              
              <div className="relative">
                <select 
                  value={item.status}
                  onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                  className={`pl-3 pr-8 py-2 border rounded-xl text-xs font-bold cursor-pointer outline-none transition-all shadow-sm appearance-none min-w-[130px] text-center ${getStatusStyle(item.status)}`}
                >
                  <option value="Belum Mulai">⏳ Belum Mulai</option>
                  <option value="Dalam Proses">🔄 Dalam Proses</option>
                  <option value="Selesai">✓ Selesai</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <span className="text-[8px]">▼</span>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}