import { useNavigate } from "react-router-dom";
import styles from "./PortalCliente.module.css";

export const PortalCliente = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>

      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <a href="#">Colección</a>
          <a href="#">Servicios</a>
        </div>
        <div className={styles.navLogo}>E &amp; E</div>
       <div className={styles.navRight}>
       <a href="#">Catálogo</a>
       <a href="#">Contacto</a>
       <button
       className={styles.btnNav}
        onClick={() => navigate("/login")}
       >
       Iniciar Sesión
      </button>
     </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroPattern} />
        <div className={styles.heroFigures}>
          <div className={`${styles.fig} ${styles.figLeft}`} />
          <div className={`${styles.fig} ${styles.figCenter}`} />
          <div className={`${styles.fig} ${styles.figRight}`} />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Colección 2026</p>
          <h1 className={styles.heroH}>
            Elegancia<br />Minimalista
          </h1>
          <p className={styles.heroSub}>Descubre nuestra nueva colección a medida</p>
          <button className={styles.btnHero} onClick={() => navigate("/cliente")}>
            Ver Colección
          </button>
        </div>
      </section>

      <section className={styles.banner}>
        <p className={styles.bannerEy}>Temporada actual</p>
        <h2 className={styles.bannerH}>Prendas a Medida</h2>
        <span className={styles.bannerSub}>— diseñadas exclusivamente para ti —</span>
        <button className={styles.btnBanner} onClick={() => navigate("/recepcion")}>
          Agendar Cita
        </button>
      </section>

      <div className={styles.strip}>
        <div className={styles.stripItem}>
          <span className={styles.stripIcon}>✂</span>
          <div>
            <strong>Medidas exactas</strong>
            <span>Ajuste personalizado</span>
          </div>
        </div>
        <div className={styles.stripItem}>
          <span className={styles.stripIcon}>🧵</span>
          <div>
            <strong>Alta costura</strong>
            <span>Acabados de lujo</span>
          </div>
        </div>
        <div className={styles.stripItem}>
          <span className={styles.stripIcon}>📦</span>
          <div>
            <strong>Entrega rápida</strong>
            <span>48h promedio</span>
          </div>
        </div>
      </div>

      <div className={styles.cats}>
        {[
          { icon: "👗", name: "Vestidos",      desc: "Confección exclusiva",  label: "Ver Más",   path: "/cliente"   },
          { icon: "🤵", name: "Trajes",        desc: "Bespoke tailoring",     label: "Ver Más",   path: "/cliente"   },
          { icon: "✂",  name: "Alteraciones",  desc: "Ajustes precisos",      label: "Ver Más",   path: "/recepcion" },
          { icon: "🎨", name: "Diseño Propio", desc: "Tu idea, nuestra obra", label: "Descubrir", path: "/recepcion" },
        ].map((cat) => (
          <div className={styles.cat} key={cat.name}>
            <div className={styles.catImg}>
              <span className={styles.catEmoji}>{cat.icon}</span>
            </div>
            <div className={styles.catBody}>
              <p className={styles.catName}>{cat.name}</p>
              <p className={styles.catDesc}>{cat.desc}</p>
              <button className={styles.btnCat} onClick={() => navigate(cat.path)}>
                {cat.label}
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.sobre}>
        <div className={styles.sobreImg}>
          <span className={styles.sobreScissors}>✂</span>
        </div>
        <div className={styles.sobreBody}>
          <p className={styles.sobreEy}>Quiénes somos</p>
          <h2 className={styles.sobreH}>
            Artesanos del hilo desde hace más de una década
          </h2>
          <p className={styles.sobreP}>
            En Elegancia &amp; Estilo cada prenda es una obra única. Trabajamos
            con telas premium, patrones propios y la precisión de quienes aman
            su oficio.
          </p>
          <button className={styles.btnSobre} onClick={() => navigate("/cliente")}>
            Conocer más
          </button>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>E &amp; E</div>
        <div className={styles.footerLinks}>
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
          <a href="#">Contacto</a>
        </div>
        <p className={styles.footerCopy}>© 2026 · Valledupar</p>
      </footer>

    </div>
  );
};