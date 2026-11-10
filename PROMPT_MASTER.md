# PROMPT MASTER: FoodSupply – Sistem Distribusi Pangan Cerdas
**Ujian Tengah Semester (UTS) Pengembangan Perangkat Sistem Informasi (PPSI)**  
*Pengembang:* **Yolanda Anderi**  
*Dosen Pembimbing:* **Dr. Erliyan Redy Susanto, M.Kom**  
*Institusi:* **Universitas Teknokrat Indonesia** & **Pemerintah Daerah (Pemda)**  
*Tahun Proyek:* **2026**  
*Backend Target:* **Rust (Axum + Tokio + SQLx)** | *Database:* **PostgreSQL (PostGIS)**

---

## 📋 PANDUAN PENGGUNAAN PROMPT MASTER
Prompt master ini dirancang secara terstruktur dan komprehensif untuk diinputkan ke sistem AI (*Stitch AI, ChatGPT, Claude, Cursor, dsb.*) guna menghasilkan antarmuka web interaktif berbasis HTML, CSS, dan JavaScript murni yang memenuhi seluruh spesifikasi pada dokumen **PRD (Product Requirement Document)** dan **Design Guide FoodSupply**.

---

## 🤖 BAGIAN 1: SYSTEM PROMPT & IDENTITAS PERAN

```markdown
Bertindaklah sebagai Senior Full-Stack Web Architect dan Lead UI/UX Designer spesialisasi Smart City & Ketahanan Pangan. 

Tugas Anda adalah merancang dan mengimplementasikan aplikasi web responsif lengkap (HTML5, CSS3 kustom, dan Vanilla JavaScript ES6+) bernama:
"FoodSupply – Sistem Distribusi Pangan Cerdas"

Aplikasi ini bertujuan mengintegrasikan pemantauan ketersediaan stok pangan, fluktuasi harga komoditas antar pasar tradisional, pemetaan geografis GIS, peramalan kebutuhan pangan berbasis AI, dan pelacakan armada distribusi logistik secara real-time.
```

---

## 🎨 BAGIAN 2: SPESIFIKASI DESAIN & TOKEN VISUAL

Terapkan standar visual berikut secara disiplin pada seluruh halaman dan komponen:
1. **Palet Warna Utama**:
   - `Primary Green` (`#004e34`): Melambangkan sektor pertanian, pangan, dan ketahanan pangan nasional.
   - `Secondary / Tech Green-Blue` (`#0f6848`): Melambangkan teknologi mutakhir, integritas, dan keandalan data.
   - `Background Utama`: Bersih, minimalis, dan terstruktur (`#ffffff` dan latar pendukung `#f8fafc`).
   - `Aksen Status`: 
     - Hijau (`#10b981` / `#dcfce7`) untuk *Stok Aman* / *Selesai / Diterima*.
     - Kuning/Amber (`#f59e0b` / `#fef3c7`) untuk *Stok Menipis (Waspada)* / *Dalam Perjalanan*.
     - Merah (`#ef4444` / `#fee2e2`) untuk *Stok Kritis / Defisit* / *Lonjakan Harga*.
     - Biru (`#3b82f6` / `#e0f2fe`) untuk *Logistik Aktif* / *Akun Terverifikasi*.
2. **Tipografi**:
   - Font modern: `Plus Jakarta Sans`, sans-serif (Google Fonts).
3. **Identitas Institusi**:
   - Header aplikasi wajib menampilkan berdampingan:
     - **Logo Resmi Pemerintah Daerah (Pemda - Dinas Ketahanan Pangan)**.
     - **Logo Universitas Teknokrat Indonesia (Mitra Akademik)**.
4. **Footer Wajib pada Seluruh Halaman**:
   - Tulisan persis:  
     `Copyright©2026 by Yolanda Anderi dan Dr. Erliyan Redy Susanto, M.Kom`

---

## 👥 BAGIAN 3: HAK AKSES ENAM JENIS PENGGUNA (ROLE MATRIX)

Sistem wajib menyediakan **Role Switcher** interaktif dan tampilan dashboard yang otomatis menyesuaikan 6 peran pengguna:

