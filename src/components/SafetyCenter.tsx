import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Phone, 
  MapPin, 
  Shield, 
  Users, 
  Camera,
  Bell,
  Share,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Heart
} from "lucide-react";

const SafetyCenter = () => {
  const [sosActive, setSosActive] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);

  const emergencyContacts = [
    { name: "Police Emergency", number: "112", type: "police", color: "bg-emergency" },
    { name: "Women Helpline", number: "1091", type: "women", color: "bg-safety-high" },
    { name: "Bus Transport Authority", number: "181", type: "transport", color: "bg-primary" },
    { name: "Local Police Station", number: "+91-9876543210", type: "local", color: "bg-secondary" }
  ];

  const safetyFeatures = [
    {
      title: "Real-time Location Sharing",
      description: "Share your live location with trusted contacts",
      icon: Share,
      active: locationSharing,
      action: () => setLocationSharing(!locationSharing)
    },
    {
      title: "Voice-activated SOS",
      description: "Say 'Help me' to trigger silent alert",
      icon: Bell,
      active: true,
      action: () => {}
    },
    {
      title: "Auto Emergency Detection",
      description: "Detects unusual patterns and alerts",
      icon: Shield,
      active: true,
      action: () => {}
    },
    {
      title: "Community Watch",
      description: "Connect with nearby safety volunteers",
      icon: Users,
      active: false,
      action: () => {}
    }
  ];

  const safetyTips = [
    {
      title: "Night Travel Safety",
      tip: "Always share your live location when traveling after 8 PM",
      priority: "high"
    },
    {
      title: "Bus Stop Safety",
      tip: "Wait near well-lit areas and avoid isolated bus stops",
      priority: "medium"
    },
    {
      title: "Emergency Contacts",
      tip: "Keep important numbers saved and easily accessible",
      priority: "high"
    },
    {
      title: "Trust Your Instincts",
      tip: "If something feels wrong, trust your gut and seek help",
      priority: "high"
    }
  ];

  const handleSOS = () => {
    setSosActive(true);
    // In a real app, this would trigger actual emergency protocols
    setTimeout(() => setSosActive(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Safety Command Center
        </h1>
        <p className="text-muted-foreground">
          Your 24/7 safety companion for secure travel
        </p>
      </div>

      {/* SOS Alert */}
      {sosActive && (
        <Alert className="border-emergency bg-emergency/10">
          <AlertTriangle className="h-4 w-4 text-emergency" />
          <AlertDescription className="text-emergency font-medium">
            🚨 Emergency Alert Activated! Your location has been shared with emergency contacts and local authorities.
          </AlertDescription>
        </Alert>
      )}

      {/* Emergency SOS Button */}
      <Card className="bg-gradient-to-r from-emergency/10 to-destructive/10 border-emergency/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-foreground">Emergency SOS</h2>
            <p className="text-muted-foreground">
              Press and hold for 3 seconds to activate emergency alert
            </p>
            <Button
              size="lg"
              className={`w-32 h-32 rounded-full text-2xl font-bold ${
                sosActive 
                  ? "bg-destructive/80 animate-pulse" 
                  : "bg-emergency hover:bg-emergency/90 animate-emergency-pulse"
              }`}
              onMouseDown={handleSOS}
              disabled={sosActive}
            >
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 mb-2" />
                {sosActive ? "SENT" : "SOS"}
              </div>
            </Button>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              This will immediately alert emergency services, share your location, and notify your trusted contacts
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="w-5 h-5 mr-2 text-emergency" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.number}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${contact.color} rounded-lg flex items-center justify-center`}>
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.number}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Call</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-safety-high" />
            Active Safety Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {safetyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  feature.active ? "bg-safety-high text-safety-high-foreground" : "bg-muted"
                }`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={feature.active ? "default" : "secondary"}>
                  {feature.active ? "Active" : "Inactive"}
                </Badge>
                <Button size="sm" variant="outline" onClick={feature.action}>
                  Toggle
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current Area Safety */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Current Area Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-safety-high/10 rounded-lg border-l-4 border-safety-high">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-safety-high mr-2" />
                  <span className="font-medium">High Safety Zone</span>
                </div>
                <Badge className="bg-safety-high text-safety-high-foreground">92% Safe</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Sector 17, Chandigarh - Well-lit, high security, active patrol
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-secondary rounded-lg">
                <Camera className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-lg font-bold">24</div>
                <div className="text-xs text-muted-foreground">CCTV Cameras</div>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <Users className="w-5 h-5 mx-auto mb-1 text-safety-high" />
                <div className="text-lg font-bold">15</div>
                <div className="text-xs text-muted-foreground">Safety Volunteers</div>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <Clock className="w-5 h-5 mx-auto mb-1 text-warning" />
                <div className="text-lg font-bold">2</div>
                <div className="text-xs text-muted-foreground">Min Response</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-warning" />
              Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  tip.priority === "high" 
                    ? "bg-emergency/10 border-emergency" 
                    : "bg-warning/10 border-warning"
                }`}
              >
                <div className="font-medium text-sm flex items-center">
                  {tip.priority === "high" ? (
                    <Heart className="w-4 h-4 mr-2 text-emergency" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
                  )}
                  {tip.title}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{tip.tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyCenter;