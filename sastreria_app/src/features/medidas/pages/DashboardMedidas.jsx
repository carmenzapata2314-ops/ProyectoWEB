import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import styles from "./DashboardMedidas.module.css";

const MEDIDAS_INICIALES = [
  { id: 1, icon: "📏", nombre: "Busto",       valor: 92,  unidad: "cm" },
  { id: 2, icon: "📏", nombre: "Cintura",      valor: 68,  unidad: "cm" },
  { id: 3, icon: "📏", nombre: "Cadera",       valor: 96,  unidad: "cm" },
  { id: 4, icon: "📏", nombre: "Largo Brazo",  valor: 58,  unidad: "cm" },
  { id: 5, icon: "📏", nombre: "Hombros",      valor: 38,  unidad: "cm" },
  { id: 6, icon: "📏", nombre: "Largo Total",  valor: 165, unidad: "cm" },
];

export const DashboardMedidas = () => {
  const { usuario } = useAuth();
  const [medidas, setMedidas] = useState(MEDIDAS_INICIALES);
  const [editando, setEditando] = useState(null);
  const [valorTemp, setValorTemp] = useState("");
  const [guardado, setGuardado] = useState(false);

  const iniciarEdicion = (medida) => {
    setEditando(medida.id);
    setValorTemp(medida.valor);
  };

  const guardarEdicion = (id) => {
    setMedidas(medidas.map((m) =>
      m.id === id ? { ...m, valor: Number(valorTemp) } : m
    ));
    setEditando(null);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  };

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <section className={styles.header}>
        <div className={styles.headerPattern} />
        <div className={styles.headerContent}>
          <p className={styles.headerEy}>Perfil de medidas</p>
          <h1 className={styles.headerH}>Mi Perfil de Medidas</h1>
          <p className={styles.headerSub}>{usuario?.nombre} — actualizado hoy</p>
        </div>
      </section>

      {/* CONFIRMACIÓN */}
      {guardado && (
        <div className={styles.confirmacion}>
          ✓ Medidas actualizadas correctamente
        </div>
      )}

      {/* GRID DE MEDIDAS */}
      <section className={styles.content}>
        <div className={styles.grid}>
          {medidas.map((medida) => (
            <div key={medida.id} className={styles.card}>
              <p className={styles.cardNombre}>{medida.nombre}</p>

              {editando === medida.id ? (
                <div className={styles.editWrap}>
                  <input
                    type="number"
                    className={styles.editInput}
                    value={valorTemp}
                    onChange={(e) => setValorTemp(e.target.value)}
                    autoFocus
                  />
                  <span className={styles.cardUnidad}>{medida.unidad}</span>
                  <button className={styles.btnGuardar} onClick={() => guardarEdicion(medida.id)}>
                    ✓
                  </button>
                </div>
              ) : (
                <div className={styles.valorWrap}>
                  <span className={styles.cardValor}>{medida.valor}</span>
                  <span className={styles.cardUnidad}>{medida.unidad}</span>
                </div>
              )}

              {editando !== medida.id && (
                <button className={styles.btnEditar} onClick={() => iniciarEdicion(medida)}>
                  Editar
                </button>
              )}
            </div>
          ))}
        </div>

        {/* NOTA */}
        <div className={styles.nota}>
          <p className={styles.notaTexto}>
            ✂ Las medidas son tomadas por nuestro equipo de recepción en tu primera cita.
            Puedes actualizarlas si hubo cambios recientes.
          </p>
        </div>
      </section>

    </div>
  );
};