| Peran Pengguna | Hak Akses Utama & Fitur Khusus |
| :--- | :--- |
| **A. Administrator** | Manajemen pengguna (CRUD Users), master data komoditas pangan, pemantauan stok & harga global, audit log distribusi, dan pengaturan arsitektur backend Rust + PostgreSQL. |
| **B. Pemerintah Daerah (Pemda)** | Indeks ketahanan pangan makro, grafik disparitas harga lintas pasar, peta GIS persebaran wilayah surplus/defisit, AI early warning kelangkaan, dan unduh laporan resmi (Cetak / CSV). |
| **C. Distributor Pangan** | Manajemen kapasitas gudang logistik, formulir penerbitan Surat Jalan (DO), tracking rute pengiriman ke pasar tujuan, dan riwayat armada logistik pangan. |
| **D. Pedagang Pasar** | Pemantauan stok kios pasar, formulir pembaruan harga eceran harian, grafik riwayat harga, dan pengajuan permintaan pasokan ke distributor. |
| **E. Petani / Produsen** | Pencatatan hasil panen (tonase, komoditas, varietas), penawaran pasokan langsung ke distributor/Bulog, dan pantauan harga acuan penjualan (HAP). |
| **F. Masyarakat (Publik)** | Landing page interaktif, pencarian harga pangan eceran harian termurah, fitur perbandingan harga 4 pasar tradisional, dan peta GIS lokasi pasar terdekat. |

---

## 🖥️ BAGIAN 4: TIGA BELAS (13) HALAMAN & MODUL UTAMA

Aplikasi web dirancang dalam bentuk Single Page Application (SPA) responsif tanpa reload halaman, mencakup:
1. **Landing Page Publik**: Banner Smart City 2026, ringkasan capaian, 4 pilar fitur, dan tombol navigasi langsung ke cek harga pasar.
2. **Autentikasi (Login & Register Modal)**: Form email/password dengan selector peran demo, registrasi pengguna baru yang tersimpan ke state.
3. **Dashboard Adaptif**: 4 Kartu KPI dinamis sesuai peran aktif, 2 grafik interaktif Chart.js, tabel peringatan stok kritis, dan status distribusi live.
4. **Manajemen Akun Pengguna**: Tabel CRUD pengguna dengan filter peran, pencarian nama/email, dan badge status aktivasi.
5. **Data Master Komoditas**: Katalog 10 bahan pangan strategis (Beras Premium, Beras Medium, Cabai Rawit Merah, Bawang Merah, Bawang Putih, dsb.), kategori, satuan, dan Harga Acuan Penjualan (HAP).
6. **Pemantauan Stok Real-Time**: Status stok (Aman, Menipis, Kritis), estimasi ketahanan hari pangan, filter status, dan modal update stok.
7. **Informasi & Komparasi Harga Pangan**: Grid kartu harga ringkas, tabel perbandingan harga di 4 pasar (Pasar Pasir Gintung, Pasar Kangkung, Pasar Tamin, Pasar Way Halim), dan indikator persentase 24 jam.
8. **Peta GIS Interaktif (Leaflet.js + PostGIS)**: Peta koordinat Bandar Lampung dan sekitarnya dengan marker berkode warna (Pasar, Gudang Distributor, Sentra Petani), info popup lengkap, dan filter tipe fasilitas.
9. **Prediksi Kebutuhan Pangan (AI Engine)**: Banner peringatan dini potensi defisit komoditas, grafik time-series proyeksi kebutuhan konsumsi vs pasokan 30 hari, serta matriks intervensi risiko.
10. **Tracking Logistik & Distribusi**: Daftar Surat Jalan (DO), asal, tujuan, armada supir, dan mekanisme alur status (*Menunggu*, *Dalam Perjalanan*, *Tiba*, *Selesai*).
11. **Hasil Produksi Petani**: Modul khusus kelompok tani untuk mencatat hasil panen baru dan menghubungkannya dengan distributor resmi.
12. **Pusat Notifikasi**: List pemberitahuan sistem stok menipis, lonjakan harga, dan status logistik dengan badge count live di topbar.
13. **Laporan & Rekapitulasi Resmi**: Format kertas pelaporan formal Pemda & UTI, filter periode & pasar, tombol Cetak (Print View), dan tombol Ekspor CSV/Excel.

