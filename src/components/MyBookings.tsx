import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, QrCode, Download, Clock, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  booking_date: string;
  travel_date: string;
  seat_number: number;
  fare_amount: number;
  booking_status: string;
  payment_status: string;
  qr_code_data: string;
  buses: {
    id: string;
    bus_number: string;
    driver_name: string;
    driver_phone: string;
  };
  routes: {
    id: string;
    route_name: string;
    start_point: string;
    end_point: string;
  };
}

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          buses (
            id,
            bus_number,
            driver_name,
            driver_phone
          ),
          routes (
            id,
            route_name,
            start_point,
            end_point
          )
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load your bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = (booking: Booking) => {
    if (!booking.qr_code_data) {
      toast({
        title: "No QR Code",
        description: "QR code not available for this booking",
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement('a');
    link.download = `ticket-${booking.buses.bus_number}-${booking.travel_date}.png`;
    link.href = booking.qr_code_data;
    link.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-safety-high text-safety-high-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-safety-high text-safety-high-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      case 'refunded': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.travel_date) >= new Date() && 
    booking.booking_status !== 'cancelled'
  );

  const pastBookings = bookings.filter(booking => 
    new Date(booking.travel_date) < new Date() || 
    booking.booking_status === 'cancelled'
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your bus ticket bookings</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Past Bookings ({pastBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Upcoming Bookings</h3>
                  <p className="text-muted-foreground">You don't have any upcoming bus bookings.</p>
                </CardContent>
              </Card>
            ) : (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.buses.bus_number}</CardTitle>
                        <CardDescription>{booking.routes.route_name}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(booking.booking_status)}>
                          {booking.booking_status}
                        </Badge>
                        <Badge className={getPaymentStatusColor(booking.payment_status)}>
                          {booking.payment_status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.routes.start_point} → {booking.routes.end_point}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>Travel Date: {new Date(booking.travel_date).toLocaleDateString()}</span>
                        </div>

                        <div className="text-sm">
                          <span className="text-muted-foreground">Seat: </span>
                          <span className="font-medium">{booking.seat_number}</span>
                        </div>

                        <div className="text-sm">
                          <span className="text-muted-foreground">Fare: </span>
                          <span className="font-medium">₹{booking.fare_amount}</span>
                        </div>

                        {booking.buses.driver_name && (
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Driver: </span>
                              <span className="font-medium">{booking.buses.driver_name}</span>
                            </div>
                            {booking.buses.driver_phone && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                <span>{booking.buses.driver_phone}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-center justify-center space-y-3">
                        {booking.qr_code_data && (
                          <>
                            <img 
                              src={booking.qr_code_data} 
                              alt="Ticket QR Code" 
                              className="w-32 h-32 border rounded"
                            />
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => downloadTicket(booking)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Ticket
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Booked on: {new Date(booking.booking_date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Past Bookings</h3>
                  <p className="text-muted-foreground">You don't have any past bookings yet.</p>
                </CardContent>
              </Card>
            ) : (
              pastBookings.map((booking) => (
                <Card key={booking.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.buses.bus_number}</CardTitle>
                        <CardDescription>{booking.routes.route_name}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(booking.booking_status)}>
                          {booking.booking_status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{booking.routes.start_point} → {booking.routes.end_point}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Traveled on: {new Date(booking.travel_date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <span><span className="text-muted-foreground">Seat:</span> {booking.seat_number}</span>
                      <span><span className="text-muted-foreground">Fare:</span> ₹{booking.fare_amount}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyBookings;