import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import styles from "./PrivateLayout.module.css";

export const PrivateLayout = () => (
  <div className={styles.shell}>
    <Navbar />
    <main className={styles.content}>
      <Outlet />
    </main>
  </div>
);