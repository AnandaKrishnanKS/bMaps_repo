import { MultiSelectDD } from "@/src/components/shared/multi-select-dropdown";
import { useContext } from "react";
import { OtbContext } from "../OtbController";
import { getSecondaryFilters } from "@/src/app/api/common";

export default function SecondaryFilter({ title, keyName, options }: any) {
  const { body, dispatchBody, webSocketData, activeTab, setSecondaryFilters } =
    useContext(OtbContext);
  function onOpenChange(e: boolean) {
    if (e && webSocketData?.data?.length && activeTab === "otbBudgetValue") {
      getSecondaryFilters({
        port: Number(process.env.NEXT_PUBLIC_OTB_PORT),
        service: "otb",
      })
        .then((response: any) => {
          setSecondaryFilters(response?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className=" mr-2 mt-2">
      <MultiSelectDD
        onOpenchange={onOpenChange}
        title={title}
        options={
          options
            ?.filter((item: any) => {
              if (item) {
                return item;
              }
            })
            ?.map((item: any, index: any) => String(item)) ?? []
        }
        selectedValues={
          body?.secondary_filter ? body?.secondary_filter[keyName] : [] || []
        }
        onSelectChange={(e) => {
          const val = e?.map((item, index) => String(item));
          dispatchBody({
            type: "SECONDARY_FILTER",
            payload: { key: keyName, value: val },
          });
        }}
      />
    </div>
  );
}
