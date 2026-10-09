import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import Icon from './Icon'
import SearchBar from './SearchBar'
import { useCart } from '../utils/CartContext'
import { useWishlist } from '../utils/WishlistContext'
import { useAuth } from '../utils/AuthContext'

const navClass = ({ isActive }) => `text-sm font-semibold transition ${isActive ? 'text-[#245f31]' : 'text-[#546359] hover:text-[#245f31]'}`

export default function Navbar({ searchTerm, setSearchTerm }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4ece2] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#245f31] text-white shadow-sm">
            <span className="text-lg font-black">BG</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-base font-black leading-none tracking-tight text-[#1d3725]">Batur Garden</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#76907a]">Fresh · Local · Bali</p>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 md:block">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">
          <NavLink to="/" className={navClass}>Beranda</NavLink>
          <a href="#produk" className="text-sm font-semibold text-[#546359] hover:text-[#245f31]">Produk</a>
          <a href="#kategori" className="text-sm font-semibold text-[#546359] hover:text-[#245f31]">Kategori</a>
          <a href="#tentang" className="text-sm font-semibold text-[#546359] hover:text-[#245f31]">Tentang</a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/wishlist" className="relative grid h-10 w-10 place-items-center rounded-xl text-[#52675a] transition hover:bg-[#f1f6ef]" aria-label="Wishlist">
            <Icon name="heart" size={19} />
            {wishlist.length > 0 && <span className="absolute right-0 top-0 grid min-h-4 min-w-4 -translate-y-1/3 translate-x-1/3 place-items-center rounded-full bg-[#bb4b57] px-1 text-[9px] font-bold text-white">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-xl text-[#52675a] transition hover:bg-[#f1f6ef]" aria-label="Keranjang">
            <Icon name="cart" size={19} />
            {cartCount > 0 && <span className="absolute right-0 top-0 grid min-h-4 min-w-4 -translate-y-1/3 translate-x-1/3 place-items-center rounded-full bg-[#245f31] px-1 text-[9px] font-bold text-white">{cartCount}</span>}
          </Link>

          <div className="hidden sm:block">
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'admin' && <Link to="/admin/dashboard" className="rounded-xl bg-[#eef6ec] px-3 py-2 text-xs font-bold text-[#2d6638] hover:bg-[#e2f1df]">Admin</Link>}
                <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-[#dbe6da] px-3 py-2 text-xs font-bold text-[#4f6154] hover:bg-[#f7faf5]"><Icon name="logout" size={15}/>Keluar</button>
              </div>
            ) : (
              <Link to="/login" className="rounded-xl bg-[#245f31] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#1f542a]">Masuk</Link>
            )}
          </div>

          <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e2ebe0] text-[#48614f] lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Buka menu">
            <Icon name={menuOpen ? 'x' : 'menu'} size={21} />
          </button>
        </div>
      </div>

      <div className="mx-auto block max-w-7xl px-4 pb-3 md:hidden sm:px-6 lg:px-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {menuOpen && (
        <div className="border-t border-[#e9efe8] bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={navClass}>Beranda</NavLink>
            <a href="#produk" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[#546359]">Produk</a>
            <a href="#kategori" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[#546359]">Kategori</a>
            <a href="#tentang" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[#546359]">Tentang</a>
            {user ? <><div className="h-px bg-[#edf2eb]" /><p className="text-sm font-bold text-[#22382a]">Halo, {user.name}</p><button onClick={logout} className="text-left text-sm font-semibold text-[#bb4b57]">Keluar</button></> : <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-[#245f31]">Masuk / Daftar</Link>}
          </div>
        </div>
      )}
    </header>
  )
}
