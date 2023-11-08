import { useContext } from "react";
import { OtbContext } from "../OtbController";

export default function FooterCell({ item }: any) {
  const { webSocketData } = useContext(OtbContext);

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
