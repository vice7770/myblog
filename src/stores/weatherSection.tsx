import { create } from 'zustand'

const useWeatherStore = create((set) => ({
  weatherView: "overView",
  // yesterdayWeather and weather for table
  actions: {
    setWeatherView: (newView : string) => set(() => ({ weatherView: newView }))
  },
}));


export const useWeatherActions = () => useWeatherStore((state) => state.actions)

export const useWeatherView = () => useWeatherStore((state) => state.weatherView)