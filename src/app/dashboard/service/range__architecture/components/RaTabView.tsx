import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { Card, CardContent } from "@/src/components/shared/card";
import { RaDataTable } from "./ra_table/RaDataTable";
import { useContext, useEffect } from "react";
import { RaContext } from "./RaController";
import CollapseComponent from "./ra_table/CollapseComponent";
import { ExpandComponent } from "./ra_table/ExpandableComponent";
import { modifyHeaders } from "../modifyTableHeaders";
import { EditableTableCell } from "./ra_table/EditableCell";
import NormalCell from "./ra_table/NormalCell";
import { mandatoryColumns } from "./ra_table/mandatoryColumns";
import FooterCell from "./ra_table/FooterCell";

export default function RaTabView() {
  const {
    setTransformedData,
    transformedData,
    loading,
    webSocketData,
    expandHistory,
    setActiveTab,
    dispatchBody,
  } = useContext(RaContext);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    dispatchBody({ type: "RA_TAB_CHANGE", tabName: val });
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
      defaultValue="raBudgetValue"
      className="space-y-4"
    >
      <TabsList className="flex align-start justify-start">
        <TabsTrigger value="raBudgetValue">RA Value</TabsTrigger>
        <TabsTrigger value="raBudgetQuantity">RA Quantity</TabsTrigger>
        <TabsTrigger value="raBudgetCost">RA Cost</TabsTrigger>
        <TabsTrigger value="raBudgetMargin">RA Margin</TabsTrigger>
      </TabsList>
      <TabsContent value="raBudgetValue" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <RaDataTable
              columns={getColumns("BudgetValue") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="raBudgetQuantity" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <RaDataTable
              columns={getColumns("BudgetQuantity") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="raBudgetCost" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <RaDataTable
              columns={getColumns("BudgetCost") ?? []}
              setData={setTransformedData}
              data={transformedData}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="raBudgetMargin" className="space-y-4">
        <Card className="w-full">
          <CardContent>
            <RaDataTable
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
