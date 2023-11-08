import React, { useState, useCallback, useEffect, useContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useToast } from "@/components/shared/use-toast";
import { SpContext } from "./SpController";
import { GlobalContext } from "@/src/app/globalContext";

export default function WebSocketData() {
  const URL = process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL;
  const PORT = process.env.NEXT_PUBLIC_SP_PORT;
  const socketUrl = `${URL}:${PORT}/sp/get_data`;
  const { body, setWebSocketData, loading, setLoading } = useContext(SpContext);
  const { moduleConnectionStatus, setModuleConnectionStatus } =
    useContext(GlobalContext);
  const { toast } = useToast();
  const [networkState, setNetWorkState] = useState(true);
  const [connect, setConnect] = useState(true);
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: (closeEvent) => {
        return true;
      },
    },
    connect
  );
  const data = lastMessage ? JSON?.parse(lastMessage?.data) : null;
  useEffect(() => {
    if (data) {
      setWebSocketData(data);
    }
    setLoading(false);
  }, [JSON?.stringify(data)]);

  function getOtbDataFromWebSocketApi(body: any) {
    sendMessage(
      JSON.stringify({
        ...body,
      })
    );
  }

  useEffect(() => {
    if (Object?.keys(body).length) {
      getOtbDataFromWebSocketApi(body);
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
