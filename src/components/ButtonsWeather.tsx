"use client"

import react from "react"
import { Button } from "~/components/ui/button";
import { useWeatherActions } from "~/stores/weatherSection";

const ButtonsWeather = () => {
    const { setOverViewToggled } = useWeatherActions();
    return(
        <>
            <Button 
                className="mb-2 h-[50px] w-[250px] rounded-3xl bg-blue-500 px-4 py-2 text-lg text-black" 
                onClick={() => setOverViewToggled()}
            >
                Overview
            </Button>        
            <Button className="mb-2 h-[50px] w-[250px] rounded-3xl bg-blue-500 px-4 py-2 text-lg text-black">
                Show me the weather
            </Button>
        </>
    );
};

export default ButtonsWeather;