import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, Upload, Plus } from "lucide-react"

export default function CompanyProfilePage() {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Perfil de Empresa</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="documents">Documentos Corporativos</TabsTrigger>
          <TabsTrigger value="experience">Experiencia</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias de Búsqueda</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Logo e Identidad</CardTitle>
                <CardDescription>Información visual de la empresa</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Company Logo" />
                  <AvatarFallback className="text-2xl">TC</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Cambiar Logo
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Datos Básicos</CardTitle>
                <CardDescription>Información principal de la empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nombre de la Empresa</Label>
                    <Input id="companyName" defaultValue="TechConsulting SpA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rut">RUT</Label>
                    <Input id="rut" defaultValue="76.123.456-7" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    defaultValue="Empresa especializada en servicios de consultoría tecnológica y desarrollo de software para el sector público y privado."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="contacto@techconsulting.cl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" defaultValue="+56 2 2123 4567" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input id="website" defaultValue="https://www.techconsulting.cl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" defaultValue="Av. Providencia 1234, Providencia, Santiago" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Información Comercial</CardTitle>
                <CardDescription>Datos para propuestas y licitaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industria Principal</Label>
                    <Input id="industry" defaultValue="Tecnología de la Información" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employees">Número de Empleados</Label>
                    <Input id="employees" defaultValue="25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founded">Año de Fundación</Label>
                    <Input id="founded" defaultValue="2015" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services">Servicios Principales</Label>
                  <Textarea
                    id="services"
                    rows={3}
                    defaultValue="Desarrollo de software a medida, Consultoría en transformación digital, Implementación de sistemas ERP, Servicios de ciberseguridad, Capacitación técnica."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Corporativos</CardTitle>
              <CardDescription>Documentos legales y comerciales de la empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Constitución de Sociedad</CardTitle>
                      <CardDescription>Actualizado: 10/01/2023</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Actualizar
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Certificado de Vigencia</CardTitle>
                      <CardDescription>Actualizado: 15/03/2023</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Actualizar
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Declaración Jurada</CardTitle>
                      <CardDescription>Actualizado: 05/02/2023</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Actualizar
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Estados Financieros</CardTitle>
                      <CardDescription>Actualizado: 20/03/2023</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Actualizar
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Certificado Bancario</CardTitle>
                      <CardDescription>Actualizado: 12/01/2023</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Actualizar
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border-dashed">
                    <CardHeader className="pb-2 flex flex-col items-center justify-center h-full">
                      <Button variant="ghost" size="sm" className="h-20 w-full">
                        <div className="flex flex-col items-center">
                          <Plus className="h-8 w-8 mb-2" />
                          <span>Agregar Documento</span>
                        </div>
                      </Button>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Experiencia y Referencias</CardTitle>
                <CardDescription>Proyectos y clientes anteriores</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Proyecto
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>Sistema de Gestión Documental</CardTitle>
                      <span className="text-sm text-muted-foreground">2022</span>
                    </div>
                    <CardDescription>Ministerio de Hacienda</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">
                      Desarrollo e implementación de un sistema de gestión documental para el manejo eficiente de
                      documentos internos y externos.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm font-medium">Monto: $120.000.000</span>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>Plataforma de Capacitación Online</CardTitle>
                      <span className="text-sm text-muted-foreground">2021</span>
                    </div>
                    <CardDescription>Servicio Nacional de Capacitación</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">
                      Diseño y desarrollo de una plataforma de e-learning para la gestión de cursos y capacitaciones a
                      nivel nacional.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm font-medium">Monto: $85.000.000</span>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>Sistema de Control de Inventario</CardTitle>
                      <span className="text-sm text-muted-foreground">2020</span>
                    </div>
                    <CardDescription>Hospital San José</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">
                      Implementación de un sistema de control de inventario para la gestión eficiente de insumos médicos
                      y farmacéuticos.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm font-medium">Monto: $65.000.000</span>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Búsqueda</CardTitle>
              <CardDescription>Configura los criterios para la búsqueda automática de licitaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categories">Categorías de Interés</Label>
                  <Textarea
                    id="categories"
                    rows={3}
                    defaultValue="Desarrollo de Software, Consultoría Tecnológica, Servicios Informáticos, Capacitación, Ciberseguridad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regions">Regiones de Interés</Label>
                  <Textarea id="regions" rows={3} defaultValue="Metropolitana, Valparaíso, Biobío" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAmount">Monto Mínimo (CLP)</Label>
                  <Input id="minAmount" defaultValue="10000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAmount">Monto Máximo (CLP)</Label>
                  <Input id="maxAmount" defaultValue="500000000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Palabras Clave</Label>
                <Textarea
                  id="keywords"
                  rows={3}
                  defaultValue="software, desarrollo, implementación, sistema, plataforma, aplicación, tecnología, digital, informático, web, móvil, cloud, nube"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exclusions">Términos a Excluir</Label>
                <Textarea
                  id="exclusions"
                  rows={2}
                  defaultValue="hardware, equipamiento, mobiliario, construcción, obra civil"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Guardar Preferencias
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
