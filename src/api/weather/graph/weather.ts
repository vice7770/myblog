import { db } from "~/server/db";
import { weather, weatherPreviousDay } from "~/server/db/schema";
export const getWeatherMetaData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const data = await db.query.weather.findMany();
    const data = await db.select({
        metadata: weather.metadata, // Replace 'metadata' with the actual column name
        // Add other columns if needed
    }).from(weather);
    // console.log(data.map(weather => weather.metadata));
    return data.map(weather => weather.metadata)
};
export const getWeatherYesterdayMetaData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const data = await db.query.weather.findMany();
    const data = await db.select({
        metadata: weatherPreviousDay.metadata, // Replace 'metadata' with the actual column name
        // Add other columns if needed
    }).from(weatherPreviousDay);
    // console.log(data.map(weather => weather.metadata));
    return data.map(weather => weather.metadata)
};

