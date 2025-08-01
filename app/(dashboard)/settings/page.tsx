"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bell, Moon, Sun, Globe, Shield, UserCog, Mail, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [theme, setTheme] = useState("light")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [searchFrequency, setSearchFrequency] = useState("daily")

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ajustes</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="search">Búsqueda</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Ajustes básicos de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Seleccionar idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="w-24"
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Claro
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="w-24"
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Oscuro
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className="w-24"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Sistema
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Horaria</Label>
                <Select defaultValue="america_santiago">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Seleccionar zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america_santiago">América/Santiago (GMT-4)</SelectItem>
                    <SelectItem value="america_buenos_aires">América/Buenos Aires (GMT-3)</SelectItem>
                    <SelectItem value="america_bogota">América/Bogotá (GMT-5)</SelectItem>
                    <SelectItem value="america_mexico_city">América/Ciudad de México (GMT-6)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFormat">Formato de Fecha</Label>
                <Select defaultValue="dd_mm_yyyy">
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder="Seleccionar formato de fecha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd_mm_yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm_dd_yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy_mm_dd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalización</CardTitle>
              <CardDescription>Personaliza la apariencia de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="compactMode">Modo Compacto</Label>
                  <Switch id="compactMode" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Reduce el espaciado y tamaño de los elementos para mostrar más contenido
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sidebarCollapsed">Menú Lateral Colapsado</Label>
                  <Switch id="sidebarCollapsed" />
                </div>
                <p className="text-sm text-muted-foreground">Inicia la aplicación con el menú lateral colapsado</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Recibe notificaciones importantes por correo electrónico
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="pushNotifications">Notificaciones Push</Label>
                  </div>
                  <Switch id="pushNotifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <p className="text-sm text-muted-foreground">Recibe notificaciones en tiempo real en tu navegador</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Tipos de Notificaciones</Label>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newTenders" className="text-sm">
                      Nuevas Licitaciones
                    </Label>
                    <Switch id="newTenders" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="deadlines" className="text-sm">
                      Fechas Límite
                    </Label>
                    <Switch id="deadlines" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="documentUpdates" className="text-sm">
                      Actualizaciones de Documentos
                    </Label>
                    <Switch id="documentUpdates" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="proposalStatus" className="text-sm">
                      Estado de Propuestas
                    </Label>
                    <Switch id="proposalStatus" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Búsqueda</CardTitle>
              <CardDescription>Ajusta cómo funciona la búsqueda automática de licitaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="searchFrequency">Frecuencia de Búsqueda</Label>
                <Select value={searchFrequency} onValueChange={setSearchFrequency}>
                  <SelectTrigger id="searchFrequency">
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Cada hora</SelectItem>
                    <SelectItem value="daily">Diaria</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoAnalysis">Análisis Automático</Label>
                  <Switch id="autoAnalysis" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Analiza automáticamente las nuevas licitaciones encontradas
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="relevanceFilter">Filtro de Relevancia</Label>
                  <Switch id="relevanceFilter" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Muestra solo licitaciones con relevancia media o alta</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="minAmount">Monto Mínimo (CLP)</Label>
                <Input id="minAmount" type="number" defaultValue="5000000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxResults">Resultados Máximos</Label>
                <Input id="maxResults" type="number" defaultValue="50" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad y Privacidad</CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="twoFactor">Autenticación de Dos Factores</Label>
                  </div>
                  <Switch id="twoFactor" />
                </div>
                <p className="text-sm text-muted-foreground">Añade una capa adicional de seguridad a tu cuenta</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="sessionTimeout">Tiempo de Inactividad</Label>
                  </div>
                  <Select defaultValue="30min">
                    <SelectTrigger id="sessionTimeout" className="w-[180px]">
                      <SelectValue placeholder="Seleccionar tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">15 minutos</SelectItem>
                      <SelectItem value="30min">30 minutos</SelectItem>
                      <SelectItem value="1hour">1 hora</SelectItem>
                      <SelectItem value="4hours">4 horas</SelectItem>
                      <SelectItem value="never">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cierra la sesión automáticamente después de un período de inactividad
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full" onClick={() => router.push("/auth/logout")}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión en Este Dispositivo
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => router.push("/auth/logout")}>
                Cerrar Sesión en Todos los Dispositivos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
