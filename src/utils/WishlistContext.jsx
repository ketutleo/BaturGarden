import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])

  const toggleWishlist = (product) => {
    setWishlist((prev) => prev.some((item) => item.id === product.id)
      ? prev.filter((item) => item.id !== product.id)
      : [...prev, product],
    )
  }

  const isWishlisted = (id) => wishlist.some((item) => item.id === id)

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist harus digunakan di dalam WishlistProvider')
  return context
}
