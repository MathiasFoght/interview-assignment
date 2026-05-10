import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Sun,
  CloudSun,
  Cloudy,
  Cloud,
  CloudLightning,
  CloudDrizzle,
  CloudRain,
  CloudHail,
  CloudSnow,
  CloudFog,
  Wind,
  Tornado,
} from "lucide-react";
import type { ConditionCode } from "@/contracts/domain/types";

const ICON_MAP: Record<ConditionCode, LucideIcon> = {
  "clear": Sun,
  "mostly-clear": CloudSun,
  "partly-cloudy": Cloudy,
  "mostly-cloudy": Cloudy,
  "overcast": Cloud,
  "thunderstorm": CloudLightning,
  "drizzle": CloudDrizzle,
  "light-rain": CloudRain,
  "rain": CloudRain,
  "freezing-rain": CloudHail,
  "light-snow": CloudSnow,
  "snow": CloudSnow,
  "sleet": CloudHail,
  "fog": CloudFog,
  "squall": Wind,
  "tornado": Tornado,
  "unknown": Cloud,
};

type Props = LucideProps & {
  code: ConditionCode;
  label: string;
};

export function IconMapper({ code, label, ...props }: Props) {
  const Icon = ICON_MAP[code];
  return <Icon aria-label={label} {...props} />;
}
