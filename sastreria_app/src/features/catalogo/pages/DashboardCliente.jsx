import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./DashboardCliente.module.css";

const API = "http://localhost:5018/api";
const PASOS = ["Diseño", "Medidas", "Confección", "Entrega"];

const ESTADO_A_PASO = {
  "Diseño": 0, "Medidas": 1, "Confeccion": 2, "Entrega": 3,
};

export const DashboardCliente = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [prendas, setPrendas]         = useState([]);
  const [pedidos, setPedidos]         = useState([]);
  const [carrito, setCarrito]         = useState([]);
  const [cargando, setCargando]       = useState(true);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const [error, setError]             = useState("");

  // Cargar catálogo y pedidos del cliente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resPrendas, resPedidos] = await Promise.all([
          fetch(`${API}/PrendasCatalogo`),
          fetch(`${API}/Pedidos/cliente/${usuario?.id}`),
        ]);
        const dataPrendas = await resPrendas.json();
        const dataPedidos = await resPedidos.json();
        setPrendas(dataPrendas);
        setPedidos(dataPedidos);
      } catch (err) {
        setError("No se pudo cargar el catálogo");
      } finally {
        setCargando(false);
      }
    };
    if (usuario?.id) cargarDatos();
  }, [usuario]);

  // Paso actual basado en el último pedido
  const ultimoPedido = pedidos[pedidos.length - 1];
  const pasoActual = ultimoPedido
    ? (ESTADO_A_PASO[ultimoPedido.estado] ?? 2)
    : 0;

  const agregarAlCarrito = (prenda) => {
    if (!carrito.find((p) => p.id === prenda.id)) {
      setCarrito([...carrito, prenda]);
    }
  };

  const estaEnCarrito = (id) => carrito.find((p) => p.id === id);

  const hacerPedido = async () => {
    if (carrito.length === 0) return;
    try {
      for (const prenda of carrito) {
        await fetch(`${API}/Pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clienteId: usuario.id,
            prendaCatalogoId: prenda.id,
            medidaPrendaId: null,
            costoTotal: prenda.precioBase,
            saldoPendiente: prenda.precioBase,
            estado: "Diseño",
            fechaEntrega: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
          }),
        });
      }
      setPedidoEnviado(true);
      setCarrito([]);
      setTimeout(() => setPedidoEnviado(false), 3000);
      // Recargar pedidos
      const res = await fetch(`${API}/Pedidos/cliente/${usuario.id}`);
      setPedidos(await res.json());
    } catch (err) {
      setError("Error al enviar el pedido");
    }
  };

  const ICONOS = ["👗", "🤵", "👘", "🧥", "👔", "🩱"];

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
        <p className={styles.stepStatus}>
          {ultimoPedido
            ? <>Tu prenda está en etapa de <strong>{ultimoPedido.estado}</strong></>
            : "Aún no tienes pedidos — ¡empieza explorando el catálogo!"}
        </p>
      </section>

      {/* CARRITO */}
      {carrito.length > 0 && (
        <div className={styles.carritoBar}>
          <p className={styles.carritoText}>
            {carrito.length} prenda{carrito.length > 1 ? "s" : ""} seleccionada{carrito.length > 1 ? "s" : ""}
          </p>
          <div className={styles.carritoActions}>
            <button className={styles.btnCarritoSecundario} onClick={() => setCarrito([])}>Vaciar</button>
            <button className={styles.btnCarritoPrimario} onClick={hacerPedido}>Hacer Pedido</button>
          </div>
        </div>
      )}

      {/* MENSAJES */}
      {pedidoEnviado && (
        <div className={styles.confirmacion}>✓ Pedido enviado — nos pondremos en contacto contigo pronto</div>
      )}
      {error && (
        <div className={styles.errorMsg}>{error}</div>
      )}

      {/* CATÁLOGO */}
      <section className={styles.catalogo}>
        <div className={styles.catalogoHeader}>
          <p className={styles.catalogoEy}>Colección 2026</p>
          <h2 className={styles.catalogoH}>Prendas Exclusivas</h2>
        </div>

        {cargando ? (
          <p className={styles.cargando}>Cargando catálogo...</p>
        ) : prendas.length === 0 ? (
          <p className={styles.cargando}>No hay prendas disponibles aún</p>
        ) : (
          <div className={styles.grid}>
            {prendas.map((prenda, i) => (
              <div key={prenda.id} className={styles.card}>
                <div className={styles.cardImg}>
                  {prenda.imagenUrl
                    ? <img src={`http://localhost:5018${prenda.imagenUrl}`} alt={prenda.nombre} className={styles.cardFoto} />
                    : <span className={styles.cardEmoji}>{ICONOS[i % ICONOS.length]}</span>
                  }
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardNombre}>{prenda.nombre}</p>
                  <p className={styles.cardDesc}>{prenda.tipoPrenda}</p>
                  <p className={styles.cardPrecio}>
                    ${prenda.precioBase?.toLocaleString("es-CO")}
                  </p>
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
        )}
      </section>

      {/* MIS PEDIDOS */}
      {pedidos.length > 0 && (
        <section className={styles.misPedidos}>
          <div className={styles.catalogoHeader}>
            <p className={styles.catalogoEy}>Historial</p>
            <h2 className={styles.catalogoH}>Mis Pedidos</h2>
          </div>
          <div className={styles.pedidosLista}>
            {pedidos.map((p) => (
              <div key={p.id} className={styles.pedidoItem}>
                <div>
                  <p className={styles.pedidoNombre}>{p.prendaCatalogo?.nombre || "Prenda"}</p>
                  <p className={styles.pedidoFecha}>
                    Entrega: {new Date(p.fechaEntrega).toLocaleDateString("es-CO")}
                  </p>
                </div>
                <span className={styles.pedidoEstado}>{p.estado}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACCESOS */}
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