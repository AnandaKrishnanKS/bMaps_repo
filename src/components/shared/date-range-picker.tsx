"use client";

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import {
  CaptionProps,
  DayPicker,
  DayPickerRangeProps,
  Matcher,
  SelectRangeEventHandler,
} from "react-day-picker";

import { tw_style_merge } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/shared/button";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { ScrollArea } from "./scroll-area";

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export type DateRangePickerProps = DayPickerRangeProps & {
  selected?: DateRange;
  disableAfterToday?: boolean;
  disableHistoryDatesTill?: Date;
  title?: string;
};

interface CustomCaptionProps extends CaptionProps {
  onChange?: (date: Date) => void;
  isSecond: boolean;
  onReset?: () => void;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  disableAfterToday?: boolean;
  disableHistoryDatesTill?: Date;
}

function CustomCaption({
  displayMonth,
  currentMonth,
  setCurrentMonth,
  onReset,
  disableAfterToday,
  disableHistoryDatesTill,
  ...captionProps
}: CustomCaptionProps) {
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  useEffect(() => {
    const today = new Date();
    let shouldDisablePrev = false;
    let shouldDisableNext = false;

    if (
      disableAfterToday &&
      displayMonth.getFullYear() === today.getFullYear() &&
      displayMonth.getMonth() === today.getMonth()
    ) {
      shouldDisableNext = true;
    }

    if (disableHistoryDatesTill) {
      const tillYear = disableHistoryDatesTill.getFullYear();
      const tillMonth = disableHistoryDatesTill.getMonth();
      if (
        currentMonth.getFullYear() === tillYear &&
        currentMonth.getMonth() === tillMonth
      ) {
        shouldDisablePrev = true;
      }
    }

    setDisablePrev(shouldDisablePrev);
    setDisableNext(shouldDisableNext);
  }, [currentMonth, displayMonth, disableAfterToday, disableHistoryDatesTill]);

  const firstMonthName = format(currentMonth, "MMM", { locale: enUS });
  const secondMonthName = format(displayMonth, "MMM", { locale: enUS });

  const monthDisplayText = !captionProps.isSecond
    ? ""
    : currentMonth.getFullYear() === displayMonth.getFullYear()
    ? `${firstMonthName} - ${secondMonthName}, ${displayMonth.getFullYear()}`
    : currentMonth.getMonth() === 11 && displayMonth.getMonth() === 0
    ? `${firstMonthName}, ${currentMonth.getFullYear()} - ${secondMonthName}, ${displayMonth.getFullYear()}`
    : "";
  // Use date-fns to derive month names
  const months: string[] = Array.from({ length: 12 }).map((_, i) =>
    format(new Date(displayMonth.getFullYear(), i), "MMMM", { locale: enUS })
  );

  const handleMonthChange = (month: string) => {
    const newMonth = months.indexOf(month);
    setCurrentMonth(new Date(displayMonth.getFullYear(), newMonth));
  };

  const handleYearChange = (year: string) => {
    setCurrentMonth(new Date(parseInt(year, 10), displayMonth.getMonth()));
  };

  // Handler functions for navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(
      (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (nextMonth) => new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1)
    );
  };

  const currentYear = new Date().getFullYear();
  let startYear: number;
  let endYear: number;

  if (disableAfterToday) {
    endYear = currentYear;
  } else {
    endYear = currentYear + 5;
  }

  if (disableHistoryDatesTill) {
    startYear = disableHistoryDatesTill.getFullYear();
  } else {
    startYear = currentYear - 5;
  }

  const years: string[] = Array.from({ length: endYear - startYear + 1 }).map(
    (_, i) => (startYear + i).toString()
  );

  let filteredMonths: string[] = months;
  if (
    disableAfterToday &&
    displayMonth.getFullYear() === new Date().getFullYear()
  ) {
    const currentMonthIndex = new Date().getMonth();
    filteredMonths = months.slice(0, currentMonthIndex + 1);
  }

  if (
    disableHistoryDatesTill &&
    displayMonth.getFullYear() === disableHistoryDatesTill.getFullYear()
  ) {
    const tillMonthIndex = disableHistoryDatesTill.getMonth();
    filteredMonths = months.slice(tillMonthIndex);
  }

  return (
    <div className="flex space-x-2 items-center">
      {monthDisplayText !== "" ? (
        <TooltipProvider>
          <div className="flex space-x-4 justify-center items-center px-3 h-[1.85rem]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  className={
                    "h-7 w-7 p-0 bg-transparent opacity-50 hover:opacity-100"
                  }
                  onClick={onReset}
                >
                  <ResetIcon className="h-4 w-4" />{" "}
                  {/* Use an appropriate icon here */}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to current month</p>
              </TooltipContent>
            </Tooltip>
            <p>{monthDisplayText}</p>
          </div>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "h-7 w-7 p-0 bg-transparent opacity-50 hover:opacity-100"
                }
                onClick={goToPreviousMonth}
                disabled={disablePrev}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous month</p>
            </TooltipContent>
          </Tooltip>
          <Select
            onValueChange={handleMonthChange}
            defaultValue={months[displayMonth.getMonth()]}
          >
            <SelectTrigger className="w-[7rem] h-[1.85rem]">
              <SelectValue className="text-xs" placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {filteredMonths.map((month, i) => (
                <SelectItem className={"text-xs"} key={i} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            defaultValue={displayMonth.getFullYear().toString()}
          >
            <SelectTrigger className="w-fit h-[1.825rem]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[12.25rem]">
                {years.map((year, i) => (
                  <SelectItem className={"text-sm"} key={i} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                }
                onClick={goToNextMonth}
                disabled={disableNext}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

function DateRangePicker({
  className,
  classNames,
  showOutsideDays = true,
  disableHistoryDatesTill,
  disableAfterToday = false,
  title = "Date Range",
  ...props
}: DateRangePickerProps) {
  function disableDatesAfterToday(): Matcher {
    const today = new Date();
    return {
      after: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    };
  }

  // Generate the disabled matcher array
  const disabledDates: Matcher[] = [];

  if (disableAfterToday) {
    disabledDates.push(disableDatesAfterToday());
  }

  if (disableHistoryDatesTill) {
    disabledDates.push({ before: disableHistoryDatesTill });
  }

  const [selectedDates, setSelectedDates] = React.useState<{
    start: Date | null | undefined;
    end: Date | null | undefined;
  }>({ start: null, end: null });
  useEffect(() => {
    if (props.selected?.from) {
      setCurrentMonth(
        new Date(
          props.selected.from.getFullYear(),
          props.selected.from.getMonth()
        )
      );
    }
  }, [props.selected?.from]);

  const [currentMonth, setCurrentMonth] = React.useState(() => {
    // Default to the start date of the selected range if available, else default to the current date.
    return selectedDates.start
      ? new Date(
          selectedDates.start.getFullYear(),
          selectedDates.start.getMonth()
        )
      : new Date();
  });

  const handleDateSelection: SelectRangeEventHandler = (range, selectedDay) => {
    if (range) {
      // Destructure the correct properties from range
      const { from, to } = range;

      setSelectedDates({
        start: from || null,
        end: to || null,
      });

      if (from) {
        setCurrentMonth(new Date(from.getFullYear(), from.getMonth()));
      }
    }
  };

  const handleReset = () => {
    setSelectedDates({ start: null, end: null });
    setCurrentMonth(new Date());
  };

  return (
    <>
      <DayPicker
        captionLayout="dropdown-buttons"
        fromYear={2001}
        toYear={2050}
        month={currentMonth}
        showOutsideDays={showOutsideDays}
        className={tw_style_merge("px-3 pt-3 select-none", className)}
        showWeekNumber
        numberOfMonths={props.numberOfMonths}
        selected={
          selectedDates.start || selectedDates.end
            ? {
                from: selectedDates.start || undefined,
                to: selectedDates.end || undefined,
              }
            : undefined
        }
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          table: "w-full border-collapse space-y-1",
          head_row: "flex w-full items-center ms-1",
          head_cell:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full items-center my-1",
          cell: tw_style_merge(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: tw_style_merge(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground border",
          day_outside: "text-muted-foreground opacity-50 disabled",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          with_weeknumber: "w-full",
          weeknumber:
            "bg-primary/50 w-[30px] subpixel-antialiased text-accent font-bold p-2 py-2.5 m-1 border-x border-accent",
          ...classNames,
        }}
        disabled={disabledDates}
        components={{
          Caption: (captionProps) => {
            const isSecond =
              captionProps.displayMonth.getMonth() !== currentMonth.getMonth();
            return (
              <CustomCaption
                {...captionProps}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                isSecond={isSecond}
                onReset={handleReset}
                disableAfterToday={disableAfterToday}
                disableHistoryDatesTill={disableHistoryDatesTill}
              />
            );
          },
        }}
        onSelect={handleDateSelection}
        {...props}
      />
      <div className="flex justify-center items-center py-1">
        <small className="text-primary/70">{title}</small>
      </div>
    </>
  );
}

DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
