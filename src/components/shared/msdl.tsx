import * as React from "react";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon, PlusCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { tw_style_merge } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from "@/components/shared/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/shared/popover";
import { MultiSelectDDProps } from "@/components/shared/multi-select-dropdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { useState } from "react";
import { Separator } from "./separator";

const handleWheel = (e: React.WheelEvent) => {
  e.stopPropagation();
};

export function MultiSelectDD_Large({ title, options, selectedValues, onSelectChange, }: MultiSelectDDProps) {
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(options.length / itemsPerPage);

  const paginatedOptions = options.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const paginationHeader = "Page " + String(currentPage + 1) + " of " + String(totalPages);

  const handleOptionClick = (option: string | number) => {
    const updatedValues = [...selectedValues];

    if (updatedValues.includes(option)) {
      updatedValues.splice(updatedValues.indexOf(option), 1);
    } else {
      updatedValues.push(option);
    }

    onSelectChange(updatedValues);
  };

  const [searchTerm, setSearchTerm] = useState<string>('')
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    return 1;
  };

  const displayedOptions = searchTerm
    ? options.filter(
      option => option
      .toString()
      .toUpperCase()
      .startsWith(
        searchTerm.toString().toUpperCase()
      )
    ) : paginatedOptions;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className=" flex justify-start h-8">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit w-max-[275px] p-0" align="start">
        <Command loop className="rounded-b-none">
          <CommandInput onValueChange={() => handleInputChange} placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Item IDs">
              <div onWheel={handleWheel}>
                {displayedOptions.map((option) => {
                  const isSelected = selectedValues.includes(option);
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
        </Command>
        <Separator/>
        <Command>
          <CommandGroup heading={paginationHeader}>
            <div className="flex items-center justify-between px-2 pb-2 space-x-2">
              <Button
                variant={"outline"}
                className="h-8 w-8 p-0 lg:flex border border-input bg-transparent shadow-sm justify-center hover:bg-accent hover:text-accent-foreground"
                onClick={() => setCurrentPage(0)}
                disabled={currentPage > 0 ? false : true}
              >
                <span className="sr-only">Go to first page</span>
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={"outline"}
                className="h-8 w-8 p-0 lg:flex border border-input bg-transparent shadow-sm justify-center hover:bg-accent hover:text-accent-foreground"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage > 0 ? false : true}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={"outline"}
                className="h-8 w-8 p-0 lg:flex border border-input bg-transparent shadow-sm justify-center hover:bg-accent hover:text-accent-foreground"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage < totalPages - 1 ? false : true}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={"outline"}
                className="h-8 w-8 p-0 lg:flex border border-input bg-transparent shadow-sm justify-center hover:bg-accent hover:text-accent-foreground"
                onClick={() => setCurrentPage(totalPages - 1)}
                disabled={currentPage < totalPages - 1 ? false : true}
              >
                <span className="sr-only">Go to last page</span>
                <DoubleArrowRightIcon className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" />
              <Select
                value={`${itemsPerPage}`}
                onValueChange={(value) => { setItemsPerPage(Number(value)) }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 50, 100, 250].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CommandGroup >
          <CommandSeparator />
          <CommandGroup heading="Item selection">
            <div className="flex items-center justify-between px-2 space-x-2">
              <p>Select Items</p>
              <Button
                variant={"outline"}
                onClick={() => { onSelectChange(options); }}
                className="h-8 w-fit p-0 px-3 lg:flex border border-input bg-transparent shadow-sm justify-center hover:bg-accent hover:text-accent-foreground"
                title="Select all"
              >
                ALL
              </Button>
              <Button
                variant={"outline"}
                onClick={() => { onSelectChange(paginatedOptions); }}
                className="h-8 w-fit p-0 px-3 lg:flex border border-input bg-transparent shadow-sm justify-center hover:bg-accent hover:text-accent-foreground"
                title="Select all in the current page"
              >
                PAGE
              </Button>
              <Button
                variant={"outline"}
                onClick={() => { onSelectChange([]); }}
                className="h-8 w-8 p-0 lg:flex border border-input bg-transparent shadow-sm justify-center hover:bg-accent hover:text-accent-foreground"
                disabled={selectedValues.length === 0 ? true : false}
                title="Deselect all"
              >
                <span className="sr-only">Unselect all</span>
                <CrossCircledIcon className="h-4 w-4" />
              </Button>
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}