"use client";

import { DataTableViewOptions } from "./data-table-view-options";
import { RaSideDrawer } from "../RaSideDrawer";
import { useContext, useEffect, useState } from "react";
import { RaContext } from "../RaController";
import { RaTopDrawer } from "../ra_graph/RaTopDrawer";
import SecondaryFilter from "./SecondaryFilter";
import { getSecondaryFilters } from "@/src/app/api/common";
import RaInputPopUp from "../RaInputPopUp";
import { Input } from "@/src/components/shared/input";
import { Label } from "@/src/components/shared/label";
import RaInputDropDown from "../RaInputDropDown";

export function DataTableToolbar({ table }: any) {
  const {
    body,
    webSocketData,
    activeTab,
    secondaryFilters,
    setSecondaryFilters,
  } = useContext(RaContext);

  // useEffect(() => {
  //   if (
  //     // body?.fetch_from_db &&
  //     webSocketData?.data?.length &&
  //     activeTab === "raBudgetValue"
  //   ) {
  //     getSecondaryFilters({ port: 3900, service: "range" })
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

      {/* <Input id="file" type="file" /> */}

      <RaSideDrawer />
      <RaInputDropDown />
      {/* <RaInputPopUp /> */}
      {/* <RaTopDrawer /> */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
