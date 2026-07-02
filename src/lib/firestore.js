// src/lib/firestore.js
// Helper Functions untuk semua operasi Firestore
// Sentralisasi biar komponen tinggal import & panggil aja

import { db } from '../firebase';
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc,
  collection, getDocs, addDoc,
  increment, serverTimestamp
} from 'firebase/firestore';

// ================================================
// 1. GLOBAL CONFIG (survey_count, real_lmx_score)
// ================================================

// Baca konfigurasi global (counter, skor)
export async function getGlobalConfig() {
  const docRef = doc(db, 'config', 'global');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  // Default awal kalau belum ada dokumennya
  const defaultConfig = { survey_count: 1246, real_lmx_score: 3.91 };
  await setDoc(docRef, defaultConfig);
  return defaultConfig;
}

// Tambah counter survei +1
export async function incrementSurveyCount() {
  const docRef = doc(db, 'config', 'global');
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, { survey_count: 1247, real_lmx_score: 3.91 });
    return 1247;
  }
  await updateDoc(docRef, { survey_count: increment(1) });
  const updated = await getDoc(docRef);
  return updated.data().survey_count;
}

// Update skor LMX keseluruhan
export async function updateLmxScore(score) {
  const docRef = doc(db, 'config', 'global');
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, { survey_count: 1246, real_lmx_score: parseFloat(score) });
  } else {
    await updateDoc(docRef, { real_lmx_score: parseFloat(score) });
  }
}

// ================================================
// 2. SURVEY RESULTS (data per-divisi)
// ================================================

// Simpan hasil survei baru (per karyawan)
export async function addSurveyResult(divisi, skor, answersLMX7 = {}, answersMDM = {}) {
  await addDoc(collection(db, 'survey_results'), {
    divisi,
    skor: parseFloat(skor),
    answersLMX7,
    answersMDM,
    timestamp: serverTimestamp()
  });
}

// Ambil semua data survei, dikelompokkan per divisi
// Output format: { "Human Capital": [3.5, 4.2], "Finance": [3.1] }
export async function getDivisiData() {
  const querySnapshot = await getDocs(collection(db, 'survey_results'));
  const divisiData = {};
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (!divisiData[data.divisi]) divisiData[data.divisi] = [];
    divisiData[data.divisi].push(data.skor);
  });
  return divisiData;
}

// ================================================
// 3. MASTER PERTANYAAN (Daftar Pertanyaan Survei)
// ================================================

// Baca daftar pertanyaan dari Firestore
export async function getMasterPertanyaan() {
  const docRef = doc(db, 'config', 'master_pertanyaan');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().categories;
  }
  return null; // Belum ada, komponen akan pakai default
}

// Simpan/update daftar pertanyaan
export async function saveMasterPertanyaan(categories) {
  const docRef = doc(db, 'config', 'master_pertanyaan');
  await setDoc(docRef, { categories, updatedAt: serverTimestamp() });
}

// ================================================
// 4. CUSTOM REPORTS (Daftar Laporan PDF)
// ================================================

export async function getCustomReports() {
  const docRef = doc(db, 'config', 'custom_reports');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().reports;
  }
  return null;
}

export async function saveCustomReports(reports) {
  const docRef = doc(db, 'config', 'custom_reports');
  await setDoc(docRef, { reports, updatedAt: serverTimestamp() });
}

// ================================================
// 5. ACTION PLANS (Rekomendasi / Rencana Tindakan)
// ================================================

export async function getActionPlans() {
  const docRef = doc(db, 'config', 'action_plans');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().plans;
  }
  return null;
}

export async function saveActionPlans(plans) {
  const docRef = doc(db, 'config', 'action_plans');
  await setDoc(docRef, { plans, updatedAt: serverTimestamp() });
}

// ================================================
// 6. STRUKTUR ORGANISASI (Divisi + Roster Karyawan)
// ================================================

export async function getStruktur() {
  const docRef = doc(db, 'config', 'struktur');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().divisions;
  }
  return null;
}

export async function saveStruktur(divisions) {
  const docRef = doc(db, 'config', 'struktur');
  await setDoc(docRef, { divisions, updatedAt: serverTimestamp() });
}
