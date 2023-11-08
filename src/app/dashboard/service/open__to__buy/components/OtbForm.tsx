"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shared/form";

import { useForm } from "react-hook-form";
import { useContext } from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";
import { tw_style_merge } from "@/src/lib/utils";
import { Separator } from "@/components/shared/separator";
import { toast } from "@/src/components/shared/use-toast";
import { OtbContext } from "./OtbController";
import MainFilters from "./mainFilter/mainFilter";
import HierarchyFilter from "./mainFilter/hierarchyFilter";
import { SheetClose } from "@/src/components/shared/sheet";
import { DateRangePicker } from "@/src/components/shared/date-range-picker";

const formSchema = z.object({
  history_dates: z.string(),
  forecast_dates: z.string(),
});

export function OtbFilterForm() {
  const {
    mainFilterValues,
    dispatchBody,
    setExpandHistory,
    history_date,
    setHistoryDate,
    forecast_date,
    setForecastDate,
    setWebSocketData,
  } = useContext(OtbContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      history_dates: "",
      forecast_dates: "",
    },
  });
  //
  function handleSubmit() {
    setWebSocketData({});
    // used "fro" because "from" is a keyword at backend.
    setExpandHistory([]);
    const historyAndForecastData = {
      history_date_range: {
        fro: history_date?.from ? format(history_date?.from, "yyyy-MM-dd") : "",
        to: history_date?.to ? format(history_date?.to, "yyyy-MM-dd") : "",
      },
      forecast_date_range: {
        fro: forecast_date?.from
          ? format(forecast_date?.from, "yyyy-MM-dd")
          : "",
        to: forecast_date?.to ? format(forecast_date?.to, "yyyy-MM-dd") : "",
      },
    };
    const otherFilters: any = {
      sales_channel: mainFilterValues?.channel ?? [],
      product_family: mainFilterValues?.family ?? [],
      sub_families: mainFilterValues?.sub_family ?? [],
      suppliers: mainFilterValues?.suppliers ?? [],
      category: mainFilterValues?.category ?? [],
      sub_category: mainFilterValues?.sub_category ?? [],
      sku: mainFilterValues?.sku ?? [],
      top_items: mainFilterValues?.top_items ?? [],
      store_class: mainFilterValues?.class ?? [],
    };
    // // dont change order
    // const hierarchialOrder = [
    //   "sales_channel",
    //   "product_family",
    //   "sub_families",
    //   "suppliers",
    //   "category",
    //   "sub_category",
    //   "sku",
    //   "top_items",
    //   "store_class",
    // ];
    const group_by = Object?.keys(otherFilters)?.filter((item, index) => {
      return otherFilters[item]?.length > 0;
    });
    // function groupBy() {
    //   let _arr: any = [];
    //   Object?.keys(otherFilters)?.map((item, index) => {
    //     if (otherFilters[item]?.length > 0) {
    //       _arr = hierarchialOrder?.slice(0, index + 1);
    //     }
    //   });
    //   return _arr;
    // }

    const additionalData = {
      page_number: 0,
      page_size: 10,
      fetch_from_db: true,
      group_by: { status: true, columns: group_by ?? [] },
      expand: { status: false, row: {} },
      sort: {},
      table_changes: {},
      secondary_filter: {
        historical_year: [],
        budget_year: [],
        season: [],
        country: [],
        region: [],
        area: [],
        city: [],
        store: [],
        month: [],
        week: [],
        date: [],
      },
    };
    const data = {
      ...historyAndForecastData,
      ...otherFilters,
      ...additionalData,
    };
    if (
      history_date?.from &&
      history_date?.to &&
      forecast_date?.from &&
      forecast_date?.to
    ) {
      dispatchBody({ type: "FILTER_SUBMIT", data: data });
      // setLoading(true);
    } else if (!(history_date?.from && history_date?.to)) {
      toast({
        variant: "destructive",
        description: "Select Start and End date for Historical Data.",
      });
    } else if (!(forecast_date?.from && forecast_date?.to)) {
      toast({
        variant: "destructive",
        description: "Select Start and End date for Forecast Data.",
      });
    }

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         {JSON.stringify(
    //           { ...historyAndForecastData, ...otherFilters },
    //           null,
    //           2
    //         )}
    //       </code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <div className="grid grid-cols-3 justify-between mb-3 gap-8">
        <MainFilters title="Sales Channel" filter="channel" />
        <MainFilters title="Product Family" filter="family" />
        <HierarchyFilter
          title="Product Sub Family"
          filter="sub_family"
          parent="family"
        />
        <MainFilters title="Brand / Supplier" filter="suppliers" />
        <MainFilters title="Product Category" filter="category" />
        <HierarchyFilter
          title="Product Sub Category"
          filter="sub_category"
          parent="category"
        />
        <MainFilters title="Item Code" filter="sku" />
        <MainFilters title="Top Items" filter="top_items" />
        <MainFilters title="Store Class" filter="class" />
      </div>

      <Separator />
      <div className="flex flex-row justify-between my-3 gap-8">
        <FormField
          control={form.control}
          name="history_dates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>History sales data</FormLabel>
              <FormControl>
                <div className={"grid gap-2"}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={tw_style_merge(
                          "w-[260px] justify-start text-left font-normal",
                          !history_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {history_date?.from ? (
                          history_date.to ? (
                            <>
                              {format(history_date.from, "dd/MM/yyyy")} -{" "}
                              {format(history_date.to, "dd/MM/yyyy")}
                            </>
                          ) : (
                            format(history_date.from, "dd/MM/yyyy")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <DateRangePicker
                        initialFocus
                        mode="range"
                        defaultMonth={history_date?.from}
                        selected={history_date}
                        onSelect={setHistoryDate}
                        numberOfMonths={2}
                        disableAfterToday={true}
                        title={"Pick Historical Date Range"}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormDescription>
                Select date range for the sales history to use
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="forecast_dates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>forecast sales data</FormLabel>
              <FormControl>
                <div className={"grid gap-2"}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={tw_style_merge(
                          "w-[260px] justify-start text-left font-normal",
                          !forecast_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {forecast_date?.from ? (
                          forecast_date.to ? (
                            <>
                              {format(forecast_date.from, "dd/MM/yyyy")} -{" "}
                              {format(forecast_date.to, "dd/MM/yyyy")}
                            </>
                          ) : (
                            format(forecast_date.from, "dd/MM/yyyy")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <DateRangePicker
                        initialFocus
                        mode="range"
                        defaultMonth={forecast_date?.from}
                        selected={forecast_date}
                        onSelect={setForecastDate}
                        numberOfMonths={2}
                        disableHistoryDatesTill={new Date()}
                        title={"Pick a Forcast Date Range"}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormDescription>
                Select date range for the forecast
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
      <SheetClose>
        <Button type="button" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </SheetClose>
    </Form>
  );
}
