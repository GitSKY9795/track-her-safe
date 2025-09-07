import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Route, 
  MapPin, 
  Clock, 
  Shield, 
  Navigation,
  Star,
  Users,
  Zap,
  ArrowRight,
  Filter
} from "lucide-react";

const RoutePlanner = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("safest");

  const routeOptions = [
    {
      id: 1,
      name: "Safest Route",
      duration: "35 mins",
      distance: "12.5 km",
      safetyScore: 4.9,
      cost: "₹25",
      transfers: 1,
      features: ["Well-lit stops", "CCTV coverage", "Women-only sections"],
      buses: ["45A", "23B"],
      crowdLevel: "Low",
      walkingTime: "8 mins",
      recommended: true
    },
    {
      id: 2,
      name: "Fastest Route", 
      duration: "28 mins",
      distance: "11.2 km",
      safetyScore: 4.3,
      cost: "₹30",
      transfers: 2,
      features: ["Express service", "AC buses"],
      buses: ["67E", "12A", "34C"],
      crowdLevel: "High",
      walkingTime: "12 mins",
      recommended: false
    },
    {
      id: 3,
      name: "Most Economical",
      duration: "42 mins", 
      distance: "13.8 km",
      safetyScore: 4.1,
      cost: "₹18",
      transfers: 1,
      features: ["Budget-friendly"],
      buses: ["89B", "45C"],
      crowdLevel: "Medium",
      walkingTime: "6 mins",
      recommended: false
    }
  ];

  const safetyFeatures = [
    { name: "CCTV Coverage", available: true },
    { name: "Well-lit Stops", available: true },
    { name: "Women-only Section", available: true },
    { name: "Emergency Button", available: true },
    { name: "Security Patrol", available: false },
    { name: "Night Service", available: true }
  ];

  const filterOptions = [
    { id: "safest", label: "Safest for Women", icon: Shield },
    { id: "fastest", label: "Fastest", icon: Zap },
    { id: "cheapest", label: "Most Economical", icon: Star },
    { id: "least-crowded", label: "Least Crowded", icon: Users }
  ];

  const getSafetyColor = (score: number) => {
    if (score >= 4.5) return "text-safety-high bg-safety-high/10";
    if (score >= 4.0) return "text-safety-medium bg-safety-medium/10";
    return "text-safety-low bg-safety-low/10";
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
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
          Smart Route Planner
        </h1>
        <p className="text-muted-foreground">
          Find the safest and most efficient routes for your journey
        </p>
      </div>

      {/* Route Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-safety-high w-4 h-4" />
              <Input
                placeholder="From: Current location or enter address"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-4 h-4" />
              <Input
                placeholder="To: Enter destination"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">Prioritize:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="flex items-center"
                >
                  <filter.icon className="w-4 h-4 mr-1" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full">
            <Route className="w-4 h-4 mr-2" />
            Find Safe Routes
          </Button>
        </CardContent>
      </Card>

      {/* Route Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {routeOptions.map((route) => (
          <Card 
            key={route.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              route.recommended ? "ring-2 ring-safety-high bg-safety-high/5" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  {route.recommended && (
                    <Shield className="w-5 h-5 mr-2 text-safety-high" />
                  )}
                  {route.name}
                </CardTitle>
                {route.recommended && (
                  <Badge className="bg-safety-high text-safety-high-foreground">
                    Recommended
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Route Summary */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 bg-secondary rounded-lg">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <div className="font-medium text-sm">{route.duration}</div>
                  <div className="text-xs text-muted-foreground">Total Time</div>
                </div>
                <div className="p-2 bg-secondary rounded-lg">
                  <div className="text-lg font-bold text-primary">{route.cost}</div>
                  <div className="text-xs text-muted-foreground">Fare</div>
                </div>
              </div>

              {/* Safety Score */}
              <div className={`p-3 rounded-lg ${getSafetyColor(route.safetyScore)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    <span className="font-medium">Safety Score</span>
                  </div>
                  <span className="text-lg font-bold">{route.safetyScore}/5</span>
                </div>
              </div>

              {/* Route Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Distance:</span>
                  <span>{route.distance}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Transfers:</span>
                  <span>{route.transfers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Walking:</span>
                  <span>{route.walkingTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Crowd Level:</span>
                  <Badge className={getCrowdColor(route.crowdLevel)} variant="outline">
                    {route.crowdLevel}
                  </Badge>
                </div>
              </div>

              {/* Bus Routes */}
              <div>
                <div className="text-sm font-medium mb-2">Bus Routes:</div>
                <div className="flex items-center space-x-2">
                  {route.buses.map((bus, index) => (
                    <div key={bus} className="flex items-center">
                      <Badge variant="outline">{bus}</Badge>
                      {index < route.buses.length - 1 && (
                        <ArrowRight className="w-3 h-3 mx-2 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="text-sm font-medium mb-2">Safety Features:</div>
                <div className="flex flex-wrap gap-1">
                  {route.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant={route.recommended ? "default" : "outline"}>
                Select This Route
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Safety Features Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-safety-high" />
            Area Safety Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {safetyFeatures.map((feature) => (
              <div
                key={feature.name}
                className={`p-3 rounded-lg border ${
                  feature.available 
                    ? "bg-safety-high/10 border-safety-high" 
                    : "bg-muted/10 border-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{feature.name}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    feature.available ? "bg-safety-high" : "bg-muted"
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoutePlanner;