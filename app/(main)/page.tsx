import { Suspense } from "react";
import { fetchWeather } from "@/lib/owm/fetch-weather";
import { DashboardEntryPoint } from "@/components/dashboard-entry-point/dashboard-entry-point";
import { SkeletonState } from "@/components/feedback/skeleton-state/skeleton-state";
import { MOCK_WEATHER_DATA } from "@/data/mocks/weather";
import { LOCATION } from "@/constants/default-location";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { WeatherError } from "@/lib/custom/errors/errors";

type PageProps = {
  searchParams: Promise<{ city?: string }>;
};

async function WeatherData({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const city = (await searchParams).city ?? LOCATION.name;
  try {
    const data = await fetchWeather(city);
    return <DashboardEntryPoint data={data} />;
  } catch (error) {
    const weatherError = error instanceof WeatherError ? error : null;
    return (
      <DashboardEntryPoint
        data={MOCK_WEATHER_DATA}
        error={weatherError?.message ?? ERROR_MESSAGES.WEATHER_UNAVAILABLE}
        retryable={weatherError?.retryable ?? true}
      />
    );
  }
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<SkeletonState />}>
      <WeatherData searchParams={searchParams} />
    </Suspense>
  );
}
