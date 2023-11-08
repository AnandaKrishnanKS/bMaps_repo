import {
  AlertDialog,
  AlertDialogContent,
} from "@/src/components/shared/alert-dialog";
import { Button } from "@/src/components/shared/button";
import { useContext, useEffect, useState } from "react";
import { SpContext } from "./SpController";
import { NumericFormat } from "react-number-format";

export default function SpMonthlyMixPopup({ open, setOpen }: any) {
  const { dispatchBody, webSocketData, body, forecast_date } =
    useContext(SpContext);
  const forecastedYear = forecast_date?.to
    ? new Date(body?.forecast_date_range?.to)?.getFullYear()
    : 0;
  const [value, setValue] = useState<any>({
    30: 60,
    60: 60,
    90: 25,
    120: 25,
    150: 25,
    180: 25,
    210: 10,
    240: 10,
    270: 10,
    300: 5,
    330: 5,
    360: 5,
  });
  const inputChangeHandler = (e: any) => {
    if (Number(e?.target?.value) <= 100 && Number(e?.target?.value) >= 0) {
      setValue((s: any) => ({
        ...s,
        [e?.target?.name]: Number(e?.target?.value),
      }));
    }
  };

  const onSubmitHandler = (e: any) => {
    dispatchBody({
      type: "SP_MONTHLY_SHARE_MIX_SUBMIT",
      value: value,
    });
    setOpen(false);
  };

  return (
    <div className="  ml-1 mr-2">
      <AlertDialog open={open}>
        <AlertDialogContent>
          <div className="grid grid-cols-2 justify-between mb-3 gap-8">
            {Object?.keys(value)?.map((item: any, index: any) => {
              return (
                <div key={index} className="flex items-center">
                  {`${item}`} :
                  <NumericFormat
                    name={`${item}`}
                    // value={value[item]}
                    value={
                      Object?.keys(body)?.length
                        ? body?.share_per?.values[item]
                        : 0
                    }
                    className=" ml-2 h-9 w-40 bg-tan-light text-center"
                    onChange={inputChangeHandler}
                  ></NumericFormat>
                  %
                </div>
              );
            })}
          </div>

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
