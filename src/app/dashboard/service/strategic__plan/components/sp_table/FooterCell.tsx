import { useContext } from "react";
import { SpContext } from "../SpController";

export default function FooterCell({ item }: any) {
  const { webSocketData } = useContext(SpContext);

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
