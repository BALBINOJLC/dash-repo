"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Download,
  FileText,
  Brain,
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  Edit,
  Send,
  Plus,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TenderDetailPage({ params }) {
  const router = useRouter()
  const [tender, setTender] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState(null)

  // Simular carga de datos de la licitación
  useEffect(() => {
    const fetchTenderData = async () => {
      // En una implementación real, esto sería una llamada a la API
      // usando el ID de la licitación (params.id)

      // Datos simulados para demostración
      const tenderData = {
        id: params.id,
        title: "Servicio de Mantención de Equipos Informáticos",
        entity: "Ministerio de Educación",
        deadline: "2023-05-15",
        status: "analysis",
        category: "Servicios",
        amount: "$15,000,000",
        region: "Metropolitana",
        publishDate: "2023-04-01",
        relevance: "Alta",

        // Datos de análisis
        analysis: {
          status: "completed",
          progress: 100,
          startDate: "2023-04-10",
          completionDate: "2023-04-10",
          processingTime: "8 minutos",
          documentCount: 5,
          keyRequirements: [
            "Experiencia mínima de 5 años en mantención de equipos informáticos",
            "Certificaciones técnicas del personal (Microsoft, Cisco, etc.)",
            "Disponibilidad 24/7 para soporte crítico",
            "Tiempo de respuesta máximo de 4 horas para incidentes críticos",
            "Capacidad para atender al menos 500 equipos",
            "Contar con sistema de tickets para seguimiento de incidencias",
          ],
          evaluationCriteria: [
            {
              name: "Experiencia",
              weight: 30,
              description: "Años de experiencia y proyectos similares realizados",
            },
            {
              name: "Oferta Técnica",
              weight: 40,
              description: "Calidad de la propuesta técnica y metodología",
            },
            {
              name: "Oferta Económica",
              weight: 20,
              description: "Precio total y desglose de costos",
            },
            {
              name: "Cumplimiento de Requisitos Adicionales",
              weight: 10,
              description: "Certificaciones, mejoras propuestas, etc.",
            },
          ],
          relevanceScore: 85,
          compatibility: "Alta",
        },

        // Datos de documentos
        documents: [
          {
            name: "Certificado de Vigencia",
            type: "Legal",
            status: "valid",
            lastUpdated: "2023-01-15",
            expiry: "2023-12-31",
          },
          {
            name: "Declaración Jurada",
            type: "Legal",
            status: "valid",
            lastUpdated: "2023-01-15",
            expiry: "2023-12-31",
          },
          {
            name: "Estados Financieros",
            type: "Financiero",
            status: "valid",
            lastUpdated: "2023-01-15",
            expiry: "2023-12-31",
          },
          {
            name: "Certificado Bancario",
            type: "Financiero",
            status: "valid",
            lastUpdated: "2023-01-15",
            expiry: "2023-12-31",
          },
          {
            name: "Certificado de Experiencia",
            type: "Técnico",
            status: "pending",
            lastUpdated: null,
            expiry: null,
          },
        ],

        // Datos de propuestas
        proposals: [
          {
            id: "prop1",
            status: "draft",
            createdAt: "2023-04-10",
            progress: 35,
            amount: "$45,000,000",
          },
        ],
      }

      setTender(tenderData)
      setLoading(false)
    }

    fetchTenderData()
  }, [params.id])

  const handleReviewProposal = (proposal) => {
    setSelectedProposal(proposal)
    setShowReviewDialog(true)
  }

  const handleSaveAsDraft = () => {
    setShowReviewDialog(false)
    // Aquí iría la lógica para guardar como borrador
  }

  const handleConfirmSubmit = () => {
    setShowReviewDialog(false)
    setShowConfirmDialog(true)
  }

  const handleSubmitProposal = () => {
    setShowConfirmDialog(false)
    // Aquí iría la lógica para enviar la propuesta
    // Por ahora, solo mostraremos un mensaje en la consola
    console.log("Propuesta enviada:", selectedProposal)
  }

  // Función para obtener el badge de estado
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

  // Función para obtener el icono de estado
  const getStatusIcon = (status) => {
    switch (status) {
      case "analysis":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "submitted":
        return <FileText className="h-4 w-4 text-purple-600" />
      default:
        return null
    }
  }

  // Función para obtener el badge de estado de documento
  const getDocStatusBadge = (status) => {
    switch (status) {
      case "valid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Válido
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pendiente
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Expirado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  // Función para obtener el icono de estado de documento
  const getDocStatusIcon = (status) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  // Función para obtener el badge de estado de propuesta
  const getProposalStatusBadge = (status) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Borrador
          </Badge>
        )
      case "review":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            En Revisión
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Enviada
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  if (loading) {
    return (
      <div className="py-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <h2 className="text-xl font-semibold">Cargando información de la licitación...</h2>
        </div>
      </div>
    )
  }

  if (!tender) {
    return (
      <div className="py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/tenders")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold">Licitación no encontrada</h1>
        </div>

        <Card>
          <CardContent className="py-10 flex flex-col items-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Licitación no encontrada</h2>
            <p className="text-muted-foreground mb-6">La licitación que está buscando no existe o ha sido eliminada</p>
            <Button onClick={() => router.push("/tenders")}>Volver a Licitaciones</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-6">
      {/* Breadcrumbs y título */}
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/tenders")}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Volver a Licitaciones
        </Button>

        <div>
          <h1 className="text-2xl font-bold">{tender.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">
              {tender.entity} - {tender.id}
            </p>
            <div className="flex items-center gap-1">
              {getStatusIcon(tender.status)}
              {getStatusBadge(tender.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de la licitación */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Fecha Publicación</p>
              <p className="text-sm font-medium">{tender.publishDate}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Fecha Límite</p>
              <p className="text-sm font-medium">{tender.deadline}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Monto</p>
              <p className="text-sm font-medium">{tender.amount}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Relevancia</p>
              <p className="text-sm font-medium">{tender.relevance}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para las secciones principales */}
      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Análisis de Bases con AI</TabsTrigger>
          <TabsTrigger value="documents">Documentación</TabsTrigger>
          <TabsTrigger value="proposals">Propuestas</TabsTrigger>
        </TabsList>

        {/* Contenido de la pestaña de Análisis */}
        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Requisitos Clave
                </CardTitle>
                <CardDescription>Requisitos identificados en las bases de la licitación</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tender.analysis.keyRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Requisitos
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Criterios de Evaluación
                </CardTitle>
                <CardDescription>Criterios y ponderaciones para la evaluación de ofertas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tender.analysis.evaluationCriteria.map((criteria, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-primary">{criteria.weight}%</span>
                          </div>
                          <span className="font-medium">{criteria.name}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground pl-8">{criteria.description}</p>
                      {index < tender.analysis.evaluationCriteria.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Análisis de Compatibilidad
              </CardTitle>
              <CardDescription>Evaluación de la compatibilidad con la empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-green-600">{tender.analysis.relevanceScore}%</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Compatibilidad {tender.analysis.compatibility}</h3>
                    <p className="text-sm text-muted-foreground">
                      La empresa cuenta con experiencia similar y cumple con la mayoría de los requisitos técnicos
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Descargar Análisis
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Contenido de la pestaña de Documentación */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Documentos Requeridos</h2>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Subir Documento
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {tender.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      {getDocStatusIcon(doc.status)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                          {getDocStatusBadge(doc.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === "valid" ? (
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar
                        </Button>
                      ) : (
                        <Button size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Subir
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Descargar Todos
              </Button>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Gestionar Documentos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Contenido de la pestaña de Propuestas */}
        <TabsContent value="proposals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Propuestas Comerciales</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Propuesta
            </Button>
          </div>

          {tender.proposals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tender.proposals.map((prop) => (
                <Card key={prop.id} className="overflow-hidden border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Propuesta {prop.id}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <CardDescription>Creada: {prop.createdAt}</CardDescription>
                          {getProposalStatusBadge(prop.status)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Monto</p>
                        <p className="text-sm font-medium">{prop.amount}</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-medium text-muted-foreground">Progreso</p>
                          <span className="text-xs font-medium">{prop.progress}%</span>
                        </div>
                        <Progress value={prop.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full">
                      {prop.status === "draft" && (
                        <Button size="sm" className="w-full" onClick={() => handleReviewProposal(prop)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Revisar propuesta generada
                        </Button>
                      )}

                      {prop.status === "review" && (
                        <Button size="sm" className="w-full" onClick={() => handleReviewProposal(prop)}>
                          <Send className="mr-2 h-4 w-4" />
                          Revisar y enviar propuesta
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10 flex flex-col items-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No hay propuestas</h2>
                <p className="text-muted-foreground mb-6 text-center">
                  Aún no se han creado propuestas para esta licitación
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Primera Propuesta
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Diálogo de revisión de propuesta */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Revisión de Propuesta</DialogTitle>
            <DialogDescription>Revisa los detalles de tu propuesta antes de enviarla.</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 my-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Resumen de la propuesta</h3>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Propuesta {selectedProposal?.id}</CardTitle>
                    <CardDescription>Creada: {selectedProposal?.createdAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Monto</p>
                        <p className="text-sm font-medium">{selectedProposal?.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Estado</p>
                        <p className="text-sm font-medium">Borrador</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Contenido generado por IA</h3>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold">Resumen Ejecutivo</h4>
                    <p className="text-sm text-muted-foreground">
                      Nuestra propuesta ofrece un servicio integral de mantención de equipos informáticos para el
                      Ministerio de Educación, con un equipo certificado y con amplia experiencia en el sector público.
                      Garantizamos tiempos de respuesta inferiores a 4 horas para incidentes críticos y disponibilidad
                      24/7.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Enfoque Técnico</h4>
                    <p className="text-sm text-muted-foreground">
                      Implementaremos un sistema de tickets para seguimiento de incidencias, con capacidad para atender
                      más de 500 equipos simultáneamente. Nuestro personal cuenta con certificaciones Microsoft y Cisco,
                      y utilizaremos herramientas de diagnóstico remoto para optimizar tiempos de respuesta.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Experiencia y Calificaciones</h4>
                    <p className="text-sm text-muted-foreground">
                      Contamos con 7 años de experiencia en mantención de equipos informáticos para entidades públicas,
                      incluyendo proyectos similares para el Ministerio de Salud y la Municipalidad de Santiago.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Archivos adjuntos</h3>
                <div className="rounded-md border p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Propuesta_Técnica.pdf</span>
                      </div>
                      <Badge variant="outline">2.4 MB</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Propuesta_Económica.pdf</span>
                      </div>
                      <Badge variant="outline">1.8 MB</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Comentarios adicionales</h3>
                <Textarea
                  placeholder="Añade cualquier comentario o nota adicional para esta propuesta..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <Alert variant="destructive" className="mt-2 mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-medium">
              IMPORTANTE: Una vez enviada la propuesta, no podrá ser editada ni modificada.
            </AlertDescription>
          </Alert>

          <DialogFooter className="border-t pt-4 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleSaveAsDraft} className="sm:flex-1">
              Guardar como borrador
            </Button>
            <Button onClick={handleConfirmSubmit} className="sm:flex-1 bg-primary text-primary-foreground font-medium">
              <Send className="mr-2 h-4 w-4" />
              Enviar propuesta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación de envío */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar envío</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas enviar esta postulación? Luego no podrás editarla.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="sm:flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSubmitProposal} className="sm:flex-1">
              Sí, enviar postulación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
