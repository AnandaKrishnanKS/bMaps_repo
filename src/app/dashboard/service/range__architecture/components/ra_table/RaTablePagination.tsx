import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/shared/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { useContext, useEffect } from "react";
import { RaContext } from "../RaController";
import { json2csv } from "json-2-csv";

export function DataTablePagination({ table }: any) {
  const { body, dispatchBody, webSocketData, transformedData } =
    useContext(RaContext);
  const totalElements = webSocketData?.data?.length ? webSocketData?.items : 0;
  const totalPage = Math.ceil(totalElements / body?.page_size);
  const exportButtonHandler = async () => {
    try {
      const csv = await json2csv(transformedData);
      const url = window.URL.createObjectURL(new Blob([csv]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${"ra.csv"}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        <Button disabled={true} className=" bg-green-700">
          Save
        </Button>
        <Button
          onClick={exportButtonHandler}
          disabled={!transformedData?.length}
          className=" ml-2 bg-blue-700"
        >
          Export
        </Button>
      </div>
      {body?.page_number >= 0 ? (
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Total Rows: {totalElements}
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Page Size</p>
            <Select
              value={`${body?.page_size}`}
              onValueChange={(value) => {
                dispatchBody({ type: "PAGE_SIZE", value: value });
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={body?.page_size} />
              </SelectTrigger>
              <SelectContent side="top">
                {[
                  10,
                  15,
                  20,
                  50,
                  100,
                  totalElements > 100 ? totalElements : null,
                ]
                  ?.filter((item) => {
                    if (item) {
                      return item;
                    }
                  })
                  .map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {body?.page_number + 1} of {totalPage ? totalPage : 1}
            {/* Page {body?.page_number + 1} of {table.getPageCount()} */}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                dispatchBody({ type: "PAGE_NUMBER", value: 0 });
              }}
              disabled={body?.page_number <= 0}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                dispatchBody({
                  type: "PAGE_NUMBER",
                  value: body?.page_number - 1,
                });
              }}
              disabled={body?.page_number <= 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                dispatchBody({
                  type: "PAGE_NUMBER",
                  value: body?.page_number + 1,
                });
              }}
              disabled={body?.page_number >= totalPage - 1}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                dispatchBody({
                  type: "PAGE_NUMBER",
                  value: totalPage - 1,
                });
              }}
              disabled={body?.page_number >= totalPage - 1}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
