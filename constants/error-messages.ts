export const ERROR_MESSAGES = {
  WEATHER_UNAVAILABLE: "Weather data is currently unavailable",
  CITY_NOT_FOUND: (city: string) => `Could not find "${city}"`,
} as const;
