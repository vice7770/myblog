/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper, ColumnDef, CellContext, Cell, Row, HeaderGroup } from "@tanstack/react-table";
import { WeatherMetaData, type WeatherData } from "~/api/weather/graph/types";
import { openSansCell, openSansHeader } from "~/app/fonts";
import "./index.css";
import { Clouds, FullRain, PartialRain, Sun, SunCloud } from "public/weather/icons";

interface Props {
    weatherData: WeatherData[];
}

interface WeatherTable {
    name: string;
    temperature: number;
    windspeed: number;
    humidity: number;
    description: number;
}

const WeatherTable = (props : Props) => {
    const getWeatherDescription = (metaData: WeatherMetaData) => {
        if(metaData.current.cloudCover && metaData.hourly.precipitation[0] && metaData.hourly.precipitation[0] === 0){
            if(metaData.current.cloudCover < 0.2){
                return <Sun/>;
            } else if(metaData.current.cloudCover < 0.6){
                return <SunCloud/>;
            } else {
                return <Clouds/>;
            }
        }
        if(metaData.hourly.precipitation[0] && metaData.hourly.precipitation[0] > 0){
            if(metaData.hourly.precipitation[0] > 4){
                return <FullRain/>;
            }
            return <PartialRain/>;
        }
        return <Sun/>;
    }

    const { weatherData } = props;
    const formattedData = useMemo(() => {
        // const result = [];
        if (!weatherData) {
            return [];
        }
        const result = weatherData.map((weather) => {
            return {
                name: weather.name,
                temperature: weather.metadata.current.temperature2m.toPrecision(3) ?? 0,
                windspeed: weather.metadata.current.wind_speed_10m.toPrecision(2) ?? 0,
                humidity: weather.metadata.current.relativeHumidity2m.toPrecision(2),
                description: getWeatherDescription(weather.metadata),
            }
        });
        return result;
    }, [weatherData]);

    const columnHelper = createColumnHelper<WeatherTable>()

    const columns = useMemo(() => {
        return [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: () => <span>City</span>,}),
        columnHelper.accessor('temperature', {
            cell: info => <span>{info.getValue() + "°C"}</span>,
            header: () => <span>Temperature</span>,
        }),
        columnHelper.accessor('windspeed', {
            cell: info => <span>{info.renderValue() + " k/h"}</span>,
            header: () => <span>Wind Speed</span>,          
        }),
        columnHelper.accessor('humidity', {
            cell: info => info.renderValue(),
            header: () => <span>Humidity</span>,
        }),
        columnHelper.accessor('description', {
            cell: info => <div className="flex justify-center items-center w-14 h-14 ml-7">{info.renderValue()}</div>,
            header: () => <span>Description</span>,
        }),
      ]
    }, [weatherData]);

    const table = useReactTable({
        data: formattedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div className="flex w-full h-full overflow-auto rounded-3xl rounded-tr-none rounded-br-none border-4">
            <table className="w-full bg-cyan-500 border-separate border-spacing-0 p-4">
            <thead className="justify-center">
                {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                    <th className={`p-1 text-white text-center + ${openSansHeader.className}`}  key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-cyan-400">
                    {row.getVisibleCells().map(cell => (
                    <td className={` text-white text-center ${openSansCell.className}`} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}

export default WeatherTable;