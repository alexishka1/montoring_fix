// src/pages/StrukturPage.jsx
import { useState, useEffect } from 'react';
import { getStruktur, saveStruktur } from '../lib/firestore';

export default function StrukturPage() {
  
  // Database Master Data 10 Divisi Lengkap beserta Roster Karyawannya
  const defaultStruktur = [
    { 
      id: 'div_1', nama: 'Human Capital', leader: 'Budi Santoso', title: 'HR Director', parent: 'Direktorat HR & GA', status: 'Aktif',
      karyawan: [
        { id: 'SYN-101', nama: 'Rian Wijaya', peran: 'HR Specialist', email: 'rian.w@synora.com' },
        { id: 'SYN-102', nama: 'Siti Rahma', peran: 'Talent Acquisition', email: 'siti.r@synora.com' },
        { id: 'SYN-103', nama: 'Aditya Pratama', peran: 'Compensation & Benefit', email: 'aditya.p@synora.com' }
      ]
    },
    { 
      id: 'div_2', nama: 'Finance & Accounting', leader: 'Hendra Gunawan', title: 'Chief Financial Officer', parent: 'Direktorat Keuangan', status: 'Aktif',
      karyawan: [
        { id: 'SYN-201', nama: 'Amalia Sari', peran: 'Senior Accountant', email: 'amalia.s@synora.com' },
        { id: 'SYN-202', nama: 'Bambang Triomulyo', peran: 'Tax Officer', email: 'bambang.t@synora.com' },
        { id: 'SYN-203', nama: 'Citra Lestari', peran: 'Internal Auditor', email: 'citra.l@synora.com' }
      ]
    },
    { 
      id: 'div_3', nama: 'Information Technology', leader: 'Reza Rahadian', title: 'VP of Engineering', parent: 'Direktorat Operasional', status: 'Aktif',
      karyawan: [
        { id: 'SYN-301', nama: 'Eko Prasetyo', peran: 'Lead Frontend Engineer', email: 'eko.p@synora.com' },
        { id: 'SYN-302', nama: 'Fajar Nugraha', peran: 'Backend Developer', email: 'fajar.n@synora.com' },
        { id: 'SYN-303', nama: 'Gita Permata', peran: 'QA Automation', email: 'gita.p@synora.com' },
        { id: 'SYN-304', nama: 'Heri Kurniawan', peran: 'DevOps Engineer', email: 'heri.k@synora.com' }
      ]
    },
    { 
      id: 'div_4', nama: 'Marketing & Sales', leader: 'Andi Wijaya', title: 'Head of Sales', parent: 'Direktorat Komersial', status: 'Aktif',
      karyawan: [
        { id: 'SYN-401', nama: 'Indah Permatasari', peran: 'Account Executive', email: 'indah.p@synora.com' },
        { id: 'SYN-402', nama: 'Joni Iskandar', peran: 'Digital Marketer', email: 'joni.i@synora.com' }
      ]
    },
    { 
      id: 'div_5', nama: 'Operations', leader: 'Joko Susilo', title: 'Operations Manager', parent: 'Direktorat Operasional', status: 'Aktif',
      karyawan: [
        { id: 'SYN-501', nama: 'Kurnia Mega', peran: 'Ops Supervisor', email: 'kurnia.m@synora.com' },
        { id: 'SYN-502', nama: 'Lilis Karlina', peran: 'Admin Staff', email: 'lilis.k@synora.com' }
      ]
    },
    { 
      id: 'div_6', nama: 'Customer Service', leader: 'Ayu Lestari', title: 'CS Head', parent: 'Direktorat Komersial', status: 'Aktif',
      karyawan: [
        { id: 'SYN-601', nama: 'Mega Utami', peran: 'Helpdesk Agent', email: 'mega.u@synora.com' },
        { id: 'SYN-602', nama: 'Novan Saputra', peran: 'CRM Specialist', email: 'novan.s@synora.com' }
      ]
    },
    { 
      id: 'div_7', nama: 'Product Development', leader: 'Nadiem Makarim', title: 'Head of Product', parent: 'Direktorat Operasional', status: 'Aktif',
      karyawan: [
        { id: 'SYN-701', nama: 'Oki Setiana', peran: 'Product Manager', email: 'oki.s@synora.com' },
        { id: 'SYN-702', nama: 'Putri Ayu', peran: 'UI/UX Designer', email: 'putri.a@synora.com' }
      ]
    },
    { 
      id: 'div_8', nama: 'Production', leader: 'Bambang Pamungkas', title: 'Plant Manager', parent: 'Direktorat Produksi', status: 'Aktif',
      karyawan: [
        { id: 'SYN-801', nama: 'Qori Sandi', peran: 'Shift Leader', email: 'qori.s@synora.com' },
        { id: 'SYN-802', nama: 'Rendra Rahman', peran: 'Technician', email: 'rendra.r@synora.com' }
      ]
    },
    { 
      id: 'div_9', nama: 'Logistics', leader: 'Anton Syahputra', title: 'Logistics Manager', parent: 'Direktorat Produksi', status: 'Aktif',
      karyawan: [
        { id: 'SYN-901', nama: 'Suryo Utomo', peran: 'Warehouse Admin', email: 'suryo.u@synora.com' },
        { id: 'SYN-902', nama: 'Taufik Hidayat', peran: 'Fleet Coordinator', email: 'taufik.h@synora.com' }
      ]
    },
    { 
      id: 'div_10', nama: 'General Affairs', leader: 'Rudy Salim', title: 'GA Manager', parent: 'Direktorat HR & GA', status: 'Aktif',
      karyawan: [
        { id: 'SYN-011', nama: 'Vina Panduwinata', peran: 'Facilities Staff', email: 'vina.p@synora.com' },
        { id: 'SYN-012', nama: 'Wahyu Hidayat', peran: 'Procurement Specialist', email: 'wahyu.h@synora.com' }
      ]
    }
  ];

  // Integrasi State & Firestore
  const [strukturData, setStrukturData] = useState(defaultStruktur);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data divisi pertama buat jadi menu default aktif di kanan
  const [activeDivisiId, setActiveDivisiId] = useState('div_1');

  // Load dari Firestore
  useEffect(() => {
    async function loadData() {
      try {
        const saved = await getStruktur();
        if (saved) {
          setStrukturData(saved);
          setActiveDivisiId(saved[0]?.id || 'div_1');
        }
      } catch (err) {
        console.error("Gagal memuat struktur:", err);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Auto-save ke Firestore
  useEffect(() => {
    if (!isLoading) {
      saveStruktur(strukturData).catch(err => console.error("Gagal simpan:", err));
    }
  }, [strukturData, isLoading]);

  // Cari objek data divisi yang lagi aktif diklik admin
  const activeDivisi = strukturData.find(d => d.id === activeDivisiId) || strukturData[0];

  // ==========================================
  // INTERAKSI 1: TAMBAH DIVISI BARU
  // ==========================================
  const handleTambahDivisi = () => {
    const namaDivisi = window.prompt("Nama Departemen / Divisi Baru:");
    if (!namaDivisi) return;
    const direktorat = window.prompt("Nama Direktorat Induk (Contoh: Direktorat Operasional):");
    if (!direktorat) return;
    const kepalaDivisi = window.prompt("Nama Kepala Divisi / Manajer:");
    if (!kepalaDivisi) return;

    const divisiBaru = {
      id: 'div_' + Date.now(),
      nama: namaDivisi,
      leader: kepalaDivisi,
      title: 'Head of ' + namaDivisi,
      parent: direktorat,
      status: 'Aktif',
      karyawan: []
    };

    setStrukturData(prev => [...prev, divisiBaru]);
    setActiveDivisiId(divisiBaru.id); // Langsung fokusin ke divisi baru
  };

  // ==========================================
  // INTERAKSI 2: TAMBAH KARYAWAN KE DIVISI AKTIF
  // ==========================================
  const handleTambahKaryawan = () => {
    const namaKaryawan = window.prompt(`Masukkan nama karyawan baru untuk divisi ${activeDivisi.nama}:`);
    if (!namaKaryawan) return;
    const jabatan = window.prompt("Jabatan / Peran Karyawan (Contoh: Staff Developer):");
    if (!jabatan) return;

    const karyawanBaru = {
      id: 'SYN-' + (Math.floor(Math.random() * 900) + 100),
      nama: namaKaryawan,
      peran: jabatan,
      email: namaKaryawan.toLowerCase().replace(/ /g, '.') + '@synora.com'
    };

    setStrukturData(prev => prev.map(div => {
      if (div.id === activeDivisi.id) {
        return { ...div, karyawan: [...div.karyawan, karyawanBaru] };
      }
      return div;
    }));
  };

  // ==========================================
  // INTERAKSI 3: HAPUS KARYAWAN DARI DIVISI
  // ==========================================
  const handleHapusKaryawan = (karyawanId, namaKaryawan) => {
    const confirm = window.confirm(`Keluarkan ${namaKaryawan} dari struktur divisi ${activeDivisi.nama}?`);
    if (confirm) {
      setStrukturData(prev => prev.map(div => {
        if (div.id === activeDivisi.id) {
          return { ...div, karyawan: div.karyawan.filter(k => k.id !== karyawanId) };
        }
        return div;
      }));
    }
  };

  return (
    <div className="font-sans text-slate-800 pb-10">
      
      {/* HEADER UTAMA */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-3xl">👥</span> Struktur & Roster Organisasi
          </h1>
          <p className="text-sm text-gray-500 mt-1">Kelola direktori departemen korporat, pemetaan pimpinan jajaran, dan registri staf operasional.</p>
        </div>
        <button 
          onClick={handleTambahDivisi}
          className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-black transition-all shadow-sm flex items-center gap-2 active:scale-95 shrink-0"
        >
          + Daftarkan Divisi Baru
        </button>
      </div>

      {/* DUAL PANEL LAYOUT (SPLIT PANEL) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* PANEL KIRI: LIST MASTER DEPARTEMEN */}
        <div className="w-full lg:w-80 shrink-0 space-y-2 max-h-[75vh] overflow-y-auto pr-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">Daftar Departemen</p>
          
          {strukturData.map((div) => (
            <div
              key={div.id}
              onClick={() => setActiveDivisiId(div.id)}
              className={`p-4 rounded-xl cursor-pointer border text-left transition-all ${
                activeDivisi.id === div.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-[1.01]'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[9px] font-bold uppercase tracking-wider block mb-1 ${activeDivisi.id === div.id ? 'text-blue-100' : 'text-slate-400'}`}>
                {div.parent}
              </span>
              <h3 className="font-bold text-sm tracking-tight">{div.nama}</h3>
              <div className="flex justify-between items-center mt-3 text-[11px]">
                <span className={activeDivisi.id === div.id ? 'text-blue-200' : 'text-slate-500'}>
                  👤 Lead: {div.leader.split(' ')[0]}
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${activeDivisi.id === div.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {div.karyawan.length} Staf
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PANEL KANAN: DETAIL STRUKTUR & ROSTER KARYAWAN */}
        <div className="flex-1 w-full space-y-6">
          
          {/* KARTU ATASAN / KEPALA DIVISI */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Pimpinan Organisasi Terpilih</span>
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-slate-100 shadow-sm">
                  {activeDivisi.leader.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{activeDivisi.leader}</h2>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">{activeDivisi.title}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Penanggung Jawab penuh tata kelola operasional lingkup <span className="font-semibold text-slate-600">{activeDivisi.nama}</span></p>
                </div>
              </div>
              
              <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-right shrink-0">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Klasifikasi Divisi</p>
                <p className="text-xs font-bold text-slate-700">{activeDivisi.parent}</p>
              </div>
            </div>
          </div>

          {/* TABEL ROSTER ANGGOTA KARYAWAN */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            
            {/* Header Tabel */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Registri Roster Staf ({activeDivisi.karyawan.length} Anggota Resmi)</h3>
                <p className="text-xs text-slate-400 mt-0.5">Daftar bawahan langsung (Direct Reports) yang terdaftar dalam klaster survei relasi LMX.</p>
              </div>
              <button
                onClick={handleTambahKaryawan}
                className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95"
              >
                + Tambah Anggota Staf
              </button>
            </div>

            {/* Kondisi Jika Divisi Kosong */}
            {activeDivisi.karyawan.length === 0 ? (
              <div className="p-10 text-center text-slate-400 text-xs">
                🚨 Belum ada anggota karyawan yang didaftarkan di divisi ini. Klik tombol di atas untuk menambah staf baru.
              </div>
            ) : (
              /* Komponen Tabel Riil */
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4 w-28">ID Karyawan</th>
                      <th className="p-4">Nama Lengkap</th>
                      <th className="p-4">Jabatan / Peran</th>
                      <th className="p-4">Alamat Email</th>
                      <th className="p-4 w-16 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {activeDivisi.karyawan.map((staf) => (
                      <tr key={staf.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-500">{staf.id}</td>
                        <td className="p-4 font-bold text-slate-900">{staf.nama}</td>
                        <td className="p-4 text-slate-600">
                          <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-medium">
                            {staf.peran}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 font-medium">{staf.email}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleHapusKaryawan(staf.id, staf.nama)}
                            className="w-7 h-7 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all shadow-sm font-bold mx-auto"
                            title="Keluarkan Karyawan"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
          </div>

        </div>
      </div>

    </div>
  );
}