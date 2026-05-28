import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./MainLayout.module.css";

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const usuarioGuardado = localStorage.getItem("usuario");
  const usuarioObj = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  const userRole = usuarioObj?.rol || "cliente";

  const iniciales = usuarioObj?.email
    ? usuarioObj.email.substring(0, 2).toUpperCase()
    : "US";

  const [cartCount, setCartCount] = useState(0);

  const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito") ?? "[]");
    const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    actualizarContador();
    window.addEventListener("carritoActualizado", actualizarContador);

    return () => {
      window.removeEventListener("carritoActualizado", actualizarContador);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.brand} onClick={() => navigate("/cliente")}>
          Elegancia y Estilo
        </div>

        <div>
          <button onClick={() => navigate("/cliente")}>
            Mi Perfil
          </button>

          <button onClick={handleLogout}>
            {iniciales}
          </button>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};
