"use client"

import { useState } from "react"
import { SearchIcon, Download, Plus, MoreHorizontal, CheckCircle2, Clock, XCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

// Datos de ejemplo para las cotizaciones
const mockQuotations = [
  {
    id: "COT-2023-001",
    clientName: "Municipalidad de Santiago",
    createdAt: "2023-10-15",
    status: "approved",
    amount: 12500000,
    dueDate: "2023-10-30",
    lastUpdated: "2023-10-20",
    products: [
      { name: "Desarrollo de Software", price: 8000000, quantity: 1 },
      { name: "Capacitación", price: 1500000, quantity: 3 },
    ],
    notes: "Cliente requiere implementación en 3 meses",
    history: [
      { date: "2023-10-15", action: "Cotización creada", user: "Juan Pérez" },
      { date: "2023-10-18", action: "Cotización enviada", user: "Juan Pérez" },
      { date: "2023-10-20", action: "Cotización aprobada", user: "Cliente" },
    ],
  },
  {
    id: "COT-2023-002",
    clientName: "Ministerio de Educación",
    createdAt: "2023-10-18",
    status: "pending",
    amount: 8750000,
    dueDate: "2023-11-05",
    lastUpdated: "2023-10-18",
    products: [
      { name: "Consultoría Estratégica", price: 5000000, quantity: 1 },
      { name: "Análisis de Datos", price: 3750000, quantity: 1 },
    ],
    notes: "Pendiente de aprobación presupuestaria",
    history: [
      { date: "2023-10-18", action: "Cotización creada", user: "María González" },
      { date: "2023-10-18", action: "Cotización enviada", user: "María González" },
    ],
  },
  {
    id: "COT-2023-003",
    clientName: "Hospital San José",
    createdAt: "2023-10-10",
    status: "rejected",
    amount: 15200000,
    dueDate: "2023-10-25",
    lastUpdated: "2023-10-22",
    products: [
      { name: "Sistema de Gestión Hospitalaria", price: 12000000, quantity: 1 },
      { name: "Soporte Técnico (1 año)", price: 3200000, quantity: 1 },
    ],
    notes: "Rechazada por exceder presupuesto disponible",
    history: [
      { date: "2023-10-10", action: "Cotización creada", user: "Carlos Ruiz" },
      { date: "2023-10-12", action: "Cotización enviada", user: "Carlos Ruiz" },
      { date: "2023-10-22", action: "Cotización rechazada", user: "Cliente" },
    ],
  },
  {
    id: "COT-2023-004",
    clientName: "Banco Estado",
    createdAt: "2023-10-20",
    status: "sent",
    amount: 22500000,
    dueDate: "2023-11-10",
    lastUpdated: "2023-10-20",
    products: [
      { name: "Desarrollo de App Móvil", price: 15000000, quantity: 1 },
      { name: "Integración API", price: 5000000, quantity: 1 },
      { name: "Testing y QA", price: 2500000, quantity: 1 },
    ],
    notes: "Cliente solicitó demo antes de aprobar",
    history: [
      { date: "2023-10-20", action: "Cotización creada", user: "Ana Martínez" },
      { date: "2023-10-20", action: "Cotización enviada", user: "Ana Martínez" },
    ],
  },
  {
    id: "COT-2023-005",
    clientName: "Universidad de Chile",
    createdAt: "2023-10-05",
    status: "approved",
    amount: 7800000,
    dueDate: "2023-10-20",
    lastUpdated: "2023-10-15",
    products: [
      { name: "Plataforma E-learning", price: 6000000, quantity: 1 },
      { name: "Capacitación Docentes", price: 1800000, quantity: 1 },
    ],
    notes: "Implementación para segundo semestre académico",
    history: [
      { date: "2023-10-05", action: "Cotización creada", user: "Pedro Soto" },
      { date: "2023-10-07", action: "Cotización enviada", user: "Pedro Soto" },
      { date: "2023-10-15", action: "Cotización aprobada", user: "Cliente" },
    ],
  },
  {
    id: "COT-2023-006",
    clientName: "Retail Falabella",
    createdAt: "2023-10-22",
    status: "pending",
    amount: 18500000,
    dueDate: "2023-11-15",
    lastUpdated: "2023-10-22",
    products: [
      { name: "Sistema de Inventario", price: 10000000, quantity: 1 },
      { name: "Integración ERP", price: 8500000, quantity: 1 },
    ],
    notes: "Pendiente de revisión técnica",
    history: [
      { date: "2023-10-22", action: "Cotización creada", user: "Laura Díaz" },
      { date: "2023-10-22", action: "Cotización enviada", user: "Laura Díaz" },
    ],
  },
  {
    id: "COT-2023-007",
    clientName: "Minera Los Pelambres",
    createdAt: "2023-09-28",
    status: "expired",
    amount: 32000000,
    dueDate: "2023-10-15",
    lastUpdated: "2023-09-28",
    products: [
      { name: "Sistema de Monitoreo", price: 20000000, quantity: 1 },
      { name: "Sensores IoT", price: 8000000, quantity: 1 },
      { name: "Implementación", price: 4000000, quantity: 1 },
    ],
    notes: "No hubo respuesta del cliente",
    history: [
      { date: "2023-09-28", action: "Cotización creada", user: "Roberto Vega" },
      { date: "2023-09-30", action: "Cotización enviada", user: "Roberto Vega" },
      { date: "2023-10-16", action: "Cotización expirada", user: "Sistema" },
    ],
  },
  {
    id: "COT-2023-008",
    clientName: "Clínica Santa María",
    createdAt: "2023-10-12",
    status: "approved",
    amount: 9500000,
    dueDate: "2023-10-27",
    lastUpdated: "2023-10-19",
    products: [
      { name: "Sistema de Agendamiento", price: 7500000, quantity: 1 },
      { name: "Capacitación Personal", price: 2000000, quantity: 1 },
    ],
    notes: "Implementación inmediata",
    history: [
      { date: "2023-10-12", action: "Cotización creada", user: "Camila Rojas" },
      { date: "2023-10-14", action: "Cotización enviada", user: "Camila Rojas" },
      { date: "2023-10-19", action: "Cotización aprobada", user: "Cliente" },
    ],
  },
]

// Función para formatear montos en CLP
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount)
}

