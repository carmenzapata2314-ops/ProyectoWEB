import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import styles from "./DashboardSastre.module.css";

const PEDIDOS_INICIALES = [
  { id: 1, prenda: "Vestido de Noche",  cliente: "Ana García",      estado: "pendiente" },
  { id: 2, prenda: "Traje Clásico",     cliente: "María López",     estado: "pendiente" },
  { id: 3, prenda: "Vestido Cóctel",    cliente: "Sofía Martínez",  estado: "proceso"   },
  { id: 4, prenda: "Abrigo a Medida",   cliente: "Laura Pérez",     estado: "proceso"   },
  { id: 5, prenda: "Camisa Bespoke",    cliente: "Ana García",      estado: "terminado" },
  { id: 6, prenda: "Conjunto Sastre",   cliente: "María López",     estado: "terminado" },
];

const COLUMNAS = [
  { key: "pendiente", label: "Pendientes",  color: "colPendiente" },
  { key: "proceso",   label: "En Proceso",  color: "colProceso"   },
  { key: "terminado", label: "Terminados",  color: "colTerminado" },
];

const SIGUIENTE_ESTADO = {
  pendiente: "proceso",
  proceso:   "terminado",
};

export const DashboardSastre = () => {
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState(PEDIDOS_INICIALES);
  const [modalMedidas, setModalMedidas] = useState(null);

  const avanzarEstado = (id) => {
    setPedidos(pedidos.map((p) =>
      p.id === id && SIGUIENTE_ESTADO[p.estado]
        ? { ...p, estado: SIGUIENTE_ESTADO[p.estado] }
        : p
    ));
  };

  const MEDIDAS_DEMO = {
    Busto: "92 cm", Cintura: "68 cm", Cadera: "96 cm",
    "Largo Brazo": "58 cm", Hombros: "38 cm", "Largo Total": "165 cm",
  };

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <section className={styles.header}>
        <div className={styles.headerPattern} />
        <div className={styles.headerContent}>
          <p className={styles.headerEy}>Panel de trabajo</p>
          <h1 className={styles.headerH}>Panel del Sastre</h1>
          <p className={styles.headerSub}>{usuario?.nombre} — {pedidos.filter(p => p.estado === "proceso").length} pedidos en proceso</p>
        </div>
      </section>

      {/* KANBAN */}
      <div className={styles.kanban}>
        {COLUMNAS.map((col) => {
          const items = pedidos.filter((p) => p.estado === col.key);
          return (
            <div key={col.key} className={styles.columna}>
              <div className={`${styles.columnaHeader} ${styles[col.color]}`}>
                <p className={styles.columnaLabel}>{col.label}</p>
                <span className={styles.columnaBadge}>{items.length}</span>
              </div>

              <div className={styles.columnaBody}>
                {items.length === 0 && (
                  <p className={styles.vacio}>Sin pedidos</p>
                )}
                {items.map((pedido) => (
                  <div key={pedido.id} className={styles.ticket}>
                    <div className={styles.ticketTop}>
                      <p className={styles.ticketPrenda}>{pedido.prenda}</p>
                      <p className={styles.ticketCliente}>{pedido.cliente}</p>
                    </div>
                    <div className={styles.ticketActions}>
                      <button
                        className={styles.btnVerMedidas}
                        onClick={() => setModalMedidas(pedido)}
                      >
                        Ver Medidas
                      </button>
                      {SIGUIENTE_ESTADO[pedido.estado] && (
                        <button
                          className={styles.btnAvanzar}
                          onClick={() => avanzarEstado(pedido.id)}
                        >
                          Avanzar →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL MEDIDAS */}
      {modalMedidas && (
        <div className={styles.modalOverlay} onClick={() => setModalMedidas(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalEy}>Medidas del cliente</p>
                <h3 className={styles.modalH}>{modalMedidas.cliente}</h3>
                <p className={styles.modalSub}>{modalMedidas.prenda}</p>
              </div>
              <button className={styles.modalClose} onClick={() => setModalMedidas(null)}>✕</button>
            </div>
            <div className={styles.modalGrid}>
              {Object.entries(MEDIDAS_DEMO).map(([key, val]) => (
                <div key={key} className={styles.modalItem}>
                  <p className={styles.modalLabel}>{key}</p>
                  <p className={styles.modalValor}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};