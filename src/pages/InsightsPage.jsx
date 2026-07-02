// src/pages/InsightsPage.jsx
import { useState, useEffect } from 'react';
import { getGlobalConfig } from '../lib/firestore';

export default function InsightsPage() {
  const [skor, setSkor] = useState(3.91); 
  
  // STATE BUAT NAMPILIN POP-UP (MODAL)
  const [showModalAnalisis, setShowModalAnalisis] = useState(false);
  const [showModalRekomendasi, setShowModalRekomendasi] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const config = await getGlobalConfig();
        if (config.real_lmx_score) setSkor(parseFloat(config.real_lmx_score));
      } catch (err) {
        console.error("Gagal memuat skor:", err);
      }
    }
    loadData();
  }, []);

  let statusKesehatan = skor >= 4.0 ? 'Sangat Sehat' : skor >= 3.0 ? 'Perlu Perhatian' : 'Kritis (At Risk)';
  let warnaStatus = skor >= 4.0 ? 'text-green-600 bg-green-50' : skor >= 3.0 ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50';

  return (
    <div className="font-sans text-gray-800 pb-10 relative">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-3xl">💡</span> Insights & Analisis
        </h1>
        <p className="text-sm text-gray-500 mt-1">Ringkasan temuan dan rekomendasi strategis berdasarkan agregasi data survei LMX.</p>
      </div>

      <div className="space-y-6 animate-fade-in-up">
        
        {/* BANNER STATUS KESELURUHAN */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 border-l-4 border-l-blue-600">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Kesimpulan Data Keseluruhan</h3>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">{skor.toFixed(2)}</span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${warnaStatus}`}>
                {statusKesehatan}
              </span>
            </div>
          </div>
          <div className="md:w-1/2 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "Secara keseluruhan, organisasi berada pada level rata-rata. Terdapat disparitas skor yang cukup tinggi antar divisi. Dimensi <strong>Loyalty (Kesetiaan)</strong> menjadi area yang paling membutuhkan intervensi kepemimpinan segera."
            </p>
          </div>
        </div>

        {/* GRID 3 KOLOM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* KOLOM 1: KEY FINDINGS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-3 uppercase text-sm tracking-wider">
              <span className="bg-blue-50 text-blue-600 w-8 h-8 flex justify-center items-center rounded-lg text-lg">🔍</span>
              Key Findings
            </h3>
            <ul className="space-y-5 flex-1">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-0.5">↗</span>
                <p className="text-sm text-gray-600 leading-relaxed">Skor LMX organisasi stabil dengan peningkatan <span className="font-bold text-green-600">0.20 poin</span> dari periode lalu.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-lg mt-0.5">☆</span>
                <p className="text-sm text-gray-600 leading-relaxed">Dimensi <strong>Professional Respect</strong> menjadi kekuatan utama organisasi (Skor 4.10).</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-0.5">⚠</span>
                <p className="text-sm text-gray-600 leading-relaxed">Dimensi <strong>Loyalty</strong> merupakan area kritis yang perlu mendapat perhatian lebih.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 text-lg mt-0.5">👥</span>
                <p className="text-sm text-gray-600 leading-relaxed">Divisi <strong>Human Capital (HC)</strong> memiliki hubungan atasan-bawahan paling sehat saat ini.</p>
              </li>
            </ul>
          </div>

          {/* KOLOM 2: TOP 3 AREA PERBAIKAN */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-3 uppercase text-sm tracking-wider">
              <span className="bg-red-50 text-red-600 w-8 h-8 flex justify-center items-center rounded-lg text-lg">📈</span>
              Top 3 Area Perbaikan
            </h3>
            <div className="space-y-4 flex-1">
              <div className="flex gap-4 items-start p-4 bg-red-50/50 rounded-xl border border-red-100 hover:bg-red-50 transition-colors">
                <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <p className="text-sm text-gray-700 font-medium">Meningkatkan loyalitas karyawan terhadap atasan dan keputusan organisasi.</p>
              </div>
              <div className="flex gap-4 items-start p-4 bg-orange-50/50 rounded-xl border border-orange-100 hover:bg-orange-50 transition-colors">
                <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <p className="text-sm text-gray-700 font-medium">Memperkuat komunikasi terbuka dan penyampaian feedback antara atasan - bawahan.</p>
              </div>
              <div className="flex gap-4 items-start p-4 bg-yellow-50/50 rounded-xl border border-yellow-100 hover:bg-yellow-50 transition-colors">
                <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <p className="text-sm text-gray-700 font-medium">Meningkatkan dukungan proaktif atasan dalam pengembangan karier anggota tim.</p>
              </div>
            </div>
            
            {/* TOMBOL POP-UP ANALISIS */}
            <button 
              onClick={() => setShowModalAnalisis(true)}
              className="w-full mt-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 hover:border-gray-300 transition-all active:scale-95"
            >
              Lihat Analisis Lengkap
            </button>
          </div>

          {/* KOLOM 3: REKOMENDASI STRATEGIS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-3 uppercase text-sm tracking-wider">
              <span className="bg-green-50 text-green-600 w-8 h-8 flex justify-center items-center rounded-lg text-lg">🎯</span>
              Rekomendasi Strategis
            </h3>
            <div className="space-y-5 flex-1">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">🎯</div>
                <p className="text-sm text-gray-700 font-medium">Program penguatan loyalitas melalui skema coaching dan mentoring intensif.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">🗣️</div>
                <p className="text-sm text-gray-700 font-medium">Pelatihan komunikasi efektif terfokus bagi para leader tingkat menengah (Supervisor/Manager).</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">💬</div>
                <p className="text-sm text-gray-700 font-medium">Mendorong budaya feedback rutin dan konstruktif melalui agenda rutin 1-on-1.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">🏆</div>
                <p className="text-sm text-gray-700 font-medium">Meningkatkan keterlibatan karyawan (engagement) melalui program Employee Recognition.</p>
              </div>
            </div>

            {/* TOMBOL POP-UP REKOMENDASI */}
            <button 
              onClick={() => setShowModalRekomendasi(true)}
              className="w-full mt-6 py-2.5 border border-blue-600 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 hover:shadow-sm transition-all active:scale-95"
            >
              Lihat Semua Rekomendasi
            </button>
          </div>
          
        </div>
      </div>

      {/* ================================================================= */}
      {/* POP-UP (MODAL) ANALISIS LENGKAP - VERSI PROFESIONAL */}
      {/* ================================================================= */}
      {showModalAnalisis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">📊</span> Laporan Analisis Mendalam
              </h2>
              <button onClick={() => setShowModalAnalisis(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-600 leading-relaxed">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800">
                <strong>Informasi Laporan:</strong> Laporan ini merupakan hasil agregasi data survei dari 1.246 responden yang dihitung berdasarkan matriks pembobotan dimensi LMX.
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 text-base mb-2">1. Akar Masalah Penurunan Dimensi Loyalty (Kesetiaan)</h4>
                <p className="mb-2">Berdasarkan tabulasi silang antara data demografi dan LMX-MDM, ditemukan bahwa <strong>68% karyawan tingkat staf</strong> merasa atasan mereka tidak memberikan pembelaan yang memadai ketika terjadi konflik lintas divisi.</p>
                <p>Gejala ini paling signifikan terdeteksi pada divisi <strong>Marketing & Sales</strong> dan <strong>Operations</strong>, di mana tekanan pencapaian target memicu budaya saling menyalahkan (blame culture) yang tidak ditangani dengan baik oleh jajaran manajerial.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-base mb-2">2. Kekuatan Utama pada Professional Respect (Penghargaan Profesional)</h4>
                <p>Meskipun dimensi kesetiaan butuh perbaikan, karyawan masih menaruh rasa hormat yang sangat tinggi terhadap kompetensi teknis dari atasan mereka. <strong>82% responden</strong> mengakui bahwa leader mereka memiliki rekam jejak penyelesaian masalah operasional yang sangat baik.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-base mb-2">3. Potensi Risiko Kehilangan Talent (Turnover Risk)</h4>
                <p>Data menunjukkan adanya korelasi kuat antara rendahnya skor <em>Affect</em> di divisi Finance & Accounting dengan indikasi potensi pengunduran diri dalam 6 bulan ke depan. Leader di divisi tersebut cenderung berfokus pada gaya komunikasi <em>Top-Down</em> yang kaku dan minim ruang diskusi dua arah.</p>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button onClick={() => setShowModalAnalisis(false)} className="px-6 py-2.5 bg-gray-800 text-white font-bold text-sm rounded-xl hover:bg-black transition-colors">
                Tutup Laporan
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ================================================================= */}
      {/* POP-UP (MODAL) REKOMENDASI STRATEGIS - VERSI PROFESIONAL */}
      {/* ================================================================= */}
      {showModalRekomendasi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">📋</span> Action Plan & Rekomendasi
              </h2>
              <button onClick={() => setShowModalRekomendasi(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-gray-600">
              <p className="mb-4">Berikut adalah langkah-langkah strategis yang direkomendasikan berdasarkan hasil evaluasi data untuk dieksekusi oleh tim Human Capital dalam kuartal (Q3) mendatang:</p>

              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">1</span>
                  <h4 className="font-bold text-gray-900 text-base">Leadership Empathy Workshop</h4>
                </div>
                <p className="pl-11 text-gray-600 leading-relaxed"><strong>Target:</strong> Divisi Operations & Finance.<br/><strong>Tindakan:</strong> Mengadakan sesi pelatihan khusus untuk middle management tentang cara membangun kedekatan emosional (Affect) dan keterampilan mendengarkan aktif (Active Listening) tanpa menghilangkan ketegasan operasional.</p>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold">2</span>
                  <h4 className="font-bold text-gray-900 text-base">Intervensi Kasus Loyalty</h4>
                </div>
                <p className="pl-11 text-gray-600 leading-relaxed"><strong>Target:</strong> Divisi Marketing & Sales.<br/><strong>Tindakan:</strong> HR Business Partner (HRBP) diarahkan untuk melakukan mediasi 1-on-1 antara Sales Manager dan timnya guna meruntuhkan budaya saling menyalahkan saat target tidak tercapai.</p>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold">3</span>
                  <h4 className="font-bold text-gray-900 text-base">Revitalisasi Program 1-on-1 Mingguan</h4>
                </div>
                <p className="pl-11 text-gray-600 leading-relaxed"><strong>Target:</strong> Seluruh Divisi (Company Wide).<br/><strong>Tindakan:</strong> Mewajibkan semua atasan melakukan sesi check-in 15 menit setiap minggu dengan bawahannya yang difokuskan pada penyelesaian kendala kerja dan pendampingan, bukan sekadar evaluasi KPI bulanan.</p>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors">
                Export PDF
              </button>
              <button onClick={() => setShowModalRekomendasi(false)} className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors">
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}