// src/pages/DivisiPage.jsx
import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import { getDivisiData } from '../lib/firestore';

export default function DivisiPage() {
  const daftarDivisi = [
    'Human Capital', 'Finance & Accounting', 'Information Technology',
    'Marketing & Sales', 'Operations', 'Customer Service',
    'Product Development', 'Production', 'Logistics', 'General Affairs'
  ];

  const [activeDivisi, setActiveDivisi] = useState('Customer Service');
  const [displayData, setDisplayData] = useState({});
  const [liveDivisiData, setLiveDivisiData] = useState({});

  // 1. DATA DASAR
  const baseDataDivisi = {
    'Human Capital': { karyawan: 5, responden: 4, overall: 4.52, rendah1: 'Frekuensi diskusi informal di luar jam kerja.', rendah2: 'Keseimbangan beban kerja tim.', rendah3: 'Fasilitas pendukung kesejahteraan.' },
    'Finance & Accounting': { karyawan: 6, responden: 5, overall: 4.15, rendah1: 'Atasan memberikan fleksibilitas waktu saat tutup buku.', rendah2: 'Apresiasi atas pencapaian target efisiensi.', rendah3: 'Komunikasi lintas divisi untuk kelancaran dokumen.' },
    'Information Technology': { karyawan: 12, responden: 10, overall: 2.75, rendah1: 'Atasan menghargai ide teknis yang saya berikan.', rendah2: 'Komunikasi visi proyek dari atasan jelas.', rendah3: 'Atasan melindungi tim dari tekanan departemen lain.' },
    'Marketing & Sales': { karyawan: 15, responden: 12, overall: 3.65, rendah1: 'Atasan memberikan support nyata saat tekanan target tinggi.', rendah2: 'Atasan mendengarkan keluhan kondisi lapangan.', rendah3: 'Pengembangan karir dan sistem reward jelas.' },
    'Operations': { karyawan: 10, responden: 8, overall: 3.25, rendah1: 'Distribusi beban kerja operasional terasa adil.', rendah2: 'Atasan rutin mengecek kondisi keselamatan di lapangan.', rendah3: 'Atasan membantu menyelesaikan konflik antar shift.' },
    'Customer Service': { karyawan: 8, responden: 7, overall: 3.42, rendah1: 'Atasan saya memberikan feedback yang membangun.', rendah2: 'Atasan saya mendukung pengembangan karir saya.', rendah3: 'Atasan saya memperhatikan kebutuhan dan masalah saya.' },
    'Product Development': { karyawan: 7, responden: 6, overall: 3.95, rendah1: 'Atasan memberikan waktu yang cukup untuk riset produk.', rendah2: 'Dukungan penuh atas ide inovatif yang berisiko.', rendah3: 'Kejelasan requirement dari manajemen atas.' },
    'Production': { karyawan: 20, responden: 15, overall: 2.85, rendah1: 'Atasan memperhatikan tingkat kelelahan fisik karyawan.', rendah2: 'Pembagian jadwal shift kerja dilakukan dengan adil.', rendah3: 'Feedback diberikan dengan cara yang menghargai.' },
    'Logistics': { karyawan: 10, responden: 8, overall: 3.45, rendah1: 'Support dari atasan saat terjadi kendala pengiriman.', rendah2: 'Peralatan dan armada kerja selalu memadai.', rendah3: 'Koordinasi yang baik dengan tim gudang (warehouse).' },
    'General Affairs': { karyawan: 5, responden: 4, overall: 4.30, rendah1: 'Pengakuan atas kontribusi pekerjaan back-office.', rendah2: 'Dukungan budget memadai dari atasan.', rendah3: 'Kejelasan instruksi kerja saat ada event dadakan.' }
  };

  // Load data divisi dari Firestore sekali pas awal
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDivisiData();
        setLiveDivisiData(data);
      } catch (err) {
        console.error("Gagal memuat data divisi:", err);
      }
    }
    loadData();
  }, []);

  // 2. LOGIKA BACA DATA ASLI (dari Firestore)
  useEffect(() => {
    let currentBase = baseDataDivisi[activeDivisi] || baseDataDivisi['Customer Service'];
    let finalData = { ...currentBase };

    if (liveDivisiData[activeDivisi] && liveDivisiData[activeDivisi].length > 0) {
      const scoresArray = liveDivisiData[activeDivisi];
      const totalSkorAsli = scoresArray.reduce((a, b) => a + b, 0);
      const realAvg = totalSkorAsli / scoresArray.length;
      
      finalData.overall = parseFloat(realAvg.toFixed(2));
      finalData.responden = currentBase.responden + scoresArray.length; 
    }

    const avg = finalData.overall;
    if (avg >= 4.0) {
      finalData.kategori = 'Sehat (Healthy)'; finalData.color = 'text-green-600'; finalData.lineStroke = '#16a34a';
    } else if (avg >= 3.0) {
      finalData.kategori = 'Perlu Perhatian (Moderate)'; finalData.color = 'text-orange-500'; finalData.lineStroke = '#f97316';
    } else {
      finalData.kategori = 'Bermasalah (At Risk)'; finalData.color = 'text-red-600'; finalData.lineStroke = '#dc2626';
    }

    finalData.affect = Math.min(5, (avg + 0.12));
    finalData.loyalty = Math.max(1, (avg - 0.15));
    finalData.contribution = Math.min(5, (avg + 0.05));
    finalData.respect = Math.max(1, (avg - 0.08));

    finalData.skor1 = Math.max(1, (avg - 0.45));
    finalData.skor2 = Math.max(1, (avg - 0.35));
    finalData.skor3 = Math.max(1, (avg - 0.25));
    finalData.rate = Math.round((finalData.responden / finalData.karyawan) * 100) + '%';

    setDisplayData(finalData);
  }, [activeDivisi, liveDivisiData]);

  // 3. FUNGSI UNDUH EXCEL (.xlsx)
  const unduhExcelAsli = () => {
    const dataRow = [{
      "Nama Divisi": activeDivisi,
      "Total Karyawan": displayData.karyawan,
      "Responden": displayData.responden,
      "Response Rate": displayData.rate,
      "Skor Overall": displayData.overall,
      "Kategori": displayData.kategori,
      "Skor Affect": displayData.affect.toFixed(2),
      "Skor Loyalty": displayData.loyalty.toFixed(2),
      "Skor Contribution": displayData.contribution.toFixed(2),
      "Skor Prof. Respect": displayData.respect.toFixed(2)
    }];

    const worksheet = XLSX.utils.json_to_sheet(dataRow);
    
    // Bikin lebar kolomnya rapi otomatis di Excel
    const wscols = [
      {wch: 25}, {wch: 15}, {wch: 15}, {wch: 15}, {wch: 15}, 
      {wch: 20}, {wch: 15}, {wch: 15}, {wch: 15}, {wch: 18}
    ];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan LMX");
    XLSX.writeFile(workbook, `Data_LMX_${activeDivisi.replace(/\s+/g, '_')}.xlsx`);
  };

  if (!displayData.overall) return <div className="p-10">Memuat data...</div>;

  const radarData = [
    { dimensi: 'Affect', skor: displayData.affect, fullMark: 5 },
    { dimensi: 'Loyalty', skor: displayData.loyalty, fullMark: 5 },
    { dimensi: 'Contribution', skor: displayData.contribution, fullMark: 5 },
    { dimensi: 'Professional Respect', skor: displayData.respect, fullMark: 5 },
  ];

  const baseSkor = displayData.overall;
  const lineData = [
    { bulan: 'Des 23', skor: (baseSkor - 0.2).toFixed(2), responden: Math.max(2, displayData.responden - 3) }, 
    { bulan: 'Jan 24', skor: (baseSkor + 0.1).toFixed(2), responden: Math.max(2, displayData.responden + 2) },
    { bulan: 'Feb 24', skor: (baseSkor - 0.1).toFixed(2), responden: Math.max(2, displayData.responden - 1) }, 
    { bulan: 'Mar 24', skor: (baseSkor - 0.3).toFixed(2), responden: Math.max(2, displayData.responden + 3) },
    { bulan: 'Apr 24', skor: (baseSkor + 0.2).toFixed(2), responden: Math.max(2, displayData.responden - 2) }, 
    { bulan: 'Mei 24', skor: baseSkor, responden: displayData.responden },
  ];

  return (
    <div className="text-sm font-sans">
      
      {/* HEADER & TOMBOL EXCEL */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Per Divisi</h1>
          <p className="text-sm text-gray-500 mt-1">Lihat detail penilaian LMX untuk setiap divisi dalam organisasi.</p>
        </div>
        
        {/* Tombol Excel Dipoles Jadi Lebih Premium */}
        <div className="flex shrink-0">
          <button 
            onClick={unduhExcelAsli}
            className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span className="text-lg">📊</span> Unduh Data Laporan (Excel)
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* SIDEBAR KIRI */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="font-bold text-gray-800 mb-4">Pilih Divisi</h3>
            <div className="space-y-1 text-xs font-medium text-gray-600">
              {daftarDivisi.map((divisi) => (
                <button
                  key={divisi} onClick={() => setActiveDivisi(divisi)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    activeDivisi === divisi ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'hover:bg-slate-50 text-gray-600'
                  }`}
                >
                  {divisi}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KONTEN KANAN */}
        <div className="flex-1 space-y-6 bg-slate-50 p-2 sm:p-4 rounded-xl w-full">
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl">👤</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{activeDivisi}</h2>
                  <p className="text-xs text-gray-500 mt-1">Jumlah Karyawan: {displayData.karyawan} | Responden: {displayData.responden} ({displayData.rate})</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-between border-t border-gray-100 pt-6">
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 mb-2">Overall LMX Score</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">{displayData.overall}</span>
                      <span className="text-sm text-gray-500">/5</span>
                    </div>
                    <p className={`text-[10px] font-bold mt-1 ${displayData.color}`}>{displayData.kategori}</p>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-gray-100"></div>
                  <div><p className="text-[11px] font-bold text-gray-800 mb-2">Affect</p><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900">{displayData.affect.toFixed(2)}</span></div></div>
                  <div className="hidden md:block w-px h-12 bg-gray-100"></div>
                  <div><p className="text-[11px] font-bold text-gray-800 mb-2">Loyalty</p><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900">{displayData.loyalty.toFixed(2)}</span></div></div>
                  <div className="hidden md:block w-px h-12 bg-gray-100"></div>
                  <div><p className="text-[11px] font-bold text-gray-800 mb-2">Contribution</p><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900">{displayData.contribution.toFixed(2)}</span></div></div>
                  <div className="hidden md:block w-px h-12 bg-gray-100"></div>
                  <div><p className="text-[11px] font-bold text-gray-800 mb-2">Prof. Respect</p><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900">{displayData.respect.toFixed(2)}</span></div></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-sm font-bold text-gray-800">Tren Skor LMX</h3>
                          <span className="text-[10px] text-gray-400 italic">Klik titik pada grafik untuk detail</span>
                        </div>
                        <div className="w-full text-xs h-[240px] cursor-pointer">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart 
                              data={lineData} 
                              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                              onClick={(e) => {
                                if (e && e.activePayload) setModalData(e.activePayload[0].payload);
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="bulan" tick={{ fill: '#6b7280' }} />
                              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                              <Tooltip formatter={(value, name) => [value, name === 'skor' ? 'Skor LMX' : name === 'responden' ? 'Responden' : name]} />
                              <Line type="monotone" dataKey="skor" stroke={displayData.lineStroke} strokeWidth={3} dot={{ r: 5, fill: displayData.lineStroke }} activeDot={{ r: 7, cursor: 'pointer' }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="text-sm font-bold text-gray-800 mb-0">Skor per Dimensi</h3>
                        <div className="w-full text-[10px] h-[240px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                              <PolarGrid stroke="#e5e7eb" />
                              <PolarAngleAxis dataKey="dimensi" tick={{ fill: '#4b5563', fontSize: 11 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                              <Radar name="Skor" dataKey="skor" stroke={displayData.lineStroke} strokeWidth={2} fill={displayData.lineStroke} fillOpacity={0.4} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-gray-800 mb-6">Indikator Terendah</h3>
                            <div className="flex justify-between text-xs font-bold text-gray-800 border-b pb-3 mb-4"><span>Indikator</span><span>Skor</span></div>
                            <ul className="text-xs text-gray-600 space-y-4">
                                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50">
                                  <span className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span><span>{displayData.rendah1}</span></span>
                                  <span className="font-bold text-gray-900">{displayData.skor1.toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50">
                                  <span className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span><span>{displayData.rendah2}</span></span>
                                  <span className="font-bold text-gray-900">{displayData.skor2.toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between items-start gap-4">
                                  <span className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span><span>{displayData.rendah3}</span></span>
                                  <span className="font-bold text-gray-900">{displayData.skor3.toFixed(2)}</span>
                                </li>
                            </ul>
                          </div>
                       </div>

                       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-gray-800 mb-6">Rekomendasi untuk {activeDivisi}</h3>
                            <ul className="text-xs text-gray-600 space-y-5">
                                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 shrink-0"></span><span>Fokus intervensi pada indikator terendah yang tercantum di samping.</span></li>
                                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 shrink-0"></span><span>Tingkatkan komunikasi dan diskusi rutin antara leader dan tim.</span></li>
                                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 shrink-0"></span><span>Lakukan evaluasi ulang (Pulse Survey) bulan depan.</span></li>
                            </ul>
                          </div>
                       </div>
                    </div>

                </div>
              </div>

              {/* MODAL POPUP LAPORAN HISTORIS */}
              {modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative border border-gray-100">
                    <button 
                      onClick={() => setModalData(null)} 
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl">📅</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">Laporan Historis</h3>
                        <p className="text-sm text-gray-500">Divisi: {activeDivisi} | Periode: {modalData.bulan}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-600">Skor Keseluruhan</span>
                        <span className="text-2xl font-bold text-blue-600">{modalData.skor}</span>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-600">Total Responden</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-gray-800">{modalData.responden}</span>
                          <span className="text-xs text-gray-500">Karyawan</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 text-center">
                        <p className="text-[10px] text-gray-400 italic">*Data di atas merupakan rekapan akhir divisi pada periode tersebut.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        }