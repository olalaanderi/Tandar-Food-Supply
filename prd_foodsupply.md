# PRODUCT REQUIREMENT DOCUMENT (PRD)
## FoodSupply – Sistem Distribusi Pangan Cerdas

### Informasi Proyek

| Keterangan | Detail |
| :--- | :--- |
| **Nama Produk** | FoodSupply |
| **Jenis Produk** | Aplikasi Smart City |
| **Kategori** | Sistem Informasi Distribusi Pangan |
| **Bahasa Backend** | Rust |
| **Database** | PostgreSQL |
| **Target Platform** | Web Application (Responsive) |
| **Tahun Pengembangan**| 2026 |
| **Pengembang** | Yolanda Anderi |
| **Dosen Pembimbing** | Dr. Erliyan Redy Susanto, M.Kom |

---

## 1. Latar Belakang

Perkembangan teknologi informasi mendorong pemerintah untuk menerapkan konsep Smart City dalam pengelolaan berbagai sektor perkotaan, termasuk sektor pangan. Salah satu permasalahan yang sering terjadi adalah distribusi bahan pangan yang belum merata, kenaikan harga kebutuhan pokok, keterbatasan informasi stok, serta keterlambatan pengiriman bahan pangan.

Permasalahan tersebut dapat berdampak terhadap ketersediaan dan stabilitas harga pangan di masyarakat. Selain itu, pemerintah masih membutuhkan sistem informasi yang terintegrasi untuk memantau stok, harga, dan proses distribusi pangan dari petani hingga pasar.

Berdasarkan permasalahan tersebut, dikembangkan **FoodSupply – Sistem Distribusi Pangan Cerdas**, yaitu aplikasi berbasis Smart City yang bertujuan mengintegrasikan informasi stok, harga, lokasi pasar, distributor, dan distribusi bahan pangan dalam satu platform digital.

Aplikasi ini menggunakan teknologi **Rust** sebagai backend dan **PostgreSQL** sebagai database untuk mendukung pengelolaan data yang terstruktur, aman, dan efisien. Dengan adanya FoodSupply, diharapkan pemerintah dapat melakukan pengawasan distribusi pangan secara lebih optimal dan masyarakat dapat memperoleh informasi kebutuhan pokok dengan mudah.

---

## 2. Identifikasi Masalah

Permasalahan yang menjadi dasar pengembangan aplikasi FoodSupply adalah:
1. Distribusi bahan pangan belum merata di setiap wilayah.
2. Masyarakat kesulitan mendapatkan informasi harga bahan pokok terkini.
3. Kelangkaan bahan pangan sering terlambat diketahui.
4. Pemerintah kesulitan memantau stok dan distribusi pangan secara terintegrasi.
5. Informasi lokasi pasar dan distributor belum tersedia dalam satu sistem.
6. Belum optimalnya koordinasi antara petani, distributor, pedagang, dan pemerintah.

---

## 3. Tujuan Pengembangan

Tujuan pengembangan aplikasi FoodSupply adalah:
1. Membangun sistem informasi distribusi pangan yang terintegrasi.
2. Menyediakan informasi stok dan harga pangan secara *real-time* atau mendekati *real-time*.
3. Mempermudah masyarakat dalam memperoleh informasi kebutuhan pokok.
4. Membantu pemerintah memantau ketersediaan dan distribusi bahan pangan.
5. Mengidentifikasi potensi kelangkaan melalui analisis data pangan.
6. Meningkatkan transparansi informasi harga dan pasokan pangan.
7. Mendukung penerapan konsep Smart City dalam sektor ketahanan pangan.

---

## 4. Target Pengguna

Aplikasi FoodSupply memiliki beberapa kategori pengguna dengan hak akses berbeda:

| Pengguna | Hak Akses dan Fungsi |
| :--- | :--- |
| **Admin** | Mengelola seluruh data dan pengguna aplikasi. |
| **Pemerintah** | Memantau stok, harga, distribusi, dan laporan pangan. |
| **Distributor** | Mengelola stok serta informasi pengiriman pangan. |
| **Pedagang** | Melihat informasi harga dan memperbarui stok barang dagangan. |
| **Petani** | Memasukkan informasi hasil panen dan ketersediaan produk. |
| **Masyarakat** | Melihat harga, stok, dan lokasi pasar terdekat. |

