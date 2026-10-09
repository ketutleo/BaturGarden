import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import { useCart } from '../../utils/CartContext'

const rupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, subtotal, shipping, total } = useCart()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b8971]">Shopping cart</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#20382a]">Keranjang Belanja</h1><p className="mt-2 text-sm text-[#77867b]">Cek kembali produk sebelum lanjut ke checkout.</p></div>
      {!cart.length ? (
        <div className="mt-10 rounded-[32px] border border-dashed border-[#cfdccf] bg-white px-6 py-16 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#edf6eb] text-[#44744d]"><Icon name="cart" size={26} /></div><h2 className="mt-5 text-xl font-black text-[#25392c]">Keranjang masih kosong</h2><p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#7b887f]">Belum ada buah yang dipilih. Yuk cari buah favoritmu dari katalog.</p><Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white">Mulai Belanja <Icon name="arrowRight" size={17} /></Link></div>
      ) : (
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {cart.map((item) => <div key={item.id} className="rounded-3xl border border-[#e1eae0] bg-white p-4 sm:p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><img src={item.img} alt={item.name} className="h-24 w-24 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#819081]">{item.category_name}</p><h2 className="mt-1 text-lg font-black text-[#25392c]">{item.name}</h2><p className="mt-1 text-sm text-[#7e8a80]">{rupiah(item.price)} / {item.unit}</p></div><div className="flex items-center justify-between gap-4 sm:justify-end"><div className="inline-flex items-center rounded-2xl border border-[#dce6da]"><button onClick={() => decreaseQty(item.id)} className="grid h-10 w-10 place-items-center text-[#496150]"><Icon name="minus" size={15}/></button><span className="w-10 text-center text-sm font-bold">{item.qty}</span><button onClick={() => increaseQty(item.id)} className="grid h-10 w-10 place-items-center text-[#496150]"><Icon name="plus" size={15}/></button></div><div className="w-24 text-right"><p className="text-base font-black text-[#2a6536]">{rupiah(item.price * item.qty)}</p><button onClick={() => removeFromCart(item.id)} className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#b35a63] hover:underline"><Icon name="trash" size={13}/>Hapus</button></div></div></div></div>)}
          </div>
          <aside className="h-fit rounded-3xl border border-[#dce7db] bg-white p-6 shadow-sm lg:sticky lg:top-24"><h2 className="text-xl font-black text-[#25392c]">Ringkasan</h2><div className="mt-6 space-y-4 text-sm"><div className="flex justify-between gap-4"><span className="text-[#7c897e]">Subtotal</span><span className="font-bold text-[#314c39]">{rupiah(subtotal)}</span></div><div className="flex justify-between gap-4"><span className="text-[#7c897e]">Ongkir</span><span className="font-bold text-[#314c39]">{rupiah(shipping)}</span></div><div className="border-t border-[#edf2eb] pt-4"><div className="flex justify-between gap-4"><span className="font-bold text-[#324a38]">Total</span><span className="text-xl font-black text-[#245f31]">{rupiah(total)}</span></div></div></div><Link to="/checkout" className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#245f31] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#1f542a]">Lanjut ke Checkout <Icon name="arrowRight" size={17}/></Link><Link to="/" className="mt-3 block text-center text-sm font-bold text-[#3e7048] hover:underline">← Lanjut Belanja</Link></aside>
        </div>
      )}
    </div>
  )
}
