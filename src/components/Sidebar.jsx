// src/components/Sidebar.jsx
export default function Sidebar({ halamanAktif, setHalamanAktif }) {
  return (
    <aside className="w-64 bg-[#0a192f] text-white flex flex-col h-full shrink-0">
      {/* Logo / Judul Web */}
      <div className="h-16 flex items-center px-6 font-bold text-xl border-b border-gray-700">
        LMX HR Platform
      </div>
      
      {/* Menu Navigasi */}
      <nav className="flex-1 p-4 space-y-2">
        <button 
          onClick={() => setHalamanAktif('ringkasan')}
          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${halamanAktif === 'ringkasan' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
        >
          Ringkasan Eksekutif
        </button>
        <button 
          onClick={() => setHalamanAktif('divisi')}
          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${halamanAktif === 'divisi' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
        >
          Per Divisi
        </button>
      </nav>
    </aside>
  );
}