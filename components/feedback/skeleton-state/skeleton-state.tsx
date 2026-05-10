import { Skeleton } from "@/components/ui/skeleton";
import styles from "./skeleton-state.module.css";

export function SkeletonState() {
  return (
    <div className={styles.container} aria-label="Loading weather data">
      <div className={styles.contentGrid}>
        <aside className={styles.summaryAside}>
          {/* Summary card */}
          <div className={styles.summaryCard}>
            <Skeleton className={styles.skeletonSummaryTitle} />
            <Skeleton className={styles.skeletonSummaryLocation} />
            <Skeleton className={styles.skeletonSummaryLine} />
            <Skeleton className={styles.skeletonSummaryLine} />
            <Skeleton className={styles.skeletonSummaryLine} />
          </div>
        </aside>
        <div className={styles.weatherSection}>
          <div className={styles.currentCard}>
            {/* Current weather */}
            <div className={styles.currentTop}>
              <Skeleton className={styles.skeletonCondition} />
              <Skeleton className={styles.skeletonTemp} />
            </div>
            {/* Current stats for the day */}
            <div className={styles.currentStats}>
              <Skeleton className={styles.skeletonStat} />
              <Skeleton className={styles.skeletonStat} />
              <Skeleton className={styles.skeletonStat} />
            </div>
          </div>
        </div>
        <div className={styles.forecastSection}>
          {/* Forecast section title */}
          <Skeleton className={styles.skeletonSectionTitle} />
          <div className={styles.forecastScrollWrapper}>
            {/* Forecast cards */}
            <div className={styles.forecastGrid}>
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className={styles.skeletonForecastCard} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Precipitation chart */}
      <div className={styles.precipitationSection}>
        <Skeleton className={styles.skeletonSectionTitle} />
        <Skeleton className={styles.skeletonChart} />
      </div>
    </div>
  );
}
