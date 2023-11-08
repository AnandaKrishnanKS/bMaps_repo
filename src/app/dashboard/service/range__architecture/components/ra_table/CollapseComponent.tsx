import { MinusCircledIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";
import { RaContext } from "../RaController";
import { Icons } from "@/src/components/icons";

export default function CollapseComponent() {
  const { dispatchBody, expandHistory, setExpandHistory, loading } =
    useContext(RaContext);
  const [showSpinner, setShowSpinner] = useState(false);
  function handleCollapse() {
    if (expandHistory?.length === 1) {
      dispatchBody({ type: "GET_INITIAL_TABLE_PAGE" });
      setExpandHistory([]);
    } else {
      dispatchBody({ type: "COLLAPSE", expandHistory: expandHistory });
      setExpandHistory((s: any) => {
        let _arr = [...s];
        _arr.splice(s.length - 1, 1);
        return _arr;
      });
    }
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
      className=" w-full flex pl-4 items-center justify-center "
      onClick={handleCollapse}
    >
      {showSpinner ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <MinusCircledIcon className="mr-2 h-4 w-4" />
      )}
    </button>
  );
}
