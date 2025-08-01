"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Edit, Copy, Send, CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Datos de ejemplo para las cotizaciones (mismo que en la página principal)
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

export default function QuotationDetailPage({ params }) {
  const router = useRouter()
  const { id } = params
  const [quotation, setQuotation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga de datos
    setLoading(true)
    setTimeout(() => {
      const found = mockQuotations.find((q) => q.id === id)
      if (found) {
        setQuotation(found)
      } else {
        // Si no se encuentra, redirigir a la lista
        router.push("/estimator/quotations")
      }
      setLoading(false)
    }, 500)
  }, [id, router])

  if (loading) {
    return (
      <div className="py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!quotation) {
    return (
      <div className="py-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No se encontró la cotización solicitada.
            <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/estimator/quotations")}>
              Volver al listado
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" onClick={() => router.push("/estimator/quotations")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Cotización {quotation.id}</h1>
          <p className="text-muted-foreground">
            Cliente: {quotation.clientName} | Creada: {new Date(quotation.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="products">Productos y Servicios</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        {/* Pestaña de Detalles */}
        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Información General</CardTitle>
                  <CardDescription>Detalles de la cotización</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon status={quotation.status} />
                  <StatusBadge status={quotation.status} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Información del Cliente</h3>
                      <div className="mt-1 space-y-2">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Cliente:</div>
                          <div>{quotation.clientName}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Contacto:</div>
                          <div>Juan Pérez</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Email:</div>
                          <div>contacto@{quotation.clientName.toLowerCase().replace(/ /g, "")}.cl</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Teléfono:</div>
                          <div>+56 2 2123 4567</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Detalles de la Cotización</h3>
                      <div className="mt-1 space-y-2">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">ID:</div>
                          <div>{quotation.id}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Fecha de creación:</div>
                          <div>{new Date(quotation.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Fecha de vencimiento:</div>
                          <div>{new Date(quotation.dueDate).toLocaleDateString()}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Última actualización:</div>
                          <div>{new Date(quotation.lastUpdated).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Resumen Financiero</h3>
                      <div className="mt-1 space-y-2">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">Subtotal:</div>
                          <div>{formatCurrency(quotation.amount * 0.81)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-sm font-medium">IVA (19%):</div>
                          <div>{formatCurrency(quotation.amount * 0.19)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1 pt-2 border-t">
                          <div className="text-sm font-medium">Total:</div>
                          <div className="font-bold">{formatCurrency(quotation.amount)}</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {quotation.notes && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Notas</h3>
                        <div className="mt-1 p-3 bg-muted rounded-md text-sm">{quotation.notes}</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={() => router.push("/estimator/quotations")}>
                  Volver al listado
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </Button>
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Reenviar
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
                <CardDescription>Opciones disponibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Cotización
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar Cotización
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Send className="mr-2 h-4 w-4" />
                  Reenviar Cotización
                </Button>
                <Separator />
                {quotation.status !== "approved" && (
                  <Button className="w-full justify-start" variant="outline">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                    Marcar como Aprobada
                  </Button>
                )}
                {quotation.status !== "rejected" && (
                  <Button className="w-full justify-start" variant="outline">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    Marcar como Rechazada
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pestaña de Productos y Servicios */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Productos y Servicios</CardTitle>
              <CardDescription>Detalle de los ítems incluidos en la cotización</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Unitario</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotation.products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(product.price * product.quantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 border rounded-md p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal:</span>
                  <span>{formatCurrency(quotation.amount * 0.81)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">IVA (19%):</span>
                  <span>{formatCurrency(quotation.amount * 0.19)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total:</span>
                  <span>{formatCurrency(quotation.amount)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => router.push("/estimator/quotations")}>
                Volver al listado
              </Button>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Editar Productos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Pestaña de Historial */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de la Cotización</CardTitle>
              <CardDescription>Registro de cambios y actualizaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quotation.history.map((event, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="bg-muted rounded-full p-2">
                      {event.action.includes("creada") ? (
                        <Edit className="h-4 w-4" />
                      ) : event.action.includes("enviada") ? (
                        <Send className="h-4 w-4" />
                      ) : event.action.includes("aprobada") ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : event.action.includes("rechazada") ? (
                        <XCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.action}</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span>{event.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" onClick={() => router.push("/estimator/quotations")}>
                Volver al listado
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
