import { useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RootLayout from "./layout";

const App = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    } else if (
      isAuthenticated &&
      !isLoading &&
      location.pathname === "/login"
    ) {
      navigate("/");
    }
  });
  return (
    <div>
      <RootLayout />
    </div>
  );
};

export default App;
