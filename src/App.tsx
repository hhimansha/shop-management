import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboardLayout from "./views/admin/AdminDashboardLayout";
import CustomerScreenLayout from "./views/admin/customers/CustomerLayout";
import AdminDashboardScreen from "./views/admin/AdminDashboardScreen";
import CustomerScreen from "./views/admin/customers/CustomerScreen";
import NewsFeedLayout from "./views/admin/news-feed/NewsFeedLayout";
import NewsFeedScreen from "./views/admin/news-feed/NewsFeedScreen";
import FeedbackLayout from "./views/admin/feedback/FeedbackLayout";
import FeedbackScreen from "./views/admin/feedback/FeedbackScreen";
import DeliveryLayout from "./views/admin/delivery/DeliveryLayout";
import DeliveryScreen from "./views/admin/delivery/DeliveryScreen";
import SuppliersLayout from "./views/admin/suppliers/SuppliersLayout";
import SuppliersScreen from "./views/admin/suppliers/SuppliersScreen";
import OrdersLayout from "./views/admin/orders/OrdersLayout";
import OrdersScreen from "./views/admin/orders/OrdersScreen";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component
import { AuthProvider } from "./context/authContext";
import Login from "./views/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admindashboard"
            element={
              <PrivateRoute>
                <AdminDashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboardScreen />} />
            <Route path="customers" element={<CustomerScreenLayout />}>
              <Route index element={<CustomerScreen />} />
            </Route>
            <Route path="newsfeed" element={<NewsFeedLayout />}>
              <Route index element={<NewsFeedScreen />} />
            </Route>
            <Route path="feedback" element={<FeedbackLayout />}>
              <Route index element={<FeedbackScreen />} />
            </Route>
            <Route path="delivery" element={<DeliveryLayout />}>
              <Route index element={<DeliveryScreen />} />
            </Route>
            <Route path="suppliers" element={<SuppliersLayout />}>
              <Route index element={<SuppliersScreen />} />
            </Route>
            <Route path="orders" element={<OrdersLayout />}>
              <Route index element={<OrdersScreen />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
