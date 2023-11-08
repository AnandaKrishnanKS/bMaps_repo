import { useContext, useEffect, useState } from "react";
import { KpiContext } from "../KpiController";
import { NumericFormat } from "react-number-format";
import { Icons } from "@/src/components/icons";

export const EditableTableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const { body, dispatchBody, transformedData, webSocketData, loading } =
    useContext(KpiContext);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    setValue(transformedData[row.index][column.id]);
  };

  const onKeyDown = (e: any): any => {
    if (
      e.keyCode === 13 &&
      Number(transformedData[row.index][column.id]) !==
        Number(String(value)?.replace(/\,/g, ""))
    ) {
      // table.options.meta?.updateData(row.index, column.id, value);
      dispatchBody({
        type: "EDIT_FIELD_SUBMIT",
        payload: { row, column, value: String(value)?.replace(/\,/g, "") },
      });
      setShowSpinner(true);
    }
  };
  useEffect(() => {
    if (!loading) {
      setShowSpinner(false);
    }
  }, [loading]);
  return (
    <div className=" my-1 mx-1 bg-tan-light px-2 flex justify-center items-center">
      {showSpinner ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <NumericFormat
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={
            (column.id === "Budget%" && transformedData.length === 1) || loading
          }
          className={
            column.id === "Budget%" && transformedData.length === 1
              ? " text-center bg-slate-200 px-2 my-1 text-black "
              : " text-center bg-tan-light px-2 my-1 text-black "
          }
          value={value === null ? "" : value}
          allowLeadingZeros={false}
          thousandSeparator=","
          decimalScale={2}
        />
      )}
      {column.id?.includes("%") || column.id === "BudgetvsACT_FCT" ? "%" : null}
    </div>
  );
};
