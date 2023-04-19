import { Navigate, Outlet, Route, Routes } from "react-router";
import AppLayout from "../components/layouts/AppLayout";
import Home from "../components/pages/Home";
import { Chart } from "../components/atom/Chart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AppLayout>
            <Outlet />
          </AppLayout>
        }
      >
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Chart />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
