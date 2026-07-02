// src/pages/LaporanPage.jsx
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export default function LaporanPage() {
  const [activeTab, setActiveTab] = useState('pdf');
  const [dataAsliDivisi, setDataAsliDivisi] = useState([]);
  const [skorAsliKeseluruhan, setSkorAsliKeseluruhan] = useState(0);

  // ==========================================
  // STATE: DAFTAR LAPORAN DINAMIS
  // ==========================================
  const laporanBawaan = [
    {
      id: 'default_1',
      judul: 'Laporan Eksekutif Kinerja LMX',
      deskripsi: 'Dibuat otomatis dari data pengisian form survei karyawan Anda di halaman /survei.',
      badgeLabel: 'Data Aktual Terintegrasi',
      badgeColor: 'bg-red-50 text-red-600',
      isDefault: true // Kalo true, tombol hapus bakal diumpetin
    }
  ];

  // Baca dari LocalStorage pas awal render, kalo kosong pake laporanBawaan
  const [daftarLaporanPdf, setDaftarLaporanPdf] = useState(() => {
    const savedLaporan = localStorage.getItem('synora_custom_reports');
    return savedLaporan ? JSON.parse(savedLaporan) : laporanBawaan;
  });

  // Tiap ada laporan baru/dihapus, langsung auto-save ke LocalStorage
  useEffect(() => {
    localStorage.setItem('synora_custom_reports', JSON.stringify(daftarLaporanPdf));
  }, [daftarLaporanPdf]);


  // ==========================================
  // TARIK "DATA ASLI" DARI HASIL SURVEI
  // ==========================================
  useEffect(() => {
    const skorKeseluruhan = localStorage.getItem('real_lmx_score');
    if (skorKeseluruhan) setSkorAsliKeseluruhan(parseFloat(skorKeseluruhan));

    const rawDataDivisi = localStorage.getItem('lmx_divisi_data');
    if (rawDataDivisi) {
      const parsedData = JSON.parse(rawDataDivisi);
      const rekapDivisi = [];

      for (const divisi in parsedData) {
        const kumpulanSkor = parsedData[divisi];
        const rataRata = kumpulanSkor.reduce((a, b) => a + b, 0) / kumpulanSkor.length;
        rekapDivisi.push({
          "Nama Departemen": divisi,
          "Total Responden Masuk": kumpulanSkor.length,
          "Skor Agregat LMX (Max 5.0)": parseFloat(rataRata.toFixed(2))
        });
      }
      setDataAsliDivisi(rekapDivisi);
    }
  }, []);

  // ==========================================
  // FUNGSI: TAMBAH LAPORAN BARU (AJUKAN FORMAT)
  // ==========================================
  const handleAjukanFormat = () => {
    const judulBaru = window.prompt("Masukkan Judul Laporan Baru yang Anda inginkan (Contoh: Laporan Kuartal 3):");
    
    if (judulBaru && judulBaru.trim() !== "") {
      const laporanBaru = {
        id: 'custom_' + Date.now(), // Bikin ID unik
        judul: judulBaru,
        deskripsi: 'Format laporan kustom. Dibuat sesuai pengajuan manual oleh admin.',
        badgeLabel: 'Format Kustom',
        badgeColor: 'bg-indigo-50 text-indigo-600',
        isDefault: false // Karena kustom, nanti bisa dihapus
      };

      // Tambahin laporan baru ke layar
      setDaftarLaporanPdf(prev => [...prev, laporanBaru]);
    }
  };

  // ==========================================
  // FUNGSI: HAPUS LAPORAN KUSTOM
  // ==========================================
  const handleHapusLaporan = (id, judul) => {
    const isConfirm = window.confirm(`Yakin ingin menghapus laporan "${judul}"?`);
    if (isConfirm) {
      setDaftarLaporanPdf(prev => prev.filter(lap => lap.id !== id));
    }
  };

  // ==========================================
  // FUNGSI CETAK PDF (PAKAI DATA ASLI)
  // ==========================================
  const handlePrintPDF = (judul) => {
    if (skorAsliKeseluruhan === 0) {
      alert("Belum ada data survei yang masuk! Silakan isi survei di halaman Karyawan terlebih dahulu.");
      return;
    }

    const tanggalCetak = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    let statusPdf = "Perlu Perhatian";
    let warnaBgPdf = "#fef3c7"; let warnaTeksPdf = "#d97706";
    
    if (skorAsliKeseluruhan >= 4.0) {
      statusPdf = "Sangat Sehat"; warnaBgPdf = "#dcfce7"; warnaTeksPdf = "#16a34a";
    } else if (skorAsliKeseluruhan < 3.0) {
      statusPdf = "Kritis / At Risk"; warnaBgPdf = "#fee2e2"; warnaTeksPdf = "#dc2626";
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${judul}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155; padding: 40px; line-height: 1.6; }
            .header { border-bottom: 3px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #1e40af; letter-spacing: 1px; }
            .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 30px; display: flex; justify-content: space-between; font-size: 13px; }
            h1 { font-size: 22px; color: #0f172a; margin-top: 0; }
            h2 { font-size: 16px; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f1f5f9; color: #0f172a; font-weight: bold; }
            .status-badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; }
            .footer { margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">SYNORA</div>
            <div style="font-size: 12px; color: #64748b;">Platform Manajemen Strategis & Evaluasi Relasi Kerja (LMX)</div>
          </div>
          <h1>${judul}</h1>
          <p style="font-size: 14px;">Dokumen ini merupakan hasil tarikan data riil dari sistem pengisian survei karyawan.</p>
          <div class="meta-box">
            <div><strong>Klasifikasi Dokumen:</strong> Rahasia (Confidential)</div>
            <div><strong>Tanggal Rilis:</strong> ${tanggalCetak}</div>
            <div><strong>Total Responden Organisasi:</strong> ${dataAsliDivisi.reduce((acc, curr) => acc + curr["Total Responden Masuk"], 0)} Karyawan</div>
          </div>
          <h2>1. Ringkasan Kinerja Hubungan Kerja (Matriks Agregat Keseluruhan)</h2>
          <table>
            <thead>
              <tr><th>Indikator Evaluasi</th><th>Nilai Batas Minimum</th><th>Realisasi Skor Aktual</th><th>Status Penilaian</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Overall LMX Score (Seluruh Organisasi)</td><td>4.00</td>
                <td style="font-size: 16px; font-weight: bold;">${skorAsliKeseluruhan.toFixed(2)}</td>
                <td><span class="status-badge" style="background:${warnaBgPdf}; color:${warnaTeksPdf};">${statusPdf}</span></td>
              </tr>
            </tbody>
          </table>
          <h2>2. Distribusi Skor LMX Berdasarkan Divisi</h2>
          <table>
            <thead>
              <tr><th>Nama Departemen / Divisi</th><th>Total Responden</th><th>Skor Rata-Rata Divisi</th></tr>
            </thead>
            <tbody>
              ${dataAsliDivisi.map(div => `
                <tr>
                  <td>${div["Nama Departemen"]}</td>
                  <td>${div["Total Responden Masuk"]} Orang</td>
                  <td><strong>${div["Skor Agregat LMX (Max 5.0)"]}</strong> / 5.00</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">
            Dokumen Otomatis Sistem SYNORA LMX Platform • ID Dokumen: RPT-${Math.floor(Math.random() * 90000) + 10000}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // ==========================================
  // FUNGSI EKSPOR EXCEL (.XLSX)
  // ==========================================
  const handleExportExcel = (filename) => {
    if (dataAsliDivisi.length === 0) {
      alert("Belum ada data! Karyawan harus mengisi survei terlebih dahulu.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(dataAsliDivisi);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Asli LMX");
    XLSX.writeFile(workbook, `${filename}_${new Date().getTime()}.xlsx`);
  };

  return (
    <div className="font-sans text-gray-800 pb-10">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-3xl">📄</span> Dokumen & Registri Laporan
        </h1>
        <p className="text-sm text-gray-500 mt-1">Pusat dokumentasi data komprehensif untuk tata kelola keputusan strategis organisasi.</p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('pdf')}
          className={`pb-3 px-2 text-sm font-bold transition-all border-b-2 ${activeTab === 'pdf' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          📁 Dokumen Siap Cetak (PDF)
        </button>
        <button 
          onClick={() => setActiveTab('raw')}
          className={`pb-3 px-2 text-sm font-bold transition-all border-b-2 ${activeTab === 'raw' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          📊 Registri Data Mentah (Excel)
        </button>
      </div>

      <div className="animate-fade-in-up">
        
        {/* TAB 1: PDF (SEKARANG DINAMIS) */}
        {activeTab === 'pdf' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* LOOPING LAPORAN YANG ADA DI DATABASE */}
            {daftarLaporanPdf.map((laporan) => (
              <div key={laporan.id} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
                
                {/* TOMBOL HAPUS (Hanya muncul jika bukan laporan default) */}
                {!laporan.isDefault && (
                  <button 
                    onClick={() => handleHapusLaporan(laporan.id, laporan.judul)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    title="Hapus Laporan Kustom"
                  >
                    🗑️
                  </button>
                )}

                <div>
                  <span className={`px-2.5 py-1 ${laporan.badgeColor} text-[10px] font-bold uppercase rounded-md tracking-wider`}>
                    {laporan.badgeLabel}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base mt-3 mb-1 pr-6">{laporan.judul}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mt-2">{laporan.deskripsi}</p>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => handlePrintPDF(laporan.judul)}
                    className="w-full py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-black transition-all flex justify-center items-center gap-2 active:scale-98"
                  >
                    🖨️ Cetak & Unduh PDF
                  </button>
                </div>
              </div>
            ))}

            {/* KARTU FITUR: TAMBAH LAPORAN (AJUKAN FORMAT) */}
            <div 
              onClick={handleAjukanFormat}
              className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-600 hover:bg-blue-50/20 transition-all min-h-[200px]"
            >
              <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-blue-600 text-xl font-bold shadow-sm mb-3">+</div>
              <h3 className="font-bold text-slate-700 text-sm">Buat Laporan Baru</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-[180px]">Tambahkan format laporan kustom sesuai kebutuhan Anda.</p>
            </div>
            
          </div>
        )}

        {/* TAB 2: EXCEL ASLI (.XLSX) */}
        {activeTab === 'raw' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Registri Tabel Data Aktual</h3>
                <p className="text-xs text-gray-400 mt-0.5">Tarik data riil karyawan yang telah menyelesaikan survei.</p>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/40 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[10px] flex items-center justify-center shrink-0">XLSX</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Ekstrak Master Data (Berdasarkan Partisipasi Survei)</h4>
                    <p className="text-xs text-gray-400 mt-1">Status saat ini: Terdapat {dataAsliDivisi.length} Divisi yang telah menginput data survei.</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleExportExcel('Data_Riil_LMX_Organisasi')}
                  className="px-5 py-2 bg-white border border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold text-xs rounded-xl transition-all shadow-sm shrink-0 active:scale-95"
                >
                  📥 Unduh File Excel (.xlsx)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}