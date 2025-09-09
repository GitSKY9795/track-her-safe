import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, CheckCircle, FileText, MapPin, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SafetyReport {
  id: string;
  incident_type: string;
  description: string;
  severity: string;
  status: string;
  created_at: string;
  reported_at: string;
  resolved_at: string | null;
  is_anonymous: boolean;
  reporter_id: string | null;
  location: any;
  profiles?: {
    full_name: string;
  } | null;
  buses?: {
    bus_number: string;
  };
  routes?: {
    route_name: string;
    start_point: string;
    end_point: string;
  };
  stops?: {
    stop_name: string;
    address: string;
  };
}

const ManageIssues = () => {
  const [reports, setReports] = useState<SafetyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionNotes, setActionNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('safety_reports')
        .select(`
          *,
          profiles!safety_reports_reporter_id_fkey (
            full_name
          ),
          buses (
            bus_number
          ),
          routes (
            route_name,
            start_point,
            end_point
          ),
          stops (
            stop_name,
            address
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to load safety reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedReport || !newStatus) return;

    try {
      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };

      if (newStatus === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('safety_reports')
        .update(updateData)
        .eq('id', selectedReport.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Report status updated successfully",
      });

      setIsDialogOpen(false);
      setSelectedReport(null);
      setActionNotes('');
      setNewStatus('');
      fetchReports();
    } catch (error) {
      console.error('Error updating report:', error);
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-safety-medium text-safety-medium-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-destructive text-destructive-foreground';
      case 'investigating': return 'bg-warning text-warning-foreground';
      case 'resolved': return 'bg-safety-high text-safety-high-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reported': return <AlertTriangle className="w-4 h-4" />;
      case 'investigating': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const pendingReports = reports.filter(report => report.status !== 'resolved');
  const resolvedReports = reports.filter(report => report.status === 'resolved');

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sidebar-primary mx-auto"></div>
        <p className="text-sidebar-foreground mt-2">Loading safety reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sidebar-foreground">Issues Management</h1>
          <p className="text-sidebar-foreground/70">Monitor and resolve safety reports from users</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">{pendingReports.length}</p>
                <p className="text-xs text-sidebar-foreground/70">Pending Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">
                  {reports.filter(r => r.status === 'investigating').length}
                </p>
                <p className="text-xs text-sidebar-foreground/70">Investigating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-safety-high" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">{resolvedReports.length}</p>
                <p className="text-xs text-sidebar-foreground/70">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-sidebar-primary" />
              <div>
                <p className="text-2xl font-bold text-sidebar-foreground">{reports.length}</p>
                <p className="text-xs text-sidebar-foreground/70">Total Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Issues ({pendingReports.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Issues ({resolvedReports.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingReports.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-safety-high mx-auto mb-4" />
                <h3 className="text-lg font-medium text-sidebar-foreground mb-2">No Pending Issues</h3>
                <p className="text-sidebar-foreground/70">All safety reports have been resolved.</p>
              </CardContent>
            </Card>
          ) : (
            pendingReports.map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        {report.incident_type.replace('_', ' ').toUpperCase()}
                      </CardTitle>
                      <CardDescription>
                        Report #{report.id.slice(0, 8)} • 
                        {report.is_anonymous ? ' Anonymous' : ` ${report.profiles?.full_name || 'Unknown User'}`}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getSeverityColor(report.severity)}>
                        {report.severity} severity
                      </Badge>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-sm text-sidebar-foreground">
                    <p className="font-medium mb-2">Description:</p>
                    <p className="text-sidebar-foreground/70">{report.description || 'No description provided'}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-sidebar-foreground/70">
                      <Calendar className="w-4 h-4" />
                      <span>Reported: {new Date(report.reported_at).toLocaleDateString()}</span>
                    </div>

                    {report.buses && (
                      <div className="flex items-center gap-2 text-sidebar-foreground/70">
                        <FileText className="w-4 h-4" />
                        <span>Bus: {report.buses.bus_number}</span>
                      </div>
                    )}

                    {report.routes && (
                      <div className="flex items-center gap-2 text-sidebar-foreground/70">
                        <MapPin className="w-4 h-4" />
                        <span>Route: {report.routes.route_name}</span>
                      </div>
                    )}

                    {report.stops && (
                      <div className="flex items-center gap-2 text-sidebar-foreground/70">
                        <MapPin className="w-4 h-4" />
                        <span>Stop: {report.stops.stop_name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Dialog open={isDialogOpen && selectedReport?.id === report.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedReport(report);
                            setNewStatus(report.status);
                          }}
                        >
                          Take Action
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Report Status</DialogTitle>
                          <DialogDescription>
                            Change the status of this safety report and add notes if necessary.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="status">New Status</Label>
                            <Select value={newStatus} onValueChange={setNewStatus}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="reported">Reported</SelectItem>
                                <SelectItem value="investigating">Investigating</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="notes">Action Notes (Optional)</Label>
                            <Textarea
                              id="notes"
                              value={actionNotes}
                              onChange={(e) => setActionNotes(e.target.value)}
                              placeholder="Add any notes about the action taken..."
                              rows={3}
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleUpdateStatus}>
                            Update Status
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedReports.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="w-12 h-12 text-sidebar-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-sidebar-foreground mb-2">No Resolved Issues</h3>
                <p className="text-sidebar-foreground/70">Resolved issues will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            resolvedReports.map((report) => (
              <Card key={report.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-safety-high" />
                        {report.incident_type.replace('_', ' ').toUpperCase()}
                      </CardTitle>
                      <CardDescription>
                        Report #{report.id.slice(0, 8)} • Resolved on {new Date(report.resolved_at!).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getSeverityColor(report.severity)}>
                      {report.severity} severity
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <p className="text-sidebar-foreground/70">{report.description || 'No description provided'}</p>
                  </div>

                  <div className="flex gap-4 text-sm text-sidebar-foreground/70">
                    <span>Reported: {new Date(report.reported_at).toLocaleDateString()}</span>
                    {report.buses && <span>Bus: {report.buses.bus_number}</span>}
                    {report.routes && <span>Route: {report.routes.route_name}</span>}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageIssues;