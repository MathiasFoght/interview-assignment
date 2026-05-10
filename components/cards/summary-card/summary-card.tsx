import { MapPin } from "lucide-react";
import styles from "./summary-card.module.css";

type Props = {
  summary: string;
  location: string;
};

export function SummaryCard({ summary, location }: Props) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>What to expect</h2>
      <div className={styles.locationRow}>
        <MapPin size={13} aria-hidden />
        <span>{location}</span>
      </div>
      <p className={styles.summary}>{summary}</p>
    </section>
  );
}
