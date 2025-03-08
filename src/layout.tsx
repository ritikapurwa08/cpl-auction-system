import { Route, Routes } from "react-router-dom";
import UserAuthPage from "./components/auth/users-auth-page";

const RootLayout = () => {
  return (
    <main className="w-screen ">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<UserAuthPage />} />
      </Routes>
    </main>
  );
};

export default RootLayout;
