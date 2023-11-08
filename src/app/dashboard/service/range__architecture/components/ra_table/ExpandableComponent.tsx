import { useContext, useEffect, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { RaContext } from "../RaController";
import { Icons } from "@/src/components/icons";

export const ExpandComponent = ({ getValue, row, column, table }: any) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { dispatchBody, setExpandHistory, loading } = useContext(RaContext);
  function handleExpand() {
    setExpandHistory((s: any) => [...s, { ...row?.original }]);
    dispatchBody({ type: "EXPAND_ROW", row: row });
    setShowSpinner(true);
  }
  useEffect(() => {
    if (!loading) {
      setShowSpinner(false);
    }
  }, [loading]);

  return (
    <button
      disabled={loading}
      className=" pl-4 w-full flex items-center justify-center"
      onClick={handleExpand}
    >
      {Object?.keys(row?.original).includes(
        "ItemLookupCode"
      ) ? null : showSpinner ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PlusCircledIcon className="mr-2 h-4 w-4" />
      )}
    </button>
  );
};
