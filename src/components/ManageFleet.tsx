import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Bus, Plus, Edit, Trash2, Users, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface BusData {
  id?: string;
  bus_number: string;
  driver_name: string;
  driver_phone: string;
  capacity: number;
  current_occupancy: number;
  has_cctv: boolean;
  is_women_only: boolean;
  status: string;
  route_id: string;
}

interface Route {
  id: string;
  route_name: string;
  start_point: string;
  end_point: string;
}

const ManageFleet = () => {
  const [buses, setBuses] = useState<any[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<any | null>(null);
  const [formData, setFormData] = useState<BusData>({
    bus_number: '',
    driver_name: '',
    driver_phone: '',
    capacity: 50,
    current_occupancy: 0,
    has_cctv: false,
    is_women_only: false,
    status: 'active',
    route_id: '',
  });

  useEffect(() => {
    fetchBuses();
    fetchRoutes();
  }, []);

  const fetchBuses = async () => {
    try {
      const { data, error } = await supabase
        .from('buses')
        .select(`
          *,
          routes (
            id,
            route_name,
            start_point,
            end_point
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBuses(data || []);
    } catch (error) {
      console.error('Error fetching buses:', error);
      toast({
        title: "Error",
        description: "Failed to load fleet data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from('routes')
        .select('*')
        .eq('is_operational', true)
        .order('route_name');

      if (error) throw error;
      setRoutes(data || []);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBus) {
        // Update existing bus
        const { error } = await supabase
          .from('buses')
          .update(formData)
          .eq('id', editingBus.id);

        if (error) throw error;
        toast({ title: "Success", description: "Bus updated successfully" });
      } else {
        // Create new bus
        const { error } = await supabase
          .from('buses')
          .insert(formData);

        if (error) throw error;
        toast({ title: "Success", description: "Bus added successfully" });
      }

      resetForm();
      fetchBuses();
    } catch (error) {
      console.error('Error saving bus:', error);
      toast({
        title: "Error",
        description: "Failed to save bus data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bus: any) => {
    setEditingBus(bus);
    setFormData({
      bus_number: bus.bus_number,
      driver_name: bus.driver_name || '',
      driver_phone: bus.driver_phone || '',
      capacity: bus.capacity,
      current_occupancy: bus.current_occupancy,
      has_cctv: bus.has_cctv,
      is_women_only: bus.is_women_only,
      status: bus.status,
      route_id: bus.route_id || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (busId: string) => {
    if (!confirm('Are you sure you want to delete this bus?')) return;

    try {
      const { error } = await supabase
        .from('buses')
        .delete()
        .eq('id', busId);

      if (error) throw error;
      toast({ title: "Success", description: "Bus deleted successfully" });
      fetchBuses();
    } catch (error) {
      console.error('Error deleting bus:', error);
      toast({
        title: "Error",
        description: "Failed to delete bus",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      bus_number: '',
      driver_name: '',
      driver_phone: '',
      capacity: 50,
      current_occupancy: 0,
      has_cctv: false,
      is_women_only: false,
      status: 'active',
      route_id: '',
    });
    setEditingBus(null);
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-safety-high text-safety-high-foreground';
      case 'maintenance': return 'bg-warning text-warning-foreground';
      case 'inactive': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sidebar-primary mx-auto"></div>
        <p className="text-sidebar-foreground mt-2">Loading fleet data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sidebar-foreground">Fleet Management</h1>
          <p className="text-sidebar-foreground/70">Manage your bus fleet and driver assignments</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Bus
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingBus ? 'Edit Bus' : 'Add New Bus'}</DialogTitle>
              <DialogDescription>
                {editingBus ? 'Update bus information' : 'Enter details for the new bus'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bus_number">Bus Number *</Label>
                  <Input
                    id="bus_number"
                    value={formData.bus_number}
                    onChange={(e) => setFormData({ ...formData, bus_number: e.target.value })}
                    placeholder="e.g., MH-01-AB-1234"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    min="1"
                    max="100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driver_name">Driver Name</Label>
                  <Input
                    id="driver_name"
                    value={formData.driver_name}
                    onChange={(e) => setFormData({ ...formData, driver_name: e.target.value })}
                    placeholder="Enter driver's name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driver_phone">Driver Phone</Label>
                  <Input
                    id="driver_phone"
                    type="tel"
                    value={formData.driver_phone}
                    onChange={(e) => setFormData({ ...formData, driver_phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="route_id">Assigned Route</Label>
                  <Select
                    value={formData.route_id}
                    onValueChange={(value) => setFormData({ ...formData, route_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a route" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map((route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.route_name} ({route.start_point} - {route.end_point})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_cctv"
                    checked={formData.has_cctv}
                    onCheckedChange={(checked) => setFormData({ ...formData, has_cctv: !!checked })}
                  />
                  <Label htmlFor="has_cctv">Has CCTV surveillance</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_women_only"
                    checked={formData.is_women_only}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_women_only: !!checked })}
                  />
                  <Label htmlFor="is_women_only">Women-only bus</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingBus ? 'Update Bus' : 'Add Bus')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Fleet Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bus className="w-8 h-8 text-sidebar-primary" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">{buses.length}</p>
                <p className="text-xs text-sidebar-foreground/70">Total Buses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-safety-high flex items-center justify-center">
                <Bus className="w-4 h-4 text-safety-high-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">
                  {buses.filter(bus => bus.status === 'active').length}
                </p>
                <p className="text-xs text-sidebar-foreground/70">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center">
                <Bus className="w-4 h-4 text-warning-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">
                  {buses.filter(bus => bus.status === 'maintenance').length}
                </p>
                <p className="text-xs text-sidebar-foreground/70">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-sidebar-primary" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">
                  {buses.reduce((total, bus) => total + bus.capacity, 0)}
                </p>
                <p className="text-xs text-sidebar-foreground/70">Total Capacity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet List */}
      <div className="grid gap-4">
        {buses.map((bus) => (
          <Card key={bus.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-sidebar-foreground">{bus.bus_number}</h3>
                    <Badge className={getStatusColor(bus.status)}>
                      {bus.status}
                    </Badge>
                    {bus.has_cctv && <Badge variant="secondary">CCTV</Badge>}
                    {bus.is_women_only && <Badge variant="outline">Women Only</Badge>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-sidebar-foreground/70">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {bus.capacity} | Current: {bus.current_occupancy}</span>
                    </div>

                    {bus.routes && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{bus.routes.start_point} - {bus.routes.end_point}</span>
                      </div>
                    )}

                    {bus.driver_name && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{bus.driver_name} | {bus.driver_phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(bus)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(bus.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {buses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Bus className="w-12 h-12 text-sidebar-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-sidebar-foreground mb-2">No Buses Found</h3>
              <p className="text-sidebar-foreground/70">Add your first bus to get started with fleet management.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManageFleet;