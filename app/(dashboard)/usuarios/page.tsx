"use client"
import React, { useState } from 'react';
import { 
  SearchIcon, 
  Download, 
  Plus, 
  Edit,
  Trash2,
  UserPlus,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Shield,
  Eye,
  EyeOff,
  Save
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

const Input = ({ className = "", ...props }) => (
  <input 
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ children, className = "", ...props }) => (
  <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);

const Badge = ({ children, className = "" }) => (
  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </div>
);

const Select = ({ children, value, onValueChange, placeholder = "Seleccionar..." }) => {
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
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

const Table = ({ children, className = "" }) => (
  <div className="w-full overflow-auto">
    <table className={`w-full text-sm ${className}`}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
const TableBody = ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>;
const TableRow = ({ children, className = "", onClick }) => (
  <tr className={`hover:bg-gray-50 ${onClick ? 'cursor-pointer' : ''} ${className}`} onClick={onClick}>
    {children}
  </tr>
);
const TableHead = ({ children, className = "" }) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
    {children}
  </td>
);

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {React.Children.map(children, child => 
          React.cloneElement(child, { onOpenChange })
        )}
      </div>
    </div>
  );
};

const DialogHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
);

const DialogTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-900">
    {children}
  </h2>
);

const DialogDescription = ({ children }) => (
  <p className="text-sm text-gray-600 mt-1">
    {children}
  </p>
);

const DialogContent = ({ children }) => (
  <div className="px-6 py-4 space-y-4">
    {children}
  </div>
);

const DialogFooter = ({ children }) => (
  <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
    {children}
  </div>
);

// Datos de ejemplo para usuarios
const mockUsers = [
  {
    id: "USR-001",
    firstName: "Juan Carlos",
    lastName: "Pérez González",
    email: "juan.perez@empresa.cl",
    phone: "+56 9 8765 4321",
    role: "admin",
    department: "Tecnología",
    position: "Gerente de TI",
    status: "active",
    createdAt: "2023-01-15",
    lastLogin: "2024-01-20",
    avatar: null,
    address: "Av. Providencia 1234, Santiago",
    birthDate: "1985-05-12",
    hireDate: "2020-03-01"
  },
  {
    id: "USR-002",
    firstName: "María Elena",
    lastName: "González Rodríguez",
    email: "maria.gonzalez@empresa.cl",
    phone: "+56 9 7654 3210",
    role: "manager",
    department: "Recursos Humanos",
    position: "Jefa de RRHH",
    status: "active",
    createdAt: "2023-02-20",
    lastLogin: "2024-01-19",
    avatar: null,
    address: "Av. Las Condes 5678, Las Condes",
    birthDate: "1988-08-25",
    hireDate: "2021-06-15"
  },
  {
    id: "USR-003",
    firstName: "Carlos Alberto",
    lastName: "Ruiz Morales",
    email: "carlos.ruiz@empresa.cl",
    phone: "+56 9 6543 2109",
    role: "user",
    department: "Ventas",
    position: "Ejecutivo de Ventas",
    status: "active",
    createdAt: "2023-03-10",
    lastLogin: "2024-01-18",
    avatar: null,
    address: "Av. Vitacura 9876, Vitacura",
    birthDate: "1990-12-03",
    hireDate: "2022-01-10"
  },
  {
    id: "USR-004",
    firstName: "Ana Patricia",
    lastName: "Martínez Silva",
    email: "ana.martinez@empresa.cl",
    phone: "+56 9 5432 1098",
    role: "user",
    department: "Marketing",
    position: "Especialista en Marketing",
    status: "inactive",
    createdAt: "2023-04-05",
    lastLogin: "2023-12-15",
    avatar: null,
    address: "Av. Apoquindo 3456, Las Condes",
    birthDate: "1992-03-18",
    hireDate: "2022-08-20"
  },
  {
    id: "USR-005",
    firstName: "Roberto Antonio",
    lastName: "Vega Hernández",
    email: "roberto.vega@empresa.cl",
    phone: "+56 9 4321 0987",
    role: "manager",
    department: "Operaciones",
    position: "Jefe de Operaciones",
    status: "active",
    createdAt: "2023-05-12",
    lastLogin: "2024-01-20",
    avatar: null,
    address: "Av. Libertador 7890, Providencia",
    birthDate: "1983-09-07",
    hireDate: "2019-11-05"
  },
  {
    id: "USR-006",
    firstName: "Laura Isabel",
    lastName: "Díaz Castillo",
    email: "laura.diaz@empresa.cl",
    phone: "+56 9 3210 9876",
    role: "user",
    department: "Finanzas",
    position: "Analista Financiero",
    status: "pending",
    createdAt: "2024-01-10",
    lastLogin: null,
    avatar: null,
    address: "Av. Kennedy 2345, Las Condes",
    birthDate: "1991-07-22",
    hireDate: "2024-01-15"
  }
];

