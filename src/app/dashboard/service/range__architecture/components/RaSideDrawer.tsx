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
import { RaContext } from "./RaController";
import { RaFilterForm } from "./RaForm";

export function RaSideDrawer() {
  const { mainFilters, setMainFilters } = useContext(RaContext);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={"whitespace-nowrap m-2 h-9"} value={"RA"}>
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="mb-2">
            <SheetTitle>RA Filters</SheetTitle>
          </SheetHeader>
          <RaFilterForm />

          <SheetFooter className="justify-start">
            <small>
              After submitting this form, RA Table will be populated.
            </small>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
