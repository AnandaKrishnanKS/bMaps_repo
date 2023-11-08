import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { Card, CardContent } from "@/src/components/shared/card";
import { SpDataTable } from "./sp_table/SpDataTable";
import { useContext } from "react";
import { SpContext } from "./SpController";
import CollapseComponent from "./sp_table/CollapseComponent";
import { ExpandComponent } from "./sp_table/ExpandableComponent";
import { modifyHeaders } from "../modifyTableHeaders";
import { EditableTableCell } from "./sp_table/EditableCell";
import NormalCell from "./sp_table/NormalCell";
import { mandatoryColumns } from "./sp_table/mandatoryColumns";
import SpBudgetInputField from "./SpBudgetInputField";
import FooterCell from "./sp_table/FooterCell";
import SpQuantityInputField from "./SpQuantityInputField";

export default function SpTabView() {
  const {
    setTransformedData,
    transformedData,
    loading,
    webSocketData,
    expandHistory,
    setActiveTab,
    body,
    forecast_date,
  } = useContext(SpContext);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
  };
  const forecastedYear = forecast_date?.to
    ? new Date(body?.forecast_date_range?.to)?.getFullYear()
    : 0;

  const editableColumns = Object?.keys(webSocketData)?.length
    ? webSocketData?.editable_cols
    : [];

  const getColumns = (tabName: string) => {
    function commonColumns(): any {
      let _commonColumn: any = [];
      let i = 1;
      webSocketData?.tabs[tabName]?.map((item: any, index: any) => {
        if (webSocketData?.columns?.includes(item)) {
          _commonColumn = [..._commonColumn, item];
        }
      });
      while (i <= 5) {
        if (body?.strategic_plan?.values[i] <= 0) {
          _commonColumn = _commonColumn?.filter(
            (item: string) => item !== `BudgetAmount-${i}`
          );
          _commonColumn = _commonColumn?.filter(
            (item: string) => item !== `BudgetAmount-${i}%`
          );
        }
        i++;
      }
      return _commonColumn;
    }
    if (Object?.keys(webSocketData)?.length) {
      if (tabName === "BudgetValue") {
        return [
          {
            id: "Expandable",
            header: expandHistory?.length ? <CollapseComponent /> : null,
            cell: ExpandComponent,
            enableSorting: false,
            enableHiding: false,
            footer: "Total",
          },
          ...(webSocketData?.tabs[tabName]?.length > 0
            ? commonColumns()?.map((item: any, index: any) => {
                if (editableColumns?.includes(item)) {
                  return {
                    header: modifyHeaders(item, { year: forecastedYear }),
                    accessorKey: item,
                    cell: EditableTableCell,
                    enableHiding: !mandatoryColumns?.includes(item),
                    footer: <FooterCell item={item} />,
                  };
                } else {
                  return {
                    header: modifyHeaders(item, { year: forecastedYear }),
                    accessorKey: item,
                    cell: NormalCell,
                    enableHiding: !mandatoryColumns?.includes(item),
                    footer: <FooterCell item={item} />,
                    filterFn: (row: any, id: any, value: any) => {
                      return value.includes(String(row.getValue(id)));
                    },
                  };
                }
              })
            : []),
        ];
      } else {
        return commonColumns()?.map((item: any, index: any) => {
          return {
            header: modifyHeaders(item, { year: forecastedYear }),
            accessorKey: item,
            cell: NormalCell,
            footer: <FooterCell item={item} />,
            filterFn: (row: any, id: any, value: any) => {
              return value.includes(String(row.getValue(id)));
            },
          };
        });
      }
    } else return [];
  };

  return (
    <Tabs
      onValueChange={handleTabChange}
      defaultValue="spBudgetValue"
      className="space-y-4"
    >
      <TabsList className="flex align-start justify-start">
        <TabsTrigger value="spBudgetValue">SP Value</TabsTrigger>
        <TabsTrigger value="spBudgetQuantity">SP Quantity</TabsTrigger>
        <TabsTrigger value="spBudgetCost">SP Cost</TabsTrigger>
        <TabsTrigger value="spBudgetMargin">SP Margin</TabsTrigger>
      </TabsList>

      <TabsContent value="spBudgetValue" className="space-y-4">
        <Card className=" border-2  w-full">
          <CardContent>
            <div className="flex gap-2">
              <SpBudgetInputField />
              <SpQuantityInputField />
            </div>

            <SpDataTable
              columns={getColumns("BudgetValue") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="spBudgetQuantity" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <SpDataTable
              columns={getColumns("BudgetQuantity") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="spBudgetCost" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <SpDataTable
              columns={getColumns("BudgetCost") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="spBudgetMargin" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <SpDataTable
              columns={getColumns("BudgetMargin") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
