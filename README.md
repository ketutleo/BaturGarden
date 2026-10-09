# Batur Garden — React E-Commerce sampai Evaluasi 2.5

Project frontend e-commerce bertema buah lokal Batur Garden. Struktur dan konsep mengikuti materi praktikum React + Tailwind CSS, lalu dikembangkan dengan branding dan UI yang lebih modern.

## Teknologi
- React JS
- Vite
- React Router DOM
- Tailwind CSS
- useState
- useContext / Context API
- Functional Components
- Reusable Components
- Dummy Data Lokal
- Responsive Design

## Demo Login
Customer: `user@baturgarden.com` / `user123`

Admin: `admin@baturgarden.com` / `admin123`

## Route
- `/`
- `/product/:id`
- `/cart`
- `/wishlist`
- `/checkout`
- `/login`
- `/admin/dashboard`
- `/admin/products`
- `/admin/orders`
- `/admin/users`
- `/admin/about`

## Pemetaan ke Modul sampai 2.5
- Persiapan: Vite + React + Tailwind CSS.
- User Flow: Dashboard → Product Detail → Cart → Checkout.
- Main Layout: `src/layouts/MainLayout.jsx` + `Outlet`.
- Managing State: `ProductDetail.jsx` memakai `useState` untuk rating & review.
- UseContext Provider: `CartContext.jsx` dengan `createContext`, `useContext`, dan `useState`.
- Admin Layout: `AdminLayout.jsx` + `Sidebar.jsx` + nested routing.
- Evaluasi 2.5: React, NPM, Tailwind, frontpage routing, state, Context API, dan halaman backpage/admin telah disediakan.

## Catatan Foto Produk
Gambar katalog menggunakan foto buah nyata, bukan ilustrasi, bukan vector, dan bukan `picsum.photos`. Mayoritas foto menggunakan Wikimedia Commons dengan halaman sumber berikut:
- Jeruk Keprok: https://commons.wikimedia.org/wiki/File:Jeruk_keprok_(citrus_reticulata).jpg
- Jeruk Siam (foto referensi mandarin): https://commons.wikimedia.org/wiki/File:Mandarin_Orange.jpg
- Alpukat Hass: https://commons.wikimedia.org/wiki/File:Avocado_Hass_-_single_and_halved.jpg
- Mangga Kiojay (foto referensi mangga): https://commons.wikimedia.org/wiki/File:Mango_(1).jpg
- Pisang Susu (foto referensi pisang): https://commons.wikimedia.org/wiki/File:Ripe-bananas.jpg
- Buah Naga Merah: https://commons.wikimedia.org/wiki/File:Red_dragon_fruit.jpg
- Alpukat Red V (foto referensi alpukat): https://commons.wikimedia.org/wiki/File:Avocado_with_cross_section_edit.jpg

## Menjalankan
```bash
npm install
npm run dev
```

Build produksi:
```bash
npm run build
```

## Catatan
Data produk dan transaksi masih dummy/frontend. CRUD admin memodifikasi state lokal selama halaman aktif dan belum terhubung database atau API.