---

## 🗄️ BAGIAN 5: SPESIFIKASI TEKNIS BACKEND & DATABASE

Kode frontend disiapkan untuk berintegrasi secara mulus dengan spesifikasi backend berikut:
- **Bahasa Pemrograman**: Rust
- **Framework Web**: Axum
- **Asynchronous Engine**: Tokio
- **Database ORM**: SQLx
- **Basis Data**: PostgreSQL 16 dengan ekstensi **PostGIS** untuk query data spasial geografis (koordinat latitude/longitude pasar dan distributor).
- **Enkripsi & Keamanan**: JWT untuk otorisasi berbasis peran dan Argon2 untuk hashing password.
- **Tabel Relasional**: `Users`, `Commodities`, `Markets`, `Stocks`, `Prices`, `Distributions`, `Notifications`.

---

## 📁 BAGIAN 6: STRUKTUR BERKAS IMPLEMENTASI LENGKAP

Seluruh kode sumber frontend implementasi telah diwujudkan dalam tiga berkas mandiri:

```
d:\uts_ppsi_yolandaanderi/
├── index.html        # Struktur HTML5 lengkap 13 modul, header logo, modal, & footer
├── style.css         # Styling modern, variabel CSS #004e34 & #0f6848, responsive & print
├── main.js           # Logika SPA, state dummy PostgreSQL, Chart.js, Leaflet GIS, & Event Handlers
├── design_foodsuply.md
└── prd_foodsupply.md
```

### 1. `index.html`
Berisi kerangka semantik HTML5 dengan CDN Google Fonts (Plus Jakarta Sans), FontAwesome 6, Chart.js 4, Leaflet 1.9 GIS, header institusi dengan SVG Logo Pemda dan Logo Universitas Teknokrat Indonesia, 13 bagian tampilan modul, 7 modal form interaktif, dan footer resmi.

### 2. `style.css`
Berisi sistem styling berbasis CSS Variables, desain tata letak grid dan flexbox responsif, kartu statistik KPI, tabel data dengan hover dan badge status, panel GIS map kustom, carousels harga, animasi modal fade/pop, dan media query cetak laporan formal.

### 3. `main.js`
Berisi state data realistis provinsi Lampung (Pasar Pasir Gintung, Kangkung, Tamin, Way Halim, Bulog Divre Lampung, Tanggamus, Metro), sistem pergantian peran (*Role Switching* adaptif), inisialisasi peta Leaflet GIS dengan custom marker, 3 grafik interaktif Chart.js, filter dan pencarian instan tabel, operasi CRUD modal, dan notifikasi toast.

---

## 🚀 CARA MENJALANKAN PROTOTIPE SECARA LANGSUNG
1. Buka berkas `index.html` langsung di peramban web (*Google Chrome, Microsoft Edge, Firefox, dsb.*) dengan klik dua kali atau menggunakan Live Server.
2. Gunakan dropdown **"Peran Akun"** di kanan atas topbar untuk menguji tampilan sistem dari sudut pandang:
   - **Administrator**: Kelola seluruh akun dan master data komoditas.
   - **Pemerintah Daerah (Pemda)**: Pantau grafik stabilitas harga, peta GIS, AI forecasting, dan cetak laporan.
   - **Distributor**: Kelola surat jalan armada distribusi dan stok gudang.
   - **Pedagang**: Perbarui harga harian dan cek stok lapak.
   - **Petani**: Catat tonase hasil panen baru.
   - **Masyarakat**: Cek harga sembako termurah dan lokasi pasar terdekat.
3. Semua tombol aksi, modal input, filter pencarian, ekspor CSV, dan Leaflet GIS siap diuji dan berfungsi secara interaktif tanpa membutuhkan konfigurasi server rumit.

