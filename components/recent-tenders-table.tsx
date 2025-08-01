"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RecentTendersTable() {
  const router = useRouter()

  const tenders = [
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
        return <AlertCircle className="h-4 w-4 text-amber-600" />
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
          {tenders.map((tender) => (
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
  )
}
