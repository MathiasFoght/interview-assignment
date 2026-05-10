"use server";

import { BASE_URLS } from "@/constants/api";
import { owmFetch } from "@/lib/owm/owm-fetch";

type OWMGeocodeResult = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type CityMatch = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
};

export async function searchCities(query: string): Promise<CityMatch[]> {
  try {
    const results = await owmFetch<OWMGeocodeResult[]>(BASE_URLS.GEOCODE, {
      params: { q: query, limit: "5" },
    });

    return results.map(({ name, country, state, lat, lon }) => ({
      name,
      country,
      ...(state && { state }),
      lat,
      lon,
    }));
  } catch {
    return [];
  }
}
