import { useEffect } from "react";
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useCurrIdSelected, useWeatherBroadCastActions } from "~/stores/weatherBroadCast";
import { countriesConfig } from "~/utils/weather/countries"

interface CircleProps {
  color: string;
}

const Circle: React.FC<CircleProps> = ({ color }) => {
  const circleStyle = {
    backgroundColor: color,
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  };
  return <div style={circleStyle}></div>;
};

function DropdownCountries() {
  const currId = useCurrIdSelected();
  const { setCurrIdSelected } = useWeatherBroadCastActions();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 overflow-auto h-[300px]">
        <DropdownMenuLabel>Countries</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {Object.entries(countriesConfig).map(([key, value]) => (
            <DropdownMenuItem className={currId === key ? "rounded-l border-2 border-blue-400" : ""} key={key} id={key} onClick={(e) => setCurrIdSelected(e.currentTarget.id)}>
              {key}
              <DropdownMenuShortcut><Circle color={value.color} /></DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
          {/* <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownCountries