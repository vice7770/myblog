"use client"
import { useIsOverViewToggled } from '~/stores/weatherSection';
import WeatherTable from './WeatherTable';
import SideTab from './Weather/SideTab';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { type WeatherData } from "~/api/weather/graph/types";

const WeatherChart2 = dynamic(() => import('./Weather/WeatherChart2'), { ssr: false });

interface Props {
    weatherStatus: {
      hot: number,
      cool: number,
      cold: number
    }
    averageTemp: number
    averageTempYesterday: number
    weatherData: WeatherData[]
}

const WeatherComponent = (props: Props) => {
    const { weatherStatus, averageTemp, averageTempYesterday, weatherData} = props;
    const isOverViewToggled = useIsOverViewToggled();
    
    useEffect(() => {
        console.log(isOverViewToggled);
    }, [isOverViewToggled]);
    return (
        <div className='flex h-full justify-center items-center border-4'>
            {isOverViewToggled ? (
                <>
                    <WeatherChart2
                        weatherStatus={weatherStatus}
                        averageTemp={averageTemp}
                        averageTempYesterday={averageTempYesterday}
                    />
                    <SideTab />
                </>
            ) : (
                <>
                    <WeatherTable weatherData={weatherData} />
                    <SideTab />
                </>
            )}
        </div>
    );
}

export default WeatherComponent;