import { useContext } from "react";
import { BudgetContext } from "../BudgetController";

export default function FooterCell({ item }: any) {
  const { webSocketData } = useContext(BudgetContext);

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
