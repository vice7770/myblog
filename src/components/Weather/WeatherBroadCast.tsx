"use client"

import { useMemo, useState } from "react"
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
import { countriesConfig } from "~/utils/weather/countries"
import DropdownCountries from "./BroadCastComponents/DropDownCountries"
import { useCurrIdSelected } from "~/stores/weatherBroadCast"
import { TrendingUp } from "lucide-react"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = countriesConfig satisfies ChartConfig

interface Props {
  weatherData: PrevWeatherData[]
}

export function WeatherBroadCast(props : Props) {
  const { weatherData } = props;
  // const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("Athens"); /// I want this type to be inferred from the keys of chartConfig in my zuistand store
  const currId = useCurrIdSelected();

  const arrTime = Object.values(weatherData[0].metadata.daily?.time);
  const arrTemp = Object.values(weatherData[0].metadata.daily?.temperature2mMax);
  const firstMonth = new Date(arrTime[0]).getMonth();
  const lastMonth = new Date(arrTime[arrTime.length - 1]).getMonth();
  const currYear = new Date(arrTime[0]).getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const chartData = arrTime.map((time, index) => {
    const obj = {date: time.slice(0, 10)}
    const objCountriesTemp = weatherData.map((weather) => ({
      [weather.name]: Object.values(weather.metadata.daily?.temperature2mMax)[index]?.toPrecision(2)
    }));
    return {...obj, ...objCountriesTemp.reduce((acc, val) => Object.assign(acc, val), {})};
  });
  
  const averageTemp = useMemo( () => {
    const index = weatherData.findIndex((weather) => weather.name === currId);
    return Object.values(weatherData[index]?.metadata.daily.temperature2mMax).reduce((acc, val) => acc + val, 0) / Object.values(weatherData[index]?.metadata.daily.temperature2mMax).length;
  }, [currId, weatherData]);
  
  return (
    <Card className="flex flex-col w-full h-full rounded-3xl rounded-tr-none">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle >BroadCast of Previous 2 Months</CardTitle>
          <CardDescription>{`${monthNames[firstMonth]} - ${monthNames[lastMonth]} ${currYear}`}</CardDescription>
        </div>
        <div className="flex justify-center items-center p-6">
          <DropdownCountries />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            accessibilityLayer
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
              dataKey={currId as string}
              type="natural"
              stroke= {`var(--color-${currId})`}
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
          Average Tempeture is {averageTemp.toPrecision(2)}°C
        </div>
        <div className="leading-none text-muted-foreground">
          Showing Temperature in the last 2 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default WeatherBroadCast