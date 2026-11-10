/**
 * FoodSupply – Sistem Distribusi Pangan Cerdas
 * Refactored & QA Audited Frontend Script
 * 
 * Pengembang: Yolanda Anderi
 * Dosen Pembimbing: Dr. Erliyan Redy Susanto, M.Kom
 * Institusi: Universitas Teknokrat Indonesia & Pemda (2026)
 * Backend Target: Rust (Axum, Tokio, SQLx) + PostgreSQL (PostGIS)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ================= STATE MANAGEMENT =================
  const AppState = {
    currentRole: 'admin',
    currentUser: {
      name: 'Yolanda Anderi',
      role: 'admin',
      roleLabel: 'Super Admin',
      avatar: 'YA'
    },
    
    // Data Pengguna (Users PostgreSQL Table)
    users: [
      { id: 1, name: 'Yolanda Anderi', email: 'yolanda@foodsupply.go.id', role: 'admin', region: 'Kantor Pusat Pemda', status: 'Aktif', createdAt: '2026-01-10' },
      { id: 2, name: 'Dr. Erliyan Redy Susanto, M.Kom', email: 'erliyan@teknokrat.ac.id', role: 'pemda', region: 'Dinas Pangan Provinsi', status: 'Aktif', createdAt: '2026-01-15' },
      { id: 3, name: 'Budi Santoso (PT Pangan Sejahtera)', email: 'distribusi@pangansejahtera.co.id', role: 'distributor', region: 'Gudang Logistik Panjang', status: 'Aktif', createdAt: '2026-02-01' },
      { id: 4, name: 'Hj. Siti Rohmah', email: 'kios.siti@pasirgintung.id', role: 'pedagang', region: 'Pasar Pasir Gintung (Blok B-12)', status: 'Aktif', createdAt: '2026-02-10' },
      { id: 5, name: 'Pak Wayan Sudarma', email: 'poktan.sejahtera@tanggamus.id', role: 'petani', region: 'Sentra Hortikultura Tanggamus', status: 'Aktif', createdAt: '2026-02-12' },
      { id: 6, name: 'Ahmad Faisal', email: 'afaisal26@gmail.com', role: 'masyarakat', region: 'Kec. Way Halim', status: 'Aktif', createdAt: '2026-03-01' }
    ],

    // Data Komoditas Pokok (Commodities Table)
    commodities: [
      { id: 1, code: 'KMD-001', name: 'Beras Premium', category: 'Biji-bijian & Karbohidrat', unit: 'Kg', hap: 14900, minStock: 60, updatedAt: '10 Nov 2026 08:30' },
      { id: 2, code: 'KMD-002', name: 'Beras Medium', category: 'Biji-bijian & Karbohidrat', unit: 'Kg', hap: 13100, minStock: 75, updatedAt: '10 Nov 2026 08:30' },
      { id: 3, code: 'KMD-003', name: 'Cabai Rawit Merah', category: 'Bumbu & Hortikultura', unit: 'Kg', hap: 42000, minStock: 20, updatedAt: '10 Nov 2026 09:15' },
      { id: 4, code: 'KMD-004', name: 'Bawang Merah Brebes', category: 'Bumbu & Hortikultura', unit: 'Kg', hap: 36000, minStock: 25, updatedAt: '10 Nov 2026 09:15' },
      { id: 5, code: 'KMD-005', name: 'Bawang Putih Honan', category: 'Bumbu & Hortikultura', unit: 'Kg', hap: 38000, minStock: 20, updatedAt: '10 Nov 2026 09:00' },
      { id: 6, code: 'KMD-006', name: 'Minyak Goreng Kemasan', category: 'Minyak & Gula', unit: 'Liter', hap: 17500, minStock: 45, updatedAt: '10 Nov 2026 10:00' },
      { id: 7, code: 'KMD-007', name: 'Gula Pasir Konsumsi', category: 'Minyak & Gula', unit: 'Kg', hap: 17500, minStock: 35, updatedAt: '10 Nov 2026 08:45' },
      { id: 8, code: 'KMD-008', name: 'Telur Ayam Ras', category: 'Protein Hewani', unit: 'Kg', hap: 29000, minStock: 30, updatedAt: '10 Nov 2026 10:20' },
      { id: 9, code: 'KMD-009', name: 'Daging Sapi Segar', category: 'Protein Hewani', unit: 'Kg', hap: 135000, minStock: 12, updatedAt: '10 Nov 2026 07:45' },
      { id: 10, code: 'KMD-010', name: 'Daging Ayam Broiler', category: 'Protein Hewani', unit: 'Kg', hap: 37000, minStock: 22, updatedAt: '10 Nov 2026 07:50' }
    ],

    // Data Lokasi Pasar & Fasilitas (Markets Table + PostGIS coordinates)
    markets: [
      { id: 1, name: 'Pasar Pasir Gintung', type: 'market', address: 'Jl. Imam Bonjol, Tj. Karang Pusat', lat: -5.4052, lng: 105.2571, phone: '0721-254120' },
      { id: 2, name: 'Pasar Kangkung', type: 'market', address: 'Jl. Hasanuddin, Teluk Betung Selatan', lat: -5.4411, lng: 105.2635, phone: '0721-482110' },
      { id: 3, name: 'Pasar Tamin', type: 'market', address: 'Jl. Raden Intan, Tanjung Karang Barat', lat: -5.4120, lng: 105.2480, phone: '0721-263445' },
      { id: 4, name: 'Pasar Way Halim', type: 'market', address: 'Jl. Kimaja, Way Halim', lat: -5.3905, lng: 105.2750, phone: '0721-705882' },
      { id: 5, name: 'Gudang Bulog Divre Lampung', type: 'distributor', address: 'Jl. Soekarno-Hatta By Pass', lat: -5.4320, lng: 105.2950, phone: '0721-315600' },
      { id: 6, name: 'PT Pangan Sejahtera Logistik', type: 'distributor', address: 'Kawasan Pergudangan Panjang', lat: -5.4210, lng: 105.3120, phone: '0721-329881' },
      { id: 7, name: 'Sentra Hortikultura Tanggamus (Petani)', type: 'farmer', address: 'Kec. Gisting, Tanggamus', lat: -5.4500, lng: 105.2200, phone: '0812-7729-1102' },
      { id: 8, name: 'Lumbung Padi Metro (Poktan)', type: 'farmer', address: 'Metro Kibang, Lampung', lat: -5.3700, lng: 105.3100, phone: '0813-8821-4560' }
    ],

    // Data Stok Komoditas (Stocks Table)
    stocks: [
      { id: 1, commName: 'Beras Premium', location: 'Pasar Pasir Gintung', category: 'Pasar Rakyat', quantity: 74.2, unit: 'Ton', status: 'Aman', endurance: 18, updatedAt: '10 Nov 2026 08:30' },
      { id: 2, commName: 'Beras Medium', location: 'Gudang Bulog Divre Lampung', category: 'Gudang Logistik', quantity: 450.0, unit: 'Ton', status: 'Aman', endurance: 45, updatedAt: '10 Nov 2026 09:00' },
      { id: 3, commName: 'Cabai Rawit Merah', location: 'Pasar Pasir Gintung', category: 'Pasar Rakyat', quantity: 4.8, unit: 'Ton', status: 'Menipis', endurance: 3, updatedAt: '10 Nov 2026 10:15' },
      { id: 4, commName: 'Cabai Rawit Merah', location: 'Pasar Kangkung', category: 'Pasar Rakyat', quantity: 2.1, unit: 'Ton', status: 'Kritis', endurance: 1.5, updatedAt: '10 Nov 2026 10:10' },
      { id: 5, commName: 'Bawang Merah Brebes', location: 'Pasar Tamin', category: 'Pasar Rakyat', quantity: 8.5, unit: 'Ton', status: 'Menipis', endurance: 4, updatedAt: '10 Nov 2026 09:40' },
      { id: 6, commName: 'Minyak Goreng Kemasan', location: 'PT Pangan Sejahtera Logistik', category: 'Distributor', quantity: 88.0, unit: 'Ton', status: 'Aman', endurance: 24, updatedAt: '10 Nov 2026 08:00' },
      { id: 7, commName: 'Gula Pasir Konsumsi', location: 'Pasar Way Halim', category: 'Pasar Rakyat', quantity: 18.4, unit: 'Ton', status: 'Aman', endurance: 12, updatedAt: '10 Nov 2026 09:20' },
      { id: 8, commName: 'Telur Ayam Ras', location: 'Pasar Kangkung', category: 'Pasar Rakyat', quantity: 6.2, unit: 'Ton', status: 'Menipis', endurance: 3, updatedAt: '10 Nov 2026 10:00' },
      { id: 9, commName: 'Daging Sapi Segar', location: 'Pasar Pasir Gintung', category: 'Pasar Rakyat', quantity: 9.8, unit: 'Ton', status: 'Aman', endurance: 7, updatedAt: '10 Nov 2026 07:30' }
    ],

    // Data Harga Komoditas & Komparasi Antar Pasar (Prices Table)
    prices: [
      { id: 1, name: 'Beras Premium', pg: 15200, pk: 15000, pt: 15100, pw: 15300, avg: 15150, change: '+1.2%', trend: 'up' },
      { id: 2, name: 'Beras Medium', pg: 13300, pk: 13200, pt: 13400, pw: 13200, avg: 13275, change: '0.0%', trend: 'neutral' },
      { id: 3, name: 'Cabai Rawit Merah', pg: 52000, pk: 54000, pt: 53000, pw: 55000, avg: 53500, change: '+8.4%', trend: 'up' },
      { id: 4, name: 'Bawang Merah Brebes', pg: 38000, pk: 39000, pt: 38500, pw: 38000, avg: 38375, change: '+2.1%', trend: 'up' },
      { id: 5, name: 'Bawang Putih Honan', pg: 39000, pk: 39500, pt: 39000, pw: 40000, avg: 39375, change: '-0.8%', trend: 'down' },
      { id: 6, name: 'Minyak Goreng Kemasan', pg: 18000, pk: 18000, pt: 18000, pw: 18500, avg: 18125, change: '0.0%', trend: 'neutral' },
      { id: 7, name: 'Gula Pasir', pg: 18000, pk: 17800, pt: 18000, pw: 18000, avg: 17950, change: '+0.5%', trend: 'neutral' },
      { id: 8, name: 'Telur Ayam Ras', pg: 29500, pk: 30000, pt: 29000, pw: 30000, avg: 29625, change: '+3.5%', trend: 'up' },
      { id: 9, name: 'Daging Sapi Segar', pg: 135000, pk: 138000, pt: 135000, pw: 137000, avg: 136250, change: '0.0%', trend: 'neutral' },
      { id: 10, name: 'Daging Ayam Broiler', pg: 38000, pk: 38500, pt: 37500, pw: 39000, avg: 38250, change: '-1.5%', trend: 'down' }
    ],

    // Data Surat Jalan & Logistik (Distributions Table)
    distributions: [
      { id: 1, doNumber: 'DO-2026-1101', distributor: 'PT Pangan Sejahtera', commodity: 'Cabai Rawit Merah', volume: '3.5 Ton', origin: 'Sentra Gisting', destination: 'Pasar Pasir Gintung', vehicle: 'Colt Diesel BE-8921-YN', status: 'Dalam Perjalanan', eta: '10 Nov 14:00' },
      { id: 2, doNumber: 'DO-2026-1102', distributor: 'Bulog Divre Lampung', commodity: 'Beras Premium', volume: '15.0 Ton', origin: 'Gudang Bulog By Pass', destination: 'Pasar Kangkung', vehicle: 'Fuso BE-9012-AU', status: 'Tiba di Lokasi', eta: '10 Nov 11:30' },
      { id: 3, doNumber: 'DO-2026-1103', distributor: 'PT Pangan Sejahtera', commodity: 'Minyak Goreng', volume: '8.0 Ton', origin: 'Kawasan Panjang', destination: 'Pasar Way Halim', vehicle: 'Engkel BE-7612-DB', status: 'Selesai / Diterima', eta: '10 Nov 09:15' },
      { id: 4, doNumber: 'DO-2026-1104', distributor: 'CV Berkah Pangan', commodity: 'Bawang Merah', volume: '4.2 Ton', origin: 'Lumbung Metro', destination: 'Pasar Tamin', vehicle: 'Colt Diesel BE-8134-CG', status: 'Menunggu Pengiriman', eta: '11 Nov 08:00' }
    ],

    // Data Panen Petani (Petani View)
    farmerHarvests: [
      { id: 'BATCH-TK-01', commodity: 'Cabai Rawit Merah', farmer: 'Kelompok Tani Harapan Jaya (Tanggamus)', volume: '5.2 Ton', date: '09 Nov 2026', price: 'Rp 40.000 / Kg', status: 'Diserap Distributor' },
      { id: 'BATCH-TK-02', commodity: 'Beras Ramos Organik', farmer: 'Gapoktan Padi Makmur (Metro Kibang)', volume: '24.0 Ton', date: '08 Nov 2026', price: 'Rp 11.800 / Kg', status: 'Siap Angkut' },
      { id: 'BATCH-TK-03', commodity: 'Bawang Merah Varietas Bima', farmer: 'Kelompok Tani Subur (Pringsewu)', volume: '7.5 Ton', date: '10 Nov 2026', price: 'Rp 32.000 / Kg', status: 'Tersedia' }
    ],

    // Data Notifikasi Sistem
    notifications: [
      { id: 1, title: 'Stok Kritis: Cabai Rawit Merah', message: 'Pasokan Cabai Rawit di Pasar Kangkung tersisa 2.1 Ton (Ketahanan < 2 hari). Segera lakukan intervensi distribusi.', type: 'danger', time: '15 menit lalu', read: false },
      { id: 2, title: 'Lonjakan Harga: Cabai Rawit (+8.4%)', message: 'Harga eceran menyentuh Rp 53.500/Kg, melampaui batas toleransi fluktuasi HAP.', type: 'warning', time: '1 jam lalu', read: false },
      { id: 3, title: 'Pemberitahuan Distribusi Berjalan', message: 'Pengiriman DO-2026-1101 (Beras 15 Ton) telah tiba di Pasar Kangkung.', type: 'info', time: '2 jam lalu', read: false },
      { id: 4, title: 'Sinkronisasi Backend Rust', message: 'PostgreSQL PostGIS spatial indexing berhasil mengupdate 8 koordinat titik komoditas.', type: 'success', time: '4 jam lalu', read: true }
    ],

    // Data Analisis AI Risiko Ketahanan Pangan
    aiRisks: [
      { commodity: 'Cabai Rawit Merah', risk: 'Tinggi (Defisit Pasokan)', riskClass: 'badge-danger', demand: '8.4 Ton/Hari (Naik 18%)', intervention: 'Operasi Pasar & Percepatan Angkut Tanggamus' },
      { commodity: 'Bawang Merah', risk: 'Sedang (Waspada)', riskClass: 'badge-warning', demand: '6.2 Ton/Hari (Stabil)', intervention: 'Pemantauan Stok Gudang Distribusi' },
      { commodity: 'Beras Premium', risk: 'Rendah (Aman)', riskClass: 'badge-success', demand: '42.0 Ton/Hari (Normal)', intervention: 'Pasokan Terjaga via Gudang Bulog' },
      { commodity: 'Minyak Goreng', risk: 'Rendah (Aman)', riskClass: 'badge-success', demand: '14.5 Ton/Hari (Normal)', intervention: 'Cadangan Distribusi Memadai 24 Hari' },
      { commodity: 'Telur Ayam Ras', risk: 'Sedang (Fluktuasi Pakan)', riskClass: 'badge-warning', demand: '9.8 Ton/Hari (Naik 4%)', intervention: 'Koordinasi Asosiasi Peternak Layer' }
    ]
  };

  // References to Chart and Map instances
  let priceChartInstance = null;
  let stockDoughnutChartInstance = null;
  let predictionChartInstance = null;
  let leafletMapInstance = null;
  let mapMarkersLayer = null;

  // ================= 1. SPA ROUTING & NAVIGATION =================
  // Aliases map for robust tab switching
  const TabAliases = {
    'dashboard': 'dashboard',
    'monitoring-stok': 'pemantauan-stok',
    'pemantauan-stok': 'pemantauan-stok',
    'stok': 'pemantauan-stok',
    'informasi-harga': 'informasi-harga',
    'harga': 'informasi-harga',
    'peta-gis': 'peta-gis',
    'peta': 'peta-gis',
    'prediksi-ai': 'prediksi-pangan',
    'prediksi-pangan': 'prediksi-pangan',
    'tracking-distribusi': 'tracking-distribusi',
    'tracking': 'tracking-distribusi',
    'distribusi': 'tracking-distribusi',
    'laporan': 'laporan-pangan',
    'laporan-pangan': 'laporan-pangan',
    'manajemen-pengguna': 'manajemen-pengguna',
    'pengguna': 'manajemen-pengguna',
    'data-komoditas': 'data-komoditas',
    'komoditas': 'data-komoditas',
    'produksi-petani': 'produksi-petani',
    'petani': 'produksi-petani',
    'notifikasi': 'notifikasi',
    'landing': 'landing'
  };

  /**
   * Universal Tab Switcher: Supports switchTab and switchView
   * Ensures seamless zero-reload rendering of UI containers.
   */
  window.switchTab = function(rawTabId) {
    if (!rawTabId) return;
    const cleanId = rawTabId.replace(/^#/, '').toLowerCase().trim();
    const targetId = TabAliases[cleanId] || cleanId;

    const targetSection = document.getElementById(targetId);
    if (!targetSection) {
      console.warn(`[SPA Router] Section #${targetId} not found. Falling back to #dashboard`);
      window.switchTab('dashboard');
      return;
    }

    // Toggle Section Active State
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    targetSection.classList.add('active');

    // Update Desktop Sidebar Active Link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeSidebarLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if (activeSidebarLink) {
      activeSidebarLink.classList.add('active');
    }

    // Update Mobile Bottom Nav Active Button
    document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
    const activeBottomNav = document.querySelector(`.bottom-nav-item[data-tab="${targetId}"]`);
    if (activeBottomNav) {
      activeBottomNav.classList.add('active');
    }

    // Sync History State without page reload
    if (window.location.hash !== `#${targetId}`) {
      window.history.replaceState(null, null, `#${targetId}`);
    }

    // Specific Container Visual Handlers
    if (targetId === 'peta-gis') {
      triggerGisMapRefresh();
    } else if (targetId === 'dashboard') {
      triggerDashboardChartsResize();
    } else if (targetId === 'prediksi-pangan') {
      setTimeout(initPredictionChart, 100);
    }

    // Auto-close mobile sidebar if open
    const sidebar = document.getElementById('appSidebar');
    if (sidebar) sidebar.classList.remove('show-mobile');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Provide switchView as an alias for backwards compatibility
  window.switchView = window.switchTab;

  // Bind all sidebar nav links
  document.querySelectorAll('.nav-link[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      window.switchTab(target);
    });
  });

  // Bind trigger links (.nav-link-trigger)
  document.querySelectorAll('.nav-link-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-target');
      window.switchTab(target);
    });
  });

  // Bind Mobile Bottom Navigation items
  document.querySelectorAll('.bottom-nav-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      window.switchTab(tab);
    });
  });

  // Mobile Bottom Drawer Toggle Button
  document.getElementById('mobileMenuDrawerBtn')?.addEventListener('click', () => {
    const sidebar = document.getElementById('appSidebar');
    if (sidebar) sidebar.classList.toggle('show-mobile');
  });

  // Listen to Browser Back / Forward URL hash changes
  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      window.switchTab(window.location.hash);
    }
  });

  // ================= 2. DYNAMIC ROLE SWITCHER (6 PERAN) =================
  const RoleMetadata = {
    admin: {
      label: 'Administrator',
      badge: 'Super Admin',
      avatar: 'YA',
      name: 'Yolanda Anderi',
      allowedTabs: ['dashboard', 'landing', 'manajemen-pengguna', 'data-komoditas', 'pemantauan-stok', 'informasi-harga', 'peta-gis', 'prediksi-pangan', 'tracking-distribusi', 'notifikasi', 'laporan-pangan'],
      context: 'Akses Administrator Penuh: Kelola akun pengguna, master data komoditas pangan, dan audit log logistik secara terpusat.',
      greeting: 'Dashboard Administrator Sistem',
      subtitle: 'Manajemen menyeluruh akun pengguna, data komoditas, infrastruktur pasar, dan arsitektur data.'
    },
    pemda: {
      label: 'Pemerintah Daerah (Pemda)',
      badge: 'Pemda / Analis',
      avatar: 'ER',
      name: 'Dr. Erliyan Redy Susanto, M.Kom',
      allowedTabs: ['dashboard', 'landing', 'data-komoditas', 'pemantauan-stok', 'informasi-harga', 'peta-gis', 'prediksi-pangan', 'tracking-distribusi', 'notifikasi', 'laporan-pangan'],
      context: 'Akses Pemerintah Daerah: Monitoring ketersediaan pangan makro, analisis pergerakan harga lintas pasar, dan proyeksi AI.',
      greeting: 'Dashboard Pengawasan Ketahanan Pangan (Pemda)',
      subtitle: 'Monitoring makro ketersediaan pangan, deteksi disparitas harga antar pasar, dan proyeksi AI.'
    },
    distributor: {
      label: 'Distributor Pangan',
      badge: 'Distributor Resmi',
      avatar: 'PS',
      name: 'PT Pangan Sejahtera Lampung',
      allowedTabs: ['dashboard', 'pemantauan-stok', 'peta-gis', 'tracking-distribusi', 'notifikasi'],
      context: 'Akses Distributor Logistik: Kelola stok gudang regional dan terbitkan Surat Jalan (DO) pengiriman ke pasar.',
      greeting: 'Dashboard Logistik & Distribusi Pangan',
      subtitle: 'Kelola inventaris gudang logistik, pembaruan armada pengiriman, dan pemenuhan DO pasar.'
    },
    pedagang: {
      label: 'Pedagang Pasar',
      badge: 'Pedagang Kios',
      avatar: 'SR',
      name: 'Hj. Siti Rohmah (Pasir Gintung)',
      allowedTabs: ['dashboard', 'pemantauan-stok', 'informasi-harga', 'peta-gis', 'notifikasi'],
      context: 'Akses Pedagang Pasar: Perbarui stok lapak kios dan catat harga jual eceran harian konsumen.',
      greeting: 'Dashboard Pedagang Pasar Rakyat',
      subtitle: 'Catat stok kios harian, update harga eceran komoditas, dan pantau pasokan dari distributor.'
    },
    petani: {
      label: 'Petani / Produsen',
      badge: 'Produsen Tani',
      avatar: 'PK',
      name: 'Poktan Harapan Jaya (Tanggamus)',
      allowedTabs: ['dashboard', 'peta-gis', 'tracking-distribusi', 'produksi-petani', 'notifikasi'],
      context: 'Akses Petani / Produsen: Catat tonase hasil panen baru dan tawarkan langsung ke distributor/Bulog.',
      greeting: 'Dashboard Sentra Panen Petani',
      subtitle: 'Catat estimasi tonase hasil panen, tawarkan komoditas ke distributor, dan pantau harga acuan.'
    },
    masyarakat: {
      label: 'Masyarakat (Publik)',
      badge: 'Warga / Konsumen',
      avatar: 'AF',
      name: 'Ahmad Faisal (Masyarakat)',
      allowedTabs: ['dashboard', 'landing', 'informasi-harga', 'peta-gis', 'notifikasi'],
      context: 'Akses Masyarakat / Konsumen: Pantau komparasi harga kebutuhan pokok termurah di pasar sekitar dan cek stok.',
      greeting: 'Pusat Informasi Pangan Konsumen (Publik)',
      subtitle: 'Cari harga kebutuhan pokok termurah, cek stok pasar terdekat, dan dapatkan kepastian belanja harian.'
    }
  };

  window.switchRole = function(newRole) {
    if (!RoleMetadata[newRole]) return;
    AppState.currentRole = newRole;
    document.body.setAttribute('data-role', newRole);

    const meta = RoleMetadata[newRole];
    AppState.currentUser.name = meta.name;
    AppState.currentUser.role = newRole;
    AppState.currentUser.roleLabel = meta.badge;
    AppState.currentUser.avatar = meta.avatar;

    // Synchronize Topbar Selectors & Labels
    const roleSelector = document.getElementById('userRoleSelector');
    if (roleSelector) roleSelector.value = newRole;

    const loginRoleSelect = document.getElementById('loginRoleSelect');
    if (loginRoleSelect) loginRoleSelect.value = newRole;

    const userNameLabel = document.getElementById('userNameLabel');
    if (userNameLabel) userNameLabel.textContent = meta.name;

    const userRoleBadge = document.getElementById('userRoleBadge');
    if (userRoleBadge) userRoleBadge.textContent = meta.badge;

    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) userAvatar.textContent = meta.avatar;

    // Synchronize Desktop Sidebar
    const sidebarUserName = document.getElementById('sidebarUserName');
    if (sidebarUserName) sidebarUserName.textContent = meta.name;

    const sidebarRoleTag = document.getElementById('sidebarRoleTag');
    if (sidebarRoleTag) sidebarRoleTag.textContent = meta.label;

    const sidebarAvatar = document.getElementById('sidebarAvatar');
    if (sidebarAvatar) sidebarAvatar.textContent = meta.avatar;

    // Filter Desktop Navigation according to Role Permissions
    document.querySelectorAll('.role-nav').forEach(item => {
      const allowedRoles = (item.getAttribute('data-allowed') || '').split(',').map(s => s.trim());
      if (allowedRoles.includes(newRole) || allowedRoles.includes('all')) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Update Dashboard Banner & Context Alerts
    const ctxMsg = document.getElementById('roleContextMessage');
    if (ctxMsg) ctxMsg.textContent = meta.context;

    const greeting = document.getElementById('dashboardGreeting');
    if (greeting) greeting.textContent = meta.greeting;

    const subtitle = document.getElementById('dashboardSubtitle');
    if (subtitle) subtitle.textContent = meta.subtitle;

    // Check if the current active tab is permitted for the newly chosen role
    const activeSection = document.querySelector('.view-section.active');
    const currentTabId = activeSection ? activeSection.id : 'dashboard';
    if (!meta.allowedTabs.includes(currentTabId)) {
      window.switchTab('dashboard');
    }

    renderKPICards();
    renderQuickTables();
    window.showToast(`Berhasil beralih ke peran: ${meta.label}`, 'info');
  };

  document.getElementById('userRoleSelector')?.addEventListener('change', (e) => {
    window.switchRole(e.target.value);
  });

  // ================= 3. LEAFLET.JS GIS MAP (FIX GRAY SCREEN) =================
  /**
   * Initializes or forces size recalculation on Leaflet Map
   * Prevents the classic "Gray Screen / Broken Tiles" issue when tab starts hidden.
   */
  function initLeafletMap() {
    const mapEl = document.getElementById('gisMap');
    if (!mapEl || typeof L === 'undefined') return;

    if (!leafletMapInstance) {
      // Initialize map centered at Bandar Lampung (-5.415, 105.265)
      leafletMapInstance = L.map('gisMap', {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView([-5.415, 105.265], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | FoodSupply PostGIS',
        maxZoom: 18
      }).addTo(leafletMapInstance);

      mapMarkersLayer = L.layerGroup().addTo(leafletMapInstance);
      renderMapMarkers('all');

      // Bind Map Filter Buttons
      document.getElementById('btnFilterMapMarket')?.addEventListener('click', () => renderMapMarkers('market'));
      document.getElementById('btnFilterMapDist')?.addEventListener('click', () => renderMapMarkers('distributor'));
      document.getElementById('btnFilterMapAll')?.addEventListener('click', () => renderMapMarkers('all'));

      // Attach ResizeObserver to automatically invalidate size if container geometry changes
      if (window.ResizeObserver) {
        const resizeObs = new ResizeObserver((entries) => {
          for (let entry of entries) {
            if (entry.contentRect.width > 0 && entry.contentRect.height > 0 && leafletMapInstance) {
              leafletMapInstance.invalidateSize(false);
            }
          }
        });
        resizeObs.observe(mapEl);
      }
    }

    triggerGisMapRefresh();
  }

  function triggerGisMapRefresh() {
    if (!leafletMapInstance) {
      setTimeout(initLeafletMap, 50);
      return;
    }

    // Call invalidateSize across rendering cycles to guarantee proper tile bounding calculation
    requestAnimationFrame(() => {
      if (leafletMapInstance) leafletMapInstance.invalidateSize(false);
    });

    setTimeout(() => {
      if (leafletMapInstance) {
        leafletMapInstance.invalidateSize(true);
        leafletMapInstance.setView([-5.415, 105.265], 12);
      }
    }, 150);

    setTimeout(() => {
      if (leafletMapInstance) leafletMapInstance.invalidateSize(true);
    }, 350);
  }

  function renderMapMarkers(filterType = 'all') {
    if (!mapMarkersLayer || !leafletMapInstance) return;
    mapMarkersLayer.clearLayers();

    const filtered = AppState.markets.filter(m => filterType === 'all' || m.type === filterType);

    filtered.forEach(m => {
      let iconColor = '#1e3a8a';
      let typeLabel = 'Pasar Rakyat';
      let iconClass = 'fa-shop';

      if (m.type === 'distributor') {
        iconColor = '#78350f';
        typeLabel = 'Gudang Distributor';
        iconClass = 'fa-warehouse';
      } else if (m.type === 'farmer') {
        iconColor = '#14532d';
        typeLabel = 'Sentra Tani / Lumbung';
        iconClass = 'fa-tractor';
      }

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background-color:${iconColor}; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; border:3px solid #fff; box-shadow:0 3px 8px rgba(0,0,0,0.3); font-size:14px;"><i class="fa-solid ${iconClass}"></i></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const popupContent = `
        <div style="font-family:'Plus Jakarta Sans',sans-serif; min-width:200px; padding:4px;">
          <h4 style="margin:0 0 4px 0; color:#004e34; font-size:14px; font-weight:800;">${m.name}</h4>
          <span style="font-size:11px; background:#e6f0ec; color:#004e34; font-weight:800; padding:2px 8px; border-radius:4px;">${typeLabel}</span>
          <p style="margin:8px 0 4px 0; font-size:12px; color:#334155;">${m.address}</p>
          <small style="color:#475569; font-size:11px; font-weight:600;"><i class="fa-solid fa-phone"></i> ${m.phone}</small>
          <div style="margin-top:10px;">
            <button onclick="showToast('Rute logistik ke ${m.name} berhasil dihitung via PostGIS!')" style="background:#004e34; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-size:11px; cursor:pointer; font-weight:800;">Hitung Rute Logistik</button>
          </div>
        </div>
      `;

      L.marker([m.lat, m.lng], { icon: customIcon })
        .bindPopup(popupContent)
        .addTo(mapMarkersLayer);
    });

    const infoEl = document.getElementById('mapEntityCountInfo');
    if (infoEl) infoEl.textContent = `Menampilkan ${filtered.length} titik simpul pangan terpantau`;
  }

  // ================= 4. CHART.JS RESPONSIVENESS & DOUGHNUT CHART =================
  function initDashboardCharts() {
    if (typeof Chart === 'undefined') return;

    // 1. Line Chart: Tren Rata-rata Harga Pangan
    const priceCtx = document.getElementById('priceTrendChart');
    if (priceCtx && !priceChartInstance) {
      priceChartInstance = new Chart(priceCtx, {
        type: 'line',
        data: {
          labels: ['04 Nov', '05 Nov', '06 Nov', '07 Nov', '08 Nov', '09 Nov', '10 Nov'],
          datasets: [
            {
              label: 'Beras Premium (Rp/Kg)',
              data: [14800, 14900, 15000, 15000, 15100, 15100, 15200],
              borderColor: '#004e34',
              backgroundColor: 'rgba(0, 78, 52, 0.08)',
              borderWidth: 2.5,
              tension: 0.35,
              fill: true
            },
            {
              label: 'Cabai Rawit Merah (Rp/Kg)',
              data: [42000, 44000, 46000, 48000, 50000, 51500, 53500],
              borderColor: '#b91c1c',
              backgroundColor: 'rgba(185, 28, 28, 0.08)',
              borderWidth: 2.5,
              tension: 0.35,
              fill: true
            },
            {
              label: 'Minyak Goreng (Rp/L)',
              data: [18000, 18000, 18000, 18000, 18100, 18100, 18125],
              borderColor: '#b45309',
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderDash: [5, 5],
              tension: 0.35
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                color: '#1e293b',
                font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: Rp ${context.parsed.y.toLocaleString('id-ID')}`;
                }
              }
            }
          },
          scales: {
            y: {
              grid: { color: '#e2e8f0' },
              ticks: {
                color: '#334155',
                callback: v => 'Rp ' + v.toLocaleString('id-ID')
              }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#334155', font: { weight: 600 } }
            }
          }
        }
      });
    }

    // 2. Doughnut Chart: Komposisi Stok Komoditas Pangan (As required by QA audit)
    const stockCtx = document.getElementById('stockLevelChart');
    if (stockCtx && !stockDoughnutChartInstance) {
      stockDoughnutChartInstance = new Chart(stockCtx, {
        type: 'doughnut',
        data: {
          labels: ['Beras (Gudang & Pasar)', 'Minyak Goreng', 'Gula Pasir', 'Bawang Merah', 'Daging Sapi', 'Cabai Rawit'],
          datasets: [{
            data: [524.2, 88.0, 18.4, 8.5, 9.8, 6.9],
            backgroundColor: [
              '#004e34', // Primary Green
              '#0f6848', // Secondary Green
              '#10b981', // Emerald
              '#f59e0b', // Amber
              '#3b82f6', // Blue
              '#ef4444'  // Red (Cabai)
            ],
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '62%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                color: '#1e293b',
                padding: 12,
                font: { family: 'Plus Jakarta Sans', size: 11, weight: 600 }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return ` ${context.label}: ${context.raw} Ton`;
                }
              }
            }
          }
        }
      });
    }

    // Chart Commodity Filter Dropdown Event
    document.getElementById('chartCommoditySelect')?.addEventListener('change', (e) => {
      const selected = e.target.value;
      if (!priceChartInstance) return;

      if (selected === 'all') {
        priceChartInstance.data.datasets.forEach(ds => ds.hidden = false);
      } else {
        priceChartInstance.data.datasets.forEach(ds => {
          ds.hidden = !ds.label.toLowerCase().includes(selected.toLowerCase());
        });
      }
      priceChartInstance.update();
    });
  }

  function initPredictionChart() {
    if (typeof Chart === 'undefined') return;
    const predCtx = document.getElementById('predictionChart');
    if (predCtx && !predictionChartInstance) {
      predictionChartInstance = new Chart(predCtx, {
        type: 'line',
        data: {
          labels: ['Hari 1-5', 'Hari 6-10', 'Hari 11-15', 'Hari 16-20', 'Hari 21-25', 'Hari 26-30'],
          datasets: [
            {
              label: 'Proyeksi Kebutuhan Konsumsi (Ton)',
              data: [180, 192, 210, 225, 240, 260],
              borderColor: '#1d4ed8',
              backgroundColor: 'rgba(29, 78, 216, 0.1)',
              fill: true,
              tension: 0.3
            },
            {
              label: 'Estimasi Pasokan Panen & DO (Ton)',
              data: [220, 215, 205, 195, 185, 190],
              borderColor: '#b91c1c',
              borderDash: [6, 4],
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { font: { family: 'Plus Jakarta Sans', size: 11, weight: 600 }, color: '#1e293b' }
            },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            y: {
              grid: { color: '#e2e8f0' },
              ticks: { color: '#334155', callback: v => v + ' Ton' }
            },
            x: {
              ticks: { color: '#334155', font: { weight: 600 } }
            }
          }
        }
      });
    } else if (predictionChartInstance) {
      predictionChartInstance.resize();
    }
  }

  function triggerDashboardChartsResize() {
    setTimeout(() => {
      if (priceChartInstance) priceChartInstance.resize();
      if (stockDoughnutChartInstance) stockDoughnutChartInstance.resize();
    }, 100);
  }

  window.addEventListener('resize', () => {
    triggerDashboardChartsResize();
    if (predictionChartInstance) predictionChartInstance.resize();
  });

  // ================= 5. CLOCK & TOAST =================
  function startLiveClock() {
    const clockEl = document.getElementById('liveClockBadge');
    if (!clockEl) return;
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleDateString('id-ID', options)} WIB`;
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';
    if (type === 'danger') icon = 'fa-circle-exclamation';
    if (type === 'info') icon = 'fa-circle-info';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // ================= 6. NOTIFICATIONS TOGGLE & SYSTEM =================
  const notifBtn = document.getElementById('notificationBtn');
  const notifPanel = document.getElementById('notifPanel');

  if (notifBtn && notifPanel) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = notifPanel.classList.toggle('show');
      notifBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!notifPanel.contains(e.target) && e.target !== notifBtn) {
        notifPanel.classList.remove('show');
        notifBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key (WCAG Accessibility)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        notifPanel.classList.remove('show');
        notifBtn.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
      }
    });
  }

  document.getElementById('markAllReadBtn')?.addEventListener('click', () => {
    AppState.notifications.forEach(n => n.read = true);
    renderNotifications();
    window.showToast('Semua notifikasi telah ditandai dibaca.');
  });

  document.getElementById('btnPageMarkAllRead')?.addEventListener('click', () => {
    AppState.notifications.forEach(n => n.read = true);
    renderNotifications();
    window.showToast('Semua notifikasi telah ditandai dibaca.');
  });

  function renderNotifications() {
    const unreadCount = AppState.notifications.filter(n => !n.read).length;
    
    const badgeTop = document.getElementById('notifBadgeCount');
    const badgeSide = document.getElementById('sidebarNotifCounter');
    if (badgeTop) badgeTop.textContent = unreadCount;
    if (badgeSide) badgeSide.textContent = unreadCount;

    const quickList = document.getElementById('quickNotifList');
    if (quickList) {
      quickList.innerHTML = AppState.notifications.slice(0, 4).map(n => `
        <li class="notif-item-small ${n.read ? '' : 'unread'}" onclick="markNotificationRead(${n.id})">
          <div class="notif-item-title">
            <span>${n.title}</span>
            <span class="notif-item-time">${n.time}</span>
          </div>
          <div class="notif-item-desc">${n.message.substring(0, 80)}...</div>
        </li>
      `).join('');
    }

    const fullContainer = document.getElementById('notifFullContainer');
    if (fullContainer) {
      fullContainer.innerHTML = AppState.notifications.map(n => `
        <div class="notif-full-card ${n.read ? '' : 'unread'}" onclick="markNotificationRead(${n.id})">
          <div class="notif-icon-circle ${n.type}">
            <i class="fa-solid ${n.type === 'danger' ? 'fa-triangle-exclamation' : (n.type === 'warning' ? 'fa-bell' : (n.type === 'info' ? 'fa-truck' : 'fa-circle-check'))}"></i>
          </div>
          <div class="notif-content-full">
            <div class="notif-meta-row">
              <h4>${n.title}</h4>
              <span class="time-stamp">${n.time}</span>
            </div>
            <p>${n.message}</p>
          </div>
        </div>
      `).join('');
    }
  }

  window.markNotificationRead = function(id) {
    const item = AppState.notifications.find(n => n.id === id);
    if (item && !item.read) {
      item.read = true;
      renderNotifications();
    }
  };

  // ================= 7. DATA RENDERING (TABLES & KPIS) =================
  function renderKPICards() {
    const container = document.getElementById('kpiContainer');
    if (!container) return;
    const role = AppState.currentRole;
    let html = '';

    if (role === 'admin') {
      html = `
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#e0f2fe; color:#1d4ed8;"><i class="fa-solid fa-users"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">${AppState.users.length} Akun</div>
            <div class="kpi-label">Pengguna Terdaftar</div>
            <div class="kpi-trend up"><i class="fa-solid fa-circle-check"></i> 6 Peran Aktif</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#e8f5e9; color:#004e34;"><i class="fa-solid fa-wheat-awn"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">${AppState.commodities.length} Bahan</div>
            <div class="kpi-label">Komoditas Dipantau</div>
            <div class="kpi-trend up"><i class="fa-solid fa-arrow-trend-up"></i> Data Harian Valid</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fee2e2; color:#b91c1c;"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">1 Titik Kritis</div>
            <div class="kpi-label">Cabai Rawit (Pasar Kangkung)</div>
            <div class="kpi-trend down"><i class="fa-solid fa-bell"></i> Perlu Pasokan DO</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fef3c7; color:#b45309;"><i class="fa-solid fa-truck-fast"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">${AppState.distributions.length} Armada</div>
            <div class="kpi-label">Distribusi Pangan Aktif</div>
            <div class="kpi-trend up"><i class="fa-solid fa-check"></i> 100% Tracking GPS</div>
          </div>
        </div>
      `;
    } else if (role === 'pemda') {
      html = `
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#e8f5e9; color:#004e34;"><i class="fa-solid fa-shield-halved"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">89.4%</div>
            <div class="kpi-label">Indeks Ketahanan Pangan</div>
            <div class="kpi-trend up"><i class="fa-solid fa-arrow-up"></i> +1.8% dari bulan lalu</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fee2e2; color:#b91c1c;"><i class="fa-solid fa-arrow-trend-up"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">+8.4%</div>
            <div class="kpi-label">Inflasi Komoditas Cabai</div>
            <div class="kpi-trend down"><i class="fa-solid fa-triangle-exclamation"></i> Melebihi Batas HAP</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#e0e7ff; color:#312e81;"><i class="fa-solid fa-shop"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">4 Pasar Utama</div>
            <div class="kpi-label">Pasar Terhubung GIS</div>
            <div class="kpi-trend up"><i class="fa-solid fa-map-pin"></i> Terpetakan Akurat</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fef3c7; color:#b45309;"><i class="fa-solid fa-brain"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">1 Peringatan Defisit</div>
            <div class="kpi-label">AI Early Warning System</div>
            <div class="kpi-trend neutral"><i class="fa-solid fa-clock"></i> 14 Hari ke Depan</div>
          </div>
        </div>
      `;
    } else if (role === 'distributor') {
      html = `
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#e8f5e9; color:#004e34;"><i class="fa-solid fa-boxes-stacked"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">538 Ton</div>
            <div class="kpi-label">Cadangan Pangan di Gudang</div>
            <div class="kpi-trend up"><i class="fa-solid fa-circle-check"></i> Siap Disalurkan</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#eff6ff; color:#1d4ed8;"><i class="fa-solid fa-truck"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">2 Pengiriman</div>
            <div class="kpi-label">Dalam Perjalanan</div>
            <div class="kpi-trend up"><i class="fa-solid fa-road"></i> Estimasi Tiba Hari Ini</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fef3c7; color:#b45309;"><i class="fa-solid fa-clipboard-list"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">1 Permintaan</div>
            <div class="kpi-label">Order Kritis Pasar Kangkung</div>
            <div class="kpi-trend down"><i class="fa-solid fa-triangle-exclamation"></i> Perlu Alokasi Segera</div>
          </div>
        </div>
      `;
    } else if (role === 'pedagang') {
      html = `
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#e8f5e9; color:#004e34;"><i class="fa-solid fa-store"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">Pasar Pasir Gintung</div>
            <div class="kpi-label">Lokasi Kios Terdaftar</div>
            <div class="kpi-trend up"><i class="fa-solid fa-circle-check"></i> Status Terverifikasi</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fef3c7; color:#b45309;"><i class="fa-solid fa-tag"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">Rp 15.200 / Kg</div>
            <div class="kpi-label">Harga Beras Premium Kios</div>
            <div class="kpi-trend neutral"><i class="fa-solid fa-check"></i> Sesuai HAP Pemda</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fee2e2; color:#b91c1c;"><i class="fa-solid fa-pepper-hot"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">4.8 Ton (Menipis)</div>
            <div class="kpi-label">Stok Cabai Rawit Pasar</div>
            <div class="kpi-trend down"><i class="fa-solid fa-truck"></i> Pasokan DO Dijadwalkan</div>
          </div>
        </div>
      `;
    } else if (role === 'petani') {
      html = `
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#e8f5e9; color:#004e34;"><i class="fa-solid fa-wheat-awn"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">48.5 Ton</div>
            <div class="kpi-label">Hasil Panen Siap Pasok</div>
            <div class="kpi-trend up"><i class="fa-solid fa-calendar-check"></i> Musim Panen Q4</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#eff6ff; color:#1d4ed8;"><i class="fa-solid fa-handshake"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">3 Distributor</div>
            <div class="kpi-label">Mitra Penyerapan Resmi</div>
            <div class="kpi-trend up"><i class="fa-solid fa-circle-check"></i> Kontrak Beli Terjamin</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fef3c7; color:#b45309;"><i class="fa-solid fa-sack-dollar"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">Rp 11.800 / Kg</div>
            <div class="kpi-label">Harga Gabah/Beras Petani</div>
            <div class="kpi-trend up"><i class="fa-solid fa-arrow-trend-up"></i> Di Atas Biaya Pokok</div>
          </div>
        </div>
      `;
    } else if (role === 'masyarakat') {
      html = `
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#e8f5e9; color:#004e34;"><i class="fa-solid fa-basket-shopping"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">Pasar Pasir Gintung</div>
            <div class="kpi-label">Pasar Terdekat (1.2 Km)</div>
            <div class="kpi-trend up"><i class="fa-solid fa-location-dot"></i> Buka 24 Jam</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#eff6ff; color:#1d4ed8;"><i class="fa-solid fa-tags"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">Rp 13.200 / Kg</div>
            <div class="kpi-label">Harga Beras Medium Terendah</div>
            <div class="kpi-trend up"><i class="fa-solid fa-thumbs-up"></i> Pasar Kangkung</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:#fee2e2; color:#b91c1c;"><i class="fa-solid fa-bell"></i></div>
          <div class="kpi-info">
            <div class="kpi-value">Cabai Rawit Rp 53.500</div>
            <div class="kpi-label">Peringatan Kenaikan Harga</div>
            <div class="kpi-trend down"><i class="fa-solid fa-arrow-up"></i> Naik Rp 4.000</div>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  function renderQuickTables() {
    const alertBody = document.getElementById('quickStockAlertTable');
    if (alertBody) {
      const criticalStocks = AppState.stocks.filter(s => s.status !== 'Aman').concat(AppState.stocks.filter(s => s.status === 'Aman')).slice(0, 5);
      alertBody.innerHTML = criticalStocks.map(item => `
        <tr>
          <td><strong>${item.commName}</strong></td>
          <td>${item.location}</td>
          <td>${item.quantity} ${item.unit}</td>
          <td>10.0 Ton</td>
          <td><span class="badge ${item.status === 'Aman' ? 'badge-success' : (item.status === 'Menipis' ? 'badge-warning' : 'badge-danger')}">${item.status}</span></td>
          <td><button class="btn btn-sm btn-secondary" onclick="openStockEditModal('${item.commName}', '${item.location}')">Kelola</button></td>
        </tr>
      `).join('');
    }

    const distBody = document.getElementById('quickDistributionTable');
    if (distBody) {
      distBody.innerHTML = AppState.distributions.map(d => `
        <tr>
          <td><strong>${d.doNumber}</strong></td>
          <td>${d.commodity}</td>
          <td>${d.volume}</td>
          <td>${d.destination}</td>
          <td><span class="badge ${d.status === 'Selesai / Diterima' ? 'badge-success' : (d.status === 'Dalam Perjalanan' ? 'badge-info' : 'badge-warning')}">${d.status}</span></td>
        </tr>
      `).join('');
    }
  }

  function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    const query = (document.getElementById('userSearchInput')?.value || '').toLowerCase();
    const roleFilter = document.getElementById('userRoleFilter')?.value || 'all';

    const filtered = AppState.users.filter(u => {
      const matchQuery = u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      return matchQuery && matchRole;
    });

    tbody.innerHTML = filtered.map(u => `
      <tr>
        <td>#${u.id}</td>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td><span class="badge badge-info">${u.role.toUpperCase()}</span></td>
        <td>${u.region}</td>
        <td><span class="badge badge-success">${u.status}</span></td>
        <td>${u.createdAt}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="deleteUser(${u.id})" aria-label="Hapus Pengguna"><i class="fa-solid fa-trash text-rose-700"></i></button>
        </td>
      </tr>
    `).join('');
  }

  window.deleteUser = function(id) {
    if (confirm('Yakin ingin menghapus akun pengguna ini dari database PostgreSQL?')) {
      AppState.users = AppState.users.filter(u => u.id !== id);
      renderUsersTable();
      renderKPICards();
      window.showToast('Akun berhasil dihapus dari database.');
    }
  };

  function renderCommoditiesTable() {
    const tbody = document.getElementById('commodityTableBody');
    if (!tbody) return;

    const query = (document.getElementById('commoditySearchInput')?.value || '').toLowerCase();
    const catFilter = document.getElementById('commodityCategoryFilter')?.value || 'all';

    const filtered = AppState.commodities.filter(c => {
      const matchQ = c.name.toLowerCase().includes(query) || c.code.toLowerCase().includes(query);
      const matchCat = catFilter === 'all' || c.category === catFilter;
      return matchQ && matchCat;
    });

    tbody.innerHTML = filtered.map(c => `
      <tr>
        <td><code>${c.code}</code></td>
        <td><strong>${c.name}</strong></td>
        <td><span class="badge badge-neutral">${c.category}</span></td>
        <td>${c.unit}</td>
        <td><strong>Rp ${c.hap.toLocaleString('id-ID')}</strong></td>
        <td>${c.minStock} Ton</td>
        <td><small class="text-slate-600 font-semibold">${c.updatedAt}</small></td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="openPriceModalFor('${c.name}')"><i class="fa-solid fa-tag"></i> Harga</button>
        </td>
      </tr>
    `).join('');

    populateCommodityDropdowns();
  }

  function populateCommodityDropdowns() {
    const selects = ['stockCommSelect', 'priceCommSelect', 'doCommoditySelect', 'harvestCommoditySelect'];
    selects.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = AppState.commodities.map(c => `<option value="${c.name}">${c.name} (${c.unit})</option>`).join('');
      }
    });
  }

  function renderStocksTable() {
    const tbody = document.getElementById('stockTableBody');
    if (!tbody) return;

    const query = (document.getElementById('stockSearchInput')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('stockStatusFilter')?.value || 'all';

    const filtered = AppState.stocks.filter(s => {
      const matchQ = s.commName.toLowerCase().includes(query) || s.location.toLowerCase().includes(query);
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchQ && matchStatus;
    });

    tbody.innerHTML = filtered.map(s => `
      <tr>
        <td><strong>${s.commName}</strong></td>
        <td>${s.location}</td>
        <td><span class="badge badge-neutral">${s.category}</span></td>
        <td><strong>${s.quantity} ${s.unit}</strong></td>
        <td><span class="badge ${s.status === 'Aman' ? 'badge-success' : (s.status === 'Menipis' ? 'badge-warning' : 'badge-danger')}">${s.status}</span></td>
        <td>${s.endurance} Hari</td>
        <td><small class="text-slate-600 font-semibold">${s.updatedAt}</small></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="openStockEditModal('${s.commName}', '${s.location}')"><i class="fa-solid fa-pen"></i> Update</button>
        </td>
      </tr>
    `).join('');
  }

  function renderPricesTable() {
    const carousel = document.getElementById('priceCardsContainer');
    if (carousel) {
      carousel.innerHTML = AppState.prices.slice(0, 5).map(p => `
        <div class="price-card-mini">
          <span class="comm-title">${p.name}</span>
          <span class="current-price">Rp ${p.avg.toLocaleString('id-ID')}</span>
          <span class="price-delta ${p.trend === 'up' ? 'text-rose-700' : (p.trend === 'down' ? 'text-emerald-700' : 'text-slate-600')}">
            <i class="fa-solid ${p.trend === 'up' ? 'fa-arrow-trend-up' : (p.trend === 'down' ? 'fa-arrow-trend-down' : 'fa-minus')}"></i>
            ${p.change} (24 jam)
          </span>
        </div>
      `).join('');
    }

    const tbody = document.getElementById('priceComparisonTableBody');
    if (tbody) {
      tbody.innerHTML = AppState.prices.map(p => `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td>Rp ${p.pg.toLocaleString('id-ID')}</td>
          <td>Rp ${p.pk.toLocaleString('id-ID')}</td>
          <td>Rp ${p.pt.toLocaleString('id-ID')}</td>
          <td>Rp ${p.pw.toLocaleString('id-ID')}</td>
          <td><strong style="color:var(--primary);">Rp ${p.avg.toLocaleString('id-ID')}</strong></td>
          <td><span class="badge ${p.trend === 'up' ? 'badge-danger' : (p.trend === 'down' ? 'badge-success' : 'badge-neutral')}">${p.change}</span></td>
        </tr>
      `).join('');
    }
  }

  function renderDistributionsTable() {
    const tbody = document.getElementById('distributionTableBody');
    if (!tbody) return;

    const query = (document.getElementById('distSearchInput')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('distStatusFilter')?.value || 'all';

    const filtered = AppState.distributions.filter(d => {
      const matchQ = d.doNumber.toLowerCase().includes(query) || d.distributor.toLowerCase().includes(query) || d.destination.toLowerCase().includes(query);
      const matchStatus = statusFilter === 'all' || d.status === statusFilter;
      return matchQ && matchStatus;
    });

    tbody.innerHTML = filtered.map(d => `
      <tr>
        <td><code>${d.doNumber}</code></td>
        <td><strong>${d.distributor}</strong></td>
        <td>${d.commodity}</td>
        <td>${d.volume}</td>
        <td><small class="font-semibold">${d.origin} &rarr; <strong>${d.destination}</strong></small></td>
        <td><small class="font-semibold text-slate-700">${d.vehicle}</small></td>
        <td><span class="badge ${d.status === 'Selesai / Diterima' ? 'badge-success' : (d.status === 'Dalam Perjalanan' ? 'badge-info' : 'badge-warning')}">${d.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="advanceDistributionStatus(${d.id})"><i class="fa-solid fa-truck-ramp-box"></i> Ubah Status</button>
        </td>
      </tr>
    `).join('');
  }

  window.advanceDistributionStatus = function(id) {
    const item = AppState.distributions.find(d => d.id === id);
    if (!item) return;

    const stages = ['Menunggu Pengiriman', 'Dalam Perjalanan', 'Tiba di Lokasi', 'Selesai / Diterima'];
    const currentIdx = stages.indexOf(item.status);
    const nextIdx = (currentIdx + 1) % stages.length;
    item.status = stages[nextIdx];

    renderDistributionsTable();
    renderQuickTables();
    window.showToast(`Status pengiriman ${item.doNumber} diperbarui: ${item.status}`, 'info');
  };

  function renderFarmerTable() {
    const tbody = document.getElementById('farmerTableBody');
    if (!tbody) return;

    tbody.innerHTML = AppState.farmerHarvests.map(h => `
      <tr>
        <td><code>${h.id}</code></td>
        <td><strong>${h.commodity}</strong></td>
        <td>${h.farmer}</td>
        <td><strong>${h.volume}</strong></td>
        <td>${h.date}</td>
        <td>${h.price}</td>
        <td><span class="badge ${h.status.includes('Diserap') ? 'badge-success' : 'badge-warning'}">${h.status}</span></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="connectToDistributor('${h.id}')"><i class="fa-solid fa-handshake"></i> Salurkan</button>
        </td>
      </tr>
    `).join('');
  }

  window.connectToDistributor = function(batchId) {
    window.showToast(`Batch ${batchId} telah ditawarkan ke PT Pangan Sejahtera & Bulog. Menunggu penjemputan armada!`, 'success');
  };

  function renderAIRisks() {
    const tbody = document.getElementById('aiRiskTableBody');
    if (!tbody) return;
    tbody.innerHTML = AppState.aiRisks.map(r => `
      <tr>
        <td><strong>${r.commodity}</strong></td>
        <td><span class="badge ${r.riskClass}">${r.risk}</span></td>
        <td>${r.demand}</td>
        <td><small class="font-semibold text-slate-700">${r.intervention}</small></td>
      </tr>
    `).join('');
  }

  function renderReportTable() {
    const tbody = document.getElementById('reportTableBody');
    if (!tbody) return;

    tbody.innerHTML = AppState.commodities.slice(0, 6).map(c => `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>${(c.minStock * 2.2).toFixed(1)} Ton</td>
        <td>${(c.minStock * 1.5).toFixed(1)} Ton</td>
        <td><strong>${(c.minStock * 0.7).toFixed(1)} Ton</strong></td>
        <td>Rp ${c.hap.toLocaleString('id-ID')}</td>
        <td><span class="badge ${c.name.includes('Cabai') ? 'badge-danger' : 'badge-success'}">${c.name.includes('Cabai') ? 'Risiko Tinggi' : 'Risiko Rendah'}</span></td>
      </tr>
    `).join('');
  }

  // ================= 8. MODAL SETUP & FORMS =================
  function setupModals() {
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
      });
    });

    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
      }
    });

    // Auth Modal
    document.getElementById('authBtnTrigger')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('authModal')?.classList.add('show');
    });

    document.getElementById('tabBtnLogin')?.addEventListener('click', () => {
      document.getElementById('tabBtnLogin')?.classList.add('active');
      document.getElementById('tabBtnRegister')?.classList.remove('active');
      document.getElementById('loginForm')?.classList.add('active');
      document.getElementById('registerForm')?.classList.remove('active');
    });

    document.getElementById('tabBtnRegister')?.addEventListener('click', () => {
      document.getElementById('tabBtnRegister')?.classList.add('active');
      document.getElementById('tabBtnLogin')?.classList.remove('active');
      document.getElementById('registerForm')?.classList.add('active');
      document.getElementById('loginForm')?.classList.remove('active');
    });

    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('loginRoleSelect').value;
      window.switchRole(role);
      document.getElementById('authModal')?.classList.remove('show');
      window.switchTab('dashboard');
    });

    document.getElementById('registerForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const role = document.getElementById('regRole').value;
      AppState.users.push({
        id: AppState.users.length + 1,
        name,
        email,
        role,
        region: 'Pendaftar Baru',
        status: 'Aktif',
        createdAt: '10 Nov 2026'
      });
      renderUsersTable();
      window.switchRole(role);
      document.getElementById('authModal')?.classList.remove('show');
      window.showToast(`Pendaftaran akun ${name} berhasil!`, 'success');
      window.switchTab('dashboard');
    });

    // System Info Modal
    document.getElementById('systemInfoTrigger')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('systemInfoModal')?.classList.add('show');
    });

    // Add User Modal
    document.getElementById('btnOpenUserModal')?.addEventListener('click', () => {
      document.getElementById('userFormModal')?.classList.add('show');
    });
    document.getElementById('addUserForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('newUserName').value;
      const email = document.getElementById('newUserEmail').value;
      const role = document.getElementById('newUserRole').value;
      const region = document.getElementById('newUserRegion').value || 'Provinsi Lampung';
      AppState.users.push({
        id: AppState.users.length + 1,
        name,
        email,
        role,
        region,
        status: 'Aktif',
        createdAt: '10 Nov 2026'
      });
      renderUsersTable();
      renderKPICards();
      document.getElementById('userFormModal')?.classList.remove('show');
      document.getElementById('addUserForm').reset();
      window.showToast('Pengguna baru berhasil ditambahkan ke PostgreSQL Users!', 'success');
    });

    // Add Commodity Modal
    document.getElementById('btnOpenCommodityModal')?.addEventListener('click', () => {
      document.getElementById('commodityFormModal')?.classList.add('show');
    });
    document.getElementById('addCommodityForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('commName').value;
      const category = document.getElementById('commCategory').value;
      const unit = document.getElementById('commUnit').value;
      const hap = parseInt(document.getElementById('commHap').value);
      const minStock = parseFloat(document.getElementById('commMinStock').value);

      AppState.commodities.push({
        id: AppState.commodities.length + 1,
        code: `KMD-0${AppState.commodities.length + 1}`,
        name,
        category,
        unit,
        hap,
        minStock,
        updatedAt: '10 Nov 2026 12:00'
      });
      renderCommoditiesTable();
      renderKPICards();
      document.getElementById('commodityFormModal')?.classList.remove('show');
      document.getElementById('addCommodityForm').reset();
      window.showToast(`Komoditas ${name} berhasil disimpan!`, 'success');
    });

    // Update Stock Modal
    document.getElementById('btnOpenStockModal')?.addEventListener('click', () => {
      document.getElementById('stockFormModal')?.classList.add('show');
    });
    document.getElementById('updateStockForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const commName = document.getElementById('stockCommSelect').value;
      const location = document.getElementById('stockMarketSelect').value;
      const qty = parseFloat(document.getElementById('stockQuantityInput').value);

      const existing = AppState.stocks.find(s => s.commName === commName && s.location === location);
      let status = 'Aman';
      if (qty < 5) status = 'Kritis';
      else if (qty < 15) status = 'Menipis';

      if (existing) {
        existing.quantity = qty;
        existing.status = status;
        existing.updatedAt = '10 Nov 2026 12:30';
      } else {
        AppState.stocks.unshift({
          id: AppState.stocks.length + 1,
          commName,
          location,
          category: location.includes('Gudang') ? 'Gudang Logistik' : 'Pasar Rakyat',
          quantity: qty,
          unit: 'Ton',
          status,
          endurance: Math.max(1, Math.round(qty * 1.5)),
          updatedAt: '10 Nov 2026 12:30'
        });
      }

      renderStocksTable();
      renderQuickTables();
      renderKPICards();
      document.getElementById('stockFormModal')?.classList.remove('show');
      document.getElementById('updateStockForm').reset();
      window.showToast(`Stok ${commName} di ${location} berhasil diperbarui!`, 'success');
    });

    // Update Price Modal
    document.getElementById('btnOpenPriceModal')?.addEventListener('click', () => {
      document.getElementById('priceFormModal')?.classList.add('show');
    });
    document.getElementById('updatePriceForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const comm = document.getElementById('priceCommSelect').value;
      const market = document.getElementById('priceMarketSelect').value;
      const price = parseInt(document.getElementById('priceValueInput').value);

      const item = AppState.prices.find(p => p.name === comm);
      if (item) {
        if (market.includes('Pasir Gintung')) item.pg = price;
        if (market.includes('Kangkung')) item.pk = price;
        if (market.includes('Tamin')) item.pt = price;
        if (market.includes('Way Halim')) item.pw = price;
        item.avg = Math.round((item.pg + item.pk + item.pt + item.pw) / 4);
      }

      renderPricesTable();
      document.getElementById('priceFormModal')?.classList.remove('show');
      document.getElementById('updatePriceForm').reset();
      window.showToast(`Harga harian ${comm} di ${market} tersimpan!`, 'success');
    });

    // Create Distribution DO Modal
    document.getElementById('btnOpenDistributionModal')?.addEventListener('click', () => {
      document.getElementById('distributionFormModal')?.classList.add('show');
    });
    document.getElementById('createDistributionForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const distributor = document.getElementById('doDistributor').value;
      const commodity = document.getElementById('doCommoditySelect').value;
      const volume = document.getElementById('doQuantity').value + ' Ton';
      const origin = document.getElementById('doOrigin').value;
      const destination = document.getElementById('doDestination').value;
      const status = document.getElementById('doStatus').value;

      const doNum = `DO-2026-${1100 + AppState.distributions.length + 1}`;
      AppState.distributions.unshift({
        id: AppState.distributions.length + 1,
        doNumber: doNum,
        distributor,
        commodity,
        volume,
        origin,
        destination,
        vehicle: 'Colt Diesel BE-9920-FS',
        status,
        eta: '11 Nov 10:00'
      });

      renderDistributionsTable();
      renderQuickTables();
      renderKPICards();
      document.getElementById('distributionFormModal')?.classList.remove('show');
      document.getElementById('createDistributionForm').reset();
      window.showToast(`Surat Jalan ${doNum} berhasil diterbitkan!`, 'success');
    });

    // Farmer Harvest Modal
    document.getElementById('btnOpenHarvestModal')?.addEventListener('click', () => {
      document.getElementById('harvestFormModal')?.classList.add('show');
    });
    document.getElementById('createHarvestForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const farmer = document.getElementById('harvestFarmerName').value;
      const commodity = document.getElementById('harvestCommoditySelect').value;
      const volume = document.getElementById('harvestVolume').value + ' Ton';
      const price = 'Rp ' + parseInt(document.getElementById('harvestPrice').value).toLocaleString('id-ID') + ' / Kg';

      AppState.farmerHarvests.unshift({
        id: `BATCH-TK-0${AppState.farmerHarvests.length + 1}`,
        commodity,
        farmer,
        volume,
        date: '10 Nov 2026',
        price,
        status: 'Tersedia'
      });

      renderFarmerTable();
      document.getElementById('harvestFormModal')?.classList.remove('show');
      document.getElementById('createHarvestForm').reset();
      window.showToast('Data panen baru berhasil dicatat dan disiarkan ke distributor!', 'success');
    });

    // Simulation Trigger
    document.getElementById('btnRunPrediction')?.addEventListener('click', () => {
      window.showToast('Menjalankan algoritma machine learning time-series... Prediksi diperbarui!', 'info');
    });

    // CSV Export simulation
    document.getElementById('btnExportCSV')?.addEventListener('click', () => {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Komoditas,Kategori,Satuan,Harga Acuan (HAP),Batas Minimum (Ton)\n";
      AppState.commodities.forEach(c => {
        csvContent += `"${c.name}","${c.category}","${c.unit}",${c.hap},${c.minStock}\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "laporan_rekapitulasi_pangan_foodsupply_2026.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.showToast('Laporan CSV berhasil diunduh.');
    });

    // Quick Data Sync simulation
    document.getElementById('btnRefreshData')?.addEventListener('click', () => {
      window.showToast('Menghubungkan ke API Rust Axum & PostgreSQL... Data mutakhir!', 'success');
      renderKPICards();
      renderQuickTables();
      renderUsersTable();
      renderCommoditiesTable();
      renderStocksTable();
      renderPricesTable();
      renderDistributionsTable();
      renderFarmerTable();
    });
  }

  // Helpers for direct triggers from buttons
  window.openStockEditModal = function(commName, location) {
    const modal = document.getElementById('stockFormModal');
    if (!modal) return;
    const commSel = document.getElementById('stockCommSelect');
    const locSel = document.getElementById('stockMarketSelect');
    if (commSel) commSel.value = commName;
    if (locSel) locSel.value = location;
    modal.classList.add('show');
  };

  window.openPriceModalFor = function(commName) {
    const modal = document.getElementById('priceFormModal');
    if (!modal) return;
    const commSel = document.getElementById('priceCommSelect');
    if (commSel) commSel.value = commName;
    modal.classList.add('show');
  };

  window.openDispatchModal = function(commName) {
    window.switchTab('tracking-distribusi');
    const modal = document.getElementById('distributionFormModal');
    if (modal) {
      const commSel = document.getElementById('doCommoditySelect');
      const destInp = document.getElementById('doDestination');
      if (commSel) commSel.value = commName;
      if (destInp) destInp.value = 'Pasar Kangkung';
      modal.classList.add('show');
    }
  };

  // Search & Filter event bindings
  document.getElementById('userSearchInput')?.addEventListener('input', renderUsersTable);
  document.getElementById('userRoleFilter')?.addEventListener('change', renderUsersTable);
  document.getElementById('commoditySearchInput')?.addEventListener('input', renderCommoditiesTable);
  document.getElementById('commodityCategoryFilter')?.addEventListener('change', renderCommoditiesTable);
  document.getElementById('stockSearchInput')?.addEventListener('input', renderStocksTable);
  document.getElementById('stockStatusFilter')?.addEventListener('change', renderStocksTable);
  document.getElementById('distSearchInput')?.addEventListener('input', renderDistributionsTable);
  document.getElementById('distStatusFilter')?.addEventListener('change', renderDistributionsTable);

  // Sidebar mobile toggle
  document.getElementById('sidebarToggleBtn')?.addEventListener('click', () => {
    document.getElementById('appSidebar')?.classList.toggle('show-mobile');
  });

  // ================= 9. INITIALIZE SYSTEM =================
  startLiveClock();
  setupModals();
  renderKPICards();
  renderQuickTables();
  renderUsersTable();
  renderCommoditiesTable();
  renderStocksTable();
  renderPricesTable();
  renderDistributionsTable();
  renderFarmerTable();
  renderNotifications();
  renderAIRisks();
  renderReportTable();

  // Initialize charts
  setTimeout(initDashboardCharts, 150);

  // Check initial hash routing on page load
  if (window.location.hash) {
    window.switchTab(window.location.hash);
  }

  console.log('[FoodSupply] Smart City System v2.0 QA Audited & Initialized.');
});
