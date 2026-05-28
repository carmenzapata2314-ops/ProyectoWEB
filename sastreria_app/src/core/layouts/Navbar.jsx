import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

const ETIQUETAS_ROL = {
  cliente:   "Cliente",
  recepcion: "Recepción",
  sastre:    "Sastre",
  admin:     "Administrador",
};

const RUTAS_ROL = {
  cliente:   "/cliente",
  recepcion: "/recepcion",
  sastre:    "/sastre",
  admin:     "/admin",
};

export const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const iniciales = usuario?.nombre
    ? usuario.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => navigate(RUTAS_ROL[usuario?.rol] || "/login")}>
        E &amp; E
      </div>

      <div className={styles.rolLabel}>
        {ETIQUETAS_ROL[usuario?.rol]}
      </div>

      <div className={styles.avatarWrap} ref={ref}>
        <button className={styles.avatar} onClick={() => setOpen(!open)}>
          {iniciales}
        </button>

        {open && (
          <div className={styles.menu}>
            <div className={styles.menuHeader}>
              <p className={styles.menuNombre}>{usuario?.nombre}</p>
              <p className={styles.menuRol}>{ETIQUETAS_ROL[usuario?.rol]}</p>
            </div>
            <div className={styles.menuDivider} />
            <button className={styles.menuItem}
              onClick={() => { navigate(RUTAS_ROL[usuario?.rol]); setOpen(false); }}>
              Mi dashboard
            </button>
            {usuario?.rol === "cliente" && (
              <button className={styles.menuItem}
                onClick={() => { navigate("/medidas"); setOpen(false); }}>
                Mis medidas
              </button>
            )}
            <div className={styles.menuDivider} />
            <button className={`${styles.menuItem} ${styles.menuItemDanger}`}
              onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};