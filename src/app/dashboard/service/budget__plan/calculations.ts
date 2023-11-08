// export function getTotalBudget(data: any) {
//   const arr = data?.map((row: any, index: any) => {
//     return row["BudgetAmount"];
//   });
//   const totalBudget = arr.reduce(function (x: number, y: number) {
//     return x + y;
//   }, 0);
//   return totalBudget;
// }
// export function getTotalBudgetPercentage(data: any) {
//   const arr = data?.map((row: any, index: any) => {
//     return row["BudgetPercent"];
//   });
//   const totalBudget = arr.reduce(function (x: number, y: number) {
//     return x + y;
//   }, 0);
//   return totalBudget;
// }

// export function budgetPercentage(individualBudget: any, totalBudget: any) {
//   if (individualBudget) {
//     return (individualBudget / totalBudget) * 100;
//   } else return null;
// }

// export function budgetPercentageChange({
//   rowIndex,
//   data,
//   columnId,
//   setData,
//   newValue,
// }: any) {
//   const arr = data?.map((row: any, index: any) => {
//     return row[columnId];
//   });
//   // let totalBudgetPercentage = arr.reduce(function (x: number, y: number) {
//   //   return x + y;
//   // }, 0);
//   const totalBudgetPercentage = getTotalBudgetPercentage(data);
//   console.log({ totalBudgetPercentage });
//   const newBudgetPercentage = Number(newValue);
//   const oldBudgetPercentage = arr[rowIndex];
//   const budgetPercentChange = newBudgetPercentage - oldBudgetPercentage;
//   const remainingTotalBudgetPercentage =
//     totalBudgetPercentage - oldBudgetPercentage;
//   const newCalculatedBudgetPercentageForOthers = (budgtPercentage: number) => {
//     return (
//       budgtPercentage -
//       (budgtPercentage / remainingTotalBudgetPercentage) * budgetPercentChange
//     );
//   };
//   const calculatedArray = arr?.map((item: any, index: any) => {
//     if (index === rowIndex) {
//       return newBudgetPercentage;
//     } else return newCalculatedBudgetPercentageForOthers(item);
//   });

//   setData((old: any) => {
//     return old?.map((row: any, index: any) => {
//       return {
//         ...row,
//         [columnId]: calculatedArray[index],
//         BudgetAmount: row["BudgetAmount"] * (calculatedArray[index] / 100),
//       };
//     });
//   });
// }

// // export function budgetPercentageChange({
// //   rowIndex,
// //   data,
// //   columnId,
// //   setData,
// //   newValue,
// // }: any) {
// //   const arr = data?.map((row: any, index: any) => {
// //     return row[columnId];
// //   });
// //   let totalBudgetPercentage = arr.reduce(function (x: number, y: number) {
// //     return x + y;
// //   }, 0);
// //   const newBudgetPercentage = Number(newValue);
// //   const oldBudgetPercentage = arr[rowIndex];
// //   const budgetPercentChange = newBudgetPercentage - oldBudgetPercentage;
// //   const remainingTotalBudgetPercentage =
// //     totalBudgetPercentage - oldBudgetPercentage;
// //   const newCalculatedBudgetPercentageForOthers = (budgtPercentage: number) => {
// //     return (
// //       budgtPercentage -
// //       (budgtPercentage / remainingTotalBudgetPercentage) * budgetPercentChange
// //     );
// //   };
// //   const calculatedArray = arr?.map((item: any, index: any) => {
// //     if (index === rowIndex) {
// //       return newBudgetPercentage;
// //     } else return newCalculatedBudgetPercentageForOthers(item);
// //   });

// //   setData((old: any) => {
// //     return old?.map((row: any, index: any) => {
// //       return {
// //         ...row,
// //         [columnId]: calculatedArray[index],
// //         BudgetAmount: row["BudgetAmount"] * (calculatedArray[index] / 100),
// //       };
// //     });
// //   });
// // }
