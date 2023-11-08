import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/src/components/shared/dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";
import SpYearPopup from "./SpYearPopup";
import SpMonthlyMixPopup from "./SpMixPercentPopUp";
import { SpContext } from "./SpController";

export default function SpInputDropdown() {
  const { webSocketData } = useContext(SpContext);
  const [yearlybudgetMixOpen, setYearlybudgetMixOpen] = useState(false);
  const [monthlyMixPercentOpen, setMonthlyMixPercentOpen] = useState(false);
  useEffect(() => {}, []);
  function onChangeHandler(e: any, k: string) {
    if (k === "budgetMix") {
      setYearlybudgetMixOpen(true);
    } else if (k === "monthlyMix") {
      setMonthlyMixPercentOpen(true);
    }
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={!webSocketData?.data?.length}
          className=" bg-black text-white border-2 p-2 rounded-md flex h-9 mt-2 ml-2  items-center"
        >
          <div className=" text-sm text-white font-medium mr-1">Inputs</div>
          <CaretDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={(e) => onChangeHandler(e, "budgetMix")}>
            Future Budget Mix
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={(e) => onChangeHandler(e, "monthlyMix")}>
            Monthly Mix
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SpYearPopup
        open={yearlybudgetMixOpen}
        setOpen={setYearlybudgetMixOpen}
      />
      <SpMonthlyMixPopup
        open={monthlyMixPercentOpen}
        setOpen={setMonthlyMixPercentOpen}
      />
    </>
  );
}
