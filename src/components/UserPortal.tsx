import { useState } from "react";
import Navigation from "@/components/Navigation";
import Home from "@/components/Home";
import TrackBus from "@/components/TrackBus";
import SafetyCenter from "@/components/SafetyCenter";
import ReportIncident from "@/components/ReportIncident";
import Community from "@/components/Community";
import RoutePlanner from "@/components/RoutePlanner";
import About from "@/components/About";
import BookTicket from "@/components/BookTicket";
import MyBookings from "@/components/MyBookings";

const UserPortal = () => {
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
      case "book":
        return <BookTicket />;
      case "bookings":
        return <MyBookings />;
      case "about":
        return <About />;
      default:
        return <Home onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} portalType="user" />
      <main className="pb-20">
        {renderContent()}
      </main>
    </div>
  );
};

export default UserPortal;