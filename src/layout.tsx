import { Route, Routes } from "react-router-dom";

const RootLayout = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>
    </main>
  );
};

export default RootLayout;
