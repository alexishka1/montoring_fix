// src/components/Header.jsx
export default function Header() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 shrink-0">
      <h1 className="text-xl font-semibold text-gray-800">Ringkasan Eksekutif</h1>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 font-medium">Periode Aktif: Mei 2027</span>
        {/* Avatar Placeholder */}
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div> 
      </div>
    </header>
  );
}