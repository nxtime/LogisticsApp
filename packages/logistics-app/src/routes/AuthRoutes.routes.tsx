import { Navigate, Outlet, Route, Routes } from "react-router";
import AuthLayout from "../components/layouts/AuthLayout";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        }
      >
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
