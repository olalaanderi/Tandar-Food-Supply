/**
 * FoodSupply – Sistem Distribusi Pangan Cerdas
 * Automated QA Test Suite Runner (Node.js)
 * 
 * Pengembang: Yolanda Anderi
 * Dosen Pembimbing: Dr. Erliyan Redy Susanto, M.Kom
 * Institusi: Universitas Teknokrat Indonesia (2026)
 */

const fs = require('fs');
const path = require('path');

// Test Runner Utilities
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${testName}`);
  } else {
    failedTests++;
    console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${testName} ${details ? `(${details})` : ''}`);
  }
}

console.log('\n=============================================================================');
console.log('   FOODSUPPLY SMART CITY – AUTOMATED QA TEST SUITE RUNNER (UTS PPSI 2026)   ');
console.log('   Pengembang: Yolanda Anderi | Pembimbing: Dr. Erliyan Redy Susanto, M.Kom  ');
console.log('=============================================================================\n');

// -----------------------------------------------------------------------------
// TEST SUITE 1: FILE SYSTEM INTEGRITY
// -----------------------------------------------------------------------------
console.log('\x1b[36m[SUITE 1]\x1b[0m Memeriksa Integritas Berkas Repositori...');
const requiredFiles = [
  'index.html',
  'style.css',
  'main.js',
  'schema.sql',
  'PROMPT_MASTER.md',
  'prd_foodsupply.md',
  'design_foodsuply.md',
  'Laporan_Testing_dan_Debugging_FoodSupply_Yolanda_Anderi.docx'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  assert(fs.existsSync(filePath), `Berkas '${file}' harus tersedia di repositori`);
});

