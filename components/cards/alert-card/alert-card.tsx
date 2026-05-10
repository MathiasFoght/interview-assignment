import { Smile, TriangleAlert } from "lucide-react";
import type { WeatherAlert } from "@/contracts/domain/types";
import styles from "./alert-card.module.css";

type Props = {
  alerts: WeatherAlert[];
};

function formatAlertTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function AlertCard({ alerts }: Props) {
  if (alerts.length === 0) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.emptyTitle}>All Good</h2>
        <div className={styles.emptySubtitle}>
          <span>No active warnings</span>
        </div>
        <Smile size={48} className={styles.emptyIcon} aria-hidden />
      </div>
    );
  }

  return (
    <ul className={styles.list} role="list" aria-label="Weather alerts">
      {alerts.map((alert, i) => (
        <li key={i} className={styles.alert}>
          <div className={styles.header}>
            <TriangleAlert size={14} className={styles.icon} aria-hidden />
            <span className={styles.event}>{alert.event}</span>
          </div>
          <p className={styles.timeRange}>
            {formatAlertTime(alert.start)} – {formatAlertTime(alert.end)}
          </p>
          <p className={styles.description}>{alert.description}</p>
          <p className={styles.sender}>{alert.senderName}</p>
        </li>
      ))}
    </ul>
  );
}
