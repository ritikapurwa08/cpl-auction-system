import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserAuthPage from "./components/auth/users-auth-page";
import { useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { useGetCurrentUser } from "./api/users/query/users-query";
import UserLogOutButton from "./components/auth/user-logout-button";
import AdminDashboard from "./components/admin/admin-dashboard";
import VerifiedUserDashboard from "./components/users/varified-users";
import UnverifiedUserDashboard from "./components/users/unverified-users";

const RootLayout = () => {
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
  }, [isAuthenticated, isLoading, navigate, location]);

  return (
    <main className="w-screen min-h-screen text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserAuthPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/verified-user" element={<VerifiedUserDashboard />} />
        <Route path="/unverified-user" element={<UnverifiedUserDashboard />} />
      </Routes>
    </main>
  );
};

export default RootLayout;

function Home() {
  const user = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.isAdmin === true) {
        navigate("/admin");
      } else if (user.verified) {
        navigate("/verified-user");
      } else if (!user.verified) {
        navigate("/unverified-user");
      }
    }
  }, [user, navigate, user?.isAdmin, user?.verified]);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-red-400">
            Welcome,{" "}
            {user ? <div>{user.name}</div> : <div>" Login first "</div>}
          </h1>
        </div>
        <UserLogOutButton />
      </div>
    </div>
  );
}