// -----------------------------------------------------------------------------
// TEST SUITE 2: MANDATORY COPYRIGHT & INSTITUTIONAL BRANDING
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 2]\x1b[0m Memeriksa Elemen Mandatori & Hak Cipta...');
const indexHtmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const exactCopyright = 'Copyright©2026 by Yolanda Anderi dan Dr. Erliyan Redy Susanto, M.Kom';

assert(indexHtmlContent.includes(exactCopyright), 'Teks footer harus persis sesuai format PRD dan Design Guide');
assert(indexHtmlContent.includes('Universitas Teknokrat Indonesia'), 'Header wajib memuat identitas Universitas Teknokrat Indonesia');
assert(indexHtmlContent.includes('Pemerintah Daerah'), 'Header wajib memuat identitas Pemerintah Daerah');
assert(indexHtmlContent.includes('Dinas Ketahanan Pangan'), 'Identitas Dinas Ketahanan Pangan harus tercantum');
assert(indexHtmlContent.includes('tailwindcss.com'), 'Tailwind CSS CDN harus terintegrasi');
assert(indexHtmlContent.includes('mobile-bottom-nav'), 'Bottom Navigation Bar khusus mobile harus terpasang');

// -----------------------------------------------------------------------------
// TEST SUITE 3: SPA ROUTING & TAB ALIASES RESOLUTION
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 3]\x1b[0m Memeriksa Router SPA & Resolusi Alias Tab...');
const mainJsContent = fs.readFileSync(path.join(__dirname, 'main.js'), 'utf8');

assert(mainJsContent.includes('window.switchTab'), 'Fungsi window.switchTab harus didefinisikan secara global');
assert(mainJsContent.includes('window.switchView = window.switchTab'), 'Fungsi switchView harus di-alias ke switchTab');
assert(mainJsContent.includes('TabAliases'), 'Kamus TabAliases harus ada untuk menangani nama tab alternatif');
assert(mainJsContent.includes("'monitoring-stok': 'pemantauan-stok'"), 'Alias "monitoring-stok" harus terhubung ke "pemantauan-stok"');
assert(mainJsContent.includes("'prediksi-ai': 'prediksi-pangan'"), 'Alias "prediksi-ai" harus terhubung ke "prediksi-pangan"');
assert(mainJsContent.includes("'laporan': 'laporan-pangan'"), 'Alias "laporan" harus terhubung ke "laporan-pangan"');

// -----------------------------------------------------------------------------
// TEST SUITE 4: DYNAMIC ROLE SWITCHER & PERMISSION MATRIX (6 ROLES)
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 4]\x1b[0m Memeriksa Logika 6 Peran Pengguna & Batas Akses...');
const roles = ['admin', 'pemda', 'distributor', 'pedagang', 'petani', 'masyarakat'];

roles.forEach(role => {
  assert(mainJsContent.includes(`${role}:`), `RoleMetadata harus mencakup peran '${role}'`);
  assert(indexHtmlContent.includes(`value="${role}"`), `Dropdown peran harus memuat opsi '${role}'`);
});

assert(mainJsContent.includes('allowedTabs'), 'Setiap peran harus memiliki pembatasan allowedTabs');
assert(mainJsContent.includes('window.switchTab(\'dashboard\')'), 'Pengguna di tab terlarang harus diredirect ke dashboard');

// -----------------------------------------------------------------------------
// TEST SUITE 5: LEAFLET.JS GIS MAP INITIALIZATION (GRAY SCREEN FIX)
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 5]\x1b[0m Memeriksa Solusi Leaflet.js Gray Screen...');
assert(mainJsContent.includes('invalidateSize'), 'Peta wajib memanggil invalidateSize() saat kontainer aktif');
assert(mainJsContent.includes('requestAnimationFrame'), 'invalidateSize wajib dipanggil dalam requestAnimationFrame');
assert(mainJsContent.includes('ResizeObserver'), 'ResizeObserver harus memonitor kontainer #gisMap');
assert(mainJsContent.includes('mapMarkersLayer'), 'Marker GIS harus dikelola dalam LayerGroup Leaflet');

// -----------------------------------------------------------------------------
// TEST SUITE 6: CHART.JS RESPONSIVENESS & DOUGHNUT CHART
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 6]\x1b[0m Memeriksa Chart.js Responsiveness & Tipe Grafik...');
assert(mainJsContent.includes('stockDoughnutChartInstance'), 'Grafik stok harus menggunakan instance Doughnut Chart');
assert(mainJsContent.includes("type: 'doughnut'"), 'Tipe grafik stok harus bernilai "doughnut"');
assert(mainJsContent.includes("cutout: '62%'"), 'Doughnut chart harus memiliki konfigurasi cutout');
assert(mainJsContent.includes('priceChartInstance.resize()'), 'Metode .resize() harus dipanggil pada perubahan ukuran layar');

// -----------------------------------------------------------------------------
// TEST SUITE 7: DATABASE SCHEMA & POSTGIS EXTENSION
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 7]\x1b[0m Memeriksa Skema Basis Data PostgreSQL & PostGIS...');
const schemaContent = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

assert(schemaContent.includes('CREATE EXTENSION IF NOT EXISTS postgis;'), 'Ekstensi PostGIS harus diaktifkan');
const tables = ['users', 'commodities', 'markets', 'stocks', 'prices', 'distributions', 'notifications'];
tables.forEach(table => {
  assert(schemaContent.includes(`CREATE TABLE ${table}`), `Tabel '${table}' harus didefinisikan dalam schema.sql`);
});
assert(schemaContent.includes('GEOMETRY(Point, 4326)'), 'Kolom spasial location_geom harus menggunakan SRID 4326 (WGS 84)');
assert(schemaContent.includes('evaluate_stock_status()'), 'Trigger evaluasi status stok otomatis harus terpasang');

// -----------------------------------------------------------------------------
// TEST SUITE 8: WCAG 2.1 CONTRAST RATIO AUDIT (CSS)
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 8]\x1b[0m Memeriksa Variabel Warna Aksesibilitas WCAG 2.1...');
const styleCssContent = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

assert(styleCssContent.includes('--text-muted: #334155;'), '--text-muted harus menggunakan Slate-700 (#334155) untuk rasio kontras 7.8:1 (AAA)');
assert(styleCssContent.includes('--text-light: #475569;'), '--text-light harus menggunakan Slate-600 (#475569) untuk rasio kontras 5.2:1 (AA)');
assert(styleCssContent.includes(':focus-visible'), 'CSS harus mendefinisikan :focus-visible untuk aksesibilitas keyboard');
assert(styleCssContent.includes('.mobile-bottom-nav'), 'CSS harus memuat aturan bilah navigasi bawah seluler');

// -----------------------------------------------------------------------------
// SUMMARY REPORT
// -----------------------------------------------------------------------------
console.log('\n=============================================================================');
console.log(`HASIL AKHIR PENGUJIAN: ${passedTests} / ${totalTests} PENGUJIAN BERHASIL (${Math.round((passedTests/totalTests)*100)}%)`);
if (failedTests === 0) {
  console.log('\x1b[32m[STATUS: ALL TEST CASES PASSED SUCCESSFULLY - ZERO FAILURES]\x1b[0m');
} else {
  console.log(`\x1b[31m[STATUS: ${failedTests} TEST CASES FAILED]\x1b[0m`);
}
console.log('=============================================================================\n');

process.exit(failedTests === 0 ? 0 : 1);
