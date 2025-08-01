"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Download, FileText, Plus, Search, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  },
  {
    id: "COT-2023-002",
    clientName: "Ministerio de Educación",
    createdAt: "2023-10-18",
    status: "pending",
    amount: 8750000,
    dueDate: "2023-11-05",
    lastUpdated: "2023-10-18",
  },
  {
    id: "COT-2023-003",
    clientName: "Hospital San José",
    createdAt: "2023-10-10",
    status: "rejected",
    amount: 15200000,
    dueDate: "2023-10-25",
    lastUpdated: "2023-10-22",
  },
  {
    id: "COT-2023-004",
    clientName: "Banco Estado",
    createdAt: "2023-10-20",
    status: "sent",
    amount: 22500000,
    dueDate: "2023-11-10",
    lastUpdated: "2023-10-20",
  },
  {
    id: "COT-2023-005",
    clientName: "Universidad de Chile",
    createdAt: "2023-10-05",
    status: "approved",
    amount: 7800000,
    dueDate: "2023-10-20",
    lastUpdated: "2023-10-15",
  },
  {
    id: "COT-2023-006",
    clientName: "Retail Falabella",
    createdAt: "2023-10-22",
    status: "pending",
    amount: 18500000,
    dueDate: "2023-11-15",
    lastUpdated: "2023-10-22",
  },
  {
    id: "COT-2023-007",
    clientName: "Minera Los Pelambres",
    createdAt: "2023-09-28",
    status: "expired",
    amount: 32000000,
    dueDate: "2023-10-15",
    lastUpdated: "2023-09-28",
  },
  {
    id: "COT-2023-008",
    clientName: "Clínica Santa María",
    createdAt: "2023-10-12",
    status: "approved",
    amount: 9500000,
    dueDate: "2023-10-27",
    lastUpdated: "2023-10-19",
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

export default function TendersPage() {
  const router = useRouter()

  // Calcular estadísticas
  const stats = {
    total: mockQuotations.length,
    sent: mockQuotations.filter((q) => q.status === "sent").length,
    pending: mockQuotations.filter((q) => q.status === "pending").length,
    approved: mockQuotations.filter((q) => q.status === "approved").length,
    rejected: mockQuotations.filter((q) => q.status === "rejected").length,
    expired: mockQuotations.filter((q) => q.status === "expired").length,
    totalAmount: mockQuotations.reduce((sum, q) => sum + q.amount, 0),
    approvedAmount: mockQuotations.filter((q) => q.status === "approved").reduce((sum, q) => sum + q.amount, 0),
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Cotizaciones</h1>
          <p className="text-muted-foreground">Administra y haz seguimiento de tus cotizaciones</p>
        </div>
        <Button onClick={() => router.push("/estimator/cotizador")}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Cotización
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Valor total: {formatCurrency(stats.totalAmount)}</p>
            <div className="mt-3 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-primary h-1 w-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cotizaciones Aprobadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">
              Valor: {formatCurrency(stats.approvedAmount)} · Faltan: {stats.total - stats.approved}
            </p>
            <div className="mt-3 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-green-500 h-1" style={{ width: `${(stats.approved / stats.total) * 100}%` }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cotizaciones Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending + stats.sent}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pending} pendientes, {stats.sent} enviadas · Faltan: {stats.total - (stats.pending + stats.sent)}
            </p>
            <div className="mt-3 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div
                className="bg-yellow-500 h-1"
                style={{ width: `${((stats.pending + stats.sent) / stats.total) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cotizaciones Rechazadas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected + stats.expired}</div>
            <p className="text-xs text-muted-foreground">
              {stats.rejected} rechazadas, {stats.expired} expiradas · Faltan:{" "}
              {stats.total - (stats.rejected + stats.expired)}
            </p>
            <div className="mt-3 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div
                className="bg-red-500 h-1"
                style={{ width: `${((stats.rejected + stats.expired) / stats.total) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todas" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <TabsList className="mb-2 sm:mb-0">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="aprobadas">Aprobadas</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
            <TabsTrigger value="rechazadas">Rechazadas</TabsTrigger>
          </TabsList>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar cotización..." className="w-full sm:w-[200px] pl-8 rounded-md" />
            </div>
            <Select defaultValue="recientes">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recientes">Más recientes</SelectItem>
                <SelectItem value="antiguas">Más antiguas</SelectItem>
                <SelectItem value="monto-mayor">Mayor monto</SelectItem>
                <SelectItem value="monto-menor">Menor monto</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="todas" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQuotations.map((quotation) => (
                    <TableRow
                      key={quotation.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/estimator/quotations/${quotation.id}`)}
                    >
                      <TableCell className="font-medium">{quotation.id}</TableCell>
                      <TableCell>{quotation.clientName}</TableCell>
                      <TableCell>{new Date(quotation.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={quotation.status} />
                      </TableCell>
                      <TableCell>{new Date(quotation.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">{formatCurrency(quotation.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-xs text-muted-foreground">
                Mostrando <strong>{mockQuotations.length}</strong> de <strong>{mockQuotations.length}</strong>{" "}
                cotizaciones
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
        </TabsContent>

        <TabsContent value="aprobadas" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQuotations
                    .filter((q) => q.status === "approved")
                    .map((quotation) => (
                      <TableRow
                        key={quotation.id}
                        className="cursor-pointer"
                        onClick={() => router.push(`/estimator/quotations/${quotation.id}`)}
                      >
                        <TableCell className="font-medium">{quotation.id}</TableCell>
                        <TableCell>{quotation.clientName}</TableCell>
                        <TableCell>{new Date(quotation.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={quotation.status} />
                        </TableCell>
                        <TableCell>{new Date(quotation.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{formatCurrency(quotation.amount)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-xs text-muted-foreground">
                Mostrando <strong>{stats.approved}</strong> de <strong>{mockQuotations.length}</strong> cotizaciones
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
        </TabsContent>

        <TabsContent value="pendientes" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQuotations
                    .filter((q) => q.status === "pending" || q.status === "sent")
                    .map((quotation) => (
                      <TableRow
                        key={quotation.id}
                        className="cursor-pointer"
                        onClick={() => router.push(`/estimator/quotations/${quotation.id}`)}
                      >
                        <TableCell className="font-medium">{quotation.id}</TableCell>
                        <TableCell>{quotation.clientName}</TableCell>
                        <TableCell>{new Date(quotation.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={quotation.status} />
                        </TableCell>
                        <TableCell>{new Date(quotation.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{formatCurrency(quotation.amount)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-xs text-muted-foreground">
                Mostrando <strong>{stats.pending + stats.sent}</strong> de <strong>{mockQuotations.length}</strong>{" "}
                cotizaciones
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
        </TabsContent>

        <TabsContent value="rechazadas" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQuotations
                    .filter((q) => q.status === "rejected" || q.status === "expired")
                    .map((quotation) => (
                      <TableRow
                        key={quotation.id}
                        className="cursor-pointer"
                        onClick={() => router.push(`/estimator/quotations/${quotation.id}`)}
                      >
                        <TableCell className="font-medium">{quotation.id}</TableCell>
                        <TableCell>{quotation.clientName}</TableCell>
                        <TableCell>{new Date(quotation.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={quotation.status} />
                        </TableCell>
                        <TableCell>{new Date(quotation.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{formatCurrency(quotation.amount)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-xs text-muted-foreground">
                Mostrando <strong>{stats.rejected + stats.expired}</strong> de <strong>{mockQuotations.length}</strong>{" "}
                cotizaciones
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
