// src/components/Header.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircle, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getGlobalConfig } from '../lib/firestore';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePeriod, setActivePeriod] = useState('Juli 2026');
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    async function fetchPeriod() {
      try {
        const config = await getGlobalConfig();
        if (config.active_period) {
          setActivePeriod(config.active_period);
        }
      } catch (e) {
        console.error('Gagal memuat periode:', e);
      }
    }
    fetchPeriod();
  }, []);

  // Fungsi ganti judul otomatis sesuai halaman yang dibuka
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/admin': return 'Ringkasan Eksekutif';
      case '/admin/divisi': return 'Analisis Per Divisi';
      case '/admin/atasan': return 'Analisis Per Atasan';
      case '/admin/partisipasi': return 'Periode & Survey';
      case '/admin/insights': return 'Insights & Analisis';
      case '/admin/laporan': return 'Pusat Laporan';
      case '/admin/rekomendasi': return 'Rencana Tindakan';
      case '/admin/struktur': return 'Struktur Organisasi';
      case '/admin/pertanyaan': return 'Pengaturan Instrumen';
      case '/admin/profil': return 'Profil & Pengaturan Akun';
      default: return 'Dashboard SYNORA';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 shadow-sm z-10 relative">
      
      {/* JUDUL HALAMAN (KIRI) */}
      <h1 className="text-xl font-bold text-slate-800">{getPageTitle()}</h1>
      
      {/* BAGIAN KANAN HEADER */}
      <div className="flex items-center gap-5">
        
        {/* Info Periode Aktif */}
        <div className="text-sm font-medium text-slate-500 hidden md:block">
          Periode Aktif: <span className="font-bold text-slate-700">{activePeriod}</span>
        </div>
        
        {/* Tombol Notifikasi */}
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`text-slate-400 hover:text-blue-600 transition-colors relative ml-2 p-1.5 rounded-full ${isNotifOpen ? 'bg-blue-50 text-blue-600' : ''}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Dropdown Notifikasi */}
          {isNotifOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsNotifOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-800 text-sm">Notifikasi</h3>
                  <button className="text-[10px] font-semibold text-blue-600 hover:underline">Tandai semua dibaca</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  
                  {/* Notif 1: Alert Skor */}
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <span className="text-red-600 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Skor Information Technology Menurun</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Skor LMX divisi IT turun menjadi 2.75. Indikator "Penghargaan Ide" berada di titik terendah.</p>
                      <p className="text-[9px] text-slate-400 mt-1 font-medium">10 menit yang lalu</p>
                    </div>
                  </div>

                  {/* Notif 2: Pencapaian Survey */}
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <span className="text-green-600 text-xs">📈</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Partisipasi Human Capital 100%</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Seluruh karyawan di divisi Human Capital telah menyelesaikan survey periode ini.</p>
                      <p className="text-[9px] text-slate-400 mt-1 font-medium">2 jam yang lalu</p>
                    </div>
                  </div>

                  {/* Notif 3: Sistem */}
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <span className="text-blue-600 text-xs">🗓️</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Periode Baru Dimulai</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Periode evaluasi LMX untuk bulan ini telah resmi dibuka.</p>
                      <p className="text-[9px] text-slate-400 mt-1 font-medium">1 hari yang lalu</p>
                    </div>
                  </div>

                </div>
                <div className="p-3 text-center border-t border-slate-100 bg-slate-50">
                  <button className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
                    Lihat Semua Notifikasi
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Garis Pembatas */}
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        {/* TOMBOL PROFIL (BISA DIKLIK) */}
        <button 
          onClick={() => navigate('/admin/profil')}
          className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pr-4 rounded-full transition-all border border-transparent hover:border-slate-200 active:scale-95"
        >
          <UserCircle className="w-8 h-8 text-slate-400 bg-slate-100 rounded-full" />
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-slate-700 leading-none mb-1">Corporate Admin</p>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">Super User</p>
          </div>
        </button>

      </div>
    </header>
  );
}