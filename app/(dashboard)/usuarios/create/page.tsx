"use client"
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Shield,
  AlertTriangle
} from "lucide-react";

// Componentes UI
const Button = ({ children, variant = "default", size = "default", className = "", onClick, disabled, type = "button", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8",
    icon: "h-10 w-10"
  };
  
  return (
    <button 
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Input = ({ className = "", error, ...props }) => (
  <input 
    className={`flex h-10 w-full rounded-md border ${error ? 'border-red-300' : 'border-gray-300'} bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ children, className = "", required, ...props }) => (
  <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const Select = ({ children, value, onValueChange, placeholder = "Seleccionar...", error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  React.useEffect(() => {
    const selectedChild = React.Children.toArray(children).find(child => child.props.value === value);
    setSelectedLabel(selectedChild ? selectedChild.props.children : '');
  }, [value, children]);

  return (
    <div className="relative">
      <button 
        type="button"
        className={`flex h-10 w-full items-center justify-between rounded-md border ${error ? 'border-red-300' : 'border-gray-300'} bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedLabel ? 'text-gray-900' : 'text-gray-400'}>
          {selectedLabel || placeholder}
        </span>
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full z-50 w-full mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
          {React.Children.map(children, child => 
            React.cloneElement(child, { 
              onClick: () => { 
                onValueChange(child.props.value); 
                setIsOpen(false); 
              } 
            })
          )}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ children, value, onClick }) => (
  <div 
    className="relative flex w-full cursor-pointer select-none items-center py-2 px-3 text-sm hover:bg-gray-100"
    onClick={onClick}
  >
    {children}
  </div>
);

const Alert = ({ children, variant = "default" }) => (
  <div className={`relative w-full rounded-lg border p-4 ${
    variant === 'destructive' ? 'border-red-200 bg-red-50 text-red-800' : 
    variant === 'warning' ? 'border-yellow-200 bg-yellow-50 text-yellow-800' :
    'border-gray-200'
  }`}>
    {children}
  </div>
);

const AlertDescription = ({ children }) => (
  <div className="text-sm">
    {children}
  </div>
);

const Separator = ({ className = "" }) => (
  <div className={`shrink-0 bg-gray-200 h-[1px] w-full ${className}`} />
);

// Componente principal del formulario
const UserCreateForm = () => {
  const [mode, setMode] = useState('create'); // 'create' o 'edit'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "user",
    department: "",
    position: "",
    status: "active",
    address: "",
    birthDate: "",
    hireDate: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido";
    }

    if (!formData.department.trim()) {
      newErrors.department = "El departamento es requerido";
    }

    if (!formData.position.trim()) {
      newErrors.position = "El cargo es requerido";
    }

    if (mode === 'create') {
      if (!formData.password) {
        newErrors.password = "La contraseña es requerida";
      } else if (formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Datos del formulario:', formData);
      
      // Aquí iría la lógica para enviar los datos al backend
      if (mode === 'create') {
        console.log('Creando nuevo usuario...');
      } else {
        console.log('Actualizando usuario...');
      }

      // Redirigir o mostrar mensaje de éxito
      alert(mode === 'create' ? 'Usuario creado exitosamente' : 'Usuario actualizado exitosamente');
      
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    window.location.href = '/usuarios';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error si existe
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({
      ...prev,
      password: password,
      confirmPassword: password
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
          </h1>
          <p className="text-gray-600">
            {mode === 'create' 
              ? 'Completa la información para crear un nuevo usuario en el sistema'
              : 'Modifica la información del usuario'
            }
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>
              Datos básicos del usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" required>Nombre</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={!!errors.firstName}
                  placeholder="Ingresa el nombre"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" required>Apellido</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={!!errors.lastName}
                  placeholder="Ingresa el apellido"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" required>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    placeholder="usuario@empresa.cl"
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+56 9 1234 5678"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Av. Providencia 1234, Santiago"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Fecha de Ingreso</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="hireDate"
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) => handleInputChange('hireDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información Laboral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Información Laboral
            </CardTitle>
            <CardDescription>
              Datos relacionados con el trabajo y rol en la empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department" required>Departamento</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleInputChange('department', value)}
                  error={!!errors.department}
                  placeholder="Seleccionar departamento"
                >
                  <SelectItem value="Tecnología">Tecnología</SelectItem>
                  <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                  <SelectItem value="Ventas">Ventas</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operaciones">Operaciones</SelectItem>
                  <SelectItem value="Finanzas">Finanzas</SelectItem>
                  <SelectItem value="Administración">Administración</SelectItem>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-600">{errors.department}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" required>Cargo</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  error={!!errors.position}
                  placeholder="Ej: Gerente de TI"
                />
                {errors.position && (
                  <p className="text-sm text-red-600">{errors.position}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Rol en el Sistema</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => handleInputChange('role', value)}
                  placeholder="Seleccionar rol"
                >
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </Select>
                <p className="text-xs text-gray-500">
                  {formData.role === 'admin' && 'Acceso completo al sistema'}
                  {formData.role === 'manager' && 'Acceso a gestión de equipo y reportes'}
                  {formData.role === 'user' && 'Acceso básico al sistema'}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleInputChange('status', value)}
                  placeholder="Seleccionar estado"
                >
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="suspended">Suspendido</SelectItem>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Acceso */}
        {mode === 'create' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Acceso
              </CardTitle>
              <CardDescription>
                Credenciales de acceso al sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="warning">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Se enviará un email al usuario con las credenciales de acceso temporal.
                  </AlertDescription>
                </div>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" required>Contraseña Temporal</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={!!errors.password}
                      placeholder="Mínimo 8 caracteres"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" required>Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    error={!!errors.confirmPassword}
                    placeholder="Repetir contraseña"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-start">
                <Button type="button" variant="outline" onClick={generatePassword}>
                  Generar Contraseña Segura
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Botones de acción */}
        <Card>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleGoBack}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting 
                ? 'Guardando...' 
                : mode === 'create' 
                  ? 'Crear Usuario' 
                  : 'Guardar Cambios'
              }
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserCreateForm;