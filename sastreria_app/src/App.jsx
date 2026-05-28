import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import { LoginPage }        from "./features/auth/pages/LoginPage";
import { PortalCliente }    from "./features/portal/PortalCliente";
import { PrivateLayout }    from "./core/layouts/PrivateLayout";

import { DashboardCliente } from "./features/catalogo/pages/DashboardCliente";
import { DashboardMedidas } from "./features/medidas/pages/DashboardMedidas";
import { DashboardRecepcion } from "./features/recepcion/pages/DashboardRecepcion";
import { DashboardSastre }  from "./features/sastreria/pages/DashboardSastre";
import { DashboardAdmin }   from "./features/finanzas/pages/DashboardAdmin";

const PrivateRoute = ({ roles }) => {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" />;
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/login" />;
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PÚBLICO */}
          <Route path="/portal" element={<PortalCliente />} />
          <Route path="/login"  element={<LoginPage />} />

          {/* PRIVADO con navbar */}
          <Route element={<PrivateLayout />}>
            <Route element={<PrivateRoute roles={["cliente"]} />}>
              <Route path="/cliente"  element={<DashboardCliente />} />
              <Route path="/medidas"  element={<DashboardMedidas />} />
            </Route>
            <Route element={<PrivateRoute roles={["recepcion"]} />}>
              <Route path="/recepcion" element={<DashboardRecepcion />} />
            </Route>
            <Route element={<PrivateRoute roles={["sastre"]} />}>
              <Route path="/sastre" element={<DashboardSastre />} />
            </Route>
            <Route element={<PrivateRoute roles={["admin"]} />}>
              <Route path="/admin" element={<DashboardAdmin />} />
            </Route>
          </Route>

          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/portal" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;