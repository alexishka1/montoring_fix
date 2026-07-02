// src/components/Header.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircle, Bell } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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
          Periode Aktif: <span className="font-bold text-slate-700">Juli 2026</span>
        </div>
        
        {/* Tombol Notifikasi (Pemanis) */}
        <button className="text-slate-400 hover:text-blue-600 transition-colors relative ml-2">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

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