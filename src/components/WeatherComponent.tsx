"use client"
import { useMemo } from 'react';
import { useWeatherView } from '~/stores/weatherSection';
import WeatherTable from './Weather/WeatherTable';
import SideTab from './Weather/SideTab';

import { type PrevWeatherData, type WeatherData } from "~/api/weather/graph/types";
import WeatherChart2 from './Weather/WeatherChart2';
import WeatherBroadCast from './Weather/WeatherBroadCast';

// const WeatherChart2 = dynamic(() => import('./Weather/WeatherChart2'), { ssr: false });

interface Props {
    weatherStatus: {
      hot: number,
      cool: number,
      cold: number
    }
    averageTemp: number
    averageTempYesterday: number
    weatherData: WeatherData[]
    weather2PrevMonths: PrevWeatherData[]
}

const WeatherComponent = (props: Props) => {
    const { weatherStatus, averageTemp, averageTempYesterday, weatherData, weather2PrevMonths} = props;
    const isOverViewToggled = useWeatherView();
    const memoChartSection = useMemo(()=> {
        if(isOverViewToggled === "overView") {
            return <WeatherChart2
                weatherStatus={weatherStatus}
                averageTemp={averageTemp}
                averageTempYesterday={averageTempYesterday}
            />
        }    
        else if(isOverViewToggled === "table") return <WeatherTable weatherData={weatherData} />
        else if(isOverViewToggled === "broadcast") return <WeatherBroadCast weatherData={weather2PrevMonths}/>
        else {
            return <WeatherChart2
                weatherStatus={weatherStatus}
                averageTemp={averageTemp}
                averageTempYesterday={averageTempYesterday}
            />
        }
    },[isOverViewToggled])
    return (
        <div className='flex justify-center items-center w-[800px] h-[640px] bg-white rounded-3xl'>
            <>
                {memoChartSection}
                <SideTab />
            </>
        </div>
    );
}

export default WeatherComponent;