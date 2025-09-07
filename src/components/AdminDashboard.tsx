import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Users, 
  Bus, 
  AlertTriangle,
  TrendingUp,
  Shield,
  FileText,
  BarChart3,
  Clock,
  MapPin
} from "lucide-react";

const AdminDashboard = () => {
  const systemStats = [
    { label: "Active Buses", value: "127", change: "+5", icon: Bus, color: "text-primary" },
    { label: "Daily Users", value: "2,847", change: "+12%", icon: Users, color: "text-safety-high" },
    { label: "Safety Reports", value: "23", change: "-8%", icon: AlertTriangle, color: "text-warning" },
    { label: "Response Time", value: "4.2m", change: "-15%", icon: Clock, color: "text-safety-medium" }
  ];

  const recentReports = [
    {
      id: "RPT-001",
      type: "Harassment",
      location: "Bus Stop 23A, Sector 17",
      time: "2 hours ago",
      status: "Investigating",
      priority: "High",
      reporter: "Anonymous"
    },
    {
      id: "RPT-002", 
      type: "Safety Concern",
      location: "Route 45B",
      time: "4 hours ago",
      status: "Resolved",
      priority: "Medium",
      reporter: "SafeUser123"
    },
    {
      id: "RPT-003",
      type: "Bus Delay",
      location: "Sector 35 Stand",
      time: "6 hours ago",
      status: "In Progress", 
      priority: "Low",
      reporter: "CommutingDaily"
    }
  ];

  const fleetStatus = [
    { route: "45A", buses: 12, onTime: 92, issues: 1, safetyScore: 4.8 },
    { route: "23B", buses: 8, onTime: 88, issues: 0, safetyScore: 4.6 },
    { route: "67C", buses: 15, onTime: 95, issues: 2, safetyScore: 4.9 },
    { route: "89D", buses: 10, onTime: 87, issues: 1, safetyScore: 4.4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-safety-high text-safety-high-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Investigating": return "bg-emergency text-emergency-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-emergency";
      case "Medium": return "text-warning";
      case "Low": return "text-safety-medium";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Transport authority control center
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-safety-high text-safety-high-foreground">
            All Systems Operational
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-safety-high' : stat.change.startsWith('-') ? 'text-safety-low' : 'text-muted-foreground'}`}>
                    {stat.change} from yesterday
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Safety Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Recent Safety Reports
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="p-4 bg-secondary rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{report.id}</span>
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                      <span className={`text-xs font-medium ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {report.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Reported by: {report.reporter} • {report.time}
                    </div>
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Take Action</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Fleet Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bus className="w-5 h-5 mr-2 text-primary" />
              Fleet Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fleetStatus.map((route) => (
              <div key={route.route} className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Route {route.route}</span>
                    <Badge variant="outline">{route.buses} buses</Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-safety-high" />
                    <span className="text-sm font-medium">{route.safetyScore}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-background rounded">
                    <div className="text-lg font-bold text-safety-high">{route.onTime}%</div>
                    <div className="text-xs text-muted-foreground">On Time</div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className={`text-lg font-bold ${route.issues > 0 ? 'text-warning' : 'text-safety-high'}`}>
                      {route.issues}
                    </div>
                    <div className="text-xs text-muted-foreground">Issues</div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className="text-lg font-bold text-primary">{route.buses}</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <AlertTriangle className="w-6 h-6 text-warning" />
              <span className="text-sm">Send Alert</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <TrendingUp className="w-6 h-6 text-safety-high" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Shield className="w-6 h-6 text-safety-medium" />
              <span className="text-sm">Safety Config</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;