import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import ProductCard from '../../components/ProductCard'
import { useWishlist } from '../../utils/WishlistContext'

export default function Wishlist() {
  const { wishlist } = useWishlist()
  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b8971]">Your picks</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#20382a]">Wishlist</h1><p className="mt-2 text-sm text-[#77867b]">Simpan buah yang ingin kamu beli nanti.</p>{wishlist.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{wishlist.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <div className="mt-10 rounded-[32px] border border-dashed border-[#cfdccf] bg-white px-6 py-16 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#fff0f1] text-[#bb4b57]"><Icon name="heart" size={26}/></div><h2 className="mt-5 text-xl font-black text-[#25392c]">Belum ada wishlist</h2><p className="mt-2 text-sm text-[#7b887f]">Tekan ikon hati pada produk yang kamu suka.</p><Link to="/" className="mt-6 inline-flex rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white">Jelajah Produk</Link></div>}</div>
}
