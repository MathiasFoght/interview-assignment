"use client";

import { useEffect } from "react";
import type { WeatherDashboardData } from "@/contracts/domain/types";
import { CurrentWeatherCard } from "@/components/cards/current-weather-card/current-weather-card";
import { SummaryCard } from "@/components/cards/summary-card/summary-card";
import { ForecastList } from "@/components/cards/forecast-list/forecast-list";
import dynamic from "next/dynamic";
import { AlertCard } from "@/components/cards/alert-card/alert-card";
import { OfflineBanner } from "@/components/feedback/offline-banner/offline-banner";
import { useRouter } from "next/navigation";
import styles from "./dashboard-entry-point.module.css";

const PrecipitationChart = dynamic(() =>
    import("@/components/cards/precipitation-chart/precipitation-chart").then((mod) => mod.PrecipitationChart)
);

type Props = {
  data: WeatherDashboardData;
  error?: string;
  retryable?: boolean;
};

export function DashboardEntryPoint({ data, error, retryable }: Props) {
  const router = useRouter();
  const hasLeftColumn = true;

  useEffect(() => {
    document.documentElement.setAttribute("data-time-of-day", data.timeOfDay);
  }, [data.timeOfDay]);

  return (
    <div className={styles.container}>
      {error && (
        <OfflineBanner message={error} retryable={retryable} onRetry={() => router.refresh()} />
      )}
      <div className={`${styles.contentGrid}${hasLeftColumn ? ` ${styles.withLeftColumn}` : ""}`}>
        <div className={styles.weatherSection}>
          <CurrentWeatherCard current={data.current} updatedAt={data.updatedAt} />
        </div>
        {data.summary && (
          <aside className={styles.summaryAside}>
            <SummaryCard summary={data.summary} location={data.location} />
          </aside>
        )}
        <div className={styles.forecastSection}>
          <ForecastList forecast={data.forecast} />
        </div>
        <section className={styles.alertsSection}>
          <AlertCard alerts={data.alerts ?? []} />
        </section>
      </div>
      <PrecipitationChart hourly={data.hourlyPrecipitation} />
    </div>
  );
}
