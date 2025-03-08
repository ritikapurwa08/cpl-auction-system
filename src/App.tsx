import { useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RootLayout from "./layout";
import { ThemeProvider } from "./components/theme-provider";

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RootLayout />
    </ThemeProvider>
  );
};

export default App;
