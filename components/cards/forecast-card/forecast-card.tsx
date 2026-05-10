import { Droplets } from "lucide-react";
import type { DailyForecast } from "@/contracts/domain/types";
import { IconMapper } from "@/components/icon-mapper/icon-mapper";
import styles from "./forecast-card.module.css";

type Props = {
  forecast: DailyForecast;
};

function formatDay(isoDate: string): { weekday: string; date: string } {
  const d = new Date(`${isoDate}T12:00:00`);
  return {
    weekday: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(d),
    date: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(d),
  };
}

export function ForecastCard({ forecast }: Props) {
  const { weekday, date } = formatDay(forecast.date);

  return (
    <article className={styles.card}>
      <span className={styles.weekday}>{weekday}</span>
      <span className={styles.date}>{date}</span>
      <IconMapper
        code={forecast.condition.code}
        label={forecast.condition.label}
        className={styles.icon}
      />
      <span className={styles.condition}>{forecast.condition.label}</span>
      <div className={styles.temps}>
        <span className={styles.tempMax}>{forecast.tempMax}°</span>
        <span className={styles.tempMin}>{forecast.tempMin}°</span>
      </div>
      {forecast.precipitationProbability > 0 && (
        <span className={styles.pop}>
          <Droplets size={11} aria-hidden />
          {forecast.precipitationProbability}%
        </span>
      )}
    </article>
  );
}
