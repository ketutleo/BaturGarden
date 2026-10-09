export default function UsersPage() {
  const users = [
    ['Pelanggan Batur Garden', 'user@baturgarden.com', 'Customer', 'Aktif'],
    ['Admin Batur Garden', 'admin@baturgarden.com', 'Administrator', 'Aktif'],
    ['Ayu Lestari', 'ayu@example.com', 'Customer', 'Aktif'],
    ['Made Putra', 'made@example.com', 'Customer', 'Aktif'],
  ]
  return <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b8971]">Manajemen pengguna</p><h2 className="mt-2 text-3xl font-black text-[#20382a]">Pengguna</h2><p className="mt-2 text-sm text-[#77867b]">Data dummy untuk menunjukkan tampilan user management.</p><div className="mt-6 rounded-3xl border border-[#e1eae0] bg-white p-5"><div className="grid gap-3">{users.map(([name,email,role,status])=><div key={email} className="flex flex-col gap-3 rounded-2xl border border-[#edf2eb] p-4 sm:flex-row sm:items-center"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eef6eb] font-black text-[#3d7148]">{name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div className="min-w-0 flex-1"><p className="text-sm font-bold text-[#314737]">{name}</p><p className="text-xs text-[#839085]">{email}</p></div><span className="text-xs font-bold text-[#607064]">{role}</span><span className="rounded-full bg-[#e8f4e5] px-3 py-1 text-xs font-bold text-[#367143]">{status}</span></div>)}</div></div></div>
}
