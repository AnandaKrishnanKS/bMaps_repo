import { GlobalContext } from "@/src/app/globalContext";
import { useContext } from "react";

export default function ConnectionStatusIndicator({ className }: any) {
  const { moduleConnectionStatus, setModuleConnectionStatus } =
    useContext(GlobalContext);
  const status = [
    <div key={0} className=" text-orange-600">
      Connecting...
    </div>,
    <div key={1} className=" text-green-600">
      Online
    </div>,
    <div key={2} className=" text-red-600">
      Connection Closing...
    </div>,
    <div key={3} className=" text-red-600">
      Offline
    </div>,
    <div key={4} className=" text-blue-600">
      Uninstantiated
    </div>,
    <div key={5}>{null}</div>,
  ];
  return <span>{status[moduleConnectionStatus]}</span>;
}
