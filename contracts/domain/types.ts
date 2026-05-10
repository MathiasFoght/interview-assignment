export type TimeOfDay = "night" | "morning" | "day" | "evening";

export type ConditionCode =
  | "clear"
  | "mostly-clear"
  | "partly-cloudy"
  | "mostly-cloudy"
  | "overcast"
  | "thunderstorm"
  | "drizzle"
  | "light-rain"
  | "rain"
  | "freezing-rain"
  | "light-snow"
  | "snow"
  | "sleet"
  | "fog"
  | "squall"
  | "tornado"
  | "unknown";

export type WeatherCondition = {
  code: ConditionCode;
  label: string;
};

export type CurrentWeather = {
  temperature: number;
  feelsLike: number;
  todayMin: number;
  todayMax: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  cloudiness: number;
};

export type DailyForecast = {
  date: string;
  tempMin: number;
  tempMax: number;
  condition: WeatherCondition;
  precipitationProbability: number;
  humidity: number;
  windSpeed: number;
};

export type HourlyPrecipitation = {
  hour: number;
  precipitationProbability: number;
  precipitation: number;
};

export type WeatherAlert = {
  event: string;
  senderName: string;
  start: string;
  end: string;
  description: string;
};

export type WeatherDashboardData = {
  location: string;
  updatedAt: string;
  timeOfDay: TimeOfDay;
  current: CurrentWeather;
  forecast: DailyForecast[];
  hourlyPrecipitation: HourlyPrecipitation[];
  alerts?: WeatherAlert[];
  summary?: string;
  isMockData?: boolean;
};
