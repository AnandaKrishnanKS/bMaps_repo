import { useEffect, useContext } from "react";
import { getMasterFilters } from "@/src/app/api/master_data";
import { OtbContext } from "@/src/app/dashboard/service/open__to__buy/components/OtbController";
import { MultiSelectDD } from "@/src/components/shared/multi-select-dropdown";
import { MultiSelectDD_Large } from "@/src/components/shared/multi-select-dropdown-large";
import { Skeleton } from "@/src/components/shared/skeleton";

interface FilterProp {
  title: string;
  filter: string;
}
export default function MainFilters({ title, filter }: FilterProp) {
  const {
    mainFilterOptions,
    setMainFilterOptions,
    mainFilterValues,
    setMainFilterValues,
  } = useContext(OtbContext);

  useEffect(() => {
    if (!mainFilterOptions[filter]) {
      getMasterFilters([filter])
        .then((resp: any) => {
          setMainFilterOptions((s: any) => ({
            ...s,
            [filter]: resp?.filter_values[filter],
          }));
        })
        .catch((err) => console.log({ err }));
    }
  }, [mainFilterOptions[filter]]);
  function handleChange(e: any) {
    setMainFilterValues((s: any) => ({ ...s, [filter]: e }));
  }

  return mainFilterOptions[filter]?.length ? (
    mainFilterOptions[filter]?.length > 150 ? (
      <MultiSelectDD_Large
        title={title}
        options={mainFilterOptions[filter] || []}
        selectedValues={mainFilterValues[filter] || []}
        onSelectChange={handleChange}
      />
    ) : (
      <MultiSelectDD
        title={title}
        options={mainFilterOptions[filter] || []}
        selectedValues={mainFilterValues[filter] || []}
        onSelectChange={handleChange}
      />
    )
  ) : (
    <Skeleton className="w-36 h-8" />
  );
}
