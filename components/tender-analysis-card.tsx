import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Brain } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function TenderAnalysisCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Análisis de Bases
        </CardTitle>
        <CardDescription>Procesamiento de documentos con IA</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>En proceso:</span>
              <span className="font-medium">3 licitaciones</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Completados hoy:</span>
            <span className="font-medium">5</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Tiempo promedio:</span>
            <span className="font-medium">8 minutos</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <FileText className="mr-2 h-4 w-4" />
          Ver Análisis Recientes
        </Button>
      </CardFooter>
    </Card>
  )
}