---

## 5. Kebutuhan Fungsional

Kebutuhan fungsional menjelaskan fitur dan aktivitas yang harus dapat dilakukan oleh sistem.

| ID | Fitur | Deskripsi |
| :--- | :--- | :--- |
| **FR-01** | Login dan Registrasi | Pengguna dapat masuk dan mendaftar sesuai kategori akun. |
| **FR-02** | Dashboard | Menampilkan ringkasan informasi stok, harga, dan distribusi pangan. |
| **FR-03** | Monitoring Stok | Menampilkan jumlah ketersediaan bahan pangan. |
| **FR-04** | Informasi Harga | Menampilkan harga bahan pokok berdasarkan pasar dan wilayah. |
| **FR-05** | Pemetaan Lokasi | Menampilkan lokasi pasar, petani, dan distributor. |
| **FR-06** | Prediksi Pangan | Menganalisis data untuk memperkirakan kebutuhan dan potensi kelangkaan. |
| **FR-07** | Notifikasi | Memberikan peringatan ketika stok menipis atau harga mengalami perubahan signifikan. |
| **FR-08** | Tracking Distribusi | Memantau status pengiriman bahan pangan. |
| **FR-09** | Laporan | Menyediakan laporan stok, harga, dan distribusi. |
| **FR-10** | Manajemen Pengguna | Admin dapat mengatur akun dan hak akses pengguna. |

---

## 6. Kebutuhan Nonfungsional

1. **Performance:** Sistem harus mampu memproses permintaan data secara efisien.
2. **Security:** Sistem harus menggunakan autentikasi, otorisasi berbasis peran, dan perlindungan data pengguna.
3. **Availability:** Aplikasi dirancang agar dapat diakses selama 24 jam dengan pemeliharaan terjadwal.
4. **Responsive Design:** Antarmuka dapat digunakan melalui komputer, tablet, dan smartphone.
5. **Scalability:** Sistem dapat dikembangkan untuk menangani pertumbuhan jumlah pengguna dan data.
6. **Reliability:** Sistem harus memiliki mekanisme pencadangan database dan penanganan kesalahan.
7. **Data Integrity:** Informasi stok, harga, dan distribusi harus konsisten serta tervalidasi.
8. **Usability:** Aplikasi harus memiliki navigasi sederhana dan mudah dipahami.

---

## 7. Fitur Utama Aplikasi

### 7.1 Dashboard Utama
Menampilkan informasi umum mengenai kondisi pangan, seperti:
- Total komoditas pangan.
- Jumlah pasar dan distributor terdaftar.
- Rata-rata harga bahan pokok.
- Jumlah stok pangan tersedia.
- Informasi distribusi berjalan.
- Peringatan stok pangan menipis.

### 7.2 Monitoring Stok Pangan
Fitur untuk menampilkan ketersediaan berbagai bahan pangan, seperti beras, gula, minyak goreng, telur, cabai, dan bawang.
Informasi yang ditampilkan:
- Nama komoditas.
- Jumlah stok.
- Satuan barang.
- Lokasi penyimpanan.
- Tanggal pembaruan stok.
- Status ketersediaan.

### 7.3 Informasi Harga Pangan
Fitur untuk menampilkan perkembangan harga bahan pokok berdasarkan wilayah dan pasar.
Informasi yang ditampilkan:
- Nama bahan pangan.
- Harga per satuan.
- Nama pasar.
- Wilayah.
- Tanggal pembaruan.
- Grafik perubahan harga.

### 7.4 Pemetaan Lokasi Pasar dan Distributor
Menggunakan teknologi GIS untuk menampilkan lokasi pasar, petani, dan distributor melalui peta digital. Fitur ini membantu masyarakat menemukan lokasi penjual bahan pangan dan membantu pemerintah memantau persebaran distribusi.

