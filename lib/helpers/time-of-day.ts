import type { TimeOfDay } from "@/contracts/domain/types";

export function getTimeOfDay(timezoneOffset: number): TimeOfDay {
  const localHour = new Date(Date.now() + timezoneOffset * 1000).getUTCHours();
  if (localHour < 6) return "night";
  if (localHour < 12) return "morning";
  if (localHour < 18) return "day";
  return "evening";
}
