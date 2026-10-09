import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Icon from '../../components/Icon'
import { products } from '../../utils/data'
import { useCart } from '../../utils/CartContext'
import { useWishlist } from '../../utils/WishlistContext'

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export default function ProductDetail() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state || products.find((item) => String(item.id) === String(id))
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [reviews, setReviews] = useState([
    { id: 1, rating: 5, review: 'Buahnya segar dan sampai dalam kondisi bagus.' },
    { id: 2, rating: 5, review: 'Rasanya enak, kemasan juga rapi.' },
  ])
  const [feedback, setFeedback] = useState('')

  if (!product) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-2xl font-black">Produk tidak ditemukan</h1><Link to="/" className="mt-4 inline-block font-bold text-[#2c6d38]">Kembali ke beranda</Link></div>
  }

  const wished = isWishlisted(product.id)

  const handleAdd = () => {
    addToCart(product, qty)
    setFeedback(`${product.name} ditambahkan ke keranjang.`)
    window.setTimeout(() => setFeedback(''), 1800)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating || !review.trim()) {
      setFeedback('Pilih rating dan tulis review terlebih dahulu.')
      return
    }
    setReviews((prev) => [...prev, { id: Date.now(), rating, review: review.trim() }])
    setRating(0)
    setReview('')
    setFeedback('Review berhasil ditambahkan.')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#7a887d]"><Link to="/" className="font-semibold hover:text-[#2b6937]">Beranda</Link><span>/</span><span>{product.category_name}</span><span>/</span><span className="font-semibold text-[#435548]">{product.name}</span></div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
        <div className="rounded-[34px] border border-[#e1eae0] bg-white p-3 shadow-sm"><img src={product.img} alt={product.name} className="aspect-square w-full rounded-[28px] object-cover" /></div>
        <div>
          <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#eaf5e8] px-3 py-1 text-xs font-bold text-[#41734c]">{product.badge}</span><span className="rounded-full bg-[#f4f7f3] px-3 py-1 text-xs font-semibold text-[#708073]">{product.category_name}</span></div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#1f3525]">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4"><span className="inline-flex items-center gap-1.5 font-bold text-[#425849]"><Icon name="star" size={18} className="fill-[#e8aa2e] text-[#e8aa2e]" />{product.rating} / 5</span><span className="text-sm text-[#809082]">{product.sold} terjual</span><span className="text-sm text-[#809082]">Stok {product.stock}</span></div>
          <p className="mt-6 text-3xl font-black tracking-tight text-[#245f31]">{rupiah(product.price)} <span className="text-base font-semibold text-[#7d8a7f]">/ {product.unit}</span></p>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#6f7f73]">{product.description}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#f2f7ef] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#78907c]">Asal</p><p className="mt-1 font-bold text-[#2d4433]">{product.origin}</p></div><div className="rounded-2xl bg-[#f2f7ef] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#78907c]">Kemasan</p><p className="mt-1 font-bold text-[#2d4433]">{product.unit}</p></div><div className="rounded-2xl bg-[#f2f7ef] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#78907c]">Pengiriman</p><p className="mt-1 font-bold text-[#2d4433]">Aman & rapi</p></div></div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-2xl border border-[#dce6da] bg-white"><button onClick={() => setQty((v) => Math.max(1, v - 1))} className="grid h-12 w-12 place-items-center text-[#48614f] hover:bg-[#f4f8f2]"><Icon name="minus" size={17} /></button><span className="w-12 text-center text-sm font-bold">{qty}</span><button onClick={() => setQty((v) => Math.min(product.stock, v + 1))} className="grid h-12 w-12 place-items-center text-[#48614f] hover:bg-[#f4f8f2]"><Icon name="plus" size={17} /></button></div>
            <button onClick={handleAdd} className="inline-flex min-w-[210px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#1f542a]"><Icon name="cart" size={18} />Tambah ke Keranjang</button>
            <button onClick={() => toggleWishlist(product)} className={`grid h-12 w-12 place-items-center rounded-2xl border ${wished ? 'border-[#f0cbd0] bg-[#fff2f3] text-[#bb4b57]' : 'border-[#dce6da] text-[#53655a] hover:bg-[#f7faf5]'}`} aria-label="Wishlist"><Icon name="heart" size={20} className={wished ? 'fill-current' : ''} /></button>
          </div>
          {feedback && <div className="mt-4 rounded-2xl border border-[#cde1c9] bg-[#eff8ed] px-4 py-3 text-sm font-semibold text-[#356741]">{feedback}</div>}
          <button onClick={() => navigate('/cart')} className="mt-4 text-sm font-bold text-[#3e7048] hover:underline">Lihat keranjang →</button>
        </div>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-3xl border border-[#e1eae0] bg-white p-6"><h2 className="text-xl font-black text-[#23382a]">Tentang produk</h2><div className="mt-5 space-y-4 text-sm leading-7 text-[#728075]"><p>Produk dipilih dari buah yang siap dikonsumsi dan dikemas dengan perhatian pada kondisi saat dikirim.</p><p>Foto pada katalog adalah foto buah nyata. Untuk beberapa jenis lokal, gambar digunakan sebagai foto referensi varietas sejenis.</p></div></div>
        <div className="rounded-3xl border border-[#e1eae0] bg-white p-6"><div className="flex items-center justify-between"><div><h2 className="text-xl font-black text-[#23382a]">Rating & Review</h2><p className="mt-1 text-sm text-[#809082]">Bagikan pengalaman setelah menikmati produk.</p></div><div className="text-right"><p className="text-2xl font-black text-[#2c6638]">{product.rating}</p><p className="text-xs text-[#829184]">rating produk</p></div></div>
          <div className="mt-6 border-t border-[#edf2eb] pt-6">
            {reviews.map((item) => <div key={item.id} className="border-b border-[#edf2eb] pb-5 pt-5 first:pt-0"><div className="flex items-center gap-1">{[1,2,3,4,5].map((star) => <Icon key={star} name="star" size={15} className={star <= item.rating ? 'fill-[#e8aa2e] text-[#e8aa2e]' : 'text-[#d6ddd6]'} />)}</div><p className="mt-3 text-sm leading-7 text-[#657369]">{item.review}</p></div>)}
          </div>
          <form onSubmit={handleSubmit} className="mt-7 rounded-2xl bg-[#f6faf4] p-5"><p className="font-black text-[#2d4433]">Tambah review</p><div className="mt-4 flex gap-2">{[1,2,3,4,5].map((star) => <button type="button" key={star} onClick={() => setRating(star)} className="transition hover:scale-105" aria-label={`Rating ${star}`}><Icon name="star" size={24} className={star <= rating ? 'fill-[#e8aa2e] text-[#e8aa2e]' : 'text-[#cad5ca]'} /></button>)}</div><textarea value={review} onChange={(e) => setReview(e.target.value)} rows="3" placeholder="Tulis pengalaman kamu..." className="mt-4 w-full rounded-2xl border border-[#dbe5da] bg-white px-4 py-3 text-sm outline-none focus:border-[#74a178]" /><button type="submit" className="mt-3 rounded-2xl bg-[#245f31] px-5 py-3 text-sm font-bold text-white hover:bg-[#1f542a]">Kirim Review</button></form>
        </div>
      </section>
    </div>
  )
}
