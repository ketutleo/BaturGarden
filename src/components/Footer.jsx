export default function Footer() {
  return (
    <footer id="tentang" className="border-t border-[#e2ebe0] bg-[#183422] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
        <div>
          <p className="text-xl font-black">Batur Garden</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/70">Toko buah lokal dengan pilihan segar untuk menemani kebutuhan harianmu. Dari kebun, dipilih dengan hati, sampai ke rumah.</p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Frontend React + Tailwind CSS · Praktikum sampai 2.5</p>
        </div>
        <div>
          <p className="font-bold">Belanja</p>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <a href="#produk" className="block hover:text-white">Semua Produk</a>
            <a href="#kategori" className="block hover:text-white">Kategori</a>
            <a href="/cart" className="block hover:text-white">Keranjang</a>
            <a href="/wishlist" className="block hover:text-white">Wishlist</a>
          </div>
        </div>
        <div>
          <p className="font-bold">Tentang</p>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>Kintamani, Bali</p>
            <p>Senin–Sabtu · 08.00–18.00</p>
            <p>Freshness first · Local always</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/45">© 2026 Batur Garden. Dibuat untuk pembelajaran frontend e-commerce.</div>
    </footer>
  )
}
