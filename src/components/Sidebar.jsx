// src/components/Sidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, PieChart, Users, Calendar, 
  Lightbulb, FileText, Target, Network, Settings
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const MenuButton = ({ path, icon: Icon, label }) => (
    <button 
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
        isActive(path) 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive(path) ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} /> 
      {label}
    </button>
  );

  return (
    <aside className="w-64 bg-slate-900 h-screen flex flex-col shadow-2xl border-r border-slate-800">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-black text-white tracking-wider flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">S</div>
          SYNORA
        </h2>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">LMX Enterprise Dashboard</p>
      </div>
      
      {/* Menu Navigasi (Full Height karena profil di bawah dihapus) */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
        
        <MenuButton path="/admin" icon={LayoutDashboard} label="Ringkasan Eksekutif" />
        <MenuButton path="/admin/divisi" icon={PieChart} label="Per Divisi" />
        <MenuButton path="/admin/atasan" icon={Users} label="Per Atasan" />
        <MenuButton path="/admin/partisipasi" icon={Calendar} label="Periode & Survey" />
        
        <div className="pt-4 pb-2">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Analisis & Dokumen</p>
        </div>
        
        <MenuButton path="/admin/insights" icon={Lightbulb} label="Insights Data" />
        <MenuButton path="/admin/laporan" icon={FileText} label="Pusat Laporan" />
        <MenuButton path="/admin/rekomendasi" icon={Target} label="Rencana Tindakan" />
        
        <div className="pt-4 pb-2">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Manajemen Master</p>
        </div>
        
        <MenuButton path="/admin/struktur" icon={Network} label="Struktur Organisasi" />
        <MenuButton path="/admin/pertanyaan" icon={Settings} label="Pengaturan Instrumen" />
      </div>

    </aside>
  );
}