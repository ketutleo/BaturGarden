import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Icon from '../../components/Icon'
import { useCart } from '../../utils/CartContext'
import { useAuth } from '../../utils/AuthContext'

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export default function Checkout() {
  const { cart, subtotal, shipping, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '', city: 'Bangli', notes: '', payment: 'Transfer Bank' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  if (!cart.length && !success) return <div className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-2xl font-black text-[#23382a]">Belum ada pesanan untuk checkout</h1><p className="mt-2 text-sm text-[#7a887d]">Tambahkan produk ke keranjang terlebih dahulu.</p><Link to="/" className="mt-6 inline-flex rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white">Kembali Belanja</Link></div>

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))
  const submit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Nama lengkap wajib diisi.'
    if (!/^\d{9,14}$/.test(form.phone.replace(/\D/g, ''))) nextErrors.phone = 'Nomor telepon belum valid.'
    if (!form.address.trim()) nextErrors.address = 'Alamat pengiriman wajib diisi.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setSuccess(true)
    clearCart()
  }

  if (success) return <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6"><div className="rounded-[34px] border border-[#d4e6d1] bg-white p-8 text-center shadow-sm sm:p-12"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#e7f3e4] text-[#2d6d39]"><Icon name="check" size={34}/></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#6b8971]">Pesanan berhasil</p><h1 className="mt-2 text-3xl font-black text-[#23382a]">Terima kasih sudah belanja di Batur Garden.</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#7a887d]">Pesananmu sudah dicatat sebagai simulasi transaksi frontend. Pada tahap ini belum ada payment gateway atau backend.</p><button onClick={() => navigate('/')} className="mt-7 rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white">Kembali ke Beranda</button></div></div>

  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b8971]">Checkout</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#20382a]">Konfirmasi Pesanan</h1></div><div className="mt-8 grid gap-7 lg:grid-cols-[1fr_380px]"><form onSubmit={submit} className="rounded-3xl border border-[#e1eae0] bg-white p-6 sm:p-7"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-black text-[#25392c]">Data Pengiriman</h2><span className="text-xs font-semibold text-[#7a887d]">Langkah 1 dari 1</span></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label="Nama Lengkap" value={form.name} onChange={(v) => update('name', v)} error={errors.name}/><Field label="Nomor Telepon" value={form.phone} onChange={(v) => update('phone', v)} error={errors.phone} placeholder="08xxxxxxxxxx"/><div className="sm:col-span-2"><Field label="Alamat" value={form.address} onChange={(v) => update('address', v)} error={errors.address} textarea /></div><Field label="Kota" value={form.city} onChange={(v) => update('city', v)}/><div><label className="block text-sm font-bold text-[#3d5143]">Metode Pembayaran</label><select value={form.payment} onChange={(e) => update('payment', e.target.value)} className="mt-2 w-full rounded-2xl border border-[#dce6da] bg-white px-4 py-3 text-sm outline-none focus:border-[#74a178]"><option>Transfer Bank</option><option>COD</option><option>E-Wallet</option></select></div><div className="sm:col-span-2"><Field label="Catatan Pesanan (opsional)" value={form.notes} onChange={(v) => update('notes', v)} textarea={true}/></div></div><button type="submit" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white">Konfirmasi Pesanan <Icon name="check" size={17}/></button></form><aside className="h-fit rounded-3xl border border-[#dce7db] bg-white p-6 shadow-sm lg:sticky lg:top-24"><h2 className="text-xl font-black text-[#25392c]">Ringkasan Pesanan</h2><div className="mt-5 space-y-4">{cart.map((item) => <div key={item.id} className="flex items-center gap-3"><img src={item.img} alt={item.name} className="h-14 w-14 rounded-xl object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#304638]">{item.name}</p><p className="text-xs text-[#829084]">{item.qty} × {rupiah(item.price)}</p></div><p className="text-sm font-bold text-[#2c6537]">{rupiah(item.price * item.qty)}</p></div>)}<div className="border-t border-[#edf2eb] pt-4 text-sm"><div className="flex justify-between py-1.5"><span className="text-[#7b897e]">Subtotal</span><span className="font-bold">{rupiah(subtotal)}</span></div><div className="flex justify-between py-1.5"><span className="text-[#7b897e]">Ongkir</span><span className="font-bold">{rupiah(shipping)}</span></div><div className="mt-2 flex justify-between border-t border-[#edf2eb] pt-4"><span className="font-black">Total</span><span className="text-xl font-black text-[#245f31]">{rupiah(total)}</span></div></div></div></aside></div></div>
}

function Field({ label, value, onChange, error, placeholder, textarea }) {
  const common = { value, placeholder, onChange: (e) => onChange(e.target.value), className: `mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none focus:border-[#74a178] ${error ? 'border-[#d8858e]' : 'border-[#dce6da]'}` }
  return <div><label className="block text-sm font-bold text-[#3d5143]">{label}</label>{textarea ? <textarea rows="3" {...common} /> : <input {...common} />}{error && <p className="mt-1 text-xs font-semibold text-[#b4535b]">{error}</p>}</div>
}
