import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { Card, CardContent } from "@/src/components/shared/card";
import { OtbDataTable } from "./otb_table/OtbDataTable";
import { useContext } from "react";
import { OtbContext } from "./OtbController";
import CollapseComponent from "./otb_table/CollapseComponent";
import { ExpandComponent } from "./otb_table/ExpandableComponent";
import { modifyHeaders } from "../modifyTableHeaders";
import { EditableTableCell } from "./otb_table/EditableCell";
import NormalCell from "./otb_table/NormalCell";
import { mandatoryColumns } from "./otb_table/mandatoryColumns";
import FooterCell from "./otb_table/FooterCell";

export default function OtbTabView() {
  const {
    setTransformedData,
    transformedData,
    loading,
    webSocketData,
    expandHistory,
    setActiveTab,
  } = useContext(OtbContext);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
  };

  const editableColumns = [
    "Budget%",
    "BudgetvsACT_FCT",
    "BudgetvsLY%",
    "BudgetVSLY%",
    "BudgetvsLLY%",
    "BudgetQTY",
    "Logistic%",
    "ProposedSellThru%",
    "DisplayItem",
    "COR_valueENDOfLifeStock",
    "Adjusted_Gross_Margin%",
    "Markdown%",
  ];
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
      defaultValue="otbBudgetValue"
      className="space-y-4"
    >
      <TabsList className="flex align-start justify-start">
        <TabsTrigger value="otbBudgetValue">OTB Value</TabsTrigger>
        <TabsTrigger value="otbBudgetQuantity">OTB Quantity</TabsTrigger>
        <TabsTrigger value="otbBudgetCost">OTB Cost</TabsTrigger>
        <TabsTrigger value="otbBudgetMargin">OTB Margin</TabsTrigger>
      </TabsList>
      <TabsContent value="otbBudgetValue" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <OtbDataTable
              columns={getColumns("BudgetValue") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="otbBudgetQuantity" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <OtbDataTable
              columns={getColumns("BudgetQuantity") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="otbBudgetCost" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <OtbDataTable
              columns={getColumns("BudgetCost") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="otbBudgetMargin" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <OtbDataTable
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
