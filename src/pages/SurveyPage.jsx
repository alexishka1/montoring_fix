// src/pages/SurveyPage.jsx
import { useState, useEffect } from 'react';
import {
  getMasterPertanyaan,
  incrementSurveyCount,
  addSurveyResult,
  updateLmxScore
} from '../lib/firestore';

export default function SurveyPage() {
  const [fase, setFase] = useState('LOADING'); // Mulai dari loading dulu
  const [skorAkhir, setSkorAkhir] = useState(0);
  const [kategori, setKategori] = useState('');
  const [mdmStep, setMdmStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daftarDivisi = [
    'Human Capital', 'Finance & Accounting', 'Information Technology',
    'Marketing & Sales', 'Operations', 'Customer Service',
    'Product Development', 'Production', 'Logistics', 'General Affairs'
  ];
  const [pilihanDivisi, setPilihanDivisi] = useState('');

  // ==========================================
  // 1. DATA PERTANYAAN LMX-7 (PULSE SURVEY)
  // ==========================================
  const questionsLMX7 = [
    "Saya memiliki hubungan kerja yang baik dengan atasan saya.",
    "Saya percaya kepada atasan saya.",
    "Atasan saya memahami kebutuhan dan tantangan pekerjaan saya.",
    "Saya puas dengan hubungan profesional saya dengan atasan.",
    "Atasan saya mendukung saya ketika menghadapi kesulitan kerja.",
    "Atasan saya menghargai kontribusi yang saya berikan.",
    "Saya merasa atasan saya memperlakukan saya dengan adil."
  ];

  // ==========================================
  // 2. AMBIL DATA LMX-MDM DARI FIRESTORE
  // ==========================================
  const [mdmSections, setMdmSections] = useState([]);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const savedCategories = await getMasterPertanyaan();
        if (savedCategories) {
          const sections = savedCategories.map(cat => ({
            title: cat.title,
            description: `Bagian ini mengevaluasi dimensi ${cat.title}.`,
            questions: cat.questions.filter(q => q.status === true).map(q => q.text)
          }));
          setMdmSections(sections);
        } else {
          // Data cadangan kalau Admin belum nyetting apa-apa
          setMdmSections([
            { title: "Bagian 1: Affect", description: "Evaluasi kedekatan.", questions: ["Saya merasa nyaman berinteraksi dengan atasan."] },
            { title: "Bagian 2: Loyalty", description: "Evaluasi kesetiaan.", questions: ["Atasan saya akan membela saya."] },
            { title: "Bagian 3: Contribution", description: "Evaluasi kontribusi.", questions: ["Saya bersedia bekerja ekstra."] },
            { title: "Bagian 4: Professional Respect", description: "Evaluasi rasa hormat.", questions: ["Saya kagum dengan kompetensi atasan."] }
          ]);
        }
      } catch (err) {
        console.error("Gagal memuat pertanyaan:", err);
        setMdmSections([
          { title: "Bagian 1: Affect", description: "Evaluasi kedekatan.", questions: ["Saya merasa nyaman berinteraksi dengan atasan."] },
          { title: "Bagian 2: Loyalty", description: "Evaluasi kesetiaan.", questions: ["Atasan saya akan membela saya."] },
          { title: "Bagian 3: Contribution", description: "Evaluasi kontribusi.", questions: ["Saya bersedia bekerja ekstra."] },
          { title: "Bagian 4: Professional Respect", description: "Evaluasi rasa hormat.", questions: ["Saya kagum dengan kompetensi atasan."] }
        ]);
      }
      setFase('LMX-7'); // Selesai loading, tampilkan survei
    }
    loadQuestions();
  }, []);

  const [answersLMX7, setAnswersLMX7] = useState({});
  const [answersMDM, setAnswersMDM] = useState({}); 

  // ==========================================
  // LOGIKA KLIK & SUBMIT
  // ==========================================
  const handleSelectLMX7 = (index, score) => setAnswersLMX7({ ...answersLMX7, [index]: score });
  const handleSelectMDM = (qIndex, score) => setAnswersMDM({ ...answersMDM, [`${mdmStep}-${qIndex}`]: score });

  const selesaikanSurvey = async (skor) => {
    setIsSubmitting(true);
    try {
      // Simpan ke Firestore: increment counter + tambah data divisi
      await incrementSurveyCount();
      await addSurveyResult(pilihanDivisi, skor);
      setFase('SUCCESS'); 
    } catch (err) {
      console.error("Gagal menyimpan survei:", err);
      alert("Terjadi kesalahan saat menyimpan. Silakan coba lagi.");
    }
    setIsSubmitting(false);
  };

  const handleSubmitLMX7 = async () => {
    if (!pilihanDivisi) {
      alert("Tolong pilih divisi Anda terlebih dahulu di bagian atas!");
      return;
    }

    if (Object.keys(answersLMX7).length < 7) {
      alert("Tolong selesaikan semua pertanyaan terlebih dahulu.");
      return;
    }
    
    let total = 0;
    for (let key in answersLMX7) total += answersLMX7[key];
    const rataRata = (total / 7).toFixed(2);
    setSkorAkhir(rataRata);
    
    // Simpan skor ke Firestore
    try {
      await updateLmxScore(rataRata);
    } catch (err) {
      console.error("Gagal update skor:", err);
    }

    let kat = "";
    if (rataRata >= 4.0) kat = "Healthy";
    else if (rataRata >= 3.0) kat = "Moderate";
    else kat = "At Risk";
    setKategori(kat);

    // LOGIKA PDF KLIEN: Skor di bawah 4.0 WAJIB masuk LMX-MDM
    if (rataRata < 4.0) {
      setFase('LMX-MDM'); 
      setMdmStep(0); 
    } else {
      selesaikanSurvey(rataRata); 
    }
  };

  const handleNextMDM = () => {
    const currentQCount = mdmSections[mdmStep].questions.length;
    
    // Kalau di kategori ini admin gak masukin pertanyaan satupun (kosong), skip aja!
    if (currentQCount === 0) {
      if (mdmStep < 3) setMdmStep(mdmStep + 1);
      else selesaikanSurvey(skorAkhir);
      return;
    }

    const answeredCount = Object.keys(answersMDM).filter(k => k.startsWith(`${mdmStep}-`)).length;
    if (answeredCount < currentQCount) {
      alert("Tolong isi semua pertanyaan di halaman ini sebelum lanjut.");
      return;
    }
    
    if (mdmStep < 3) {
      setMdmStep(mdmStep + 1); 
    } else {
      selesaikanSurvey(skorAkhir); 
    }
  };
  const handlePrevMDM = () => { if (mdmStep > 0) setMdmStep(mdmStep - 1); };

  const RatingScale = ({ currentAnswer, onSelect }) => {
    return (
      <div className="flex justify-between items-center w-full max-w-sm mt-3 md:mt-0 gap-2">
        {[1, 2, 3, 4, 5].map((num) => {
          const isSelected = currentAnswer === num;
          let activeClass = isSelected 
            ? (num <= 2 ? "bg-red-500 border-red-500 text-white shadow-md scale-110" : num === 3 ? "bg-amber-500 border-amber-500 text-white shadow-md scale-110" : "bg-emerald-500 border-emerald-500 text-white shadow-md scale-110")
            : "bg-white border-gray-200 text-gray-400 hover:border-gray-400 hover:bg-gray-50";
          return (
            <button key={num} type="button" onClick={() => onSelect(num)} className={`w-10 h-10 md:w-12 md:h-12 rounded-xl text-sm font-bold transition-all duration-200 border-2 flex items-center justify-center ${activeClass}`}>{num}</button>
          );
        })}
      </div>
    );
  };

  // ==========================================
  // TAMPILAN 0: LOADING
  // ==========================================
  if (fase === 'LOADING') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 font-medium">Memuat pertanyaan survei...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN 1: FASE LMX-7
  // ==========================================
  if (fase === 'LMX-7') {
    const progress = Math.round((Object.keys(answersLMX7).length / 7) * 100);

    return (
      <div className="min-h-screen bg-[#f8fafc] py-8 px-4 font-sans text-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">🔒</div>
              <h3 className="font-bold text-gray-800 mb-2">Kerahasiaan Terjamin</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Jawaban Anda bersifat rahasia dan hanya digunakan untuk pengembangan hubungan kerja.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-200 bg-blue-50/30">
              <h3 className="font-bold text-gray-800 mb-3">Identitas Departemen</h3>
              <p className="text-xs text-gray-500 mb-4">Silakan pilih divisi Anda saat ini.</p>
              <select 
                value={pilihanDivisi} 
                onChange={(e) => setPilihanDivisi(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>-- Pilih Divisi --</option>
                {daftarDivisi.map(div => (
                  <option key={div} value={div}>{div}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 sticky top-4 z-10">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Bagian Awal: Pulse Survey</h1>
                  <p className="text-xs text-gray-500 mt-1">Berikan penilaian Anda terhadap atasan langsung Anda.</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {questionsLMX7.map((q, index) => (
                <div key={index} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                  <div className="md:w-3/5"><p className="text-sm font-medium text-gray-700 leading-relaxed">{q}</p></div>
                  <div className="md:w-2/5 flex justify-end">
                    <RatingScale currentAnswer={answersLMX7[index]} onSelect={(val) => handleSelectLMX7(index, val)} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleSubmitLMX7} 
                disabled={isSubmitting}
                className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${progress === 100 && pilihanDivisi ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN 2: FASE LMX-MDM (HALAMAN PER HALAMAN)
  // ==========================================
  if (fase === 'LMX-MDM') {
    const currentSection = mdmSections[mdmStep];
    const totalSteps = mdmSections.length;
    const progress = Math.round(((mdmStep) / totalSteps) * 100);

    return (
      <div className="min-h-screen bg-red-50/30 py-8 px-4 font-sans text-gray-800 transition-colors duration-500">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-red-600 to-rose-700 p-8 rounded-3xl shadow-lg text-white mb-6 relative overflow-hidden">
             <div className="relative z-10">
               <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm border border-white/30">
                 Skor LMX: {skorAkhir} ({kategori}) | Divisi: {pilihanDivisi}
               </span>
               <h1 className="text-2xl font-bold mb-2">Survei Diagnostik Mendalam</h1>
               <p className="text-white/90 text-sm max-w-xl">Skor Anda di bawah 4.0, mohon selesaikan beberapa pertanyaan tambahan berikut untuk diagnosis lebih lanjut.</p>
             </div>
          </div>

          <div className="bg-white p-6 rounded-t-2xl shadow-sm border-b-4 border-red-500 mb-4">
             <div className="flex justify-between items-center mb-3">
               <span className="text-xs font-bold text-gray-500 tracking-wider">HALAMAN {mdmStep + 1} DARI {totalSteps}</span>
               <span className="text-xs font-bold text-red-500">{progress}% Selesai</span>
             </div>
             <h2 className="text-2xl font-bold text-gray-800">{currentSection?.title || "Kategori"}</h2>
             <p className="text-sm text-gray-500 mt-1">{currentSection?.description}</p>
          </div>

          <div className="space-y-4 mb-8">
            {currentSection?.questions?.length > 0 ? (
              currentSection.questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-white p-6 rounded-2xl shadow-sm border border-red-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="md:w-3/5"><p className="text-sm font-medium text-gray-700 leading-relaxed">{q}</p></div>
                  <div className="md:w-2/5 flex justify-end">
                    <RatingScale currentAnswer={answersMDM[`${mdmStep}-${qIndex}`]} onSelect={(val) => handleSelectMDM(qIndex, val)} />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-2xl text-center text-gray-400">
                Tidak ada pertanyaan aktif di kategori ini. Silakan klik "Selanjutnya".
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            {mdmStep > 0 ? <button onClick={handlePrevMDM} className="px-6 py-3 rounded-xl font-bold text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all">Kembali</button> : <div></div>}
            <button 
              onClick={handleNextMDM} 
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {isSubmitting ? 'Mengirim...' : (mdmStep === totalSteps - 1 ? 'Kirim Final' : 'Selanjutnya')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN 3: SUCCESS (SELESAI)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-sans px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full relative overflow-hidden">
        <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-green-200">✓</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Tanggapan Tersimpan!</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Terima kasih. Hasil Anda dari divisi <strong>{pilihanDivisi}</strong> telah disimpan ke database. Skor: <strong className="text-gray-900 text-base">{skorAkhir} ({kategori})</strong>.
        </p>
        <button onClick={() => window.location.reload()} className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-md">
          Ulangi Survei (Mode Demo)
        </button>
      </div>
    </div>
  );
}