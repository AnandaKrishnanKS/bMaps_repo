import React from "react";
import RaController from "./components/RaController";

export default function RaPage() {
  return (
    <div className="flex-1 h-full space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        {/* <h2 className="text-3xl font-bold tracking-tight">Open To Buy</h2> */}
      </div>
      <RaController />
    </div>
  );
}
