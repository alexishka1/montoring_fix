// src/components/BottomInsights.jsx
export default function BottomInsights() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* 3 KOTAK INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Kotak 1: Key Findings */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-bold text-gray-800 uppercase mb-4">Key Findings</h3>
          <ul className="space-y-4 text-[11px] text-gray-600">
            <li className="flex gap-3 items-start">
              <span className="p-1.5 bg-green-50 text-green-600 rounded-md">📈</span>
              <p>Skor LMX organisasi berada pada kategori Baik dengan peningkatan 0.20 poin dari periode lalu.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-md">⭐</span>
              <p>Dimensi Professional Respect menjadi kekuatan utama organisasi dengan skor 4.10.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="p-1.5 bg-orange-50 text-orange-600 rounded-md">⚠️</span>
              <p>Dimensi Loyalty merupakan area yang perlu mendapatkan perhatian lebih.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="p-1.5 bg-purple-50 text-purple-600 rounded-md">👥</span>
              <p>Divisi Human Capital (HC) memiliki hubungan atasan-bawahan terbaik di organisasi.</p>
            </li>
          </ul>
        </div>

        {/* Kotak 2: Top 3 Area Perbaikan */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-800 uppercase mb-4">Top 3 Area Perbaikan</h3>
            <ul className="space-y-4 text-[11px] text-gray-600">
              <li className="flex gap-3 items-start">
                <span className="w-5 h-5 flex items-center justify-center bg-red-50 text-red-600 font-bold rounded-full shrink-0">1</span>
                <p>Meningkatkan loyalitas karyawan terhadap atasan dan organisasi.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-5 h-5 flex items-center justify-center bg-red-50 text-red-600 font-bold rounded-full shrink-0">2</span>
                <p>Memperkuat komunikasi dan feedback antara atasan dan bawahan.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-5 h-5 flex items-center justify-center bg-red-50 text-red-600 font-bold rounded-full shrink-0">3</span>
                <p>Meningkatkan dukungan atasan dalam pengembangan karier anggota tim.</p>
              </li>
            </ul>
          </div>
          <button className="mt-6 w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-[11px] font-semibold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap
          </button>
        </div>

        {/* Kotak 3: Rekomendasi Strategis */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-800 uppercase mb-4">Rekomendasi Strategis</h3>
            <ul className="space-y-4 text-[11px] text-gray-600">
              <li className="flex gap-3 items-start">
                <span className="p-1.5 bg-green-50 text-green-600 rounded-md shrink-0">🎯</span>
                <p>Program penguatan loyalitas melalui coaching dan mentoring.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-md shrink-0">💬</span>
                <p>Pelatihan komunikasi efektif bagi para leader.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="p-1.5 bg-orange-50 text-orange-600 rounded-md shrink-0">📝</span>
                <p>Mendorong budaya feedback rutin dan konstruktif.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="p-1.5 bg-purple-50 text-purple-600 rounded-md shrink-0">🏅</span>
                <p>Meningkatkan keterlibatan karyawan melalui program penghargaan dan pengakuan.</p>
              </li>
            </ul>
          </div>
          <button className="mt-6 w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-[11px] font-semibold hover:bg-blue-50 transition-colors">
            Lihat Semua Rekomendasi
          </button>
        </div>

      </div>

      {/* FOOTER INFORMASI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-6 pb-4">
        <div className="flex gap-3 items-start">
          <span className="text-xl">⚙️</span>
          <div>
            <p className="text-xs font-bold text-gray-800">Metodologi</p>
            <p className="text-[10px] text-gray-500 mt-1">Penilaian menggunakan kombinasi instrumen LMX-MDM (24 item, 4 dimensi) dan LMX-7 (7 item, 1 dimensi). Data diolah secara anonim dan agregat.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-xl">📊</span>
          <div>
            <p className="text-xs font-bold text-gray-800">Sumber Data</p>
            <p className="text-[10px] text-gray-500 mt-1">Data diperoleh dari survey karyawan pada bulan Mei 2024.<br/>Total responden: 1.248 dari 1.452 karyawan (86%)</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-xl">🕒</span>
          <div>
            <p className="text-xs font-bold text-gray-800">Update Terakhir</p>
            <p className="text-[10px] text-gray-500 mt-1">25 Mei 2024, 10:30 WIB</p>
          </div>
        </div>
      </div>

    </div>
  );
}