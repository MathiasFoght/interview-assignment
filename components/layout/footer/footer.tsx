import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.tagline}>No more wet stand-ups...</p>
        <p className={styles.footerSub}>Have a great day</p>
      </div>
    </footer>
  );
}
