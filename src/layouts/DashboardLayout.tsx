import Loader from "@/components/Loader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useProfile } from "@/queries/authQueires";
import { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Sidebar = lazy(() => import("@/components/Sidebar"));
const Header = lazy(() => import("@/components/Header"));

export default function DashboardLayout() {
  const { isLoading, isError } = useProfile();

  if (isLoading) return <Loader />;

  if (isError) return <Navigate to="/login" replace />;

  return (
    <SidebarProvider className="flex min-h-screen">
      <Suspense fallback={<Loader />}>
        <Sidebar />
        <div className="w-full bg-background">
          <Header />
          <main className="md:p-12 p-4 w-full ">
            <Outlet />
          </main>
          <Toaster />
        </div>
      </Suspense>
    </SidebarProvider>
  );
}