### 7.5 Prediksi Kebutuhan Pangan
Menggunakan teknologi Artificial Intelligence untuk menganalisis data historis stok, harga, dan permintaan pangan. Hasil analisis digunakan untuk:
- Memperkirakan kebutuhan bahan pangan.
- Mengidentifikasi potensi kekurangan stok.
- Menganalisis tren perubahan harga.
- Membantu pemerintah menentukan strategi distribusi.

### 7.6 Notifikasi Kelangkaan Pangan
Memberikan pemberitahuan otomatis apabila stok bahan pangan berada di bawah batas minimum yang telah ditentukan atau terdapat perubahan harga yang signifikan.

### 7.7 Tracking Distribusi
Memungkinkan pemerintah dan distributor memantau proses pengiriman bahan pangan dengan informasi:
- Nomor pengiriman.
- Nama distributor.
- Jenis bahan pangan.
- Jumlah pengiriman.
- Lokasi asal dan tujuan.
- Status pengiriman.

---

## 8. Rancangan Alur Sistem

Alur kerja aplikasi FoodSupply dirancang sebagai berikut:
1. Pengguna membuka aplikasi FoodSupply.
2. Pengguna melakukan login sesuai kategori akun.
3. Sistem memvalidasi identitas dan hak akses pengguna.
4. Pengguna masuk ke dashboard sesuai perannya.
5. Distributor, petani, dan pedagang dapat memperbarui informasi stok dan harga.
6. Backend Rust memproses dan memvalidasi data.
7. Data disimpan ke dalam database PostgreSQL.
8. Sistem menampilkan informasi stok dan harga kepada pengguna.
9. Sistem menganalisis data untuk mendeteksi potensi kelangkaan pangan.
10. Sistem mengirimkan notifikasi dan menyediakan laporan kepada pemerintah.

**Diagram alur sistem:**
```
Pengguna → Login → Validasi Akun → Dashboard → Pengelolaan Data Pangan → Backend Rust → Database PostgreSQL → Analisis Data → Informasi dan Notifikasi
```

---

## 9. Rancangan Database PostgreSQL

Database dirancang secara relasional untuk menjaga konsistensi dan integritas data.

### 9.1 Tabel `Users`
| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGSERIAL | Primary Key |
| `name` | VARCHAR(100) | Nama pengguna |
| `email` | VARCHAR(150) | Email pengguna |
| `password_hash` | TEXT | Password terenkripsi |
| `role` | VARCHAR(30) | Hak akses |
| `created_at` | TIMESTAMPTZ | Tanggal pembuatan |

### 9.2 Tabel `Commodities`
| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGSERIAL | Primary Key |
| `name` | VARCHAR(100) | Nama komoditas |
| `category` | VARCHAR(100) | Kategori pangan |
| `unit` | VARCHAR(30) | Satuan barang |
| `created_at` | TIMESTAMPTZ | Tanggal pembuatan |

### 9.3 Tabel `Markets`
| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGSERIAL | Primary Key |
| `name` | VARCHAR(150) | Nama pasar |
| `address` | TEXT | Alamat pasar |
| `latitude` | DECIMAL(10,7) | Garis lintang |
| `longitude` | DECIMAL(10,7) | Garis bujur |
| `created_at` | TIMESTAMPTZ | Tanggal pembuatan |

### 9.4 Tabel `Stocks`
| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGSERIAL | Primary Key |
| `commodity_id` | BIGINT | Relasi komoditas |
| `market_id` | BIGINT | Relasi pasar |
| `quantity` | NUMERIC(14,2) | Jumlah stok |
| `updated_at` | TIMESTAMPTZ | Pembaruan stok |

### 9.5 Tabel `Prices`
| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGSERIAL | Primary Key |
| `commodity_id` | BIGINT | Relasi komoditas |
| `market_id` | BIGINT | Relasi pasar |
| `price` | NUMERIC(14,2) | Harga pangan |
| `recorded_at` | TIMESTAMPTZ | Waktu pencatatan |

