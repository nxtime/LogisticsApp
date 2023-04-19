import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes.routes";
import AppRoutes from "./AppRoutes.routes";
import { authStore } from "../stores/Auth.store";
import { observer } from "mobx-react-lite";

const MainRoutes = () => {
  const { user } = authStore;
  return (
    <BrowserRouter>{!user ? <AuthRoutes /> : <AppRoutes />}</BrowserRouter>
  );
};

export default observer(MainRoutes);
