import { useContext } from "react";
import { RaContext } from "../RaController";

export default function FooterCell({ item }: any) {
  const { webSocketData } = useContext(RaContext);

  return (
    <>
      {webSocketData?.total[item]
        ? item?.includes("%") || item === "BudgetvsACT_FCT"
          ? `${Number(webSocketData?.total[item])?.toLocaleString("en-US")} %`
          : Number(webSocketData?.total[item])?.toLocaleString("en-US", {})
        : null}
    </>
  );
}
