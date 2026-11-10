-- =============================================================================
-- FoodSupply – Sistem Distribusi Pangan Cerdas
-- PostgreSQL Database Schema & Seeder Script (with PostGIS Spatial Extension)
-- 
-- Pengembang: Yolanda Anderi
-- Dosen Pembimbing: Dr. Erliyan Redy Susanto, M.Kom
-- Institusi: Universitas Teknokrat Indonesia & Pemda Lampung (2026)
-- Backend Target: Rust (Axum, Tokio, SQLx, Serde, Argon2, JWT)
-- =============================================================================

-- 1. Enable PostGIS Extension for GIS Spatial Queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Drop existing tables if re-initializing (Cascade order)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS distributions CASCADE;
DROP TABLE IF EXISTS prices CASCADE;
DROP TABLE IF EXISTS stocks CASCADE;
DROP TABLE IF EXISTS markets CASCADE;
DROP TABLE IF EXISTS commodities CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =============================================================================
-- 3. TABLE DEFINITIONS
-- =============================================================================

-- 3.1 Tabel Users (Pengguna Sistem dengan 6 Hak Akses)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('admin', 'pemda', 'distributor', 'pedagang', 'petani', 'masyarakat')),
    region VARCHAR(150),
    status VARCHAR(20) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Nonaktif', 'Pending')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for authentication and role search
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- 3.2 Tabel Commodities (Master Data Komoditas Pangan Pokok)
CREATE TABLE commodities (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('Biji-bijian & Karbohidrat', 'Bumbu & Hortikultura', 'Minyak & Gula', 'Protein Hewani')),
    unit VARCHAR(30) NOT NULL DEFAULT 'Kg',
    hap NUMERIC(14, 2) NOT NULL DEFAULT 0.00, -- Harga Acuan Penjualan (HAP)
    min_stock NUMERIC(14, 2) NOT NULL DEFAULT 10.00, -- Batas Minimum Cadangan Aman (Ton)
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_commodities_category ON commodities(category);

-- 3.3 Tabel Markets (Lokasi Pasar, Gudang Distributor, & Sentra Petani)
CREATE TABLE markets (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('market', 'distributor', 'farmer')),
    address TEXT NOT NULL,
    phone VARCHAR(30),
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    -- PostGIS spatial point column (SRID 4326 for WGS 84 GPS standard)
    location_geom GEOMETRY(Point, 4326),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Spatial index using GIST for ultra-fast nearest market / distance queries
CREATE INDEX idx_markets_geom ON markets USING GIST(location_geom);

-- 3.4 Tabel Stocks (Informasi Ketersediaan Pasokan Stok Pangan)
CREATE TABLE stocks (
    id BIGSERIAL PRIMARY KEY,
    commodity_id BIGINT NOT NULL REFERENCES commodities(id) ON DELETE CASCADE,
    market_id BIGINT NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
    quantity NUMERIC(14, 2) NOT NULL DEFAULT 0.00, -- Tonase stok tersedia
    status VARCHAR(30) NOT NULL DEFAULT 'Aman' CHECK (status IN ('Aman', 'Menipis', 'Kritis')),
    endurance_days INTEGER DEFAULT 7,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_commodity_market_stock UNIQUE (commodity_id, market_id)
);

CREATE INDEX idx_stocks_commodity ON stocks(commodity_id);
CREATE INDEX idx_stocks_market ON stocks(market_id);
CREATE INDEX idx_stocks_status ON stocks(status);

