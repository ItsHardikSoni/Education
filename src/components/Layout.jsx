"use client"

import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
