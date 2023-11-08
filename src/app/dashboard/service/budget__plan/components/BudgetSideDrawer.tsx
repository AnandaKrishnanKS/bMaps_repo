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
import { BudgetContext } from "./BudgetController";
import { BudgetFilterForm } from "./BudgetForm";

export function BudgetSideDrawer() {
  const { mainFilters, setMainFilters } = useContext(BudgetContext);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className={"whitespace-nowrap h-9 mt-2 ml-2"}
            value={"Budget"}
          >
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="mb-2">
            <SheetTitle>Budget Filters</SheetTitle>
          </SheetHeader>
          <BudgetFilterForm />
          <SheetFooter className="justify-start">
            <small>
              After submitting this form, Budget Table will be populated.
            </small>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
