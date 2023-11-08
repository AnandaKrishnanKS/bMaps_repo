import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { Card, CardContent } from "@/src/components/shared/card";
import { BudgetDataTable } from "./budget_table/BudgetDataTable";
import { useContext } from "react";
import { BudgetContext } from "./BudgetController";
import CollapseComponent from "./budget_table/CollapseComponent";
import { ExpandComponent } from "./budget_table/ExpandableComponent";
import { modifyHeaders } from "../modifyTableHeaders";
import { EditableTableCell } from "./budget_table/EditableCell";
import NormalCell from "./budget_table/NormalCell";
import { mandatoryColumns } from "./budget_table/mandatoryColumns";
import FooterCell from "./budget_table/FooterCell";

export default function BudgetTabView() {
  const {
    setTransformedData,
    transformedData,
    loading,
    webSocketData,
    expandHistory,
    setActiveTab,
  } = useContext(BudgetContext);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
  };

  const editableColumns = Object?.keys(webSocketData)?.length
    ? webSocketData?.editable_cols
    : [];
  const getColumns = (tabName: string) => {
    function commonColumns(): any {
      let _commonColumn: any = [];
      webSocketData?.tabs[tabName]?.map((item: any, index: any) => {
        if (webSocketData?.columns?.includes(item)) {
          _commonColumn = [..._commonColumn, item];
        }
      });
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
                    header: modifyHeaders(item),
                    accessorKey: item,
                    cell: EditableTableCell,
                    enableHiding: !mandatoryColumns?.includes(item),
                    footer: <FooterCell item={item} />,
                  };
                } else {
                  return {
                    header: modifyHeaders(item),
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
            header: modifyHeaders(item),
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
      defaultValue="budgetValue"
      className="space-y-4"
    >
      <TabsList className="flex align-start justify-start">
        <TabsTrigger value="budgetValue">Budget Value</TabsTrigger>
        <TabsTrigger value="budgetQuantity">Budget Quantity</TabsTrigger>
        <TabsTrigger value="budgetCost">Budget Cost</TabsTrigger>
        <TabsTrigger value="budgetMargin">Budget Margin</TabsTrigger>
      </TabsList>
      <TabsContent value="budgetValue" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <BudgetDataTable
              columns={getColumns("BudgetValue") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="budgetQuantity" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <BudgetDataTable
              columns={getColumns("BudgetQuantity") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="budgetCost" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <BudgetDataTable
              columns={getColumns("BudgetCost") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="budgetMargin" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <BudgetDataTable
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
