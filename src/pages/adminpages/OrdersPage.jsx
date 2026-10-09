export default function OrdersPage() {
  const orders = [
    { id: 'BG-1024', customer: 'Putra', product: 'Jeruk Keprok, Alpukat Hass', total: 'Rp 98.000', status: 'Diproses' },
    { id: 'BG-1023', customer: 'Ayu', product: 'Buah Naga Merah', total: 'Rp 30.000', status: 'Selesai' },
    { id: 'BG-1022', customer: 'Made', product: 'Mangga Kiojay, Pisang Susu', total: 'Rp 57.000', status: 'Pending' },
    { id: 'BG-1021', customer: 'Wira', product: 'Alpukat Red V', total: 'Rp 46.000', status: 'Dikirim' },
  ]
  const tone = { Selesai: 'bg-[#e8f4e5] text-[#367143]', Diproses: 'bg-[#fff6df] text-[#9b7718]', Pending: 'bg-[#f2f4f2] text-[#68756a]', Dikirim: 'bg-[#e7f1fb] text-[#3b6d96]' }
  return <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b8971]">Manajemen pesanan</p><h2 className="mt-2 text-3xl font-black text-[#20382a]">Daftar Pesanan</h2><p className="mt-2 text-sm text-[#77867b]">Status pesanan simulasi untuk kebutuhan praktikum frontend.</p><div className="mt-6 overflow-x-auto rounded-3xl border border-[#e1eae0] bg-white p-5"><table className="w-full min-w-[780px] text-left"><thead><tr className="border-b border-[#edf2eb] text-xs uppercase tracking-wider text-[#839085]"><th className="px-3 py-3">Order</th><th className="px-3 py-3">Pelanggan</th><th className="px-3 py-3">Produk</th><th className="px-3 py-3">Total</th><th className="px-3 py-3">Status</th></tr></thead><tbody>{orders.map(o=><tr key={o.id} className="border-b border-[#f0f3ef] text-sm"><td className="px-3 py-4 font-bold text-[#314737]">#{o.id}</td><td className="px-3 py-4 text-[#67766b]">{o.customer}</td><td className="px-3 py-4 text-[#67766b]">{o.product}</td><td className="px-3 py-4 font-bold text-[#2d6b38]">{o.total}</td><td className="px-3 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${tone[o.status]}`}>{o.status}</span></td></tr>)}</tbody></table></div></div>
}
