# morphic. - Architecture & Implementation Blueprint

## 1. Rekomendasi Mobile Tech Stack
Untuk mendeploy aplikasi ini ke skala produksi (termasuk Cloud Run), berikut adalah rekomendasi stack yang optimal:
*   **Front-End (Mobile):** React Native dengan Expo. Memungkinkan kompilasi ke iOS dan Android dari satu basis kode. (Dalam prototipe ini, kita menggunakan React SPA sebagai representasi PWA/Mobile Web).
*   **UI/UX Framework:** Tailwind CSS (via NativeWind untuk React Native) untuk styling yang konsisten dengan desain "Cosmetic Earth".
*   **Back-End:** Node.js dengan NestJS (TypeScript). Sangat terstruktur, scalable, dan mudah di-deploy ke **Google Cloud Run** menggunakan Docker.
*   **Database:** PostgreSQL (via Google Cloud SQL). Relasional, kuat untuk transaksi poin dan logistik. ORM menggunakan Prisma atau TypeORM.
*   **AI & Computer Vision:** Google Gemini API (`gemini-2.5-flash`) untuk analisis gambar botol kosmetik dan ekstraksi data material.
*   **Maps & Geolocation:** Google Maps Platform (Maps JavaScript API / SDK for Android/iOS) untuk fitur Eco-Box drop-off.
*   **Authentication:** Firebase Authentication (Google & TikTok OAuth).

## 2. Skema Database Lengkap (PostgreSQL)

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    total_points INTEGER DEFAULT 0,
    avatar_level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Catalog (Reference for AI)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    material_type VARCHAR(50), -- e.g., 'Acrylic', 'PP', 'Multi-layer'
    base_point_value INTEGER NOT NULL
);

-- Transactions (Logistics & Points)
CREATE TYPE transaction_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE logistics_type AS ENUM ('ECO_BOX', 'ECO_PICK');

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    type logistics_type NOT NULL,
    status transaction_status DEFAULT 'PENDING',
    total_items INTEGER NOT NULL,
    total_weight_grams INTEGER,
    tracking_code VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transaction Items (Individual Bottles)
CREATE TABLE transaction_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES transactions(id),
    product_id UUID REFERENCES products(id), -- Can be null if AI couldn't match exactly
    ai_detected_brand VARCHAR(255),
    ai_detected_material VARCHAR(50),
    estimated_points INTEGER NOT NULL,
    exterior_image_url TEXT NOT NULL,
    interior_image_url TEXT NOT NULL -- Anti-fraud proof
);

-- Wallet / Impact Tracker Logs
CREATE TABLE point_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    transaction_id UUID REFERENCES transactions(id),
    points_added INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Panduan Implementasi AI Scanner & State Logic (Pending -> Approved)

**Langkah 1: Front-End AI Scanning (Kamera)**
1. Pengguna membuka fitur "Scan & Drop".
2. Aplikasi mengambil foto eksterior botol. Gambar diubah ke Base64.
3. Front-End memanggil endpoint backend `/api/scan`.
4. Backend meneruskan gambar ke **Google Gemini API** dengan prompt terstruktur (JSON Schema) untuk mengidentifikasi merek, jenis plastik, dan estimasi poin.
5. Pengguna diminta mengambil foto kedua (interior botol) untuk verifikasi anti-fraud (memastikan sudah dibilas/kosong).

**Langkah 2: Submit Transaksi (State: PENDING)**
1. Pengguna memilih metode logistik (Eco-Box atau Eco-Pick).
2. Front-End mengirim payload ke backend: `{ items: [...], logistics: 'ECO_BOX' }`.
3. Backend membuat record di tabel `transactions` dengan status `PENDING`. Poin **belum** ditambahkan ke `users.total_points`.
4. Aplikasi menampilkan status "Pending" di halaman Profile.

**Langkah 3: Verifikasi Gudang (State: APPROVED)**
1. Karung sampah tiba di gudang Morphic.
2. Petugas gudang menggunakan aplikasi internal untuk memindai QR Code (tracking_code) pada karung.
3. Petugas memverifikasi fisik botol sesuai dengan foto interior (anti-fraud) di database.
4. Petugas menekan "Approve".
5. Backend mengupdate `transactions.status = 'APPROVED'`.
6. Backend memicu fungsi (Database Trigger / Service) untuk menambahkan poin ke `users.total_points` dan mencatat di `point_logs`.
7. Backend mengirim Push Notification ke pengguna: "Yeay! 50 DropPoints kamu sudah cair!".
8. Level Eco-Avatar pengguna diperbarui berdasarkan total poin baru.
