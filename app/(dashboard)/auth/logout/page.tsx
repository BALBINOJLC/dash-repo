"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  // Simular cierre de sesión y redireccionar inmediatamente al login
  useEffect(() => {
    // Limpiar datos de sesión del localStorage
    localStorage.removeItem("userMode")
    localStorage.removeItem("isLoggedIn")

    // Pequeño retraso para simular el cierre de sesión
    const timer = setTimeout(() => {
      router.push("/login")
    }, 500)

    return () => clearTimeout(timer)
  }, [router])

  // No renderizamos nada, ya que redireccionamos inmediatamente
  return null
}