// Componente para mostrar el estado de la cotización
const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: { label: "Aprobada", color: "bg-green-100 text-green-800 hover:bg-green-100" },
    pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
    rejected: { label: "Rechazada", color: "bg-red-100 text-red-800 hover:bg-red-100" },
    sent: { label: "Enviada", color: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    expired: { label: "Expirada", color: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
  }

  const config = statusConfig[status] || statusConfig.pending

  return <Badge className={config.color}>{config.label}</Badge>
}

// Componente para mostrar el ícono de estado
const StatusIcon = ({ status, className = "h-5 w-5" }) => {
  switch (status) {
    case "approved":
      return <CheckCircle2 className={`text-green-600 ${className}`} />
    case "pending":
      return <Clock className={`text-yellow-600 ${className}`} />
    case "rejected":
      return <XCircle className={`text-red-600 ${className}`} />
    case "sent":
      return <Clock className={`text-blue-600 ${className}`} />
    case "expired":
      return <AlertTriangle className={`text-gray-600 ${className}`} />
    default:
      return <Clock className={`text-gray-600 ${className}`} />
  }
}

export default function QuotationsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Filtrar cotizaciones según los criterios
  const filteredQuotations = mockQuotations.filter((quotation) => {
    // Filtro de búsqueda
    const matchesSearch =
      quotation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.clientName.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de estado
    const matchesStatus = statusFilter === "all" || quotation.status === statusFilter

    // Filtro de fecha
    let matchesDate = true
    const today = new Date()
    const createdDate = new Date(quotation.createdAt)

    if (dateFilter === "last7days") {
      const lastWeek = new Date(today)
      lastWeek.setDate(today.getDate() - 7)
      matchesDate = createdDate >= lastWeek
    } else if (dateFilter === "last30days") {
      const lastMonth = new Date(today)
      lastMonth.setDate(today.getDate() - 30)
      matchesDate = createdDate >= lastMonth
    } else if (dateFilter === "last90days") {
      const lastQuarter = new Date(today)
      lastQuarter.setDate(today.getDate() - 90)
      matchesDate = createdDate >= lastQuarter
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Registro de Cotizaciones</h1>
          <p className="text-muted-foreground">Listado completo de cotizaciones generadas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={() => router.push("/estimator")}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Cotización
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Cotizaciones</CardTitle>
          <CardDescription>Listado completo de cotizaciones generadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID o cliente..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="approved">Aprobadas</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="sent">Enviadas</SelectItem>
                  <SelectItem value="rejected">Rechazadas</SelectItem>
                  <SelectItem value="expired">Expiradas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las fechas</SelectItem>
                  <SelectItem value="last7days">Últimos 7 días</SelectItem>
                  <SelectItem value="last30days">Últimos 30 días</SelectItem>
                  <SelectItem value="last90days">Últimos 90 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No se encontraron cotizaciones con los filtros aplicados.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotations.map((quotation) => (
                    <TableRow
                      key={quotation.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/estimator/quotations/${quotation.id}`)}
                    >
                      <TableCell className="font-medium">{quotation.id}</TableCell>
                      <TableCell>{quotation.clientName}</TableCell>
                      <TableCell>{new Date(quotation.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon status={quotation.status} className="h-4 w-4" />
                          <StatusBadge status={quotation.status} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(quotation.amount)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/estimator/quotations/${quotation.id}`)
                              }}
                            >
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Editar</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Duplicar</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Reenviar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-red-600">
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredQuotations.length} de {mockQuotations.length} cotizaciones
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Siguiente
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