### 9.6 Tabel `Distributions`
| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGSERIAL | Primary Key |
| `commodity_id` | BIGINT | Relasi komoditas |
| `distributor_id`| BIGINT | Relasi pengguna |
| `origin` | TEXT | Lokasi asal |
| `destination` | TEXT | Lokasi tujuan |
| `quantity` | NUMERIC(14,2) | Jumlah pengiriman |
| `status` | VARCHAR(30) | Status pengiriman |
| `created_at` | TIMESTAMPTZ | Tanggal pengiriman |

### 9.7 Tabel `Notifications`
| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BIGSERIAL | Primary Key |
| `user_id` | BIGINT | Relasi pengguna |
| `title` | VARCHAR(150) | Judul notifikasi |
| `message` | TEXT | Isi notifikasi |
| `is_read` | BOOLEAN | Status dibaca |
| `created_at` | TIMESTAMPTZ | Waktu notifikasi |

**Relasi database:**
- `Users` memiliki relasi dengan `Distributions` sebagai distributor.
- `Commodities` berelasi dengan `Stocks`, `Prices`, dan `Distributions`.
- `Markets` berelasi dengan `Stocks` dan `Prices`.
- `Users` berelasi dengan `Notifications`.

*Seluruh tabel menggunakan primary key, foreign key, serta aturan validasi untuk menjaga integritas data.*

---

## 10. Validasi Teknologi Rust dan PostgreSQL

Pengembangan FoodSupply menggunakan teknologi berikut:

### 10.1 Rust sebagai Backend
Rust digunakan untuk membangun API, mengelola logika bisnis, autentikasi pengguna, pengolahan stok, dan distribusi pangan.
Komponen yang direkomendasikan:
- **Axum:** Framework untuk membangun REST API.
- **Tokio:** Asynchronous runtime.
- **SQLx:** Integrasi Rust dengan PostgreSQL.
- **Serde:** Serialisasi dan deserialisasi JSON.
- **Argon2:** Hashing password.
- **JWT:** Autentikasi berbasis token.

### 10.2 PostgreSQL sebagai Database
PostgreSQL digunakan untuk menyimpan seluruh data aplikasi.
Keunggulan:
- Mendukung relasi antartabel.
- Menjaga integritas data menggunakan constraint.
- Mendukung transaksi database.
- Mendukung indexing untuk mempercepat pencarian.
- Mendukung penyimpanan data geografis melalui ekstensi PostGIS.

### 10.3 Validasi Kesesuaian Teknologi

| Kebutuhan | Teknologi | Status |
| :--- | :--- | :--- |
| REST API | Rust + Axum | Sesuai |
| Asynchronous Processing | Tokio | Sesuai |
| Database Integration | SQLx | Sesuai |
| Penyimpanan Data | PostgreSQL | Sesuai |
| Data Geografis | PostgreSQL + PostGIS | Sesuai |
| Autentikasi | JWT + Argon2 | Sesuai |
| Prediksi Pangan | Model AI/ML terintegrasi | Memerlukan pengembangan tambahan |
| Notifikasi Real-Time | WebSocket | Memerlukan implementasi tambahan |

> **Catatan Validasi:** Rust dan PostgreSQL dapat digunakan untuk memenuhi kebutuhan backend dan pengelolaan data FoodSupply. Namun, kemampuan prediksi AI memerlukan model analisis tersendiri, sedangkan pemantauan stok real-time memerlukan mekanisme pembaruan data dan integrasi sumber data yang aktif.

---

## 11. Kebutuhan Antarmuka (UI/UX)

Aplikasi FoodSupply dirancang dengan konsep modern, profesional, dan responsif.

### 11.1 Identitas Visual
- **Nama aplikasi:** FoodSupply.
- **Tema warna:** Hijau, putih, dan biru.
  - **Hijau:** Melambangkan ketahanan pangan dan lingkungan.
  - **Putih:** Melambangkan kebersihan dan transparansi.
  - **Biru:** Melambangkan teknologi dan kepercayaan.

