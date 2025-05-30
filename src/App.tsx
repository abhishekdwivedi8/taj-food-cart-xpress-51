
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Restaurant1 from "./pages/Restaurant1";
import Restaurant2 from "./pages/Restaurant2";
import ChefDashboard from "./pages/ChefDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AnalyticsPage from "./pages/AnalyticsPage";
import MenuManagementPage from "./pages/MenuManagementPage";
import ReviewsManagementPage from "./pages/ReviewsManagementPage";
import UniversalPage from "./pages/UniversalPage";
import ManagerAuth from "./pages/ManagerAuth";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Presentation from "./pages/Presentation";

// Provider imports
import { DeviceIdProvider } from "./context/DeviceIdContext";
import { OrderSystemProvider } from "./context/orderSystem";

function App() {
  return (
    <DeviceIdProvider>
      <OrderSystemProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/restaurant/1" element={<Restaurant1 />} />
            <Route path="/restaurant/2" element={<Restaurant2 />} />
            <Route path="/universal" element={<UniversalPage />} />
            <Route path="/chef" element={<ChefDashboard />} />
            <Route path="/manager/login" element={<ManagerAuth />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/analytics" element={<AnalyticsPage />} />
            <Route path="/manager/menu" element={<MenuManagementPage />} />
            <Route path="/manager/reviews" element={<ReviewsManagementPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </OrderSystemProvider>
    </DeviceIdProvider>
  );
}

export default App;
