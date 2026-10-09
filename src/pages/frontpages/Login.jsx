import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import Icon from '../../components/Icon'
import { useAuth } from '../../utils/AuthContext'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('user@baturgarden.com')
  const [password, setPassword] = useState('user123')
  const [error, setError] = useState('')
  const target = location.state?.from || (user?.role === 'admin' ? '/admin/dashboard' : '/')

  if (user) return <Navigate to={target} replace />

  const submit = (e) => {
    e.preventDefault()
    const result = login(email, password)
    if (!result.ok) { setError(result.message); return }
    navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/')
  }

  return <div className="mx-auto grid max-w-6xl px-4 py-12 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:py-20 lg:px-8"><div className="hidden rounded-[34px] bg-[#245f31] p-10 text-white lg:block"><p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Welcome to Batur Garden</p><h1 className="mt-5 text-4xl font-black tracking-tight">Belanja buah lokal dengan cara yang simpel.</h1><p className="mt-5 max-w-md text-sm leading-8 text-white/70">Gunakan akun demo untuk mencoba alur customer dan admin pada project frontend ini.</p><div className="mt-10 space-y-3 text-sm text-white/80"><p>• Customer: user@baturgarden.com / user123</p><p>• Admin: admin@baturgarden.com / admin123</p></div></div><div className="rounded-[34px] border border-[#e0e9df] bg-white p-7 shadow-sm sm:p-10"><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf5e8] text-[#2b6b38] font-black">BG</div><div><p className="text-lg font-black text-[#25392c]">Batur Garden</p><p className="text-xs text-[#7d8b80]">Masuk ke akun demo</p></div></div><form onSubmit={submit} className="mt-8 space-y-5"><div><label className="block text-sm font-bold text-[#3d5143]">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#dce6da] px-4 py-3 text-sm outline-none focus:border-[#74a178]"/></div><div><label className="block text-sm font-bold text-[#3d5143]">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#dce6da] px-4 py-3 text-sm outline-none focus:border-[#74a178]"/></div>{error && <div className="rounded-2xl border border-[#f0cfd3] bg-[#fff4f4] px-4 py-3 text-sm font-semibold text-[#b4535b]">{error}</div>}<button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#1f542a]">Masuk <Icon name="arrowRight" size={17}/></button></form><div className="mt-6 rounded-2xl bg-[#f6faf4] p-4 text-xs leading-6 text-[#77857a]"><p className="font-bold text-[#3e5344]">Akun demo</p><p className="mt-1">Customer: user@baturgarden.com / user123</p><p>Admin: admin@baturgarden.com / admin123</p></div><Link to="/" className="mt-6 block text-center text-sm font-bold text-[#3d7048] hover:underline">← Kembali ke beranda</Link></div></div>
}
