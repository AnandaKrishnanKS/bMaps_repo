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
import { SpContext } from "./SpController";
import { SpFilterForm } from "./SpForm";

export function SpSideDrawer() {
  const { mainFilters, setMainFilters } = useContext(SpContext);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={"whitespace-nowrap ml-2 mt-2 h-9"} value={"SP"}>
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="mb-2">
            <SheetTitle>Strategic Plan Filters</SheetTitle>
          </SheetHeader>
          <SpFilterForm />

          <SheetFooter className="justify-start">
            <small>
              After submitting this form, SP Table will be populated.
            </small>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
