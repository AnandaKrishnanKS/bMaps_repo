const columns: any = {
  Channel: "Channel",
  Region: "Region",
  StoreId: "Store Id",
  StoreName: "Store Name",
  Department_Name: "Department Name",
  CategoryName: "Category Name",
  Family: "Family",
  subFamily: "Sub Family",
  DOM_COMM: "DOM/COMM",
  Supplier: "Supplier",
  SubCategory: "Sub Category",
  // ExtendedSubCategory: "Extended Sub Category",
  // SubCategorySupplier: "Sub Category Supplier",
  // AssemblyCodeNickname: "Assembly Code Nickname",
  // ItemLookupCode: "Item Lookup Code",
  Status: "Status",
  ENDOFLife: "End Of Life",
  Description: "Description",
  BudgetYear: "Budget Year",
  HistoricalYear: "Historical Year",
  // BudgetAmount: "Budget Amount",
  "Budget%": "Budget %",
  Net_Sales: "Net Sales",
  BudgetvsACT_FCT: "Budget vs Act/FCT",
  "BudgetvsLY%": "Budgetvs LY %",
  "BudgetvsLLY%": "Budgetvs LLY%",
  Price: "Price",
  BudgetQTY: "Budget QTY",
  QTY_SKU: " Quanity/SKU",
  Budget_SKU: "Budget/SKU",
  Item_Cost: "Item Cost",
  LY_Gross_Margin: "LY Gross Margin",
  // BudgetCost: "Budget Cost",
  // "BudgetGrossMargin%": "Budget Gross Margin %",
  // BudgetCostofGoods: "Budget Cost Of Goods",
  "Logistic%": "Logistic %",
  SupplyCost: "Supply Cost",
  // "FirstMargin%": "First Margin %",
  StockQuantity: "Stock Quantity",
  "LYsellThru%": "LY Selthru %",
  "ProposedSellThru%": "Proposed Selthru %",
  // PurchasedRetailValueGrossSale: "Purchased Retail Value Gross Sale",
  // StockatRetailPrice: "Stockat Retail Price",
  DisplayItem: "Display Item",
  // DisplayItemValue: "Display Item Value",
  COR_valueENDOfLifeStock: "COR Value on End of Life Stock",
  TYForecast: "TY Forecast",
  PurchaseReatilValueatGrossSale: "PurchasedRetailValueGrossSale",
  OTBorPurchaseCost: "OTB",
};
interface ArgInterface {
  year: number;
}
export const modifyHeaders = (
  columnName: any,
  args: ArgInterface = { year: 0 }
) => {
  if (columnName === `BudgetAmount-1`) {
    return `${args?.year + 1}_Budget`;
  } else if (columnName === `BudgetAmount-2`) {
    return `${args?.year + 2}_Budget`;
  } else if (columnName === `BudgetAmount-3`) {
    return `${args?.year + 3}_Budget`;
  } else if (columnName === `BudgetAmount-4`) {
    return `${args?.year + 4}_Budget`;
  } else if (columnName === `BudgetAmount-5`) {
    return `${args?.year + 5}_Budget`;
  } else if (columnName === `BudgetAmount-1%`) {
    return `${args?.year + 1}_Budget%`;
  } else if (columnName === `BudgetAmount-2%`) {
    return `${args?.year + 2}_Budget%`;
  } else if (columnName === `BudgetAmount-3%`) {
    return `${args?.year + 3}_Budget%`;
  } else if (columnName === `BudgetAmount-4%`) {
    return `${args?.year + 4}_Budget%`;
  } else if (columnName === `BudgetAmount-5%`) {
    return `${args?.year + 5}_Budget%`;
  } else if (columns[columnName]) {
    return columns[columnName];
  } else return columnName;
};
