export interface WeatherMetaData {
  daily: {
    time: string[];
    sunset: null | Record<string, number>;
    sunrise: Record<string, number>;
    uvIndexMax: Record<string, number>;
    weatherCode: Record<string, number>;
    windSpeed10mMax: Record<string, number>;
    daylightDuration: null | Record<string, number>;
    precipitationSum: Record<string, number>;
    temperature2mMax: Record<string, number>;
    temperature2mMin: Record<string, number>;
  };
  current: {
    temperature2m: number;
    precipitation: number;
    rain: number;
    time: string;
    cloudCover: number;
    relativeHumidity2m: number;
    wind_speed_10m: number; 
  };
  hourly: {
    time: string[];
    precipitation: PrecipitationData;
  }
};

interface PrecipitationData {
  [key: string]: number;
}

export interface WeatherData {
  name: string;
  metadata: WeatherMetaData;
};
