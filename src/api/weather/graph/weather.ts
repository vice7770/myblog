import { db } from "~/server/db";
import { weather, weatherPrevious2Months } from "~/server/db/schema";
export const getWeatherMetaData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const data = await db.query.weather.findMany();
    const data = await db.select({
        name: weather.name,
        metadata: weather.metadata, // Replace 'metadata' with the actual column name
        // Add other columns if needed
    }).from(weather);
    return data
};
export const getWeatherPrev2Months = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const data = await db.query.weather.findMany();
    const data = await db.select({
        name: weatherPrevious2Months.name,
        metadata: weatherPrevious2Months.metadata, // Replace 'metadata' with the actual column name
        // Add other columns if needed
    }).from(weatherPrevious2Months);
    return data
};


// export const getWeatherYesterdayMetaData = async () => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     // const data = await db.query.weather.findMany();
//     const data = await db.select({
//         metadata: weatherPreviousDay.metadata, // Replace 'metadata' with the actual column name
//         // Add other columns if needed
//     }).from(weatherPreviousDay);
//     // console.log(data.map(weather => weather.metadata));
//     return data.map(weather => weather.metadata)
// };

