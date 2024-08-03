import { WeatherMetaData } from "~/api/weather/graph/types";

export function getWeatherStatus(weather : WeatherMetaData[]) {
    const weatherStatus = {
        hot: 0,
        cool: 0,
        cold: 0,
    }
    weather.forEach((weather) => {
        if (weather.main.temp > 86) { // 30°C to Fahrenheit
            weatherStatus.hot++;
        } else if (weather.main.temp >= 68 && weather.main.temp <= 86) { // 20°C to Fahrenheit
            weatherStatus.cool++;
        } else {
            weatherStatus.cold++;
        }
    });

    return weatherStatus; 
}