import { Suspense } from "react";

import { getWeatherAverageTemp, getWeatherAverageTempYesterday, getWeatherStatus } from "~/utils/weather/weather";
import { type WeatherMetaData } from "~/api/weather/graph/types";
import { getWeatherMetaData, getWeatherYesterdayMetaData } from "~/api/weather/graph/weather";
import WeatherComponent from "./WeatherComponent";

const FeatureSection = async () => {
    const weatherMetaData : WeatherMetaData[] = await getWeatherMetaData();
    const weatherYesterdayDataData : WeatherMetaData[] = await getWeatherYesterdayMetaData();
    const weatherStatus = getWeatherStatus(weatherMetaData);
    const averageTemp = getWeatherAverageTemp(weatherMetaData);
    const averageTempYesterday = getWeatherAverageTempYesterday(weatherMetaData);
    return (
        <section className="flex justify-center items-center w-full">
            <div className="grid grid-cols-1 gap-4 md:gap-8 w-full">
                <h3 className="flex items-center justify-center text-2xl font-bold">Lets play a little game</h3>
                <div className="flex justify-center items-center w-full space-x-4">
                    {/* <ButtonsWeather />                     */}
                </div>
                <div className=" flex justify-center items-center w-full rounded-xl bg-gradient-to-br from-surface-brand to-[#3b5998] p-xl mt-[76px]">
                    <Suspense fallback={<div>Loading...</div>}>
                        <WeatherComponent 
                            weatherStatus={weatherStatus} 
                            averageTemp={averageTemp} 
                            averageTempYesterday={averageTempYesterday}
                            weatherMetaData={weatherMetaData}
                            weatherYesterdayDataData={weatherYesterdayDataData}                        
                        />    
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;