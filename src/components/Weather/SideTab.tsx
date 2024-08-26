"use client"

import React from "react";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import { useWeatherActions, useWeatherView } from "~/stores/weatherSection";
import { SunCloud, Overview, GraphIcon } from "../../../public/weather/icons";

const SideTab = () => {
    const { setWeatherView } = useWeatherActions();
    const weatherView = useWeatherView();
    const buttonBaseStyle = "h-16 w-16 rounded-br-lg border border-white bg-gray-500 hover:bg-slate-600 p-0 text-lg text-black";
    
    return (
      <div className="flex h-full flex-col justify-start">
        <Button
          id="overView"
          className={`rounded-tr-3xl ${buttonBaseStyle} ${ weatherView === "overView" ? "bg-gray-200" : ""}`}
          onClick={(e) => setWeatherView(e.currentTarget.id)}
        >
          <div className="flex p-1">
            <Overview/>
          </div>
        </Button>
        <Button
          id="table"
          className={`${buttonBaseStyle} ${ weatherView === "table" ? "bg-gray-200" : ""}`}
          onClick={(e) => setWeatherView(e.currentTarget.id)}
        >
          <SunCloud/>     
        </Button>
        <Button
          id="broadcast"
          className={`${buttonBaseStyle} ${ weatherView === "broadcast" ? "bg-gray-200" : ""}`}
          onClick={(e) => setWeatherView(e.currentTarget.id)}
        >
          <GraphIcon />
        </Button>
      </div>
    );
};

export default SideTab;