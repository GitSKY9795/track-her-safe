import ProtectedRoute from "@/components/ProtectedRoute";
import UserPortal from "@/components/UserPortal";
import AdminPortal from "@/components/AdminPortal";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>;
  }

  return (
    <ProtectedRoute>
      {userProfile?.role === 'admin' ? <AdminPortal /> : <UserPortal />}
    </ProtectedRoute>
  );
};

export default Index;
