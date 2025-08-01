import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

export default function TenderSearchCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Búsqueda de Licitaciones
        </CardTitle>
        <CardDescription>Configura los criterios de búsqueda automática</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Estado:</span>
            <span className="font-medium text-green-600">Activo</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Última búsqueda:</span>
            <span className="font-medium">Hace 2 horas</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Filtros activos:</span>
            <span className="font-medium">8</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Editar Filtros
        </Button>
        <Button size="sm">
          <Search className="mr-2 h-4 w-4" />
          Buscar Ahora
        </Button>
      </CardFooter>
    </Card>
  )
}
