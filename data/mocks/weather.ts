import type { WeatherDashboardData, DailyForecast, HourlyPrecipitation, WeatherAlert, TimeOfDay } from "@/contracts/domain/types";

const CONDITIONS = [
  { code: "mostly-clear", label: "Mostly Clear" },
  { code: "clear", label: "Clear" },
  { code: "clear", label: "Clear" },
  { code: "partly-cloudy", label: "Partly Cloudy" },
  { code: "rain", label: "Rain" },
  { code: "rain", label: "Rain" },
  { code: "mostly-cloudy", label: "Mostly Cloudy" },
] as const;

const TEMPS = [
  { min: 6, max: 12 },
  { min: 7, max: 14 },
  { min: 9, max: 15 },
  { min: 8, max: 13 },
  { min: 6, max: 11 },
  { min: 5, max: 10 },
  { min: 7, max: 12 },
];

const PRECIPITATION_PROB = [10, 5, 5, 20, 75, 80, 30];
const HUMIDITY = [65, 58, 55, 70, 85, 88, 75];
const WIND_SPEED = [14, 10, 8, 16, 22, 24, 18];

const HOURLY_DATA: { pop: number; mm: number }[] = [
  { pop: 5, mm: 0 },
  { pop: 5, mm: 0 },
  { pop: 10, mm: 0 },
  { pop: 15, mm: 0 },
  { pop: 20, mm: 0 },
  { pop: 30, mm: 0 },
  { pop: 45, mm: 0.1 },
  { pop: 60, mm: 0.3 },
  { pop: 75, mm: 0.8 },
  { pop: 80, mm: 1.2 },
  { pop: 85, mm: 2.1 },
  { pop: 80, mm: 1.8 },
  { pop: 70, mm: 1.0 },
  { pop: 60, mm: 0.5 },
  { pop: 45, mm: 0.2 },
  { pop: 30, mm: 0 },
  { pop: 20, mm: 0 },
  { pop: 15, mm: 0 },
  { pop: 10, mm: 0 },
  { pop: 5, mm: 0 },
  { pop: 5, mm: 0 },
  { pop: 5, mm: 0 },
  { pop: 5, mm: 0 },
  { pop: 5, mm: 0 },
];

const mockAlerts: WeatherAlert[] = [
  {
    event: "Wind Warning",
    senderName: "DMI",
    start: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    end: new Date(Date.now() + 10 * 3600 * 1000).toISOString(),
    description:
      "Strong southwesterly winds expected with gusts up to 22 m/s.Travel may be disrupted.",
  },
];

const currentHour = new Date().getHours();

const hourlyPrecipitation: HourlyPrecipitation[] = HOURLY_DATA.map((entry, i) => ({
  hour: (currentHour + i) % 24,
  precipitationProbability: entry.pop,
  precipitation: entry.mm,
}));

function getMockTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour < 6) return "night";
  if (hour < 12) return "morning";
  if (hour < 18) return "day";
  return "evening";
}

function offsetDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split("T")[0];
}

const forecast: DailyForecast[] = CONDITIONS.map((condition, i) => ({
  date: offsetDate(i + 1),
  tempMin: TEMPS[i].min,
  tempMax: TEMPS[i].max,
  condition,
  precipitationProbability: PRECIPITATION_PROB[i],
  humidity: HUMIDITY[i],
  windSpeed: WIND_SPEED[i],
}));

export const MOCK_WEATHER_DATA: WeatherDashboardData = {
  location: "Aarhus",
  updatedAt: new Date().toISOString(),
  timeOfDay: getMockTimeOfDay(),
  isMockData: true,
  hourlyPrecipitation,
  alerts: mockAlerts,
  summary:
    "Expect a mix of sun and clouds during the day with a slight chance of rain.",
  current: {
    temperature: 8,
    feelsLike: 5,
    todayMin: 4,
    todayMax: 12,
    condition: { code: "partly-cloudy", label: "Partly Cloudy" },
    humidity: 74,
    windSpeed: 18,
    cloudiness: 40,
  },
  forecast,
};
