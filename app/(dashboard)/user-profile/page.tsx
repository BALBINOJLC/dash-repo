import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Building, Calendar, Shield } from "lucide-react"

export default function UserProfilePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Mi Perfil</CardTitle>
              <CardDescription>Gestiona tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/professional-person.png" alt="Foto de perfil" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium">Juan Pérez</h3>
              <p className="text-sm text-muted-foreground mb-4">Gerente de Proyectos</p>
              <div className="w-full space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>juan.perez@techconsulting.cl</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>+56 9 8765 4321</span>
                </div>
                <div className="flex items-center text-sm">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>TechConsulting SpA</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Miembro desde: Enero 2023</span>
                </div>
              </div>
              <Button className="mt-6 w-full">Editar Perfil</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Información Personal</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="preferences">Preferencias</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tu información personal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" defaultValue="Juan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" defaultValue="Pérez" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" defaultValue="juan.perez@techconsulting.cl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" defaultValue="+56 9 8765 4321" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Cargo</Label>
                      <Input id="position" defaultValue="Gerente de Proyectos" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Departamento</Label>
                      <Input id="department" defaultValue="Gestión de Proyectos" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" defaultValue="Av. Providencia 1234, Providencia" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" defaultValue="Santiago" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Región</Label>
                      <Input id="region" defaultValue="Metropolitana" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input id="postalCode" defaultValue="7500000" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seguridad</CardTitle>
                  <CardDescription>Gestiona tu contraseña y seguridad de la cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Verificación en dos pasos
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Añade una capa adicional de seguridad a tu cuenta activando la verificación en dos pasos.
                    </p>
                    <Button variant="outline">Configurar verificación en dos pasos</Button>
                  </div>
                  <div className="flex justify-end">
                    <Button>Actualizar Contraseña</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias</CardTitle>
                  <CardDescription>Personaliza tu experiencia en la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Notificaciones por correo</h4>
                        <p className="text-sm text-muted-foreground">Recibe actualizaciones por correo electrónico</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="email-notifications" className="sr-only">
                          Notificaciones por correo
                        </Label>
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Notificaciones en la plataforma</h4>
                        <p className="text-sm text-muted-foreground">Recibe notificaciones dentro de la plataforma</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="platform-notifications" className="sr-only">
                          Notificaciones en la plataforma
                        </Label>
                        <input
                          type="checkbox"
                          id="platform-notifications"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Tema oscuro</h4>
                        <p className="text-sm text-muted-foreground">Utilizar tema oscuro en la plataforma</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="dark-theme" className="sr-only">
                          Tema oscuro
                        </Label>
                        <input
                          type="checkbox"
                          id="dark-theme"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Idioma</h4>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="sr-only">
                        Idioma
                      </Label>
                      <select
                        id="language"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        defaultValue="es"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Guardar Preferencias</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
