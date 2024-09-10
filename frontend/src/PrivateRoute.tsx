import { useAdminAuth } from "./hooks/useAdminAuth"; // Assume you have an auth context

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAdminAuth();

  return isLoggedIn ? children : "";
};

export default PrivateRoute;
