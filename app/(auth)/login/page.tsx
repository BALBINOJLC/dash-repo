"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User, ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor ingresa tu email y contraseña")
      return
    }

    setIsLoading(true)

    // Simulación de login (en una implementación real, esto sería una llamada a la API)
    setTimeout(() => {
      setIsLoading(false)
      // Guardar estado de autenticación
      localStorage.setItem("isAuthenticated", "true")
      router.push("/select-module")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-6aJdtTZv6WzcU6oeknEUXq2KvavWO8.png"
              alt="GUX Logo"
              className="h-12"
            />
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Iniciar Sesión</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Separator className="my-4" />
            <div className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <a href="#" className="text-primary font-medium hover:underline">
                Regístrate
              </a>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 GUX. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
