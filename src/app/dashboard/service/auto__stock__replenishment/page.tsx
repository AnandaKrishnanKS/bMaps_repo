import React from "react";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/shared/card";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/shared/sheet";

import { columns } from "./components/asr_table/columns";
import { DataTable } from "./components/asr_table/data-table";
import { taskSchema } from "./data_adapter/schema";
import { NewASR_Form } from "./components/new_asr_form";
import { Button } from "@/src/components/shared/button";

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/dashboard/service/auto__stock__replenishment/data_adapter/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function AutoStockReplenishment() {
  const tasks = await getTasks()
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-row justify between">
              <div className="w-full flex flex-col">
                <CardTitle>ASR List</CardTitle>
                <CardDescription>ASR created so far with the approval status</CardDescription>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className={"whitespace-nowrap"} value={"New Replanishment"}>New Replanishment</Button>
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle>New Replenishment</SheetTitle>
                    <SheetDescription>
                      Create new Replenishment
                    </SheetDescription>
                  </SheetHeader>
                  <div className={"my-5"}>
                    <NewASR_Form />
                  </div>
                  <SheetFooter className="justify-start">
                    <small>After submitting this form, ASR results will be available shortly.</small>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-full w-full flex-1 flex-col space-y-8 p-4 pt-1">
              <DataTable data={tasks} columns={columns} />
            </div>
          </CardContent>
          <CardFooter>
            <small>Hint: Navigate to New Replenishment for a new replenishment recipe</small>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}