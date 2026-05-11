import { cacheLife } from "next/cache";
import type { WeatherDashboardData } from "@/contracts/domain/types";
import { geocodeCity } from "@/lib/owm/fetch-geocode";
import { normalize } from "@/lib/helpers/normalize";
import type { OWMResponse } from "@/lib/helpers/normalize";
import { LOCATION } from "@/constants/default-location";
import { BASE_URLS } from "@/constants/api";
import { WeatherError } from "@/lib/custom/errors/errors";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { owmFetch } from "@/lib/owm/owm-fetch";

export async function fetchWeather(city: string = LOCATION.name): Promise<WeatherDashboardData> {
  "use cache";
  cacheLife("minutes");

  const location = await geocodeCity(city);

  const data = await owmFetch<OWMResponse>(BASE_URLS.ONE_CALL, {
    params: {
      lat: String(location.lat),
      lon: String(location.lon),
      exclude: "minutely",
      units: "metric",
    },
    onError: (status) => {
      console.error(`OpenWeatherMap responded with ${status}`);
      throw new WeatherError(ERROR_MESSAGES.WEATHER_UNAVAILABLE, true);
    },
  });

  return normalize(data, location.name);
}
