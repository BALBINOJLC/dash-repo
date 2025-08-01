"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calculator, Download, Plus, Minus, Save, Share, ArrowRight, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function EstimatorPage() {
  const router = useRouter()
  const [projectType, setProjectType] = useState("software")
  const [complexity, setComplexity] = useState(50)
  const [duration, setDuration] = useState(3)
  const [teamSize, setTeamSize] = useState(4)
  const [includeContingency, setIncludeContingency] = useState(true)
  const [includeSupport, setIncludeSupport] = useState(true)
  const [showEstimation, setShowEstimation] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showAddRoleModal, setShowAddRoleModal] = useState(false)
  const [newRole, setNewRole] = useState({
    name: "",
    rate: 30000,
    hours: 160,
  })

  // Verificar si el usuario está autenticado (simulado)
  useEffect(() => {
    // En una implementación real, verificaríamos el estado de autenticación
    // Si no está autenticado, redirigir al login
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  // Definir los pasos del cotizador
  const steps = ["parameters", "team", "additional", "results"]
  const stepLabels = ["Parámetros", "Equipo y Tarifas", "Costos Adicionales", "Resultados"]

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }

    // Si estamos en el último paso antes de resultados, generar la estimación
    if (currentStep === steps.length - 2) {
      setShowEstimation(true)
    }
  }

  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Roles del equipo con sus tarifas
  const [roles, setRoles] = useState([
    { id: 1, name: "Project Manager", rate: 45000, hours: 160, active: true },
    { id: 2, name: "Senior Developer", rate: 40000, hours: 160, active: true },
    { id: 3, name: "Developer", rate: 30000, hours: 160, active: true },
    { id: 4, name: "QA Engineer", rate: 25000, hours: 120, active: true },
  ])

  // Función para calcular el total de la estimación
  const calculateEstimation = () => {
    // Cálculo básico de costos por rol
    const roleCosts = roles
      .filter((role) => role.active)
      .map((role) => ({
        ...role,
        totalCost: role.rate * role.hours,
      }))

    // Costo total de roles
    const totalRoleCost = roleCosts.reduce((sum, role) => sum + role.totalCost, 0)

    // Ajuste por complejidad (entre 0.8 y 1.5)
    const complexityFactor = 0.8 + (complexity / 100) * 0.7

    // Ajuste por duración
    const durationFactor = 1 + (duration - 1) * 0.1

    // Costo base ajustado
    const adjustedCost = totalRoleCost * complexityFactor * durationFactor

    // Contingencia (10%)
    const contingencyCost = includeContingency ? adjustedCost * 0.1 : 0

    // Soporte post-implementación (15%)
    const supportCost = includeSupport ? adjustedCost * 0.15 : 0

    // Costo total
    const totalCost = adjustedCost + contingencyCost + supportCost

    return {
      roleCosts,
      totalRoleCost,
      complexityFactor,
      durationFactor,
      adjustedCost,
      contingencyCost,
      supportCost,
      totalCost,
    }
  }

  // Función para actualizar las horas de un rol
  const updateRoleHours = (id, hours) => {
    setRoles(
      roles.map((role) => {
        if (role.id === id) {
          return { ...role, hours: Math.max(0, hours) }
        }
        return role
      }),
    )
  }

  // Función para actualizar la tarifa de un rol
  const updateRoleRate = (id, rate) => {
    setRoles(
      roles.map((role) => {
        if (role.id === id) {
          return { ...role, rate: Math.max(0, rate) }
        }
        return role
      }),
    )
  }

  // Función para activar/desactivar un rol
  const toggleRole = (id) => {
    setRoles(
      roles.map((role) => {
        if (role.id === id) {
          return { ...role, active: !role.active }
        }
        return role
      }),
    )
  }

  // Función para agregar un nuevo rol
  const addRole = () => {
    const newId = Math.max(...roles.map((role) => role.id), 0) + 1
    setRoles([
      ...roles,
      { id: newId, name: newRole.name || "Nuevo Rol", rate: newRole.rate, hours: newRole.hours, active: true },
    ])
    setNewRole({ name: "", rate: 30000, hours: 160 }) // Resetear el formulario
    setShowAddRoleModal(false) // Cerrar el modal
  }

  // Función para eliminar un rol
  const removeRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  // Función para generar la estimación
  const generateEstimation = () => {
    setShowEstimation(true)
  }

  // Obtener la estimación calculada
  const estimation = calculateEstimation()

  // Formatear número como moneda CLP
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cotizador / Estimador de Proyectos</h1>
          <p className="text-muted-foreground">Genera estimaciones precisas para tus proyectos y licitaciones</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="flex justify-between mb-2">
            {stepLabels.map((label, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${index > currentStep && !showEstimation ? "text-muted-foreground" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                  ${
                    index === currentStep
                      ? "bg-primary text-primary-foreground"
                      : index < currentStep || (index === 3 && showEstimation)
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
          <div className="overflow-hidden h-1 mb-6 flex rounded bg-muted">
            <div
              className="bg-primary transition-all duration-500"
              style={{
                width: `${((currentStep + (showEstimation && currentStep === steps.length - 2 ? 1 : 0)) / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <Tabs value={steps[currentStep]} className="space-y-4">
        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parámetros del Proyecto</CardTitle>
              <CardDescription>Define las características básicas del proyecto a estimar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Tipo de Proyecto</Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger id="projectType">
                      <SelectValue placeholder="Seleccionar tipo de proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Desarrollo de Software</SelectItem>
                      <SelectItem value="web">Desarrollo Web</SelectItem>
                      <SelectItem value="mobile">Aplicación Móvil</SelectItem>
                      <SelectItem value="consulting">Consultoría</SelectItem>
                      <SelectItem value="integration">Integración de Sistemas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duración Estimada (meses)</Label>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => setDuration(Math.max(1, duration - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="text-center"
                    />
                    <Button variant="outline" size="icon" onClick={() => setDuration(duration + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="complexity">Complejidad del Proyecto</Label>
                  <span className="text-sm text-muted-foreground">
                    {complexity < 33 ? "Baja" : complexity < 66 ? "Media" : "Alta"}
                  </span>
                </div>
                <Slider
                  id="complexity"
                  min={0}
                  max={100}
                  step={1}
                  value={[complexity]}
                  onValueChange={(value) => setComplexity(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Baja</span>
                  <span>Media</span>
                  <span>Alta</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción del Proyecto</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Describe brevemente el alcance y objetivos del proyecto..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Equipo y Tarifas</CardTitle>
                <CardDescription>Define los roles, tarifas y horas estimadas</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowAddRoleModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Rol
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="border rounded-md p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={role.active}
                          onCheckedChange={() => toggleRole(role.id)}
                          id={`role-${role.id}`}
                        />
                        <Input
                          value={role.name}
                          onChange={(e) =>
                            setRoles(roles.map((r) => (r.id === role.id ? { ...r, name: e.target.value } : r)))
                          }
                          className={`font-medium ${!role.active ? "opacity-50" : ""}`}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRole(role.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`rate-${role.id}`}>Tarifa Hora (CLP)</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id={`rate-${role.id}`}
                            type="number"
                            value={role.rate}
                            onChange={(e) => updateRoleRate(role.id, Number.parseInt(e.target.value) || 0)}
                            className={!role.active ? "opacity-50" : ""}
                            disabled={!role.active}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`hours-${role.id}`}>Horas Mensuales</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateRoleHours(role.id, role.hours - 10)}
                            disabled={!role.active}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            id={`hours-${role.id}`}
                            type="number"
                            value={role.hours}
                            onChange={(e) => updateRoleHours(role.id, Number.parseInt(e.target.value) || 0)}
                            className={`text-center ${!role.active ? "opacity-50" : ""}`}
                            disabled={!role.active}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateRoleHours(role.id, role.hours + 10)}
                            disabled={!role.active}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {role.active && (
                      <div className="pt-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Mensual:</span>
                          <span className="font-medium">{formatCurrency(role.rate * role.hours)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Proyecto ({duration} meses):</span>
                          <span className="font-medium">{formatCurrency(role.rate * role.hours * duration)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">{roles.filter((r) => r.active).length} roles activos</div>
              <div className="font-medium">Total Equipo: {formatCurrency(estimation.totalRoleCost * duration)}</div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="additional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Costos Adicionales</CardTitle>
              <CardDescription>Configura otros costos y ajustes para la estimación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="contingency">Contingencia (10%)</Label>
                    <p className="text-sm text-muted-foreground">Reserva para imprevistos y cambios de alcance</p>
                  </div>
                  <Switch id="contingency" checked={includeContingency} onCheckedChange={setIncludeContingency} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="support">Soporte Post-Implementación (15%)</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye mantenimiento y soporte después de la entrega
                    </p>
                  </div>
                  <Switch id="support" checked={includeSupport} onCheckedChange={setIncludeSupport} />
                </div>

                <Separator />

                <div className="pt-2">
                  <Label>Otros Costos</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="licenses">Licencias de Software</Label>
                      <Input id="licenses" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="infrastructure">Infraestructura</Label>
                      <Input id="infrastructure" type="number" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {showEstimation && (
          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Resultado de la Estimación
                </CardTitle>
                <CardDescription>
                  Estimación generada para un proyecto de {duration} meses con complejidad{" "}
                  {complexity < 33 ? "baja" : complexity < 66 ? "media" : "alta"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-center mb-2">
                      {formatCurrency(estimation.totalCost * duration)}
                    </h3>
                    <p className="text-center text-muted-foreground">Costo Total Estimado</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Desglose de Costos</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Costo Base (Equipo)</span>
                        <span>{formatCurrency(estimation.totalRoleCost * duration)}</span>
                      </div>
                      <Progress
                        value={(estimation.totalRoleCost * duration * 100) / (estimation.totalCost * duration)}
                        className="h-2"
                      />
                    </div>

                    {includeContingency && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Contingencia (10%)</span>
                          <span>{formatCurrency(estimation.contingencyCost * duration)}</span>
                        </div>
                        <Progress
                          value={(estimation.contingencyCost * duration * 100) / (estimation.totalCost * duration)}
                          className="h-2"
                        />
                      </div>
                    )}

                    {includeSupport && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Soporte Post-Implementación (15%)</span>
                          <span>{formatCurrency(estimation.supportCost * duration)}</span>
                        </div>
                        <Progress
                          value={(estimation.supportCost * duration * 100) / (estimation.totalCost * duration)}
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Desglose por Rol</h4>
                    <div className="space-y-3">
                      {estimation.roleCosts
                        .filter((role) => role.active)
                        .map((role) => (
                          <div key={role.id} className="space-y-1">
                            <div className="flex justify-between">
                              <span>{role.name}</span>
                              <span>{formatCurrency(role.totalCost * duration)}</span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>
                                {role.hours} horas/mes × {formatCurrency(role.rate)}/hora × {duration} meses
                              </span>
                              <span>
                                {((role.totalCost * duration * 100) / (estimation.totalRoleCost * duration)).toFixed(1)}
                                %
                              </span>
                            </div>
                            <Progress
                              value={(role.totalCost * duration * 100) / (estimation.totalRoleCost * duration)}
                              className="h-1.5"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Factores de Ajuste Aplicados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Factor de Complejidad</p>
                        <p className="font-medium">
                          {estimation.complexityFactor.toFixed(2)}× (
                          {complexity < 33 ? "Baja" : complexity < 66 ? "Media" : "Alta"})
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Factor de Duración</p>
                        <p className="font-medium">
                          {estimation.durationFactor.toFixed(2)}× ({duration} meses)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </Button>
                  <Button>
                    <Share className="mr-2 h-4 w-4" />
                    Compartir
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones</CardTitle>
                <CardDescription>Sugerencias basadas en tu estimación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-blue-100 text-blue-800 hover:bg-blue-100">Consejo</Badge>
                    <p>
                      Para proyectos de {duration} meses, considera agregar un{" "}
                      <span className="font-medium">QA Engineer adicional</span> para mantener la calidad durante todo
                      el ciclo de desarrollo.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-amber-100 text-amber-800 hover:bg-amber-100">Advertencia</Badge>
                    <p>
                      La complejidad {complexity < 33 ? "baja" : complexity < 66 ? "media" : "alta"} podría requerir{" "}
                      <span className="font-medium">
                        {complexity < 33 ? "menos" : complexity > 66 ? "más" : "un nivel adecuado de"} especialización
                      </span>{" "}
                      en los roles asignados.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-green-100 text-green-800 hover:bg-green-100">Optimización</Badge>
                    <p>
                      Podrías reducir costos ajustando las horas del Project Manager en los meses intermedios del
                      proyecto, cuando la supervisión puede ser menos intensiva.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <div className="mt-6 flex justify-between">
        {currentStep > 0 && (
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
        )}

        {currentStep === 0 && <div></div>}

        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep}>
            {currentStep === steps.length - 2 ? (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Generar Estimación
              </>
            ) : (
              <>
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Guardar Estimación
            </Button>
          </div>
        )}
      </div>
      <Dialog open={showAddRoleModal} onOpenChange={setShowAddRoleModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Rol</DialogTitle>
            <DialogDescription>Ingresa los detalles del nuevo rol para el proyecto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Nombre del Rol</Label>
              <Input
                id="roleName"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="Ej: UX Designer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleRate">Tarifa por Hora (CLP)</Label>
              <Input
                id="roleRate"
                type="number"
                value={newRole.rate}
                onChange={(e) => setNewRole({ ...newRole, rate: Number(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleHours">Horas Mensuales</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNewRole({ ...newRole, hours: Math.max(0, newRole.hours - 10) })}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="roleHours"
                  type="number"
                  value={newRole.hours}
                  onChange={(e) => setNewRole({ ...newRole, hours: Number(e.target.value) || 0 })}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNewRole({ ...newRole, hours: newRole.hours + 10 })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-sm">
                <span>Total Mensual:</span>
                <span className="font-medium">{formatCurrency(newRole.rate * newRole.hours)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Proyecto ({duration} meses):</span>
                <span className="font-medium">{formatCurrency(newRole.rate * newRole.hours * duration)}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRoleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={addRole}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
