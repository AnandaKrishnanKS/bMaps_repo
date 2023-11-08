"use client";
import { useState, useContext, createContext } from "react";

export const GlobalContext = createContext<any>({});

export default function GlobalContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // dont change the number.
  const [moduleConnectionStatus, setModuleConnectionStatus] = useState(5);
  return (
    <GlobalContext.Provider
      value={{ moduleConnectionStatus, setModuleConnectionStatus }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
