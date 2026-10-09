import { useState } from 'react'
import Icon from '../../components/Icon'
import { products as initialProducts } from '../../utils/data'

const empty = { name: '', price: '', stock: '', category_name: 'Jeruk', unit: '1 kg', description: '', img: '' }
const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export default function ProductsPage() {
  const [items, setItems] = useState(initialProducts)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [feedback, setFeedback] = useState('')

  const save = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.price || !form.stock) { setFeedback('Nama, harga, dan stok wajib diisi.'); return }
    if (editing) {
      setItems((prev) => prev.map((item) => item.id === editing ? { ...item, ...form, price: Number(form.price), stock: Number(form.stock) } : item))
      setFeedback('Produk berhasil diperbarui.')
    } else {
      const id = Math.max(...items.map((item) => item.id), 0) + 1
      const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      setItems((prev) => [...prev, { id, ...form, slug, price: Number(form.price), stock: Number(form.stock), rating: 5, category: form.category_name.toLowerCase(), sold: 0, badge: 'Baru', origin: 'Kintamani, Bali' }])
      setFeedback('Produk baru berhasil ditambahkan.')
    }
    setForm(empty); setEditing(null)
  }

  const edit = (item) => { setEditing(item.id); setForm({ name: item.name, price: item.price, stock: item.stock, category_name: item.category_name, unit: item.unit, description: item.description, img: item.img }) ; window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const remove = (id) => { if (window.confirm('Hapus produk ini?')) { setItems((prev) => prev.filter((item) => item.id !== id)); setFeedback('Produk dihapus dari state admin.') } }

  return <div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b8971]">Manajemen produk</p><h2 className="mt-2 text-3xl font-black text-[#20382a]">Produk Batur Garden</h2><p className="mt-2 text-sm text-[#77867b]">Simulasi CRUD dengan useState, sesuai level frontend praktikum.</p></div><div className="mt-6 grid gap-6 xl:grid-cols-[360px_1fr]"><section className="h-fit rounded-3xl border border-[#e1eae0] bg-white p-5"><h3 className="text-lg font-black text-[#293e30]">{editing ? 'Edit produk' : 'Tambah produk'}</h3><form onSubmit={save} className="mt-5 space-y-4">{[['name','Nama Produk'],['price','Harga'],['stock','Stok'],['unit','Unit']].map(([key,label]) => <div key={key}><label className="block text-sm font-bold text-[#3d5143]">{label}</label><input value={form[key]} onChange={(e)=>setForm((p)=>({...p,[key]:e.target.value}))} type={['price','stock'].includes(key)?'number':'text'} className="mt-2 w-full rounded-2xl border border-[#dce6da] px-4 py-3 text-sm outline-none focus:border-[#74a178]"/></div>)}<div><label className="block text-sm font-bold text-[#3d5143]">Kategori</label><select value={form.category_name} onChange={(e)=>setForm((p)=>({...p,category_name:e.target.value}))} className="mt-2 w-full rounded-2xl border border-[#dce6da] px-4 py-3 text-sm outline-none focus:border-[#74a178]"><option>Jeruk</option><option>Alpukat</option><option>Mangga</option><option>Pisang</option><option>Buah Naga</option></select></div><div><label className="block text-sm font-bold text-[#3d5143]">Deskripsi</label><textarea rows="3" value={form.description} onChange={(e)=>setForm((p)=>({...p,description:e.target.value}))} className="mt-2 w-full rounded-2xl border border-[#dce6da] px-4 py-3 text-sm outline-none focus:border-[#74a178]"/></div><div><label className="block text-sm font-bold text-[#3d5143]">URL Foto</label><input value={form.img} onChange={(e)=>setForm((p)=>({...p,img:e.target.value}))} className="mt-2 w-full rounded-2xl border border-[#dce6da] px-4 py-3 text-sm outline-none focus:border-[#74a178]" placeholder="https://..."/></div>{feedback && <div className="rounded-2xl bg-[#eff8ed] px-4 py-3 text-xs font-semibold text-[#356741]">{feedback}</div>}<div className="flex gap-2"><button className="flex-1 rounded-2xl bg-[#245f31] px-4 py-3 text-sm font-bold text-white">{editing ? 'Simpan Perubahan' : 'Tambah Produk'}</button>{editing && <button type="button" onClick={()=>{setEditing(null);setForm(empty)}} className="rounded-2xl border border-[#dce6da] px-4 py-3 text-sm font-bold text-[#53655a]">Batal</button>}</div></form></section><section className="rounded-3xl border border-[#e1eae0] bg-white p-5"><div className="flex items-center justify-between"><h3 className="text-lg font-black text-[#293e30]">Daftar produk ({items.length})</h3><span className="text-xs font-semibold text-[#839085]">State lokal</span></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left"><thead><tr className="text-xs uppercase tracking-wider text-[#839085]"><th className="px-3 py-2">Produk</th><th className="px-3 py-2">Kategori</th><th className="px-3 py-2">Harga</th><th className="px-3 py-2">Stok</th><th className="px-3 py-2">Aksi</th></tr></thead><tbody>{items.map((item)=><tr key={item.id} className="rounded-2xl bg-[#f8fbf7]"><td className="px-3 py-3"><div className="flex items-center gap-3"><img src={item.img} alt={item.name} className="h-12 w-12 rounded-xl object-cover"/><div><p className="text-sm font-bold text-[#314737]">{item.name}</p><p className="text-xs text-[#849184]">{item.unit}</p></div></div></td><td className="px-3 py-3 text-sm text-[#68776c]">{item.category_name}</td><td className="px-3 py-3 text-sm font-bold text-[#2d6b38]">{rupiah(item.price)}</td><td className="px-3 py-3 text-sm font-bold text-[#506156]">{item.stock}</td><td className="px-3 py-3"><div className="flex gap-2"><button onClick={()=>edit(item)} className="rounded-xl bg-[#eaf5e8] px-3 py-2 text-xs font-bold text-[#356941]">Edit</button><button onClick={()=>remove(item.id)} className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0f1] text-[#b4535b]"><Icon name="trash" size={15}/></button></div></td></tr>)}</tbody></table></div></section></div></div>
}
