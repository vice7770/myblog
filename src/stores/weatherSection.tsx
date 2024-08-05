import { create } from 'zustand'

const useWeatherStore = create((set) => ({
  isOverViewToggled: true,
  // yesterdayWeather and weather for table
  actions: {
    setOverViewToggled: () => set((state) => ({ isOverViewToggled: !state.isOverViewToggled }))
  },
}));


export const useWeatherActions = () => useWeatherStore((state) => state.actions)

export const useIsOverViewToggled = () => useWeatherStore((state) => state.isOverViewToggled)