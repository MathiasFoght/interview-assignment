import { cacheLife } from "next/cache";
import { BASE_URLS } from "@/constants/api";
import { WeatherError } from "@/lib/custom/errors/errors";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { owmFetch } from "@/lib/owm/owm-fetch";

type GeocodeResult = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

export type GeocodeLocation = {
  lat: number;
  lon: number;
  name: string;
  country: string;
};

export async function geocodeCity(query: string): Promise<GeocodeLocation> {
  "use cache";
  cacheLife("max");

  const results = await owmFetch<GeocodeResult[]>(BASE_URLS.GEOCODE, {
    params: { q: query, limit: "1" },
  });

  if (results.length === 0) {
    throw new WeatherError(ERROR_MESSAGES.CITY_NOT_FOUND(query), false);
  }

  const { lat, lon, name, country } = results[0];
  return { lat, lon, name, country };
}
