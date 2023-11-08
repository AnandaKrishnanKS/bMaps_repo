import { Button } from "@/src/components/shared/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/shared/sheet";
import { useContext } from "react";
import { KpiContext } from "./KpiController";
import { KpiFilterForm } from "./KpiForm";

export function KpiSideDrawer() {
  const { mainFilters, setMainFilters } = useContext(KpiContext);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={"whitespace-nowrap ml-2 mt-2 h-9"} value={"KPI"}>
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="mb-2">
            <SheetTitle>KPI Filters</SheetTitle>
          </SheetHeader>
          <KpiFilterForm />

          <SheetFooter className="justify-start">
            <small>
              After submitting this form, KPI Table will be populated.
            </small>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
