"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Verificar el modo del usuario
    const userMode = localStorage.getItem("userMode")

    // Redirigir según el modo
    if (userMode === "estimator") {
      router.push("/estimator/dashboard")
    } else {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Redirigiendo...</p>
    </div>
  )
}
