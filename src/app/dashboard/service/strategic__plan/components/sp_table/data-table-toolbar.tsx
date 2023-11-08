"use client";

import { DataTableViewOptions } from "./data-table-view-options";
import { SpSideDrawer } from "../SpSideDrawer";
import { useContext, useEffect, useState } from "react";
import { SpContext } from "../SpController";
import { SpTopDrawer } from "../sp_graph/SpTopDrawer";
import SecondaryFilter from "./SecondaryFilter";
import { getSecondaryFilters } from "@/src/app/api/common";
import SpYearPopup from "../SpYearPopup";
import SpInputDropdown from "../SpInputDropDown";

export function DataTableToolbar({ table }: any) {
  const {
    body,
    webSocketData,
    activeTab,
    secondaryFilters,
    setSecondaryFilters,
  } = useContext(SpContext);

  // useEffect(() => {
  //   if (
  //     // body?.fetch_from_db &&
  //     webSocketData?.data?.length &&
  //     activeTab === "spBudgetValue"
  //   ) {
  //     getSecondaryFilters({ port: 5000, service: "sp" })
  //       .then((response: any) => {
  //         setSecondaryFilters(response?.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [
  //   // body,
  //   webSocketData,
  // ]);

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-wrap flex-1 items-center ">
        <SecondaryFilter
          options={secondaryFilters?.history_year ?? []}
          keyName="HistoricalYear"
          title={"Historical Year"}
        />
        <SecondaryFilter
          options={secondaryFilters?.budget_year ?? []}
          keyName="BudgetYear"
          title={"Budget Year"}
        />
        <SecondaryFilter
          options={secondaryFilters?.Quarter ?? []}
          keyName="Quarter"
          title={"Quarter"}
        />
        <SecondaryFilter
          options={secondaryFilters?.month ?? []}
          keyName="month"
          title={"Month"}
        />
        <SecondaryFilter
          options={secondaryFilters?.week ?? []}
          keyName="week"
          title={"Week"}
        />
        <SecondaryFilter
          options={secondaryFilters?.Day ?? []}
          keyName="Day"
          title={"Day"}
        />
        <SecondaryFilter
          options={secondaryFilters?.date ?? []}
          keyName="BudgetDate"
          title={"Date"}
        />
        <SecondaryFilter
          options={secondaryFilters?.season ?? []}
          keyName="season"
          title={"Season"}
        />
        <SecondaryFilter
          options={secondaryFilters?.region ?? []}
          keyName="region"
          title={"Region"}
        />
        <SecondaryFilter
          options={secondaryFilters?.area ?? []}
          keyName="area"
          title={"Area"}
        />
        <SecondaryFilter
          options={secondaryFilters?.store ?? []}
          keyName="Store_Name"
          title={"Store"}
        />
        {/* <SecondaryFilter
          options={secondaryFilters?.city ?? []}
          keyName="city"
          title={"City"}
        />
        <SecondaryFilter
          options={secondaryFilters?.country ?? []}
          keyName="country"
          title={"Country"}
        /> */}
      </div>

      <SpSideDrawer />
      <SpInputDropdown />
      {/* <SpTopDrawer /> */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
