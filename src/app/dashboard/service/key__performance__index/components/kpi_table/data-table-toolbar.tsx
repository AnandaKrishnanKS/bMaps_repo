"use client";

import { DataTableViewOptions } from "./data-table-view-options";
import { KpiSideDrawer } from "../KpiSideDrawer";
import { useContext, useEffect, useState } from "react";
import { KpiContext } from "../KpiController";
import { KpiTopDrawer } from "../kpi_graph/KpiTopDrawer";
import SecondaryFilter from "./SecondaryFilter";
import { getSecondaryFilters } from "@/src/app/api/common";

export function DataTableToolbar({ table }: any) {
  const {
    body,
    webSocketData,
    activeTab,
    secondaryFilters,
    setSecondaryFilters,
  } = useContext(KpiContext);

  // useEffect(() => {
  //   if (
  //     // body?.fetch_from_db &&
  //     webSocketData?.data?.length &&
  //     activeTab === "otbBudgetValue"
  //   ) {
  //     getSecondaryFilters({ port: 3000, service: "otb" })
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
          keyName="historical_year"
          title={"Historical Year"}
        />
        <SecondaryFilter
          options={secondaryFilters?.budget_year ?? []}
          keyName="budget_year"
          title={"Budget Year"}
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
          options={secondaryFilters?.date ?? []}
          keyName="date"
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
          keyName="store"
          title={"Store"}
        />
        <SecondaryFilter
          options={secondaryFilters?.city ?? []}
          keyName="city"
          title={"City"}
        />
        <SecondaryFilter
          options={secondaryFilters?.country ?? []}
          keyName="country"
          title={"Country"}
        />
      </div>

      <KpiSideDrawer />
      <KpiTopDrawer />
      <DataTableViewOptions table={table} />
    </div>
  );
}
