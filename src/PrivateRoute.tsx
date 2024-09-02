import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth"; // Assume you have an auth context

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
