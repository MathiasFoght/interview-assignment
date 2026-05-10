import type { ConditionCode, WeatherCondition } from "@/contracts/domain/types";

/*
OWM groups weather conditions into categories based on the first digit of the code:
*/


const CODE_CONDITION_MAP: Record<number, ConditionCode> = {
  // Thunderstorm
  200: "thunderstorm", 201: "thunderstorm", 202: "thunderstorm",
  210: "thunderstorm", 211: "thunderstorm", 212: "thunderstorm", 221: "thunderstorm",
  230: "thunderstorm", 231: "thunderstorm", 232: "thunderstorm",

  // Drizzle
  300: "drizzle", 301: "drizzle", 302: "drizzle",
  310: "drizzle", 311: "drizzle", 312: "drizzle",
  313: "drizzle", 314: "drizzle", 321: "drizzle",

  // Rain
  500: "light-rain", 501: "rain", 502: "rain", 503: "rain", 504: "rain",
  511: "freezing-rain",
  520: "light-rain", 521: "rain", 522: "rain", 531: "rain",

  // Snow
  600: "light-snow", 601: "snow", 602: "snow",
  611: "sleet", 612: "sleet", 613: "sleet", 615: "sleet", 616: "sleet",
  620: "light-snow", 621: "snow", 622: "snow",

  // Atmosphere
  701: "fog", 711: "fog", 721: "fog", 731: "fog",
  741: "fog", 751: "fog", 761: "fog", 762: "fog",
  771: "squall", 781: "tornado",

  // Clear / Clouds
  800: "clear",
  801: "mostly-clear", 802: "partly-cloudy", 803: "mostly-cloudy", 804: "overcast",
};

const LABELS: Record<ConditionCode, string> = {
  "clear": "Clear",
  "mostly-clear": "Mostly Clear",
  "partly-cloudy": "Partly Cloudy",
  "mostly-cloudy": "Mostly Cloudy",
  "overcast": "Overcast",
  "thunderstorm": "Thunderstorm",
  "drizzle": "Drizzle",
  "light-rain": "Light Rain",
  "rain": "Rain",
  "freezing-rain": "Freezing Rain",
  "light-snow": "Light Snow",
  "snow": "Snow",
  "sleet": "Sleet",
  "fog": "Fog",
  "squall": "Squall",
  "tornado": "Tornado",
  "unknown": "Unknown",
};

export function mapWeatherCode(id: number): WeatherCondition {
  const code = CODE_CONDITION_MAP[id] ?? "unknown";
  return { code, label: LABELS[code] };
}
