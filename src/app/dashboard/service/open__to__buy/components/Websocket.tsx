import React, { useState, useEffect, useContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useToast } from "@/components/shared/use-toast";
import { OtbContext } from "./OtbController";
import { GlobalContext } from "@/src/app/globalContext";

export default function WebSocketData() {
  const URL = process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL;
  const PORT = process.env.NEXT_PUBLIC_OTB_PORT;
  const socketUrl = `${URL}:${PORT}/otb/get_data_ws`;
  //
  const { body, setWebSocketData, setLoading, webSocketData } =
    useContext(OtbContext);
  const { setModuleConnectionStatus } = useContext(GlobalContext);
  const { toast } = useToast();
  const [connect, setConnect] = useState(true);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: (closeEvent) => {
        return true;
      },
    },
    connect
  );
  useEffect(() => {
    if (lastMessage && lastMessage?.data !== JSON?.stringify(webSocketData)) {
      setWebSocketData(JSON?.parse(lastMessage?.data));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [lastMessage]);

  function getDataFromWebSocketApi(body: any) {
    sendMessage(
      JSON.stringify({
        ...body,
      })
    );
  }

  useEffect(() => {
    if (Object?.keys(body).length) {
      getDataFromWebSocketApi(body);
      setLoading(true);
    }
  }, [body]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Online",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    window.addEventListener("offline", function () {
      setConnect(false);
      toast({
        variant: "destructive",
        title: "Warning",
        description: "No Internet Connection.",
      });
    });
    window.addEventListener("online", function () {
      setConnect(true);
    });
  });

  useEffect(() => {
    if (connectionStatus === "Closed") {
      toast({
        variant: "destructive",
        description: "Error, Please wait...",
      });
      setLoading(false);
    }
  }, [connectionStatus]);
  useEffect(() => {
    setModuleConnectionStatus(readyState);
  }, [readyState]);
  useEffect(() => {
    return () => setModuleConnectionStatus(6);
  }, []);

  return <></>;
}
