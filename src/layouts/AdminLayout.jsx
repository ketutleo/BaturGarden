import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Icon from '../components/Icon'
import { useAuth } from '../utils/AuthContext'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  return <div className="flex min-h-screen bg-[#f6faf4]"><Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/><div className="flex min-w-0 flex-1 flex-col"><header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e1eae0] bg-white/95 px-4 py-4 backdrop-blur sm:px-6"><div className="flex items-center gap-3"><button className="grid h-10 w-10 place-items-center rounded-xl border border-[#dce6da] text-[#4e6354] md:hidden" onClick={() => setSidebarOpen(true)}><Icon name="menu" size={20}/></button><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7d8b80]">Admin</p><h1 className="text-lg font-black text-[#25392c]">Batur Garden Dashboard</h1></div></div><div className="flex items-center gap-3"><Link to="/" className="hidden rounded-xl border border-[#dce6da] px-3 py-2 text-xs font-bold text-[#4f6154] hover:bg-[#f7faf5] sm:block">Lihat Store</Link><div className="hidden text-right sm:block"><p className="text-sm font-bold text-[#2d4433]">{user?.name}</p><p className="text-[11px] text-[#7d8b80]">Administrator</p></div><button onClick={logout} className="grid h-10 w-10 place-items-center rounded-xl border border-[#eed5d8] text-[#b4535b]" title="Logout"><Icon name="logout" size={17}/></button></div></header><main className="flex-1 px-4 py-6 sm:px-6"><Outlet/></main><footer className="border-t border-[#e2ebe0] bg-white px-6 py-4 text-center text-xs text-[#7d8b80]">© 2026 Batur Garden Admin · Frontend Simulation</footer></div></div>
}
