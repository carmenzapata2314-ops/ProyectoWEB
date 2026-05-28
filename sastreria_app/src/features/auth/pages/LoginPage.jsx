import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./LoginPage.module.css";

const USUARIOS_SIMULADOS = [
  { email: "cliente@ee.com",     password: "1234", rol: "cliente",       nombre: "Ana García" },
  { email: "recepcion@ee.com",   password: "1234", rol: "recepcion",     nombre: "María López" },
  { email: "sastre@ee.com",      password: "1234", rol: "sastre",        nombre: "Carlos Ruiz" },
  { email: "admin@ee.com",       password: "1234", rol: "admin",         nombre: "Elena Mora" },
];

const RUTAS_POR_ROL = {
  cliente:   "/cliente",
  recepcion: "/recepcion",
  sastre:    "/sastre",
  admin:     "/admin",
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [registerData, setRegisterData] = useState({
    nombre: "", email: "", password: "", confirmar: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const usuario = USUARIOS_SIMULADOS.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );
    if (usuario) {
      login(usuario);
      navigate(RUTAS_POR_ROL[usuario.rol]);
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }
    alert("Cuenta creada (simulación)");
    setActiveTab("login");
  };

  return (
    <div className={styles.wrapper}>
      <aside className={styles.panel}>
        <div className={styles.diagonalPattern} />
        <div className={styles.panelInner}>
          <div className={styles.brandBlock}>
            <span className={styles.brandLine} />
            <p className={styles.brandEyebrow}>ALTA COSTURA</p>
            <h1 className={styles.brandName}>
              Sastrería<br /><em>Elegancia</em><br />& Estilo
            </h1>
            <p className={styles.brandTagline}>
              Cada prenda cuenta una historia.<br />La tuya comienza aquí.
            </p>
          </div>
          <div className={styles.panelFooter}>
            <p className={styles.panelFooterText}>© 2025 Sastrería Elegancia & Estilo</p>
          </div>
        </div>
      </aside>

      <main className={styles.formSide}>
        <div className={styles.formContainer}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === "login" ? styles.tabActive : ""}`}
              onClick={() => { setActiveTab("login"); setError(""); }}>
              Iniciar Sesión
            </button>
            <button className={`${styles.tab} ${activeTab === "register" ? styles.tabActive : ""}`}
              onClick={() => { setActiveTab("register"); setError(""); }}>
              Registrarse
            </button>
          </div>

          {activeTab === "login" && (
            <form className={styles.form} onSubmit={handleLoginSubmit}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Bienvenida de nuevo</h2>
                <p className={styles.formSubtitle}>Accede a tu portal exclusivo</p>
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Correo electrónico</label>
                <input type="email" placeholder="tu@correo.com" className={styles.input}
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Contraseña</label>
                <input type="password" placeholder="••••••••" className={styles.input}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
              </div>

              <div className={styles.forgotRow}>
                <a href="#" className={styles.forgotLink}>¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className={styles.btnPrimary}>Ingresar</button>

              <p className={styles.hintText}>
                Demo: cliente@ee.com · recepcion@ee.com · sastre@ee.com · admin@ee.com — clave: 1234
              </p>
            </form>
          )}

          {activeTab === "register" && (
            <form className={styles.form} onSubmit={handleRegisterSubmit}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Crea tu cuenta</h2>
                <p className={styles.formSubtitle}>Únete a nuestra comunidad exclusiva</p>
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Nombre completo</label>
                <input type="text" placeholder="Tu nombre" className={styles.input}
                  value={registerData.nombre}
                  onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })} required />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Correo electrónico</label>
                <input type="email" placeholder="tu@correo.com" className={styles.input}
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} required />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Contraseña</label>
                <input type="password" placeholder="••••••••" className={styles.input}
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} required />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Confirmar contraseña</label>
                <input type="password" placeholder="••••••••" className={styles.input}
                  value={registerData.confirmar}
                  onChange={(e) => setRegisterData({ ...registerData, confirmar: e.target.value })} required />
              </div>

              <button type="submit" className={styles.btnPrimary}>Crear cuenta</button>
            </form>
          )}

          <div className={styles.formSideFooter}>
            <p>© 2025 Sastrería Elegancia & Estilo</p>
          </div>
        </div>
      </main>
    </div>
  );
};