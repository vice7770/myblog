import { create } from 'zustand'

const useWeatherBroadCast = create((set) => ({
  currIdSelected: "London",
  // yesterdayWeather and weather for table
  actions: {
    setCurrIdSelected: (id : string) => set(() => ({currIdSelected: id})),
  },
}));


export const useWeatherBroadCastActions = () => useWeatherBroadCast((state) => state.actions)

export const useCurrIdSelected = () => useWeatherBroadCast((state) => state.currIdSelected)
