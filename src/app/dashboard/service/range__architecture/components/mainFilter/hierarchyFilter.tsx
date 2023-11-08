import { useEffect, useContext } from "react";
import { getHierarchicalFilters } from "@/src/app/api/master_data";
import { MultiSelectDD } from "@/src/components/shared/multi-select-dropdown";
import { Skeleton } from "@/src/components/shared/skeleton";
import { RaContext } from "../RaController";

interface FilterProp {
  title: string;
  parent: string;
  filter: string;
}
export default function HierarchyFilter({ title, filter, parent }: FilterProp) {
  const {
    mainFilterOptions,
    setMainFilterOptions,
    mainFilterValues,
    setMainFilterValues,
  } = useContext(RaContext);

  useEffect(() => {
    setMainFilterValues((s: any) => ({ ...s, [filter]: [] }));
    // const includedValues = mainFilterOptions[filter]?.filter((value: any) => {
    //   return mainFilterValues[filter]?.includes(value);
    // });
    if (mainFilterValues[parent]?.length > 0) {
      getHierarchicalFilters({
        filterName: `${parent?.toLowerCase()}2${filter?.toLocaleLowerCase()}`,
        filterData: mainFilterValues[parent] || [],
      })
        .then((response) => {
          setMainFilterOptions((s: any) => ({
            ...s,
            [filter]: response?.filter_values,
          }));
        })
        .catch((err) => console.log({ err }));
    } else {
      setMainFilterOptions((s: any) => ({ ...s, [filter]: [] }));
    }
  }, [mainFilterValues[parent]]);
  function handleChange(e: any) {
    setMainFilterValues((s: any) => ({ ...s, [filter]: e }));
  }

  return mainFilterOptions[parent]?.length ? (
    <MultiSelectDD
      title={title}
      options={mainFilterOptions[filter] || []}
      selectedValues={mainFilterValues[filter] || []}
      onSelectChange={handleChange}
    />
  ) : (
    <Skeleton className="w-36 h-8" />
  );
}
