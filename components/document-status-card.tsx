import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileCheck, FilePlus, Mail } from "lucide-react"

export default function DocumentStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          Gestión Documental
        </CardTitle>
        <CardDescription>Estado de documentos requeridos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Documentos disponibles:</span>
            <span className="font-medium">42</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Documentos pendientes:</span>
            <span className="font-medium text-amber-600">8</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Solicitudes enviadas:</span>
            <span className="font-medium">5</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <FilePlus className="mr-2 h-4 w-4" />
          Subir
        </Button>
        <Button size="sm">
          <Mail className="mr-2 h-4 w-4" />
          Solicitar Faltantes
        </Button>
      </CardFooter>
    </Card>
  )
}
