import { Link } from 'react-router-dom'
import Icon from './Icon'
import { useCart } from '../utils/CartContext'
import { useWishlist } from '../utils/WishlistContext'
import { useState } from 'react'

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export default function ProductCard({ p }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [added, setAdded] = useState(false)
  const wished = isWishlisted(p.id)

  const handleAdd = () => {
    addToCart(p)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e0e9df] bg-white shadow-[0_10px_30px_rgba(38,78,44,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(38,78,44,.10)]">
      <div className="relative overflow-hidden bg-[#f2f7ef]">
        <img src={p.img} alt={p.name} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#3d6f46] backdrop-blur">{p.badge}</span>
        <button
          type="button"
          onClick={() => toggleWishlist(p)}
          className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition ${wished ? 'text-[#bb4b57]' : 'text-[#65806a] hover:text-[#bb4b57]'}`}
          aria-label={wished ? `Hapus ${p.name} dari wishlist` : `Tambahkan ${p.name} ke wishlist`}
        >
          <Icon name="heart" size={18} className={wished ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#849488]">{p.category_name}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#415a48]"><Icon name="star" size={14} className="fill-[#e8aa2e] text-[#e8aa2e]" />{p.rating}</span>
        </div>
        <h3 className="line-clamp-2 text-lg font-bold text-[#1f3325]">{p.name}</h3>
        <p className="mt-1 text-xs text-[#7f8f82]">{p.origin} · {p.unit}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-[#285c34]">{rupiah(p.price)}</p>
            <p className="mt-1 text-xs text-[#829184]">Stok {p.stock}</p>
          </div>
          <Link to={`/product/${p.id}`} state={p} className="text-sm font-semibold text-[#42704b] hover:underline">Detail</Link>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-5 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${added ? 'bg-[#255e32] text-white' : 'bg-[#eaf5e8] text-[#2d6b38] hover:bg-[#dff0dc]'}`}
        >
          {added ? <><Icon name="check" size={17} />Ditambahkan</> : <><Icon name="cart" size={17} />Tambah ke Keranjang</>}
        </button>
      </div>
    </article>
  )
}
