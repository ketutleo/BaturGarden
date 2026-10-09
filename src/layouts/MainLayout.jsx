import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex min-h-screen flex-col bg-[#f7faf5] text-[#1c3023]">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-1">
        <Outlet context={{ searchTerm, setSearchTerm }} />
      </main>
      <Footer />
    </div>
  )
}
