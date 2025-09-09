import { useState } from "react";
import AdminNavigation from "@/components/AdminNavigation";
import AdminDashboard from "@/components/AdminDashboard";
import ManageFleet from "@/components/ManageFleet";
import ManageIssues from "@/components/ManageIssues";
import AdminReports from "@/components/AdminReports";

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "fleet":
        return <ManageFleet />;
      case "issues":
        return <ManageIssues />;
      case "reports":
        return <AdminReports />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-sidebar">
      <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="ml-64 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPortal;