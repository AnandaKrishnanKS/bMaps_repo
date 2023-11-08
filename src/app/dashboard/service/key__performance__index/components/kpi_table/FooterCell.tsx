import { useContext } from "react";
import { KpiContext } from "../KpiController";

export default function FooterCell({ item }: any) {
  const { webSocketData } = useContext(KpiContext);

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
