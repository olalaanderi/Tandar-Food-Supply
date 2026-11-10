# MASTER PROMPT STITCH AI: FoodSupply – Sistem Distribusi Pangan Cerdas

Bertindaklah sebagai **Senior UI/UX Designer** dan **Product Designer** yang berpengalaman dalam merancang aplikasi Smart City. Buat desain UI/UX aplikasi web responsif bernama **FoodSupply – Sistem Distribusi Pangan Cerdas**, yaitu platform digital untuk membantu pemerintah dan masyarakat memantau ketersediaan stok, harga, serta distribusi bahan pangan.

---

## 1. Konsep dan Identitas Desain
Gunakan desain modern, profesional, minimalis, dan mudah digunakan. Terapkan kombinasi warna:
- **Hijau (`#004e34`)**: Warna utama yang merepresentasikan pangan dan ketahanan pangan.
- **Putih (`#ffffff`)**: Warna latar untuk memberikan kesan bersih dan rapi.
- **Biru (`#0f6848` / pendukung)**: Warna pendukung yang merepresentasikan teknologi dan kepercayaan.

Gunakan tipografi yang mudah dibaca (*Plus Jakarta Sans* atau sejenisnya), ikon yang konsisten, komponen UI yang seragam, serta tata letak yang rapi. Desain harus responsif untuk desktop, tablet, dan smartphone.

---

## 2. Desain Berdasarkan Enam Jenis Pengguna

### A. Administrator
Buat dashboard administrator untuk mengelola keseluruhan sistem, meliputi:
- Ringkasan jumlah pengguna dan aktivitas sistem.
- Manajemen akun dan hak akses pengguna.
- Manajemen data komoditas pangan.
- Manajemen data pasar dan distributor.
- Pemantauan stok dan harga pangan.
- Pengelolaan notifikasi dan laporan.
- Pengaturan sistem.

### B. Pemerintah Daerah (Pemda)
Buat dashboard khusus pemerintah yang menampilkan:
- Statistik ketersediaan bahan pangan.
- Grafik perubahan harga komoditas.
- Peta persebaran stok pangan berdasarkan wilayah.
- Informasi wilayah yang mengalami kekurangan stok.
- Prediksi kebutuhan dan potensi kelangkaan pangan.
- Pemantauan distribusi pangan.
- Laporan kondisi pangan berdasarkan wilayah dan periode.

### C. Distributor
Buat dashboard distributor yang menyediakan:
- Informasi stok pangan yang dimiliki.
- Formulir pembaruan stok.
- Daftar permintaan distribusi.
- Informasi asal dan tujuan pengiriman.
- Pelacakan status pengiriman.
- Riwayat distribusi.
- Notifikasi permintaan dan perubahan status pengiriman.

### D. Pedagang
Buat dashboard pedagang yang menyediakan:
- Informasi stok komoditas di toko atau pasar.
- Formulir pembaruan stok dan harga.
- Daftar harga bahan pangan.
- Riwayat perubahan harga.
- Informasi ketersediaan barang dari distributor.
- Notifikasi perubahan harga dan stok.

### E. Petani/Produsen
Buat dashboard petani atau produsen yang menyediakan:
- Informasi hasil produksi pangan.
- Formulir pembaruan jumlah hasil panen.
- Data komoditas yang tersedia.
- Informasi permintaan dari distributor.
- Informasi lokasi pasar dan distributor.
- Riwayat penyaluran hasil produksi.

### F. Masyarakat
Buat halaman pengguna umum yang menyediakan:
- Daftar harga bahan pangan terbaru.
- Informasi ketersediaan bahan pokok.
- Pencarian komoditas berdasarkan nama.
- Peta lokasi pasar terdekat.
- Perbandingan harga antar pasar.
- Informasi tren perubahan harga.
- Notifikasi perubahan harga atau ketersediaan pangan.

---

## 3. Halaman Utama yang Harus Dibuat
Rancang halaman-halaman berikut dan pastikan semuanya saling terhubung:
1. **Landing Page**: Pengenalan FoodSupply, manfaat, fitur utama, dan tombol login.
2. **Login**: Formulir email dan password.
3. **Registrasi**: Formulir pendaftaran pengguna.
4. **Dashboard**: Tampilan berbeda berdasarkan peran pengguna.
5. **Manajemen Pengguna**: Pengelolaan akun dan hak akses.
6. **Data Komoditas**: Daftar dan pengelolaan bahan pangan.
7. **Pemantauan Stok**: Informasi jumlah stok berdasarkan lokasi.
8. **Informasi Harga**: Tabel dan grafik perubahan harga pangan.
9. **Peta GIS**: Lokasi pasar, distributor, dan persebaran stok.
10. **Prediksi Pangan**: Grafik prediksi kebutuhan dan potensi kekurangan stok.
11. **Distribusi**: Daftar pengiriman dan status distribusi.
12. **Notifikasi**: Daftar pemberitahuan sistem.
13. **Laporan**: Visualisasi dan ringkasan data pangan.

---

## 4. Komponen UI/UX
Gunakan komponen yang sesuai dengan fungsi setiap halaman, seperti:
- Sidebar navigasi dan top navigation bar.
- Kartu statistik (*summary cards*).
- Tabel data dengan fitur pencarian dan filter.
- Grafik batang, garis, dan lingkaran.
- Peta interaktif berbasis GIS.
- Formulir input dan tombol aksi.
- Badge status untuk stok dan distribusi.
- Notifikasi dan dialog konfirmasi.
- Profil dan pengaturan akun.

---

## 5. Navigasi dan Hak Akses
Buat navigasi yang menyesuaikan peran pengguna. Setiap pengguna hanya dapat melihat menu dan melakukan aktivitas sesuai hak aksesnya. Pastikan alur berpindah halaman jelas, tombol memiliki fungsi yang sesuai, serta tampilan setiap dashboard mencerminkan kebutuhan masing-masing pengguna.

---

## 6. Identitas Institusi
Sediakan tempat untuk menampilkan:
- Logo resmi Pemerintah Daerah.
- Logo Universitas Teknokrat Indonesia.

Letakkan kedua logo pada bagian header atau area identitas aplikasi secara proporsional. Gunakan aset logo resmi, bukan logo hasil rekayasa.

Tambahkan footer pada seluruh halaman dengan tulisan persis:
`Copyright©2026 by Yolanda Anderi dan Dr. Erliyan Redy Susanto, M.Kom`

---

## 7. Hasil Akhir yang Diharapkan
Hasilkan desain UI/UX FoodSupply secara lengkap dengan halaman yang saling terhubung, konsistensi visual, navigasi yang mudah dipahami, serta tampilan yang sesuai dengan karakteristik enam jenis pengguna. Prioritaskan desain dashboard dan halaman utama setiap peran. Gunakan data contoh yang realistis untuk mengisi tabel, grafik, dan kartu statistik. Buat desain yang profesional, menarik, mudah dipahami, dan dapat dijadikan acuan dalam proses implementasi aplikasi menggunakan **Rust** sebagai backend dan **PostgreSQL** sebagai database.

Pastikan desain yang dihasilkan bukan hanya berupa satu halaman dashboard, tetapi merupakan satu kesatuan rancangan aplikasi FoodSupply yang mencakup seluruh halaman dan alur penggunaannya.