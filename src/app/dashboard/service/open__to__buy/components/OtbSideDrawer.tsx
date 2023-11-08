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
import { OtbContext } from "./OtbController";
import { OtbFilterForm } from "./OtbForm";

export function OtbSideDrawer() {
  const { mainFilters, setMainFilters } = useContext(OtbContext);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={"whitespace-nowrap ml-2 mt-2 h-9"} value={"OTB"}>
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="mb-2">
            <SheetTitle>OTB Filters</SheetTitle>
          </SheetHeader>
          <OtbFilterForm />

          <SheetFooter className="justify-start">
            <small>
              After submitting this form, OTB Table will be populated.
            </small>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
