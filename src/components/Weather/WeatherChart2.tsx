"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"

const chartConfig = {
  weather: {
    label: "Weather",
  },
  hot: {
    label: "🔥",
    color: "rgba(255, 50, 50, 0.8)",
  },
  cool: {
    label: "😎",
    color: "rgba(54, 162, 235, 0.8)",
  },
  cold: {
    label: "❄️ ",
    color: "rgba(0, 76, 153, 0.8)",
  },
} satisfies ChartConfig

interface Props {
  weatherStatus: {
    hot: number,
    cool: number,
    cold: number
  }
  averageTemp: number
  averageTempYesterday: number
}

export function WeatherChart2(props: Props) {
  const { weatherStatus, averageTemp, averageTempYesterday } = props
  const chartData = [
    { weather: "hot", count: weatherStatus.hot, fill: "var(--color-hot)" },
    { weather: "cool", count: weatherStatus.cool, fill: "var(--color-cool)" },
    { weather: "cold", count: weatherStatus.cold, fill: "var(--color-cold)" },
  ];
  const tempIsUp = averageTemp > averageTempYesterday;
  return (
    <Card className="flex flex-col w-full h-full rounded-3xl rounded-tr-none">
      <CardHeader>
        <CardTitle>Weather Overview</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-grow h-2/3">
        <ChartContainer config={chartConfig} className="h-full w-full mx-auto">
          <BarChart accessibilityLayer data={chartData} className="h-full w-full">
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="weather"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start justify-center gap-1 text-sm">
        <div className="flex gap-1 font-medium leading-none">
          {"Today the temperature " + (tempIsUp ? "increased" : "decreased")} 
          {tempIsUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        </div>
        <div className="leading-none text-muted-foreground">
          We all need hot days
        </div>
      </CardFooter>
    </Card>
  )
}

export default WeatherChart2