// Componente para mostrar el estado del usuario
const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { label: "Activo", color: "bg-green-100 text-green-800" },
    inactive: { label: "Inactivo", color: "bg-red-100 text-red-800" },
    pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
    suspended: { label: "Suspendido", color: "bg-gray-100 text-gray-800" }
  };

  const config = statusConfig[status] || statusConfig.pending;
  return <Badge className={config.color}>{config.label}</Badge>;
};

// Componente para mostrar el rol del usuario
const RoleBadge = ({ role }) => {
  const roleConfig = {
    admin: { label: "Administrador", color: "bg-purple-100 text-purple-800" },
    manager: { label: "Gerente", color: "bg-blue-100 text-blue-800" },
    user: { label: "Usuario", color: "bg-gray-100 text-gray-800" }
  };

  const config = roleConfig[role] || roleConfig.user;
  return <Badge className={config.color}>{config.label}</Badge>;
};

// Componente para mostrar el ícono de estado
const StatusIcon = ({ status, className = "h-5 w-5" }) => {
  switch (status) {
    case "active":
      return <CheckCircle2 className={`text-green-600 ${className}`} />;
    case "inactive":
      return <XCircle className={`text-red-600 ${className}`} />;
    case "pending":
      return <Clock className={`text-yellow-600 ${className}`} />;
    case "suspended":
      return <AlertTriangle className={`text-gray-600 ${className}`} />;
    default:
      return <Clock className={`text-gray-600 ${className}`} />;
  }
};

// Componente principal de la lista de usuarios
const UsersListPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
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
    hireDate: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  // Filtrar usuarios
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Calcular estadísticas
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
    pending: users.filter(u => u.status === "pending").length,
    admins: users.filter(u => u.role === "admin").length,
    managers: users.filter(u => u.role === "manager").length,
    regularUsers: users.filter(u => u.role === "user").length
  };

  // Funciones para manejar el formulario
  const resetForm = () => {
    setFormData({
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
      hireDate: ""
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (formMode === 'create') {
      const newUser = {
        ...formData,
        id: `USR-${(users.length + 1).toString().padStart(3, '0')}`,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: null,
        avatar: null
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      ));
    }
    
    setShowUserForm(false);
    resetForm();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      position: user.position,
      status: user.status,
      address: user.address,
      birthDate: user.birthDate,
      hireDate: user.hireDate
    });
    setFormMode('edit');
    setShowUserForm(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={() => window.location.href = '/usuarios/create'}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-600">
              {stats.active} activos, {stats.inactive} inactivos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-gray-600">
              {((stats.active / stats.total) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
            <p className="text-xs text-gray-600">
              {stats.managers} gerentes, {stats.regularUsers} usuarios
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-600">
              Requieren activación
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>Gestiona y administra los usuarios del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, email o ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter} placeholder="Filtrar por estado">
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="suspended">Suspendidos</SelectItem>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter} placeholder="Filtrar por rol">
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
                <SelectItem value="manager">Gerentes</SelectItem>
                <SelectItem value="user">Usuarios</SelectItem>
              </Select>
            </div>
          </div>

          <div className="rounded-md border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead className="w-[120px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                      No se encontraron usuarios con los filtros aplicados.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-gray-500">{user.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">{user.email}</TableCell>
                      <TableCell>
                        <RoleBadge role={user.role} />
                      </TableCell>
                      <TableCell className="text-gray-900">{user.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon status={user.status} className="h-4 w-4" />
                          <StatusBadge status={user.status} />
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">
                        {user.lastLogin ? 
                          new Date(user.lastLogin).toLocaleDateString() : 
                          "Nunca"
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(user);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(user);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-600">
            Mostrando {filteredUsers.length} de {users.length} usuarios
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Siguiente
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogHeader>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar al usuario {userToDelete?.firstName} {userToDelete?.lastName}? 
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Eliminar Usuario
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Modal de formulario de usuario */}
      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogHeader>
          <DialogTitle>
            {formMode === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
          </DialogTitle>
          <DialogDescription>
            {formMode === 'create' 
              ? 'Completa la información para crear un nuevo usuario.'
              : 'Modifica la información del usuario seleccionado.'
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="suspended">Suspendido</SelectItem>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Fecha de Ingreso</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({...formData, hireDate: e.target.value})}
                />
              </div>
            </div>

            {formMode === 'create' && (
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña Temporal</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña temporal para el usuario"
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
              </div>
            )}
          </DialogContent>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowUserForm(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {formMode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default UsersListPage;