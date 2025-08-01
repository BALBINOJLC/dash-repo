"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Search, Building2, FileText, Brain, Clock, ArrowRight } from "lucide-react"
import { useEffect } from "react"

export default function SelectModulePage() {
  const router = useRouter()

  const handleSelectModule = (module) => {
    // Guardar la preferencia del usuario en localStorage
    localStorage.setItem("userMode", module)

    if (module === "full") {
      router.push("/dashboard")
    } else if (module === "estimator") {
      router.push("/estimator/dashboard")
    }
  }

  // Limpiar el modo anterior al cargar esta página
  useEffect(() => {
    localStorage.removeItem("userMode")
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-6aJdtTZv6WzcU6oeknEUXq2KvavWO8.png"
              alt="GUX Logo"
              className="h-16"
            />
          </div>
          <h1 className="text-2xl font-bold">Bienvenido a GUX</h1>
          <p className="text-muted-foreground mt-1">Selecciona el módulo al que deseas acceder</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-200">
            <div className="h-2 bg-primary"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Agente Licitador Completo
              </CardTitle>
              <CardDescription>Accede a todas las funcionalidades del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                El agente licitador completo te permite gestionar todo el proceso de licitaciones, desde la búsqueda
                hasta la presentación de propuestas.
              </p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                  <Search className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Búsqueda Inteligente</p>
                    <p className="text-xs text-muted-foreground">Encuentra licitaciones relevantes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                  <Brain className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Análisis con IA</p>
                    <p className="text-xs text-muted-foreground">Evaluación automática de bases</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Gestión Documental</p>
                    <p className="text-xs text-muted-foreground">Control de documentos requeridos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                  <Calculator className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Cotizador Integrado</p>
                    <p className="text-xs text-muted-foreground">Estimación de costos de proyectos</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSelectModule("full")}>
                Acceder al Sistema Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-200">
            <div className="h-2 bg-primary"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Solo Cotizador / Estimador
              </CardTitle>
              <CardDescription>Accede únicamente al módulo de estimación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                El módulo de cotizador te permite generar estimaciones precisas para tus proyectos y licitaciones de
                forma rápida y sencilla.
              </p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                  <Calculator className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Estimación Precisa</p>
                    <p className="text-xs text-muted-foreground">Cálculo detallado de costos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Ahorro de Tiempo</p>
                    <p className="text-xs text-muted-foreground">Estimaciones en minutos, no horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                  <Building2 className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Gestión de Roles</p>
                    <p className="text-xs text-muted-foreground">Configuración de equipos y tarifas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Exportación Sencilla</p>
                    <p className="text-xs text-muted-foreground">Genera documentos listos para presentar</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSelectModule("estimator")}>
                Acceder Solo al Cotizador
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 GUX. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
