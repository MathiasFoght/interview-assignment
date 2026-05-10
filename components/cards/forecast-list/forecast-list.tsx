import type { DailyForecast } from "@/contracts/domain/types";
import { ForecastCard } from "@/components/cards/forecast-card/forecast-card";
import styles from "./forecast-list.module.css";

type Props = {
  forecast: DailyForecast[];
};

export function ForecastList({ forecast }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>7-Day Forecast</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.scrollWrapper}>
          <div className={styles.grid}>
            {forecast.map((day) => (
              <ForecastCard key={day.date} forecast={day} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
