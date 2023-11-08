const columns: any = {
  country: "Country",
  SubFamily: "Sub_Family",
  "Sub-Category": "Sub_Category",
  "Extended-Sub-Category": "Extended_Sub_Category",
  "Sub-Category-Supplier": "Sub_Category_Supplier",
  "Assembly code-Nickname": "Assembly_Code_Nickname",
  "END OF Life": "End_Of_Life",
  ItemLookupCode: "Item_Lookup_Code",
  "Budget%": "Budget %",
  "RelativeBudget%": "Relative_Budget%",
};
export const modifyHeaders = (columnName: any) => {
  if (columns[columnName]) {
    return columns[columnName];
  } else return columnName;
};
