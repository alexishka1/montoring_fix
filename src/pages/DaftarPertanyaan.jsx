// src/pages/DaftarPertanyaan.jsx
import { useState, useEffect } from 'react';
import { getMasterPertanyaan, saveMasterPertanyaan } from '../lib/firestore';

// DATA DEFAULT (Dipakai kalau database masih kosong)
const defaultKategori = [
  {
    id: 'c1', title: 'Affect (Kedekatan)', isOpen: true,
    questions: [
      { id: 'q1', text: 'Saya merasa nyaman berbicara dengan atasan saya tentang masalah pekerjaan.', status: true, required: true, type: 'Skala Likert', scale: '1 - 5' },
      { id: 'q2', text: 'Atasan saya memahami kebutuhan dan masalah saya.', status: true, required: true, type: 'Skala Likert', scale: '1 - 5' },
      { id: 'q3', text: 'Saya menikmati bekerja dengan atasan saya.', status: true, required: true, type: 'Skala Likert', scale: '1 - 5' },
    ]
  },
  {
    id: 'c2', title: 'Loyalty (Kesetiaan)', isOpen: true,
    questions: [
      { id: 'q4', text: 'Atasan saya dalam membela saya jika ada yang menuduh saya melakukan kesalahan.', status: true, required: true, type: 'Skala Likert', scale: '1 - 5' },
      { id: 'q5', text: 'Atasan saya akan melindungi reputasi saya di organisasi.', status: true, required: true, type: 'Skala Likert', scale: '1 - 5' },
    ]
  },
  { id: 'c3', title: 'Contribution (Kontribusi)', isOpen: false, questions: [] },
  { id: 'c4', title: 'Professional Respect (Penghargaan Profesional)', isOpen: false, questions: [] },
];

