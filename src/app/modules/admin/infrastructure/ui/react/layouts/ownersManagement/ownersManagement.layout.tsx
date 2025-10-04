import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Home, Mail, Pencil, Phone, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Owner } from '../propertiesManagement/propertiesManagement.layout';

// eslint-disable-next-line max-lines-per-function
export const OwnersManagementLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);

  // Mock data - replace with real data from your backend
  const [owners, setOwners] = useState<Array<Owner>>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      properties: 3,
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      properties: 5,
      createdAt: '2024-01-15',
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      phone: '+1 (555) 456-7890',
      properties: 2,
      createdAt: '2024-02-01',
    },
    {
      id: '4',
      name: 'Emma Williams',
      email: 'emma.w@email.com',
      phone: '+1 (555) 234-5678',
      properties: 4,
      createdAt: '2024-02-10',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const newOwner: Owner = {
      id: editingOwner?.id || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      properties: editingOwner?.properties || 0,
      createdAt: editingOwner?.createdAt || new Date().toISOString(),
    };

    if (editingOwner) {
      setOwners(owners.map(o => (o.id === editingOwner.id ? newOwner : o)));
    } else {
      setOwners([...owners, newOwner]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (owner: Owner): void => {
    setEditingOwner(owner);
    setFormData({
      name: owner.name,
      email: owner.email,
      phone: owner.phone,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string): void => {
    if (confirm('¿Estás seguro de eliminar este propietario?')) {
      setOwners(owners.filter(o => o.id !== id));
    }
  };

  const resetForm = (): void => {
    setEditingOwner(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
  };

  const filteredOwners = owners.filter(
    o =>
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold">Propietarios</h2>
          <p className="mt-2 text-muted-foreground">Gestiona los propietarios de las propiedades</p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={open => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Propietario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {editingOwner ? 'Editar Propietario' : 'Nuevo Propietario'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">{editingOwner ? 'Guardar Cambios' : 'Crear Propietario'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Propietarios</h3>
            <Home className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl font-bold">{owners.length}</div>
            <p className="mt-1 text-sm text-muted-foreground">Registrados en la plataforma</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Propiedades Totales</h3>
            <Home className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl font-bold">{owners.reduce((acc, o) => acc + o.properties, 0)}</div>
            <p className="mt-1 text-sm text-muted-foreground">En gestión</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Promedio por Propietario</h3>
            <Home className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl font-bold">
              {owners.length > 0 ? (owners.reduce((acc, o) => acc + o.properties, 0) / owners.length).toFixed(1) : 0}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Propiedades</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o teléfono..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Propiedades</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOwners.map(owner => (
                <TableRow key={owner.id}>
                  <TableCell className="font-medium">{owner.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{owner.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{owner.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{owner.properties}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(owner.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(owner)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(owner.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
