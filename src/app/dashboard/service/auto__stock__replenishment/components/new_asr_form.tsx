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
  FormMessage,
} from "@/components/shared/form";
import { MultiSelectDD } from "@/components/shared/multi-select-dropdown";
import { MultiSelectDD_Large } from "@/src/components/shared/multi-select-dropdown-large";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";
import { tw_style_merge } from "@/src/lib/utils";
import {
  DateRangePicker,
  DateRange,
} from "@/components/shared/date-range-picker";
import { Separator } from "@/components/shared/separator";
import { Skeleton } from "@/src/components/shared/skeleton";
import { toast } from "@/src/components/shared/use-toast";

import { getMasterFilters } from "@/app/api/master_data";
import { ScrollArea } from "@/components/shared/scroll-area";

const formSchema = z.object({
  history_dates: z.string(),
  forcast_dates: z.string(),
});

export function NewASR_Form() {
  const [sales_channel, setSalesChannel] = useState<(string | number)[]>([]);
  const [selected_sales_channel, setSelectedSalesChannel] = useState<
    (string | number)[]
  >([]);

  const [product_families, setProductFamilies] = useState<(string | number)[]>(
    []
  );
  const [selected_product_families, setSelectedProductFamilies] = useState<
    (string | number)[]
  >([]);

  const [product_sub_families, setProductSubFamilies] = useState<
    (string | number)[]
  >([]);
  const [selected_product_sub_families, setSelectedProductSubFamilies] =
    useState<(string | number)[]>([]);

  const [product_brand, setProductBrand] = useState<(string | number)[]>([]);
  const [selected_product_brand, setSelectedProductBrand] = useState<
    (string | number)[]
  >([]);

  const [product_category, setProductCategory] = useState<(string | number)[]>(
    []
  );
  const [selected_product_category, setSelectedProductCategory] = useState<
    (string | number)[]
  >([]);

  const [product_sub_category, setProductSubCategory] = useState<
    (string | number)[]
  >([]);
  const [selected_product_sub_category, setSelectedProductSubCategory] =
    useState<(string | number)[]>([]);

  const [store_region, setStoreRegion] = useState<(string | number)[]>([]);
  const [selected_store_region, setSelectedStoreRegion] = useState<
    (string | number)[]
  >([]);

  const [store_grading, setStoreGrading] = useState<(string | number)[]>([]);
  const [selected_store_grading, setSelectedStoreGrading] = useState<
    (string | number)[]
  >([]);

  const [store_list, setStoreList] = useState<(string | number)[]>([]);
  const [selected_store_list, setSelectedStoreList] = useState<
    (string | number)[]
  >([]);

  const [item_code, setItemCode] = useState<(string | number)[]>([]);
  const [selected_item_code, setSelectedItemCode] = useState<
    (string | number)[]
  >([]);

  const [top_items, setTopItems] = useState<number[]>([1, 2, 3]);
  const [selected_top_items, setSelectedTopItems] = useState<
    (string | number)[]
  >([]);

  const [store_class, setStoreClass] = useState<(string | number)[]>([]);
  const [selected_store_class, setSelectedStoreClass] = useState<
    (string | number)[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      history_dates: "",
      forcast_dates: "",
    },
  });

  const [history_date, setHistoryDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [forcast_date, setForcastDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  async function fetchChannelsData() {
    let sales_channels = await getMasterFilters(["channel"]);
    setSalesChannel(sales_channels.filter_values.channel);
  }
  async function fetchFamilyData() {
    let product_family = await getMasterFilters(["family"]);
    setProductFamilies(product_family.filter_values.family);
  }
  async function fetchSubFamilyData() {
    let sales_channels = await getMasterFilters(["sub_family"]);
    setProductSubFamilies(sales_channels.filter_values.sub_family);
  }
  async function fetchProductBrand() {
    let product_brand = ["nothing here"];
    setProductBrand(product_brand);
  }
  async function fetchCategoryData() {
    let sales_categories = await getMasterFilters(["category"]);
    setProductCategory(sales_categories.filter_values.category);
  }
  async function fetchSubCategoryData() {
    let sub_categories = await getMasterFilters(["sub_category"]);
    setProductSubCategory(sub_categories.filter_values.sub_category);
  }
  async function fetchStoreRegion() {
    let store_region = ["nothing here"];
    setStoreRegion(store_region);
  }
  async function fetchStoreGrading() {
    let product_suppliers = await getMasterFilters(["class"]);
    setStoreGrading(product_suppliers.filter_values.class);
  }
  async function fetchProductSuppliers() {
    let store_list = ["nothing here"];
    setStoreList(store_list);
  }
  async function fetchSKUData() {
    let product_skus = await getMasterFilters(["sku"]);
    setItemCode(product_skus.filter_values.sku);
  }
  async function fetchTopItemsData() {
    let top_items = await getMasterFilters(["top_items"]);
    setTopItems(top_items.filter_values.top_items);
  }
  async function fetchStoreClass() {
    let store_class = await getMasterFilters(["class"]);
    setStoreClass(store_class.filter_values.class);
  }

  useEffect(() => {
    fetchChannelsData();
    fetchFamilyData();
    fetchSubFamilyData();
    fetchProductBrand();
    fetchCategoryData();
    fetchSubCategoryData();
    fetchStoreRegion();
    fetchStoreGrading();
    fetchProductSuppliers();
    fetchSKUData();
    fetchTopItemsData();
    fetchStoreClass();
  }, []);

  function handleSubmit() {
    const data = {
      history_date_range: history_date,
      forcast_date_range: forcast_date,
      selected_sales_channel: selected_sales_channel,
      selected_product_families: selected_product_families,
      selected_product_sub_families: selected_product_sub_families,
      selected_product_brand: selected_product_brand,
      selected_product_category: selected_product_category,
      selected_product_sub_category: selected_product_sub_category,
      selected_store_region: selected_store_region,
      selected_store_grading: selected_store_grading,
      selected_store_list: selected_store_list,
      selected_item_code: selected_item_code,
      selected_top_items: selected_top_items,
      selected_store_class: selected_store_class,
    };
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-primary p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  let all_Filters_Loaded = [
    sales_channel.length > 0,
    product_families.length > 0,
    product_sub_families.length > 0,
    product_brand.length > 0,
    product_category.length > 0,
    product_sub_category.length > 0,
    store_region.length > 0,
    store_grading.length > 0,
    store_list.length > 0,
    item_code.length > 0,
    top_items.length > 0,
    store_class.length > 0,
  ];
  return (
    <>
      <ScrollArea className="h-full w-full">
        {all_Filters_Loaded.every(Boolean) ? (
          <Form {...form}>
            <div className="grid grid-cols-3 justify-between mb-3 gap-8">
              <MultiSelectDD
                title="Sales Channel"
                options={sales_channel}
                selectedValues={selected_sales_channel}
                onSelectChange={setSelectedSalesChannel}
              />
              <MultiSelectDD
                title="Product Family"
                options={product_families}
                selectedValues={selected_product_families}
                onSelectChange={setSelectedProductFamilies}
              />
              <MultiSelectDD
                title="Product Sub Family"
                options={product_sub_families}
                selectedValues={selected_product_sub_families}
                onSelectChange={setSelectedProductSubFamilies}
              />
            </div>
            <div className="grid grid-cols-3 justify-between mb-3 gap-8">
              <MultiSelectDD
                title="Brand / Supplier"
                options={product_brand}
                selectedValues={selected_product_brand}
                onSelectChange={setSelectedProductBrand}
              />
              <MultiSelectDD
                title="Product Category"
                options={product_category}
                selectedValues={selected_product_category}
                onSelectChange={setSelectedProductCategory}
              />
              <MultiSelectDD
                title="Product Sub Category"
                options={product_sub_category}
                selectedValues={selected_product_sub_category}
                onSelectChange={setSelectedProductSubCategory}
              />
            </div>
            <div className="grid grid-cols-3 justify-between mb-3 gap-8">
              <MultiSelectDD
                title="Store Region"
                options={store_region}
                selectedValues={selected_store_region}
                onSelectChange={setSelectedStoreRegion}
              />
              <MultiSelectDD
                title="Store Grading"
                options={store_grading}
                selectedValues={selected_store_grading}
                onSelectChange={setSelectedStoreGrading}
              />
              <MultiSelectDD
                title="Store List"
                options={store_list}
                selectedValues={selected_store_list}
                onSelectChange={setSelectedStoreList}
              />
            </div>
            <div className="grid grid-cols-3 justify-between mb-3 gap-8">
              <MultiSelectDD_Large
                title="Item Code"
                options={item_code}
                selectedValues={selected_item_code}
                onSelectChange={setSelectedItemCode}
              />
              <MultiSelectDD
                title="Top Items"
                options={top_items}
                selectedValues={selected_top_items}
                onSelectChange={setSelectedTopItems}
              />
              <MultiSelectDD
                title="Store Class"
                options={store_class}
                selectedValues={selected_store_class}
                onSelectChange={setSelectedStoreClass}
              />
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
                                <span>Historical Date Range</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 ms-3"
                            align="end"
                          >
                            <DateRangePicker
                              initialFocus
                              mode="range"
                              defaultMonth={history_date?.from}
                              selected={history_date}
                              onSelect={setHistoryDate}
                              numberOfMonths={2}
                              disableAfterToday={true}
                              title={"Pick a Historical Date Range"}
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
                name="forcast_dates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forcast sales data</FormLabel>
                    <FormControl>
                      <div className={"grid gap-2"}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={"outline"}
                              className={tw_style_merge(
                                "w-[260px] justify-start text-left font-normal",
                                !forcast_date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {forcast_date?.from ? (
                                forcast_date.to ? (
                                  <>
                                    {format(forcast_date.from, "dd/MM/yyyy")} -{" "}
                                    {format(forcast_date.to, "dd/MM/yyyy")}
                                  </>
                                ) : (
                                  format(forcast_date.from, "dd/MM/yyyy")
                                )
                              ) : (
                                <span>Forcast Date Range</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <DateRangePicker
                              initialFocus
                              mode="range"
                              defaultMonth={forcast_date?.from}
                              selected={forcast_date}
                              onSelect={setForcastDate}
                              numberOfMonths={2}
                              disableHistoryDatesTill={new Date()}
                              title={"Pick a Forcast Date Range"}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Select date range for the forcast
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <Button type="button" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Form>
        ) : (
          <div>
            <div className="grid grid-cols-3 justify-between my-3 gap-8">
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
              <Skeleton className="w-36 h-8" />
            </div>
            <Skeleton className="w-full h-2" />
            <div className="grid grid-cols-2 justify-between my-3 gap-4">
              <Skeleton className="w-64 h-4" />
              <Skeleton className="w-64 h-4" />
              <Skeleton className="w-64 h-8" />
              <Skeleton className="w-64 h-8" />
            </div>
            <Skeleton className="w-32 h-8 mt-3" />
          </div>
        )}
      </ScrollArea>
    </>
  );
}
