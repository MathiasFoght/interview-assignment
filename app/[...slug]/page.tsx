import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Image
        src="/images/logo.png"
        alt="Better Developers"
        width={64}
        height={64}
        className={styles.logo}
      />
      <p className={styles.code}>404</p>
      <p className={styles.description}>
        Page does not exist.
      </p>
      <Link href="/" className={styles.link}>
        Back to the dashboard
      </Link>
    </main>
  );
}
