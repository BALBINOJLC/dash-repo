"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Search, Building2, Settings, Menu, X, LogOut, Calculator, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [estimatorOnly, setEstimatorOnly] = useState(false)

  useEffect(() => {
    // Verificar si el usuario eligió solo el cotizador
    const userMode = localStorage.getItem("userMode")
    setEstimatorOnly(userMode === "estimator")

    // Si estamos en la ruta /estimator y no hay modo guardado, asumimos que es modo cotizador
    if (pathname.startsWith("/estimator") && !userMode) {
      localStorage.setItem("userMode", "estimator")
      setEstimatorOnly(true)
    }
  }, [pathname])

  // Modificar las rutas para el modo completo eliminando el dashboard general
  // y arreglando la lógica de selección activa
  const fullRoutes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Cotizador / Estimador",
      path: "/estimator/cotizador",
      icon: <Calculator className="h-5 w-5" />,
    },
    {
      name: "Registro de Cotizaciones",
      path: "/estimator/quotations",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Licitaciones",
      path: "/tenders",
      icon: <Search className="h-5 w-5" />,
    },
    {
      name: "Perfil de Empresa",
      path: "/company-profile",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      name: "Usuarios",
      path: "/usuarios",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Propuestas",
      path: "/propuestas",
      icon: <FileText className="h-5 w-5" />,
    },
  ]

  // Modificar las rutas para el modo cotizador eliminando el dashboard general
  const estimatorRoutes = [
    {
      name: "Dashboard Cotizaciones",
      path: "/estimator/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Cotizador / Estimador",
      path: "/estimator/cotizador",
      icon: <Calculator className="h-5 w-5" />,
    },
    {
      name: "Registro de Cotizaciones",
      path: "/estimator/quotations",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Perfil de Empresa",
      path: "/company-profile",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      name: "Mi Perfil",
      path: "/user-profile",
      icon: <User className="h-5 w-5" />,
    },
  ]

  const routes = estimatorOnly ? estimatorRoutes : fullRoutes

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and title */}
          <div className="h-16 flex items-center px-4 border-b">
            <div className="flex items-center space-x-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-6aJdtTZv6WzcU6oeknEUXq2KvavWO8.png"
                alt="GUX Logo"
                className="h-8"
              />
              <span className="text-lg font-bold">{estimatorOnly ? "Cotizador" : "GUX"}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {routes.map((route) => (
                <li key={route.path}>
                  {/* Modificar la lógica de selección en el Link para manejar rutas exactas */}
                  <Link
                    href={route.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      route.exact
                        ? pathname === route.path
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                        : pathname === route.path ||
                            (pathname.startsWith(`${route.path}/`) && !route.path.endsWith("/"))
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.icon}
                    <span className="ml-3">{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company profile and settings */}
          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Company Logo" />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">TechConsulting SpA</p>
                <p className="text-xs text-muted-foreground">{estimatorOnly ? "Modo Cotizador" : "Plan Premium"}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link href="/settings" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Ajustes
                </Button>
              </Link>
              <Link href="/auth/logout" className="w-1/2">
                <Button variant="outline" size="sm" className="w-full">
                  <LogOut className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggleSidebar} />}

      {/* Content padding to account for sidebar */}
      <div className="md:pl-64" />
    </>
  )
}
