// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { Camera, Mail, Shield, Key, Bell, CheckCircle2, UserCircle, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('keamanan');
  const [adminName, setAdminName] = useState('Admin SYNORA');

  useEffect(() => {
    const savedName = localStorage.getItem('synora_user_name');
    if (savedName) {
      // Bikin format nama jadi rapi (huruf besar di awal)
      const formattedName = savedName.split('@')[0].replace('.', ' ');
      setAdminName(formattedName.replace(/\b\w/g, l => l.toUpperCase()));
    }
  }, []);

  const handleSavePassword = (e) => {
    e.preventDefault();
    alert('✅ Kata sandi berhasil diperbarui dan dienkripsi.');
  };

  const handleLogout = () => {
    const confirm = window.confirm('Anda yakin ingin keluar dari sistem?');
    if (confirm) {
      localStorage.removeItem('synora_user_role');
      window.location.href = '/login';
    }
  };

  return (
    <div className="font-sans text-slate-800 pb-10">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <UserCircle className="w-8 h-8 text-blue-600" /> Profil & Pengaturan Akun
        </h1>
        <p className="text-sm text-slate-500 mt-1 pl-11">Kelola kredensial keamanan, otorisasi akses, dan preferensi notifikasi sistem Anda.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* PANEL KIRI: KARTU PROFIL */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
            {/* Background Banner */}
            <div className="h-24 bg-gradient-to-r from-blue-700 to-indigo-800"></div>
            
            <div className="px-6 pb-6 relative">
              {/* Foto Profil */}
              <div className="relative w-20 h-20 bg-white rounded-full p-1 -mt-10 mb-3 mx-auto lg:mx-0 shadow-md">
                <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <UserCircle className="w-12 h-12" />
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Info Utama */}
              <div className="text-center lg:text-left border-b border-slate-100 pb-5 mb-5">
                <h2 className="text-lg font-bold text-slate-900">{adminName}</h2>
                <p className="text-xs font-bold text-blue-600 mt-0.5">System Administrator (Super User)</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
                    <Mail className="w-4 h-4 text-slate-400" /> {adminName.toLowerCase().replace(' ', '.')}@synora.com
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
                    <Shield className="w-4 h-4 text-slate-400" /> Otorisasi Penuh (Level 1)
                  </div>
                </div>
              </div>

              {/* Tombol Logout */}
              <button 
                onClick={handleLogout}
                className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-xl text-xs font-bold transition-all flex justify-center items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Keluar dari Sistem (Log Out)
              </button>
            </div>
          </div>
        </div>

        {/* PANEL KANAN: PENGATURAN */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
            
            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 px-2 pt-2">
              <button 
                onClick={() => setActiveTab('keamanan')}
                className={`px-6 py-3 text-xs font-bold flex items-center gap-2 transition-all border-b-2 ${activeTab === 'keamanan' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                <Key className="w-4 h-4" /> Keamanan & Sandi
              </button>
              <button 
                onClick={() => setActiveTab('notifikasi')}
                className={`px-6 py-3 text-xs font-bold flex items-center gap-2 transition-all border-b-2 ${activeTab === 'notifikasi' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                <Bell className="w-4 h-4" /> Preferensi Notifikasi
              </button>
            </div>

            {/* Konten Tab Keamanan */}
            {activeTab === 'keamanan' && (
              <div className="p-6 md:p-8 animate-fade-in-up">
                <h3 className="text-sm font-bold text-slate-800 mb-5">Perbarui Kata Sandi</h3>
                <form onSubmit={handleSavePassword} className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Kata Sandi Saat Ini</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Kata Sandi Baru</label>
                    <input type="password" placeholder="Minimal 8 karakter" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Konfirmasi Kata Sandi Baru</label>
                    <input type="password" placeholder="Ketik ulang sandi baru" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all" required />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="px-6 py-2.5 bg-slate-900 text-white hover:bg-black font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Simpan Perubahan Sandi
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Konten Tab Notifikasi */}
            {activeTab === 'notifikasi' && (
              <div className="p-6 md:p-8 animate-fade-in-up">
                <h3 className="text-sm font-bold text-slate-800 mb-5">Pengaturan Lansiran Sistem (Email Alerts)</h3>
                <div className="space-y-4">
                  
                  <label className="flex items-start gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Laporan Mingguan LMX</p>
                      <p className="text-xs text-slate-500 mt-0.5">Kirimkan ringkasan agregat skor survei setiap hari Senin pagi.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Peringatan Kritis (At Risk)</p>
                      <p className="text-xs text-slate-500 mt-0.5">Beritahu saya secara real-time jika ada divisi yang skornya turun di bawah 3.0.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Partisipasi Karyawan</p>
                      <p className="text-xs text-slate-500 mt-0.5">Kirim notifikasi setiap kali ada 10 karyawan baru yang menyelesaikan survei.</p>
                    </div>
                  </label>

                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}