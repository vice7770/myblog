export interface WeatherMetaData {
  daily: {
    time: string[];
    sunset: Record<string, number>;
    sunrise: Record<string, number>;
    uvIndexMax: Record<string, number>;
    weatherCode: Record<string, number>;
    windSpeed10mMax: Record<string, number>;
    windSpeed10mMin: Record<string, number>;
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
    cloudCover: number; // daily cloud cover seems to not be working
    relativeHumidity2m: number;
    windSpeed10m: number; 
    isDay: number;
  };
  hourly: {
    time: string[];
    precipitation: Record<string, number>;
    cloudCover: Record<string, number>;  
  }
};

export interface PrevWeatherMetaData {
  daily: {
    time: Record<string, string>;
    temperature2mMax: Record<string, number>;
  }
}

export interface WeatherData {
  name: string | null;
  metadata: WeatherMetaData;
};
export interface PrevWeatherData {
  name: string | null;
  metadata: PrevWeatherMetaData;
};
