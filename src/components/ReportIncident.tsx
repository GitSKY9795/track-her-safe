import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Camera, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Users,
  Shield
} from "lucide-react";

const ReportIncident = () => {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const incidentTypes = [
    { id: "harassment", label: "Eve-teasing/Harassment", color: "bg-emergency", priority: "high" },
    { id: "overcrowding", label: "Overcrowding", color: "bg-warning", priority: "medium" },
    { id: "safety", label: "Safety Concern", color: "bg-safety-low", priority: "high" },
    { id: "cleanliness", label: "Cleanliness Issue", color: "bg-muted", priority: "low" },
    { id: "delay", label: "Bus Delay", color: "bg-primary", priority: "medium" },
    { id: "other", label: "Other", color: "bg-secondary", priority: "medium" }
  ];

  const recentReports = [
    {
      id: "RPT001",
      type: "harassment",
      location: "Bus Stop 23A",
      time: "2 hours ago",
      status: "Investigating",
      reporter: "Anonymous"
    },
    {
      id: "RPT002", 
      type: "safety",
      location: "Route 45B",
      time: "5 hours ago",
      status: "Resolved",
      reporter: "SafeUser123"
    },
    {
      id: "RPT003",
      type: "overcrowding",
      location: "Sector 17 Stand",
      time: "1 day ago", 
      status: "In Progress",
      reporter: "ConcernedCommuter"
    }
  ];

  const handleSubmit = async () => {
    if (!reportType || !description) {
      toast({
        title: "Incomplete Report",
        description: "Please select incident type and provide description",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setReportType("");
      setDescription("");
      toast({
        title: "Report Submitted Successfully",
        description: "Your report has been forwarded to authorities. Reference ID: RPT004",
        variant: "default"
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-safety-high text-safety-high-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Investigating": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Report Incident
        </h1>
        <p className="text-muted-foreground">
          Help make public transport safer by reporting incidents anonymously
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Submit New Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Incident Type Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Incident Type</label>
              <div className="grid grid-cols-2 gap-2">
                {incidentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={reportType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReportType(type.id)}
                    className="justify-start h-auto p-3"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{type.label}</span>
                      <Badge 
                        variant="secondary" 
                        className="text-xs mt-1"
                      >
                        {type.priority}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Location (Auto-filled) */}
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <div className="flex items-center space-x-2 p-3 bg-secondary rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Current Location: Sector 17, Chandigarh</span>
                <Badge variant="outline" className="text-xs">Auto-detected</Badge>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Please provide details about the incident..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24"
              />
            </div>

            {/* Photo Upload (Simulated) */}
            <div>
              <label className="text-sm font-medium mb-2 block">Evidence (Optional)</label>
              <Button variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Add Photo/Video
              </Button>
            </div>

            {/* Privacy Notice */}
            <div className="p-3 bg-safety-high/10 rounded-lg border-l-4 border-safety-high">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-safety-high mr-2" />
                <span className="text-sm font-medium text-safety-high">Anonymous & Secure</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your identity is protected. Reports are encrypted and sent directly to authorities.
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reports & Status */}
        <div className="space-y-6">
          {/* Community Impact Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Community Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-safety-high">127</div>
                  <div className="text-sm text-muted-foreground">Reports Resolved</div>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">23</div>
                  <div className="text-sm text-muted-foreground">This Month</div>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-warning">5</div>
                  <div className="text-sm text-muted-foreground">Avg Response hrs</div>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-safety-high">94%</div>
                  <div className="text-sm text-muted-foreground">Resolution Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Recent Community Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="p-3 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-medium text-sm">{report.id}</span>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>{report.location}</span>
                      <span>{report.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-3">
                View All Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportIncident;