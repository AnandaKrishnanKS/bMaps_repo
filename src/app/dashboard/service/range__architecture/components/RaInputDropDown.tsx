import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/src/components/shared/dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";
// import SpYearPopup from "./SpYearPopup";
// import SpMonthlyMixPopup from "./SpMixPercentPopUp";
import { RaContext } from "./RaController";
import RaInputPopUp from "./RaInputPopUp";
import RaUploadPopUp from "./RaUploadPopup";

export default function RaInputDropDown() {
  const { webSocketData } = useContext(RaContext);
  const [raInputPopupOpen, setRaInputPopupOpen] = useState(false);
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  useEffect(() => {}, []);
  function onChangeHandler(e: any, k: string) {
    if (k === "raInput") {
      setRaInputPopupOpen(true);
    } else if (k === "raUpload") {
      setUploadPopupOpen(true);
    }
  }
  return (
    <div className=" mt-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={!webSocketData?.data?.length}
          className=" bg-black h-9 text-white border-2 p-2 rounded-md flex  items-center"
        >
          <div className=" text-sm text-white font-medium mr-1">Inputs</div>
          <CaretDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={(e) => onChangeHandler(e, "raInput")}>
            Forecast Inputs
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={(e) => onChangeHandler(e, "raUpload")}>
            Upload Budget File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RaInputPopUp open={raInputPopupOpen} setOpen={setRaInputPopupOpen} />
      <RaUploadPopUp open={uploadPopupOpen} setOpen={setUploadPopupOpen} />
    </div>
  );
}
