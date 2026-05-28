import { useNavigate } from "react-router-dom";
import styles from "./PortalCliente.module.css";

export const PortalCliente = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>

      {/* NAVBAR */}
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("servicios"); }}>Coleccion</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("proceso"); }}>Servicios</a>
        </div>
        <div className={styles.navLogo}>E &amp; E</div>
        <div className={styles.navRight}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("catalogo"); }}>Catalogo</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("contacto"); }}>Contacto</a>
          <button className={styles.btnNav} onClick={() => navigate("/login")}>
            Iniciar Sesion
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} />
        <div className={styles.heroFigures}>
          <div className={`${styles.fig} ${styles.figLeft}`} />
          <div className={`${styles.fig} ${styles.figCenter}`} />
          <div className={`${styles.fig} ${styles.figRight}`} />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Coleccion 2026</p>
          <h1 className={styles.heroH}>
            Elegancia<br />Minimalista
          </h1>
          <p className={styles.heroSub}>Descubre nuestra nueva coleccion a medida</p>
          <button className={styles.btnHero} onClick={() => scrollTo("catalogo")}>
            Ver Coleccion
          </button>
        </div>
      </section>

      {/* BANNER AGENDAR */}
      <section className={styles.banner}>
        <p className={styles.bannerEy}>Temporada actual</p>
        <h2 className={styles.bannerH}>Prendas a Medida</h2>
        <span className={styles.bannerSub}>disenadas exclusivamente para ti</span>
        <button className={styles.btnBanner} onClick={() => navigate("/login")}>
          Agendar Cita
        </button>
      </section>

      {/* STRIP */}
      <div className={styles.strip}>
        <div className={styles.stripItem}>
          <span className={styles.stripIcon}>&#9986;</span>
          <div>
            <strong>Medidas exactas</strong>
            <span>Ajuste personalizado</span>
          </div>
        </div>
        <div className={styles.stripItem}>
          <span className={styles.stripIcon}>&#128392;</span>
          <div>
            <strong>Alta costura</strong>
            <span>Acabados de lujo</span>
          </div>
        </div>
        <div className={styles.stripItem}>
          <span className={styles.stripIcon}>&#128230;</span>
          <div>
            <strong>Entrega rapida</strong>
            <span>48h promedio</span>
          </div>
        </div>
      </div>

      {/* CATALOGO */}
      <div id="catalogo" className={styles.cats}>
        {[
          { emoji: "&#128247;", name: "Vestidos",     desc: "Confeccion exclusiva",  label: "Ver Mas" },
          { emoji: "&#129333;", name: "Trajes",        desc: "Bespoke tailoring",    label: "Ver Mas" },
          { emoji: "&#9986;",   name: "Alteraciones",  desc: "Ajustes precisos",     label: "Ver Mas" },
          { emoji: "&#127912;", name: "Diseno Propio", desc: "Tu idea, nuestra obra",label: "Descubrir" },
        ].map((cat) => (
          <div className={styles.cat} key={cat.name} onClick={() => navigate("/login")}>
            <div className={styles.catImg}>
              <span className={styles.catEmoji} dangerouslySetInnerHTML={{ __html: cat.emoji }} />
            </div>
            <div className={styles.catBody}>
              <p className={styles.catName}>{cat.name}</p>
              <p className={styles.catDesc}>{cat.desc}</p>
              <button className={styles.btnCat} onClick={() => navigate("/login")}>
                {cat.label}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SERVICIOS */}
      <section id="servicios" className={styles.servicios}>
        <p className={styles.serviciosEy}>Lo que hacemos</p>
        <h2 className={styles.serviciosH}>Nuestros Servicios</h2>
        <div className={styles.serviciosGrid}>
          {[
            { num: "01", titulo: "Confeccion a Medida", desc: "Cada prenda comienza con la toma de tus medidas exactas. Nada generico, todo hecho para tu cuerpo." },
            { num: "02", titulo: "Diseno Personalizado", desc: "Trae tu idea, nosotros la hacemos realidad. Trabajamos con bocetos, referencias e inspiraciones." },
            { num: "03", titulo: "Alteraciones", desc: "Transformamos prendas existentes para que te sienten perfectas. Acabado de alta costura." },
          ].map((s) => (
            <div className={styles.servicioCard} key={s.num}>
              <span className={styles.servicioNum}>{s.num}</span>
              <h3 className={styles.servicioTitulo}>{s.titulo}</h3>
              <p className={styles.servicioDesc}>{s.desc}</p>
              <button className={styles.servicioBtn} onClick={() => navigate("/login")}>
                Solicitar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className={styles.proceso}>
        <p className={styles.procesoEy}>Como funciona</p>
        <div className={styles.procesoSteps}>
          {["Consulta", "Medidas", "Confeccion", "Entrega"].map((step, i) => (
            <div className={styles.procesoStep} key={step}>
              <div className={styles.procesoCircle}>0{i + 1}</div>
              <p className={styles.procesoNombre}>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className={styles.sobre}>
        <div className={styles.sobreImg}>
          <span className={styles.sobreScissors}>&#9986;</span>
        </div>
        <div className={styles.sobreBody}>
          <p className={styles.sobreEy}>Quienes somos</p>
          <h2 className={styles.sobreH}>
            Artesanos del hilo desde hace mas de una decada
          </h2>
          <p className={styles.sobreP}>
            En Elegancia y Estilo cada prenda es una obra unica. Trabajamos
            con telas premium, patrones propios y la precision de quienes
            aman su oficio.
          </p>
          <button className={styles.btnSobre} onClick={() => navigate("/login")}>
            Conocer mas
          </button>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className={styles.contacto}>
        <div className={styles.contactoLeft}>
          <p className={styles.contactoEy}>Hablemos</p>
          <h2 className={styles.contactoH}>Agenda tu consulta</h2>
          <p className={styles.contactoP}>
            Valledupar, Colombia<br />
            Lunes a Sabado — 8am a 6pm
          </p>
          <div className={styles.contactoLinks}>
            <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" className={styles.contactoBtn}>
              WhatsApp
            </a>
            <a href="mailto:eleganciaestilo@gmail.com" className={styles.contactoBtn}>
              Email
            </a>
          </div>
        </div>
        <div className={styles.contactoRight}>
          <button className={styles.btnContactoCTA} onClick={() => navigate("/login")}>
            Iniciar Sesion y Agendar
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>E &amp; E</div>
        <div className={styles.footerLinks}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("contacto"); }}>Contacto</a>
        </div>
        <p className={styles.footerCopy}>2026 - Valledupar, Colombia</p>
      </footer>

    </div>
  );
};
