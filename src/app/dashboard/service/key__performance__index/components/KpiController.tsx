"use client";
import { createContext, useEffect, useReducer, useState } from "react";
import WebSocketData from "./Websocket";
import { DateRange } from "react-day-picker";
import KpiTabView from "./KpiTabView";
import { messageBodyReducer } from "./reducer/messageBodyReducer";

export const KpiContext = createContext<any>({});

export default function KpiController() {
  const [body, dispatchBody] = useReducer<any>(messageBodyReducer, {});
  const [transformedData, setTransformedData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [mainFilters, setMainFilters] = useState([]);
  const [subFilters, setSubFilters] = useState([]);
  const [mainFilterOptions, setMainFilterOptions] = useState({});
  const [mainFilterValues, setMainFilterValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [webSocketData, setWebSocketData] = useState<any>({});
  const [expandHistory, setExpandHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("kpiBudgetValue");
  const [secondaryFilters, setSecondaryFilters] = useState<any>({});
  const [history_date, setHistoryDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
    // from: new Date(),
    // to: new Date(),
  });
  const [forecast_date, setForecastDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
    // from: new Date(),
    // to: new Date(),
  });

  function transformData(_columns: any = [], _data: any) {
    let arr: any = [];
    _data?.map((item: any, index: any) => {
      let obj = {};
      item?.map((subItem: any, subIndex: any) => {
        obj = { ...obj, [_columns[subIndex]]: subItem };
      });
      arr = [...arr, obj];
    });
    // setColumnNames(_columns);
    setTransformedData(arr);
  }

  useEffect(() => {
    if (webSocketData) {
      transformData(webSocketData?.columns, webSocketData?.data);
    }
  }, [webSocketData]);

  return (
    <KpiContext.Provider
      value={{
        body,
        dispatchBody,
        mainFilters,
        setMainFilters,
        subFilters,
        setSubFilters,
        mainFilterOptions,
        setMainFilterOptions,
        mainFilterValues,
        setMainFilterValues,
        setWebSocketData,
        webSocketData,
        loading,
        setLoading,
        transformedData,
        setTransformedData,
        history_date,
        setHistoryDate,
        forecast_date,
        setForecastDate,
        expandHistory,
        setExpandHistory,
        activeTab,
        setActiveTab,
        secondaryFilters,
        setSecondaryFilters,
      }}
    >
      <WebSocketData />
      <KpiTabView />
    </KpiContext.Provider>
  );
}
