import { Button } from "~/components/ui/button";

import WeatherChart2 from "~/components/Weather/WeatherChart2";
import { getWeatherAverageTemp, getWeatherStatus } from "~/utils/weather/weather";
import { type WeatherMetaData } from "~/api/weather/graph/types";
import { getWeatherMetaData, getWeatherYesterdayMetaData } from "~/api/weather/graph/weather";

const FeatureSection = async () => {
    const weatherMetaData : unknown[] = await getWeatherMetaData();
    const weatherYesterdayDataData : unknown[] = await getWeatherYesterdayMetaData();
    const weatherStatus = getWeatherStatus(weatherMetaData as WeatherMetaData[]);
    const averageTemp = getWeatherAverageTemp(weatherMetaData as WeatherMetaData[]);
    const averageTempYesterday = getWeatherAverageTemp(weatherYesterdayDataData as WeatherMetaData[])
    return (
        <section className="flex justify-center items-center w-full">
            <div className="grid grid-cols-1 gap-4 md:gap-8 w-full">
                <h3 className="flex items-center justify-center text-2xl font-bold">Lets play a little game</h3>
                <div className="flex justify-center items-center w-full space-x-4">
                    <Button className="mb-2 h-[50px] w-[250px] rounded-3xl bg-blue-500 px-4 py-2 text-lg text-black">
                        Overview
                    </Button>        
                    <Button className="mb-2 h-[50px] w-[250px] rounded-3xl bg-blue-500 px-4 py-2 text-lg text-black">
                        Show me the weather
                    </Button>
                </div>
                <div className=" flex justify-center items-center w-full rounded-xl bg-gradient-to-br from-surface-brand to-[#3b5998] p-xl mt-[76px]">
                    <WeatherChart2 weatherStatus={weatherStatus} averageTemp={averageTemp} averageTempYesterday={averageTempYesterday}/>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;