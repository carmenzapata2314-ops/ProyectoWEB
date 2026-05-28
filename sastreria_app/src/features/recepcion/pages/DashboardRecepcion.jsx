import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import styles from "./DashboardRecepcion.module.css";

const API = "http://localhost:5018/api";

export const DashboardRecepcion = () => {
  const { usuario } = useAuth();

  const [clientes, setClientes] = useState([]);
  const [prendas, setPrendas] = useState([]);
  const [sastres, setSastres] = useState([]);

  const [medidas, setMedidas] = useState({
    busto: "", cintura: "", cadera: "",
    largoBrazo: "", hombros: "", largoTotal: "",
  });

  const [pedido, setPedido] = useState({
    clienteId: "", prendaId: "", sastreId: "", fecha: "",
  });

  const [clienteNuevo, setClienteNuevo] = useState({
    nombre: "", telefono: "", email: "",
  });

  const [tab, setTab] = useState("registro");
  const [guardado, setGuardado] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resClientes, resPrendas, resUsuarios] = await Promise.all([
        fetch(`${API}/Clientes`),
        fetch(`${API}/PrendasCatalogo`),
        fetch(`${API}/Usuarios`),
      ]);
      const clientesData = await resClientes.json();
      const prendasData = await resPrendas.json();
      const usuariosData = await resUsuarios.json();
      setClientes(clientesData);
      setPrendas(prendasData);
      setSastres(usuariosData.filter(u => u.rol === 2 || u.rol === "Sastre"));
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const handleGuardarCliente = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const resCliente = await fetch(`${API}/Clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: clienteNuevo.nombre,
          telefono: clienteNuevo.telefono,
          correo: clienteNuevo.email,
          direccion: "",
        }),
      });

      if (!resCliente.ok) throw new Error("Error al guardar cliente");
      const clienteCreado = await resCliente.json();

      const resMedidas = await fetch(`${API}/Medidas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteId: clienteCreado.id,
          pecho: Number(medidas.busto) || null,
          cintura: Number(medidas.cintura) || null,
          cadera: Number(medidas.cadera) || null,
          largoBrazo: Number(medidas.largoBrazo) || null,
          hombros: Number(medidas.hombros) || null,
          largoTotal: Number(medidas.largoTotal) || null,
          fechaRegistro: new Date().toISOString(),
        }),
      });

      if (!resMedidas.ok) throw new Error("Error al guardar medidas");

      setGuardado("cliente");
      setTimeout(() => setGuardado(""), 3000);
      setClienteNuevo({ nombre: "", telefono: "", email: "" });
      setMedidas({ busto: "", cintura: "", cadera: "", largoBrazo: "", hombros: "", largoTotal: "" });
      await cargarDatos();
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleGuardarPedido = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const res = await fetch(`${API}/Pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteId: Number(pedido.clienteId),
          prendaCatalogoId: Number(pedido.prendaId),
          precioUnitario: 0,
          costoTotal: 0,
          saldoPendiente: 0,
          estado: "Pendiente",
          fechaPedido: new Date().toISOString(),
          fechaEntrega: pedido.fecha ? new Date(pedido.fecha).toISOString() : null,
        }),
      });

      if (!res.ok) throw new Error("Error al crear pedido");

      setGuardado("pedido");
      setTimeout(() => setGuardado(""), 3000);
      setPedido({ clienteId: "", prendaId: "", sastreId: "", fecha: "" });
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.page}>

      <section className={styles.header}>
        <div className={styles.headerPattern} />
        <div className={styles.headerContent}>
          <p className={styles.headerEy}>Panel de trabajo</p>
          <h1 className={styles.headerH}>Workspace de Recepcion</h1>
          <p className={styles.headerSub}>
            {usuario?.nombre} — {new Date().toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

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

      {guardado === "cliente" && (
        <div className={styles.confirmacion}>Cliente y medidas registrados correctamente</div>
      )}
      {guardado === "pedido" && (
        <div className={styles.confirmacion}>Pedido creado correctamente</div>
      )}

      <div className={styles.workspace}>

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
                <label className={styles.label}>Telefono</label>
                <input className={styles.input} type="tel" placeholder="300 000 0000"
                  value={clienteNuevo.telefono}
                  onChange={(e) => setClienteNuevo({ ...clienteNuevo, telefono: e.target.value })}
                  required />
              </div>
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Correo electronico</label>
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

            <button type="submit" className={styles.btnPrimary} disabled={cargando}>
              {cargando ? "Guardando..." : "Guardar Cliente y Medidas"}
            </button>
          </form>
        )}

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
                  value={pedido.clienteId}
                  onChange={(e) => setPedido({ ...pedido, clienteId: e.target.value })}
                  required>
                  <option value="">Seleccionar cliente</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>

              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Tipo de prenda</label>
                <select className={styles.select}
                  value={pedido.prendaId}
                  onChange={(e) => setPedido({ ...pedido, prendaId: e.target.value })}
                  required>
                  <option value="">Seleccionar prenda</option>
                  {prendas.length > 0 ? (
                    prendas.map((p) => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))
                  ) : (
                    <>
                      <option value="1">Vestido de Noche</option>
                      <option value="2">Traje Clasico</option>
                      <option value="3">Vestido Coctel</option>
                      <option value="4">Abrigo a Medida</option>
                    </>
                  )}
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

            <button type="submit" className={styles.btnPrimary} disabled={cargando}>
              {cargando ? "Creando..." : "Crear Pedido"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
