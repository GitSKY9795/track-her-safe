import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, Users, AlertTriangle, Bus, MapPin, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ReportData {
  totalBookings: number;
  totalRevenue: number;
  totalReports: number;
  activeUsers: number;
  bookingsByRoute: any[];
  safetyReportsByType: any[];
  revenueByMonth: any[];
  busUtilization: any[];
}

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<ReportData>({
    totalBookings: 0,
    totalRevenue: 0,
    totalReports: 0,
    activeUsers: 0,
    bookingsByRoute: [],
    safetyReportsByType: [],
    revenueByMonth: [],
    busUtilization: [],
  });
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateRange));

      // Fetch bookings data
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          routes (
            route_name,
            start_point,
            end_point
          )
        `)
        .gte('created_at', startDate.toISOString());

      if (bookingsError) throw bookingsError;

      // Fetch safety reports
      const { data: safetyReports, error: reportsError } = await supabase
        .from('safety_reports')
        .select('*')
        .gte('created_at', startDate.toISOString());

      if (reportsError) throw reportsError;

      // Fetch bus utilization
      const { data: buses, error: busesError } = await supabase
        .from('buses')
        .select(`
          *,
          routes (
            route_name
          )
        `);

      if (busesError) throw busesError;

      // Fetch unique users (profiles)
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id')
        .gte('created_at', startDate.toISOString());

      if (profilesError) throw profilesError;

      // Process data
      const totalBookings = bookings?.length || 0;
      const totalRevenue = bookings?.reduce((sum, booking) => sum + (booking.fare_amount || 0), 0) || 0;
      const totalReports = safetyReports?.length || 0;
      const activeUsers = profiles?.length || 0;

      // Bookings by route
      const routeBookings = bookings?.reduce((acc: any, booking) => {
        const routeName = booking.routes?.route_name || 'Unknown Route';
        acc[routeName] = (acc[routeName] || 0) + 1;
        return acc;
      }, {});

      const bookingsByRoute = Object.entries(routeBookings || {}).map(([route, count]) => ({
        route: route.length > 20 ? route.substring(0, 20) + '...' : route,
        bookings: count,
      }));

      // Safety reports by type
      const reportsByType = safetyReports?.reduce((acc: any, report) => {
        const type = report.incident_type || 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      const safetyReportsByType = Object.entries(reportsByType || {}).map(([type, count]) => ({
        type: type.replace('_', ' ').toUpperCase(),
        count,
      }));

      // Revenue by month (simplified for demo)
      const monthlyRevenue = bookings?.reduce((acc: any, booking) => {
        const month = new Date(booking.created_at).toLocaleDateString('en-US', { month: 'short' });
        acc[month] = (acc[month] || 0) + (booking.fare_amount || 0);
        return acc;
      }, {});

      const revenueByMonth = Object.entries(monthlyRevenue || {}).map(([month, revenue]) => ({
        month,
        revenue,
      }));

      // Bus utilization
      const busUtilization = buses?.map(bus => ({
        busNumber: bus.bus_number,
        utilization: Math.round((bus.current_occupancy / bus.capacity) * 100),
        route: Array.isArray(bus.routes) ? bus.routes[0]?.route_name || 'Unassigned' : bus.routes?.route_name || 'Unassigned',
      })) || [];

      setReportData({
        totalBookings,
        totalRevenue,
        totalReports,
        activeUsers,
        bookingsByRoute,
        safetyReportsByType,
        revenueByMonth,
        busUtilization,
      });

    } catch (error) {
      console.error('Error fetching report data:', error);
      toast({
        title: "Error",
        description: "Failed to load report data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const dataToExport = {
      generatedAt: new Date().toISOString(),
      dateRange: `${dateRange} days`,
      summary: {
        totalBookings: reportData.totalBookings,
        totalRevenue: reportData.totalRevenue,
        totalReports: reportData.totalReports,
        activeUsers: reportData.activeUsers,
      },
      bookingsByRoute: reportData.bookingsByRoute,
      safetyReports: reportData.safetyReportsByType,
      busUtilization: reportData.busUtilization,
    };

    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trackbus-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sidebar-primary mx-auto"></div>
        <p className="text-sidebar-foreground mt-2">Generating reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sidebar-foreground">Analytics & Reports</h1>
          <p className="text-sidebar-foreground/70">Comprehensive insights into your bus operations</p>
        </div>
        
        <div className="flex gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={exportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-sidebar-primary" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">{reportData.totalBookings}</p>
                <p className="text-xs text-sidebar-foreground/70">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-safety-high" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">₹{reportData.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-sidebar-foreground/70">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">{reportData.totalReports}</p>
                <p className="text-xs text-sidebar-foreground/70">Safety Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-sidebar-primary" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">{reportData.activeUsers}</p>
                <p className="text-xs text-sidebar-foreground/70">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bookings">Booking Analytics</TabsTrigger>
          <TabsTrigger value="safety">Safety Reports</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Utilization</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Route</CardTitle>
              <CardDescription>Popular routes based on booking frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportData.bookingsByRoute}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="route" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="hsl(var(--sidebar-primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Safety Reports by Type</CardTitle>
              <CardDescription>Distribution of safety incidents reported by users</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportData.safetyReportsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {reportData.safetyReportsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bus Utilization</CardTitle>
              <CardDescription>Current occupancy rates across your fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.busUtilization.map((bus, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bus className="w-5 h-5 text-sidebar-primary" />
                      <div>
                        <p className="font-medium text-sidebar-foreground">{bus.busNumber}</p>
                        <p className="text-sm text-sidebar-foreground/70">{bus.route}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-secondary rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            bus.utilization > 80 ? 'bg-destructive' : 
                            bus.utilization > 60 ? 'bg-warning' : 'bg-safety-high'
                          }`}
                          style={{ width: `${bus.utilization}%` }}
                        ></div>
                      </div>
                      <Badge variant={bus.utilization > 80 ? 'destructive' : 'secondary'}>
                        {bus.utilization}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportData.revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--sidebar-primary))" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-sidebar-foreground/70">Average Booking Value</p>
                  <p className="text-2xl font-bold text-sidebar-foreground">
                    ₹{reportData.totalBookings > 0 ? (reportData.totalRevenue / reportData.totalBookings).toFixed(2) : '0'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-sidebar-foreground/70">Revenue per Day</p>
                  <p className="text-2xl font-bold text-sidebar-foreground">
                    ₹{parseInt(dateRange) > 0 ? (reportData.totalRevenue / parseInt(dateRange)).toFixed(2) : '0'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;