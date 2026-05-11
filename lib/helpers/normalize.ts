import { z } from "zod";
import type { WeatherDashboardData, HourlyPrecipitation, WeatherAlert } from "@/contracts/domain/types";
import { mapWeatherCode } from "@/lib/weather-codes";
import { getTimeOfDay } from "@/lib/helpers/time-of-day";

const OWMWeatherEntrySchema = z.object({ id: z.number() });

const OWMCurrentSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  humidity: z.number(),
  wind_speed: z.number(),
  clouds: z.number(),
  weather: z.array(OWMWeatherEntrySchema),
});

const OWMDailySchema = z.object({
  dt: z.number(),
  temp: z.object({ min: z.number(), max: z.number() }),
  humidity: z.number(),
  wind_speed: z.number(),
  pop: z.number(),
  weather: z.array(OWMWeatherEntrySchema),
  summary: z.string().optional(),
});

const OWMHourlySchema = z.object({
  dt: z.number(),
  pop: z.number(),
  rain: z.object({ "1h": z.number() }).optional(),
  snow: z.object({ "1h": z.number() }).optional(),
});

const OWMAlertSchema = z.object({
  sender_name: z.string(),
  event: z.string(),
  start: z.number(),
  end: z.number(),
  description: z.string(),
});

export const OWMResponseSchema = z.object({
  current: OWMCurrentSchema,
  daily: z.array(OWMDailySchema),
  hourly: z.array(OWMHourlySchema),
  alerts: z.array(OWMAlertSchema).optional(),
  timezone_offset: z.number(),
});

export type OWMResponse = z.infer<typeof OWMResponseSchema>;

type OWMHourly = z.infer<typeof OWMHourlySchema>;
type OWMDaily = z.infer<typeof OWMDailySchema>;

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
    forecast: daily.slice(1, 8).map((day) => {
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
