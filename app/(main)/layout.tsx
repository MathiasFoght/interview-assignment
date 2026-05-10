import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import styles from "./layout.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
