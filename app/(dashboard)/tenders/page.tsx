"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, Eye, ArrowDownUp, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TendersPage() {
  const router = useRouter()
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Simulated tender data
  const tenders = [
    {
      id: "ID-2023-1234",
      title: "Servicio de Mantención de Equipos Informáticos",
      entity: "Ministerio de Educación",
      deadline: "2023-05-15",
      status: "analysis",
      category: "Servicios",
      amount: "$15,000,000",
      region: "Metropolitana",
      publishDate: "2023-04-01",
      relevance: "Alta",
    },
    {
      id: "ID-2023-1235",
      title: "Adquisición de Licencias de Software",
      entity: "Servicio de Impuestos Internos",
      deadline: "2023-05-18",
      status: "ready",
      category: "Tecnología",
      amount: "$25,000,000",
      region: "Metropolitana",
      publishDate: "2023-04-03",
      relevance: "Alta",
    },
    {
      id: "ID-2023-1236",
      title: "Servicio de Seguridad para Edificio Central",
      entity: "Ministerio de Hacienda",
      deadline: "2023-05-20",
      status: "pending",
      category: "Seguridad",
      amount: "$50,000,000",
      region: "Metropolitana",
      publishDate: "2023-04-05",
      relevance: "Media",
    },
    {
      id: "ID-2023-1237",
      title: "Desarrollo de Sistema de Gestión Documental",
      entity: "Municipalidad de Santiago",
      deadline: "2023-05-22",
      status: "submitted",
      category: "Desarrollo de Software",
      amount: "$35,000,000",
      region: "Metropolitana",
      publishDate: "2023-04-07",
      relevance: "Alta",
    },
    {
      id: "ID-2023-1238",
      title: "Servicio de Capacitación en Ciberseguridad",
      entity: "Ministerio de Defensa",
      deadline: "2023-05-25",
      status: "analysis",
      category: "Capacitación",
      amount: "$12,000,000",
      region: "Metropolitana",
      publishDate: "2023-04-10",
      relevance: "Media",
    },
    {
      id: "ID-2023-1239",
      title: "Suministro de Equipos de Computación",
      entity: "Ministerio de Salud",
      deadline: "2023-06-05",
      status: "analysis",
      category: "Hardware",
      amount: "$30,000,000",
      region: "Valparaíso",
      publishDate: "2023-04-15",
      relevance: "Baja",
    },
    {
      id: "ID-2023-1240",
      title: "Servicio de Consultoría en Transformación Digital",
      entity: "CORFO",
      deadline: "2023-06-10",
      status: "analysis",
      category: "Consultoría",
      amount: "$45,000,000",
      region: "Metropolitana",
      publishDate: "2023-04-18",
      relevance: "Alta",
    },
    {
      id: "ID-2023-1241",
      title: "Implementación de Sistema ERP",
      entity: "Ministerio de Economía",
      deadline: "2023-06-15",
      status: "analysis",
      category: "Desarrollo de Software",
      amount: "$60,000,000",
      region: "Metropolitana",
      publishDate: "2023-04-20",
      relevance: "Alta",
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

  const getRelevanceBadge = (relevance) => {
    switch (relevance) {
      case "Alta":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Alta
          </Badge>
        )
      case "Media":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Media
          </Badge>
        )
      case "Baja":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Baja
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  // Active filters count (simulated)
  const activeFiltersCount = 3

  // Función para navegar a la página de detalle de licitación
  const navigateToTenderDetail = (tenderId) => {
    router.push(`/tenders/${tenderId}`)
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Búsqueda Inteligente de Licitaciones</h1>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar por palabra clave, ID o entidad..." className="pl-8" />
          </div>

          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filtros</span>
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 bg-primary text-primary-foreground">{activeFiltersCount}</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[340px] md:w-[400px] p-4" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filtros de búsqueda</h4>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                      Limpiar filtros
                    </Button>
                  </div>

                  <Separator />

                  <div className="grid gap-3">
                    <div className="space-y-1.5">
                      <Label>Categoría</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas las categorías</SelectItem>
                          <SelectItem value="servicios">Servicios</SelectItem>
                          <SelectItem value="tecnologia">Tecnología</SelectItem>
                          <SelectItem value="desarrollo">Desarrollo de Software</SelectItem>
                          <SelectItem value="hardware">Hardware</SelectItem>
                          <SelectItem value="consultoria">Consultoría</SelectItem>
                          <SelectItem value="capacitacion">Capacitación</SelectItem>
                          <SelectItem value="seguridad">Seguridad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label>Región</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Todas las regiones" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas las regiones</SelectItem>
                            <SelectItem value="metropolitana">Metropolitana</SelectItem>
                            <SelectItem value="valparaiso">Valparaíso</SelectItem>
                            <SelectItem value="biobio">Biobío</SelectItem>
                            <SelectItem value="araucania">Araucanía</SelectItem>
                            <SelectItem value="antofagasta">Antofagasta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Monto Mínimo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Cualquier monto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Cualquier monto</SelectItem>
                            <SelectItem value="5m">Desde $5.000.000</SelectItem>
                            <SelectItem value="10m">Desde $10.000.000</SelectItem>
                            <SelectItem value="20m">Desde $20.000.000</SelectItem>
                            <SelectItem value="50m">Desde $50.000.000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label>Fecha de Publicación</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Cualquier fecha" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Cualquier fecha</SelectItem>
                            <SelectItem value="today">Hoy</SelectItem>
                            <SelectItem value="week">Última semana</SelectItem>
                            <SelectItem value="month">Último mes</SelectItem>
                            <SelectItem value="quarter">Último trimestre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Fecha Límite</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Cualquier fecha" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Cualquier fecha</SelectItem>
                            <SelectItem value="week">Próxima semana</SelectItem>
                            <SelectItem value="month">Próximo mes</SelectItem>
                            <SelectItem value="quarter">Próximo trimestre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Relevancia</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cualquier relevancia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Cualquier relevancia</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="low">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm">Filtros Adicionales</Label>
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="filter1" />
                          <label
                            htmlFor="filter1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Solo licitaciones abiertas
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="filter2" />
                          <label
                            htmlFor="filter2"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Con documentos disponibles
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="filter3" />
                          <label
                            htmlFor="filter3"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Excluir adjudicadas
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="filter4" />
                          <label
                            htmlFor="filter4"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Coincidencia exacta
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Guardar Filtros
                    </Button>
                    <Button size="sm">
                      <Search className="mr-2 h-4 w-4" />
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button>
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Active filters display */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="bg-muted/50 flex items-center gap-1 px-2 py-1">
            Categoría: Tecnología
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
              <X className="h-3 w-3" />
            </Button>
          </Badge>
          <Badge variant="outline" className="bg-muted/50 flex items-center gap-1 px-2 py-1">
            Región: Metropolitana
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
              <X className="h-3 w-3" />
            </Button>
          </Badge>
          <Badge variant="outline" className="bg-muted/50 flex items-center gap-1 px-2 py-1">
            Monto: Desde $10.000.000
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="table" className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Resultados de Búsqueda</h2>
            <span className="text-sm text-muted-foreground">({tenders.length} licitaciones encontradas)</span>
          </div>
          <div className="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="table">Tabla</TabsTrigger>
              <TabsTrigger value="cards">Tarjetas</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Ordenar
            </Button>
          </div>
        </div>

        <TabsContent value="table" className="space-y-4">
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left font-medium p-2 pl-4">ID</th>
                  <th className="text-left font-medium p-2">Licitación</th>
                  <th className="text-left font-medium p-2">Entidad</th>
                  <th className="text-left font-medium p-2">Categoría</th>
                  <th className="text-left font-medium p-2">Monto</th>
                  <th className="text-left font-medium p-2">Fecha Límite</th>
                  <th className="text-left font-medium p-2">Relevancia</th>
                  <th className="text-left font-medium p-2">Estado</th>
                  <th className="text-right font-medium p-2 pr-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tenders.map((tender, index) => (
                  <tr
                    key={tender.id}
                    className={`border-t hover:bg-muted/50 ${index % 2 === 0 ? "bg-white" : "bg-muted/20"}`}
                  >
                    <td className="p-2 pl-4 text-sm">{tender.id}</td>
                    <td className="p-2 text-sm font-medium">{tender.title}</td>
                    <td className="p-2 text-sm">{tender.entity}</td>
                    <td className="p-2 text-sm">{tender.category}</td>
                    <td className="p-2 text-sm">{tender.amount}</td>
                    <td className="p-2 text-sm">{tender.deadline}</td>
                    <td className="p-2">{getRelevanceBadge(tender.relevance)}</td>
                    <td className="p-2">{getStatusBadge(tender.status)}</td>
                    <td className="p-2 pr-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Descargar</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigateToTenderDetail(tender.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver detalles</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tenders.map((tender) => (
              <div
                key={tender.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                onClick={() => navigateToTenderDetail(tender.id)}
              >
                <div className="p-4 border-b bg-muted/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-base mb-1">{tender.title}</h3>
                      <p className="text-sm text-muted-foreground">{tender.entity}</p>
                    </div>
                    {getStatusBadge(tender.status)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">ID</p>
                      <p className="text-sm">{tender.id}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Categoría</p>
                      <p className="text-sm">{tender.category}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Monto</p>
                      <p className="text-sm font-medium">{tender.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Fecha Límite</p>
                      <p className="text-sm">{tender.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-muted-foreground">Relevancia:</p>
                      {getRelevanceBadge(tender.relevance)}
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigateToTenderDetail(tender.id)
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalles
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between mt-4">
        <Button variant="outline" size="sm">
          Anterior
        </Button>
        <div className="text-sm text-muted-foreground">Página 1 de 1</div>
        <Button variant="outline" size="sm">
          Siguiente
        </Button>
      </div>
    </div>
  )
}
