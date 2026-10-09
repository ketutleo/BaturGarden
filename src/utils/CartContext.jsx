import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + qty, item.stock) }
            : item,
        )
      }
      return [...prev, { ...product, qty: Math.min(qty, product.stock) }]
    })
  }

  const updateQty = (id, nextQty) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: Math.max(1, Math.min(nextQty, item.stock)) } : item)
        .filter(Boolean),
    )
  }

  const increaseQty = (id) => {
    const current = cart.find((item) => item.id === id)
    if (current) updateQty(id, current.qty + 1)
  }

  const decreaseQty = (id) => {
    const current = cart.find((item) => item.id === id)
    if (current && current.qty > 1) updateQty(id, current.qty - 1)
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id))
  const clearCart = () => setCart([])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart])
  const shipping = cart.length ? 12000 : 0
  const total = subtotal + shipping

  const value = {
    cart,
    addToCart,
    updateQty,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
    shipping,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart harus digunakan di dalam CartProvider')
  return context
}
