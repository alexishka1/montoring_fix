// src/components/SummaryCards.jsx
export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      
      {/* Card 1: Overall LMX Score */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase">Overall LMX Score</h3>
          <p className="text-[10px] text-gray-400 mb-2">(Seluruh Organisasi)</p>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-gray-800">3.91</span>
            <span className="text-sm text-gray-500 mb-1">/5</span>
          </div>
          <p className="text-xs text-green-600 font-medium mt-1">Kategori: Baik</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500 border-t pt-2">
          <span>Periode lalu: 3.71</span>
          <span className="text-green-500 font-medium">↑ 0.20</span>
        </div>
      </div>

      {/* Card 2: Respon Rate */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Respon Rate</h3>
          <div className="text-2xl font-bold text-gray-800">86%</div>
          <p className="text-xs text-gray-500 mt-1">1.246 / 1.452 karyawan</p>
          {/* Progress Bar Simple */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '86%' }}></div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500 border-t pt-2">
          <span>Periode lalu: 82%</span>
          <span className="text-green-500 font-medium">↑ 4%</span>
        </div>
      </div>

      {/* Card 3: Dimensi Tertinggi */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Dimensi Tertinggi</h3>
          <p className="text-sm font-semibold text-blue-700">Professional Respect</p>
          <div className="flex items-end gap-1 mt-1">
            <span className="text-2xl font-bold text-gray-800">4.10</span>
            <span className="text-sm text-gray-500 mb-1">/5</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500 border-t pt-2">
          <span>Periode lalu: 3.89</span>
          <span className="text-green-500 font-medium">↑ 0.21</span>
        </div>
      </div>

      {/* Card 4: Dimensi Terendah */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Dimensi Terendah</h3>
          <p className="text-sm font-semibold text-gray-700">Loyalty</p>
          <div className="flex items-end gap-1 mt-1">
            <span className="text-2xl font-bold text-gray-800">3.83</span>
            <span className="text-sm text-gray-500 mb-1">/5</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500 border-t pt-2">
          <span>Periode lalu: 3.64</span>
          <span className="text-green-500 font-medium">↑ 0.19</span>
        </div>
      </div>

      {/* Card 5: Responden */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Responden</h3>
          <div className="text-2xl font-bold text-gray-800">1.248</div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-[10px] text-gray-500">Tingkat Respons</p>
              <p className="text-lg font-bold text-gray-800">86%</p>
            </div>
            {/* Icon Placeholder */}
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
              👥
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}