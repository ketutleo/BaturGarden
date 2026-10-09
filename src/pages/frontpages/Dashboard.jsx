import { Link, useOutletContext } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Icon from '../../components/Icon'
import ProductCard from '../../components/ProductCard'
import { categories, featuredProductIds, products } from '../../utils/data'

const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export default function Dashboard() {
  const { searchTerm } = useOutletContext()
  const [category, setCategory] = useState('Semua')
  const [sortBy, setSortBy] = useState('popular')

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    let result = products.filter((p) => {
      const matchesQuery = !query || `${p.name} ${p.category_name}`.toLowerCase().includes(query)
      const matchesCategory = category === 'Semua' || p.category_name === category
      return matchesQuery && matchesCategory
    })
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    if (sortBy === 'popular') result = [...result].sort((a, b) => b.sold - a.sold)
    return result
  }, [searchTerm, category, sortBy])

  const featured = products.filter((p) => featuredProductIds.includes(p.id))

  return (
    <div>
      <section className="overflow-hidden bg-grid">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-[1.05fr_.95fr] md:items-center md:pb-20 md:pt-16 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e7d4] bg-white/80 px-4 py-2 text-xs font-bold text-[#477152] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#4d9657]" /> Panen pilihan minggu ini
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.03] tracking-tight text-[#193322] sm:text-5xl lg:text-6xl">Buah segar pilihan, langsung dari kebun lokal.</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#667568] sm:text-lg">Belanja jeruk, alpukat, mangga, pisang, dan buah naga dengan pengalaman belanja yang simpel, cepat, dan terasa dekat.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#produk" className="inline-flex items-center gap-2 rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(36,95,49,.18)] transition hover:-translate-y-0.5 hover:bg-[#1f542a]">Belanja Sekarang <Icon name="arrowRight" size={17} /></a>
              <a href="#kategori" className="inline-flex items-center rounded-2xl border border-[#d7e4d5] bg-white px-5 py-3.5 text-sm font-bold text-[#45624c] hover:bg-[#f9fcf8]">Lihat Kategori</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-xs font-semibold text-[#738277]">
              <span className="inline-flex items-center gap-2"><Icon name="truck" size={16} className="text-[#3d7f49]" /> Pengiriman aman</span>
              <span className="inline-flex items-center gap-2"><Icon name="shield" size={16} className="text-[#3d7f49]" /> Dipilih sebelum kirim</span>
              <span className="inline-flex items-center gap-2"><Icon name="mapPin" size={16} className="text-[#3d7f49]" /> Lokal Bali</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl md:max-w-none">
            <div className="absolute -inset-4 rounded-[40px] bg-[#dfeedd] blur-2xl" />
            <div className="relative overflow-hidden rounded-[34px] border border-white bg-white p-3 shadow-[0_35px_90px_rgba(39,75,43,.16)]">
              <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Ripe_freshly_plucked_mangoes.jpg" alt="Buah mangga segar" className="h-[320px] w-full rounded-[26px] object-cover sm:h-[400px]" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/80 bg-white/88 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c8e80]">Farm pick</p>
                    <p className="mt-1 text-lg font-black text-[#1f3927]">Freshness yang terasa sejak gigitan pertama.</p>
                  </div>
                  <div className="hidden rounded-xl bg-[#e8f3e6] px-3 py-2 text-center sm:block"><p className="text-xs font-bold text-[#42704b]">4.9/5</p><p className="text-[10px] text-[#7f8f82]">rating</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kategori" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b8971]">Pilih sesuai selera</p><h2 className="mt-2 text-3xl font-black tracking-tight text-[#20382a]">Kategori favorit</h2></div>
          <p className="text-sm text-[#7a887d]">Mulai dari citrus segar sampai buah creamy.</p>
        </div>
        <div className="mt-7 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {categories.slice(1).map((item) => (
            <button key={item} onClick={() => { setCategory(item); document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' }) }} className="shrink-0 rounded-2xl border border-[#dfe8dd] bg-white px-5 py-3 text-sm font-bold text-[#506257] transition hover:border-[#b9d2b5] hover:bg-[#f3f8f1]">{item}</button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['01', 'Dari kebun terpilih', 'Produk lokal dipilih dari buah yang siap dinikmati.'],
            ['02', 'Dikemas dengan aman', 'Kemasan sederhana, rapi, dan fokus menjaga buah tetap baik.'],
            ['03', 'Belanja tanpa ribet', 'Cari, pilih, masukkan keranjang, lalu checkout.'],
          ].map(([n, t, d]) => <div key={n} className="rounded-3xl border border-[#e1eae0] bg-white p-6 shadow-sm"><span className="text-xs font-black text-[#6e8b73]">{n}</span><h3 className="mt-3 text-lg font-black text-[#263a2d]">{t}</h3><p className="mt-2 text-sm leading-7 text-[#78877b]">{d}</p></div>)}
        </div>
      </section>

      <section className="bg-[#eef6eb] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b8971]">Pilihan toko</p><h2 className="mt-2 text-3xl font-black tracking-tight text-[#20382a]">Produk unggulan</h2></div><a href="#produk" className="hidden text-sm font-bold text-[#346b40] sm:block">Lihat katalog →</a></div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      <section id="produk" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b8971]">Katalog Batur Garden</p><h2 className="mt-2 text-3xl font-black tracking-tight text-[#20382a]">Cari buah yang kamu suka</h2><p className="mt-2 text-sm text-[#7a887d]">{filteredProducts.length} produk ditemukan.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-[#dfe8dd] bg-white px-4 py-3 text-sm font-semibold text-[#516357] outline-none focus:border-[#74a178]">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-2xl border border-[#dfe8dd] bg-white px-4 py-3 text-sm font-semibold text-[#516357] outline-none focus:border-[#74a178]">
              <option value="popular">Paling populer</option><option value="rating">Rating tertinggi</option><option value="price-asc">Harga termurah</option><option value="price-desc">Harga termahal</option>
            </select>
          </div>
        </div>

        {filteredProducts.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredProducts.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-[#cfdccf] bg-white p-12 text-center"><p className="text-lg font-black text-[#263a2d]">Produk belum ditemukan</p><p className="mt-2 text-sm text-[#7c8a7f]">Coba kata kunci atau kategori yang berbeda.</p></div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] bg-[#245f31] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Batur Garden</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Siap menikmati buah segar dari kebun lokal?</h2><p className="mt-4 text-sm leading-7 text-white/75">Pilih buah favoritmu, masukkan keranjang, lalu selesaikan checkout dalam beberapa langkah sederhana.</p><Link to="/cart" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-black text-[#245f31] hover:bg-[#f3f8f1]">Buka Keranjang <Icon name="arrowRight" size={17} /></Link></div>
        </div>
      </section>
    </div>
  )
}
