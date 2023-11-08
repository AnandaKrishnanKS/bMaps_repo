"use client";

import * as React from "react";
import { useEffect } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/shared/table";

import { DataTablePagination } from "./KpiTablePagination";
import { nonDefaultColumns } from "./nonDefaultColumns";
import { DataTableToolbar } from "./data-table-toolbar";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { KpiContext } from "../KpiController";
import { Icons } from "@/src/components/icons";

export function KpiDataTable({ columns, data, setData }: any) {
  const { body, dispatchBody, loading } = React.useContext(KpiContext);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(nonDefaultColumns);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old: any) =>
          old.map((row: any, index: any) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    const _sort = JSON?.stringify(table?.getState()?.sorting[0] ?? {});
    const _body_sort = JSON?.stringify(body?.sort);
    if (!(_sort === _body_sort) && Object?.keys(body)?.length) {
      dispatchBody({ type: "SORT", table: table });
    }
  }, [table?.getState().sorting]);

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {loading && body?.fetch_from_db
              ? null
              : table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className=" border-2 text-sm font-medium text-center"
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              <div className="  flex justify-center items-center ms-2 me-2 my-1">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: (
                                    <ArrowUpIcon className="ml-2 h-4 w-4 " />
                                  ),
                                  desc: (
                                    <ArrowDownIcon className="ml-2 h-4 w-4" />
                                  ),
                                }[header.column.getIsSorted() as string] ??
                                  (header.column?.getCanSort() && (
                                    <CaretSortIcon className="ml-2 h-4 w-4" />
                                  ))}
                              </div>
                            </div>
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
          </TableHeader>
          <TableBody className="text-xs font-medium text-center">
            {loading && body?.fetch_from_db ? (
              // && !table.getRowModel().rows?.length
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center flex items-center justify-center"
                >
                  <>
                    <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
                    Loading...
                  </>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-0 border-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No Data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className=" border-2 p-0 bg-slate-100">
            {table.getRowModel().rows?.length &&
            !(loading && body?.fetch_from_db)
              ? table.getFooterGroups().map((footerGroup) => (
                  <TableRow key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <TableHead
                        className=" border-2 text-center text-sm font-medium"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))
              : null}
          </TableFooter>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
