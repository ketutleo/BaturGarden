import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'batur-garden-user'

const demoUsers = [
  { email: 'admin@baturgarden.com', password: 'admin123', name: 'Admin Batur Garden', role: 'admin' },
  { email: 'user@baturgarden.com', password: 'user123', name: 'Pelanggan Batur Garden', role: 'user' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null } catch { return null }
  })

  const login = (email, password) => {
    const matched = demoUsers.find((item) => item.email === email && item.password === password)
    if (!matched) return { ok: false, message: 'Email atau password belum sesuai.' }
    const nextUser = { name: matched.name, email: matched.email, role: matched.role }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    return { ok: true, user: nextUser }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth harus digunakan di dalam AuthProvider')
  return context
}
