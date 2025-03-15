"use client"

import { useMemo } from "react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
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
import { countriesConfig } from "~/utils/weather/countries"
import DropdownCountries from "./BroadCastComponents/DropDownCountries"
import { useCurrIdSelected } from "~/stores/weatherBroadCast"

const chartConfig = countriesConfig satisfies ChartConfig

interface Props {
  weatherData: PrevWeatherData[]
}

export function WeatherBroadCast(props: Props) {
  const { weatherData } = props;
  const currId = useCurrIdSelected();

  const arrTime = (weatherData[0] && Object.values(weatherData[0].metadata.daily?.time)) ?? [];
  const firstMonth = new Date(arrTime[0]!).getMonth() || 0;
  const lastMonth = new Date(arrTime[arrTime.length - 1]!).getMonth() || 0;
  const currYear = new Date(arrTime[0]!).getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const chartData = arrTime.map((time, index) => {
    const obj = { date: time.slice(0, 10) }
    const objCountriesTemp = weatherData.map((weather) => ({
      [String(weather.name)]: Object.values(weather.metadata.daily?.temperature2mMax)[index]?.toPrecision(2)
    }));
    return { ...obj, ...objCountriesTemp.reduce((acc, val) => Object.assign(acc, val), {}) };
  });

  const averageTemp = useMemo(() => {
    const index = weatherData.findIndex((weather) => weather.name === currId);
    const temperatureData = weatherData[index]?.metadata.daily.temperature2mMax;
    if (!temperatureData) return 0;
    return Object.values(temperatureData).reduce((acc, val) => acc + val, 0) / Object.values(temperatureData).length;
  }, [currId, weatherData]);

  const maxTemp = useMemo(() => {
    const index = weatherData.findIndex((weather) => weather.name === currId);
    const temperatureData = weatherData[index]?.metadata.daily.temperature2mMax;
    if (!temperatureData) return 0;
    return Math.max(...Object.values(temperatureData));
  }
    , [currId, weatherData]);

  const minTemp = useMemo(() => {
    const index = weatherData.findIndex((weather) => weather.name === currId);
    const temperatureData = weatherData[index]?.metadata.daily.temperature2mMax;
    if (!temperatureData) return 0;
    return Math.min(...Object.values(temperatureData));
  }, [currId, weatherData]);

  return (
    <Card className="flex flex-col w-full h-full rounded-3xl rounded-tr-none">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>BroadCast of Previous 2 Months</CardTitle>
          <CardDescription>{`${monthNames[firstMonth]} - ${monthNames[lastMonth]} ${currYear}`}</CardDescription>
        </div>
        <div className="flex justify-center items-center p-6">
          <DropdownCountries />
        </div>
      </CardHeader>
      <CardContent className="flex-grow h-2/3">
        <ChartContainer config={chartConfig} className="h-full w-full mx-auto">
          <LineChart
            data={chartData}
            accessibilityLayer
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
            className="h-full w-full"
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: number) => {
                return `${value.toFixed(0)}°C`
              }}
              domain={[minTemp - 2, maxTemp + 2]}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value as string)
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
                    return new Date(value as string).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={currId as string}
              type="natural"
              stroke={`var(--color-${currId})`}
              strokeWidth={2}
              dot={{
                fill: `var(--color-${currId})`,
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Average Temperature is {averageTemp.toPrecision(2)}°C
        </div>
        <div className="leading-none text-muted-foreground">
          Showing Temperature in the last 2 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default WeatherBroadCast