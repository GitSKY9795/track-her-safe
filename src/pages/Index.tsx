import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Home from "@/components/Home";
import TrackBus from "@/components/TrackBus";
import SafetyCenter from "@/components/SafetyCenter";
import ReportIncident from "@/components/ReportIncident";
import Community from "@/components/Community";
import RoutePlanner from "@/components/RoutePlanner";
import AdminDashboard from "@/components/AdminDashboard";
import About from "@/components/About";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onTabChange={setActiveTab} />;
      case "track":
        return <TrackBus />;
      case "safety":
        return <SafetyCenter />;
      case "report":
        return <ReportIncident />;
      case "community":
        return <Community />;
      case "routes":
        return <RoutePlanner />;
      case "admin":
        return <AdminDashboard />;
      case "about":
        return <About />;
      default:
        return <Home onTabChange={setActiveTab} />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="pb-20">
          {renderContent()}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
