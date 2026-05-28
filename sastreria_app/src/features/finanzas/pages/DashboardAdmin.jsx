import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./DashboardAdmin.module.css";

export const DashboardAdmin = () => {
  const [pagos, setPagos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const API = "http://localhost:5018/api";

  const cargarDatos = async () => {
    try {
      const [respPagos, respEgresos] = await Promise.all([
        fetch(`${API}/Pagos`),
        fetch(`${API}/Egresos`),
      ]);
      const pagosData = await respPagos.json();
      const egresosData = await respEgresos.json();
      setPagos(pagosData);
      setEgresos(egresosData);
    } catch (error) {
      console.error("Error cargando datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los datos financieros.",
        confirmButtonColor: "#1a1a1a",
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const totalIngresos = pagos.reduce((acc, curr) => acc + Number(curr.monto), 0);
  const totalEgresos = egresos.reduce((acc, curr) => acc + Number(curr.costo), 0);
  const saldoFinal = totalIngresos - totalEgresos;

  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(valor);

  const registrarPago = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar Pago",
      html: `
        <input id="pedido" class="swal2-input" placeholder="ID Pedido">
        <select id="metodo" class="swal2-select" style="display:flex;margin:1em auto;width:73%;color:#545454;">
          <option value="" disabled selected>Metodo de pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
        <input id="monto" type="number" class="swal2-input" placeholder="Monto">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#1a1a1a",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#b89b72",
      preConfirm: () => {
        const pedidoId = document.getElementById("pedido").value;
        const metodoPago = document.getElementById("metodo").value;
        const monto = document.getElementById("monto").value;
        if (!pedidoId || !metodoPago || !monto) {
          Swal.showValidationMessage("Por favor complete todos los campos");
          return false;
        }
        return { pedidoId, metodoPago, monto };
      },
    });
    if (!formValues) return;
    try {
      const nuevoPago = {
        pedidoId: Number(formValues.pedidoId),
        metodoPago: formValues.metodoPago,
        monto: Number(formValues.monto),
        fechaPago: new Date().toISOString(),
      };
      const respuesta = await fetch(`${API}/Pagos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPago),
      });
      if (!respuesta.ok) throw new Error();
      await cargarDatos();
      Swal.fire({ icon: "success", title: "Pago registrado", toast: true, position: "top-end", timer: 2500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo registrar el pago." });
    }
  };

  const registrarEgreso = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar Egreso",
      html: `
        <input id="concepto" class="swal2-input" placeholder="Concepto">
        <input id="proveedor" class="swal2-input" placeholder="Proveedor">
        <input id="costo" type="number" class="swal2-input" placeholder="Costo">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#1a1a1a",
      cancelButtonColor: "#b89b72",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const concepto = document.getElementById("concepto").value;
        const proveedor = document.getElementById("proveedor").value;
        const costo = document.getElementById("costo").value;
        if (!concepto || !proveedor || !costo) {
          Swal.showValidationMessage("Por favor complete todos los campos");
          return false;
        }
        return { concepto, proveedor, costo };
      },
    });
    if (!formValues) return;
    try {
      const nuevoEgreso = {
        concepto: formValues.concepto,
        proveedor: formValues.proveedor,
        costo: Number(formValues.costo),
        fecha: new Date().toISOString(),
      };
      const respuesta = await fetch(`${API}/Egresos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEgreso),
      });
      if (!respuesta.ok) throw new Error();
      await cargarDatos();
      Swal.fire({ icon: "success", title: "Egreso registrado", toast: true, position: "top-end", timer: 2500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo registrar el egreso." });
    }
  };

  const inventarioTelas = [
    { nombre: "Lino Italiano", color: "Crema", stock: 3, unidad: "metros", bajo: true },
    { nombre: "Seda Natural", color: "Negro", stock: 12, unidad: "metros", bajo: false },
    { nombre: "Casimir Ingles", color: "Gris", stock: 2, unidad: "metros", bajo: true },
    { nombre: "Algodon Pima", color: "Blanco", stock: 20, unidad: "metros", bajo: false },
    { nombre: "Terciopelo", color: "Bordo", stock: 1, unidad: "metros", bajo: true },
    { nombre: "Organza", color: "Nude", stock: 8, unidad: "metros", bajo: false },
  ];

  if (cargando) return (
    <div className={styles.cargando}>
      <p className={styles.cargandoText}>Cargando dashboard...</p>
    </div>
  );

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <header className={styles.header}>
        <div>
          <p className={styles.headerEy}>Panel de Control</p>
          <h1 className={styles.headerTitle}>Dashboard Financiero</h1>
        </div>
        <div className={styles.headerDate}>
          {new Date().toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </header>

      {/* METRICAS */}
      <section className={styles.metricas}>
        <div className={`${styles.metCard} ${styles.metIngreso}`}>
          <div className={styles.metTop}>
            <span className={styles.metLabel}>Ingresos Brutos</span>
            <span className={styles.metIcon}>&#8593;</span>
          </div>
          <p className={styles.metValor}>{formatoMoneda(totalIngresos)}</p>
          <p className={styles.metSub}>{pagos.length} pagos registrados</p>
        </div>

        <div className={`${styles.metCard} ${styles.metEgreso}`}>
          <div className={styles.metTop}>
            <span className={styles.metLabel}>Egresos / Gastos</span>
            <span className={styles.metIcon}>&#8595;</span>
          </div>
          <p className={styles.metValor}>{formatoMoneda(totalEgresos)}</p>
          <p className={styles.metSub}>{egresos.length} egresos registrados</p>
        </div>

        <div className={`${styles.metCard} ${styles.metSaldo}`}>
          <div className={styles.metTop}>
            <span className={styles.metLabel}>Saldo Neto en Caja</span>
            <span className={styles.metIcon}>&#9670;</span>
          </div>
          <p className={`${styles.metValor} ${styles.metValorSaldo}`}>{formatoMoneda(saldoFinal)}</p>
          <p className={styles.metSub}>{saldoFinal >= 0 ? "Balance positivo" : "Balance negativo"}</p>
        </div>
      </section>

      {/* TABLAS */}
      <section className={styles.tablas}>

        {/* PAGOS */}
        <div className={styles.tablaBox}>
          <div className={styles.tablaHead}>
            <div>
              <p className={styles.tablaEy}>Registro</p>
              <h3 className={styles.tablaTitle}>Pagos Recibidos</h3>
            </div>
            <button className={`${styles.btn} ${styles.btnVerde}`} onClick={registrarPago}>
              + Registrar Pago
            </button>
          </div>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Metodo</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {pagos.length > 0 ? (
                pagos.map((pago) => (
                  <tr key={pago.id}>
                    <td className={styles.tdPedido}>ORD-{pago.pedidoId}</td>
                    <td>{pago.metodoPago}</td>
                    <td className={styles.tdIngreso}>{formatoMoneda(pago.monto)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className={styles.tdVacio}>No hay pagos registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* EGRESOS */}
        <div className={styles.tablaBox}>
          <div className={styles.tablaHead}>
            <div>
              <p className={styles.tablaEy}>Registro</p>
              <h3 className={styles.tablaTitle}>Egresos de Inventario</h3>
            </div>
            <button className={`${styles.btn} ${styles.btnRojo}`} onClick={registrarEgreso}>
              + Registrar Egreso
            </button>
          </div>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Proveedor</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {egresos.length > 0 ? (
                egresos.map((egreso) => (
                  <tr key={egreso.id}>
                    <td>{egreso.concepto}</td>
                    <td className={styles.tdGris}>{egreso.proveedor}</td>
                    <td className={styles.tdEgreso}>- {formatoMoneda(egreso.costo)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className={styles.tdVacio}>No hay egresos registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </section>

      {/* INVENTARIO TELAS */}
      <section className={styles.inventarioBox}>
        <div className={styles.tablaHead}>
          <div>
            <p className={styles.tablaEy}>Control de stock</p>
            <h3 className={styles.tablaTitle}>Inventario de Telas</h3>
          </div>
          <span className={styles.stockAlert}>
            {inventarioTelas.filter(t => t.bajo).length} con stock bajo
          </span>
        </div>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Tela</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Unidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {inventarioTelas.map((tela, i) => (
              <tr key={i}>
                <td className={styles.tdNombre}>{tela.nombre}</td>
                <td className={styles.tdGris}>{tela.color}</td>
                <td>
                  <div className={styles.stockControl}>
                    <button className={styles.stockBtn}>-</button>
                    <span className={styles.stockNum}>{tela.stock}</span>
                    <button className={styles.stockBtn}>+</button>
                  </div>
                </td>
                <td className={styles.tdGris}>{tela.unidad}</td>
                <td>
                  {tela.bajo
                    ? <span className={styles.badgeBajo}>Stock Bajo</span>
                    : <span className={styles.badgeOk}>Disponible</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* EXPORTAR */}
      <section className={styles.exportBox}>
        <h3 className={styles.exportTitle}>Exportar Reportes</h3>
        <div className={styles.exportControls}>
          <input type="date" className={styles.dateInput} />
          <span className={styles.exportHasta}>hasta</span>
          <input type="date" className={styles.dateInput} />
          <button className={`${styles.btn} ${styles.btnDark}`}
            onClick={() => Swal.fire("Proximamente", "Exportacion a Excel en desarrollo", "info")}>
            Exportar Excel
          </button>
          <button className={`${styles.btn} ${styles.btnOutline}`}
            onClick={() => Swal.fire("Proximamente", "Exportacion a PDF en desarrollo", "info")}>
            Exportar PDF
          </button>
        </div>
      </section>

    </div>
  );
};
