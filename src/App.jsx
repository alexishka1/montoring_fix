// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- KOMPONEN LAYOUT ---
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import DashboardCharts from './components/DashboardCharts.jsx';
import BottomInsights from './components/BottomInsights.jsx';

// --- HALAMAN (PAGES) ---
import LoginPage from './pages/LoginPage.jsx'; // <--- GATE UTAMA BARU KITA BG!
import SurveyPage from './pages/SurveyPage.jsx';
import DivisiPage from './pages/DivisiPage.jsx';
import PerAtasanPage from './pages/PerAtasanPage.jsx';
import PartisipasiPage from './pages/PartisipasiPage.jsx';
import InsightsPage from './pages/InsightsPage.jsx';
import LaporanPage from './pages/LaporanPage.jsx';
import RekomendasiPage from './pages/RekomendasiPage.jsx';
import StrukturPage from './pages/StrukturPage.jsx';
import DaftarPertanyaan from './pages/DaftarPertanyaan.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// Komponen bungkus khusus Admin Portal
function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ==========================================
            GERBANG UTAMA: HALAMAN LOGIN
            ========================================== */}
        <Route path="/login" element={<LoginPage />} />

        {/* ==========================================
            PINTU KARYAWAN: PENGISIAN SURVEI LMX
            ========================================== */}
        <Route path="/survei" element={<SurveyPage />} />

        {/* ==========================================
            PINTU BACKOFFICE: UTK HRD & DIREKSI (ADMIN)
            ========================================== */}
        
        {/* Ringkasan Eksekutif (Dashboard Utama) */}
        <Route path="/admin" element={
          <AdminLayout>
            <SummaryCards />
            <DashboardCharts />
            <BottomInsights />
          </AdminLayout>
        } />

        {/* Analisis Per Divisi */}
        <Route path="/admin/divisi" element={
          <AdminLayout>
            <DivisiPage />
          </AdminLayout>
        } />

        {/* Analisis Per Atasan */}
        <Route path="/admin/atasan" element={
          <AdminLayout>
            <PerAtasanPage />
          </AdminLayout>
        } />

        {/* Periode & Survey (Partisipasi) */}
        <Route path="/admin/partisipasi" element={
          <AdminLayout>
            <PartisipasiPage />
          </AdminLayout>
        } />

        {/* Insights & Analisis */}
        <Route path="/admin/insights" element={
          <AdminLayout>
            <InsightsPage />
          </AdminLayout>
        } />

        {/* Pusat Laporan (PDF / Excel Asli) */}
        <Route path="/admin/laporan" element={
          <AdminLayout>
            <LaporanPage />
          </AdminLayout>
        } />

        {/* Rencana Tindakan / Rekomendasi */}
        <Route path="/admin/rekomendasi" element={
          <AdminLayout>
            <RekomendasiPage />
          </AdminLayout>
        } />

        {/* Struktur & Roster Organisasi */}
        <Route path="/admin/struktur" element={
          <AdminLayout>
            <StrukturPage />
          </AdminLayout>
        } />

        {/* Pengaturan Survey (Daftar Pertanyaan) */}
        <Route path="/admin/pertanyaan" element={
          <AdminLayout>
            <DaftarPertanyaan />
          </AdminLayout>
        } />

        <Route path="/admin/profil" element={
  <AdminLayout>
    <ProfilePage />
  </AdminLayout>
} />

        {/* ==========================================
            AUTOMATIC REDIRECT STRATEGY
            ========================================== */}
        {/* Jika user mengakses localhost/ atau route gaib, lempar ke login */}
        <Route path="*" element={<Navigate to="/login" />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;