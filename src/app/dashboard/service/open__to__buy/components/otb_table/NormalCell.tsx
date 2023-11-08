export default function NormalCell({ getValue, column }: any) {
  let value =
    isNaN(getValue()) ||
    column?.id === "BudgetYear" ||
    column?.id === "HistoricalYear"
      ? getValue()
      : Number(getValue())?.toLocaleString("en-US", {});
  if (column?.id?.includes("%")) {
    value = value === null ? "" : value + "%";
  } else if (column?.id === "BudgetYear" || column?.id === "HistoricalYear") {
    value =
      String(value)?.toLowerCase() === "none" ||
      String(value)?.toLowerCase() === "nan"
        ? ""
        : Math.trunc(Number(value));
  }

  return <>{value === null ? "" : value}</>;
}
