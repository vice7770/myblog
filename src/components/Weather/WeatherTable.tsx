/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper, type CellContext, type SortingState, getSortedRowModel, type SortingFn } from "@tanstack/react-table";
import { type WeatherMetaData, type WeatherData } from "~/api/weather/graph/types";
import { openSansCell, openSansHeader } from "~/app/fonts";
import "./index.css";
import { Clouds, FullRain, PartialRain, Sun, SunCloud } from "public/weather/icons";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "~/components/ui/hover-card";

interface Props {
    weatherData: WeatherData[];
}

interface WeatherTable {
    name: string | null;
    temperature: string;
    windspeed: string;
    dailySpeedRange: {
        min: string;
        max: string;
    };
    humidity: string;
    description: React.JSX.Element;
}

const CellCard = (props: { trigger: React.ReactNode, Content: React.ReactNode }) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                {props.trigger}
            </HoverCardTrigger>
            <HoverCardContent>
                {props.Content}
            </HoverCardContent>
        </HoverCard>
    );
}

const sortByWeatherQuality: SortingFn<WeatherTable> = ((rowA, rowB) => { 
    const descriptionA = rowA.original.description.type.name;
    const descriptionB = rowB.original.description.type.name;
    const customOrder = ['Sun', 'SunCloud', 'Clouds', 'PartialRain', 'FullRain'];
    return customOrder.indexOf(descriptionA) - customOrder.indexOf(descriptionB);
});

const getDescriptionContent = ((props : {info: CellContext<WeatherTable, React.JSX.Element>, weatherData: WeatherData[]}) => {
    const { info, weatherData } = props;
    const rowIndexOfCell = info.row.index;
    const typeName = info.cell.getValue().type.name;
    const isSun = typeName === 'Sun';
    if(isSun) return <span>Its a sunny day, no clouds or rain 😎</span>
    else{
        const rainPerc = weatherData?.[rowIndexOfCell] ? weatherData[rowIndexOfCell].metadata.current.precipitation : 0;
        const cloudCover = weatherData?.[rowIndexOfCell] ? weatherData[rowIndexOfCell].metadata.current.cloudCover : 0;
        return <span>Cloud Cover: {cloudCover}%, Rain: {rainPerc.toFixed(2)}mm</span>
    }
})

const WeatherTable = (props : Props) => {
    const getWeatherDescription = (metaData: WeatherMetaData) => {
        if(metaData.current.cloudCover > 0 && metaData.current.precipitation === 0){
            if(metaData.current.cloudCover < 60){
                return <SunCloud/>;
            } else {
                return <Clouds/>;
            }
        }
        else if(metaData.current.precipitation > 0){
            if(metaData.current.precipitation > 4)
                return <FullRain/>;
            
            return <PartialRain/>;
        }
        return <Sun/>;
    }
    const { weatherData } = props;
    
    const [sorting, setSorting] = useState<SortingState>([{
        "id": "temperature",
        "desc": true
    }])
    
    const formattedData = useMemo(() => {
        // const result = [];
        if (!weatherData) {
            return [];
        }
        const result = weatherData.map((weather) => {
            return {
                name: weather.name,
                temperature: weather.metadata.current.temperature2m.toFixed(1) ?? "0",
                windspeed: weather.metadata.current.windSpeed10m.toPrecision(2) ?? "0",
                dailySpeedRange: {
                    min: weather.metadata.daily.windSpeed10mMin?.[0]?.toPrecision(2) ?? "0",
                    max: weather.metadata.daily.windSpeed10mMax?.[0]?.toPrecision(2) ?? "0",
                },
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
            header: () => <span>City</span>,
        }),
        columnHelper.accessor('temperature', {
            cell: info => <span>{info.getValue() + "°C"}</span>,
            header: () => <span>Temperature</span>,
        }),
        columnHelper.accessor('windspeed', {
            cell: info => {
                const trigger = <span>{info.getValue() + "m/s"}</span>;
                const content = <span>Gust Daily Range: {formattedData[info.cell.row.index]?.dailySpeedRange.min} - {formattedData[info.cell.row.index]?.dailySpeedRange.max}</span>;
                return <CellCard trigger={trigger} Content={content} />; 
            },
            header: () => <span>Wind Speed</span>,          
        }),
        columnHelper.accessor('humidity', {
            cell: info => info.renderValue(),
            header: () => <span>Humidity</span>,
        }),
        columnHelper.accessor('description', {
            cell: info => {
                const trigger = <div className="flex justify-center items-center w-14 h-14 ml-7">{info.renderValue()}</div>;
                // const content = <span>this is content</span>;
                const content = getDescriptionContent({info, weatherData});
                return <CellCard trigger={trigger} Content={content} />;
            },  
            header: () => {
                const trigger = <span>Description</span>;
                const content = <span>This will sort from weather quality</span>;
                return <CellCard trigger={trigger} Content={content} />;
            },
            sortingFn: sortByWeatherQuality,
            invertSorting: true,
        }),
      ]
    }, [weatherData]);

    const table = useReactTable({
        data: formattedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })
    return (
        <div className="flex w-full h-full overflow-auto rounded-3xl rounded-tr-none rounded-br-none border-4">
            <table className="w-full bg-cyan-500 border-separate border-spacing-0 p-4">
            <thead className="justify-center">
                {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                    <th className={`p-1 text-white text-center + ${openSansHeader.className}`}  key={header.id}>
                        {header.isPlaceholder ? null : (
                            <div
                                className={
                                header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : ''
                                }
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                                {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? null}
                            </div>
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