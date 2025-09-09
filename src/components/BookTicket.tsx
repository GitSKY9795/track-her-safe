import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Clock, Users, CreditCard, QrCode, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

interface Bus {
  id: string;
  bus_number: string;
  driver_name: string;
  driver_phone: string;
  capacity: number;
  current_occupancy: number;
  has_cctv: boolean;
  is_women_only: boolean;
  routes: {
    id: string;
    route_name: string;
    start_point: string;
    end_point: string;
    fare: number;
    estimated_duration_minutes: number;
  } | null;
}

const BookTicket = () => {
  const { user } = useAuth();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [travelDate, setTravelDate] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
    fetchAvailableBuses();
  }, []);

  const fetchAvailableBuses = async () => {
    try {
      const { data, error } = await supabase
        .from('buses')
        .select(`
          *,
          routes (
            id,
            route_name,
            start_point,
            end_point,
            fare,
            estimated_duration_minutes
          )
        `)
        .eq('status', 'active')
        .not('routes', 'is', null);

      if (error) throw error;
      setBuses((data || []).filter(bus => bus.routes) as Bus[]);
    } catch (error) {
      console.error('Error fetching buses:', error);
      toast({
        title: "Error",
        description: "Failed to load available buses",
        variant: "destructive",
      });
    }
  };

  const handleBooking = async () => {
    if (!selectedBus || !travelDate || !seatNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create booking record
      const bookingData = {
        user_id: user!.id,
        bus_id: selectedBus.id,
        route_id: selectedBus.routes.id,
        booking_date: new Date().toISOString(),
        travel_date: travelDate,
        seat_number: parseInt(seatNumber),
        fare_amount: selectedBus.routes.fare,
        booking_status: 'confirmed',
        payment_status: 'paid', // Simulated payment
      };

      const { data: booking, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (error) throw error;

      // Generate QR code
      const qrData = JSON.stringify({
        bookingId: booking.id,
        busNumber: selectedBus.bus_number,
        route: `${selectedBus.routes.start_point} to ${selectedBus.routes.end_point}`,
        seat: seatNumber,
        date: travelDate,
        passenger: user!.email
      });

      const qrCodeUrl = await QRCode.toDataURL(qrData);
      setQrCodeData(qrCodeUrl);

      // Update booking with QR code data
      await supabase
        .from('bookings')
        .update({ qr_code_data: qrCodeUrl })
        .eq('id', booking.id);

      toast({
        title: "Booking Confirmed!",
        description: "Your ticket has been booked successfully",
      });

      setShowPayment(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = `ticket-${selectedBus?.bus_number}-${travelDate}.png`;
    link.href = qrCodeData;
    link.click();
  };

  if (showPayment && qrCodeData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-success-high">Booking Confirmed!</CardTitle>
            <CardDescription>Your ticket has been generated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <img src={qrCodeData} alt="Ticket QR Code" className="mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">
                Show this QR code to the conductor
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bus:</span>
                <span className="font-medium">{selectedBus?.bus_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Route:</span>
                <span className="font-medium">{selectedBus?.routes.route_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seat:</span>
                <span className="font-medium">{seatNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{travelDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fare:</span>
                <span className="font-medium">₹{selectedBus?.routes.fare}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={downloadQRCode} className="w-full">
                <QrCode className="w-4 h-4 mr-2" />
                Download Ticket
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowPayment(false);
                  setSelectedBus(null);
                  setTravelDate('');
                  setSeatNumber('');
                  setQrCodeData('');
                }} 
                className="w-full"
              >
                Book Another Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book Your Ticket</h1>
          <p className="text-muted-foreground">Search and book bus tickets for safe travel</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Search Buses</CardTitle>
              <CardDescription>Find available buses for your journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="travel-date">Travel Date</Label>
                <Input
                  id="travel-date"
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Available Buses</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {buses.map((bus) => (
                    <div
                      key={bus.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedBus?.id === bus.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedBus(bus)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-lg">{bus.bus_number}</div>
                        <div className="flex gap-2">
                          {bus.has_cctv && <Badge variant="secondary">CCTV</Badge>}
                          {bus.is_women_only && <Badge variant="outline">Women Only</Badge>}
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{bus.routes.start_point} → {bus.routes.end_point}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{bus.routes.estimated_duration_minutes}min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{bus.capacity - bus.current_occupancy} seats available</span>
                          </div>
                          <div className="font-medium text-foreground">₹{bus.routes.fare}</div>
                        </div>
                        
                        {bus.driver_name && (
                          <div className="mt-2 p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">Driver: {bus.driver_name}</span>
                            </div>
                            {bus.driver_phone && (
                              <div className="text-xs text-muted-foreground">
                                Contact: {bus.driver_phone}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedBus && (
                <div className="space-y-2">
                  <Label htmlFor="seat-number">Preferred Seat Number</Label>
                  <Select value={seatNumber} onValueChange={setSeatNumber}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a seat" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: selectedBus.capacity - selectedBus.current_occupancy }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          Seat {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Summary */}
          {selectedBus && (
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bus Number:</span>
                    <span className="font-medium">{selectedBus.bus_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route:</span>
                    <span className="font-medium">{selectedBus.routes.route_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From:</span>
                    <span className="font-medium">{selectedBus.routes.start_point}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To:</span>
                    <span className="font-medium">{selectedBus.routes.end_point}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travel Date:</span>
                    <span className="font-medium">{travelDate || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seat:</span>
                    <span className="font-medium">{seatNumber || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{selectedBus.routes.estimated_duration_minutes}min</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Fare:</span>
                  <span>₹{selectedBus.routes.fare}</span>
                </div>

                <Button 
                  onClick={handleBooking} 
                  disabled={loading || !travelDate || !seatNumber}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Processing...' : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay & Book Ticket
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Payment is processed securely. You'll receive your QR ticket immediately.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTicket;