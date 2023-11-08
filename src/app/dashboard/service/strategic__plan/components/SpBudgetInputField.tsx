import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { SpContext } from "./SpController";

export default function SpBudgetInputField() {
  const [value, setValue] = useState("");

  const {
    body,
    dispatchBody,
    transformedData,
    webSocketData,
    loading,
    totalBudget,
    setTotalBudget,
  } = useContext(SpContext);

  const onBlur = () => {};

  const onKeyDown = (e: any): any => {
    if (e.keyCode === 13 && totalBudget) {
      // table.options.meta?.updateData(row.index, column.id, value);
      dispatchBody({
        type: "SP_TOTAL_BUDGET_SUBMIT",
        payload: {
          total_budget: String(totalBudget)?.replace(/\,/g, ""),
          price: webSocketData?.total["Price"],
        },
      });
    }
  };

  return (
    <div className="mt-2 text-lg ">
      <b>Total Budget: </b>
      <NumericFormat
        onKeyDown={onKeyDown}
        disabled={!webSocketData?.data?.length}
        onBlur={onBlur}
        onChange={(e) => {
          setTotalBudget(e.target.value);
        }}
        className={
          webSocketData?.data?.length
            ? `border-2 border-black text-center bg-tan-light px-2 my-1 text-black`
            : `border-2 border-black text-center bg-gray-300 px-2 my-1 text-black`
        }
        value={body?.total_budget?.value ? body?.total_budget?.value : 0}
        // value={totalBudget === null ? "" : totalBudget}
        allowLeadingZeros={false}
        thousandSeparator=","
        decimalScale={2}
      />
    </div>
  );
}
