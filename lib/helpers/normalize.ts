import type { WeatherDashboardData, HourlyPrecipitation, WeatherAlert } from "@/contracts/domain/types";
import { mapWeatherCode } from "@/lib/weather-codes";
import { getTimeOfDay } from "@/lib/helpers/time-of-day";

export type OWMWeatherEntry = {
  id: number;
}

export type OWMCurrent = {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  clouds: number;
  weather: OWMWeatherEntry[];
}

export type OWMDaily = {
  dt: number;
  temp: { min: number; max: number };
  humidity: number;
  wind_speed: number;
  pop: number;
  weather: OWMWeatherEntry[];
  summary?: string;
}

export type OWMHourly = {
  dt: number;
  pop: number;
  rain?: { "1h": number };
  snow?: { "1h": number };
}

export type OWMAlert = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
}

export type OWMResponse = {
  current: OWMCurrent;
  daily: OWMDaily[];
  hourly: OWMHourly[];
  alerts?: OWMAlert[];
  timezone_offset: number;
}

export function normalizeHourly(hourly: OWMHourly[], timezoneOffset: number): HourlyPrecipitation[] {
  return hourly.slice(0, 24).map((h) => ({
    hour: new Date((h.dt + timezoneOffset) * 1000).getUTCHours(),
    precipitationProbability: Math.round(h.pop * 100),
    precipitation: Math.round(((h.rain?.["1h"] ?? 0) + (h.snow?.["1h"] ?? 0)) * 10) / 10,
  }));
}

export function normalize(data: OWMResponse, cityName: string): WeatherDashboardData {
  const { current, daily } = data;
  const cond = current.weather[0];
  const today = daily[0];

  return {
    location: cityName,
    updatedAt: new Date().toISOString(),
    timeOfDay: getTimeOfDay(data.timezone_offset),
    summary: today?.summary,
    current: {
      temperature: Math.round(current.temp),
      feelsLike: Math.round(current.feels_like),
      todayMin: Math.round(today?.temp.min ?? current.temp),
      todayMax: Math.round(today?.temp.max ?? current.temp),
      condition: mapWeatherCode(cond.id),
      humidity: current.humidity,
      windSpeed: Math.round(current.wind_speed * 3.6),
      cloudiness: current.clouds,
    },
    forecast: daily.slice(1, 8).map((day: OWMDaily) => {
      const dayCond = day.weather[0];
      return {
        date: new Date(day.dt * 1000).toISOString().split("T")[0],
        tempMin: Math.round(day.temp.min),
        tempMax: Math.round(day.temp.max),
        condition: mapWeatherCode(dayCond.id),
        precipitationProbability: Math.round(day.pop * 100),
        humidity: day.humidity,
        windSpeed: Math.round(day.wind_speed * 3.6),
      };
    }),
    hourlyPrecipitation: normalizeHourly(data.hourly, data.timezone_offset),
    alerts: data.alerts?.map((a): WeatherAlert => ({
      event: a.event,
      senderName: a.sender_name,
      start: new Date(a.start * 1000).toISOString(),
      end: new Date(a.end * 1000).toISOString(),
      description: a.description,
    })),
  };
}