export default function DaftarPertanyaan() {
  const [kategoriData, setKategoriData] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. PAS HALAMAN DIBUKA: Tarik data dari Firestore
  useEffect(() => {
    async function loadData() {
      try {
        const saved = await getMasterPertanyaan();
        if (saved) {
          setKategoriData(saved);
        } else {
          setKategoriData(defaultKategori);
          await saveMasterPertanyaan(defaultKategori);
        }
      } catch (err) {
        console.error("Gagal memuat pertanyaan:", err);
        setKategoriData(defaultKategori);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // 2. AUTO-SAVE: Tiap kali kategoriData berubah, langsung save ke Firestore!
  useEffect(() => {
    if (kategoriData.length > 0 && !isLoading) {
      setIsSaving(true);
      saveMasterPertanyaan(kategoriData)
        .then(() => setIsSaving(false))
        .catch((err) => {
          console.error("Gagal menyimpan:", err);
          setIsSaving(false);
        });
    }
  }, [kategoriData, isLoading]);

  // ==========================================
  // FUNGSI CRUD SAMA SEPERTI SEBELUMNYA
  // ==========================================
  const toggleCategory = (id) => {
    setKategoriData(kategoriData.map(cat => cat.id === id ? { ...cat, isOpen: !cat.isOpen } : cat));
  };

  const handleTambahPertanyaan = (categoryId, e) => {
    e.stopPropagation(); 
    const teksBaru = window.prompt("Masukkan teks pertanyaan baru:");
    if (!teksBaru) return; 

    const newQuestion = {
      id: 'q' + Date.now(), 
      text: teksBaru,
      status: true,
      required: true,
      type: 'Skala Likert',
      scale: '1 - 5'
    };

    setKategoriData(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, questions: [...cat.questions, newQuestion], isOpen: true };
      }
      return cat;
    }));
  };

  const handleEditPertanyaan = (qId, categoryId, currentText, e) => {
    e.stopPropagation();
    const teksUpdate = window.prompt("Edit pertanyaan:", currentText);
    if (!teksUpdate) return;

    setKategoriData(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          questions: cat.questions.map(q => q.id === qId ? { ...q, text: teksUpdate } : q)
        };
      }
      return cat;
    }));

    if (activeQuestion?.id === qId) {
      setActiveQuestion(prev => ({ ...prev, text: teksUpdate }));
    }
  };

  const handleHapus = () => {
    if (!activeQuestion) return;
    const isConfirm = window.confirm("Yakin ingin menghapus pertanyaan ini?");
    if (!isConfirm) return;

    setKategoriData(prev => prev.map(cat => ({
      ...cat,
      questions: cat.questions.filter(q => q.id !== activeQuestion.id)
    })));
    setActiveQuestion(null);
  };

  const handleToggleOption = (field) => {
    if (!activeQuestion) return;
    const newValue = !activeQuestion[field];

    setActiveQuestion(prev => ({ ...prev, [field]: newValue }));
    setKategoriData(prev => prev.map(cat => ({
      ...cat,
      questions: cat.questions.map(q => q.id === activeQuestion.id ? { ...q, [field]: newValue } : q)
    })));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-400">Memuat pertanyaan...</p>
        </div>
      </div>
    );
  }

  // Render UI
  return (
    <div className="font-sans text-gray-800 pb-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Pertanyaan</h1>
        {isSaving && (
          <span className="text-xs text-blue-500 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Menyimpan ke cloud...
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-2/3 space-y-4">
          {kategoriData.map((kategori) => (
            <div key={kategori.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div onClick={() => toggleCategory(kategori.id)} className="bg-blue-50/50 p-4 flex justify-between items-center cursor-pointer hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-3 font-bold text-gray-800">
                  <span className={`transform transition-transform ${kategori.isOpen ? 'rotate-180' : ''}`}>▼</span>
                  {kategori.title}
                </div>
                <button onClick={(e) => handleTambahPertanyaan(kategori.id, e)} className="text-blue-600 text-sm font-semibold hover:text-blue-800 flex items-center gap-1">
                  <span className="text-lg leading-none">+</span> Tambah Pertanyaan
                </button>
              </div>

              {kategori.isOpen && (
                <div className="divide-y divide-gray-50 p-2">
                  {kategori.questions.length > 0 ? (
                    kategori.questions.map((q, index) => (
                      <div key={q.id} onClick={() => setActiveQuestion(q)} className={`flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-colors ${activeQuestion?.id === q.id ? 'bg-blue-50/40 ring-1 ring-blue-100' : 'hover:bg-gray-50'}`}>
                        <div className="mt-1 text-gray-300 font-bold tracking-widest text-xs">⋮⋮</div>
                        <div className="w-6 h-6 shrink-0 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{index + 1}</div>
                        <p className={`flex-1 text-sm leading-relaxed pr-4 ${q.status ? 'text-gray-700' : 'text-gray-400 line-through'}`}>{q.text}</p>
                        <div className="flex items-center gap-3 shrink-0">
                          {q.status && <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-md uppercase tracking-wider">Aktif</span>}
                          <button onClick={(e) => handleEditPertanyaan(q.id, kategori.id, q.text, e)} className="text-blue-600 hover:text-blue-800 text-lg">✎</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-sm text-gray-400 font-medium">Belum ada pertanyaan di kategori ini.</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 shrink-0 sticky top-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6">Opsi Pertanyaan</h3>
            {activeQuestion ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Tipe:</span><span className="font-semibold text-gray-800">{activeQuestion.type}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1">Skala:</span>
                  <div className="flex items-center gap-2"><span className="font-semibold text-gray-800">{activeQuestion.scale}</span><span className="text-blue-600 cursor-pointer bg-blue-50 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">i</span></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Wajib Diisi:</span>
                  <div onClick={() => handleToggleOption('required')} className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${activeQuestion.required ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${activeQuestion.required ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Status:</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${activeQuestion.status ? 'text-green-600' : 'text-gray-400'}`}>{activeQuestion.status ? 'Aktif' : 'Nonaktif'}</span>
                    <div onClick={() => handleToggleOption('status')} className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${activeQuestion.status ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${activeQuestion.status ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-100" />
                <button onClick={handleHapus} className="w-full py-2.5 border border-red-200 text-red-500 font-bold text-sm rounded-xl hover:bg-red-50 hover:border-red-300 transition-all flex justify-center items-center gap-2">
                  <span className="text-lg">🗑️</span> Hapus Pertanyaan
                </button>
              </div>
            ) : (
              <div className="py-10 text-center"><span className="text-4xl">📄</span><p className="text-sm text-gray-400 mt-4">Pilih salah satu pertanyaan di sebelah kiri.</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}