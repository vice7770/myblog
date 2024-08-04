import { useQuery } from '@tanstack/react-query'
import { create } from 'zustand'
import { getWeather } from '~/api/weather/graph/weather'

const useWeatherStore = create((set) => ({
  todayWeather: {},
  // yesterdayWeather and weather for table
  actions: {
    setWeather: (weather) => {
      useWeatherStore.setState(({ todayWeather: weather }))
      console.log(weather)
    }
  },
}));


export const useWeatherActions = () => useWeatherStore((state) => state.actions)

export const useWeather = () => useWeatherStore((state) => state.todayWeather)
