import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Shield, 
  Navigation,
  Bus,
  AlertTriangle,
  CheckCircle,
  Star
} from "lucide-react";

const TrackBus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const routes = [
    {
      id: "45A",
      name: "Sector 17 - Railway Station",
      status: "On Time",
      nextBus: "3 mins",
      safetyScore: 4.8,
      crowdLevel: "Low",
      features: ["CCTV", "Women-Only Section", "GPS Tracked"],
      buses: [
        { id: "PB45-001", location: "Sector 22", eta: "3 mins", crowd: "Low", safety: "high" },
        { id: "PB45-002", location: "Sector 35", eta: "15 mins", crowd: "Medium", safety: "high" }
      ]
    },
    {
      id: "23B",
      name: "Chandigarh - Mohali",
      status: "Delayed",
      nextBus: "8 mins",
      safetyScore: 4.2,
      crowdLevel: "High",
      features: ["CCTV", "Emergency Button"],
      buses: [
        { id: "PB23-001", location: "Phase 7", eta: "8 mins", crowd: "High", safety: "medium" },
        { id: "PB23-002", location: "IT City", eta: "22 mins", crowd: "Low", safety: "high" }
      ]
    },
    {
      id: "67C",
      name: "University - Mall Road",
      status: "On Time",
      nextBus: "1 min",
      safetyScore: 4.9,
      crowdLevel: "Medium",
      features: ["CCTV", "Women-Only Section", "GPS Tracked", "Emergency Button"],
      buses: [
        { id: "PB67-001", location: "Near You", eta: "1 min", crowd: "Medium", safety: "high" }
      ]
    }
  ];

  const filteredRoutes = routes.filter(route => 
    route.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case "high": return "text-safety-high bg-safety-high/10";
      case "medium": return "text-safety-medium bg-safety-medium/10";
      case "low": return "text-safety-low bg-safety-low/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getCrowdColor = (crowd: string) => {
    switch (crowd) {
      case "Low": return "text-safety-high bg-safety-high/10";
      case "Medium": return "text-safety-medium bg-safety-medium/10";
      case "High": return "text-safety-low bg-safety-low/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Live Bus Tracking
        </h1>
        <p className="text-muted-foreground">
          Real-time bus locations with safety insights
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by route number or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Route List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRoutes.map((route) => (
          <Card 
            key={route.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedRoute === route.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{route.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">{route.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={route.status === "On Time" ? "default" : "destructive"}
                    className="mb-1"
                  >
                    {route.status}
                  </Badge>
                  <div className="text-lg font-bold text-primary">{route.nextBus}</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Safety & Crowd Info */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-secondary rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="ml-1 font-medium">{route.safetyScore}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Safety</div>
                </div>
                <div className={`text-center p-2 rounded-lg ${getCrowdColor(route.crowdLevel)}`}>
                  <Users className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-xs font-medium">{route.crowdLevel}</div>
                </div>
                <div className="text-center p-2 bg-safety-high/10 rounded-lg">
                  <Shield className="w-4 h-4 mx-auto mb-1 text-safety-high" />
                  <div className="text-xs text-safety-high font-medium">Secure</div>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {route.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Detailed Bus Info - Expanded */}
              {selectedRoute === route.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <h4 className="font-medium text-sm">Live Bus Locations:</h4>
                  {route.buses.map((bus) => (
                    <div key={bus.id} className="p-3 bg-secondary rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">{bus.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{bus.eta}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{bus.location}</span>
                        <div className="flex items-center space-x-2">
                          <Badge className={getCrowdColor(bus.crowd)} variant="outline">
                            {bus.crowd}
                          </Badge>
                          <div className={`p-1 rounded ${getSafetyColor(bus.safety)}`}>
                            {bus.safety === "high" ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertTriangle className="w-3 h-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full mt-3" variant="outline">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Walking Directions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No routes found</h3>
            <p className="text-muted-foreground">Try searching with a different route number or destination</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackBus;