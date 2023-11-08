import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { tw_style_merge } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/shared/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";

export interface MultiSelectDDProps {
  title?: string;
  options: (string | number)[];
  selectedValues: (string | number)[];
  onSelectChange: (values: (string | number)[]) => void;
  onOpenchange?: any;
}

const handleWheel = (e: React.WheelEvent) => {
  e.stopPropagation();
};

export function MultiSelectDD({
  title,
  options,
  selectedValues,
  onSelectChange,
  onOpenchange,
}: MultiSelectDDProps) {
  const handleOptionClick = (option: string | number) => {
    const updatedValues = [...selectedValues];
    if (updatedValues?.includes(option)) {
      updatedValues?.splice(updatedValues?.indexOf(option), 1);
    } else {
      updatedValues?.push(option);
    }
    onSelectChange(updatedValues);
  };
  return (
    <Popover onOpenChange={onOpenchange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={
            selectedValues?.length
              ? " bg-blue-200 flex justify-start h-8"
              : " flex justify-start h-8"
          }
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max-[275px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <div onWheel={handleWheel}>
                {options?.map((option) => {
                  const isSelected = selectedValues?.includes(option);
                  return (
                    <CommandItem
                      key={option}
                      onSelect={() => handleOptionClick(option)}
                    >
                      <div
                        className={tw_style_merge(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={tw_style_merge("h-4 w-4")} />
                      </div>
                      <span>{option}</span>
                    </CommandItem>
                  );
                })}
              </div>
            </CommandGroup>
          </CommandList>

          <>
            <CommandSeparator />
            <CommandGroup>
              {options?.length > 1 ? (
                <Button
                  variant={"outline"}
                  onClick={() => {
                    onSelectChange(options);
                  }}
                  className="h-8 w-fit p-0 px-3 lg:flex border border-input bg-transparent shadow-sm justify-center hover:bg-accent hover:text-accent-foreground"
                  title="Select all"
                >
                  SELECT ALL
                </Button>
              ) : null}
              {selectedValues?.length > 0 && (
                <CommandItem
                  onSelect={() => {
                    onSelectChange([]);
                  }}
                  className="justify-center text-center"
                >
                  Clear selections
                </CommandItem>
              )}
            </CommandGroup>
          </>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
