import {
  AlertDialog,
  AlertDialogContent,
} from "@/src/components/shared/alert-dialog";
import { Button } from "@/src/components/shared/button";
import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { RaContext } from "./RaController";

export default function RaInputPopUp({ open, setOpen }: any) {
  const { dispatchBody, webSocketData, body } = useContext(RaContext);
  const [value, setValue] = useState<any>({
    "desired_st%": 0,
    "desired_growth%": 0,
    "desired_markdown%": 0,
    "tail%>": 0,
    "st>70%mix": 0,
    "top&normal%mix": 0,
    forecast_net_sales: 0,
    forecast_sku: 0,
  });
  const inputChangeHandler = (e: any) => {
    if (
      Number(e?.target?.value) <= 100 &&
      Number(e?.target?.value) >= 0 &&
      e?.target?.name !== "forecast_net_sales" &&
      e?.target?.name !== "forecast_sku"
    ) {
      setValue((s: any) => ({
        ...s,
        [e?.target?.name]: Number(e?.target?.value),
      }));
    } else if (
      e?.target?.name === "forecast_net_sales" ||
      e?.target?.name === "forecast_sku"
    ) {
      setValue((s: any) => ({
        ...s,
        [e?.target?.name]: Number(e?.target?.value),
      }));
    }
  };

  const onSubmitHandler = (e: any) => {
    dispatchBody({
      type: "RA_INPUT_FIELD_SUBMIT",
      value: value,
    });
    setOpen(false);
  };

  return (
    <div className="ml-1 mr-2">
      <AlertDialog open={open}>
        <AlertDialogContent>
          <div className="grid grid-cols-2 justify-between mb-3 gap-8">
            <div className="ml-3 flex flex-col justify-center items-center">
              <div className="text-sm font-semibold">Desired Sellthrough%:</div>
              <div className=" flex items-center">
                <NumericFormat
                  name={"desired_st%"}
                  value={
                    Object?.keys(body)?.length
                      ? body?.input_field["desired_st%"]
                      : 0
                  }
                  className=" border-2 border-gray-500  h-9 w-40 bg-tan-light text-center"
                  onChange={inputChangeHandler}
                ></NumericFormat>
                <strong>%</strong>
              </div>
            </div>
            <div className="ml-3 flex flex-col justify-center items-center">
              <div className="text-sm font-semibold">Desired Growth%:</div>
              <div className=" flex items-center">
                <NumericFormat
                  name={"desired_growth%"}
                  value={
                    Object?.keys(body)?.length
                      ? body?.input_field["desired_growth%"]
                      : 0
                  }
                  className=" border-2 border-gray-500   h-9 w-40 bg-tan-light text-center"
                  onChange={inputChangeHandler}
                ></NumericFormat>
                <strong>%</strong>
              </div>
            </div>
            <div className="ml-3 flex flex-col justify-center items-center">
              <div className="text-sm font-semibold">Desired Markdown%:</div>
              <div className=" flex items-center">
                <NumericFormat
                  name={"desired_markdown%"}
                  value={
                    Object?.keys(body)?.length
                      ? body?.input_field["desired_markdown%"]
                      : 0
                  }
                  className=" border-2 border-gray-500   h-9 w-40 bg-tan-light text-center"
                  onChange={inputChangeHandler}
                ></NumericFormat>
                <strong>%</strong>
              </div>
            </div>
            <div className="ml-3 flex flex-col justify-center items-center">
              <div className="text-sm font-semibold"> Tail%{`>`}:</div>
              <div className=" flex items-center">
                <NumericFormat
                  name={"tail%>"}
                  value={
                    Object?.keys(body)?.length ? body?.input_field["tail%>"] : 0
                  }
                  className=" border-2 border-gray-500   h-9 w-40 bg-tan-light text-center"
                  onChange={inputChangeHandler}
                ></NumericFormat>
                <strong>%</strong>
              </div>
            </div>
            <div className="ml-3 flex flex-col justify-center items-center">
              <div className="text-sm font-semibold">ST{`>`}70% Mix:</div>{" "}
              <div className=" flex items-center">
                <NumericFormat
                  name={"st>70%mix"}
                  value={
                    Object?.keys(body)?.length
                      ? body?.input_field["st>70%mix"]
                      : 0
                  }
                  className=" border-2 border-gray-500   h-9 w-40 bg-tan-light text-center"
                  onChange={inputChangeHandler}
                ></NumericFormat>
                <strong>%</strong>
              </div>
            </div>
            <div className="ml-3 flex flex-col justify-center items-center">
              <div className="text-sm font-semibold">Top&Normal% Mix:</div>{" "}
              <div className=" flex items-center">
                <NumericFormat
                  name={"top&normal%mix"}
                  value={
                    Object?.keys(body)?.length
                      ? body?.input_field["top&normal%mix"]
                      : 0
                  }
                  className=" border-2 border-gray-500   h-9 w-40 bg-tan-light text-center"
                  onChange={inputChangeHandler}
                ></NumericFormat>
                <strong>%</strong>
              </div>
            </div>

            <div className=" flex flex-col justify-center items-center">
              <div className="text-sm font-semibold">
                Top&Forecast Net sales:
              </div>
              <NumericFormat
                name={"forecast_net_sales"}
                value={
                  Object?.keys(body)?.length
                    ? body?.input_field["forecast_net_sales"]
                    : 0
                }
                className=" border-2 border-gray-500   h-9 w-40 bg-tan-light text-center"
                onChange={inputChangeHandler}
              ></NumericFormat>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-sm font-semibold">Forecast SKU:</div>
              <NumericFormat
                name={"forecast_sku"}
                value={
                  Object?.keys(body)?.length
                    ? body?.input_field["forecast_sku"]
                    : 0
                }
                className="  border-2 border-gray-500  h-9 w-40 bg-tan-light text-center"
                onChange={inputChangeHandler}
              ></NumericFormat>
            </div>
          </div>{" "}
          <Button onClick={onSubmitHandler} color="red">
            Submit
          </Button>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
