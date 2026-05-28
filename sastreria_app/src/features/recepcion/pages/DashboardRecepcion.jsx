import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import styles from "./DashboardRecepcion.module.css";

const CLIENTES = ["Ana García", "María López", "Sofía Martínez", "Laura Pérez"];
const SASTRES  = ["Carlos Ruiz", "Pedro Gómez", "Luis Torres"];
const PRENDAS  = ["Vestido de Noche", "Traje Clásico", "Vestido Cóctel", "Abrigo a Medida", "Camisa Bespoke", "Conjunto Sastre"];

export const DashboardRecepcion = () => {
  const { usuario } = useAuth();

  const [medidas, setMedidas] = useState({
    busto: "", cintura: "", cadera: "",
    largoBrazo: "", hombros: "", largoTotal: "",
  });

  const [pedido, setPedido] = useState({
    cliente: "", prenda: "", sastre: "", fecha: "",
  });

  const [clienteNuevo, setClienteNuevo] = useState({
    nombre: "", telefono: "", email: "",
  });

  const [tab, setTab] = useState("registro");
  const [guardado, setGuardado] = useState("");

  const handleGuardarCliente = (e) => {
    e.preventDefault();
    setGuardado("cliente");
    setTimeout(() => setGuardado(""), 3000);
    setClienteNuevo({ nombre: "", telefono: "", email: "" });
    setMedidas({ busto: "", cintura: "", cadera: "", largoBrazo: "", hombros: "", largoTotal: "" });
  };

  const handleGuardarPedido = (e) => {
    e.preventDefault();
    setGuardado("pedido");
    setTimeout(() => setGuardado(""), 3000);
    setPedido({ cliente: "", prenda: "", sastre: "", fecha: "" });
  };

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <section className={styles.header}>
        <div className={styles.headerPattern} />
        <div className={styles.headerContent}>
          <p className={styles.headerEy}>Panel de trabajo</p>
          <h1 className={styles.headerH}>Workspace de Recepción</h1>
          <p className={styles.headerSub}>{usuario?.nombre} — {new Date().toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>

      {/* TABS */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === "registro" ? styles.tabActive : ""}`}
          onClick={() => setTab("registro")}>
          Registro de Cliente
        </button>
        <button className={`${styles.tab} ${tab === "pedido" ? styles.tabActive : ""}`}
          onClick={() => setTab("pedido")}>
          Nuevo Pedido
        </button>
      </div>

      {/* CONFIRMACIONES */}
      {guardado === "cliente" && (
        <div className={styles.confirmacion}>✓ Cliente y medidas registrados correctamente</div>
      )}
      {guardado === "pedido" && (
        <div className={styles.confirmacion}>✓ Pedido creado y asignado al sastre</div>
      )}

      <div className={styles.workspace}>

        {/* TAB REGISTRO */}
        {tab === "registro" && (
          <form className={styles.panel} onSubmit={handleGuardarCliente}>
            <div className={styles.panelHeader}>
              <p className={styles.panelEy}>Datos personales</p>
              <h2 className={styles.panelH}>Registro de Cliente</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Nombre completo</label>
                <input className={styles.input} type="text" placeholder="Nombre apellido"
                  value={clienteNuevo.nombre}
                  onChange={(e) => setClienteNuevo({ ...clienteNuevo, nombre: e.target.value })}
                  required />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Teléfono</label>
                <input className={styles.input} type="tel" placeholder="300 000 0000"
                  value={clienteNuevo.telefono}
                  onChange={(e) => setClienteNuevo({ ...clienteNuevo, telefono: e.target.value })}
                  required />
              </div>
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Correo electrónico</label>
                <input className={styles.input} type="email" placeholder="correo@ejemplo.com"
                  value={clienteNuevo.email}
                  onChange={(e) => setClienteNuevo({ ...clienteNuevo, email: e.target.value })} />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.panelHeader}>
              <p className={styles.panelEy}>Toma de medidas</p>
              <h2 className={styles.panelH}>Medidas Corporales</h2>
            </div>

            <div className={styles.medidasGrid}>
              {[
                { key: "busto",      label: "Busto" },
                { key: "cintura",    label: "Cintura" },
                { key: "cadera",     label: "Cadera" },
                { key: "largoBrazo", label: "Largo Brazo" },
                { key: "hombros",    label: "Hombros" },
                { key: "largoTotal", label: "Largo Total" },
              ].map((m) => (
                <div key={m.key} className={styles.medidaItem}>
                  <label className={styles.label}>{m.label}</label>
                  <div className={styles.medidaInputWrap}>
                    <input className={styles.medidaInput} type="number" placeholder="0"
                      value={medidas[m.key]}
                      onChange={(e) => setMedidas({ ...medidas, [m.key]: e.target.value })} />
                    <span className={styles.medidaUnidad}>cm</span>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" className={styles.btnPrimary}>
              Guardar Cliente y Medidas
            </button>
          </form>
        )}

        {/* TAB PEDIDO */}
        {tab === "pedido" && (
          <form className={styles.panel} onSubmit={handleGuardarPedido}>
            <div className={styles.panelHeader}>
              <p className={styles.panelEy}>Crear orden</p>
              <h2 className={styles.panelH}>Nuevo Pedido</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Cliente</label>
                <select className={styles.select}
                  value={pedido.cliente}
                  onChange={(e) => setPedido({ ...pedido, cliente: e.target.value })}
                  required>
                  <option value="">Seleccionar cliente</option>
                  {CLIENTES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Tipo de prenda</label>
                <select className={styles.select}
                  value={pedido.prenda}
                  onChange={(e) => setPedido({ ...pedido, prenda: e.target.value })}
                  required>
                  <option value="">Seleccionar prenda</option>
                  {PRENDAS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Asignar sastre</label>
                <select className={styles.select}
                  value={pedido.sastre}
                  onChange={(e) => setPedido({ ...pedido, sastre: e.target.value })}
                  required>
                  <option value="">Seleccionar sastre</option>
                  {SASTRES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Fecha de entrega</label>
                <input className={styles.input} type="date"
                  value={pedido.fecha}
                  onChange={(e) => setPedido({ ...pedido, fecha: e.target.value })}
                  required />
              </div>
            </div>

            <button type="submit" className={styles.btnPrimary}>
              Crear Pedido
            </button>
          </form>
        )}

      </div>
    </div>
  );
};