**Logo dan identitas institusi:**
- Logo Pemerintah Daerah (Pemda) ditempatkan pada bagian header.
- Logo Universitas Teknokrat Indonesia ditempatkan berdampingan dengan logo Pemda.
- Gunakan file logo resmi dengan kualitas gambar yang baik dan proporsi asli.

### 11.2 Halaman yang Harus Tersedia
1. **Halaman Login:** Form email dan password.
2. **Dashboard:** Ringkasan stok, harga, dan distribusi pangan.
3. **Halaman Stok Pangan:** Daftar komoditas dan ketersediaan stok.
4. **Halaman Harga Pangan:** Daftar harga dan grafik perubahan harga.
5. **Halaman Peta:** Peta lokasi pasar dan distributor.
6. **Halaman Prediksi:** Informasi prediksi kebutuhan pangan.
7. **Halaman Distribusi:** Data dan status pengiriman.
8. **Halaman Notifikasi:** Informasi peringatan stok dan harga.
9. **Halaman Laporan:** Rekapitulasi data pangan.

### 11.3 Footer Aplikasi
Pada seluruh halaman utama aplikasi wajib terdapat footer dengan tulisan:
> **Copyright © 2026 by Yolanda Anderi dan Dr. Erliyan Redy Susanto, M.Kom**

---

## 12. Kriteria Keberhasilan Produk

Aplikasi FoodSupply dinyatakan memenuhi kebutuhan awal apabila:
1. Pengguna dapat melakukan login dan mengakses fitur sesuai hak akses.
2. Data stok pangan dapat ditambahkan, diperbarui, dan ditampilkan.
3. Informasi harga pangan dapat ditampilkan berdasarkan pasar.
4. Lokasi pasar dan distributor dapat ditampilkan melalui peta.
5. Sistem dapat memberikan notifikasi ketika stok berada di bawah batas minimum.
6. Data distribusi dapat dicatat dan status pengirimannya diperbarui.
7. Pemerintah dapat melihat laporan stok, harga, dan distribusi.
8. Backend Rust berhasil terhubung dengan PostgreSQL.
9. Seluruh halaman dapat diakses melalui perangkat desktop dan smartphone.
10. Logo Pemda, logo Universitas Teknokrat Indonesia, dan teks copyright tampil sesuai ketentuan.

---

## 13. Tahapan Pengembangan

| Tahap | Kegiatan |
| :---: | :--- |
| **1. Analisis** | Mengidentifikasi kebutuhan pengguna dan permasalahan pangan. |
| **2. Perancangan** | Membuat desain UI/UX, ERD, dan arsitektur sistem. |
| **3. Backend** | Mengembangkan REST API menggunakan Rust. |
| **4. Database** | Membuat tabel, relasi, dan konfigurasi PostgreSQL. |
| **5. Frontend** | Mengembangkan tampilan aplikasi yang responsif. |
| **6. Integrasi** | Menghubungkan frontend, backend, dan database. |
| **7. Pengujian** | Melakukan pengujian fitur, keamanan, dan integritas data. |
| **8. Implementasi** | Melakukan deployment dan evaluasi aplikasi. |

---

## 14. Kesimpulan

FoodSupply merupakan solusi digital berbasis Smart City yang dirancang untuk meningkatkan efektivitas distribusi pangan melalui integrasi informasi stok, harga, lokasi pasar, distributor, dan pengiriman bahan pangan.

Dengan menggunakan Rust sebagai teknologi backend dan PostgreSQL sebagai database, aplikasi diharapkan memiliki sistem pengelolaan data yang terstruktur, aman, dan dapat dikembangkan sesuai kebutuhan.

Melalui fitur monitoring stok, informasi harga, pemetaan lokasi, prediksi kebutuhan pangan, dan notifikasi kelangkaan, FoodSupply diharapkan dapat membantu pemerintah menjaga stabilitas pasokan pangan sekaligus memberikan kemudahan akses informasi kepada masyarakat.

---
*FoodSupply – Smart Technology for Smarter Food Distribution.*