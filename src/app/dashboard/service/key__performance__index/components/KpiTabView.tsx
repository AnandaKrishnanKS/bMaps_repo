import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { Card, CardContent } from "@/src/components/shared/card";
import { KpiDataTable } from "./kpi_table/KpiDataTable";
import { useContext } from "react";
import { KpiContext } from "./KpiController";
import CollapseComponent from "./kpi_table/CollapseComponent";
import { ExpandComponent } from "./kpi_table/ExpandableComponent";
import { modifyHeaders } from "../modifyTableHeaders";
import { EditableTableCell } from "./kpi_table/EditableCell";
import NormalCell from "./kpi_table/NormalCell";
import { mandatoryColumns } from "./kpi_table/mandatoryColumns";
import FooterCell from "./kpi_table/FooterCell";

export default function KpiTabView() {
  const {
    setTransformedData,
    transformedData,
    loading,
    webSocketData,
    expandHistory,
    setActiveTab,
  } = useContext(KpiContext);

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
      defaultValue="kpiBudgetValue"
      className="space-y-4"
    >
      <TabsList className="flex align-start justify-start">
        <TabsTrigger value="kpiBudgetValue">KPI Value</TabsTrigger>
        <TabsTrigger value="kpiBudgetQuantity">KPI Quantity</TabsTrigger>
        <TabsTrigger value="kpiBudgetCost">KPI Cost</TabsTrigger>
        <TabsTrigger value="kpiBudgetMargin">KPI Margin</TabsTrigger>
      </TabsList>
      <TabsContent value="kpiBudgetValue" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <KpiDataTable
              columns={getColumns("BudgetValue") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="kpiBudgetQuantity" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <KpiDataTable
              columns={getColumns("BudgetQuantity") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="kpiBudgetCost" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <KpiDataTable
              columns={getColumns("BudgetCost") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="kpiBudgetMargin" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <KpiDataTable
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
