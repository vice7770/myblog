"use client"

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useIsOverViewToggled } from '~/stores/weatherSection';
import WeatherTable from './WeatherTable';

const WeatherChart2 = dynamic(() => import('./Weather/WeatherChart2'), { ssr: false })

interface Props {
    weatherStatus: {
      hot: number,
      cool: number,
      cold: number
    }
    averageTemp: number
    averageTempYesterday: number
}

const WeatherComponent = (props : Props) => {
    const { weatherStatus, averageTemp, averageTempYesterday } = props;
    const isOverViewToggled = useIsOverViewToggled();
    useEffect(() => {
        console.log(isOverViewToggled)
    }, [isOverViewToggled]) 
    return (
      <>
        {isOverViewToggled ? (
          <WeatherChart2
            weatherStatus={weatherStatus}
            averageTemp={averageTemp}
            averageTempYesterday={averageTempYesterday}
          />
        ) : (
          <WeatherTable />
        )}
      </>
    );
}

export default WeatherComponent;