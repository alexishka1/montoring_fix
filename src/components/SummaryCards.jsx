// src/components/SummaryCards.jsx
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function SummaryCards() {
  const [overallScore, setOverallScore] = useState(3.91);
  const [responden, setResponden] = useState(1246);
  const totalKaryawan = 1452;

  // DATA REKAPAN 10 DIVISI UNTUK EXCEL MASTER
  const baseDataDivisi = {
    'Human Capital': { karyawan: 45, responden: 42, overall: 4.52 },
    'Finance & Accounting': { karyawan: 55, responden: 50, overall: 4.15 },
    'Information Technology': { karyawan: 120, responden: 105, overall: 2.75 },
    'Marketing & Sales': { karyawan: 200, responden: 170, overall: 3.65 },
    'Operations': { karyawan: 150, responden: 123, overall: 3.25 },
    'Customer Service': { karyawan: 96, responden: 83, overall: 3.42 },
    'Product Development': { karyawan: 80, responden: 72, overall: 3.95 },
    'Production': { karyawan: 400, responden: 312, overall: 2.85 },
    'Logistics': { karyawan: 180, responden: 135, overall: 3.45 },
    'General Affairs': { karyawan: 70, responden: 49, overall: 4.30 }
  };

  useEffect(() => {
    const savedScore = localStorage.getItem('real_lmx_score');
    if (savedScore) setOverallScore(parseFloat(savedScore));
    
    const savedCount = localStorage.getItem('survey_count');
    if (savedCount) setResponden(parseInt(savedCount));
  }, []);

  const rate = Math.round((responden / totalKaryawan) * 100);

  let kategoriText = "Sehat (Healthy)";
  let kategoriColor = "text-green-600";
  if (overallScore < 3.0) {
    kategoriText = "Bermasalah (At Risk)"; kategoriColor = "text-red-500";
  } else if (overallScore < 4.0) {
    kategoriText = "Perlu Perhatian (Moderate)"; kategoriColor = "text-orange-500";
  }

  // ========================================================
  // FUNGSI MASTER GENERATE EXCEL MULTI-SHEET UNTUK SEMUA DIVISI
  // ========================================================
  const unduhMasterExcelSemuaDivisi = () => {
    const savedRaw = localStorage.getItem('lmx_divisi_data');
    const parsedData = savedRaw ? JSON.parse(savedRaw) : {};

    // --- SHEET 1: RINGKASAN REKAPAN UTAMA ---
    const rowsRingkasan = [];
    
    // --- SHEET 2: DETAIL METRIK DIMENSI ---
    const rowsDetailDimensi = [];

    // Looping gabungin data dummy + data live dari local storage untuk 10 divisi
    Object.keys(baseDataDivisi).forEach((namaDiv) => {
      const base = baseDataDivisi[namaDiv];
      let finalOverall = base.overall;
      let finalResponden = base.responden;

      if (parsedData[namaDiv] && parsedData[namaDiv].length > 0) {
        const scores = parsedData[namaDiv];
        finalOverall = parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2));
        finalResponden = base.responden + scores.length;
      }

      const finalRate = Math.round((finalResponden / base.karyawan) * 100) + '%';
      let kat = finalOverall >= 4.0 ? 'Healthy' : finalOverall >= 3.0 ? 'Moderate' : 'At Risk';

      // Hitung sub-dimensi otomatis
      const aff = Math.min(5, (finalOverall + 0.12)).toFixed(2);
      const loy = Math.max(1, (finalOverall - 0.15)).toFixed(2);
      const con = Math.min(5, (finalOverall + 0.05)).toFixed(2);
      const res = Math.max(1, (finalOverall - 0.08)).toFixed(2);

      // Masukkan ke Sheet 1
      rowsRingkasan.push({
        "Nama Departemen / Divisi": namaDiv,
        "Total Karyawan": base.karyawan,
        "Jumlah Responden": finalResponden,
        "Response Rate": finalRate,
        "Skor LMX Akhir": finalOverall,
        "Status Klasifikasi": kat
      });

      // Masukkan ke Sheet 2
      rowsDetailDimensi.push({
        "Nama Departemen / Divisi": namaDiv,
        "Skor Akhir": finalOverall,
        "Dimensi Affect": aff,
        "Dimensi Loyalty": loy,
        "Dimensi Contribution": con,
        "Dimensi Prof. Respect": res
      });
    });

    // Bikin Workbook Baru
    const workbook = XLSX.utils.book_new();

    // Buat Sheet 1 & Atur Lebar Kolom
    const ws1 = XLSX.utils.json_to_sheet(rowsRingkasan);
    ws1['!cols'] = [{wch: 25}, {wch: 15}, {wch: 18}, {wch: 15}, {wch: 15}, {wch: 18}];
    XLSX.utils.book_append_sheet(workbook, ws1, "Ringkasan Semua Divisi");

    // Buat Sheet 2 & Atur Lebar Kolom
    const ws2 = XLSX.utils.json_to_sheet(rowsDetailDimensi);
    ws2['!cols'] = [{wch: 25}, {wch: 12}, {wch: 15}, {wch: 15}, {wch: 18}, {wch: 18}];
    XLSX.utils.book_append_sheet(workbook, ws2, "Detail Analisis Dimensi");

    // Unduh File Excel Raksasa Kantor
    XLSX.writeFile(workbook, `MASTER_LAPORAN_LMX_ALL_DIVISI.xlsx`);
  };

  return (
    <div className="space-y-6">
      
      {/* JUDUL DASHBOARD UTAMA & TOMBOL DOWNLOAD MASTER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ringkasan Eksekutif</h1>
          <p className="text-sm text-gray-500 mt-1">Metrik agregat tingkat tinggi hubungan atasan-bawahan perusahaan.</p>
        </div>
        <button
          onClick={unduhMasterExcelSemuaDivisi}
          className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          📊 Unduh Rekap Semua Divisi (Excel)
        </button>
      </div>

      {/* 5 CARDS UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Card 1: Overall LMX Score */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase">Overall LMX Score</h3>
            <p className="text-[10px] text-gray-400 mb-2">(Seluruh Organisasi)</p>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold text-gray-900">{overallScore.toFixed(2)}</span>
              <span className="text-sm text-gray-500 mb-1">/5</span>
            </div>
            <p className={`text-[11px] font-bold mt-2 ${kategoriColor}`}>Kategori: {kategoriText}</p>
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500 border-t pt-2">
            <span>Periode lalu: 3.71</span>
            <span className={overallScore >= 3.71 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
              {overallScore >= 3.71 ? '↑' : '↓'} {Math.abs(overallScore - 3.71).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Card 2: Respon Rate */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Respon Rate</h3>
            <div className="text-2xl font-bold text-gray-800">{rate}%</div>
            <p className="text-xs text-gray-500 mt-1">{responden.toLocaleString('id-ID')} / {totalKaryawan.toLocaleString('id-ID')} karyawan</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
              <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${rate}%` }}></div>
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
        </div>

        {/* Card 5: Responden */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Responden</h3>
            <div className="text-2xl font-bold text-gray-800">{responden.toLocaleString('id-ID')}</div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-[10px] text-gray-500">Tingkat Respons</p>
                <p className="text-lg font-bold text-gray-800">{rate}%</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                👥
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}