-- 3.5 Tabel Prices (Pencatatan Harga Komoditas Pangan Berkala)
CREATE TABLE prices (
    id BIGSERIAL PRIMARY KEY,
    commodity_id BIGINT NOT NULL REFERENCES commodities(id) ON DELETE CASCADE,
    market_id BIGINT NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
    price NUMERIC(14, 2) NOT NULL, -- Harga eceran konsumen (Rp / Satuan)
    change_percentage NUMERIC(6, 2) DEFAULT 0.00,
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prices_comm_market ON prices(commodity_id, market_id, recorded_at DESC);

-- 3.6 Tabel Distributions (Surat Jalan & Pelacakan Logistik Pangan)
CREATE TABLE distributions (
    id BIGSERIAL PRIMARY KEY,
    do_number VARCHAR(50) UNIQUE NOT NULL,
    distributor_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    distributor_name VARCHAR(150) NOT NULL,
    commodity_id BIGINT NOT NULL REFERENCES commodities(id) ON DELETE CASCADE,
    quantity NUMERIC(14, 2) NOT NULL, -- Volume pengiriman (Ton)
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    destination_market_id BIGINT REFERENCES markets(id) ON DELETE SET NULL,
    vehicle_info VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'Menunggu Pengiriman' CHECK (status IN ('Menunggu Pengiriman', 'Dalam Perjalanan', 'Tiba di Lokasi', 'Selesai / Diterima')),
    eta TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dist_do ON distributions(do_number);
CREATE INDEX idx_dist_status ON distributions(status);

-- 3.7 Tabel Notifications (Pusat Peringatan & Pemberitahuan Sistem)
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('danger', 'warning', 'info', 'success')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notif_user ON notifications(user_id, is_read);

-- =============================================================================
-- 4. TRIGGERS & PROCEDURES (Automated Calculations & PostGIS Sync)
-- =============================================================================

-- Trigger: Automatically update location_geom from latitude and longitude
CREATE OR REPLACE FUNCTION sync_market_postgis_geom()
RETURNS TRIGGER AS $$
BEGIN
    NEW.location_geom = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_market_geom
BEFORE INSERT OR UPDATE OF latitude, longitude ON markets
FOR EACH ROW EXECUTE FUNCTION sync_market_postgis_geom();

-- Trigger: Automatically update stock status (Aman, Menipis, Kritis) based on minimum threshold
CREATE OR REPLACE FUNCTION evaluate_stock_status()
RETURNS TRIGGER AS $$
DECLARE
    min_threshold NUMERIC(14, 2);
BEGIN
    SELECT min_stock INTO min_threshold FROM commodities WHERE id = NEW.commodity_id;
    
    IF NEW.quantity < (min_threshold * 0.3) THEN
        NEW.status := 'Kritis';
        NEW.endurance_days := 2;
    ELSIF NEW.quantity < (min_threshold * 0.7) THEN
        NEW.status := 'Menipis';
        NEW.endurance_days := 5;
    ELSE
        NEW.status := 'Aman';
        NEW.endurance_days := 15;
    END IF;
    
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_evaluate_stock
BEFORE INSERT OR UPDATE OF quantity ON stocks
FOR EACH ROW EXECUTE FUNCTION evaluate_stock_status();

-- =============================================================================
-- 5. INITIAL SEED DATA (Data Realistis Wilayah Lampung 2026)
-- =============================================================================

-- 5.1 Seeding Users
INSERT INTO users (id, name, email, password_hash, role, region, status) VALUES
(1, 'Yolanda Anderi', 'yolanda@foodsupply.go.id', '$argon2id$v=19$m=19456,t=2,p=1$ZGF0YXNhbHQxMjM0NTY$bW9jaw', 'admin', 'Kantor Pusat Pemda', 'Aktif'),
(2, 'Dr. Erliyan Redy Susanto, M.Kom', 'erliyan@teknokrat.ac.id', '$argon2id$v=19$m=19456,t=2,p=1$ZGF0YXNhbHQxMjM0NTY$bW9jaw', 'pemda', 'Dinas Ketahanan Pangan Provinsi', 'Aktif'),
(3, 'Budi Santoso', 'distribusi@pangansejahtera.co.id', '$argon2id$v=19$m=19456,t=2,p=1$ZGF0YXNhbHQxMjM0NTY$bW9jaw', 'distributor', 'Gudang Logistik Panjang', 'Aktif'),
(4, 'Hj. Siti Rohmah', 'kios.siti@pasirgintung.id', '$argon2id$v=19$m=19456,t=2,p=1$ZGF0YXNhbHQxMjM0NTY$bW9jaw', 'pedagang', 'Pasar Pasir Gintung (Blok B-12)', 'Aktif'),
(5, 'Pak Wayan Sudarma', 'poktan.sejahtera@tanggamus.id', '$argon2id$v=19$m=19456,t=2,p=1$ZGF0YXNhbHQxMjM0NTY$bW9jaw', 'petani', 'Sentra Hortikultura Tanggamus', 'Aktif'),
(6, 'Ahmad Faisal', 'afaisal26@gmail.com', '$argon2id$v=19$m=19456,t=2,p=1$ZGF0YXNhbHQxMjM0NTY$bW9jaw', 'masyarakat', 'Kec. Way Halim', 'Aktif');

-- 5.2 Seeding Commodities
INSERT INTO commodities (id, code, name, category, unit, hap, min_stock) VALUES
(1, 'KMD-001', 'Beras Premium', 'Biji-bijian & Karbohidrat', 'Kg', 14900.00, 60.00),
(2, 'KMD-002', 'Beras Medium', 'Biji-bijian & Karbohidrat', 'Kg', 13100.00, 75.00),
(3, 'KMD-003', 'Cabai Rawit Merah', 'Bumbu & Hortikultura', 'Kg', 42000.00, 20.00),
(4, 'KMD-004', 'Bawang Merah Brebes', 'Bumbu & Hortikultura', 'Kg', 36000.00, 25.00),
(5, 'KMD-005', 'Bawang Putih Honan', 'Bumbu & Hortikultura', 'Kg', 38000.00, 20.00),
(6, 'KMD-006', 'Minyak Goreng Kemasan', 'Minyak & Gula', 'Liter', 17500.00, 45.00),
(7, 'KMD-007', 'Gula Pasir Konsumsi', 'Minyak & Gula', 'Kg', 17500.00, 35.00),
(8, 'KMD-008', 'Telur Ayam Ras', 'Protein Hewani', 'Kg', 29000.00, 30.00),
(9, 'KMD-009', 'Daging Sapi Segar', 'Protein Hewani', 'Kg', 135000.00, 12.00),
(10, 'KMD-010', 'Daging Ayam Broiler', 'Protein Hewani', 'Kg', 37000.00, 22.00);

-- 5.3 Seeding Markets (GPS Coordinates for Bandar Lampung & surrounding agricultural regions)
INSERT INTO markets (id, name, type, address, phone, latitude, longitude) VALUES
(1, 'Pasar Pasir Gintung', 'market', 'Jl. Imam Bonjol, Tj. Karang Pusat, Bandar Lampung', '0721-254120', -5.4052000, 105.2571000),
(2, 'Pasar Kangkung', 'market', 'Jl. Hasanuddin, Teluk Betung Selatan, Bandar Lampung', '0721-482110', -5.4411000, 105.2635000),
(3, 'Pasar Tamin', 'market', 'Jl. Raden Intan, Tanjung Karang Barat, Bandar Lampung', '0721-263445', -5.4120000, 105.2480000),
(4, 'Pasar Way Halim', 'market', 'Jl. Kimaja, Way Halim, Bandar Lampung', '0721-705882', -5.3905000, 105.2750000),
(5, 'Gudang Bulog Divre Lampung', 'distributor', 'Jl. Soekarno-Hatta By Pass, Bandar Lampung', '0721-315600', -5.4320000, 105.2950000),
(6, 'PT Pangan Sejahtera Logistik', 'distributor', 'Kawasan Pergudangan Panjang, Bandar Lampung', '0721-329881', -5.4210000, 105.3120000),
(7, 'Sentra Hortikultura Tanggamus (Petani)', 'farmer', 'Kec. Gisting, Tanggamus, Lampung', '0812-7729-1102', -5.4500000, 105.2200000),
(8, 'Lumbung Padi Metro (Poktan)', 'farmer', 'Metro Kibang, Lampung', '0813-8821-4560', -5.3700000, 105.3100000);

-- 5.4 Seeding Stocks
INSERT INTO stocks (commodity_id, market_id, quantity) VALUES
(1, 1, 74.20),  -- Beras Premium di Pasir Gintung (Aman)
(2, 5, 450.00), -- Beras Medium di Gudang Bulog (Aman)
(3, 1, 4.80),   -- Cabai Rawit di Pasir Gintung (Menipis)
(3, 2, 2.10),   -- Cabai Rawit di Pasar Kangkung (Kritis)
(4, 3, 8.50),   -- Bawang Merah di Pasar Tamin (Menipis)
(6, 6, 88.00),  -- Minyak Goreng di PT Pangan Sejahtera (Aman)
(7, 4, 18.40),  -- Gula Pasir di Pasar Way Halim (Menipis)
(8, 2, 6.20),   -- Telur Ayam di Pasar Kangkung (Menipis)
(9, 1, 9.80);   -- Daging Sapi di Pasir Gintung (Aman)

-- 5.5 Seeding Prices
INSERT INTO prices (commodity_id, market_id, price, change_percentage) VALUES
(1, 1, 15200.00, 1.20),
(1, 2, 15000.00, 0.00),
(1, 3, 15100.00, 0.50),
(1, 4, 15300.00, 1.50),
(3, 1, 52000.00, 6.50),
(3, 2, 54000.00, 8.40),
(3, 3, 53000.00, 7.00),
(3, 4, 55000.00, 9.00),
(6, 1, 18000.00, 0.00),
(6, 2, 18000.00, 0.00);

-- 5.6 Seeding Distributions
INSERT INTO distributions (do_number, distributor_id, distributor_name, commodity_id, quantity, origin, destination, vehicle_info, status) VALUES
('DO-2026-1101', 3, 'PT Pangan Sejahtera', 3, 3.50, 'Sentra Gisting', 'Pasar Pasir Gintung', 'Colt Diesel BE-8921-YN', 'Dalam Perjalanan'),
('DO-2026-1102', 3, 'Bulog Divre Lampung', 1, 15.00, 'Gudang Bulog By Pass', 'Pasar Kangkung', 'Fuso BE-9012-AU', 'Tiba di Lokasi'),
('DO-2026-1103', 3, 'PT Pangan Sejahtera', 6, 8.00, 'Kawasan Panjang', 'Pasar Way Halim', 'Engkel BE-7612-DB', 'Selesai / Diterima'),
('DO-2026-1104', 3, 'CV Berkah Pangan', 4, 4.20, 'Lumbung Metro', 'Pasar Tamin', 'Colt Diesel BE-8134-CG', 'Menunggu Pengiriman');

-- 5.7 Seeding Notifications
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
(1, 'Stok Kritis: Cabai Rawit Merah', 'Pasokan Cabai Rawit di Pasar Kangkung tersisa 2.1 Ton (Ketahanan < 2 hari). Segera lakukan intervensi distribusi.', 'danger', FALSE),
(1, 'Lonjakan Harga: Cabai Rawit (+8.4%)', 'Harga eceran menyentuh Rp 53.500/Kg, melampaui batas toleransi fluktuasi HAP.', 'warning', FALSE),
(1, 'Pemberitahuan Distribusi Berjalan', 'Pengiriman DO-2026-1101 (Beras 15 Ton) telah tiba di Pasar Kangkung.', 'info', FALSE),
(1, 'Sinkronisasi Backend Rust', 'PostgreSQL PostGIS spatial indexing berhasil mengupdate 8 koordinat titik komoditas.', 'success', TRUE);

-- Update auto-increment sequences to prevent ID collisions on new inserts
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('commodities_id_seq', (SELECT MAX(id) FROM commodities));
SELECT setval('markets_id_seq', (SELECT MAX(id) FROM markets));
SELECT setval('stocks_id_seq', (SELECT MAX(id) FROM stocks));
SELECT setval('prices_id_seq', (SELECT MAX(id) FROM prices));
SELECT setval('distributions_id_seq', (SELECT MAX(id) FROM distributions));
SELECT setval('notifications_id_seq', (SELECT MAX(id) FROM notifications));
