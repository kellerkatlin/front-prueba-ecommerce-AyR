import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/Register";
import CategoryPage from "@/pages/dashboard/CategoryPage";
import PricePage from "@/pages/dashboard/PricePage";
import ProductPage from "@/pages/dashboard/ProductPage";
import StockPage from "@/pages/dashboard/StockPage";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

export default function RootRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Outlet />}>
            <Route index element={<ProductPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="prices" element={<PricePage />} />
            <Route path="stock" element={<StockPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
