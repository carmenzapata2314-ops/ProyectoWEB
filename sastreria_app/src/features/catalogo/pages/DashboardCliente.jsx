import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./DashboardCliente.module.css";

const PASOS = ["Diseño", "Medidas", "Confección", "Entrega"];

const PRENDAS = [
  { id: 1, icon: "👗", nombre: "Vestido de Noche",    desc: "Seda italiana, corte a medida",   precio: "$450.000" },
  { id: 2, icon: "🤵", nombre: "Traje Clásico",       desc: "Lana fina, bespoke tailoring",    precio: "$680.000" },
  { id: 3, icon: "👘", nombre: "Vestido Cóctel",      desc: "Gasa y encaje, diseño exclusivo", precio: "$320.000" },
  { id: 4, icon: "🧥", nombre: "Abrigo a Medida",     desc: "Cachemira premium, forro seda",   precio: "$780.000" },
  { id: 5, icon: "👔", nombre: "Camisa Bespoke",      desc: "Algodón egipcio, cuello italiano",precio: "$180.000" },
  { id: 6, icon: "🩱", nombre: "Conjunto Sastre",     desc: "Tweed inglés, botones dorados",   precio: "$520.000" },
];

export const DashboardCliente = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [pasoActual] = useState(2);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const agregarAlCarrito = (prenda) => {
    if (!carrito.find((p) => p.id === prenda.id)) {
      setCarrito([...carrito, prenda]);
    }
  };

  const estaEnCarrito = (id) => carrito.find((p) => p.id === id);

  const hacerPedido = () => {
    if (carrito.length === 0) return;
    setPedidoEnviado(true);
    setTimeout(() => setPedidoEnviado(false), 3000);
    setCarrito([]);
  };

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} />
        <div className={styles.heroContent}>
          <p className={styles.heroEy}>Bienvenida</p>
          <h1 className={styles.heroH}>Tu Estilo, <em>a Medida</em></h1>
          <p className={styles.heroSub}>Hola, {usuario?.nombre} — explora nuestra colección exclusiva</p>
        </div>
      </section>

      {/* STEPPER */}
      <section className={styles.stepperWrap}>
        <div className={styles.stepper}>
          {PASOS.map((paso, i) => (
            <div key={paso} className={styles.stepItem}>
              <div className={`${styles.stepCircle} ${i < pasoActual ? styles.stepDone : ""} ${i === pasoActual ? styles.stepActive : ""}`}>
                {i < pasoActual ? "✓" : i + 1}
              </div>
              <p className={`${styles.stepLabel} ${i === pasoActual ? styles.stepLabelActive : ""}`}>{paso}</p>
              {i < PASOS.length - 1 && (
                <div className={`${styles.stepLine} ${i < pasoActual ? styles.stepLineDone : ""}`} />
              )}
            </div>
          ))}
        </div>
        <p className={styles.stepStatus}>Tu prenda está en etapa de <strong>Confección</strong></p>
      </section>

      {/* CARRITO */}
      {carrito.length > 0 && (
        <div className={styles.carritoBar}>
          <p className={styles.carritoText}>
            {carrito.length} prenda{carrito.length > 1 ? "s" : ""} seleccionada{carrito.length > 1 ? "s" : ""}
          </p>
          <div className={styles.carritoActions}>
            <button className={styles.btnCarritoSecundario} onClick={() => setCarrito([])}>
              Vaciar
            </button>
            <button className={styles.btnCarritoPrimario} onClick={hacerPedido}>
              Hacer Pedido
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMACIÓN */}
      {pedidoEnviado && (
        <div className={styles.confirmacion}>
          ✓ Pedido enviado — nos pondremos en contacto contigo pronto
        </div>
      )}

      {/* CATÁLOGO */}
      <section className={styles.catalogo}>
        <div className={styles.catalogoHeader}>
          <p className={styles.catalogoEy}>Colección 2026</p>
          <h2 className={styles.catalogoH}>Prendas Exclusivas</h2>
        </div>

        <div className={styles.grid}>
          {PRENDAS.map((prenda) => (
            <div key={prenda.id} className={styles.card}>
              <div className={styles.cardImg}>
                <span className={styles.cardEmoji}>{prenda.icon}</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardNombre}>{prenda.nombre}</p>
                <p className={styles.cardDesc}>{prenda.desc}</p>
                <p className={styles.cardPrecio}>{prenda.precio}</p>
                <button
                  className={`${styles.btnCard} ${estaEnCarrito(prenda.id) ? styles.btnCardActivo : ""}`}
                  onClick={() => agregarAlCarrito(prenda)}
                >
                  {estaEnCarrito(prenda.id) ? "✓ Agregado" : "Agregar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESOS RÁPIDOS */}
      <section className={styles.accesos}>
        <button className={styles.btnAcceso} onClick={() => navigate("/medidas")}>
          📏 Ver mis medidas
        </button>
        <button className={styles.btnAcceso} onClick={() => navigate("/portal")}>
          🏠 Volver al portal
        </button>
      </section>

    </div>
  );
};