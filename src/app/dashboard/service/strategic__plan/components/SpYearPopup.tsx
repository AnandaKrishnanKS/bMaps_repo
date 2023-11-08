import {
  AlertDialog,
  AlertDialogContent,
} from "@/src/components/shared/alert-dialog";
import { Button } from "@/src/components/shared/button";
import { useContext, useEffect, useState } from "react";
import { SpContext } from "./SpController";
import { NumericFormat } from "react-number-format";

export default function SpYearPopup({ open, setOpen }: any) {
  const { dispatchBody, webSocketData, body, forecast_date } =
    useContext(SpContext);

  const forecastedYear = forecast_date?.to
    ? new Date(body?.forecast_date_range?.to)?.getFullYear()
    : 0;
  const [value, setValue] = useState<any>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const inputChangeHandler = (e: any) => {
    if (Number(e?.target?.value) <= 100 && Number(e?.target?.value) >= 0) {
      setValue((s: any) => ({
        ...s,
        [e?.target?.name]: Number(e?.target?.value),
      }));
    }
  };

  useEffect(() => {
    // For disabling input% field if previous year % is 0
    let k = { ...value };
    for (let i = 1; i <= 5; i++) {
      if (k[i] <= 0 && i !== 5) {
        k = { ...k, [i + 1]: 0 };
      }
    }
    setValue((s: any) => ({ ...s, ...k }));
  }, [JSON?.stringify(value)]);

  const onSubmitHandler = (e: any) => {
    dispatchBody({
      type: "SP_ADD_YEAR_SUBMIT",
      value: value,
    });
    setOpen(false);
  };

  return (
    <div className="  ml-1 mr-2">
      <AlertDialog open={open}>
        <AlertDialogContent>
          <div className="flex items-center">
            {forecastedYear + 1} :
            <NumericFormat
              name={"1"}
              value={value["1"]}
              className=" ml-2 h-9 w-40 bg-tan-light text-center"
              // className={`ml-2 h-9 w-40 ${} bg-tan-light text-center`}
              onChange={inputChangeHandler}
            ></NumericFormat>
            %
          </div>
          <div className="flex items-center">
            {forecastedYear + 2} :
            <NumericFormat
              name={"2"}
              disabled={value[1] <= 0}
              value={value["2"]}
              className={`ml-2 h-9 w-40 ${
                value[1] <= 0 ? "bg-gray-400" : "bg-tan-light"
              }  text-center`}
              onChange={inputChangeHandler}
            ></NumericFormat>
            %
          </div>
          <div className="flex items-center">
            {forecastedYear + 3} :
            <NumericFormat
              name={"3"}
              disabled={value[2] <= 0}
              value={value["3"]}
              className={`ml-2 h-9 w-40 ${
                value[2] <= 0 ? "bg-gray-400" : "bg-tan-light"
              }  text-center`}
              onChange={inputChangeHandler}
            ></NumericFormat>
            %
          </div>
          <div className="flex items-center">
            {forecastedYear + 4} :
            <NumericFormat
              name={"4"}
              disabled={value[3] <= 0}
              value={value["4"]}
              className={`ml-2 h-9 w-40 ${
                value[3] <= 0 ? "bg-gray-400" : "bg-tan-light"
              }  text-center`}
              onChange={inputChangeHandler}
            ></NumericFormat>
            %
          </div>
          <div className="flex items-center">
            {forecastedYear + 5} :
            <NumericFormat
              name={"5"}
              disabled={value[4] <= 0}
              value={value["5"]}
              className={`ml-2 h-9 w-40 ${
                value[4] <= 0 ? "bg-gray-400" : "bg-tan-light"
              }  text-center`}
              onChange={inputChangeHandler}
            ></NumericFormat>
            %
          </div>

          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>

          <Button onClick={onSubmitHandler} color="red">
            Submit
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
