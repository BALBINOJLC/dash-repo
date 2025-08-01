"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, FileText, CheckCircle, Calculator, Brain, Clock, FileTextIcon, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const router = useRouter()

  // Datos de ejemplo para las últimas licitaciones
  const recentTenders = [
    {
      id: "ID-2023-1234",
      title: "Servicio de Mantención de Equipos Informáticos",
      entity: "Ministerio de Educación",
      deadline: "2023-05-15",
      status: "analysis",
      documents: 12,
      missingDocs: 2,
    },
    {
      id: "ID-2023-1235",
      title: "Adquisición de Licencias de Software",
      entity: "Servicio de Impuestos Internos",
      deadline: "2023-05-18",
      status: "ready",
      documents: 8,
      missingDocs: 0,
    },
    {
      id: "ID-2023-1236",
      title: "Servicio de Seguridad para Edificio Central",
      entity: "Ministerio de Hacienda",
      deadline: "2023-05-20",
      status: "pending",
      documents: 15,
      missingDocs: 4,
    },
    {
      id: "ID-2023-1237",
      title: "Desarrollo de Sistema de Gestión Documental",
      entity: "Municipalidad de Santiago",
      deadline: "2023-05-22",
      status: "submitted",
      documents: 10,
      missingDocs: 0,
    },
    {
      id: "ID-2023-1238",
      title: "Servicio de Capacitación en Ciberseguridad",
      entity: "Ministerio de Defensa",
      deadline: "2023-05-25",
      status: "analysis",
      documents: 7,
      missingDocs: 1,
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "analysis":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            En Análisis
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Docs. Pendientes
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Lista
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Enviada
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "analysis":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <CheckCircle className="h-4 w-4 text-amber-600" />
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "submitted":
        return <FileText className="h-4 w-4 text-purple-600" />
      default:
        return null
    }
  }

  // Función para navegar a la página de detalle de licitación
  const navigateToTenderDetail = (tenderId) => {
    router.push(`/tenders/${tenderId}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <Button onClick={() => router.push("/estimator/cotizador")}>
              <FileTextIcon className="mr-2 h-4 w-4" />
              Generar Cotización
            </Button>
          </div>

          {/* Destacar el módulo de cotizador */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Cotizador / Estimador de Proyectos
              </CardTitle>
              <CardDescription>Genera estimaciones precisas para tus proyectos y licitaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Utiliza nuestro nuevo módulo de estimación para calcular costos de proyectos de forma rápida y precisa.
                Ideal para preparar propuestas comerciales y responder a licitaciones.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 bg-background p-3 rounded-md">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimación Inteligente</p>
                    <p className="text-xs text-muted-foreground">Basada en datos históricos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-background p-3 rounded-md">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ahorro de Tiempo</p>
                    <p className="text-xs text-muted-foreground">Estimaciones en minutos, no horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-background p-3 rounded-md">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Exportación Sencilla</p>
                    <p className="text-xs text-muted-foreground">PDF listo para presentar</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push("/estimator/cotizador")}>
                <Calculator className="mr-2 h-4 w-4" />
                Crear Nueva Estimación
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Licitaciones Activas</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 desde ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentos Pendientes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">-3 desde ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Propuestas Listas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">+1 desde ayer</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Búsqueda de Licitaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5" />
                  Buscador
                </CardTitle>
                <CardDescription>Configura los criterios de búsqueda automática</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Estado:</span>
                    <span className="text-sm font-medium text-green-600">Activo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Última búsqueda:</span>
                    <span className="text-sm font-medium">Hace 2 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Filtros activos:</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-4">
                <Button size="sm" className="flex-[7]">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
                <Button variant="outline" size="sm" className="flex-[3]">
                  <FileText className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </CardFooter>
            </Card>

            {/* Análisis de Bases */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5" />
                  Análisis de Bases
                </CardTitle>
                <CardDescription>Procesamiento de documentos con IA</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">En proceso:</span>
                    <span className="text-sm font-medium">3 licitaciones</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Completados hoy:</span>
                    <span className="text-sm font-medium">5</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button size="sm" className="w-full">
                  <Brain className="mr-2 h-4 w-4" />
                  Analizar Nuevas
                </Button>
              </CardFooter>
            </Card>

            {/* Gestión Documental */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  Gestión Documental
                </CardTitle>
                <CardDescription>Estado de documentos requeridos</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Documentos disponibles:</span>
                    <span className="text-sm font-medium">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Documentos pendientes:</span>
                    <span className="text-sm font-medium text-amber-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Solicitudes enviadas:</span>
                    <span className="text-sm font-medium">5</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 mt-auto">
                <Button size="sm" className="flex-[7]">
                  <FileText className="mr-2 h-4 w-4" />
                  Subir
                </Button>
                <Button variant="outline" size="sm" className="flex-[3]">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Todos
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Listado de Últimas Licitaciones */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Últimas Licitaciones</CardTitle>
                <CardDescription>Licitaciones más recientes encontradas por el agente</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push("/tenders")}>
                Ver todas
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-sm">
                      <th className="text-left font-medium p-2">ID</th>
                      <th className="text-left font-medium p-2">Licitación</th>
                      <th className="text-left font-medium p-2">Entidad</th>
                      <th className="text-left font-medium p-2">Fecha Límite</th>
                      <th className="text-left font-medium p-2">Estado</th>
                      <th className="text-left font-medium p-2">Docs.</th>
                      <th className="text-right font-medium p-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTenders.map((tender) => (
                      <tr key={tender.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 text-sm">{tender.id}</td>
                        <td className="p-2 text-sm font-medium">{tender.title}</td>
                        <td className="p-2 text-sm">{tender.entity}</td>
                        <td className="p-2 text-sm">{tender.deadline}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(tender.status)}
                            {getStatusBadge(tender.status)}
                          </div>
                        </td>
                        <td className="p-2 text-sm">
                          {tender.documents - tender.missingDocs}/{tender.documents}
                        </td>
                        <td className="p-2 text-right">
                          <Button variant="ghost" size="sm" onClick={() => navigateToTenderDetail(tender.id)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalles</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
