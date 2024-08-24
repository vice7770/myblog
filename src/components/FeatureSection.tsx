import { Suspense } from "react";

import { getWeatherAverageTemp, getWeatherAverageTempYesterday, getWeatherStatus } from "~/utils/weather/weather";
import { type WeatherData, type PrevWeatherData } from "~/api/weather/graph/types";
import { getWeatherMetaData, getWeatherPrev2Months } from "~/api/weather/graph/weather";
import WeatherComponent from "./WeatherComponent";

const FeatureSection = async () => {
    const weatherData : WeatherData[] = await getWeatherMetaData();
    const weather2PrevMonths : PrevWeatherData[] = await getWeatherPrev2Months();
    const weatherStatus = getWeatherStatus(weatherData.map((weather) => weather.metadata));
    const averageTemp = getWeatherAverageTemp(weatherData.map((weather) => weather.metadata));
    const averageTempYesterday = getWeatherAverageTempYesterday(weatherData.map((weather) => weather.metadata));
    return (
        <section className="flex justify-center items-center w-full bg-slate-400 lg:h-[1000px]">
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
                            weatherData={weatherData}                    
                            weather2PrevMonths={weather2PrevMonths}
                        />    
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;