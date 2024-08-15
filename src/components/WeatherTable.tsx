/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper, ColumnDef, CellContext, Cell, Row, HeaderGroup } from "@tanstack/react-table";
import { type WeatherData } from "~/api/weather/graph/types";

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
    const { weatherData } = props;
    const formattedData = useMemo(() => {
        // const result = [];
        if (!weatherData) {
            return [];
        }
        const result = weatherData.map((weather) => {
            return {
                name: weather.name,
                temperature: weather.metadata.daily.temperature2mMin[0]?.toPrecision(3) ?? 0,
                windspeed: weather.metadata.daily.windSpeed10mMax[0]?.toPrecision(2) ?? 0,
                humidity: weather.metadata.current.relativeHumidity2m,
                description: 1,
            }
        });
        return result;
    }, [weatherData]);

    const columnHelper = createColumnHelper<WeatherTable>()

    const columns = useMemo(() => {
        return [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: () => <span>Name</span>,}),
        columnHelper.accessor('temperature', {
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Temperature</span>,
        }),
        columnHelper.accessor('windspeed', {
            cell: info => info.renderValue(),
            header: () => <span>Wind Speed</span>,          
        }),
        columnHelper.accessor('humidity', {
            cell: info => info.renderValue(),
            header: () => <span>Humidity</span>,
        }),
        columnHelper.accessor('description', {
            cell: info => info.renderValue(),
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
        <div className="p-2">
            <table>
            <thead className=" justify-center">
                {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                    <th className="p-2 text-center" key={header.id}>
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
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                    <td className="text-center p-1" key={cell.id}>
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