// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('karyawan'); // 'karyawan' atau 'admin'
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userId || !password) {
      alert('Mohon isi ID/Email dan Password Anda.');
      return;
    }

    // Simulasi otentikasi sederhana untuk kebutuhan demo/presentation
    if (role === 'admin') {
      // Simpan status login admin di localStorage biar aman
      localStorage.setItem('synora_user_role', 'admin');
      localStorage.setItem('synora_user_name', 'Corporate Admin');
      navigate('/admin');
    } else {
      localStorage.setItem('synora_user_role', 'karyawan');
      localStorage.setItem('synora_user_name', userId);
      navigate('/survei');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 font-sans">
      
      {/* KARTU LOGIN BOX */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-8 space-y-6">
        
        {/* BRANDING / LOGO HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black text-blue-600 tracking-wider">SYNORA</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Leader-Member Exchange Platform</p>
        </div>

        {/* TOGGLE PILIHAN ROLE (ELEGANT KORPORAT) */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex border border-slate-200">
          <button
            type="button"
            onClick={() => { setRole('karyawan'); setUserId(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === 'karyawan' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📋 Karyawan (Responden)
          </button>
          <button
            type="button"
            onClick={() => { setRole('admin'); setUserId('admin@synora.com'); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === 'admin' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📊 Manajemen (Admin)
          </button>
        </div>

        {/* FORM INPUT UTAMA */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {role === 'karyawan' ? 'Nomor Induk Karyawan (NIK) / ID' : 'Alamat Email Resmi'}
            </label>
            <input
              type={role === 'karyawan' ? 'text' : 'email'}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={role === 'karyawan' ? 'Contoh: SYN-202401' : 'admin@synora.com'}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Kata Sandi (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-[0.98]"
            >
              Masuk ke Sistem Otorisasi →
            </button>
          </div>
        </form>

        {/* FOOTER INFORMASI */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-medium">
            Sistem Keamanan Terenkripsi Intern LMX Platform © 2026
          </p>
        </div>

      </div>
    </div>
  );
}