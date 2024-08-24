"use client"

import { TrendingUp } from "lucide-react"
import { useState } from "react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import { type PrevWeatherData } from "~/api/weather/graph/types"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  temperature2mMax: {
    label: "temperature2mMax",
    color: "hsl(var(--chart-1))",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "hsl(var(--chart-2))",
  // },
} satisfies ChartConfig

interface Props {
  weatherData: PrevWeatherData[]
}

export function WeatherBroadCast(props : Props) {
  const { weatherData } = props;
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("temperature2mMax");
  const arrTime = Object.values(weatherData[0].metadata.daily?.time);
  const arrTemp = Object.values(weatherData[0].metadata.daily?.temperature2mMax);
  const firstMonth = new Date(arrTime[0]).getMonth();
  const lastMonth = new Date(arrTime[arrTime.length - 1]).getMonth();
  const currYear = new Date(arrTime[0]).getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const chartData = arrTime.map((time, index) => {
    return {
      date: time.slice(0, 10),
      temperature2mMax: arrTemp[index].toPrecision(2),
    }
  });
  console.log(chartData);
  return (
    <Card className="flex flex-col w-full h-full rounded-3xl rounded-tr-none">
      <CardHeader>
        <CardTitle>BroadCast of Previous 2 Months</CardTitle>
        <CardDescription>{`${monthNames[firstMonth]} - ${monthNames[lastMonth]} ${currYear}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8} 
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
             <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey="temperature2mMax"
              type="natural"
              stroke="var(--color-temperature2mMax)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-temperature2mMax)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default WeatherBroadCast