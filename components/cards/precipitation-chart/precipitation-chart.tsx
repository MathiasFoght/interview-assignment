"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import type { HourlyPrecipitation } from "@/contracts/domain/types";
import styles from "./precipitation-chart.module.css";

const chartConfig = {
  precipitation: {
    label: "Rain",
    color: "rgba(147, 197, 253, 0.85)",
  },
} satisfies ChartConfig;

type Props = {
  hourly: HourlyPrecipitation[];
};

type TooltipProps = {
  active?: boolean;
  payload?: { payload: { precipitation: number; pop: number } }[];
  label?: string;
};

function PrecipTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const { precipitation, pop } = payload[0].payload;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTime}>{label}</p>
      <p className={styles.tooltipValue}>
        {precipitation} mm · {pop}% chance
      </p>
    </div>
  );
}

export function PrecipitationChart({ hourly }: Props) {
  const data = hourly.map((h) => ({
    time: `${String(h.hour).padStart(2, "0")}:00`,
    precipitation: h.precipitation,
    pop: h.precipitationProbability,
  }));

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Precipitation · Next 24 h</h2>
      <ChartContainer config={chartConfig} className={styles.chart}>
        <BarChart data={data} barSize={10}>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            interval={2}
            tick={{ fontSize: 10, fill: "rgba(255,255,255,0.42)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: "rgba(255,255,255,0.35)" }}
            tickFormatter={(v: number) => v < 1 ? `${v}mm` : `${Math.round(v)}mm`}
            domain={[0, "auto"]}
            tickCount={4}
            width={42}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(255,255,255,0.06)" }}
            content={<PrecipTooltip />}
          />
          <Bar
            dataKey="precipitation"
            fill="var(--color-precipitation)"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </section>
  );
}
