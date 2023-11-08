import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { SpContext } from "./SpController";

export default function SpQuantityInputField() {
  const {
    dispatchBody,
    webSocketData,
    totalQuantity,
    setTotalQuantity,
    transformedData,
    body,
  } = useContext(SpContext);

  const onBlur = () => {};

  const onKeyDown = (e: any): any => {
    if (e.keyCode === 13 && totalQuantity) {
      // table.options.meta?.updateData(row.index, column.id, value);
      dispatchBody({
        type: "SP_TOTAL_QUANTITY_SUBMIT",
        payload: {
          total_quantity: String(totalQuantity)?.replace(/\,/g, ""),
          price: webSocketData?.total["Price"],
        },
      });
    }
  };
  return (
    <div className="mt-2 text-lg ">
      <b>Total Quantity: </b>
      <NumericFormat
        onKeyDown={onKeyDown}
        disabled={!webSocketData?.data?.length}
        onBlur={onBlur}
        onChange={(e) => {
          setTotalQuantity(e.target.value);
        }}
        className={
          webSocketData?.data?.length
            ? `border-2 border-black text-center bg-tan-light px-2 my-1 text-black`
            : `border-2 border-black text-center bg-gray-300 px-2 my-1 text-black`
        }
        // value={totalQuantity === null ? "" : totalQuantity}
        value={body?.total_quantity?.value ? body?.total_quantity?.value : 0}
        allowLeadingZeros={false}
        thousandSeparator=","
        decimalScale={2}
      />
    </div>
  );
}
