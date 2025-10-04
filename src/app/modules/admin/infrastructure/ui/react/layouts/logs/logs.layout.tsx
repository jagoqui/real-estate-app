/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Eye, Filter, Search } from 'lucide-react';
import React, { useState } from 'react';

export interface PurchaseLog {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  sellerId: string;
  sellerName: string;
  purchasePrice: number;
  commissionAmount: number;
  purchaseDate: string;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: string;
  notes?: string;
}

// eslint-disable-next-line max-lines-per-function
export const LogsLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<PurchaseLog | null>(null);

  // Mock data - replace with real data from your backend
  const [logs] = useState<Array<PurchaseLog>>([
    {
      id: '1',
      propertyId: 'prop-001',
      propertyName: 'Villa Moderna Beverly Hills',
      propertyAddress: '123 Luxury Lane, Beverly Hills, CA',
      buyerId: 'buyer-001',
      buyerName: 'Michael Anderson',
      buyerEmail: 'michael.a@email.com',
      sellerId: 'seller-001',
      sellerName: 'John Smith',
      purchasePrice: 8500000,
      commissionAmount: 255000,
      purchaseDate: '2024-03-15T14:30:00',
      status: 'completed',
      paymentMethod: 'Wire Transfer',
      notes: 'Compra completada sin inconvenientes. Cliente muy satisfecho.',
    },
    {
      id: '2',
      propertyId: 'prop-002',
      propertyName: 'Penthouse Manhattan',
      propertyAddress: '456 Park Avenue, New York, NY',
      buyerId: 'buyer-002',
      buyerName: 'Emily Chen',
      buyerEmail: 'emily.chen@email.com',
      sellerId: 'seller-002',
      sellerName: 'Sarah Johnson',
      purchasePrice: 12000000,
      commissionAmount: 360000,
      purchaseDate: '2024-03-10T10:15:00',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      notes: 'Transacción internacional. Documentación completa.',
    },
    {
      id: '3',
      propertyId: 'prop-003',
      propertyName: 'Casa de Playa Malibu',
      propertyAddress: '789 Ocean Drive, Malibu, CA',
      buyerId: 'buyer-003',
      buyerName: 'David Williams',
      buyerEmail: 'd.williams@email.com',
      sellerId: 'seller-003',
      sellerName: 'Michael Chen',
      purchasePrice: 6800000,
      commissionAmount: 204000,
      purchaseDate: '2024-03-05T16:45:00',
      status: 'pending',
      paymentMethod: 'Escrow',
      notes: 'Esperando documentación final del banco.',
    },
    {
      id: '4',
      propertyId: 'prop-004',
      propertyName: 'Mansion Colonial',
      propertyAddress: '321 Estate Road, Los Angeles, CA',
      buyerId: 'buyer-004',
      buyerName: 'Jennifer Martinez',
      buyerEmail: 'j.martinez@email.com',
      sellerId: 'seller-004',
      sellerName: 'Emma Williams',
      purchasePrice: 9200000,
      commissionAmount: 276000,
      purchaseDate: '2024-02-28T11:20:00',
      status: 'completed',
      paymentMethod: 'Wire Transfer',
    },
    {
      id: '5',
      propertyId: 'prop-005',
      propertyName: 'Loft Moderno Downtown',
      propertyAddress: '555 Urban Street, San Francisco, CA',
      buyerId: 'buyer-005',
      buyerName: 'Robert Taylor',
      buyerEmail: 'r.taylor@email.com',
      sellerId: 'seller-001',
      sellerName: 'John Smith',
      purchasePrice: 3500000,
      commissionAmount: 105000,
      purchaseDate: '2024-02-20T09:00:00',
      status: 'cancelled',
      paymentMethod: 'N/A',
      notes: 'Comprador retiró la oferta por problemas de financiamiento.',
    },
  ]);

  const getStatusBadge = (status: PurchaseLog['status']): React.ReactElement => {
    const variants = {
      completed: 'default',
      pending: 'outline',
      cancelled: 'secondary',
    } as const;

    const labels = {
      completed: 'Completada',
      pending: 'Pendiente',
      cancelled: 'Cancelada',
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalSales = logs.filter(log => log.status === 'completed').reduce((acc, log) => acc + log.purchasePrice, 0);

  const totalCommissions = logs
    .filter(log => log.status === 'completed')
    .reduce((acc, log) => acc + log.commissionAmount, 0);

  const exportToCSV = (): void => {
    const headers = ['ID', 'Propiedad', 'Comprador', 'Email', 'Precio', 'Comisión', 'Fecha', 'Estado'];
    const csvData = filteredLogs.map(log => [
      log.id,
      log.propertyName,
      log.buyerName,
      log.buyerEmail,
      log.purchasePrice,
      log.commissionAmount,
      new Date(log.purchaseDate).toLocaleDateString(),
      log.status,
    ]);

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'purchase-logs.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold">Logs de Compras</h2>
          <p className="mt-2 text-muted-foreground">Historial completo de transacciones</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Transacciones</h3>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl font-bold">{logs.length}</div>
            <p className="mt-1 text-sm text-muted-foreground">
              {logs.filter(l => l.status === 'completed').length} completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Ventas Totales</h3>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl font-bold">${(totalSales / 1000000).toFixed(1)}M</div>
            <p className="mt-1 text-sm text-muted-foreground">En transacciones completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Comisiones Totales</h3>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-3xl font-bold">${(totalCommissions / 1000).toFixed(0)}K</div>
            <p className="mt-1 text-sm text-muted-foreground">Generadas en comisiones</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por propiedad, comprador o email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propiedad</TableHead>
                <TableHead>Comprador</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Comisión</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map(log => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.propertyName}</p>
                      <p className="text-sm text-muted-foreground">{log.propertyAddress}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.buyerName}</p>
                      <p className="text-sm text-muted-foreground">{log.buyerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${log.purchasePrice.toLocaleString()}</TableCell>
                  <TableCell className="text-emerald-600">${log.commissionAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(log.purchaseDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedLog(log)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle className="font-serif text-2xl">Detalles de la Transacción</DialogTitle>
                        </DialogHeader>
                        {selectedLog && (
                          <div className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Propiedad</h4>
                                <p className="font-medium">{selectedLog.propertyName}</p>
                                <p className="text-sm text-muted-foreground">{selectedLog.propertyAddress}</p>
                              </div>
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Estado</h4>
                                {getStatusBadge(selectedLog.status)}
                              </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Comprador</h4>
                                <p className="font-medium">{selectedLog.buyerName}</p>
                                <p className="text-sm text-muted-foreground">{selectedLog.buyerEmail}</p>
                              </div>
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Vendedor</h4>
                                <p className="font-medium">{selectedLog.sellerName}</p>
                              </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Precio de Compra</h4>
                                <p className="font-serif text-2xl font-bold">
                                  ${selectedLog.purchasePrice.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Comisión</h4>
                                <p className="font-serif text-2xl font-bold text-emerald-600">
                                  ${selectedLog.commissionAmount.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Fecha de Compra</h4>
                                <p className="font-medium">
                                  {new Date(selectedLog.purchaseDate).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Método de Pago</h4>
                                <p className="font-medium">{selectedLog.paymentMethod}</p>
                              </div>
                            </div>

                            {selectedLog.notes && (
                              <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Notas</h4>
                                <p className="rounded-lg bg-muted p-4 text-sm">{selectedLog.notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
