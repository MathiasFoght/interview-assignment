import { Droplets, Wind, Cloud } from "lucide-react";
import type { CurrentWeather } from "@/contracts/domain/types";
import { IconMapper } from "@/components/icon-mapper/icon-mapper";
import styles from "./current-weather-card.module.css";

type Props = {
  current: CurrentWeather;
  updatedAt: string;
};

function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function CurrentWeatherCard({ current, updatedAt }: Props) {
  return (
    <section className={styles.card}>
      <div className={styles.layout}>
        <div className={styles.tempSection}>
          <span className={styles.temperature}>{current.temperature}°C</span>
          <span className={styles.todayRange}>
            {current.todayMin}° / {current.todayMax}°
          </span>
          <span className={styles.feelsLike}>Feels like {current.feelsLike}°C</span>
        </div>

        <div className={styles.iconSection}>
          <IconMapper
            code={current.condition.code}
            label={current.condition.label}
            className={styles.icon}
          />
          <span className={styles.conditionLabel}>{current.condition.label}</span>
        </div>

        <div className={styles.statsSection}>
          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>
                <Droplets size={14} aria-hidden />
                Humidity
              </dt>
              <dd className={styles.statValue}>{current.humidity}%</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>
                <Wind size={14} aria-hidden />
                Wind
              </dt>
              <dd className={styles.statValue}>{current.windSpeed} km/h</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>
                <Cloud size={14} aria-hidden />
                Cloud cover
              </dt>
              <dd className={styles.statValue}>{current.cloudiness}%</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.updatedAt}>Updated {formatTime(updatedAt)}</span>
      </div>
    </section>
  );
}
