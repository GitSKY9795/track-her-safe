import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Bus,
  Route,
  Phone
} from "lucide-react";

interface HomeProps {
  onTabChange: (tab: string) => void;
}

const Home = ({ onTabChange }: HomeProps) => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-safety-high/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Welcome to TrackBus Safe
            </h1>
            <p className="text-muted-foreground mb-4">
              Your trusted companion for safe and secure public transport in Punjab
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-safety-high text-safety-high-foreground">
                <Shield className="w-3 h-3 mr-1" />
                Women-First Design
              </Badge>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                24/7 Safety Support
              </Badge>
              <Badge variant="outline">
                <Users className="w-3 h-3 mr-1" />
                Community Driven
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <Button 
              size="lg" 
              onClick={() => onTabChange("safety")}
              className="bg-emergency text-emergency-foreground hover:bg-emergency/90 animate-emergency-pulse"
            >
              <Phone className="w-4 h-4 mr-2" />
              Emergency SOS
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => onTabChange("track")}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center">
                <Bus className="w-5 h-5 mr-2 text-primary" />
                Track Bus
              </div>
              <Badge variant="secondary">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Find your bus in real-time</p>
            <div className="text-xs text-safety-high font-medium">Next bus: 3 mins away</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => onTabChange("safety")}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-safety-high" />
                Safety Center
              </div>
              <Badge className="bg-safety-high text-safety-high-foreground">Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Emergency tools & alerts</p>
            <div className="text-xs text-safety-high font-medium">All safety systems online</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => onTabChange("routes")}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Route className="w-5 h-5 mr-2 text-primary" />
              Plan Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Safe route planning</p>
            <div className="text-xs text-primary font-medium">Find safest path</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => onTabChange("community")}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Connect & share safety tips</p>
            <div className="text-xs text-primary font-medium">1,247 active members</div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Safety Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-safety-high" />
              Current Area Safety Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-safety-high/10 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-safety-high mr-3" />
                <div>
                  <div className="font-medium">High Safety Zone</div>
                  <div className="text-sm text-muted-foreground">Current location: Sector 17, Chandigarh</div>
                </div>
              </div>
              <Badge className="bg-safety-high text-safety-high-foreground">Safe</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-safety-high">92%</div>
                <div className="text-sm text-muted-foreground">Safety Score</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Active Buses</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-safety-medium">24</div>
                <div className="text-sm text-muted-foreground">CCTV Cameras</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-safety-high/10 rounded-lg border-l-4 border-safety-high">
              <div className="font-medium text-sm">New Women-Only Bus</div>
              <div className="text-xs text-muted-foreground">Route 45 - Starting Monday</div>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg border-l-4 border-warning">
              <div className="font-medium text-sm">Route Diversion</div>
              <div className="text-xs text-muted-foreground">Bus 23A - Due to construction</div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
              <div className="font-medium text-sm">Safety Tip</div>
              <div className="text-xs text-muted-foreground">Share live location when traveling alone</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Actions - Mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button 
          size="lg" 
          onClick={() => onTabChange("safety")}
          className="bg-emergency text-emergency-foreground hover:bg-emergency/90 animate-emergency-pulse shadow-lg"
        >
          <Phone className="w-5 h-5 mr-2" />
          SOS
        </Button>
      </div>
    </div>
  );
};

export default Home;