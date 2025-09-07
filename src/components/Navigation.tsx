import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Bus, 
  Shield, 
  FileText, 
  Users, 
  Route, 
  Settings, 
  Info,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home", icon: Home, badge: null },
    { id: "track", label: "Track Bus", icon: Bus, badge: "Live" },
    { id: "safety", label: "Safety Center", icon: Shield, badge: "24/7" },
    { id: "report", label: "Report", icon: FileText, badge: null },
    { id: "community", label: "Community", icon: Users, badge: null },
    { id: "routes", label: "Routes", icon: Route, badge: null },
    { id: "admin", label: "Admin", icon: Settings, badge: null },
    { id: "about", label: "About", icon: Info, badge: null },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-card border-b border-border shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">TrackBus Safe</h1>
            <p className="text-xs text-muted-foreground">Women-Centric Transport</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabClick(item.id)}
              className="relative flex items-center space-x-2 px-4 py-2 transition-all"
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden lg:inline">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {item.badge}
                </Badge>
              )}
              {activeTab === item.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">TrackBus Safe</h1>
              <p className="text-xs text-muted-foreground">Women-Centric</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-2 p-4">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTabClick(item.id)}
                  className="flex items-center justify-start space-x-2 p-3 h-auto"
                >
                  <item.icon className="w-4 h-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;