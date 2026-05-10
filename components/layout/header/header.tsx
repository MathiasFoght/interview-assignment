import Link from "next/link";
import Image from "next/image";
import { Search } from "@/components/search/search";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>Better Weather</h1>
        <p className={styles.subtitle}>Always be prepared</p>
      </div>
      <Link href="/" aria-label="Go to home" className={styles.logoLink}>
        <Image
          src="/images/logo.png"
          alt="Better Developers"
          width={72}
          height={72}
          className={styles.logoImg}
        />
      </Link>
      <Search />
    </header>
  );
}
