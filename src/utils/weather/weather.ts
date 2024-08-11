import { WeatherMetaData } from "~/api/weather/graph/types";

export function getWeatherStatus(weather : WeatherMetaData[]) {
    const weatherStatus = {
        hot: 0,
        cool: 0,
        cold: 0,
    }
    weather?.forEach((weather) => {
        if (weather.daily.temperature2mMin[1] > 30) {
            weatherStatus.hot++;
        } else if (weather.daily.temperature2mMin[0] >= 20 && weather.daily.temperature2mMin[1] <= 30) { // 20°C to Fahrenheit
            weatherStatus.cool++;
        } else {
            weatherStatus.cold++;
        }
    });

    return weatherStatus; 
}

export function getWeatherAverageTemp(weather : WeatherMetaData[]) {
    const totalTemp = weather?.reduce((acc, weather) => acc + weather.daily.temperature2mMin[0], 0);
    return totalTemp / weather?.length;
}