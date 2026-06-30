// src/App.jsx
import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import DashboardCharts from './components/DashboardCharts.jsx';
import BottomInsights from './components/BottomInsights.jsx';
import DivisiPage from './pages/DivisiPage.jsx';

function App() {
  // State ini yang nentuin halaman mana yang lagi aktif
  const [halamanAktif, setHalamanAktif] = useState('ringkasan');

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* Kirim state ke Sidebar biar tombolnya berfungsi */}
      <Sidebar halamanAktif={halamanAktif} setHalamanAktif={setHalamanAktif} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          
          {/* SAKLAR PENGGANTI KONTEN HALAMAN */}
          {halamanAktif === 'ringkasan' ? (
            <>
              <SummaryCards />
              <DashboardCharts />
              <BottomInsights />
            </>
          ) : (
            <DivisiPage />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;