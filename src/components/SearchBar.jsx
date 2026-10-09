import Icon from './Icon'

export default function SearchBar({ value, onChange, placeholder = 'Cari buah, misalnya alpukat...' }) {
  return (
    <label className="relative block w-full">
      <Icon name="search" size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7d72]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="search"
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#dce7dc] bg-[#f7faf5] py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#5d9e68] focus:bg-white focus:ring-4 focus:ring-[#dcefdc]"
        aria-label="Cari produk"
      />
    </label>
  )
}
