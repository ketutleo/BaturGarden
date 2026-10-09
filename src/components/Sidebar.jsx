import { NavLink } from 'react-router-dom'
import Icon from './Icon'

export default function Sidebar({ open, setOpen }) {
  const items = [
    ['dashboard', 'Dashboard', 'grid'],
    ['products', 'Produk', 'package'],
    ['orders', 'Pesanan', 'list'],
    ['users', 'Pengguna', 'user'],
    ['about', 'Tentang', 'shield'],
  ]
  const linkClass = ({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-[#eaf5e8] text-[#2e6c3b]' : 'text-[#58685d] hover:bg-[#f4f8f2]'}`
  return <><div className={`fixed inset-0 z-40 bg-[#15251b]/25 backdrop-blur-sm md:hidden ${open ? 'block' : 'hidden'}`} onClick={() => setOpen(false)} /><aside className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-[#e1eae0] bg-white px-5 py-6 transition md:static md:z-auto md:block md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}><div className="flex items-center justify-between"><div><p className="text-lg font-black text-[#25392c]">Batur Garden</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8c7f]">Admin Panel</p></div><button className="grid h-9 w-9 place-items-center rounded-xl text-[#607064] md:hidden" onClick={() => setOpen(false)}><Icon name="x" size={19}/></button></div><nav className="mt-8 space-y-2">{items.map(([path, label, icon]) => <NavLink key={path} to={`/admin/${path}`} onClick={() => setOpen(false)} className={linkClass}><Icon name={icon} size={18}/>{label}</NavLink>)}</nav><div className="mt-auto hidden rounded-2xl bg-[#f6faf4] p-4 text-xs leading-6 text-[#6f7f73] md:block"><p className="font-bold text-[#35513c]">Demo frontend</p><p className="mt-1">CRUD menggunakan useState, tanpa backend.</p></div></aside></>
}
